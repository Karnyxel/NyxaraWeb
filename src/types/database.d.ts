// Database row types based on HizukiDB schema
export interface WebFAQ {
  id: number
  question: string
  answer: string
  category: string | null
  displayorder: number
  views: number
  isactive: boolean | number
  createdat: string
  updatedat: string
}

export interface WebTeamMember {
  id: number
  userid: bigint
  positionid: number
  displayname: string
  bio: string | null
  avatarurl: string | null
  sociallinks: Record<string, string> | null
  skills: string[] | null
  joindate: string | null
  isactive: boolean | number
  displayorder: number
  createdat: string
  updatedat: string
}

export interface WebPartner {
  id: number
  name: string
  logourl: string
  description: string | null
  website: string | null
  tier: 'gold' | 'silver' | 'platinum' | 'diamond'
  category: string[]
  isactive: boolean | number
  displayorder: number
  partnersince: string | null
  featured: boolean | number
  createdat: string
  updatedat: string
}

export interface WebPlanTier {
  id: number
  name: string
  tierlevel: 'free' | 'basic' | 'premium' | 'enterprise'
  description: string | null
  pricemonthly: number | null
  pricequarterly: number | null
  priceyearly: number | null
  pricelifetime: number | null
  currency: string
  color: string
  icon: string | null
  ispopular: boolean | number
  isactive: boolean | number
  displayorder: number
  createdat: string
  updatedat: string
}

export interface WebSiteSetting {
  id: number
  key: string
  value: string | null
  type: 'string' | 'number' | 'boolean' | 'json' | 'array'
  category: string | null
  description: string | null
  createdat: string
  updatedat: string
}

// Union type for all database entities
export type DatabaseEntity = 
  | WebFAQ 
  | WebTeamMember 
  | WebPartner 
  | WebPlanTier 
  | WebSiteSetting