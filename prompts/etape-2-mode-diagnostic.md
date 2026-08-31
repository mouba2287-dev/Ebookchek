# Prompt - Étape 2 : Mode Diagnostic complet

## Context & Product Mission
Ebook Check helps digital ebook sellers diagnose why their ebook isn't selling. The diagnostic report is the core heart of the product: it must look visually flawless and ready to be shared on WhatsApp.

- **Target Audience:** Francophone African digital entrepreneurs (mobile-first, WhatsApp shareability, no tech jargon).
- **Design System Rules:** Ivory background (`#FAF3E7`), Night Indigo (`#12122B`), Marigold CTA (`#F2A93B`), Warm Coral Alert (`#E85C4A`), Success (`#2F9E68`). Typography: Fraunces & Public/Work Sans.

## Task Description
Implement Step 2 of the development priorities: **Mode diagnostic complet (formulaire, moteur de règles, rapport visuel)** on route `/diagnostic`.

### Deliverables & Requirements:
1. **Diagnostic Form (`/diagnostic`):**
   - Inputs: Product link (auto-scraping support / placeholder parsing if Chariow link provided), promotion channel (WhatsApp, TikTok, Facebook, etc.), time online / age of product.
   - Server-side input validation for all fields.
   - Rate limiting on diagnostic API endpoints to protect free quota.

2. **Rule Engine & Scoring Logic (`/lib/scoring` or equivalent):**
   - Evaluate product along 5 core axes: Title, Visual/Cover, Price, Description, Promotion channel.
   - Compute visual scoring per axis and overall viability score.
   - Generate specific actionable recommendations for each weak axis.

3. **Visual Diagnostic Report:**
   - Display a visual, beautifully designed report card (custom score bars, status badges, clean hierarchy).
   - Core animation for score reveal (single impactful animation).
   - **WhatsApp Share Feature:** Include a "Partager sur WhatsApp" button that generates an image/preview of the report ready for instant WhatsApp sharing.
