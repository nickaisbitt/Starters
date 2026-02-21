// src/app/dashboard/agents/page.tsx
'use client';

import React from 'react';
import { useBusinessStore } from '@/store/useBusinessStore';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';

export default function AgentsPage() {
  const { agents, transactionHistory } = useBusinessStore();

  // Mock some chatter based on recent transactions or random thoughts
  const chatter = [
    { agentId: agents[0]?.id, message: "Just reviewed the quarterly targets. Looking ambitious!", time: Date.now() - 1000 * 60 * 5 },
    { agentId: agents[1]?.id, message: "Deploying the new feature to staging. Fingers crossed.", time: Date.now() - 1000 * 60 * 15 },
    { agentId: agents[0]?.id, message: "Who ate the last donut in the breakroom?", time: Date.now() - 1000 * 60 * 60 },
    { agentId: agents[2]?.id, message: "Launch campaign is trending on Twitter! #Viral", time: Date.now() - 1000 * 60 * 120 },
  ].filter(c => c.agentId);

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-black font-architects uppercase tracking-wider">Water Cooler</h1>
            <p className="text-slate-500 font-patrick">Eavesdrop on your digital workforce.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 h-full">
        {/* Active Agents List */}
        <Card className="doodle-card bg-white rotate-1">
            <div className="p-4 border-b-2 border-black bg-yellow-100 font-bold font-architects uppercase">
                Online Staff
            </div>
            <CardContent className="p-0">
                <ScrollArea className="h-[400px]">
                    <div className="divide-y-2 divide-black/10">
                        {agents.map(agent => (
                            <div key={agent.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
                                <div className="relative">
                                    <Avatar className="h-10 w-10 border-2 border-black bg-white">
                                        <AvatarFallback>{agent.name[0]}</AvatarFallback>
                                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${agent.name}`} />
                                    </Avatar>
                                    <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${agent.status === 'working' ? 'bg-green-500' : 'bg-slate-300'}`} />
                                </div>
                                <div>
                                    <h3 className="font-bold font-architects">{agent.name}</h3>
                                    <p className="text-xs text-slate-500 font-patrick uppercase">{agent.role} • {agent.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>

        {/* Chatter Feed */}
        <Card className="doodle-card bg-white -rotate-1">
            <div className="p-4 border-b-2 border-black bg-blue-100 font-bold font-architects uppercase">
                #general Channel
            </div>
             <CardContent className="p-4 bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]">
                <div className="space-y-6">
                    {chatter.map((msg, i) => {
                        const agent = agents.find(a => a.id === msg.agentId);
                        if (!agent) return null;
                        return (
                            <div key={i} className="flex gap-3 items-start">
                                <Avatar className="h-8 w-8 border border-black mt-1">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${agent.name}`} />
                                </Avatar>
                                <div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="font-bold font-architects">{agent.name}</span>
                                        <span className="text-[10px] text-slate-400 font-mono">{formatDistanceToNow(msg.time)} ago</span>
                                    </div>
                                    <div className="bg-white border border-black/20 rounded-tr-xl rounded-br-xl rounded-bl-xl p-2 text-sm font-patrick shadow-sm mt-1">
                                        {msg.message}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                     <div className="text-center text-xs text-slate-400 italic pt-4">
                        -- End of encrypted transmission --
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
