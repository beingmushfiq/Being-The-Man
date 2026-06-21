<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;

class SettingsController extends Controller
{
    /**
     * Public endpoint — returns storefront-safe settings only.
     * Used by the Next.js frontend to read live product/store data.
     *
     * GET /api/settings/public
     */
    public function public(): JsonResponse
    {
        return response()->json([
            'store' => [
                'name'             => Setting::get('site_name',        'Being The Man'),
                'support_whatsapp' => Setting::get('support_whatsapp', ''),
                'currency'         => Setting::get('currency',          'BDT'),
            ],
            'product' => [
                'title'           => Setting::get('book_title',     'The Silent Language of Style'),
                'tagline'         => Setting::get('book_tagline',    'FIT • COLOR • PRESENCE'),
                'regular_price'   => (float) Setting::get('regular_price', 1000),
                'launch_price'    => (float) Setting::get('launch_price',   490),
                'is_launch_offer' => (bool)  Setting::get('is_launch_offer', true),
            ],
            'seo' => [
                'og_title'       => Setting::get('og_title',       'Being The Man — Style Guide'),
                'og_description' => Setting::get('og_description', ''),
                'og_image'       => Setting::get('og_image',       ''),
                'twitter_handle' => Setting::get('twitter_handle', ''),
            ],
            'active_gateways' => Setting::get('active_gateways', ['bkash', 'nagad']),
        ]);
    }
}
