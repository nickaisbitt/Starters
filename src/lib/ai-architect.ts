// src/lib/ai-architect.ts

import { Agent, Department, Task } from '@/types';

const RESPONSES = [
  "That's an interesting concept. Can you tell me more about your target audience?",
  "Understood. What are the key revenue streams you envision?",
  "Great. And what is your unfair advantage in this market?",
  "Excellent. I have enough information to incorporate your digital entity. Shall we proceed?"
];

export const simulateArchitectResponse = async (message: string, step: number): Promise<string> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  if (step < RESPONSES.length) {
    return RESPONSES[step];
  }
  return "I'm ready to build your organization.";
};

export const generateBusinessStructure = (industry: string): { departments: Department[], agents: Agent[], tasks: Task[] } => {
  const isTech = industry.toLowerCase().includes('tech') || industry.toLowerCase().includes('saas') || industry.toLowerCase().includes('app');

  const departments: Department[] = [
    {
      id: 'dept-exec',
      name: 'Executive',
      headAgentId: 'agent-ceo',
      responsibilities: ['Strategy', 'Fundraising'],
      color: '#cbd5e1'
    },
    {
      id: 'dept-prod',
      name: isTech ? 'Product & Engineering' : 'Product',
      headAgentId: 'agent-cto',
      responsibilities: ['Development', 'QA'],
      color: '#3b82f6'
    },
    {
      id: 'dept-growth',
      name: 'Growth & Marketing',
      headAgentId: 'agent-cmo',
      responsibilities: ['Ads', 'Content', 'Social'],
      color: '#10b981'
    },
     {
      id: 'dept-ops',
      name: 'Operations',
      headAgentId: 'agent-coo',
      responsibilities: ['Logistics', 'Support'],
      color: '#f59e0b'
    }
  ];

  const agents: Agent[] = [
    {
      id: 'agent-ceo',
      name: 'Chief of Staff',
      role: 'CEO',
      status: 'working',
      currentTask: 'Reviewing quarterly goals'
    },
    {
      id: 'agent-cto',
      name: 'Devin',
      role: isTech ? 'CTO' : 'Head of Product',
      status: 'thinking',
      currentTask: 'Architecting system core'
    },
    {
      id: 'agent-cmo',
      name: 'Sarah',
      role: 'CMO',
      status: 'idle',
    },
     {
      id: 'agent-coo',
      name: 'Marcus',
      role: 'COO',
      status: 'working',
      currentTask: 'Optimizing supply chain'
    }
  ];

  const tasks: Task[] = [
    {
      id: 'task-1',
      title: 'Incorporate Company',
      departmentId: 'dept-exec',
      assignedAgentId: 'agent-ceo',
      status: 'done',
      priority: 'high',
      startDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + 86400000).toISOString(),
      progress: 100
    },
    {
      id: 'task-2',
      title: 'Define MVP Scope',
      departmentId: 'dept-prod',
      assignedAgentId: 'agent-cto',
      status: 'in-progress',
      priority: 'high',
      startDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + 86400000 * 3).toISOString(),
      progress: 30
    },
    {
      id: 'task-3',
      title: 'Setup Social Media Handles',
      departmentId: 'dept-growth',
      assignedAgentId: 'agent-cmo',
      status: 'todo',
      priority: 'medium',
      startDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
      progress: 0
    }
  ];

  return { departments, agents, tasks };
};
