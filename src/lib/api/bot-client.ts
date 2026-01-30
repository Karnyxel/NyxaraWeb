const BOT_API_URL = process.env.NEXT_PUBLIC_BOT_API_URL;
const BOT_API_KEY = process.env.NEXT_PUBLIC_BOT_API_KEY;
const BOT_ADMIN_API_KEY = process.env.NEXT_PUBLIC_BOT_ADMIN_API_KEY;

export interface ApiResponse {
  success: boolean;
  [key: string]: any;
}

export interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
  requiresAuth?: boolean;
  authLevel?: 'public' | 'authenticated' | 'admin';
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
}

export interface ShardInfo {
  shardId: number;
  status: 'online' | 'offline' | 'unknown';
  guilds: number;
  users: number;
  ping: number;
  uptime: number;
  memory: number;
  voiceConnections: number;
  channels: number;
  commandsProcessed?: number;
  lastUpdate?: number;
  cpuUsage?: number;
  heapUsed?: number;
}

export interface GuildInfo {
  id: string;
  name: string;
  icon: string | null;
  members: number;
  ownerId: string;
  created: string;
  region: string;
  features: string[];
  verificationLevel: number;
  channels: number;
  roles: number;
  emojis: number;
  joinedAt: string | null;
  daysSinceJoin?: number | null;
  boostLevel: number;
  boostCount: number;
  banner: string | null;
  description: string | null;
  systemChannel: string | null;
  rulesChannel: string | null;
  afkChannel: string | null;
  afkTimeout: number;
  mfaLevel: number;
  vanityURL: string | null;
}

export interface GuildSearchResult {
  found: boolean;
  shardId: number | null;
  isCurrentShard: boolean;
  guildInfo: GuildInfo | null;
  searchMethod: string;
  searchedAllShards: boolean;
  otherShardsSearched?: number;
  timestamp: string;
  error?: string;
  suggestions?: string[];
}

export interface DashboardData {
  overview: {
    botStatus: 'Online' | 'Offline';
    totalShards: number;
    onlineShards: number;
    offlineShards: number;
    activeGuilds: number;
    totalUsers: number;
    averagePing: number;
    uptime: string;
    memoryUsage: string;
    loadBalance: string;
  };
  commands?: {
    totalExecutions?: number;
    successRate?: string;
    activeCommands?: number;
    topCommand?: { name: string; count: number };
  };
  shards: {
    distribution: Array<{
      shardId: number;
      guilds: number;
      percentage: number;
      status: string;
      memory: number;
    }>;
    details: ShardInfo[];
  };
  performance: {
    latency: number;
    memoryUsage: number;
    cacheHitRate: number;
    uptimePercent: number;
  };
  system: {
    platform: string;
    nodeVersion: string;
    memory: number;
    cpuCores: number;
    uptime: string;
  };
}

// ============ NUEVAS INTERFACES PARA COMANDOS ============

export interface CommandOption {
  name: string;
  description: string;
  type: number;
  required: boolean;
}

export interface CommandInfo {
  name: string;
  description: string;
  type: 'slash' | 'prefix';
  category: string;
  permissions: string[];
  cooldown: number;
  premium: boolean;
  guildpremium: boolean;
  ownerOnly: boolean;
  mdOnly: boolean;
  logcommand: boolean;
  options?: CommandOption[];
  defaultPermission?: boolean;
  aliases?: string[];
  usage?: string;
  stats?: CommandStatsData;
}

export interface CommandStatsData {
  count: number;
  successRate: number;
  avgTime: number;
  lastUsed: string | null;
}

export interface CommandSummary {
  totalCommands: number;
  successful: number;
  failed: number;
  successRate: string;
  avgResponseTime: string;
  commandsPerMinute: string;
  uptime: string;
}

export interface CommandsResponse {
  success: boolean;
  timestamp: string;
  summary: {
    totalCommands: number;
    slashCommands: number;
    prefixCommands: number;
    categories: number;
  };
  commands: {
    slash: CommandInfo[];
    prefix: CommandInfo[];
  };
  groupedByCategory?: Record<string, CommandInfo[]>;
  authLevel?: string;
}

export interface CommandsNamesResponse {
  success: boolean;
  timestamp: string;
  slashCommands: string[];
  prefixCommands: string[];
  aliases: string[];
  counts: {
    slash: number;
    prefix: number;
    aliases: number;
    totalUnique: number;
  };
  authLevel?: string;
}

