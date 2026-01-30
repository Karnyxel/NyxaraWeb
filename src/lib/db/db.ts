// src/lib/db/db.ts - VERSIÓN COMPLETA Y CORREGIDA
import mysql, { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';

// Tipos para nuestros resultados
type QueryResult = RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader;

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

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST || '103.195.101.224',
  port: parseInt(process.env.DATABASE_PORT || '3306'),
  database: process.env.DATABASE_NAME || 'nyxara',
  user: process.env.DATABASE_USER || 'nyxara_admin',
  password: process.env.DATABASE_PASSWORD || 'Nyxara2024!',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
// Función helper para convertir resultados
function parseQueryResult(result: any): any {
  if (Array.isArray(result)) {
    return result;
  }
  // Si es OkPacket o ResultSetHeader, devolver como objeto
  return result;
}
export const db = {
  // Métodos básicos

  // Métodos básicos
  query: async (sql: string, params?: any[]): Promise<any> => {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.execute(sql, params);
      return parseQueryResult(rows);
    } finally {
      connection.release();
    }
  },
  
  queryOne: async (sql: string, params?: any[]): Promise<any> => {
    const rows = await db.query(sql, params);
    return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
  },
  getNavigationMenu: async (): Promise<RowDataPacket[]> => {
    try {
      const rows = await db.query(`
        SELECT * FROM webnavigationmenu 
        WHERE isactive = 1 
        ORDER BY displayorder ASC
      `);
      return Array.isArray(rows) ? rows : [];
    } catch (error) {
      console.error('Error getting navigation menu:', error);
      return [];
    }
  },
  
  getTeamMembers: async (departmentId?: number) => {
    try {
      let sql = `
        SELECT 
          tm.*,
          tp.name as position_name,
          tp.permissions,
          td.name as department_name,
          td.color as department_color
        FROM webteammembers tm
        JOIN webteampositions tp ON tm.positionid = tp.id
        JOIN webteamdepartments td ON tp.departmentid = td.id
        WHERE tm.isactive = 1
      `;
      
      const params: any[] = [];
      
      if (departmentId) {
        sql += ` AND td.id = ?`;
        params.push(departmentId);
      }
      
      sql += ` ORDER BY td.displayorder, tp.displayorder, tm.displayorder`;
      
      const rows = await db.query(sql, params);
      return Array.isArray(rows) ? rows : [];
    } catch (error) {
      console.error('Error getting team members:', error);
      return [];
    }
  },
  
  getTeamDepartments: async () => {
    try {
      const rows = await db.query(`
        SELECT * FROM webteamdepartments 
        WHERE isactive = 1 
        ORDER BY displayorder ASC
      `);
      return Array.isArray(rows) ? rows : [];
    } catch (error) {
      console.error('Error getting team departments:', error);
      return [];
    }
  },
  
  getFAQs: async (category?: string) => {
    try {
      let sql = `SELECT * FROM webfaqs WHERE isactive = 1`;
      const params: any[] = [];
      
      if (category) {
        sql += ` AND category = ?`;
        params.push(category);
      }
      
      sql += ` ORDER BY displayorder ASC`;
      
      const rows = await db.query(sql, params);
      return Array.isArray(rows) ? rows : [];
    } catch (error) {
      console.error('Error getting FAQs:', error);
      return [];
    }
  },
  
  getPartners: async (tier?: string) => {
    try {
      let sql = `SELECT * FROM webpartners WHERE isactive = 1`;
      const params: any[] = [];
      
      if (tier) {
        sql += ` AND tier = ?`;
        params.push(tier);
      }
      
      sql += ` ORDER BY displayorder ASC`;
      
      const rows = await db.query(sql, params);
      return Array.isArray(rows) ? rows : [];
    } catch (error) {
      console.error('Error getting partners:', error);
      return [];
    }
  },
  
  getPlans: async () => {
    try {
      // Primero, intentemos descubrir el nombre correcto de la columna
      let sql = `
        SELECT 
          p.*,
          GROUP_CONCAT(pf.featurename) as features
        FROM webplantiers p
        LEFT JOIN webplanfeatures pf ON p.id = pf.planid
        WHERE p.isactive = 1
        GROUP BY p.id
        ORDER BY p.displayorder ASC
      `;
      
      const rows = await db.query(sql);
      
      // Si falla, intentar con feature_text
      if (!rows || (Array.isArray(rows) && rows.length === 0)) {
        sql = `
          SELECT 
            p.*,
            GROUP_CONCAT(pf.feature_text) as features
          FROM webplantiers p
          LEFT JOIN webplanfeatures pf ON p.id = pf.planid
          WHERE p.isactive = 1
          GROUP BY p.id
          ORDER BY p.displayorder ASC
        `;
        const rows2 = await db.query(sql);
        
        if (Array.isArray(rows2)) {
          return rows2.map((plan: any) => ({
            ...plan,
            features: plan.features ? plan.features.split(',') : []
          }));
        }
      }
      
      if (Array.isArray(rows)) {
        return rows.map((plan: any) => ({
          ...plan,
          features: plan.features ? plan.features.split(',') : []
        }));
      }
      
      return [];
    } catch (error) {
      console.error('Error getting plans:', error);
      // Datos de respaldo
      return [
        {
          id: 1,
          name: "Gratuito",
          tierlevel: "free",
          description: "Plan básico para comenzar",
          pricemonthly: 0,
          priceyearly: 0,
          color: "#95a5a6",
          ispopular: false,
          features: ["112 comandos", "Soporte básico", "Música básica"]
        },
        {
          id: 2,
          name: "Premium",
          tierlevel: "premium",
          description: "Funcionalidades avanzadas",
          pricemonthly: 9.99,
          priceyearly: 99.90,
          color: "#9b59b6",
          ispopular: true,
          features: ["Todo en Gratuito", "Música premium", "Anti-raid", "Soporte prioritario"]
        }
      ];
    }
  },
  
  getTestimonials: async (featuredOnly?: boolean) => {
    try {
      let sql = `SELECT * FROM webtestimonials WHERE isactive = 1`;
      const params: any[] = [];
      
      if (featuredOnly) {
        sql += ` AND isfeatured = 1`;
      }
      
      sql += ` ORDER BY createdat DESC`;
      
      const rows = await db.query(sql, params);
      return Array.isArray(rows) ? rows : [];
    } catch (error) {
      console.error('Error getting testimonials:', error);
      return [];
    }
  },
  
  getBotStats: async () => {
    try {
      const stats = await db.queryOne(`
        SELECT 
          (SELECT COUNT(*) FROM usuarios) as total_users,
          (SELECT COUNT(*) FROM servidores) as total_servers,
          (SELECT COUNT(*) FROM commandlogs) as total_commands,
          (SELECT COUNT(*) FROM guildsettings WHERE premium = 1) as premium_servers
      `);
      return stats;
    } catch (error) {
      console.error('Error getting bot stats:', error);
      return {
        total_users: 0,
        total_servers: 0,
        total_commands: 0,
        premium_servers: 0
      };
    }
  },
  
  // Métodos adicionales
  getAllSettings: async (): Promise<RowDataPacket[]> => {
    try {
      const rows = await db.query(`SELECT * FROM websitesettings`);
      return Array.isArray(rows) ? rows : [];
    } catch (error) {
      console.error('Error getting settings:', error);
      return [];
    }
  },
  
  updateSetting: async (key: string, value: string, type?: string, category?: string): Promise<boolean> => {
    try {
      await db.query(`
        INSERT INTO websitesettings (key, value, type, category, updatedat) 
        VALUES (?, ?, ?, ?, NOW()) 
        ON DUPLICATE KEY UPDATE 
          value = VALUES(value),
          type = VALUES(type),
          category = VALUES(category),
          updatedat = NOW()
      `, [key, value, type || 'string', category || 'general']);
      return true;
    } catch (error) {
      console.error('Error updating setting:', error);
      return false;
    }
  },
  
  logAudit: async (userId: bigint, action: string, details?: any): Promise<boolean> => {
    try {
      await db.query(`
        INSERT INTO webauditlogs (userid, action, details, createdat)
        VALUES (?, ?, ?, NOW())
      `, [userId, action, JSON.stringify(details || {})]);
      return true;
    } catch (error) {
      console.error('Error logging audit:', error);
      return false;
    }
  },
  
  getUserPermissions: async (userId: bigint): Promise<any> => {
    try {
      return await db.queryOne(`
        SELECT * FROM webuserpermissions 
        WHERE userid = ?
      `, [userId]);
    } catch (error) {
      console.error('Error getting user permissions:', error);
      return null;
    }
  },
  
  createOrUpdateWebUser: async (userId: bigint, data: any): Promise<boolean> => {
    try {
      await db.query(`
        INSERT INTO webusers (userid, websitelanguage, theme, emailnotifications, webnotification, timezone)
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          websitelanguage = VALUES(websitelanguage),
          theme = VALUES(theme),
          emailnotifications = VALUES(emailnotifications),
          webnotification = VALUES(webnotification),
          timezone = VALUES(timezone),
          updatedat = NOW()
      `, [
        userId,
        data.websitelanguage || 'es',
        data.theme || 'auto',
        data.emailnotifications !== false ? 1 : 0,
        data.webnotification !== false ? 1 : 0,
        data.timezone || 'America/Lima'
      ]);
      return true;
    } catch (error) {
      console.error('Error creating/updating web user:', error);
      return false;
    }
  },
  
  // Método de salud de la base de datos
  healthCheck: async (): Promise<{ healthy: boolean; message: string }> => {
    try {
      await db.query('SELECT 1');
      return { healthy: true, message: 'Database connection successful' };
    } catch (error: any) {
      return { healthy: false, message: `Database connection failed: ${error.message}` };
    }
  }
};