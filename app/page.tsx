import Link from 'next/link';
import {
  Sparkles,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Zap,
  Share2
} from 'lucide-react';

export default function HomePage() {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ebook Check',
    url: 'https://ebook-check.com',
    logo: 'https://ebook-check.com/icon.png',
    description: 'Outil de diagnostic et de validation d\'ebooks pour les vendeurs de produits digitaux en Afrique francophone.',
    sameAs: [
      'https://facebook.com/ebookcheck',
      'https://whatsapp.com',
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Ebook Check remplace-t-il Chariow ou Maketou ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Non. Ebook Check complète Chariow et Maketou. Il résout le problème marketing et de conversion que ces plateformes de vente ne traitent pas.',
        },
      },
      {
        '@type': 'Question',
        name: 'Comment le score de viabilité est-il calculé ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Notre moteur évalue 5 axes stratégiques : la promesse du titre, la qualité du visuel 3D, l\'adéquation du prix en FCFA par rapport au pouvoir d\'achat local, la clarté de la description et le canal de promotion.',
        },
      },
      {
        '@type': 'Question',
        name: 'Les paiements Mobile Money sont-ils sécurisés ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, tous les règlements sont chiffrés et traités via MTN Mobile Money.',
        },
      },
    ],
  };

  return (
    <div className="space-y-16 pb-12">
      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero Section */}
      <section className="pt-10 md:pt-16 px-4 sm:px-6 max-w-5xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#12122B] text-[#F2A93B] text-xs font-semibold shadow-md">
          <Sparkles className="w-4 h-4 text-[#F2A93B]" /> Dédié aux vendeurs Chariow, Maketou & Afrique Francophone
        </div>

        <h1 className="font-title text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#1B1B2F] dark:text-[#F5F5F3] tracking-tight leading-[1.15]">
          Pourquoi ton ebook stagne à <span className="text-[#E85C4A] underline decoration-[#F2A93B] underline-offset-8">0 vente</span> ?
        </h1>

        <p className="text-base sm:text-lg text-[#1B1B2F]/80 dark:text-[#F5F5F3]/80 max-w-3xl mx-auto leading-relaxed">
          Les plateformes de vente hébergent ton livre, mais ne te disent jamais pourquoi personne ne l&apos;achète. <strong className="text-[#12122B] dark:text-white">Ebook Check</strong> diagnostique ton produit sur 5 axes stratégiques ou valide ton idée avant même la création.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row justify-center items-stretch gap-4 pt-4 max-w-md mx-auto sm:max-w-none">
          <Link
            href="/compte?redirect=/diagnostic&msg=auth_required"
            className="bg-[#F2A93B] text-[#12122B] font-extrabold text-base px-6 py-4 rounded-2xl shadow-xl hover:bg-[#F2A93B]/90 transition-all flex items-center justify-center gap-2 min-h-[52px]"
          >
            <Sparkles className="w-5 h-5 text-[#12122B]" />
            Diagnostic 0 Vente (Gratuit)
          </Link>

          <Link
            href="/compte?redirect=/valider&msg=auth_required"
            className="bg-[#12122B] dark:bg-[#1C1C36] text-[#FAF8F3] font-bold text-base px-6 py-4 rounded-2xl shadow-xl hover:bg-[#12122B]/90 transition-all flex items-center justify-center gap-2 min-h-[52px]"
          >
            <Lightbulb className="w-5 h-5 text-[#F2A93B]" />
            Valider une Idée d&apos;Ebook
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="pt-8 border-t border-[#12122B]/10 dark:border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-[#12122B]/70 dark:text-[#F5F5F3]/70 font-semibold">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#2F9E68]" /> 100% Anonyme & Confidentiel
          </span>
          <span className="flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-[#F2A93B]" /> Paiement MTN Mobile Money en FCFA
          </span>
          <span className="flex items-center gap-1.5">
            <Share2 className="w-4 h-4 text-[#2F9E68]" /> Rapport partageable sur WhatsApp
          </span>
        </div>
      </section>

      {/* Feature Split Section */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mode 1 */}
        <div className="bg-white dark:bg-[#1C1C36] border-2 border-[#12122B]/15 dark:border-white/15 rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E85C4A]/15 text-[#E85C4A] flex items-center justify-center font-bold">
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-[#E85C4A] uppercase tracking-wider">
              Ton livre est déjà publié ?
            </span>
            <h2 className="font-title text-2xl font-bold text-[#12122B] dark:text-[#F5F5F3]">
              Mode Diagnostic 0 Vente
            </h2>
            <p className="text-xs sm:text-sm text-[#1B1B2F]/80 dark:text-[#F5F5F3]/80 leading-relaxed">
              Découvre précisément ce qui bloque la décision d&apos;achat sur ton lien Chariow ou Maketou.
            </p>
            <ul className="space-y-2 text-xs text-[#1B1B2F] dark:text-[#F5F5F3]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2F9E68]" /> Titre & Promesse irrésistible
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2F9E68]" /> Impact de la Couverture 3D sur mobile
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2F9E68]" /> Audit du Prix par rapport au marché FCFA
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2F9E68]" /> Conversion par Statut WhatsApp & TikTok
              </li>
            </ul>
          </div>

          <Link
            href="/compte?redirect=/diagnostic&msg=auth_required"
            className="w-full bg-[#12122B] dark:bg-[#F2A93B] text-[#FAF8F3] dark:text-[#12122B] font-bold text-sm py-3.5 rounded-xl hover:opacity-90 transition-all text-center min-h-[48px] flex items-center justify-center gap-2"
          >
            Lancer un Diagnostic <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mode 2 */}
        <div className="bg-white dark:bg-[#1C1C36] border-2 border-[#F2A93B] rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F2A93B]/20 text-[#12122B] dark:text-[#F2A93B] flex items-center justify-center font-bold">
              <Lightbulb className="w-6 h-6 text-[#12122B] dark:text-[#F2A93B]" />
            </div>
            <span className="text-xs font-bold text-[#F2A93B] uppercase tracking-wider">
              Tu as une nouvelle idée ?
            </span>
            <h2 className="font-title text-2xl font-bold text-[#12122B] dark:text-[#F5F5F3]">
              Mode Validation d&apos;Idée
            </h2>
            <p className="text-xs sm:text-sm text-[#1B1B2F]/80 dark:text-[#F5F5F3]/80 leading-relaxed">
              Vérifie la saturation de la niche et obtiens la fourchette de prix recommandée en FCFA.
            </p>
            <ul className="space-y-2 text-xs text-[#1B1B2F] dark:text-[#F5F5F3]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2F9E68]" /> Score de viabilité commerciale
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2F9E68]" /> 4 Suggestions de titres accrocheurs
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2F9E68]" /> Prix idéal d&apos;impulsion MTN Mobile Money
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2F9E68]" /> Stratégie pour tes 5 premières précommandes
              </li>
            </ul>
          </div>

          <Link
            href="/compte?redirect=/valider&msg=auth_required"
            className="w-full bg-[#F2A93B] text-[#12122B] font-extrabold text-sm py-3.5 rounded-xl hover:bg-[#F2A93B]/90 transition-all text-center min-h-[48px] flex items-center justify-center gap-2"
          >
            Valider mon Idée <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Comparison table */}
      <section className="px-4 sm:px-6 max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-title text-2xl sm:text-3xl font-extrabold text-[#1B1B2F] dark:text-[#F5F5F3]">
            Pourquoi les plateformes classiques ne suffisent pas ?
          </h2>
          <p className="text-xs sm:text-sm text-[#1B1B2F]/80 dark:text-[#F5F5F3]/80">
            Chariow et Maketou gèrent l&apos;hébergement et l&apos;encaissement. Ebook Check résout l&apos;étape clé : la conversion.
          </p>
        </div>

        <div className="bg-white dark:bg-[#1C1C36] border border-[#12122B]/15 rounded-3xl p-6 shadow-md overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-[#1B1B2F] dark:text-[#F5F5F3]">
            <thead>
              <tr className="border-b border-[#12122B]/10 dark:border-white/10">
                <th className="py-3 px-2 font-bold text-[#12122B] dark:text-white">Fonctionnalité</th>
                <th className="py-3 px-2 font-bold text-[#12122B]/60 dark:text-white/60">Chariow / Maketou</th>
                <th className="py-3 px-2 font-bold text-[#F2A93B]">Ebook Check</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#12122B]/5 dark:divide-white/5">
              <tr>
                <td className="py-3 px-2 font-medium">Hébergement du fichier PDF</td>
                <td className="py-3 px-2 text-[#2F9E68]">Oui ✅</td>
                <td className="py-3 px-2 text-[#12122B]/60 dark:text-white/60">Non (complémentaire)</td>
              </tr>
              <tr>
                <td className="py-3 px-2 font-medium">Encaissement MTN Mobile Money</td>
                <td className="py-3 px-2 text-[#2F9E68]">Oui ✅</td>
                <td className="py-3 px-2 text-[#12122B]/60 dark:text-white/60">Non (se concentre sur le diagnostic)</td>
              </tr>
              <tr>
                <td className="py-3 px-2 font-medium">Explication si 0 vente</td>
                <td className="py-3 px-2 text-[#E85C4A]">Non ❌</td>
                <td className="py-3 px-2 font-bold text-[#2F9E68]">Oui ✅ (Analyse 5 axes + IA Vision)</td>
              </tr>
              <tr>
                <td className="py-3 px-2 font-medium">Validation d&apos;idée avant création</td>
                <td className="py-3 px-2 text-[#E85C4A]">Non ❌</td>
                <td className="py-3 px-2 font-bold text-[#2F9E68]">Oui ✅ (Moteur de viabilité)</td>
              </tr>
              <tr>
                <td className="py-3 px-2 font-medium">Recommandation de prix FCFA</td>
                <td className="py-3 px-2 text-[#E85C4A]">Non ❌</td>
                <td className="py-3 px-2 font-bold text-[#2F9E68]">Oui ✅ (Calcul pouvoir d&apos;achat)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Final Call to Action Banner */}
      <section className="px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="bg-[#12122B] text-[#FAF3E7] rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <h2 className="font-title text-3xl sm:text-4xl font-extrabold text-[#F2A93B]">
            Débloque tes premières ventes dès aujourd&apos;hui
          </h2>
          <p className="text-sm sm:text-base text-[#FAF3E7]/80 max-w-xl mx-auto">
            Crée ton compte gratuit en 30 secondes pour tester ton produit et obtenir ton plan d&apos;action sur-mesure.
          </p>
          <div>
            <Link
              href="/compte?redirect=/diagnostic&msg=auth_required"
              className="inline-flex items-center gap-2 bg-[#F2A93B] text-[#12122B] font-extrabold text-base px-8 py-4 rounded-2xl shadow-xl hover:bg-[#F2A93B]/90 transition-all min-h-[52px]"
            >
              Créer mon Compte Gratuit <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
