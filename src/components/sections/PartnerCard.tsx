'use client';

import { Partner } from '../types';
import { ExternalLink, Star, Award, Users } from 'lucide-react';

interface PartnerCardProps {
  partner: Partner;
}

export default function PartnerCard({ partner }: PartnerCardProps) {
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum':
        return 'from-gray-300 to-gray-100';
      case 'gold':
        return 'from-yellow-600 to-yellow-400';
      case 'silver':
        return 'from-gray-400 to-gray-200';
      default:
        return 'from-blue-600 to-cyan-600';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'platinum':
        return <Award className="h-5 w-5" />;
      case 'gold':
        return <Star className="h-5 w-5" />;
      case 'silver':
        return <Users className="h-5 w-5" />;
      default:
        return <Star className="h-5 w-5" />;
    }
  };

  return (
    <div className="glass-effect card-hover p-6">
      {/* Header con logo y tier */}
      <div className="flex items-start justify-between mb-4">
        {/* Logo */}
        <div className="relative">
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
            {/* Para imágenes SVG, puedes usar un img normal */}
            <img 
              src={partner.logoUrl} 
              alt={`${partner.name} logo`}
              className="w-12 h-12"
            />
          </div>
          <div className={`absolute -top-2 -right-2 bg-gradient-to-r ${getTierColor(partner.tier)} text-gray-900 rounded-full p-1.5`}>
            {getTierIcon(partner.tier)}
          </div>
        </div>

        {/* Tier badge */}
        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize bg-gradient-to-r ${getTierColor(partner.tier)} bg-opacity-20 text-white`}>
          {partner.tier}
        </span>
      </div>

      {/* Nombre y descripción */}
      <h3 className="text-xl font-bold text-white mb-2">{partner.name}</h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {partner.description}
      </p>

      {/* Categorías */}
      <div className="flex flex-wrap gap-2 mb-6">
        {partner.category.map((cat, index) => (
          <span 
            key={index}
            className="px-2 py-1 bg-gray-900 text-gray-300 text-xs rounded-lg"
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Footer con link */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <a
          href={partner.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-nyxara-primary hover:text-nyxara-secondary transition-colors text-sm"
        >
          Visitar sitio web
          <ExternalLink className="h-3 w-3 ml-2" />
        </a>
        
        <span className="text-xs text-gray-500">
          Partner #{partner.id.toString().padStart(3, '0')}
        </span>
      </div>
    </div>
  );
}