// src/lib/api/dataFetchers.ts - VERSIÓN CORREGIDA
import { botAPI } from './bot-client';

// Función para crear URLs absolutas en el servidor
function getApiUrl(path: string): string {
  if (typeof window !== 'undefined') {
    // En el cliente
    return path;
  }
  // En el servidor - usa la variable de entorno o el host por defecto
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return `${baseUrl}${path}`;
}

// Fetcher para estadísticas
export async function fetchStatsData() {
  try {
    const response = await fetch(getApiUrl('/api/stats'), {
      next: { revalidate: 30 } // Revalidar cada 30 segundos
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch stats');
    }
    
    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.warn('Using simulated stats data:', error);
    // Datos simulados si falla la API
    return {
      bot: {
        online: true,
        ping: 45,
        guilds: 620,
        users: 124600,
        commands: 250000,
        uptime: '2d 5h'
      },
      sharding: {
        summary: {
          totalShards: 5,
          onlineShards: 4,
          totalGuilds: 620,
          totalUsers: 124600
        }
      }
    };
  }
}

// Fetcher para partners
export async function fetchPartnersData() {
  try {
    const response = await fetch(getApiUrl('/api/partners'), {
      next: { revalidate: 3600 } // Revalidar cada hora
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch partners');
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.warn('Using simulated partners data:', error);
    return [
      {
        id: 1,
        name: "Discord Bot List",
        description: "Top Discord bots directory",
        logo: "https://discordbotlist.com/favicon.png",
        website: "https://discordbotlist.com",
        tier: "gold"
      },
      {
        id: 2,
        name: "Top.gg",
        description: "Largest Discord Bot List",
        logo: "https://top.gg/images/dblnew.png",
        website: "https://top.gg/bot/nyxara",
        tier: "gold"
      },
      {
        id: 3,
        name: "Discord Labs",
        description: "Verified Discord Bots",
        logo: "https://discordlabs.org/favicon.png",
        website: "https://discordlabs.org/bot/nyxara",
        tier: "silver"
      },
      {
        id: 4,
        name: "Disforge",
        description: "Discord Bot Community",
        logo: "https://disforge.com/favicon.ico",
        website: "https://disforge.com/bot/nyxara",
        tier: "silver"
      },
      {
        id: 5,
        name: "Discord Services",
        description: "Bot Development Services",
        logo: "https://cdn.discordapp.com/icons/1118533524714651719/a_c4564bb22d6ba87f1fb6a52c5bd3a785.png",
        website: "https://discord.gg/services",
        tier: "bronze"
      }
    ];
  }
}

// Fetcher para planes
export async function fetchPlansData() {
  try {
    const response = await fetch(getApiUrl('/api/plans'), {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch plans');
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.warn('Using simulated plans data:', error);
    return [
      {
        id: 1,
        name: "Gratuito",
        tierlevel: "free",
        description: "Perfecto para comenzar",
        pricemonthly: 0,
        priceyearly: 0,
        color: "#95a5a6",
        ispopular: false,
        features: [
          "100+ comandos básicos",
          "Música básica",
          "Moderación esencial",
          "Sistema de niveles",
          "Soporte comunitario"
        ]
      },
      {
        id: 2,
        name: "Premium",
        tierlevel: "premium",
        description: "Para servidores serios",
        pricemonthly: 9.99,
        priceyearly: 99.90,
        color: "#9b59b6",
        ispopular: true,
        features: [
          "Todos los comandos gratuitos",
          "Música premium (alta calidad)",
          "Moderación avanzada",
          "Economía personalizada",
          "Dashboard web",
          "Soporte prioritario",
          "Comandos personalizados",
          "Analíticas avanzadas"
        ]
      },
      {
        id: 3,
        name: "Enterprise",
        tierlevel: "enterprise",
        description: "Para grandes comunidades",
        pricemonthly: 24.99,
        priceyearly: 249.90,
        color: "#e74c3c",
        ispopular: false,
        features: [
          "Todos los beneficios premium",
          "Sharding personalizado",
          "API dedicada",
          "Soporte 24/7",
          "Bot personalizado",
          "Integraciones específicas",
          "Panel de administración",
          "Consultoría personal"
        ]
      }
    ];
  }
}

// Fetcher para equipo
export async function fetchTeamData() {
  try {
    const response = await fetch(getApiUrl('/api/team'), {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch team');
    }
    
    const data = await response.json();
    return data.data || { teamMembers: [], departments: [] };
  } catch (error) {
    console.warn('Using simulated team data:', error);
    return {
      teamMembers: [
        {
          id: 1,
          userid: "123456789012345678",
          displayname: "Alex",
          bio: "Fundador y desarrollador principal de Nyxara. Apasionado por crear herramientas que mejoren comunidades.",
          avatarurl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
          positionid: 1,
          skills: ["JavaScript", "TypeScript", "Node.js", "React", "Databases"],
          sociallinks: {
            github: "https://github.com/alexdev",
            twitter: "https://twitter.com/alexdev",
            discord: "Alex#1234"
          },
          isactive: 1,
          joindate: "2023-01-15"
        },
        {
          id: 2,
          userid: "234567890123456789",
          displayname: "Maria",
          bio: "Diseñadora UI/UX y community manager. Se asegura de que Nyxara sea hermoso y fácil de usar.",
          avatarurl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
          positionid: 2,
          skills: ["UI/UX Design", "Illustrator", "Figma", "Community Management"],
          sociallinks: {
            behance: "https://behance.net/maria",
            twitter: "https://twitter.com/mariadesign",
            discord: "Maria#5678"
          },
          isactive: 1,
          joindate: "2023-03-20"
        },
        {
          id: 3,
          userid: "345678901234567890",
          displayname: "Carlos",
          bio: "Desarrollador backend y especialista en infraestructura. Mantiene Nyxara rápido y estable.",
          avatarurl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
          positionid: 3,
          skills: ["Python", "Docker", "AWS", "DevOps", "MySQL"],
          sociallinks: {
            github: "https://github.com/carlosdev",
            linkedin: "https://linkedin.com/in/carlos",
            discord: "Carlos#9012"
          },
          isactive: 1,
          joindate: "2023-05-10"
        },
        {
          id: 4,
          userid: "456789012345678901",
          displayname: "Sofia",
          bio: "Especialista en soporte y documentación. Ayuda a los usuarios a sacar el máximo provecho de Nyxara.",
          avatarurl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
          positionid: 4,
          skills: ["Technical Writing", "Customer Support", "Documentation", "Tutorials"],
          sociallinks: {
            discord: "Sofia#3456",
            twitter: "https://twitter.com/sofiasupport"
          },
          isactive: 1,
          joindate: "2023-07-05"
        }
      ],
      departments: [
        {
          id: 1,
          name: "Desarrollo",
          description: "Equipo de desarrollo y mantenimiento del bot",
          color: "#3498db",
          displayorder: 1
        },
        {
          id: 2,
          name: "Diseño",
          description: "Equipo de diseño y experiencia de usuario",
          color: "#9b59b6",
          displayorder: 2
        },
        {
          id: 3,
          name: "Soporte",
          description: "Equipo de soporte y comunidad",
          color: "#2ecc71",
          displayorder: 3
        }
      ]
    };
  }
}

// Fetcher para testimonios
export async function fetchTestimonialsData() {
  try {
    const response = await fetch(getApiUrl('/api/testimonials'));
    
    if (!response.ok) {
      throw new Error('Failed to fetch testimonials');
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.warn('Using simulated testimonials data:', error);
    return [
      {
        id: 1,
        author: "Gaming Central",
        content: "Nyxara transformó completamente nuestro servidor de gaming. La música nunca falla y la moderación es impecable.",
        rating: 5,
        authorrole: "Administrador",
        featured: true,
        createdat: "2024-01-15T10:30:00Z"
      },
      {
        id: 2,
        author: "Study Community",
        content: "Perfecto para comunidades educativas. Los comandos de utilidad y organización son excelentes.",
        rating: 5,
        authorrole: "Moderador",
        featured: true,
        createdat: "2024-01-20T14:45:00Z"
      },
      {
        id: 3,
        author: "Music Lovers",
        content: "El mejor sistema de música que hemos probado. Calidad de sonido excepcional y comandos fáciles de usar.",
        rating: 5,
        authorrole: "DJ",
        featured: true,
        createdat: "2024-02-01T09:15:00Z"
      },
      {
        id: 4,
        author: "Tech Hub",
        content: "La integración con otras herramientas y la API hacen de Nyxara una solución completa para servidores técnicos.",
        rating: 4,
        authorrole: "Desarrollador",
        featured: false,
        createdat: "2024-02-10T16:20:00Z"
      },
      {
        id: 5,
        author: "Community Manager",
        content: "El dashboard web es una maravilla. Gestionar múltiples servidores nunca fue tan fácil.",
        rating: 5,
        authorrole: "Community Manager",
        featured: false,
        createdat: "2024-02-15T11:10:00Z"
      }
    ];
  }
}

// Fetcher para datos del bot
export async function fetchBotData() {
  try {
    const stats = await fetchStatsData();
    const health = await botAPI.getHealth().catch(() => null);
    
    return {
      stats,
      health,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.warn('Error fetching bot data:', error);
    return {
      stats: null,
      health: null,
      timestamp: new Date().toISOString()
    };
  }
}
// Agregar estas funciones al archivo existente
export async function fetchTeamStats() {
  try {
    const response = await fetch('/api/team/stats');
    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error('Error fetching team stats:', error);
    return null;
  }
}

export async function fetchDepartments() {
  try {
    const response = await fetch('/api/team/departments');
    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error('Error fetching departments:', error);
    return null;
  }
}

export async function fetchFeaturedBlogPosts(limit = 3) {
  try {
    const response = await fetch(`/api/blog?limit=${limit}&featured=true`);
    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return null;
  }
}