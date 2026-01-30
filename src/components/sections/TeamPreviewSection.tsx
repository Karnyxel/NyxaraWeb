// src/components/sections/TeamPreviewSection.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Users, 
  ChevronRight, 
  Github, 
  Twitter, 
  Linkedin,
  Sparkles,
  Shield,
  Code,
  Palette
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface TeamMember {
  id: number;
  displayname: string;
  bio: string;
  avatarurl: string;
  sociallinks: any;
  position: {
    name: string;
    department: {
      name: string;
      color: string;
    };
  };
}

export default function TeamPreviewSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState<any[]>([]);

  useEffect(() => {
    loadTeamData();
  }, []);

  const loadTeamData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/team');
      const data = await response.json();
      
      if (data.success) {
        // Tomar solo los primeros 4 miembros para la vista previa
        setTeamMembers(data.data.teamMembers.slice(0, 4));
        setDepartments(data.data.departments);
      }
    } catch (error) {
      console.error('Error loading team data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDepartmentIcon = (departmentName: string) => {
    switch (departmentName.toLowerCase()) {
      case 'desarrollo':
        return <Code className="h-4 w-4" />;
      case 'diseño web':
        return <Palette className="h-4 w-4" />;
      case 'moderación':
        return <Shield className="h-4 w-4" />;
      default:
        return <Users className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-nyxara-dark/30 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-12 w-48 bg-gray-800 rounded-lg mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 w-64 bg-gray-800 rounded-lg mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-nyxara-dark/30 to-transparent">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500">
            <Sparkles className="h-3 w-3 mr-2" />
            Equipo de Élite
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Conoce a nuestro{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Equipo Creativo
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Profesionales apasionados trabajando juntos para crear la mejor experiencia en Discord.
          </p>
        </motion.div>

        {/* Team members grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-900/30 border border-gray-800 p-6 transition-all duration-500 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10">
                {/* Background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Avatar */}
                <div className="relative z-10 mb-6">
                  <div className="relative w-24 h-24 mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity" />
                    <img
                      src={member.avatarurl || '/default-avatar.png'}
                      alt={member.displayname}
                      className="relative w-24 h-24 rounded-full border-4 border-gray-900 object-cover z-10"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-full">
                      {getDepartmentIcon(member.position.department.name)}
                    </div>
                  </div>
                </div>

                {/* Member info */}
                <div className="relative z-10 text-center">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">
                    {member.displayname}
                  </h3>
                  
                  <div className="mb-4">
                    <Badge 
                      className="mb-2"
                      style={{ 
                        backgroundColor: `${member.position.department.color}20`,
                        color: member.position.department.color
                      }}
                    >
                      {member.position.name}
                    </Badge>
                    <p className="text-sm text-gray-400 line-clamp-3">
                      {member.bio || 'Miembro del equipo de Nyxara'}
                    </p>
                  </div>

                  {/* Social links */}
                  {member.sociallinks && (
                    <div className="flex justify-center gap-3 mt-4">
                      {member.sociallinks.github && (
                        <a
                          href={member.sociallinks.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                      {member.sociallinks.twitter && (
                        <a
                          href={member.sociallinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-400 transition-colors"
                        >
                          <Twitter className="h-5 w-5" />
                        </a>
                      )}
                      {member.sociallinks.linkedin && (
                        <a
                          href={member.sociallinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-500 transition-colors"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500/20 rounded-2xl transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Departments stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-gray-900/30 to-gray-900/10 rounded-2xl border border-gray-800 p-8 mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {departments.map((dept, index) => (
              <div key={dept.id} className="text-center">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: `${dept.color}20`, color: dept.color }}
                >
                  {getDepartmentIcon(dept.name)}
                </div>
                <h4 className="font-semibold mb-1">{dept.name}</h4>
                <p className="text-sm text-gray-400">Equipo especializado</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/team">
            <Button size="lg" className="group">
              <span className="flex items-center gap-3">
                <Users className="h-5 w-5" />
                Ver equipo completo
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </Link>
          <p className="text-gray-400 mt-4">
            Conoce a todos los miembros y sus roles en el proyecto
          </p>
        </motion.div>
      </div>
    </section>
  );
}