# Trolley v4 🛒

The big one. Offline-first PWA shopping list with categories, per-shop routes, cadence-based suggestions, voice input, swipe gestures, undo, spend tracking, and more.

## What's new in v4

**Architecture**
- **Offline-first** — IndexedDB caches everything, sync queue holds writes when offline and flushes when back online. Works fully in shop dead zones.
- **Service worker** caches app shell for true offline launch.

**Smart features**
- **Categories** with auto-categorisation (keyword-based). Editable per item.
- **Cadence suggestions** — "might be due" chips based on your purchase history.
- **Per-shop routes** — pick the shop at the top, route is learned separately for each.
- **Staples** — mark items, then "+ staples" button adds them all to a new trip in one tap.
- **Dormant items** — surfaces stuff you haven't bought in 60+ days in the master list.
- **Spend tracking** — set estimated prices, see trip totals and lifetime stats.
- **Frequency heatmap** — last 14 weeks of shopping rhythm.

**Quality of life**
- **Voice input** — 🎤 button, speech-to-text into the add field.
- **Swipe gestures** — right to tick, left to remove.
- **Long-press** to edit any item (name, category, price, notes).
- **Undo** — toast with undo button after deletes.
- **Multi-add** — type "bread, milk, eggs" and add all three at once.
- **Search** on both trip and master views.
- **Install prompt** banner for proper PWA install.
- **Haptics** on actions (where supported).

## Files
- `index.html` — the app
- `manifest.json` — PWA manifest
- `icon.svg` — app icon
- `sw.js` — service worker (offline)
- `supabase-setup.sql` — database schema

## Setup

### 1. Supabase

⚠️ **If upgrading from v3**, drop the old tables first:

```sql
drop table if exists master_items, current_list, order_map, trips cascade;
```

Then run `supabase-setup.sql` — this creates 6 tables (`shops`, `master_items`, `current_list`, `order_map`, `trips`, `app_state`) plus seeds your master list with auto-categorisation.

### 2. Vercel

Push all 5 files (`index.html`, `manifest.json`, `icon.svg`, `sw.js`, optionally README) to your GitHub repo. Vercel will redeploy automatically. No build config needed.

### 3. Connect

Same as before — paste Supabase URL + anon key into the connect screen on each device.

## How to use it

**First time:**
1. Open settings (⚙ top right) → add shops if you use more than one (Tesco, Lidl, etc).
2. In Master view, long-press items you always buy → mark as ⭐ staple.
3. Optionally edit items to add estimated prices and notes ("Tesco own brand, large").

**Each shop:**
1. Pick the shop from the dropdown at the top.
2. Use "+ staples" for one-tap addition of regulars.
3. Browse Master and tap "+ need" on anything else.
4. Suggestions show automatically based on your purchase cadence.
5. At the shop, tick items off in the order you encounter them — the route learns.
6. Hit "finish →" when done; optionally enter the actual total spent.

**Gestures:**
- Tap an item to tick off
- Swipe right to tick, left to remove
- Long-press to edit
- Long-press the + button on Master → bulk operations
- 🎤 button for voice add ("add bread milk and eggs")

## Data safety

All data lives in Supabase. App updates only touch the static files in Vercel — your database is never affected. Local IndexedDB is just a cache; the source of truth is always Supabase.

## Tweaking

CSS variables at the top of `index.html`:

```css
--accent: #4a6b3e;
--accent-bright: #6a8f5a;
```

Category icons are in the `CATEGORIES` JS object — change emojis to taste.
