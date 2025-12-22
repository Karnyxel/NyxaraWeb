'use client';

import { useState } from 'react';
import PartnerCard from './PartnerCard';
import { Partner } from '../types';
import { Search, Filter } from 'lucide-react';
// gold, platinum, silver
const partnersData: Partner[] = [
  {
    id: 1,
    name: "AplaxyHost - Tus sueños online",
    logoUrl: "/images/partners/aplaxy.png",
    description: "Líder en soluciones empresariales de software y servicios en la nube.",
    website: "https://aplaxy.com",
    tier: "gold",
    category: ["VPS", "Dedicados", "Dominios", "Minecraft Hosting", "Y más"]
  },,
  {
    id: 2,
    name: "Noctier",
    logoUrl: "/images/partners/noctier.png",
    description: "---",
    website: "https://noctier.com",
    tier: "silver",
    category: ["---"]
  },
  {
    id: 3,
    name: "UHosting Cloud | Tu servidor en la Nube",
    logoUrl: "/images/partners/uhosting.png",
    description: "Somos su socio estratégico para soluciones de hosting y servicios Cloud. Nos comprometemos a ofrecer una  disponibilidad garantizada del 99.9%  y una latencia optimizada para su proyecto.",
    website: "https://uhosting.cloud",
    tier: "platinum",
    category: ["Minecraft-Hosting", "VPS"]
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
    <div className="partners-main">
      <div className="partners-inner">
        {/* Header */}
        <div className="partners-header">
          <h1 className="partners-title">
            <span className="partners-title-span">
              Nuestros Partners
            </span>
          </h1>
          <p className="partners-desc">
            Colaboramos con los mejores en la industria para ofrecerte soluciones integrales y de calidad.
          </p>

          {/* Search and Filter */}
          <div className="partners-search-filter">
            <div className="partners-flex">
              {/* Search */}
              <div className="partners-search-div">
                <Search className="partners-search-icon" size={20} />
                <input
                  type="text"
                  placeholder="Buscar partners por nombre o descripción..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="partners-input"
                />
              </div>

              {/* Filter */}
              <div className="partners-filter-div">
                <Filter className="partners-filter-icon" size={20} />
                <div className="partners-buttons-div">
                  {['all', 'platinum', 'gold', 'silver'].map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setSelectedTier(tier)}
                      className={`partners-button ${selectedTier === tier 
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
          <div className="partners-grid">
            {filteredPartners.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        ) : (
          <div className="partners-no-results">
            <div className="partners-emoji">No search results</div>
            <h3 className="partners-no-title">No se encontraron partners</h3>
            <p className="partners-no-desc">Intenta con otros términos de búsqueda o filtros.</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="partners-cta">
          <div className="partners-cta-inner">
            <h2 className="partners-cta-title">
              ¿Quieres ser partner de Nyxara?
            </h2>
            <p className="partners-cta-desc">
              Únete a nuestra red de partners y lleva tu negocio al siguiente nivel con nuestras soluciones innovadoras.
            </p>
            <div className="partners-cta-buttons">
              <button className="partners-apply-button">
                Solicitar Información
              </button>
              <button className="partners-benefits-button">
                Ver Beneficios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}