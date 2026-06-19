<?php

namespace App\Services\Payments;

use App\Models\Order;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class BkashPaymentService implements PaymentProviderInterface
{
    protected string $baseUrl;
    protected string $appKey;
    protected string $appSecret;
    protected string $username;
    protected string $password;

    public function __construct()
    {
        $sandbox = Setting::get('bkash_sandbox', true);

        $this->baseUrl   = $sandbox
            ? 'https://tokenized.sandbox.bka.sh/v1.2.0-beta'
            : 'https://tokenized.pay.bka.sh/v1.2.0-beta';

        $this->appKey    = Setting::get('bkash_app_key',    config('services.bkash.app_key', ''));
        $this->appSecret = Setting::get('bkash_app_secret', config('services.bkash.app_secret', ''));
        $this->username  = Setting::get('bkash_username',   config('services.bkash.username', ''));
        $this->password  = Setting::get('bkash_password',   config('services.bkash.password', ''));
    }

    /**
     * Retrieve OAuth token from bKash.
     */
    protected function getToken(): ?string
    {
        try {
            $response = Http::withHeaders([
                'username' => $this->username,
                'password' => $this->password,
            ])->post("{$this->baseUrl}/tokenized/checkout/token/grant", [
                'app_key'    => $this->appKey,
                'app_secret' => $this->appSecret,
            ]);

            if ($response->successful()) {
                return $response->json('id_token');
            }
            Log::error('bKash Token Grant Failed: ' . $response->body());
        } catch (\Exception $e) {
            Log::error('bKash Token Grant Exception: ' . $e->getMessage());
        }
        return null;
    }

    public function initiatePayment(array $data): array
    {
        $token = $this->getToken();
        if (!$token) {
            return ['error' => 'Failed to authenticate with bKash.'];
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => "Bearer {$token}",
                'X-APP-Key'     => $this->appKey,
            ])->post("{$this->baseUrl}/tokenized/checkout/create", [
                'mode'                 => '0011',
                'payerReference'       => $data['customer_phone'] ?? '01700000000',
                'callbackURL'          => route('payments.bkash.callback', ['order_id' => $data['order_id']]),
                'amount'               => $data['amount'],
                'currency'             => $data['currency'] ?? 'BDT',
                'intent'               => 'sale',
                'merchantInvoiceNumber' => $data['order_number'] ?? $data['order_id'],
            ]);

            return $response->json() ?? [];
        } catch (\Exception $e) {
            Log::error('bKash Initiate Payment Exception: ' . $e->getMessage());
            return ['error' => $e->getMessage()];
        }
    }

    public function verifyPayment(string $paymentId): array
    {
        $token = $this->getToken();
        if (!$token) {
            return ['success' => false, 'message' => 'Failed to obtain bKash token'];
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => "Bearer {$token}",
                'X-APP-Key'     => $this->appKey,
            ])->post("{$this->baseUrl}/tokenized/checkout/payment/status", [
                'paymentID' => $paymentId,
            ]);

            if ($response->successful()) {
                $resData = $response->json();
                return [
                    'success' => ($resData['statusCode'] ?? '') === '0000',
                    'data'    => $resData,
                ];
            }
        } catch (\Exception $e) {
            Log::error('bKash Verify Payment Exception: ' . $e->getMessage());
        }

        return ['success' => false, 'message' => 'Failed to verify payment'];
    }

    public function handleWebhook(array $payload): array
    {
        return $payload;
    }

    public function handleCallback(Request $request): array
    {
        $status    = $request->query('status');
        $paymentId = $request->query('paymentID');

        if ($status === 'success') {
            $token = $this->getToken();
            if ($token) {
                $response = Http::withHeaders([
                    'Authorization' => "Bearer {$token}",
                    'X-APP-Key'     => $this->appKey,
                ])->post("{$this->baseUrl}/tokenized/checkout/execute", [
                    'paymentID' => $paymentId,
                ]);

                if ($response->successful()) {
                    $resData = $response->json();
                    if ($resData['statusCode'] === '0000') {
                        return [
                            'success'        => true,
                            'transaction_id' => $resData['trxID'],
                            'amount'         => $resData['amount'],
                            'raw'            => $resData,
                        ];
                    }
                }
            }
        }

        return [
            'success' => false,
            'message' => 'Payment validation failed or cancelled.',
        ];
    }

    public function verifyTransaction(string $transactionId): bool
    {
        $token = $this->getToken();
        if (!$token) return false;

        try {
            $response = Http::withHeaders([
                'Authorization' => "Bearer {$token}",
                'X-APP-Key'     => $this->appKey,
            ])->post("{$this->baseUrl}/tokenized/checkout/general/searchTransaction", [
                'trxID' => $transactionId,
            ]);

            if ($response->successful() && $response->json('statusCode') === '0000') {
                return $response->json('transactionStatus') === 'Completed';
            }
        } catch (\Exception $e) {
            Log::error('bKash Search Transaction Exception: ' . $e->getMessage());
        }
        return false;
    }
}
