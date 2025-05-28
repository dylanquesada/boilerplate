import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { posts } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function ManagePostsPage() {
  const session = await auth();

  if (!session) {
    redirect('/api/auth/signin');
  }

  // Get user's posts
  const userPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.authorId, session.user.id));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Manage Your Posts</h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Create New Post</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-600 mb-4">Use the API to create posts:</p>
            <pre className="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-x-auto">
{`fetch('/api/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'My New Post',
    content: 'This is the content of my post.',
    published: true
  })
})`}
            </pre>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Posts ({userPosts.length})</h2>
          {userPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">You haven't created any posts yet.</p>
              <p className="text-gray-400 mt-2">Use the API above to create your first post!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {userPosts.map((post) => (
                <div key={post.id} className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    <span className={`px-2 py-1 rounded text-sm ${
                      post.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
                  <div className="text-sm text-gray-500">
                    Created: {new Date(post.createdAt).toLocaleDateString()}
                    {post.updatedAt && (
                      <span className="ml-4">
                        Updated: {new Date(post.updatedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 