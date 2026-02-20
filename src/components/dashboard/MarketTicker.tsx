// src/components/dashboard/MarketTicker.tsx
'use client';

import { useEffect, useState } from 'react';
import { useBusinessStore } from '@/store/useBusinessStore';
import { TrendingUp, TrendingDown, Minus, Megaphone } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_NEWS = [
  { text: "CRYPTO CRASH! Or is it? Experts confused.", type: 'negative' },
  { text: "Your competitor just tripped on stage. Shares up!", type: 'positive' },
  { text: "New law passed: AI Agents must have tea breaks.", type: 'neutral' },
  { text: "Elon tweeted something weird again.", type: 'negative' },
  { text: "Consumer spending on 'shiny things' is up 200%.", type: 'positive' },
];

export function MarketTicker() {
  const { businessProfile } = useBusinessStore();
  const [newsIndex, setNewsIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNewsIndex((prev) => (prev + 1) % MOCK_NEWS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentNews = MOCK_NEWS[newsIndex];

  return (
    <div className="w-full bg-black text-white text-lg py-2 px-6 flex items-center gap-4 overflow-hidden border-b-4 border-yellow-400 font-architects shadow-[0px_4px_0px_0px_rgba(0,0,0,0.2)] z-30 relative transform -rotate-0.5">
      <div className="flex items-center gap-2 text-yellow-400 font-black animate-pulse shrink-0">
        <Megaphone className="h-5 w-5 rotate-12" />
        <span>GOSSIP WIRE</span>
      </div>

      <div className="h-6 w-0.5 bg-yellow-400/50 shrink-0 rotate-12" />

      <motion.div
        key={newsIndex}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        className="flex items-center gap-2 truncate font-patrick tracking-wide flex-1"
      >
        {currentNews.type === 'positive' && <TrendingUp className="h-5 w-5 text-green-400" />}
        {currentNews.type === 'negative' && <TrendingDown className="h-5 w-5 text-red-400" />}
        {currentNews.type === 'neutral' && <Minus className="h-5 w-5 text-slate-400" />}
        <span className="truncate">{currentNews.text}</span>
      </motion.div>

      <div className="ml-auto flex items-center gap-6 shrink-0 text-sm font-mono text-slate-300 hidden md:flex">
         <span className="flex items-center gap-1">NASDAQ <span className="text-green-400 font-bold bg-green-900/30 px-1 rounded">+1.2%</span></span>
         <span className="flex items-center gap-1">S&P 500 <span className="text-red-400 font-bold bg-red-900/30 px-1 rounded">-0.4%</span></span>
      </div>
    </div>
  );
}
