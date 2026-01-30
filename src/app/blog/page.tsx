// src/app/blog/page.tsx
import { Suspense } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import BlogSection from '@/components/sections/BlogSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Nyxara Bot',
  description: 'Blog oficial de Nyxara Bot con noticias, actualizaciones y guías.',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-nyxara-dark to-black">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <Suspense fallback={<div className="text-center py-20">Cargando blog...</div>}>
          <BlogSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}