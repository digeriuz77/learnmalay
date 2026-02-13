'use client';

import { useState } from 'react';
import { WordEntry } from '@/data/lessons';

interface MalayWordProps {
  word: WordEntry;
  className?: string;
}

export default function MalayWord({ word, className = '' }: MalayWordProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <span
      className={`relative inline-block cursor-pointer ${className}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={() => setShowTooltip(!showTooltip)}
    >
      <span className="border-b-2 border-dashed border-emerald-400 hover:border-emerald-600 hover:text-emerald-700 transition-colors font-medium">
        {word.malay}
      </span>
      {showTooltip && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-xl whitespace-nowrap z-50 animate-fade-in">
          <span className="font-semibold text-emerald-300">{word.english}</span>
          {word.partOfSpeech && (
            <span className="text-gray-400 text-xs ml-1">({word.partOfSpeech})</span>
          )}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </span>
      )}
    </span>
  );
}
