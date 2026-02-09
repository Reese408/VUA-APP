'use client';

import { useEffect, useRef } from 'react';
import { useMessages } from '@/lib/hooks/use-messages';
import { useAuth } from '@/lib/hooks/use-auth';
import { MessageBubble } from './message-bubble';
import { MessageInput } from './message-input';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface MessageThreadProps {
  reportId: number;
}

export function MessageThread({ reportId }: MessageThreadProps) {
  const { messages, isLoading, mutate } = useMessages(reportId);
  const { user, isStaff } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (isLoading) {
    return (
      <Card className="p-8 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </Card>
    );
  }

  // Filter out internal messages for athletes
  const visibleMessages = isStaff()
    ? messages
    : messages.filter((msg) => !msg.isInternal);

  return (
    <div className="flex flex-col h-[600px]">
      <Card className="flex-1 overflow-y-auto p-4 mb-4">
        {visibleMessages.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No messages yet. Start the conversation!
          </div>
        ) : (
          <>
            {visibleMessages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isCurrentUser={user?.anonymousAlias === message.senderAnonymousAlias}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </Card>

      <MessageInput
        reportId={reportId}
        isStaff={isStaff()}
        onMessageSent={() => mutate()}
      />
    </div>
  );
}
