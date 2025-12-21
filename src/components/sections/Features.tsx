'use client';

import { motion } from 'framer-motion';
import { 
  Shield, 
  MusicNotes, 
  ChartLine, 
  Globe, 
  Lock, 
  Browser 
} from '@phosphor-icons/react';
import { Card } from '../ui/Card';

const features = [
  {
    icon: <Shield size={32} />,
    title: 'Moderación Avanzada',
    description: 'Sistema automático anti-raid, logs detallados y protección 24/7.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: <MusicNotes size={32} />,
    title: 'Música HD',
    description: 'Reproductor con calidad superior, búsqueda en múltiples plataformas.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: <ChartLine size={32} />,
    title: 'Analíticas',
    description: 'Estadísticas detalladas de tu servidor y crecimiento.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: <Browser size={32} />,
    title: 'Dashboard Web',
    description: 'Configura todo desde nuestra web intuitiva y moderna.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: <Globe size={32} />,
    title: 'Chat Global',
    description: 'Conecta tu servidor con comunidades de todo el mundo.',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: <Lock size={32} />,
    title: 'Seguridad Premium',
    description: 'Protección contra spam, bots maliciosos y ataques DDoS.',
    color: 'from-red-500 to-pink-500',
  },
];

export default function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Características Destacadas
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            Todo lo que necesitas para llevar tu servidor al siguiente nivel
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full hover:border-purple-500/50 transition-all duration-300">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <span className="text-sm text-green-400 font-medium">
                    Incluido en todas las versiones
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}