<?php

namespace App\Filament\Resources\Products\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Builder;
use Filament\Forms\Components\Builder\Block;
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
                Toggle::make('is_launch_offer')
                    ->required(),
                FileUpload::make('cover_image')
                    ->image(),
                Textarea::make('bonus_items')
                    ->columnSpanFull(),
                Builder::make('page_layout')
                    ->blocks([
                        Block::make('hero')
                            ->schema([
                                TextInput::make('title')->required(),
                                Textarea::make('subtitle'),
                                TextInput::make('cta_text'),
                            ]),
                        Block::make('benefits')
                            ->schema([
                                TextInput::make('title')->required(),
                                Textarea::make('items_json')->helperText('JSON items of benefits'),
                            ]),
                        Block::make('faq')
                            ->schema([
                                TextInput::make('title')->required(),
                                Textarea::make('qa_pairs_json')->helperText('JSON questions and answers'),
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
