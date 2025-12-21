import PartnersSection from './components/PartnersSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partners | Nyxara Bot',
  description: 'Partners y colaboradores oficiales de Nyxara Bot.',
};

export default function PartnersPage() {
  return <PartnersSection />;
}