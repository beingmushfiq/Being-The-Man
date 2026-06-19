<?php

namespace App\Services\Payments;

use Illuminate\Support\Facades\Http;

class AamarPayPaymentService implements PaymentProviderInterface
{
    protected string $storeId;
    protected string $signatureKey;
    protected string $baseUrl;

    public function __construct()
    {
        $this->storeId = env('AAMARPAY_STORE_ID', 'sandbox');
        $this->signatureKey = env('AAMARPAY_SIGNATURE_KEY', 'sandbox_key');
        $this->baseUrl = env('AAMARPAY_BASE_URL', 'https://sandbox.aamarpay.com');
    }

    public function initiatePayment(array $data): array
    {
        $response = Http::post("{$this->baseUrl}/jsonpost.php", [
            'store_id' => $this->storeId,
            'signature_key' => $this->signatureKey,
            'cus_name' => $data['customer_name'] ?? 'Customer',
            'cus_email' => $data['customer_email'] ?? 'customer@example.com',
            'cus_phone' => $data['customer_phone'] ?? '01700000000',
            'amount' => $data['amount'],
            'currency' => 'BDT',
            'tran_id' => $data['order_id'],
            'desc' => 'Being The Man book payment',
            'success_url' => route('payments.aamarpay.callback', ['status' => 'success']),
            'fail_url' => route('payments.aamarpay.callback', ['status' => 'fail']),
            'cancel_url' => route('payments.aamarpay.callback', ['status' => 'cancel']),
            'type' => 'json'
        ]);

        return $response->json() ?? [];
    }

    public function verifyPayment(string $paymentId): array
    {
        $response = Http::post("{$this->baseUrl}/api/v1/trxcheck/request.php", [
            'store_id' => $this->storeId,
            'signature_key' => $this->signatureKey,
            'request_id' => $paymentId,
            'type' => 'json'
        ]);

        return $response->json() ?? [];
    }

    public function handleWebhook(array $payload): array
    {
        return $payload;
    }
}
