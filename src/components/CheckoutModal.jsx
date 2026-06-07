import React, { useState, useEffect } from 'react';
import { X, Shield, Check, CreditCard, MessageSquare, ExternalLink } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function CheckoutModal({ isOpen, onClose, product, activeTab, setActiveTab }) {
  const [currency, setCurrency] = useState('BDT'); // BDT or USD
  const [method, setMethod] = useState('gateway'); // gateway, gumroad, whatsapp
  const [step, setStep] = useState(1); // 1: Info & Method, 2: Payment Details / Processing, 3: Success
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });

  const launchPrice = currency === 'BDT' ? product.launch_price_bdt : product.launch_price_usd;
  const regularPrice = currency === 'BDT' ? product.regular_price_bdt : product.regular_price_usd;
  const symbol = currency === 'BDT' ? '৳' : '$';

  useEffect(() => {
    if (activeTab) {
      setMethod(activeTab);
    }
  }, [activeTab]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitInfo = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('অনুগ্রহ করে সব তথ্য পূরণ করুন।');
      return;
    }

    if (method === 'gumroad') {
      // Direct Gumroad redirect
      window.open('https://beingman.gumroad.com/l/stylelanguage', '_blank');
      onClose();
      return;
    }

    if (method === 'whatsapp') {
      // Build WhatsApp message and redirect
      const message = `Hello Being The Man! I want to order the ebook "The Silent Language of Style".\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nPrice: ${symbol}${launchPrice} (${currency})\nMethod: WhatsApp Checkout`;
      const whatsappUrl = `https://wa.me/8801700000000?text=${encodeURIComponent(message)}`;
      
      // Save order locally/database first
      await saveOrder('WhatsApp', 'pending');
      window.open(whatsappUrl, '_blank');
      setStep(3); // Success/Manual processing step
      return;
    }

    // Go to gateway payment simulation
    setStep(2);
  };

  const saveOrder = async (payMethod, status, txnId = '') => {
    const orderData = {
      product_id: product.id,
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      total_amount: launchPrice,
      currency: currency,
      payment_status: status,
      payment_method: payMethod,
      gateway_txn_id: txnId || `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    };

    try {
      const { data, error } = await supabase.from('orders').insert([orderData]);
      if (error) throw error;
    } catch (err) {
      console.log('Supabase offline or error, saving to local storage fallback.');
      const localOrders = JSON.parse(localStorage.getItem('btm_orders') || '[]');
      localOrders.push({ ...orderData, id: Math.random().toString(), created_at: new Date().toISOString() });
      localStorage.setItem('btm_orders', JSON.stringify(localOrders));
    }
  };

  const handleSimulatePayment = async (payType) => {
    setLoading(true);
    // Simulate gateway response time
    setTimeout(async () => {
      await saveOrder(payType, 'completed');
      setLoading(false);
      setStep(3);
    }, 2000);
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle} className="premium-card">
        {/* Header */}
        <div style={modalHeaderStyle}>
          <div>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--color-primary-light)' }}>
              {step === 3 ? 'অর্ডার সফল হয়েছে!' : 'Upgrade Your Presence'}
            </h3>
            {step !== 3 && <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Secure checkout processing</p>}
          </div>
          <button onClick={onClose} style={closeBtnStyle}><X size={20} /></button>
        </div>

        {/* Step Progress */}
        {step !== 3 && (
          <div style={progressContainerStyle}>
            <div style={{ ...progressBarStyle, width: step === 1 ? '50%' : '100%' }}></div>
          </div>
        )}

        {/* Step 1: Info Collection & Method Select */}
        {step === 1 && (
          <form onSubmit={handleSubmitInfo} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={pricingSummary}>
              <div>
                <span style={launchBadgeStyle}>LAUNCH OFFER</span>
                <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)', display: 'inline-block', marginLeft: '0.5rem' }}>
                  {symbol}{launchPrice}
                </h2>
              </div>
              <span style={{ textDecoration: 'line-through', color: 'var(--color-text-muted)' }}>
                Regular: {symbol}{regularPrice}
              </span>
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>আপনার নাম (Name) *</label>
              <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="যেমন: Aayan Rahman" style={inputStyle} />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>ইমেইল (Email) *</label>
              <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="name@email.com" style={inputStyle} />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>মোবাইল নম্বর (Phone) *</label>
              <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="01XXXXXXXXX" style={inputStyle} />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>পেমেন্ট মেথড সিলেক্ট করুন</label>
              <div style={methodGridStyle}>
                <div onClick={() => setMethod('gateway')} style={method === 'gateway' ? activeMethodStyle : methodCardStyle}>
                  <CreditCard size={18} color={method === 'gateway' ? 'var(--color-primary)' : '#fff'} />
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>Local Payment</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>bKash, Nagad, Cards (SSLCommerz)</div>
                  </div>
                </div>

                <div onClick={() => setMethod('gumroad')} style={method === 'gumroad' ? activeMethodStyle : methodCardStyle}>
                  <ExternalLink size={18} color={method === 'gumroad' ? 'var(--color-primary)' : '#fff'} />
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>Gumroad Checkout</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Redirect to Gumroad platform</div>
                  </div>
                </div>

                <div onClick={() => setMethod('whatsapp')} style={method === 'whatsapp' ? activeMethodStyle : methodCardStyle}>
                  <MessageSquare size={18} color={method === 'whatsapp' ? 'var(--color-primary)' : '#fff'} />
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>WhatsApp / Messenger</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Order directly via chat</div>
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.9rem' }}>
              {method === 'gateway' ? 'পেমেন্ট করুন' : method === 'gumroad' ? 'Gumroad এ যান' : 'WhatsApp এ অর্ডার করুন'}
            </button>
          </form>
        )}

        {/* Step 2: Payment gateway simulation */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', textAlign: 'center', padding: '1rem 0' }}>
            {loading ? (
              <div style={{ padding: '2rem 0' }}>
                <div style={spinnerStyle}></div>
                <p style={{ marginTop: '1.5rem', color: 'var(--color-primary-light)' }}>Secure Payment Connection Initiating...</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Please do not close this window.</p>
              </div>
            ) : (
              <>
                <p style={{ fontSize: '0.95rem' }}>অর্ডার সম্পন্ন করতে নিচের যেকোনো একটি গেটওয়ে অপশন সিলেক্ট করুন:</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                  <button onClick={() => handleSimulatePayment('bKash')} style={bkashBtnStyle}>
                    bKash দিয়ে পে করুন (৳{launchPrice})
                  </button>
                  <button onClick={() => handleSimulatePayment('Nagad')} style={nagadBtnStyle}>
                    Nagad দিয়ে পে করুন (৳{launchPrice})
                  </button>
                  <button onClick={() => handleSimulatePayment('SSLCommerz')} style={sslBtnStyle}>
                    Other Cards / NetBanking (SSLCommerz)
                  </button>
                </div>

                <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: '0.85rem' }}>
                  ← ফিরে যান
                </button>
              </>
            )}
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', textAlign: 'center', padding: '2rem 0' }}>
            <div style={successCircleStyle}>
              <Check size={40} color="#000" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--color-primary-light)', marginBottom: '0.5rem' }}>অভিনন্দন! আপনার অর্ডারটি সফল হয়েছে।</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                আমরা আপনার ইমেইল (<strong style={{ color: '#fff' }}>{formData.email}</strong>) এ পরবর্তী নির্দেশাবলী এবং ডাউনলোড লিংক পাঠিয়ে দিয়েছি।
              </p>
            </div>
            
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '1rem', width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                <span>Customer Name:</span>
                <strong>{formData.name}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                <span>Transaction ID:</span>
                <strong style={{ color: 'var(--color-primary)' }}>BTM-{Math.random().toString(36).substr(2, 6).toUpperCase()}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span>Paid Amount:</span>
                <strong>{symbol}{launchPrice}</strong>
              </div>
            </div>

            <button onClick={onClose} className="btn-primary" style={{ width: '100%' }}>
              ঠিক আছে
            </button>
          </div>
        )}

        {/* Trust Badge Footer */}
        {step !== 3 && (
          <div style={modalFooterTrustStyle}>
            <Shield size={14} color="var(--color-primary)" />
            <span>SSL Secured checkout. 256-bit encryption.</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Inline Styles to guarantee aesthetic perfection
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(5, 10, 24, 0.85)',
  backdropFilter: 'blur(8px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: '1rem'
};

const modalContentStyle = {
  width: '100%',
  maxWidth: '540px',
  backgroundColor: 'var(--color-bg-card)',
  borderRadius: '16px',
  border: '1px solid var(--color-border)',
  maxHeight: '90vh',
  overflowY: 'auto',
  padding: '2rem'
};

const modalHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1.5rem'
};

const closeBtnStyle = {
  background: 'none',
  border: 'none',
  color: 'var(--color-text-muted)',
  cursor: 'pointer',
  padding: '0.25rem',
  transition: 'var(--transition-smooth)'
};

const progressContainerStyle = {
  height: '4px',
  width: '100%',
  backgroundColor: 'var(--color-border)',
  borderRadius: '2px',
  marginBottom: '1.5rem',
  overflow: 'hidden'
};

const progressBarStyle = {
  height: '100%',
  backgroundColor: 'var(--color-primary)',
  transition: 'var(--transition-smooth)'
};

const currencyToggleContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: 'rgba(255, 255, 255, 0.02)',
  padding: '0.6rem 1rem',
  borderRadius: '8px',
  border: '1px solid var(--color-border)'
};

const currencyGroup = {
  display: 'flex',
  gap: '0.5rem'
};

const activeCurrencyBtn = {
  background: 'var(--color-primary)',
  color: '#000',
  border: 'none',
  padding: '0.3rem 0.8rem',
  borderRadius: '4px',
  fontWeight: '700',
  cursor: 'pointer',
  fontSize: '0.8rem'
};

const inactiveCurrencyBtn = {
  background: 'transparent',
  color: 'var(--color-text-muted)',
  border: '1px solid var(--color-border)',
  padding: '0.3rem 0.8rem',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.8rem',
  transition: 'var(--transition-smooth)'
};

const pricingSummary = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
  background: 'rgba(212, 175, 55, 0.05)',
  border: '1px dashed var(--color-primary)',
  borderRadius: '8px'
};

const launchBadgeStyle = {
  backgroundColor: 'var(--color-primary)',
  color: '#000',
  padding: '0.2rem 0.5rem',
  fontSize: '0.7rem',
  fontWeight: '800',
  borderRadius: '4px',
  verticalAlign: 'middle'
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

const inputStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid var(--color-border)',
  color: '#fff',
  padding: '0.8rem',
  borderRadius: '6px',
  outline: 'none',
  fontSize: '0.95rem',
  fontFamily: 'var(--font-english)',
  transition: 'var(--transition-smooth)'
};

const methodGridStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem'
};

const methodCardStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '1rem',
  border: '1px solid var(--color-border)',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'var(--transition-smooth)'
};

const activeMethodStyle = {
  ...methodCardStyle,
  borderColor: 'var(--color-primary)',
  background: 'rgba(212, 175, 55, 0.04)'
};

const modalFooterTrustStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  marginTop: '1.5rem',
  fontSize: '0.75rem',
  color: 'var(--color-text-muted)'
};

const spinnerStyle = {
  width: '40px',
  height: '40px',
  border: '3px solid rgba(212, 175, 55, 0.1)',
  borderTop: '3px solid var(--color-primary)',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  margin: '0 auto'
};

// Simulated dynamic gateways styling
const bkashBtnStyle = {
  backgroundColor: '#E2136E',
  color: '#fff',
  border: 'none',
  padding: '1rem',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: '700',
  cursor: 'pointer',
  transition: 'var(--transition-smooth)'
};

const nagadBtnStyle = {
  backgroundColor: '#F57224',
  color: '#fff',
  border: 'none',
  padding: '1rem',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: '700',
  cursor: 'pointer',
  transition: 'var(--transition-smooth)'
};

const sslBtnStyle = {
  backgroundColor: '#1E2E5D',
  color: '#fff',
  border: 'none',
  padding: '1rem',
  borderRadius: '8px',
  fontSize: '0.95rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'var(--transition-smooth)'
};

const stripeCardFormStyle = {
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid var(--color-border)',
  borderRadius: '8px',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  textAlign: 'left'
};

const successCircleStyle = {
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  backgroundColor: 'var(--color-primary)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 0 30px rgba(212, 175, 55, 0.4)'
};
