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
    avatar: "https://i.pinimg.com/236x/50/42/56/504256185a1f17e9a38211f9e5ee6054.jpg",
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
    avatar: "https://avatars.githubusercontent.com/u/94134376?v=4",
    discordTag: "codex_dev",
    links: {
      youtube: "https://youtube.com/colabx",
      github: "https://github.com/colabx"
    }
  },
];

export function TeamSection() {
  return (
    <section className="team-section">
      <div className="team-inner">
        <div className="team-header">
          <h2 className="team-title">Nuestro Equipo</h2>
          <p className="team-desc">Conoce al equipo detrás de Nyxara, el bot que revoluciona tus servidores de Discord.</p>
        </div>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <Card key={index} className="team-card group">
              <CardHeader className="team-card-header">
                <div className="team-avatar-div">
                  <img 
                    src={member.avatar} 
                    alt={member.name} 
                    className="team-avatar"
                    width={128}
                    height={128}
                  />
                </div>
                <CardTitle className="team-card-title">{member.name}</CardTitle>
                <p className="team-role">{member.role}</p>
              </CardHeader>
              <CardContent className="team-card-content">
                <p className="team-description">{member.description}</p>
                {member.discordTag && (
                  <div className="team-discord">
                    <MessageCircle className="team-icon" />
                    {member.discordTag}
                  </div>
                )}
                {member.links && (
                  <div className="team-social">
                    {member.links.github && (
                      <Link href={member.links.github} target="_blank">
                        <Github className="team-social-icon" />
                      </Link>
                    )}
                    {member.links.twitter && (
                      <Link href={member.links.twitter} target="_blank">
                        <Twitter className="team-social-icon" />
                      </Link>
                    )}
                    {member.links.youtube && (
                      <Link href={member.links.youtube} target="_blank">
                        <Youtube className="team-social-icon" />
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