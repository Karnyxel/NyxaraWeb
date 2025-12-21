'use client';

import { useState } from 'react';
import PartnerCard from './PartnerCard';
import { Partner } from '../types';
import { Search, Filter } from 'lucide-react';

const partnersData: Partner[] = [
  {
    id: 1,
    name: "TechCorp Inc.",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=TechCorp&backgroundColor=1e3a8a",
    description: "Líder en soluciones empresariales de software y servicios en la nube.",
    website: "https://techcorp.example.com",
    tier: "platinum",
    category: ["Cloud", "Enterprise", "Software"]
  },
  {
    id: 2,
    name: "CodeStream",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=CodeStream&backgroundColor=f59e0b",
    description: "Plataforma de desarrollo colaborativo para equipos remotos.",
    website: "https://codestream.example.com",
    tier: "gold",
    category: ["Development", "Collaboration", "SaaS"]
  },
  {
    id: 3,
    name: "DesignHub",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=DesignHub&backgroundColor=6b7280",
    description: "Herramientas de diseño para creadores digitales y agencias.",
    website: "https://designhub.example.com",
    tier: "silver",
    category: ["Design", "Creative", "Tools"]
  },
  {
    id: 4,
    name: "SecureNet",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=SecureNet&backgroundColor=1e3a8a",
    description: "Soluciones de ciberseguridad para empresas de todos los tamaños.",
    website: "https://securenet.example.com",
    tier: "platinum",
    category: ["Security", "Enterprise", "Cybersecurity"]
  },
  {
    id: 5,
    name: "DataFlow AI",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=DataFlow&backgroundColor=f59e0b",
    description: "Inteligencia artificial para análisis de datos en tiempo real.",
    website: "https://dataflow.example.com",
    tier: "gold",
    category: ["AI", "Analytics", "Big Data"]
  },
  {
    id: 6,
    name: "CloudScale",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=CloudScale&backgroundColor=6b7280",
    description: "Infraestructura escalable para aplicaciones web y móviles.",
    website: "https://cloudscale.example.com",
    tier: "silver",
    category: ["Hosting", "Infrastructure", "Cloud"]
  }
];

export default function PartnerGrid() {
  const [search, setSearch] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('all');

  const filteredPartners = partnersData.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(search.toLowerCase()) ||
                         partner.description.toLowerCase().includes(search.toLowerCase());
    const matchesTier = selectedTier === 'all' || partner.tier === selectedTier;
    return matchesSearch && matchesTier;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              Nuestros Partners
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Colaboramos con los mejores en la industria para ofrecerte soluciones integrales y de calidad.
          </p>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="text"
                  placeholder="Buscar partners por nombre o descripción..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* Filter */}
              <div className="flex gap-2">
                <Filter className="text-gray-500 my-auto" size={20} />
                <div className="flex gap-2">
                  {['all', 'platinum', 'gold', 'silver'].map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setSelectedTier(tier)}
                      className={`px-4 py-2 rounded-lg transition-all capitalize ${selectedTier === tier 
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white' 
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {tier === 'all' ? 'Todos' : tier}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partners Grid */}
        {filteredPartners.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPartners.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-2">No se encontraron partners</h3>
            <p className="text-gray-400">Intenta con otros términos de búsqueda o filtros.</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-12 border border-gray-800">
            <h2 className="text-3xl font-bold text-white mb-4">
              ¿Quieres ser partner de Nyxara?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Únete a nuestra red de partners y lleva tu negocio al siguiente nivel con nuestras soluciones innovadoras.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all">
                Solicitar Información
              </button>
              <button className="px-8 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-all">
                Ver Beneficios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}