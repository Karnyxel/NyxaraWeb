// src/app/terms/page.tsx
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  FileText, 
  Shield, 
  AlertCircle, 
  CheckCircle,
  User,
  Server,
  CreditCard,
  Lock,
  Globe,
  Clock,
  Mail,
  ExternalLink
} from 'lucide-react';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'Términos | Nyxara Bot',
    description: 'Explora todos los comandos disponibles de Nyxara Bot, organizados por categorías y tipos.',
};


export default function TermsPage() {
  const sections = [
    {
      title: "1. Aceptación de Términos",
      content: `Al utilizar Nyxara Bot ("el Bot"), aceptas cumplir con estos Términos de Servicio. Si no estás de acuerdo con alguna parte de estos términos, no utilices nuestros servicios.`,
      icon: CheckCircle
    },
    {
      title: "2. Descripción del Servicio",
      content: `Nyxara es un bot multipropósito para Discord que ofrece funciones de moderación, música, niveles, economía y entretenimiento. El servicio se proporciona "tal cual" sin garantías de disponibilidad continua.`,
      icon: Server
    },
    {
      title: "3. Uso Aceptable",
      content: `Prohibido usar el Bot para:
      • Actividades ilegales o fraudulentas
      • Spam o abuso de la API de Discord
      • Violar Términos de Servicio de Discord
      • Dañar o interferir con otros servidores
      • Automatizar acciones maliciosas`,
      icon: Shield
    },
    {
      title: "4. Datos y Privacidad",
      content: `Recopilamos datos necesarios para el funcionamiento del Bot:
      • IDs de usuario, servidor y canal
      • Configuraciones de servidor
      • Datos de niveles y economía
      • Logs de moderación (si se habilitan)
      
      No vendemos ni compartimos tus datos con terceros.`,
      icon: Lock
    },
    {
      title: "5. Servicio Premium",
      content: `El servicio Premium ofrece características adicionales:
      • Facturación mensual/anual
      • Cancelación en cualquier momento
      • Reembolsos según nuestra política
      • Acceso inmediato tras pago verificado`,
      icon: CreditCard
    },
    {
      title: "6. Limitación de Responsabilidad",
      content: `No somos responsables por:
      • Pérdida de datos del servidor
      • Tiempo de inactividad no programado
      • Problemas causados por Discord
      • Uso indebido por parte de usuarios`,
      icon: AlertCircle
    },
    {
      title: "7. Modificaciones",
      content: `Podemos actualizar estos términos periódicamente. Notificaremos cambios importantes a través de nuestro servidor de Discord o panel de control. El uso continuado implica aceptación de los nuevos términos.`,
      icon: Clock
    },
    {
      title: "8. Contacto",
      content: `Para preguntas sobre estos términos:
      • Discord: discord.gg/nyxara
      • Email: legal@nyxara.app
      • Twitter: @NyxaraBot`,
      icon: Mail
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-nyxara-dark to-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-nyxara-primary to-nyxara-secondary">
            <FileText className="h-3 w-3 mr-2" />
            Documento Legal
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-nyxara-primary via-blue-500 to-nyxara-secondary bg-clip-text text-transparent">
              Términos de Servicio
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Última actualización: {new Date().toLocaleDateString('es-ES', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Button variant="outline" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              Versión PDF
            </Button>
            <Button variant="outline" className="gap-2">
              <Clock className="h-4 w-4" />
              Historial de Cambios
            </Button>
          </div>
        </div>

        {/* Disclaimer */}
        <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20 mb-12">
          <CardContent className="py-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">Importante</h3>
                <p className="text-gray-300">
                  Estos términos constituyen un acuerdo legal entre tú y Nyxara Bot. 
                  Te recomendamos leerlos detenidamente antes de usar nuestros servicios.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Terms Sections */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Card key={index} className="bg-gradient-to-br from-gray-900 to-black border-gray-800 hover:border-nyxara-primary/30 transition-all">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20">
                        <Icon className="h-5 w-5 text-blue-400" />
                      </div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 whitespace-pre-line">{section.content}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Acceptance */}
        <Card className="mt-12 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20">
          <CardContent className="py-12 text-center">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4">Aceptación de Términos</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Al utilizar Nyxara Bot, confirmas que has leído, comprendido y aceptado estos Términos de Servicio en su totalidad.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="gap-2">
                <CheckCircle className="h-4 w-4" />
                He leído y acepto los términos
              </Button>
              <Button variant="outline" className="gap-2">
                <FileText className="h-4 w-4" />
                Ver Política de Privacidad
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h3 className="text-xl font-bold text-center mb-6">Enlaces Rápidos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Política de Privacidad", href: "/privacy", icon: Shield },
              { title: "Política de Cookies", href: "/cookies", icon: FileText },
              { title: "Centro de Ayuda", href: "/faq", icon: AlertCircle }
            ].map((link, index) => {
              const Icon = link.icon;
              return (
                <a
                  key={index}
                  href={link.href}
                  className="bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800 hover:border-nyxara-primary/30 rounded-xl p-6 text-center transition-all group"
                >
                  <div className="inline-flex p-3 rounded-lg bg-gradient-to-r from-nyxara-primary/20 to-nyxara-secondary/20 mb-4">
                    <Icon className="h-6 w-6 text-nyxara-primary" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">{link.title}</h4>
                  <p className="text-sm text-gray-400">Ver documento completo</p>
                </a>
              );
            })}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}