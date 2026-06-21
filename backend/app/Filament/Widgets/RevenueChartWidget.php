<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Carbon\Carbon;
use Filament\Widgets\ChartWidget;

class RevenueChartWidget extends ChartWidget
{
    protected static ?int $sort = 2;

    protected int | string | array $columnSpan = 2;

    protected ?string $heading = 'Monthly Revenue (৳)';

    protected ?string $description = 'Paid orders revenue for the last 6 months';

    protected ?string $maxHeight = '280px';

    protected function getData(): array
    {
        $now    = Carbon::now();
        $labels = [];
        $data   = [];

        for ($i = 5; $i >= 0; $i--) {
            $month    = $now->copy()->subMonths($i);
            $labels[] = $month->format('M Y');
            $data[]   = (float) Order::where('payment_status', 'paid')
                ->whereMonth('paid_at', $month->month)
                ->whereYear('paid_at', $month->year)
                ->sum('amount');
        }

        return [
            'datasets' => [
                [
                    'label'                => 'Revenue (৳)',
                    'data'                 => $data,
                    'backgroundColor'      => 'rgba(245, 158, 11, 0.15)',
                    'borderColor'          => 'rgba(245, 158, 11, 1)',
                    'borderWidth'          => 2,
                    'pointBackgroundColor' => 'rgba(245, 158, 11, 1)',
                    'pointRadius'          => 4,
                    'fill'                 => true,
                    'tension'              => 0.4,
                ],
            ],
            'labels' => $labels,
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
