'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  CheckCircle,
  Sun,
  Moon,
  User,
  Sparkles,
  Lightbulb,
  BookOpen
} from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="md:hidden sticky top-0 z-30 bg-[#FAF8F3]/90 dark:bg-[#12122B]/90 backdrop-blur-md border-b border-[#1B1B2F]/10 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#12122B] dark:bg-[#1C1C36] flex items-center justify-center text-[#F2A93B] font-bold shadow-md">
            <CheckCircle className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="font-title text-lg font-bold text-[#1B1B2F] dark:text-[#F5F5F3] tracking-tight">
            Ebook<span className="text-[#F2A93B]">Check</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-[#12122B]/5 dark:bg-white/10 text-[#1B1B2F] dark:text-[#F5F5F3] hover:bg-[#12122B]/10 dark:hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Changer le thème"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[#F2A93B]" /> : <Moon className="w-4 h-4" />}
          </button>

          <Link
            href="/compte"
            className="p-2 rounded-xl bg-[#12122B] dark:bg-[#F2A93B] text-[#FAF8F3] dark:text-[#12122B] font-bold text-xs flex items-center justify-center min-h-[44px] min-w-[44px]"
          >
            <User className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
