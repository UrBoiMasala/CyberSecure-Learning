
import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  role: 'Kid' | 'Adult';
  age: number;
  xp: number;
  level: number;
  streak: number;
  conceptMastery: Record<string, number>;
  progress?: Record<string, { completedQuestions: number; totalQuestions: number; xpEarned: number }>;
  lastActivity: Date;
  preferences: {
    theme: string;
    difficulty: string;
    pace: string;
  };
}

interface UserContextType {
  user: User | null;
  updateUser: (updates: Partial<User>) => void;
  addXP: (amount: number) => void;
  updateConceptMastery: (concept: string, mastery: number) => void;
  updateProgress: (unitId: number, subtopicId: number, completedQuestions: number, totalQuestions: number, xpEarned: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  const addXP = (amount: number) => {
    setUser(prev => {
      if (!prev) return null;
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 100) + 1;
      return { ...prev, xp: newXP, level: newLevel };
    });
  };

  const updateConceptMastery = (concept: string, mastery: number) => {
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        conceptMastery: {
          ...prev.conceptMastery,
          [concept]: mastery
        }
      };
    });
  };

  const updateProgress = (unitId: number, subtopicId: number, completedQuestions: number, totalQuestions: number, xpEarned: number) => {
    setUser(prev => {
      if (!prev) return null;
      const progressKey = `${unitId}_${subtopicId}`;
      return {
        ...prev,
        progress: {
          ...prev.progress,
          [progressKey]: {
            completedQuestions,
            totalQuestions,
            xpEarned
          }
        }
      };
    });
  };

  return (
    <UserContext.Provider value={{ user, updateUser, addXP, updateConceptMastery, updateProgress }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
