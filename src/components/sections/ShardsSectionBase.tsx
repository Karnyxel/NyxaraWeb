// src/components/sections/ShardsSection.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  Server, 
  Search,
  Activity,
  Cpu,
  Wifi,
  Globe,
  Users,
  Zap,
  Info,
  ExternalLink,
  AlertCircle,
  ChevronRight,
  Hash,
  Gauge,
  RefreshCw,
  Shield,
  Database,
  CheckCircle,
  XCircle,
  Loader2,
  MapPin,
  Users as UsersIcon,
  Calendar,
  Target,
  Home,
  Crown
} from 'lucide-react';

interface ShardInfo {
  id: number;
  status: string;
  guilds: number;
  users: number;
  ping: number;
  uptime: string;
  memory: string;
  online: boolean;
}

interface GuildSearchResult {
  success: boolean;
  timestamp: string;
  source: 'real' | 'estimated' | 'simulated';
  data: {
    guildId: string;
    found: boolean;
    shard?: {
      id: number;
      status: string;
      isCurrentShard?: boolean;
      isEstimated?: boolean;
    };
    guildInfo?: {
      id: string;
      name?: string;
      icon?: string;
      members?: number;
      ownerId?: string;
      created?: string;
      region?: string;
      note?: string;
    };
    searchDetails: {
      method: string;
      calculation?: string;
      totalShards?: number;
      accuracy: string;
      note?: string;
      searchedAllShards?: boolean;
      totalShardsSearched?: number;
      foundVia?: string;
    };
    error?: string;
    suggestions?: string[];
  };
}
interface ShardData {
  id: number;
  status: string;
  guilds: number;
  users: number;
  ping: number;
  uptime: string;
  memory: string;
  online: boolean;
}
export default function ShardsSection() {
  const [shardsData, setShardsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchGuild, setSearchGuild] = useState('');
  const [searchResult, setSearchResult] = useState<GuildSearchResult | null>(null);
  const [searching, setSearching] = useState(false);
  const [activeTab, setActiveTab] = useState<'shards' | 'search'>('shards');
  const [refreshing, setRefreshing] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  useEffect(() => {
    loadShards();
    const interval = setInterval(loadShards, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadShards = async (showLoading = false) => {
    try {
      if (showLoading) setRefreshing(true);
      setLoading(true);
      
      const response = await fetch('/api/stats');
      const data = await response.json();
      
      if (data.success) {
        setShardsData(data);
      }
    } catch (error) {
      console.error('Error loading shards:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const searchGuildById = async () => {
    if (!searchGuild.trim()) {
      setSearchError('Por favor ingresa un ID de guild');
      return;
    }

    // Validar formato básico
    if (!/^\d{17,20}$/.test(searchGuild.trim())) {
      setSearchError('ID inválido. Los IDs de Discord tienen 17-20 dígitos');
      return;
    }

    setSearching(true);
    setSearchError(null);
    setSearchResult(null);

    try {
      const response = await fetch(`/api/find-guild?guildId=${searchGuild.trim()}`);
      const data = await response.json();
      
      if (data.success) {
        setSearchResult(data);
      } else {
        setSearchError(data.error || 'Error buscando guild');
      }
    } catch (error: any) {
      console.error('Error searching guild:', error);
      setSearchError('Error de conexión. Intenta nuevamente.');
    } finally {
      setSearching(false);
    }
  };

  const shards: ShardData[] = shardsData?.data?.sharding?.shards || [];
  const summary = shardsData?.data?.sharding?.summary || { 
    totalShards: 0, 
    onlineShards: 0, 
    offlineShards: 0, 
    totalGuilds: 0, 
    totalUsers: 0 
  };

  const onlineShards = summary.onlineShards;
  const totalGuilds = summary.totalGuilds;

  const getLoadBalanceStatus = () => {
    if (shards.length < 2) return 'Perfecto';
    
    const guildsPerShard = shards.map((s: ShardData) => s.guilds).filter(g => g > 0);
    if (guildsPerShard.length === 0) return 'Perfecto';
    
    const avg = guildsPerShard.reduce((a, b) => a + b, 0) / guildsPerShard.length;
    const max = Math.max(...guildsPerShard);
    const min = Math.min(...guildsPerShard);
    const imbalance = ((max - min) / avg) * 100;
    
    if (imbalance < 10) return 'Excelente';
    if (imbalance < 25) return 'Buena';
    if (imbalance < 50) return 'Moderada';
    return 'Necesita rebalanceo';
  };

  const getLoadBalanceColor = (status: string) => {
    switch (status) {
      case 'Excelente': return 'from-green-500 to-emerald-500';
      case 'Buena': return 'from-green-400 to-cyan-500';
      case 'Moderada': return 'from-yellow-500 to-orange-500';
      default: return 'from-red-500 to-pink-500';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Desconocida';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  if (loading && !shardsData) {
    return (
      <section className="mt-16">
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-400">Cargando información de shards...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-16">
      <div className="text-center mb-8">
        <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-cyan-500">
          <Server className="h-3 w-3 mr-2" />
          Sistema de Sharding {shardsData?.source === 'real' ? '⚡' : '📊'}
        </Badge>
        <h2 className="text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
            Distribución Inteligente
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          {shardsData?.source === 'real' 
            ? 'Datos en vivo de la distribución de shards'
            : 'Datos de demostración - Conectando con API...'}
        </p>
        
        <div className="flex items-center justify-center gap-4 mt-4">
          <Badge variant="outline" className={
            shardsData?.source === 'real'
              ? 'bg-green-500/10 text-green-400 border-green-500/30'
              : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
          }>
            {shardsData?.source === 'real' ? 'Datos en vivo' : 'Datos simulados'}
          </Badge>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => loadShards(true)}
            disabled={refreshing}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Actualizar
          </Button>
        </div>
      </div>

      <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Panel de Shards
              {shardsData?.source === 'real' && (
                <Badge size="sm" className="bg-green-500/10 text-green-400 ml-2">
                  Live
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className={
                onlineShards > 0 
                  ? 'bg-green-500/10 text-green-400' 
                  : 'bg-red-500/10 text-red-400'
              }>
                <Wifi className="h-3 w-3 mr-1" />
                {onlineShards}/{summary.totalShards} Online
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          {/* Tabs */}
          <div className="flex border-b border-gray-800 mb-6">
            <button
              onClick={() => setActiveTab('shards')}
              className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-all ${
                activeTab === 'shards'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <Server className="h-4 w-4" />
              Shards ({shards.length})
            </button>
            <button
              onClick={() => setActiveTab('search')}
              className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-all ${
                activeTab === 'search'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <Target className="h-4 w-4" />
              Buscar Guild
            </button>
          </div>

          {activeTab === 'shards' ? (
            <>
              {/* Stats Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-400">
                    {onlineShards}/{summary.totalShards}
                  </div>
                  <div className="text-sm text-gray-400 flex items-center gap-1">
                    <Wifi className="h-3 w-3" />
                    Online
                  </div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="text-2xl font-bold">
                    {totalGuilds}
                  </div>
                  <div className="text-sm text-gray-400 flex items-center gap-1">
                    <Server className="h-3 w-3" />
                    Guilds total
                  </div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="text-2xl font-bold">
                    {summary.totalShards > 1 ? 'Sharding' : 'Single'}
                  </div>
                  <div className="text-sm text-gray-400 flex items-center gap-1">
                    <Hash className="h-3 w-3" />
                    Modo
                  </div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <div className="text-2xl font-bold">
                    {getLoadBalanceStatus()}
                  </div>
                  <div className="text-sm text-gray-400 flex items-center gap-1">
                    <Gauge className="h-3 w-3" />
                    Balance
                  </div>
                </div>
              </div>

              {/* Shards Grid */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Shards Activos</h3>
                  <span className="text-sm text-gray-400">
                    {totalGuilds} guilds distribuidas
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {shards.map(shard => (
                    <div
                      key={shard.id}
                      className={`relative group p-3 rounded-lg border transition-all cursor-pointer ${
                        shard.online 
                          ? 'border-green-500/30 bg-green-500/5 hover:bg-green-500/10' 
                          : 'border-red-500/30 bg-red-500/5 hover:bg-red-500/10'
                      }`}
                    >
                      {/* Hover Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-50">
                        <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-2xl p-3 min-w-[200px]">
                          <div className="font-semibold text-sm mb-2">Shard #{shard.id}</div>
                          <div className="text-xs space-y-1">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Estado:</span>
                              <Badge size="sm" className={
                                shard.online ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                              }>
                                {shard.status}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Guilds:</span>
                              <span>{shard.guilds} ({totalGuilds > 0 ? ((shard.guilds / totalGuilds) * 100).toFixed(1) : 0}%)</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Usuarios:</span>
                              <span>{shard.users.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Ping:</span>
                              <span className={
                                shard.ping < 100 ? 'text-green-400' :
                                shard.ping < 200 ? 'text-yellow-400' : 'text-red-400'
                              }>{shard.ping}ms</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Memoria:</span>
                              <span>{shard.memory}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Uptime:</span>
                              <span>{shard.uptime}</span>
                            </div>
                          </div>
                        </div>
                        <div className="absolute w-2 h-2 bg-gray-900 border-r border-b border-gray-800 transform rotate-45 top-full left-1/2 -translate-x-1/2 -mt-1" />
                      </div>

                      {/* Shard Card */}
                      <div className="flex items-center justify-between mb-2">
                        <div className={`w-2 h-2 rounded-full ${shard.online ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                        <span className="text-xs text-gray-400 font-mono">#{shard.id}</span>
                      </div>
                      <div className="text-center mb-2">
                        <div className="text-xl font-bold">{shard.guilds}</div>
                        <div className="text-xs text-gray-400">guilds</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-sm ${shard.online ? 'text-green-400' : 'text-red-400'}`}>
                          {shard.online ? '● Online' : '○ Offline'}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{shard.ping}ms</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

{/* Balance Indicator - MEJORADO */}
<div className="bg-gradient-to-br from-gray-900 to-black/50 rounded-xl p-5 border border-gray-800 hover:border-blue-500/30 transition-all">
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
        <Gauge className="h-5 w-5 text-blue-400" />
      </div>
      <div>
        <h3 className="font-semibold text-lg">Balance de Distribución</h3>
        <p className="text-sm text-gray-400">Distribución de guilds entre shards</p>
      </div>
    </div>
    
    <div className="flex items-center gap-3">
      <Badge variant="outline" className={`text-sm px-3 py-1 bg-gradient-to-r ${getLoadBalanceColor(getLoadBalanceStatus())} bg-clip-text text-transparent border-gray-700`}>
        {getLoadBalanceStatus()}
      </Badge>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${
          getLoadBalanceStatus() === 'Perfecto' || getLoadBalanceStatus() === 'Excelente' ? 'bg-green-500' :
          getLoadBalanceStatus() === 'Buena' ? 'bg-yellow-500' :
          getLoadBalanceStatus() === 'Moderada' ? 'bg-orange-500' : 'bg-red-500'
        }`} />
        <span className="text-xs text-gray-400">
          {shards.length > 0 ? Math.max(...shards.map(s => s.guilds)) - Math.min(...shards.filter(s => s.guilds > 0).map(s => s.guilds) || [0]) : 0} diff
        </span>
      </div>
    </div>
  </div>
  
  {/* Barra de progreso con tooltips */}
  <div className="relative mb-3">
    <div className="h-3 bg-gray-800/50 rounded-full overflow-hidden">
      <div 
        className={`h-full bg-gradient-to-r ${getLoadBalanceColor(getLoadBalanceStatus())} rounded-full transition-all duration-700`}
        style={{ 
          width: getLoadBalanceStatus() === 'Perfecto' ? '98%' :
                getLoadBalanceStatus() === 'Excelente' ? '92%' :
                getLoadBalanceStatus() === 'Buena' ? '80%' :
                getLoadBalanceStatus() === 'Moderada' ? '60%' : '35%'
        }}
      />
    </div>
    
    {/* Marcadores de calidad */}
    <div className="absolute top-0 left-0 w-full h-3 flex justify-between px-1">
      {['Perfecto', 'Excelente', 'Buena', 'Moderada', 'Crítico'].map((label, idx) => (
        <div key={label} className="relative group">
          <div className={`w-1 h-3 ${idx * 25 <= 
            (getLoadBalanceStatus() === 'Perfecto' ? 100 :
             getLoadBalanceStatus() === 'Excelente' ? 90 :
             getLoadBalanceStatus() === 'Buena' ? 70 :
             getLoadBalanceStatus() === 'Moderada' ? 50 : 30) ? 'bg-white/30' : 'bg-gray-700/30'}`} />
          
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 hidden group-hover:block z-10">
            <div className="bg-gray-900 border border-gray-800 px-2 py-1 rounded text-xs whitespace-nowrap">
              {label}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  {/* Métricas detalladas */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
    <div className="bg-gray-900/30 rounded-lg p-3">
      <div className="text-xs text-gray-400 mb-1">Shard más cargado</div>
      <div className="font-bold text-lg">
        {shards.length > 0 ? Math.max(...shards.map(s => s.guilds)) : 0}
        <span className="text-xs text-gray-400 ml-1">guilds</span>
      </div>
    </div>
    
    <div className="bg-gray-900/30 rounded-lg p-3">
      <div className="text-xs text-gray-400 mb-1">Shard más ligero</div>
      <div className="font-bold text-lg">
        {shards.length > 0 ? Math.min(...shards.filter(s => s.guilds > 0).map(s => s.guilds) || [0]) : 0}
        <span className="text-xs text-gray-400 ml-1">guilds</span>
      </div>
    </div>
    
    <div className="bg-gray-900/30 rounded-lg p-3">
      <div className="text-xs text-gray-400 mb-1">Promedio</div>
      <div className="font-bold text-lg">
        {shards.length > 0 ? Math.round(shards.reduce((a, b) => a + b.guilds, 0) / shards.filter(s => s.guilds > 0).length) : 0}
        <span className="text-xs text-gray-400 ml-1">guilds</span>
      </div>
    </div>
    
    <div className="bg-gray-900/30 rounded-lg p-3">
      <div className="text-xs text-gray-400 mb-1">Diferencia</div>
      <div className="font-bold text-lg">
        {shards.length > 0 ? Math.max(...shards.map(s => s.guilds)) - Math.min(...shards.filter(s => s.guilds > 0).map(s => s.guilds) || [0]) : 0}
        <span className="text-xs text-gray-400 ml-1">guilds</span>
      </div>
    </div>
  </div>
  
  {/* Notas informativas */}
  <div className="mt-4 pt-4 border-t border-gray-800">
    <div className="flex items-start gap-2">
      <Info className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
      <p className="text-xs text-gray-400">
        {getLoadBalanceStatus() === 'Perfecto' ? 'La distribución es óptima. Todos los shards tienen carga similar.' :
         getLoadBalanceStatus() === 'Excelente' ? 'Balance excelente. La diferencia entre shards es mínima.' :
         getLoadBalanceStatus() === 'Buena' ? 'Balance adecuado. El sistema funciona eficientemente.' :
         getLoadBalanceStatus() === 'Moderada' ? 'Considerar rebalanceo. Hay diferencias notables entre shards.' :
         'Recomendado rebalanceo inmediato. Un shard tiene carga significativamente mayor.'}
      </p>
    </div>
  </div>
</div>
            </>
          ) : (
            /* Search Tab - CON BÚSQUEDA REAL */
            <div className="space-y-6">
              <div className="bg-gray-900/50 rounded-xl p-6">
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-400" />
                    Buscar Guild por ID
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Ingresa el ID de una guild de Discord para encontrar en qué shard está alojada.
                    El sistema buscará en todos los shards activos del bot.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Input
                        placeholder="Ej: 123456789012345678"
                        value={searchGuild}
                        onChange={(e) => {
                          setSearchGuild(e.target.value);
                          setSearchError(null);
                        }}
                        className="bg-gray-800 border-gray-700"
                        onKeyDown={(e) => e.key === 'Enter' && searchGuildById()}
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Para obtener el ID de una guild, habilita el modo desarrollador en Discord,
                        haz clic derecho en el servidor y selecciona "Copiar ID del Servidor"
                      </p>
                    </div>
                    <Button
                      onClick={searchGuildById}
                      disabled={searching || !searchGuild.trim()}
                      className="gap-2 bg-gradient-to-r from-blue-500 to-cyan-500"
                    >
                      {searching ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Buscando...
                        </>
                      ) : (
                        <>
                          <Search className="h-4 w-4" />
                          Buscar Guild
                        </>
                      )}
                    </Button>
                  </div>

                  {searchError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <div className="flex items-center gap-2 text-red-400">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">{searchError}</span>
                      </div>
                    </div>
                  )}

                  {/* Ejemplos rápidos */}
                  <div className="text-xs text-gray-500">
                    <p className="mb-2">Ejemplos de formato válido:</p>
                    <div className="flex flex-wrap gap-2">
                      <code className="bg-gray-800 px-2 py-1 rounded">123456789012345678</code>
                      <code className="bg-gray-800 px-2 py-1 rounded">987654321098765432</code>
                      <code className="bg-gray-800 px-2 py-1 rounded">111122223333444455</code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resultados de la búsqueda */}
              {searchResult && (
                <div className={`rounded-xl p-6 border ${
                  searchResult.data.found 
                    ? 'bg-green-500/10 border-green-500/20' 
                    : searchResult.source === 'real'  // <-- LÍNEA 633: ERROR AQUÍ
                    ? 'bg-yellow-500/10 border-yellow-500/20'
                    : 'bg-blue-500/10 border-blue-500/20'
                }`}>
                  {/* Encabezado del resultado */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        searchResult.data.found 
                          ? 'bg-green-500/20' 
                          : searchResult.source === 'real'
                          ? 'bg-yellow-500/20'
                          : 'bg-blue-500/20'
                      }`}>
                        {searchResult.data.found ? (
                          <CheckCircle className="h-6 w-6 text-green-400" />
                        ) : searchResult.source === 'real' ? (
                          <XCircle className="h-6 w-6 text-yellow-400" />
                        ) : (
                          <Target className="h-6 w-6 text-blue-400" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">
                          {searchResult.data.found 
                            ? '¡Guild encontrada!'
                            : searchResult.source === 'real'
                            ? 'Guild no encontrada'
                            : 'Estimación de ubicación'
                          }
                        </h4>
                        <p className="text-sm text-gray-400">
                          ID: <code className="bg-gray-800 px-1 py-0.5 rounded">{searchResult.data.guildId}</code>
                        </p>
                      </div>
                    </div>
                    
                    <Badge className={
                      searchResult.source === 'real'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }>
                      {searchResult.source === 'real' ? 'Búsqueda real' : 'Estimación'}
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Columna izquierda - Info de guild y shard */}
                    <div className="space-y-4">
                      {/* Info de la guild */}
                      {searchResult.data.guildInfo?.name && (
                        <div className="bg-gray-900/50 rounded-lg p-4">
                          <h5 className="font-medium mb-3 flex items-center gap-2">
                            <Home className="h-4 w-4" />
                            Información de la Guild
                          </h5>
                          <div className="space-y-3">
                            {searchResult.data.guildInfo.icon && (
                              <div className="flex items-center gap-3">
                                <img 
                                  src={searchResult.data.guildInfo.icon} 
                                  alt={searchResult.data.guildInfo.name}
                                  className="w-12 h-12 rounded-full"
                                />
                                <div>
                                  <div className="font-bold">{searchResult.data.guildInfo.name}</div>
                                  <div className="text-xs text-gray-400">ID: {searchResult.data.guildId}</div>
                                </div>
                              </div>
                            )}
                            
                            <div className="grid grid-cols-2 gap-3">
                              {searchResult.data.guildInfo.members && (
                                <div className="flex items-center gap-2">
                                  <UsersIcon className="h-4 w-4 text-gray-500" />
                                  <div>
                                    <div className="text-xs text-gray-400">Miembros</div>
                                    <div className="font-medium">{searchResult.data.guildInfo.members.toLocaleString()}</div>
                                  </div>
                                </div>
                              )}
                              
                              {searchResult.data.guildInfo.created && (
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-gray-500" />
                                  <div>
                                    <div className="text-xs text-gray-400">Creada</div>
                                    <div className="font-medium text-sm">{formatDate(searchResult.data.guildInfo.created)}</div>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            {searchResult.data.guildInfo.ownerId && (
                              <div className="text-xs text-gray-400">
                                Owner ID: <code className="bg-gray-800 px-1 py-0.5 rounded">{searchResult.data.guildInfo.ownerId}</code>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Info del shard */}
                      {searchResult.data.shard && (
                        <div className={`rounded-lg p-4 border ${
                          searchResult.data.shard.status === 'online'
                            ? 'bg-green-500/10 border-green-500/20'
                            : 'bg-yellow-500/10 border-yellow-500/20'
                        }`}>
                          <h5 className="font-medium mb-3 flex items-center gap-2">
                            <Server className="h-4 w-4" />
                            Shard Asignado
                          </h5>
                          
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`w-3 h-3 rounded-full ${
                              searchResult.data.shard.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'
                            }`} />
                            <div>
                              <div className="font-bold text-xl">Shard #{searchResult.data.shard.id}</div>
                              <div className="text-sm text-gray-400">
                                {searchResult.data.shard.status === 'online' ? '● Online' : '○ ' + searchResult.data.shard.status}
                                {searchResult.data.shard.isCurrentShard && ' • Shard actual'}
                                {searchResult.data.shard.isEstimated && ' • Estimado'}
                              </div>
                            </div>
                          </div>

                          {/* Stats del shard específico */}
                          {shards[searchResult.data.shard.id] && (
                            <div className="grid grid-cols-2 gap-3 mt-4">
                              <div className="bg-gray-900/50 p-3 rounded">
                                <div className="text-lg font-bold">{shards[searchResult.data.shard.id].guilds}</div>
                                <div className="text-xs text-gray-400">Guilds totales</div>
                              </div>
                              <div className="bg-gray-900/50 p-3 rounded">
                                <div className="text-lg font-bold">{shards[searchResult.data.shard.id].users.toLocaleString()}</div>
                                <div className="text-xs text-gray-400">Usuarios</div>
                              </div>
                              <div className="bg-gray-900/50 p-3 rounded">
                                <div className="text-lg font-bold">{shards[searchResult.data.shard.id].ping}ms</div>
                                <div className="text-xs text-gray-400">Ping</div>
                              </div>
                              <div className="bg-gray-900/50 p-3 rounded">
                                <div className="text-lg font-bold">{shards[searchResult.data.shard.id].uptime}</div>
                                <div className="text-xs text-gray-400">Uptime</div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Columna derecha - Detalles de búsqueda */}
                    <div className="space-y-4">
                      {/* Detalles de búsqueda */}
                      <div className="bg-gray-900/50 rounded-lg p-4">
                        <h5 className="font-medium mb-3 flex items-center gap-2">
                          <Info className="h-4 w-4" />
                          Detalles de la Búsqueda
                        </h5>
                        
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <div className="text-xs text-gray-400">Método</div>
                              <div className="font-medium">{searchResult.data.searchDetails.method}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-400">Precisión</div>
                              <Badge size="sm" className={
                                searchResult.data.searchDetails.accuracy === 'exact' 
                                  ? 'bg-green-500/20 text-green-400'
                                  : searchResult.data.searchDetails.accuracy === 'estimated'
                                  ? 'bg-blue-500/20 text-blue-400'
                                  : 'bg-yellow-500/20 text-yellow-400'
                              }>
                                {searchResult.data.searchDetails.accuracy === 'exact' ? 'Exacta' : 
                                 searchResult.data.searchDetails.accuracy === 'estimated' ? 'Estimada' : 
                                 'Aproximada'}
                              </Badge>
                            </div>
                          </div>
                          
                          {searchResult.data.searchDetails.calculation && (
                            <div className="p-3 bg-gray-800 rounded">
                              <div className="text-xs text-gray-400 mb-1">Cálculo:</div>
                              <div className="font-mono text-sm break-all">
                                {searchResult.data.searchDetails.calculation}
                              </div>
                            </div>
                          )}
                          
                          <div className="space-y-2">
                            {searchResult.data.searchDetails.totalShards && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Shards totales:</span>
                                <span className="font-medium">{searchResult.data.searchDetails.totalShards}</span>
                              </div>
                            )}
                            
                            {searchResult.data.searchDetails.searchedAllShards !== undefined && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Todos los shards:</span>
                                <Badge size="sm" variant="outline">
                                  {searchResult.data.searchDetails.searchedAllShards ? 'Sí' : 'No'}
                                </Badge>
                              </div>
                            )}
                            
                            {searchResult.data.searchDetails.foundVia && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Encontrado vía:</span>
                                <span className="font-medium">{searchResult.data.searchDetails.foundVia}</span>
                              </div>
                            )}
                          </div>
                          
                          {searchResult.data.searchDetails.note && (
                            <div className="text-sm text-gray-400 mt-4 p-2 bg-gray-800/50 rounded">
                              {searchResult.data.searchDetails.note}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Notas y sugerencias */}
                      {(searchResult.data.suggestions || searchResult.data.guildInfo?.note) && (
                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                          <h5 className="font-medium mb-2 flex items-center gap-2 text-yellow-400">
                            <AlertCircle className="h-4 w-4" />
                            Notas importantes
                          </h5>
                          
                          <div className="text-sm text-yellow-300/80 space-y-2">
                            {searchResult.data.guildInfo?.note && (
                              <p>{searchResult.data.guildInfo.note}</p>
                            )}
                            
                            {searchResult.data.suggestions && searchResult.data.suggestions.map((suggestion, index) => (
                              <p key={index} className="flex items-start gap-2">
                                <span className="mt-1">•</span>
                                <span>{suggestion}</span>
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Acciones */}
                      <div className="flex gap-3">
                        <Button 
                          variant="outline" 
                          className="flex-1 gap-2"
                          onClick={() => {
                            setSearchGuild('');
                            setSearchResult(null);
                          }}
                        >
                          Nueva búsqueda
                        </Button>
                        
                        {searchResult.data.shard && (
                          <Button 
                            className="flex-1 gap-2 bg-gradient-to-r from-blue-500 to-cyan-500"
                            onClick={() => {
                              // Navegar a la vista de shards y resaltar el shard encontrado
                              setActiveTab('shards');
                              // Podrías añadir lógica para resaltar el shard específico
                            }}
                          >
                            <MapPin className="h-4 w-4" />
                            Ver Shard #{searchResult.data.shard?.id}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Información de API */}
                  <div className="mt-6 pt-6 border-t border-gray-800">
                    <div className="flex items-start gap-3">
                      <Database className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-gray-400">
                        <p>
                          <span className="font-medium">Fuente de datos:</span>{' '}
                          {searchResult.source === 'real'
                            ? 'La búsqueda se realizó directamente en la API del bot, verificando todos los shards activos.'
                            : 'Esta es una estimación basada en el algoritmo de distribución hash de Discord.'}
                        </p>
                        <p className="mt-2">
                          <span className="text-green-400">✓ Búsqueda real:</span> El bot verifica si está en la guild.
                          <span className="text-blue-400 ml-4">⏱ Estimación:</span> Cálculo basado en hash del ID.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Instrucciones cuando no hay búsqueda */}
              {!searchResult && !searching && (
                <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                  <div className="text-center py-8">
                    <Target className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <h4 className="text-xl font-bold mb-3">Busca una guild</h4>
                    <p className="text-gray-400 mb-6 max-w-md mx-auto">
                      Ingresa el ID de una guild de Discord para encontrar en qué shard está alojada.
                      El sistema buscará en todos los shards activos del bot.
                    </p>
                    
                    <div className="inline-flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Búsqueda en tiempo real</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-400" />
                        <span>Verificación exacta</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-purple-400" />
                        <span>Todos los shards</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}