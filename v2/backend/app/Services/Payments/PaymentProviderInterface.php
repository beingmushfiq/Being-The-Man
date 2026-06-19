<?php

namespace App\Services\Payments;

interface PaymentProviderInterface
{
    public function initiatePayment(array $data): array;

    public function verifyPayment(string $paymentId): array;

    public function handleWebhook(array $payload): array;
}
