'use client';

import { useState } from 'react';
import { Check, Sparkles, Zap, ShieldCheck, Smartphone, Star } from 'lucide-react';
import MobileMoneyModal from '@/components/MobileMoneyModal';

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
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-6xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12122B] text-[#F2A93B] text-xs font-semibold shadow-sm">
          <Zap className="w-4 h-4 text-[#F2A93B]" /> Tarifs Transparents en FCFA
        </div>
        <h1 className="font-title text-3xl sm:text-4xl font-extrabold text-[#1B1B2F] dark:text-[#F5F5F3] tracking-tight">
          Paliers d&apos;Abonnements Ebook Check
        </h1>
        <p className="text-sm sm:text-base text-[#1B1B2F]/80 dark:text-[#F5F5F3]/80 max-w-2xl mx-auto leading-relaxed">
          Paiement facile par MTN Mobile Money. Annulable à tout moment.
        </p>
      </div>

      {hasPaid && (
        <div className="p-4 bg-[#2F9E68]/15 border border-[#2F9E68] text-[#2F9E68] rounded-2xl text-center font-bold text-sm">
          🎉 Félicitations ! Votre abonnement Ebook Check est débloqué.
        </div>
      )}

      {/* Founder Offer Badge */}
      <div className="bg-[#F2A93B]/20 border border-[#F2A93B] rounded-2xl p-4 text-center space-y-1 max-w-2xl mx-auto">
        <p className="text-xs font-bold text-[#12122B] dark:text-[#F2A93B] flex items-center justify-center gap-1.5">
          <Star className="w-4 h-4 fill-[#F2A93B] text-[#12122B]" /> Offre Tarif Fondateur (100 premiers inscrits)
        </p>
        <p className="text-xs text-[#12122B]/80 dark:text-[#FAF8F3]/80">
          Obtiens le plan <strong>Créateur à 2 000 FCFA/mois</strong> au lieu de 3 000 FCFA, verrouillé à vie !
        </p>
      </div>

      {/* Pricing cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Gratuit Plan */}
        <div className="bg-white dark:bg-[#1C1C36] border border-[#12122B]/15 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#12122B]/60 dark:text-[#F5F5F3]/60 uppercase tracking-wider">
              Découverte
            </span>
            <h3 className="font-title text-2xl font-bold text-[#12122B] dark:text-white">Gratuit</h3>
            <div className="font-title text-3xl font-extrabold text-[#12122B] dark:text-white">
              0 <span className="text-sm font-normal text-[#12122B]/60 dark:text-[#F5F5F3]/60">FCFA</span>
            </div>
            <p className="text-xs text-[#12122B]/80 dark:text-[#F5F5F3]/80 leading-relaxed">
              Pour les créateurs qui débutent et veulent tester la viabilité d&apos;un premier projet.
            </p>
            <ul className="space-y-2.5 text-xs text-[#12122B] dark:text-[#F5F5F3] pt-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2F9E68]" /> 1 Diagnostic 0 Vente / mois
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2F9E68]" /> 1 Validation d&apos;idée / mois
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2F9E68]" /> Étude de marché Self-service
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2F9E68]" /> Accès complet à l&apos;Académie
              </li>
            </ul>
          </div>

          <button
            onClick={() => handlePlanSelect('Gratuit', 0)}
            className="w-full bg-[#12122B]/10 dark:bg-white/10 text-[#12122B] dark:text-white hover:bg-[#12122B]/20 font-bold py-3.5 rounded-xl transition-all min-h-[48px] flex items-center justify-center gap-1.5"
          >
            Tester Gratuitement
          </button>
        </div>

        {/* Créateur Plan */}
        <div className="bg-white dark:bg-[#1C1C36] border-2 border-[#F2A93B] rounded-3xl p-6 shadow-lg flex flex-col justify-between space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#F2A93B] text-[#12122B] font-extrabold text-[10px] px-3 py-1 rounded-bl-xl uppercase tracking-wider">
            Populaire
          </div>

          <div className="space-y-4">
            <span className="text-xs font-bold text-[#F2A93B] uppercase tracking-wider">
              Palier Créateur
            </span>
            <h3 className="font-title text-2xl font-bold text-[#12122B] dark:text-white">Créateur</h3>
            <div className="font-title text-3xl font-extrabold text-[#12122B] dark:text-white">
              3 000 <span className="text-sm font-normal text-[#12122B]/60 dark:text-[#F5F5F3]/60">FCFA / mois</span>
            </div>
            <p className="text-xs text-[#12122B]/80 dark:text-[#F5F5F3]/80 leading-relaxed">
              Ou 30 000 FCFA/an (2 mois offerts). Parfait pour vendre régulièrement sur WhatsApp.
            </p>
            <ul className="space-y-2.5 text-xs text-[#12122B] dark:text-[#F5F5F3] pt-2">
              <li className="flex items-center gap-2 font-semibold">
                <Check className="w-4 h-4 text-[#2F9E68]" /> Diagnostics & Validations Illimités
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2F9E68]" /> 1 Analyse de marché auto / mois
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2F9E68]" /> Analyse Chariow (3 captures max)
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2F9E68]" /> Accès complet à l&apos;Académie
              </li>
            </ul>
          </div>

          <button
            onClick={() => handlePlanSelect('Créateur', 3000)}
            className="w-full bg-[#F2A93B] text-[#12122B] hover:bg-[#F2A93B]/90 font-extrabold py-3.5 rounded-xl transition-all shadow-md min-h-[48px] flex items-center justify-center gap-2"
          >
            <Smartphone className="w-4 h-4" /> Passer à Créateur (3 000 FCFA)
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-[#12122B] text-[#FAF3E7] border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#F2A93B] uppercase tracking-wider">
              Palier Pro
            </span>
            <h3 className="font-title text-2xl font-bold text-white">Pro</h3>
            <div className="font-title text-3xl font-extrabold text-[#F2A93B]">
              8 000 <span className="text-sm font-normal text-white/60">FCFA / mois</span>
            </div>
            <p className="text-xs text-[#FAF3E7]/80 leading-relaxed">
              Ou 80 000 FCFA/an. Pour les infopreneurs, agences et éditeurs prolifiques.
            </p>
            <ul className="space-y-2.5 text-xs text-[#FAF3E7] pt-2">
              <li className="flex items-center gap-2 font-bold">
                <Check className="w-4 h-4 text-[#2F9E68]" /> Étude de marché à la demande & Illimitée
              </li>
              <li className="flex items-center gap-2 font-bold">
                <Check className="w-4 h-4 text-[#2F9E68]" /> Générateur d&apos;Idées Pro par IA
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2F9E68]" /> Analyse Chariow multi-captures Illimitée
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2F9E68]" /> Support prioritaire WhatsApp
              </li>
            </ul>
          </div>

          <button
            onClick={() => handlePlanSelect('Pro', 8000)}
            className="w-full bg-[#F2A93B] text-[#12122B] hover:bg-[#F2A93B]/90 font-extrabold py-3.5 rounded-xl transition-all shadow-md min-h-[48px] flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#12122B]" /> S&apos;abonner Pro (8 000 FCFA)
          </button>
        </div>
      </div>

      {/* Payment Security Footer */}
      <div className="bg-white dark:bg-[#1C1C36] border border-[#12122B]/10 rounded-2xl p-6 text-center space-y-3">
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#12122B] dark:text-[#F5F5F3]">
          <ShieldCheck className="w-5 h-5 text-[#2F9E68]" />
          <span>Compatible MTN Mobile Money</span>
        </div>
        <p className="text-xs text-[#12122B]/70 dark:text-[#F5F5F3]/70">
          Sécurité garantie. Activation automatique dès la confirmation de la transaction.
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
