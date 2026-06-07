-- Create Products Table
CREATE TABLE products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    regular_price_bdt NUMERIC(10, 2) NOT NULL,
    launch_price_bdt NUMERIC(10, 2) NOT NULL,
    regular_price_usd NUMERIC(10, 2) NOT NULL,
    launch_price_usd NUMERIC(10, 2) NOT NULL,
    is_launch_offer BOOLEAN DEFAULT TRUE,
    file_url TEXT, -- URL to the PDF book download
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create Orders Table
CREATE TABLE orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID REFERENCES products(id),
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'BDT', -- BDT or USD
    payment_status VARCHAR(20) DEFAULT 'pending', -- pending, completed, failed
    payment_method VARCHAR(50), -- bKash, Nagad, Stripe, Card, WhatsApp, Gumroad
    gateway_txn_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create Application Settings (CMS Config)
CREATE TABLE app_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL
);

-- Insert a default product for the book
INSERT INTO products (title, description, regular_price_bdt, launch_price_bdt, regular_price_usd, launch_price_usd, is_launch_offer)
VALUES (
    'The Silent Language of Style',
    'A premium guide for men to master fit, color, posture, and presence.',
    1000.00,
    490.00,
    19.99,
    9.99,
    true
) ON CONFLICT DO NOTHING;

-- Insert default app settings
INSERT INTO app_settings (key, value)
VALUES (
    'checkout_config',
    '{"active_option": "A", "whatsapp_number": "+8801700000000", "gumroad_url": "https://beingman.gumroad.com/l/stylelanguage"}'
) ON CONFLICT DO NOTHING;
