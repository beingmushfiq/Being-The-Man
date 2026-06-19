'use client';

import React, { useState } from 'react';
import { 
  Award, Shield, Check, Star, AlertCircle, ShoppingBag, Eye, 
  TrendingUp, Compass, Bookmark, UserCheck, ChevronDown, Home, BookOpen, DollarSign, HelpCircle 
} from 'lucide-react';
import Book3D from './Book3D';
import CheckoutModal from './CheckoutModal';
import { 
  BOOK_DATA, REVIEWS, FAQ_ITEMS, PROBLEM_CARDS, 
  TRANSFORMATION_BULLETS, INSIDE_TOPICS 
} from './content';

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const openCheckout = () => {
    setIsModalOpen(true);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const sections = [
    { label: 'Clarity', id: 'clarity', icon: Compass },
    { label: 'Presence', id: 'presence', icon: TrendingUp },
    { label: 'Outcomes', id: 'outcomes', icon: Award },
    { label: 'Inside', id: 'whats-inside', icon: BookOpen },
    { label: 'Reviews', id: 'reviews', icon: Star },
    { label: 'Pricing', id: 'pricing', icon: DollarSign },
    { label: 'FAQ', id: 'faq', icon: HelpCircle },
  ];

  return (
    <div id="top" className="bg-brand-dark min-h-screen font-sans overflow-x-hidden selection:bg-brand-gold/30 selection:text-brand-gold-light pb-24 md:pb-0">
      
      {/* Premium Header/Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-45 bg-brand-dark/65 backdrop-blur-md border-b border-brand-gold/10 py-4 transition-all">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex justify-between items-center">
          <a href="#top" className="flex items-center gap-3 group transition-transform duration-300 hover:scale-[1.02]">
            <img 
              src="/logo.png" 
              alt="Being MAN" 
              className="h-10 w-auto object-contain brightness-110" 
            />
            <span className="font-serif font-bold text-xl tracking-wider text-gold-gradient hidden sm:inline-block">
              BEING THE MAN
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            {sections.map((sec) => (
              <a 
                key={sec.id} 
                href={`#${sec.id}`} 
                className="text-xs font-semibold uppercase tracking-wider text-brand-gray hover:text-brand-gold transition-colors duration-200"
              >
                {sec.label}
              </a>
            ))}
          </div>

          <button 
            onClick={openCheckout}
            className="bg-gold-gradient text-brand-dark font-bold text-xs md:text-sm px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-brand-gold/20 transition-all duration-300 transform hover:-translate-y-[1px]"
          >
            Buy Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 md:py-40 bg-gradient-to-b from-brand-navy/30 via-brand-dark to-brand-dark overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(212,175,55,0.08)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Details */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
            <span className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/25 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider text-brand-gold-light">
              <Award size={14} className="text-brand-gold" />
              MEN'S CONFIDENCE & PRESENTATION GUIDE
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-[1.15] text-brand-light">
              আপনার পোশাক কি শুধু শরীর ঢাকে, নাকি <span className="text-gold-gradient">উপস্থিতি তৈরি করে?</span>
            </h1>
            
            <p className="text-base md:text-lg text-brand-gray leading-relaxed">
              ঠিক Fit, সঠিক Colour, আর শক্তিশালী Presence এর মাধ্যমে আপনি আরও Sharp, আরও Confident, আরও Respectable দেখাতে পারবেন। বেশি কাপড় কিনে নয়, কীভাবে নিজেকে carry করতে হয় সেটা শিখেই।
            </p>
            
            <div className="flex flex-wrap gap-4 w-full md:w-auto pt-2">
              <button 
                onClick={openCheckout}
                className="w-full md:w-auto bg-gold-gradient text-brand-dark font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2.5 shadow-lg shadow-brand-gold/10 hover:opacity-95 transition-opacity"
              >
                <ShoppingBag size={18} /> Buy Now
              </button>
              <a 
                href="#whats-inside"
                className="w-full md:w-auto border border-brand-gold/30 bg-brand-navy/35 hover:bg-brand-navy/60 text-brand-gold-light font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-2.5 transition-colors"
              >
                <Eye size={18} /> ভিতরে কী শিখবেন দেখুন
              </a>
            </div>

            <p className="text-xs text-brand-gray border-l-2 border-brand-gold pl-4 mt-2 italic">
              যারা ভালো দেখতে চায়, কিন্তু flashy না হয়ে classy, confident আর intentional look build করতে চায়, তাদের জন্য।
            </p>
          </div>

          {/* Right Hero - Interactive 3D Book */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <Book3D />
          </div>
        </div>
      </header>

      {/* 2. Problem Section */}
      <section id="clarity" className="py-20 border-t border-brand-gold/5 bg-brand-navy/10 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-brand-light">
            সমস্যা আপনার wardrobe না। <br className="hidden md:inline" />
            <span className="text-gold-gradient">সমস্যা হলো clarity-এর অভাব।</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {PROBLEM_CARDS.map((card, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl text-left border border-brand-gold/10 hover:border-brand-gold/30 transition-all duration-300">
                <div className="text-3xl font-serif text-brand-gold/30 font-bold mb-4">{card.num}</div>
                <h3 className="text-lg font-bold text-brand-light mb-2">{card.title}</h3>
                <p className="text-sm text-brand-gray leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="glass-panel p-6 rounded-2xl max-w-2xl mx-auto border border-brand-gold/5">
            <p className="text-sm text-brand-gray mb-4 font-semibold uppercase tracking-wider">
              এর ফলে সাধারণত যা ঘটে:
            </p>
            <ul className="text-left space-y-3 text-sm text-brand-light/95 max-w-lg mx-auto">
              <li className="flex items-start gap-2.5">
                <span className="text-brand-gold">▪</span> Closet ভর্তি দামি পোশাক, কিন্তু পরার সময়ে মানানসই কম্বিনেশন খুঁজে পাওয়া যায় না।
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-brand-gold">▪</span> টাকা খরচ ঠিকই হচ্ছে, কিন্তু নিজের ওভারঅল স্টাইল ও লুকের কোনো পরিবর্তন হচ্ছে না।
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-brand-gold">▪</span> আয়নার সামনে দাঁড়িয়ে প্রতিবার মনে হয়, “কোথাও যেন কিছু একটা missing”।
              </li>
            </ul>
          </div>

          <p className="mt-12 text-lg md:text-xl font-serif italic text-gold-gradient">
            “আপনি হয়তো আরও বেশি কাপড়ের অভাবে ভুগছেন না। আপনার দরকার better selection, better fit, better presence.”
          </p>
        </div>
      </section>

      {/* 3. Agitate Pain Section */}
      <section id="presence" className="py-20 border-t border-brand-gold/5 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-light mb-4">
              ভুল পোশাক শুধু look নষ্ট করে না, impression ও নষ্ট করে।
            </h2>
            <p className="text-brand-gray text-sm md:text-base">
              আপনি কিছু না বললেও, মানুষ আপনার বাহ্যিক স্টাইল দেখে আপনার আত্মবিশ্বাস, সচেতনতা এবং লিডারশিপ স্কিল সম্পর্কে সিদ্ধান্ত নিয়ে নেয়।
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Before vs After Card */}
            <div className="lg:col-span-7 glass-panel p-6 md:p-8 rounded-2xl border border-brand-gold/15">
              <h3 className="text-lg font-semibold text-brand-gold mb-6 uppercase tracking-wider">
                Visual Impact: Before vs After
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-brand-gold/10">
                <div className="pb-6 md:pb-0">
                  <span className="inline-block text-[10px] font-bold tracking-widest bg-red-950/40 border border-red-500/20 text-red-400 px-3 py-1 rounded-full mb-4">
                    SLOPPY STYLE (BEFORE)
                  </span>
                  <ul className="space-y-3 text-xs text-brand-gray/90 text-left">
                    <li className="flex items-center gap-2">❌ আলগা বা খুব টাইট ফিটিং শার্ট ও প্যান্ট</li>
                    <li className="flex items-center gap-2">❌ স্কিন টোনের সাথে অমিল অনুজ্জ্বল রঙ</li>
                    <li className="flex items-center gap-2">❌ বসা বা ঝুঁকে থাকা দুর্বল পোশ্চার</li>
                    <li className="flex items-center gap-2">❌ ভিড়ের মধ্যে গড়পড়তা বা সাধারণ ইম্প্রেশন</li>
                  </ul>
                </div>
                <div className="pt-6 md:pt-0 md:pl-6">
                  <span className="inline-block text-[10px] font-bold tracking-widest bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full mb-4">
                    SHARP MASCULINE (AFTER)
                  </span>
                  <ul className="space-y-3 text-xs text-brand-light text-left">
                    <li className="flex items-center gap-2">✅ বডি অনুযায়ী পারফেক্ট শোল্ডার ও ওয়েস্ট ফিট</li>
                    <li className="flex items-center gap-2">✅ কালার হারমোনি ও কনট্রাস্ট যা চেহারা ফুটিয়ে তোলে</li>
                    <li className="flex items-center gap-2">✅ সোজা কাঁধ ও আত্মবিশ্বাসী আকর্ষণীয় পোশ্চার</li>
                    <li className="flex items-center gap-2">✅ যেকোনো মিটিং বা প্রোগ্রামে এলিট উপস্থিতি</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Bullet Points */}
            <div className="lg:col-span-5 flex flex-col gap-6 text-left">
              <div className="flex gap-4">
                <div className="mt-1 bg-red-950/40 p-2.5 rounded-lg border border-red-500/15">
                  <AlertCircle className="text-red-400" size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-light text-base">চাকরি ও ইন্টারভিউতে দুর্বল প্রথম ইম্প্রেশন</h4>
                  <p className="text-xs text-brand-gray mt-1 leading-relaxed">প্রথম কয়েক সেকেন্ডেই আপনার যোগ্যতা মূল্যায়নের আগেই স্টাইল দিয়ে আপনার বিচার হয়ে যায়।</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 bg-red-950/40 p-2.5 rounded-lg border border-red-500/15">
                  <AlertCircle className="text-red-400" size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-light text-base">মিটিং বা নেটওয়ার্কিং-এ সাধারণ গড়পড়তা উপস্থিতি</h4>
                  <p className="text-xs text-brand-gray mt-1 leading-relaxed">রুচিশীল পোশাকের অভাবে গুরুত্বপূর্ণ প্রফেশনাল কমিউনিটিতে মানুষ আপনাকে সিরিয়াসলি নেয় না।</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 bg-red-950/40 p-2.5 rounded-lg border border-red-500/15">
                  <AlertCircle className="text-red-400" size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-light text-base">সামাজিক ও পারিবারিক অনুষ্ঠানে কম আত্মবিশ্বাস</h4>
                  <p className="text-xs text-brand-gray mt-1 leading-relaxed">নিজের ড্রেসিং সেন্স নিয়ে সন্দেহ থাকায় সব জায়গায় নিজেকে আড়াল করে রাখার প্রবণতা তৈরি হয়।</p>
                </div>
              </div>
              
              <div className="mt-4 border-l-2 border-brand-gold pl-4 text-sm italic text-brand-gold-light leading-relaxed">
                “ভালো পোশাক মানে শুধু stylish হওয়া না। ভালো পোশাক মানে room-এ ঢুকেই respect gain করা।”
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Transformation Promise */}
      <section className="py-20 bg-brand-navy/5 border-t border-brand-gold/5">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="glass-panel p-8 md:p-12 rounded-3xl border border-brand-gold/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/5 to-transparent pointer-events-none" />
            
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-center text-brand-gold mb-4 leading-snug">
              এই গাইডটি আপনাকে শিখাবে কীভাবে পোশাককে confidence tool হিসেবে ব্যবহার করবেন।
            </h2>
            <p className="text-center text-sm md:text-base text-brand-light/95 mb-8">
              এই বই পড়ার পর আপনি শুধু “ভালো dress” করবেন না, আপনি জানবেন কীভাবে:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TRANSFORMATION_BULLETS.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-brand-dark/40 p-4 rounded-xl border border-brand-gold/5">
                  <Check className="text-emerald-400 mt-0.5 shrink-0" size={16} />
                  <span className="text-sm md:text-base text-brand-light">{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Result-Focused Benefits */}
      <section id="outcomes" className="py-20 border-t border-brand-gold/5 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-light">
              আপনি কী পাবেন? Feature না, <span className="text-gold-gradient">real result বলি।</span>
            </h2>
            <p className="text-brand-gray text-sm mt-2">
              Practical men's guidelines that translate to everyday confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 rounded-2xl border border-brand-gold/10 hover:border-brand-gold/30 transition-all duration-300">
              <TrendingUp className="text-brand-gold mb-6" size={32} />
              <h3 className="text-lg font-bold text-brand-light mb-3">১. Polished ও High Value লুক</h3>
              <p className="text-sm text-brand-gray leading-relaxed">দামি কাপড় নয়, বরং সঠিকভাবে ম্যাচ করা পোশাক আপনাকে এলিট ও আকর্ষণীয় করে তোলে।</p>
            </div>
            <div className="glass-panel p-8 rounded-2xl border border-brand-gold/10 hover:border-brand-gold/30 transition-all duration-300">
              <Compass className="text-brand-gold mb-6" size={32} />
              <h3 className="text-lg font-bold text-brand-light mb-3">২. বাজেট ফ্রেন্ডলি ওয়ার্ডরোব</h3>
              <p className="text-sm text-brand-gray leading-relaxed">অপ্রয়োজনীয় কেনাকাটা কমবে। এমন পোশাক কিনবেন যা একাধিক কম্বিনেশনে বারবার পরা যায়।</p>
            </div>
            <div className="glass-panel p-8 rounded-2xl border border-brand-gold/10 hover:border-brand-gold/30 transition-all duration-300">
              <UserCheck className="text-brand-gold mb-6" size={32} />
              <h3 className="text-lg font-bold text-brand-light mb-3">৩. বডি টাইপ অনুযায়ী সঠিক পোশাক</h3>
              <p className="text-sm text-brand-gray leading-relaxed">আপনার বডি ফ্রেমকে কীভাবে সবচেয়ে ব্যালেন্সড এবং স্ট্রং দেখাতে হবে তা নিখুঁতভাবে বুঝবেন।</p>
            </div>
            <div className="glass-panel p-8 rounded-2xl border border-brand-gold/10 hover:border-brand-gold/30 transition-all duration-300">
              <Award className="text-brand-gold mb-6" size={32} />
              <h3 className="text-lg font-bold text-brand-light mb-3">৪. স্কিন টোন ও রঙের ম্যাচিং</h3>
              <p className="text-sm text-brand-gray leading-relaxed">আর কোনো দ্বিধা নয়। যে রংগুলো পরলে আপনার চেহারাকে এনার্জেটিক ও ফ্রেশ দেখাবে তা জানবেন।</p>
            </div>
            <div className="glass-panel p-8 rounded-2xl border border-brand-gold/10 hover:border-brand-gold/30 transition-all duration-300">
              <Bookmark className="text-brand-gold mb-6" size={32} />
              <h3 className="text-lg font-bold text-brand-light mb-3">৫. সম্পূর্ণ নতুন ইম্প্রেশন</h3>
              <p className="text-sm text-brand-gray leading-relaxed">একই পোশাক, কিন্তু সঠিক ফিটিং এবং পোশ্চার যুক্ত হয়ে আপনার ব্যক্তিত্বকে রিডিফাইন করবে।</p>
            </div>
            <div className="glass-panel p-8 rounded-2xl border border-brand-gold/10 hover:border-brand-gold/30 transition-all duration-300">
              <Shield className="text-brand-gold mb-6" size={32} />
              <h3 className="text-lg font-bold text-brand-light mb-3">৬. কনফিডেন্ট ড্রেসিং মাইন্ডসেট</h3>
              <p className="text-sm text-brand-gray leading-relaxed">হুজুগে নয়, নিজের সচেতন বোঝাপড়া থেকে কাপড় পরে প্রতিবার আয়নার সামনে দাঁড়িয়ে ভালো ফিল করবেন।</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Who is this for */}
      <section className="py-20 bg-brand-navy/10 border-t border-brand-gold/5">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-serif font-bold text-center text-brand-light mb-12">
            এই বইটি যাদের জন্য সবচেয়ে useful
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "যারা ভালো দেখতে চায়, কিন্তু flashy হতে চায় না",
              "যারা প্রফেশনাল ও কর্পোরেট পরিবেশে দারুণ ইম্প্রেশন তৈরি করতে চায়",
              "যারা নিজের বডি টাইপ অনুযায়ী SMARTLY ড্রেসআপ করতে চায়",
              "যারা শপিং করার সময় বারবার ভুল জিনিস কিনে আফসোস করে",
              "যারা কম পোশাকে বেশি আকর্ষণীয় আউটফিট ডিজাইন করতে চায়",
              "যারা প্রাকৃতিকভাবে নিজের ব্যক্তিগত আত্মবিশ্বাস বাড়াতে চায়"
            ].map((text, idx) => (
              <div key={idx} className="bg-brand-dark/50 border border-brand-gold/5 p-5 rounded-xl text-left text-sm md:text-base text-brand-light">
                <span className="text-brand-gold mr-3">✦</span> {text}
              </div>
            ))}
          </div>
          
          <p className="text-center text-xs text-brand-gray mt-12 border-t border-brand-gold/10 pt-6">
            * এটা ট্রেন্ড-চেজিং ফ্যাশন বুক না। এটা practical men’s confidence and appearance guide।
          </p>
        </div>
      </section>

      {/* 7. What's Inside */}
      <section id="whats-inside" className="py-20 border-t border-brand-gold/5 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-brand-light mb-16">
            বইয়ের ভিতরে কী আছে, আর কেন সেটা <span className="text-gold-gradient">আপনার জন্য important</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INSIDE_TOPICS.map((topic, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl border border-brand-gold/10">
                <h4 className="text-lg font-bold text-brand-gold mb-3 font-serif">{topic.title}</h4>
                <p className="text-sm text-brand-gray leading-relaxed">{topic.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Visual Value Breakdown */}
      <section className="py-20 bg-brand-navy/5 border-t border-brand-gold/5">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-serif font-bold text-brand-light mb-16">
            একটি বই, কিন্তু impact হবে আপনার daily life এ
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mx-auto mb-4 text-brand-gold">
                <Star size={20} />
              </div>
              <h4 className="font-bold text-brand-light text-base mb-2">Daily Life</h4>
              <p className="text-xs text-brand-gray leading-relaxed">সকালে আলমারির সামনে দাঁড়িয়ে চিন্তা করার ঝামেলা শেষ। কম সময়ে রেডি হওয়া সহজ হবে।</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mx-auto mb-4 text-brand-gold">
                <TrendingUp size={20} />
              </div>
              <h4 className="font-bold text-brand-light text-base mb-2">Career / Corporate</h4>
              <p className="text-xs text-brand-gray leading-relaxed">অফিস, ক্লায়েন্ট মিটিং বা ইন্টারভিউতে আপনার প্রফেশনাল ও এলিট প্রথম ইম্প্রেশন তৈরি হবে।</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mx-auto mb-4 text-brand-gold">
                <Compass size={20} />
              </div>
              <h4 className="font-bold text-brand-light text-base mb-2">Social Life</h4>
              <p className="text-xs text-brand-gray leading-relaxed">বন্ধু, সামাজিক ডিনার বা ডেটে আপনি হবেন আকর্ষণীয় এবং রুচিশীল ব্যক্তিত্ব।</p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center mx-auto mb-4 text-brand-gold">
                <Shield size={20} />
              </div>
              <h4 className="font-bold text-brand-light text-base mb-2">Confidence</h4>
              <p className="text-xs text-brand-gray leading-relaxed">নিজেকে দারুণ ক্যারি করতে পারায় নিজের লুক নিয়ে দ্বিধাবোধ থাকবে না সব জায়গায়।</p>
            </div>
          </div>

          <p className="mt-16 text-lg md:text-xl font-serif italic text-gold-gradient">
            “কাপড় বদলালে look বদলায়। কিন্তু clarity এলে presence বদলায়।”
          </p>
        </div>
      </section>

      {/* 9. Offer Stack / Bonus */}
      <section className="py-20 border-t border-brand-gold/5 bg-brand-navy/10">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <div className="glass-panel p-8 md:p-12 rounded-3xl border border-brand-gold/30 bg-gradient-to-br from-brand-gold/5 via-brand-dark to-brand-dark">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-center text-brand-gold mb-8">
              আজই বইটি নিলে আপনি যা পাবেন:
            </h2>
            
            <div className="space-y-4 mb-8">
              {[
                "The Silent Language of Style full digital book",
                "Printable Fit Checklist (সহজ প্রিন্টযোগ্য চেকলিস্ট)",
                "Capsule Wardrobe Planner (কম পোশাকে সর্বোচ্চ স্টাইল প্ল্যানার)",
                "Outfit Clarity Framework (নিজেকে প্রেজেন্ট করার ফ্রেমওয়ার্ক)",
                "Smart Shopping Reference Guide (ভুল কেনাকাটা রোধ করার গাইড)"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-left">
                  <Check className="text-brand-gold shrink-0" size={18} />
                  <span className="text-sm md:text-base text-brand-light font-medium">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-xs md:text-sm text-brand-gray text-center border-t border-brand-gold/10 pt-6 italic">
              এসব bonus-এর উদ্দেশ্য একটাই: আপনি যেন বই পড়ে motivated হয়ে থেমে না যান, বাস্তবে apply করতে পারেন।
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="reviews" className="py-20 border-t border-brand-gold/5 bg-brand-dark scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-serif font-bold text-center text-brand-light mb-16">
            আমাদের পাঠকদের প্রতিক্রিয়া
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((rev, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl border border-brand-gold/10">
                <div className="flex gap-1 mb-4 text-brand-gold">
                  {[...Array(rev.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-sm text-brand-light/95 italic mb-6 leading-relaxed">
                  "{rev.text}"
                </p>
                <div>
                  <h4 className="text-sm font-bold text-brand-gold-light">{rev.name}</h4>
                  <span className="text-xs text-brand-gray">{rev.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Why Buy Now */}
      <section className="py-20 border-t border-brand-gold/5">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-light mb-6">
            কেন এখনই শুরু করা উচিত?
          </h2>
          <p className="text-brand-gray text-sm md:text-base mb-6 leading-relaxed">
            আপনি যদি আজও একই confusion নিয়ে থাকেন, তাহলে ৩ মাস পরেও একই wardrobe frustration, same shopping mistake, same weak impression নিয়ে থাকবেন।
          </p>
          <p className="text-brand-light text-sm md:text-base mb-8 leading-relaxed">
            কিন্তু আপনি যদি আজ শুরু করেন, তাহলে খুব কম সময়ের মধ্যে আপনি smarter clothing decisions নিতে পারবেন, নিজের লুক নিয়ে intentional হবেন এবং মানুষের সামনে solid impression তৈরি করতে পারবেন।
          </p>
          <div className="inline-block bg-brand-gold/10 border border-brand-gold/25 px-6 py-3 rounded-xl text-brand-gold-light font-bold text-sm md:text-base">
            Style overnight bodlay na. Kintu clarity ekdinei shuru hote pare.
          </div>
        </div>
      </section>

      {/* 11. Price + CTA */}
      <section id="pricing" className="py-20 border-t border-brand-gold/5 bg-brand-navy/10 scroll-mt-20">
        <div className="max-w-2xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-light mb-6">
            নিজের presence upgrade করার এই investment কি worth it? Absolutely.
          </h2>
          <p className="text-brand-gray text-sm mb-12 leading-relaxed">
            একটি ভুল কেনাকাটার দামই অনেক সময় এই বইয়ের দামের চেয়ে বেশি। কিন্তু এই বই আপনাকে বারবার ভুল কেনা, ভুল fit, wrong color, and weak presentation থেকে বাঁচাতে পারে।
          </p>

          <div className="glass-panel p-8 md:p-10 rounded-3xl border border-brand-gold/30 relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-dark text-[10px] font-extrabold tracking-widest px-4 py-1 rounded-full">
              LAUNCH SPECIAL OFFER
            </span>
            
            <div className="flex justify-center items-baseline gap-3 my-6">
              <span className="text-lg text-brand-gray line-through">৳১,০০০</span>
              <h2 className="text-5xl font-bold text-brand-gold">৳{BOOK_DATA.launchPriceBdt}</h2>
            </div>
            
            <p className="text-xs text-brand-gray mb-8">
              অথবা আন্তর্জাতিক কার্ডধারীদের জন্য মাত্র ${BOOK_DATA.launchPriceUsd} (Regular ${BOOK_DATA.regularPriceUsd})
            </p>

            <div className="space-y-4">
              <button 
                onClick={openCheckout}
                className="w-full bg-gold-gradient text-brand-dark font-bold py-4 rounded-xl shadow-lg shadow-brand-gold/10 hover:opacity-95 transition-opacity"
              >
                Buy Now
              </button>
              <button 
                onClick={openCheckout}
                className="w-full bg-brand-navy border border-brand-gold/30 hover:bg-brand-navy/80 text-brand-gold-light font-bold py-3.5 rounded-xl transition-all"
              >
                আজ থেকেই Sharp দেখানো শুরু করুন
              </button>
            </div>
            
            <p className="text-[10px] text-brand-gray mt-6">
              Instant digital access. যেকোনো সময়, যেকোনো device থেকে পড়তে পারবেন।
            </p>
          </div>
        </div>
      </section>

      {/* 12. FAQ */}
      <section id="faq" className="py-20 border-t border-brand-gold/5 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-serif font-bold text-center text-brand-light mb-12">
            সাধারণ কিছু প্রশ্ন (FAQ)
          </h2>
          
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <div 
                key={idx} 
                className="glass-panel rounded-xl border border-brand-gold/10 cursor-pointer overflow-hidden transition-all duration-300"
                onClick={() => toggleFaq(idx)}
              >
                <div className="flex justify-between items-center p-5 font-semibold text-brand-light text-sm md:text-base">
                  <span>{item.q}</span>
                  <ChevronDown 
                    size={16} 
                    className="text-brand-gold transition-transform duration-300"
                    style={{ transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </div>
                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-brand-gray border-t border-brand-gold/5 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 border-t border-brand-gold/5 bg-gradient-to-b from-brand-dark to-brand-navy/40">
        <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gold-gradient mb-6">
            আপনার style আপনার হয়ে কথা বলুক।
          </h2>
          <p className="text-brand-light text-base mb-10 leading-relaxed">
            আপনি room-এ ঢোকার আগেই আপনার পোশাক, আপনার posture, your presence একটা message পাঠায়। প্রশ্ন হলো, সেই message কি random? নাকি intentional?
          </p>
          <button 
            onClick={openCheckout}
            className="bg-gold-gradient text-brand-dark font-extrabold px-10 py-5 rounded-xl shadow-lg shadow-brand-gold/25 hover:opacity-95 transition-opacity text-base"
          >
            💼 Get Instant Access — Download the Guide
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-brand-gold/5 bg-brand-dark">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-gray">
          <p>© {new Date().getFullYear()} Being The Man. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#whats-inside" className="hover:text-brand-gold transition-colors">What's Inside</a>
            <a href="#pricing" className="hover:text-brand-gold transition-colors">Pricing</a>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-45 bg-brand-dark/70 backdrop-blur-lg border-t border-brand-gold/15 py-3 px-4 shadow-2xl">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <a href="#top" className="flex flex-col items-center gap-1 text-brand-gray hover:text-brand-gold transition-colors duration-200">
            <Home size={18} />
            <span className="text-[9px] font-medium tracking-wider uppercase">Home</span>
          </a>
          {/* Render selected sections to fit perfectly on mobile screens */}
          {sections.filter(s => ['clarity', 'presence', 'whats-inside', 'pricing'].includes(s.id)).map((sec) => {
            const Icon = sec.icon;
            return (
              <a key={sec.id} href={`#${sec.id}`} className="flex flex-col items-center gap-1 text-brand-gray hover:text-brand-gold transition-colors duration-200">
                <Icon size={18} />
                <span className="text-[9px] font-medium tracking-wider uppercase">{sec.label}</span>
              </a>
            );
          })}
          <button 
            onClick={openCheckout} 
            className="flex flex-col items-center gap-1 bg-gold-gradient text-brand-dark px-3 py-1.5 rounded-lg font-bold text-[9px] uppercase tracking-wider shadow-md shadow-brand-gold/10"
          >
            <ShoppingBag size={14} />
            <span>Buy</span>
          </button>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        launchPriceBdt={BOOK_DATA.launchPriceBdt}
        launchPriceUsd={BOOK_DATA.launchPriceUsd}
      />
    </div>
  );
}
