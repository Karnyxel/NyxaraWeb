import { TeamSection } from "@/components/sections/TeamSection";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Equipo | Nyxara Bot",
  description: "Conoce al equipo detrás de Nyxara, el bot de Discord más versátil.",
};

export default function EquipoPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
}