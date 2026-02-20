'use client';

import { useBusinessStore } from '@/store/useBusinessStore';
import { ChatInterface } from '@/components/onboarding/ChatInterface';
import { LiveCanvas } from '@/components/onboarding/LiveCanvas';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const { onboardingStep } = useBusinessStore();

  if (onboardingStep === 'complete') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Welcome to Genesis OS Dashboard</h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl space-y-8">
        <header className="text-center space-y-2">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            GENESIS OS
            </h1>
            <p className="text-muted-foreground text-lg">AI-Powered Enterprise Incorporation System</p>
        </header>

        <AnimatePresence mode="wait">
             <motion.div
                key="onboarding"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
             >
                <div className="order-2 md:order-1 w-full">
                     <ChatInterface />
                </div>
                <div className="order-1 md:order-2 w-full flex justify-center md:justify-start">
                     <LiveCanvas />
                </div>
             </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
