'use client';

import { Post } from './PostManager';
import { PostForm } from './PostForm';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PostEditDialogProps {
  post: Post;
  onSave: (
    id: number,
    data: {
      title: string;
      content: string;
      published: boolean;
    }
  ) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export function PostEditDialog({ 
  post, 
  onSave, 
  onCancel, 
  loading = false 
}: PostEditDialogProps) {
  const handleSubmit = async (data: {
    title: string;
    content: string;
    published: boolean;
  }) => {
    await onSave(post.id, data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Edit Post</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            disabled={loading}
            className="p-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <PostForm
            initialData={{
              title: post.title,
              content: post.content || '',
              published: post.published,
            }}
            onSubmit={handleSubmit}
            onCancel={onCancel}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
} 