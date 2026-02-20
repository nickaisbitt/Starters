// src/app/dashboard/layout.tsx
'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { useBusinessStore } from '@/store/useBusinessStore';
import { MarketTicker } from '@/components/dashboard/MarketTicker';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { SimulationController } from '@/components/simulation/SimulationController';
import { CrisisModal } from '@/components/dashboard/CrisisModal';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen, theme, appMode, crisisEvent } = useBusinessStore();

  return (
    <div className={cn("min-h-screen bg-background text-foreground", theme)}>
      <SimulationController />
      <Sidebar />
      <main
        className={cn(
            "transition-all duration-300 min-h-screen flex flex-col relative",
            isSidebarOpen ? "md:pl-64" : "md:pl-20"
        )}
      >
        {appMode === 'simulation' && <MarketTicker />}

        <div className="p-4 md:p-8 flex-1 overflow-y-auto">
            {children}
        </div>

        <CrisisModal />
      </main>
    </div>
  );
}
