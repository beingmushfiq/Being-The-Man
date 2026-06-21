<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Filament\Widgets\ChartWidget;

class OrderStatusWidget extends ChartWidget
{
    protected static ?int $sort = 2;

    protected int | string | array $columnSpan = 1;

    protected ?string $heading = 'Order Status Breakdown';

    protected ?string $description = 'Distribution of all orders by payment status';

    protected ?string $maxHeight = '280px';

    protected function getData(): array
    {
        $paid    = Order::where('payment_status', 'paid')->count();
        $pending = Order::where('payment_status', 'pending')->count();
        $failed  = Order::where('payment_status', 'failed')->count();

        return [
            'datasets' => [
                [
                    'data'            => [$paid, $pending, $failed],
                    'backgroundColor' => [
                        'rgba(34, 197, 94, 0.85)',   // green  - paid
                        'rgba(245, 158, 11, 0.85)',  // amber  - pending
                        'rgba(239, 68, 68, 0.85)',   // red    - failed
                    ],
                    'borderColor' => [
                        'rgba(34, 197, 94, 1)',
                        'rgba(245, 158, 11, 1)',
                        'rgba(239, 68, 68, 1)',
                    ],
                    'borderWidth' => 2,
                ],
            ],
            'labels' => ['Paid', 'Pending', 'Failed'],
        ];
    }

    protected function getType(): string
    {
        return 'doughnut';
    }

    protected function getOptions(): array
    {
        return [
            'plugins' => [
                'legend' => [
                    'position' => 'bottom',
                ],
            ],
            'cutout' => '65%',
        ];
    }
}
