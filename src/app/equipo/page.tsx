import TeamSection from './components/TeamSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nuestro Equipo | Nyxara',
  description: 'Conoce al equipo detrás de Nyxara. Apasionados por crear la mejor experiencia para nuestros usuarios.',
};

export default function EquipoPage() {
  return <TeamSection />;
}