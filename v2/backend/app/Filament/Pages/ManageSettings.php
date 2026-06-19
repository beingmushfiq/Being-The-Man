<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use Filament\Schemas\Components\Fieldset;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Schemas\Schema;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use BackedEnum;

class ManageSettings extends Page implements HasForms
{
    use InteractsWithForms;

    // non-static — matches parent Page::$view instance property
    protected string $view = 'filament.pages.manage-settings';

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-cog-8-tooth';
    protected static ?string $navigationLabel                 = 'Settings';
    protected static ?string $title                           = 'System Settings';
    protected static ?int    $navigationSort                  = 99;


    // Form data bound to this page
    public array $data = [];

    public function mount(): void
    {
        $flat = Setting::allFlat();

        // Merge DB values with defaults so the form always has every key
        $this->data = array_merge($this->defaults(), array_filter($flat, fn($v) => $v !== null && $v !== ''));
        $this->form->fill($this->data);
    }

    public function form(Schema $form): Schema
    {
        return $form
            ->schema([
                Tabs::make('settings_tabs')
                    ->tabs([

                        // ── STORE ──────────────────────────────────────────────
                        Tab::make('🏪 Store')
                            ->schema([
                                Section::make('Store Information')
                                    ->description('Basic store identity and contact details.')
                                    ->schema([
                                        Grid::make(2)->schema([
                                            TextInput::make('site_name')
                                                ->label('Site Name')
                                                ->required()
                                                ->placeholder('Being The Man'),

                                            TextInput::make('site_url')
                                                ->label('Site URL')
                                                ->url()
                                                ->placeholder('https://beingtheman.com'),

                                            TextInput::make('support_whatsapp')
                                                ->label('Support WhatsApp Number')
                                                ->placeholder('+8801XXXXXXXXX')
                                                ->helperText('Include country code. Used for order notifications.'),

                                            TextInput::make('order_prefix')
                                                ->label('Order Number Prefix')
                                                ->placeholder('BTM')
                                                ->maxLength(10),

                                            TextInput::make('currency')
                                                ->label('Currency Code')
                                                ->placeholder('BDT')
                                                ->maxLength(5),
                                        ]),
                                    ]),
                            ]),

                        // ── PRODUCT ────────────────────────────────────────────
                        Tab::make('📚 Product')
                            ->schema([
                                Section::make('Book Details')
                                    ->description('Controls the title, pricing, and offer status shown on the storefront.')
                                    ->schema([
                                        Grid::make(2)->schema([
                                            TextInput::make('book_title')
                                                ->label('Book Title')
                                                ->required()
                                                ->placeholder('The Silent Language of Style'),

                                            TextInput::make('book_tagline')
                                                ->label('Book Tagline')
                                                ->placeholder('FIT • COLOR • PRESENCE'),

                                            TextInput::make('regular_price')
                                                ->label('Regular Price (৳)')
                                                ->numeric()
                                                ->step(1)
                                                ->prefix('৳'),

                                            TextInput::make('launch_price')
                                                ->label('Launch Offer Price (৳)')
                                                ->numeric()
                                                ->step(1)
                                                ->prefix('৳'),
                                        ]),

                                        Toggle::make('is_launch_offer')
                                            ->label('Launch Offer Active')
                                            ->helperText('When enabled, the launch price is shown on the checkout. Disable to revert to regular price.'),
                                    ]),
                            ]),

                        // ── PAYMENTS ───────────────────────────────────────────
                        Tab::make('💳 Payments')
                            ->schema([
                                Section::make('Active Gateways')
                                    ->schema([
                                        Select::make('active_gateways')
                                            ->label('Enabled Payment Gateways')
                                            ->multiple()
                                            ->options([
                                                'bkash'     => 'bKash',
                                                'nagad'     => 'Nagad',
                                                'shurjopay' => 'ShurjoPay',
                                                'aamarpay'  => 'AamarPay',
                                                'manual'    => 'Manual / Bank Transfer',
                                            ])
                                            ->helperText('Gateways shown to customers at checkout.'),
                                    ]),

                                Fieldset::make('bKash')
                                    ->schema([
                                        Toggle::make('bkash_sandbox')
                                            ->label('Sandbox Mode')
                                            ->inline(false),
                                        Grid::make(2)->schema([
                                            TextInput::make('bkash_app_key')
                                                ->label('App Key')
                                                ->password()
                                                ->revealable(),
                                            TextInput::make('bkash_app_secret')
                                                ->label('App Secret')
                                                ->password()
                                                ->revealable(),
                                            TextInput::make('bkash_username')
                                                ->label('Username'),
                                            TextInput::make('bkash_password')
                                                ->label('Password')
                                                ->password()
                                                ->revealable(),
                                        ]),
                                    ]),

                                Fieldset::make('ShurjoPay')
                                    ->schema([
                                        Toggle::make('shurjopay_sandbox')
                                            ->label('Sandbox Mode')
                                            ->inline(false),
                                        Grid::make(2)->schema([
                                            TextInput::make('shurjopay_username')
                                                ->label('Username'),
                                            TextInput::make('shurjopay_password')
                                                ->label('Password')
                                                ->password()
                                                ->revealable(),
                                            TextInput::make('shurjopay_base_url')
                                                ->label('Base URL')
                                                ->url()
                                                ->columnSpanFull(),
                                            TextInput::make('shurjopay_prefix')
                                                ->label('Order Prefix'),
                                        ]),
                                    ]),

                                Fieldset::make('AamarPay')
                                    ->schema([
                                        Toggle::make('aamarpay_sandbox')
                                            ->label('Sandbox Mode')
                                            ->inline(false),
                                        Grid::make(2)->schema([
                                            TextInput::make('aamarpay_store_id')
                                                ->label('Store ID'),
                                            TextInput::make('aamarpay_signature_key')
                                                ->label('Signature Key')
                                                ->password()
                                                ->revealable(),
                                            TextInput::make('aamarpay_base_url')
                                                ->label('Base URL')
                                                ->url()
                                                ->columnSpanFull(),
                                        ]),
                                    ]),
                            ]),

                        // ── TRACKING ───────────────────────────────────────────
                        Tab::make('📊 Tracking')
                            ->schema([
                                Section::make('Meta (Facebook) CAPI')
                                    ->description('Server-side event tracking via Meta Conversions API.')
                                    ->schema([
                                        Grid::make(2)->schema([
                                            TextInput::make('meta_pixel_id')
                                                ->label('Meta Pixel ID')
                                                ->placeholder('1234567890'),
                                            TextInput::make('meta_capi_token')
                                                ->label('CAPI Access Token')
                                                ->password()
                                                ->revealable(),
                                        ]),
                                    ]),

                                Section::make('Google Tag Manager (Server-Side)')
                                    ->schema([
                                        Grid::make(2)->schema([
                                            TextInput::make('gtm_server_url')
                                                ->label('GTM Server URL')
                                                ->url()
                                                ->placeholder('https://gtm.yourdomain.com'),
                                            TextInput::make('ga4_measurement_id')
                                                ->label('GA4 Measurement ID')
                                                ->placeholder('G-XXXXXXXXXX'),
                                        ]),
                                    ]),
                            ]),

                        // ── WHATSAPP ───────────────────────────────────────────
                        Tab::make('💬 WhatsApp API')
                            ->schema([
                                Section::make('Meta Business WhatsApp API')
                                    ->description('Used for order confirmation messages and campaign broadcasts.')
                                    ->schema([
                                        Grid::make(2)->schema([
                                            TextInput::make('wa_api_token')
                                                ->label('API Token')
                                                ->password()
                                                ->revealable(),
                                            TextInput::make('wa_phone_number_id')
                                                ->label('Phone Number ID'),
                                            TextInput::make('wa_business_id')
                                                ->label('Business Account ID'),
                                        ]),
                                    ]),
                            ]),

                        // ── SEO & SOCIAL ───────────────────────────────────────
                        Tab::make('🔍 SEO & Social')
                            ->schema([
                                Section::make('Open Graph / Meta Tags')
                                    ->schema([
                                        TextInput::make('og_title')
                                            ->label('OG Title')
                                            ->placeholder('Being The Man — Style Guide'),

                                        Textarea::make('og_description')
                                            ->label('OG Description')
                                            ->rows(3)
                                            ->maxLength(200),

                                        TextInput::make('og_image')
                                            ->label('OG Image URL')
                                            ->url()
                                            ->placeholder('https://yourdomain.com/og.jpg'),

                                        TextInput::make('twitter_handle')
                                            ->label('Twitter / X Handle')
                                            ->placeholder('@beingtheman'),
                                    ]),
                            ]),

                        // ── SYSTEM ─────────────────────────────────────────────
                        Tab::make('⚙️ System')
                            ->schema([
                                Section::make('Maintenance Mode')
                                    ->description('Enabling this will show a maintenance page to all visitors.')
                                    ->schema([
                                        Toggle::make('maintenance_mode')
                                            ->label('Enable Maintenance Mode')
                                            ->helperText('Admins can still access the backend.'),

                                        Textarea::make('maintenance_message')
                                            ->label('Maintenance Message')
                                            ->rows(3)
                                            ->placeholder('We are currently upgrading the site. Please check back soon.'),
                                    ]),
                            ]),
                    ])
                    ->columnSpanFull()
                    ->persistTabInQueryString(),
            ])
            ->statePath('data');
    }

