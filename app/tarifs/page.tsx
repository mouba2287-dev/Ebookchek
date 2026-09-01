'use client';

import { useState } from 'react';
import { Check, Sparkles, Zap, ShieldCheck, ArrowRight, Smartphone, Star } from 'lucide-react';
import MobileMoneyModal from '@/components/MobileMoneyModal';
import { formatFCFA } from '@/lib/utils';

export default function TarifsPage() {
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: number;
  } | null>(null);

  const [hasPaid, setHasPaid] = useState(false);

  const handlePlanSelect = (name: string, price: number) => {
    if (price === 0) {
      window.location.href = '/diagnostic';
      return;
    }
    setSelectedPlan({ name, price });
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-5xl mx-auto space-y-10 pb-20 md:pb-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12122B] text-[#F2A93B] text-xs font-semibold shadow-sm">
          <Zap className="w-4 h-4 text-[#F2A93B]" /> Tarifs en FCFA pour l&apos;Afrique Francophone
        </div>
        <h1 className="font-title text-3xl sm:text-4xl font-extrabold text-[#1B1B2F] dark:text-[#FAF3E7] tracking-tight">
          Abonnements simples & déblocage Mobile Money
        </h1>
        <p className="text-sm sm:text-base text-[#1B1B2F]/80 dark:text-[#FAF3E7]/80 max-w-2xl mx-auto leading-relaxed">
          Choisis le forfait adapté à ta fréquence de publication : commence gratuitement ou débloque nos fonctionnalités illimitées.
        </p>
      </div>

      {hasPaid && (
        <div className="p-4 bg-[#2F9E68]/15 border border-[#2F9E68] text-[#2F9E68] rounded-2xl text-center font-bold text-sm">
          🎉 Félicitations ! Votre accès Ebook Check est débloqué avec succès.
        </div>
      )}

      {/* Pricing cards grid - 3 Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Tier 1: Gratuit */}
        <div className="bg-white dark:bg-[#12122B] border border-[#12122B]/15 dark:border-white/10 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#12122B]/60 dark:text-white/60 uppercase tracking-wider">
              Découverte
            </span>
            <h3 className="font-title text-2xl font-bold text-[#12122B] dark:text-[#FAF3E7]">Gratuit</h3>
            <div className="font-title text-3xl font-extrabold text-[#12122B] dark:text-[#FAF3E7]">
              0 <span className="text-sm font-normal text-[#12122B]/60 dark:text-white/60">FCFA</span>
            </div>
            <p className="text-xs text-[#12122B]/80 dark:text-[#FAF3E7]/80 leading-relaxed">
              Pour tester l&apos;analyse de ton premier ebook sans engager de frais.
            </p>
            <ul className="space-y-2.5 text-xs text-[#12122B] dark:text-[#FAF3E7] pt-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2F9E68]" /> 1 Diagnostic/mois
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2F9E68]" /> 1 Validation d&apos;idée/mois
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2F9E68]" /> Étude de marché en self-service
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2F9E68]" /> Accès complet à l&apos;Académie
              </li>
            </ul>
          </div>

          <button
            onClick={() => handlePlanSelect('Gratuit', 0)}
            className="w-full bg-[#12122B]/10 dark:bg-white/10 text-[#12122B] dark:text-[#FAF3E7] font-bold py-3.5 rounded-xl transition-all min-h-[48px] flex items-center justify-center gap-1.5"
          >
            Commencer Gratuitement
          </button>
        </div>

        {/* Tier 2: Créateur (Tarif Fondateur) */}
        <div className="bg-white dark:bg-[#12122B] border-2 border-[#F2A93B] rounded-3xl p-6 shadow-lg flex flex-col justify-between space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#F2A93B] text-[#12122B] font-extrabold text-[10px] px-3 py-1 rounded-bl-xl uppercase tracking-wider flex items-center gap-1">
            <Star className="w-3 h-3 fill-[#12122B]" /> Offre Fondateur
          </div>

          <div className="space-y-4">
            <span className="text-xs font-bold text-[#F2A93B] uppercase tracking-wider">
              Populaire
            </span>
            <h3 className="font-title text-2xl font-bold text-[#12122B] dark:text-[#FAF3E7]">Palier Créateur</h3>
            <div className="space-y-0.5">
              <div className="font-title text-3xl font-extrabold text-[#12122B] dark:text-[#FAF3E7]">
                2 000 <span className="text-sm font-normal text-[#12122B]/60 dark:text-white/60">FCFA / mois</span>
              </div>
              <p className="text-[11px] text-[#2F9E68] font-bold">Verrouillé à vie (au lieu de 3 000 FCFA)</p>
            </div>

            <p className="text-xs text-[#12122B]/80 dark:text-[#FAF3E7]/80 leading-relaxed">
              Pour les créateurs réguliers qui publient 1 à 3 ebooks par trimestre.
            </p>
            <ul className="space-y-2.5 text-xs text-[#12122B] dark:text-[#FAF3E7] pt-2">
              <li className="flex items-center gap-2 font-semibold">
                <Check className="w-4 h-4 text-[#2F9E68]" /> Diagnostics & Validations Illimités
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2F9E68]" /> 1 Étude de marché auto générée/mois
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2F9E68]" /> Analyse Chariow par capture d&apos;écran (Vision IA)
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2F9E68]" /> Option annuelle à 30 000 FCFA/an
              </li>
            </ul>
          </div>

          <button
            onClick={() => handlePlanSelect('Créateur (Tarif Fondateur)', 2000)}
            className="w-full bg-[#F2A93B] text-[#12122B] font-extrabold py-3.5 rounded-xl transition-all shadow-md min-h-[48px] flex items-center justify-center gap-2"
          >
            <Smartphone className="w-4 h-4" /> Activer (2 000 FCFA/mois)
          </button>
        </div>

        {/* Tier 3: Pro */}
        <div className="bg-[#12122B] text-[#FAF3E7] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#F2A93B] uppercase tracking-wider">
              Illimité VIP
            </span>
            <h3 className="font-title text-2xl font-bold text-white">Palier Pro</h3>
            <div className="font-title text-3xl font-extrabold text-[#F2A93B]">
              8 000 <span className="text-sm font-normal text-white/60">FCFA / mois</span>
            </div>
            <p className="text-xs text-[#FAF3E7]/80 leading-relaxed">
              Pour les infopreneurs exigeants qui gèrent un catalogue complet.
            </p>
            <ul className="space-y-2.5 text-xs text-[#FAF3E7] pt-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2F9E68]" /> Tout le palier Créateur inclus
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2F9E68]" /> Études de marché illimitées à la demande
              </li>
              <li className="flex items-center gap-2 font-bold text-[#F2A93B]">
                <Check className="w-4 h-4 text-[#2F9E68]" /> Générateur d&apos;Idées exclusives par IA
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2F9E68]" /> Option annuelle à 80 000 FCFA/an
              </li>
            </ul>
          </div>

          <button
            onClick={() => handlePlanSelect('Palier Pro Illimité', 8000)}
            className="w-full bg-[#F2A93B] text-[#12122B] font-extrabold py-3.5 rounded-xl transition-all shadow-md min-h-[48px] flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#12122B]" /> Choisir le Pass Pro (8 000 FCFA)
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#12122B] border border-[#12122B]/10 dark:border-white/10 rounded-2xl p-6 text-center space-y-3">
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#12122B] dark:text-[#FAF3E7]">
          <ShieldCheck className="w-5 h-5 text-[#2F9E68]" />
          <span>Payez en toute sécurité par MTN, Moov, Orange Money ou Wave</span>
        </div>
      </div>

      {selectedPlan && (
        <MobileMoneyModal
          isOpen={!!selectedPlan}
          onClose={() => setSelectedPlan(null)}
          planName={selectedPlan.name}
          amountFcfa={selectedPlan.price}
          onSuccess={() => setHasPaid(true)}
        />
      )}
    </div>
  );
}
