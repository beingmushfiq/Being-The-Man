import React from 'react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  launchPriceBdt: number;
  launchPriceUsd: number;
}

export default function CheckoutModal({ isOpen, onClose, launchPriceBdt, launchPriceUsd }: CheckoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-dark/95 backdrop-blur-md" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-lg glass-panel p-6 md:p-8 rounded-2xl shadow-2xl z-10 border border-brand-gold/30">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-brand-gray hover:text-brand-gold transition-colors text-xl font-bold"
        >
          ✕
        </button>

        <div className="flex justify-center mb-4">
          <img 
            src="/logo.png" 
            alt="Being MAN" 
            className="h-14 w-auto object-contain brightness-110" 
          />
        </div>

        <h3 className="text-2xl font-serif text-gold-gradient mb-2 text-center">
          The Silent Language of Style
        </h3>
        <p className="text-sm text-brand-gray text-center mb-6">
          কম্পলিট ডিজিটাল অ্যাক্সেস ও বোনাস প্যাক
        </p>

        {/* Order Form Placeholder */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-gray mb-1">
              আপনার নাম
            </label>
            <input 
              type="text" 
              placeholder="যেমন: আরিফ রহমান" 
              className="w-full bg-brand-dark/60 border border-brand-gold/20 focus:border-brand-gold rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors text-brand-light"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-gray mb-1">
              হোয়াটসঅ্যাপ নম্বর (যেখানে বই পাঠানো হবে)
            </label>
            <input 
              type="tel" 
              placeholder="যেমন: 017XXXXXXXX" 
              className="w-full bg-brand-dark/60 border border-brand-gold/20 focus:border-brand-gold rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors text-brand-light"
            />
          </div>

          {/* Pricing Info */}
          <div className="bg-brand-navy/60 border border-brand-gold/10 p-4 rounded-xl flex justify-between items-center my-6">
            <div>
              <span className="text-xs text-brand-gray block">পরিশোধযোগ্য মূল্য</span>
              <span className="text-lg font-bold text-brand-light">৳{launchPriceBdt} / ${launchPriceUsd}</span>
            </div>
            <span className="text-xs font-bold text-brand-gold bg-brand-gold/10 px-2.5 py-1 rounded-full border border-brand-gold/20">
              ৫০% ছাড় অফার
            </span>
          </div>

          <button className="w-full bg-gold-gradient text-brand-dark font-bold py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-base shadow-lg shadow-brand-gold/10">
            <span>💳 পেমেন্ট করতে এগিয়ে যান (bKash / Card)</span>
          </button>

          <p className="text-[11px] text-brand-gray text-center mt-4">
            * পেমেন্ট সফল হওয়ার সাথে সাথে আপনার হোয়াটসঅ্যাপে বইটির ডিরেক্ট ডাউনলোড লিংক চলে যাবে।
          </p>
        </div>
      </div>
    </div>
  );
}
