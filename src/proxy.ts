// src/proxy.ts - ACTUALIZADO PARA NEXTAUTH v5
import { NextRequest, NextResponse } from 'next/server'

export async function proxy(request: NextRequest) {
  // En NextAuth v5, podemos verificar la cookie de sesión
  const sessionToken = request.cookies.get('next-auth.session-token')?.value ||
                      request.cookies.get('__Secure-next-auth.session-token')?.value;
  
  const { pathname } = request.nextUrl

  // Rutas públicas que no requieren autenticación
  const publicPaths = [
    '/',
    '/auth/login',
    '/auth/error',
    '/commands',
    '/team',
    '/plans',
    '/stats',
    '/docs',
    '/dcma',
    '/cookies',
    '/faq',
    '/api/auth',
  ]
  
  const isPublicPath = publicPaths.some(path => 
    pathname === path || pathname.startsWith(`${path}/`)
  )

  // Si es ruta pública, permitir acceso
  if (isPublicPath) {
    return NextResponse.next()
  }

  // Si no hay token de sesión y no es ruta pública, redirigir a login
  if (!sessionToken) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/panel/:path*',
  ],
}