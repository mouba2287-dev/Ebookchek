# JULES.md — Ebook Check

## Mission du produit
Ebook Check est un outil qui aide les vendeurs d'ebooks (Chariow, Maketou, etc.) à
valider une idée avant de créer leur produit, à diagnostiquer pourquoi leur ebook
ne se vend pas, et à progresser durablement grâce à des analyses de marché et du
contenu pédagogique. Le produit ne remplace pas Chariow : il résout le problème
marketing que Chariow ne résout pas.

Public cible : entrepreneurs digitaux africains francophones, principalement sur
mobile, avec une culture WhatsApp/TikTok forte et une sensibilité au prix (paiement
en FCFA via Mobile Money).

## Principes de développement
- Mobile-first strict : plus de 80% du trafic attendu vient du mobile
- Chaque écran doit se comprendre en moins de 5 secondes, sans jargon technique
- Le rapport de diagnostic est le cœur du produit : il doit être visuellement
  impeccable, c'est ce qui sera partagé sur WhatsApp et doit donner envie de cliquer
- Vitesse avant tout : connexions mobiles africaines souvent lentes, chaque page
  doit rester légère
- Les fonctionnalités v1 (diagnostic, validation, paiement) ne doivent jamais être
  dégradées par l'ajout de nouveaux modules — on ajoute, on ne remplace pas

## Stack technique
- Framework : Next.js 14+ (App Router), TypeScript strict
- UI : Tailwind CSS + shadcn/ui pour des composants accessibles et cohérents
- Base de données / Auth / Storage : Supabase (PostgreSQL)
- Authentification : Email/mot de passe + connexion Google (OAuth) via Supabase
  Auth Providers
- Paiement : Kkiapay ou FedaPay (Mobile Money MTN Bénin en priorité)
- Vision IA (module analyse Chariow) : API Claude ou GPT avec capacité vision
- Tâches planifiées (analyse mensuelle automatique) : cron job Vercel ou Supabase
  Edge Function
- Emailing transactionnel : Resend
- Hébergement : Vercel (frontend + API routes)
- Analytics : Google Analytics 4 + Google Search Console
- Suivi d'erreurs : Sentry
- Gestion de versions : branches `feature/nom-fonctionnalite`, commits au format
  `type: description` (feat, fix, chore, docs)

## Design system

### Palette
- Fond clair : #FAF3E7 (ivoire chaud) — Fond sombre : #12122B (indigo nuit)
- Accent principal : #F2A93B (or/marigold) — Accent alerte : #E85C4A (corail)
- Succès : #2F9E68 — Texte principal : #1B1B2F

### Typographie
- Titres : Fraunces — Corps de texte : Public Sans ou Work Sans

### Principes visuels
- Pas de dégradés génériques ni de cartes SaaS interchangeables
- Coins arrondis modérés (8-12px)
- Une seule animation marquante par écran
- Accessibilité : contraste AA minimum, focus clavier visible, touch targets 44px+

### Thème sombre/clair
Basculable via Tailwind (classe `dark:`), préférence sauvegardée par utilisateur
dans Supabase. Toggle accessible depuis l'onglet Compte ou l'en-tête.

## Navigation
Structure en onglets regroupant tous les modules :
- Tableau de bord (vue d'ensemble, quota du mois, dernière activité)
- Diagnostic
- Validation
- Étude de marché
- Analyse Chariow
- Académie
- Abonnement
- Compte (profil, thème, déconnexion)

Sur mobile : barre d'onglets fixe en bas d'écran. Sur desktop : menu latéral ou
barre horizontale en en-tête.

## Fonctionnalités v1 (fondations — ne pas modifier)

### Validation d'idée
Formulaire (sujet, public visé, prix envisagé) → score de viabilité, titres
suggérés, fourchette de prix recommandée.

### Diagnostic 0 vente
Formulaire (lien produit avec scraping auto si Chariow, canal de promotion,
ancienneté) → rapport en 5 axes (titre, visuel, prix, description, diffusion)
avec scoring visuel et recommandation concrète par axe faible. Bouton de partage
WhatsApp générant une image du rapport.

### Authentification
- Email/mot de passe via Supabase Auth
- Connexion Google (OAuth) via Supabase Auth Providers
- Déconnexion : bouton dans l'onglet Compte, appelle signOut() du SDK Supabase

### Comptes utilisateurs
Historique des diagnostics/validations, suivi de progression.

## Fonctionnalités v2 (nouveaux modules)

### Étude de marché en self-service (palier Gratuit)
Version manuelle : l'utilisateur lance lui-même une analyse (saisonnalité,
concurrents directs, fourchette de prix par sous-catégorie).

