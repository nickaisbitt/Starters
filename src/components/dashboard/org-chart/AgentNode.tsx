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
        "min-w-[220px] rounded-sm border-2 border-black bg-white p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:rotate-1 relative overflow-visible",
        data.status === 'working' ? "bg-yellow-50" : "bg-white"
    )}>
      {/* Tape Effect */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-200/80 rotate-2 border border-yellow-300 shadow-sm z-10" />

      {/* Input Handle (Top) */}
      {!data.isHead && (
        <Handle type="target" position={Position.Top} className="!bg-black !w-3 !h-3 !border-2 !border-white" />
      )}

      <div className="flex items-center gap-3">
        <div className="relative group">
            <Avatar className="h-12 w-12 border-2 border-black bg-white shadow-sm group-hover:scale-110 transition-transform">
                <AvatarFallback className="font-architects font-bold">{data.name.charAt(0)}</AvatarFallback>
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`} />
            </Avatar>
            <span className={cn(
                "absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-black text-[10px] animate-bounce",
                data.status === 'working' ? "bg-green-400" :
                data.status === 'thinking' ? "bg-blue-400" :
                "bg-slate-300"
            )}>
               {data.status === 'working' && <Zap className="h-3 w-3 text-black fill-white" />}
               {data.status === 'thinking' && <Brain className="h-3 w-3 text-black fill-white" />}
               {data.status === 'idle' && <Coffee className="h-3 w-3 text-black fill-white" />}
            </span>
        </div>

        <div>
          <h4 className="text-lg font-architects font-bold leading-none">{data.name}</h4>
          <p className="text-sm font-patrick text-slate-500 uppercase tracking-wide">{data.role}</p>
        </div>
      </div>

      {/* Morale Bar (Sketchy) */}
      <div className="mt-4 space-y-1 font-patrick">
        <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
            <span>Vibes</span>
            <span>{data.morale}%</span>
        </div>
        <div className="h-3 w-full border-2 border-black rounded-full p-0.5 bg-white">
            <div
                className={cn(
                    "h-full rounded-full border border-black transition-all duration-500 relative overflow-hidden",
                    data.morale > 70 ? "bg-green-400" : data.morale > 30 ? "bg-yellow-400" : "bg-red-400"
                )}
                style={{ width: `${data.morale}%` }}
            >
                {/* Stripe pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.2)_50%,rgba(255,255,255,.2)_75%,transparent_75%,transparent)] bg-[length:10px_10px]" />
            </div>
        </div>
      </div>

      {data.currentTask && (
        <div className="mt-3 rounded-sm border border-black border-dashed bg-white p-2 text-xs font-patrick relative">
           <span className="font-bold uppercase block mb-0.5 text-slate-400 text-[10px]">Mission:</span>
           "{data.currentTask}"
        </div>
      )}

      {/* Output Handle (Bottom) */}
      <Handle type="source" position={Position.Bottom} className="!bg-black !w-3 !h-3 !border-2 !border-white" />
    </div>
  );
});
