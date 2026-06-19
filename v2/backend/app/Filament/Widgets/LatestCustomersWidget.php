<?php

namespace App\Filament\Widgets;

use App\Models\Customer;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class LatestCustomersWidget extends BaseWidget
{
    protected static ?int $sort = 4;
    protected int | string | array $columnSpan = 'full';
    protected static ?string $heading = 'Latest Customers';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Customer::query()
                    ->latest()
                    ->limit(6)
            )
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->label('Name')
                    ->icon('heroicon-m-user-circle')
                    ->searchable(),

                Tables\Columns\TextColumn::make('email')
                    ->label('Email')
                    ->icon('heroicon-m-envelope')
                    ->copyable()
                    ->placeholder('—')
                    ->searchable(),

                Tables\Columns\TextColumn::make('whatsapp_number')
                    ->label('WhatsApp')
                    ->icon('heroicon-m-phone')
                    ->copyable()
                    ->placeholder('—'),

                Tables\Columns\TextColumn::make('country')
                    ->label('Country')
                    ->badge()
                    ->color('gray')
                    ->placeholder('—'),

                Tables\Columns\TextColumn::make('orders_count')
                    ->label('Orders')
                    ->counts('orders')
                    ->badge()
                    ->color('primary'),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Joined')
                    ->since()
                    ->sortable(),
            ]);
    }
}
