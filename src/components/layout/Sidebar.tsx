'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useBusinessStore } from '@/store/useBusinessStore';
import { LayoutDashboard, Users, GitBranch, MessageSquare, Settings, X, ChevronLeft, ChevronRight, Moon, Sun, Monitor, TrendingUp, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'The War Room', icon: LayoutDashboard }, // Renamed
  { href: '/dashboard/org-chart', label: 'The Dream Team', icon: Users }, // Renamed
  { href: '/dashboard/roadmap', label: 'Master Plan', icon: GitBranch }, // Renamed
  { href: '/dashboard/agents', label: 'Agent Chatter', icon: MessageSquare }, // Renamed
];

export function Sidebar() {
  const pathname = usePathname();
  const { businessProfile, isSidebarOpen, appMode, toggleSidebar, toggleTheme, theme, setAppMode } = useBusinessStore();

  return (
    <aside
        className={cn(
            "fixed left-0 top-0 bottom-0 z-40 w-64 border-r-2 border-black bg-paper transition-all duration-300 md:translate-x-0 shadow-[4px_0px_0px_0px_rgba(0,0,0,1)]",
            !isSidebarOpen && "w-20"
        )}
    >
      <div className={cn("flex h-20 items-center border-b-2 border-dashed border-black px-6 transition-all bg-yellow-300", !isSidebarOpen && "justify-center px-0")}>
        <Link href="/dashboard" className="flex items-center gap-3 font-bold text-xl overflow-hidden group">
           <div className="h-10 w-10 min-w-[2.5rem] rounded-sm border-2 border-black bg-white flex items-center justify-center text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all">
                {businessProfile.name ? businessProfile.name.charAt(0).toUpperCase() : 'G'}
           </div>
           {isSidebarOpen && (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="truncate max-w-[140px] font-architects uppercase tracking-wider"
                >
                    {businessProfile.name || 'Genesis OS'}
                </motion.span>
           )}
        </Link>
      </div>

      <div className="flex flex-col h-[calc(100vh-5rem)] justify-between py-6">
          <nav className="space-y-2 px-3">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-sm border-2 border-transparent px-3 py-3 text-lg font-bold transition-all hover:bg-white hover:border-black hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5",
                    isActive
                        ? "bg-white border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-black"
                        : "text-slate-600 dark:text-slate-400 hover:text-black",
                    !isSidebarOpen && "justify-center px-2"
                  )}
                  title={!isSidebarOpen ? item.label : undefined}
                >
                  <Icon className="h-6 w-6 stroke-2" />
                  {isSidebarOpen && (
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-architects">
                        {item.label}
                      </motion.span>
                  )}
                  {item.label === 'Agent Chatter' && isSidebarOpen && (
                       <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-red-500 border-2 border-black text-xs font-bold text-white animate-bounce">3</span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="px-4 space-y-4">
               {/* Simulation Status */}
               {isSidebarOpen && appMode === 'simulation' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-black rounded-sm border-2 border-black text-white text-xs space-y-2 shadow-[4px_4px_0px_0px_rgba(100,100,100,1)] rotate-1"
                    >
                        <div className="flex items-center justify-between font-bold text-green-400 uppercase tracking-widest font-architects text-sm">
                             <span>System Live</span>
                             <span className="animate-pulse text-xl">●</span>
                        </div>
                        <div className="flex justify-between font-mono">
                            <span>CPU Heat</span>
                            <span className="text-red-400">HOT!</span>
                        </div>
                         <div className="flex justify-between font-mono">
                            <span>Minions</span>
                            <span>4/4 Working</span>
                        </div>
                    </motion.div>
               )}

               {/* Toggles */}
               <div className={cn("flex flex-col gap-2", !isSidebarOpen && "items-center")}>
                    {isSidebarOpen ? (
                        <div className="flex items-center justify-between px-2 py-2 text-sm font-bold border-t-2 border-black border-dashed pt-4">
                            <span>Theme</span>
                            <Button variant="outline" size="icon" onClick={toggleTheme} className="h-10 w-10 rounded-full bg-yellow-200">
                                {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                            </Button>
                        </div>
                    ) : (
                        <Button variant="outline" size="icon" onClick={toggleTheme} className="h-10 w-10 rounded-full bg-yellow-200">
                             {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                        </Button>
                    )}

                    <Button
                        variant="ghost"
                        size={isSidebarOpen ? "sm" : "icon"}
                        onClick={toggleSidebar}
                        className={cn("w-full justify-start text-slate-500 hover:text-black font-architects", !isSidebarOpen && "justify-center")}
                    >
                        {isSidebarOpen ? (
                            <>
                                <ChevronLeft className="h-5 w-5 mr-2" />
                                <span>Fold Menu</span>
                            </>
                        ) : (
                            <ChevronRight className="h-5 w-5" />
                        )}
                    </Button>
               </div>
          </div>
      </div>
    </aside>
  );
}
