# Prompt - Étape 5 : Comptes Utilisateurs + Historique

## Context & Product Mission
Ebook Check user accounts allow digital creators to save past diagnostic reports, track validation history, and manage their subscription.

- **Tech Stack:** Supabase (PostgreSQL / Auth / Storage), Next.js 14 App Router.

## Task Description
Implement Step 5 of the development priorities: **Comptes utilisateurs + Historique (`/compte`)**.

### Deliverables & Requirements:
1. **User Authentication & Supabase Integration:**
   - Sign up / Sign in flow integrated with Supabase Auth.
   - Protected user dashboard route `/compte`.

2. **Dashboard Features (`/compte`):**
   - **History:** List past diagnostics and validation reports for the authenticated user.
   - **Report Access:** View details of previously generated reports.
   - **Subscription Management:** View active plan, payment status, and option to manage/cancel subscription.
