'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TrendingUp, Sparkles, Lightbulb, CheckCircle2, Search, ArrowRight, Coins } from 'lucide-react';
import { formatFCFA } from '@/lib/utils';

export default function EtudeDeMarchePage() {
  const [query, setQuery] = useState('');
  const [generatedIdeas, setGeneratedIdeas] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setTimeout(() => {
      setGeneratedIdeas([
        {
          title: `Comment réussir dans l'élevage de ${query} en Afrique de l'Ouest`,
          demandScore: 88,
          competitionScore: 45,
          recommendedPrice: 3500,
          angle: "Guide pratique zéro jargon pour réussir ses 100 premiers sujets.",
        },
        {
          title: `Les 7 Erreurs Fatales à Éviter quand on se lance dans ${query}`,
          demandScore: 92,
          competitionScore: 30,
          recommendedPrice: 2500,
          angle: "Positionnement 'Prévention des pertes financières' idéal pour le statut WhatsApp.",
        },
        {
          title: `Le Kit de Démarrage Rapide : ${query} pour Débutants Impatients`,
          demandScore: 81,
          competitionScore: 50,
          recommendedPrice: 5000,
          angle: "Offre groupée avec fiches de calcul Excel et liste de fournisseurs WhatsApp.",
        },
      ]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-4xl mx-auto space-y-10 pb-20 md:pb-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12122B] text-[#F2A93B] text-xs font-semibold shadow-sm">
          <TrendingUp className="w-4 h-4 text-[#F2A93B]" /> Étude de Marché & Générateur d&apos;Idées
        </div>
        <h1 className="font-title text-3xl sm:text-4xl font-extrabold text-[#1B1B2F] tracking-tight">
          Découvre les sujets qui font recette
        </h1>
        <p className="text-sm sm:text-base text-[#1B1B2F]/80 max-w-2xl mx-auto leading-relaxed">
          Analyse la demande et les tendances sur Chariow & Maketou pour concevoir un ebook rentable en FCFA.
        </p>
      </div>

      {/* Generator Form */}
      <form onSubmit={handleSearch} className="bg-white border border-[#12122B]/15 p-6 rounded-2xl shadow-xl space-y-4">
        <label className="block text-sm font-bold text-[#12122B]">
          Saisis une thématique ou un mot-clé (ex: Importation Chine, Élevage, Canva, Poulets, Immobilier)
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            required
            placeholder="Ex: Élevage de poulets / Importation Chine..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-3 bg-gray-50 border border-[#12122B]/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F2A93B]"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#F2A93B] text-[#12122B] font-extrabold px-6 py-3.5 rounded-xl shadow-md hover:bg-[#F2A93B]/90 transition-all min-h-[48px] flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            {loading ? "Génération en cours..." : "Générer les idées"}
          </button>
        </div>
      </form>

      {/* Results View */}
      {generatedIdeas && (
        <div className="space-y-6 animate-fade-in">
          <h2 className="font-title text-2xl font-bold text-[#12122B] flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#F2A93B]" /> Idées classées pour &quot;{query}&quot;
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {generatedIdeas.map((idea, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#12122B]/15 p-6 rounded-2xl shadow-sm space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#F2A93B] uppercase">
                    Option #{idx + 1} • Demande {idea.demandScore}/100
                  </span>
                  <span className="text-xs font-bold text-[#2F9E68]">
                    Prix recommandé : {formatFCFA(idea.recommendedPrice)}
                  </span>
                </div>

                <h3 className="font-title text-lg font-bold text-[#12122B]">
                  {idea.title}
                </h3>

                <p className="text-xs text-[#1B1B2F]/80 leading-relaxed font-medium">
                  <strong>Angle d&apos;attaque :</strong> {idea.angle}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs text-[#12122B]/70 border-t border-gray-100">
                  <span>Concurrence : {idea.competitionScore < 40 ? 'Faible 🚀' : 'Modérée ⚠️'}</span>
                  <Link href="/valider" className="font-bold text-[#12122B] hover:underline flex items-center gap-1 min-h-[44px]">
                    Tester en validation <ArrowRight className="w-3.5 h-3.5 text-[#F2A93B]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
