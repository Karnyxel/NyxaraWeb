'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import APIDebugger from '@/components/debug/APIDebugger'; // Agrega esto
import { 
  Search, 
  Filter, 
  Command, 
  Hash, 
  Slash,
  Zap,
  Shield,
  Music,
  Gamepad2,
  Settings,
  Sparkles,
  Clock,
  RefreshCw,
  AlertCircle,
  Database,
  Terminal,
  Globe,
  Lock,
  Unlock,
  TrendingUp,
  BarChart3,
  Crown,
  Wifi,
  WifiOff,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { 
  useBotCommands, 
  useCommandsNames,
  useCommandsStats,
  useCommandSearch,
  useBotAPIConnection
} from '@/lib/api/use-bot-api';

type CommandType = 'all' | 'slash' | 'prefix';
type SortBy = 'name' | 'category' | 'type' | 'popularity';
type ViewMode = 'grid' | 'list' | 'categories';

interface BotCommand {
  name: string;
  description: string;
  category: string;
  type: 'slash' | 'prefix';
  enabled: boolean;
  premium?: boolean;
  cooldown?: number;
  aliases?: string[];
  options?: any[];
  permissions?: string[];
  stats?: {
    count?: number;
    successRate?: number;
    avgTime?: number;
    lastUsed?: string;
  };
}

export default function CommandsSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<CommandType>('all');
  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  
  // Usar los nuevos hooks
  const { 
    commands, 
    loading: commandsLoading, 
    error: commandsError, 
    refetch: refetchCommands,
    summary: commandsSummary,
    groupedByCategory 
  } = useBotCommands({
    ttl: 15000
  });
  
  const {
    names: commandsNames,
    loading: namesLoading,
    error: namesError
  } = useCommandsNames({
    ttl: 30000
  });
  
  const {
    stats: commandsStats,
    loading: statsLoading,
    error: statsError,
    refetch: refetchStats
  } = useCommandsStats({
    period: 'today',
    limit: 10,
    ttl: 10000
  });
  
  // Arreglar el uso de useBotAPIConnection - extraer propiedades correctamente
  const connectionState = useBotAPIConnection(30000);
  const { connected, loading: connectionLoading, error: connectionError, latency, refetch: refetchConnection } = connectionState || {};
  
  const {
    search: searchCommands,
    results: searchResults,
    loading: searchLoading,
    error: searchError,
    totalResults,
    hasResults
  } = useCommandSearch();

  // Estados derivados
  const [allCommands, setAllCommands] = useState<BotCommand[]>([]);
  const [categories, setCategories] = useState<Record<string, number>>({});
  const [stats, setStats] = useState<any>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Procesar comandos cuando se cargan
  useEffect(() => {
    if (commands) {
      const processedCommands = processCommands(commands);
      setAllCommands(processedCommands);
      setLastUpdated(new Date());
      
      // Calcular categorías
      const categoryCounts: Record<string, number> = {};
      processedCommands.forEach(cmd => {
        const category = cmd.category || 'General';
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      });
      setCategories(categoryCounts);
    }
  }, [commands]);
// Agrega esto después del useEffect que procesa los comandos
useEffect(() => {
  console.log('=== DEBUG COMMANDS API RESPONSE ===');
  console.log('commands prop:', commands);
  console.log('commandsLoading:', commandsLoading);
  console.log('commandsError:', commandsError);
  console.log('commandsSummary:', commandsSummary);
  console.log('allCommands length:', allCommands.length);
  console.log('=== END DEBUG ===');
}, [commands, commandsLoading, commandsError, commandsSummary, allCommands]);
  // Actualizar estadísticas cuando cambien
  useEffect(() => {
    if (commandsStats) {
      setStats(commandsStats);
    }
  }, [commandsStats]);

  // Procesar comandos desde la API
// En src/components/sections/CommandsSection.tsx
const processCommands = (apiCommands: any): BotCommand[] => {
  if (!apiCommands) {
    return [];
  }
  
  const allCommands: BotCommand[] = [];
  // No tiene la propiedad .commands
  const slashCmds = apiCommands.slash || apiCommands.commands?.slash || [];
  const prefixCmds = apiCommands.prefix || apiCommands.commands?.prefix || [];
  
  // Procesar slash commands
  slashCmds.forEach((cmd: any) => {
    if (cmd && cmd.name) {
      allCommands.push({
        name: cmd.name,
        description: cmd.description || 'Sin descripción',
        category: cmd.category || 'General',
        type: 'slash',
        enabled: true,
        premium: cmd.premium || false,
        cooldown: cmd.cooldown || undefined,
        aliases: cmd.aliases || [],
        options: cmd.options || [],
        permissions: cmd.permissions || [],
        stats: cmd.stats
      });
    }
  });
  
  // Procesar prefix commands
  prefixCmds.forEach((cmd: any) => {
    if (cmd && cmd.name) {
      allCommands.push({
        name: cmd.name,
        description: cmd.description || 'Sin descripción',
        category: cmd.category || 'General',
        type: 'prefix',
        enabled: true,
        premium: cmd.premium || false,
        cooldown: cmd.cooldown || undefined,
        aliases: cmd.aliases || [],
        permissions: cmd.permissions || [],
        stats: cmd.stats
      });
    }
  });
  
  return allCommands;
};

  // Función para recargar todo
  const handleRefresh = () => {
    refetchCommands();
    refetchStats();
    refetchConnection?.();
    if (searchTerm) {
      searchCommands(searchTerm);
    }
  };

  // Filtrar comandos
  const filteredCommands = useMemo(() => {
    return allCommands.filter(cmd => {
      const matchesSearch = searchTerm.trim() === '' || 
        cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cmd.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (cmd.aliases && cmd.aliases.some((alias: string) => 
          alias.toLowerCase().includes(searchTerm.toLowerCase())
        ));
      
      const matchesCategory = selectedCategory === 'all' || cmd.category === selectedCategory;
      const matchesType = selectedType === 'all' || cmd.type === selectedType;
      
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [allCommands, searchTerm, selectedCategory, selectedType]);

  // Ordenar comandos
  const sortedCommands = useMemo(() => {
    return [...filteredCommands].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'type':
          return a.type.localeCompare(b.type);
        case 'popularity':
          const aUsage = a.stats?.count || 0;
          const bUsage = b.stats?.count || 0;
          return bUsage - aUsage;
        default:
          return 0;
      }
    });
  }, [filteredCommands, sortBy]);

  // Obtener icono por categoría
  const getCategoryIcon = (category: string) => {
    const cat = category.toLowerCase();
    
    switch (cat) {
      case 'moderación':
      case 'moderation':
        return <Shield className="h-4 w-4" />;
      case 'música':
      case 'music':
        return <Music className="h-4 w-4" />;
      case 'diversión':
      case 'fun':
        return <Gamepad2 className="h-4 w-4" />;
      case 'utilidades':
      case 'utilities':
        return <Settings className="h-4 w-4" />;
      case 'información':
      case 'information':
      case 'info':
        return <Database className="h-4 w-4" />;
      case 'configuración':
      case 'configuration':
      case 'config':
        return <Terminal className="h-4 w-4" />;
      case 'economía':
      case 'economy':
        return <TrendingUp className="h-4 w-4" />;
      case 'niveles':
      case 'levels':
        return <BarChart3 className="h-4 w-4" />;
      default:
        return <Command className="h-4 w-4" />;
    }
  };

  // Obtener color por categoría
  const getCategoryColor = (category: string) => {
    const cat = category.toLowerCase();
    
    switch (cat) {
      case 'moderación':
      case 'moderation':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'música':
      case 'music':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'diversión':
      case 'fun':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'utilidades':
      case 'utilities':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'información':
      case 'information':
      case 'info':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      default:
        return 'bg-gray-800 text-gray-400 border-gray-700';
    }
  };

  // Formatear número de usos
  const formatUsage = (count?: number) => {
    if (!count && count !== 0) return 'N/A';
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  // Formatear tiempo de respuesta
  const formatResponseTime = (ms?: number) => {
    if (!ms) return 'N/A';
    return `${ms.toFixed(0)}ms`;
  };

  // Calcular estadísticas
  const calculatedStats = useMemo(() => {
    const totalCommands = allCommands.length;
    const slashCommands = allCommands.filter(c => c.type === 'slash').length;
    const prefixCommands = allCommands.filter(c => c.type === 'prefix').length;
    const premiumCommands = allCommands.filter(c => c.premium).length;
    const enabledCommands = allCommands.filter(c => c.enabled).length;
    
    const totalUsage = allCommands.reduce((sum, cmd) => sum + (cmd.stats?.count || 0), 0);
    const avgSuccessRate = allCommands.length > 0 
      ? allCommands.reduce((sum, cmd) => sum + (cmd.stats?.successRate || 0), 0) / allCommands.length
      : 0;

    return {
      totalCommands,
      slashCommands,
      prefixCommands,
      premiumCommands,
      enabledCommands,
      totalUsage,
      avgSuccessRate: avgSuccessRate.toFixed(1) + '%'
    };
  }, [allCommands]);

  // Estado de carga combinado
  const loading = commandsLoading || namesLoading || statsLoading || connectionLoading;
  const error = commandsError || namesError || statsError || connectionError;
  const hasData = allCommands.length > 0 && !loading;

  if (loading && !hasData) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nyxara-primary"></div>
        <p className="mt-4 text-gray-400">Cargando comandos desde la API...</p>
        <p className="text-sm text-gray-500 mt-2">
          {connected ? 
            `✅ Conectado (${latency}ms)` : 
            '🔄 Conectando...'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header con conexión */}
      <div className="text-center mb-12">
        <div className="flex justify-center items-center gap-2 mb-4">
          <Badge className="bg-gradient-to-r from-nyxara-primary to-nyxara-secondary">
            <Command className="h-3 w-3 mr-2" />
            {Object.keys(categories).length} Categorías • {allCommands.length} Comandos
          </Badge>
          
          {/* Indicador de conexión */}
          <Badge 
            variant={connected ? "default" : "destructive"}
            className="flex items-center gap-1"
          >
            {connected ? (
              <>
                <Wifi className="h-3 w-3" />
                <span>Online</span>
                <span className="text-xs opacity-75">({latency}ms)</span>
              </>
            ) : (
              <>
                <WifiOff className="h-3 w-3" />
                <span>Offline</span>
              </>
            )}
          </Badge>
          
          {lastUpdated && (
            <Badge variant="outline" className="text-xs">
              Actualizado: {lastUpdated.toLocaleTimeString()}
            </Badge>
          )}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-nyxara-primary via-purple-500 to-nyxara-secondary bg-clip-text text-transparent">
            Comandos de Nyxara
          </span>
        </h1>
        
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Descubre todos los comandos disponibles, organizados por categorías y tipos.
          {commandsSummary && (
            <span className="block text-sm mt-2">
              {commandsSummary.slashCommands} Slash • {commandsSummary.prefixCommands} Prefix • {commandsSummary.categories} Categorías
            </span>
          )}
        </p>
      </div>

      {/* Panel de control */}
      <div className="mb-8 bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
        {/* Barra superior */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Búsqueda */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar comandos por nombre, descripción o alias..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                searchCommands(e.target.value);
              }}
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-nyxara-primary focus:ring-1 focus:ring-nyxara-primary"
            />
            {searchLoading && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-nyxara-primary"></div>
              </div>
            )}
          </div>

          {/* Botones de acción */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={loading}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Actualizando...' : 'Actualizar'}
            </Button>
            
            {/* Botones de vista */}
            <div className="flex bg-gray-800 rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="px-3"
              >
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="px-3"
              >
                Lista
              </Button>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="space-y-6">
          {/* Categorías */}
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <Filter className="h-4 w-4" />
              Filtrar por categoría:
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                size="sm"
              >
                Todas ({allCommands.length})
              </Button>
              {Object.keys(categories).sort().map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  size="sm"
                  className="gap-2"
                >
                  {getCategoryIcon(category)}
                  {category} ({categories[category]})
                </Button>
              ))}
            </div>
          </div>

          {/* Tipos y orden */}
          <div className="flex flex-wrap gap-6">
            {/* Tipo de comando */}
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <Command className="h-4 w-4" />
                Tipo de comando:
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedType === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('all')}
                  size="sm"
                >
                  Todos
                </Button>
                <Button
                  variant={selectedType === 'slash' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('slash')}
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Slash className="h-4 w-4" />
                  Slash ({allCommands.filter(c => c.type === 'slash').length})
                </Button>
                <Button
                  variant={selectedType === 'prefix' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('prefix')}
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Hash className="h-4 w-4" />
                  Prefix ({allCommands.filter(c => c.type === 'prefix').length})
                </Button>
              </div>
            </div>

            {/* Ordenar */}
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                Ordenar por:
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={sortBy === 'name' ? 'default' : 'outline'}
                  onClick={() => setSortBy('name')}
                  size="sm"
                >
                  Nombre
                </Button>
                <Button
                  variant={sortBy === 'category' ? 'default' : 'outline'}
                  onClick={() => setSortBy('category')}
                  size="sm"
                >
                  Categoría
                </Button>
                <Button
                  variant={sortBy === 'type' ? 'default' : 'outline'}
                  onClick={() => setSortBy('type')}
                  size="sm"
                >
                  Tipo
                </Button>
                <Button
                  variant={sortBy === 'popularity' ? 'default' : 'outline'}
                  onClick={() => setSortBy('popularity')}
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <TrendingUp className="h-4 w-4" />
                  Popularidad
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas en tiempo real */}
        {hasData && (
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
                <Globe className="h-5 w-5 text-nyxara-primary" />
                <span className="font-semibold">{calculatedStats.totalCommands}</span>
                <span className="text-gray-400">comandos totales</span>
              </div>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
                <Slash className="h-5 w-5 text-green-500" />
                <span className="font-semibold">{calculatedStats.slashCommands}</span>
                <span className="text-gray-400">slash</span>
              </div>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
                <Hash className="h-5 w-5 text-blue-500" />
                <span className="font-semibold">{calculatedStats.prefixCommands}</span>
                <span className="text-gray-400">prefix</span>
              </div>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
                <Crown className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold">{calculatedStats.premiumCommands}</span>
                <span className="text-gray-400">premium</span>
              </div>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-semibold">{calculatedStats.enabledCommands}</span>
                <span className="text-gray-400">habilitados</span>
              </div>
              
              {calculatedStats.totalUsage > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-purple-500" />
                  <span className="font-semibold">{formatUsage(calculatedStats.totalUsage)}</span>
                  <span className="text-gray-400">usos totales</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Errores */}
        {error && (
        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-red-400 font-medium">Error cargando datos</p>
            {/* LÍNEA 647 - CORREGIR AQUÍ */}
            <p className="text-red-300 text-sm mt-1">
              {typeof error === 'object' && error !== null ? error.message : error || 'Error desconocido'}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="mt-2 gap-1"
            >
              <RefreshCw className="h-3 w-3" />
              Reintentar
            </Button>
          </div>
        </div>
      )}
      </div>

      {/* Comandos encontrados */}
      {sortedCommands.length > 0 && (
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">
              {sortedCommands.length} {sortedCommands.length === 1 ? 'comando' : 'comandos'} encontrado{sortedCommands.length === 1 ? '' : 's'}
            </span>
            {searchTerm && (
              <Badge variant="outline" className="text-xs">
                "{searchTerm}"
              </Badge>
            )}
          </div>
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedType('all');
              }}
            >
              Limpiar filtros
            </Button>
          )}
        </div>
      )}

      {/* Grid/Lista de comandos */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCommands.map((cmd, index) => (
            <motion.div
              key={`${cmd.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full hover:border-nyxara-primary/50 transition-all duration-300 hover:scale-[1.02] group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {getCategoryIcon(cmd.category)}
                      <CardTitle className="text-xl font-bold group-hover:text-nyxara-primary transition-colors">
                        {cmd.name}
                      </CardTitle>
                    </div>
                    <Badge 
                      variant={cmd.type === 'slash' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {cmd.type === 'slash' ? 'SLASH' : 'PREFIX'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getCategoryColor(cmd.category)}`}
                    >
                      {cmd.category}
                    </Badge>
                    
                    {cmd.stats?.count !== undefined && (
                      <div className="flex items-center gap-1 text-xs">
                        <TrendingUp className="h-3 w-3 text-gray-500" />
                        <span className="font-medium">{formatUsage(cmd.stats.count)}</span>
                        <span className="text-gray-500">usos</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {cmd.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cmd.premium && (
                      <Badge className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-white text-xs">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                    
                    {cmd.cooldown && (
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {cmd.cooldown}s CD
                      </Badge>
                    )}
                    
                    {cmd.stats?.successRate !== undefined && cmd.stats.successRate > 0 && (
                      <Badge variant="outline" className="text-xs bg-green-500/10 text-green-400">
                        {cmd.stats.successRate.toFixed(1)}% éxito
                      </Badge>
                    )}
                    
                    {cmd.stats?.avgTime !== undefined && (
                      <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-400">
                        {formatResponseTime(cmd.stats.avgTime)}
                      </Badge>
                    )}
                    
                    {cmd.permissions && cmd.permissions.length > 0 && (
                      <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-400">
                        <Shield className="h-3 w-3 mr-1" />
                        {cmd.permissions.length} perm{cmd.permissions.length === 1 ? '' : 's'}
                      </Badge>
                    )}
                  </div>

                  {cmd.aliases && cmd.aliases.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-800">
                      <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                        <Command className="h-3 w-3" />
                        Aliases:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {cmd.aliases.slice(0, 3).map((alias: string, i: number) => (
                          <code 
                            key={i} 
                            className="px-2 py-1 bg-gray-800 rounded text-xs hover:bg-gray-700 transition-colors"
                          >
                            {alias}
                          </code>
                        ))}
                        {cmd.aliases.length > 3 && (
                          <span className="text-xs text-gray-500 px-2 py-1">
                            +{cmd.aliases.length - 3} más
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {cmd.options && cmd.options.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-800">
                      <p className="text-sm text-gray-500 mb-2">
                        Opciones: {cmd.options.length}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        // Vista de lista
        <div className="space-y-4">
          {sortedCommands.map((cmd, index) => (
            <motion.div
              key={`${cmd.name}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <Card className="hover:border-nyxara-primary/30 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Información principal */}
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`p-3 rounded-xl ${getCategoryColor(cmd.category)} border`}>
                        {getCategoryIcon(cmd.category)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-xl font-bold text-white">
                            {cmd.name}
                          </h3>
                          <Badge 
                            variant={cmd.type === 'slash' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {cmd.type === 'slash' ? 'SLASH' : 'PREFIX'}
                          </Badge>
                          {cmd.premium && (
                            <Badge className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-white text-xs">
                              <Sparkles className="h-3 w-3 mr-1" />
                              Premium
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-400 mt-1">
                          {cmd.description}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getCategoryColor(cmd.category)}`}
                          >
                            {cmd.category}
                          </Badge>
                          {cmd.aliases && cmd.aliases.length > 0 && (
                            <span className="text-xs text-gray-500">
                              {cmd.aliases.length} alias
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Estadísticas */}
                    <div className="flex flex-col md:items-end gap-3">
                      <div className="flex items-center gap-4">
                        {cmd.stats?.count !== undefined && (
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-gray-500" />
                            <div className="text-right">
                              <div className="font-semibold text-white">{formatUsage(cmd.stats.count)}</div>
                              <div className="text-xs text-gray-500">usos</div>
                            </div>
                          </div>
                        )}
                        
                        {cmd.stats?.successRate !== undefined && (
                          <div className="flex items-center gap-2">
                            <div className="text-right">
                              <div className={`font-semibold ${
                                cmd.stats.successRate >= 90 ? 'text-green-500' :
                                cmd.stats.successRate >= 70 ? 'text-yellow-500' :
                                'text-red-500'
                              }`}>
                                {cmd.stats.successRate.toFixed(1)}%
                              </div>
                              <div className="text-xs text-gray-500">éxito</div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-2 justify-end">
                        {cmd.cooldown && (
                          <Badge variant="outline" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {cmd.cooldown}s
                          </Badge>
                        )}
                        
                        {cmd.permissions && cmd.permissions.length > 0 && (
                          <Badge variant="outline" className="text-xs">
                            <Shield className="h-3 w-3 mr-1" />
                            {cmd.permissions.length}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Sin resultados */}
      {sortedCommands.length === 0 && hasData && (
        <div className="text-center py-20">
          <Command className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">No se encontraron comandos</h3>
          <p className="text-gray-400 mb-6">
            No hay comandos que coincidan con los filtros aplicados
          </p>
          <Button onClick={() => {
            setSearchTerm('');
            setSelectedCategory('all');
            setSelectedType('all');
          }}>
            Limpiar todos los filtros
          </Button>
        </div>
      )}

      {/* Sin datos */}
      {!hasData && !loading && !error && (
        <div className="text-center py-20">
          <Database className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">No hay datos de comandos disponibles</h3>
          <p className="text-gray-400 mb-6">
            El bot podría no tener comandos registrados o la API no está disponible
          </p>
          <Button onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reintentar conexión
          </Button>
        </div>
      )}

      {/* Panel de estadísticas avanzadas */}
      {stats?.realtime && (
        <div className="mt-12 p-6 bg-gray-900/30 rounded-2xl border border-gray-800">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="h-5 w-5 text-nyxara-primary" />
            <h3 className="text-lg font-semibold">Estadísticas en Tiempo Real</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-white">
                {stats.realtime.summary?.totalCommands || 0}
              </div>
              <div className="text-sm text-gray-400">Ejecuciones totales</div>
            </div>
            
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-green-500">
                {stats.realtime.summary?.successRate || '0%'}
              </div>
              <div className="text-sm text-gray-400">Tasa de éxito</div>
            </div>
            
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-500">
                {stats.realtime.summary?.avgResponseTime || '0ms'}
              </div>
              <div className="text-sm text-gray-400">Tiempo promedio</div>
            </div>
            
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-purple-500">
                {stats.realtime.summary?.commandsPerMinute || '0'}
              </div>
              <div className="text-sm text-gray-400">Comandos/minuto</div>
            </div>
          </div>
          
          {/* Top comandos */}
          {stats.realtime.topCommands && stats.realtime.topCommands.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-4">Comandos más populares</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stats.realtime.topCommands.slice(0, 6).map((cmd: any, index: number) => (
                  <div key={index} className="p-4 bg-gray-800/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{cmd.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {formatUsage(cmd.count)} usos
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-nyxara-primary h-2 rounded-full"
                        style={{ 
                          width: `${Math.min((cmd.count / (stats.realtime.topCommands[0].count || 1)) * 100, 100)}%` 
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>{cmd.successRate ? `${cmd.successRate.toFixed(1)}% éxito` : 'Sin datos'}</span>
                      <span>#{index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}