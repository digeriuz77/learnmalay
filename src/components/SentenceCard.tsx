'use client';

import { useState } from 'react';
import { Sentence } from '@/data/lessons';
import MalayWord from './MalayWord';

interface SentenceCardProps {
  sentence: Sentence;
  index: number;
}

export default function SentenceCard({ sentence, index }: SentenceCardProps) {
  const [showEnglish, setShowEnglish] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-sm">
          {index + 1}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap gap-1.5 text-lg mb-3">
            {sentence.words.map((word, i) => (
              <MalayWord key={i} word={word} />
            ))}
          </div>
          <button
            onClick={() => setShowEnglish(!showEnglish)}
            className="text-sm text-emerald-600 hover:text-emerald-800 font-medium flex items-center gap-1 transition-colors"
          >
            {showEnglish ? '🔽' : '▶️'} {showEnglish ? 'Hide' : 'Show'} English translation
          </button>
          {showEnglish && (
            <p className="mt-2 text-gray-600 italic bg-emerald-50 px-3 py-2 rounded-lg text-sm animate-fade-in">
              {sentence.english}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
