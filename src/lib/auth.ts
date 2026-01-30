// src/lib/auth.ts - HELPER PARA NEXTAUTH v5
import { cookies } from 'next/headers';

export async function getSession() {
  try {
    // En NextAuth v5, podemos obtener la sesión de las cookies
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('next-auth.session-token')?.value ||
                        cookieStore.get('__Secure-next-auth.session-token')?.value;
    
    if (!sessionToken) {
      return null;
    }
    
    // También podemos hacer fetch al endpoint de sesión
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/auth/session`, {
      headers: {
        'Cookie': `next-auth.session-token=${sessionToken}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
    
    if (response.ok) {
      return await response.json();
    }
    
    return null;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

// Helper para obtener el userId desde la sesión
export async function getUserId(): Promise<string | null> {
  const session = await getSession();
  return session?.user?.id || null;
}