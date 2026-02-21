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
    crisisEvent,
    processPayroll,
    earnRevenue
  } = useBusinessStore();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const dayCounterRef = useRef(0);

  useEffect(() => {
    if (appMode !== 'simulation') {
        if (intervalRef.current) clearInterval(intervalRef.current);
        return;
    }

    intervalRef.current = setInterval(() => {
        // 1. Agent Logic (Random Activity)
        agents.forEach(agent => {
            if (Math.random() > 0.8) {
                const statuses: any[] = ['working', 'thinking', 'break', 'idle'];
                const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
                updateAgentStatus(agent.id, newStatus);
            }
        });

        // 2. Tycoon Logic (Day Counter)
        dayCounterRef.current += 1;

        // Every 10 ticks (approx 30s) = Pay Day
        if (dayCounterRef.current % 10 === 0) {
            processPayroll();
            toast("Payroll Processed", { description: "Salaries deducted from account." });
        }

        // Random Revenue Event (Small contracts)
        if (Math.random() < 0.1) {
            const amount = Math.floor(Math.random() * 500) + 100;
            earnRevenue(amount, "Micro-transaction");
        }

        // 3. Crisis Event (Random 2% chance)
        if (!crisisEvent && Math.random() < 0.02) {
             triggerCrisis({
                 id: crypto.randomUUID(),
                 title: 'Server Outage',
                 description: 'Main production database is unresponsive. Customers are complaining.',
                 severity: 'high'
             });
        }

    }, 3000); // Tick every 3 seconds

    return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [appMode, agents, crisisEvent, updateAgentStatus, triggerCrisis, processPayroll, earnRevenue]);

  // Achievement Checks (Run whenever tasks change)
  useEffect(() => {
      if (tasks.some(t => t.status === 'done') && !achievements.includes('first_task')) {
          unlockAchievement('first_task');
          toast.success("Achievement Unlocked: Executor!");
          earnRevenue(1000, "Series A Bonus"); // Bonus for first task
      }
       if (agents.length > 1 && !achievements.includes('first_hire')) {
          unlockAchievement('first_hire');
           toast.success("Achievement Unlocked: Team Builder!");
      }
      if (!achievements.includes('incorporation')) {
          unlockAchievement('incorporation');
      }
  }, [tasks, agents, achievements, unlockAchievement, earnRevenue]);

  return null;
}
