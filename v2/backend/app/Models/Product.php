<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = [
        'sku', 'title', 'slug', 'description', 
        'regular_price_bdt', 'launch_price_bdt', 
        'regular_price_usd', 'launch_price_usd', 
        'is_launch_offer', 'cover_image', 'bonus_items'
    ];

    protected $casts = [
        'is_launch_offer' => 'boolean',
        'bonus_items' => 'array',
        'regular_price_bdt' => 'decimal:2',
        'launch_price_bdt' => 'decimal:2',
        'regular_price_usd' => 'decimal:2',
        'launch_price_usd' => 'decimal:2',
    ];

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
