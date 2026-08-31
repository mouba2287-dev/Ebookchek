# Ebook Check - Plan de Développement & Prompts par Étape

Ce document regroupe les prompts de découpage par étape de développement pour le projet **Ebook Check**, structurés selon la section *Priorités de développement* du cahier des charges `JULES.md`.

---

## Vue d'ensemble des étapes

1. **[Étape 1 : Landing Page + Design System de base](./prompts/etape-1-landing-page-design-system.md)**
2. **[Étape 2 : Mode Diagnostic complet](./prompts/etape-2-mode-diagnostic.md)**
3. **[Étape 3 : Pages Légales + FAQ](./prompts/etape-3-pages-legales-faq.md)**
4. **[Étape 4 : Paiement Mobile Money + Mode Validation](./prompts/etape-4-paiement-validation.md)**
5. **[Étape 5 : Comptes Utilisateurs + Historique](./prompts/etape-5-comptes-utilisateurs.md)**
6. **[Étape 6 : SEO Technique + Analytics](./prompts/etape-6-seo-analytics.md)**

---

## Details des Prompts

### Étape 1 : Landing Page + Design System de base
- Configuration Tailwind & shadcn/ui avec la palette (#FAF3E7, #12122B, #F2A93B, #E85C4A, #2F9E68) et polices (Fraunces + Public Sans / Work Sans).
- Page d'accueil (`/`) : Proposition de valeur, 2 CTA ("Valider une idée", "Diagnostiquer mon ebook"), 3 étapes "comment ça marche", et aperçu visuel du rapport.

### Étape 2 : Mode Diagnostic complet
- Formulaire diagnostic (`/diagnostic`) avec validation serveur et rate limiting.
- Moteur de règles sur 5 axes (titre, visuel, prix, description, diffusion).
- Rapport visuel dynamique avec bouton "partager sur WhatsApp" (génération d'image/aperçu).

### Étape 3 : Pages Légales + FAQ
- Page FAQ (`/faq`) couvrant les 6 questions obligatoires + JSON-LD `FAQPage`.
- Pages légales : `/mentions-legales`, `/politique-confidentialite`, `/conditions-generales`.
- Bandeau de consentement cookies.

### Étape 4 : Paiement Mobile Money + Mode Validation
- Page Tarifs (`/tarifs`) : comparatif (Gratuit vs Payant vs Abonnement), intégration FedaPay/Kkiapay en FCFA sans redirection lourde.
- Mode Validation (`/valider`) : formulaire idée/public/prix, calcul viabilité, suggestions titres et fourchette de prix.

### Étape 5 : Comptes Utilisateurs + Historique
- Auth Supabase & dashboard protégé (`/compte`).
- Historique des diagnostics et validations passées.
- Gestion de l'abonnement.

### Étape 6 : SEO Technique + Analytics
- Meta titles, OG & Twitter Cards pour WhatsApp/Facebook.
- Generation auto `sitemap.xml`, `robots.txt`, JSON-LD `Organization`.
- Performance mobile (WebP, lazy loading, target 90+ Lighthouse), intégrations GA4 et Sentry.
