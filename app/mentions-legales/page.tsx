import { Metadata } from 'next';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mentions Légales — Ebook Check',
  description: 'Informations éditoriales et d\'hébergement relatives au service Ebook Check.',
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-3xl mx-auto space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12122B] text-[#F2A93B] text-xs font-semibold">
          <Shield className="w-4 h-4 text-[#F2A93B]" /> Conformité Juridique
        </div>
        <h1 className="font-title text-3xl font-extrabold text-[#1B1B2F]">Mentions Légales</h1>
        <p className="text-xs text-[#1B1B2F]/60">Dernière mise à jour : Janvier 2025</p>
      </div>

      <div className="bg-white border border-[#12122B]/15 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 text-sm text-[#1B1B2F] leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-title text-lg font-bold text-[#12122B]">1. Éditeur de la Plateforme</h2>
          <p>
            Le service web <strong>Ebook Check</strong> est édité et exploité à destination des entrepreneurs de l&apos;Afrique francophone.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-[#1B1B2F]/80">
            <li><strong>Nom commercial :</strong> Ebook Check Afrique</li>
            <li><strong>Responsable de la publication :</strong> Équipe Ebook Check</li>
            <li><strong>Contact support :</strong> support@ebookcheck.com</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-title text-lg font-bold text-[#12122B]">2. Hébergement du site</h2>
          <p>
            Le site est hébergé sur l&apos;infrastructure globale sécurisée Vercel Inc. :
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-[#1B1B2F]/80">
            <li><strong>Hébergeur :</strong> Vercel Inc.</li>
            <li><strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, USA</li>
            <li><strong>Site Web :</strong> https://vercel.com</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-title text-lg font-bold text-[#12122B]">3. Propriété Intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus présentés sur Ebook Check (moteur de calcul de score, textes, visuels, charte graphique, algorithme d&apos;analyse) est protégé par le droit d&apos;auteur. Toute reproduction totale ou partielle sans autorisation préalable est strictement interdite.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-title text-lg font-bold text-[#12122B]">4. Partenariats & Plateformes Tiers</h2>
          <p>
            Ebook Check est un outil d&apos;aide à la décision indépendant et n&apos;est pas affilié, sponsorisé ni géré directement par Chariow, Maketou ou Selar. Les marques et noms de plateformes cités appartiennent à leurs propriétaires respectifs.
          </p>
        </section>
      </div>
    </div>
  );
}
