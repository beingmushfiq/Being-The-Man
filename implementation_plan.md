# Being The Man — Premium Platform Rebuild (Final Plan)

Complete rebuild from current React 19 + Vite + Supabase SPA into a premium mobile-first digital product ecosystem. Next.js 15 frontend on Vercel, Laravel 12 CMS on DigitalOcean, bKash payments, WhatsApp Business Cloud API automation, and full analytics stack.

**All decisions resolved. Ready for execution.**

---

## Decisions Summary

| Decision | Answer |
|----------|--------|
| Laravel hosting | **DigitalOcean Droplet** (Ubuntu 24.04 + Nginx + PHP 8.3-FPM) |
| Payment | **bKash** primary (credentials available). AamarPay + SurjoPay configurable from CMS |
| Email service | **Deferred** — placeholder SMTP config |
| Domain | **beingman.app** — DNS nameservers on DigitalOcean |
| Supabase migration | **Not needed** — no existing data |
| Development approach | Branch `v2-rebuild`, directory `v2/` (separate from current codebase) |
| Customer messaging | **WhatsApp Business Cloud API** via Meta Business account |
| 3D Book | **Procedurally built** in Three.js using book cover image texture |

---

## Proposed Changes

All new code lives in `v2/` directory on branch `v2-rebuild`.

```
d:\Being The Man — E-Commerce Book Store\
├── src/                  ← current codebase (untouched)
├── v2/
│   ├── frontend/         ← Next.js 15 (TypeScript + Tailwind)
│   └── backend/          ← Laravel 12 (PHP 8.3 + MySQL + Redis)
```

---

### Phase 1 — Next.js 15 Project Foundation

Scaffold the frontend with design system, typography, responsive tokens, and component library.

#### [NEW] `v2/frontend/` — Next.js 15 project

Initialize: `npx -y create-next-app@latest ./v2/frontend --typescript --tailwind --app --eslint --src-dir`

**Dependencies:**

| Category | Packages |
|----------|----------|
| Animation | `gsap`, `@gsap/react`, `split-type`, `framer-motion`, `lenis` |
| 3D | `three`, `@react-three/fiber`, `@react-three/drei` |
| UI | `shadcn/ui` (button, accordion, dialog, card, badge, input, sheet, separator) |
| Icons | `lucide-react` |
| Analytics | `@next/third-parties` (Google GTM integration) |

#### [NEW] `v2/frontend/tailwind.config.ts`

```
Colors:
  bg-deep:       #050816
  bg-mid:        #071022
  bg-surface:    #0B132B
  gold:          #D4AF37
  gold-light:    #E6C35C
  gold-pale:     #F0D97A
  text-primary:  #FFFFFF
  text-secondary:#F5F5F5
  text-muted:    #D0D4DA
  text-subtle:   #7B8494

Fonts:
  bengali:  ['Anek Bangla', 'Noto Sans Bengali', 'Hind Siliguri']
  sans:     ['Inter', 'Montserrat']
  accent:   ['Playfair Display']

Breakpoints:
  xs: 320px | sm: 375px | md-sm: 390px | md: 414px
  lg-sm: 640px | lg: 768px | xl: 1024px | 2xl: 1280px | 3xl: 1536px
```

#### [NEW] `v2/frontend/src/app/layout.tsx`

- `<html lang="bn">` with Bengali primary language
- Google Fonts via `next/font/google` (Anek Bangla, Inter, Playfair Display)
- Lenis smooth scroll provider (global)
- GTM container script in `<head>`
- Meta viewport with `viewport-fit=cover` for iOS safe areas
- Default Open Graph: title, description, image for beingman.app
- Favicon from existing `/public/favicon.svg`

#### [NEW] `v2/frontend/src/lib/design-tokens.ts`

Centralized constants: colors, spacing, animation easings, z-index scale.

#### [NEW] `v2/frontend/src/lib/hooks/useScrollReveal.ts`

Reusable GSAP ScrollTrigger hook for section entrance animations.

#### [NEW] `v2/frontend/src/lib/hooks/useReducedMotion.ts`

Detects `prefers-reduced-motion` and disables animations globally.

#### [NEW] `v2/frontend/src/components/ui/`

