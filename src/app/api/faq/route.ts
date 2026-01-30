// src/app/api/faq/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = searchParams.get('limit');
    const onlyActive = searchParams.get('active') !== 'false';

    // Usar la nueva tabla webfaqs
    const faqs = await db.getFAQs(category || undefined);

    // Filtrar por término de búsqueda si existe
    let filteredFaqs = faqs;
    if (search) {
      filteredFaqs = faqs.filter(faq => 
        faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.answer.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Limitar resultados si se especifica
    if (limit) {
      filteredFaqs = filteredFaqs.slice(0, parseInt(limit));
    }

    return NextResponse.json({
      success: true,
      data: filteredFaqs,
      meta: {
        total: filteredFaqs.length,
        category,
        search
      }
    });
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error fetching FAQs',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}