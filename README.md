# Ebook Check — Outil de Diagnostic & Validation d'Ebooks pour l'Afrique Francophone

**Ebook Check** est une application web SaaS conçue pour aider les vendeurs de produits digitaux (ebooks, formations, guides) en Afrique francophone (Bénin, Côte d'Ivoire, Sénégal, Cameroun, etc.) à valider leurs idées avant création et à diagnostiquer pourquoi un livre stagne à 0 vente sur Chariow ou Maketou.

---

## 🚀 Fonctionnalités Clés

1. **Validation d'Idée** :
   - Évaluation du sujet, du public cible, du problème résolu et de la fourchette de prix idéale en FCFA.
   - Calcul d'un score de viabilité/opportunité sur 100 et génération de 4 propositions de titres à forte conversion.

2. **Diagnostic 0 Vente (5 Axes)** :
   - Formulaire d'analyse produit complet.
   - Upload d'image de couverture réelle (`jpg`, `png`, `webp`) avec aperçu.
   - Analyse automatisée sur 5 axes : Titre & Promesse, Visuel/Couverture 3D, Prix FCFA, Description & Rassurance, Canal de Diffusion (WhatsApp, TikTok, Facebook).
   - Plan d'action prioritaire et téléchargement/partage du rapport sur WhatsApp.

3. **Analyse Chariow Vision IA (NVIDIA NIM)** :
   - Upload multi-fichiers de captures d'écran de pages de vente Chariow ou Maketou.
   - Détection des visuels, titres et prix par modèle de vision IA (API NVIDIA NIM / Neva).
   - Mode alternatif manuel disponible si la boutique Chariow n'est pas connectée via API officielle.

4. **Étude de Marché & Générateur d'Idées Pro** :
   - Analyse des niches les plus demandées en Afrique de l'Ouest.
   - Génération d'angles d'attaque spécifiques par IA et recommandation de prix FCFA.

5. **Académie Pédagogique (Markdown)** :
   - 5 guides pratiques gratuits rédigés en Markdown (Publicité Facebook Ads, Stratégie WhatsApp Statuts, Copywriting, Fixer le prix FCFA, Niches rentables).

6. **Tableau de Bord & Historique** :
   - Suivi de progression des scores par produit, quotas mensuels et programme de parrainage WhatsApp.

7. **Paiement Mobile Money (MTN)** :
   - Tarifs transparents en FCFA (Gratuit 0 FCFA, Créateur 3 000 FCFA/mois, Pro 8 000 FCFA/mois, Offre Fondateur 2 000 FCFA/mois).
   - Modal de paiement sécurisé MTN Mobile Money.

---

## 🛠️ Stack Technique

- **Framework** : Next.js 14+ (App Router)
- **Langage** : TypeScript strict
- **Design & UI** : Tailwind CSS (avec `darkMode: 'class'`), Lucide Icons, typographie Fraunces (titres) + Public Sans
- **Navigation** : Sidebar fixe rétractable sur Desktop & Barre d'onglets BottomNav sur Mobile
- **Authentification & DB** : Supabase (`@supabase/ssr`) + Cookies locaux
- **Vision IA** : API NVIDIA NIM (`NVIDIA_API_KEY`)
- **Sécurité** : Middleware Next.js pour la protection des routes privées (`middleware.ts`)
- **Hébergement** : Vercel

---

## ⚙️ Installation & Lancement Local

1. **Cloner le dépôt et installer les dépendances** :
   ```bash
   git clone https://github.com/votre-compte/ebook-check.git
   cd ebook-check
   npm install
   ```

2. **Configurer les variables d'environnement (`.env.local`)** :
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-cle-anon-supabase
   NVIDIA_API_KEY=votre-cle-nvidia-nim-vision
   ```

3. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```
   L'application sera accessible sur `http://localhost:3000`.

4. **Tester le build de production** :
   ```bash
   npm run build
   npm run start
   ```

---

## 🧪 Tests & Déploiement Vercel

### Tests Visuels & E2E (Playwright)
Des scripts d'enregistrement de démonstrations utilisateur sont inclus dans `/home/jules/verification/` pour générer des démonstrations vidéo et des captures d'écran en modes mobile et PC :
```bash
python3 /home/jules/verification/record_pc.py
```

### Déploiement sur Vercel
1. Pousser le code vers votre dépôt GitHub.
2. Importer le projet dans Vercel.
3. Configurer la variable `NVIDIA_API_KEY` (optionnelle, mode démo/heuristique disponible si absente).
4. Cliquer sur **Deploy**.
