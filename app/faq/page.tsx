import { Metadata } from 'next';
import Link from 'next/link';
import { HelpCircle, ShieldCheck, ArrowRight, Smartphone, Lock, Clock, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Foire Aux Questions (FAQ) — Ebook Check',
  description: 'Trouvez toutes les réponses concernant le diagnostic d\'ebooks, la compatibilité Chariow/Maketou, les paiements Mobile Money et la confidentialité de vos données.',
};

const faqItems = [
  {
    id: 'chariow-remplacement',
    question: 'Est-ce que Ebook Check remplace Chariow ou Maketou ?',
    answer: 'Non, Ebook Check ne remplace pas Chariow, Maketou, Selar ou Gumroad. Ces plateformes hébergent votre fichier PDF et encaissent vos paiements. Ebook Check intervient en amont et en aval : nous analysons pourquoi votre produit ne se vend pas et nous vous aidons à valider vos idées avant même de créer le livre.',
  },
  {
    id: 'calcul-score',
    question: 'Comment le score de diagnostic est-il calculé ?',
    answer: 'Notre moteur de règles analyse votre produit sur 5 axes cruciaux : 1) La clarté et la promesse du Titre, 2) L\'impact visuel de la Couverture 3D, 3) Le positionnement du Prix en FCFA par rapport au pouvoir d\'achat local, 4) La structure de la Description (puces, rassurance), et 5) La pertinence de votre Canal de promotion (WhatsApp, TikTok, Facebook). Chaque axe génère une note sur 100 et un score global pondéré.',
  },
  {
    id: 'donnees-confidentialite',
    question: 'Mes données produit sont-elles partagées avec d\'autres vendeurs ?',
    answer: 'Absolument pas. Vos textes, titres, stratégies et statistiques restent strictly confidentiels. Nous ne vendons ni ne partageons jamais vos données avec d\'autres vendeurs ou des tiers commercial de la région.',
  },
  {
    id: 'annulation-abonnement',
    question: 'Puis-je annuler mon abonnement à tout moment ?',
    answer: 'Oui, sans aucun engagement. Si vous souscrivez au Pass Mensuel Illimité, vous pouvez interrompre le renouvellement en un clic depuis votre espace Mon Compte. Aucun frais caché n\'est prélevé.',
  },
  {
    id: 'mobile-money-securite',
    question: 'Le paiement Mobile Money est-il sécurisé ?',
    answer: 'Oui, à 100%. Nos transactions sont traitées en partenariat avec FedaPay et Kkiapay, les agrégateurs de paiement leaders en Afrique de l\'Ouest. Vos paiements MTN Mobile Money, Moov Money, Orange Money ou Wave sont cryptés SSL et vous validez chaque transaction directement par code USSD confidentiel sur votre téléphone.',
  },
  {
    id: 'delai-rapport',
    question: 'Combien de temps pour recevoir mon rapport de diagnostic ?',
    answer: 'Le résultat est instantané ! Dès que vous validez le formulaire de diagnostic ou de validation d\'idée, le moteur génère votre rapport visuel complet en moins de 3 secondes. Vous pouvez immédiatement le télécharger ou le partager sur WhatsApp.',
  },
];

export default function FAQPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-4xl mx-auto space-y-10">
      {/* JSON-LD Script tag */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12122B] text-[#F2A93B] text-xs font-semibold shadow-sm">
          <HelpCircle className="w-4 h-4 text-[#F2A93B]" /> Centre d&apos;Aide & Transparence
        </div>
        <h1 className="font-title text-3xl sm:text-4xl font-extrabold text-[#1B1B2F] tracking-tight">
          Foire Aux Questions (FAQ)
        </h1>
        <p className="text-sm sm:text-base text-[#1B1B2F]/80 max-w-2xl mx-auto leading-relaxed">
          Tout ce que vous devez savoir sur le fonctionnement d&apos;Ebook Check, nos calculs de score et les paiements Mobile Money.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {faqItems.map((item) => (
          <div
            key={item.id}
            id={item.id}
            className="bg-white border border-[#12122B]/15 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow space-y-2"
          >
            <h3 className="font-title text-lg font-bold text-[#12122B] flex items-start gap-2">
              <span className="text-[#F2A93B] font-extrabold">Q.</span> {item.question}
            </h3>
            <p className="text-sm text-[#1B1B2F]/80 leading-relaxed font-normal pl-6">
              {item.answer}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-[#12122B] text-[#FAF3E7] rounded-3xl p-8 text-center space-y-4 shadow-xl">
        <h3 className="font-title text-2xl font-bold">Une autre question sur votre ebook ?</h3>
        <p className="text-sm text-[#FAF3E7]/80 max-w-lg mx-auto">
          Testez directement notre outil de diagnostic gratuit pour voir des conseils personnalisés pour votre livre.
        </p>
        <div className="pt-2">
          <Link
            href="/diagnostic"
            className="inline-flex items-center gap-2 bg-[#F2A93B] text-[#12122B] font-bold px-6 py-3.5 rounded-xl shadow-lg hover:bg-[#F2A93B]/90 transition-all min-h-[48px]"
          >
            Lancer un Diagnostic Gratuit <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
