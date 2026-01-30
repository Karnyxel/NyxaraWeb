// src/components/layout/Footer.tsx - VERSIÓN CORREGIDA
'use client';

import Link from 'next/link';
import { 
  Bot, 
  Github, 
  Twitter, 
  MessageSquare, 
  Heart, 
  Mail, 
  Globe,
  Shield,
  Users,
  Code,
  BookOpen,
  ArrowUp,
  Sparkles,
  ExternalLink,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number>(2024);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const links = {
    producto: [
      { name: 'Comandos', href: '/commands', icon: Code },
      { name: 'Características', href: '/features', icon: Sparkles },
      { name: 'Planes', href: '/plans', icon: Shield },
      { name: 'Estadísticas', href: '/stats', icon: Users },
    ],
    comunidad: [
      { name: 'Equipo', href: '/team', icon: Users },
      { name: 'Partners', href: '/partners', icon: Globe },
      { name: 'Documentación', href: '/docs', icon: BookOpen },
      { name: 'Blog', href: '/blog', icon: BookOpen },
    ],
    legal: [
      { name: 'Términos de Servicio', href: '/terms', icon: Shield },
      { name: 'Política de Privacidad', href: '/privacy', icon: Shield },
      { name: 'Cookies', href: '/cookies', icon: Shield },
      { name: 'DMCA', href: '/dmca', icon: Shield },
    ],
    soporte: [
      { name: 'FAQ', href: '/faq', icon: BookOpen },
      { name: 'Soporte', href: '/support', icon: MessageSquare },
      { name: 'Contacto', href: '/contact', icon: Mail },
      { name: 'Reportar Bug', href: '/report', icon: Shield },
    ],
  };

  const stats = [
    { value: '128+', label: 'Servidores', color: 'text-purple-400' },
    { value: '25K+', label: 'Usuarios', color: 'text-pink-400' },
    { value: '112', label: 'Comandos', color: 'text-blue-400' },
    { value: '99.8%', label: 'Uptime', color: 'text-green-400' },
  ];

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/NyxaraBot', color: 'hover:text-gray-300' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/NyxaraBot', color: 'hover:text-blue-400' },
    { name: 'Discord', icon: MessageSquare, href: 'https://discord.gg/nyxara', color: 'hover:text-indigo-400' },
    { name: 'Email', icon: Mail, href: 'mailto:contacto@nyxara.com', color: 'hover:text-red-400' },
  ];

  return (
    <footer className="relative mt-32 border-t border-white/10 bg-gradient-to-b from-black/50 to-black">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-nyxara-primary/5 to-transparent" />
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-gradient-to-r from-nyxara-primary to-nyxara-secondary text-white shadow-2xl shadow-nyxara-primary/30 hover:shadow-nyxara-primary/50 transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}

      <div className="container relative mx-auto px-4 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-nyxara-primary to-nyxara-secondary rounded-full opacity-20 blur-xl" />
                <Bot className="h-10 w-10 text-nyxara-primary relative z-10" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-nyxara-primary to-nyxara-secondary bg-clip-text text-transparent">
                  Nyxara
                </span>
                <p className="text-xs text-gray-400">Discord Bot</p>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              El bot de Discord definitivo con más de 100 comandos, 
              sistema de música premium y moderación avanzada. 
              Diseñado para comunidades que buscan lo mejor.
            </p>
            
            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg bg-gray-900 text-gray-400 hover:text-white ${social.color} transition-all duration-300 hover:scale-110 hover:bg-gray-800`}
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div className="space-y-6">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-nyxara-primary" />
              Producto
            </h3>
            <ul className="space-y-3">
              {links.producto.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                    >
                      <Icon className="h-4 w-4 text-gray-500 group-hover:text-nyxara-primary transition-colors" />
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Users className="h-4 w-4 text-nyxara-primary" />
              Comunidad
            </h3>
            <ul className="space-y-3">
              {links.comunidad.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                    >
                      <Icon className="h-4 w-4 text-gray-500 group-hover:text-nyxara-primary transition-colors" />
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Shield className="h-4 w-4 text-nyxara-primary" />
              Legal & Soporte
            </h3>
            <ul className="space-y-3">
              {links.legal.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                    >
                      <Icon className="h-4 w-4 text-gray-500 group-hover:text-nyxara-primary transition-colors" />
                      {link.name}
                    </Link>
                  </li>
                );
              })}
              {links.soporte.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                    >
                      <Icon className="h-4 w-4 text-gray-500 group-hover:text-nyxara-primary transition-colors" />
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="bg-gradient-to-r from-nyxara-primary/10 to-nyxara-secondary/10 rounded-2xl p-6 border border-nyxara-primary/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  ¿Listo para mejorar tu servidor?
                </h3>
                <p className="text-gray-400">
                  Añade Nyxara hoy y descubre todas sus características
                </p>
              </div>
              <div className="flex gap-4">
                <Button 
                  variant="premium" 
                  className="gap-2"
                  onClick={() => window.open('https://discord.com/oauth2/authorize?client_id=1432444397299175514&permissions=8&scope=bot%20applications.commands', '_blank')}
                >
                  <Bot className="h-4 w-4" />
                  Invitar Bot
                </Button>
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  <Sparkles className="h-4 w-4" />
                  Ver Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} Nyxara Bot. Todos los derechos reservados.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                No afiliado con Discord Inc. Discord es una marca registrada de Discord Inc.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center text-gray-400 text-sm">
                <span>Hecho con</span>
                <Heart className="h-4 w-4 text-red-500 mx-1 animate-pulse" />
                <span>por la comunidad</span>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>v2.0.0</span>
                <span className="h-1 w-1 rounded-full bg-green-500"></span>
                <span>En línea</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap gap-4 justify-center mt-6 pt-6 border-t border-white/5">
            {[
              { name: 'Status', href: '/status' },
              { name: 'Changelog', href: '/changelog' },
              { name: 'API', href: '/api/docs' },
              { name: 'Developers', href: '/developers' },
              { name: 'Careers', href: '/careers' },
              { name: 'Press', href: '/press' },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter (opcional) */}
        <div className="mt-8">
          <div className="max-w-md mx-auto">
            <p className="text-center text-gray-400 text-sm mb-4">
              Suscríbete para recibir actualizaciones y novedades
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-nyxara-primary focus:ring-1 focus:ring-nyxara-primary"
              />
              <Button type="submit" className="gap-2">
                <Mail className="h-4 w-4" />
                Suscribir
              </Button>
            </form>
            <p className="text-center text-gray-500 text-xs mt-2">
              Sin spam. Solo contenido útil sobre Nyxara.
            </p>
          </div>
        </div>
      </div>

      {/* Particle effect (opcional) */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nyxara-primary/50 to-transparent" />
    </footer>
  );
}