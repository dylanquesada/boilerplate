import { db } from '@/db';
import { posts } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { formatDate, safeParseDate } from '@/lib/utils';

export default async function PostsPage() {
  const allPosts = await db
    .select()
    .from(posts)
    .orderBy(desc(posts.createdAt));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Posts</h1>
        
        {allPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts yet.</p>
            <p className="text-gray-400 mt-2">
              Sign in and create your first post using the API!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {allPosts.map((post) => (
              <article
                key={post.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                    {post.content && (
                      <p className="text-gray-600 mb-4">{post.content}</p>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Created: {formatDate(safeParseDate(post.createdAt))}</span>
                      <span>•</span>
                      <span>
                        Status: {post.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        post.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">API Usage Example</h3>
          <p className="text-gray-600 mb-4">
            You can create posts by making a POST request to <code className="bg-gray-200 px-2 py-1 rounded">/api/posts</code>:
          </p>
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
          <p className="text-gray-600 mt-4 text-sm">
            Note: You need to be authenticated to create posts.
          </p>
        </div>
      </div>
    </div>
  );
} 