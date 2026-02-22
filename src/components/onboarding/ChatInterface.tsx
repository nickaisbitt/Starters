'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { useBusinessStore } from '@/store/useBusinessStore';
import { simulateArchitectResponse, generateBusinessStructure } from '@/lib/ai-architect';
import { Send, Sparkles } from 'lucide-react';
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
        addMessage('assistant', "Oi! I'm The Architect. Let's make some mischief and build a company. What crazy idea are we cooking up today?");
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
            updateBusinessProfile({ industry: 'Rocket Science' });
        } else if (userMsg.toLowerCase().includes('bakery') || userMsg.toLowerCase().includes('food')) {
            updateBusinessProfile({ industry: 'Tasty Treats' });
        } else {
             updateBusinessProfile({ industry: 'Global Domination' });
        }
    }

    // Simulate AI response
    const response = await simulateArchitectResponse(userMsg, messages.filter(m => m.role === 'user').length);
    setIsTyping(false);
    addMessage('assistant', response);

    // Check if ready to generate
    if (response.includes("ready to rock")) {
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
    <Card className="flex flex-col h-[600px] w-full max-w-2xl mx-auto overflow-hidden doodle-card border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-1 transition-transform hover:rotate-0">
      <div className="p-4 border-b-2 border-black border-dashed bg-yellow-50 dark:bg-zinc-900 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="relative">
                <Avatar className="h-12 w-12 border-2 border-black bg-white">
                    <AvatarFallback>AI</AvatarFallback>
                    <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=Archie" />
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-green-400 border-2 border-black w-4 h-4 rounded-full animate-pulse" />
            </div>
            <div>
                <h3 className="font-bold text-xl font-architects">The Architect</h3>
                <p className="text-sm font-patrick text-slate-600 dark:text-slate-400">Chief Visionary</p>
            </div>
        </div>
        <Sparkles className="h-6 w-6 text-yellow-500 animate-bounce" />
      </div>

      <ScrollArea ref={scrollRef} className="flex-1 p-6 space-y-6 overflow-y-auto bg-white dark:bg-zinc-900 bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]">
        <AnimatePresence>
            {messages.map((msg) => (
            <motion.div
                key={msg.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
                <div
                className={`flex gap-3 max-w-[85%] items-end ${
                    msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
                >
                <Avatar className="h-10 w-10 shrink-0 border-2 border-black bg-white">
                    {msg.role === 'user' ? (
                        <>
                             <AvatarFallback>ME</AvatarFallback>
                             <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=Me" />
                        </>
                    ) : (
                        <>
                            <AvatarFallback>AI</AvatarFallback>
                            <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=Archie" />
                        </>
                    )}
                </Avatar>

                {/* Speech Bubble Style */}
                <div
                    className={`relative px-5 py-3 text-lg font-patrick border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] ${
                    msg.role === 'user'
                        ? 'bg-blue-300 text-black rounded-t-xl rounded-bl-xl rounded-br-none rotate-1'
                        : 'bg-white dark:bg-zinc-800 text-black dark:text-white rounded-t-xl rounded-br-xl rounded-bl-none -rotate-1'
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
                <div className="flex gap-3 max-w-[80%] items-end">
                     <Avatar className="h-10 w-10 shrink-0 border-2 border-black">
                        <AvatarFallback>AI</AvatarFallback>
                        <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=Archie" />
                     </Avatar>
                     <div className="rounded-t-xl rounded-br-xl rounded-bl-none border-2 border-black bg-white px-4 py-4 flex items-center gap-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)]">
                         <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]" />
                         <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]" />
                         <div className="w-2 h-2 bg-black rounded-full animate-bounce" />
                     </div>
                </div>
            </motion.div>
        )}
      </ScrollArea>

      <div className="p-4 bg-yellow-50 dark:bg-zinc-900 border-t-2 border-black border-dashed">
        <div className="flex gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write your wild ideas..."
            className="flex-1 text-lg bg-white border-2 border-black shadow-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none"
          />
          <Button onClick={handleSendMessage} size="icon" className="h-12 w-12 bg-black hover:bg-zinc-800 text-white border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-y-0.5 hover:shadow-none transition-all">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
