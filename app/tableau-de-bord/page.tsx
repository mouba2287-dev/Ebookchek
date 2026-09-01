import Link from 'next/link';
import {
  Sparkles,
  Lightbulb,
  TrendingUp,
  Camera,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Zap,
  ShieldCheck
} from 'lucide-react';

export default function TableauDeBordPage() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 max-w-5xl mx-auto space-y-8 pb-20 md:pb-12">
      {/* Welcome Banner */}
      <div className="bg-[#12122B] text-[#FAF3E7] p-6 sm:p-8 rounded-3xl shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs text-[#F2A93B] font-bold uppercase tracking-wider">
              Espace Créateur
            </span>
            <h1 className="font-title text-2xl sm:text-3xl font-extrabold">
              Tableau de bord Ebook Check
            </h1>
            <p className="text-xs sm:text-sm text-[#FAF3E7]/80">
              Gère tes quotas du mois, consulte tes analyses et accélère tes ventes en Afrique francophone.
            </p>
          </div>
          <div className="px-4 py-2 bg-[#F2A93B] text-[#12122B] rounded-2xl font-extrabold text-xs shrink-0 shadow-md">
            Plan Créateur Actif
          </div>
        </div>

        {/* Quota Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
          <div className="bg-white/5 p-3 rounded-xl space-y-1">
            <span className="text-[#FAF3E7]/70">Diagnostics 0 Vente</span>
            <p className="font-title text-lg font-bold text-[#F2A93B]">Illimité</p>
          </div>
          <div className="bg-white/5 p-3 rounded-xl space-y-1">
            <span className="text-[#FAF3E7]/70">Validations d&apos;Idées</span>
            <p className="font-title text-lg font-bold text-[#2F9E68]">Illimité</p>
          </div>
          <div className="bg-white/5 p-3 rounded-xl space-y-1">
            <span className="text-[#FAF3E7]/70">Étude de marché mensuelle</span>
            <p className="font-title text-lg font-bold text-white">1 / 1 disponible</p>
          </div>
        </div>
      </div>

      {/* Quick Access Modules Grid */}
      <div className="space-y-4">
        <h2 className="font-title text-xl font-bold text-[#1B1B2F]">
          Tous tes modules de croissance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Module 1: Diagnostic */}
          <Link
            href="/diagnostic"
            className="bg-white border border-[#12122B]/15 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#E85C4A]/15 text-[#E85C4A] flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-title text-lg font-bold text-[#12122B] group-hover:text-[#F2A93B] transition-colors">
              Diagnostic 0 Vente
            </h3>
            <p className="text-xs text-[#1B1B2F]/80 leading-relaxed">
              Analyse pourquoi ton ebook publié sur Chariow ou Maketou ne se vend pas sur les 5 axes.
            </p>
            <div className="text-xs font-bold text-[#12122B] flex items-center gap-1 pt-2">
              Lancer l&apos;analyse <ArrowRight className="w-4 h-4 text-[#F2A93B]" />
            </div>
          </Link>

          {/* Module 2: Validation */}
          <Link
            href="/valider"
            className="bg-white border border-[#12122B]/15 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#F2A93B]/20 text-[#12122B] flex items-center justify-center font-bold">
              <Lightbulb className="w-5 h-5 text-[#12122B]" />
            </div>
            <h3 className="font-title text-lg font-bold text-[#12122B] group-hover:text-[#F2A93B] transition-colors">
              Validation d&apos;Idée
            </h3>
            <p className="text-xs text-[#1B1B2F]/80 leading-relaxed">
              Vérifie la viabilité commerciale de ton thème avant de passer des semaines à écrire.
            </p>
            <div className="text-xs font-bold text-[#12122B] flex items-center gap-1 pt-2">
              Tester un sujet <ArrowRight className="w-4 h-4 text-[#F2A93B]" />
            </div>
          </Link>

          {/* Module 3: Etude de marché */}
          <Link
            href="/etude-de-marche"
            className="bg-white border border-[#12122B]/15 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#2F9E68]/15 text-[#2F9E68] flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-title text-lg font-bold text-[#12122B] group-hover:text-[#F2A93B] transition-colors">
              Étude de Marché & Idées
            </h3>
            <p className="text-xs text-[#1B1B2F]/80 leading-relaxed">
              Explore les opportunités de marché, les tendances FCFA et le générateur d&apos;idées gagnantes.
            </p>
            <div className="text-xs font-bold text-[#12122B] flex items-center gap-1 pt-2">
              Explorer le marché <ArrowRight className="w-4 h-4 text-[#F2A93B]" />
            </div>
          </Link>

          {/* Module 4: Analyse Vision Screenshot */}
          <Link
            href="/analyse-chariow"
            className="bg-white border border-[#12122B]/15 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#12122B]/10 text-[#12122B] flex items-center justify-center font-bold">
              <Camera className="w-5 h-5 text-[#12122B]" />
            </div>
            <h3 className="font-title text-lg font-bold text-[#12122B] group-hover:text-[#F2A93B] transition-colors">
              Analyse par Capture d&apos;Écran
            </h3>
            <p className="text-xs text-[#1B1B2F]/80 leading-relaxed">
              Envoie une capture de ta page Chariow et laisse l&apos;IA de vision auditer la couverture et la description.
            </p>
            <div className="text-xs font-bold text-[#12122B] flex items-center gap-1 pt-2">
              Uploader une image <ArrowRight className="w-4 h-4 text-[#F2A93B]" />
            </div>
          </Link>

          {/* Module 5: Academie */}
          <Link
            href="/academie"
            className="bg-white border border-[#12122B]/15 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-3 group md:col-span-2 lg:col-span-2"
          >
            <div className="w-10 h-10 rounded-xl bg-[#F2A93B] text-[#12122B] flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5 text-[#12122B]" />
            </div>
            <h3 className="font-title text-lg font-bold text-[#12122B] group-hover:text-[#F2A93B] transition-colors">
              Académie Ebook Check (Accès Gratuit)
            </h3>
            <p className="text-xs text-[#1B1B2F]/80 leading-relaxed">
              Accède à 5 guides stratégiques rédigés spécifiquement pour vendre plus d&apos;ebooks par WhatsApp, Facebook Ads et TikTok en Afrique.
            </p>
            <div className="text-xs font-bold text-[#12122B] flex items-center gap-1 pt-2">
              Consulter les cours <ArrowRight className="w-4 h-4 text-[#F2A93B]" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
