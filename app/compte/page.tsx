'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  User,
  History,
  CreditCard,
  LogOut,
  CheckCircle2,
  Sparkles,
  FileText,
  ArrowRight,
  ShieldCheck,
  Trash2,
  Mail,
  Lock
} from 'lucide-react';
import { formatFCFA } from '@/lib/utils';

export default function ComptePage() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [reports, setReports] = useState<any[]>([]);
  const [subscription, setSubscription] = useState({
    planName: 'Gratuit',
    status: 'Actif',
    quotaRemaining: 1,
  });
  const [selectedReport, setSelectedReport] = useState<any | null>(null);

  useEffect(() => {
    // Check local auth state
    const savedUser = localStorage.getItem('ebookcheck_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error(e);
      }
    }

    // Load saved reports from local store
    try {
      const savedReports = JSON.parse(localStorage.getItem('ebookcheck_reports') || '[]');
      setReports(savedReports);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    const userData = { email: emailInput };
    setUser(userData);
    localStorage.setItem('ebookcheck_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('ebookcheck_user');
  };

  const clearHistory = () => {
    setReports([]);
    localStorage.removeItem('ebookcheck_reports');
  };

  if (!user) {
    return (
      <div className="min-h-screen py-10 px-4 sm:px-6 max-w-md mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#12122B] text-[#F2A93B] rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <User className="w-6 h-6" />
          </div>
          <h1 className="font-title text-2xl font-bold text-[#1B1B2F]">Mon Espace Ebook Check</h1>
          <p className="text-xs text-[#1B1B2F]/70">
            Connecte-toi pour retrouver ton historique de diagnostics et gérer tes abonnements Mobile Money.
          </p>
        </div>

        <form onSubmit={handleLogin} className="bg-white border border-[#12122B]/15 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#12122B] uppercase">Adresse E-mail</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="vendeur@gmail.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-4 py-3 pl-10 bg-gray-50 border border-[#12122B]/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F2A93B]"
              />
              <Mail className="w-4 h-4 text-[#12122B]/40 absolute left-3 top-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#12122B] uppercase">Mot de passe</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 pl-10 bg-gray-50 border border-[#12122B]/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F2A93B]"
              />
              <Lock className="w-4 h-4 text-[#12122B]/40 absolute left-3 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#F2A93B] text-[#12122B] font-extrabold text-sm py-3.5 rounded-xl shadow-md hover:bg-[#F2A93B]/90 transition-all min-h-[48px]"
          >
            {isSignUp ? "Créer mon Compte" : "Se Connecter à mon Espace"}
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs font-semibold text-[#12122B] hover:underline"
            >
              {isSignUp ? "Déjà un compte ? Se connecter" : "Pas encore de compte ? S'inscrire"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-4xl mx-auto space-y-8">
      {/* User banner header */}
      <div className="bg-[#12122B] text-[#FAF3E7] p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F2A93B] text-[#12122B] flex items-center justify-center font-bold text-lg shadow-md">
            {user.email[0].toUpperCase()}
          </div>
          <div>
            <span className="text-xs text-[#F2A93B] font-semibold">Compte Membre</span>
            <h2 className="font-title text-xl font-bold">{user.email}</h2>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-bold rounded-xl transition-colors flex items-center gap-2 min-h-[44px]"
        >
          <LogOut className="w-4 h-4" /> Déconnexion
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Subscription details card */}
        <div className="bg-white border border-[#12122B]/15 p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#12122B]/60 uppercase">Mon Abonnement</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#2F9E68]/15 text-[#2F9E68] uppercase">
              {subscription.status}
            </span>
          </div>

          <div className="space-y-1">
            <p className="font-title text-2xl font-bold text-[#12122B]">{subscription.planName}</p>
            <p className="text-xs text-[#12122B]/70">Quota ce mois : {subscription.quotaRemaining} diagnostic restant</p>
          </div>

          <Link
            href="/tarifs"
            className="block w-full text-center bg-[#F2A93B] text-[#12122B] font-extrabold text-xs py-3 rounded-xl hover:bg-[#F2A93B]/90 transition-all min-h-[44px] flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" /> Passer au Pass Illimité
          </Link>
        </div>

        {/* History Overview */}
        <div className="md:col-span-2 bg-white border border-[#12122B]/15 p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-title text-lg font-bold text-[#12122B] flex items-center gap-2">
              <History className="w-5 h-5 text-[#F2A93B]" /> Historique des rapports ({reports.length})
            </h3>

            {reports.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-xs text-[#E85C4A] hover:underline flex items-center gap-1 min-h-[44px]"
              >
                <Trash2 className="w-3.5 h-3.5" /> Effacer
              </button>
            )}
          </div>

          {reports.length === 0 ? (
            <div className="py-8 text-center space-y-3">
              <p className="text-xs text-[#12122B]/60">Aucun rapport sauvegardé pour l&apos;instant.</p>
              <div className="flex justify-center gap-3">
                <Link
                  href="/diagnostic"
                  className="px-4 py-2 bg-[#12122B] text-[#FAF3E7] text-xs font-bold rounded-xl hover:bg-[#12122B]/90 transition-colors min-h-[44px] flex items-center"
                >
                  Diagnostic 0 Vente
                </Link>
                <Link
                  href="/valider"
                  className="px-4 py-2 bg-[#F2A93B] text-[#12122B] text-xs font-bold rounded-xl hover:bg-[#F2A93B]/90 transition-colors min-h-[44px] flex items-center"
                >
                  Valider une Idée
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {reports.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedReport(item)}
                  className="p-4 bg-[#FAF3E7]/60 hover:bg-[#FAF3E7] border border-[#12122B]/10 rounded-xl flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-[#F2A93B] uppercase">
                      {item.type === 'validation' ? 'Validation Idée' : 'Diagnostic 0 Vente'}
                    </span>
                    <h4 className="font-title text-sm font-bold text-[#12122B]">
                      {item.title || item.subject}
                    </h4>
                    <p className="text-[11px] text-[#12122B]/60">
                      Généré le {new Date(item.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-title text-base font-bold text-[#12122B]">
                      {item.overallScore || item.viabilityScore}/100
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#12122B]/40" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Report Modal Detail */}
      {selectedReport && (
        <div className="fixed inset-0 bg-[#12122B]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FAF3E7] border-2 border-[#12122B] w-full max-w-xl rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#F2A93B] uppercase">Détail du Rapport</span>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-xs font-bold px-3 py-1 bg-[#12122B] text-[#FAF3E7] rounded-lg min-h-[44px]"
              >
                Fermer
              </button>
            </div>

            <h3 className="font-title text-xl font-bold text-[#12122B]">
              {selectedReport.title || selectedReport.subject}
            </h3>

            <div className="bg-[#12122B] text-[#FAF3E7] p-4 rounded-xl flex items-center justify-between">
              <span className="text-xs">Score calculé :</span>
              <span className="font-title text-2xl font-bold text-[#F2A93B]">
                {selectedReport.overallScore || selectedReport.viabilityScore} / 100
              </span>
            </div>

            {selectedReport.topActions && (
              <div className="space-y-2 pt-2">
                <p className="text-xs font-bold text-[#12122B]">Actions Prioritaires :</p>
                <ul className="space-y-1 text-xs text-[#12122B]/90">
                  {selectedReport.topActions.map((act: string, i: number) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2F9E68] shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
