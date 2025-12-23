
export interface Exercise {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface UserProgress {
  completedIds: string[];
  lastCompletedId: string | null;
}
