<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use App\Models\Customer;
use App\Models\Product;
use Carbon\Carbon;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $now = Carbon::now();

        // Revenue stats
        $totalRevenue = Order::where('payment_status', 'paid')->sum('amount');
        $thisMonthRevenue = Order::where('payment_status', 'paid')
            ->whereMonth('paid_at', $now->month)
            ->whereYear('paid_at', $now->year)
            ->sum('amount');
        $lastMonthRevenue = Order::where('payment_status', 'paid')
            ->whereMonth('paid_at', $now->copy()->subMonth()->month)
            ->whereYear('paid_at', $now->copy()->subMonth()->year)
            ->sum('amount');

        // Orders stats
        $totalOrders    = Order::count();
        $pendingOrders  = Order::where('payment_status', 'pending')->count();
        $todayOrders    = Order::whereDate('created_at', today())->count();

        // Customers stats
        $totalCustomers    = Customer::count();
        $newThisMonth      = Customer::whereMonth('created_at', $now->month)
            ->whereYear('created_at', $now->year)->count();

        // Revenue trend chart (last 7 months)
        $revenueChart = [];
        for ($i = 6; $i >= 0; $i--) {
            $revenueChart[] = Order::where('payment_status', 'paid')
                ->whereMonth('paid_at', $now->copy()->subMonths($i)->month)
                ->whereYear('paid_at', $now->copy()->subMonths($i)->year)
                ->sum('amount');
        }

        // Revenue change %
        $revenueChange = $lastMonthRevenue > 0
            ? round((($thisMonthRevenue - $lastMonthRevenue) / $lastMonthRevenue) * 100, 1)
            : 0;
        $revenueChangeText = $revenueChange >= 0
            ? "+{$revenueChange}% vs last month"
            : "{$revenueChange}% vs last month";

        return [
            Stat::make('Total Revenue', '৳' . number_format($totalRevenue, 2))
                ->description($revenueChangeText)
                ->descriptionIcon($revenueChange >= 0 ? 'heroicon-m-arrow-trending-up' : 'heroicon-m-arrow-trending-down')
                ->color($revenueChange >= 0 ? 'success' : 'danger')
                ->chart($revenueChart),

            Stat::make('This Month Revenue', '৳' . number_format($thisMonthRevenue, 2))
                ->description($todayOrders . ' orders placed today')
                ->descriptionIcon('heroicon-m-calendar-days')
                ->color('primary')
                ->chart($revenueChart),

            Stat::make('Total Orders', number_format($totalOrders))
                ->description($pendingOrders . ' pending payment')
                ->descriptionIcon('heroicon-m-shopping-bag')
                ->color($pendingOrders > 0 ? 'warning' : 'success'),

            Stat::make('Total Customers', number_format($totalCustomers))
                ->description($newThisMonth . ' new this month')
                ->descriptionIcon('heroicon-m-user-plus')
                ->color('info'),
        ];
    }
}
