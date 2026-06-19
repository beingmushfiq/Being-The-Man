<?php

namespace App\Services\Payments;

use App\Models\Order;
use Illuminate\Http\Request;

interface PaymentProviderInterface
{
    /**
     * Initialize the payment process and get the gateway redirect URL.
     */
    public function initiatePayment(Order $order): string;

    /**
     * Handle the response/callback from the gateway.
     */
    public function handleCallback(Request $request): array;

    /**
     * Verify the transaction status directly with the provider API.
     */
    public function verifyTransaction(string $transactionId): bool;
}
