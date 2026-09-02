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
  Tag,
  HelpCircle,
  User,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronRight
} from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const navLinks = [
    { href: '/tableau-de-bord', label: 'Tableau de bord', icon: LayoutDashboard },
    { href: '/diagnostic', label: 'Diagnostic 0 Vente', icon: Sparkles },
    { href: '/valider', label: 'Valider une idée', icon: Lightbulb },
    { href: '/etude-de-marche', label: 'Étude de marché', icon: Search },
    { href: '/analyse-chariow', label: 'Analyse Chariow Vision', icon: Camera },
    { href: '/academie', label: 'Académie', icon: BookOpen },
    { href: '/tarifs', label: 'Tarifs (FCFA)', icon: Tag },
    { href: '/faq', label: 'FAQ', icon: HelpCircle },
    { href: '/compte', label: 'Mon Compte', icon: User },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF8F3]/90 dark:bg-[#12122B]/90 backdrop-blur-md border-b border-[#1B1B2F]/10 dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Left toggle button for sidebar + Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2.5 rounded-xl bg-[#12122B]/5 dark:bg-white/10 text-[#1B1B2F] dark:text-[#F5F5F3] hover:bg-[#12122B]/10 dark:hover:bg-white/20 transition-all flex items-center gap-2 font-bold text-xs min-h-[44px]"
              aria-label="Ouvrir le panneau latéral"
            >
              {isSidebarOpen ? (
                <PanelLeftClose className="w-5 h-5 text-[#F2A93B]" />
              ) : (
                <PanelLeftOpen className="w-5 h-5 text-[#F2A93B]" />
              )}
              <span className="hidden sm:inline">Menu</span>
            </button>

            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-[#12122B] dark:bg-[#1C1C36] flex items-center justify-center text-[#F2A93B] font-bold shadow-md group-hover:scale-105 transition-transform">
                <CheckCircle className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="font-title text-xl font-bold text-[#1B1B2F] dark:text-[#F5F5F3] tracking-tight">
                Ebook<span className="text-[#F2A93B]">Check</span>
              </span>
            </Link>
          </div>

          {/* Quick links header shortcut */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/diagnostic"
              className="text-[#1B1B2F]/80 dark:text-[#F5F5F3]/80 hover:text-[#F2A93B] transition-colors"
            >
              Diagnostic
            </Link>
            <Link
              href="/valider"
              className="text-[#1B1B2F]/80 dark:text-[#F5F5F3]/80 hover:text-[#F2A93B] transition-colors"
            >
              Valider
            </Link>
            <Link
              href="/academie"
              className="text-[#1B1B2F]/80 dark:text-[#F5F5F3]/80 hover:text-[#F2A93B] transition-colors"
            >
              Académie
            </Link>
          </div>

          {/* Right side actions */}
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
              className="bg-[#12122B] dark:bg-[#F2A93B] text-[#FAF8F3] dark:text-[#12122B] hover:bg-[#12122B]/90 dark:hover:bg-[#F2A93B]/90 px-4 py-2.5 rounded-xl transition-colors font-semibold text-sm items-center gap-2 min-h-[44px]"
            >
              Mon Compte
            </Link>
          </div>
        </div>
      </header>

      {/* Slide-out Left Sidebar Drawer Overlay & Panel */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Left Sidebar Content */}
          <aside className="relative w-72 max-w-[80vw] bg-[#FAF8F3] dark:bg-[#12122B] border-r border-[#1B1B2F]/10 dark:border-white/10 h-full shadow-2xl flex flex-col justify-between z-10 transition-transform animate-slide-in-left">
            <div className="p-5 space-y-6 overflow-y-auto">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#1B1B2F]/10 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#12122B] dark:bg-[#1C1C36] flex items-center justify-center text-[#F2A93B] font-bold">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <span className="font-title text-lg font-bold text-[#1B1B2F] dark:text-[#F5F5F3]">
                    Fonctionnalités
                  </span>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-xl text-[#1B1B2F]/60 dark:text-white/60 hover:text-[#1B1B2F] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Fermer le panneau latéral"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation items list */}
              <nav className="space-y-1.5">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all min-h-[44px] ${
                        isActive
                          ? 'bg-[#12122B] dark:bg-[#F2A93B] text-[#F2A93B] dark:text-[#12122B] shadow-md font-bold'
                          : 'text-[#1B1B2F]/80 dark:text-[#F5F5F3]/80 hover:bg-[#12122B]/5 dark:hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-[#F2A93B] dark:text-[#12122B]' : 'text-[#F2A93B]'}`} />
                        <span>{link.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-40" />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Sidebar Footer info */}
            <div className="p-5 border-t border-[#1B1B2F]/10 dark:border-white/10 bg-[#12122B]/5 dark:bg-white/5 space-y-2">
              <p className="text-xs font-bold text-[#12122B] dark:text-[#F2A93B]">Ebook Check v2.0</p>
              <p className="text-[11px] text-[#1B1B2F]/60 dark:text-[#F5F5F3]/60">
                Conçu pour les créateurs Chariow & Maketou en Afrique de l&apos;Ouest.
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
