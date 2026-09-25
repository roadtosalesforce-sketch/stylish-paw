# Furry Fairy Pets

Premium pet essentials storefront and Sanity content studio. The experience uses a quiet-luxury visual system, three clear product categories, bilingual English/Polish content and an inventory-aware checkout flow.

## Features

- Sanity-managed homepage, navigation/footer settings, category landing pages, products, stock, size guides, pages and blog posts
- Exact storefront categories: Clothing, Collars & Leashes and Essentials
- Pet, category and Special Fits filters for Dachshund, Sighthound, Bulldog and other body profiles
- Product galleries, size/colour variants, material/care notes, related products and approved reviews
- Automatic stock validation at checkout and idempotent stock reduction after confirmed Stripe payment
- PLN/EUR display and Stripe checkout, InPost locker delivery and guest checkout
- Supabase accounts, branded confirmation email, purchase/welcome points and order history
- Responsive English/Polish storefront with metadata, sitemap, robots and product structured data

## Getting Started

### Local development

Copy `.env.example` to `.env.local`, add the required service credentials, then run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Sanity Studio is available at [http://localhost:3000/studio](http://localhost:3000/studio).

### Launch services

- Run both SQL files in `supabase/migrations/` in timestamp order.
- Copy the branded confirmation template from `supabase/templates/` into Supabase Authentication and configure the production SMTP sender.
- Add the production Stripe webhook endpoint `/api/stripe/webhook` and its signing secret.
- Give `SANITY_WRITE_TOKEN` edit permission so paid orders can reduce stock.
- Add all values listed in `.env.example` to the deployment environment.

### InPost Parcel Locker delivery

The cart always supports manual InPost parcel locker codes. To also show the
official embedded InPost map, create a public Geowidget token in InPost Manager
and set `NEXT_PUBLIC_INPOST_GEOWIDGET_TOKEN` in the local and Vercel
environments. Redeploy after changing the Vercel environment variable.

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **TypeScript**

## Project Structure

```
src/
├── app/           # Pages and layouts
├── components/    # UI components
├── context/       # Cart state management
├── sanity/        # CMS queries and inventory administration
├── lib/           # Commerce and service utilities
└── types/         # TypeScript types
```

## Verification

```bash
npx tsc --noEmit
npx sanity schema validate
npm run lint
npm run build
```

See `docs/furry-fairy-implementation-report.md` for the checklist, completed work and launch dependencies.
