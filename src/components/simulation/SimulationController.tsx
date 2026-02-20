// src/components/simulation/SimulationController.tsx
'use client';

import { useEffect, useRef } from 'react';
import { useBusinessStore } from '@/store/useBusinessStore';
import { toast } from 'sonner';

export function SimulationController() {
  const {
    appMode,
    tasks,
    agents,
    achievements,
    unlockAchievement,
    updateAgentStatus,
    triggerCrisis,
    crisisEvent
  } = useBusinessStore();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (appMode !== 'simulation') {
        if (intervalRef.current) clearInterval(intervalRef.current);
        return;
    }

    intervalRef.current = setInterval(() => {
        // 1. Agent Logic
        agents.forEach(agent => {
            if (Math.random() > 0.8) {
                const statuses: any[] = ['working', 'thinking', 'break', 'idle'];
                const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
                updateAgentStatus(agent.id, newStatus);
            }
        });

        // 2. Crisis Event (Random 5% chance)
        if (!crisisEvent && Math.random() < 0.05) {
             triggerCrisis({
                 id: crypto.randomUUID(),
                 title: 'Server Outage',
                 description: 'Main production database is unresponsive. Customers are complaining.',
                 severity: 'high'
             });
        }

    }, 3000);

    return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [appMode, agents, crisisEvent, updateAgentStatus, triggerCrisis]);

  // Achievement Checks (Run whenever tasks change)
  useEffect(() => {
      if (tasks.some(t => t.status === 'done') && !achievements.includes('first_task')) {
          unlockAchievement('first_task');
          toast.success("Achievement Unlocked: Executor!");
      }
       if (agents.length > 1 && !achievements.includes('first_hire')) { // >1 because CEO is agent 0
          unlockAchievement('first_hire');
           toast.success("Achievement Unlocked: Team Builder!");
      }
      if (!achievements.includes('incorporation')) {
          unlockAchievement('incorporation');
      }
  }, [tasks, agents, achievements, unlockAchievement]);

  return null;
}
