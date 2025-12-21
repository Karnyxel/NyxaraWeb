import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import DashboardSidebar from '@/components/layout/DashboardSidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <DashboardSidebar user={session.user} />
      <main className="ml-64 p-8">
        <div className="bg-gray-800/50 rounded-2xl border border-gray-700 p-6">
          {children}
        </div>
      </main>
    </div>
  );
}