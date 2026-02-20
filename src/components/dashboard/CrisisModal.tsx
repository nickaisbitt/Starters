// src/components/dashboard/CrisisModal.tsx
'use client';

import React from 'react';
import { useBusinessStore } from '@/store/useBusinessStore';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CrisisModal() {
  const { crisisEvent, resolveCrisis } = useBusinessStore();

  if (!crisisEvent) return null;

  return (
    <AnimatePresence>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
            <motion.div
                 initial={{ scale: 0.9, y: 20 }}
                 animate={{ scale: 1, y: 0 }}
                 exit={{ scale: 0.9, y: 20 }}
            >
                <Card className="w-full max-w-md border-red-500 shadow-2xl bg-white dark:bg-slate-900">
                    <CardHeader className="bg-red-50 dark:bg-red-950/20 border-b border-red-100 dark:border-red-900/50">
                        <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
                            <AlertTriangle className="h-6 w-6 animate-pulse" />
                            <CardTitle>CRITICAL ALERT: {crisisEvent.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                            {crisisEvent.description}
                        </p>
                        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg text-xs font-mono">
                            Impact Assessment: <span className="text-red-500 font-bold">{crisisEvent.severity.toUpperCase()}</span>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 bg-slate-50 dark:bg-slate-900/50 pt-4">
                        <Button variant="destructive" onClick={resolveCrisis} className="gap-2">
                             <ShieldCheck className="h-4 w-4" />
                             Deploy Agents to Fix
                        </Button>
                    </CardFooter>
                </Card>
            </motion.div>
        </motion.div>
    </AnimatePresence>
  );
}
