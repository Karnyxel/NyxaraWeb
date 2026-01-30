'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Server, Users, Zap, Cpu, Globe, Database, Clock,
  RefreshCw, Wifi, WifiOff, Activity, TrendingUp, Command
} from 'lucide-react';
import { botAPI, DashboardData, ApiResponse } from '@/lib/api/bot-client';

// Definir tipo para overview con valores por defecto
interface OverviewData {
  botStatus: string;
  totalShards: number;
  onlineShards: number;
  offlineShards: number;
  activeGuilds: number;
  totalUsers: number;
  averagePing: number;
  uptime: string;
  memoryUsage: string;
  loadBalance: string;
}

// Datos por defecto para overview
const defaultOverview: OverviewData = {
  botStatus: 'Offline',
  totalShards: 0,
  onlineShards: 0,
  offlineShards: 0,
  activeGuilds: 0,
  totalUsers: 0,
  averagePing: 0,
  uptime: '0s',
  memoryUsage: '0 MB',
  loadBalance: 'N/A'
};

// Datos por defecto para commands
const defaultCommands = {
  totalExecutions: 0,
  successRate: '0%',
  activeCommands: 0,
  topCommand: { name: 'N/A', count: 0 }
};

// Datos por defecto para performance
const defaultPerformance = {
  latency: 0,
  memoryUsage: 0,
  cacheHitRate: 0,
  uptimePercent: 0
};

// Datos por defecto para system
const defaultSystem = {
  platform: 'N/A',
  nodeVersion: 'N/A',
  memory: 0,
  cpuCores: 0,
  uptime: '0s'
};

