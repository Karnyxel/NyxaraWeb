'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Shield, 
  Users, 
  Settings, 
  BarChart3,
  Server,
  AlertCircle,
  CheckCircle,
  XCircle,
  TrendingUp,
  Clock,
  FileText,
  Database,
  Activity,
  Globe,
  Lock
} from 'lucide-react';
import { motion } from 'framer-motion';

interface PanelData {
  section: string;
  data: any;
}

export default function PanelPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [panelData, setPanelData] = useState<PanelData | null>(null);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login?callbackUrl=/panel');
    } else if (status === 'authenticated') {
      // Verificar permisos de admin
      checkAdminPermissions();
    }
  }, [status, router]);

  const checkAdminPermissions = async () => {
    try {
      const response = await fetch('/api/panel');
      if (!response.ok) {
        if (response.status === 403) {
          router.push('/dashboard');
        } else {
          throw new Error('Permission check failed');
        }
      }
      loadPanelData();
    } catch (error) {
      console.error('Permission error:', error);
      router.push('/dashboard');
    }
  };

  const loadPanelData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/panel?section=${activeSection}`);
      const result = await response.json();
      
      if (result.success) {
        setPanelData(result);
      }
    } catch (error) {
      console.error('Error loading panel data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session && activeSection) {
      loadPanelData();
    }
  }, [activeSection, session]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-nyxara-dark to-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nyxara-primary"></div>
          <p className="mt-4 text-gray-400">Cargando panel de administración...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-nyxara-dark to-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <Badge className="mb-2 bg-gradient-to-r from-red-500 to-pink-500">
                <Shield className="h-3 w-3 mr-2" />
                Panel de Administración
              </Badge>
              <h1 className="text-3xl font-bold">
                Control del Sistema <span className="text-nyxara-primary">Nyxara</span>
              </h1>
              <p className="text-gray-400">
                Gestión avanzada del bot y la plataforma web
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-green-500/10 text-green-400">
                <CheckCircle className="h-3 w-3 mr-1" />
                Admin: {session.user?.name}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={loadPanelData}
                className="gap-2"
              >
                <Activity className="h-4 w-4" />
                Actualizar
              </Button>
            </div>
          </div>
        </div>
        
        {/* Navigation tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'overview', label: 'Resumen', icon: Globe },
              { id: 'users', label: 'Usuarios', icon: Users },
              { id: 'team', label: 'Equipo', icon: Shield },
              { id: 'settings', label: 'Configuración', icon: Settings },
              { id: 'analytics', label: 'Analíticas', icon: BarChart3 },
              { id: 'system', label: 'Sistema', icon: Server },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeSection === tab.id ? 'default' : 'outline'}
                  onClick={() => setActiveSection(tab.id)}
                  className="gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </Button>
              );
            })}
          </div>
        </div>
        
        {/* Content */}
        <div>
          {panelData && (
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {activeSection === 'overview' && panelData.data?.systemStats && (
                <div className="space-y-6">
                  {/* Stats cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      {
                        label: 'Usuarios Totales',
                        value: panelData.data.systemStats.total_users,
                        icon: Users,
                        color: 'text-blue-400',
                        bg: 'bg-blue-500/20',
                        change: '+5.2%'
                      },
                      {
                        label: 'Servidores',
                        value: panelData.data.systemStats.total_servers,
                        icon: Server,
                        color: 'text-green-400',
                        bg: 'bg-green-500/20',
                        change: '+12 este mes'
                      },
                      {
                        label: 'Miembros Equipo',
                        value: panelData.data.systemStats.team_members,
                        icon: Shield,
                        color: 'text-purple-400',
                        bg: 'bg-purple-500/20',
                        change: 'Activos'
                      },
                      {
                        label: 'Tickets Abiertos',
                        value: panelData.data.systemStats.open_tickets,
                        icon: AlertCircle,
                        color: 'text-yellow-400',
                        bg: 'bg-yellow-500/20',
                        change: 'Necesitan atención'
                      },
                    ].map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <Card key={index} className="bg-gradient-to-br from-gray-900 to-black border-gray-800">
                          <CardContent className="pt-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className={`p-3 rounded-xl ${stat.bg}`}>
                                <Icon className={`h-6 w-6 ${stat.color}`} />
                              </div>
                              <Badge variant="outline">{stat.change}</Badge>
                            </div>
                            <div className="text-3xl font-bold">{stat.value}</div>
                            <p className="text-gray-400">{stat.label}</p>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                  
                  {/* Recent logs */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        Actividad Reciente del Sistema
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {panelData.data.recentLogs && panelData.data.recentLogs.length > 0 ? (
                        <div className="space-y-3">
                          {panelData.data.recentLogs.slice(0, 5).map((log: any, index: number) => (
                            <div
                              key={log.id}
                              className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${
                                  log.action.includes('error') ? 'bg-red-500/20' :
                                  log.action.includes('create') ? 'bg-green-500/20' :
                                  log.action.includes('update') ? 'bg-blue-500/20' :
                                  'bg-gray-500/20'
                                }`}>
                                  <Activity className={`h-4 w-4 ${
                                    log.action.includes('error') ? 'text-red-400' :
                                    log.action.includes('create') ? 'text-green-400' :
                                    log.action.includes('update') ? 'text-blue-400' :
                                    'text-gray-400'
                                  }`} />
                                </div>
                                <div>
                                  <p className="font-medium">{log.action}</p>
                                  <p className="text-sm text-gray-400">
                                    {new Date(log.createdat).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                              <Badge variant="outline" size="sm">
                                {log.userid ? `Usuario ${log.userid}` : 'Sistema'}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Activity className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                          <p className="text-gray-400">No hay actividad reciente</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  {/* Top commands */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Comandos Más Usados (24h)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {panelData.data.topCommands && panelData.data.topCommands.length > 0 ? (
                        <div className="space-y-4">
                          {panelData.data.topCommands.map((cmd: any, index: number) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-nyxara-primary/20 to-nyxara-secondary/20 flex items-center justify-center">
                                  <span className="font-bold text-sm">{index + 1}</span>
                                </div>
                                <div>
                                  <p className="font-medium">{cmd.commandName}</p>
                                  <p className="text-sm text-gray-400">
                                    {cmd.count} ejecuciones
                                  </p>
                                </div>
                              </div>
                              <Badge variant="outline">
                                {((cmd.count / panelData.data.topCommands.reduce((sum: number, c: any) => sum + c.count, 0)) * 100).toFixed(1)}%
                              </Badge>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <TrendingUp className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                          <p className="text-gray-400">No hay datos de comandos</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {activeSection === 'users' && panelData.data?.users && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Gestión de Usuarios
                      </span>
                      <Badge variant="outline">
                        Página {panelData.data.pagination?.page} de {Math.ceil(panelData.data.pagination?.total / panelData.data.pagination?.limit)}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-800">
                            <th className="text-left py-3 px-4">Usuario</th>
                            <th className="text-left py-3 px-4">Servidores</th>
                            <th className="text-left py-3 px-4">Comandos</th>
                            <th className="text-left py-3 px-4">Registro</th>
                            <th className="text-left py-3 px-4">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {panelData.data.users.map((user: any) => (
                            <tr key={user.userId} className="border-b border-gray-800/50">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  {user.avatar ? (
                                    <img
                                      src={`https://cdn.discordapp.com/avatars/${user.userId}/${user.avatar}.png`}
                                      alt={user.username}
                                      className="w-8 h-8 rounded-full"
                                    />
                                  ) : (
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-nyxara-primary to-nyxara-secondary" />
                                  )}
                                  <div>
                                    <p className="font-medium">{user.username}</p>
                                    <p className="text-sm text-gray-400">{user.userId}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <Badge variant="outline">
                                  {user.owned_servers || 0}
                                </Badge>
                              </td>
                              <td className="py-3 px-4">
                                <span className="text-gray-300">{user.command_count || 0}</span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="text-gray-400 text-sm">
                                  {new Date(user.createdAt).toLocaleDateString()}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex gap-2">
                                  <Button size="sm" variant="ghost">
                                    Ver
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    Editar
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {activeSection === 'team' && (
                <div className="text-center py-12">
                  <Shield className="h-20 w-20 text-gray-600 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-3">Gestión del Equipo</h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    Gestiona los miembros del equipo, departamentos y permisos desde esta sección.
                  </p>
                  <Button className="gap-2">
                    <Users className="h-4 w-4" />
                    Gestionar equipo
                  </Button>
                </div>
              )}
              
              {activeSection === 'settings' && (
                <div className="text-center py-12">
                  <Settings className="h-20 w-20 text-gray-600 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-3">Configuración del Sitio</h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    Configura todas las opciones del sitio web, menús de navegación y ajustes generales.
                  </p>
                  <Button className="gap-2">
                    <Lock className="h-4 w-4" />
                    Editar configuración
                  </Button>
                </div>
              )}
              
              {activeSection === 'analytics' && (
                <div className="text-center py-12">
                  <BarChart3 className="h-20 w-20 text-gray-600 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-3">Analíticas del Sitio</h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    Visualiza estadísticas detalladas del tráfico del sitio web, fuentes de visitantes y comportamiento de usuarios.
                  </p>
                  <Button className="gap-2">
                    <Activity className="h-4 w-4" />
                    Ver analíticas
                  </Button>
                </div>
              )}
              
              {activeSection === 'system' && (
                <div className="text-center py-12">
                  <Server className="h-20 w-20 text-gray-600 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-3">Estado del Sistema</h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    Monitorea el estado del sistema, base de datos, y realiza mantenimiento.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button className="gap-2">
                      <Database className="h-4 w-4" />
                      Base de datos
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Activity className="h-4 w-4" />
                      Monitoreo
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}