# PawStyle

A modern pet clothing e-commerce storefront built with Next.js, React, and Tailwind CSS.

## Features

- Product catalog with category filtering
- Product detail pages with size/color selection
- Shopping cart with localStorage persistence
- Responsive, mobile-friendly design
- Warm pet-brand aesthetic

## Getting Started

### InPost Parcel Locker delivery

The cart always supports manual InPost parcel locker codes. To also show the
official embedded InPost map, create a public Geowidget token in InPost Manager
and set `NEXT_PUBLIC_INPOST_GEOWIDGET_TOKEN` in the local and Vercel
environments. Redeploy after changing the Vercel environment variable.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

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
├── data/          # Product catalog
├── lib/           # Utilities
└── types/         # TypeScript types
```

## Note

This is a demo storefront. Checkout is not connected to a payment provider.
