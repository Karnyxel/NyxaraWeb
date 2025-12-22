import PartnersSection from "@/components/sections/PartnersSection";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partners | Nyxara Bot',
  description: 'Partners y colaboradores oficiales de Nyxara Bot.',
};

export default function PartnersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <PartnersSection />
      </main>
      <Footer />
    </div>
  );
}