export interface CommandsStatsResponse {
  success: boolean;
  timestamp: string;
  period: string;
  limit: number;
  realtime: {
    summary: CommandSummary;
    byType: {
      slash: { count: number; commands: CommandInfo[] };
      prefix: { count: number; commands: CommandInfo[] };
    };
    topCommands: Array<{ name: string; count: number; successRate?: number }>;
    errorsByType: Array<{ type: string; count: number }>;
    activity: {
      usersTracked: number;
      guildsTracked: number;
    };
  };
  database?: any;
  summary?: {
    totalExecutions: number;
    successRate: string;
    activeCommands: number;
    topCommand: { name: string; count: number };
  };
  filtered?: {
    category: string;
    slash: CommandInfo[];
    prefix: CommandInfo[];
  };
  authLevel?: string;
}

export interface CommandDetailResponse {
  success: boolean;
  timestamp: string;
  found: boolean;
  name: string;
  type: 'slash' | 'prefix';
  info: CommandInfo;
  stats?: CommandStatsData;
  usageHistory?: any;
  aliases?: string[];
}

// ============ INTERFACES EXISTENTES MANTENIDAS ============

export interface CommandStats {
  today: {
    total: number;
    success: number;
    failed: number;
    successRate: number;
    perHour?: number;
  };
  popularCommands: Array<{
    name: string;
    count: number;
    avgTime?: number;
    popularity?: number;
  }>;
  shardDistribution?: Array<{
    shardId: number;
    count: number;
    avgTime?: number;
    successRate?: number;
  }>;
}

export interface BotStatsSummary {
  botReady: boolean;
  totalShards: number;
  onlineShards: number;
  offlineShards: number;
  totalGuilds: number;
  totalUsers: number;
  totalChannels?: number;
  totalVoiceConnections?: number;
  uptime: number;
  averagePing: number;
  averageUptime?: number;
  loadBalance: string;
  loadScore?: number;
}

export interface PerformanceMetrics {
  latency: {
    average: number;
    min: number;
    max: number;
  };
  memory: {
    used: number;
    total: number;
    percent: number;
  };
  cpu: {
    cores: number;
    load: number[];
    usage?: number;
  };
  cache?: any;
  commands?: {
    responseTime: string;
    queueSize: number;
    concurrentExecutions: number;
  };
}

export class BotAPI {
  private baseUrl: string;
  private apiKey: string;
  private adminKey: string;
  private cache: Map<string, { data: any; timestamp: number; ttl: number }>;

  constructor() {
    // Siempre usar el proxy local en desarrollo
    this.baseUrl = BOT_API_URL || 'http://localhost:3000/api/bot';
    this.apiKey = BOT_API_KEY;
    this.adminKey = BOT_ADMIN_API_KEY;
    this.cache = new Map();
    console.log('[BotAPI] Configurado con URL:', this.baseUrl);
    console.log('[BotAPI] API Key configurada:', this.apiKey ? 'Sí' : 'No');
  }

