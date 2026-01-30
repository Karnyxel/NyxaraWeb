import { Suspense } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import CommandsSection from '@/components/sections/CommandsSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Comandos | Nyxara Bot',
  description: 'Explora todos los comandos disponibles de Nyxara Bot, organizados por categorías y tipos.',
};

export default function CommandsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-nyxara-dark to-black">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <Suspense fallback={<div className="text-center py-20">Cargando comandos...</div>}>
          <CommandsSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}