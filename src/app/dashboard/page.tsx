import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { posts } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  // Get user's posts
  const userPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.authorId, session.user.id));

  const publishedCount = userPosts.filter(post => post.published).length;
  const draftCount = userPosts.filter(post => !post.published).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Posts</h3>
            <p className="text-3xl font-bold text-blue-600">{userPosts.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Published</h3>
            <p className="text-3xl font-bold text-green-600">{publishedCount}</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Drafts</h3>
            <p className="text-3xl font-bold text-yellow-600">{draftCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold mb-6">Welcome, {session.user?.name || session.user?.email}!</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Quick Actions</h3>
              <div className="space-y-2 text-gray-600">
                <p>• Create posts using the API: <code className="bg-gray-100 px-2 py-1 rounded">POST /api/posts</code></p>
                <p>• View all posts: <a href="/posts" className="text-blue-600 hover:underline">Posts page</a></p>
                <p>• Manage your account settings</p>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <h3 className="text-lg font-medium mb-2">Account Information</h3>
              <div className="space-y-1 text-gray-600">
                <p><strong>Email:</strong> {session.user?.email}</p>
                <p><strong>Name:</strong> {session.user?.name || 'Not set'}</p>
                <p><strong>User ID:</strong> {session.user?.id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 