'use client';

export interface LessonProgress {
  lessonId: string;
  sentencesCompleted: number;
  reorderScore: number;
  fillBlankScore: number;
  collocationScore: number;
  completedAt?: string;
}

export interface UserProgress {
  lessons: Record<string, LessonProgress>;
  totalXP: number;
  streak: number;
  lastActivity?: string;
}

const STORAGE_KEY = 'learn-malay-progress';

export function getProgress(): UserProgress {
  if (typeof window === 'undefined') {
    return { lessons: {}, totalXP: 0, streak: 0 };
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return { lessons: {}, totalXP: 0, streak: 0 };
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function updateLessonProgress(
  lessonId: string,
  field: keyof Omit<LessonProgress, 'lessonId' | 'completedAt'>,
  value: number
): UserProgress {
  const progress = getProgress();
  if (!progress.lessons[lessonId]) {
    progress.lessons[lessonId] = {
      lessonId,
      sentencesCompleted: 0,
      reorderScore: 0,
      fillBlankScore: 0,
      collocationScore: 0,
    };
  }
  const prev = progress.lessons[lessonId][field] as number;
  if (value > prev) {
    const diff = value - prev;
    progress.lessons[lessonId][field] = value;
    progress.totalXP += diff * 10;
  }
  progress.lastActivity = new Date().toISOString();
  saveProgress(progress);
  return progress;
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
