// src/app/api/plans/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db/db';

export async function GET() {
  try {
    const plans = await db.getPlans();
    
    return NextResponse.json({
      success: true,
      data: plans
    });
  } catch (error: any) {
    console.error('Error en /api/plans:', error.message);
    
    return NextResponse.json({
      success: true,
      data: [
        {
          id: 1,
          name: "Gratuito",
          tierlevel: "free",
          description: "Plan básico para comenzar",
          pricemonthly: 0,
          priceyearly: 0,
          color: "#95a5a6",
          ispopular: false,
          features: []
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
          features: []
        }
      ]
    });
  }
}