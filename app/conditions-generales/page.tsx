import { Metadata } from 'next';
import { FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente & d\'Utilisation — Ebook Check',
  description: 'Conditions d\'utilisation des services de diagnostic, règles de remboursement et limites de responsabilité.',
};

export default function ConditionsGeneralesPage() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-3xl mx-auto space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12122B] text-[#F2A93B] text-xs font-semibold">
          <FileText className="w-4 h-4 text-[#F2A93B]" /> Termes & CGV
        </div>
        <h1 className="font-title text-3xl font-extrabold text-[#1B1B2F]">Conditions Générales de Vente & d&apos;Utilisation</h1>
        <p className="text-xs text-[#1B1B2F]/60">Dernière mise à jour : Janvier 2025</p>
      </div>

      <div className="bg-white border border-[#12122B]/15 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 text-sm text-[#1B1B2F] leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-title text-lg font-bold text-[#12122B]">1. Objet des Services</h2>
          <p>
            Ebook Check propose des outils de scoring d&apos;analyse de marché et de recommandation éditoriale destinés aux vendeurs de produits digitaux (ebooks, guides PDF) en Afrique francophone.
          </p>
        </section>

        <section className="space-y-2 bg-[#FAF3E7] p-4 rounded-xl border border-[#F2A93B]/30">
          <h2 className="font-title text-base font-bold text-[#12122B]">2. Limite de Responsabilité (Score Indicatif)</h2>
          <p className="text-xs text-[#1B1B2F]/90 leading-relaxed">
            Le score de diagnostic (sur 100) et les recommandations générées par notre algorithme sont donnés à titre <strong>strictement indicatif</strong>. Ils reposent sur les meilleures pratiques observées en Afrique de l&apos;Ouest mais <strong>ne constituent pas une garantie contractuelle de ventes directes</strong>. La réussite commerciale dépend de l&apos;exécution personnelle de l&apos;auteur.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-title text-lg font-bold text-[#12122B]">3. Tarification & Modalités de Paiement</h2>
          <p>
            Les prix des rapports détaillés et abonnements sont affichés en Francs CFA (FCFA) toutes taxes comprises :
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-[#1B1B2F]/80">
            <li>Diagnostic gratuit de base : 1 rapport offert.</li>
            <li>Rapport Détaillé à l&apos;unité : 2 500 FCFA.</li>
            <li>Pass Mensuel Illimité : 7 500 FCFA / mois.</li>
          </ul>
          <p className="text-xs">
            Les paiements s&apos;effectuent via Mobile Money (MTN, Orange, Moov, Wave) par le biais de nos processeurs certifiés FedaPay et Kkiapay.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-title text-lg font-bold text-[#12122B]">4. Droit de Rétractation & Remboursement</h2>
          <p>
            Conformément aux règles applicables aux contenus numériques fournis de manière instantanée, l&apos;exécution du service commence immédiatement après le paiement Mobile Money. Aucun remboursement ne sera accordé une fois le rapport généré, sauf en cas de bug technique avéré empêchant l&apos;affichage du rapport.
          </p>
        </section>
      </div>
    </div>
  );
}
