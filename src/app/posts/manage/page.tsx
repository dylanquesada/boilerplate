import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { posts, users } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { PostManager } from '@/components/features/posts/PostManager';

export default async function ManagePostsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  // Get user's posts with author information
  const userPosts = await db
    .select({
      id: posts.id,
      title: posts.title,
      content: posts.content,
      published: posts.published,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
      authorId: posts.authorId,
      author: {
        name: users.name,
        email: users.email,
      },
    })
    .from(posts)
    .leftJoin(users, eq(posts.authorId, users.id))
    .where(eq(posts.authorId, session.user.id))
    .orderBy(desc(posts.createdAt));

  // Convert dates to serializable format for client component
  const serializedPosts = userPosts.map(post => ({
    ...post,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  })) as any; // Type assertion to allow string dates temporarily

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Manage Posts</h1>
            <p className="text-gray-600 mt-2">
              Create, edit, and manage your blog posts
            </p>
          </div>
        </div>

        <PostManager 
          initialPosts={serializedPosts.map((post: any) => ({
            ...post,
            createdAt: new Date(post.createdAt),
            updatedAt: new Date(post.updatedAt),
          }))}
          userId={session.user.id}
        />
      </div>
    </div>
  );
} 