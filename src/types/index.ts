export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  discordId?: string;
  permissions?: string[];
}

export interface TeamMember {
  id: number;
  userid: bigint;
  displayname: string;
  bio: string;
  avatarurl: string;
  sociallinks: Record<string, string>;
  skills: string[];
  joindate: string;
  position_name: string;
  department_name: string;
  department_color: string;
  department_icon: string;
}

export interface Partner {
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

export interface Plan {
  id: number;
  name: string;
  tierlevel: 'free' | 'basic' | 'premium' | 'enterprise';
  description: string;
  pricemonthly: number;
  priceyearly: number;
  color: string;
  icon: string;
  ispopular: boolean;
  features_list: string;
  feature_count: number;
}

export interface Command {
  name: string;
  description: string;
  category: string;
  type: 'slash' | 'prefix';
  enabled: boolean;
  premium: boolean;
  guildPremium: boolean;
  ownerOnly: boolean;
  cooldown: number | null;
  permissions: string[];
  aliases?: string[];
  usage?: string;
  options?: CommandOption[];
}

export interface CommandOption {
  name: string;
  description: string;
  type: number;
  required: boolean;
  choices?: Array<{ name: string; value: string }>;
  autocomplete: boolean;
}

export interface BotStats {
  guilds: number;
  users: number;
  commands: number;
  uptime: number;
  shards: number;
  ping: number;
  online: boolean;
}