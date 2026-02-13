'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProgress, resetProgress, type UserProgress } from '@/lib/progress';
import { lessons } from '@/data/lessons';

export default function ProgressPage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetProgress();
      setProgress({ lessons: {}, totalXP: 0, streak: 0 });
    }
  };

  if (!progress) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">Loading progress...</p>
      </div>
    );
  }

  const completedLessons = Object.keys(progress.lessons).length;
  const totalScore = Object.values(progress.lessons).reduce(
    (sum, lp) => sum + lp.reorderScore + lp.fillBlankScore + lp.collocationScore,
    0
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">📊 Your Progress</h1>
        <p className="text-gray-600 text-lg">Track your Malay learning journey</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCard icon="⭐" label="Total XP" value={progress.totalXP} color="emerald" />
        <StatCard icon="📚" label="Lessons Started" value={completedLessons} color="blue" />
        <StatCard icon="🎯" label="Total Score" value={totalScore} color="amber" />
        <StatCard icon="🔥" label="Activities" value={Object.values(progress.lessons).filter(l => l.reorderScore > 0 || l.fillBlankScore > 0 || l.collocationScore > 0).length * 3} color="red" />
      </div>

      {/* Per-Lesson Progress */}
      <div className="space-y-4 mb-10">
        <h2 className="text-2xl font-bold text-gray-800">Lesson Progress</h2>
        {lessons.map(lesson => {
          const lp = progress.lessons[lesson.id];
          const maxReorder = lesson.sentences.length;
          const maxFill = lesson.fillBlanks.length;
          const maxCollocation = lesson.collocations.length > 0 ? lesson.collocations[0].malay.length : 0;
          const totalMax = maxReorder + maxFill + maxCollocation;
          const totalAchieved = lp ? lp.reorderScore + lp.fillBlankScore + lp.collocationScore : 0;
          const percentage = totalMax > 0 ? Math.round((totalAchieved / totalMax) * 100) : 0;

          return (
            <div key={lesson.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-800">{lesson.title}</h3>
                  <p className="text-sm text-emerald-600">{lesson.titleMalay}</p>
                </div>
                <Link
                  href={`/lessons/${lesson.id}`}
                  className="text-sm text-emerald-600 hover:text-emerald-800 font-medium"
                >
                  {lp ? 'Continue →' : 'Start →'}
                </Link>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                <div
                  className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex gap-4">
                  <span>🔀 Reorder: {lp?.reorderScore ?? 0}/{maxReorder}</span>
                  <span>✏️ Fill: {lp?.fillBlankScore ?? 0}/{maxFill}</span>
                  <span>🔗 Match: {lp?.collocationScore ?? 0}/{maxCollocation}</span>
                </div>
                <span className="font-semibold text-emerald-600">{percentage}%</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reset */}
      <div className="text-center">
        <button
          onClick={handleReset}
          className="px-6 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
        >
          🗑️ Reset All Progress
        </button>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: string; label: string; value: number; color: string }) {
  const colorMap: Record<string, string> = {
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    amber: 'bg-amber-50 border-amber-200 text-amber-700',
    red: 'bg-red-50 border-red-200 text-red-700',
  };

  return (
    <div className={`rounded-xl border p-5 text-center ${colorMap[color]}`}>
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-3xl font-extrabold">{value}</div>
      <div className="text-xs font-medium opacity-75">{label}</div>
    </div>
  );
}
