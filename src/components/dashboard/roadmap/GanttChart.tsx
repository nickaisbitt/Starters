// src/components/dashboard/roadmap/GanttChart.tsx
'use client';

import React from 'react';
import { Task } from '@/types';
import { addDays, format, differenceInDays, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';

interface GanttChartProps {
  tasks: Task[];
}

export function GanttChart({ tasks }: GanttChartProps) {
  if (tasks.length === 0) return (
    <div className="p-12 text-center border-4 border-dashed border-black/10 rounded-xl">
        <h3 className="text-2xl font-architects text-slate-400">Nothing on the master plan yet...</h3>
    </div>
  );

  // Determine date range based on tasks
  const startDates = tasks.map(t => new Date(t.startDate).getTime());
  const endDates = tasks.map(t => new Date(t.dueDate).getTime());

  const minDate = new Date(Math.min(...startDates));
  const maxDate = new Date(Math.max(...endDates));

  // Pad the range
  const viewStart = startOfWeek(minDate);
  const viewEnd = addDays(endOfWeek(maxDate), 7);

  const days = eachDayOfInterval({ start: viewStart, end: viewEnd });
  const totalDays = days.length;

  return (
    <div className="w-full overflow-x-auto border-2 border-black bg-[url('https://www.transparenttextures.com/patterns/notebook.png')] bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-sm">
      <div className="min-w-[800px]">
        {/* Header: Days */}
        <div className="flex border-b-2 border-black">
          <div className="w-56 shrink-0 p-4 font-bold font-architects text-lg border-r-2 border-black bg-yellow-300 sticky left-0 z-20 shadow-[2px_0px_0px_0px_rgba(0,0,0,0.1)]">
            Mission Objective
          </div>
          <div className="flex-1 flex bg-white/50 backdrop-blur-sm">
            {days.map((day, i) => (
              <div key={i} className="flex-1 min-w-[40px] border-r border-black/10 text-center py-2 relative group">
                <span className="block font-bold font-patrick text-xl leading-none">{format(day, 'd')}</span>
                <span className="block uppercase text-[10px] font-bold text-slate-400 tracking-wider">{format(day, 'EEE')}</span>
                {/* Vertical grid line on hover */}
                <div className="absolute top-full bottom-0 w-full h-[500px] bg-yellow-100/30 opacity-0 group-hover:opacity-100 pointer-events-none z-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Rows: Tasks */}
        <div className="divide-y-2 divide-black/10">
            {tasks.map((task, idx) => {
                const taskStart = new Date(task.startDate);
                const taskEnd = new Date(task.dueDate);

                const offsetDays = differenceInDays(taskStart, viewStart);
                const durationDays = differenceInDays(taskEnd, taskStart) + 1;

                const leftPercent = (offsetDays / totalDays) * 100;
                const widthPercent = (durationDays / totalDays) * 100;

                return (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={task.id}
                        className="flex group hover:bg-yellow-50/50 transition-colors h-20"
                    >
                        <div className="w-56 shrink-0 p-3 border-r-2 border-black bg-white sticky left-0 z-10 flex flex-col justify-center shadow-[2px_0px_0px_0px_rgba(0,0,0,0.05)]">
                            <span className="font-bold font-architects text-lg truncate" title={task.title}>{task.title}</span>
                            <div className="flex items-center gap-2 mt-1">
                                {task.assignedAgentId && (
                                     <div className="relative">
                                         <Avatar className="h-6 w-6 border border-black bg-white">
                                            <AvatarFallback>A</AvatarFallback>
                                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assignedAgentId}`} />
                                        </Avatar>
                                     </div>
                                )}
                                <span className={cn(
                                    "text-xs px-2 py-0.5 rounded-full border border-black font-bold uppercase tracking-wide transform -rotate-2",
                                    task.priority === 'high' ? "bg-red-400 text-white" : "bg-slate-200 text-slate-600"
                                )}>
                                    {task.priority}
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 relative bg-[linear-gradient(90deg,transparent_49%,rgba(0,0,0,0.05)_50%,transparent_51%)] bg-[length:40px_100%]">

                             <motion.div
                                whileHover={{ scale: 1.02 }}
                                className={cn(
                                    "absolute top-5 h-8 rounded-sm border-2 border-black flex items-center px-3 cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all",
                                    task.status === 'done' ? "bg-green-400" :
                                    task.status === 'in-progress' ? "bg-blue-400" :
                                    "bg-white border-dashed text-slate-400"
                                )}
                                style={{
                                    left: `${leftPercent}%`,
                                    width: `${Math.max(widthPercent, 1)}%`
                                }}
                             >
                                <span className="font-patrick font-bold text-black truncate sticky left-0">{task.progress}%</span>
                             </motion.div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
      </div>
    </div>
  );
}
