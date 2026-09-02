'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { User, ShieldCheck, LogOut, AlertCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

function CompteContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const redirectTarget = searchParams.get('redirect') || '/tableau-de-bord';
  const msgType = searchParams.get('msg');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<'gratuit' | 'createur' | 'pro'>('gratuit');

  useEffect(() => {
    // Check if user is logged in locally or via cookie
    const authCookie = document.cookie.split('; ').find(row => row.startsWith('ebookcheck_auth='));
    if (authCookie && authCookie.split('=')[1] === 'true') {
      setIsLoggedIn(true);
      setEmail(localStorage.getItem('ebookcheck_user_email') || 'createur@gmail.com');
    }
  }, []);

  const completeLogin = (userEmail: string) => {
    setIsLoggedIn(true);
    setEmail(userEmail);
    localStorage.setItem('ebookcheck_user_email', userEmail);
    document.cookie = 'ebookcheck_auth=true; path=/; max-age=2592000'; // 30 days cookie

    // Redirect to original target route
    setTimeout(() => {
      router.push(redirectTarget);
    }, 500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      completeLogin(email);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    document.cookie = 'ebookcheck_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    localStorage.removeItem('ebookcheck_user_email');
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-3xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12122B] text-[#F2A93B] text-xs font-semibold shadow-sm">
          <User className="w-4 h-4 text-[#F2A93B]" /> Espace Compte Utilisateur
        </div>
        <h1 className="font-title text-3xl sm:text-4xl font-extrabold text-[#1B1B2F] dark:text-[#F5F5F3] tracking-tight">
          {isLoggedIn ? 'Gère ton Profil & tes Abonnements' : 'Connexion / Création de Compte'}
        </h1>
        <p className="text-sm sm:text-base text-[#1B1B2F]/80 dark:text-[#F5F5F3]/80 max-w-xl mx-auto leading-relaxed">
          Crée ton compte gratuit pour sauvegarder ton historique d&apos;analyses de façon permanente et accéder à tes rapports.
        </p>
      </div>

      {/* Access Restriction Notification Banner */}
      {!isLoggedIn && msgType && (
        <div className="p-4 bg-[#F2A93B]/15 border-2 border-[#F2A93B] rounded-2xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#12122B] dark:text-[#F2A93B] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm font-medium text-[#12122B] dark:text-white space-y-1">
            <p className="font-bold">Accès réservé aux membres</p>
            <p>
              Crée un compte gratuit ou connecte-toi pour lancer ton diagnostic, accéder à l&apos;Académie et suivre la viabilité de tes ebooks.
            </p>
          </div>
        </div>
      )}

      {!isLoggedIn ? (
        /* Auth Form (Email / Password + Google OAuth UI) */
        <div className="bg-[#FAF8F3] dark:bg-[#1C1C36] border border-[#12122B]/15 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1B1B2F] dark:text-[#F5F5F3]">
                Adresse Email
              </label>
              <input
                type="email"
                required
                placeholder="nom@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-[#12122B] border border-[#12122B]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F2A93B] text-sm text-[#1B1B2F] dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1B1B2F] dark:text-[#F5F5F3]">
                Mot de passe
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-[#12122B] border border-[#12122B]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F2A93B] text-sm text-[#1B1B2F] dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#F2A93B] text-[#12122B] font-extrabold text-base py-3.5 rounded-xl shadow-md hover:bg-[#F2A93B]/90 transition-all flex items-center justify-center gap-2 min-h-[48px]"
            >
              Se Connecter / Créer un Compte Gratuit
            </button>
          </form>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-300 dark:border-white/10"></div>
            <span className="flex-shrink mx-4 text-xs font-bold text-[#1B1B2F]/60 dark:text-[#F5F5F3]/60 uppercase">Ou</span>
            <div className="flex-grow border-t border-gray-300 dark:border-white/10"></div>
          </div>

          <button
            onClick={() => completeLogin('createur.google@gmail.com')}
            className="w-full bg-white dark:bg-[#12122B] border border-[#12122B]/20 text-[#12122B] dark:text-white font-bold text-sm py-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all flex items-center justify-center gap-3 min-h-[48px]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Continuer avec Google OAuth
          </button>
        </div>
      ) : (
        /* Logged In Dashboard View */
        <div className="bg-[#FAF8F3] dark:bg-[#1C1C36] border border-[#12122B]/15 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-[#12122B]/10 dark:border-white/10">
            <div>
              <p className="text-xs text-[#2F9E68] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Connecté avec succès
              </p>
              <h2 className="font-title text-xl font-bold text-[#12122B] dark:text-[#F5F5F3]">{email}</h2>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-[#E85C4A]/15 text-[#E85C4A] text-xs font-bold rounded-xl hover:bg-[#E85C4A]/25 transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" /> Déconnexion
            </button>
          </div>

          <div className="bg-white dark:bg-[#12122B] p-5 rounded-2xl border border-[#12122B]/10 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-[#12122B] dark:text-[#F5F5F3]">
                Mon Forfait Actuel
              </span>
              <span className="text-xs font-extrabold uppercase px-2.5 py-1 rounded-full bg-[#F2A93B] text-[#12122B]">
                {currentPlan}
              </span>
            </div>
            <p className="text-xs text-[#1B1B2F]/70 dark:text-[#F5F5F3]/70">
              {currentPlan === 'gratuit'
                ? 'Accès au plan Gratuit (1 diagnostic & 1 validation par mois).'
                : 'Accès Illimité aux diagnostics et à l\'étude de marché.'}
            </p>
            <div className="pt-2">
              <Link
                href="/tarifs"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#F2A93B] hover:underline"
              >
                Changer de forfait / Recharger en FCFA →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ComptePage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-xs">Chargement...</div>}>
      <CompteContent />
    </Suspense>
  );
}
