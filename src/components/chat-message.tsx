import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SwasthyaAiLogo } from './icons';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';
  return (
    <div
      className={cn('flex items-start gap-3', isUser && 'justify-end')}
    >
      {!isUser && (
        <Avatar className="h-9 w-9 border">
          <AvatarFallback>
            <SwasthyaAiLogo />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-[80%] rounded-lg p-3 text-sm shadow-sm',
          isUser
            ? 'bg-primary/90 text-primary-foreground'
            : 'bg-card'
        )}
      >
        <div className="prose prose-sm text-inherit">{content}</div>
      </div>
      {isUser && (
        <Avatar className="h-9 w-9 border">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