  private async request(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse> {
    const {
      headers = {},
      timeout = 30000, // Aumentar timeout
      requiresAuth = false,
      authLevel = 'public',
      method = 'GET',
      body
    } = options;

    const url = `${this.baseUrl}${endpoint}`;
    console.log(`[BotAPI] ${method} ${url} (${authLevel})`);

    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Request-ID': `web-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };

    // Configurar autenticación según nivel
    if (requiresAuth || authLevel !== 'public') {
      if (authLevel === 'authenticated' && this.apiKey) {
        defaultHeaders['X-API-Key'] = this.apiKey;
        console.log('[BotAPI] Enviando API key para autenticación');
      } else if (authLevel === 'admin' && this.adminKey) {
        defaultHeaders['X-API-Key'] = this.adminKey;
        console.log('[BotAPI] Enviando API key de admin');
      } else {
        console.warn(`[BotAPI] API key requerida para ${authLevel} pero no configurada`);
      }
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      console.error(`[BotAPI] Timeout (${timeout}ms) en ${endpoint}`);
    }, timeout);

    try {
      const response = await fetch(url, {
        method,
        headers: { ...defaultHeaders, ...headers },
        signal: controller.signal,
        body: body ? JSON.stringify(body) : undefined,
        credentials: 'same-origin',
      });

      clearTimeout(timeoutId);

      console.log(`[BotAPI] Respuesta ${response.status} de ${url}`);

      // Verificar si la respuesta es JSON
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.warn(`[BotAPI] Respuesta no JSON de ${endpoint}:`, text.substring(0, 200));
        data = { success: false, error: `Respuesta inválida: ${text.substring(0, 100)}...` };
      }

      // Manejar errores específicos de la API
      if (data.error && data.error.includes('is not defined')) {
        console.warn(`[BotAPI] Función no implementada en API: ${data.error}`);
        data.fallbackAvailable = true;
      }

      if (!response.ok) {
        console.error(`[BotAPI] Error ${response.status}:`, data);
        throw new Error(`API Error ${response.status}: ${JSON.stringify(data)}`);
      }

      // Log detallado en desarrollo
      if (process.env.NODE_ENV === 'development') {
        console.log(`[BotAPI] Response from ${endpoint}:`, {
          success: data.success,
          timestamp: data.timestamp,
          statusCode: response.status,
        });
      }
      
      return data;
    } catch (error: any) {
      clearTimeout(timeoutId);
      console.error(`[BotAPI] Fetch error in ${endpoint}:`, error.message);
      
      return {
        success: false,
        error: error.message,
        code: error.name === 'AbortError' ? 'TIMEOUT' : 'NETWORK_ERROR',
        endpoint,
        timestamp: new Date().toISOString(),
      };
    }
  }

  // ============ ENDPOINTS PÚBLICOS ============
  
  async getHealth(): Promise<ApiResponse> {
    return this.request('/health', { authLevel: 'public' });
  }

  async getBotStats(): Promise<ApiResponse> {
    try {
      const data = await this.request('/bot/stats', { authLevel: 'public' });
      
      // Si la API falla, devolver datos de fallback
      if (!data.success) {
        console.warn('[BotAPI] API falló, usando datos simulados para bot stats');
        return {
          success: true,
          timestamp: new Date().toISOString(),
          summary: {
            totalShards: 5,
            onlineShards: 4,
            offlineShards: 1,
            totalGuilds: 620,
            totalUsers: 124600
          },
          currentShard: {
            id: 0,
            guilds: 124,
            users: 25430,
            ping: 65,
            uptime: 86400
          },
          allShards: this.getSimulatedShardsData(),
          isFallback: true
        };
      }
      
      return data;
    } catch (error) {
      console.error('[BotAPI] Error en getBotStats, usando datos simulados:', error);
      return {
        success: true,
        timestamp: new Date().toISOString(),
        summary: {
          totalShards: 5,
          onlineShards: 4,
          offlineShards: 1,
          totalGuilds: 620,
          totalUsers: 124600
        },
        currentShard: {
          id: 0,
          guilds: 124,
          users: 25430,
          ping: 65,
          uptime: 86400
        },
        allShards: this.getSimulatedShardsData(),
        isFallback: true
      };
    }
  }

  async getAllShards(): Promise<ApiResponse> {
    try {
      const data = await this.request('/shards', { authLevel: 'public' });
      
      // Si la API falla, devolver datos de fallback
      if (!data.success) {
        console.warn('[BotAPI] API falló, usando datos simulados para shards');
        return {
          success: true,
          timestamp: new Date().toISOString(),
          shards: this.getSimulatedShardsData(),
          total: 5,
          online: 4,
          isFallback: true
        };
      }
      
      return data;
    } catch (error) {
      console.error('[BotAPI] Error en getAllShards, usando datos simulados:', error);
      return {
        success: true,
        timestamp: new Date().toISOString(),
        shards: this.getSimulatedShardsData(),
        total: 5,
        online: 4,
        isFallback: true
      };
    }
  }

  async getShardInfo(shardId: number): Promise<ApiResponse> {
    return this.request(`/shard/${shardId}`, { authLevel: 'public' });
  }

  async getGuild(guildId: string): Promise<ApiResponse> {
    try {
      // Primero intentar con la nueva API
      const data = await this.request(`/guild/${guildId}`, { authLevel: 'public' });
      
      // Si hay error de función no implementada, intentar con fallback
      if (!data.success && data.error && data.error.includes('is not defined')) {
        console.warn('[BotAPI] API no implementada completamente, usando fallback para guild');
        return {
          success: false,
          timestamp: new Date().toISOString(),
          guildId,
          found: false,
          error: 'Funcionalidad de búsqueda de guilds no disponible temporalmente',
          suggestions: ['La API del bot está en desarrollo', 'Intenta nuevamente más tarde']
        };
      }
      
      return data;
    } catch (error) {
      console.error('[BotAPI] Error en getGuild:', error);
      return {
        success: false,
        timestamp: new Date().toISOString(),
        guildId,
        found: false,
        error: 'Error al buscar la guild',
        suggestions: ['Verifica el ID de la guild', 'El bot podría no estar en este servidor']
      };
    }
  }

