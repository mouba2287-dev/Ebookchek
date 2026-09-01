'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Stethoscope,
  Lightbulb,
  TrendingUp,
  Camera,
  GraduationCap,
  User
} from 'lucide-react';

export default function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/tableau-de-bord', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/diagnostic', label: 'Diagnostic', icon: Stethoscope },
    { href: '/valider', label: 'Valider', icon: Lightbulb },
    { href: '/etude-de-marche', label: 'Marché', icon: TrendingUp },
    { href: '/analyse-chariow', label: 'Vision', icon: Camera },
    { href: '/academie', label: 'Académie', icon: GraduationCap },
    { href: '/compte', label: 'Compte', icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#12122B] text-[#FAF3E7] border-t border-white/10 z-50 px-2 py-1.5 shadow-2xl">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center p-1 rounded-xl transition-colors min-h-[44px] min-w-[44px] ${
                isActive ? 'text-[#F2A93B] font-bold' : 'text-[#FAF3E7]/70 hover:text-[#FAF3E7]'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px] tracking-tight mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
