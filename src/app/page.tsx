import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-8">
          Next.js Boilerplate
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          A modern starter template with Next.js, NextAuth, PostgreSQL, and Docker
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="p-6 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">🚀 Next.js 14</h3>
            <p className="text-gray-600">Latest version with App Router and server components</p>
          </div>
          <div className="p-6 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">🔐 NextAuth.js</h3>
            <p className="text-gray-600">Complete authentication solution with multiple providers</p>
          </div>
          <div className="p-6 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">🗄️ PostgreSQL</h3>
            <p className="text-gray-600">Robust database with Drizzle ORM for type safety</p>
          </div>
          <div className="p-6 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">🐳 Docker</h3>
            <p className="text-gray-600">Containerized for easy deployment and development</p>
          </div>
          <div className="p-6 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">🎨 Tailwind CSS</h3>
            <p className="text-gray-600">Modern styling with utility-first approach</p>
          </div>
          <div className="p-6 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">📝 TypeScript</h3>
            <p className="text-gray-600">Full type safety throughout the application</p>
          </div>
        </div>

        <div className="space-y-4">
          {session ? (
            <div className="space-y-4">
              <p className="text-lg">Welcome back, {session.user?.name || session.user?.email}!</p>
              <div className="space-x-4">
                <Link
                  href="/posts"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Posts
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Dashboard
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-x-4">
              <Link
                href="/api/auth/signin"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/posts"
                className="inline-block border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                View Posts (Public)
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 