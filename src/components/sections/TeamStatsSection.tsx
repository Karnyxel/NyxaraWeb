// src/components/sections/TeamStatsSection.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Award, 
  Clock, 
  TrendingUp,
  Code,
  Heart,
  Zap,
  Star
} from 'lucide-react';

export default function TeamStatsSection() {
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalDepartments: 0,
    avgExperience: 0,
    activeProjects: 0,
    totalCommits: 0
  });

  useEffect(() => {
    // Simular carga de estadísticas
    setTimeout(() => {
      setStats({
        totalMembers: 12,
        totalDepartments: 5,
        avgExperience: 2.5,
        activeProjects: 8,
        totalCommits: 2450
      });
    }, 1000);
  }, []);

  const statCards = [
    {
      icon: Users,
      label: 'Miembros del Equipo',
      value: stats.totalMembers,
      color: 'text-purple-400',
      bgColor: 'bg-gradient-to-br from-purple-500/20 to-purple-600/10'
    },
    {
      icon: Award,
      label: 'Departamentos',
      value: stats.totalDepartments,
      color: 'text-blue-400',
      bgColor: 'bg-gradient-to-br from-blue-500/20 to-blue-600/10'
    },
    {
      icon: Clock,
      label: 'Años de Experiencia',
      value: `${stats.avgExperience}+`,
      color: 'text-green-400',
      bgColor: 'bg-gradient-to-br from-green-500/20 to-green-600/10'
    },
    {
      icon: TrendingUp,
      label: 'Proyectos Activos',
      value: stats.activeProjects,
      color: 'text-pink-400',
      bgColor: 'bg-gradient-to-br from-pink-500/20 to-pink-600/10'
    },
    {
      icon: Code,
      label: 'Commits',
      value: stats.totalCommits.toLocaleString(),
      color: 'text-yellow-400',
      bgColor: 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/10'
    }
  ];

  return (
    <section className="py-12">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${stat.bgColor} rounded-2xl p-6 border border-white/5`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.bgColor} border border-white/10`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <div className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}