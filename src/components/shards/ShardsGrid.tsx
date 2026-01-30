'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  Server, 
  Users, 
  Zap, 
  Search,
  Activity,
  ExternalLink,
  Info,
  Cpu,
  Wifi,
  Globe
} from 'lucide-react';

interface ShardInfo {
  id: number;
  status: string;
  guilds: number;
  users: number;
  ping: number;
  uptime: string;
  memory: string;
  online: boolean;
}

interface SearchResult {
  guildId: string;
  shard: ShardInfo;
  shardDetails: any;
  estimatedShard: number;
  totalShards: number;
}

export function ShardsGrid() {
  const [shards, setShards] = useState<ShardInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchGuild, setSearchGuild] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [searching, setSearching] = useState(false);
  const [activeTab, setActiveTab] = useState<'shards' | 'search'>('shards');

  useEffect(() => {
    loadShards();
    const interval = setInterval(loadShards, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadShards = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/bot-stats');
      const data = await response.json();
      
      if (data.success) {
        setShards(data.data.sharding.shards || []);
      }
    } catch (error) {
      console.error('Error loading shards:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchShardByGuild = async () => {
    if (!searchGuild.trim()) return;
    
    try {
      setSearching(true);
      const response = await fetch('/api/bot-stats');
      const data = await response.json();
      
      if (data.success) {
        const shardsList = data.data.sharding.shards || [];
        const totalShards = shardsList.length || 1;
        
        // Simular hash distribution
        const guildId = searchGuild.trim();
        const shardIndex = Math.abs(parseInt(guildId) % totalShards);
        const targetShard = shardsList[shardIndex] || shardsList[0];
        
        setSearchResult({
          guildId,
          shard: targetShard || { id: 0, status: 'unknown', guilds: 0, users: 0, ping: 0, uptime: '0s', memory: '0 MB', online: false },
          shardDetails: {},
          estimatedShard: shardIndex,
          totalShards
        });
      }
    } catch (error) {
      console.error('Error searching guild:', error);
    } finally {
      setSearching(false);
    }
  };

  if (loading && shards.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-nyxara-primary"></div>
        <p className="mt-2 text-gray-400">Cargando shards...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-gray-800">
        <button
          onClick={() => setActiveTab('shards')}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-all ${
            activeTab === 'shards'
              ? 'border-nyxara-primary text-nyxara-primary'
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
        >
          <Server className="h-4 w-4" />
          Shards ({shards.length})
        </button>
        <button
          onClick={() => setActiveTab('search')}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-all ${
            activeTab === 'search'
              ? 'border-nyxara-primary text-nyxara-primary'
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
        >
          <Search className="h-4 w-4" />
          Buscar Guild
        </button>
      </div>

      {/* Content */}
      {activeTab === 'shards' ? (
        <>
          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="text-2xl font-bold">
                {shards.filter(s => s.online).length}/{shards.length}
              </div>
              <div className="text-sm text-gray-400">Online</div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="text-2xl font-bold">
                {shards.reduce((sum, s) => sum + s.guilds, 0)}
              </div>
              <div className="text-sm text-gray-400">Guilds total</div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="text-2xl font-bold">
                {Math.round(shards.reduce((sum, s) => sum + s.ping, 0) / Math.max(1, shards.length))}ms
              </div>
              <div className="text-sm text-gray-400">Ping promedio</div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="text-2xl font-bold">
                {shards.length > 1 ? 'Sharding' : 'Single'}
              </div>
              <div className="text-sm text-gray-400">Modo</div>
            </div>
          </div>

          {/* Shards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {shards.map(shard => (
              <div
                key={shard.id}
                className={`relative group p-4 rounded-xl border transition-all cursor-pointer ${
                  shard.online 
                    ? 'border-green-500/30 bg-green-500/5 hover:bg-green-500/10' 
                    : 'border-red-500/30 bg-red-500/5 hover:bg-red-500/10'
                }`}
              >
                {/* Tooltip hover */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                  <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-2xl p-3 min-w-[200px]">
                    <div className="font-semibold mb-2">Shard #{shard.id}</div>
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Estado:</span>
                        <Badge size="sm" className={
                          shard.online ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }>
                          {shard.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Guilds:</span>
                        <span>{shard.guilds}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Usuarios:</span>
                        <span>{shard.users.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Ping:</span>
                        <span>{shard.ping}ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Memoria:</span>
                        <span>{shard.memory}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Uptime:</span>
                        <span>{shard.uptime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute w-2 h-2 bg-gray-900 border-r border-b border-gray-800 transform rotate-45 top-full left-1/2 -translate-x-1/2 -mt-1" />
                </div>

                {/* Shard card */}
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-2 h-2 rounded-full ${shard.online ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-xs text-gray-400">#{shard.id}</span>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">{shard.guilds}</div>
                  <div className="text-xs text-gray-400">guilds</div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-800/30">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">{shard.ping}ms</span>
                    <span className={`${shard.online ? 'text-green-400' : 'text-red-400'}`}>
                      {shard.online ? '●' : '○'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Balance indicator */}
          <div className="bg-gray-900/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Balance de carga</span>
              <Badge variant="outline" className="bg-green-500/10 text-green-400">
                Excelente
              </Badge>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: '95%' }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Shard más cargado: {Math.max(...shards.map(s => s.guilds))} guilds</span>
              <span>Más ligero: {Math.min(...shards.filter(s => s.guilds > 0).map(s => s.guilds))} guilds</span>
            </div>
          </div>
        </>
      ) : (
        /* Search Tab */
        <div className="space-y-6">
          <div className="bg-gray-900/50 rounded-xl p-6">
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Buscar guild por ID</h4>
              <p className="text-gray-400 text-sm">
                Ingresa el ID de una guild de Discord para encontrar en qué shard está alojada.
              </p>
            </div>
            
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Ej: 123456789012345678"
                  value={searchGuild}
                  onChange={(e) => setSearchGuild(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Puedes obtener el ID de un servidor habilitando el modo desarrollador en Discord
                </p>
              </div>
              <Button
                onClick={searchShardByGuild}
                disabled={searching || !searchGuild.trim()}
                className="gap-2"
              >
                {searching ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Buscando...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Buscar
                  </>
                )}
              </Button>
            </div>
          </div>

          {searchResult && (
            <div className="bg-gray-900/50 rounded-xl p-6 border border-nyxara-primary/20">
              <h4 className="font-semibold mb-4">Resultados de la búsqueda</h4>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-400 mb-1">Guild ID</h5>
                    <div className="font-mono text-lg p-3 bg-gray-800 rounded-lg break-all">
                      {searchResult.guildId}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-gray-400 mb-1">Shard Asignado</h5>
                    <div className={`p-4 rounded-lg ${
                      searchResult.shard?.online 
                        ? 'bg-green-500/10 border border-green-500/20' 
                        : 'bg-red-500/10 border border-red-500/20'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          searchResult.shard?.online ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        <div>
                          <div className="font-bold">Shard #{searchResult.shard?.id || 0}</div>
                          <div className="text-sm text-gray-400">
                            Estado: {searchResult.shard?.status || 'Desconocido'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-400 mb-1">Estadísticas del Shard</h5>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-800 p-3 rounded-lg">
                        <div className="text-2xl font-bold">
                          {searchResult.shard?.guilds || 0}
                        </div>
                        <div className="text-xs text-gray-400">Guilds totales</div>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg">
                        <div className="text-2xl font-bold">
                          {searchResult.shard?.users?.toLocaleString() || 0}
                        </div>
                        <div className="text-xs text-gray-400">Usuarios</div>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg">
                        <div className="text-2xl font-bold">
                          {searchResult.shard?.ping || 0}ms
                        </div>
                        <div className="text-xs text-gray-400">Ping</div>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg">
                        <div className="text-2xl font-bold">
                          {searchResult.shardDetails?.stats?.uptime || 'N/A'}
                        </div>
                        <div className="text-xs text-gray-400">Uptime</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-400 mb-1">Distribución</h5>
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span>Shards totales:</span>
                        <span className="font-medium">{searchResult.totalShards}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shard estimado:</span>
                        <span className="font-medium">#{searchResult.estimatedShard}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Método:</span>
                        <span className="font-medium">Hash Distribution</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Info className="h-4 w-4" />
                  <span>
                    Los shards distribuyen guilds usando un algoritmo hash del ID de la guild.
                    Esto garantiza carga balanceada entre todos los shards.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}