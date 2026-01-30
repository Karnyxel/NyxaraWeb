// src/app/api/navigation/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db/db';

export async function GET() {
  try {
    const navigation = await db.getNavigationMenu();
    
    return NextResponse.json({
      success: true,
      data: navigation
    });
  } catch (error: any) {
    console.error('Error en /api/navigation:', error.message);
    
    // Datos por defecto
    return NextResponse.json({
      success: true,
      data: [
        { id: 1, title: "Inicio", url: "/", displayorder: 1 },
        { id: 2, title: "Comandos", url: "/commands", displayorder: 2 },
        { id: 3, title: "Estadísticas", url: "/stats", displayorder: 3 },
        { id: 4, title: "Planes", url: "/plans", displayorder: 4 },
        { id: 5, title: "Equipo", url: "/team", displayorder: 5 },
        { id: 6, title: "Partners", url: "/partners", displayorder: 6 },
        { id: 7, title: "Documentación", url: "/docs", displayorder: 7 },
        { id: 8, title: "FAQ", url: "/faq", displayorder: 8 },
      ]
    });
  }
}