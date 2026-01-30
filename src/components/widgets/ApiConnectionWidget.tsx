// src/components/widgets/ApiConnectionWidget.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ApiConnectionWidgetProps {
  onRefresh: () => void;
  autoRefresh: boolean;
  onToggleAutoRefresh: () => void;
}

export default function ApiConnectionWidget({ 
  onRefresh, 
  autoRefresh, 
  onToggleAutoRefresh 
}: ApiConnectionWidgetProps) {
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'connecting' | 'disconnected'>('connected');
  const [lastUpdate, setLastUpdate] = useState('hace 0s');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      setLastUpdate('hace 0s');
    };

    // Actualizar cada segundo para mostrar "hace Xs"
    const timer = setInterval(() => {
      setLastUpdate(prev => {
        const match = prev.match(/\d+/);
        if (match) {
          const seconds = parseInt(match[0]) + 1;
          return `hace ${seconds}s`;
        }
        return 'hace 0s';
      });
    }, 1000);

    // Simular cambios en la conexión
    const statusInterval = setInterval(() => {
      const rand = Math.random();
      if (rand > 0.95) {
        setConnectionStatus('disconnected');
      } else if (rand > 0.9) {
        setConnectionStatus('connecting');
      } else {
        setConnectionStatus('connected');
      }
    }, 30000);

    return () => {
      clearInterval(timer);
      clearInterval(statusInterval);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm rounded-xl border border-gray-800 p-4"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              connectionStatus === 'connected' ? 'bg-green-500' :
              connectionStatus === 'connecting' ? 'bg-yellow-500' :
              'bg-red-500'
            }`} />
            <span className="font-medium">API Status</span>
          </div>
          <span className="text-xs text-gray-400">{lastUpdate}</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onRefresh}
            className="flex-1 bg-nyxara-primary/20 hover:bg-nyxara-primary/30 text-nyxara-primary py-2 rounded-lg text-sm transition-all duration-300"
          >
            Actualizar
          </button>
          <button
            onClick={onToggleAutoRefresh}
            className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
              autoRefresh 
                ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {autoRefresh ? 'Auto ✓' : 'Auto'}
          </button>
        </div>

        <div className="text-xs text-gray-500">
          {connectionStatus === 'connected' && 'Conexión estable con el bot'}
          {connectionStatus === 'connecting' && 'Reconectando...'}
          {connectionStatus === 'disconnected' && 'Conexión perdida'}
        </div>
      </div>
    </motion.div>
  );
}