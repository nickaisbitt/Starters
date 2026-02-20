// src/components/dashboard/Achievements.tsx
'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useBusinessStore } from '@/store/useBusinessStore';
import { Trophy, Medal, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

const ACHIEVEMENTS = [
  { id: 'incorporation', title: 'Inc. Maker', description: 'Incorporated the business', icon: Trophy },
  { id: 'first_hire', title: 'Team Builder', description: 'Hired your first agent', icon: Medal },
  { id: 'first_task', title: 'Executor', description: 'Completed the first task', icon: Crown },
];

export function AchievementsWidget() {
  const { achievements } = useBusinessStore();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Milestones</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {ACHIEVEMENTS.map(ach => {
          const unlocked = achievements.includes(ach.id);
          const Icon = ach.icon;
          return (
            <div key={ach.id} className={cn("flex items-center gap-3 p-2 rounded-lg transition-all", unlocked ? "bg-indigo-50 dark:bg-indigo-900/20" : "opacity-50 grayscale")}>
               <div className={cn("p-2 rounded-full", unlocked ? "bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-300" : "bg-slate-100 text-slate-400")}>
                  <Icon className="h-4 w-4" />
               </div>
               <div>
                  <div className="text-sm font-semibold">{ach.title}</div>
                  <div className="text-xs text-muted-foreground">{ach.description}</div>
               </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
