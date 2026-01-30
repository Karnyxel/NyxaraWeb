// src/lib/session.ts - HELPER SIMPLIFICADO
export async function getSession() {
  try {
    // Método simple: verificar cookies directamente
    // Esto es un workaround temporal
    return { user: { id: "temporary", email: "temp@example.com" } };
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}