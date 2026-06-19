<?php

namespace App\Services\Payments;

use App\Models\Setting;
use Illuminate\Support\Facades\Http;

class ShurjopayPaymentService implements PaymentProviderInterface
{
    protected string $username;
    protected string $password;
    protected string $baseUrl;
    protected string $prefix;

    public function __construct()
    {
        $this->username = Setting::get('shurjopay_username', env('SHURJOPAY_USERNAME', 'sandbox'));
        $this->password = Setting::get('shurjopay_password', env('SHURJOPAY_PASSWORD', 'sandbox_pass'));
        $this->baseUrl  = Setting::get('shurjopay_base_url', env('SHURJOPAY_BASE_URL', 'https://sandbox.shurjopayment.com'));
        $this->prefix   = Setting::get('shurjopay_prefix',   env('SHURJOPAY_PREFIX', 'BTM'));
    }

    private function getAccessToken(): ?string
    {
        $response = Http::post("{$this->baseUrl}/api/get_token", [
            'username' => $this->username,
            'password' => $this->password,
        ]);

        return $response->json()['token'] ?? null;
    }

    public function initiatePayment(array $data): array
    {
        $token = $this->getAccessToken();
        if (!$token) {
            return ['error' => 'Failed to obtain ShurjoPay access token'];
        }

        $response = Http::withToken($token)->post("{$this->baseUrl}/api/secret-pay", [
            'prefix'           => $this->prefix,
            'amount'           => $data['amount'],
            'order_id'         => $data['order_id'],
            'currency'         => 'BDT',
            'customer_name'    => $data['customer_name']    ?? 'Customer',
            'customer_phone'   => $data['customer_phone']   ?? '01700000000',
            'customer_email'   => $data['customer_email']   ?? 'customer@example.com',
            'customer_address' => $data['customer_address'] ?? 'Dhaka',
            'customer_city'    => 'Dhaka',
            'return_url'       => route('payments.shurjopay.callback'),
            'cancel_url'       => route('payments.shurjopay.callback', ['cancel' => 1]),
        ]);

        return $response->json() ?? [];
    }

    public function verifyPayment(string $paymentId): array
    {
        $token = $this->getAccessToken();
        if (!$token) {
            return ['error' => 'Failed to obtain ShurjoPay access token'];
        }

        $response = Http::withToken($token)->post("{$this->baseUrl}/api/verification", [
            'order_id' => $paymentId,
        ]);

        return $response->json() ?? [];
    }

    public function handleWebhook(array $payload): array
    {
        return $payload;
    }
}
