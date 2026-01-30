'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  HelpCircle, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp,
  BookOpen,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  XCircle,
  Zap,
  Users,
  Server,
  CreditCard,
  Shield,
  Music,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  views: number;
  isactive: boolean | number;
  createdat: string;
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/faq');
      const data = await response.json();
      
      if (data.success) {
        setFaqs(data.data);
        
        // Solución: Usar Array.from en lugar de spread operator
        const uniqueCategories = Array.from(
          new Set(data.data.map((faq: FAQ) => faq.category).filter(Boolean))
        ) as string[];
        
        setCategories(['all', ...uniqueCategories]);
      }
    } catch (error) {
      console.error('Error loading FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función helper para verificar si un FAQ está activo
  const isFaqActive = (faq: FAQ): boolean => {
    return Boolean(faq.isactive);
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = searchTerm === '' || 
                         faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const isActive = isFaqActive(faq);
    
    return matchesSearch && matchesCategory && isActive;
  });

  const getCategoryIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'general':
        return <HelpCircle className="h-4 w-4" />;
      case 'bot':
        return <Zap className="h-4 w-4" />;
      case 'commands':
      case 'comandos':
        return <MessageSquare className="h-4 w-4" />;
      case 'premium':
        return <CreditCard className="h-4 w-4" />;
      case 'moderation':
      case 'moderación':
        return <Shield className="h-4 w-4" />;
      case 'music':
      case 'música':
        return <Music className="h-4 w-4" />;
      case 'servers':
      case 'servidores':
        return <Server className="h-4 w-4" />;
      case 'users':
      case 'usuarios':
        return <Users className="h-4 w-4" />;
      case 'support':
      case 'soporte':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'general':
        return 'bg-blue-500/20 text-blue-400';
      case 'bot':
        return 'bg-purple-500/20 text-purple-400';
      case 'commands':
        return 'bg-green-500/20 text-green-400';
      case 'premium':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'moderation':
        return 'bg-red-500/20 text-red-400';
      case 'music':
        return 'bg-pink-500/20 text-pink-400';
      case 'servers':
        return 'bg-cyan-500/20 text-cyan-400';
      case 'users':
        return 'bg-orange-500/20 text-orange-400';
      case 'support':
        return 'bg-gray-500/20 text-gray-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const handleFaqClick = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
    
    // Incrementar vistas (simulado - en producción sería una llamada API)
    setFaqs(prev => prev.map(faq => 
      faq.id === id ? { ...faq, views: faq.views + 1 } : faq
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-nyxara-dark to-black">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nyxara-primary"></div>
            <p className="mt-4 text-gray-400">Cargando preguntas frecuentes...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-nyxara-dark to-black">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-nyxara-primary to-nyxara-secondary">
            <HelpCircle className="h-3 w-3 mr-2" />
            {faqs.filter(f => isFaqActive(f)).length} Preguntas Frecuentes
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-nyxara-primary via-purple-500 to-nyxara-secondary bg-clip-text text-transparent">
              Preguntas Frecuentes
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Encuentra respuestas rápidas a las preguntas más comunes sobre Nyxara Bot.
            Si no encuentras lo que buscas, contacta con nuestro soporte.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input
                type="text"
                placeholder="Buscar en preguntas frecuentes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-gray-800 border-gray-700"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category === 'all' ? (
                    <>
                      <Filter className="h-4 w-4 mr-2" />
                      Todas
                    </>
                  ) : (
                    <>
                      {getCategoryIcon(category)}
                      <span className="ml-2 capitalize">{category}</span>
                    </>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
              <BookOpen className="h-5 w-5 text-nyxara-primary" />
              <span className="font-semibold">{filteredFaqs.length}</span>
              <span className="text-gray-400">preguntas encontradas</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
              <MessageSquare className="h-5 w-5 text-green-500" />
              <span className="font-semibold">
                {categories.length - 1}
              </span>
              <span className="text-gray-400">categorías</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
              <Users className="h-5 w-5 text-blue-500" />
              <span className="font-semibold">
                {faqs.reduce((sum, faq) => sum + faq.views, 0).toLocaleString()}
              </span>
              <span className="text-gray-400">vistas totales</span>
            </div>
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800 hover:border-nyxara-primary/30 transition-all">
                  <CardContent className="p-0">
                    <button
                      onClick={() => handleFaqClick(faq.id)}
                      className="w-full text-left p-6 focus:outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${getCategoryColor(faq.category)}`}>
                            {getCategoryIcon(faq.category)}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{faq.question}</h3>
                            <div className="flex items-center gap-3 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {faq.category || 'General'}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {faq.views} vistas
                              </span>
                              {isFaqActive(faq) ? (
                                <Badge variant="outline" className="text-xs bg-green-500/10 text-green-400">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Activa
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-xs bg-red-500/10 text-red-400">
                                  <XCircle className="h-3 w-3 mr-1" />
                                  Inactiva
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-gray-400">
                          {expandedId === faq.id ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </div>
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {expandedId === faq.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 border-t border-gray-800 pt-4">
                            <div className="prose prose-invert max-w-none">
                              <div className="text-gray-300 whitespace-pre-line">
                                {faq.answer}
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
                              <span className="text-sm text-gray-500">
                                Creada: {new Date(faq.createdat).toLocaleDateString('es-ES')}
                              </span>
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm" className="gap-2">
                                  <MessageSquare className="h-4 w-4" />
                                  ¿Fue útil?
                                </Button>
                                <Button variant="ghost" size="sm" className="gap-2">
                                  <AlertCircle className="h-4 w-4" />
                                  Reportar
                                </Button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20">
              <HelpCircle className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No se encontraron preguntas</h3>
              <p className="text-gray-400 mb-6">
                {searchTerm 
                  ? `No hay resultados para "${searchTerm}"`
                  : 'No hay preguntas frecuentes en esta categoría'}
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => setSearchTerm('')}>
                  Limpiar búsqueda
                </Button>
                <Button variant="outline" onClick={() => setSelectedCategory('all')}>
                  Ver todas
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Categories Overview */}
        {categories.length > 1 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8">Explora por Categorías</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.filter(cat => cat !== 'all').map(category => {
                const count = faqs.filter(f => f.category === category && isFaqActive(f)).length;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`p-4 rounded-xl border transition-all ${
                      selectedCategory === category
                        ? 'border-nyxara-primary bg-nyxara-primary/10'
                        : 'border-gray-800 bg-gray-900/50 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <div className={`p-3 rounded-lg mb-3 ${getCategoryColor(category)}`}>
                        {getCategoryIcon(category)}
                      </div>
                      <span className="font-medium capitalize">{category}</span>
                      <span className="text-sm text-gray-400 mt-1">
                        {count} preguntas
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Contact Support */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-nyxara-primary/10 to-nyxara-secondary/10 border-nyxara-primary/20">
            <CardContent className="py-12">
              <div className="text-center">
                <HelpCircle className="h-16 w-16 text-nyxara-primary mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-white mb-4">
                  ¿No encontraste lo que buscabas?
                </h3>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                  Nuestro equipo de soporte está disponible para ayudarte con cualquier pregunta
                  que no esté cubierta en nuestras preguntas frecuentes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="premium" className="gap-3">
                    <MessageSquare className="h-5 w-5" />
                    Contactar Soporte
                  </Button>
                  <Button variant="outline" className="gap-3">
                    <Globe className="h-5 w-5" />
                    Unirse al Discord
                  </Button>
                </div>
                <p className="text-sm text-gray-400 mt-6">
                  Tiempo promedio de respuesta: 2-4 horas
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}