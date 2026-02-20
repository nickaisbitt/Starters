'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useBusinessStore } from '@/store/useBusinessStore';
import { Building2, Rocket, Target, Users, Zap } from 'lucide-react';

export function LiveCanvas() {
  const { businessProfile, onboardingStep } = useBusinessStore();

  return (
    <Card className="h-[600px] w-full max-w-md border-indigo-100 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 shadow-lg">
      <CardHeader className="pb-4 border-b border-indigo-50/50">
        <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2 text-indigo-900 dark:text-indigo-100">
            <Zap className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            Live Manifest
            </CardTitle>
            <Badge variant={onboardingStep === 'generating' ? 'secondary' : 'outline'} className="animate-pulse">
                {onboardingStep === 'generating' ? 'INCORPORATING...' : 'LISTENING'}
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">

        {/* Company Identity */}
        <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                <Building2 className="h-4 w-4" />
                <span>Entity Name</span>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm min-h-[3rem] flex items-center">
                {businessProfile.name ? (
                    <span className="text-lg font-bold text-slate-900 dark:text-slate-100">{businessProfile.name}</span>
                ) : (
                    <span className="text-sm text-slate-400 italic">Waiting for input...</span>
                )}
            </div>
        </div>

        {/* Industry */}
        <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                <Rocket className="h-4 w-4" />
                <span>Industry Sector</span>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm min-h-[3rem] flex items-center">
                {businessProfile.industry ? (
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200">
                        {businessProfile.industry}
                    </Badge>
                ) : (
                    <span className="text-sm text-slate-400 italic">Analyzing context...</span>
                )}
            </div>
        </div>

        {/* DNA / Goals */}
        <div className="space-y-2">
             <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                <Target className="h-4 w-4" />
                <span>Core Objectives</span>
            </div>
             <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm min-h-[8rem]">
                {businessProfile.goals.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                        {businessProfile.goals.map((goal, i) => (
                            <li key={i} className="text-sm text-slate-700 dark:text-slate-300">{goal}</li>
                        ))}
                    </ul>
                ) : (
                     <div className="h-full flex flex-col items-center justify-center text-slate-400 text-xs text-center space-y-2">
                        <Users className="h-8 w-8 opacity-20" />
                        <span>The Architect is identifying your strategic goals based on conversation patterns.</span>
                     </div>
                )}
            </div>
        </div>

        {/* Visualization of processing */}
        {onboardingStep === 'generating' && (
             <div className="mt-8 space-y-2">
                <div className="flex justify-between text-xs font-semibold text-indigo-600">
                    <span>Generating Corporate Structure</span>
                    <span>72%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 animate-[width_2s_ease-in-out_infinite] w-[70%]" />
                </div>
                <p className="text-xs text-slate-400 text-center pt-2">Creating departments: Marketing, Sales, Product...</p>
             </div>
        )}

      </CardContent>
    </Card>
  );
}
