'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  Bot, 
  Shield, 
  Sparkles, 
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Users,
  Zap,
  Music,
  Lock
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await signIn('discord', {
        callbackUrl,
        redirect: false
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      setError('Error al iniciar sesión');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-nyxara-dark to-black flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-nyxara-primary to-nyxara-secondary">
                  <Bot className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold">Nyxara</h1>
                  <p className="text-gray-400">Bot de Discord</p>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold">
                Gestiona tu servidor <br />
                <span className="bg-gradient-to-r from-nyxara-primary to-nyxara-secondary bg-clip-text text-transparent">
                  como nunca antes
                </span>
              </h2>
              
              <p className="text-gray-300 text-lg">
                Accede al dashboard para configurar todos los aspectos de Nyxara 
                en tu servidor de Discord. Modera, personaliza y analiza todo 
                desde una interfaz intuitiva.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: Shield, text: 'Moderación avanzada con IA' },
                  { icon: Music, text: 'Sistema de música premium' },
                  { icon: Zap, text: '112 comandos disponibles' },
                  { icon: Users, text: 'Analíticas detalladas' },
                  { icon: Lock, text: 'Configuración segura' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center gap-3"
                  >
                    <div className="p-2 rounded-lg bg-green-500/20">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    </div>
                    <span className="text-gray-300">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Right side - Login card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800">
              <CardHeader className="text-center">
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-nyxara-primary/20 to-nyxara-secondary/20 mb-4">
                  <Lock className="h-8 w-8 text-nyxara-primary" />
                </div>
                <CardTitle className="text-3xl">Iniciar Sesión</CardTitle>
                <CardDescription>
                  Conéctate con tu cuenta de Discord para acceder al dashboard
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 text-red-400" />
                      <span className="text-red-300">{error}</span>
                    </div>
                  </div>
                )}
                
                <div className="space-y-4">
                  <Button
                    onClick={handleLogin}
                    disabled={loading}
                    size="xl"
                    className="w-full bg-gradient-to-r from-[#5865F2] to-[#4752C4] hover:from-[#4752C4] hover:to-[#3C45A5]"
                  >
                    {loading ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent mr-3" />
                        Conectando...
                      </>
                    ) : (
                      <>
                        <Shield className="h-5 w-5 mr-3" />
                        Continuar con Discord
                        <ArrowRight className="h-5 w-5 ml-3" />
                      </>
                    )}
                  </Button>
                  
                  <p className="text-gray-400 text-sm text-center">
                    Serás redirigido a Discord para autorizar el acceso
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-800" />
                    <span className="text-gray-500 text-sm">¿Por qué necesitamos acceso?</span>
                    <div className="flex-1 h-px bg-gray-800" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Identidad', desc: 'Para verificar tu cuenta' },
                      { label: 'Servidores', desc: 'Para ver tus servidores' },
                      { label: 'Email', desc: 'Para notificaciones' },
                      { label: 'Guilds', desc: 'Para gestión' },
                    ].map((item, index) => (
                      <div key={index} className="bg-gray-900/50 rounded-lg p-3">
                        <div className="font-medium text-sm">{item.label}</div>
                        <div className="text-xs text-gray-500">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-900/30 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Sparkles className="h-5 w-5 text-yellow-400" />
                    <h4 className="font-semibold">Ventajas de la cuenta</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• Gestión de múltiples servidores</li>
                    <li>• Historial de comandos ejecutados</li>
                    <li>• Configuraciones personalizadas</li>
                    <li>• Estadísticas detalladas</li>
                    <li>• Acceso prioritario a nuevas features</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}