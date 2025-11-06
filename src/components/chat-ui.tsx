import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { ChatMessage } from './chat-message';

interface ChatUIProps {
  messages: { role: 'user' | 'assistant'; content: string }[];
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  placeholder?: string;
  children?: React.ReactNode;
}

export function ChatUI({
  messages,
  input,
  onInputChange,
  onSendMessage,
  isLoading,
  placeholder,
  children
}: ChatUIProps) {
  return (
    <div className="flex h-[80vh] flex-col">
      <ScrollArea className="flex-1">
        <div className="space-y-6 p-4">
          {messages.map((msg, index) => (
            <ChatMessage key={index} role={msg.role} content={msg.content} />
          ))}
          {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
            <ChatMessage role="assistant" content="Thinking..." />
          )}
        </div>
      </ScrollArea>

      <div className="border-t bg-card p-4">
        {children}
        <form
          onSubmit={onSendMessage}
          className="mt-4 flex items-start gap-2"
        >
          <Textarea
            value={input}
            onChange={onInputChange}
            placeholder={placeholder || "Type your message here..."}
            className="min-h-12 flex-1 resize-none"
            rows={1}
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-5 w-5" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
