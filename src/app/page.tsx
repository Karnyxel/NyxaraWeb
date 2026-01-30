// src/app/page.tsx - VERSIÓN MEJORADA CON DATOS REALES
import { Suspense } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import StatsSection from '@/components/sections/StatsSection';
import PlansSection from '@/components/sections/PlansSection';
import TeamPreviewSection from '@/components/sections/TeamPreviewSection';
import PartnersSection from '@/components/sections/PartnersSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import BlogPreviewSection from '@/components/sections/BlogPreviewSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nyxara Bot - El Bot de Discord Más Completo',
  description: 'Bot de Discord con moderación IA, música premium, niveles, economía y más de 112 comandos. Añade Nyxara a tu servidor hoy.',
  keywords: ['discord bot', 'nyxara', 'moderación IA', 'música', 'niveles', 'economía', 'premium'],
  openGraph: {
    title: 'Nyxara Bot - Discord Bot Premium',
    description: 'El bot de Discord más completo con inteligencia artificial y más de 112 comandos',
    images: ['/og-image.png'],
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-nyxara-darker via-nyxara-dark to-black">
      <Navbar />
      
      {/* Hero con efectos mejorados */}
      <div className="relative overflow-hidden">
        {/* Efectos de partículas */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[1px] h-[1px] bg-nyxara-primary/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-nyxara-primary/5 via-transparent to-nyxara-secondary/5" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-nyxara-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-nyxara-secondary/10 rounded-full blur-3xl animate-pulse" />
        
        <HeroSection />
      </div>
      
      {/* Contenido principal con animaciones mejoradas */}
      <main className="relative z-10">
        <div className="space-y-32">
          <FeaturesSection />
          
          <Suspense fallback={<StatsSectionSkeleton />}>
            <StatsSection />
          </Suspense>
          
          <Suspense fallback={<TestimonialsSkeleton />}>
            <TestimonialsSection />
          </Suspense>
          
          <Suspense fallback={<PlansSkeleton />}>
            <PlansSection />
          </Suspense>
          
          {/* Vista previa del equipo en home */}
          <Suspense fallback={<TeamPreviewSkeleton />}>
            <TeamPreviewSection />
          </Suspense>
          
          <Suspense fallback={<PartnersSkeleton />}>
            <PartnersSection />
          </Suspense>
          
          {/* Vista previa del blog en home */}
          <Suspense fallback={<BlogPreviewSkeleton />}>
            <BlogPreviewSection />
          </Suspense>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

// Skeletons mejorados
function StatsSectionSkeleton() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="h-12 w-48 bg-gray-800 rounded-lg mx-auto mb-12 animate-pulse"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSkeleton() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="h-12 w-64 bg-gray-800 rounded-lg mx-auto mb-12 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-64 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlansSkeleton() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="h-12 w-56 bg-gray-800 rounded-lg mx-auto mb-12 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-96 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamPreviewSkeleton() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="h-12 w-48 bg-gray-800 rounded-lg mx-auto mb-12 animate-pulse"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-64 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnersSkeleton() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="h-12 w-56 bg-gray-800 rounded-lg mx-auto mb-12 animate-pulse"></div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-24 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogPreviewSkeleton() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="h-12 w-48 bg-gray-800 rounded-lg mx-auto mb-12 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-80 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </div>
    </section>
  );
}