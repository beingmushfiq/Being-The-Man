<?php

namespace App\Filament\Resources\Products\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('sku')
                    ->label('SKU')
                    ->required(),
                TextInput::make('title')
                    ->required(),
                TextInput::make('slug')
                    ->required(),
                Textarea::make('description')
                    ->columnSpanFull(),
                TextInput::make('regular_price_bdt')
                    ->required()
                    ->numeric(),
                TextInput::make('launch_price_bdt')
                    ->required()
                    ->numeric(),
                TextInput::make('regular_price_usd')
                    ->required()
                    ->numeric(),
                TextInput::make('launch_price_usd')
                    ->required()
                    ->numeric(),
                Toggle::make('is_launch_offer')
                    ->required(),
                FileUpload::make('cover_image')
                    ->image(),
                Textarea::make('bonus_items')
                    ->columnSpanFull(),
            ]);
    }
}
