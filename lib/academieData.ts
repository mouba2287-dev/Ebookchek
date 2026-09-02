export interface Guide {
  slug: string;
  title: string;
  category: 'facebook' | 'whatsapp' | 'copywriting' | 'prix' | 'niches';
  categoryLabel: string;
  readTime: string;
  excerpt: string;
  contentMarkdown: string;
}

export const guidesData: Guide[] = [
  {
    slug: 'publicite-facebook-vendre-ebook',
    title: 'Publicité Facebook pour Vendre son Ebook en Afrique',
    category: 'facebook',
    categoryLabel: 'Publicité Facebook',
    readTime: '6 min de lecture',
    excerpt: 'Comment paramétrer une campagne Facebook Ads rentable avec Mobile Money sans dépenser une fortune.',
    contentMarkdown: `
# Publicité Facebook pour Vendre son Ebook en Afrique

La publicité Facebook reste l'un des moyens les plus rapides pour toucher des milliers d'acheteurs potentiels en Afrique francophone (Bénin, Côte d'Ivoire, Sénégal, Cameroun).

## 1. Ne Vends Pas Directement sur le Feed
En Afrique, la confiance est la clé. Diriger directement vers une page de vente produit une conversion très faible si ta marque est inconnue.
- **La Stratégie WhatsApp First** : Configure ton objectif de campagne sur "Messages WhatsApp Business".
- **Le Pitch Instantané** : L'utilisateur clique sur ta pub Facebook -> il arrive directement sur ton WhatsApp Business avec un message pré-rempli : *"Bonjour, je souhaite recevoir l'extrait de l'ebook X"*.

## 2. Le Cibleur Géographique & Budget
- **Budget initial** : 2 $ à 5 $ par jour (environ 1 200 à 3 000 FCFA/jour).
- **Ciblage** : Sélectionne les grandes villes économiques (Cotonou, Abidjan, Dakar, Douala).
- **Âge** : 22 - 45 ans.
- **Intérêts** : E-commerce, Mobile Money, Entrepreneuriat, Formation.

## 3. Le Visuel Pub
Un visuel simple avec un mockup 3D de ton livre + un badge "Téléchargement Immédiat par Mobile Money" surpasse toutes les images génériques.
    `,
  },
  {
    slug: 'vendre-efficacement-sur-whatsapp',
    title: 'Vendre Efficacement via WhatsApp (Statuts & Groupes)',
    category: 'whatsapp',
    categoryLabel: 'WhatsApp Marketing',
    readTime: '5 min de lecture',
    excerpt: 'Transforme tes contacts et tes vues en statut WhatsApp en clients fidèles et réguliers.',
    contentMarkdown: `
# Vendre Efficacement via WhatsApp

WhatsApp est le canal de conversion numéro 1 en Afrique de l'Ouest. Plus de 80% des transactions de produits digitaux s'y concluent.

## 1. La Règle des 80/20 sur les Statuts
Si tu ne fais que poster le lien de ton ebook sur ton statut 10 fois par jour, tes vues vont s'effondrer.
- **80% d'Éducation & Storytelling** : Partage des conseils gratuits, des erreurs évitées, des captures de messages clients satisfaits.
- **20% d'Appel à l'Action (CTA)** : Propose le lien vers ta page Chariow ou Maketou avec un bonus disponible pendant 24h.

## 2. Captures d'Écran de Preuve Sociale
Avant d'acheter, un client ouest-africain vérifie que d'autres personnes ont déjà payé et reçu le PDF.
- Affiche les notifications de réception Mobile Money (en masquant les numéros).
- Partage les messages de remerciement des premiers lecteurs.
    `,
  },
  {
    slug: 'rediger-description-qui-convertit',
    title: 'Rédiger une Description d\'Ebook qui Convertit',
    category: 'copywriting',
    categoryLabel: 'Copywriting',
    readTime: '4 min de lecture',
    excerpt: 'La structure AIDA exacte pour donner envie d\'acheter immédiatement sur Chariow et Maketou.',
    contentMarkdown: `
# Rédiger une Description d'Ebook qui Convertit

La description de ta page Chariow doit lever tous les doutes en moins de 10 secondes.

## La Structure AIDA Simplifiée

1. **A - Attention** : Interpelle avec le problème principal.
   *Exemple : "Tu as créé ton ebook mais personne ne l'achète sur ton statut WhatsApp ?"*
2. **I - Intérêt** : Présente la solution en 2 phrases.
   *Exemple : "Voici la méthode exacte qui m'a permis de générer 150 000 FCFA dès la première semaine."*
3. **D - Désir** : Liste ce que le lecteur va obtenir avec des puces claires (✅).
4. **A - Action** : Rappelle le prix en FCFA et le mode de paiement rapide.
    `,
  },
  {
    slug: 'fixer-le-bon-prix-en-fcfa',
    title: 'Fixer le Bon Prix en FCFA Selon le Pouvoir d\'Achat',
    category: 'prix',
    categoryLabel: 'Stratégie de Prix',
    readTime: '4 min de lecture',
    excerpt: 'Comment choisir entre 1 500 FCFA, 3 500 FCFA ou 5 000 FCFA pour maximiser tes ventes Mobile Money.',
    contentMarkdown: `
# Fixer le Bon Prix en FCFA

Le prix d'un produit digital en Afrique francophone doit respecter le palier de l'achat d'impulsion par Mobile Money.

## Les Paliers de Prix FCFA Référents

- **1 500 - 3 500 FCFA (Zone Achat d'Impulsion)** : L'acheteur n'a pas besoin de réfléchir ou de demander l'avis de quelqu'un. C'est le tarif idéal pour un premier ebook pratique (30 à 60 pages).
- **5 000 - 7 500 FCFA (Zone Valeur Confirmée)** : Nécessite une promesse très forte ou l'ajout de bonus (modèles prêts à l'emploi, accès groupe WhatsApp privé).
- **10 000 FCFA et + (Zone Formation / Pack)** : À réserver aux offres groupées avec accompagnement ou fiches outils avancées.
    `,
  },
  {
    slug: 'trouver-des-niches-rentables-afrique',
    title: 'Trouver des Niches Rentables & Idées Gagnantes',
    category: 'niches',
    categoryLabel: 'Niches & Idées',
    readTime: '6 min de lecture',
    excerpt: 'Les 5 secteurs où les créateurs africains font le plus de chiffre d\'affaires en ce moment.',
    contentMarkdown: `
# Trouver des Niches Rentables en Afrique

Pour qu'un ebook se vende vite, il doit résoudre un problème **douloureux, urgent et financier ou personnel**.

## Les 5 Niches les plus Rentables en Afrique Francophone

1. **L'Importation & le Business Physique Local** (Chine, Turquie, Élevage, Agro-business).
2. **Le Recrutement & les Concours Administratifs** (Préparation aux tests, CV, bourses d'études).
3. **La Saisie d'Opportunités En Ligne** (Freelancing, IA, Community Management).
4. **La Santé & la Beauté Locale** (Perte de poids avec nourriture locale, soins capillaires).
5. **Les Relations & la Vie de Famille**.
    `,
  },
];
