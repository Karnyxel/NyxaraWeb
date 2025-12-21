import TeamSection from './components/TeamSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Equipo | Nyxara Bot',
  description: 'Conoce al equipo detrás de Nyxara, el bot de Discord más versátil.',
};

export default function EquipoPage() {
  return <TeamSection />;
}