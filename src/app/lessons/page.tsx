import Link from 'next/link';
import { lessons } from '@/data/lessons';

const levelColors = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-amber-100 text-amber-700',
  advanced: 'bg-red-100 text-red-700',
};

export default function LessonsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">📚 Lessons</h1>
        <p className="text-gray-600 text-lg">Choose a lesson to start learning Bahasa Melayu</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson, index) => (
          <Link
            key={lesson.id}
            href={`/lessons/${lesson.id}`}
            className="group bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl hover:border-emerald-200 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center font-bold text-lg group-hover:bg-emerald-200 transition-colors">
                {index + 1}
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${levelColors[lesson.level]}`}>
                {lesson.level}
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-emerald-700 transition-colors">
              {lesson.title}
            </h2>
            <p className="text-sm text-emerald-600 font-medium mb-3">{lesson.titleMalay}</p>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">{lesson.description}</p>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>📝 {lesson.sentences.length} sentences</span>
              <span>🎮 {lesson.fillBlanks.length + lesson.collocations.length + lesson.sentences.length} activities</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
