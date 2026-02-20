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
  { href: '/dashboard', label: 'Headquarters', icon: LayoutDashboard },
  { href: '/dashboard/org-chart', label: 'Org Structure', icon: Users },
  { href: '/dashboard/roadmap', label: 'Strategy Map', icon: GitBranch },
  { href: '/dashboard/agents', label: 'Agent Comms', icon: MessageSquare },
];

export function Sidebar() {
  const pathname = usePathname();
  const { businessProfile, isSidebarOpen, appMode, toggleSidebar, toggleTheme, theme, setAppMode } = useBusinessStore();

  return (
    <aside
        className={cn(
            "fixed left-0 top-0 bottom-0 z-40 w-64 border-r bg-background transition-all duration-300 md:translate-x-0 shadow-sm",
            !isSidebarOpen && "w-20" // Collapsed state width
        )}
    >
      <div className={cn("flex h-16 items-center border-b px-6 transition-all", !isSidebarOpen && "justify-center px-0")}>
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg overflow-hidden">
           <div className="h-8 w-8 min-w-[2rem] rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md">
                {businessProfile.name ? businessProfile.name.charAt(0).toUpperCase() : 'G'}
           </div>
           {isSidebarOpen && (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="truncate max-w-[140px]"
                >
                    {businessProfile.name || 'Genesis OS'}
                </motion.span>
           )}
        </Link>
      </div>

      <div className="flex flex-col h-[calc(100vh-4rem)] justify-between py-4">
          <nav className="space-y-1 px-3">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:text-indigo-600",
                    isActive
                        ? "bg-indigo-50 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400"
                        : "text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800",
                    !isSidebarOpen && "justify-center px-2"
                  )}
                  title={!isSidebarOpen ? item.label : undefined}
                >
                  <Icon className="h-5 w-5" />
                  {isSidebarOpen && (
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        {item.label}
                      </motion.span>
                  )}
                  {item.label === 'Agent Comms' && isSidebarOpen && (
                       <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] text-white animate-pulse">3</span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="px-4 space-y-4">
               {/* Simulation Status - Only visible when expanded */}
               {isSidebarOpen && appMode === 'simulation' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-white text-xs space-y-2 shadow-inner"
                    >
                        <div className="flex items-center justify-between font-semibold text-green-400">
                             <span>System Status</span>
                             <span className="animate-pulse">● Online</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                            <span>CPU Usage</span>
                            <span>12%</span>
                        </div>
                         <div className="flex justify-between text-slate-400">
                            <span>Agents Active</span>
                            <span>4/4</span>
                        </div>
                    </motion.div>
               )}

               {/* Theme & Focus Toggles */}
               <div className={cn("flex flex-col gap-2", !isSidebarOpen && "items-center")}>
                    {isSidebarOpen ? (
                        <div className="flex items-center justify-between px-2 py-2 text-sm text-muted-foreground">
                            <span>Theme</span>
                            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8">
                                {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                            </Button>
                        </div>
                    ) : (
                        <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8 text-muted-foreground">
                             {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                        </Button>
                    )}

                    <Button
                        variant="ghost"
                        size={isSidebarOpen ? "sm" : "icon"}
                        onClick={toggleSidebar}
                        className={cn("w-full justify-start text-muted-foreground hover:text-foreground", !isSidebarOpen && "justify-center")}
                    >
                        {isSidebarOpen ? (
                            <>
                                <ChevronLeft className="h-4 w-4 mr-2" />
                                <span>Collapse Menu</span>
                            </>
                        ) : (
                            <ChevronRight className="h-4 w-4" />
                        )}
                    </Button>
               </div>
          </div>
      </div>
    </aside>
  );
}
