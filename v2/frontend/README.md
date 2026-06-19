# 💻 Storefront Client — Next.js 15

<div align="center">
  <h3><b>Being The Man — Frontend Storefront</b></h3>
  <p><i>The premium client application and psychological checkout funnel for the style book guide.</i></p>

  <p align="center">
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" /></a>
    <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" /></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" /></a>
  </p>
</div>

---

## 🌟 Overview

The frontend layer is a **Next.js 15 App Router** application configured with:
* **Vanilla Tailwind CSS v4** styling system for highly custom premium visual design.
* A client-side **3D Book Cover Simulator** rendering the physical presence of the digital style guide.
* A dynamic multi-channel **Checkout Sheet** accepting payments through tokenized local portals (bKash, SSLCommerz, Nagad, etc.).
* Live pricing and configuration hydration from the Laravel settings endpoint.

---

## 🛠️ Key Files & Components

* **`src/app/page.tsx`:** Main high-converting landing page containing the 12 psychological funnel sections (Problem, Pain, Transformation, Social Proof, pricing).
* **`src/app/Book3D.tsx`:** Custom interactive 3D CSS rendering of the book model.
* **`src/components/CheckoutModal.tsx`:** Localized mobile payment validation flow capturing WhatsApp numbers, payment gates, and user configurations.
* **`src/app/api/checkout/bkash/route.ts`:** Route handler initializing the tokenized payment with the bKash payment gateway SDK.

---

## 🚀 Running Locally

### 1. Installation
Install dependencies:
```bash
npm install
```

### 2. Configure Environment
Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Dev Server
```bash
npm run dev
```
Open `http://localhost:3000` to view.

---

## 🚢 Production Build

Generate optimized static production builds:
```bash
npm run build
npm run start
```
This application compiles to a fully optimized Node deployment ready for Vercel, Netlify, or custom VPS.
