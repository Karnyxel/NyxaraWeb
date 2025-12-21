'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Github, Twitter, Youtube, MessageCircle } from "lucide-react";
import Link from "next/link";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  avatar: string;
  discordTag?: string; 
  links?: {
    github?: string;
    twitter?: string;
    youtube?: string;
    linkedin?: string,
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "Karnyxel",
    role: "Desarrollador Principal",
    description: "Creador del bot Nyxara y experto en Discord.js.",
    avatar: "/avatars/karnyxel.png",
    discordTag: "karnyxel",
    links: {
      github: "https://github.com/Karnyxel",
      twitter: "https://twitter.com/Karnyxel"
    }
  },
  {
    name: "Colaborador X",
    role: "Diseñador",
    description: "Encargado de UI/UX y estilos.",
    avatar: "/avatars/colaborador.png",
    discordTag: "codex_dev",
    links: {
      youtube: "https://youtube.com/colabx",
      github: "https://github.com/colabx"
    }
  },
];

export function TeamSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
            <Users className="h-8 w-8 text-primary" />
            Nuestro Equipo
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conoce al equipo detrás de Nyxara, el bot que revoluciona tus servidores de Discord.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="glass-effect card-hover overflow-hidden hover:shadow-xl transition-all duration-300">
              <CardHeader className="p-0">
                {/* Use standard img tag instead */}
                <img
                    src={member.avatar}
                    alt={`Avatar de ${member.name}`}
                    className="w-full h-48 object-cover"
                    // Remove placeholder and blurDataURL props
                    // Use a default src or CSS fallback instead
                />
                </CardHeader>
              <CardContent className="p-6 text-center">
                <CardTitle className="text-2xl font-semibold mb-2">
                  {member.name}
                </CardTitle>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-muted-foreground mb-6">{member.description}</p>
                
                {member.discordTag && (
                  <div className="flex items-center justify-center gap-2 mb-4 text-sm text-muted-foreground">
                    <MessageCircle className="h-4 w-4" />
                    <span>{member.discordTag}</span>
                  </div>
                )}
                
                {member.links && (
                  <div className="flex justify-center gap-4 mt-4">
                    {member.links.github && (
                      <Link href={member.links.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-5 w-5 hover:text-primary transition-colors" />
                      </Link>
                    )}
                    {member.links.twitter && (
                      <Link href={member.links.twitter} target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-5 w-5 hover:text-primary transition-colors" />
                      </Link>
                    )}
                    {member.links.youtube && (
                      <Link href={member.links.youtube} target="_blank" rel="noopener noreferrer">
                        <Youtube className="h-5 w-5 hover:text-primary transition-colors" />
                      </Link>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}