'use client';

import { useState } from 'react';
import { Search, Sparkles, TrendingUp, ShieldCheck, ArrowRight, RefreshCw, AlertTriangle, Lightbulb, Zap } from 'lucide-react';
import { MarketIdea } from '@/app/api/etude-de-marche/route';

export default function EtudeDeMarchePage() {
  const [sector, setSector] = useState<'business' | 'sante_bienetre'>('business');
  const [userPlan, setUserPlan] = useState<'gratuit' | 'createur' | 'pro'>('pro');
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<MarketIdea[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleRunAnalysis = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/etude-de-marche', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sector, userPlan }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de la génération des idées.');
      }

      setIdeas(data.ideas || []);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12122B] text-[#F2A93B] text-xs font-semibold shadow-sm">
          <TrendingUp className="w-4 h-4 text-[#F2A93B]" /> Moteur de Demande & Tendance FCFA
        </div>
        <h1 className="font-title text-3xl sm:text-4xl font-extrabold text-[#1B1B2F] dark:text-[#F5F5F3] tracking-tight">
          Étude de Marché & Générateur d&apos;Idées Gagnantes
        </h1>
        <p className="text-sm sm:text-base text-[#1B1B2F]/80 dark:text-[#F5F5F3]/80 max-w-2xl mx-auto leading-relaxed">
          Trouve les niches d&apos;ebooks les plus demandées en Afrique de l&apos;Ouest en croisant les données de recherche Google & WhatsApp avec le niveau de concurrence Chariow.
        </p>
      </div>

      {/* Control Panel */}
      <div className="bg-[#FAF8F3] dark:bg-[#1C1C36] border border-[#12122B]/15 rounded-3xl p-6 sm:p-8 shadow-lg space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1B1B2F] dark:text-[#F5F5F3]">
              Secteur d&apos;Activité
            </label>
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value as any)}
              className="w-full px-4 py-3 bg-white dark:bg-[#12122B] border border-[#12122B]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F2A93B] text-sm text-[#1B1B2F] dark:text-white"
            >
              <option value="business">Business, Importation & E-commerce</option>
              <option value="sante_bienetre">Santé, Beauté & Alimentation Locale</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1B1B2F] dark:text-[#F5F5F3]">
              Formule d&apos;Accès
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setUserPlan('gratuit')}
                className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${userPlan === 'gratuit' ? 'bg-[#12122B] text-white' : 'bg-white dark:bg-[#12122B] border border-[#12122B]/20 text-[#12122B] dark:text-white'}`}
              >
                Gratuit (Self-service)
              </button>
              <button
                type="button"
                onClick={() => setUserPlan('pro')}
                className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${userPlan === 'pro' ? 'bg-[#F2A93B] text-[#12122B]' : 'bg-white dark:bg-[#12122B] border border-[#12122B]/20 text-[#12122B] dark:text-white'}`}
              >
                Pro (Complet)
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={handleRunAnalysis}
          disabled={loading}
          className="w-full bg-[#F2A93B] text-[#12122B] font-extrabold text-base py-4 rounded-xl shadow-xl hover:bg-[#F2A93B]/90 transition-all flex items-center justify-center gap-2 min-h-[52px]"
        >
          {loading ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" /> Analyse des données de marché en cours...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" /> Générer les Idées Rentables de la Niche
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-[#E85C4A]/15 border border-[#E85C4A] text-[#E85C4A] rounded-xl text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Ideas output grid */}
      {ideas.length > 0 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-title text-xl font-bold text-[#1B1B2F] dark:text-[#F5F5F3]">
              {ideas.length} Idées d&apos;Ebooks Recommandées
            </h2>
            <span className="text-xs text-[#2F9E68] font-bold bg-[#2F9E68]/10 px-3 py-1 rounded-full">
              Mise à jour directe • Demande Qualifiée
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ideas.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#1C1C36] border border-[#12122B]/10 rounded-3xl p-6 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-[#F2A93B]/20 text-[#12122B] dark:text-[#F2A93B]">
                      {item.niche}
                    </span>
                    <span className="font-title text-base font-extrabold text-[#2F9E68]">
                      {item.recommendedPriceFcfa.toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>

                  <h3 className="font-title text-lg font-bold text-[#12122B] dark:text-[#F5F5F3]">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#1B1B2F]/70 dark:text-[#F5F5F3]/70">
                    <strong className="text-[#12122B] dark:text-white">Cible :</strong> {item.targetAudience}
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-[#FAF8F3] dark:bg-[#12122B] p-2.5 rounded-xl text-center">
                      <p className="text-[10px] text-[#1B1B2F]/60 dark:text-[#F5F5F3]/60 font-semibold">Score Demande</p>
                      <p className="font-title text-lg font-bold text-[#2F9E68]">{item.demandScore}/100</p>
                    </div>
                    <div className="bg-[#FAF8F3] dark:bg-[#12122B] p-2.5 rounded-xl text-center">
                      <p className="text-[10px] text-[#1B1B2F]/60 dark:text-[#F5F5F3]/60 font-semibold">Concurrence</p>
                      <p className="font-title text-lg font-bold text-[#F2A93B]">{item.competitionScore}/100</p>
                    </div>
                  </div>

                  <div className="bg-[#12122B]/5 dark:bg-white/5 p-3 rounded-xl space-y-1.5 text-xs text-[#1B1B2F] dark:text-[#F5F5F3]">
                    <p className="font-bold text-[#F2A93B]">⚡ Angle Spécifique IA :</p>
                    <p>{item.specificAngle}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 dark:border-white/10 text-[11px] text-[#1B1B2F]/60 dark:text-[#F5F5F3]/60">
                  {item.justification}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
