'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Users, 
  Mail, 
  Github, 
  Twitter, 
  Linkedin, 
  Globe, 
  Calendar,
  Award,
  Sparkles,
  Filter,
  Search
} from 'lucide-react';

interface TeamMember {
  id: number;
  displayname: string;
  bio: string;
  avatarurl: string;
  sociallinks: Record<string, string>;
  skills: string[];
  joindate: string;
  position_name: string;
  department_name: string;
  department_color: string;
  department_icon: string;
}

export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadTeamData();
  }, []);

  const loadTeamData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/team');
      const data = await response.json();
      
      if (data.success) {
        setTeamMembers(data.data.teamMembers || []);
        setDepartments(data.data.departments || []);
      }
    } catch (error) {
      console.error('Error loading team data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesDepartment = selectedDepartment === 'all' || 
                             member.department_name === selectedDepartment;
    const matchesSearch = searchTerm === '' || 
                         member.displayname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.position_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesDepartment && matchesSearch;
  });

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github': return Github;
      case 'twitter': return Twitter;
      case 'linkedin': return Linkedin;
      case 'website': return Globe;
      case 'email': return Mail;
      default: return Globe;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long'
    });
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nyxara-primary"></div>
        <p className="mt-4 text-gray-400">Cargando equipo...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <Badge className="mb-4 bg-gradient-to-r from-nyxara-primary to-nyxara-secondary">
          <Users className="h-3 w-3 mr-2" />
          {teamMembers.length} Miembros
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-nyxara-primary via-purple-500 to-nyxara-secondary bg-clip-text text-transparent">
            Nuestro Equipo
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          El talentoso grupo de personas que hace posible Nyxara. 
          Conoce a los desarrolladores, diseñadores y moderadores detrás del proyecto.
        </p>
      </div>

      {/* Filtros */}
      <div className="mb-8 bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Búsqueda */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar miembros del equipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-nyxara-primary focus:ring-1 focus:ring-nyxara-primary"
            />
          </div>

          {/* Departamentos */}
          <div className="flex gap-2">
            <Button
              variant={selectedDepartment === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedDepartment('all')}
              className="flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              Todos
            </Button>
            {departments.map(dept => (
              <Button
                key={dept.id}
                variant={selectedDepartment === dept.name ? 'default' : 'outline'}
                onClick={() => setSelectedDepartment(dept.name)}
                className="flex items-center gap-2"
                style={{
                  backgroundColor: selectedDepartment === dept.name ? dept.color : undefined
                }}
              >
                <span>{dept.icon}</span>
                {dept.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Estadísticas */}
        <div className="flex flex-wrap gap-4 mt-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
            <Users className="h-5 w-5 text-nyxara-primary" />
            <span className="font-semibold">{teamMembers.length}</span>
            <span className="text-gray-400">miembros totales</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
            <Award className="h-5 w-5 text-yellow-500" />
            <span className="font-semibold">{departments.length}</span>
            <span className="text-gray-400">departamentos</span>
          </div>
        </div>
      </div>

      {/* Grid de miembros */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:border-nyxara-primary/50 transition-all duration-300 hover:scale-[1.02] group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div 
                        className="absolute -inset-2 rounded-full opacity-20 blur-xl"
                        style={{ backgroundColor: member.department_color }}
                      />
                      <img
                        src={member.avatarurl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.displayname}`}
                        alt={member.displayname}
                        className="relative w-16 h-16 rounded-full object-cover border-2 border-white/20 group-hover:border-nyxara-primary transition-colors"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{member.displayname}</CardTitle>
                      <Badge 
                        variant="outline"
                        className="mt-2"
                        style={{ 
                          borderColor: member.department_color,
                          color: member.department_color
                        }}
                      >
                        {member.position_name}
                      </Badge>
                    </div>
                  </div>
                  <Badge 
                    className="px-3 py-1"
                    style={{ backgroundColor: member.department_color }}
                  >
                    {member.department_icon} {member.department_name}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-6 line-clamp-3">{member.bio}</p>
                
                {/* Habilidades */}
                {member.skills && member.skills.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-2">Habilidades:</p>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Redes sociales */}
                {member.sociallinks && Object.keys(member.sociallinks).length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-2">Conectar:</p>
                    <div className="flex gap-3">
                      {Object.entries(member.sociallinks).map(([platform, url]) => {
                        const Icon = getSocialIcon(platform);
                        return (
                          <a
                            key={platform}
                            href={url as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors group/social"
                            title={`${platform} de ${member.displayname}`}
                          >
                            <Icon className="h-5 w-5 group-hover/social:scale-110 transition-transform" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Fecha de ingreso */}
                <div className="flex items-center gap-2 text-sm text-gray-500 pt-4 border-t border-gray-800">
                  <Calendar className="h-4 w-4" />
                  <span>Se unió en {formatDate(member.joindate)}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-20">
          <Users className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">No se encontraron miembros</h3>
          <p className="text-gray-400">Intenta con otros filtros de búsqueda</p>
        </div>
      )}

      {/* CTA */}
      <div className="mt-16 text-center">
        <Card className="bg-gradient-to-r from-nyxara-primary/10 to-nyxara-secondary/10 border-nyxara-primary/20">
          <CardContent className="py-12">
            <Sparkles className="h-16 w-16 text-nyxara-primary mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4">
              ¿Quieres unirte al equipo?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Siempre estamos buscando talento apasionado para ayudar a hacer crecer Nyxara.
              Si eres desarrollador, diseñador o simplemente te apasiona Discord, ¡queremos conocerte!
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="premium" className="gap-3">
                <Mail className="h-5 w-5" />
                Contactar
              </Button>
              <Button variant="outline" className="gap-3">
                <Users className="h-5 w-5" />
                Ver vacantes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}