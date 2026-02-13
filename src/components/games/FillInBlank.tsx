'use client';

import { useState } from 'react';
import { FillBlank } from '@/data/lessons';

interface FillInBlankProps {
  questions: FillBlank[];
  onComplete: (score: number) => void;
}

export default function FillInBlank({ questions, onComplete }: FillInBlankProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const current = questions[currentIndex];

  const handleSelect = (optionIndex: number) => {
    if (feedback) return;
    setSelectedOption(optionIndex);
    const isCorrect = optionIndex === current.correctIndex;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 >= questions.length) {
      setCompleted(true);
      onComplete(score);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setFeedback(null);
    }
  };

  if (completed) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">🏆</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Well Done!</h3>
        <p className="text-lg text-gray-600">
          You scored <span className="font-bold text-emerald-600">{score}</span> out of{' '}
          <span className="font-bold">{questions.length}</span>
        </p>
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: questions.length }).map((_, i) => (
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
        <span>Question {currentIndex + 1} of {questions.length}</span>
        <span className="font-medium text-emerald-600">Score: {score}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-amber-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
        />
      </div>

      {/* Sentence with blank */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6 text-center">
        <p className="text-xl font-semibold text-gray-800 leading-relaxed">
          {current.sentence.split('___').map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && (
                <span className={`inline-block min-w-[100px] mx-1 px-3 py-1 rounded-lg border-2 border-dashed font-bold ${
                  feedback === 'correct' && selectedOption !== null
                    ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                    : feedback === 'incorrect' && selectedOption !== null
                    ? 'border-red-400 bg-red-50 text-red-700'
                    : selectedOption !== null
                    ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                    : 'border-gray-300 bg-gray-50 text-gray-400'
                }`}>
                  {selectedOption !== null ? current.options[selectedOption] : '???'}
                </span>
              )}
            </span>
          ))}
        </p>
      </div>

      {/* English hint */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
        <p className="text-sm text-blue-600">
          <span className="font-medium">💡 Hint:</span> {current.englishHint}
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {current.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={!!feedback}
            className={`px-4 py-3 rounded-xl font-medium text-base transition-all border-2 ${
              feedback && i === current.correctIndex
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-300'
                : feedback && i === selectedOption && i !== current.correctIndex
                ? 'border-red-500 bg-red-50 text-red-700'
                : selectedOption === i
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-emerald-300 hover:bg-emerald-50'
            } disabled:cursor-default`}
          >
            {option}
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
            {feedback === 'correct' ? '✅ Betul! (Correct!)' : `❌ The answer is "${current.blank}"`}
          </p>
        </div>
      )}

      {/* Next button */}
      {feedback && (
        <div className="flex justify-center">
          <button
            onClick={nextQuestion}
            className="px-6 py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-colors shadow-md"
          >
            {currentIndex + 1 >= questions.length ? 'See Results' : 'Next →'}
          </button>
        </div>
      )}
    </div>
  );
}
