'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, CheckCircle, Shield, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FAF3E7]/90 backdrop-blur-md border-b border-[#1B1B2F]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-[#12122B] flex items-center justify-center text-[#F2A93B] font-bold shadow-md group-hover:scale-105 transition-transform">
            <CheckCircle className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className="font-title text-xl font-bold text-[#1B1B2F] tracking-tight">
            Ebook<span className="text-[#F2A93B]">Check</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/diagnostic" className="text-[#1B1B2F]/80 hover:text-[#1B1B2F] transition-colors py-2 px-1">
            Diagnostic 0 Vente
          </Link>
          <Link href="/valider" className="text-[#1B1B2F]/80 hover:text-[#1B1B2F] transition-colors py-2 px-1">
            Valider une idée
          </Link>
          <Link href="/tarifs" className="text-[#1B1B2F]/80 hover:text-[#1B1B2F] transition-colors py-2 px-1">
            Tarifs
          </Link>
          <Link href="/faq" className="text-[#1B1B2F]/80 hover:text-[#1B1B2F] transition-colors py-2 px-1">
            FAQ
          </Link>
          <Link
            href="/compte"
            className="bg-[#12122B] text-[#FAF3E7] hover:bg-[#12122B]/90 px-4 py-2.5 rounded-xl transition-colors font-semibold flex items-center gap-2"
          >
            Mon Compte
          </Link>
        </nav>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-[#1B1B2F] rounded-lg focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-[#1B1B2F]/10 bg-[#FAF3E7] px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <Link
            href="/diagnostic"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-3 rounded-lg text-base font-semibold text-[#1B1B2F] hover:bg-[#12122B]/5 min-h-[44px]"
          >
            Diagnostic 0 Vente
          </Link>
          <Link
            href="/valider"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-3 rounded-lg text-base font-semibold text-[#1B1B2F] hover:bg-[#12122B]/5 min-h-[44px]"
          >
            Valider une idée
          </Link>
          <Link
            href="/tarifs"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-3 rounded-lg text-base font-semibold text-[#1B1B2F] hover:bg-[#12122B]/5 min-h-[44px]"
          >
            Tarifs (FCFA)
          </Link>
          <Link
            href="/faq"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-3 rounded-lg text-base font-semibold text-[#1B1B2F] hover:bg-[#12122B]/5 min-h-[44px]"
          >
            FAQ
          </Link>
          <Link
            href="/compte"
            onClick={() => setIsOpen(false)}
            className="block w-full text-center bg-[#F2A93B] text-[#12122B] font-bold px-4 py-3 rounded-xl shadow-sm min-h-[44px]"
          >
            Mon Compte
          </Link>
        </div>
      )}
    </header>
  );
}
