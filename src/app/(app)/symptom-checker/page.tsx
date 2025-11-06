"use client";

import { useState, useEffect, useContext } from "react";
import { useToast } from "@/hooks/use-toast";
import { getSymptomAnalysis } from "@/app/actions";
import { ChatUI } from "@/components/chat-ui";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LanguageContext } from "../layout";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const initialMessage: Message = {
    role: "assistant",
    content: "Hello! Please describe your symptoms in detail. I'll do my best to provide a preliminary analysis. \n\n**Disclaimer:** I am an AI assistant and not a medical professional. Please consult a doctor for any health concerns.",
};

const STORAGE_KEY = "symptom-checker-chat";

export default function SymptomCheckerPage() {
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


  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await getSymptomAnalysis({ messages: newMessages, language });

      if (response.success && response.data) {
        const assistantMessage: Message = {
          role: "assistant",
          content: response.data.potentialConditions,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get symptom analysis. Please try again.",
      });
      setMessages(prev => prev.filter(msg => msg !== userMessage)); // Optionally remove user message on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>AI-Powered Symptom Checker</CardTitle>
        <CardDescription>
          Enter your symptoms below to get a list of potential conditions based on AYUSH guidelines.
        </CardDescription>
      </CardHeader>
      <ChatUI
        messages={messages}
        input={input}
        onInputChange={(e) => setInput(e.target.value)}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        placeholder="e.g., 'I have a fever, cough, and a headache...'"
      />
    </Card>
  );
}
