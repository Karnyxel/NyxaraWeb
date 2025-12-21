// src/app/page.tsx (versión simplificada)
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, Shield, Music, Zap, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Nyxara
          </span>
        </h1>
        <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
          El bot de Discord más avanzado con dashboard interactivo
        </p>
        <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600">
          <Bot className="mr-2" />
          Invitar a Discord
        </Button>
      </section>
      
      {/* Stats Cards */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">128</div>
                <div className="text-gray-400">Servidores</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">25,847</div>
                <div className="text-gray-400">Usuarios</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-rose-400">50+</div>
                <div className="text-gray-400">Comandos</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-violet-400">24/7</div>
                <div className="text-gray-400">Uptime</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Features */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">
          Características <span className="text-purple-400">Destacadas</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<Shield className="h-8 w-8" />}
            title="Moderación Avanzada"
            description="Sistema de moderación automática y logs detallados."
          />
          <FeatureCard 
            icon={<Music className="h-8 w-8" />}
            title="Música de Calidad"
            description="Reproductor con búsqueda y colas ilimitadas."
          />
          <FeatureCard 
            icon={<Sparkles className="h-8 w-8" />}
            title="Dashboard Interactivo"
            description="Configura tu servidor desde una web bonita."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
      <CardContent className="pt-6">
        <div className="text-purple-400 mb-3">{icon}</div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}