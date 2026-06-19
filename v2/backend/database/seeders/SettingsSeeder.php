<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingsSeeder extends Seeder
{
    public function run(): void
    {
        $defaults = [

            // ── Store ─────────────────────────────────────────────────────────
            ['key' => 'site_name',           'value' => 'Being The Man',              'type' => 'string'],
            ['key' => 'site_url',            'value' => 'https://beingman.app',    'type' => 'string'],
            ['key' => 'support_whatsapp',    'value' => '+8801XXXXXXXXX',             'type' => 'string'],
            ['key' => 'order_prefix',        'value' => 'BTM',                        'type' => 'string'],
            ['key' => 'currency',            'value' => 'BDT',                        'type' => 'string'],

            // ── Product ───────────────────────────────────────────────────────
            ['key' => 'book_title',          'value' => 'The Silent Language of Style', 'type' => 'string'],
            ['key' => 'book_tagline',        'value' => 'FIT • COLOR • PRESENCE',     'type' => 'string'],
            ['key' => 'regular_price',       'value' => '1000',                       'type' => 'float'],
            ['key' => 'launch_price',        'value' => '490',                        'type' => 'float'],
            ['key' => 'is_launch_offer',     'value' => '1',                          'type' => 'boolean'],

            // ── Payments — Active ─────────────────────────────────────────────
            ['key' => 'active_gateways',     'value' => '["bkash","nagad"]',          'type' => 'json'],

            // ── bKash ─────────────────────────────────────────────────────────
            ['key' => 'bkash_app_key',       'value' => '',                           'type' => 'string'],
            ['key' => 'bkash_app_secret',    'value' => '',                           'type' => 'string'],
            ['key' => 'bkash_username',      'value' => '',                           'type' => 'string'],
            ['key' => 'bkash_password',      'value' => '',                           'type' => 'string'],
            ['key' => 'bkash_sandbox',       'value' => '1',                          'type' => 'boolean'],

            // ── ShurjoPay ─────────────────────────────────────────────────────
            ['key' => 'shurjopay_username',  'value' => '',                           'type' => 'string'],
            ['key' => 'shurjopay_password',  'value' => '',                           'type' => 'string'],
            ['key' => 'shurjopay_base_url',  'value' => 'https://sandbox.shurjopayment.com', 'type' => 'string'],
            ['key' => 'shurjopay_prefix',    'value' => 'BTM',                        'type' => 'string'],
            ['key' => 'shurjopay_sandbox',   'value' => '1',                          'type' => 'boolean'],

            // ── AamarPay ─────────────────────────────────────────────────────
            ['key' => 'aamarpay_store_id',       'value' => '',                       'type' => 'string'],
            ['key' => 'aamarpay_signature_key',  'value' => '',                       'type' => 'string'],
            ['key' => 'aamarpay_base_url',       'value' => 'https://sandbox.aamarpay.com', 'type' => 'string'],
            ['key' => 'aamarpay_sandbox',        'value' => '1',                      'type' => 'boolean'],

            // ── Tracking ─────────────────────────────────────────────────────
            ['key' => 'meta_pixel_id',       'value' => '',                           'type' => 'string'],
            ['key' => 'meta_capi_token',     'value' => '',                           'type' => 'string'],
            ['key' => 'gtm_server_url',      'value' => '',                           'type' => 'string'],
            ['key' => 'ga4_measurement_id',  'value' => '',                           'type' => 'string'],

            // ── WhatsApp Business API ────────────────────────────────────────
            ['key' => 'wa_api_token',        'value' => '',                           'type' => 'string'],
            ['key' => 'wa_phone_number_id',  'value' => '',                           'type' => 'string'],
            ['key' => 'wa_business_id',      'value' => '',                           'type' => 'string'],

            // ── SEO & Social ─────────────────────────────────────────────────
            ['key' => 'og_title',            'value' => 'Being The Man — Style Guide', 'type' => 'string'],
            ['key' => 'og_description',      'value' => 'The ultimate style book for Bangladeshi men.', 'type' => 'string'],
            ['key' => 'og_image',            'value' => '',                           'type' => 'string'],
            ['key' => 'twitter_handle',      'value' => '',                           'type' => 'string'],

            // ── System ───────────────────────────────────────────────────────
            ['key' => 'maintenance_mode',    'value' => '0',                          'type' => 'boolean'],
            ['key' => 'maintenance_message', 'value' => 'We are currently upgrading the site. Please check back soon.', 'type' => 'text'],
        ];

        foreach ($defaults as $setting) {
            Setting::updateOrCreate(
                ['key' => $setting['key']],
                ['value' => $setting['value'], 'type' => $setting['type']]
            );
        }

        $this->command->info('✅ Settings seeded with ' . count($defaults) . ' default keys.');
    }
}
