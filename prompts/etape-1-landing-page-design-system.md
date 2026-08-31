# Prompt - Étape 1 : Landing Page + Design System de base

## Context & Product Mission
Ebook Check is a tool helping digital ebook sellers in French-speaking West Africa (Chariow, Maketou, etc.) validate an idea before creating a product and diagnose why their existing ebook isn't selling.

- **Target Audience:** Francophone African digital entrepreneurs (mostly mobile users, strong WhatsApp/TikTok culture, price sensitive to FCFA Mobile Money).
- **Mobile-first strict:** >80% mobile traffic expected. Touch targets >= 44px. Fast loading for slow mobile connections.
- **Design System Rules:**
  - Background Light: `#FAF3E7` (ivoire chaud)
  - Background Dark: `#12122B` (indigo nuit)
  - Primary Accent: `#F2A93B` (or/marigold - CTAs & interactive elements)
  - Alert/Error Accent: `#E85C4A` (corail chaud)
  - Success: `#2F9E68`
  - Text Primary: `#1B1B2F`
  - Typography: Titles in `Fraunces` (serif), Body in `Public Sans` or `Work Sans`. Max 2 font sizes per screen.
  - Moderate rounded corners (8-12px). Visible score bars, status badges. Max 1 key animation per screen.

## Task Description
Implement Step 1 of the development priorities: **Landing Page (`/`) + Design System Base Setup**.

### Deliverables & Requirements:
1. **Design System & Tailwind Config:**
   - Configure Tailwind CSS with the design system color palette, typography (Fraunces + Public Sans/Work Sans), rounded corners, and shadcn/ui base setup.
   - Create layout wrapper with base theme support (background `#FAF3E7`, primary text `#1B1B2F`).

2. **Landing Page (`/`):**
   - **Hero Section:** Clear single-sentence value proposition + 2 distinct primary CTAs:
     - "Valider une idée" (linking to `/valider`)
     - "Diagnostiquer mon ebook" (linking to `/diagnostic`)
   - **How it Works Section ("Comment ça marche"):** 3 clear, concise visual steps explained in under 5 seconds without technical jargon.
   - **Visual Report Preview ("Aperçu du rapport"):** A realistic visual sample/preview card of a diagnostic report proving product value.
