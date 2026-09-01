'use client';

import { useState } from 'react';
import { ValidationResult } from '@/lib/scoring';
import { formatFCFA } from '@/lib/utils';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  HelpCircle,
  Lightbulb,
  Coins,
  TrendingUp,
  Share2
} from 'lucide-react';

export default function ValiderPage() {
  const [formData, setFormData] = useState({
    subject: '',
    targetAudience: '',
    intendedPriceFcfa: 3000,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ValidationResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/valider', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors du calcul de la validation.');
      }

      setResult(data.data);

      // Save validation report locally for account history
      try {
        const existingHistory = JSON.parse(localStorage.getItem('ebookcheck_reports') || '[]');
        existingHistory.unshift({ ...data.data, type: 'validation' });
        localStorage.setItem('ebookcheck_reports', JSON.stringify(existingHistory.slice(0, 20)));
      } catch (err) {
        console.error('Failed to save validation report locally:', err);
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur inattendue est survenue.');
    } finally {
      setLoading(false);
    }
  };

  const handleShareWhatsApp = () => {
    if (!result) return;
    const text = `*Validation d'idée d'Ebook — Ebook Check* 💡\nSujet : "${result.subject}"\nScore de viabilité : *${result.viabilityScore}/100*\nPrix recommandé : *${formatFCFA(result.recommendedPriceRange.optimal)}*\n\nValidation testée sur Ebook Check !`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12122B] text-[#F2A93B] text-xs font-semibold shadow-sm">
          <Lightbulb className="w-4 h-4 text-[#F2A93B]" /> Mode Validation d&apos;Idée
        </div>
        <h1 className="font-title text-3xl sm:text-4xl font-extrabold text-[#1B1B2F] tracking-tight">
          Ne crée pas un ebook qui ne se vendra pas
        </h1>
        <p className="text-sm sm:text-base text-[#1B1B2F]/80 max-w-2xl mx-auto leading-relaxed">
          Saisis ton sujet et ton public cible. Notre algorithme évalue le potentiel du marché, te recommande une fourchette de prix en FCFA et génère des titres accrocheurs.
        </p>
      </div>

      {!result ? (
        <form onSubmit={handleSubmit} className="bg-[#FAF3E7] border border-[#12122B]/15 p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
          {error && (
            <div className="p-4 bg-[#E85C4A]/15 border border-[#E85C4A] text-[#E85C4A] rounded-xl text-sm flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#1B1B2F]">
              Sujet ou Thème de l&apos;ebook <span className="text-[#E85C4A]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Élevage de poulets de chair au Bénin / Importation Chine-Afrique"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-[#1B1B2F]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F2A93B] text-sm text-[#1B1B2F]"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#1B1B2F]">
              Public Cible <span className="text-[#E85C4A]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Jeunes diplômés sans emploi, Commerçantes sur WhatsApp, Étudiants"
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-[#1B1B2F]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F2A93B] text-sm text-[#1B1B2F]"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#1B1B2F]">
              Prix envisagé (en FCFA) <span className="text-[#E85C4A]">*</span>
            </label>
            <input
              type="number"
              required
              min="500"
              step="500"
              placeholder="3000"
              value={formData.intendedPriceFcfa}
              onChange={(e) => setFormData({ ...formData, intendedPriceFcfa: Number(e.target.value) })}
              className="w-full px-4 py-3 bg-white border border-[#1B1B2F]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F2A93B] text-sm text-[#1B1B2F]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F2A93B] text-[#12122B] font-extrabold text-base py-4 rounded-xl shadow-lg hover:bg-[#F2A93B]/90 transition-all flex items-center justify-center gap-2 min-h-[52px]"
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin text-[#12122B]" />
                Évaluation du marché en cours...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-[#12122B]" />
                Valider mon Idée d&apos;Ebook
              </>
            )}
          </button>
        </form>
      ) : (
        /* Result View */
        <div className="space-y-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#12122B] text-[#FAF3E7] p-4 rounded-2xl">
            <div>
              <p className="text-xs text-[#F2A93B] font-semibold">Analyse de viabilité générée</p>
              <h2 className="font-title text-lg font-bold">{result.subject}</h2>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setResult(null)}
                className="px-4 py-2 bg-white/10 text-xs font-semibold rounded-xl hover:bg-white/20 transition-colors flex items-center gap-1.5 min-h-[44px]"
              >
                <RefreshCw className="w-4 h-4" /> Tester autre chose
              </button>
              <button
                onClick={handleShareWhatsApp}
                className="px-4 py-2 bg-[#2F9E68] text-white text-xs font-bold rounded-xl hover:bg-[#2F9E68]/90 transition-all flex items-center gap-1.5 min-h-[44px]"
              >
                <Share2 className="w-4 h-4" /> Partager
              </button>
            </div>
          </div>

          <div className="bg-[#FAF3E7] border-2 border-[#12122B] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
            {/* Viability score banner */}
            <div className="bg-[#12122B] text-[#FAF3E7] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs font-bold text-[#F2A93B] uppercase tracking-wider">
                  Potentiel Commercial Globale
                </span>
                <h3 className="font-title text-2xl font-extrabold">
                  {result.viabilityScore >= 75
                    ? "Idée à fort potentiel ! Fonce."
                    : result.viabilityScore >= 50
                    ? "Idée prometteuse avec quelques ajustements de ciblage."
                    : "Sujet de niche. Nécessite une promesse plus forte."}
                </h3>
              </div>

              <div className="shrink-0 flex flex-col items-center justify-center w-28 h-28 rounded-2xl bg-gradient-to-br from-[#F2A93B] to-[#2F9E68] text-[#12122B] shadow-xl">
                <span className="font-title text-3xl font-extrabold">{result.viabilityScore}</span>
                <span className="text-[10px] font-bold uppercase">/ 100 Score</span>
              </div>
            </div>

            {/* Market Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-[#12122B]/10 p-5 rounded-2xl space-y-1">
                <span className="text-xs font-bold text-[#12122B]/60 uppercase flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#F2A93B]" /> Saturation de la Niche
                </span>
                <p className="font-title text-lg font-bold text-[#12122B]">{result.marketSaturation}</p>
              </div>

              <div className="bg-white border border-[#12122B]/10 p-5 rounded-2xl space-y-1">
                <span className="text-xs font-bold text-[#12122B]/60 uppercase flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-[#2F9E68]" /> Prix Recommandé FCFA
                </span>
                <p className="font-title text-lg font-bold text-[#2F9E68]">
                  {formatFCFA(result.recommendedPriceRange.optimal)}
                </p>
                <p className="text-[11px] text-[#12122B]/70">{result.recommendedPriceRange.explanation}</p>
              </div>
            </div>

            {/* Differentiating Suggested Titles */}
            <div className="bg-white border border-[#12122B]/15 p-6 rounded-2xl space-y-4">
              <h4 className="font-title text-base font-bold text-[#12122B] flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#F2A93B]" />
                4 Titres à Fort Taux de Conversion à tester
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {result.suggestedTitles.map((t, idx) => (
                  <div key={idx} className="p-3 bg-[#FAF3E7] border border-[#F2A93B]/30 rounded-xl text-xs font-bold text-[#12122B]">
                    {idx + 1}. {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Advice */}
            <div className="bg-[#12122B]/5 border border-[#12122B]/10 p-6 rounded-2xl space-y-3">
              <h4 className="font-title text-base font-bold text-[#12122B]">
                Conseils pour valider tes 5 premières précommandes
              </h4>
              <ul className="space-y-2 text-xs text-[#12122B]">
                {result.keyAdvice.map((adv, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2F9E68] shrink-0 mt-0.5" />
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
