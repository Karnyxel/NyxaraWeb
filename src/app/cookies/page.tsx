'use client'

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch';
import { motion } from 'framer-motion';
import { 
  Cookie, 
  Shield, 
  Settings, 
  CheckCircle,
  XCircle,
  Info,
  AlertCircle,
  BarChart3,
  Users,
  Globe,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

// Definir el tipo para las preferencias de cookies
type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  preferences: boolean;
  marketing: boolean;
};

export default function CookiesPage() {
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    preferences: false,
    marketing: false
  });
  const [showSettings, setShowSettings] = useState(false);

  const cookieTypes = [
    {
      id: 'necessary' as keyof CookiePreferences,
      name: 'Cookies Necesarias',
      description: 'Esenciales para el funcionamiento básico del sitio. No se pueden desactivar.',
      required: true,
      examples: ['Sesión de usuario', 'Seguridad', 'Preferencias básicas'],
      icon: Shield
    },
    {
      id: 'preferences' as keyof CookiePreferences,
      name: 'Cookies de Preferencias',
      description: 'Permiten recordar tus configuraciones y preferencias.',
      required: false,
      examples: ['Idioma', 'Tema (claro/oscuro)', 'Configuraciones regionales'],
      icon: Settings
    },
    {
      id: 'analytics' as keyof CookiePreferences,
      name: 'Cookies Analíticas',
      description: 'Nos ayudan a entender cómo usas el sitio para mejorarlo.',
      required: false,
      examples: ['Tráfico del sitio', 'Páginas visitadas', 'Comportamiento de usuarios'],
      icon: BarChart3
    },
    {
      id: 'marketing' as keyof CookiePreferences,
      name: 'Cookies de Marketing',
      description: 'Usadas para mostrar anuncios relevantes (actualmente no usamos estas cookies).',
      required: false,
      examples: ['Segmentación', 'Retargeting', 'Publicidad personalizada'],
      icon: Users
    }
  ];

  const handleCookieToggle = (id: keyof CookiePreferences) => {
    if (id === 'necessary') return; // No se puede desactivar
    setCookiePreferences(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSavePreferences = () => {
    localStorage.setItem('nyxara-cookie-preferences', JSON.stringify(cookiePreferences));
    setShowSettings(false);
    // Aquí normalmente enviarías las preferencias a tu backend
  };

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      preferences: true,
      marketing: true
    };
    
    setCookiePreferences(allAccepted);
    localStorage.setItem('nyxara-cookie-preferences', JSON.stringify(allAccepted));
    setShowSettings(false);
  };

  const handleRejectAll = () => {
    const rejected: CookiePreferences = {
      necessary: true,
      analytics: false,
      preferences: false,
      marketing: false
    };
    
    setCookiePreferences(rejected);
    localStorage.setItem('nyxara-cookie-preferences', JSON.stringify(rejected));
    setShowSettings(false);
  };

  useEffect(() => {
    const saved = localStorage.getItem('nyxara-cookie-preferences');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Validar que el objeto parseado tenga la estructura correcta
        const validated: CookiePreferences = {
          necessary: typeof parsed.necessary === 'boolean' ? parsed.necessary : true,
          analytics: typeof parsed.analytics === 'boolean' ? parsed.analytics : false,
          preferences: typeof parsed.preferences === 'boolean' ? parsed.preferences : false,
          marketing: typeof parsed.marketing === 'boolean' ? parsed.marketing : false
        };
        setCookiePreferences(validated);
      } catch (error) {
        console.error('Error parsing cookie preferences:', error);
        // Usar valores por defecto si hay error
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-nyxara-dark to-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-yellow-500 to-orange-500">
            <Cookie className="h-3 w-3 mr-2" />
            Política de Cookies
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 bg-clip-text text-transparent">
              Uso de Cookies
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Esta política explica qué son las cookies, cómo las usamos y cómo puedes controlarlas.
          </p>
        </div>

        {/* What are cookies */}
        <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20 mb-12">
          <CardContent className="py-8">
            <div className="flex items-start gap-6">
              <Cookie className="h-12 w-12 text-yellow-400 mt-2 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-4">¿Qué son las cookies?</h3>
                <p className="text-gray-300 mb-4">
                  Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo. 
                  Nos ayudan a hacer que tu experiencia sea mejor y más personalizada.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="font-medium">Beneficios</span>
                    </div>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Inicio de sesión automático</li>
                      <li>• Preferencias guardadas</li>
                      <li>• Navegación más rápida</li>
                      <li>• Contenido personalizado</li>
                    </ul>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="h-5 w-5 text-blue-400" />
                      <span className="font-medium">Características</span>
                    </div>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Pequeñas (típicamente &lt; 4KB)</li>
                      <li>• Seguras y no ejecutables</li>
                      <li>• Caducan automáticamente</li>
                      <li>• Específicas del sitio</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cookie Types */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Tipos de Cookies que Usamos</h2>
          <div className="space-y-6">
            {cookieTypes.map((type) => {
              const Icon = type.icon;
              const isActive = cookiePreferences[type.id];
              
              return (
                <Card key={type.id} className="bg-gradient-to-br from-gray-900 to-black border-gray-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl ${
                          type.id === 'necessary' ? 'bg-gradient-to-r from-red-500 to-pink-500' :
                          type.id === 'preferences' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                          type.id === 'analytics' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                          'bg-gradient-to-r from-purple-500 to-pink-500'
                        }`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{type.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            {type.required ? (
                              <Badge variant="outline" className="bg-red-500/10 text-red-400">
                                Siempre activo
                              </Badge>
                            ) : (
                              <Badge variant="outline" className={isActive ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}>
                                {isActive ? 'Activo' : 'Inactivo'}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      {!type.required && (
                        <Switch
                          checked={isActive}
                          onCheckedChange={() => handleCookieToggle(type.id)}
                          className="data-[state=checked]:bg-green-500"
                        />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-300">{type.description}</p>
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Info className="h-4 w-4" />
                          Ejemplos:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {type.examples.map((example, idx) => (
                            <Badge key={idx} variant="outline" className="bg-gray-800/50">
                              {example}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Cookie Management */}
        <div className="max-w-2xl mx-auto mb-12">
          <Card className="border-gray-800">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl flex items-center justify-center gap-3">
                <Settings className="h-6 w-6 text-nyxara-primary" />
                Gestiona Tus Cookies
              </CardTitle>
              <p className="text-gray-400">
                Tienes control total sobre las cookies que aceptas
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Current Preferences */}
                <div className="bg-gray-900/50 rounded-xl p-6">
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    Preferencias Actuales
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {(Object.keys(cookiePreferences) as Array<keyof CookiePreferences>).map((key) => (
                      <div key={key} className="text-center">
                        <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${
                          cookiePreferences[key] ? 'bg-green-500' : 'bg-gray-600'
                        }`} />
                        <span className="text-sm capitalize">{key}</span>
                        <div className="text-xs text-gray-500">
                          {cookiePreferences[key] ? 'Activado' : 'Desactivado'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    onClick={handleAcceptAll}
                    className="gap-2 bg-gradient-to-r from-green-500 to-emerald-500"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Aceptar Todas
                  </Button>
                  <Button 
                    onClick={handleRejectAll}
                    variant="outline"
                    className="gap-2"
                  >
                    <XCircle className="h-4 w-4" />
                    Rechazar No Esenciales
                  </Button>
                  <Button 
                    onClick={() => setShowSettings(!showSettings)}
                    variant="outline"
                    className="gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    Personalizar
                  </Button>
                </div>

                {/* Custom Settings */}
                {showSettings && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 pt-6 border-t border-gray-800">
                      <h4 className="font-bold mb-4">Configuración Personalizada</h4>
                      <div className="space-y-4">
                        {cookieTypes
                          .filter(type => !type.required)
                          .map((type) => (
                            <div key={type.id} className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                              <div>
                                <div className="font-medium">{type.name}</div>
                                <div className="text-sm text-gray-400">{type.description}</div>
                              </div>
                              <Switch
                                checked={cookiePreferences[type.id]}
                                onCheckedChange={() => handleCookieToggle(type.id)}
                              />
                            </div>
                          ))}
                        <div className="flex gap-4">
                          <Button onClick={handleSavePreferences} className="flex-1">
                            Guardar Preferencias
                          </Button>
                          <Button variant="outline" onClick={() => setShowSettings(false)}>
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Browser Instructions */}
        <Card className="bg-gradient-to-r from-gray-900 to-black border-gray-800">
          <CardContent className="py-8">
            <div className="text-center">
              <Globe className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Gestionar Cookies en tu Navegador</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                También puedes gestionar las cookies directamente en la configuración de tu navegador:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { name: 'Chrome', path: 'chrome://settings/cookies' },
                  { name: 'Firefox', path: 'about:preferences#privacy' },
                  { name: 'Safari', path: 'Preferencias > Privacidad' },
                  { name: 'Edge', path: 'edge://settings/content/cookies' }
                ].map((browser) => (
                  <div key={browser.name} className="bg-gray-900/50 rounded-lg p-4">
                    <div className="font-bold mb-2">{browser.name}</div>
                    <div className="text-sm text-gray-400">{browser.path}</div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Limpiar Cookies del Sitio
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-900/30 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-2">Información Adicional</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Las cookies necesarias no se pueden desactivar sin afectar la funcionalidad</li>
                    <li>• Algunas funcionalidades pueden no estar disponibles si rechazas ciertas cookies</li>
                    <li>• Las preferencias se guardan en tu navegador y pueden borrarse al limpiar datos</li>
                    <li>• Esta política se actualiza periódicamente. Te recomendamos revisarla regularmente</li>
                  </ul>
                  <div className="mt-6">
                    <p className="text-sm text-gray-400">
                      Para más información sobre cookies, visita:{' '}
                      <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-nyxara-primary hover:underline">
                        AllAboutCookies.org
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}