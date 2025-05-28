import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Welcome, {session.user?.name || session.user?.email}!</h2>
          <p className="text-gray-600 mb-6">This is your personal dashboard.</p>
          
          <div className="space-y-4">
            <Link
              href="/posts/manage"
              className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-center"
            >
              Manage Posts
            </Link>
            <Link
              href="/posts"
              className="block border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors text-center"
            >
              View All Posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 