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
  Lock,
  Moon,
  Sun
} from 'lucide-react';
import { formatFCFA } from '@/lib/utils';

export default function ComptePage() {
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [reports, setReports] = useState<any[]>([]);
  const [subscription, setSubscription] = useState({
    planName: 'Créateur (Tarif Fondateur)',
    status: 'Actif',
    price: '2 000 FCFA / mois',
  });
  const [selectedReport, setSelectedReport] = useState<any | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('ebookcheck_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error(e);
      }
    }

    const isDark = localStorage.getItem('ebookcheck_theme') === 'dark';
    setDarkMode(isDark);

    try {
      const savedReports = JSON.parse(localStorage.getItem('ebookcheck_reports') || '[]');
      setReports(savedReports);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = !darkMode;
    setDarkMode(nextTheme);
    if (nextTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ebookcheck_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ebookcheck_theme', 'light');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    const userData = { email: emailInput };
    setUser(userData);
    localStorage.setItem('ebookcheck_user', JSON.stringify(userData));
  };

  const handleGoogleLogin = () => {
    const googleUser = { email: 'vendeur.google@gmail.com', name: 'Entrepreneur Google' };
    setUser(googleUser);
    localStorage.setItem('ebookcheck_user', JSON.stringify(googleUser));
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
      <div className="min-h-screen py-10 px-4 sm:px-6 max-w-md mx-auto space-y-6 pb-20 md:pb-12">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#12122B] dark:bg-[#F2A93B] text-[#F2A93B] dark:text-[#12122B] rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <User className="w-6 h-6" />
          </div>
          <h1 className="font-title text-2xl font-bold text-[#1B1B2F] dark:text-[#FAF3E7]">Mon Espace Ebook Check</h1>
          <p className="text-xs text-[#1B1B2F]/70 dark:text-[#FAF3E7]/70">
            Connecte-toi pour retrouver ton historique de diagnostics et gérer tes abonnements Mobile Money.
          </p>
        </div>

        <div className="bg-white dark:bg-[#12122B] border border-[#12122B]/15 dark:border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
          {/* Google OAuth Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white dark:bg-white/10 text-[#12122B] dark:text-[#FAF3E7] border border-gray-300 dark:border-white/20 font-bold text-xs py-3 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2 min-h-[48px]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            Continuer avec Google (1 clic)
          </button>

          <div className="relative text-center my-2">
            <span className="bg-white dark:bg-[#12122B] px-2 text-[10px] text-gray-400 font-bold uppercase">ou par e-mail</span>
            <div className="absolute inset-0 top-1/2 border-t border-gray-200 dark:border-white/10 -z-10" />
          </div>

          <form onSubmit={handleLogin} className="space-y-3">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#12122B] dark:text-[#FAF3E7] uppercase">Adresse E-mail</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="vendeur@gmail.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-4 py-3 pl-10 bg-gray-50 dark:bg-white/5 border border-[#12122B]/20 dark:border-white/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F2A93B] text-[#12122B] dark:text-[#FAF3E7]"
                />
                <Mail className="w-4 h-4 text-[#12122B]/40 dark:text-white/40 absolute left-3 top-3.5" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#12122B] dark:text-[#FAF3E7] uppercase">Mot de passe</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-3 pl-10 bg-gray-50 dark:bg-white/5 border border-[#12122B]/20 dark:border-white/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F2A93B] text-[#12122B] dark:text-[#FAF3E7]"
                />
                <Lock className="w-4 h-4 text-[#12122B]/40 dark:text-white/40 absolute left-3 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#F2A93B] text-[#12122B] font-extrabold text-sm py-3.5 rounded-xl shadow-md hover:bg-[#F2A93B]/90 transition-all min-h-[48px]"
            >
              {isSignUp ? "Créer mon Compte" : "Se Connecter"}
            </button>
          </form>

          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs font-semibold text-[#12122B] dark:text-[#F2A93B] hover:underline"
            >
              {isSignUp ? "Déjà un compte ? Se connecter" : "Pas encore de compte ? S'inscrire"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-4xl mx-auto space-y-8 pb-20 md:pb-12">
      {/* Header Banner */}
      <div className="bg-[#12122B] text-[#FAF3E7] p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F2A93B] text-[#12122B] flex items-center justify-center font-bold text-lg shadow-md">
            {user.email[0].toUpperCase()}
          </div>
          <div>
            <span className="text-xs text-[#F2A93B] font-semibold">Compte Membre Authentifié</span>
            <h2 className="font-title text-xl font-bold">{user.email}</h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="px-3 py-2 bg-white/10 hover:bg-white/20 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 min-h-[44px]"
          >
            {darkMode ? <Sun className="w-4 h-4 text-[#F2A93B]" /> : <Moon className="w-4 h-4 text-[#F2A93B]" />}
            <span>{darkMode ? "Thème Clair" : "Thème Sombre"}</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-xs font-bold rounded-xl transition-colors flex items-center gap-2 min-h-[44px]"
          >
            <LogOut className="w-4 h-4" /> Déconnexion
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Subscription details card */}
        <div className="bg-white dark:bg-[#12122B] border border-[#12122B]/15 dark:border-white/10 p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#12122B]/60 dark:text-white/60 uppercase">Mon Abonnement</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#2F9E68]/15 text-[#2F9E68] uppercase">
              {subscription.status}
            </span>
          </div>

          <div className="space-y-1">
            <p className="font-title text-xl font-bold text-[#12122B] dark:text-[#FAF3E7]">{subscription.planName}</p>
            <p className="text-xs text-[#12122B]/70 dark:text-[#FAF3E7]/70">{subscription.price}</p>
          </div>

          <Link
            href="/tarifs"
            className="block w-full text-center bg-[#F2A93B] text-[#12122B] font-extrabold text-xs py-3 rounded-xl hover:bg-[#F2A93B]/90 transition-all min-h-[44px] flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" /> Gérer mon Pass VIP
          </Link>
        </div>

        {/* History Overview */}
        <div className="md:col-span-2 bg-white dark:bg-[#12122B] border border-[#12122B]/15 dark:border-white/10 p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-title text-lg font-bold text-[#12122B] dark:text-[#FAF3E7] flex items-center gap-2">
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
              <p className="text-xs text-[#12122B]/60 dark:text-[#FAF3E7]/60">Aucun rapport sauvegardé pour l&apos;instant.</p>
              <div className="flex justify-center gap-3">
                <Link
                  href="/diagnostic"
                  className="px-4 py-2 bg-[#12122B] dark:bg-[#F2A93B] text-[#FAF3E7] dark:text-[#12122B] text-xs font-bold rounded-xl transition-colors min-h-[44px] flex items-center"
                >
                  Diagnostic 0 Vente
                </Link>
                <Link
                  href="/valider"
                  className="px-4 py-2 bg-[#F2A93B] text-[#12122B] text-xs font-bold rounded-xl transition-colors min-h-[44px] flex items-center"
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
                  className="p-4 bg-gray-50 dark:bg-white/5 border border-[#12122B]/10 dark:border-white/10 rounded-xl flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-[#F2A93B] uppercase">
                      {item.type === 'validation' ? 'Validation Idée' : 'Diagnostic 0 Vente'}
                    </span>
                    <h4 className="font-title text-sm font-bold text-[#12122B] dark:text-[#FAF3E7]">
                      {item.title || item.subject}
                    </h4>
                    <p className="text-[11px] text-[#12122B]/60 dark:text-[#FAF3E7]/60">
                      Généré le {new Date(item.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-title text-base font-bold text-[#12122B] dark:text-[#FAF3E7]">
                      {item.overallScore || item.viabilityScore}/100
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#12122B]/40 dark:text-white/40" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
