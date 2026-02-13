import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LearnMalay — Interactive Malay Language Learning',
  description: 'Learn Bahasa Melayu through interactive games, bilingual translations, and gamified lessons designed for academic English speakers.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
        <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500">
          <p>🇲🇾 LearnMalay — Built for academic English learners</p>
        </footer>
      </body>
    </html>
  );
}
