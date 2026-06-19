<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Being The Man - Control Center</title>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
    
    <style>
        :root {
            --color-bg: #050A18;
            --color-card: #09122C;
            --color-gold: #D4AF37;
            --color-gold-light: #F3E5AB;
            --color-text: #E2E8F0;
            --color-muted: #94A3B8;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            background-color: var(--color-bg);
            color: var(--color-text);
            font-family: 'Plus Jakarta Sans', sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem 1.5rem;
            background-image: 
                radial-gradient(circle at 10% 20%, rgba(212, 175, 55, 0.05) 0%, transparent 40%),
                radial-gradient(circle at 90% 80%, rgba(212, 175, 55, 0.03) 0%, transparent 40%);
        }

        .container {
            max-width: 600px;
            width: 100%;
            background: rgba(9, 18, 44, 0.4);
            border: 1px solid rgba(212, 175, 55, 0.15);
            backdrop-filter: blur(16px);
            border-radius: 24px;
            padding: 3rem 2rem;
            text-align: center;
            box-shadow: 0 20px 45px rgba(0, 0, 0, 0.5), 
                        inset 0 0 20px rgba(212, 175, 55, 0.02);
        }

        .logo-container {
            margin-bottom: 2rem;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }

        .logo-placeholder {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            border: 2px solid var(--color-gold);
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Cinzel', serif;
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--color-gold);
            box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
            background: rgba(5, 10, 24, 0.8);
        }

        h1 {
            font-family: 'Cinzel', serif;
            font-size: 2.2rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            margin-bottom: 0.75rem;
            background: linear-gradient(135deg, var(--color-gold-light) 0%, var(--color-gold) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        p {
            color: var(--color-muted);
            font-size: 0.95rem;
            line-height: 1.6;
            margin-bottom: 2.5rem;
            max-width: 440px;
            margin-left: auto;
            margin-right: auto;
        }

        .buttons-grid {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .btn {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.1rem;
            border-radius: 12px;
            font-weight: 600;
            font-size: 0.95rem;
            text-decoration: none;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            border: 1px solid transparent;
        }

        .btn-primary {
            background: linear-gradient(135deg, var(--color-gold) 0%, #B8860B 100%);
            color: #050A18;
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.2);
        }

        .btn-primary:hover {
            opacity: 0.95;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(212, 175, 55, 0.35);
        }

        .btn-secondary {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(212, 175, 55, 0.2);
            color: var(--color-gold-light);
        }

        .btn-secondary:hover {
            background: rgba(212, 175, 55, 0.05);
            border-color: var(--color-gold);
            transform: translateY(-2px);
        }

        .btn-tertiary {
            background: transparent;
            border: 1px solid rgba(255, 255, 255, 0.08);
            color: var(--color-text);
        }

        .btn-tertiary:hover {
            background: rgba(255, 255, 255, 0.03);
            border-color: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
        }

        .footer {
            margin-top: 3rem;
            font-size: 0.8rem;
            color: var(--color-muted);
            letter-spacing: 0.05em;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo-container">
            <div class="logo-placeholder">BTM</div>
        </div>

        <h1>BEING THE MAN</h1>
        <p>Welcome to the core service and control system backend. Please select a destination below to proceed.</p>

        <div class="buttons-grid">
            <!-- Visit Site -->
            <a href="http://localhost:3000" class="btn btn-primary" target="_blank">
                Visit Live Store Front
            </a>

            <!-- Admin Login -->
            <a href="/admin/login" class="btn btn-secondary">
                Control Panel / Admin Login
            </a>

            <!-- API Endpoints -->
            <a href="/api" class="btn btn-tertiary" target="_blank">
                Browse API Documentation
            </a>
        </div>

        <div class="footer">
            &copy; {{ date('Y') }} BEING THE MAN. ALL RIGHTS RESERVED.
        </div>
    </div>
</body>
</html>
