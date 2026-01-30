// src/app/privacy/page.tsx
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button} from '@/components/ui/Button';
import { 
  Shield, 
  Lock, 
  Database, 
  Eye,
  Trash2,
  Download,
  Users,
  Server,
  Bell,
  Key,
  Globe,
  Mail,
  ExternalLink,
  Cog
} from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Nyxara Bot',
  description: 'Conoce cómo protegemos y manejamos tus datos en Nyxara Bot.',
};

export default function PrivacyPage() {
  const privacySections = [
    {
      icon: Database,
      title: "Datos que Recopilamos",
      color: "from-blue-500 to-cyan-500",
      items: [
        "Identificadores de Discord (ID de usuario, servidor, canal)",
        "Configuraciones del servidor y preferencias",
        "Datos de sistema de niveles y economía",
        "Logs de moderación (opcional, configurables por servidor)",
        "Estadísticas de uso de comandos"
      ]
    },
    {
      icon: Lock,
      title: "Cómo Usamos tus Datos",
      color: "from-green-500 to-emerald-500",
      items: [
        "Proporcionar y mantener el servicio del bot",
        "Personalizar la experiencia por servidor",
        "Mejorar y optimizar el funcionamiento",
        "Detectar y prevenir abusos",
        "Generar estadísticas anónimas agregadas"
      ]
    },
    {
      icon: Shield,
      title: "Protección de Datos",
      color: "from-purple-500 to-pink-500",
      items: [
        "Encriptación en tránsito (TLS/SSL)",
        "Acceso restringido a datos sensibles",
        "Almacenamiento seguro en servidores",
        "Retención mínima necesaria de datos",
        "Protocolos de seguridad regulares"
      ]
    },
    {
      icon: Users,
      title: "Compartición de Datos",
      color: "from-yellow-500 to-orange-500",
      items: [
        "NO vendemos datos personales",
        "NO compartimos con terceros para marketing",
        "Solo compartimos datos esenciales con proveedores de servicios",
        "Datos anónimos para estadísticas generales",
        "Cumplimiento de requerimientos legales"
      ]
    },
    {
      icon: Eye,
      title: "Tus Derechos",
      color: "from-red-500 to-pink-500",
      items: [
        "Acceder a tus datos almacenados",
        "Solicitar corrección de datos inexactos",
        "Pedir eliminación de tus datos",
        "Exportar tus datos en formato legible",
        "Oponerte al procesamiento"
      ]
    },
    {
      icon: Trash2,
      title: "Retención y Eliminación",
      color: "from-gray-500 to-gray-700",
      items: [
        "Datos de servidor: Mientras el bot esté en el servidor",
        "Datos de usuario: 30 días tras última interacción",
        "Logs de moderación: Configurable por servidor",
        "Eliminación automática tras inactividad prolongada",
        "Eliminación inmediata al expulsar el bot"
      ]
    }
  ];

  const dataRequests = [
    {
      title: "Ver mis datos",
      description: "Solicita una copia de todos los datos que tenemos sobre ti",
      icon: Download,
      action: "Solicitar datos"
    },
    {
      title: "Eliminar mis datos",
      description: "Ejerce tu derecho al olvido y borra tu información",
      icon: Trash2,
      action: "Solicitar eliminación"
    },
    {
      title: "Configurar privacidad",
      description: "Ajusta cómo manejamos tus datos en cada servidor",
      icon: Cog,
      action: "Configurar preferencias"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-nyxara-dark to-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-cyan-500">
            <Shield className="h-3 w-3 mr-2" />
            Privacidad y Seguridad
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Política de Privacidad
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Nos tomamos tu privacidad muy en serio. Esta política explica cómo manejamos y protegemos tu información.
          </p>
          <div className="mt-6 flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-green-400" />
              <span className="text-sm">Encriptación TLS/SSL</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-400" />
              <span className="text-sm">Protección GDPR</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-purple-400" />
              <span className="text-sm">Minimización de datos</span>
            </div>
          </div>
        </div>

        {/* Privacy Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Lock,
              title: "Transparencia",
              description: "Explicamos claramente qué datos recopilamos y por qué",
              color: "text-blue-400"
            },
            {
              icon: Shield,
              title: "Minimización",
              description: "Solo recopilamos lo necesario para el servicio",
              color: "text-green-400"
            },
            {
              icon: Database,
              title: "Seguridad",
              description: "Protegemos tus datos con medidas de seguridad robustas",
              color: "text-purple-400"
            },
            {
              icon: Users,
              title: "Control",
              description: "Tú controlas tus datos en todo momento",
              color: "text-yellow-400"
            },
            {
              icon: Globe,
              title: "Cumplimiento",
              description: "Seguimos leyes de protección de datos aplicables",
              color: "text-red-400"
            },
            {
              icon: Bell,
              title: "Notificación",
              description: "Te informamos de cambios importantes",
              color: "text-cyan-400"
            }
          ].map((principle, index) => {
            const Icon = principle.icon;
            return (
              <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <div className={`p-3 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 w-fit mb-4`}>
                  <Icon className={`h-6 w-6 ${principle.color}`} />
                </div>
                <h3 className="font-bold text-lg mb-2">{principle.title}</h3>
                <p className="text-gray-400 text-sm">{principle.description}</p>
              </div>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {privacySections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Card key={index} className="bg-gradient-to-br from-gray-900 to-black border-gray-800">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${section.color}`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-nyxara-primary mt-2 flex-shrink-0" />
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Data Request Cards */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Controla Tus Datos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dataRequests.map((request, index) => {
                const Icon = request.icon;
                return (
                  <Card key={index} className="bg-gradient-to-br from-gray-900 to-black border-gray-800 hover:border-blue-500/50 transition-all">
                    <CardContent className="pt-6">
                      <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 w-fit mb-4">
                        <Icon className="h-6 w-6 text-blue-400" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{request.title}</h3>
                      <p className="text-gray-400 mb-4">{request.description}</p>
                      <Button variant="outline" className="w-full gap-2">
                        {request.action}
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Contact & Updates */}
          <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20">
            <CardContent className="py-8">
              <div className="text-center">
                <Mail className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Preguntas y Actualizaciones</h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Si tienes preguntas sobre esta política o deseas reportar una violación de privacidad, contáctanos:
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="gap-2">
                    <Mail className="h-4 w-4" />
                    privacy@nyxara.app
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Shield className="h-4 w-4" />
                    Reportar Problema
                  </Button>
                </div>
                <p className="text-sm text-gray-400 mt-6">
                  Actualizaremos esta política cuando sea necesario. Revisa esta página periódicamente.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}