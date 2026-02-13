'use client';

import { useState } from 'react';
import { Collocation } from '@/data/lessons';

interface CollocationMatchProps {
  collocations: Collocation[];
  onComplete: (score: number) => void;
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function CollocationMatch({ collocations, onComplete }: CollocationMatchProps) {
  const collocation = collocations[0]; // Use first collocation set
  const [shuffledEnglish] = useState(() => {
    const indices = collocation.english.map((_, i) => i);
    return shuffleArray(indices);
  });
  const [selectedMalay, setSelectedMalay] = useState<number | null>(null);
  const [selectedEnglish, setSelectedEnglish] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrongPair, setWrongPair] = useState<{ malay: number; english: number } | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const checkMatch = (malayIdx: number, englishIdx: number) => {
    const isCorrect = collocation.correctPair.some(
      ([m, e]) => m === malayIdx && e === englishIdx
    );

    if (isCorrect) {
      setMatched(prev => {
        const next = new Set(prev);
        next.add(malayIdx);
        return next;
      });
      setScore(prev => prev + 1);
      setSelectedMalay(null);
      setSelectedEnglish(null);

      if (matched.size + 1 === collocation.malay.length) {
        setCompleted(true);
        onComplete(score + 1);
      }
    } else {
      setWrongPair({ malay: malayIdx, english: englishIdx });
      setTimeout(() => {
        setWrongPair(null);
        setSelectedMalay(null);
        setSelectedEnglish(null);
      }, 800);
    }
  };

  const handleMalayClick = (idx: number) => {
    if (matched.has(idx)) return;
    setSelectedMalay(idx);
    if (selectedEnglish !== null) {
      checkMatch(idx, selectedEnglish);
    }
  };

  const handleEnglishClick = (idx: number) => {
    if (matched.has(collocation.correctPair.find(([, e]) => e === idx)?.[0] ?? -1)) return;
    setSelectedEnglish(idx);
    if (selectedMalay !== null) {
      checkMatch(selectedMalay, idx);
    }
  };

  if (completed) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">🌟</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">All Matched!</h3>
        <p className="text-lg text-gray-600">
          You matched <span className="font-bold text-emerald-600">{score}</span> collocations correctly!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-1">Match the Malay phrases with their English meanings</p>
        <p className="text-xs text-gray-400">Select one from each column to match</p>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2">
        {collocation.malay.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-colors ${
              matched.has(i) ? 'bg-emerald-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Malay column */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide text-center">Bahasa Melayu</h4>
          {collocation.malay.map((phrase, i) => (
            <button
              key={`malay-${i}`}
              onClick={() => handleMalayClick(i)}
              disabled={matched.has(i)}
              className={`w-full px-4 py-3 rounded-xl font-medium text-sm transition-all border-2 ${
                matched.has(i)
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-600 opacity-60'
                  : wrongPair?.malay === i
                  ? 'border-red-400 bg-red-50 text-red-700 animate-shake'
                  : selectedMalay === i
                  ? 'border-purple-500 bg-purple-50 text-purple-700 ring-2 ring-purple-300'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300'
              }`}
            >
              {matched.has(i) && '✅ '}{phrase}
            </button>
          ))}
        </div>

        {/* English column */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide text-center">English</h4>
          {shuffledEnglish.map((originalIdx) => {
            const matchedMalayIdx = collocation.correctPair.find(([, e]) => e === originalIdx)?.[0] ?? -1;
            const isMatched = matched.has(matchedMalayIdx);
            return (
              <button
                key={`english-${originalIdx}`}
                onClick={() => handleEnglishClick(originalIdx)}
                disabled={isMatched}
                className={`w-full px-4 py-3 rounded-xl font-medium text-sm transition-all border-2 ${
                  isMatched
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-600 opacity-60'
                    : wrongPair?.english === originalIdx
                    ? 'border-red-400 bg-red-50 text-red-700 animate-shake'
                    : selectedEnglish === originalIdx
                    ? 'border-orange-500 bg-orange-50 text-orange-700 ring-2 ring-orange-300'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-orange-300'
                }`}
              >
                {isMatched && '✅ '}{collocation.english[originalIdx]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
