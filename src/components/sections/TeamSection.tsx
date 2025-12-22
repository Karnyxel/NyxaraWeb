'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Twitter, Youtube, Linkedin, Mail, ExternalLink, Sparkles, Globe } from "lucide-react";
import Link from "next/link";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  avatar: string;
  discordTag?: string;
  badges?: string[];
  links?: {
    github?: string;
    twitter?: string;
    youtube?: string;
    linkedin?: string;
    portfolio?: string;
    email?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "Karnyxel",
    role: "Desarrollador Principal",
    description: "Creador del bot Nyxara, experto en Discord.js y TypeScript. Apasionado por crear experiencias interactivas únicas en Discord.",
    avatar: "https://i.pinimg.com/236x/50/42/56/504256185a1f17e9a38211f9e5ee6054.jpg",
    discordTag: "karnyxel",
    badges: ["Fundador", "Desarrollador"],
    links: {
      github: "https://github.com/Karnyxel",
      twitter: "https://twitter.com/Karnyxel",
      portfolio: "https://karnyxel.dev"
    }
  },
  {
    name: "Sofia Rodríguez",
    role: "Diseñadora UI/UX",
    description: "Especialista en diseño de interfaces y experiencia de usuario. Transforma ideas complejas en experiencias intuitivas.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop",
    discordTag: "sofia.design",
    badges: ["Diseño", "UI/UX"],
    links: {
      behance: "https://behance.net/sofiarodriguez",
      linkedin: "https://linkedin.com/in/sofiarodriguez",
      portfolio: "https://sofiarodriguez.design"
    }
  },
  {
    name: "Alex Chen",
    role: "Desarrollador Backend",
    description: "Experto en arquitectura de sistemas y APIs. Se asegura de que Nyxara sea rápido, seguro y escalable.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    discordTag: "alex.chen",
    badges: ["Backend", "DevOps"],
    links: {
      github: "https://github.com/alexchen",
      linkedin: "https://linkedin.com/in/alexchen",
      twitter: "https://twitter.com/alexchen_dev"
    }
  },
  {
    name: "María García",
    role: "Community Manager",
    description: "Gestiona nuestra comunidad y se asegura de que todos los usuarios tengan la mejor experiencia posible.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    discordTag: "maria.cm",
    badges: ["Comunidad", "Soporte"],
    links: {
      twitter: "https://twitter.com/mariagarcia_cm",
      linkedin: "https://linkedin.com/in/mariagarcia"
    }
  },
  {
    name: "David Kim",
    role: "Desarrollador Frontend",
    description: "Crea interfaces hermosas y funcionales. Especialista en React, Next.js y animaciones web.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    discordTag: "david.kim",
    badges: ["Frontend", "React"],
    links: {
      github: "https://github.com/davidkim",
      portfolio: "https://davidkim.dev",
      twitter: "https://twitter.com/davidkim_dev"
    }
  },
  {
    name: "Lisa Wang",
    role: "Content Creator",
    description: "Crea contenido educativo sobre Nyxara. Sus tutoriales ayudan a miles de usuarios cada día.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
    discordTag: "lisa.creates",
    badges: ["Contenido", "Educación"],
    links: {
      youtube: "https://youtube.com/lisawang",
      twitter: "https://twitter.com/lisawang_cc",
      tiktok: "https://tiktok.com/@lisawang"
    }
  },
];

const getSocialIcon = (platform: string) => {
  switch (platform) {
    case 'github': return Github;
    case 'twitter': return Twitter;
    case 'youtube': return Youtube;
    case 'linkedin': return Linkedin;
    case 'portfolio': return Globe;
    case 'email': return Mail;
    default: return ExternalLink;
  }
};

