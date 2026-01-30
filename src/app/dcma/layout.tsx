import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política DMCA | Nyxara Bot',
  description: 'Política de derechos de autor y DMCA de Nyxara Bot.',
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}