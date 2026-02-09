'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send } from 'lucide-react';
import { sendMessageAction, CreateMessageDto } from '@/app/actions/messages';
import { Input } from '../ui/input';

interface MessageInputProps {
  reportId: number;
  isStaff: boolean;
  onMessageSent?: () => void;
}

export function MessageInput({ reportId, isStaff, onMessageSent }: MessageInputProps) {
  const [content, setContent] = useState('');
  const [isInternal, setIsInternal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);

    try {
      const messageData: CreateMessageDto = {
        reportId,
        content: content.trim(),
        isInternal,
      };

      const result = await sendMessageAction(messageData);

      if (result.success) {
        setContent('');
        setIsInternal(false);
        onMessageSent?.();
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t bg-background p-4">
      <div className="space-y-3">
        {isStaff && (
          <div className="flex items-center gap-2">
            <Input
              type="checkbox"
              id="internal"
              checked={isInternal}
              onChange={(e) => setIsInternal(e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor="internal" className="text-sm cursor-pointer">
              Internal Note (Staff Only)
            </Label>
          </div>
        )}

        <div className="flex gap-2">
          <Textarea
            placeholder="Type your message..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={2}
            className="flex-1"
            disabled={isSubmitting}
          />
          <Button
            type="submit"
            disabled={!content.trim() || isSubmitting}
            size="icon"
            className="self-end"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  );
}
