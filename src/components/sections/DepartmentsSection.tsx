// src/components/sections/DepartmentsSection.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Palette, 
  Shield, 
  Users,
  Server,
  Zap,
  ChevronRight
} from 'lucide-react';

interface Department {
  id: number;
  name: string;
  description: string;
  color: string;
  icon: string;
  memberCount: number;
}

export default function DepartmentsSection() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDept, setActiveDept] = useState<number | null>(null);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      setLoading(true);
      // Simular datos de departamentos
      setTimeout(() => {
        setDepartments([
          {
            id: 1,
            name: 'Desarrollo Backend',
            description: 'API del bot, base de datos, y lógica del servidor',
            color: '#3498db',
            icon: '💻',
            memberCount: 4
          },
          {
            id: 2,
            name: 'Frontend & UX',
            description: 'Diseño web, interfaz de usuario, y experiencia del usuario',
            color: '#9b59b6',
            icon: '🎨',
            memberCount: 3
          },
          {
            id: 3,
            name: 'Moderación IA',
            description: 'Sistemas de moderación automática y filtros inteligentes',
            color: '#2ecc71',
            icon: '🛡️',
            memberCount: 2
          },
          {
            id: 4,
            name: 'Infraestructura',
            description: 'Servidores, despliegue, y monitoreo del sistema',
            color: '#e74c3c',
            icon: '🔧',
            memberCount: 2
          },
          {
            id: 5,
            name: 'Soporte',
            description: 'Atención al usuario y gestión de la comunidad',
            color: '#f39c12',
            icon: '👥',
            memberCount: 3
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading departments:', error);
      setLoading(false);
    }
  };

  const getDepartmentIcon = (icon: string) => {
    return <span className="text-2xl">{icon}</span>;
  };

  if (loading) {
    return null;
  }

  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4">Departamentos Especializados</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Cada departamento se enfoca en un área específica para garantizar la excelencia en cada aspecto de Nyxara.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept, index) => (
          <motion.div
            key={dept.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={() => setActiveDept(dept.id)}
            onMouseLeave={() => setActiveDept(null)}
            className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
              activeDept === dept.id 
                ? 'border-purple-500/50 shadow-2xl shadow-purple-500/10' 
                : 'border-gray-800 hover:border-gray-700'
            }`}
            style={{
              background: activeDept === dept.id
                ? `linear-gradient(135deg, ${dept.color}10, transparent)`
                : 'linear-gradient(135deg, rgba(17, 24, 39, 0.5), rgba(31, 41, 55, 0.3))'
            }}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ 
                      backgroundColor: `${dept.color}20`,
                      color: dept.color
                    }}
                  >
                    {getDepartmentIcon(dept.icon)}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{dept.name}</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400">{dept.memberCount} miembros</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div 
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: `${dept.color}20`,
                      color: dept.color
                    }}
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    Activo
                  </div>
                </div>
              </div>

              <p className="text-gray-400 mb-6">
                {dept.description}
              </p>

              <div className="pt-4 border-t border-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Proyectos activos: 2</span>
                  <div className="flex -space-x-2">
                    {[...Array(Math.min(3, dept.memberCount))].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-gray-900"
                        style={{ backgroundColor: dept.color }}
                      />
                    ))}
                    {dept.memberCount > 3 && (
                      <div className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gray-800 flex items-center justify-center text-xs">
                        +{dept.memberCount - 3}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Hover effect */}
            {activeDept === dept.id && (
              <div className="absolute inset-0 border-2 border-purple-500/20 rounded-2xl pointer-events-none" />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}