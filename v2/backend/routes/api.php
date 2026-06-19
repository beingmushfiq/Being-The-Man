<?php

use App\Http\Controllers\Api\SettingsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public — no auth required
Route::prefix('settings')->group(function () {
    Route::get('/public', [SettingsController::class, 'public'])->name('api.settings.public');
});
