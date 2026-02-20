// src/components/dashboard/org-chart/AgentNode.tsx
'use client';

import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Agent } from '@/types';
import { Zap, Brain, Coffee } from 'lucide-react';

interface AgentNodeProps {
  data: Agent & { isHead?: boolean, color: string, morale: number };
}

export default memo(({ data }: AgentNodeProps) => {
  return (
    <div className={cn(
        "min-w-[200px] rounded-xl border-2 bg-card p-3 shadow-md transition-all hover:shadow-lg",
        data.status === 'working' ? "border-green-500/50" : "border-slate-200 dark:border-slate-800"
    )}>
      {/* Input Handle (Top) - Connects to Boss */}
      {!data.isHead && (
        <Handle type="target" position={Position.Top} className="!bg-slate-400" />
      )}

      <div className="flex items-center gap-3">
        <div className="relative">
            <Avatar className="h-10 w-10 border border-slate-200">
            <AvatarFallback>{data.name.charAt(0)}</AvatarFallback>
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`} />
            </Avatar>
            <span className={cn(
                "absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white text-[10px]",
                data.status === 'working' ? "bg-green-500" :
                data.status === 'thinking' ? "bg-blue-500" :
                "bg-slate-400"
            )}>
               {data.status === 'working' && <Zap className="h-2 w-2 text-white" />}
               {data.status === 'thinking' && <Brain className="h-2 w-2 text-white" />}
               {data.status === 'idle' && <Coffee className="h-2 w-2 text-white" />}
            </span>
        </div>

        <div>
          <h4 className="text-sm font-bold leading-none">{data.name}</h4>
          <p className="text-xs text-muted-foreground">{data.role}</p>
        </div>
      </div>

      {/* Morale Bar (Extra Feature) */}
      <div className="mt-3 space-y-1">
        <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>Morale</span>
            <span>{data.morale}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
                className={cn(
                    "h-full transition-all duration-500",
                    data.morale > 70 ? "bg-green-500" : data.morale > 30 ? "bg-yellow-500" : "bg-red-500"
                )}
                style={{ width: `${data.morale}%` }}
            />
        </div>
      </div>

      {data.currentTask && (
        <div className="mt-3 rounded bg-slate-50 dark:bg-slate-900 p-2 text-[10px] text-muted-foreground">
           <span className="font-semibold block mb-0.5">Current Focus:</span>
           {data.currentTask}
        </div>
      )}

      {/* Output Handle (Bottom) - Connects to Subordinates */}
      <Handle type="source" position={Position.Bottom} className="!bg-slate-400" />
    </div>
  );
});
