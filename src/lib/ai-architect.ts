// src/lib/ai-architect.ts

import { Agent, Department, Task } from '@/types';

// Branson-esque Persona
const RESPONSES = [
  "Alright, mate! That sounds like a bloody brilliant start. But tell me, who are these people actually? Who's the crowd we're serving?",
  "Fantastic. Now, let's talk brass tacks. How are we going to make this thing print money? Where's the treasure chest?",
  "I love the ambition! But what's the 'secret sauce'? Why will they choose us over the boring old guard?",
  "You're speaking my language! I've got enough to sketch out a master plan. Shall we push the button and make some magic happen?"
];

export const simulateArchitectResponse = async (message: string, step: number): Promise<string> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  if (step < RESPONSES.length) {
    return RESPONSES[step];
  }
  return "I'm ready to rock and roll. Let's build this empire!";
};

export const generateBusinessStructure = (industry: string): { departments: Department[], agents: Agent[], tasks: Task[] } => {
  const isTech = industry.toLowerCase().includes('tech') || industry.toLowerCase().includes('saas') || industry.toLowerCase().includes('app');

  const departments: Department[] = [
    {
      id: 'dept-exec',
      name: 'The Cockpit', // Renamed from Executive
      headAgentId: 'agent-ceo',
      responsibilities: ['Big Picture', 'Schmoozing'],
      color: '#fcd34d' // yellow-300
    },
    {
      id: 'dept-prod',
      name: isTech ? 'The Lab' : 'The Kitchen', // Renamed
      headAgentId: 'agent-cto',
      responsibilities: ['Invention', 'Magic'],
      color: '#60a5fa' // blue-400
    },
    {
      id: 'dept-growth',
      name: 'Hype Squad', // Renamed from Growth
      headAgentId: 'agent-cmo',
      responsibilities: ['Noise', 'Virality', 'Parties'],
      color: '#f472b6' // pink-400
    },
     {
      id: 'dept-ops',
      name: 'Engine Room', // Renamed
      headAgentId: 'agent-coo',
      responsibilities: ['Oil & Gears', 'Firefighting'],
      color: '#fb923c' // orange-400
    }
  ];

  const agents: Agent[] = [
    {
      id: 'agent-ceo',
      name: 'Sir Richard',
      role: 'Chief Troublemaker',
      status: 'working',
      currentTask: 'Dreaming big',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Richard&clothing=blazerAndShirt&top=shortHair'
    },
    {
      id: 'agent-cto',
      name: 'Q',
      role: isTech ? 'Mad Scientist' : 'Head Chef',
      status: 'thinking',
      currentTask: 'Breaking things',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Q&accessories=glasses'
    },
    {
      id: 'agent-cmo',
      name: 'Coco',
      role: 'Chief of Vibez',
      status: 'idle',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Coco&top=longHair'
    },
     {
      id: 'agent-coo',
      name: 'Sarge',
      role: 'The Fixer',
      status: 'working',
      currentTask: 'Herding cats',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarge&facialHair=beardLight'
    }
  ];

  const tasks: Task[] = [
    {
      id: 'task-1',
      title: 'Shake Hands & Kiss Babies',
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
      title: 'Build the Prototype',
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
      title: 'Leak a Rumor to Press',
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