export function TeamSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      <div className="container mx-auto max-w-7xl">
        {/* Header con mejor diseño */}
        <div className="text-center mb-16 relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-gradient-to-r from-nyxara-primary/10 to-nyxara-secondary/10 rounded-full blur-3xl" />
          
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-nyxara-primary/10 to-nyxara-secondary/10 text-nyxara-primary mb-6">
            <Sparkles className="h-4 w-4" />
            Conoce al equipo
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-nyxara-primary via-purple-500 to-nyxara-secondary bg-clip-text text-transparent">
              Nuestro Equipo
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            El talentoso grupo de personas detrás de Nyxara, trabajando juntos para crear
            la mejor experiencia en Discord.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Activos ahora</span>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-500">
              {teamMembers.length} miembros • Desde 2023
            </div>
          </div>
        </div>

        {/* Grid de miembros del equipo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => {
            const delay = index * 100;
            
            return (
              <div
                key={index}
                className="group relative"
                style={{ animationDelay: `${delay}ms` }}
              >
                {/* Efecto de fondo */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-nyxara-primary/20 to-nyxara-secondary/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                
                <Card className="relative h-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 overflow-hidden group-hover:border-nyxara-primary/30 transition-all duration-300 hover:scale-[1.02]">
                  {/* Avatar con efecto */}
                  <div className="relative">
                    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-nyxara-primary/20 to-nyxara-secondary/20" />
                    <div className="relative flex justify-center -mt-16">
                      <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-nyxara-primary to-nyxara-secondary rounded-full opacity-0 group-hover:opacity-20 transition duration-500 blur-xl" />
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="relative w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-900 shadow-xl group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-green-500 border-2 border-white dark:border-gray-900" />
                      </div>
                    </div>
                  </div>

                  <CardHeader className="text-center pt-6">
                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {member.name}
                    </CardTitle>
                    
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-gradient-to-r from-nyxara-primary/10 to-nyxara-secondary/10 text-nyxara-primary rounded-full text-sm font-medium">
                        {member.role}
                      </span>
                      {member.badges && member.badges.slice(0, 1).map((badge, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs">
                          {badge}
                        </span>
                      ))}
                    </div>

                    {member.discordTag && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">D</span>
                        </div>
                        <span className="text-sm font-mono text-gray-700 dark:text-gray-300">
                          {member.discordTag}
                        </span>
                      </div>
                    )}
                  </CardHeader>

                  <CardContent className="text-center">
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {member.description}
                    </p>

                    {/* Links sociales */}
                    {member.links && Object.keys(member.links).length > 0 && (
                      <div className="flex flex-wrap gap-3 justify-center">
                        {Object.entries(member.links).map(([platform, url], i) => {
                          const Icon = getSocialIcon(platform);
                          return (
                            <Link
                              key={i}
                              href={url}
                              target="_blank"
                              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gradient-to-r hover:from-nyxara-primary hover:to-nyxara-secondary hover:text-white transition-all duration-300 group/link"
                              title={`${platform} de ${member.name}`}
                            >
                              <Icon className="h-5 w-5 group-hover/link:scale-110 transition-transform" />
                            </Link>
                          );
                        })}
                      </div>
                    )}

                    {/* Ver más información (hover effect) */}
                    <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Pasa el cursor para ver detalles
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Sección de estadísticas */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { label: "Experiencia total", value: "5+ años" },
            { label: "Proyectos completados", value: "50+" },
            { label: "Usuarios activos", value: "10k+" },
            { label: "Soporte 24/7", value: "100%" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-nyxara-primary to-nyxara-secondary bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-r from-nyxara-primary/5 to-nyxara-secondary/5 border border-nyxara-primary/10">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              ¿Quieres unirte al equipo?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Siempre estamos buscando talento apasionado para ayudar a hacer crecer Nyxara.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/contacto"
                className="px-8 py-3 bg-gradient-to-r from-nyxara-primary to-nyxara-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-nyxara-primary/30 transition-all"
              >
                Contactar
              </Link>
              <Link
                href="/vacantes"
                className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              >
                Ver vacantes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}