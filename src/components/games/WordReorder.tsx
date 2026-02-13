'use client';

import { useState, useCallback, useEffect } from 'react';
import { Sentence } from '@/data/lessons';

interface WordReorderProps {
  sentences: Sentence[];
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

export default function WordReorder({ sentences, onComplete }: WordReorderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentSentence = sentences[currentIndex];

  const initRound = useCallback(() => {
    if (currentIndex < sentences.length) {
      const words = sentences[currentIndex].words.map(w => w.malay);
      setShuffledWords(shuffleArray(words));
      setSelectedWords([]);
      setFeedback(null);
    }
  }, [currentIndex, sentences]);

  useEffect(() => {
    initRound();
  }, [initRound]);

  const handleWordClick = (word: string, fromSelected: boolean) => {
    if (feedback) return;
    if (fromSelected) {
      setSelectedWords(prev => {
        const idx = prev.indexOf(word);
        const next = [...prev];
        next.splice(idx, 1);
        return next;
      });
      setShuffledWords(prev => [...prev, word]);
    } else {
      setShuffledWords(prev => {
        const idx = prev.indexOf(word);
        const next = [...prev];
        next.splice(idx, 1);
        return next;
      });
      setSelectedWords(prev => [...prev, word]);
    }
  };

  const checkAnswer = () => {
    const correctWords = currentSentence.words.map(w => w.malay);
    const isCorrect = selectedWords.every((w, i) => w === correctWords[i]) && selectedWords.length === correctWords.length;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 >= sentences.length) {
      const finalScore = score + (feedback === 'correct' ? 0 : 0);
      setCompleted(true);
      onComplete(finalScore);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  if (completed) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Game Complete!</h3>
        <p className="text-lg text-gray-600">
          You scored <span className="font-bold text-emerald-600">{score}</span> out of{' '}
          <span className="font-bold">{sentences.length}</span>
        </p>
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: sentences.length }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${i < score ? 'bg-emerald-500' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Question {currentIndex + 1} of {sentences.length}</span>
        <span className="font-medium text-emerald-600">Score: {score}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex) / sentences.length) * 100}%` }}
        />
      </div>

      {/* English hint */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-600 font-medium mb-1">Translate this sentence:</p>
        <p className="text-lg text-blue-900 font-semibold">{currentSentence.english}</p>
      </div>

      {/* Selected words area */}
      <div className="min-h-[60px] bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-wrap gap-2">
        {selectedWords.length === 0 && (
          <span className="text-gray-400 text-sm">Tap words below to build the sentence...</span>
        )}
        {selectedWords.map((word, i) => (
          <button
            key={`selected-${i}`}
            onClick={() => handleWordClick(word, true)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              feedback === 'correct'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : feedback === 'incorrect'
                ? 'bg-red-100 text-red-800 border border-red-300'
                : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm'
            }`}
          >
            {word}
          </button>
        ))}
      </div>

      {/* Available words */}
      <div className="flex flex-wrap gap-2 justify-center">
        {shuffledWords.map((word, i) => (
          <button
            key={`available-${i}`}
            onClick={() => handleWordClick(word, false)}
            disabled={!!feedback}
            className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg font-medium text-sm text-gray-700 hover:border-emerald-400 hover:text-emerald-700 transition-all shadow-sm disabled:opacity-50"
          >
            {word}
          </button>
        ))}
      </div>

      {/* Feedback */}
      {feedback && (
        <div
          className={`p-4 rounded-xl text-center animate-fade-in ${
            feedback === 'correct'
              ? 'bg-emerald-50 border border-emerald-200'
              : 'bg-red-50 border border-red-200'
          }`}
        >
          <p className={`font-bold text-lg ${feedback === 'correct' ? 'text-emerald-700' : 'text-red-700'}`}>
            {feedback === 'correct' ? '✅ Correct! Bagus!' : '❌ Not quite right'}
          </p>
          {feedback === 'incorrect' && (
            <p className="text-sm text-gray-600 mt-1">
              Correct answer: <span className="font-medium">{currentSentence.malay}</span>
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-center gap-3">
        {!feedback && selectedWords.length > 0 && (
          <button
            onClick={checkAnswer}
            className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-md"
          >
            Check Answer
          </button>
        )}
        {feedback && (
          <button
            onClick={nextQuestion}
            className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-md"
          >
            {currentIndex + 1 >= sentences.length ? 'See Results' : 'Next →'}
          </button>
        )}
      </div>
    </div>
  );
}