ShadCN components + custom premium wrappers:
- `PremiumCard` — glassmorphism card with gold hover border
- `GoldButton` — primary CTA with gradient + glow shadow
- `GhostButton` — secondary CTA with border
- `Badge` — pill badge with gold accent
- `SectionHeading` — animated heading with gradient text

---

### Phase 2 — Premium Landing Page (12-Section Psychological Funnel)

Rebuild all sections with GSAP + ScrollTrigger animations, procedural Three.js 3D book, and mobile-first responsive design. Content/copy preserved from current [LandingPage.jsx](file:///d:/Being%20The%20Man%20—%20E-Commerce%20Book%20Store/src/pages/LandingPage.jsx).

#### [NEW] `v2/frontend/src/app/page.tsx`

Landing page composition — imports and orchestrates all section components. Sets up a master GSAP timeline with ScrollTrigger pinning and scrub for premium scroll experience.

#### [NEW] `v2/frontend/src/components/landing/HeroSection.tsx`

**Mobile layout (priority):**
```
Logo
↓ Headline (GSAP character reveal via SplitType)
↓ Subheadline (fade + blur-in)
↓ Transformation visual (interactive swipe before→after)
↓ 3D Book (lazy loaded, fallback static)
↓ Benefit chips (3 pills: Sharp Look, Confident Presence, Better Style)
↓ CTA (scale entrance: "এখনই বইটি নিন")
↓ Trust badges row
```

**Desktop layout (enhancement):**
```
[Headline + Sub + CTA]  |  [3D Book + Transformation Image]
[Trust indicators row spanning full width]
```

**Animations:**
- Headline: SplitType character reveal with stagger (0.03s per char)
- Subheadline: `opacity: 0 → 1`, `filter: blur(8px) → blur(0)`
- CTA: `scale(0.8) → scale(1)` with elastic ease
- Book: 3D reveal from `rotateY(-90deg)` to resting angle
- Background: Gold particle field (canvas-based, 60fps)

#### [NEW] `v2/frontend/src/components/landing/Book3D.tsx`

**Procedural Three.js book** built with React Three Fiber:

- **Geometry**: `BoxGeometry` shaped as book (width: 2.8, height: 3.8, depth: 0.3)
- **Front cover**: Book cover image (`/logo-transparent.png`) mapped as texture on front face
  - Title text: "The Silent Language of Style" rendered on texture
  - Subtitle: "FIT • COLOR • PRESENCE"
  - Gold border edge effect
- **Spine**: Gold gradient material (`#D4AF37` → `#AA7C11`)
- **Back cover**: Dark matte material (`#040914`)
- **Pages**: Visible page edges via layered planes with off-white material
- **Lighting**: 3-point setup (key light warm, fill light cool, rim light gold)
- **Shadows**: Contact shadow beneath book on invisible plane
- **Interactions**:
  - Desktop: Mouse follow rotation (±15° X/Y), hover opens cover 30°
  - Mobile: Touch drag rotation, tap opens cover
  - Idle: Continuous slow Y-axis rotation (0.2 rad/s)
- **Gold glow**: `PointLight` with gold color orbiting book, creates moving highlight
- **Mobile optimization**:
  - Detect via `window.innerWidth < 768`
  - Reduce shadow map resolution (512 → 256)
  - Disable environment map
  - Use simpler material (MeshStandardMaterial → MeshLambertMaterial)
  - Wrap in `<Suspense>` with static PNG fallback
  - Lazy load entire canvas with Intersection Observer

#### [NEW] `v2/frontend/src/components/landing/TransformationVisual.tsx`

- **Desktop**: Side-by-side before→after with divider line (inspired by reference image)
- **Mobile**: Interactive swipe slider (drag handle to reveal before/after)
- Uses transformation reference image provided by user
- GSAP reveal: clip-path wipe animation on scroll

#### [NEW] `v2/frontend/src/components/landing/StickyMobileCTA.tsx`

```
┌─────────────────────────────────────────┐
│  ৳৪৯০  ̶৳̶১̶,̶০̶০̶০̶   [  এখনই নিন  →  ]  │
└─────────────────────────────────────────┘
```
- Fixed `bottom: 0` with `padding-bottom: env(safe-area-inset-bottom)`
- `backdrop-filter: blur(20px)` glassmorphism background
- Hides when checkout modal opens or when user is in hero section
- Only renders on `< 768px`
- Z-index: 50

#### [NEW] Section Components — `v2/frontend/src/components/landing/`

| File | Section | Animation | Mobile Behavior |
|------|---------|-----------|-----------------|
| `ProblemSection.tsx` | §2 – সমস্যা আপনার wardrobe না | Cards stagger-reveal from bottom, number counter animation | Single column stack |
| `PainSection.tsx` | §3 – ভুল পোশাক শুধু look নষ্ট করে না | Stat cards count-up, scroll-driven storytelling parallax | Full-width cards, vertical layout |
| `TransformationSection.tsx` | §4 – এই গাইডটি আপনাকে শিখাবে | Timeline path draws on scroll, checkmarks pop in | Vertical timeline |
| `BenefitsSection.tsx` | §5 – Apple Bento Grid | Cards fade-in with stagger, hover lift + gold border | 1-column card stack |
| `AudienceSection.tsx` | §6 – এই বইটি যাদের জন্য | Glassmorphism cards with gold shimmer on hover/touch | 1-column, touch-friendly |
| `InsideSection.tsx` | §7 – বইয়ের ভিতরে কী আছে | Animated book page flip on click/tap, feature→result mapping | Accordion-style chapters |
| `ValueSection.tsx` | §8 – 4 Value Pillars | Icon cards scale-in, connecting lines draw | 2×2 grid → 1-column |
| `OfferSection.tsx` | §9 – আজই নিলে আপনি যা পাবেন | Items reveal one-by-one with checkmark animation | Full-width list |
| `UrgencySection.tsx` | §10 – কেন এখনই শুরু করা উচিত | Countdown timer (if active), pulsing urgency banner | Centered stack |
| `PricingSection.tsx` | §11 – Pricing block | Price counter animation, CTA pulse glow | Full-width card |
| `FAQSection.tsx` | §12 – FAQ Accordion | Smooth expand/collapse (Framer Motion `AnimatePresence`) | 48px min tap targets, full-width |
| `FinalCTASection.tsx` | Closing CTA | Gold spotlight radial gradient, floating 3D book, parallax | Emotional copy + multiple CTA variants |
| `TestimonialsSection.tsx` | Social Proof | Cards slide-in from sides, star rating animation | Horizontal swipe carousel on mobile |
| `TrustBadges.tsx` | Trust indicators | Fade-in with stagger | Horizontal scroll row |

---

### Phase 3 — Laravel 12 CMS Backend

Enterprise-grade CMS with Filament 3 admin panel. Admin controls every section of the site.

#### [NEW] `v2/backend/` — Laravel 12 project

```bash
composer create-project laravel/laravel v2/backend
```

- PHP 8.3, MySQL 8, Redis 7
- Laravel Queue + Horizon for background jobs (WhatsApp sends, webhook processing)
- API-only mode — serves Next.js frontend via JSON REST API
- CORS configured: `beingman.app`, `localhost:3000`
- Auth: Laravel Sanctum (API tokens for admin)
- Admin UI: **Filament 3** (full CRUD, dashboard widgets, charts)

#### [NEW] Database Schema (Migrations)

| Table | Key Columns | Purpose |
|-------|-------------|---------|
| `landing_pages` | title, slug, status (draft/published), sections JSON | Page management |
| `hero_sections` | headline_bn, subheadline_bn, cta_text, mobile_image, desktop_image, page_id | Hero per page |
| `testimonials` | name, role, text_bn, rating (1-5), photo, display_order, is_active | Social proof |
| `faqs` | question_bn, answer_bn, display_order, is_active | FAQ accordion |
| `offers` | title, description_bn, icon, is_visible, display_order | Offer stack items |
| `bonuses` | title, description_bn, value_display, is_visible | Bonus items |
| `media` | filename, path, mime_type, size_bytes, alt_text, disk | Media library |
| `posts` | title, slug, body_md, excerpt, featured_image, category_id, status, published_at | Blog |
| `categories` | name, slug | Blog categories |
| `tags` | name, slug | Blog tags (pivot: `post_tag`) |
| `seo_meta` | page_type, page_id, title, description, og_image, canonical, schema_json | Per-page SEO |
| `orders` | customer_id, amount_bdt, payment_provider, payment_status, transaction_id, download_count | Orders |
| `customers` | name, phone, email, lead_source, utm_source, utm_medium, utm_campaign, device, total_spent | CRM |
| `wa_message_logs` | customer_id, template_name, status (sent/delivered/read/failed), sent_at | WhatsApp logs |
| `wa_templates` | name, body_template, variables JSON, meta_status (approved/pending) | Template registry |
| `wa_campaigns` | name, template_id, audience_filter JSON, scheduled_at, status | Broadcast campaigns |
| `experiments` | name, page_id, status (running/paused/completed), winner_variant_id | A/B tests |
| `experiment_variants` | experiment_id, name, config JSON, visitors, conversions | A/B variants |
| `app_settings` | key, value (encrypted for secrets), group | Global config |
| `audit_logs` | user_id, action, model_type, model_id, changes JSON, ip | Admin audit trail |
| `download_tokens` | order_id, token (UUID), expires_at, used_at | Signed download links |

#### [NEW] App Settings (managed via Filament)

| Group | Keys |
|-------|------|
| **Payment – bKash** | `bkash_app_key`, `bkash_app_secret`, `bkash_username`, `bkash_password`, `bkash_sandbox` (bool) |
| **Payment – AamarPay** | `aamarpay_store_id`, `aamarpay_signature_key`, `aamarpay_sandbox` (bool) |
| **Payment – SurjoPay** | `surjopay_merchant_id`, `surjopay_secret_key`, `surjopay_sandbox` (bool) |
| **Payment – General** | `active_payment_provider` (enum: bkash/aamarpay/surjopay) |
| **WhatsApp** | `wa_phone_number_id`, `wa_business_account_id`, `wa_access_token`, `wa_webhook_verify_token` |
| **Product** | `product_title`, `regular_price_bdt`, `launch_price_bdt`, `is_launch_offer` (bool) |
| **Site** | `site_name`, `whatsapp_support_number`, `facebook_url`, `instagram_url` |
| **Downloads** | `download_file_path`, `download_link_expiry_hours` |

#### [NEW] Filament 3 Admin Panel (`/admin`)

**Dashboard Widgets:**
- Revenue KPI card (today / this week / this month / all time)
- Orders KPI card (total, pending, completed, refunded)
- Conversion rate (visitors → purchases)
- Recent orders table
- WhatsApp message delivery stats

**Resources (full CRUD):**
- Landing Pages, Hero Sections, Testimonials, FAQs, Offers, Bonuses
- Media Library (upload, crop, delete)
- Blog Posts, Categories, Tags
- SEO Meta (per-page)
- Orders (with status workflow buttons: mark paid → mark delivered → refund)
- Customers (profile view with purchase history + WhatsApp message log)
- WhatsApp Templates, Campaigns
- A/B Experiments
- App Settings (grouped form)
- Audit Logs (read-only)

#### [NEW] Page Builder (Phase 3 stretch goal)

- Drag-and-drop via Filament's built-in Builder field
- Reusable block types: Hero, Benefits, FAQ, Offer, Countdown, Video, Testimonials, CTA, Pricing
- Each block has configurable fields (text, images, colors, CTA links)
- Rendered by Next.js frontend dynamically via API

---

### Phase 4 — Payment System & Automated Delivery

#### [NEW] `v2/backend/app/Contracts/PaymentProviderInterface.php`

```php
interface PaymentProviderInterface {
    public function createPayment(Order $order): PaymentResponse;
    public function executePayment(string $paymentId): PaymentExecution;
    public function queryPayment(string $paymentId): PaymentStatus;
    public function refundPayment(string $transactionId, float $amount): RefundResponse;
}
```

#### [NEW] `v2/backend/app/Services/Payment/BkashProvider.php`

- Tokenized checkout flow (Grant Token → Create → Execute → Query)
- Sandbox/production toggle from `app_settings`
- IPN webhook endpoint: `POST /api/webhooks/bkash`
- Handles: `Completed`, `Failed`, `Cancelled` statuses

#### [NEW] `v2/backend/app/Services/Payment/AamarPayProvider.php`

- Implements `PaymentProviderInterface`
- All config fields stored in `app_settings` (ready for when credentials obtained)
- Stubbed with clear TODO markers

#### [NEW] `v2/backend/app/Services/Payment/SurjoPayProvider.php`

- Same pattern as AamarPay — interface-compliant stub

#### [NEW] `v2/backend/app/Services/Payment/PaymentManager.php`

- Factory that reads `active_payment_provider` from `app_settings`
- Returns the correct provider instance
- Admin can switch providers from CMS without any code change

#### [NEW] Automated Delivery Pipeline

```
bKash IPN Webhook received
  → Verify payment signature
  → Order.payment_status = "paid"
  → Generate download token (UUID, expires in 72 hours)
  → Build signed download URL: beingman.app/download/{token}
  → Queue WhatsApp message job:
      Template: order_confirmation
      Variables: { name, download_link }
  → Fire analytics event: purchase_complete
  → Update customer record: total_spent, last_purchase_at
```

#### [NEW] `v2/frontend/src/app/checkout/page.tsx`

- Single-page checkout form
- Fields: Name, Phone (WhatsApp number), Email (optional)
- Payment method display (shows only the active provider from API)
- bKash: redirect to bKash payment page → callback → success page
- Real-time validation (phone format: `01XXXXXXXXX`)
- Loading states, error handling, retry logic

#### [NEW] `v2/frontend/src/app/success/page.tsx`

- Post-purchase page with download button
- Confetti animation (GSAP)
- "আপনার গাইড রেডি!" headline
- Download button (hits signed URL)
- WhatsApp support link
- Social sharing prompt

#### [NEW] `v2/frontend/src/app/download/[token]/route.ts`

- API route that validates token, checks expiry, increments download count
- Streams file or redirects to signed storage URL
- Returns 404/410 for invalid/expired tokens

---

### Phase 5 — Analytics Architecture

#### [NEW] `v2/frontend/src/lib/analytics/gtm.ts`

- Google Tag Manager container initialization
- DataLayer push helper function
- Consent-aware (respects cookie preferences)

#### [NEW] `v2/frontend/src/lib/analytics/events.ts`

All custom events pushed to GTM DataLayer:

```typescript
type TrackingEvent =
  | 'hero_cta_click'
  | 'sticky_cta_click'
  | 'preview_open'
  | 'scroll_25' | 'scroll_50' | 'scroll_75'
  | 'faq_open'
  | 'checkout_start'
  | 'payment_initiated'
  | 'payment_success'
  | 'purchase_complete'
  | 'guide_downloaded'
  | 'lead_captured'
  | 'whatsapp_cta_click'
  | 'transformation_swipe'
  | 'book_3d_interact'
```

#### [NEW] `v2/frontend/src/lib/analytics/meta-pixel.ts`

Client-side Meta Pixel with standard events:
- `PageView`, `ViewContent`, `Lead`, `InitiateCheckout`, `Purchase`
- Each event includes `event_id` for server-side deduplication

#### [NEW] `v2/backend/app/Services/MetaConversionApiService.php`

- Server-side Meta CAPI via Facebook Marketing API
- Fires on: Lead, InitiateCheckout, Purchase
- Hashes customer data (phone, email) per Meta spec
- Deduplicates with client-side pixel via shared `event_id`
- Enhanced conversions with `fbc` and `fbp` cookies

#### [NEW] Analytics integrations configured via GTM:

| Platform | Method | Purpose |
|----------|--------|---------|
| **GA4** | GTM tag | Page views, events, conversions, scroll depth |
| **Meta Pixel** | GTM tag + inline | ViewContent, Lead, InitiateCheckout, Purchase |
| **Meta CAPI** | Laravel server-side | Deduped server events for iOS 14.5+ accuracy |
| **Microsoft Clarity** | GTM tag | Heatmaps, session recordings, rage clicks |
| **Google Search Console** | DNS TXT record | SEO performance, indexing |
| **Bing Webmaster** | Meta tag | Bing SEO tracking |

#### [NEW] Customer Data Platform (Laravel)

- Every visitor tracked with: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `referrer`, `device`, `browser`
- Conversion path: first touch → all touchpoints → purchase
- Attribution dashboard widget in Filament admin
- Export to CSV for offline analysis

---

### Phase 6 — Lead Generation & WhatsApp Business Automation

#### [NEW] Lead Magnet System

- **Offer**: Free Style Audit Checklist (PDF)
- **Triggers**: Scroll past 50% of landing page, exit intent (desktop), 30-second timer (mobile)
- **Modal**: Glassmorphism popup with gold accent
- **Fields**: Name (required), Phone/WhatsApp (required), Email (optional)
- **On submit**:
  1. Store in `customers` table with `lead_source = 'style_checklist'`
  2. Queue WhatsApp message: `lead_welcome` template with checklist download link
  3. Fire analytics events: `lead_captured` (GTM + Meta Pixel + CAPI)

#### [NEW] `v2/backend/app/Services/WhatsAppBusinessService.php`

```php
class WhatsAppBusinessService
{
    // Send template message (pre-approved by Meta)
    public function sendTemplate(string $phone, string $templateName, array $variables): MessageResponse;

    // Send session message (within 24hr window after user message)
    public function sendText(string $phone, string $body): MessageResponse;

    // Send media message (PDF, image)
    public function sendDocument(string $phone, string $mediaUrl, string $caption): MessageResponse;

    // Process incoming webhook (delivery receipts, user replies)
    public function handleWebhook(array $payload): void;
}
```

- Uses **Meta WhatsApp Business Cloud API** (`graph.facebook.com/v21.0/`)
- Auth via long-lived access token stored encrypted in `app_settings`
- Webhook endpoint: `POST /api/webhooks/whatsapp`
- All messages logged in `wa_message_logs` table

#### [NEW] `v2/backend/app/Jobs/WhatsApp/` — Queued message jobs

| Job | Trigger | Delay | Template |
|-----|---------|-------|----------|
| `SendLeadWelcome` | Lead form submit | Immediate | `lead_welcome` |
| `SendLeadNurture1` | Lead captured | +24 hours | `style_tip` (tip #1) |
| `SendLeadNurture2` | Lead captured | +72 hours | `style_tip` (tip #2) |
| `SendLeadNurture3` | Lead captured | +120 hours | `style_tip` (tip #3 + product CTA) |
| `SendAbandonedCheckout` | Checkout started, no purchase | +1 hour | `abandoned_checkout` |
| `SendAbandonedReminder` | Still no purchase | +24 hours | `abandoned_checkout` (variant 2) |
| `SendOrderConfirmation` | Payment success | Immediate | `order_confirmation` |
| `SendOnboarding1` | Purchase complete | +24 hours | `style_tip` (how to start) |
| `SendOnboarding2` | Purchase complete | +72 hours | `style_tip` (key chapters) |
| `SendFeedbackRequest` | Purchase complete | +168 hours (7 days) | `feedback_request` |
| `SendUpsell` | Purchase complete | +336 hours (14 days) | Custom session message |
| `SendReengagement` | Last activity >30 days | Batch scheduled | `style_tip` (win-back) |

#### [NEW] WhatsApp Message Templates (to register in Meta Business Manager)

| Template Name | Language | Body |
|---------------|----------|------|
| `lead_welcome` | bn | আসসালামু আলাইকুম {{1}}! 🎯 আপনার Style Audit Checklist রেডি। ডাউনলোড করুন: {{2}} |
| `order_confirmation` | bn | ধন্যবাদ {{1}}! 📘 আপনার "The Silent Language of Style" গাইড রেডি। ডাউনলোড করুন: {{2}} |
| `abandoned_checkout` | bn | {{1}}, আপনার গাইডটি এখনও অপেক্ষা করছে! 🔥 এখনই নিন: {{2}} |
| `style_tip` | bn | 💡 আজকের Style Tip: {{1}} |
| `feedback_request` | bn | {{1}}, গাইডটি কেমন লাগলো? আপনার মতামত জানান 🙏 রিভিউ দিন: {{2}} |

#### [NEW] CMS WhatsApp Management (Filament)

- View all sent messages with delivery status (sent → delivered → read)
- Create broadcast campaigns targeting customer segments
- Template management with Meta approval status tracking
- Automation flow toggle (enable/disable each flow independently)

---

### Phase 7 — Blog, SEO & Content System

#### [NEW] Frontend Pages — `v2/frontend/src/app/`

| Route | File | Content Source |
|-------|------|---------------|
| `/` | `page.tsx` | Landing page (12-section funnel) |
| `/guide` | `guide/page.tsx` | Product detail (rich schema, OG) |
| `/blog` | `blog/page.tsx` | Blog index with categories, pagination |
| `/blog/[slug]` | `blog/[slug]/page.tsx` | Blog post (SSG via `generateStaticParams`) |
| `/about` | `about/page.tsx` | Brand story, mission |
| `/contact` | `contact/page.tsx` | Contact form + WhatsApp support link |
| `/privacy` | `privacy/page.tsx` | Privacy policy (CMS-managed) |
| `/terms` | `terms/page.tsx` | Terms of service (CMS-managed) |
| `/refund-policy` | `refund-policy/page.tsx` | Refund policy (CMS-managed) |
| `/checkout` | `checkout/page.tsx` | Payment flow |
| `/success` | `success/page.tsx` | Post-purchase download |

#### [NEW] SEO Infrastructure

| Feature | Implementation |
|---------|---------------|
| Sitemap | `v2/frontend/src/app/sitemap.ts` — dynamic, includes blog posts |
| Robots | `v2/frontend/src/app/robots.ts` — allow all, reference sitemap |
| Open Graph | `generateMetadata()` on every page with title, description, image |
| Twitter Cards | `summary_large_image` on all pages |
| Canonicals | `beingman.app` base URL on all pages |
| Hreflang | `<link rel="alternate" hreflang="bn" />` |
| Product schema | JSON-LD on `/` and `/guide` |
| FAQ schema | JSON-LD on `/` (from FAQ section data) |
| Organization schema | JSON-LD site-wide in layout |
| Review schema | JSON-LD from testimonials data |
| BreadcrumbList | JSON-LD on all pages |
| BlogPosting schema | JSON-LD on `/blog/[slug]` |

#### [NEW] Blog Content System

- Managed via Filament CMS (posts, categories, tags)
- Markdown editor with image upload to DigitalOcean Spaces
- Categories: Men's Style, Color Theory, Body Types, Professional Dressing, First Impressions, Confidence, Presence
- Next.js fetches posts via Laravel API, renders with ISR (revalidate: 3600s)
- Target: 100+ SEO-optimized articles over time

---

### Phase 8 — Performance, Security, Accessibility & Deployment

#### Performance Targets & Implementation

| Metric | Target | How |
|--------|--------|-----|
| Lighthouse Performance | 95+ | Code splitting, lazy loading, image optimization |
| Lighthouse Accessibility | 100 | Semantic HTML, ARIA, contrast ratios |
| Lighthouse Best Practices | 100 | HTTPS, no mixed content, secure headers |
| Lighthouse SEO | 100 | Meta tags, sitemap, robots, schema |
| LCP | < 2s | Preload hero image, optimize font loading |
| CLS | < 0.05 | Explicit dimensions on images, font `size-adjust` |
| INP | < 150ms | Debounce handlers, minimal main thread work |
| Initial payload | < 250KB | Tree-shaking, dynamic imports, font subsetting |

**Specific optimizations:**
- `next/image` with WebP/AVIF auto-format
- Three.js canvas lazy loaded via Intersection Observer (not in initial bundle)
- GSAP + ScrollTrigger code-split per section component
- Bengali font subset (only used Unicode ranges)
- API responses cached at edge via Vercel ISR + stale-while-revalidate

#### Security

| Measure | Implementation |
|---------|---------------|
| CSRF | Laravel built-in CSRF tokens for all forms |
| Rate limiting | `ThrottleRequests` middleware: 60/min API, 10/min auth, 5/min payment |
| WAF | Cloudflare (free plan) on beingman.app — block common attacks |
| Download security | Time-limited UUID tokens (72hr expiry, single-use optional) |
| Payment secrets | `.env` file only, never stored in DB plaintext, encrypted at rest |
| Audit logs | Every admin action logged: who, what, when, IP, before/after |
| RBAC | Filament Shield: Admin (full), Editor (content only), Viewer (read-only) |
| Headers | `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options` |

#### Accessibility (WCAG 2.2 AA)

| Requirement | Implementation |
|-------------|---------------|
| Keyboard nav | All interactive elements focusable, logical tab order, skip-to-content link |
| Screen readers | ARIA labels on icons/buttons, `role` attributes, semantic `<section>`/`<nav>`/`<main>` |
| Color contrast | Gold `#D4AF37` on `#050816` = 7.2:1 ✅, all text meets 4.5:1 minimum |
| Reduced motion | `prefers-reduced-motion` disables GSAP/Framer/Three.js animations, shows static states |
| Tap targets | 48×48px minimum on all mobile interactive elements |
| Focus indicators | Visible gold outline ring on all focusable elements |
| Form labels | All form inputs have associated `<label>` elements |
| Alt text | All images have descriptive alt text, decorative images use `alt=""` |

#### Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    beingman.app                          │
│                                                         │
│  ┌──────────────┐              ┌──────────────────────┐ │
│  │   Vercel      │              │  DigitalOcean Droplet│ │
│  │   (Frontend)  │   REST API   │  (Backend)           │ │
│  │              ─┼──────────────┼─►                    │ │
│  │  Next.js 15   │              │  Laravel 12          │ │
│  │  beingman.app │              │  api.beingman.app    │ │
│  └──────────────┘              │                      │ │
│                                │  Nginx + PHP-FPM     │ │
│                                │  MySQL 8             │ │
│                                │  Redis 7             │ │
│                                │  Horizon (queues)    │ │
│                                │  Let's Encrypt SSL   │ │
│                                └──────────────────────┘ │
│                                                         │
│  DNS (DigitalOcean):                                    │
│    beingman.app      → Vercel CNAME                     │
│    api.beingman.app  → Droplet A record                 │
│    Search Console    → TXT record                       │
└─────────────────────────────────────────────────────────┘
```

**Frontend deploy**: Push to `v2-rebuild` branch → Vercel auto-deploys → preview URL → merge to `main` → production at beingman.app

**Backend deploy**: SSH to Droplet → `git pull` → `composer install` → `php artisan migrate` → `php artisan horizon:terminate` → restart queue

---

## Verification Plan

### Automated Tests

```bash
# Frontend (v2/frontend/)
npm run lint                     # Zero lint errors
npm run build                    # Zero build errors, check bundle size < 250KB
npx playwright test              # E2E: all 12 sections render, checkout flow, mobile viewport

# Backend (v2/backend/)
php artisan test                 # Feature tests: payment flow, order creation, WhatsApp send, API auth
php artisan migrate:fresh --seed # Clean DB with seed data (test testimonials, FAQs, products)
```

### Manual Verification

| Check | Devices |
|-------|---------|
| No horizontal scrolling | All breakpoints 320px → 1536px |
| Touch interactions work | iPhone SE, iPhone 15 Pro Max, Samsung A54, Xiaomi Redmi |
| 3D book renders + interacts | Chrome mobile, Safari iOS, Chrome desktop |
| bKash sandbox payment | Complete purchase → WhatsApp confirmation + download link |
| WhatsApp automation | All 7 flows trigger on schedule (test with sandbox phone) |
| GSAP reduced motion | Enable `prefers-reduced-motion`, verify all animations disabled |
| Screen reader | NVDA (Windows), VoiceOver (iOS) — full page walkthrough |
| Lighthouse audit | Production build: Performance ≥95, A11y = 100, BP = 100, SEO = 100 |
| Sticky CTA on iOS Safari | Verify safe area padding, no overlap with home indicator |
| Admin CMS | CRUD all modules, verify frontend reflects changes |

---

## Execution Order

| Step | Phase | Deliverable | Depends On |
|------|-------|-------------|------------|
| 1 | **Phase 1** | Next.js scaffold + design system + components | Nothing |
| 2 | **Phase 2** | 12-section premium landing page with animations + 3D book | Phase 1 |
| 3 | **Phase 3** | Laravel CMS + Filament admin + all migrations | Nothing (parallel with 1+2) |
| 4 | **Phase 4** | bKash payment + checkout + automated delivery | Phases 2 + 3 |
| 5 | **Phase 5** | Analytics (GA4, GTM, Meta Pixel, CAPI, Clarity) | Phase 2 |
| 6 | **Phase 6** | WhatsApp Business automation + lead generation | Phases 3 + 4 |
| 7 | **Phase 7** | Blog + SEO + content infrastructure | Phases 2 + 3 |
| 8 | **Phase 8** | Performance + security + a11y + DigitalOcean deploy | All phases |

> [!TIP]
> **Phases 1+2 can ship independently** — a dramatically better landing page deployed to Vercel while the Laravel backend is built in parallel on the Droplet.
