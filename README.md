# Trolley 🛒

Smart shared shopping list PWA with a master catalogue, learned route ordering, and trip history.

## What's new in v3

- **Master list** — every item you might ever buy, persistent. Tap "+ need" to add to current trip.
- **Quantities** — each item on the current trip has a +/− counter.
- **Trip history** — completed trips saved with date, items, and quantities. Expandable cards, deletable.
- **Stats** — total trips, items bought, average per trip, most-bought item, days since last shop.
- **Theme** — dark Jungle Wood Green to match the Sportage.

## Files
- `index.html` — the app
- `manifest.json` — PWA manifest
- `icon.svg` — app icon
- `supabase-setup.sql` — database schema (run once)

## Setup

### 1. Supabase

If you already ran the previous version, **drop the old tables first**:

```sql
drop table if exists items, order_map, meta cascade;
```

Then in SQL Editor, paste in `supabase-setup.sql` and run.

This creates four tables: `master_items`, `current_list`, `order_map`, `trips`. All with realtime + anonymous RLS.

### 2. Vercel

New repo, push the files, import to Vercel as a static site. No build settings.

### 3. Connect

Open the deployed URL on your phone, paste Supabase URL + anon key on the connect screen, install as PWA. Repeat on your partner's phone with the same credentials.

## How it works

**Trip view (default)** — what you actually need now. Add items quickly, adjust quantities, tick off as you collect.

**Master view** — your full catalogue of "things we buy". Sorted by your learned route (so you can scan it in the order you'll encounter items in the shop). Tap "+ need" to add to trip with quantity 1, then use +/− to bump.

**History view** — every completed trip with stats. Tap a trip card to expand and see what was bought. Delete button on each trip.

## Workflow

1. First-time: add a bunch of staples to your master list ("milk", "bread", "eggs", "pasta", etc.)
2. Before a shop: switch to Master, tap "+ need" on what you need, adjust quantities
3. At the shop: switch to Trip, tick items off as you collect them — order is learned
4. After 2+ trips, the master list reorders itself by your route, so picking items is faster
5. When done, hit "finish trip →" to save it to history

## Theme colour note

If "Jungle Wood Green" isn't quite right for your Sportage, the colour variables are at the top of the CSS in `index.html`:

```css
--accent: #4a6b3e;          /* main green */
--accent-bright: #6a8f5a;   /* lighter version */
```

Tweak these to taste.
