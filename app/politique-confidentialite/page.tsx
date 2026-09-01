import { Metadata } from 'next';
import { Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité — Ebook Check',
  description: 'Protection des données personnelles, règles de collecte et droits des utilisateurs.',
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-3xl mx-auto space-y-8">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12122B] text-[#F2A93B] text-xs font-semibold">
          <Lock className="w-4 h-4 text-[#F2A93B]" /> Données Personnelles
        </div>
        <h1 className="font-title text-3xl font-extrabold text-[#1B1B2F]">Politique de Confidentialité</h1>
        <p className="text-xs text-[#1B1B2F]/60">Dernière mise à jour : Janvier 2025</p>
      </div>

      <div className="bg-white border border-[#12122B]/15 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 text-sm text-[#1B1B2F] leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-title text-lg font-bold text-[#12122B]">1. Collecte des Données</h2>
          <p>
            Afin de générer vos rapports de diagnostic et d&apos;assurer le suivi de vos demandes, Ebook Check collecte uniquement les informations strictement nécessaires :
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-[#1B1B2F]/80">
            <li><strong>Données du formulaire :</strong> Titre de l&apos;ebook, lien du produit, prix envisagé, description du livre et canal de vente.</li>
            <li><strong>Données de compte & paiement :</strong> Adresse e-mail (lors de l&apos;inscription Supabase), numéro de téléphone Mobile Money (lors des transactions FedaPay/Kkiapay).</li>
            <li><strong>Données de navigation :</strong> Adresse IP anonymisée et cookies de mesure d&apos;audience (Google Analytics 4).</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-title text-lg font-bold text-[#12122B]">2. Utilisation des Données</h2>
          <p>
            Vos informations sont utilisées exclusivement pour :
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-[#1B1B2F]/80">
            <li>Calculer et personnaliser votre score de diagnostic et de validation.</li>
            <li>Gérer l&apos;accès à votre historique de rapports dans votre espace privé.</li>
            <li>Traiter les abonnements et paiements Mobile Money.</li>
          </ul>
          <p className="text-xs font-bold text-[#2F9E68]">
            Vos textes, sujets d&apos;ebooks et données financières ne sont JAMAIS vendus ni partagés avec d&apos;autres créateurs ou concurrents.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-title text-lg font-bold text-[#12122B]">3. Durée de Conservation & Droit de Suppression</h2>
          <p>
            Vos données sont conservées tant que votre compte reste actif. Vous bénéficiez d&apos;un droit d&apos;accès, de rectification et de suppression totale de vos données à tout moment.
          </p>
          <p className="text-xs">
            Pour demander la suppression immédiate de votre compte et de vos diagnostics, écrivez-nous à <strong>privacy@ebookcheck.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
