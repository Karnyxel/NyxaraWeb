export interface Partner {
  id: number;
  name: string;
  logoUrl: string;
  description: string;
  website: string;
  tier: 'platinum' | 'gold' | 'silver';
  category: string[];
}