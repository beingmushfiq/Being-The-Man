import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Lock, Mail, AlertCircle } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Check if Supabase is using placeholder credentials
    const isPlaceholder = !import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('placeholder-project');

    if (isPlaceholder) {
      // Offline fallback login for demonstration
      if (email === 'admin@beingtheman.com' && password === 'admin123') {
        sessionStorage.setItem('btm_admin_token', 'offline-fallback-token');
        navigate('/admin');
      } else {
        setError('ইমেইল বা পাসওয়ার্ড ভুল হয়েছে। ডেমো ক্রেডেনশিয়াল: admin@beingtheman.com / admin123');
      }
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'লগইন করতে সমস্যা হয়েছে।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={loginPageStyle}>
      <div className="premium-card" style={loginCardStyle}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img src="/logo-transparent.png" alt="Being The Man" style={{ height: '50px', marginBottom: '1rem', objectFit: 'contain' }} onError={(e) => {e.target.src = '/logo.jpg'}} />
          <h2 style={{ fontSize: '1.4rem', color: 'var(--color-primary-light)' }}>Admin Dashboard</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.3rem' }}>শুধুমাত্র অনুমোদিত অ্যাডমিন লগইন</p>
        </div>

        {error && (
          <div style={errorBannerStyle}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>ইমেইল (Email)</label>
            <div style={inputContainerStyle}>
              <Mail size={18} style={iconStyle} />
              <input type="email" required placeholder="admin@beingtheman.com" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
            </div>
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>পাসওয়ার্ড (Password)</label>
            <div style={inputContainerStyle}>
              <Lock size={18} style={iconStyle} />
              <input type="password" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
            {loading ? 'প্রবেশ করা হচ্ছে...' : 'লগইন করুন'}
          </button>
        </form>

        <div style={demoCredentialsStyle}>
          <strong>Demo Login Details:</strong>
          <div>Email: <code style={{ color: 'var(--color-primary-light)' }}>admin@beingtheman.com</code></div>
          <div>Password: <code style={{ color: 'var(--color-primary-light)' }}>admin123</code></div>
        </div>
      </div>
    </div>
  );
}

// Styles
const loginPageStyle = {
  minHeight: '100vh',
  backgroundColor: 'var(--color-bg-deep)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem'
};

const loginCardStyle = {
  width: '100%',
  maxWidth: '420px',
  padding: '2.5rem 2rem'
};

const inputGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem'
};

const labelStyle = {
  fontSize: '0.85rem',
  color: 'var(--color-text-white)',
  fontWeight: '600'
};

const inputContainerStyle = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center'
};

const iconStyle = {
  position: 'absolute',
  left: '1rem',
  color: 'var(--color-text-muted)'
};

const inputStyle = {
  width: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid var(--color-border)',
  color: '#fff',
  padding: '0.8rem 0.8rem 0.8rem 2.8rem',
  borderRadius: '6px',
  outline: 'none',
  fontSize: '0.95rem',
  fontFamily: 'var(--font-english)',
  transition: 'var(--transition-smooth)'
};

const errorBannerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  backgroundColor: 'rgba(239, 68, 68, 0.1)',
  border: '1px solid rgba(239, 68, 68, 0.3)',
  color: '#EF4444',
  padding: '0.8rem',
  borderRadius: '6px',
  fontSize: '0.85rem',
  marginBottom: '1rem'
};

const demoCredentialsStyle = {
  marginTop: '1.5rem',
  padding: '1rem',
  background: 'rgba(255, 255, 255, 0.01)',
  border: '1px dashed var(--color-border)',
  borderRadius: '6px',
  fontSize: '0.8rem',
  color: 'var(--color-text-muted)',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.3rem'
};
