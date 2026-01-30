/**
 * Hooks React para la nueva API unificada del bot
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  botAPI, 
  ApiResponse, 
  DashboardData, 
  ShardInfo, 
  GuildInfo,
  CommandStats,
  PerformanceMetrics,
  CommandsResponse,
  CommandsNamesResponse,
  CommandsStatsResponse,
  CommandDetailResponse,
  CommandInfo
} from './bot-client';

export interface BotConnectionStatus {
  connected: boolean;
  loading: boolean;
  latency: number;
  error: string | null;
  details?: any;
  lastChecked?: Date;
}

export interface UseBotAPIEndpointOptions {
  authLevel?: 'public' | 'authenticated' | 'admin';
  params?: Record<string, any>;
  autoFetch?: boolean;
  cacheKey?: string;
  ttl?: number;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

// Hook para usar endpoints con estado de carga
export function useBotAPIEndpoint<T = ApiResponse>(
  endpoint: string,
  options: UseBotAPIEndpointOptions = {}
) {
  const { 
    authLevel = 'public', 
    params,
    autoFetch = true, 
    cacheKey,
    ttl = 10000,
    onSuccess,
    onError
  } = options;
  const stableParams = useRef(params);

  if (JSON.stringify(stableParams.current) !== JSON.stringify(params)) {
    stableParams.current = params;
  }
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);
    
    try {
      let response;
      
      // Mapear endpoints a métodos del cliente actualizado
      switch (endpoint) {
        case '/api/health':
          response = await botAPI.getHealth();
          break;
        case '/api/status':
          response = await botAPI.getStatus();
          break;
        case '/api/ping':
          response = await botAPI.getPing();
          break;
        case '/api/bot/stats':
          response = await botAPI.getBotStats();
          break;
        case '/api/shards':
          response = await botAPI.getAllShards();
          break;
        case '/api/shards/detailed':
          response = await botAPI.getShardsDetailed();
          break;
        case '/api/dashboard':
          response = await botAPI.getDashboard();
          break;
        case '/api/overview':
          response = await botAPI.getOverview();
          break;
        case '/api/performance':
          response = await botAPI.getPerformance();
          break;
        case '/api/commands/stats':
          response = await botAPI.getCommandsStats(params);
          break;
        case '/api/voice/stats':
          response = await botAPI.getVoiceStats();
          break;
        case '/api/commands':
          response = await botAPI.getCommands();
          break;
        case '/api/commands/names':
          response = await botAPI.getCommandsNames();
          break;
        case '/api/guilds':
          response = await botAPI.getGuilds(params);
          break;
        case '/api/panel':
          response = await botAPI.getPanel();
          break;
        case '/api/admin/stats':
          response = await botAPI.getAdminStats();
          break;
        case '/api/admin/system':
          response = await botAPI.getAdminSystem();
          break;
        case '/api/admin/cache':
          response = await botAPI.getAdminCache();
          break;
        default:
          // Manejar endpoints con parámetros dinámicos
          if (endpoint.startsWith('/api/shard/')) {
            const shardId = parseInt(endpoint.split('/').pop() || '0');
            response = await botAPI.getShardInfo(shardId);
          } else if (endpoint.startsWith('/api/guild/') && !endpoint.includes('/search/')) {
            const guildId = endpoint.split('/').pop() || '';
            response = await botAPI.getGuild(guildId);
          } else if (endpoint.startsWith('/api/search/guild/')) {
            const guildId = endpoint.split('/').pop() || '';
            response = await botAPI.searchGuild(guildId);
          } else if (endpoint.startsWith('/api/command/')) {
            const commandName = endpoint.split('/').pop() || '';
            const includeStats = params.stats !== false;
            response = await botAPI.getCommandInfo(commandName, includeStats);
          } else {
            throw new Error(`Endpoint no soportado: ${endpoint}`);
          }
      }
      
      if (response && !controller.signal.aborted) {
        setData(response as T);
        setLastUpdated(new Date());
        setRetryCount(0);
        
        if (onSuccess) {
          onSuccess(response);
        }
      }
    } catch (err: any) {
      if (!controller.signal.aborted) {
        setError(err);
        setRetryCount(prev => prev + 1);
        
        if (onError) {
          onError(err);
        }
        
        console.error(`Error fetching ${endpoint}:`, err);
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
      abortControllerRef.current = null;
    }
  },  [endpoint, JSON.stringify(stableParams.current), onSuccess, onError]);

  useEffect(() => {
    if (autoFetch) {
      if (cacheKey) {
        const cachedData = botAPI.getCache(cacheKey);
        if (cachedData) {
          setData(cachedData as T);
          setLastUpdated(new Date());
          setLoading(false);
          return;
        }
      }
      fetchData();
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchData, autoFetch, cacheKey]);

  const refetch = () => {
    if (cacheKey) {
      botAPI.clearCache(cacheKey);
    }
    fetchData();
  };

  const retry = () => {
    setRetryCount(0);
    refetch();
  };

  return {
    data,
    loading,
    error,
    refetch,
    retry,
    lastUpdated,
    retryCount,
    isConnected: data?.success !== false && !error,
    isError: error !== null || data?.success === false
  };
}

// ============ NUEVOS HOOKS PARA COMANDOS ============

// En use-bot-api.ts, modifica useBotCommands
export function useBotCommands(options?: Omit<UseBotAPIEndpointOptions, 'authLevel'>) {
  const { data, loading, error, refetch } = useBotAPIEndpoint<ApiResponse>('/api/commands', {
    authLevel: 'authenticated',
    cacheKey: 'bot-commands',
    ttl: 10000,
    ...options,
  });
  
  // Log detallado
  console.log('=== useBotCommands DEBUG ===');
  console.log('data:', data);
  console.log('loading:', loading);
  console.log('error:', error);
  
  const apiData = data as any;
  
  // Mapeo más flexible
  const slashCmds = apiData?.commands?.slash || apiData?.slash || [];
  const prefixCmds = apiData?.commands?.prefix || apiData?.prefix || [];
  
  console.log('slashCmds found:', slashCmds.length);
  console.log('prefixCmds found:', prefixCmds.length);
  console.log('raw slashCmds:', slashCmds);
  console.log('raw prefixCmds:', prefixCmds);
  
  return {
    commands: {
      slash: slashCmds,
      prefix: prefixCmds
    },
    loading,
    error,
    refetch,
    summary: apiData?.summary || {
      totalCommands: slashCmds.length + prefixCmds.length,
      slashCommands: slashCmds.length,
      prefixCommands: prefixCmds.length,
      categories: Object.keys(apiData?.groupedByCategory || {}).length
    },
    groupedByCategory: apiData?.groupedByCategory || {},
    totalCommands: slashCmds.length + prefixCmds.length,
    authLevel: apiData?.authLevel,
    timestamp: apiData?.timestamp
  };
}

// Hook para nombres de comandos (búsqueda rápida)
export function useCommandsNames(options?: Omit<UseBotAPIEndpointOptions, 'authLevel'>) {
  const { data, loading, error, refetch } = useBotAPIEndpoint<CommandsNamesResponse>('/api/commands/names', {
    authLevel: 'authenticated',
    cacheKey: 'commands-names',
    ttl: 15000,
    ...options,
  });
  
  return {
    names: data,
    loading,
    error,
    refetch,
    slashCommands: data?.slashCommands || [],
    prefixCommands: data?.prefixCommands || [],
    aliases: data?.aliases || [],
    counts: data?.counts,
    authLevel: data?.authLevel,
    timestamp: data?.timestamp
  };
}

// Hook para estadísticas detalladas de comandos
export function useCommandsStats(options?: {
  period?: string;
  limit?: number;
  category?: string;
  autoFetch?: boolean;
  cacheKey?: string;
  ttl?: number;
}) {
  const { 
    period = 'today', 
    limit = 20, 
    category,
    autoFetch = true,
    cacheKey = 'commands-stats',
    ttl = 10000
  } = options || {};
  
  const params = { period, limit, ...(category ? { category } : {}) };
  
  const { data, loading, error, refetch } = useBotAPIEndpoint<CommandsStatsResponse>('/api/commands/stats', {
    authLevel: 'authenticated',
    cacheKey: `${cacheKey}-${period}-${limit}${category ? `-${category}` : ''}`,
    ttl,
    params,
    autoFetch,
  });
  
  return {
    stats: data,
    loading,
    error,
    refetch,
    realtime: data?.realtime,
    database: data?.database,
    summary: data?.summary,
    filtered: data?.filtered,
    period: data?.period,
    limit: data?.limit,
    authLevel: data?.authLevel,
    timestamp: data?.timestamp
  };
}

// Hook para información específica de un comando
export function useCommandInfo(
  commandName?: string, 
  options?: { 
    includeStats?: boolean;
    autoFetch?: boolean;
    cacheKey?: string;
    ttl?: number;
  }
) {
  const { 
    includeStats = true,
    autoFetch = true,
    cacheKey,
    ttl = 10000
  } = options || {};
  
  const endpoint = commandName ? `/api/command/${commandName}` : '';
  const params = { stats: includeStats };
  
  const { data, loading, error, refetch } = useBotAPIEndpoint<CommandDetailResponse>(endpoint, {
    authLevel: 'authenticated',
    cacheKey: cacheKey || (commandName ? `command-${commandName}` : undefined),
    ttl,
    params,
    autoFetch: autoFetch && !!commandName,
  });
  
  return {
    command: data,
    loading,
    error,
    refetch,
    found: data?.found || false,
    info: data?.info,
    stats: data?.stats,
    usageHistory: data?.usageHistory,
    aliases: data?.aliases,
    commandName: data?.name,
    commandType: data?.type,
    timestamp: data?.timestamp
  };
}

// ============ HOOKS EXISTENTES (MANTENIDOS) ============

// Hook para conexión de prueba
export function useBotAPIConnection(interval: number = 30000) {
  const [connection, setConnection] = useState<BotConnectionStatus>({
    connected: false,
    loading: true,
    latency: 0,
    error: null,
    lastChecked: undefined,
  });

  const testConnection = useCallback(async () => {
    setConnection(prev => ({ ...prev, loading: true, error: null }));
    const result = await botAPI.testConnection();
    
    setConnection({
      connected: result.connected || false,
      loading: false,
      latency: result.latency || 0,
      error: result.error || null,
      details: result.details,
      lastChecked: new Date(),
    });
  }, []);

  useEffect(() => {
    testConnection();
    
    if (interval > 0) {
      const intervalId = setInterval(testConnection, interval);
      return () => clearInterval(intervalId);
    }
  }, [testConnection, interval]);

  return {
    ...connection,
    refetch: testConnection,
    isOnline: connection.connected && !connection.loading,
    hasError: !!connection.error
  };
}

// Hook específico para buscar guilds
export function useGuildSearch(initialGuildId?: string) {
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const search = useCallback(async (guildId?: string) => {
    const searchId = guildId || initialGuildId;
    if (!searchId || !/^\d{17,20}$/.test(searchId)) {
      setError(new Error('ID de guild inválido (17-20 dígitos requeridos)'));
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await botAPI.getGuild(searchId);
      setResult(response);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [initialGuildId]);

  return {
    result,
    loading,
    error,
    search,
    found: result?.success && result?.found === true,
    shardId: result?.shard?.id,
    shardInfo: result?.shard ? {
      id: result.shard.id,
      isCurrentShard: result.shard.isCurrentShard,
      totalGuildsInShard: result.shard.totalGuildsInShard,
      totalUsersInShard: result.shard.totalUsersInShard,
      percentageOfShard: result.shard.percentageOfShard
    } : null,
    guildInfo: result?.guild as GuildInfo | null,
    searchDetails: result?.searchDetails
  };
}

// Hook para el dashboard completo
export function useDashboard(options?: Omit<UseBotAPIEndpointOptions, 'cacheKey' | 'ttl'>) {
  const { data, loading, error, refetch } = useBotAPIEndpoint<ApiResponse & { 
    overview?: any; 
    shards?: any; 
    performance?: any; 
    system?: any;
    commands?: any;
  }>('/api/dashboard', {
    cacheKey: 'dashboard',
    ttl: 5000,
    authLevel: 'authenticated',
    ...options,
  });
  
  return {
    dashboard: data ? {
      overview: data.overview,
      commands: data.commands,
      shards: data.shards,
      performance: data.performance,
      system: data.system
    } as DashboardData : null,
    loading,
    error,
    refetch,
    authLevel: data?.authLevel,
    lastUpdated: data?.timestamp
  };
}

// Hook para estadísticas del bot (dashboard simplificado)
export function useBotOverview(options?: Omit<UseBotAPIEndpointOptions, 'cacheKey' | 'ttl'>) {
  const { data, loading, error, refetch } = useBotAPIEndpoint('/api/overview', {
    cacheKey: 'overview',
    ttl: 5000,
    authLevel: 'authenticated',
    ...options,
  });
  
  return {
    overview: data,
    loading,
    error,
    refetch,
    metrics: data ? {
      servers: data.metrics?.servers || 0,
      users: data.metrics?.users || '0',
      commandsExecuted: data.metrics?.commandsExecuted || 0,
      commandSuccessRate: data.metrics?.commandSuccessRate || '0%',
      uptime: data.metrics?.uptime || 0,
      latency: data.metrics?.latency || '0ms'
    } : null,
    shards: data?.shards,
    system: data?.system,
    commands: data?.commands
  };
}

// Hook para estadísticas del bot (compatibilidad)
export function useBotStats(options?: Omit<UseBotAPIEndpointOptions, 'cacheKey' | 'ttl'>) {
  const { data, loading, error, refetch } = useBotAPIEndpoint('/api/bot/stats', {
    cacheKey: 'bot-stats',
    ttl: 5000,
    ...options,
  });
  
  return {
    stats: data,
    loading,
    error,
    refetch,
    summary: data?.summary,
    currentShard: data?.currentShard,
    allShards: data?.allShards || data?.shards || []
  };
}

// Hook para información de shards (detallada)
export function useShardsInfo(options?: Omit<UseBotAPIEndpointOptions, 'cacheKey'>) {
  const { data, loading, error, refetch } = useBotAPIEndpoint('/api/shards/detailed', {
    cacheKey: 'shards-detailed',
    ttl: 10000,
    authLevel: 'authenticated',
    ...options,
  });
  
  return {
    shards: data?.shards as ShardInfo[] || [],
    distribution: data?.distribution,
    loading,
    error,
    refetch,
    summary: data?.summary ? {
      total: data.summary.total || 0,
      online: data.summary.online || 0,
      offline: data.summary.offline || 0,
      totalGuilds: data.summary.totalGuilds || 0,
      totalUsers: data.summary.totalUsers || 0,
      averagePing: data.summary.averagePing || 0
    } : null
  };
}

// Hook para información de shards (básica - compatibilidad)
export function useShardsBasic(options?: UseBotAPIEndpointOptions) {
  const { data, loading, error, refetch } = useBotAPIEndpoint('/api/shards', options);
  
  return {
    shards: data?.shards as ShardInfo[] || [],
    loading,
    error,
    refetch,
    summary: {
      total: data?.total || 0,
      online: data?.online || 0
    }
  };
}

// Hook para información de un shard específico
export function useShardInfo(shardId: number, options?: UseBotAPIEndpointOptions) {
  const { data, loading, error, refetch } = useBotAPIEndpoint(`/api/shard/${shardId}`, {
    cacheKey: `shard-${shardId}`,
    autoFetch: !isNaN(shardId) && shardId >= 0,
    ...options,
  });
  
  return {
    shard: data?.shard as ShardInfo,
    loading,
    error,
    refetch,
    isOnline: data?.shard?.status === 'online',
  };
}

// Hook para rendimiento del sistema
export function usePerformance(options?: Omit<UseBotAPIEndpointOptions, 'authLevel'>) {
  const { data, loading, error, refetch } = useBotAPIEndpoint('/api/performance', {
    authLevel: 'authenticated',
    cacheKey: 'performance',
    ttl: 5000,
    ...options,
  });
  
  return {
    performance: data as PerformanceMetrics,
    loading,
    error,
    refetch,
    latency: data?.latency,
    memory: data?.memory,
    cpu: data?.cpu,
    cache: data?.cache,
    commands: data?.commands
  };
}

// Hook para estadísticas de comandos (compatibilidad)
export function useCommandsStatsOld(options?: Omit<UseBotAPIEndpointOptions, 'authLevel'>) {
  const { data, loading, error, refetch } = useBotAPIEndpoint('/api/commands/stats', {
    authLevel: 'authenticated',
    cacheKey: 'commands-stats-old',
    ttl: 10000,
    ...options,
  });
  
  return {
    stats: data as CommandStats,
    loading,
    error,
    refetch,
    today: data?.today,
    popularCommands: data?.popularCommands || [],
    shardDistribution: data?.shardDistribution || []
  };
}

// Hook para estadísticas de voz
export function useVoiceStats(options?: Omit<UseBotAPIEndpointOptions, 'authLevel'>) {
  const { data, loading, error, refetch } = useBotAPIEndpoint('/api/voice/stats', {
    authLevel: 'authenticated',
    cacheKey: 'voice-stats',
    ttl: 5000,
    ...options,
  });
  
  return {
    stats: data,
    loading,
    error,
    refetch,
    totalConnections: data?.totalConnections || 0,
    byShard: data?.byShard || []
  };
}

// Hook para panel de control (compatibilidad)
export function useBotPanel(options?: Omit<UseBotAPIEndpointOptions, 'authLevel'>) {
  const { data, loading, error, refetch } = useBotAPIEndpoint('/api/panel', {
    authLevel: 'authenticated',
    cacheKey: 'bot-panel',
    ...options,
  });
  
  return {
    panel: data,
    loading,
    error,
    refetch,
    authLevel: data?.authLevel,
  };
}

// Hook para información del sistema
export function useSystemStatus() {
  const { data, loading, error, refetch } = useBotAPIEndpoint('/api/health', {
    cacheKey: 'system-health',
    ttl: 5000,
  });
  
  return {
    status: data,
    loading,
    error,
    refetch,
    isHealthy: data?.status === 'healthy',
    botReady: data?.botReady,
    shardInfo: data ? {
      shardId: data.shardId,
      totalShards: data.totalShards,
    } : null,
    uptime: data?.uptime,
  };
}

// Hook para estado del bot
export function useBotStatus() {
  const { data, loading, error, refetch } = useBotAPIEndpoint('/api/status', {
    cacheKey: 'bot-status',
    ttl: 3000,
  });
  
  return {
    status: data,
    loading,
    error,
    refetch,
    botStatus: data?.botStatus,
    isOnline: data?.botStatus === 'online',
    shardId: data?.shardId,
    guilds: data?.guilds,
    users: data?.users,
    ping: data?.ping,
    uptime: data?.uptime
  };
}

// Hook combinado para dashboard moderno
export function useDashboardData(refreshInterval: number = 10000) {
  const connection = useBotAPIConnection();
  const { dashboard, loading: dashboardLoading, refetch: refetchDashboard } = useDashboard();
  const { performance, loading: performanceLoading } = usePerformance();
  const { stats: commandsStats, loading: commandsLoading } = useCommandsStats();
  
  const loading = dashboardLoading || performanceLoading || commandsLoading || connection.loading;
  
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchAllData = useCallback(async () => {
    try {
      await Promise.all([
        connection.refetch(),
        refetchDashboard(),
      ]);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  }, [connection, refetchDashboard]);

  useEffect(() => {
    if (refreshInterval > 0) {
      const interval = setInterval(fetchAllData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchAllData, refreshInterval]);

  return {
    connection,
    dashboard,
    performance,
    commandsStats,
    loading,
    refetch: fetchAllData,
    lastUpdate,
    metrics: dashboard?.overview ? {
      totalGuilds: dashboard.overview.activeGuilds || 0,
      totalUsers: dashboard.overview.totalUsers || 0,
      onlineShards: dashboard.overview.onlineShards || 0,
      totalShards: dashboard.overview.totalShards || 0,
      uptime: dashboard.overview.uptime || '0s',
      ping: dashboard.overview.averagePing || 0,
      loadBalance: dashboard.overview.loadBalance || 'Desconocido',
      memoryUsage: dashboard.overview.memoryUsage || '0 MB'
    } : null
  };
}

// Hook para datos del bot con fallback
export function useBotData(refreshInterval: number = 10000) {
  const { dashboard, loading: dashboardLoading, refetch: refetchDashboard } = useDashboard();
  const { stats, loading: statsLoading, refetch: refetchStats } = useBotStats();
  
  const loading = dashboardLoading || statsLoading;
  
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchAllData = useCallback(async () => {
    try {
      await Promise.all([
        refetchDashboard(),
        refetchStats(),
      ]);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching bot data:', error);
    }
  }, [refetchDashboard, refetchStats]);

  useEffect(() => {
    if (refreshInterval > 0) {
      const interval = setInterval(fetchAllData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchAllData, refreshInterval]);

  // Usar dashboard si está disponible, fallback a stats
  const data = dashboard || stats;

  return { 
    data,
    loading, 
    refetch: fetchAllData,
    lastUpdate,
    source: dashboard ? 'dashboard' : 'stats',
    overview: dashboard?.overview || stats?.summary,
    shards: dashboard?.shards?.details || stats?.allShards || [],
    commands: dashboard?.commands
  };
}

// Hook específico para búsqueda de comandos
export function useCommandSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<CommandInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const { names, loading: namesLoading } = useCommandsNames();
  
  const search = useCallback(async (term: string) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      setResults([]);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Primero buscar en nombres locales
      const termLower = term.toLowerCase();
      
      const slashMatches = names?.slashCommands?.filter(name => 
        name.toLowerCase().includes(termLower)
      ) || [];
      
      const prefixMatches = names?.prefixCommands?.filter(name => 
        name.toLowerCase().includes(termLower)
      ) || [];
      
      const aliasMatches = names?.aliases?.filter(alias => 
        alias.toLowerCase().includes(termLower)
      ) || [];
      
      // Si encontramos coincidencias, obtener información completa
      const allMatches = [...slashMatches, ...prefixMatches, ...aliasMatches];
      
      if (allMatches.length > 0) {
        // Por ahora, solo devolvemos los nombres
        // En una implementación completa, podríamos buscar información detallada
        const mockResults: CommandInfo[] = allMatches.slice(0, 10).map(name => ({
          name,
          description: `Comando "${name}" encontrado`,
          type: slashMatches.includes(name) ? 'slash' : 'prefix',
          category: 'search',
          permissions: [],
          cooldown: 0,
          premium: false,
          guildpremium: false,
          ownerOnly: false,
          mdOnly: false,
          logcommand: false
        }));
        
        setResults(mockResults);
      } else {
        setResults([]);
      }
    } catch (err: any) {
      setError(err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [names]);
  
  return {
    search,
    searchTerm,
    results,
    loading: loading || namesLoading,
    error,
    totalResults: results.length,
    hasResults: results.length > 0
  };
}