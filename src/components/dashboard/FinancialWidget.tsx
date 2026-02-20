// src/components/dashboard/FinancialWidget.tsx
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBusinessStore } from '@/store/useBusinessStore';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Mock data generation
const generateData = () => {
  const data = [];
  let revenue = 1000;
  for (let i = 0; i < 12; i++) {
    revenue = revenue * (1 + Math.random() * 0.2 - 0.05); // Random growth
    data.push({
      name: `Month ${i + 1}`,
      revenue: Math.floor(revenue),
      expenses: Math.floor(revenue * 0.7),
    });
  }
  return data;
};

export function FinancialWidget() {
  const { appMode } = useBusinessStore();
  const data = React.useMemo(() => generateData(), []);

  if (appMode !== 'simulation') return null;

  return (
    <Card className="col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle>Projected Financials</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
            <Tooltip />
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <Area type="monotone" dataKey="revenue" stroke="#8884d8" fillOpacity={1} fill="url(#colorRevenue)" />
            <Area type="monotone" dataKey="expenses" stroke="#82ca9d" fillOpacity={0.5} fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
