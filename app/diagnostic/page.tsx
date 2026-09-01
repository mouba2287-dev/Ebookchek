'use client';

import { useState, useRef } from 'react';
import { DiagnosticResult } from '@/lib/scoring';
import { parseProductUrl } from '@/lib/scraper';
import {
  Sparkles,
  Share2,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Link as LinkIcon,
  ShoppingBag,
  HelpCircle,
  Download,
  ShieldCheck
} from 'lucide-react';
import html2canvas from 'html2canvas';

export default function DiagnosticPage() {
  const [formData, setFormData] = useState({
    productUrl: '',
    title: '',
    priceFcfa: 2500,
    description: '',
    hasCoverImage: true,
    coverStyle: 'canva_template' as 'canva_template' | 'custom_pro' | 'text_only' | 'no_cover',
    promotionChannel: 'whatsapp' as 'whatsapp' | 'tiktok' | 'facebook' | 'instagram' | 'email' | 'other',
    timeOnlineDays: 14,
    salesCount: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [isGeneratingShare, setIsGeneratingShare] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  // Auto parsing URL on blur or change
  const handleUrlChange = (url: string) => {
    setFormData(prev => ({ ...prev, productUrl: url }));
    if (url.startsWith('http')) {
      const parsed = parseProductUrl(url);
      if (parsed) {
        setFormData(prev => ({
          ...prev,
          title: prev.title || parsed.title || prev.title,
          priceFcfa: parsed.priceFcfa || prev.priceFcfa,
          coverStyle: parsed.coverStyle || prev.coverStyle,
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors du calcul du diagnostic.');
      }

      setResult(data.data);
      // Save report to local memory for user account history persistence
      try {
        const existingHistory = JSON.parse(localStorage.getItem('ebookcheck_reports') || '[]');
        existingHistory.unshift({ ...data.data, type: 'diagnostic' });
        localStorage.setItem('ebookcheck_reports', JSON.stringify(existingHistory.slice(0, 20)));
      } catch (err) {
        console.error('Failed to save report locally:', err);
      }
    } catch (err: any) {
      setError(err.message || 'Une erreur inattendue est survenue.');
    } finally {
      setLoading(false);
    }
  };

  const handleShareWhatsApp = async () => {
    if (!result) return;
    setIsGeneratingShare(true);

    try {
      const textMessage = `*Diagnostic Ebook Check* 📊\nProduit : "${result.title}"\nScore de viabilité : *${result.overallScore}/100* (${result.overallStatus === 'excellent' ? 'Excellent 🚀' : result.overallStatus === 'warning' ? 'À améliorer ⚠️' : 'Critique 🚨'})\n\nAction clé : ${result.topActions[0] || 'Vérifier la promesse du titre'}\n\nFais le test pour ton ebook sur Ebook Check !`;

      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(textMessage)}`;

      if (reportRef.current) {
        const canvas = await html2canvas(reportRef.current, {
          backgroundColor: '#FAF3E7',
          scale: 2,
        });
        const image = canvas.toDataURL('image/png');

        // Trigger download of summary card image
        const link = document.createElement('a');
        link.href = image;
        link.download = `Diagnostic-EbookCheck-${result.id}.png`;
        link.click();
      }

      window.open(whatsappUrl, '_blank');
    } catch (err) {
      console.error('Error generating WhatsApp share card:', err);
      // Fallback to text link
      const textMessage = `*Diagnostic Ebook Check* 📊\nProduit : "${result.title}"\nScore : *${result.overallScore}/100*`;
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(textMessage)}`, '_blank');
    } finally {
      setIsGeneratingShare(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-4xl mx-auto space-y-10">
      {/* Header section */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12122B] text-[#F2A93B] text-xs font-semibold shadow-sm">
          <Sparkles className="w-4 h-4 text-[#F2A93B]" /> Mode Diagnostic 0 Vente
        </div>
        <h1 className="font-title text-3xl sm:text-4xl font-extrabold text-[#1B1B2F] tracking-tight">
          Pourquoi ton ebook ne se vend pas ?
        </h1>
        <p className="text-sm sm:text-base text-[#1B1B2F]/80 max-w-2xl mx-auto leading-relaxed">
          Complète ce formulaire rapide. Notre moteur de règles analyse ton produit sur 5 axes stratégiques pour débloquer tes premières ventes.
        </p>
      </div>

      {!result ? (
        /* Form view */
        <form onSubmit={handleSubmit} className="bg-[#FAF3E7] border border-[#12122B]/15 p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
          {error && (
            <div className="p-4 bg-[#E85C4A]/15 border border-[#E85C4A] text-[#E85C4A] rounded-xl text-sm flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#1B1B2F] flex items-center justify-between">
              <span>Lien du produit (Chariow, Maketou, Selar...) <span className="text-xs text-[#1B1B2F]/60 font-normal">(Optionnel)</span></span>
            </label>
            <div className="relative">
              <input
                type="url"
                placeholder="https://chariow.com/p/mon-ebook-business"
                value={formData.productUrl}
                onChange={(e) => handleUrlChange(e.target.value)}
                className="w-full px-4 py-3 pl-10 bg-white border border-[#1B1B2F]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F2A93B] text-sm text-[#1B1B2F]"
              />
              <LinkIcon className="w-4 h-4 text-[#1B1B2F]/40 absolute left-3 top-3.5" />
            </div>
            <p className="text-xs text-[#1B1B2F]/60">
              Si tu colles ton lien Chariow ou Maketou, nous pré-remplissons automatiquement les champs détectables.
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#1B1B2F]">
              Titre complet de l&apos;ebook <span className="text-[#E85C4A]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Le Guide Ultime de l'Importation Chine-Afrique en 2025"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-[#1B1B2F]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F2A93B] text-sm text-[#1B1B2F]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#1B1B2F]">
                Prix de vente (en FCFA) <span className="text-[#E85C4A]">*</span>
              </label>
              <input
                type="number"
                required
                min="0"
                step="250"
                placeholder="2500"
                value={formData.priceFcfa}
                onChange={(e) => setFormData({ ...formData, priceFcfa: Number(e.target.value) })}
                className="w-full px-4 py-3 bg-white border border-[#1B1B2F]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F2A93B] text-sm text-[#1B1B2F]"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#1B1B2F]">
                Canal de promotion principal <span className="text-[#E85C4A]">*</span>
              </label>
              <select
                value={formData.promotionChannel}
                onChange={(e) => setFormData({ ...formData, promotionChannel: e.target.value as any })}
                className="w-full px-4 py-3 bg-white border border-[#1B1B2F]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F2A93B] text-sm text-[#1B1B2F]"
              >
                <option value="whatsapp">Statuts & Groupes WhatsApp</option>
                <option value="tiktok">Vidéos / Live TikTok</option>
                <option value="facebook">Facebook Ads / Groupes</option>
                <option value="instagram">Instagram Feed & Stories</option>
                <option value="email">Séquence Email / Liste</option>
                <option value="other">Bouche-à-oreille / Autre</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#1B1B2F]">
              Description / Texte de vente <span className="text-[#E85C4A]">*</span>
            </label>
            <textarea
              required
              rows={4}
              placeholder="Colle le texte qui présente ton ebook sur ta page de vente..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-[#1B1B2F]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F2A93B] text-sm text-[#1B1B2F]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#1B1B2F]">
                Visuel / Couverture
              </label>
              <select
                value={formData.coverStyle}
                onChange={(e) => setFormData({ ...formData, coverStyle: e.target.value as any })}
                className="w-full px-4 py-3 bg-white border border-[#1B1B2F]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F2A93B] text-sm text-[#1B1B2F]"
              >
                <option value="canva_template">Template Canva (Design plat)</option>
                <option value="custom_pro">Mockup Livre 3D Pro</option>
                <option value="text_only">Image simple avec du texte</option>
                <option value="no_cover">Aucun visuel / Image floue</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#1B1B2F]">
                Ancienneté du produit
              </label>
              <select
                value={formData.timeOnlineDays}
                onChange={(e) => setFormData({ ...formData, timeOnlineDays: Number(e.target.value) })}
                className="w-full px-4 py-3 bg-white border border-[#1B1B2F]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F2A93B] text-sm text-[#1B1B2F]"
              >
                <option value={3}>Moins de 7 jours (Lancement)</option>
                <option value={14}>2 semaines</option>
                <option value={30}>1 mois</option>
                <option value={60}>Plus de 2 mois</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F2A93B] text-[#12122B] font-extrabold text-base py-4 rounded-xl shadow-lg hover:bg-[#F2A93B]/90 transition-all flex items-center justify-center gap-2 min-h-[52px]"
          >
            {loading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin text-[#12122B]" />
                Analyse des 5 axes en cours...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-[#12122B]" />
                Lancer le Diagnostic Gratuit
              </>
            )}
          </button>
        </form>
      ) : (
        /* Report View */
        <div className="space-y-8 animate-fade-in">
          {/* Action header bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#12122B] text-[#FAF3E7] p-4 rounded-2xl">
            <div>
              <p className="text-xs text-[#F2A93B] font-semibold">Rapport généré avec succès</p>
              <h2 className="font-title text-lg font-bold">{result.title}</h2>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setResult(null)}
                className="px-4 py-2 bg-white/10 text-xs font-semibold rounded-xl hover:bg-white/20 transition-colors flex items-center gap-1.5 min-h-[44px]"
              >
                <RefreshCw className="w-4 h-4" /> Nouveau diagnostic
              </button>
              <button
                onClick={handleShareWhatsApp}
                disabled={isGeneratingShare}
                className="px-4 py-2 bg-[#2F9E68] text-white text-xs font-bold rounded-xl hover:bg-[#2F9E68]/90 transition-all flex items-center gap-1.5 min-h-[44px]"
              >
                {isGeneratingShare ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
                Partager sur WhatsApp
              </button>
            </div>
          </div>

          {/* Core Visual Report Card (Ref for html2canvas export) */}
          <div
            ref={reportRef}
            className="bg-[#FAF3E7] border-2 border-[#12122B] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8"
          >
            {/* Score reveal banner */}
            <div className="bg-[#12122B] text-[#FAF3E7] rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left z-10">
                <span className="text-xs font-bold text-[#F2A93B] uppercase tracking-wider">
                  Score Global de Viabilité
                </span>
                <h3 className="font-title text-2xl sm:text-3xl font-extrabold">
                  {result.overallSummary}
                </h3>
                <p className="text-xs text-[#FAF3E7]/70">
                  Rapport édité pour vendeurs Chariow & Maketou • {new Date(result.createdAt).toLocaleDateString('fr-FR')}
                </p>
              </div>

              {/* Animated Big Score Badge */}
              <div className="shrink-0 flex flex-col items-center justify-center w-32 h-32 rounded-2xl bg-gradient-to-br from-[#F2A93B] to-[#E85C4A] text-[#12122B] p-4 shadow-xl transform transition-transform hover:scale-105 duration-500">
                <span className="font-title text-4xl font-extrabold leading-none">
                  {result.overallScore}
                </span>
                <span className="text-xs font-bold tracking-widest uppercase mt-1">/ 100</span>
                <span className="mt-2 text-[10px] font-extrabold px-2 py-0.5 rounded bg-[#12122B] text-[#FAF3E7] uppercase">
                  {result.overallStatus === 'excellent' ? 'Solide 🚀' : result.overallStatus === 'warning' ? 'À booster ⚠️' : 'Urgent 🚨'}
                </span>
              </div>
            </div>

            {/* Top 4 Priority Actions */}
            <div className="bg-[#12122B]/5 border border-[#12122B]/10 rounded-2xl p-5 space-y-3">
              <h4 className="font-title text-base font-bold text-[#12122B] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#F2A93B]" />
                Plan d&apos;Action Prioritaire (Ce qu&apos;il faut changer aujourd&apos;hui)
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[#1B1B2F]">
                {result.topActions.map((action, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#2F9E68] shrink-0 mt-0.5" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 5 Axes Detailed Breakdown */}
            <div className="space-y-6">
              <h4 className="font-title text-xl font-bold text-[#12122B]">
                Analyse détaillée sur les 5 axes
              </h4>

              <div className="grid grid-cols-1 gap-5">
                {Object.values(result.axes).map((axis) => (
                  <div
                    key={axis.key}
                    className="bg-white border border-[#12122B]/10 rounded-2xl p-5 shadow-sm space-y-3"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="font-title font-bold text-base text-[#12122B]">
                          {axis.label}
                        </span>
                        <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase ${
                          axis.status === 'excellent'
                            ? 'bg-[#2F9E68]/15 text-[#2F9E68]'
                            : axis.status === 'warning'
                            ? 'bg-[#F2A93B]/20 text-[#12122B]'
                            : 'bg-[#E85C4A]/15 text-[#E85C4A]'
                        }`}>
                          {axis.statusLabel}
                        </span>
                      </div>
                      <span className="font-title font-bold text-lg text-[#12122B]">
                        {axis.score}/100
                      </span>
                    </div>

                    {/* Progress Score Bar */}
                    <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          axis.score >= 75
                            ? 'bg-[#2F9E68]'
                            : axis.score >= 50
                            ? 'bg-[#F2A93B]'
                            : 'bg-[#E85C4A]'
                        }`}
                        style={{ width: `${axis.score}%` }}
                      />
                    </div>

                    <p className="text-xs text-[#1B1B2F]/80 leading-relaxed font-medium">
                      {axis.feedback}
                    </p>

                    {axis.recommendations.length > 0 && (
                      <div className="pt-2 border-t border-gray-100 space-y-1.5">
                        <p className="text-[11px] font-bold text-[#12122B] uppercase">Recommandations :</p>
                        {axis.recommendations.map((rec, i) => (
                          <p key={i} className="text-xs text-[#1B1B2F]/90 flex items-start gap-1.5">
                            <ArrowRight className="w-3.5 h-3.5 text-[#F2A93B] shrink-0 mt-0.5" />
                            <span>{rec}</span>
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Footer Note */}
            <div className="text-center pt-4 border-t border-[#12122B]/10 text-xs text-[#1B1B2F]/60">
              <p>Généré par Ebook Check • L&apos;outil d&apos;analyse pour entrepreneurs digitaux en Afrique de l&apos;Ouest</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
