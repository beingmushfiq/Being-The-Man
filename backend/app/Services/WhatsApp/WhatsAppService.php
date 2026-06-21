<?php

namespace App\Services\WhatsApp;

use App\Models\Customer;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WhatsAppService
{
    protected string $baseUrl;
    protected string $accessToken;
    protected string $phoneNumberId;

    public function __construct()
    {
        $apiVersion = config('services.whatsapp.api_version', 'v20.0');
        $this->phoneNumberId = config('services.whatsapp.phone_number_id', '');
        $this->accessToken = config('services.whatsapp.access_token', '');
        $this->baseUrl = "https://graph.facebook.com/{$apiVersion}/{$this->phoneNumberId}";
    }

    /**
     * Send template notification message to customer.
     */
    public function sendTemplateMessage(string $to, string $templateName, array $components = [], string $lang = 'bn'): bool
    {
        if (empty($this->accessToken) || empty($this->phoneNumberId)) {
            Log::warning("WhatsApp config missing. Skipping message transmission to {$to}.");
            return false;
        }

        // Format to national representation E.164 without leading plus for WhatsApp API compatibility
        $formattedTo = preg_replace('/[^0-9]/', '', $to);
        if (!str_starts_with($formattedTo, '88')) {
            $formattedTo = '88' . ltrim($formattedTo, '0');
        }

        try {
            $response = Http::withToken($this->accessToken)
                ->post("{$this->baseUrl}/messages", [
                    'messaging_product' => 'whatsapp',
                    'to' => $formattedTo,
                    'type' => 'template',
                    'template' => [
                        'name' => $templateName,
                        'language' => [
                            'code' => $lang
                        ],
                        'components' => $components
                    ]
                ]);

            if ($response->successful()) {
                Log::info("WhatsApp Template Message successfully queued: {$templateName} to {$formattedTo}");
                return true;
            }

            Log::error("WhatsApp API Transmission Failure: " . $response->body());
        } catch (\Exception $e) {
            Log::error("WhatsApp Dispatch Exception: " . $e->getMessage());
        }

        return false;
    }
}
