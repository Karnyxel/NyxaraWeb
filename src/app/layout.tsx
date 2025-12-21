// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nyxara - Discord Bot',
  description: 'Potente bot de Discord con dashboard interactivo',
  keywords: ['discord', 'bot', 'moderation', 'music', 'dashboard'],
  openGraph: {
    type: 'website',
    url: 'https://nyxara.xyz',
    title: 'Nyxara Discord Bot',
    description: 'Potente bot de Discord con dashboard interactivo',
    images: ['/images/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nyxara Discord Bot',
    description: 'Potente bot de Discord con dashboard interactivo',
    images: ['/images/twitter-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.className} bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white min-h-screen`}>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}