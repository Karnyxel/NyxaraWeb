export interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  avatarUrl: string;
  socialLinks: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    discord?: string;
  };
  skills: string[];
}