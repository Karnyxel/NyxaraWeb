// src/app/api/find-guild/route.ts
import { NextResponse } from 'next/server';
import { botAPI } from '@/lib/api/bot-client'; // <-- CORREGIDO

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const guildId = searchParams.get('guildId');
    const query = searchParams.get('query'); // Para compatibilidad

    const searchTerm = guildId || query;

    if (!searchTerm) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Se requiere el parámetro guildId o query',
          code: 'GUILD_ID_REQUIRED'
        },
        { status: 400 }
      );
    }

    // Validar formato de ID de Discord si es un ID numérico
    if (/^\d{17,20}$/.test(searchTerm)) {
      console.log('[FIND GUILD API] Buscando guild ID:', searchTerm);
      
      // Usar el nuevo método searchGuild del bot-client
      const result = await botAPI.searchGuild(searchTerm);
      
      return NextResponse.json({
        success: true,
        timestamp: new Date().toISOString(),
        data: result
      });
    } else {
      // Si no es un ID numérico, podría ser búsqueda por nombre (si está implementado)
      console.log('[FIND GUILD API] Búsqueda por nombre:', searchTerm);
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Búsqueda por nombre no implementada. Usa un ID numérico de guild (17-20 dígitos).',
          code: 'NAME_SEARCH_NOT_SUPPORTED'
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('[FIND GUILD API] Error crítico:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error interno del servidor',
        message: error.message,
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}