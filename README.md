# Ebook Check

Valide ton idée d'ebook avant de la créer, ou découvre pourquoi elle ne se vend pas.

Ebook Check est un outil pensé pour les vendeurs de produits digitaux en Afrique
francophone (Chariow, Maketou et plateformes similaires). Il ne remplace pas ces
plateformes de vente : il résout le problème qu'elles ne résolvent pas — savoir si
un produit va se vendre, et pourquoi il ne se vend pas quand ça bloque.

## Le problème

Les plateformes de vente de produits digitaux encaissent et hébergent, mais ne
disent jamais à un vendeur pourquoi son produit ne se vend pas, ni s'il vaut la
peine d'être créé avant même d'être lancé. Résultat : des vendeurs qui publient à
l'aveugle, un marché saturé de produits mal pensés.

## Fonctionnalités

- **Validation d'idée** — avant de créer un ebook, vérifie le niveau de saturation
  de la niche, obtiens des suggestions de titres différenciants et une fourchette
  de prix recommandée
- **Diagnostic 0 vente** — pour un produit déjà en ligne, un rapport sur 5 axes
  (titre, visuel, prix, description, canal de diffusion) avec une recommandation
  concrète pour chaque point faible
- **Partage WhatsApp** — génère une image du rapport, prête à partager
- **Paiement Mobile Money** — pensé pour le marché ouest-africain dès le départ

## Stack technique

| Couche | Techno |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| UI | Tailwind CSS + shadcn/ui |
| Base de données / Auth | Supabase (PostgreSQL) |
| Paiement | FedaPay / Kkiapay |
| Email transactionnel | Resend |
| Hébergement | Vercel |
| Suivi d'erreurs | Sentry |

## Démarrage

```bash
git clone https://github.com/<ton-compte>/ebook-check.git
cd ebook-check
npm install
cp .env.example .env.local
npm run dev
```

## Structure du projet                                                                                                                                                      /app routes Next.js (App Router)
/valider mode validation d'idée
/diagnostic mode diagnostic 0 vente
/tarifs
/faq
/compte
/components composants UI réutilisables
/lib logique métier (moteur de scoring, appels Supabase)
/public assets statiques                                                                                                                                                     
## Roadmap

- [x] Cahier des charges et design system
- [ ] Landing page
- [ ] Mode diagnostic (formulaire + moteur de règles + rapport)
- [ ] Pages légales (mentions, confidentialité, CGU)
- [ ] Paiement Mobile Money + mode validation
- [ ] Comptes utilisateurs
- [ ] SEO technique (sitemap, JSON-LD, Analytics)

## Licence

Tous droits réservés — projet privé, non open source pour l'instant.
L'application est accessible sur `http://localhost:3000`.

### Variables d'environnement requises
