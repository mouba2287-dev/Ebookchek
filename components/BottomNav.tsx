'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Sparkles,
  Lightbulb,
  BookOpen,
  User,
  Search,
  LayoutDashboard
} from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Accueil', icon: Home },
    { href: '/tableau-de-bord', label: 'Bord', icon: LayoutDashboard },
    { href: '/diagnostic', label: 'Diagnostic', icon: Sparkles },
    { href: '/valider', label: 'Valider', icon: Lightbulb },
    { href: '/academie', label: 'Académie', icon: BookOpen },
    { href: '/compte', label: 'Compte', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FAF8F3] dark:bg-[#1C1C36] border-t border-[#1B1B2F]/10 dark:border-white/10 px-2 py-1 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] px-2 py-1 rounded-xl transition-all ${
                isActive
                  ? 'text-[#F2A93B] font-bold scale-105'
                  : 'text-[#1B1B2F]/70 dark:text-[#F5F5F3]/70 hover:text-[#1B1B2F] dark:hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              <span className="text-[10px] mt-0.5 font-medium tracking-tight truncate max-w-[56px]">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
