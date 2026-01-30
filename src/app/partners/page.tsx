import { Suspense } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import PartnersSection from '@/components/sections/PartnersSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partners | Nyxara Bot',
  description: 'Partners oficiales y colaboradores de Nyxara Bot.',
};

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-nyxara-dark to-black">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <Suspense fallback={<div className="text-center py-20">Cargando partners...</div>}>
          <PartnersSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}