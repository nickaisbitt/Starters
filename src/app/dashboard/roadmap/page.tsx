// src/app/dashboard/roadmap/page.tsx
'use client';

import React from 'react';
import { useBusinessStore } from '@/store/useBusinessStore';
import { GanttChart } from '@/components/dashboard/roadmap/GanttChart';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Download, FastForward, Play, Pause, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function RoadmapPage() {
  const { tasks, systemDate, advanceSystemDate, updateTask } = useBusinessStore();

  const handleTimeWarp = () => {
    // Advance time by 3 days
    advanceSystemDate(3);

    // Simulate progress on in-progress tasks
    tasks.forEach(task => {
        if (task.status === 'in-progress') {
            const newProgress = Math.min(task.progress + Math.floor(Math.random() * 20) + 10, 100);
            updateTask(task.id, {
                progress: newProgress,
                status: newProgress === 100 ? 'done' : 'in-progress'
            });
        } else if (task.status === 'todo' && new Date(task.startDate) <= new Date(systemDate)) {
             updateTask(task.id, { status: 'in-progress', progress: 10 });
        }
    });
  };

  const handleExportPlan = () => {
    const plan = {
        generatedAt: new Date().toISOString(),
        tasks: tasks,
        systemDate: systemDate
    };

    const blob = new Blob([JSON.stringify(plan, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'business_roadmap.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Strategy Map</h1>
            <div className="flex items-center gap-2 text-muted-foreground mt-1">
                 <Calendar className="h-4 w-4" />
                 <span>Current System Date: {format(new Date(systemDate), 'MMMM do, yyyy')}</span>
            </div>
        </div>

        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExportPlan}>
                <Download className="mr-2 h-4 w-4" />
                Export Plan
            </Button>
            <Button
                variant="default"
                size="sm"
                onClick={handleTimeWarp}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0"
            >
                <FastForward className="mr-2 h-4 w-4" />
                Time Warp (+3 Days)
            </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Execution Timeline</CardTitle>
        </CardHeader>
        <CardContent>
             <GanttChart tasks={tasks} />
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground justify-end px-4">
          <div className="flex items-center gap-1"><div className="w-3 h-3 bg-slate-400 rounded-sm" /> Done</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 bg-indigo-500 rounded-sm" /> In Progress</div>
          <div className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-400 rounded-sm" /> Planned</div>
      </div>
    </div>
  );
}
