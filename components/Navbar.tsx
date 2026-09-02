'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  CheckCircle,
  Sun,
  Moon,
  Menu,
  X,
  LayoutDashboard,
  Sparkles,
  Lightbulb,
  BookOpen,
  Search,
  Camera,
  Tag
} from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const navLinks = [
    { href: '/tableau-de-bord', label: 'Tableau de bord', icon: LayoutDashboard },
    { href: '/diagnostic', label: 'Diagnostic 0 Vente', icon: Sparkles },
    { href: '/valider', label: 'Valider une idée', icon: Lightbulb },
    { href: '/etude-de-marche', label: 'Étude de marché', icon: Search },
    { href: '/analyse-chariow', label: 'Analyse Chariow', icon: Camera },
    { href: '/academie', label: 'Académie', icon: BookOpen },
    { href: '/tarifs', label: 'Tarifs', icon: Tag },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F3]/90 dark:bg-[#12122B]/90 backdrop-blur-md border-b border-[#1B1B2F]/10 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-[#12122B] dark:bg-[#1C1C36] flex items-center justify-center text-[#F2A93B] font-bold shadow-md group-hover:scale-105 transition-transform">
            <CheckCircle className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className="font-title text-xl font-bold text-[#1B1B2F] dark:text-[#F5F5F3] tracking-tight">
            Ebook<span className="text-[#F2A93B]">Check</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors py-2 px-1 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#F2A93B] font-bold border-b-2 border-[#F2A93B]'
                    : 'text-[#1B1B2F]/80 dark:text-[#F5F5F3]/80 hover:text-[#1B1B2F] dark:hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side actions (Theme toggle & Account) */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-[#12122B]/5 dark:bg-white/10 text-[#1B1B2F] dark:text-[#F5F5F3] hover:bg-[#12122B]/10 dark:hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Changer le thème"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-[#F2A93B]" /> : <Moon className="w-5 h-5" />}
          </button>

          <Link
            href="/compte"
            className="hidden sm:flex bg-[#12122B] dark:bg-[#F2A93B] text-[#FAF8F3] dark:text-[#12122B] hover:bg-[#12122B]/90 dark:hover:bg-[#F2A93B]/90 px-4 py-2.5 rounded-xl transition-colors font-semibold text-sm items-center gap-2 min-h-[44px]"
          >
            Mon Compte
          </Link>

          {/* Mobile dropdown menu trigger */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-[#1B1B2F] dark:text-[#F5F5F3] rounded-lg focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden border-b border-[#1B1B2F]/10 dark:border-white/10 bg-[#FAF8F3] dark:bg-[#1C1C36] px-4 pt-2 pb-6 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-semibold text-[#1B1B2F] dark:text-[#F5F5F3] hover:bg-[#12122B]/5 dark:hover:bg-white/5 min-h-[44px]"
            >
              <link.icon className="w-5 h-5 text-[#F2A93B]" />
              <span>{link.label}</span>
            </Link>
          ))}
          <Link
            href="/compte"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center bg-[#F2A93B] text-[#12122B] font-bold px-4 py-3 rounded-xl shadow-sm min-h-[44px] mt-4"
          >
            Mon Compte
          </Link>
        </div>
      )}
    </header>
  );
}
