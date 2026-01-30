// src/app/dmca/page.tsx
'use client'; // AÑADE ESTO

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Shield,
  Copyright,
  AlertTriangle,
  Mail,
  Server,
  Users,
  ExternalLink,
  FileWarning,
  Scale,
  Globe,
  Clock,
  CheckCircle,
  XCircle,
  BookOpen
} from 'lucide-react';


export default function DMCAPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-nyxara-dark to-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-nyxara-primary to-nyxara-secondary">
            <Copyright className="h-3 w-3 mr-2" />
            DMCA & Copyright
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-nyxara-primary via-nyxara-secondary to-blue-600 bg-clip-text text-transparent">
              Política de Derechos de Autor
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Nyxara Bot respeta los derechos de propiedad intelectual y opera como un servicio de procesamiento.
          </p>
        </div>

        {/* Key Information */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800 mb-8">
          <CardContent className="py-8">
            <div className="flex items-start gap-6">
              <Scale className="h-12 w-12 text-nyxara-primary mt-2 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-4">Declaración Legal</h3>
                <p className="text-gray-300 mb-4">
                  Nyxara Bot es un <strong>servicio automatizado de Discord</strong> que no almacena, aloja ni distribuye contenido protegido por derechos de autor. 
                  Operamos en cumplimiento con la Ley de Derechos de Autor de la Era Digital (DMCA) como proveedor de servicios.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Server className="h-5 w-5 text-green-400" />
                      <span className="font-medium">Nuestro Servicio</span>
                    </div>
                    <ul className="text-sm text-gray-400 space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Procesador automatizado en Discord
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Sin almacenamiento de contenido de usuarios
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Cumplimos con ToS de Discord
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="h-5 w-5 text-blue-400" />
                      <span className="font-medium">Responsabilidad</span>
                    </div>
                    <ul className="text-sm text-gray-400 space-y-2">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        Los servidores gestionan su contenido
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        Usuarios deben cumplir leyes de copyright
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        Discord maneja infracciones de contenido
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Two Columns: DMCA Process & Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* DMCA Process */}
          <Card className="bg-gradient-to-br from-gray-900 to-black border-red-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-red-400">
                <FileWarning className="h-6 w-6" />
                Reportar Infracciones
              </CardTitle>
              <p className="text-gray-400 text-sm">
                Si encuentras contenido protegido en Discord:
              </p>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <div className="bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <span className="font-medium">Reportar a Discord</span>
                    <p className="text-gray-400 text-sm mt-1">
                      Primero, usa la función de reporte de Discord directamente en el servidor donde ocurre la infracción.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <span className="font-medium">Contactar al Administrador</span>
                    <p className="text-gray-400 text-sm mt-1">
                      Comunícate con los administradores del servidor para solicitar la eliminación del contenido.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <span className="font-medium">Contactarnos</span>
                    <p className="text-gray-400 text-sm mt-1">
                      Si el problema persiste, contáctanos con detalles específicos para investigar.
                    </p>
                  </div>
                </li>
              </ol>
              
              <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <span className="font-medium text-red-300">Importante</span>
                </div>
                <p className="text-sm text-gray-300">
                  Nyxara Bot solo procesa comandos en tiempo real. No almacenamos ni distribuimos contenido de usuarios.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-gradient-to-br from-gray-900 to-black border-blue-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-blue-400">
                <Mail className="h-6 w-6" />
                Contacto Legal
              </CardTitle>
              <p className="text-gray-400 text-sm">
                Para asuntos legales y derechos de autor:
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg mb-3">Información de Contacto</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-900/50 rounded-lg p-3">
                      <div className="text-sm text-gray-400 mb-1">Correo Electrónico</div>
                      <div className="font-medium">legal@nyxara.app</div>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-3">
                      <div className="text-sm text-gray-400 mb-1">Servidor de Discord</div>
                      <div className="font-medium">discord.gg/nyxara</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-lg mb-3">Información Requerida</h4>
                  <p className="text-gray-400 text-sm mb-3">
                    Si contactas sobre derechos de autor, incluye:
                  </p>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                      Identificación del contenido protegido
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                      URL del servidor de Discord
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                      Tu información de contacto
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                      Declaración de buena fe
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Discord's Role */}
        <Card className="mb-12 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
          <CardContent className="py-8">
            <div className="flex items-center gap-6">
              <Shield className="h-16 w-16 text-indigo-400 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-4">El Papel de Discord</h3>
                <p className="text-gray-300 mb-4">
                  Como plataforma que aloja los servidores, Discord tiene sus propias políticas y herramientas para manejar 
                  infracciones de derechos de autor. Recomendamos:
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => window.open('https://support.discord.com/hc/en-us/articles/360004277391-How-to-Report-Copyright-Infringement', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Política de Copyright de Discord
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => window.open('https://discord.com/terms', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Términos de Servicio de Discord
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Preguntas Frecuentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "¿Nyxara Bot almacena contenido con derechos de autor?",
                a: "No. Nyxara es un bot de procesamiento que opera en tiempo real. No almacenamos contenido multimedia o protegido por copyright.",
                icon: XCircle,
                color: "text-red-400"
              },
              {
                q: "¿Puedo usar Nyxara para reproducir música con copyright?",
                a: "Los servidores son responsables del contenido que comparten. Recomendamos usar música libre de derechos o con licencia adecuada.",
                icon: AlertTriangle,
                color: "text-yellow-400"
              },
              {
                q: "¿Qué hago si alguien comparte contenido ilegal?",
                a: "Usa la función de reporte de Discord y contacta a los administradores del servidor. Si es grave, reporta a las autoridades pertinentes.",
                icon: Shield,
                color: "text-blue-400"
              },
              {
                q: "¿Cómo protege Nyxara la propiedad intelectual?",
                a: "Implementamos medidas técnicas para prevenir abusos y cooperamos con Discord en casos de violación de sus términos de servicio.",
                icon: CheckCircle,
                color: "text-green-400"
              }
            ].map((faq, index) => {
              const Icon = faq.icon;
              return (
                <Card key={index} className="bg-gradient-to-br from-gray-900 to-black border-gray-800">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3 mb-4">
                      <Icon className={`h-6 w-6 ${faq.color} mt-0.5 flex-shrink-0`} />
                      <h4 className="font-bold text-lg">{faq.q}</h4>
                    </div>
                    <p className="text-gray-400">{faq.a}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Legal Links */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <h3 className="text-xl font-bold text-center mb-6">Documentos Legales</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { 
                title: "Términos de Servicio", 
                href: "/terms", 
                icon: FileWarning,
                description: "Condiciones de uso del bot"
              },
              { 
                title: "Política de Privacidad", 
                href: "/privacy", 
                icon: Shield,
                description: "Cómo manejamos tus datos"
              },
              { 
                title: "Política de Cookies", 
                href: "/cookies", 
                icon: BookOpen,
                description: "Uso de cookies en la web"
              },
              { 
                title: "Comunidad", 
                href: "https://discord.gg/nyxara", 
                icon: Users,
                description: "Únete a nuestro Discord",
                external: true
              }
            ].map((doc, index) => {
              const Icon = doc.icon;
              return (
                <a
                  key={index}
                  href={doc.href}
                  target={doc.external ? "_blank" : "_self"}
                  rel={doc.external ? "noopener noreferrer" : ""}
                  className="bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800 hover:border-nyxara-primary/30 rounded-xl p-6 text-center transition-all group"
                >
                  <div className="inline-flex p-3 rounded-lg bg-gradient-to-r from-nyxara-primary/20 to-nyxara-secondary/20 mb-4">
                    <Icon className="h-6 w-6 text-nyxara-primary" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">{doc.title}</h4>
                  <p className="text-sm text-gray-400">{doc.description}</p>
                  {doc.external && (
                    <div className="mt-2 inline-flex items-center gap-1 text-xs text-nyxara-primary">
                      <ExternalLink className="h-3 w-3" />
                      Enlace externo
                    </div>
                  )}
                </a>
              );
            })}
          </div>
        </div>

        {/* Final Disclaimer */}
        <div className="mt-8">
          <div className="bg-gray-900/30 rounded-xl p-6 text-center">
            <Clock className="h-8 w-8 text-gray-400 mx-auto mb-4" />
            <h4 className="font-bold text-lg mb-2">Última Actualización</h4>
            <p className="text-gray-400 mb-4">
              Esta política fue actualizada el {new Date().toLocaleDateString('es-ES', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}. Revisaremos y actualizaremos según sea necesario.
            </p>
            <p className="text-sm text-gray-500">
              Para preguntas sobre esta política, contacta a legal@nyxara.app
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}