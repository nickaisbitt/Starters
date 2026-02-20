'use client';

import { useBusinessStore } from '@/store/useBusinessStore';
import { ChatInterface } from '@/components/onboarding/ChatInterface';
import { LiveCanvas } from '@/components/onboarding/LiveCanvas';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const { onboardingStep, businessProfile } = useBusinessStore();

  if (onboardingStep === 'complete') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-paper dark:bg-zinc-950 space-y-8 p-4 bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]">
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-4"
        >
            <h1 className="text-4xl md:text-6xl font-black font-architects text-black dark:text-white uppercase tracking-widest">
                Welcome to <span className="text-yellow-500 bg-black px-2 transform -rotate-2 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">HQ</span>
            </h1>
            <p className="text-2xl font-patrick text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
                "{businessProfile.name}" is officially incorporated and ready for world domination.
            </p>
        </motion.div>

        <motion.div
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.5 }}
        >
            <Link href="/dashboard">
                <Button size="lg" className="text-2xl h-16 px-12 border-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                    Enter The War Room <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
            </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-paper dark:bg-zinc-950 flex flex-col items-center justify-center p-4 md:p-8 bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]">
      <div className="w-full max-w-6xl space-y-8">
        <header className="text-center space-y-2">
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter font-architects text-black dark:text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
            GENESIS <span className="text-yellow-400">OS</span>
            </h1>
            <p className="text-slate-500 text-xl font-patrick uppercase tracking-widest border-b-2 border-black inline-block pb-1 transform -rotate-1">
                The Business-in-a-Box Simulator
            </p>
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
