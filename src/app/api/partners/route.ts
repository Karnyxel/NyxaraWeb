// app/api/partners/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db/db';

// Función para parsear categorías de JSON string
const parseCategories = (categories: any): string[] => {
  if (!categories) return [];
  
  if (typeof categories === 'string') {
    try {
      // Limpiar el string JSON
      const cleaned = categories.replace(/\\"/g, '"').replace(/^"|"$/g, '');
      const parsed = JSON.parse(cleaned);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Error parsing categories:', categories, error);
      return [];
    }
  }
  
  if (Array.isArray(categories)) {
    return categories;
  }
  
  return [];
};

// Función para procesar URLs de logo - VERSIÓN CORREGIDA
const processLogoUrl = (name: string, logourl: string | null): string => {
  console.log('[PROCESS LOGO] Processing:', name, 'logourl:', logourl);
  
  if (logourl && typeof logourl === 'string') {
    // Limpiar el string - eliminar comillas y espacios innecesarios
    let cleanUrl = logourl.replace(/^"|"$/g, '').replace(/\\/g, '').trim();
    
    console.log('[PROCESS LOGO] Cleaned URL:', cleanUrl);
    
    // Si es un nombre de archivo (termina con extensión de imagen)
    if (cleanUrl.match(/\.(png|jpg|jpeg|gif|svg|webp)$/i)) {
      // Verificar si el archivo existe en public/images/partners/
      const publicPath = `/images/partners/${cleanUrl}`;
      console.log('[PROCESS LOGO] Trying public path:', publicPath);
      return publicPath;
    }
  }
  
  // Fallback a DiceBear si no hay logo válido
  console.log('[PROCESS LOGO] Using DiceBear fallback for:', name);
  const seed = encodeURIComponent(name);
  const colors = ['ff2929', '3b82f6', '8b5cf6', '10b981', 'f59e0b'];
  const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&backgroundColor=${colors[colorIndex]}&textColor=ffffff`;
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tier = searchParams.get('tier');
    
    console.log('[PARTNERS API] Fetching partners, tier:', tier);
    
    const partners = await db.getPartners(tier || undefined);
    
    console.log('[PARTNERS API] Found raw partners:', partners?.length || 0);
    
    // Procesar los partners
    const processedPartners = Array.isArray(partners) ? partners.map(partner => ({
      ...partner,
      category: parseCategories(partner.category),
      logourl: processLogoUrl(partner.name, partner.logourl),
      tier: partner.tier || 'gold',
      featured: partner.featured === 1 || partner.featured === true
    })) : [];
    
    console.log('[PARTNERS API] Processed partners:', processedPartners.length);
    
    return NextResponse.json({
      success: true,
      data: processedPartners,
      count: processedPartners.length,
      timestamp: new Date().toISOString()
    }, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
      }
    });
  } catch (error) {
    console.error('[PARTNERS API] Error:', error);
    
    // Datos de respaldo usando DiceBear
    const fallbackPartners = [
      {
        id: 1,
        name: "AplaxyHost",
        logourl: "https://api.dicebear.com/7.x/initials/svg?seed=AplaxyHost&backgroundColor=ff2929&textColor=ffffff",
        description: "Proveedor líder en soluciones de infraestructura tecnológica.",
        website: "https://techcorp.com",
        tier: "diamond",
        category: ["cloud", "infrastructure", "automation"],
        partnersince: "2022-05-15",
        featured: true
      },
      {
        id: 2,
        name: "UHosting Cloud",
        logourl: "https://api.dicebear.com/7.x/initials/svg?seed=UHosting%20Cloud&backgroundColor=3b82f6&textColor=ffffff",
        description: "Consultora especializada en desarrollo web y optimización de procesos.",
        website: "https://devsolutions.io",
        tier: "diamond",
        category: ["web", "consulting", "devops"],
        partnersince: "2023-03-10",
        featured: false
      }
    ];
    
    return NextResponse.json({
      success: false,
      error: 'Error fetching partners, using fallback data',
      data: fallbackPartners,
      fallback: true,
      timestamp: new Date().toISOString()
    }, {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 60;