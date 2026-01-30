import { NextResponse } from 'next/server';
import { db } from '@/lib/db/db';
import { getSession } from '@/lib/auth';

// Definir interfaces para los tipos de datos
interface SystemStats {
  total_users?: number;
  total_servers?: number;
  team_members?: number;
  partners_count?: number;
  blog_posts?: number;
  open_tickets?: number;
  [key: string]: any;
}

interface TotalUsersResult {
  count?: number;
  [key: string]: any;
}

interface BlogStatsResult {
  total_posts?: number;
  published_posts?: number;
  draft_posts?: number;
  total_views?: number;
  avg_views?: number;
  [key: string]: any;
}

interface PermissionsResult {
  permissions?: string;
  [key: string]: any;
}

// Middleware de verificación de permisos
async function checkAdminPermissions(userId: string): Promise<boolean> {
  try {
    const permissions: PermissionsResult = await db.getUserPermissions(BigInt(userId));
    
    if (!permissions) return false;
    
    // Verificar permisos específicos
    const perms = JSON.parse(permissions.permissions || '[]');
    return perms.includes('admin.access') || perms.includes('panel.access');
  } catch (error) {
    console.error('Error checking admin permissions:', error);
    return false;
  }
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

    // Verificar permisos de admin
    const isAdmin = await checkAdminPermissions(session.user.id);
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section') || 'overview';

    let data: any = {};
    
    switch (section) {
      case 'overview':
        // Estadísticas generales del sistema
        const [systemStats, recentLogs, topCommands] = await Promise.all([
          db.queryOne(`
            SELECT 
              (SELECT COUNT(*) FROM usuarios) as total_users,
              (SELECT COUNT(*) FROM servidores) as total_servers,
              (SELECT COUNT(*) FROM webteammembers WHERE isactive = 1) as team_members,
              (SELECT COUNT(*) FROM webpartners WHERE isactive = 1) as partners_count,
              (SELECT COUNT(*) FROM webblogposts WHERE status = 'published') as blog_posts,
              (SELECT COUNT(*) FROM websupporttickets WHERE status = 'open') as open_tickets
          `),
          db.query(`
            SELECT * FROM webauditlogs 
            ORDER BY createdat DESC 
            LIMIT 20
          `),
          db.query(`
            SELECT commandName, COUNT(*) as count 
            FROM commandlogs 
            WHERE createdAt >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
            GROUP BY commandName 
            ORDER BY count DESC 
            LIMIT 10
          `)
        ]);
        
        // Convertir systemStats al tipo correcto
        const systemStatsData: SystemStats = systemStats as SystemStats;
        
        data = { 
          systemStats: systemStatsData, 
          recentLogs, 
          topCommands 
        };
        break;

      case 'users':
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');
        const offset = (page - 1) * limit;
        
        const users = await db.query(`
          SELECT 
            u.*,
            wu.*,
            (SELECT COUNT(*) FROM servidores WHERE ownerId = u.userId) as owned_servers,
            (SELECT COUNT(*) FROM commandlogs WHERE userId = u.userId) as command_count
          FROM usuarios u
          LEFT JOIN webusers wu ON u.userId = wu.userid
          ORDER BY u.createdAt DESC
          LIMIT ? OFFSET ?
        `, [limit, offset]);
        
        const totalUsers: TotalUsersResult = await db.queryOne(`SELECT COUNT(*) as count FROM usuarios`);
        
        data = { 
          users, 
          pagination: { 
            page, 
            limit, 
            total: totalUsers?.count || 0 
          } 
        };
        break;

      case 'team':
        const teamData = await db.query(`
          SELECT 
            tm.*,
            tp.name as position_name,
            tp.permissions,
            td.name as department_name,
            td.color as department_color
          FROM webteammembers tm
          JOIN webteampositions tp ON tm.positionid = tp.id
          JOIN webteamdepartments td ON tp.departmentid = td.id
          ORDER BY td.displayorder, tp.displayorder, tm.displayorder
        `);
        
        const departments = await db.getTeamDepartments();
        const positions = await db.query(`SELECT * FROM webteampositions`);
        
        data = { team: teamData, departments, positions };
        break;

      case 'settings':
        const settings = await db.getAllSettings();
        const navigation = await db.getNavigationMenu();
        
        data = { settings, navigation };
        break;

      case 'blog':
        const blogPosts = await db.query(`
          SELECT 
            bp.*,
            bc.name as category_name,
            tm.displayname as author_name
          FROM webblogposts bp
          LEFT JOIN webblogcategories bc ON bp.categoryid = bc.id
          LEFT JOIN webteammembers tm ON bp.authorid = tm.id
          ORDER BY bp.createdat DESC
          LIMIT 50
        `);
        
        const blogStats: BlogStatsResult = await db.queryOne(`
          SELECT 
            COUNT(*) as total_posts,
            COUNT(CASE WHEN status = 'published' THEN 1 END) as published_posts,
            COUNT(CASE WHEN status = 'draft' THEN 1 END) as draft_posts,
            SUM(viewcount) as total_views,
            AVG(viewcount) as avg_views
          FROM webblogposts
        `);
        
        data = { 
          posts: blogPosts, 
          stats: blogStats 
        };
        break;

      case 'analytics':
        const analytics = await db.query(`
          SELECT 
            DATE(date) as date,
            SUM(pageviews) as pageviews,
            SUM(uniquevisitors) as unique_visitors,
            AVG(bouncerate) as bounce_rate
          FROM webanalytics
          WHERE date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
          GROUP BY DATE(date)
          ORDER BY date DESC
        `);
        
        const trafficSources = await db.query(`
          SELECT 
            source,
            COUNT(*) as visits,
            AVG(bouncerate) as bounce_rate
          FROM webanalytics
          WHERE date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
          GROUP BY source
          ORDER BY visits DESC
        `);
        
        data = { analytics, trafficSources };
        break;
      
      default:
        data = { message: 'Invalid section' };
    }

    return NextResponse.json({
      success: true,
      section,
      data
    });
  } catch (error) {
    console.error('Error in panel API:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        code: 'PANEL_API_ERROR'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verificar permisos de admin
    const isAdmin = await checkAdminPermissions(session.user.id);
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { action, data } = body;

    let result;
    
    switch (action) {
      case 'update_setting':
        result = await db.query(
          `INSERT INTO websitesettings (key, value, type, category) 
           VALUES (?, ?, ?, ?) 
           ON DUPLICATE KEY UPDATE value = ?, updatedat = NOW()`,
          [data.key, data.value, data.type || 'string', data.category || 'general', data.value]
        );
        break;

      case 'add_team_member':
        result = await db.query(
          `INSERT INTO webteammembers (userid, positionid, displayname, bio, avatarurl, sociallinks, skills, joindate) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            BigInt(data.userid),
            data.positionid,
            data.displayname,
            data.bio,
            data.avatarurl,
            JSON.stringify(data.sociallinks || {}),
            JSON.stringify(data.skills || []),
            data.joindate || new Date().toISOString().split('T')[0]
          ]
        );
        break;

      case 'update_navigation':
        result = await db.query(
          `UPDATE webnavigationmenu SET 
            title = ?, url = ?, icon = ?, parentid = ?, displayorder = ?, 
            isexternal = ?, target = ?, updatedat = NOW() 
           WHERE id = ?`,
          [
            data.title,
            data.url,
            data.icon,
            data.parentid || null,
            data.displayorder || 0,
            data.isexternal || false,
            data.target || '_self',
            data.id
          ]
        );
        break;

      case 'create_blog_post':
        result = await db.query(
          `INSERT INTO webblogposts 
           (authorid, categoryid, title, slug, excerpt, content, featuredimage, status, publishedat) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            data.authorid,
            data.categoryid,
            data.title,
            data.slug,
            data.excerpt,
            data.content,
            data.featuredimage,
            data.status || 'draft',
            data.status === 'published' ? new Date() : null
          ]
        );
        break;

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }

    // Registrar acción en audit log
    await db.logAudit(
      BigInt(session.user.id),
      `panel.${action}`,
      { data, result }
    );

    return NextResponse.json({
      success: true,
      message: 'Action completed successfully',
      result
    });
  } catch (error) {
    console.error('Error in panel POST:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        code: 'PANEL_POST_ERROR'
      },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';