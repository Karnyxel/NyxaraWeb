// src/app/api/blog/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db/db';


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const limit = searchParams.get('limit');
    const search = searchParams.get('search');

    let sql = `
      SELECT 
        bp.*,
        bc.name as category_name,
        bc.slug as category_slug,
        bc.color as category_color,
        tm.displayname as author_name,
        tm.avatarurl as author_avatar
      FROM webblogposts bp
      LEFT JOIN webblogcategories bc ON bp.categoryid = bc.id
      LEFT JOIN webteammembers tm ON bp.authorid = tm.id
      WHERE bp.status = 'published' 
        AND (bp.publishedat IS NULL OR bp.publishedat <= NOW())
    `;

    const params: any[] = [];

    if (categoryId) {
      sql += ` AND bp.categoryid = ?`;
      params.push(parseInt(categoryId));
    }

    if (search) {
      sql += ` AND (
        bp.title LIKE ? OR 
        bp.excerpt LIKE ? OR 
        bp.content LIKE ?
      )`;
      const searchParam = `%${search}%`;
      params.push(searchParam, searchParam, searchParam);
    }

    sql += ` ORDER BY bp.isfeatured DESC, bp.ispinned DESC, bp.publishedat DESC`;

    if (limit) {
      sql += ` LIMIT ?`;
      params.push(parseInt(limit));
    }

    // Para MySQL, hay que convertir los valores
    const processedParams = params.map(param => {
      if (typeof param === 'string' && param.includes('%')) {
        return param;
      }
      return param;
    });

    const posts = await db.query(sql, processedParams);

    return NextResponse.json({
      success: true,
      data: posts,
      meta: {
        total: Array.isArray(posts) ? posts.length : 0,
        categoryId,
        search
      }
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error fetching blog posts',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}