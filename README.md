<div align="center">

# 🎩 Being The Man — E-Commerce Book Store

### *The Silent Language of Style*

**A premium, full-stack landing page and e-commerce CMS for selling digital books.**  
Built with React, Vite, and Supabase. Designed for the Bangladeshi market with BDT payments, WhatsApp ordering, and a full admin dashboard.

---

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/beingmushfiq/Being-The-Man&env=VITE_SUPABASE_URL,VITE_SUPABASE_ANON_KEY&envDescription=Supabase%20project%20credentials&envLink=https://supabase.com/dashboard)

---

</div>

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Quick Start (Local)](#-quick-start-local)
- [Supabase Setup](#-supabase-setup)
- [Deploy to Vercel](#-deploy-to-vercel)
- [Environment Variables](#-environment-variables)
- [Admin Dashboard](#-admin-dashboard)
- [Project Structure](#-project-structure)
- [Customization Guide](#-customization-guide)

---

## 🌟 Overview

**Being The Man** is a high-converting, premium e-commerce landing page built to sell the digital book *"The Silent Language of Style"* — a men's confidence and style guide targeting the Bangladeshi market.

The site features a **12-section psychological sales funnel** (Hook → Pain → Agitation → Transformation → Offer → CTA), a **multi-channel checkout system** (bKash, Nagad, SSLCommerz, WhatsApp, Gumroad), and a **full admin CMS dashboard** for managing products, orders, and customers.

---

## ✨ Features

### 🛍️ Sales Landing Page
- 12-section psychology-driven sales funnel in Bengali & English
- CSS 3D interactive book cover mockup
- Before/After style transformation visualizer
- Social proof testimonials with star ratings
- Interactive FAQ accordion
- Smooth micro-animations and premium dark navy + gold aesthetic

### 💳 Multi-Channel Checkout
| Option | Description |
|--------|-------------|
| **bKash** | Local mobile banking (BDT) |
| **Nagad** | Local mobile banking (BDT) |
| **SSLCommerz** | Cards & Net Banking (BDT) |
| **WhatsApp** | Pre-filled order message sent to WhatsApp |
| **Gumroad** | Redirect to external Gumroad checkout |

### 🏛️ Admin Dashboard (`/admin`)
- **Sales Overview** — Revenue KPIs, order counts, SVG bar charts
- **Order History** — Searchable, filterable orders with status management
- **Customer Database** — Customer profiles with lifetime value (LTV)
- **CMS Settings** — Edit product pricing, toggle launch offers, update WhatsApp number and Gumroad URL

### 🔧 Technical Highlights
- **Offline-first** — LocalStorage fallback when Supabase is unavailable
- **SEO-ready** — Full meta tags, Open Graph, Twitter Cards, Bengali language support
- **Responsive** — Mobile-first layout across all screen sizes
- **Secure** — Supabase Auth for admin login with session-based protection

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite 8 |
| **Routing** | React Router DOM v7 |
| **Styling** | Vanilla CSS (custom design system) |
| **Icons** | Lucide React |
| **Fonts** | Hind Siliguri, Montserrat, Playfair Display (Google Fonts) |
| **Backend / DB** | Supabase (PostgreSQL + Auth + Storage) |
| **Hosting** | Vercel (frontend) + Supabase (backend) |

---

## 🚀 Quick Start (Local)

### Prerequisites
- Node.js v18+ installed
- A Supabase account (free tier is sufficient)

### 1. Clone the repository
```bash
git clone https://github.com/beingmushfiq/Being-The-Man.git
cd Being-The-Man
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env
```
Then edit `.env` with your Supabase credentials (see [Environment Variables](#-environment-variables)).

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

> **Without Supabase credentials:** The app runs fully in offline/demo mode using LocalStorage. Use the demo admin login: `admin@beingtheman.com` / `admin123`

---

## 🗄️ Supabase Setup

### Step 1 — Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Fill in project name, database password, and choose a region close to Bangladesh (e.g., Singapore)
4. Wait ~2 minutes for the project to be provisioned

### Step 2 — Run the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Copy and paste the entire contents of [`supabase/schema.sql`](./supabase/schema.sql)
4. Click **"Run"** (▶)

This will create:
- `products` table — Book title, BDT pricing, launch offer toggle
- `orders` table — Customer info, payment status, gateway transaction IDs
- `app_settings` table — WhatsApp number, Gumroad URL, checkout config

### Step 3 — Get Your API Credentials

1. In Supabase dashboard, go to **Settings → API**
2. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon / public key** → `VITE_SUPABASE_ANON_KEY`

### Step 4 — Create an Admin User

1. In Supabase dashboard, go to **Authentication → Users**
2. Click **"Add User"**
3. Enter your admin email and a strong password
4. This user can now log in at `/admin/login`

### Step 5 — Configure Row Level Security (Recommended)

In **SQL Editor**, run these policies to protect your data:

```sql
-- Allow public to insert orders (for checkout)
CREATE POLICY "Allow public inserts on orders"
ON orders FOR INSERT TO anon WITH CHECK (true);

-- Allow only authenticated admins to read all orders
CREATE POLICY "Allow authenticated to read orders"
ON orders FOR SELECT TO authenticated USING (true);

-- Allow only authenticated admins to read products
CREATE POLICY "Allow public to read products"
ON products FOR SELECT TO anon USING (true);
```

---

## 🚢 Deploy to Vercel

### Option A — One-Click Deploy

Click the button below and fill in your Supabase credentials when prompted:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/beingmushfiq/Being-The-Man&env=VITE_SUPABASE_URL,VITE_SUPABASE_ANON_KEY&envDescription=Supabase%20project%20credentials)

### Option B — Manual Deploy via Vercel CLI

#### 1. Push your code to GitHub
```bash
git init
git add .
git commit -m "Initial commit - Being The Man store"
git remote add origin https://github.com/beingmushfiq/Being-The-Man.git
git push -u origin main
```

#### 2. Install Vercel CLI
```bash
npm install -g vercel
```

#### 3. Deploy
```bash
vercel
```

Follow the interactive prompts. When asked about environment variables, add:
- `VITE_SUPABASE_URL` → Your Supabase Project URL
- `VITE_SUPABASE_ANON_KEY` → Your Supabase anon key

#### 4. Set Environment Variables in Vercel Dashboard
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click your project → **Settings → Environment Variables**
3. Add both variables for **Production**, **Preview**, and **Development** environments
4. Click **Redeploy** to apply changes

### Option C — Deploy via Vercel Dashboard (GitHub Import)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Under **Environment Variables**, add:

   | Name | Value |
   |------|-------|
   | `VITE_SUPABASE_URL` | `https://xxxx.supabase.co` |
   | `VITE_SUPABASE_ANON_KEY` | `eyJh...` |

4. Click **Deploy** ✅

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key-here
```

> **Important:** Variables must be prefixed with `VITE_` to be accessible in the React frontend via `import.meta.env`.

Create a `.env.example` file for reference (safe to commit):
```env
VITE_SUPABASE_URL=https://placeholder-project.supabase.co
VITE_SUPABASE_ANON_KEY=placeholder-anon-key
```

---

## 🏛️ Admin Dashboard

Access the admin dashboard at `/admin/login`.

| Feature | Path | Description |
|---------|------|-------------|
| Login | `/admin/login` | Secure Supabase Auth login |
| Dashboard | `/admin` | Sales overview and KPIs |
| Orders | `/admin` → Orders tab | Full order history with status control |
| Customers | `/admin` → Customer tab | Customer database with LTV |
| CMS | `/admin` → CMS tab | Edit pricing, toggle offers, configure checkout |

**Demo credentials (offline mode only):**
```
Email:    admin@beingtheman.com
Password: admin123
```
> These only work when Supabase credentials are not configured. Always create a real Supabase user for production.

---

## 📁 Project Structure

```
being-the-man/
├── public/
│   ├── logo.jpg                  # Brand logo (also used as favicon)
│   └── logo-transparent.png      # Transparent logo for dark backgrounds
├── src/
│   ├── components/
│   │   └── CheckoutModal.jsx     # Multi-channel checkout modal
│   ├── pages/
│   │   ├── LandingPage.jsx       # 12-section sales funnel page
│   │   ├── Login.jsx             # Admin login page
│   │   └── AdminDashboard.jsx    # CMS + Reports + Orders + Customers
│   ├── supabaseClient.js         # Supabase client initialization
│   ├── index.css                 # Premium design system (CSS variables)
│   ├── App.jsx                   # Route configuration
│   └── main.jsx                  # React entry point
├── supabase/
│   └── schema.sql                # PostgreSQL schema (run in Supabase SQL Editor)
├── index.html                    # HTML entry point with SEO meta tags
├── vite.config.js                # Vite build configuration
└── package.json
```

---

## 🎨 Customization Guide

### Change Pricing
**Via CMS (recommended):** Log into `/admin` → CMS Settings → update BDT prices.

**Via code:** Edit `src/pages/LandingPage.jsx` — find the `product` state default values:
```js
const [product, setProduct] = useState({
  regular_price_bdt: 1000,   // ← Regular price in BDT
  launch_price_bdt: 490,     // ← Launch offer price in BDT
  is_launch_offer: true      // ← Toggle launch offer badge
});
```

### Change WhatsApp Number
**Via CMS:** Log into `/admin` → CMS Settings → WhatsApp number field.

**Via code:** Search for `8801700000000` in `CheckoutModal.jsx` and replace.

### Change Gumroad Link
**Via CMS:** Log into `/admin` → CMS Settings → Gumroad URL field.

### Change Brand Colors
Edit CSS variables in `src/index.css`:
```css
:root {
  --color-bg-deep: #050A18;      /* Main background */
  --color-primary: #D4AF37;      /* Gold accent */
  --color-primary-light: #F3E5AB;/* Light gold */
  --color-text-white: #F8F9FA;   /* Primary text */
}
```

### Change Fonts
Edit the Google Fonts import at the top of `src/index.css` and update the CSS variables:
```css
--font-bengali: 'Hind Siliguri', 'Anek Bangla', sans-serif;
--font-english: 'Montserrat', sans-serif;
--font-accent:  'Playfair Display', serif;
```

---

## 📄 License

This project is proprietary software owned by **Being The Man**.  
All rights reserved. Unauthorized copying, distribution, or modification is prohibited.

---

<div align="center">

**Built with ❤️ for Being The Man**

[Facebook](https://www.facebook.com/beingtheman) • [Instagram](https://www.instagram.com/beeingman/) • [Gumroad](https://beingman.gumroad.com/l/stylelanguage)

</div>
