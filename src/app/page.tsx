import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center py-16">
        <div className="text-6xl mb-6">🇲🇾</div>
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Learn <span className="text-emerald-600">Bahasa Melayu</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
          Master Malay through interactive sentence translation, bilingual tooltips,
          and engaging word games — designed for academic English speakers.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/lessons"
            className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold text-lg hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
          >
            Start Learning →
          </Link>
          <Link
            href="/progress"
            className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors border-2 border-gray-200"
          >
            📊 My Progress
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          How You&apos;ll Learn
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon="📖"
            title="Bilingual Sentences"
            description="Every Malay word has an interactive tooltip showing its English meaning and part of speech. Hover to learn!"
          />
          <FeatureCard
            icon="🔀"
            title="Word Reorder Game"
            description="Given an English sentence, arrange the Malay words in the correct order. Build sentence construction skills."
          />
          <FeatureCard
            icon="✏️"
            title="Fill-in-the-Blank"
            description="Complete Malay sentences by choosing the right word. Context clues and English hints guide you."
          />
          <FeatureCard
            icon="🔗"
            title="Collocation Matching"
            description="Match Malay phrases with their English equivalents. Learn natural word combinations used in daily life."
          />
          <FeatureCard
            icon="🏆"
            title="XP & Progress"
            description="Earn XP for every correct answer. Track your progress across lessons and watch your skills grow."
          />
          <FeatureCard
            icon="🎓"
            title="Academic Focus"
            description="Content designed for university-level learners who understand English grammar and sentence structure."
          />
        </div>
      </section>

      {/* Sample Preview */}
      <section className="py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Quick Preview</h3>
          <p className="text-gray-500 mb-6">Hover over the Malay words to see their meanings:</p>
          <div className="bg-emerald-50 rounded-xl p-6 text-lg">
            <p className="text-gray-800 leading-relaxed">
              <span className="border-b-2 border-dashed border-emerald-400 cursor-help" title="Safe / Greetings (adjective)">Selamat</span>{' '}
              <span className="border-b-2 border-dashed border-emerald-400 cursor-help" title="morning (noun)">pagi</span>,{' '}
              <span className="border-b-2 border-dashed border-emerald-400 cursor-help" title="name (noun)">nama</span>{' '}
              <span className="border-b-2 border-dashed border-emerald-400 cursor-help" title="I / my (pronoun)">saya</span>{' '}
              <span className="border-b-2 border-dashed border-emerald-400 cursor-help" title="Ahmad (proper noun)">Ahmad</span>.
            </p>
            <p className="text-sm text-emerald-600 mt-3 italic">
              &quot;Good morning, my name is Ahmad.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to begin?</h2>
        <p className="text-gray-600 mb-6">Start with Lesson 1: Greetings & Introductions</p>
        <Link
          href="/lessons"
          className="inline-block px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold text-lg hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
        >
          🚀 Let&apos;s Go!
        </Link>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
