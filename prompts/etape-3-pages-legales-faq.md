# Prompt - Étape 3 : Pages Légales + FAQ

## Context & Product Mission
Ebook Check requires complete legal compliance and clear user information prior to public release. FAQ and legal pages establish trust for West African digital entrepreneurs.

- **Design System Rules:** Ivory background (`#FAF3E7`), Night Indigo (`#12122B`), Marigold CTA (`#F2A93B`), Warm Coral Alert (`#E85C4A`), Success (`#2F9E68`). Typography: Fraunces & Public/Work Sans. Touch targets >= 44px.

## Task Description
Implement Step 3 of the development priorities: **Pages légales + FAQ (nécessaires avant toute mise en ligne publique)**.

### Deliverables & Requirements:
1. **FAQ Page (`/faq`):**
   - Answer mandatory questions:
     - Est-ce que Ebook Check remplace Chariow ?
     - Comment le score de diagnostic est-il calculé ?
     - Mes données produit sont-elles partagées avec d'autres vendeurs ?
     - Puis-je annuler mon abonnement à tout moment ?
     - Le paiement Mobile Money est-il sécurisé ?
     - Combien de temps pour recevoir mon rapport ?
   - Include JSON-LD structured data (`FAQPage` schema).

2. **Legal Pages:**
   - `/mentions-legales`: Publisher identity, host info.
   - `/politique-confidentialite`: Collected data (form, payment), usage, retention period, right to deletion.
   - `/conditions-generales`: Terms of service, refund policy, liability limits (diagnostic score is indicative, not a sales guarantee).

3. **Cookie Consent Banner:**
   - Display cookie consent banner for Google Analytics compliance.