async searchGuild(guildId: string): Promise<ApiResponse> {
  try {
    console.log(`[BotAPI] Buscando guild ID: ${guildId}`);
    
    // Validar formato primero
    if (!/^\d{17,20}$/.test(guildId)) {
      return {
        success: false,
        timestamp: new Date().toISOString(),
        guildId,
        found: false,
        error: 'ID inválido. Los IDs de Discord tienen 17-20 dígitos',
        suggestions: [
          'Verifica que el ID solo contenga números',
          'Ejemplo correcto: 123456789012345678'
        ]
      };
    }

    // Usar el endpoint de búsqueda
    const data = await this.request(`/search/guild/${guildId}`, { 
      authLevel: 'public',
      timeout: 10000 // 10 segundos timeout
    });
    
    console.log(`[BotAPI] Respuesta de búsqueda:`, data);
    
    // Si hay error de función no implementada
    if (data.fallbackAvailable || (data.error && data.error.includes('is not defined'))) {
      console.warn('[BotAPI] API no implementada completamente, usando datos simulados');
      return this.getMockGuildSearchResult(guildId);
    }
    
    // Si la respuesta es exitosa pero no tiene la estructura esperada
    if (data.success && !data.result && !data.found) {
      // Intentar interpretar la respuesta de diferentes formas
      const searchResult = data.data || data;
      
      return {
        success: true,
        timestamp: new Date().toISOString(),
        data: {
          found: searchResult.found || false,
          shardId: searchResult.shardId || 0,
          isCurrentShard: searchResult.isCurrentShard || false,
          guildInfo: searchResult.guildInfo || null,
          searchMethod: searchResult.searchMethod || 'api_direct',
          searchedAllShards: searchResult.searchedAllShards || false,
          otherShardsSearched: searchResult.otherShardsSearched || 0,
          timestamp: searchResult.timestamp || new Date().toISOString(),
          error: searchResult.error,
          suggestions: searchResult.suggestions
        }
      };
    }
    
    // Retornar respuesta estructurada
    return {
      success: data.success !== false,
      timestamp: new Date().toISOString(),
      data: data.result || data.data || data
    };
    
  } catch (error: any) {
    console.error('[BotAPI] Error en searchGuild:', error);
    return this.getMockGuildSearchResult(guildId);
  }
}

