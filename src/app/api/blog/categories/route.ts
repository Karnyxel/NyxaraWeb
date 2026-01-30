// src/app/api/blog/categories/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db/db';

export async function GET() {
  try {
    const categories = await db.query(`
      SELECT 
        bc.*,
        COUNT(bp.id) as postcount
      FROM webblogcategories bc
      LEFT JOIN webblogposts bp ON bc.id = bp.categoryid 
        AND bp.status = 'published'
      WHERE bc.isactive = 1
      GROUP BY bc.id
      ORDER BY bc.name ASC
    `);

    return NextResponse.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error fetching blog categories'
      },
      { status: 500 }
    );
  }
}