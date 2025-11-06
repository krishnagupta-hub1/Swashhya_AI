"use client";

import { useState, useEffect, useContext } from "react";
import { useToast } from "@/hooks/use-toast";
import { getMentalHealthSupport } from "@/app/actions";
import { ChatUI } from "@/components/chat-ui";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Smile, Frown, Meh } from "lucide-react";
import { LanguageContext } from "../layout";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const moodCheckIns: { mood: string, icon: React.FC<any>, label: string }[] = [
    { mood: 'feeling happy', icon: Smile, label: 'Happy' },
    { mood: 'feeling sad', icon: Frown, label: 'Sad' },
    { mood: 'feeling okay', icon: Meh, label: 'Neutral' },
]

const initialMessage: Message = {
  role: "assistant",
  content: "Hello, how are you feeling today? Feel free to share what's on your mind. I'm here to listen.",
};

const STORAGE_KEY = "mental-health-chat";

export default function MentalHealthPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    try {
      const storedMessages = localStorage.getItem(STORAGE_KEY);
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      } else {
        setMessages([initialMessage]);
      }
    } catch (error) {
      console.error("Failed to read from localStorage", error);
      setMessages([initialMessage]);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        } catch (error) {
            console.error("Failed to write to localStorage", error);
        }
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = { role: "user", content };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await getMentalHealthSupport({ messages: newMessages, language });

      if (response.success && response.data) {
        const assistantMessage: Message = {
          role: "assistant",
          content: `${response.data.stressReliefTips}`,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get mental health support. Please try again.",
      });
      setMessages(prev => prev.filter(msg => msg !== userMessage));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Mental Health Support</CardTitle>
        <CardDescription>
          A safe space to share your feelings and get compassionate support.
        </CardDescription>
      </CardHeader>
      <ChatUI
        messages={messages}
        input={input}
        onInputChange={(e) => setInput(e.target.value)}
        onSendMessage={(e) => {
            e.preventDefault();
            handleSendMessage(input);
        }}
        isLoading={isLoading}
        placeholder="e.g., 'I'm feeling a bit stressed today...'"
      >
        <div className="flex flex-wrap gap-2">
            <p className="text-sm text-muted-foreground w-full">Or, select a mood:</p>
            {moodCheckIns.map(({ mood, icon: Icon, label }) => (
                <Button key={mood} variant="outline" size="sm" onClick={() => handleSendMessage(mood)} disabled={isLoading}>
                    <Icon className="mr-2 h-4 w-4" />
                    {label}
                </Button>
            ))}
        </div>
      </ChatUI>
    </Card>
  );
}
