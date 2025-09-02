import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

export type SavedJob = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  posted?: string;
  description?: string;
  tags?: string[];
  rating?: number;
  logo?: string;
  featured?: boolean;
};

type SavedJobsContextType = {
  saved: SavedJob[];
  isSaved: (id: string) => boolean;
  saveJob: (job: SavedJob) => void;
  removeJob: (id: string) => void;
  toggleJob: (job: SavedJob) => void;
};

const SavedJobsContext = createContext<SavedJobsContextType | undefined>(undefined);

const STORAGE_KEY = 'saved_jobs';

export function SavedJobsProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<SavedJob[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  }, [saved]);

  const api = useMemo(() => ({
    saved,
    isSaved: (id: string) => saved.some(j => j.id === id),
    saveJob: (job: SavedJob) => setSaved(prev => prev.some(j => j.id === job.id) ? prev : [...prev, job]),
    removeJob: (id: string) => setSaved(prev => prev.filter(j => j.id !== id)),
    toggleJob: (job: SavedJob) => setSaved(prev => prev.some(j => j.id === job.id) ? prev.filter(j => j.id !== job.id) : [...prev, job]),
  }), [saved]);

  return (
    <SavedJobsContext.Provider value={api}>
      {children}
    </SavedJobsContext.Provider>
  );
}

export function useSavedJobs() {
  const ctx = useContext(SavedJobsContext);
  if (!ctx) throw new Error('useSavedJobs must be used within SavedJobsProvider');
  return ctx;
}
