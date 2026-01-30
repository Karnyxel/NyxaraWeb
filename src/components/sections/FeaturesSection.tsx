// src/components/sections/FeaturesSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  Shield, 
  Music, 
  Zap, 
  Users, 
  Sparkles, 
  Code,
  BarChart3,
  Gamepad2,
  MessageSquare,
  Globe,
  Lock,
  Brain
} from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: 'Moderación Avanzada',
      description: 'Sistema de moderación con IA, logs automáticos y protección anti-raid.',
      color: 'text-red-400',
      bg: 'bg-red-500/20'
    },
    {
      icon: Music,
      title: 'Música Premium',
      description: 'Reproducción de alta calidad, colas ilimitadas y efectos de audio.',
      color: 'text-purple-400',
      bg: 'bg-purple-500/20'
    },
    {
      icon: Zap,
      title: '112 Comandos',
      description: 'Comandos slash y prefix para todas las necesidades de tu servidor.',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/20'
    },
    {
      icon: Users,
      title: 'Sistema de Niveles',
      description: 'Niveles personalizables, recompensas y economía del servidor.',
      color: 'text-green-400',
      bg: 'bg-green-500/20'
    },
    {
      icon: Brain,
      title: 'IA Integrada',
      description: 'Chatbots, generación de imágenes y análisis de contenido inteligente.',
      color: 'text-blue-400',
      bg: 'bg-blue-500/20'
    },
    {
      icon: BarChart3,
      title: 'Analíticas',
      description: 'Estadísticas detalladas de actividad y crecimiento del servidor.',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/20'
    },
    {
      icon: Gamepad2,
      title: 'Juegos',
      description: 'Minijuegos, economía interactiva y actividades para la comunidad.',
      color: 'text-pink-400',
      bg: 'bg-pink-500/20'
    },
    {
      icon: Lock,
      title: 'Seguridad',
      description: 'Protección contra spam, bots y ataques automáticos.',
      color: 'text-orange-400',
      bg: 'bg-orange-500/20'
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-nyxara-primary to-nyxara-secondary">
            <Sparkles className="h-3 w-3 mr-2" />
            Características Principales
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Todo lo que necesitas en un solo bot
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Nyxara combina todas las funcionalidades que tu servidor de Discord necesita, 
            con una interfaz intuitiva y actualizaciones constantes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="h-full hover:border-nyxara-primary/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className={`p-3 rounded-xl ${feature.bg} w-fit mb-4`}>
                      <Icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}