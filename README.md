# Trolley 🛒

Smart shared shopping list PWA that learns the order you walk through your shop. Built with Supabase realtime sync.

## Files
- `index.html` — the app
- `manifest.json` — PWA manifest
- `icon.svg` — app icon
- `supabase-setup.sql` — database schema (run once)

## Setup

### 1. Supabase

In your existing Supabase project:
1. Go to **SQL Editor → New query**
2. Paste in the contents of `supabase-setup.sql`
3. Click **Run**

This creates three tables (`items`, `order_map`, `meta`) and enables realtime + row-level security policies that allow anonymous read/write.

### 2. Deploy to Vercel

1. Create a new GitHub repo, push these files to it
2. Import the repo into Vercel as a new project
3. No build settings needed — it's a static site, deploy as-is
4. Vercel gives you a HTTPS URL

### 3. Connect the app

1. Open the deployed URL on your phone
2. On the connect screen, paste your **Supabase URL** and **anon key**
   - Find these in Supabase: Settings → API → Project URL and Project API Keys (anon, public)
3. Tap connect
4. Use "Add to Home Screen" in your browser to install as a PWA
5. Repeat steps 1–4 on your partner's phone — they'll see the same list immediately

## How the learning works

Every time an item is ticked off, the app records the *order* it was collected during that trip (0 = first, 1 = second, etc). It maintains an exponential weighted average per item — recent trips count more than old ones, so the system adapts if you switch shops or rearrange your route.

After 2+ trips, items sort by their learned position. The dots next to "learned" show confidence:
- ●○○ = some data
- ●●○ = 2+ trips of data
- ●●● = 5+ trips, well-learned

## Security note

The anon key is exposed in the browser (this is normal for Supabase frontend apps), but since RLS allows anonymous access to your tables, anyone with the URL + anon key can read/write your list. Treat them like a household password and don't post screenshots showing them. For a fully locked-down version, add Supabase Auth and tighten the RLS policies.
