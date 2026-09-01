'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { CheckCircle, Moon, Sun, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('ebookcheck_theme') === 'dark';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ebookcheck_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ebookcheck_theme', 'light');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF3E7]/90 dark:bg-[#12122B]/90 backdrop-blur-md border-b border-[#1B1B2F]/10 dark:border-white/10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-[#12122B] dark:bg-[#F2A93B] flex items-center justify-center text-[#F2A93B] dark:text-[#12122B] font-bold shadow-md group-hover:scale-105 transition-transform">
            <CheckCircle className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className="font-title text-xl font-bold text-[#1B1B2F] dark:text-[#FAF3E7] tracking-tight">
            Ebook<span className="text-[#F2A93B]">Check</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-[#1B1B2F]/80 dark:text-[#FAF3E7]/80">
          <Link href="/tableau-de-bord" className="hover:text-[#F2A93B] py-2 transition-colors">
            Dashboard
          </Link>
          <Link href="/diagnostic" className="hover:text-[#F2A93B] py-2 transition-colors">
            Diagnostic
          </Link>
          <Link href="/valider" className="hover:text-[#F2A93B] py-2 transition-colors">
            Valider
          </Link>
          <Link href="/etude-de-marche" className="hover:text-[#F2A93B] py-2 transition-colors">
            Étude de marché
          </Link>
          <Link href="/analyse-chariow" className="hover:text-[#F2A93B] py-2 transition-colors">
            Vision IA
          </Link>
          <Link href="/academie" className="hover:text-[#F2A93B] py-2 transition-colors">
            Académie
          </Link>
          <Link href="/tarifs" className="hover:text-[#F2A93B] py-2 transition-colors">
            Tarifs
          </Link>

          {/* Theme Toggle Switch */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl bg-gray-200 dark:bg-white/10 text-[#12122B] dark:text-[#F2A93B] hover:scale-105 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
            title="Basculer le thème clair/sombre"
            aria-label="Mode Sombre / Clair"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <Link
            href="/compte"
            className="bg-[#12122B] dark:bg-[#F2A93B] text-[#FAF3E7] dark:text-[#12122B] px-4 py-2.5 rounded-xl font-bold transition-colors shadow-sm"
          >
            Mon Compte
          </Link>
        </nav>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl bg-gray-200 dark:bg-white/10 text-[#12122B] dark:text-[#F2A93B] min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Mode Sombre / Clair"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-[#1B1B2F] dark:text-[#FAF3E7] rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Header Dropdown */}
      {isOpen && (
        <div className="lg:hidden border-b border-[#1B1B2F]/10 dark:border-white/10 bg-[#FAF3E7] dark:bg-[#12122B] px-4 pt-2 pb-6 space-y-2 shadow-lg text-sm font-semibold text-[#1B1B2F] dark:text-[#FAF3E7]">
          <Link href="/tableau-de-bord" onClick={() => setIsOpen(false)} className="block py-2.5 px-3 rounded-lg hover:bg-black/5 min-h-[44px]">
            Tableau de bord
          </Link>
          <Link href="/diagnostic" onClick={() => setIsOpen(false)} className="block py-2.5 px-3 rounded-lg hover:bg-black/5 min-h-[44px]">
            Diagnostic 0 Vente
          </Link>
          <Link href="/valider" onClick={() => setIsOpen(false)} className="block py-2.5 px-3 rounded-lg hover:bg-black/5 min-h-[44px]">
            Valider une idée
          </Link>
          <Link href="/etude-de-marche" onClick={() => setIsOpen(false)} className="block py-2.5 px-3 rounded-lg hover:bg-black/5 min-h-[44px]">
            Étude de marché
          </Link>
          <Link href="/analyse-chariow" onClick={() => setIsOpen(false)} className="block py-2.5 px-3 rounded-lg hover:bg-black/5 min-h-[44px]">
            Analyse Chariow (Vision IA)
          </Link>
          <Link href="/academie" onClick={() => setIsOpen(false)} className="block py-2.5 px-3 rounded-lg hover:bg-black/5 min-h-[44px]">
            Académie (Guides Gratuits)
          </Link>
          <Link href="/tarifs" onClick={() => setIsOpen(false)} className="block py-2.5 px-3 rounded-lg hover:bg-black/5 min-h-[44px]">
            Tarifs (FCFA)
          </Link>
          <Link href="/compte" onClick={() => setIsOpen(false)} className="block w-full text-center bg-[#F2A93B] text-[#12122B] font-extrabold py-3 rounded-xl min-h-[44px]">
            Mon Compte
          </Link>
        </div>
      )}
    </header>
  );
}
