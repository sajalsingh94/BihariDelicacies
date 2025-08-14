# Bihari Delicacies – Online Marketplace Hub

A full-stack Next.js application where users shop authentic Bihari foods, sellers manage listings, and the community shares recipes.

## Tech Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- MongoDB (Mongoose) — optional; app works without DB using mock data
- JWT Auth (API routes) — requires DB; disabled in mock mode
- Redux Toolkit (cart + session)
- next-themes (dark mode)

## Requirements
- Node.js >= 18.17 (recommended: Node 20 LTS)

## Quick Start (Mock Mode – no MongoDB)
This mode uses in-memory mock data for products, recipes, and orders so you can browse, add to cart, checkout, and view order confirmation without any database.

1) Install dependencies
```bash
npm install
```

2) Create `.env.local` with ONLY a JWT secret (no DB needed)
```bash
# .env.local
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
```

3) Run dev server
```bash
npm run dev
```

- Shop, Recipes, Cart, Checkout, and Order confirmation will work using mock data
- Auth (login/signup) and seller CRUD require MongoDB and will be no-ops in mock mode

## Full Setup (with MongoDB)
Use this if you want real authentication and persistence.

1) Start MongoDB (choose one)
```bash
# Docker
docker run -d --name mongo -p 27017:27017 mongo:6
# or use a MongoDB Atlas connection string
```

2) Create `.env.local`
```bash
MONGODB_URI=mongodb://localhost:27017/bihari_delicacies   # or your Atlas URI
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
```

3) Run
```bash
npm run dev
```

## Scripts
```bash
npm run dev     # start dev server
npm run build   # production build
npm start       # start production server after build
```

## What works in Mock Mode
- Home page, navigation, responsive UI
- Shop listing and Product detail (from mock products)
- Recipes list and Recipe detail (from mock recipes)
- Cart and Checkout (creates in-memory orders with unique IDs)

## What requires MongoDB
- Login/Signup (JWT-based)
- Seller Dashboard product CRUD
- Persistent orders, recipes, products, and users

## Deploy
- Vercel is recommended. For mock mode, only `JWT_SECRET` is required.
- For full mode, add `MONGODB_URI` and `JWT_SECRET` in project settings.