// src/components/dashboard/FinancialWidget.tsx
'use client';

import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBusinessStore } from '@/store/useBusinessStore';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export function FinancialWidget() {
  const { transactionHistory, cash } = useBusinessStore();

  const data = useMemo(() => {
    // Start with 50,000 baseline
    let runningBalance = 50000;

    if (transactionHistory.length === 0) {
        return [{ name: 'Day 0', balance: 50000 }];
    }

    // Sort by date (oldest first)
    // Assuming transactionHistory is already ordered or we can rely on index
    // We map transactions to a point in time.

    const history = transactionHistory.map((t, i) => {
        runningBalance += t.amount;
        return {
            name: `Tx ${i+1}`,
            balance: runningBalance,
            change: t.amount,
            description: t.description
        };
    });

    // Just show last 20
    return history.slice(-20);
  }, [transactionHistory]);

  return (
    <Card className="col-span-4 lg:col-span-3 doodle-card -rotate-1 hover:rotate-0 transition-transform bg-white">
      <div className="p-4 border-b-2 border-black border-dashed bg-green-50 flex justify-between items-center">
        <div>
            <h3 className="text-xl font-architects font-bold uppercase tracking-wider">The Vault</h3>
            <p className="text-xs font-patrick text-slate-500">Live Balance</p>
        </div>
        <div className={`text-3xl font-patrick font-black ${cash > 10000 ? 'text-green-600' : 'text-red-600'}`}>
            ${cash.toLocaleString()}
        </div>
      </div>
      <CardContent className="h-[250px] p-4 font-patrick text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#84cc16" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#84cc16" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" hide />
            <YAxis
                width={40}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value/1000}k`}
                fontFamily="Patrick Hand"
            />
            <Tooltip
                contentStyle={{
                    fontFamily: 'Patrick Hand',
                    border: '2px solid black',
                    borderRadius: '4px',
                    boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
                    fontSize: '14px'
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Balance']}
            />
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#000" opacity={0.1} />
            <Area
                type="monotone"
                dataKey="balance"
                stroke="#000"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorBalance)"
                animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
