'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface PostFormProps {
  initialData?: {
    title: string;
    content: string;
    published: boolean;
  };
  onSubmit: (data: {
    title: string;
    content: string;
    published: boolean;
  }) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export function PostForm({ 
  initialData, 
  onSubmit, 
  onCancel, 
  loading = false 
}: PostFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [published, setPublished] = useState(initialData?.published || false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Please enter a title');
      return;
    }

    await onSubmit({
      title: title.trim(),
      content: content.trim(),
      published,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          placeholder="Enter post title..."
          required
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <Textarea
          id="content"
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
          placeholder="Write your post content..."
          rows={8}
          disabled={loading}
        />
      </div>

      <div className="flex items-center">
        <input
          id="published"
          type="checkbox"
          checked={published}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPublished(e.target.checked)}
          disabled={loading}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
          Publish immediately
        </label>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? 'Saving...' : (initialData ? 'Update Post' : 'Create Post')}
        </Button>
      </div>
    </form>
  );
} 