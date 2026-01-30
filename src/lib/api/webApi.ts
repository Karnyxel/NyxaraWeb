// src/lib/api/webApi.ts
export async function fetchNavigation() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/navigation`, {
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching navigation:', error);
    // Menú por defecto
    return [
      { id: 1, title: "Inicio", url: "/", displayorder: 1 },
      { id: 2, title: "Comandos", url: "/commands", displayorder: 2 },
      { id: 3, title: "Estadísticas", url: "/stats", displayorder: 3 },
      { id: 4, title: "Planes", url: "/plans", displayorder: 4 },
      { id: 5, title: "Equipo", url: "/team", displayorder: 5 },
      { id: 6, title: "Partners", url: "/partners", displayorder: 6 },
      { id: 7, title: "Documentación", url: "/docs", displayorder: 7 },
      { id: 8, title: "FAQ", url: "/faq", displayorder: 8 },
    ];
  }
}

export async function fetchBotStats() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/stats`, {
      next: { revalidate: 30 }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching bot stats:', error);
    return null;
  }
}

export async function fetchPlans() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/plans`, {
      next: { revalidate: 300 }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching plans:', error);
    return null;
  }
}

export async function fetchTeam() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/team`, {
      next: { revalidate: 300 }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching team:', error);
    return null;
  }
}

export async function fetchPartners() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/partners`, {
      next: { revalidate: 300 }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching partners:', error);
    return null;
  }
}