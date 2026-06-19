<?php

namespace App\Services\Tracking;

use Illuminate\Support\Facades\Http;

class ServerSideTracker
{
    protected string $pixelId;
    protected string $accessToken;
    protected string $gtmServerUrl;

    public function __construct()
    {
        $this->pixelId = env('META_PIXEL_ID', '');
        $this->accessToken = env('META_CAPI_TOKEN', '');
        $this->gtmServerUrl = env('GTM_SERVER_URL', '');
    }

    public function trackMetaEvent(string $eventName, array $userData, array $customData = []): array
    {
        if (empty($this->pixelId) || empty($this->accessToken)) {
            return ['status' => 'skipped', 'message' => 'Credentials not set'];
        }

        $payload = [
            'data' => [
                [
                    'event_name' => $eventName,
                    'event_time' => time(),
                    'event_source_url' => request()->fullUrl(),
                    'action_source' => 'website',
                    'user_data' => array_filter([
                        'em' => isset($userData['email']) ? hash('sha256', strtolower(trim($userData['email']))) : null,
                        'ph' => isset($userData['phone']) ? hash('sha256', trim($userData['phone'])) : null,
                        'client_ip_address' => request()->ip(),
                        'client_user_agent' => request()->userAgent(),
                    ]),
                    'custom_data' => $customData,
                ]
            ]
        ];

        $response = Http::post("https://graph.facebook.com/v17.0/{$this->pixelId}/events?access_token={$this->accessToken}", $payload);

        return $response->json() ?? [];
    }

    public function trackServerGtm(string $eventName, array $eventData): array
    {
        if (empty($this->gtmServerUrl)) {
            return ['status' => 'skipped', 'message' => 'GTM Server URL not set'];
        }

        $response = Http::post($this->gtmServerUrl, [
            'event' => $eventName,
            'ip' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'data' => $eventData
        ]);

        return ['status' => $response->successful() ? 'success' : 'failed'];
    }
}
