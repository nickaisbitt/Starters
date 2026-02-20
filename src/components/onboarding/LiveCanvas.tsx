'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useBusinessStore } from '@/store/useBusinessStore';
import { Building2, Rocket, Target, Users, Zap, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

export function LiveCanvas() {
  const { businessProfile, onboardingStep } = useBusinessStore();

  return (
    <Card className="h-[600px] w-full max-w-md doodle-card bg-white dark:bg-zinc-900 border-4 border-black -rotate-1 hover:rotate-0 transition-transform shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <CardHeader className="pb-4 border-b-2 border-dashed border-black bg-yellow-100 dark:bg-zinc-800">
        <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-architects font-black flex items-center gap-2 text-black dark:text-white uppercase tracking-wider">
            <Zap className="h-6 w-6 text-black fill-yellow-400" />
            The Master Plan
            </CardTitle>
            <Badge variant={onboardingStep === 'generating' ? 'secondary' : 'outline'} className="animate-pulse font-patrick">
                {onboardingStep === 'generating' ? 'COOKING...' : 'SKETCHING'}
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-8 font-patrick bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]">

        {/* Company Identity */}
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-2"
        >
            <div className="flex items-center gap-2 text-lg font-bold text-black uppercase decoration-wavy underline decoration-yellow-400">
                <Building2 className="h-5 w-5" />
                <span>The Name</span>
            </div>
            <div className="p-4 bg-white dark:bg-zinc-800 rounded-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] flex items-center transform -rotate-1">
                {businessProfile.name ? (
                    <span className="text-2xl font-architects font-bold text-black dark:text-white">{businessProfile.name}</span>
                ) : (
                    <span className="text-lg text-slate-400 italic">Waiting for inspiration...</span>
                )}
            </div>
        </motion.div>

        {/* Industry */}
        <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
             className="space-y-2"
        >
            <div className="flex items-center gap-2 text-lg font-bold text-black uppercase decoration-wavy underline decoration-green-400">
                <Rocket className="h-5 w-5" />
                <span>The Mission Field</span>
            </div>
            <div className="p-4 bg-white dark:bg-zinc-800 rounded-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] flex items-center transform rotate-1">
                {businessProfile.industry ? (
                    <Badge className="bg-blue-400 text-black border-2 border-black text-lg px-4 py-1 rotate-2 shadow-sm">
                        {businessProfile.industry}
                    </Badge>
                ) : (
                    <span className="text-lg text-slate-400 italic">Scanning the horizon...</span>
                )}
            </div>
        </motion.div>

        {/* DNA / Goals */}
        <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.3 }}
             className="space-y-2"
        >
             <div className="flex items-center gap-2 text-lg font-bold text-black uppercase decoration-wavy underline decoration-pink-400">
                <Target className="h-5 w-5" />
                <span>The "Why"</span>
            </div>
             <div className="p-4 bg-white dark:bg-zinc-800 rounded-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] min-h-[8rem] relative">
                {/* Paper lines background */}
                <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(transparent_23px,#000_24px)] bg-[length:100%_24px]" />

                {businessProfile.goals.length > 0 ? (
                    <ul className="list-disc list-inside space-y-2 relative z-10">
                        {businessProfile.goals.map((goal, i) => (
                            <li key={i} className="text-lg text-black dark:text-white marker:text-yellow-500">{goal}</li>
                        ))}
                    </ul>
                ) : (
                     <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center space-y-2">
                        <Lightbulb className="h-10 w-10 opacity-20 animate-pulse text-yellow-500" />
                        <span className="italic">The Architect is connecting the dots...</span>
                     </div>
                )}
            </div>
        </motion.div>

        {/* Visualization of processing */}
        {onboardingStep === 'generating' && (
             <div className="mt-8 space-y-2">
                <div className="flex justify-between text-sm font-bold text-black uppercase">
                    <span>Sketching Org Chart...</span>
                    <span>88%</span>
                </div>
                <div className="h-4 w-full bg-white border-2 border-black rounded-full overflow-hidden p-0.5">
                    <div className="h-full bg-black rounded-full animate-[width_2s_ease-in-out_infinite] w-[70%]" />
                </div>
                <p className="text-sm text-slate-500 font-architects text-center pt-2 italic">"Hire slow, fire fast!" - Someone Smart</p>
             </div>
        )}

      </CardContent>
    </Card>
  );
}