### Analyse de marché automatique mensuelle (palier Créateur)
Même analyse que ci-dessus, générée automatiquement chaque mois via tâche
planifiée, avec notification à l'utilisateur quand elle est prête.

### Analyse de marché illimitée à la demande (palier Pro)
Génération illimitée, disponible à tout moment sans attendre le cycle mensuel.

### Générateur d'idées par étude de marché (palier Pro)
1. Collecte : scraping Chariow/Maketou (titres, prix, fréquence) + Google Trends
2. Score de demande = fréquence d'apparition + tendance de recherche
3. Score de concurrence = qualité perçue des produits existants (avis, description)
4. Angle spécifique = IA appliquant la règle "public précis + situation précise +
   résultat précis"
5. Sortie = liste de 5-10 idées classées, avec sujet, angle, justification,
   fourchette de prix

### Analyse du compte Chariow par capture d'écran (palier Créateur et Pro)
L'utilisateur uploade une capture d'écran de sa boutique/page produit. Analyse
via API de vision IA : qualité de la couverture, lisibilité du titre, clarté de
la description visible à l'écran. Sortie au même format que le diagnostic.

### Académie (accessible à tous les paliers, y compris Gratuit)
CMS simple en Markdown stocké dans Supabase. Contenu initial :
- "Comment faire de la publicité Facebook pour vendre son ebook"
- "Comment vendre efficacement via WhatsApp"
- "Rédiger une description qui convertit"
- "Fixer le bon prix pour son ebook"
- "Trouver des niches rentables et des idées gagnantes"

Ne jamais mettre l'Académie derrière un mur payant — c'est le levier SEO et
d'acquisition principal.

## Abonnements

| Palier | Prix | Étude de marché | Diagnostic | Validation | Analyse Chariow | Académie |
|---|---|---|---|---|---|---|
| Gratuit | 0 FCFA | Self-service | 1/mois | 1/mois | — | Complet |
| Créateur | 3 000 FCFA/mois (30 000/an) | 1 analyse auto/mois | Illimité | Illimité | Inclus | Complet |
| Pro | 8 000 FCFA/mois (80 000/an) | Illimité, à la demande | Illimité | Illimité | Inclus | Complet |

Tarif fondateur envisageable au lancement (ex: Créateur à 2 000 FCFA pour les
100 premiers inscrits, verrouillé à vie) pour créer de l'urgence et valider
l'appétence réelle du marché.

## Pages et routes
- `/` — Accueil / landing
- `/tableau-de-bord` — vue d'ensemble post-connexion
- `/diagnostic`, `/valider`, `/etude-de-marche`, `/analyse-chariow`
- `/academie` — liste des guides + pages individuelles
- `/tarifs`, `/faq`, `/compte`
- `/mentions-legales`, `/politique-confidentialite`, `/conditions-generales`

## FAQ (contenu minimal)
- Est-ce que Ebook Check remplace Chariow ?
- Comment le score de diagnostic est-il calculé ?
- Mes données produit sont-elles partagées avec d'autres vendeurs ?
- Puis-je annuler mon abonnement à tout moment ?
- Le paiement Mobile Money est-il sécurisé ?
- Combien de temps pour recevoir mon rapport ?

## SEO et référencement
- Meta title/description uniques par page, orientés intention de recherche
- Open Graph + Twitter Card pour un aperçu propre au partage
- `sitemap.xml`, `robots.txt`, données structurées JSON-LD (Organization + FAQPage)
- HTML sémantique, un seul h1 par page
- Images optimisées (WebP, lazy loading), objectif Lighthouse 90+ mobile
- Google Search Console dès la mise en ligne

## Sécurité et fiabilité
- Validation des entrées côté serveur sur tous les formulaires
- Limitation de débit (rate limiting) sur les endpoints de diagnostic/quota
- Variables sensibles uniquement en variables d'environnement
- HTTPS forcé, headers de sécurité de base (CSP, X-Frame-Options)

## Priorités de développement (ordre des tâches)
1. Landing page + design system + navigation par onglets
2. Authentification (email + Google) + thème sombre/clair
3. Mode diagnostic complet (v1)
4. Pages légales + FAQ (nécessaires avant mise en ligne publique)
5. Académie (5 guides initiaux)
6. Paiement Mobile Money (Kkiapay/FedaPay) + système d'abonnement
7. Mode validation (v1) + étude de marché self-service (Gratuit)
8. Analyse Chariow par capture d'écran (Créateur/Pro)
9. Analyse de marché automatique mensuelle (Créateur) + illimitée (Pro)
10. Générateur d'idées (Pro)
11. SEO technique (sitemap, JSON-LD) + Analytics
