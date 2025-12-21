const BOT_API_URL = process.env.NEXT_PUBLIC_BOT_API_URL || 'http://localhost:3001';

export class BotAPIClient {
  private baseUrl: string;
  
  constructor() {
    this.baseUrl = BOT_API_URL;
  }
  
  async getPublicStats() {
    const res = await fetch(`${this.baseUrl}/api/public/stats`);
    return res.json();
  }
  
  async getPublicCommands() {
    const res = await fetch(`${this.baseUrl}/api/public/commands`);
    return res.json();
  }

  async getGuild(guildId: string, accessToken: string) {
    const res = await fetch(`${this.baseUrl}/api/internal/guilds/${guildId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return res.json();
  }
  
  async updateGuildConfig(guildId: string, config: any, accessToken: string) {
    const res = await fetch(`${this.baseUrl}/api/internal/guilds/${guildId}/config`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });
    return res.json();
  }
}

export const botAPI = new BotAPIClient();