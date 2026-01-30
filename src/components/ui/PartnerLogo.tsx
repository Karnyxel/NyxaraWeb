// src/components/ui/PartnerLogo.tsx
'use client';

import { useState } from 'react';
import { Users } from 'lucide-react';

interface PartnerLogoProps {
  src?: string;
  alt: string;
  className?: string;
}

export default function PartnerLogo({ src, alt, className = 'w-12 h-12' }: PartnerLogoProps) {
  const [error, setError] = useState(false);
  
  // Función para obtener iniciales
  const getInitials = (name: string) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Si no hay src o hay error, mostrar fallback
  if (!src || error) {
    const initials = getInitials(alt);
    
    // Array de gradientes para diferentes colores
    const gradients = [
      'from-nyxara-primary to-nyxara-secondary',
      'from-blue-500 to-cyan-500',
      'from-purple-500 to-pink-500',
      'from-green-500 to-emerald-500',
      'from-yellow-500 to-orange-500',
      'from-red-500 to-pink-500'
    ];
    
    // Generar índice consistente basado en el nombre
    const getColorIndex = (name: string) => {
      let hash = 0;
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
      }
      return Math.abs(hash) % gradients.length;
    };
    
    const gradientClass = gradients[getColorIndex(alt)] || gradients[0];
    
    return (
      <div className={`${className} rounded-lg flex items-center justify-center`}>
        <div className={`w-full h-full rounded-lg bg-gradient-to-r ${gradientClass} flex items-center justify-center text-white font-bold`}>
          {initials || <Users className="h-6 w-6" />}
        </div>
      </div>
    );
  }
  
  // Verificar si es una URL relativa o absoluta
  const imageUrl = src.startsWith('/') ? src : src;
  
  return (
    <img
      src={imageUrl}
      alt={alt}
      className={`${className} object-contain rounded-lg`}
      onError={() => setError(true)}
      loading="lazy"
    />
  );
}