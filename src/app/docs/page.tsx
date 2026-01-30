import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  BookOpen, 
  Code, 
  FileText, 
  Shield, 
  Music, 
  Users,
  Zap,
  Settings,
  Globe,
  ArrowRight,
  Search,
  Filter,
  Download,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentación | Nyxara Bot',
  description: 'Documentación completa y guías de uso de Nyxara Bot.',
};

export default function DocsPage() {
  const categories = [
    {
      title: 'Primeros Pasos',
      description: 'Comienza con Nyxara en tu servidor',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
      docs: [
        { title: 'Instalación', href: '/docs/installation' },
        { title: 'Configuración Inicial', href: '/docs/setup' },
        { title: 'Permisos del Bot', href: '/docs/permissions' },
        { title: 'Solución de Problemas', href: '/docs/troubleshooting' },
      ]
    },
    {
      title: 'Moderación',
      description: 'Mantén tu servidor seguro y organizado',
      icon: Shield,
      color: 'from-green-500 to-emerald-500',
      docs: [
        { title: 'Comandos de Moderación', href: '/docs/moderation/commands' },
        { title: 'Sistema de Advertencias', href: '/docs/moderation/warnings' },
        { title: 'Logs Automáticos', href: '/docs/moderation/logs' },
        { title: 'Anti-Raid', href: '/docs/moderation/anti-raid' },
      ]
    },
    {
      title: 'Música',
      description: 'Sistema de música premium',
      icon: Music,
      color: 'from-purple-500 to-pink-500',
      docs: [
        { title: 'Reproducción de Música', href: '/docs/music/playback' },
        { title: 'Colas y Listas', href: '/docs/music/queues' },
        { title: 'Efectos de Audio', href: '/docs/music/effects' },
        { title: 'Radio en Vivo', href: '/docs/music/radio' },
      ]
    },
    {
      title: 'Niveles y Economía',
      description: 'Sistema de progresión y economía',
      icon: Users,
      color: 'from-yellow-500 to-orange-500',
      docs: [
        { title: 'Sistema de Niveles', href: '/docs/levels/system' },
        { title: 'Recompensas', href: '/docs/levels/rewards' },
        { title: 'Economía del Servidor', href: '/docs/economy' },
        { title: 'Tienda Personalizada', href: '/docs/shop' },
      ]
    },
    {
      title: 'Configuración Avanzada',
      description: 'Personalización avanzada del bot',
      icon: Settings,
      color: 'from-gray-500 to-gray-700',
      docs: [
        { title: 'Dashboard Web', href: '/docs/configuration/dashboard' },
        { title: 'API y Webhooks', href: '/docs/configuration/api' },
        { title: 'Comandos Personalizados', href: '/docs/configuration/custom-commands' },
        { title: 'Integraciones', href: '/docs/configuration/integrations' },
      ]
    },
    {
      title: 'Desarrollo',
      description: 'Para desarrolladores y contribuidores',
      icon: Code,
      color: 'from-red-500 to-pink-500',
      docs: [
        { title: 'API Reference', href: '/docs/api/reference' },
        { title: 'Crear Comandos', href: '/docs/development/commands' },
        { title: 'Contribuir al Proyecto', href: '/docs/development/contributing' },
        { title: 'Self-Hosting', href: '/docs/development/self-hosting' },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-nyxara-dark to-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-nyxara-primary to-nyxara-secondary">
            <BookOpen className="h-3 w-3 mr-2" />
            Documentación Completa
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-nyxara-primary via-purple-500 to-nyxara-secondary bg-clip-text text-transparent">
              Documentación de Nyxara
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Aprende a usar todas las características de Nyxara Bot. 
            Guías detalladas, tutoriales y referencia de API.
          </p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar en la documentación..."
                className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-nyxara-primary focus:ring-1 focus:ring-nyxara-primary"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                Buscar
              </Button>
            </div>
          </div>
        </div>
        
        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-center">112</div>
              <p className="text-gray-400 text-center text-sm">Comandos Documentados</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-center">24</div>
              <p className="text-gray-400 text-center text-sm">Categorías</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-center">50+</div>
              <p className="text-gray-400 text-center text-sm">Páginas</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-center">10K+</div>
              <p className="text-gray-400 text-center text-sm">Palabras</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card key={index} className="bg-gradient-to-br from-gray-900 to-black border-gray-800 hover:border-nyxara-primary/50 transition-all hover:scale-[1.02]">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle>{category.title}</CardTitle>
                      <p className="text-gray-400 text-sm">{category.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.docs.map((doc, docIndex) => (
                      <Link
                        key={docIndex}
                        href={doc.href}
                        className="flex items-center justify-between p-2 hover:bg-gray-800/50 rounded-lg transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span>{doc.title}</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-500 group-hover:text-nyxara-primary transition-colors" />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Getting started */}
        <Card className="bg-gradient-to-r from-nyxara-primary/10 to-nyxara-secondary/10 border-nyxara-primary/20 mb-12">
          <CardContent className="py-12">
            <div className="text-center mb-10">
              <Zap className="h-16 w-16 text-nyxara-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Comienza Rápido</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Sigue estos pasos para tener Nyxara funcionando en tu servidor en minutos
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  step: '1',
                  title: 'Invitar el Bot',
                  description: 'Añade Nyxara a tu servidor con los permisos necesarios',
                  action: 'Invitar ahora'
                },
                {
                  step: '2',
                  title: 'Configurar Permisos',
                  description: 'Ajusta los roles y permisos en tu servidor',
                  action: 'Guía de permisos'
                },
                {
                  step: '3',
                  title: 'Probar Comandos',
                  description: 'Comienza usando los comandos básicos',
                  action: 'Ver comandos'
                },
              ].map((item, index) => (
                <div key={index} className="bg-gray-900/50 rounded-xl p-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-nyxara-primary to-nyxara-secondary flex items-center justify-center text-white font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-gray-400 mb-4">{item.description}</p>
                  <Button variant="outline" className="w-full gap-2">
                    {item.action}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Additional resources */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6">Recursos Adicionales</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              PDF Completo
            </Button>
            <Button variant="outline" className="gap-2">
              <Code className="h-4 w-4" />
              Ejemplos de Código
            </Button>
            <Button variant="outline" className="gap-2">
              <Globe className="h-4 w-4" />
              Video Tutoriales
            </Button>
            <Button variant="outline" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              API Reference
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}