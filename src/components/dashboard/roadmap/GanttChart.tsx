// src/components/dashboard/roadmap/GanttChart.tsx
'use client';

import React from 'react';
import { Task } from '@/types';
import { addDays, format, differenceInDays, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface GanttChartProps {
  tasks: Task[];
}

export function GanttChart({ tasks }: GanttChartProps) {
  if (tasks.length === 0) return <div className="p-8 text-center text-muted-foreground">No tasks scheduled.</div>;

  // Determine date range based on tasks
  const startDates = tasks.map(t => new Date(t.startDate).getTime());
  const endDates = tasks.map(t => new Date(t.dueDate).getTime());

  const minDate = new Date(Math.min(...startDates));
  const maxDate = new Date(Math.max(...endDates));

  // Pad the range
  const viewStart = startOfWeek(minDate);
  const viewEnd = addDays(endOfWeek(maxDate), 7); // Add a week buffer

  const days = eachDayOfInterval({ start: viewStart, end: viewEnd });
  const totalDays = days.length;

  return (
    <div className="w-full overflow-x-auto border rounded-xl bg-card shadow-sm">
      <div className="min-w-[800px]">
        {/* Header: Days */}
        <div className="flex border-b">
          <div className="w-48 shrink-0 p-4 font-semibold border-r bg-muted/30 sticky left-0 z-10">Task Name</div>
          <div className="flex-1 flex">
            {days.map((day, i) => (
              <div key={i} className="flex-1 min-w-[40px] border-r text-center text-[10px] py-2 text-muted-foreground">
                <span className="block font-bold">{format(day, 'd')}</span>
                <span className="block uppercase">{format(day, 'EEE')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rows: Tasks */}
        <div className="divide-y">
            {tasks.map(task => {
                const taskStart = new Date(task.startDate);
                const taskEnd = new Date(task.dueDate);

                // Calculate position and width
                const offsetDays = differenceInDays(taskStart, viewStart);
                const durationDays = differenceInDays(taskEnd, taskStart) + 1; // +1 to include end day

                const leftPercent = (offsetDays / totalDays) * 100;
                const widthPercent = (durationDays / totalDays) * 100;

                return (
                    <div key={task.id} className="flex group hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                        <div className="w-48 shrink-0 p-3 border-r bg-background sticky left-0 z-10 flex flex-col justify-center">
                            <span className="font-medium text-sm truncate" title={task.title}>{task.title}</span>
                            <div className="flex items-center gap-2 mt-1">
                                {task.assignedAgentId && (
                                     <Avatar className="h-4 w-4">
                                        <AvatarFallback>A</AvatarFallback>
                                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assignedAgentId}`} />
                                    </Avatar>
                                )}
                                <span className={cn(
                                    "text-[10px] px-1.5 py-0.5 rounded-full capitalize",
                                    task.priority === 'high' ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-600"
                                )}>
                                    {task.priority}
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 relative h-16 bg-grid-slate-100 dark:bg-grid-slate-800/50">
                             {/* Background Grid Lines (Optional - hard to align perfectly with flex header, using absolute lines could work) */}
                             {/* Actually easier to just map days again for grid lines if needed, or rely on header alignment */}

                             <div
                                className={cn(
                                    "absolute top-3 bottom-3 rounded-md shadow-sm border border-white/20 flex items-center px-2 cursor-pointer hover:brightness-110 transition-all",
                                    task.status === 'done' ? "bg-slate-400" :
                                    task.status === 'in-progress' ? "bg-indigo-500" :
                                    "bg-blue-400"
                                )}
                                style={{
                                    left: `${leftPercent}%`,
                                    width: `${Math.max(widthPercent, 1)}%` // Ensure at least 1% visibility
                                }}
                             >
                                <span className="text-[10px] font-bold text-white truncate sticky left-0">{task.progress}%</span>
                             </div>
                        </div>
                    </div>
                );
            })}
        </div>
      </div>
    </div>
  );
}
