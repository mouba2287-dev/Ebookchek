'use client';

import { useState } from 'react';
import { Smartphone, Check, ShieldCheck, X, RefreshCw, Sparkles } from 'lucide-react';
import { formatFCFA } from '@/lib/utils';

interface MobileMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  amountFcfa: number;
  onSuccess: () => void;
}

export default function MobileMoneyModal({
  isOpen,
  onClose,
  planName,
  amountFcfa,
  onSuccess,
}: MobileMoneyModalProps) {
  const [operator, setOperator] = useState<'mtn' | 'orange' | 'moov' | 'wave'>('mtn');
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState<'input' | 'processing' | 'success'>('input');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.trim().length < 8) {
      setError('Veuillez entrer un numéro de téléphone valide (ex: 97000000).');
      return;
    }

    setError(null);
    setStep('processing');

    // Simulate FedaPay / Kkiapay USSD push request
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onSuccess();
        setStep('input');
        onClose();
      }, 1500);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 bg-[#12122B]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#FAF3E7] border-2 border-[#12122B] w-full max-w-md rounded-3xl p-6 shadow-2xl relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#12122B]/60 hover:text-[#12122B] rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#F2A93B]/20 text-[#F2A93B] rounded-2xl">
              <Smartphone className="w-6 h-6 text-[#12122B]" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#F2A93B] uppercase">Paiement Sécurisé Mobile Money</span>
              <h3 className="font-title text-xl font-bold text-[#12122B]">{planName}</h3>
            </div>
          </div>

          <div className="bg-[#12122B] text-[#FAF3E7] p-4 rounded-2xl flex items-center justify-between">
            <span className="text-xs text-[#FAF3E7]/80">Montant total</span>
            <span className="font-title text-2xl font-extrabold text-[#F2A93B]">{formatFCFA(amountFcfa)}</span>
          </div>

          {step === 'input' && (
            <form onSubmit={handlePay} className="space-y-4">
              {error && (
                <p className="text-xs text-[#E85C4A] bg-[#E85C4A]/10 p-2.5 rounded-xl border border-[#E85C4A]">
                  {error}
                </p>
              )}

              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#12122B] uppercase">
                  Choisir votre opérateur Mobile Money
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'mtn', label: 'MTN Mobile Money', color: 'bg-yellow-400 text-black' },
                    { id: 'moov', label: 'Moov Money', color: 'bg-blue-600 text-white' },
                    { id: 'orange', label: 'Orange Money', color: 'bg-orange-500 text-white' },
                    { id: 'wave', label: 'Wave Digital', color: 'bg-cyan-500 text-white' },
                  ].map((op) => (
                    <button
                      key={op.id}
                      type="button"
                      onClick={() => setOperator(op.id as any)}
                      className={`p-3 rounded-xl text-xs font-bold border-2 transition-all flex items-center justify-between min-h-[44px] ${
                        operator === op.id
                          ? 'border-[#12122B] shadow-md ring-2 ring-[#F2A93B]'
                          : 'border-transparent bg-white/70 hover:bg-white'
                      }`}
                    >
                      <span>{op.label}</span>
                      {operator === op.id && <Check className="w-4 h-4 text-[#2F9E68]" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#12122B] uppercase">
                  Numéro de téléphone du compte
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ex: 97 00 00 00 (Sénégal, Bénin, CI, Togo...)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-[#12122B]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F2A93B] text-sm text-[#12122B] font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#F2A93B] text-[#12122B] font-extrabold text-base py-3.5 rounded-xl shadow-lg hover:bg-[#F2A93B]/90 transition-all min-h-[48px] flex items-center justify-center gap-2"
              >
                Payer {formatFCFA(amountFcfa)} par {operator.toUpperCase()}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#12122B]/70 pt-1">
                <ShieldCheck className="w-4 h-4 text-[#2F9E68]" />
                <span>Paiement crypté SSL via FedaPay / Kkiapay</span>
              </div>
            </form>
          )}

          {step === 'processing' && (
            <div className="py-8 text-center space-y-4">
              <RefreshCw className="w-10 h-10 animate-spin text-[#F2A93B] mx-auto" />
              <div className="space-y-1">
                <p className="font-title text-base font-bold text-[#12122B]">Demande USSD envoyée...</p>
                <p className="text-xs text-[#12122B]/80 max-w-xs mx-auto">
                  Consultez votre téléphone <strong>({phone})</strong> et validez avec votre code PIN Mobile Money.
                </p>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="py-8 text-center space-y-4 animate-bounce">
              <div className="w-12 h-12 rounded-full bg-[#2F9E68] text-white flex items-center justify-center mx-auto shadow-lg">
                <Check className="w-7 h-7 stroke-[3]" />
              </div>
              <div className="space-y-1">
                <p className="font-title text-lg font-bold text-[#2F9E68]">Paiement Reçu !</p>
                <p className="text-xs text-[#12122B]/80">Votre accès a été activé avec succès.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
