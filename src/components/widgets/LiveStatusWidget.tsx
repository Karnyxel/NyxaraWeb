// src/components/widgets/LiveStatusWidget.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LiveStatusWidget() {
  const [isOnline, setIsOnline] = useState(true);
  const [ping, setPing] = useState(45);

  useEffect(() => {
    // Simular cambios en el estado
    const interval = setInterval(() => {
      setIsOnline(Math.random() > 0.1); // 90% de probabilidad de estar online
      setPing(Math.floor(Math.random() * 100) + 20);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative overflow-hidden rounded-xl p-4 min-w-[200px] ${
        isOnline 
          ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/20 border border-green-500/30' 
          : 'bg-gradient-to-br from-red-900/30 to-rose-900/20 border border-red-500/30'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
          <div className={`absolute inset-0 rounded-full ${isOnline ? 'bg-green-500 animate-ping' : 'bg-red-500'}`} />
        </div>
        <div>
          <div className="font-bold">{isOnline ? 'Bot Online' : 'Bot Offline'}</div>
          <div className="text-sm text-gray-400">{ping}ms ping</div>
        </div>
      </div>
      
      {isOnline && (
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"
          animate={{ scaleX: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      )}
    </motion.div>
  );
}