'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  Award, 
  Star, 
  Users,
  Handshake,
  Sparkles,
  Globe,
  Mail
} from 'lucide-react';
import PartnerLogo from '@/components/ui/PartnerLogo';

interface Partner {
  id: number;
  name: string;
  logourl: string;
  description: string;
  website: string;
  tier: 'gold' | 'silver' | 'platinum' | 'diamond';
  category: string[];
  partnersince: string;
  featured: boolean;
}

export default function PartnersSection() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/partners');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const text = await response.text();
      console.log('[PartnersSection] Raw response:', text);
      
      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonError) {
        console.error('[PartnersSection] JSON parse error:', jsonError);
        setPartners(getFallbackPartners());
        return;
      }
      
      if (data.success) {        
        setPartners(data.data || getFallbackPartners());
      } else if (data.fallback) {
        setPartners(data.data || getFallbackPartners());
      }
    } catch (error) {
      console.error('[PartnersSection] Error loading partners:', error);
      setPartners(getFallbackPartners());
    } finally {
      setLoading(false);
    }
  };

  // Función de respaldo con URLs de DiceBear
  const getFallbackPartners = (): Partner[] => {
    const getLogoUrl = (name: string) => 
      `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=ff2929&textColor=ffffff`;
    
    return [
      {
        id: 1,
        name: "Discord",
        logourl: getLogoUrl('Discord'),
        description: "Plataforma oficial de Discord para bots y desarrollo",
        website: "https://discord.com/developers",
        tier: "diamond",
        category: ["Platform", "Development"],
        partnersince: "2023-01-15",
        featured: true
      },
      {
        id: 2,
        name: "GitHub",
        logourl: getLogoUrl('GitHub'),
        description: "Plataforma de desarrollo y colaboración en código",
        website: "https://github.com",
        tier: "platinum",
        category: ["Development", "Open Source"],
        partnersince: "2023-03-20",
        featured: true
      },
      {
        id: 3,
        name: "Node.js",
        logourl: getLogoUrl('Node.js'),
        description: "Entorno de ejecución para JavaScript",
        website: "https://nodejs.org",
        tier: "silver",
        category: ["Technology", "Runtime"],
        partnersince: "2023-06-15",
        featured: false
      }
    ];
  };

  const getTierInfo = (tier: string) => {
    switch (tier) {
      case 'diamond':
        return { color: 'from-cyan-500 to-blue-500', icon: <Sparkles className="h-5 w-5" />, label: 'Diamond' };
      case 'platinum':
        return { color: 'from-gray-300 to-gray-100', icon: <Award className="h-5 w-5" />, label: 'Platinum' };
      case 'gold':
        return { color: 'from-yellow-500 to-orange-500', icon: <Star className="h-5 w-5" />, label: 'Gold' };
      case 'silver':
        return { color: 'from-gray-400 to-gray-200', icon: <Users className="h-5 w-5" />, label: 'Silver' };
      default:
        return { color: 'from-gray-500 to-gray-300', icon: <Handshake className="h-5 w-5" />, label: tier };
    }
  };

  const getAllCategories = () => {
    const categories = new Set<string>();
    partners.forEach(partner => {
      if (partner.category && Array.isArray(partner.category)) {
        partner.category.forEach(cat => categories.add(cat));
      }
    });
    return Array.from(categories);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long'
      });
    } catch {
      return dateString;
    }
  };

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = searchTerm === '' || 
                         (partner.name && partner.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (partner.description && partner.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTier = selectedTier === 'all' || partner.tier === selectedTier;
    
    let matchesCategory = true;
    if (selectedCategory !== 'all') {
      matchesCategory = partner.category && 
                       Array.isArray(partner.category) && 
                       partner.category.some(cat => cat === selectedCategory);
    }
    
    return matchesSearch && matchesTier && matchesCategory;
  });

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nyxara-primary"></div>
        <p className="mt-4 text-gray-400">Cargando partners...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <Badge className="mb-4 bg-gradient-to-r from-nyxara-primary to-nyxara-secondary">
          <Handshake className="h-3 w-3 mr-2" />
          {partners.length} Partners
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-nyxara-primary via-purple-500 to-nyxara-secondary bg-clip-text text-transparent">
            Nuestros Partners
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Colaboramos con empresas y proyectos increíbles para ofrecer la mejor experiencia 
          a nuestra comunidad de Discord.
        </p>
      </div>

      {/* Filtros */}
      <div className="mb-8 bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Búsqueda */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar partners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-nyxara-primary focus:ring-1 focus:ring-nyxara-primary"
            />
          </div>

          {/* Filtro por tier */}
          <div className="flex gap-2">
            <Button
              variant={selectedTier === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedTier('all')}
              className="flex items-center gap-2"
            >
              <Handshake className="h-4 w-4" />
              Todos
            </Button>
            {['diamond', 'platinum', 'gold', 'silver'].map(tier => (
              <Button
                key={tier}
                variant={selectedTier === tier ? 'default' : 'outline'}
                onClick={() => setSelectedTier(tier)}
                className="flex items-center gap-2 capitalize"
                style={{
                  background: selectedTier === tier ? 
                    `linear-gradient(135deg, ${getTierInfo(tier).color.replace('from-', '').replace('to-', '').split(' ')[0]}, ${getTierInfo(tier).color.replace('from-', '').replace('to-', '').split(' ')[1]})` : 
                    undefined
                }}
              >
                {getTierInfo(tier).icon}
                {tier}
              </Button>
            ))}
          </div>
        </div>

        {/* Filtro por categoría */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
            size="sm"
          >
            Todas las categorías
          </Button>
          {getAllCategories().map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Estadísticas */}
        <div className="flex flex-wrap gap-4 mt-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
            <Handshake className="h-5 w-5 text-nyxara-primary" />
            <span className="font-semibold">{partners.length}</span>
            <span className="text-gray-400">partners totales</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
            <Award className="h-5 w-5 text-cyan-500" />
            <span className="font-semibold">
              {partners.filter(p => p.tier === 'diamond').length}
            </span>
            <span className="text-gray-400">diamond</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="font-semibold">
              {partners.filter(p => p.tier === 'gold').length}
            </span>
            <span className="text-gray-400">gold</span>
          </div>
        </div>
      </div>

      {/* Grid de partners */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPartners.map((partner, index) => {
          const tierInfo = getTierInfo(partner.tier);
          
          return (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full hover:border-nyxara-primary/50 transition-all duration-300 hover:scale-[1.02] group bg-gradient-to-br from-gray-900 to-black border-gray-800">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="absolute -inset-1 rounded-lg opacity-10 blur-sm bg-gradient-to-r from-gray-500 to-gray-300" />
                        <div className="relative flex items-center justify-center">
                          <PartnerLogo 
                            src={partner.logourl} 
                            alt={partner.name}
                            className="w-14 h-14"
                          />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg truncate">{partner.name}</CardTitle>
                        <Badge 
                          variant="outline"
                          className="mt-1 text-xs"
                        >
                          {partner.featured ? '⭐ Destacado' : '🤝 Partner'}
                        </Badge>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-lg bg-gradient-to-r ${tierInfo.color} text-gray-900 font-bold flex items-center justify-center text-xs`}>
                      {tierInfo.icon}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-4 line-clamp-2 text-sm">{partner.description}</p>
                  
                  {/* Categorías */}
                  {partner.category && partner.category.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {partner.category.slice(0, 3).map((cat, i) => (
                          <Badge key={i} variant="outline" className="text-xs px-2 py-0.5">
                            {cat}
                          </Badge>
                        ))}
                        {partner.category.length > 3 && (
                          <Badge variant="outline" className="text-xs px-2 py-0.5">
                            +{partner.category.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Fecha de asociación */}
                  {partner.partnersince && (
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                      <span className="font-medium">Desde:</span>
                      <span>{formatDate(partner.partnersince)}</span>
                    </div>
                  )}

                  {/* Acciones */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-nyxara-primary hover:text-nyxara-secondary transition-colors text-sm"
                    >
                      <Globe className="h-3.5 w-3.5" />
                      Sitio web
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    
                    <span className="text-xs text-gray-500">
                      #{partner.id.toString().padStart(3, '0')}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredPartners.length === 0 && (
        <div className="text-center py-20">
          <Handshake className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">No se encontraron partners</h3>
          <p className="text-gray-400 mb-4">Intenta con otros filtros de búsqueda</p>
          <Button 
            onClick={() => {
              setSearchTerm('');
              setSelectedTier('all');
              setSelectedCategory('all');
            }}
            variant="outline"
            className="mt-2"
          >
            Limpiar filtros
          </Button>
        </div>
      )}

      {/* CTA */}
      <div className="mt-16 text-center">
        <Card className="bg-gradient-to-r from-nyxara-primary/10 to-nyxara-secondary/10 border-nyxara-primary/20">
          <CardContent className="py-12">
            <Handshake className="h-16 w-16 text-nyxara-primary mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4">
              ¿Quieres ser partner de Nyxara?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Únete a nuestra red de partners y lleva tu proyecto al siguiente nivel. 
              Ofrecemos beneficios exclusivos, exposición y colaboraciones estratégicas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="premium" className="gap-3">
                <Mail className="h-5 w-5" />
                Solicitar información
              </Button>
              <Button variant="outline" className="gap-3">
                <Award className="h-5 w-5" />
                Ver beneficios
              </Button>
            </div>
            <p className="text-sm text-gray-400 mt-6">
              * Los partners son seleccionados cuidadosamente para mantener la calidad de nuestra comunidad.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}