'use client';

import { useState } from 'react';
import TeamMemberCard from './TeamMemberCard';
import { TeamMember } from '../types';

const teamData: TeamMember[] = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Founder & Lead Developer",
    description: "Apasionado por crear soluciones innovadoras con tecnología de vanguardia.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    socialLinks: {
      github: "https://github.com/alexchen",
      twitter: "https://twitter.com/alexchen",
    },
    skills: ["TypeScript", "React", "Node.js", "AI/ML"]
  },
  {
    id: 2,
    name: "Maya Rodriguez",
    role: "UI/UX Designer",
    description: "Diseñadora especializada en experiencias de usuario fluidas y atractivas.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
    socialLinks: {
      github: "https://github.com/mayarodriguez",
      linkedin: "https://linkedin.com/in/mayarodriguez",
    },
    skills: ["Figma", "UI Design", "User Research", "Prototyping"]
  },
  {
    id: 3,
    name: "Jordan Smith",
    role: "Backend Engineer",
    description: "Experto en arquitectura de sistemas escalables y bases de datos.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
    socialLinks: {
      github: "https://github.com/jordansmith",
      discord: "https://discord.com/users/jordansmith",
    },
    skills: ["Python", "PostgreSQL", "Docker", "AWS"]
  },
  {
    id: 4,
    name: "Sam Taylor",
    role: "DevOps Specialist",
    description: "Automatizando despliegues y optimizando infraestructura en la nube.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
    socialLinks: {
      github: "https://github.com/samtaylor",
      twitter: "https://twitter.com/samtaylor",
    },
    skills: ["Kubernetes", "CI/CD", "Terraform", "Monitoring"]
  }
];

export default function TeamSection() {
  const [filter, setFilter] = useState<string>('all');

  const filteredMembers = filter === 'all' 
    ? teamData 
    : teamData.filter(member => 
        member.skills.some(skill => 
          skill.toLowerCase().includes(filter.toLowerCase())
        )
      );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Nuestro Equipo
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Conoce al equipo detrás de Nyxara. Apasionados por crear la mejor experiencia para nuestros usuarios.
          </p>
          
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full transition-all ${filter === 'all' 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Todos
            </button>
            {['Frontend', 'Backend', 'Design', 'DevOps'].map((skill) => (
              <button
                key={skill}
                onClick={() => setFilter(skill)}
                className={`px-6 py-2 rounded-full transition-all ${filter === skill.toLowerCase() 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Proyectos Completados", value: "50+" },
            { label: "Años de Experiencia", value: "15+" },
            { label: "Usuarios Activos", value: "10K+" },
            { label: "Satisfacción", value: "99%" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gray-900/50 rounded-2xl border border-gray-800">
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}