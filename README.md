# PaywallGuard Landing

A modern, responsive landing page built with Next.js (App Router), Tailwind, and Supabase for early-access signups.

## Run locally

1) Node 18.18+ or 20+ is required by Next.js 15.
2) Copy env and set Supabase values:

```bash
cp .env.local.example .env.local
# set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
```

3) Install and start:

```bash
npm install
npm run dev
```

## Supabase

Create a table for signups:

```sql
create table if not exists public.early_access_signups (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null unique,
  created_at timestamptz not null default now()
);
```

No RLS is needed for server-side service role inserts used here. If you enable RLS, create a policy for service role or for anon as appropriate.

## Notes

- Form posts to `/api/early-access` and stores name/email.
- Styles use Tailwind v4 (via `@import "tailwindcss";`).
- Accessible, responsive, and includes subtle animations and micro-interactions.This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
