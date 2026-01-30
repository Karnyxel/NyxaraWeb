// src/app/team/page.tsx - VERSIÓN MEJORADA
import { Suspense } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import TeamSection from '@/components/sections/TeamSection';
import DepartmentsSection from '@/components/sections/DepartmentsSection';
import TeamStatsSection from '@/components/sections/TeamStatsSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Equipo | Nyxara Bot',
  description: 'Conoce al equipo detrás de Nyxara Bot, sus roles, departamentos y contribuciones al proyecto.',
  openGraph: {
    title: 'Equipo - Nyxara Bot',
    description: 'El equipo creativo que hace posible Nyxara Bot',
    images: ['/team-og.jpg'],
  },
};

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-nyxara-darker via-nyxara-dark to-black">
      <Navbar />
      
      {/* Hero Section específica para Team */}
      <div className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Nuestro Equipo
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Conoce a las personas apasionadas que trabajan incansablemente para hacer de Nyxara 
            el mejor bot de Discord. Desde desarrolladores hasta diseñadores, cada miembro 
            aporta su experiencia única.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full">
              <span className="text-purple-300">+12 miembros activos</span>
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full">
              <span className="text-blue-300">5 departamentos especializados</span>
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full">
              <span className="text-green-300">2 años de experiencia colectiva</span>
            </div>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<TeamLoading />}>
          <TeamStatsSection />
        </Suspense>
        
        <Suspense fallback={<DepartmentsLoading />}>
          <DepartmentsSection />
        </Suspense>
        
        <Suspense fallback={<TeamMembersLoading />}>
          <TeamSection />
        </Suspense>
        
        {/* Join Team CTA */}
        <div className="mt-20 mb-12 text-center">
          <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-2xl p-8 border border-purple-500/20">
            <h2 className="text-3xl font-bold mb-4">¿Quieres unirte al equipo?</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Siempre estamos buscando talento apasionado por los bots de Discord, desarrollo web
              y creación de comunidades.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all">
              Ver oportunidades
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

function TeamLoading() {
  return (
    <div className="text-center py-12">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      <p className="mt-4 text-gray-400">Cargando estadísticas del equipo...</p>
    </div>
  );
}

function DepartmentsLoading() {
  return (
    <div className="py-12">
      <div className="h-12 w-64 bg-gray-800 rounded-lg mx-auto mb-8 animate-pulse"></div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-900 rounded-xl animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}

function TeamMembersLoading() {
  return (
    <div className="py-12">
      <div className="h-12 w-56 bg-gray-800 rounded-lg mx-auto mb-8 animate-pulse"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-80 bg-gray-900 rounded-2xl animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}