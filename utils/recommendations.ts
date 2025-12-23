
import { Exercise, UserProgress } from '../types';
import { EXERCISES } from '../constants';

export const getRecommendations = (progress: UserProgress): Exercise[] => {
  const incomplete = EXERCISES.filter(ex => !progress.completedIds.includes(ex.id));
  
  if (incomplete.length === 0) return [];

  // Find category of last completed exercise
  const lastExercise = EXERCISES.find(ex => ex.id === progress.lastCompletedId);
  const lastCategoryId = lastExercise?.categoryId;

  // Prioritize different categories
  let candidates = incomplete.filter(ex => ex.categoryId !== lastCategoryId);
  
  // If we don't have enough from other categories, use any incomplete
  if (candidates.length < 2) {
    const remainingIncomplete = incomplete.filter(ex => !candidates.includes(ex));
    candidates = [...candidates, ...remainingIncomplete];
  }

  // Shuffle slightly or just take the first two
  return candidates.slice(0, 2);
};
