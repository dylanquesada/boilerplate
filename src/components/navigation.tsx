'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export function Navigation() {
  const { data: session, status } = useSession();

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Boilerplate
            </Link>
            <div className="flex space-x-4">
              <Link
                href="/posts"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Posts
              </Link>
              {session && (
                <>
                  <Link
                    href="/posts/manage"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Manage Posts
                  </Link>
                  <Link
                    href="/dashboard"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Dashboard
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="text-gray-500">Loading...</div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">
                  {session.user?.name || session.user?.email}
                </span>
                <button
                  onClick={() => signOut()}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 