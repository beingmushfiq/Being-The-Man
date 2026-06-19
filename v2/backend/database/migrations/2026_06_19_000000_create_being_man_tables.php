<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. products
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('sku')->unique();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->decimal('regular_price_bdt', 10, 2);
            $table->decimal('launch_price_bdt', 10, 2);
            $table->decimal('regular_price_usd', 10, 2);
            $table->decimal('launch_price_usd', 10, 2);
            $table->boolean('is_launch_offer')->default(true);
            $table->string('cover_image')->nullable();
            $table->json('bonus_items')->nullable();
            $table->timestamps();
        });

        // 2. customers
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('whatsapp_number')->unique();
            $table->string('email')->nullable();
            $table->string('country')->default('BD');
            $table->timestamp('last_active_at')->nullable();
            $table->timestamps();
        });

        // 3. orders
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->foreignId('customer_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->constrained();
            $table->decimal('amount', 10, 2);
            $table->string('currency')->default('BDT');
            $table->string('payment_status')->default('pending'); // pending, paid, failed, cancelled
            $table->string('payment_method')->nullable(); // bkash, nagad, card, manual
            $table->string('transaction_id')->nullable()->unique();
            $table->timestamp('paid_at')->nullable();
            $table->string('delivery_status')->default('pending'); // pending, delivered, failed
            $table->timestamp('delivered_at')->nullable();
            $table->timestamps();
        });

        // 4. settings
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->string('type')->default('string'); // string, json, boolean, text
            $table->timestamps();
        });

        // 5. content_sections
        Schema::create('content_sections', function (Blueprint $table) {
            $table->id();
            $table->string('section_identifier')->unique(); // e.g. hero, problem, benefits
            $table->string('title_bn');
            $table->string('title_en')->nullable();
            $table->json('content')->nullable(); // structured layout variables
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 6. testimonials
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('author_name');
            $table->string('author_role')->nullable();
            $table->text('comment');
            $table->integer('rating')->default(5);
            $table->boolean('is_featured')->default(true);
            $table->timestamps();
        });

        // 7. faqs
        Schema::create('faqs', function (Blueprint $table) {
            $table->id();
            $table->text('question');
            $table->text('answer');
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 8. whatsapp_templates
        Schema::create('whatsapp_templates', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('language')->default('bn');
            $table->string('category')->default('UTILITY');
            $table->text('body_text');
            $table->json('buttons')->nullable();
            $table->timestamps();
        });

        // 9. whatsapp_campaigns
        Schema::create('whatsapp_campaigns', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('whatsapp_template_id')->constrained();
            $table->string('target_segment')->default('all'); // all, leads, customers, abandoned
            $table->timestamp('scheduled_at')->nullable();
            $table->string('status')->default('draft'); // draft, scheduled, sending, completed, failed
            $table->timestamps();
        });

        // 10. whatsapp_logs
        Schema::create('whatsapp_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->nullable()->constrained()->nullOnDelete();
            $table->string('recipient_number');
            $table->string('message_type'); // notification, template, conversation
            $table->text('message_body');
            $table->string('status')->default('sent'); // sent, delivered, read, failed
            $table->string('meta_message_id')->nullable(); // Meta Business API response ID
            $table->text('error_message')->nullable();
            $table->timestamps();
        });

        // 11. analytics_events
        Schema::create('analytics_events', function (Blueprint $table) {
            $table->id();
            $table->string('session_id')->index();
            $table->foreignId('customer_id')->nullable()->constrained()->nullOnDelete();
            $table->string('event_name'); // PageView, InitiateCheckout, Purchase, etc.
            $table->json('event_params')->nullable();
            $table->string('ip_address')->nullable();
            $table->string('user_agent')->nullable();
            $table->timestamps();
        });

        // 12. conversion_funnel_snapshots
        Schema::create('conversion_funnel_snapshots', function (Blueprint $table) {
            $table->id();
            $table->date('date_spent')->unique();
            $table->integer('page_views')->default(0);
            $table->integer('checkout_initiated')->default(0);
            $table->integer('purchases')->default(0);
            $table->decimal('conversion_rate', 5, 2)->default(0.00);
            $table->decimal('revenue', 10, 2)->default(0.00);
            $table->timestamps();
        });

        // 13. payment_transactions
        Schema::create('payment_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->string('provider'); // bkash, nagad, aamarpay
            $table->string('transaction_id');
            $table->decimal('amount', 10, 2);
            $table->string('status'); // SUCCESS, FAILED, CANCELLED
            $table->json('raw_response')->nullable();
            $table->timestamps();
        });

        // 14. admin_logs
        Schema::create('admin_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('action');
            $table->text('details')->nullable();
            $table->timestamps();
        });

        // 15. blog_posts
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('excerpt')->nullable();
            $table->longText('content');
            $table->string('featured_image')->nullable();
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->boolean('is_published')->default(false);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });

        // 16. email_subscriptions (Newsletter / Backup)
        Schema::create('email_subscriptions', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->string('status')->default('active'); // active, unsubscribed
            $table->timestamps();
        });

        // 17. ab_test_experiments
        Schema::create('ab_test_experiments', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique(); // e.g. checkout_modal_v2
            $table->text('description')->nullable();
            $table->boolean('is_running')->default(false);
            $table->timestamps();
        });

        // 18. ab_test_variants
        Schema::create('ab_test_variants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ab_test_experiment_id')->constrained()->cascadeOnDelete();
            $table->string('variant_name'); // A, B, control, etc.
            $table->integer('traffic_percentage');
            $table->integer('visitors_count')->default(0);
            $table->integer('conversions_count')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ab_test_variants');
        Schema::dropIfExists('ab_test_experiments');
        Schema::dropIfExists('email_subscriptions');
        Schema::dropIfExists('blog_posts');
        Schema::dropIfExists('admin_logs');
        Schema::dropIfExists('payment_transactions');
        Schema::dropIfExists('conversion_funnel_snapshots');
        Schema::dropIfExists('analytics_events');
        Schema::dropIfExists('whatsapp_logs');
        Schema::dropIfExists('whatsapp_campaigns');
        Schema::dropIfExists('whatsapp_templates');
        Schema::dropIfExists('faqs');
        Schema::dropIfExists('testimonials');
        Schema::dropIfExists('content_sections');
        Schema::dropIfExists('settings');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('customers');
        Schema::dropIfExists('products');
    }
};
