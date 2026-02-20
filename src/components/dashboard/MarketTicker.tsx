// src/components/dashboard/MarketTicker.tsx
'use client';

import { useEffect, useState } from 'react';
import { useBusinessStore } from '@/store/useBusinessStore';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_NEWS = [
  { text: "Tech Sector rallies on AI breakthroughs", type: 'positive' },
  { text: "Global supply chain disruptions expected in Q3", type: 'negative' },
  { text: "Interest rates remain steady", type: 'neutral' },
  { text: "New privacy regulations announced for SaaS", type: 'negative' },
  { text: "Consumer spending index hits 5-year high", type: 'positive' },
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
    <div className="w-full bg-slate-900 text-slate-100 text-xs py-1 px-4 flex items-center gap-4 overflow-hidden border-b border-slate-800">
      <span className="font-bold text-indigo-400 shrink-0">MARKET FEED</span>
      <div className="h-4 w-[1px] bg-slate-700 shrink-0" />

      <motion.div
        key={newsIndex}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        className="flex items-center gap-2 truncate"
      >
        {currentNews.type === 'positive' && <TrendingUp className="h-3 w-3 text-green-500" />}
        {currentNews.type === 'negative' && <TrendingDown className="h-3 w-3 text-red-500" />}
        {currentNews.type === 'neutral' && <Minus className="h-3 w-3 text-gray-500" />}
        <span className="truncate">{currentNews.text}</span>
      </motion.div>

      <div className="ml-auto flex items-center gap-4 shrink-0 text-slate-500">
         <span>NASDAQ: <span className="text-green-500">+1.2%</span></span>
         <span>S&P 500: <span className="text-red-500">-0.4%</span></span>
      </div>
    </div>
  );
}