export default function StatsSection() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [apiStatus, setApiStatus] = useState<'connected' | 'disconnected'>('disconnected');
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async (showLoading = false) => {
    try {
      if (showLoading) setRefreshing(true);
      setLoading(true);
      
      console.log('📊 Cargando dashboard data...');
      const data = await botAPI.getDashboard();
      console.log('📊 Datos del dashboard:', data);
      
      if (data && data.success !== false && data.data) {
        setDashboardData(data.data);
        setApiStatus('connected');
        setLastUpdated(new Date().toLocaleTimeString('es-ES'));
      } else {
        // Fallback a bot stats
        const statsData = await botAPI.getBotSummary();
        if (statsData && statsData.success !== false && statsData.data) {
          // Forzar el tipo a DashboardData
          setDashboardData(statsData.data as DashboardData);
          setApiStatus('connected');
          setLastUpdated(new Date().toLocaleTimeString('es-ES'));
        }
      }
    } catch (err: any) {
      console.error('Error loading dashboard data:', err);
      setDashboardData(getSimulatedData());
      setApiStatus('disconnected');
      setLastUpdated(new Date().toLocaleTimeString('es-ES'));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getSimulatedData = (): DashboardData => {
    return {
      overview: {
        botStatus: 'Online',
        totalShards: 5,
        onlineShards: 4,
        offlineShards: 1,
        activeGuilds: 620,
        totalUsers: 124600,
        averagePing: 65,
        uptime: '2d 5h',
        memoryUsage: '156 MB',
        loadBalance: 'Excelente'
      },
      commands: {
        totalExecutions: 1450,
        successRate: '98.0%',
        activeCommands: 42,
        topCommand: { name: 'play', count: 423 }
      },
      shards: {
        distribution: Array.from({ length: 5 }, (_, i) => ({
          shardId: i,
          guilds: [211, 86, 125, 122, 76][i] || 100,
          percentage: Math.round((([211, 86, 125, 122, 76][i] || 100) / 620) * 1000) / 10,
          status: i === 4 ? 'offline' : 'online',
          memory: 156 + Math.random() * 50
        })),
        details: Array.from({ length: 5 }, (_, i) => ({
          shardId: i,
          status: i === 4 ? 'offline' : 'online' as 'online' | 'offline' | 'unknown',
          guilds: [211, 86, 125, 122, 76][i] || 100,
          users: [42100, 21500, 31200, 29800, 0][i] || Math.floor(Math.random() * 50000) + 10000,
          ping: [83, 49, 70, 61, 0][i] || Math.floor(Math.random() * 100) + 20,
          uptime: 125600 + Math.random() * 86400,
          memory: 156 + Math.random() * 50,
          voiceConnections: Math.floor(Math.random() * 50),
          channels: Math.floor(Math.random() * 500) + 100,
          commandsProcessed: Math.floor(Math.random() * 1000),
          cpuUsage: Math.random() * 30 + 10,
          heapUsed: 120 + Math.random() * 50,
          lastUpdate: Date.now() - Math.random() * 60000
        }))
      },
      performance: {
        latency: 65,
        memoryUsage: 7.6,
        cacheHitRate: 95,
        uptimePercent: 99.8
      },
      system: {
        platform: 'linux',
        nodeVersion: 'v18.17.0',
        memory: 156,
        cpuCores: 8,
        uptime: '3d 2h'
      }
    };
  };

  const formatNumber = (num: number = 0) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  if (loading && !dashboardData) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nyxara-primary"></div>
            <p className="mt-4 text-gray-400">Conectando con la API del bot...</p>
          </div>
        </div>
      </section>
    );
  }

  // Usar los datos del dashboard o los valores por defecto
  const overview = dashboardData?.overview || defaultOverview;
  const commands = dashboardData?.commands || defaultCommands;
  const performance = dashboardData?.performance || defaultPerformance;
  const system = dashboardData?.system || defaultSystem;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Badge className="bg-gradient-to-r from-nyxara-primary to-nyxara-secondary">
              <Activity className="h-3 w-3 mr-2" />
              Estadísticas del Sistema
            </Badge>
            <Badge variant="outline" className={
              apiStatus === 'connected' 
                ? 'bg-green-500/10 text-green-400 border-green-500/30'
                : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
            }>
              {apiStatus === 'connected' ? (
                <>
                  <Wifi className="h-3 w-3 mr-1" />
                  Conectado a API
                </>
              ) : (
                <>
                  <WifiOff className="h-3 w-3 mr-1" />
                  Datos simulados
                </>
              )}
            </Badge>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-nyxara-primary via-purple-500 to-nyxara-secondary bg-clip-text text-transparent">
              Visión General {apiStatus === 'connected' ? '⚡' : '📊'}
            </span>
          </h2>
          
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-gray-400">Actualizado: {lastUpdated || 'Nunca'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-2 h-2 rounded-full ${
                overview.botStatus === 'Online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'
              }`} />
              <span className={overview.botStatus === 'Online' ? 'text-green-400' : 'text-red-400'}>
                {overview.botStatus}
              </span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => loadDashboardData(true)}
              disabled={refreshing}
              className="gap-2 hover:scale-105 transition-all"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Actualizando...' : 'Actualizar'}
            </Button>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {/* Servidores */}
          <Card className="border-gray-800 hover:border-blue-500/30 transition-all hover:scale-105">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-blue-500/20">
                  <Server className="h-6 w-6 text-blue-400" />
                </div>
                <Badge variant={overview.botStatus === 'Online' ? 'success' : 'destructive'}>
                  {overview.botStatus}
                </Badge>
              </div>
              <div className="text-3xl font-bold">
                {formatNumber(overview.activeGuilds)}
              </div>
              <p className="text-gray-400">Servidores Activos</p>
              <div className="mt-4 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-400">
                    {formatNumber(overview.totalUsers)} usuarios
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rendimiento */}
          <Card className="border-gray-800 hover:border-green-500/30 transition-all hover:scale-105">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-green-500/20">
                  <Zap className="h-6 w-6 text-green-400" />
                </div>
                <Badge variant="outline" className={
                  overview.averagePing < 100 ? 'bg-green-500/10 text-green-400' :
                  overview.averagePing < 200 ? 'bg-yellow-500/10 text-yellow-400' :
                  'bg-red-500/10 text-red-400'
                }>
                  {overview.averagePing}ms
                </Badge>
              </div>
              <div className="text-3xl font-bold">
                {overview.averagePing}ms
              </div>
              <p className="text-gray-400">Latencia Promedio</p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Uptime:</span>
                  <span className="font-medium">{overview.uptime}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shards */}
          <Card className="border-gray-800 hover:border-purple-500/30 transition-all hover:scale-105">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-purple-500/20">
                  <Globe className="h-6 w-6 text-purple-400" />
                </div>
                <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                  {overview.totalShards > 1 ? 'Sharding' : 'Standalone'}
                </Badge>
              </div>
              <div className="text-3xl font-bold">
                {overview.onlineShards}
              </div>
              <p className="text-gray-400">Shards Online</p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total:</span>
                  <span className="font-medium">{overview.totalShards}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Balance:</span>
                  <span className="font-medium">{overview.loadBalance}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sistema */}
          <Card className="border-gray-800 hover:border-orange-500/30 transition-all hover:scale-105">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-orange-500/20">
                  <Cpu className="h-6 w-6 text-orange-400" />
                </div>
                <Badge variant="outline">
                  {system.platform}
                </Badge>
              </div>
              <div className="text-3xl font-bold">
                {performance.memoryUsage}%
              </div>
              <p className="text-gray-400">Uso de Memoria</p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Node:</span>
                  <span className="font-mono text-sm">{system.nodeVersion}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">CPU Cores:</span>
                  <span className="font-medium">{system.cpuCores}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comandos */}
          <Card className="border-gray-800 hover:border-red-500/30 transition-all hover:scale-105">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-red-500/20">
                  <Command className="h-6 w-6 text-red-400" />
                </div>
                <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                  {commands.successRate}
                </Badge>
              </div>
              <div className="text-3xl font-bold">
                {formatNumber(commands.totalExecutions)}
              </div>
              <p className="text-gray-400">Comandos Ejecutados</p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Éxito:</span>
                  <span className="font-medium">{commands.successRate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Top:</span>
                  <span className="font-medium">{commands.topCommand?.name}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Performance Metrics */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Métricas de Rendimiento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Latencia</span>
                      <span>{performance.latency}ms</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${Math.min(100, performance.latency / 2)}%` 
                        }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Cache Hit Rate</span>
                      <span>{performance.cacheHitRate}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${performance.cacheHitRate}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Uptime</span>
                      <span>{performance.uptimePercent}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                        style={{ width: `${performance.uptimePercent}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Uso de Memoria</span>
                      <span>{performance.memoryUsage}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
                        style={{ width: `${performance.memoryUsage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Información del Sistema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Plataforma</p>
                  <p className="font-medium">{system.platform}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Node.js</p>
                  <p className="font-mono text-sm">{system.nodeVersion}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">CPU Cores</p>
                  <p className="font-medium">{system.cpuCores}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Memoria Total</p>
                  <p className="font-medium">{system.memory} MB</p>
                </div>
                <div className="space-y-1 col-span-2">
                  <p className="text-sm text-gray-400">Uptime del Sistema</p>
                  <p className="font-medium">{system.uptime}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}