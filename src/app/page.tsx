// src/app/page.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, Shield, Music, Zap, Sparkles } from 'lucide-react';
import { botAPI } from '@/lib/api/bot-client';
import Link from 'next/link';

export default async function Home() {

  const stats = await botAPI.getPublicStats();
  
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-6xl md:text-8xl font-bold mb-6">
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
            Nyxara
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          El bot de Discord más avanzado con dashboard interactivo, 
          moderación inteligente y sistema de música de alta calidad.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Bot className="mr-2" />
            Invitar a Discord
          </Button>
          <Button size="lg" variant="outline">
            <Zap className="mr-2" />
            Ver Dashboard
          </Button>
        </div>
      </section>
      
      {/* Stats en tiempo real */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400">
                  {stats.guilds?.toLocaleString() || '0'}
                </div>
                <div className="text-gray-400">Servidores</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-400">
                  {stats.users?.toLocaleString() || '0'}
                </div>
                <div className="text-gray-400">Usuarios</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-rose-400">
                  {stats.commands?.toLocaleString() || '50+'}
                </div>
                <div className="text-gray-400">Comandos</div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 backdrop-blur-lg border-white/10">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-violet-400">
                  {stats.uptime ? `${Math.floor(stats.uptime / 3600)}h` : '24/7'}
                </div>
                <div className="text-gray-400">Uptime</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Features */}
      <section>
        <h2 className="text-4xl font-bold text-center mb-12">
          Características <span className="text-purple-400">Destacadas</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Shield className="h-10 w-10" />}
            title="Moderación Avanzada"
            description="Sistema de moderación automática, logs detallados y protección contra raids."
          />
          <FeatureCard 
            icon={<Music className="h-10 w-10" />}
            title="Música de Alta Calidad"
            description="Reproductor con búsqueda en YouTube, Spotify, y colas ilimitadas."
          />
          <FeatureCard 
            icon={<Sparkles className="h-10 w-10" />}
            title="Dashboard Interactivo"
            description="Configura tu servidor desde una web bonita y fácil de usar."
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <Card className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-colors">
      <CardContent className="pt-6">
        <div className="text-purple-400 mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </CardContent>
    </Card>
  );
}