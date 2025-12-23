
import { UserProgress } from '../types';

const STORAGE_KEY = 'dicken_handball_progress';

export const saveProgress = (progress: UserProgress) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

export const loadProgress = (): UserProgress => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return { completedIds: [], lastCompletedId: null };
  try {
    return JSON.parse(data);
  } catch {
    return { completedIds: [], lastCompletedId: null };
  }
};

export const clearProgress = () => {
  localStorage.removeItem(STORAGE_KEY);
};
