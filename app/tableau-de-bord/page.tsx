'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Sparkles,
  TrendingUp,
  Share2,
  Users,
  Award,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Zap,
  RefreshCw
} from 'lucide-react';

interface ReportHistoryItem {
  id: string;
  title: string;
  overallScore: number;
  createdAt: string;
  type: 'diagnostic' | 'validation' | 'chariow_vision';
}

export default function TableauDeBordPage() {
  const [reports, setReports] = useState<ReportHistoryItem[]>([]);
  const [userPlan, setUserPlan] = useState<'gratuit' | 'createur' | 'pro'>('gratuit');
  const [referralCount, setReferralCount] = useState<number>(2);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ebookcheck_reports');
      if (stored) {
        setReports(JSON.parse(stored));
      } else {
        // Fallback demo reports for new users
        const mock: ReportHistoryItem[] = [
          {
            id: '1',
            title: 'Guide Importation Chine-Afrique',
            overallScore: 78,
            createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
            type: 'diagnostic',
          },
          {
            id: '2',
            title: 'Ebook Poules Pondeuses à la Maison',
            overallScore: 62,
            createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
            type: 'validation',
          },
        ];
        setReports(mock);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const referralLink = 'https://ebook-check.com/?ref=createur_229';

  const handleShareReferral = () => {
    const text = `Salut ! J'utilise Ebook Check pour diagnostiquer et valider mes ebooks sur Chariow avant de lancer la pub. Teste gratuitement ton livre ici : ${referralLink}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const avgScore = reports.length > 0
    ? Math.round(reports.reduce((acc, r) => acc + r.overallScore, 0) / reports.length)
    : 70;

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#FAF8F3] dark:bg-[#1C1C36] p-6 sm:p-8 rounded-3xl border border-[#12122B]/10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12122B] text-[#F2A93B] text-[11px] font-bold">
            <LayoutDashboard className="w-3.5 h-3.5 text-[#F2A93B]" /> Espace Créateur
          </div>
          <h1 className="font-title text-2xl sm:text-3xl font-extrabold text-[#12122B] dark:text-[#F5F5F3]">
            Mon Tableau de Bord
          </h1>
          <p className="text-xs text-[#1B1B2F]/70 dark:text-[#F5F5F3]/70">
            Suivi de progression de tes livres & Quotas d&apos;analyse mensuels
          </p>
        </div>

        <div className="flex items-center gap-3 bg-white dark:bg-[#12122B] px-4 py-3 rounded-2xl border border-[#12122B]/10">
          <Zap className="w-5 h-5 text-[#F2A93B]" />
          <div>
            <p className="text-[10px] text-[#1B1B2F]/60 dark:text-[#F5F5F3]/60 uppercase font-bold">Forfait Actuel</p>
            <p className="font-title text-sm font-bold text-[#12122B] dark:text-white uppercase">
              {userPlan} (1/1 Restant)
            </p>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#1C1C36] p-6 rounded-3xl border border-[#12122B]/10 shadow-sm space-y-2">
          <p className="text-xs font-bold text-[#1B1B2F]/60 dark:text-[#F5F5F3]/60">Total Produits Analysés</p>
          <p className="font-title text-3xl font-extrabold text-[#12122B] dark:text-white">{reports.length}</p>
          <p className="text-[11px] text-[#2F9E68] font-semibold">Historique sauvegardé en local</p>
        </div>

        <div className="bg-white dark:bg-[#1C1C36] p-6 rounded-3xl border border-[#12122B]/10 shadow-sm space-y-2">
          <p className="text-xs font-bold text-[#1B1B2F]/60 dark:text-[#F5F5F3]/60">Score Moyen de Viabilité</p>
          <p className="font-title text-3xl font-extrabold text-[#F2A93B]">{avgScore}/100</p>
          <p className="text-[11px] text-[#1B1B2F]/70 dark:text-[#F5F5F3]/70">Niveau global de tes offres</p>
        </div>

        <div className="bg-white dark:bg-[#1C1C36] p-6 rounded-3xl border border-[#12122B]/10 shadow-sm space-y-2">
          <p className="text-xs font-bold text-[#1B1B2F]/60 dark:text-[#F5F5F3]/60">Benchmark Anonymisé</p>
          <p className="font-title text-2xl font-extrabold text-[#2F9E68]">Top 30%</p>
          <p className="text-[11px] text-[#1B1B2F]/70 dark:text-[#F5F5F3]/70">Par rapport aux vendeurs de ta catégorie</p>
        </div>
      </div>

      {/* Progress Chart Simulation / Evolution */}
      <div className="bg-white dark:bg-[#1C1C36] border border-[#12122B]/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="font-title text-xl font-bold text-[#12122B] dark:text-[#F5F5F3] flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#2F9E68]" /> Evolution du Score par Diagnostic
          </h2>
          <span className="text-xs text-[#2F9E68] font-bold bg-[#2F9E68]/10 px-3 py-1 rounded-full">
            Impact des corrections
          </span>
        </div>

        <div className="space-y-4">
          {reports.map((item, idx) => (
            <div key={item.id} className="bg-[#FAF8F3] dark:bg-[#12122B] p-4 rounded-2xl flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#F2A93B]">
                  {item.type === 'chariow_vision' ? 'Vision IA Chariow' : item.type === 'validation' ? 'Validation' : 'Diagnostic 5 Axes'}
                </span>
                <h3 className="font-title font-bold text-sm text-[#12122B] dark:text-white">{item.title}</h3>
                <p className="text-[11px] text-[#1B1B2F]/60 dark:text-[#F5F5F3]/60">
                  {new Date(item.createdAt).toLocaleDateString('fr-FR')}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="font-title text-xl font-extrabold text-[#12122B] dark:text-white">
                    {item.overallScore}
                  </span>
                  <span className="text-xs font-bold text-[#1B1B2F]/60 dark:text-[#F5F5F3]/60">/100</span>
                </div>
                <div className="w-24 bg-gray-200 dark:bg-white/10 h-2 rounded-full overflow-hidden hidden sm:block">
                  <div
                    className="bg-[#2F9E68] h-full"
                    style={{ width: `${item.overallScore}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Referral Program Banner */}
      <div className="bg-[#12122B] text-[#FAF8F3] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
        <div className="space-y-2">
          <span className="text-xs font-bold text-[#F2A93B] uppercase tracking-wider">
            Programme de Parrainage Vendeur
          </span>
          <h2 className="font-title text-2xl font-bold text-white">
            Gagne 1 Mois Gratuit en invitant d&apos;autres créateurs
          </h2>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl">
            Offre 1 diagnostic gratuit à un ami. Quand il s&apos;inscrit, tu obtiens un crédit d&apos;analyse Créateur offert.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <div className="w-full sm:w-auto flex-1 bg-white/10 px-4 py-3 rounded-xl text-xs font-mono truncate text-[#F2A93B]">
            {referralLink}
          </div>
          <button
            onClick={handleShareReferral}
            className="w-full sm:w-auto bg-[#F2A93B] text-[#12122B] font-extrabold text-xs px-6 py-3.5 rounded-xl hover:bg-[#F2A93B]/90 transition-all flex items-center justify-center gap-2 min-h-[44px]"
          >
            <Share2 className="w-4 h-4" /> Partager sur WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
