import PartnerGrid from './components/PartnerGrid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partners | Nyxara',
  description: 'Colaboramos con los mejores en la industria para ofrecerte soluciones integrales y de calidad.',
};

export default function PartnersPage() {
  return <PartnerGrid />;
}