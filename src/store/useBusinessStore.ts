// src/store/useBusinessStore.ts
import { create } from 'zustand';
import { Agent, AppMode, BusinessProfile, Department, Message, OnboardingStep, Task } from '../types';

interface BusinessState {
  // Onboarding
  onboardingStep: OnboardingStep;
  messages: Message[];

  // Core Data
  businessProfile: BusinessProfile;
  departments: Department[];
  agents: Agent[];
  tasks: Task[];

  // UI
  appMode: AppMode;
  isSidebarOpen: boolean;
  theme: 'light' | 'dark';
  systemDate: string; // ISO string
  achievements: string[]; // IDs of unlocked achievements
  crisisEvent: { id: string, title: string, description: string, severity: 'low' | 'medium' | 'high' } | null;

  // Actions
  setAppMode: (mode: AppMode) => void;
  advanceSystemDate: (days: number) => void;
  unlockAchievement: (id: string) => void;
  triggerCrisis: (event: { id: string, title: string, description: string, severity: 'low' | 'medium' | 'high' }) => void;
  resolveCrisis: () => void;
  toggleSidebar: () => void;
  toggleTheme: () => void;
  setOnboardingStep: (step: OnboardingStep) => void;
  addMessage: (role: Message['role'], content: string) => void;
  updateBusinessProfile: (profile: Partial<BusinessProfile>) => void;
  setDepartments: (departments: Department[]) => void;
  setAgents: (agents: Agent[]) => void;
  addAgent: (agent: Agent) => void;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: string, update: Partial<Task>) => void;
  updateAgentStatus: (agentId: string, status: Agent['status']) => void;
}

export const useBusinessStore = create<BusinessState>((set) => ({
  onboardingStep: 'intro',
  messages: [],
  businessProfile: {
    name: '',
    industry: '',
    description: '',
    goals: [],
  },
  departments: [],
  agents: [],
  tasks: [],
  appMode: 'saas',
  isSidebarOpen: true,
  theme: 'light',
  systemDate: new Date().toISOString(),
  achievements: [],
  crisisEvent: null,

  setAppMode: (mode) => set({ appMode: mode }),
  advanceSystemDate: (days) => set((state) => {
    const newDate = new Date(state.systemDate);
    newDate.setDate(newDate.getDate() + days);
    return { systemDate: newDate.toISOString() };
  }),
  unlockAchievement: (id) => set((state) => {
      if (state.achievements.includes(id)) return {};
      return { achievements: [...state.achievements, id] };
  }),
  triggerCrisis: (event) => set({ crisisEvent: event }),
  resolveCrisis: () => set({ crisisEvent: null }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  setOnboardingStep: (step) => set({ onboardingStep: step }),

  addMessage: (role, content) => set((state) => ({
    messages: [
      ...state.messages,
      {
        id: crypto.randomUUID(),
        role,
        content,
        timestamp: Date.now(),
      },
    ],
  })),

  updateBusinessProfile: (profile) => set((state) => ({
    businessProfile: { ...state.businessProfile, ...profile },
  })),

  setDepartments: (departments) => set({ departments }),
  setAgents: (agents) => set({ agents }),
  addAgent: (agent) => set((state) => ({ agents: [...state.agents, agent] })),
  setTasks: (tasks) => set({ tasks }),

  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),

  updateTask: (taskId, update) => set((state) => ({
    tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, ...update } : t)),
  })),

  updateAgentStatus: (agentId, status) => set((state) => ({
    agents: state.agents.map((a) => (a.id === agentId ? { ...a, status } : a)),
  })),
}));
