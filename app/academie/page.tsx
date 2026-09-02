'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { guidesData } from '@/lib/academieData';

export default function AcademiePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'Tous les guides' },
    { key: 'facebook', label: 'Pub Facebook' },
    { key: 'whatsapp', label: 'WhatsApp' },
    { key: 'copywriting', label: 'Copywriting' },
    { key: 'prix', label: 'Prix FCFA' },
    { key: 'niches', label: 'Niches Rentables' },
  ];

  const filteredGuides = selectedCategory === 'all'
    ? guidesData
    : guidesData.filter((g) => g.category === selectedCategory);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12122B] text-[#F2A93B] text-xs font-semibold shadow-sm">
          <BookOpen className="w-4 h-4 text-[#F2A93B]" /> Académie Ebook Check • 100% Gratuit
        </div>
        <h1 className="font-title text-3xl sm:text-4xl font-extrabold text-[#1B1B2F] dark:text-[#F5F5F3] tracking-tight">
          Guide & Stratégies pour Vendre ses Ebooks
        </h1>
        <p className="text-sm sm:text-base text-[#1B1B2F]/80 dark:text-[#F5F5F3]/80 max-w-2xl mx-auto leading-relaxed">
          Ressources pédagogiques gratuites sans jargon technique pour réussir tes lancements sur Chariow et Maketou en Afrique francophone.
        </p>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all min-h-[44px] ${
              selectedCategory === cat.key
                ? 'bg-[#F2A93B] text-[#12122B] shadow-sm'
                : 'bg-white dark:bg-[#1C1C36] text-[#1B1B2F]/80 dark:text-[#F5F5F3]/80 border border-[#12122B]/10 hover:bg-gray-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredGuides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/academie/${guide.slug}`}
            className="bg-white dark:bg-[#1C1C36] border border-[#12122B]/10 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-extrabold uppercase px-2.5 py-1 rounded-full bg-[#12122B]/5 dark:bg-white/10 text-[#12122B] dark:text-[#F2A93B]">
                  {guide.categoryLabel}
                </span>
                <span className="text-[#1B1B2F]/60 dark:text-[#F5F5F3]/60 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {guide.readTime}
                </span>
              </div>

              <h2 className="font-title text-xl font-bold text-[#12122B] dark:text-[#F5F5F3] group-hover:text-[#F2A93B] transition-colors">
                {guide.title}
              </h2>

              <p className="text-xs text-[#1B1B2F]/70 dark:text-[#F5F5F3]/70 leading-relaxed">
                {guide.excerpt}
              </p>
            </div>

            <div className="pt-2 border-t border-gray-100 dark:border-white/10 flex items-center justify-between text-xs font-bold text-[#F2A93B]">
              <span>Lire le guide complet</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
