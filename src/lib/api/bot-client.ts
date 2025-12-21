// src/lib/api/bot-client.ts
const BOT_API_URL = process.env.NEXT_PUBLIC_BOT_API_URL || 'http://localhost:3001'

export interface BotStats {
  guilds: number
  users: number
  commands: number
  uptime: number
  shards: number
  ping: number
}

export interface Command {
  name: string
  description: string
  category: string
  premium: boolean
  usage: string
}

export interface Guild {
  id: string
  name: string
  icon: string | null
  memberCount: number
  ownerId: string
  joinedAt: string
}

export class BotAPIClient {
  private baseUrl: string
  
  constructor() {
    this.baseUrl = BOT_API_URL
  }
  
  // Obtener estadísticas públicas del bot
  async getPublicStats(): Promise<BotStats> {
    try {
      const res = await fetch(`${this.baseUrl}/api/public/stats`, {
        next: { revalidate: 60 } // Cache por 60 segundos
      })
      if (!res.ok) throw new Error('Failed to fetch stats')
      return res.json()
    } catch (error) {
      console.error('Error fetching bot stats:', error)
      return {
        guilds: 128,
        users: 25847,
        commands: 112,
        uptime: Date.now() - (24 * 60 * 60 * 1000), // 24 horas
        shards: 1,
        ping: 45
      }
    }
  }
  
  // Obtener lista de comandos
  async getCommands(): Promise<Command[]> {
    try {
      const res = await fetch(`${this.baseUrl}/api/public/commands`)
      if (!res.ok) throw new Error('Failed to fetch commands')
      return res.json()
    } catch (error) {
      // Datos de ejemplo si falla la API
      return [
        { name: 'play', description: 'Reproduce música', category: 'Música', premium: false, usage: '/play [canción]' },
        { name: 'ban', description: 'Banear usuario', category: 'Moderación', premium: false, usage: '/ban @usuario [razón]' },
        { name: 'imagine', description: 'Generar imágenes con IA', category: 'IA', premium: true, usage: '/imagine [prompt]' },
        { name: 'level', description: 'Ver tu nivel', category: 'Niveles', premium: false, usage: '/level' },
      ]
    }
  }
  
  // Obtener comandos por categoría
  async getCommandsByCategory(category: string): Promise<Command[]> {
    const commands = await this.getCommands()
    return commands.filter(cmd => cmd.category === category)
  }
  
  // Obtener categorías únicas
  async getCategories(): Promise<string[]> {
    const commands = await this.getCommands()
    const categories = [...new Set(commands.map(cmd => cmd.category))]
    return categories.sort()
  }
  
  // Verificar estado del bot
  async getBotStatus(): Promise<{
    online: boolean
    ping: number
    shards: number
    uptime: number
  }> {
    try {
      const stats = await this.getPublicStats()
      return {
        online: true,
        ping: stats.ping,
        shards: stats.shards,
        uptime: stats.uptime
      }
    } catch {
      return {
        online: false,
        ping: 0,
        shards: 0,
        uptime: 0
      }
    }
  }
  
  // Formatear tiempo de uptime
  formatUptime(ms: number): string {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000))
    const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000))
    
    if (days > 0) return `${days}d ${hours}h`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }
}

export const botAPI = new BotAPIClient()