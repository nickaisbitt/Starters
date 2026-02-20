'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { useBusinessStore } from '@/store/useBusinessStore';
import { simulateArchitectResponse, generateBusinessStructure } from '@/lib/ai-architect';
import { Send, User, Bot, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ChatInterface() {
  const {
    messages,
    addMessage,
    updateBusinessProfile,
    setOnboardingStep,
    setDepartments,
    setAgents,
    setTasks,
    businessProfile
  } = useBusinessStore();

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        addMessage('assistant', "Hello. I am The Architect. I'm here to help you incorporate your new venture. What are we building today?");
        setIsTyping(false);
      }, 1000);
    }
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    addMessage('user', userMsg);
    setInputValue('');
    setIsTyping(true);

    // Simple keyword extraction for the prototype
    if (!businessProfile.name && userMsg.length < 50) {
        updateBusinessProfile({ name: userMsg });
    } else if (!businessProfile.industry) {
        if (userMsg.toLowerCase().includes('tech') || userMsg.toLowerCase().includes('app')) {
            updateBusinessProfile({ industry: 'Technology' });
        } else if (userMsg.toLowerCase().includes('bakery') || userMsg.toLowerCase().includes('food')) {
            updateBusinessProfile({ industry: 'Food & Beverage' });
        } else {
             updateBusinessProfile({ industry: 'General Business' });
        }
    }

    // Simulate AI response
    const response = await simulateArchitectResponse(userMsg, messages.filter(m => m.role === 'user').length);
    setIsTyping(false);
    addMessage('assistant', response);

    // Check if ready to generate
    if (response.includes("ready to build")) {
        setOnboardingStep('generating');

        // Trigger generation
        setTimeout(() => {
            const structure = generateBusinessStructure(businessProfile.industry || 'Technology');
            setDepartments(structure.departments);
            setAgents(structure.agents);
            setTasks(structure.tasks);
            setOnboardingStep('complete');
        }, 3000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="flex flex-col h-[600px] w-full max-w-2xl mx-auto shadow-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="p-4 border-b bg-slate-50 dark:bg-slate-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 border-2 border-indigo-500">
                <AvatarFallback>AI</AvatarFallback>
                <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=architect" />
            </Avatar>
            <div>
                <h3 className="font-semibold text-sm">The Architect</h3>
                <p className="text-xs text-muted-foreground">Genesis OS System</p>
            </div>
        </div>
        <div className="flex items-center gap-1">
             <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
             <span className="text-xs text-muted-foreground">Online</span>
        </div>
      </div>

      <ScrollArea ref={scrollRef} className="flex-1 p-4 space-y-4 overflow-y-auto">
        <AnimatePresence>
            {messages.map((msg) => (
            <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
                <div
                className={`flex gap-2 max-w-[80%] ${
                    msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
                >
                <Avatar className="h-8 w-8 shrink-0">
                    {msg.role === 'user' ? (
                        <>
                             <AvatarFallback>ME</AvatarFallback>
                             <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
                        </>
                    ) : (
                        <>
                            <AvatarFallback>AI</AvatarFallback>
                            <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=architect" />
                        </>
                    )}
                </Avatar>
                <div
                    className={`rounded-2xl px-4 py-2 text-sm shadow-sm ${
                    msg.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-none'
                    }`}
                >
                    {msg.content}
                </div>
                </div>
            </motion.div>
            ))}
        </AnimatePresence>

        {isTyping && (
           <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex w-full justify-start"
            >
                <div className="flex gap-2 max-w-[80%]">
                     <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback>AI</AvatarFallback>
                        <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=architect" />
                     </Avatar>
                     <div className="rounded-2xl px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-bl-none flex items-center gap-1">
                         <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                         <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                         <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                     </div>
                </div>
            </motion.div>
        )}
      </ScrollArea>

      <div className="p-4 bg-white dark:bg-slate-950 border-t">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your vision..."
            className="flex-1 focus-visible:ring-indigo-500"
          />
          <Button onClick={handleSendMessage} size="icon" className="bg-indigo-600 hover:bg-indigo-700">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
