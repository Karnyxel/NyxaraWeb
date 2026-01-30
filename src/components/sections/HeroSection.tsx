'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Bot, 
  Sparkles, 
  Zap, 
  Shield, 
  Music, 
  Users,
  ArrowRight,
  Star
} from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-nyxara-dark via-black to-nyxara-darker" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      
      {/* Animated elements */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-nyxara-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-nyxara-secondary/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.1, 0.2]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <div className="container relative mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-6 animate-pulse bg-gradient-to-r from-nyxara-primary to-nyxara-secondary px-4 py-2">
              <Sparkles className="h-3 w-3 mr-2" />
              VERSIÓN 2.0 DISPONIBLE
            </Badge>
          </motion.div>
          
          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-nyxara-primary via-purple-500 to-nyxara-secondary bg-clip-text text-transparent bg-[length:200%] animate-gradient">
              Nyxara Bot
            </span>
          </motion.h1>
          
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
          >
            El bot de Discord más completo con{' '}
            <span className="font-bold text-nyxara-primary">112 comandos</span>, 
            sistema de{' '}
            <span className="font-bold text-nyxara-secondary">música premium</span> 
            {' '}y moderación{' '}
            <span className="font-bold text-green-400">inteligente</span>.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/invite">
              <Button size="xl" className="gap-3 group">
                <Bot className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                Invitar a Discord
                <Sparkles className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </Link>
            
            <Link href="/dashboard">
              <Button size="xl" variant="outline" className="gap-3">
                <Users className="h-5 w-5" />
                Ver Dashboard
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {[
              { 
                value: '128+', 
                label: 'Servidores', 
                icon: Shield,
                color: 'text-purple-400',
                increase: '+12 este mes'
              },
              { 
                value: '25K+', 
                label: 'Usuarios', 
                icon: Users,
                color: 'text-pink-400',
                increase: '+1.2K este mes'
              },
              { 
                value: '112', 
                label: 'Comandos', 
                icon: Zap,
                color: 'text-blue-400',
                increase: 'Slash & Prefix'
              },
              { 
                value: '99.8%', 
                label: 'Uptime', 
                icon: Star,
                color: 'text-green-400',
                increase: '30 días'
              },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-nyxara-primary/30 transition-all">
                    <div className="flex items-center justify-center mb-3">
                      <Icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                    <div className="text-3xl font-bold text-center">{stat.value}</div>
                    <div className="text-gray-400 text-center text-sm mt-1">
                      {stat.label}
                    </div>
                    <div className="text-xs text-gray-500 text-center mt-2">
                      {stat.increase}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}