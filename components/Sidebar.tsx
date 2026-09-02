'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CheckCircle,
  Sun,
  Moon,
  LayoutDashboard,
  Sparkles,
  Lightbulb,
  BookOpen,
  Search,
  Camera,
  Tag,
  HelpCircle,
  User,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    // Sync main layout padding via CSS custom property on root
    if (isCollapsed) {
      document.documentElement.style.setProperty('--sidebar-width', '5rem');
    } else {
      document.documentElement.style.setProperty('--sidebar-width', '16rem');
    }
  }, [isCollapsed]);

  const navLinks = [
    { href: '/tableau-de-bord', label: 'Tableau de bord', icon: LayoutDashboard },
    { href: '/diagnostic', label: 'Diagnostic 0 Vente', icon: Sparkles },
    { href: '/valider', label: 'Valider une idée', icon: Lightbulb },
    { href: '/etude-de-marche', label: 'Étude de marché', icon: Search },
    { href: '/analyse-chariow', label: 'Analyse Chariow', icon: Camera },
    { href: '/academie', label: 'Académie', icon: BookOpen },
    { href: '/tarifs', label: 'Tarifs (FCFA)', icon: Tag },
    { href: '/faq', label: 'FAQ', icon: HelpCircle },
  ];

  return (
    <aside
      className={`hidden md:flex flex-col justify-between fixed top-0 left-0 bottom-0 z-40 bg-[#FAF8F3] dark:bg-[#12122B] border-r border-[#1B1B2F]/10 dark:border-white/10 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="p-4 space-y-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-[#12122B] dark:bg-[#1C1C36] flex items-center justify-center text-[#F2A93B] font-bold shadow-md shrink-0">
              <CheckCircle className="w-6 h-6 stroke-[2.5]" />
            </div>
            {!isCollapsed && (
              <span className="font-title text-xl font-bold text-[#1B1B2F] dark:text-[#F5F5F3] tracking-tight truncate">
                Ebook<span className="text-[#F2A93B]">Check</span>
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-xl text-[#1B1B2F]/60 dark:text-white/60 hover:text-[#1B1B2F] dark:hover:text-white hover:bg-[#12122B]/5 dark:hover:bg-white/10 transition-colors shrink-0"
            aria-label={isCollapsed ? 'Agrandir le menu' : 'Réduire le menu'}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="w-5 h-5 text-[#F2A93B]" />
            ) : (
              <PanelLeftClose className="w-5 h-5 text-[#F2A93B]" />
            )}
          </button>
        </div>

        <nav className="space-y-1.5 pt-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                title={isCollapsed ? link.label : undefined}
                className={`flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all min-h-[44px] ${
                  isActive
                    ? 'bg-[#12122B] dark:bg-[#F2A93B] text-[#F2A93B] dark:text-[#12122B] shadow-md font-bold'
                    : 'text-[#1B1B2F]/80 dark:text-[#F5F5F3]/80 hover:bg-[#12122B]/5 dark:hover:bg-white/5'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#F2A93B] dark:text-[#12122B]' : 'text-[#F2A93B]'}`} />
                {!isCollapsed && <span className="truncate">{link.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-[#1B1B2F]/10 dark:border-white/10 space-y-3">
        <button
          onClick={toggleTheme}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#12122B]/5 dark:bg-white/10 text-[#1B1B2F] dark:text-[#F5F5F3] hover:bg-[#12122B]/10 dark:hover:bg-white/20 transition-colors text-xs font-semibold ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-[#F2A93B] shrink-0" /> : <Moon className="w-4 h-4 shrink-0" />}
          {!isCollapsed && <span>{theme === 'dark' ? 'Mode Clair' : 'Mode Sombre'}</span>}
        </button>

        <Link
          href="/compte"
          className={`flex items-center gap-3 p-2.5 rounded-2xl bg-white dark:bg-[#1C1C36] border border-[#1B1B2F]/10 dark:border-white/10 hover:border-[#F2A93B] transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <div className="w-9 h-9 rounded-xl bg-[#F2A93B]/20 text-[#12122B] dark:text-[#F2A93B] flex items-center justify-center font-bold shrink-0">
            <User className="w-5 h-5" />
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-[#12122B] dark:text-white truncate">Mon Compte</p>
              <p className="text-[10px] text-[#2F9E68] font-bold">Actif (Gratuit)</p>
            </div>
          )}
        </Link>
      </div>
    </aside>
  );
}
