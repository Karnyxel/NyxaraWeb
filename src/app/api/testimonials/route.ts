// src/app/api/testimonials/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featuredOnly = searchParams.get('featured') === 'true';

    const testimonials = await db.getTestimonials(featuredOnly);
    
    return NextResponse.json({
      success: true,
      data: testimonials
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { success: false, error: 'Error fetching testimonials' },
      { status: 500 }
    );
  }
}