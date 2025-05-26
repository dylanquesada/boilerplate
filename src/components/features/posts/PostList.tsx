'use client';

import { Post } from './PostManager';
import { Button } from '@/components/ui/button';
import { formatDate, safeParseDate } from '@/lib/utils';
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react';

interface PostListProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (id: number) => void;
  onTogglePublished: (id: number, published: boolean) => void;
  loading?: boolean;
}

export function PostList({ 
  posts, 
  onEdit, 
  onDelete, 
  onTogglePublished, 
  loading = false 
}: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
        <p className="text-gray-500 text-lg">No posts yet.</p>
        <p className="text-gray-400 mt-2">
          Create your first post to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <article
          key={post.id}
          className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-semibold text-gray-900 truncate">
                  {post.title}
                </h3>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    post.published
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </div>
              
              {post.content && (
                <p className="text-gray-600 mb-4 overflow-hidden" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  lineHeight: '1.5rem',
                  maxHeight: '4.5rem'
                }}>
                  {post.content}
                </p>
              )}
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Created: {formatDate(safeParseDate(post.createdAt))}</span>
                {safeParseDate(post.updatedAt).getTime() !== safeParseDate(post.createdAt).getTime() && (
                  <>
                    <span>•</span>
                    <span>Updated: {formatDate(safeParseDate(post.updatedAt))}</span>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onTogglePublished(post.id, !post.published)}
                disabled={loading}
                className="flex items-center gap-1"
              >
                {post.published ? (
                  <>
                    <EyeOff className="h-4 w-4" />
                    Unpublish
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    Publish
                  </>
                )}
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(post)}
                disabled={loading}
                className="flex items-center gap-1"
              >
                <Edit className="h-4 w-4" />
                Edit
              </Button>
              
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(post.id)}
                disabled={loading}
                className="flex items-center gap-1"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
} 