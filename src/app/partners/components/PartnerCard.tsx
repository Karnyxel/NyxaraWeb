import { Partner } from '../types';
import { ExternalLink } from 'lucide-react';

interface PartnerCardProps {
  partner: Partner;
}

const tierColors = {
  platinum: 'from-blue-400 to-cyan-400',
  gold: 'from-yellow-400 to-orange-400',
  silver: 'from-gray-300 to-gray-500'
};

const tierLabels = {
  platinum: 'Platinum Partner',
  gold: 'Gold Partner',
  silver: 'Silver Partner'
};

export default function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <div className="group bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800 hover:border-blue-500 transition-all duration-300 hover:scale-[1.02]">
      {/* Tier Badge */}
      <div className={`inline-flex items-center px-4 py-1 rounded-full bg-gradient-to-r ${tierColors[partner.tier]} text-black text-sm font-bold mb-6`}>
        {tierLabels[partner.tier]}
      </div>

      {/* Logo */}
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className={`absolute inset-0 bg-gradient-to-r ${tierColors[partner.tier]} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl`}></div>
        <div className="relative w-full h-full bg-gray-800 rounded-2xl flex items-center justify-center p-4 border border-gray-700">
          <img
            src={partner.logoUrl}
            alt={partner.name}
            className="max-w-full max-h-full object-contain filter group-hover:brightness-125 transition-all duration-300"
          />
        </div>
      </div>

      {/* Info */}
      <h3 className="text-2xl font-bold text-white text-center mb-4">{partner.name}</h3>
      
      <p className="text-gray-300 text-center mb-6 leading-relaxed">
        {partner.description}
      </p>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {partner.category.map((cat, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-full border border-gray-700"
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Visit Button */}
      <a
        href={partner.website}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-300 group/btn"
      >
        Visitar Sitio
        <ExternalLink size={16} className="group-hover/btn:translate-x-1 transition-transform" />
      </a>
    </div>
  );
}