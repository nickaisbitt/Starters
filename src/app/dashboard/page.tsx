// src/app/dashboard/page.tsx
'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useBusinessStore } from '@/store/useBusinessStore';
import { Button } from '@/components/ui/button';
import { Activity, DollarSign, Users, Target, Zap } from 'lucide-react';
import { FinancialWidget } from '@/components/dashboard/FinancialWidget';
import { AchievementsWidget } from '@/components/dashboard/AchievementsWidget';

export default function DashboardPage() {
  const { businessProfile, agents, tasks, appMode, setAppMode } = useBusinessStore();

  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const activeAgents = agents.filter(a => a.status === 'working').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Headquarters</h1>
            <p className="text-muted-foreground">Overview for {businessProfile.name || 'Your Enterprise'}</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
             <Button
                variant="ghost"
                size="sm"
                onClick={() => setAppMode('saas')}
                className={appMode === 'saas' ? 'bg-white shadow-sm text-foreground dark:bg-slate-700' : 'text-muted-foreground'}
             >
                SaaS View
             </Button>
             <Button
                variant="ghost"
                size="sm"
                onClick={() => setAppMode('simulation')}
                 className={appMode === 'simulation' ? 'bg-white shadow-sm text-foreground dark:bg-slate-700' : 'text-muted-foreground'}
             >
                <Zap className="h-3 w-3 mr-1 text-yellow-500 fill-yellow-500" />
                Sim Mode
             </Button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.00</div>
            <p className="text-xs text-muted-foreground">+0% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAgents}</div>
            <p className="text-xs text-muted-foreground">/ {agents.length} deployed units</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks}</div>
            <p className="text-xs text-muted-foreground">Process efficiency: 100%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">98%</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>
      </div>

      {/* Simulation Widgets */}
      {appMode === 'simulation' ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <FinancialWidget />
            <div className="col-span-4 lg:col-span-4 grid gap-4">
                <AchievementsWidget />
            </div>
        </div>
      ) : (
         <div className="grid gap-4">
             <AchievementsWidget />
         </div>
      )}

      {/* Main Content Area Placeholder */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                {tasks.slice(0, 5).map(task => (
                    <div key={task.id} className="flex items-center">
                        <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">{task.title}</p>
                            <p className="text-sm text-muted-foreground">
                                {task.status === 'done' ? 'Completed' : 'Pending'} • Priority: {task.priority}
                            </p>
                        </div>
                        <div className="ml-auto font-medium text-xs">
                            {task.assignedAgentId ? 'Assigned' : 'Unassigned'}
                        </div>
                    </div>
                ))}
                {tasks.length === 0 && (
                    <p className="text-sm text-muted-foreground">No recent activity recorded.</p>
                )}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Department Status</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                {agents.slice(0, 4).map(agent => (
                    <div key={agent.id} className="flex items-center justify-between text-sm">
                        <span>{agent.name} ({agent.role})</span>
                        <span className={agent.status === 'working' ? 'text-green-500' : 'text-slate-400'}>{agent.status}</span>
                    </div>
                ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
