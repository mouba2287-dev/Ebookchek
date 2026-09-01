import Link from 'next/link';
import { GraduationCap, ArrowRight, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

const guides = [
  {
    slug: 'publicite-facebook-ebook',
    title: 'Comment faire de la publicité Facebook pour vendre son ebook',
    category: 'Acquisition & Ads',
    readTime: '6 min de lecture',
    summary: 'Apprends à cibler les acheteurs Mobile Money en Afrique de l\'Ouest avec des budgets à partir de 2 000 FCFA/jour.',
  },
  {
    slug: 'vente-efficace-whatsapp',
    title: 'Comment vendre efficacement via WhatsApp',
    category: 'Conversion WhatsApp',
    readTime: '8 min de lecture',
    summary: 'La méthode exacte des Statuts et Relances personnalisées pour convertir jusqu\'à 30% de tes contacts en clients.',
  },
  {
    slug: 'description-qui-convertit',
    title: 'Rédiger une description qui convertit',
    category: 'Copywriting',
    readTime: '5 min de lecture',
    summary: 'La structure en 4 blocs (Problème, Promesse, Puces émojis, Rassurance Mobile Money) pour captiver un lecteur mobile.',
  },
  {
    slug: 'fixer-le-bon-prix-ebook',
    title: 'Fixer le bon prix pour son ebook en FCFA',
    category: 'Pricing FCFA',
    readTime: '4 min de lecture',
    summary: 'Comprendre la psychologie du prix d\'impulsion (2 000 à 5 000 FCFA) et quand augmenter tes tarifs avec des bonus.',
  },
  {
    slug: 'trouver-des-niches-rentables',
    title: 'Trouver des niches rentables et des idées gagnantes',
    category: 'Recherche de Niche',
    readTime: '7 min de lecture',
    summary: 'Les 5 secteurs qui génèrent le plus de ventes en Afrique francophone (Business, Importation, Élevage, Bourses/Études, Santé).',
  },
];

export default function AcademiePage() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-4xl mx-auto space-y-10 pb-20 md:pb-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12122B] text-[#F2A93B] text-xs font-semibold shadow-sm">
          <GraduationCap className="w-4 h-4 text-[#F2A93B]" /> Académie Ebook Check (100% Gratuite)
        </div>
        <h1 className="font-title text-3xl sm:text-4xl font-extrabold text-[#1B1B2F] tracking-tight">
          Forme-toi aux meilleures stratégies de vente
        </h1>
        <p className="text-sm sm:text-base text-[#1B1B2F]/80 max-w-2xl mx-auto leading-relaxed">
          Des guides conc Diagnostic et marketing spécialement rédigés pour les vendeurs d&apos;ebooks en Afrique francophone.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {guides.map((guide) => (
          <div
            key={guide.slug}
            className="bg-white border border-[#12122B]/15 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-3"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-bold text-[#F2A93B] bg-[#F2A93B]/10 px-2.5 py-1 rounded-lg uppercase">
                {guide.category}
              </span>
              <span className="text-xs text-[#1B1B2F]/60 font-medium">{guide.readTime}</span>
            </div>

            <h2 className="font-title text-xl font-bold text-[#12122B]">
              {guide.title}
            </h2>

            <p className="text-xs sm:text-sm text-[#1B1B2F]/80 leading-relaxed font-normal">
              {guide.summary}
            </p>

            <div className="pt-2 flex items-center justify-between border-t border-gray-100">
              <span className="text-xs text-[#2F9E68] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Disponible en accès libre
              </span>
              <button className="text-xs font-extrabold text-[#12122B] hover:text-[#F2A93B] transition-colors flex items-center gap-1.5 min-h-[44px]">
                Lire le guide <ArrowRight className="w-4 h-4 text-[#F2A93B]" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
