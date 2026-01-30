// src/components/sections/RealTimeStats.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Server, 
  Users, 
  Activity, 
  Zap, 
  RefreshCw, 
  Globe,
  Shield,
  Clock,
  Cpu,
  Database,
  Wifi,
  WifiOff
} from 'lucide-react';

interface RealTimeStatsProps {
  refreshInterval?: number;
}

export default function RealTimeStats({ refreshInterval = 30000 }: RealTimeStatsProps) {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/stats');
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
        setLastUpdated(new Date());
        setError(null);
      } else {
        setError('Error fetching stats');
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    
    const interval = setInterval(fetchStats, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  if (loading && !stats) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nyxara-primary"></div>
        <p className="mt-4 text-gray-400">Cargando estadísticas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <WifiOff className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Error de conexión</h3>
        <p className="text-gray-400 mb-6">{error}</p>
        <Button onClick={fetchStats}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Reintentar
        </Button>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Estadísticas en Tiempo Real</h2>
          <p className="text-gray-400">
            Datos de la API del bot {stats.source === 'real' ? '(En vivo)' : '(Simulados)'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant={stats.source === 'real' ? 'premium' : 'outline'}>
            {stats.source === 'real' ? (
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
          <Button
            variant="outline"
            size="sm"
            onClick={fetchStats}
            disabled={loading}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Actualizar
          </Button>
        </div>
      </div>

      {/* Bot Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-blue-500/20">
                <Server className="h-6 w-6 text-blue-400" />
              </div>
              <Badge variant={stats.bot.online ? 'default' : 'destructive'}>
                {stats.bot.online ? 'Online' : 'Offline'}
              </Badge>
            </div>
            <div className="text-3xl font-bold">{stats.bot.guilds.toLocaleString()}</div>
            <p className="text-gray-400">Servidores</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-green-500/20">
                <Users className="h-6 w-6 text-green-400" />
              </div>
              <Badge variant="outline">{stats.sharding?.summary?.onlineShards || 0}/{stats.sharding?.summary?.totalShards || 0}</Badge>
            </div>
            <div className="text-3xl font-bold">{stats.bot.users.toLocaleString()}</div>
            <p className="text-gray-400">Usuarios</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-purple-500/20">
                <Activity className="h-6 w-6 text-purple-400" />
              </div>
              <Badge variant="outline">{stats.bot.ping}ms</Badge>
            </div>
            <div className="text-3xl font-bold">{stats.bot.shards}</div>
            <p className="text-gray-400">Shards</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-yellow-500/20">
                <Zap className="h-6 w-6 text-yellow-400" />
              </div>
              <Badge variant="outline">v2.0.0</Badge>
            </div>
            <div className="text-3xl font-bold">{stats.bot.commands.toLocaleString()}</div>
            <p className="text-gray-400">Comandos totales</p>
          </CardContent>
        </Card>
      </div>

      {/* Shards Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Estado de Shards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {stats.sharding?.shards?.map((shard: any) => (
              <div
                key={shard.id}
                className={`p-4 rounded-xl border ${
                  shard.online || shard.status === 'online'
                    ? 'border-green-500/20 bg-green-500/5'
                    : 'border-red-500/20 bg-red-500/5'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${
                      shard.online || shard.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                    }`} />
                    <span className="font-semibold">Shard {shard.id}</span>
                  </div>
                  <Badge size="sm" variant={shard.online || shard.status === 'online' ? 'default' : 'destructive'}>
                    {shard.online || shard.status === 'online' ? 'Online' : 'Offline'}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Guilds</span>
                    <span className="font-medium">{shard.guilds}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Ping</span>
                    <span className="font-medium">{shard.ping}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Uptime</span>
                    <span className="font-medium">{shard.uptime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5" />
              Rendimiento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Memoria</span>
                <span className="font-medium">{stats.system.memory.heapUsed} MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Uptime</span>
                <span className="font-medium">{Math.round(stats.system.uptime / 3600)}h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Node</span>
                <span className="font-medium">{stats.system.nodeVersion}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Base de Datos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Comandos totales</span>
                <span className="font-medium">{stats.database.total_commands.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Servidores premium</span>
                <span className="font-medium">{stats.database.premium_servers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Comandos (24h)</span>
                <span className="font-medium">{stats.advanced.commands.total_24h}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Información
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Fuente de datos</span>
                <Badge variant={stats.source === 'real' ? 'premium' : 'outline'}>
                  {stats.source === 'real' ? 'API Real' : 'Simulado'}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Última actualización</span>
                <span className="font-medium">
                  {lastUpdated ? lastUpdated.toLocaleTimeString() : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Actualiza cada</span>
                <span className="font-medium">{refreshInterval / 1000}s</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer info */}
      <div className="text-center text-sm text-gray-500">
        <p>
          API del bot en: <code className="bg-gray-800 px-2 py-1 rounded">{process.env.BOT_API_URL || 'No configurada'}</code>
        </p>
        <p className="mt-2">
          {stats.source === 'real' 
            ? '✅ Conectado a la API del bot en tiempo real'
            : '⚠️ Usando datos simulados - Verifica la conexión a la API'}
        </p>
      </div>
    </div>
  );
}