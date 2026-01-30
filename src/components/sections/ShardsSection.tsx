'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  Server, Search, AlertCircle, ChevronRight, RefreshCw, 
  Loader2, Globe, PieChart, CheckCircle, XCircle, Copy,
  Wifi, WifiOff, Info, Calculator, ExternalLink, Users,
  Hash, Shield, Crown, BarChart3, Network, Cpu, Database,
  Calendar, Clock, MapPin, Zap, TrendingUp, AlertTriangle
} from 'lucide-react';

import { botAPI, ShardInfo, GuildSearchResult, ApiResponse } from '@/lib/api/bot-client';

export default function ShardsSection() {
  const [searchGuildId, setSearchGuildId] = useState('');
  const [searchResult, setSearchResult] = useState<GuildSearchResult | null>(null);
  const [searching, setSearching] = useState(false);
  const [shardsData, setShardsData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'shards' | 'search'>('shards');
  const [usingFallback, setUsingFallback] = useState(false);
  const [apiStatus, setApiStatus] = useState<'online' | 'offline' | 'checking'>('checking');

  // Verificar estado de la API
  const checkApiStatus = async () => {
    try {
      const health = await botAPI.getHealth();
      setApiStatus(health.success !== false ? 'online' : 'offline');
    } catch (error) {
      setApiStatus('offline');
    }
  };

  // Cargar datos de shards
  const loadShardsData = async () => {
    try {
      setLoading(true);
      setRefreshing(true);
      console.log('🔍 Cargando datos de shards...');
      
      await checkApiStatus();
      
      const data = await botAPI.getAllShards();
      console.log('📊 Datos recibidos de /api/shards:', data);
      
      // Si hay error específico en la API
      if (data.error && data.error.includes('is not defined')) {
        console.warn('API devolvió error de función no implementada');
        setApiStatus('offline');
      }
      
      setShardsData(data);
      setUsingFallback(data.isFallback || false);
      
      // Si estamos usando fallback, mostrar información
      if (data.isFallback) {
        console.log('📋 Usando datos de demostración');
      }
    } catch (error: any) {
      console.error('❌ Error cargando datos de shards:', error);
      setApiStatus('offline');
      setShardsData({
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
        isFallback: true
      });
      setUsingFallback(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Buscar guild - Versión mejorada
  const handleSearchGuild = async () => {
    const guildId = searchGuildId.trim();
    
    if (!guildId) {
      setSearchError('Por favor ingresa un ID de guild');
      return;
    }

    // Validar formato
    if (!/^\d{17,20}$/.test(guildId)) {
      setSearchError('ID inválido. Los IDs de Discord tienen 17-20 dígitos');
      return;
    }

    setSearching(true);
    setSearchError(null);
    setActiveView('search');
    
    try {
      console.log(`🔍 Buscando guild ${guildId}...`);
      
      // Verificar API primero
      if (apiStatus === 'offline') {
        throw new Error('La API del bot está offline');
      }
      
      const result = await botAPI.searchGuild(guildId);
      console.log('🔍 Resultado completo de búsqueda:', result);
      
      // Manejar diferentes estructuras de respuesta
      if (result.success !== false) {
        // Extraer datos de diferentes ubicaciones posibles
        let searchData = result.data || result.result || result;
        
        // Si es una respuesta directa de la API, podría estar en result.data
        if (result.data && typeof result.data === 'object' && 'found' in result.data) {
          searchData = result.data;
        }
        
        if (searchData) {
          setSearchResult(searchData as GuildSearchResult);
          
          // Mostrar mensaje si son datos de fallback
          if (result.isFallback || result.fallbackMessage) {
            setSearchError(result.fallbackMessage || 'Usando datos de demostración');
          }
        } else {
          // Crear resultado de error estructurado
          setSearchResult({
            found: false,
            shardId: null,
            isCurrentShard: false,
            guildInfo: null,
            searchMethod: 'api_error',
            searchedAllShards: false,
            timestamp: new Date().toISOString(),
            error: 'La API no devolvió datos válidos de búsqueda',
            suggestions: [
              'La API del bot podría estar incompleta',
              'Intenta con otro ID de guild',
              'Verifica los logs del servidor'
            ]
          });
        }
      } else {
        // API devolvió error explícito
        setSearchResult({
          found: false,
          shardId: null,
          isCurrentShard: false,
          guildInfo: null,
          searchMethod: 'api_error',
          searchedAllShards: false,
          timestamp: new Date().toISOString(),
          error: result.error || 'Error en la API del bot',
          suggestions: [
            'Verifica que la API esté funcionando',
            'Revisa la consola del bot',
            'Contacta al administrador'
          ]
        });
      }
    } catch (error: any) {
      console.error('Error buscando guild:', error);
      
      // Crear un resultado de error detallado
      const errorResult: GuildSearchResult = {
        found: false,
        shardId: null,
        isCurrentShard: false,
        guildInfo: null,
        searchMethod: 'network_error',
        searchedAllShards: false,
        timestamp: new Date().toISOString(),
        error: error.message || 'Error de conexión con la API',
        suggestions: [
          'Verifica que la API del bot esté ejecutándose',
          'Asegúrate de que el puerto 3001 esté accesible',
          'Revisa la consola del bot para errores',
          'Verifica la configuración del proxy CORS'
        ]
      };
      
      setSearchResult(errorResult);
      setSearchError(`Error: ${error.message}`);
    } finally {
      setSearching(false);
    }
  };

  // Cargar datos iniciales
  useEffect(() => {
    loadShardsData();
  }, []);

  // Extraer datos de la respuesta de la API
  const apiResponse = shardsData;
  const shards: ShardInfo[] = apiResponse?.shards || apiResponse?.data?.shards || apiResponse?.data?.allShards || [];
  
  // Calcular los totales desde los shards individuales si el summary viene vacío
  const calculateTotals = () => {
    if (shards.length === 0) {
      return { 
        totalShards: 0, 
        onlineShards: 0, 
        offlineShards: 0, 
        totalGuilds: 0, 
        totalUsers: 0,
        totalChannels: 0,
        totalVoiceConnections: 0,
        averagePing: 0
      };
    }

    const totalGuilds = shards.reduce((sum, s) => sum + (s.guilds || 0), 0);
    const totalUsers = shards.reduce((sum, s) => sum + (s.users || 0), 0);
    const totalChannels = shards.reduce((sum, s) => sum + (s.channels || 0), 0);
    const totalVoiceConnections = shards.reduce((sum, s) => sum + (s.voiceConnections || 0), 0);
    const onlineShards = shards.filter(s => s.status === 'online').length;
    const totalShards = shards.length;
    
    // Calcular ping promedio solo de shards online
    const onlineShardsWithPing = shards.filter(s => s.status === 'online' && s.ping > 0);
    const averagePing = onlineShardsWithPing.length > 0 
      ? Math.round(onlineShardsWithPing.reduce((sum, s) => sum + s.ping, 0) / onlineShardsWithPing.length)
      : 0;

    return {
      totalShards,
      onlineShards,
      offlineShards: totalShards - onlineShards,
      totalGuilds,
      totalUsers,
      totalChannels,
      totalVoiceConnections,
      averagePing
    };
  };

  // Usar el summary de la API si existe, si no calcularlo
  const apiSummary = apiResponse?.data?.summary || apiResponse?.summary;
  const summary = apiSummary && apiSummary.totalShards > 0 
    ? apiSummary 
    : calculateTotals();

  const onlineShardsCount = summary.onlineShards || 0;
  const totalGuilds = summary.totalGuilds || 0;
  const totalUsers = summary.totalUsers || 0;
  const averagePing = summary.averagePing || 0;

  const getLoadBalanceStatus = () => {
    if (shards.length < 2) return { 
      status: 'Perfecto', 
      color: 'from-green-500 to-emerald-500',
      description: 'Solo hay un shard activo' 
    };
    
    const guildsPerShard = shards.map((s: ShardInfo) => s.guilds || 0).filter(g => g > 0);
    if (guildsPerShard.length === 0) return { 
      status: 'Perfecto', 
      color: 'from-green-500 to-emerald-500',
      description: 'Sin guilds activas para analizar' 
    };
    
    const avg = guildsPerShard.reduce((a, b) => a + b, 0) / guildsPerShard.length;
    const max = Math.max(...guildsPerShard);
    const min = Math.min(...guildsPerShard);
    const imbalance = ((max - min) / avg) * 100;
    
    if (imbalance < 10) return { 
      status: 'Excelente', 
      color: 'from-green-500 to-emerald-500',
      description: 'Distribución casi perfecta' 
    };
    if (imbalance < 25) return { 
      status: 'Buena', 
      color: 'from-green-400 to-cyan-500',
      description: 'Distribución balanceada' 
    };
    if (imbalance < 50) return { 
      status: 'Moderada', 
      color: 'from-yellow-500 to-orange-500',
      description: 'Podría mejorar la distribución' 
    };
    return { 
      status: 'Necesita rebalanceo', 
      color: 'from-red-500 to-pink-500',
      description: 'Distribución desbalanceada' 
    };
  };

  const loadBalance = getLoadBalanceStatus();

  const formatNumber = (num: number = 0) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const getUptimeString = (seconds: number) => {
    if (!seconds || seconds <= 0) return '0s';
    
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m`;
    return `${Math.floor(seconds)}s`;
  };

  if (loading && !shardsData) {
    return (
      <section className="mt-16">
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-400">Cargando información de shards...</p>
          <p className="text-sm text-gray-500 mt-2">Verificando conexión con la API</p>
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Sistema de Sharding
            </span>
          </h2>
          <p className="text-gray-400">
            Gestión y monitoreo de shards en tiempo real
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Indicador de estado API */}
          <Badge 
            variant="outline" 
            className={`gap-1 ${
              apiStatus === 'online' 
                ? 'bg-green-500/10 text-green-400 border-green-500/30' 
                : apiStatus === 'offline'
                ? 'bg-red-500/10 text-red-400 border-red-500/30'
                : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
            }`}
          >
            {apiStatus === 'online' ? (
              <Wifi className="h-3 w-3" />
            ) : apiStatus === 'offline' ? (
              <WifiOff className="h-3 w-3" />
            ) : (
              <Loader2 className="h-3 w-3 animate-spin" />
            )}
            API: {apiStatus === 'online' ? 'Online' : apiStatus === 'offline' ? 'Offline' : 'Verificando'}
          </Badge>
          
          {usingFallback && (
            <Badge variant="outline" className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30 gap-1">
              <Database className="h-3 w-3" />
              Datos de prueba
            </Badge>
          )}
          
          <Button
            variant="outline"
            onClick={() => {
              setRefreshing(true);
              loadShardsData();
            }}
            disabled={refreshing}
            className="gap-2 hover:scale-105 transition-all hover:bg-gray-800"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Actualizando...' : 'Actualizar'}
          </Button>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <Card className="border-gray-800 bg-gray-900/30">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Ingresa el ID de la guild para buscar (17-20 dígitos)"
                  value={searchGuildId}
                  onChange={(e) => {
                    setSearchGuildId(e.target.value);
                    setSearchError(null);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearchGuild();
                    }
                  }}
                  className="pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm text-gray-500">
                  Ejemplo: <code className="text-gray-400 bg-gray-800 px-2 py-0.5 rounded">123456789012345678</code>
                </p>
                <span className="text-xs text-gray-600">
                  {searchGuildId.length > 0 ? `${searchGuildId.length} dígitos` : ''}
                </span>
              </div>
            </div>
            <Button
              onClick={handleSearchGuild}
              disabled={searching || !searchGuildId.trim() || apiStatus === 'offline'}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 hover:scale-105 transition-all min-w-[140px]"
            >
              {searching ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Buscando...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Buscar Guild
                </>
              )}
            </Button>
          </div>
          
          {/* Mensajes de estado */}
          <div className="space-y-3 mt-4">
            {searchError && (
              <div className="p-4 bg-gradient-to-r from-red-900/20 to-red-800/10 border border-red-500/20 rounded-lg animate-fade-in">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-red-400 font-medium">Nota importante</p>
                    <p className="text-red-300 text-sm mt-1">{searchError}</p>
                  </div>
                </div>
              </div>
            )}

            {apiStatus === 'offline' && (
              <div className="p-4 bg-gradient-to-r from-red-900/20 to-orange-900/10 border border-red-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-orange-400 font-medium">API Offline</p>
                    <p className="text-orange-300 text-sm mt-1">
                      La API del bot no está disponible. Usando datos de demostración.
                      <br />
                      <span className="text-gray-400 text-xs">
                        Para usar la API real, asegúrate de que el bot esté ejecutándose y accesible en el puerto 3001.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {usingFallback && !searchError && apiStatus !== 'offline' && (
              <div className="p-4 bg-gradient-to-r from-yellow-900/20 to-amber-900/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-yellow-400 font-medium">Datos de demostración</p>
                    <p className="text-yellow-300 text-sm mt-1">
                      La API del bot está en desarrollo. Los datos mostrados son de prueba.
                      <br />
                      <span className="text-gray-400 text-xs">
                        Funcionalidades completas estarán disponibles cuando la API esté implementada.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Resultado de búsqueda */}
      {activeView === 'search' && searchResult && (
        <div className="animate-fade-in">
          <Card className="border border-gray-800 bg-gray-900/30">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-purple-400" />
                  Resultado de Búsqueda
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveView('shards')}
                  className="gap-2 hover:scale-105 transition-all hover:bg-gray-800"
                >
                  <ChevronRight className="h-4 w-4" />
                  Volver a shards
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <SearchResultContent 
                searchResult={searchResult} 
                searchGuildId={searchGuildId}
                apiStatus={apiStatus}
                isFallback={usingFallback}
              />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Vista de shards (predeterminada) */}
      {activeView === 'shards' && (
        <div className="space-y-6 animate-fade-in">
          {/* Resumen */}
          <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/10 border border-blue-500/20">
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-gray-900/40 rounded-xl hover:bg-gray-900/60 transition-all group">
                  <div className="text-3xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {summary.totalShards || 0}
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Shards Total</p>
                </div>
                <div className="text-center p-4 bg-gray-900/40 rounded-xl hover:bg-gray-900/60 transition-all group">
                  <div className="text-3xl font-bold text-green-400 group-hover:text-green-300 transition-colors">
                    {onlineShardsCount || 0}
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Online</p>
                </div>
                <div className="text-center p-4 bg-gray-900/40 rounded-xl hover:bg-gray-900/60 transition-all group">
                  <div className="text-3xl font-bold text-red-400 group-hover:text-red-300 transition-colors">
                    {summary.offlineShards || 0}
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Offline</p>
                </div>
                <div className="text-center p-4 bg-gray-900/40 rounded-xl hover:bg-gray-900/60 transition-all group">
                  <div className="text-3xl font-bold group-hover:text-purple-300 transition-colors">
                    {formatNumber(totalGuilds || 0)}
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Guilds</p>
                </div>
                <div className="text-center p-4 bg-gray-900/40 rounded-xl hover:bg-gray-900/60 transition-all group">
                  <div className="text-3xl font-bold group-hover:text-cyan-300 transition-colors">
                    {formatNumber(totalUsers || 0)}
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Usuarios</p>
                </div>
              </div>
              
              {/* Estadísticas adicionales */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="p-3 bg-gray-900/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-400" />
                    <p className="text-sm text-gray-400">Ping Promedio</p>
                  </div>
                  <p className="text-xl font-bold mt-1">{averagePing}ms</p>
                </div>
                <div className="p-3 bg-gray-900/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-green-400" />
                    <p className="text-sm text-gray-400">Conect. Voz</p>
                  </div>
                  <p className="text-xl font-bold mt-1">{summary.totalVoiceConnections || 0}</p>
                </div>
                <div className="p-3 bg-gray-900/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-purple-400" />
                    <p className="text-sm text-gray-400">Canales</p>
                  </div>
                  <p className="text-xl font-bold mt-1">{formatNumber(summary.totalChannels || 0)}</p>
                </div>
                <div className="p-3 bg-gray-900/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-yellow-400" />
                    <p className="text-sm text-gray-400">Balance</p>
                  </div>
                  <p className="text-xl font-bold mt-1">{loadBalance.status}</p>
                </div>
              </div>
              
              {/* Información del balance */}
              <div className="mt-6 p-4 bg-gray-900/40 rounded-xl border border-gray-800/50">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`h-3 w-3 rounded-full bg-gradient-to-r ${loadBalance.color}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium">Balance de Carga: {loadBalance.status}</p>
                        <Badge variant="outline" className="text-xs bg-gray-800">
                          Shards: {shards.length}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400">
                        {loadBalance.description}
                      </p>
                      
                      {/* Barra de progreso para distribución */}
                      {shards.length > 0 && totalGuilds > 0 && (
                        <div className="mt-3">
                          <div className="flex text-xs text-gray-500 mb-1">
                            <span>Distribución de Guilds</span>
                            <span className="ml-auto">{totalGuilds} total</span>
                          </div>
                          <div className="h-2 bg-gray-800 rounded-full overflow-hidden flex">
                            {shards.map((shard, index) => {
                              const percentage = totalGuilds > 0 ? (shard.guilds / totalGuilds) * 100 : 0;
                              return (
                                <div 
                                  key={shard.shardId}
                                  className={`h-full ${
                                    shard.status === 'online' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                                    shard.status === 'offline' ? 'bg-gray-700' :
                                    'bg-gradient-to-r from-yellow-500 to-orange-500'
                                  }`}
                                  style={{ width: `${percentage}%` }}
                                  title={`Shard ${shard.shardId}: ${shard.guilds} guilds (${percentage.toFixed(1)}%)`}
                                />
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Timestamp de actualización */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-800/50">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calculator className="h-3 w-3" />
                    <span>Estado API: {apiStatus === 'online' ? 'Conectado' : 'Simulación'}</span>
                  </div>
                  {apiResponse?.timestamp && (
                    <div className="text-xs text-gray-600">
                      <Clock className="h-3 w-3 inline mr-1" />
                      Actualizado: {new Date(apiResponse.timestamp).toLocaleTimeString('es-ES')}
                    </div>
                  )}
                </div>
              </div>

              {/* Error de API si existe */}
              {apiResponse?.error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-red-400 font-medium">Error en la API</p>
                      <p className="text-red-300 text-sm mt-1">{apiResponse.error}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Lista de Shards */}
          {shards.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Network className="h-5 w-5 text-blue-400" />
                  Shards Activos
                  <Badge variant="outline" className="ml-2">
                    {shards.length} total
                  </Badge>
                </h3>
                <div className="text-sm text-gray-500">
                  {onlineShardsCount} online • {summary.offlineShards || 0} offline
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {shards.map((shard: ShardInfo) => (
                  <ShardCard 
                    key={shard.shardId} 
                    shard={shard} 
                    isFallback={usingFallback}
                    apiStatus={apiStatus}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl border border-gray-800">
              <Server className="h-20 w-20 text-gray-600 mx-auto mb-6 opacity-50" />
              <h3 className="text-2xl font-bold text-gray-300 mb-3">
                {apiResponse?.success === false ? '⚠️ Error cargando shards' : 'No hay shards disponibles'}
              </h3>
              <p className="text-gray-400 max-w-md mx-auto">
                {apiResponse?.error || 'La API no está devolviendo datos de shards.'}
                <br />
                <span className="text-sm text-gray-500">
                  Estado de API: {apiStatus === 'online' ? 'Conectado' : 'Offline'}
                </span>
              </p>
              <Button 
                variant="outline" 
                className="mt-6 gap-2 hover:scale-105 transition-all"
                onClick={loadShardsData}
              >
                <RefreshCw className="h-4 w-4" />
                Intentar nuevamente
              </Button>
            </div>
          )}

          {/* Información de distribución detallada */}
          {shards.length > 0 && totalGuilds > 0 && (
            <Card className="border-gray-800 bg-gray-900/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-purple-400" />
                  Distribución de Guilds por Shard
                  <Badge variant="outline" className="ml-2">
                    {totalGuilds} guilds total
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {shards.map((shard: ShardInfo) => {
                    const percentage = totalGuilds > 0 ? (shard.guilds / totalGuilds) * 100 : 0;
                    const usersPerGuild = shard.guilds > 0 ? Math.round(shard.users / shard.guilds) : 0;
                    
                    return (
                      <div key={shard.shardId} className="group p-4 bg-gray-900/40 rounded-xl hover:bg-gray-800/40 transition-all">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`h-3 w-3 rounded-full ${
                              shard.status === 'online' ? 'bg-green-500 animate-pulse' : 
                              shard.status === 'offline' ? 'bg-red-500' : 
                              'bg-yellow-500'
                            }`} />
                            <div>
                              <span className="font-medium">Shard {shard.shardId}</span>
                              <span className="text-sm text-gray-500 ml-2">
                                {shard.status === 'online' ? '🟢 Online' : 
                                 shard.status === 'offline' ? '🔴 Offline' : 
                                 '🟡 Desconocido'}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold">{shard.guilds || 0}</div>
                            <div className="text-xs text-gray-500">guilds</div>
                          </div>
                        </div>
                        
                        {/* Barra de progreso con información detallada */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">
                              {percentage.toFixed(1)}% del total
                            </span>
                            <span className="text-gray-400">
                              ~{usersPerGuild} usuarios/guild
                            </span>
                          </div>
                          <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-700 ${
                                shard.status === 'online' 
                                  ? 'bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500' 
                                  : shard.status === 'offline'
                                  ? 'bg-gradient-to-r from-gray-600 to-gray-700'
                                  : 'bg-gradient-to-r from-yellow-500 to-orange-500'
                              }`}
                              style={{ 
                                width: `${percentage}%`,
                                transition: 'width 1s ease-in-out'
                              }}
                            />
                          </div>
                          
                          {/* Información adicional en hover */}
                          <div className="hidden group-hover:block pt-3 mt-3 border-t border-gray-800/50">
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <p className="text-gray-400">Usuarios</p>
                                <p className="font-medium">{formatNumber(shard.users || 0)}</p>
                              </div>
                              <div>
                                <p className="text-gray-400">Ping</p>
                                <p className="font-medium">{shard.ping || 0}ms</p>
                              </div>
                              <div>
                                <p className="text-gray-400">Uptime</p>
                                <p className="font-medium">{getUptimeString(shard.uptime)}</p>
                              </div>
                              <div>
                                <p className="text-gray-400">Memoria</p>
                                <p className="font-medium">{Math.round(shard.memory || 0)} MB</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

// Componente de tarjeta de shard mejorado
function ShardCard({ 
  shard, 
  isFallback = false, 
  apiStatus = 'online' 
}: { 
  shard: ShardInfo, 
  isFallback?: boolean,
  apiStatus?: 'online' | 'offline' | 'checking'
}) {
  const formatNumber = (num: number = 0) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const getUptimeString = (seconds: number) => {
    if (!seconds || seconds <= 0) return '0s';
    
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'offline': return 'Offline';
      default: return 'Desconocido';
    }
  };

  return (
    <Card className={`border-gray-800 hover:border-blue-500/40 transition-all hover:scale-[1.02] group ${
      isFallback ? 'opacity-90' : ''
    } ${shard.status === 'online' ? 'hover:shadow-blue-500/10' : 'hover:shadow-gray-500/10'} hover:shadow-xl`}>
      <CardContent className="pt-6">
        {/* Header con estado */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className={`h-3 w-3 rounded-full animate-pulse ${getStatusColor(shard.status)}`} />
            <div>
              <h3 className="font-bold text-lg">Shard {shard.shardId}</h3>
              <p className="text-xs text-gray-500">{getStatusText(shard.status)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isFallback && (
              <Badge variant="outline" className="text-xs bg-yellow-500/10 text-yellow-400 border-yellow-500/30">
                <Database className="h-2.5 w-2.5 mr-1" />
                Demo
              </Badge>
            )}
            <Badge variant={
              shard.status === 'online' ? 'success' :
              shard.status === 'offline' ? 'destructive' :
              'outline'
            } className="gap-1">
              {shard.status === 'online' && <CheckCircle className="h-3 w-3" />}
              {shard.status === 'offline' && <XCircle className="h-3 w-3" />}
              {getStatusText(shard.status)}
            </Badge>
          </div>
        </div>
        
        {/* Estadísticas principales */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <Server className="h-3.5 w-3.5 text-blue-400" />
              <p className="text-xs text-gray-400">Guilds</p>
            </div>
            <p className="text-2xl font-bold">{shard.guilds || 0}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-purple-400" />
              <p className="text-xs text-gray-400">Usuarios</p>
            </div>
            <p className="text-2xl font-bold">{formatNumber(shard.users || 0)}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-green-400" />
              <p className="text-xs text-gray-400">Ping</p>
            </div>
            <p className="text-2xl font-bold">{shard.ping || 0}<span className="text-sm text-gray-500">ms</span></p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5 text-cyan-400" />
              <p className="text-xs text-gray-400">Memoria</p>
            </div>
            <p className="text-2xl font-bold">{Math.round(shard.memory || 0)}<span className="text-sm text-gray-500">MB</span></p>
          </div>
        </div>
        
        {/* Estadísticas secundarias */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center justify-between p-2 bg-gray-900/40 rounded-lg">
            <span className="text-gray-400">Uptime</span>
            <span className="font-medium">{getUptimeString(shard.uptime)}</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-gray-900/40 rounded-lg">
            <span className="text-gray-400">Canales</span>
            <span className="font-medium">{shard.channels || 0}</span>
          </div>
          {shard.voiceConnections !== undefined && (
            <div className="flex items-center justify-between p-2 bg-gray-900/40 rounded-lg">
              <span className="text-gray-400">Voz</span>
              <span className="font-medium">{shard.voiceConnections}</span>
            </div>
          )}
          {shard.cpuUsage !== undefined && (
            <div className="flex items-center justify-between p-2 bg-gray-900/40 rounded-lg">
              <span className="text-gray-400">CPU</span>
              <span className="font-medium">{shard.cpuUsage.toFixed(1)}%</span>
            </div>
          )}
        </div>
        
        {/* Footer con información adicional */}
        <div className="mt-4 pt-4 border-t border-gray-800/50 text-xs text-gray-500 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3" />
            {shard.lastUpdate ? (
              <span>Actualizado: {new Date(shard.lastUpdate).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
            ) : (
              <span>Sin datos de actualización</span>
            )}
          </div>
          {apiStatus === 'offline' && (
            <span className="text-yellow-400">Simulado</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Componente de resultado de búsqueda mejorado
function SearchResultContent({ 
  searchResult, 
  searchGuildId,
  apiStatus = 'online',
  isFallback = false
}: { 
  searchResult: GuildSearchResult, 
  searchGuildId: string,
  apiStatus?: 'online' | 'offline' | 'checking',
  isFallback?: boolean
}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Fecha inválida';
    }
  };

  if (!searchResult.found) {
    return (
      <div className="p-6 bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-500/30 rounded-xl">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-500/20 rounded-full flex-shrink-0">
            <XCircle className="h-6 w-6 text-red-400" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-semibold text-red-300 mb-3">
              Guild no encontrada
            </h4>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-300 mb-2">
                  <span className="font-medium text-red-400">ID buscado:</span>
                </p>
                <div className="flex items-center gap-2">
                  <code className="font-mono text-base bg-gray-900 px-3 py-2 rounded flex-1">
                    {searchGuildId}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(searchGuildId)}
                    className="h-9 w-9 p-0 hover:bg-gray-700"
                    title="Copiar ID"
                  >
                    {copied ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <Copy className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
              
              {searchResult.error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-red-300">Detalles del error:</p>
                      <p className="text-red-200 text-sm mt-1">{searchResult.error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {searchResult.suggestions && searchResult.suggestions.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-gray-400 mb-3">
                    ¿Qué puedes hacer?
                  </p>
                  <ul className="space-y-2">
                    {searchResult.suggestions.map((suggestion: string, index: number) => (
                      <li key={index} className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors">
                        <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="pt-4 border-t border-gray-800/50">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Hash className="h-3 w-3" />
                    <span>Método: {searchResult.searchMethod || 'desconocido'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    <span>{formatDate(searchResult.timestamp)}</span>
                  </div>
                </div>
                {isFallback && (
                  <div className="mt-3 p-2 bg-yellow-500/10 rounded text-center">
                    <p className="text-xs text-yellow-400">
                      ⚠️ Este resultado usa datos de demostración
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con ID y estado */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-sm text-gray-400 mb-2">Guild ID</p>
          <div className="flex items-center gap-3">
            <code className="font-mono text-lg bg-gray-800 px-4 py-2.5 rounded-lg flex-1">
              {searchResult.guildInfo?.id || searchGuildId}
            </code>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(searchResult.guildInfo?.id || searchGuildId)}
                className="h-10 w-10 p-0 hover:bg-gray-700 hover:scale-105 transition-all"
                title="Copiar ID"
              >
                {copied ? (
                  <CheckCircle className="h-4 w-4 text-green-400" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-400" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-10 w-10 p-0 hover:bg-gray-700 hover:scale-105 transition-all"
                title="Abrir en Discord"
                disabled
              >
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </Button>
            </div>
          </div>
        </div>
        
        <Badge 
          variant="success"
          className="px-5 py-2 text-base gap-2"
        >
          <CheckCircle className="h-4 w-4" />
          ENCONTRADA
        </Badge>
      </div>

      {/* Información del Shard */}
      <div className="p-5 bg-gradient-to-r from-blue-900/20 to-cyan-900/10 rounded-xl border border-blue-500/20">
        <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
          <Server className="h-5 w-5 text-blue-400" />
          Información del Shard
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-gray-900/40 rounded-lg">
            <p className="text-sm text-gray-400 mb-1">ID del Shard</p>
            <div className="flex items-center gap-3">
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-base px-3 py-1">
                <Hash className="h-3.5 w-3.5 mr-1.5" />
                Shard {searchResult.shardId}
              </Badge>
              {searchResult.isCurrentShard && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-sm">
                  <Crown className="h-3 w-3 mr-1" />
                  Actual
                </Badge>
              )}
            </div>
          </div>
          <div className="p-3 bg-gray-900/40 rounded-lg">
            <p className="text-sm text-gray-400 mb-1">Estado</p>
            <Badge 
              variant="success"
              className="gap-1.5 text-base px-3 py-1"
            >
              <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
              online
            </Badge>
          </div>
          <div className="p-3 bg-gray-900/40 rounded-lg">
            <p className="text-sm text-gray-400 mb-1">Método de búsqueda</p>
            <p className="font-medium text-lg capitalize">
              {searchResult.searchMethod?.replace(/_/g, ' ') || 'directo'}
            </p>
          </div>
          <div className="p-3 bg-gray-900/40 rounded-lg">
            <p className="text-sm text-gray-400 mb-1">Shards verificados</p>
            <p className="font-medium text-lg">
              {searchResult.otherShardsSearched || 1}
            </p>
          </div>
        </div>
      </div>

      {/* Información de la Guild */}
      {searchResult.guildInfo && (
        <div className="p-5 bg-gradient-to-r from-purple-900/20 to-pink-900/10 rounded-xl border border-purple-500/20">
          <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
            <Globe className="h-5 w-5 text-purple-400" />
            Información del Servidor
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-3 bg-gray-900/40 rounded-lg">
              <p className="text-sm text-gray-400 mb-1">Nombre</p>
              <p className="font-medium text-lg">{searchResult.guildInfo.name || 'Desconocido'}</p>
            </div>
            <div className="p-3 bg-gray-900/40 rounded-lg">
              <div className="flex items-center gap-1.5 mb-1">
                <Users className="h-3.5 w-3.5 text-gray-400" />
                <p className="text-sm text-gray-400">Miembros</p>
              </div>
              <p className="font-medium text-lg">{searchResult.guildInfo.members?.toLocaleString() || 0}</p>
            </div>
            <div className="p-3 bg-gray-900/40 rounded-lg">
              <div className="flex items-center gap-1.5 mb-1">
                <Calendar className="h-3.5 w-3.5 text-gray-400" />
                <p className="text-sm text-gray-400">Creado</p>
              </div>
              <p className="font-medium text-sm">
                {formatDate(searchResult.guildInfo.created)}
              </p>
            </div>
            <div className="p-3 bg-gray-900/40 rounded-lg">
              <div className="flex items-center gap-1.5 mb-1">
                <MapPin className="h-3.5 w-3.5 text-gray-400" />
                <p className="text-sm text-gray-400">Región</p>
              </div>
              <p className="font-medium">{searchResult.guildInfo.region || 'Desconocida'}</p>
            </div>
            {searchResult.guildInfo.boostLevel !== undefined && (
              <div className="p-3 bg-gray-900/40 rounded-lg">
                <div className="flex items-center gap-1.5 mb-1">
                  <Zap className="h-3.5 w-3.5 text-gray-400" />
                  <p className="text-sm text-gray-400">Nivel de Boost</p>
                </div>
                <p className="font-medium text-lg">{searchResult.guildInfo.boostLevel || 0}</p>
              </div>
            )}
            {searchResult.guildInfo.boostCount !== undefined && (
              <div className="p-3 bg-gray-900/40 rounded-lg">
                <div className="flex items-center gap-1.5 mb-1">
                  <BarChart3 className="h-3.5 w-3.5 text-gray-400" />
                  <p className="text-sm text-gray-400">Boosts</p>
                </div>
                <p className="font-medium text-lg">{searchResult.guildInfo.boostCount || 0}</p>
              </div>
            )}
            <div className="p-3 bg-gray-900/40 rounded-lg">
              <div className="flex items-center gap-1.5 mb-1">
                <Hash className="h-3.5 w-3.5 text-gray-400" />
                <p className="text-sm text-gray-400">Canales</p>
              </div>
              <p className="font-medium text-lg">{searchResult.guildInfo.channels || 0}</p>
            </div>
            <div className="p-3 bg-gray-900/40 rounded-lg">
              <div className="flex items-center gap-1.5 mb-1">
                <Shield className="h-3.5 w-3.5 text-gray-400" />
                <p className="text-sm text-gray-400">Roles</p>
              </div>
              <p className="font-medium text-lg">{searchResult.guildInfo.roles || 0}</p>
            </div>
            <div className="p-3 bg-gray-900/40 rounded-lg">
              <div className="flex items-center gap-1.5 mb-1">
                <Crown className="h-3.5 w-3.5 text-gray-400" />
                <p className="text-sm text-gray-400">Emojis</p>
              </div>
              <p className="font-medium text-lg">{searchResult.guildInfo.emojis || 0}</p>
            </div>
          </div>
          
          {searchResult.guildInfo.description && (
            <div className="mt-4 p-4 bg-gray-900/40 rounded-lg">
              <p className="text-sm text-gray-400 mb-2">Descripción</p>
              <p className="text-gray-300 italic">"{searchResult.guildInfo.description}"</p>
            </div>
          )}
        </div>
      )}

      {/* Información de búsqueda */}
      <div className="p-4 bg-gray-900/30 rounded-xl border border-gray-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <Network className="h-3.5 w-3.5" />
                Método: <span className="text-gray-300 font-medium capitalize">
                  {searchResult.searchMethod?.replace(/_/g, ' ') || 'directo'}
                </span>
              </span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5" />
                Verificación: <span className="text-gray-300 font-medium">
                  {searchResult.searchedAllShards ? 
                    'Completa' : 'Parcial'}
                </span>
              </span>
            </div>
            <div className="text-xs text-gray-500">
              ID de búsqueda: {searchResult.guildInfo?.id || searchGuildId}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm text-gray-500 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              Buscado: <span className="text-gray-400">
                {formatDate(searchResult.timestamp)}
              </span>
            </span>
            {isFallback && (
              <Badge variant="outline" className="mt-2 bg-yellow-500/10 text-yellow-400 border-yellow-500/30 text-xs">
                <Database className="h-2.5 w-2.5 mr-1" />
                Datos de demostración
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}