    public function save(): void
    {
        $state = $this->form->getState();
        Setting::setMany($state);
        Setting::flush();

        Notification::make()
            ->title('Settings saved successfully')
            ->success()
            ->send();
    }

    private function defaults(): array
    {
        return [
            'site_name'           => 'Being The Man',
            'site_url'            => 'https://beingtheman.com',
            'support_whatsapp'    => '',
            'order_prefix'        => 'BTM',
            'currency'            => 'BDT',
            'book_title'          => 'The Silent Language of Style',
            'book_tagline'        => 'FIT • COLOR • PRESENCE',
            'regular_price'       => 1000,
            'launch_price'        => 490,
            'is_launch_offer'     => true,
            'active_gateways'     => ['bkash', 'nagad'],
            'bkash_app_key'       => '',
            'bkash_app_secret'    => '',
            'bkash_username'      => '',
            'bkash_password'      => '',
            'bkash_sandbox'       => true,
            'shurjopay_username'  => '',
            'shurjopay_password'  => '',
            'shurjopay_base_url'  => 'https://sandbox.shurjopayment.com',
            'shurjopay_prefix'    => 'BTM',
            'shurjopay_sandbox'   => true,
            'aamarpay_store_id'   => '',
            'aamarpay_signature_key' => '',
            'aamarpay_base_url'   => 'https://sandbox.aamarpay.com',
            'aamarpay_sandbox'    => true,
            'meta_pixel_id'       => '',
            'meta_capi_token'     => '',
            'gtm_server_url'      => '',
            'ga4_measurement_id'  => '',
            'wa_api_token'        => '',
            'wa_phone_number_id'  => '',
            'wa_business_id'      => '',
            'og_title'            => 'Being The Man — Style Guide',
            'og_description'      => 'The ultimate style book for Bangladeshi men.',
            'og_image'            => '',
            'twitter_handle'      => '',
            'maintenance_mode'    => false,
            'maintenance_message' => 'We are currently upgrading the site. Please check back soon.',
        ];
    }
}
