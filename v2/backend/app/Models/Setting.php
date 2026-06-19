<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Setting extends Model
{
    protected $fillable = ['key', 'value', 'type'];

    // ── Cache TTL ────────────────────────────────────────────────────────────
    private const CACHE_TTL    = 3600; // 1 hour
    private const CACHE_PREFIX = 'settings_';
    private const CACHE_ALL    = 'settings_all';

    // ── Public API ────────────────────────────────────────────────────────────

    /**
     * Get a setting value by key, with optional default.
     */
    public static function get(string $key, mixed $default = null): mixed
    {
        return Cache::remember(self::CACHE_PREFIX . $key, self::CACHE_TTL, function () use ($key, $default) {
            $setting = static::where('key', $key)->first();
            if (!$setting) return $default;
            return self::cast($setting->value, $setting->type);
        });
    }

    /**
     * Set a setting value (upsert).
     */
    public static function set(string $key, mixed $value, string $type = 'string'): void
    {
        if (is_array($value) || is_object($value)) {
            $value = json_encode($value);
            $type  = 'json';
        } elseif (is_bool($value)) {
            $value = $value ? '1' : '0';
            $type  = 'boolean';
        }

        static::updateOrCreate(
            ['key' => $key],
            ['value' => $value, 'type' => $type]
        );

        Cache::forget(self::CACHE_PREFIX . $key);
        Cache::forget(self::CACHE_ALL);
    }

    /**
     * Bulk-set from an associative array (used by ManageSettings page).
     */
    public static function setMany(array $data): void
    {
        foreach ($data as $key => $value) {
            // Determine type from existing record or infer
            $existing = static::where('key', $key)->first();
            $type     = $existing?->type ?? self::inferType($value);
            static::set($key, $value, $type);
        }
    }

    /**
     * Get all settings as a flat key => value array.
     */
    public static function allFlat(): array
    {
        return Cache::remember(self::CACHE_ALL, self::CACHE_TTL, function () {
            return static::all()->mapWithKeys(function ($s) {
                return [$s->key => self::cast($s->value, $s->type)];
            })->all();
        });
    }

    /**
     * Flush all cached settings.
     */
    public static function flush(): void
    {
        Cache::flush(); // Simple flush; or use tagged cache if available
    }

    // ── Internal ──────────────────────────────────────────────────────────────

    private static function cast(mixed $value, string $type): mixed
    {
        return match ($type) {
            'boolean' => in_array($value, ['1', 'true', true], true),
            'json'    => json_decode($value, true),
            'integer' => (int) $value,
            'float'   => (float) $value,
            default   => $value,
        };
    }

    private static function inferType(mixed $value): string
    {
        if (is_bool($value))   return 'boolean';
        if (is_array($value))  return 'json';
        if (is_numeric($value) && str_contains((string)$value, '.')) return 'float';
        if (is_int($value))    return 'integer';
        return 'string';
    }
}
