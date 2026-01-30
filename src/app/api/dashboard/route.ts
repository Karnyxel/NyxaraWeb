import { NextResponse } from 'next/server';
import { db } from '@/lib/db/db';
import { getSession } from '@/lib/auth';

// Interfaz para los datos del usuario
interface DashboardUser {
  id: string | bigint;
  username?: string;
  avatar?: string;
  email?: string;
  websiteSettings: {
    language: string;
    theme: string;
    notifications: boolean;
  };
}

interface UserInfo {
  userId?: string | number;
  username?: string;
  avatar?: string;
  websitelanguage?: string;
  theme?: string;
  emailnotifications?: number | boolean;
  [key: string]: any;
}

interface UserStats {
  total_servers?: number;
  total_commands?: number;
  [key: string]: any;
}

export async function GET(request: Request) {
  try {
    const session = await getSession();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = BigInt(session.user.id);
    
    // Obtener información del usuario
    const userInfo: UserInfo = await db.queryOne(`
      SELECT 
        u.*,
        wu.*
      FROM usuarios u
      LEFT JOIN webusers wu ON u.userId = wu.userid
      WHERE u.userId = ?
    `, [userId]);

    // Obtener servidores del usuario
    const userGuilds = await db.query(`
      SELECT 
        s.*
      FROM servidores s
      WHERE s.ownerId = ?
      ORDER BY s.createdAt DESC
      LIMIT 10
    `, [userId]);

    // Obtener estadísticas básicas
    const userStats: UserStats = await db.queryOne(`
      SELECT 
        COUNT(DISTINCT s.guildId) as total_servers,
        (SELECT COUNT(*) FROM commandlogs WHERE userId = ?) as total_commands
      FROM servidores s
      WHERE s.ownerId = ?
    `, [userId, userId]);

    // Preparar datos del usuario
    const userData: DashboardUser = {
      id: userInfo?.userId || session.user.id,
      username: userInfo?.username || session.user.name || 'Usuario',
      avatar: userInfo?.avatar || session.user.image || null,
      email: session.user.email || '',
      websiteSettings: {
        language: typeof userInfo?.websitelanguage === 'string' ? userInfo.websitelanguage : 'es',
        theme: typeof userInfo?.theme === 'string' ? userInfo.theme : 'auto',
        notifications: userInfo?.emailnotifications === 1 || userInfo?.emailnotifications === true
      }
    };

    return NextResponse.json({
      success: true,
      data: {
        user: userData,
        guilds: Array.isArray(userGuilds) ? userGuilds : [],
        stats: userStats || { total_servers: 0, total_commands: 0 },
        notifications: [],
        quickStats: {
          totalGuilds: userStats?.total_servers || 0,
          totalCommands: userStats?.total_commands || 0
        }
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error fetching dashboard data',
        code: 'DASHBOARD_FETCH_ERROR'
      },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';