import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Cookies | Nyxara Bot',
  description: 'Política de cookies y gestión de preferencias de Nyxara Bot.',
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}