// Agrega esta función para datos mock
private getMockGuildSearchResult(guildId: string): ApiResponse {
  console.log('[BotAPI] Generando datos simulados para guild search');
  
  // Simular que encontramos la guild con 80% de probabilidad
  const found = Math.random() > 0.2; // 80% de probabilidad de encontrar
  
  if (found) {
    return {
      success: true,
      timestamp: new Date().toISOString(),
      data: {
        found: true,
        shardId: 0, // Siempre en shard 0 para datos mock
        isCurrentShard: true,
        guildInfo: {
          id: guildId,
          name: `Guild de Prueba ${guildId.substring(0, 8)}`,
          icon: null,
          members: Math.floor(Math.random() * 5000) + 100,
          ownerId: '123456789012345678',
          created: new Date(Date.now() - Math.random() * 31536000000).toISOString(),
          region: 'us-west',
          features: ['COMMUNITY', 'NEWS'],
          verificationLevel: 2,
          channels: Math.floor(Math.random() * 50) + 10,
          roles: Math.floor(Math.random() * 30) + 5,
          emojis: Math.floor(Math.random() * 50) + 5,
          joinedAt: new Date(Date.now() - Math.random() * 2592000000).toISOString(),
          boostLevel: Math.floor(Math.random() * 3),
          boostCount: Math.floor(Math.random() * 50),
          banner: null,
          description: 'Esta es una guild de demostración (datos simulados)',
          systemChannel: null,
          rulesChannel: null,
          afkChannel: null,
          afkTimeout: 300,
          mfaLevel: 1,
          vanityURL: null
        },
        searchMethod: 'simulated_search',
        searchedAllShards: true,
        otherShardsSearched: 1,
        timestamp: new Date().toISOString()
      },
      isFallback: true,
      fallbackMessage: 'Usando datos de demostración mientras la API está en desarrollo'
    };
  } else {
    return {
      success: true,
      timestamp: new Date().toISOString(),
      data: {
        found: false,
        shardId: null,
        isCurrentShard: false,
        guildInfo: null,
        searchMethod: 'simulated_search',
        searchedAllShards: true,
        otherShardsSearched: 1,
        timestamp: new Date().toISOString(),
        error: `La guild ${guildId} no fue encontrada en ningún shard`,
        suggestions: [
          'El bot no está en esta guild',
          'Verifica el ID de la guild',
          'La guild podría haber eliminado al bot',
          'Nota: Estos son datos de demostración'
        ]
      },
      isFallback: true,
      fallbackMessage: 'Usando datos de demostración mientras la API está en desarrollo'
    };
  }
}

  async getStatus(): Promise<ApiResponse> {
    return this.request('/status', { authLevel: 'public' });
  }

  async getPing(): Promise<ApiResponse> {
    return this.request('/ping', { authLevel: 'public' });
  }

  // ============ NUEVOS ENDPOINTS DE COMANDOS ============

  async getCommands(): Promise<CommandsResponse> {
    return this.request('/commands', { authLevel: 'authenticated' }) as Promise<CommandsResponse>;
  }

  async getCommandsNames(): Promise<CommandsNamesResponse> {
    return this.request('/commands/names', { authLevel: 'authenticated' }) as Promise<CommandsNamesResponse>;
  }

  async getCommandsStats(params?: { period?: string; limit?: number; category?: string }): Promise<CommandsStatsResponse> {
    let endpoint = '/commands/stats';
    if (params) {
      const queryParams = new URLSearchParams();
      if (params.period) queryParams.set('period', params.period);
      if (params.limit) queryParams.set('limit', params.limit.toString());
      if (params.category) queryParams.set('category', params.category);
      if (queryParams.toString()) {
        endpoint += `?${queryParams.toString()}`;
      }
    }
    return this.request(endpoint, { authLevel: 'authenticated' }) as Promise<CommandsStatsResponse>;
  }

  async getCommandInfo(commandName: string, includeStats: boolean = true): Promise<CommandDetailResponse> {
    return this.request(`/command/${commandName}?stats=${includeStats ? 'true' : 'false'}`, { 
      authLevel: 'authenticated' 
    }) as Promise<CommandDetailResponse>;
  }

  // ============ ENDPOINTS DASHBOARD (AUTHENTICATED) ============

  async getDashboard(): Promise<ApiResponse> {
    try {
      const data = await this.request('/dashboard', { authLevel: 'authenticated' });
      
      // Si la API falla, devolver datos de fallback
      if (!data.success) {
        console.warn('[BotAPI] API falló, usando datos simulados para dashboard');
        return {
          success: true,
          timestamp: new Date().toISOString(),
          ...this.getSimulatedDashboardData(),
          isFallback: true
        };
      }
      
      return data;
    } catch (error) {
      console.error('[BotAPI] Error en getDashboard, usando datos simulados:', error);
      return {
        success: true,
        timestamp: new Date().toISOString(),
        ...this.getSimulatedDashboardData(),
        isFallback: true
      };
    }
  }

  async getOverview(): Promise<ApiResponse> {
    try {
      const data = await this.request('/overview', { authLevel: 'authenticated' });
      
      if (!data.success) {
        console.warn('[BotAPI] API falló, usando datos simulados para overview');
        return {
          success: true,
          timestamp: new Date().toISOString(),
          botStatus: 'Online',
          shards: { total: 5, online: 4, offline: 1 },
          metrics: {
            servers: 620,
            users: '124.6K',
            commandsExecuted: 1450,
            commandSuccessRate: '98.0%',
            uptime: 99.8,
            latency: '65ms'
          },
          system: {
            memory: '156 MB',
            platform: 'linux',
            nodeVersion: 'v18.17.0'
          },
          commands: { active: 42, mostUsed: 'play' },
          lastUpdated: new Date().toISOString(),
          isFallback: true
        };
      }
      
      return data;
    } catch (error) {
      console.error('[BotAPI] Error en getOverview, usando datos simulados:', error);
      return {
        success: true,
        timestamp: new Date().toISOString(),
        botStatus: 'Online',
        shards: { total: 5, online: 4, offline: 1 },
        metrics: {
          servers: 620,
          users: '124.6K',
          commandsExecuted: 1450,
          commandSuccessRate: '98.0%',
          uptime: 99.8,
          latency: '65ms'
        },
        system: {
          memory: '156 MB',
          platform: 'linux',
          nodeVersion: 'v18.17.0'
        },
        commands: { active: 42, mostUsed: 'play' },
        lastUpdated: new Date().toISOString(),
        isFallback: true
      };
    }
  }

  async getShardsDetailed(): Promise<ApiResponse> {
    return this.request('/shards/detailed', { authLevel: 'authenticated' });
  }

  async getPerformance(): Promise<ApiResponse> {
    return this.request('/performance', { authLevel: 'authenticated' });
  }

  async getVoiceStats(): Promise<ApiResponse> {
    return this.request('/voice/stats', { authLevel: 'authenticated' });
  }

  // ============ ENDPOINTS AUTHENTICATED (COMPATIBILIDAD) ============

  async getGuilds(params?: { page?: number; limit?: number; search?: string }): Promise<ApiResponse> {
    let endpoint = '/guilds';
    if (params?.page || params?.limit || params?.search) {
      const queryParams = new URLSearchParams();
      if (params.page) queryParams.set('page', params.page.toString());
      if (params.limit) queryParams.set('limit', params.limit.toString());
      if (params.search) queryParams.set('search', params.search);
      endpoint += `?${queryParams.toString()}`;
    }
    return this.request(endpoint, { authLevel: 'authenticated' });
  }

  async getPanel(): Promise<ApiResponse> {
    return this.request('/panel', { authLevel: 'authenticated' });
  }

  // ============ ENDPOINTS ADMIN ============

  async getAdminStats(): Promise<ApiResponse> {
    return this.request('/admin/stats', { authLevel: 'admin' });
  }

  async getAdminCache(): Promise<ApiResponse> {
    return this.request('/admin/cache', { authLevel: 'admin' });
  }

  async clearAdminCache(pattern?: string, scope?: string): Promise<ApiResponse> {
    return this.request('/admin/cache/clear', {
      authLevel: 'admin',
      method: 'POST',
      body: { pattern, scope },
    });
  }

  async getAdminSystem(): Promise<ApiResponse> {
    return this.request('/admin/system', { authLevel: 'admin' });
  }

  // ============ MÉTODOS ÚTILES ============

  async testConnection() {
    try {
      const startTime = Date.now();
      const health = await this.getHealth();
      const latency = Date.now() - startTime;

      // Determinar si la conexión es exitosa
      const connected = health.success !== false && 
                       !health.error?.includes('is not defined') &&
                       !health.error?.includes('500');

      return {
        connected,
        success: true,
        status: health.status || 'healthy',
        latency,
        timestamp: new Date().toISOString(),
        apiVersion: '4.0.0',
        details: health,
        botReady: health.botReady || false,
        shardId: health.shardId,
        totalShards: health.totalShards,
        uptime: health.uptime,
        isFallback: health.isFallback || false
      };
    } catch (error: any) {
      console.error('[BotAPI] Error en testConnection:', error);
      return {
        connected: false,
        success: false,
        error: error.message || 'No se pudo conectar con la API',
        code: error.code || 'CONNECTION_FAILED',
        timestamp: new Date().toISOString(),
      };
    }
  }

  async getBotSummary() {
    try {
      // Intentar primero el dashboard completo
      const dashboard = await this.getDashboard();
      
      if (dashboard && dashboard.success !== false) {
        return {
          success: true,
          source: 'dashboard',
          data: dashboard,
          timestamp: new Date().toISOString(),
          isFallback: dashboard.isFallback || false
        };
      }
      
      // Fallback a bot stats
      const stats = await this.getBotStats();
      
      if (stats && stats.success !== false) {
        return {
          success: true,
          source: 'stats',
          data: stats,
          timestamp: new Date().toISOString(),
          isFallback: stats.isFallback || false
        };
      } else {
        console.warn('[BotAPI] Ambos endpoints fallaron, usando datos simulados');
        return {
          success: true,
          source: 'simulated',
          data: this.getSimulatedDashboardData(),
          timestamp: new Date().toISOString(),
          isFallback: true
        };
      }
    } catch (error) {
      console.warn('[BotAPI] Usando datos simulados:', error);
      return {
        success: true,
        source: 'simulated',
        data: this.getSimulatedDashboardData(),
        timestamp: new Date().toISOString(),
        isFallback: true
      };
    }
  }

  private getSimulatedShardsData(): ShardInfo[] {
    return Array.from({ length: 5 }, (_, i) => ({
      shardId: i,
      status: i === 4 ? 'offline' : 'online' as 'online' | 'offline' | 'unknown',
      guilds: [211, 86, 125, 122, 76][i] || 100,
      users: [42100, 21500, 31200, 29800, 0][i] || Math.floor(Math.random() * 50000) + 10000,
      ping: [83, 49, 70, 61, 0][i] || Math.floor(Math.random() * 100) + 20,
      uptime: 125600 + Math.random() * 86400,
      memory: 156 + Math.random() * 50,
      voiceConnections: Math.floor(Math.random() * 50),
      channels: Math.floor(Math.random() * 500) + 100,
      commandsProcessed: Math.floor(Math.random() * 1000),
      cpuUsage: Math.random() * 30 + 10,
      heapUsed: 120 + Math.random() * 50,
      lastUpdate: Date.now() - Math.random() * 60000
    }));
  }

  private getSimulatedDashboardData(): DashboardData {
    const shards = this.getSimulatedShardsData();
    const totalGuilds = shards.reduce((sum, s) => sum + s.guilds, 0);
    const totalUsers = shards.reduce((sum, s) => sum + s.users, 0);
    const onlineShards = shards.filter(s => s.status === 'online').length;
    const averagePing = shards.filter(s => s.status === 'online').reduce((sum, s) => sum + s.ping, 0) / onlineShards;

    return {
      overview: {
        botStatus: 'Online',
        totalShards: 5,
        onlineShards,
        offlineShards: 5 - onlineShards,
        activeGuilds: totalGuilds,
        totalUsers: totalUsers,
        averagePing: Math.round(averagePing),
        uptime: '2d 5h',
        memoryUsage: '156 MB',
        loadBalance: 'Excelente'
      },
      commands: {
        totalExecutions: 1450,
        successRate: '98.0%',
        activeCommands: 42,
        topCommand: { name: 'play', count: 423 }
      },
      shards: {
        distribution: shards.map(s => ({
          shardId: s.shardId,
          guilds: s.guilds,
          percentage: Math.round((s.guilds / totalGuilds) * 1000) / 10,
          status: s.status,
          memory: s.memory
        })),
        details: shards
      },
      performance: {
        latency: averagePing,
        memoryUsage: 7.6,
        cacheHitRate: 95,
        uptimePercent: 99.8
      },
      system: {
        platform: 'linux',
        nodeVersion: 'v18.17.0',
        memory: 156,
        cpuCores: 8,
        uptime: '3d 2h'
      }
    };
  }

  async getFormattedUptime(seconds: number): Promise<string> {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  }

  formatNumber(num: number): string {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  }

  // Métodos de cache mejorados
  setCache(key: string, data: any, ttl: number = 10000) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  getCache(key: string): any {
    const cached = this.cache.get(key);
    if (!cached) return null;
    
    const now = Date.now();
    if (now - cached.timestamp < cached.ttl) {
      return cached.data;
    }
    
    this.cache.delete(key);
    return null;
  }

  clearCache(key?: string) {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }

  async cachedRequest<T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttl: number = 10000
  ): Promise<T> {
    const cached = this.getCache(key);
    if (cached) {
      console.log(`[Cache] Hit for ${key}`);
      return cached;
    }

    console.log(`[Cache] Miss for ${key}, fetching...`);
    try {
      const data = await fetchFn();
      this.setCache(key, data, ttl);
      return data;
    } catch (error) {
      const staleCache = this.cache.get(key);
      if (staleCache) {
        console.log(`[Cache] Using stale cache for ${key} due to error`);
        return staleCache.data;
      }
      throw error;
    }
  }
}

// Instancia singleton
export const botAPI = new BotAPI();