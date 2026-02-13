'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { lessons } from '@/data/lessons';
import SentenceCard from '@/components/SentenceCard';
import WordReorder from '@/components/games/WordReorder';
import FillInBlank from '@/components/games/FillInBlank';
import CollocationMatch from '@/components/games/CollocationMatch';
import { updateLessonProgress, getProgress, type UserProgress } from '@/lib/progress';

type Tab = 'learn' | 'reorder' | 'fillblank' | 'collocation';

const tabs: { key: Tab; label: string; icon: string }[] = [
  { key: 'learn', label: 'Learn', icon: '📖' },
  { key: 'reorder', label: 'Word Reorder', icon: '🔀' },
  { key: 'fillblank', label: 'Fill-in-Blank', icon: '✏️' },
  { key: 'collocation', label: 'Match', icon: '🔗' },
];

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const lesson = lessons.find(l => l.id === id);
  const [activeTab, setActiveTab] = useState<Tab>('learn');
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  if (!lesson) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Lesson not found</h1>
        <Link href="/lessons" className="text-emerald-600 hover:underline mt-4 inline-block">
          ← Back to lessons
        </Link>
      </div>
    );
  }

  const handleReorderComplete = (score: number) => {
    const updated = updateLessonProgress(lesson.id, 'reorderScore', score);
    setProgress(updated);
  };

  const handleFillBlankComplete = (score: number) => {
    const updated = updateLessonProgress(lesson.id, 'fillBlankScore', score);
    setProgress(updated);
  };

  const handleCollocationComplete = (score: number) => {
    const updated = updateLessonProgress(lesson.id, 'collocationScore', score);
    setProgress(updated);
  };

  const lessonProgress = progress?.lessons[lesson.id];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/lessons" className="text-sm text-emerald-600 hover:text-emerald-800 font-medium mb-4 inline-block">
          ← Back to lessons
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">{lesson.title}</h1>
            <p className="text-lg text-emerald-600 font-medium">{lesson.titleMalay}</p>
            <p className="text-gray-500 mt-1">{lesson.description}</p>
          </div>
          {progress && (
            <div className="text-right">
              <div className="text-2xl font-bold text-emerald-600">{progress.totalXP}</div>
              <div className="text-xs text-gray-400">Total XP</div>
            </div>
          )}
        </div>
      </div>

      {/* Lesson Progress Summary */}
      {lessonProgress && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex items-center gap-6 text-sm">
          <span className="text-gray-500">Your scores:</span>
          <span className="flex items-center gap-1">
            🔀 <span className="font-semibold text-gray-700">{lessonProgress.reorderScore}</span>
          </span>
          <span className="flex items-center gap-1">
            ✏️ <span className="font-semibold text-gray-700">{lessonProgress.fillBlankScore}</span>
          </span>
          <span className="flex items-center gap-1">
            🔗 <span className="font-semibold text-gray-700">{lessonProgress.collocationScore}</span>
          </span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-8 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab.key
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="mr-1">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {activeTab === 'learn' && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-blue-700">
                <span className="font-semibold">💡 Tip:</span> Hover over or tap any Malay word to see its English meaning and part of speech.
              </p>
            </div>
            {lesson.sentences.map((sentence, i) => (
              <SentenceCard key={sentence.id} sentence={sentence} index={i} />
            ))}
          </div>
        )}

        {activeTab === 'reorder' && (
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">🔀 Word Reorder</h2>
            <p className="text-gray-500 text-sm mb-6">
              Arrange the Malay words to form the correct translation of the English sentence.
            </p>
            <WordReorder
              key={`reorder-${lesson.id}`}
              sentences={lesson.sentences}
              onComplete={handleReorderComplete}
            />
          </div>
        )}

        {activeTab === 'fillblank' && (
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">✏️ Fill-in-the-Blank</h2>
            <p className="text-gray-500 text-sm mb-6">
              Choose the correct Malay word to complete each sentence.
            </p>
            <FillInBlank
              key={`fill-${lesson.id}`}
              questions={lesson.fillBlanks}
              onComplete={handleFillBlankComplete}
            />
          </div>
        )}

        {activeTab === 'collocation' && (
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">🔗 Collocation Matching</h2>
            <p className="text-gray-500 text-sm mb-6">
              Match Malay phrases with their English equivalents.
            </p>
            <CollocationMatch
              key={`collocation-${lesson.id}`}
              collocations={lesson.collocations}
              onComplete={handleCollocationComplete}
            />
          </div>
        )}
      </div>
    </div>
  );
}
