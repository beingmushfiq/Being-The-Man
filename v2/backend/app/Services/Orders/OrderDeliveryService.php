<?php

namespace App\Services\Orders;

use App\Models\Order;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Http;

class OrderDeliveryService
{
    public function generateDownloadLink(Order $order): string
    {
        return URL::temporarySignedRoute(
            'downloads.guide',
            now()->addDays(7),
            ['order' => $order->id]
        );
    }

    public function deliverOrder(Order $order): void
    {
        $downloadUrl = $this->generateDownloadLink($order);

        // 1. Email Delivery
        if ($order->customer && $order->customer->email) {
            Mail::raw("ধন্যবাদ! আপনার বইটি সফলভাবে অর্ডার হয়েছে। আপনার ডাউনলোড লিংক: {$downloadUrl}", function ($message) use ($order) {
                $message->to($order->customer->email)
                    ->subject('The Silent Language of Style - Download Link');
            });
        }

        // 2. WhatsApp Notification Webhook Trigger
        if ($order->customer && $order->customer->whatsapp_number) {
            Http::post(env('WHATSAPP_API_URL', 'https://api.whatsapp-provider.com/send'), [
                'phone' => $order->customer->whatsapp_number,
                'message' => "আপনার বই তৈরি! নিচের লিংকে ক্লিক করে ডাউনলোড করুন:\n{$downloadUrl}",
                'apikey' => env('WHATSAPP_API_KEY', '')
            ]);
        }
    }
}
