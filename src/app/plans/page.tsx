import { Suspense } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import PlansSection from '@/components/sections/PlansSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Planes | Nyxara Bot',
  description: 'Elige el plan perfecto para tu servidor de Discord con Nyxara Bot.',
};

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-nyxara-dark to-black">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <Suspense fallback={<div className="text-center py-20">Cargando planes...</div>}>
          <PlansSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}