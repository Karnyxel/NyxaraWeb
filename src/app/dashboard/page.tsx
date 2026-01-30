'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Server, 
  Users, 
  Command, 
  Settings, 
  Bell, 
  TrendingUp,
  Zap,
  Shield,
  Music,
  Globe,
  ArrowRight,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardData {
  user: any;
  guilds: any[];
  stats: any;
  notifications: any[];
  quickStats: any;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login?callbackUrl=/dashboard');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      loadDashboardData();
    }
  }, [session]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/dashboard');
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-nyxara-dark to-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nyxara-primary"></div>
          <p className="mt-4 text-gray-400">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session || !data) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-nyxara-dark to-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <DashboardSidebar user={session.user} />
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3">
            {/* Welcome header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold">
                    Hola, <span className="text-nyxara-primary">{data.user?.username}</span>
                  </h1>
                  <p className="text-gray-400">
                    Bienvenido al panel de control de Nyxara
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="bg-green-500/10 text-green-400">
                    <Zap className="h-3 w-3 mr-1" />
                    {data.quickStats?.premiumGuilds || 0} servidores premium
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={loadDashboardData}
                    className="gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Actualizar
                  </Button>
                </div>
              </div>
            </motion.div>
            
            {/* Stats overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800 hover:border-blue-500/50 transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-blue-500/20">
                        <Server className="h-6 w-6 text-blue-400" />
                      </div>
                      <Badge variant="outline">
                        {data.quickStats?.totalGuilds || 0}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold">
                      {data.quickStats?.totalGuilds || 0}
                    </div>
                    <p className="text-gray-400">Servidores</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-4 gap-2"
                      onClick={() => setActiveTab('servers')}
                    >
                      Gestionar
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800 hover:border-green-500/50 transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-green-500/20">
                        <Command className="h-6 w-6 text-green-400" />
                      </div>
                      <Badge variant="outline">
                        {data.quickStats?.totalCommands || 0}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold">
                      {data.quickStats?.totalCommands || 0}
                    </div>
                    <p className="text-gray-400">Comandos ejecutados</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-4 gap-2"
                      onClick={() => router.push('/commands')}
                    >
                      Ver todos
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800 hover:border-purple-500/50 transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-purple-500/20">
                        <TrendingUp className="h-6 w-6 text-purple-400" />
                      </div>
                      <Badge variant="outline" className="bg-green-500/10 text-green-400">
                        Activo
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold">
                      {data.quickStats?.premiumGuilds || 0}
                    </div>
                    <p className="text-gray-400">Servidores premium</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-4 gap-2"
                      onClick={() => router.push('/plans')}
                    >
                      Actualizar
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
            {/* Tabs */}
            <div className="mb-8">
              <div className="flex border-b border-gray-800">
                {[
                  { id: 'overview', label: 'Resumen', icon: Globe },
                  { id: 'servers', label: 'Servidores', icon: Server },
                  { id: 'commands', label: 'Comandos', icon: Command },
                  { id: 'settings', label: 'Configuración', icon: Settings },
                ].map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-all ${
                        activeTab === tab.id
                          ? 'border-nyxara-primary text-nyxara-primary'
                          : 'border-transparent text-gray-400 hover:text-gray-300'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Tab content */}
            <div>
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  {/* Servidores */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Server className="h-5 w-5" />
                        Tus Servidores
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {data.guilds && data.guilds.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {data.guilds.slice(0, 6).map((guild, index) => (
                            <motion.div
                              key={guild.guildId}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className="bg-gray-900/50 rounded-xl p-4 hover:bg-gray-800/50 transition-colors">
                                <div className="flex items-center gap-3 mb-3">
                                  {guild.icon ? (
                                    <img
                                      src={`https://cdn.discordapp.com/icons/${guild.guildId}/${guild.icon}.png`}
                                      alt={guild.name}
                                      className="w-12 h-12 rounded-full"
                                    />
                                  ) : (
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-nyxara-primary to-nyxara-secondary flex items-center justify-center">
                                      <Server className="h-6 w-6 text-white" />
                                    </div>
                                  )}
                                  <div>
                                    <h4 className="font-semibold">{guild.name}</h4>
                                    <p className="text-sm text-gray-400">
                                      {guild.memberCount?.toLocaleString() || 0} miembros
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <Badge variant={guild.guild_premium ? 'premium' : 'outline'}>
                                    {guild.guild_premium ? 'Premium' : 'Gratuito'}
                                  </Badge>
                                  <Button size="sm" variant="ghost">
                                    Gestionar
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Server className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                          <h3 className="text-xl font-bold mb-2">No tienes servidores</h3>
                          <p className="text-gray-400 mb-4">
                            Añade Nyxara a un servidor para comenzar
                          </p>
                          <Button>Invitar a un servidor</Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  {/* Notificaciones */}
                  {data.notifications && data.notifications.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Bell className="h-5 w-5" />
                          Notificaciones Recientes
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {data.notifications.map((notification, index) => (
                            <motion.div
                              key={notification.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-3 p-3 bg-gray-900/50 rounded-lg"
                            >
                              <div className={`p-2 rounded-lg ${
                                notification.type === 'success' ? 'bg-green-500/20' :
                                notification.type === 'warning' ? 'bg-yellow-500/20' :
                                notification.type === 'error' ? 'bg-red-500/20' :
                                'bg-blue-500/20'
                              }`}>
                                <Bell className={`h-4 w-4 ${
                                  notification.type === 'success' ? 'text-green-400' :
                                  notification.type === 'warning' ? 'text-yellow-400' :
                                  notification.type === 'error' ? 'text-red-400' :
                                  'text-blue-400'
                                }`} />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{notification.title}</h4>
                                <p className="text-sm text-gray-400">{notification.message}</p>
                              </div>
                              <Button size="sm" variant="ghost">
                                Ver
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              )}
              
              {activeTab === 'servers' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Server className="h-5 w-5" />
                          Gestión de Servidores
                        </span>
                        <Button variant="outline" className="gap-2">
                          <Server className="h-4 w-4" />
                          Añadir servidor
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* Contenido de servidores */}
                      <div className="text-center py-12">
                        <Server className="h-20 w-20 text-gray-600 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold mb-3">Gestiona todos tus servidores</h3>
                        <p className="text-gray-400 mb-6 max-w-md mx-auto">
                          Configura moderación, música, niveles y más para cada servidor donde tengas permisos de administrador.
                        </p>
                        <div className="flex gap-4 justify-center">
                          <Button className="gap-2">
                            <Shield className="h-4 w-4" />
                            Configurar moderación
                          </Button>
                          <Button variant="outline" className="gap-2">
                            <Music className="h-4 w-4" />
                            Ajustar música
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}