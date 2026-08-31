# Prompt - Étape 6 : SEO Technique + Analytics

## Context & Product Mission
Ebook Check must be fully optimized for search engines (targeting terms like "pourquoi mon ebook ne se vend pas", "valider une idée d'ebook") and performance on mobile networks.

- **Target Lighthouse:** 90+ on mobile.
- **Tech Stack:** Next.js 14 App Router, Google Analytics 4, Google Search Console, Sentry.

## Task Description
Implement Step 6 of the development priorities: **SEO Technique (sitemap, meta, JSON-LD) + Analytics**.

### Deliverables & Requirements:
1. **Meta & Open Graph / Twitter Cards:**
   - Unique meta title & description per page targeting user search intent.
   - Open Graph + Twitter Card meta tags optimized for sharing on WhatsApp/Facebook.

2. **Automated SEO Artifacts:**
   - `sitemap.xml` and `robots.txt` automatically generated in Next.js App Router.
   - JSON-LD structured data (`Organization` schema on home, `FAQPage` schema on FAQ).
   - Semantic HTML (single `<h1>` per page, proper heading hierarchy).

3. **Performance & Tracking:**
   - Image optimization (WebP format, lazy loading). Target Lighthouse 90+ on mobile.
   - Google Analytics 4 integration & Sentry error tracking configuration.
