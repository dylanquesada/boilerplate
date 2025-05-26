'use client';

import { useState } from 'react';
import { PostList } from './PostList';
import { PostForm } from './PostForm';
import { PostEditDialog } from './PostEditDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { safeParseDate } from '@/lib/utils';

export interface Post {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author: {
    name: string | null;
    email: string | null;
  } | null;
}

interface PostManagerProps {
  initialPosts: Post[];
  userId: string;
}

export function PostManager({ initialPosts, userId }: PostManagerProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreatePost = async (data: {
    title: string;
    content: string;
    published: boolean;
  }) => {
    setLoading(true);
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const newPost = await response.json();
      
      // Add the new post to the list with safe date parsing
      setPosts(prev => [
        {
          ...newPost,
          author: { name: 'You', email: null },
          createdAt: safeParseDate(newPost.createdAt),
          updatedAt: safeParseDate(newPost.updatedAt),
        },
        ...prev
      ]);
      
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePost = async (
    id: number,
    data: {
      title: string;
      content: string;
      published: boolean;
    }
  ) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      const updatedPost = await response.json();
      
      // Update the post in the list with safe date parsing
      setPosts(prev =>
        prev.map(post =>
          post.id === id
            ? {
                ...post,
                ...updatedPost,
                updatedAt: safeParseDate(updatedPost.updatedAt),
              }
            : post
        )
      );
      
      setEditingPost(null);
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      // Remove the post from the list
      setPosts(prev => prev.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublished = async (id: number, published: boolean) => {
    const post = posts.find(p => p.id === id);
    if (!post) return;

    await handleUpdatePost(id, {
      title: post.title,
      content: post.content || '',
      published,
    });
  };

  return (
    <div className="space-y-6">
      {/* Create New Post Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Your Posts</h2>
          <p className="text-gray-600">
            {posts.length} post{posts.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button
          onClick={() => setIsCreating(true)}
          disabled={loading}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          New Post
        </Button>
      </div>

      {/* Create Post Form */}
      {isCreating && (
        <div className="border rounded-lg p-6 bg-gray-50">
          <h3 className="text-lg font-semibold mb-4">Create New Post</h3>
          <PostForm
            onSubmit={handleCreatePost}
            onCancel={() => setIsCreating(false)}
            loading={loading}
          />
        </div>
      )}

      {/* Posts List */}
      <PostList
        posts={posts}
        onEdit={setEditingPost}
        onDelete={handleDeletePost}
        onTogglePublished={handleTogglePublished}
        loading={loading}
      />

      {/* Edit Post Dialog */}
      {editingPost && (
        <PostEditDialog
          post={editingPost}
          onSave={handleUpdatePost}
          onCancel={() => setEditingPost(null)}
          loading={loading}
        />
      )}
    </div>
  );
} 