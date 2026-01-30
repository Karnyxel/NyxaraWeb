// src/components/widgets/QuickStatsWidget.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function QuickStatsWidget() {
  const [stats, setStats] = useState({
    guilds: 1254,
    users: 52890,
    commands: 12458
  });

  useEffect(() => {
    // Simular actualizaciones en tiempo real
    const interval = setInterval(() => {
      setStats(prev => ({
        guilds: prev.guilds + Math.floor(Math.random() * 3),
        users: prev.users + Math.floor(Math.random() * 10),
        commands: prev.commands + Math.floor(Math.random() * 50)
      }));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-xl border border-gray-800 p-4"
    >
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-nyxara-primary">
            {formatNumber(stats.guilds)}
          </div>
          <div className="text-xs text-gray-400">Servidores</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">
            {formatNumber(stats.users)}
          </div>
          <div className="text-xs text-gray-400">Usuarios</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">
            {formatNumber(stats.commands)}
          </div>
          <div className="text-xs text-gray-400">Comandos/h</div>
        </div>
      </div>
      <div className="mt-3 text-xs text-gray-500 text-center">
        Actualización en tiempo real
      </div>
    </motion.div>
  );
}