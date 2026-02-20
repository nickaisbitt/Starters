// src/types/index.ts

export type Role = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
}

export interface BusinessProfile {
  name: string;
  industry: string;
  description: string;
  goals: string[];
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  status: 'idle' | 'working' | 'thinking' | 'break';
  currentTask?: string;
}

export interface Department {
  id: string;
  name: string;
  headAgentId: string;
  responsibilities: string[];
  color: string; // for visualization
}

export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  departmentId: string;
  assignedAgentId?: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high';
  startDate: string; // ISO string
  dueDate: string;   // ISO string
  progress: number; // 0-100
}

export type OnboardingStep = 'intro' | 'interview' | 'analyzing' | 'confirm' | 'generating' | 'complete';

export type AppMode = 'saas' | 'simulation';
