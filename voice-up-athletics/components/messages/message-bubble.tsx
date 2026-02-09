'use client';

import { MessageDto } from '@/app/actions/messages';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Shield } from 'lucide-react';

interface MessageBubbleProps {
  message: MessageDto;
  isCurrentUser: boolean;
}

export function MessageBubble({ message, isCurrentUser }: MessageBubbleProps) {
  return (
    <div
      className={cn(
        'flex gap-3 mb-4',
        isCurrentUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      <div
        className={cn(
          'flex-1 max-w-[70%]',
          isCurrentUser ? 'items-end' : 'items-start'
        )}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-muted-foreground">
            {message.senderAnonymousAlias}
          </span>
          {message.isInternal && (
            <Shield className="h-3 w-3 text-orange-500" title="Internal Note" />
          )}
          <span className="text-xs text-muted-foreground">
            {format(new Date(message.createdAt), 'MMM d, h:mm a')}
          </span>
        </div>
        
        <div
          className={cn(
            'px-4 py-2 rounded-lg',
            isCurrentUser
              ? 'bg-primary text-primary-foreground'
              : message.isInternal
              ? 'bg-orange-50 border border-orange-200'
              : 'bg-muted'
          )}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </div>
  );
}
