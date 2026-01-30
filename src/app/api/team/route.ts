import { NextResponse } from 'next/server';
import { db } from '@/lib/db/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const departmentId = searchParams.get('departmentId');
    
    const teamMembers = await db.getTeamMembers(
      departmentId ? parseInt(departmentId) : undefined
    );
    
    const departments = await db.getTeamDepartments();
    
    return NextResponse.json({
      success: true,
      data: {
        teamMembers,
        departments
      }
    });
  } catch (error) {
    console.error('Error fetching team data:', error);
    return NextResponse.json(
      { success: false, error: 'Error fetching team data' },
      { status: 500 }
    );
  }
}