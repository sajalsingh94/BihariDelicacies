# Bihari Delicacies – Online Marketplace Hub

A full-stack Next.js application where users shop authentic Bihari foods, sellers manage listings, and the community shares recipes.

## Tech Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- MongoDB (Mongoose)
- JWT Auth (Next.js API routes)
- Redux Toolkit (cart + session)
- next-themes (dark mode)

## Getting Started
1. Install dependencies:
```bash
npm install
```

2. Create `.env.local`:
```
MONGODB_URI=
JWT_SECRET=
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

3. Run dev server:
```bash
npm run dev
```

4. Build and start:
```bash
npm run build && npm start
```

## Features Roadmap
- Home, Shop, Recipes, About, Contact
- Login/Signup for Users and Sellers
- Product CRUD (Seller Dashboard)
- Cart & Checkout (COD + card placeholder)
- Orders and analytics
- Recipe CRUD with likes and comments

## Deploy
- Vercel is recommended. Add environment variables in project settings.