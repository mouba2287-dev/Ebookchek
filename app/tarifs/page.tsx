'use client';

import { useState } from 'react';
import { Check, Sparkles, Zap, ShieldCheck, ArrowRight, Smartphone } from 'lucide-react';
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
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-5xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12122B] text-[#F2A93B] text-xs font-semibold shadow-sm">
          <Zap className="w-4 h-4 text-[#F2A93B]" /> Tarifs Transparents en FCFA
        </div>
        <h1 className="font-title text-3xl sm:text-4xl font-extrabold text-[#1B1B2F] tracking-tight">
          Investis dans ce qui vend vraiment
        </h1>
        <p className="text-sm sm:text-base text-[#1B1B2F]/80 max-w-2xl mx-auto leading-relaxed">
          Choisis le forfait adapté à tes objectifs : teste gratuitement ou débloque des diagnostics illimités par Mobile Money.
        </p>
      </div>

      {hasPaid && (
        <div className="p-4 bg-[#2F9E68]/15 border border-[#2F9E68] text-[#2F9E68] rounded-2xl text-center font-bold text-sm">
          🎉 Félicitations ! Votre accès Premium Ebook Check est débloqué.
        </div>
      )}

      {/* Pricing cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Free Plan */}
        <div className="bg-white border border-[#12122B]/15 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#12122B]/60 uppercase tracking-wider">
              Découverte
            </span>
            <h3 className="font-title text-2xl font-bold text-[#12122B]">Gratuit</h3>
            <div className="font-title text-3xl font-extrabold text-[#12122B]">
              0 <span className="text-sm font-normal text-[#12122B]/60">FCFA</span>
            </div>
            <p className="text-xs text-[#12122B]/80 leading-relaxed">
              Pour tester l&apos;analyse de ton premier ebook sans débourser un franc.
            </p>
            <ul className="space-y-2.5 text-xs text-[#12122B] pt-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2F9E68]" /> 1 Diagnostic gratuit par mois
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2F9E68]" /> Score sur 5 axes stratégiques
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2F9E68]" /> Recommandations prioritaires
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2F9E68]" /> Partage d&apos;image WhatsApp
              </li>
            </ul>
          </div>

          <button
            onClick={() => handlePlanSelect('Gratuit', 0)}
            className="w-full bg-[#12122B]/10 text-[#12122B] hover:bg-[#12122B]/20 font-bold py-3.5 rounded-xl transition-all min-h-[48px] flex items-center justify-center gap-1.5"
          >
            Tester Maintenant
          </button>
        </div>

        {/* Paid Single Report */}
        <div className="bg-white border-2 border-[#F2A93B] rounded-3xl p-6 shadow-lg flex flex-col justify-between space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#F2A93B] text-[#12122B] font-extrabold text-[10px] px-3 py-1 rounded-bl-xl uppercase tracking-wider">
            Recommandé
          </div>

          <div className="space-y-4">
            <span className="text-xs font-bold text-[#F2A93B] uppercase tracking-wider">
              À l&apos;unité
            </span>
            <h3 className="font-title text-2xl font-bold text-[#12122B]">Rapport Détaillé</h3>
            <div className="font-title text-3xl font-extrabold text-[#12122B]">
              2 500 <span className="text-sm font-normal text-[#12122B]/60">FCFA</span>
            </div>
            <p className="text-xs text-[#12122B]/80 leading-relaxed">
              Pour débloquer une analyse approfondie sur un ebook spécifique qui ne vend pas.
            </p>
            <ul className="space-y-2.5 text-xs text-[#12122B] pt-2">
              <li className="flex items-center gap-2 font-semibold">
                <Check className="w-4 h-4 text-[#2F9E68]" /> Tout le plan Gratuit
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2F9E68]" /> Moteur d&apos;idées de titres accrocheurs
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2F9E68]" /> Audit de prix en FCFA
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2F9E68]" /> Exportation du rapport en image HD
              </li>
            </ul>
          </div>

          <button
            onClick={() => handlePlanSelect('Rapport Détaillé', 2500)}
            className="w-full bg-[#F2A93B] text-[#12122B] hover:bg-[#F2A93B]/90 font-extrabold py-3.5 rounded-xl transition-all shadow-md min-h-[48px] flex items-center justify-center gap-2"
          >
            <Smartphone className="w-4 h-4" /> Payer 2 500 FCFA
          </button>
        </div>

        {/* Monthly Unlimited Pass */}
        <div className="bg-[#12122B] text-[#FAF3E7] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#F2A93B] uppercase tracking-wider">
              Pass VIP
            </span>
            <h3 className="font-title text-2xl font-bold text-white">Pass Mensuel</h3>
            <div className="font-title text-3xl font-extrabold text-[#F2A93B]">
              7 500 <span className="text-sm font-normal text-white/60">FCFA / mois</span>
            </div>
            <p className="text-xs text-[#FAF3E7]/80 leading-relaxed">
              Pour les infopreneurs et créateurs prolifiques qui publient plusieurs ebooks.
            </p>
            <ul className="space-y-2.5 text-xs text-[#FAF3E7] pt-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2F9E68]" /> Diagnostics & Validations Illimités
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2F9E68]" /> Accès à l&apos;historique complet sur votre compte
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2F9E68]" /> Conseils stratégiques WhatsApp prioritaires
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2F9E68]" /> Sans engagement, annulation à tout moment
              </li>
            </ul>
          </div>

          <button
            onClick={() => handlePlanSelect('Pass Mensuel Illimité', 7500)}
            className="w-full bg-[#F2A93B] text-[#12122B] hover:bg-[#F2A93B]/90 font-extrabold py-3.5 rounded-xl transition-all shadow-md min-h-[48px] flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#12122B]" /> S&apos;abonner (7 500 FCFA)
          </button>
        </div>
      </div>

      {/* Payment Security Footer */}
      <div className="bg-white border border-[#12122B]/10 rounded-2xl p-6 text-center space-y-3">
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#12122B]">
          <ShieldCheck className="w-5 h-5 text-[#2F9E68]" />
          <span>Compatible avec tous les comptes Mobile Money en Afrique de l&apos;Ouest & du Centre</span>
        </div>
        <p className="text-xs text-[#12122B]/70">
          MTN Mobile Money, Moov Money, Orange Money & Wave. Paiement direct sans redirection compliquée.
        </p>
      </div>

      {/* Payment Modal */}
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
