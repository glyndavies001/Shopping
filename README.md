# Trolley 🛒

A shared household shopping list (installable web app). Each person signs in with their Vaulted account and sees the same list, live.

- **Trip** – the list for the next shop: tick items off in the order you walk the shop and it learns the route (per shop). Suggestions for things that might be due, staples in one tap, flag items that are running low, estimated cost, "Finish" saves the trip (with the actual total, optionally read from a receipt photo).
- **Master** – everything you buy, by category: staples, prices, notes, aisle numbers, out-of-stock flags, drag to reorder.
- **Meals** – ingredient lists you can add to the trip in one go.
- **History** – past trips, spend, most-bought, a 14-week heatmap.
- Adding: type several at once ("bread, milk and eggs"), say them (🎤), scan a barcode (📷, Android), or paste a recipe.
- Swipe right to tick, left to remove; long-press to edit; pull down to refresh.

## How it's built

Plain HTML and JavaScript, no build step: `index.html` (the whole app), `sw.js` (offline cache: the app opens without signal and shows the last copy of the list), `manifest.json`, `icon.svg`, `vendor/supabase.js` (Supabase JS 2.49.4).

Data lives in the same Supabase project as Vaulted and Vitals, in the tables `shops`, `master_items`, `current_list`, `order_map`, `trips`, `app_state`, `categories`, `price_history`, `meals`, `meal_ingredients` and `out_of_stock`. Row-level security lets in only signed-in household members (a row in `profiles`); changes reach the other phone through Supabase Realtime. The phone keeps a copy in IndexedDB for offline viewing; saving needs a connection.

## Deploying

Vercel, no build settings: every push to `main` deploys. Bump the version (`APP_VERSION` and the two `v…` labels in `index.html`) and `CACHE_NAME` in `sw.js` with each change, so phones pick up the new files.
