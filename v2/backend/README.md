# ⚙️ Laravel 13 Core & Filament v5 CMS Backend

<div align="center">
  <h3><b>Being The Man — Backend CMS</b></h3>
  <p><i>The admin panel, database schemas, and gateway APIs powering the publishing checkout ecosystem.</i></p>

  <p align="center">
    <a href="https://laravel.com"><img src="https://img.shields.io/badge/Laravel-13-FF2D20?style=for-the-badge&logo=laravel" alt="Laravel" /></a>
    <a href="https://filamentphp.com"><img src="https://img.shields.io/badge/Filament-v5-F59E0B?style=for-the-badge&logo=laravel" alt="Filament" /></a>
    <a href="https://sqlite.org"><img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" /></a>
  </p>
</div>

---

## 🌟 Overview

The backend layer is built using **Laravel 13** and serves two primary operations:
1. **CMS Panels:** Custom **Filament v5** admin dashboard for customer lifetime value (LTV) lookup, order state updates, and real-time settings adjustments.
2. **API Endpoint Drivers:** Providing storefront-safe settings payload (pricing, active gateways, SEO tags) via `GET /api/settings/public` and managing secure local payment integrations.

---

## 🛠️ Key Architectural Components

### 1. Centralized Settings Engine
* **`App\Models\Setting`:** Offers flat-file caching and direct database accessors (`Setting::get('key')`, `Setting::setMany($values)`).
* **`App\Filament\Pages\ManageSettings`:** Filament v5 Page utilizing a 7-tabbed layout to adjust site configs without modifying code or `.env` files.

### 2. Unified Payments Engine
* **`App\Services\Payments\PaymentProviderInterface`:** Guarantees standard method signatures (`initiatePayment`, `verifyPayment`, `handleWebhook`) for all active gateways.
* **`App\Services\Payments\BkashPaymentService`:** Fully integrated tokenized bKash merchant flow, sandbox toggles, and status validators.

---

## 🚀 Setting Up Locally

### 1. Install Dependencies
```bash
composer install
```

### 2. Configuration Settings
Copy the template configuration file:
```bash
cp .env.example .env
php artisan key:generate
```

### 3. Database Migration & Seeding
Prepare your database and seed all **38 default platform parameters**:
```bash
touch database/database.sqlite
php artisan migrate --seed
```

### 4. Run Server
```bash
php artisan serve
```
Admin dashboard is live at `http://localhost:8000/admin`.

---

## 🧪 Running Tests & Validation
Validate the codebase against the PHPUnit test suite:
```bash
php vendor/bin/phpunit
```
Check registered routes:
```bash
php artisan route:list --path=admin
```
