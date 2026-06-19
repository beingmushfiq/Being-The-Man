import { useState, useEffect } from 'react';
import { Shield, ChevronDown, Check, Star, AlertCircle, ShoppingBag, Eye, TrendingUp, Compass, Award, Bookmark, UserCheck } from 'lucide-react';
import CheckoutModal from '../components/CheckoutModal';
import { supabase } from '../supabaseClient';

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('gateway');
  const [openFaq, setOpenFaq] = useState(null);
  const [product, setProduct] = useState({
    id: '12345678-1234-1234-1234-123456789012',
    title: 'The Silent Language of Style',
    regular_price_bdt: 1000,
    launch_price_bdt: 490,
    regular_price_usd: 19.99,
    launch_price_usd: 9.99,
    is_launch_offer: true
  });

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data, error } = await supabase.from('products').select('*').limit(1).single();
        if (data && !error) {
          setProduct(data);
        }
      } catch (e) {
        console.log('Using default product values.', e);
      }
    }
    fetchProduct();
  }, []);

  const openCheckout = (mode = 'gateway') => {
    setActiveTab(mode);
    setIsModalOpen(true);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Mock Reviews
  const reviews = [
    { name: 'আরিফ রহমান', role: 'Corporate Executive', text: 'বইটি পড়ার পর আমার ফিটিং এবং কালার কম্বিনেশন নিয়ে ধারণা পুরোপুরি বদলে গেছে। এখন কর্পোরেট মিটিংয়ে অনেক বেশি আত্মবিশ্বাসী লাগে।', rating: 5 },
    { name: 'ইশতিয়াক আহমেদ', role: 'Software Engineer', text: 'কম জামাকাপড় কিনেও যে এত ক্লাসি লুক তৈরি করা যায়, এটা আগে জানতাম না। ক্যাপসুল ওয়ার্ডরোব গাইডটা আমার অনেক টাকা বাঁচিয়েছে!', rating: 5 },
    { name: 'তাহমিদ চৌধুরী', role: 'Business Owner', text: 'মানুষের সামনে কথা বলার সময় বডি ল্যাঙ্গুয়েজ আর পোশাকে যে একটা কর্তৃত্ব বা অথোরিটি আনা যায়, সেটা এই বইয়ের মাধ্যমে শিখেছি। রিকমেন্ডেড!', rating: 5 }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg-deep)', minHeight: '100vh', fontFamily: 'var(--font-bengali)', paddingBottom: '70px' }}>
      {/* Navigation Bar - Glass Effect */}
      <nav id="hero" style={navStyle}>
        <div className="container" style={navContainerStyle}>
          {/* Clickable Logo + Brand Name → scrolls to top */}
          <button onClick={scrollToTop} style={navBrandStyle}>
            <img
              src="/logo-transparent.png"
              alt="Being The Man"
              style={{ height: '40px', objectFit: 'contain' }}
              onError={(e) => { e.target.src = '/logo.jpg'; }}
            />
            <span style={navBrandNameStyle}>Being The Man</span>
          </button>

          {/* Desktop Segment Nav Links */}
          <div style={navLinksStyle}>
            <button onClick={() => scrollToSection('problem')} style={navLinkBtn}>সমস্যা</button>
            <button onClick={() => scrollToSection('impact')} style={navLinkBtn}>Impact</button>
            <button onClick={() => scrollToSection('benefits')} style={navLinkBtn}>ফলাফল</button>
            <button onClick={() => scrollToSection('whats-inside')} style={navLinkBtn}>Inside</button>
            <button onClick={() => scrollToSection('reviews')} style={navLinkBtn}>Reviews</button>
            <button onClick={() => scrollToSection('pricing')} style={navLinkBtn}>Pricing</button>
          </div>

          <button onClick={() => openCheckout('gateway')} className="btn-primary" style={{ padding: '0.6rem 1.4rem', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
            এখনই নিন
          </button>
        </div>
      </nav>

      {/* Bottom Mobile Navbar */}
      <nav style={bottomNavStyle}>
        <button onClick={scrollToTop} style={bottomNavItem}>
          <span style={bottomNavIcon}>🏠</span>
          <span>Home</span>
        </button>
        <button onClick={() => scrollToSection('whats-inside')} style={bottomNavItem}>
          <span style={bottomNavIcon}>📖</span>
          <span>Inside</span>
        </button>
        <button onClick={() => openCheckout('gateway')} style={{ ...bottomNavItem, color: 'var(--color-primary)' }}>
          <span style={bottomNavIcon}>🛒</span>
          <span>Order</span>
        </button>
        <button onClick={() => scrollToSection('reviews')} style={bottomNavItem}>
          <span style={bottomNavIcon}>⭐</span>
          <span>Reviews</span>
        </button>
        <button onClick={() => scrollToSection('pricing')} style={bottomNavItem}>
          <span style={bottomNavIcon}>💰</span>
          <span>Pricing</span>
        </button>
      </nav>

      {/* 1. HERO SECTION */}
      <header style={heroSectionStyle} className="section-padding">
        <div className="container" style={heroGridStyle}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <span className="badge">
              <Award size={14} color="var(--color-primary)" />
              MEN'S CONFIDENCE & PRESENTATION GUIDE
            </span>
            <h1 style={heroHeadlineStyle} className="gradient-text">
              আপনার পোশাক কি শুধু শরীর ঢাকে, নাকি আপনার উপস্থিতি তৈরি করে?
            </h1>
            <p style={heroSubheadlineStyle}>
              ঠিক Fit, সঠিক Colour, আর শক্তিশালী Presence এর মাধ্যমে আপনি আরও Sharp, আরও Confident, আরও Respectable দেখাতে পারবেন। বেশি কাপড় কিনে নয়, কীভাবে নিজেকে carry করতে হয় সেটা শিখেই।
            </p>
            <div style={heroCtaContainer}>
              <button onClick={() => openCheckout('gateway')} className="btn-primary" style={{ gap: '0.5rem' }}>
                <ShoppingBag size={18} /> এখনই বইটি নিন
              </button>
              <a href="#whats-inside" className="btn-secondary" style={{ gap: '0.5rem' }}>
                <Eye size={18} /> ভিতরে কী শিখবেন দেখুন
              </a>
            </div>
            <p style={heroSupportTextStyle}>
              যারা ভালো দেখতে চায়, কিন্তু flashy না হয়ে classy, confident আর intentional look build করতে চায়, তাদের জন্য।
            </p>

            {/* Badges row */}
            <div style={badgeRowStyle}>
              <div style={miniBadgeStyle}>
                <div style={bulletPointStyle}></div>
                <span>আরও Sharp Look</span>
              </div>
              <div style={miniBadgeStyle}>
                <div style={bulletPointStyle}></div>
                <span>আরও Confident Presence</span>
              </div>
              <div style={miniBadgeStyle}>
                <div style={bulletPointStyle}></div>
                <span>কম খরচে Better Style</span>
              </div>
            </div>
          </div>

          {/* Book Mockup and Visual Vibe */}
          <div style={heroVisualContainer}>
            {/* 3D Book Container */}
            <div style={book3DContainer}>
              <div style={book3D}>
                <div style={bookFront}>
                  <img src="/logo-transparent.png" alt="Being The Man" style={{ width: '80%', marginBottom: '2rem', filter: 'brightness(1.2)' }} />
                  <div style={{ borderTop: '2px solid var(--color-primary)', width: '60%', margin: '1rem 0' }}></div>
                  <h2 style={{ fontSize: '1.6rem', color: '#fff', fontStyle: 'italic', fontFamily: 'var(--font-accent)', margin: '1rem 0' }}>
                    The Silent Language of Style
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-primary-light)', letterSpacing: '0.1em', fontFamily: 'var(--font-english)' }}>
                    FIT • COLOR • PRESENCE
                  </p>
                </div>
                <div style={bookSpine}></div>
                <div style={bookBack}></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. SECTION 2: THE REAL PROBLEM */}
      <section id="problem" style={problemSectionStyle} className="section-padding">
        <div className="container" style={{ maxWidth: '900px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '2rem', color: 'var(--color-primary-light)' }}>
            সমস্যা আপনার wardrobe না। সমস্যা হলো clarity-এর অভাব।
          </h2>
          <div style={problemGrid}>
            <div className="premium-card" style={problemCardStyle}>
              <div style={problemNumStyle}>01</div>
              <h3>সঠিক Fit জানা নেই</h3>
              <p>কোন পোশাক আপনার বডি টাইপে সবচেয়ে ভালো ফিট করে তা জানা না থাকায় পোশাক আলগা বা স্লপি দেখায়।</p>
            </div>
            <div className="premium-card" style={problemCardStyle}>
              <div style={problemNumStyle}>02</div>
              <h3>সঠিক Colour ম্যাচিংয়ের অভাব</h3>
              <p>কোন রং আপনার স্কিন টোনের সাথে মানিয়ে আপনাকে ফ্রেশ দেখায় তা না বুঝে র‍্যান্ডম শপিং করা।</p>
            </div>
            <div className="premium-card" style={problemCardStyle}>
              <div style={problemNumStyle}>03</div>
              <h3>ফিট ও বডি ল্যাঙ্গুয়েজের সম্পর্ক</h3>
              <p>পোশাক ঠিকঠাক হলেও দুর্বল শারীরিক ভঙ্গি (posture) আপনার পুরো আত্মবিশ্বাস ও ইম্প্রেশন শেষ করে দেয়।</p>
            </div>
          </div>

          <div style={problemFailsList}>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>এর ফলে সাধারণত যা ঘটে:</p>
            <ul style={listStyle}>
              <li>Closet ভর্তি দামি পোশাক, কিন্তু পরার সময়ে মানানসই কম্বিনেশন খুঁজে পাওয়া যায় না।</li>
              <li>টাকা খরচ ঠিকই হচ্ছে, কিন্তু নিজের ওভারঅল স্টাইল ও লুকের কোনো পরিবর্তন হচ্ছে না।</li>
              <li>আয়নার সামনে দাঁড়িয়ে প্রতিবার মনে হয়, “কোথাও যেন কিছু একটা missing”।</li>
            </ul>
          </div>

          <div style={psychologicalPunchStyle}>
            আপনি হয়তো আরও বেশি কাপড়ের অভাবে ভুগছেন না। আপনার দরকার better selection, better fit, better presence.
          </div>
        </div>
      </section>

      {/* 3. SECTION 3: AGITATE THE PAIN & INTERACTIVE SLIDER */}
      <section id="impact" style={painSectionStyle} className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem', maxWidth: '800px', margin: '0 auto 3.5rem' }}>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--color-text-white)', marginBottom: '1rem' }}>
              ভুল পোশাক শুধু look নষ্ট করে না, impression ও নষ্ট করে।
            </h2>
            <p style={{ color: 'var(--color-text-muted)' }}>
              আপনি কিছু না বললেও, মানুষ আপনার বাহ্যিক স্টাইল দেখে আপনার আত্মবিশ্বাস, সচেতনতা এবং লিডারশিপ স্কিল সম্পর্কে সিদ্ধান্ত নিয়ে নেয়।
            </p>
          </div>

          <div style={painGridStyle}>
            {/* Interactive Before/After Visualizer */}
            <div className="premium-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--color-primary-light)' }}>
                Visual Impact: Before vs After
              </h3>
              <div style={sliderContainerStyle}>
                <div style={sliderHalfStyle}>
                  <span style={badBadge}>SLOPPY STYLE (BEFORE)</span>
                  <ul style={{ ...listStyle, textAlign: 'left', fontSize: '0.9rem', marginTop: '1rem' }}>
                    <li>❌ আলগা বা খুব টাইট ফিটিং শার্ট ও প্যান্ট</li>
                    <li>❌ স্কিন টোনের সাথে অমিল অনুজ্জ্বল রঙ</li>
                    <li>❌ বসা বা ঝুঁকে থাকা দুর্বল পোশ্চার (Posture)</li>
                    <li>❌ ভিড়ের মধ্যে গড়পড়তা বা সাধারণ ইম্প্রেশন</li>
                  </ul>
                </div>
                <div style={{ borderLeft: '1px solid var(--color-border)' }}></div>
                <div style={sliderHalfStyle}>
                  <span style={goodBadge}>SHARP MASCULINE (AFTER)</span>
                  <ul style={{ ...listStyle, textAlign: 'left', fontSize: '0.9rem', marginTop: '1rem' }}>
                    <li>✅ বডি অনুযায়ী পারফেক্ট শোল্ডার ও ওয়েস্ট ফিট</li>
                    <li>✅ কালার হারমোনি ও কনট্রাস্ট যা চেহারা ফুটিয়ে তোলে</li>
                    <li>✅ সোজা কাঁধ ও আত্মবিশ্বাসী আকর্ষণীয় পোশ্চার</li>
                    <li>✅ যেকোনো মিটিং বা প্রোগ্রামে এলিট উপস্থিতি</li>
                  </ul>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }}>
              <div style={painBulletStyle}>
                <AlertCircle size={20} color="var(--color-primary)" />
                <div>
                  <h4 style={{ fontSize: '1.1rem', color: '#fff' }}>চাকরি ও ইন্টারভিউতে দুর্বল প্রথম ইম্প্রেশন</h4>
                </div>
              </div>
              <div style={painBulletStyle}>
                <AlertCircle size={20} color="var(--color-primary)" />
                <div>
                  <h4 style={{ fontSize: '1.1rem', color: '#fff' }}>মিটিং বা নেটওয়ার্কিং-এ সাধারণ গড়পড়তা উপস্থিতি</h4>
                </div>
              </div>
              <div style={painBulletStyle}>
                <AlertCircle size={20} color="var(--color-primary)" />
                <div>
                  <h4 style={{ fontSize: '1.1rem', color: '#fff' }}>সামাজিক ও পারিবারিক অনুষ্ঠানে কম আত্মবিশ্বাস অনুভব করা</h4>
                </div>
              </div>

              <div style={emotionalLineStyle}>
                ভালো পোশাক মানে শুধু stylish হওয়া না। ভালো পোশাক মানে room-এ ঢুকেই respect gain করা।
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION 4: TRANSFORMATION PROMISE */}
      <section style={transformationSectionStyle} className="section-padding">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="premium-card" style={transformationCardStyle}>
            <h2 style={{ fontSize: '2rem', color: 'var(--color-primary)', textAlign: 'center', marginBottom: '1.5rem' }}>
              এই গাইডটি আপনাকে শিখাবে কীভাবে পোশাককে confidence tool হিসেবে ব্যবহার করবেন।
            </h2>
            <p style={{ textAlign: 'center', fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--color-text-white)' }}>
              এই বই পড়ার পর আপনি শুধু “ভালো dress” করবেন না, আপনি জানবেন কীভাবে:
            </p>
            <div style={transformationGrid}>
              <div style={transBullet}>
                <Check size={18} color="var(--color-success)" />
                <span>নিজেকে আরও Taller, Cleaner এবং Sharper দেখানো যায়</span>
              </div>
              <div style={transBullet}>
                <Check size={18} color="var(--color-success)" />
                <span>সীমিত বাজেট এবং কম জামাকাপড় দিয়েও এলিট লুক তৈরি করা যায়</span>
              </div>
              <div style={transBullet}>
                <Check size={18} color="var(--color-success)" />
                <span>যেকোনো আড্ডায় বা মিটিংয়ে নিজের সম্মানজনক উপস্থিতি বজায় রাখা যায়</span>
              </div>
              <div style={transBullet}>
                <Check size={18} color="var(--color-success)" />
                <span>সকালে পোশাক বাছাইয়ের কনফিউশন দূর করে ১ মিনিটে রেডি হওয়া যায়</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTION 5: RESULT-FOCUSED BENEFITS */}
      <section id="benefits" style={benefitsSectionStyle} className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary-light)' }}>
              আপনি কী পাবেন? Feature না, real result বলি।
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>Practical men's guidelines that translate to everyday confidence.</p>
          </div>

          <div style={benefitsGrid}>
            <div className="premium-card" style={benefitCardStyle}>
              <TrendingUp size={32} color="var(--color-primary)" />
              <h3>১. Polished ও High Value লুক</h3>
              <p>দামি কাপড় নয়, বরং সঠিকভাবে ম্যাচ করা পোশাক আপনাকে এলিট ও আকর্ষণীয় করে তোলে।</p>
            </div>
            <div className="premium-card" style={benefitCardStyle}>
              <Compass size={32} color="var(--color-primary)" />
              <h3>২. বাজেট ফ্রেন্ডলি ওয়ার্ডরোব</h3>
              <p>অপ্রয়োজনীয় কেনাকাটা কমবে। এমন পোশাক কিনবেন যা একাধিক কম্বিনেশনে বারবার পরা যায়।</p>
            </div>
            <div className="premium-card" style={benefitCardStyle}>
              <UserCheck size={32} color="var(--color-primary)" />
              <h3>৩. বডি টাইপ অনুযায়ী সঠিক পোশাক</h3>
              <p>আপনার বডি ফ্রেমকে কীভাবে সবচেয়ে ব্যালেন্সড এবং স্ট্রং দেখাতে হবে তা নিখুঁতভাবে বুঝবেন।</p>
            </div>
            <div className="premium-card" style={benefitCardStyle}>
              <Award size={32} color="var(--color-primary)" />
              <h3>৪. স্কিন টোন ও রঙের ম্যাচিং</h3>
              <p>আর কোনো দ্বিধা নয়। যে রংগুলো পরলে আপনার চেহারাকে এনার্জেটিক ও ফ্রেশ দেখাবে তা জানবেন।</p>
            </div>
            <div className="premium-card" style={benefitCardStyle}>
              <Bookmark size={32} color="var(--color-primary)" />
              <h3>৫. সম্পূর্ণ নতুন ইম্প্রেশন</h3>
              <p>একই পোশাক, কিন্তু সঠিক ফিটিং এবং পোশ্চার যুক্ত হয়ে আপনার ব্যক্তিত্বকে রিডিফাইন করবে।</p>
            </div>
            <div className="premium-card" style={benefitCardStyle}>
              <Shield size={32} color="var(--color-primary)" />
              <h3>৬. কনফিডেন্ট ড্রেসিং মাইন্ডসেট</h3>
              <p>হুজুগে নয়, নিজের সচেতন বোঝাপড়া থেকে কাপড় পরে প্রতিবার আয়নার সামনে দাঁড়িয়ে ভালো ফিল করবেন।</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECTION 6: THIS IS FOR WHO */}
      <section style={whoForSectionStyle} className="section-padding">
        <div className="container" style={{ maxWidth: '900px' }}>
          <h2 style={{ fontSize: '2.2rem', textAlign: 'center', marginBottom: '3rem', color: 'var(--color-text-white)' }}>
            এই বইটি যাদের জন্য সবচেয়ে useful
          </h2>
          <div style={whoForGrid}>
            <div style={whoForCard}>• যারা ভালো দেখতে চায়, কিন্তু flashy হতে চায় না</div>
            <div style={whoForCard}>• যারা প্রফেশনাল ও কর্পোরেট পরিবেশে দারুণ ইম্প্রেশন তৈরি করতে চায়</div>
            <div style={whoForCard}>• যারা নিজের বডি টাইপ অনুযায়ী স্মার্টলি ড্রেসআপ করতে চায়</div>
            <div style={whoForCard}>• যারা শপিং করার সময় বারবার ভুল জিনিস কিনে আফসোস করে</div>
            <div style={whoForCard}>• যারা কম পোশাকে বেশি আকর্ষণীয় আউটফিট ডিজাইন করতে চায়</div>
            <div style={whoForCard}>• যারা প্রাকৃতিকভাবে নিজের ব্যক্তিগত আত্মবিশ্বাস বাড়াতে চায়</div>
          </div>
          <p style={exclusionTextStyle}>
            এটা ট্রেন্ড-চেজিং ফ্যাশন বুক না। এটা practical men’s confidence and appearance guide।
          </p>
        </div>
      </section>

      {/* 7. SECTION 7: WHAT’S INSIDE */}
      <section id="whats-inside" style={{ borderTop: '1px solid var(--color-border)' }} className="section-padding">
        <div className="container">
          <h2 style={{ fontSize: '2.3rem', textAlign: 'center', marginBottom: '3.5rem', color: 'var(--color-primary)' }}>
            বইয়ের ভিতরে কী আছে, আর কেন সেটা আপনার জন্য important
          </h2>
          <div style={insideGrid}>
            <div className="premium-card" style={insideCard}>
              <h4>Fit Mastery</h4>
              <p>যাতে আপনি instantly বুঝতে পারেন কোন পোশাক আপনাকে sharp দেখাচ্ছে আর কোনটা sloppy।</p>
            </div>
            <div className="premium-card" style={insideCard}>
              <h4>Body Type Guidance</h4>
              <p>যাতে আপনি নিজের frame অনুযায়ী এমন পোশাক বেছে নিতে পারেন, যা আপনাকে more balanced and attractive দেখায়।</p>
            </div>
            <div className="premium-card" style={insideCard}>
              <h4>Color Clarity</h4>
              <p>যাতে আপনি এমন color পরেন, যা আপনার face এ life আনে, tired look না।</p>
            </div>
            <div className="premium-card" style={insideCard}>
              <h4>Capsule Wardrobe System</h4>
              <p>যাতে কম কাপড়ে বেশি outfit create করতে পারেন, আর daily confusion কমে যায়।</p>
            </div>
            <div className="premium-card" style={insideCard}>
              <h4>Smart Shopping Logic</h4>
              <p>যাতে আর emotional বা random shopping না করে intentionally কিনতে পারেন।</p>
            </div>
            <div className="premium-card" style={insideCard}>
              <h4>Posture & Presence</h4>
              <p>যাতে same outfit-এও আপনি more confident, composed, and noticeable দেখান।</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SECTION 8: VISUAL VALUE BREAKDOWN */}
      <section style={valueBreakdownSection} className="section-padding">
        <div className="container">
          <h2 style={{ fontSize: '2.3rem', textAlign: 'center', marginBottom: '3.5rem', color: 'var(--color-text-white)' }}>
            একটি বই, কিন্তু impact হবে আপনার daily life এ
          </h2>
          <div style={valueGridStyle}>
            <div style={valueColStyle}>
              <div style={valueIconBg}><Star size={24} color="var(--color-primary)" /></div>
              <h4>Daily Life</h4>
              <p>সকালে আলমারির সামনে দাঁড়িয়ে চিন্তা করার ঝামেলা শেষ। কম সময়ে রেডি হওয়া সহজ হবে।</p>
            </div>
            <div style={valueColStyle}>
              <div style={valueIconBg}><TrendingUp size={24} color="var(--color-primary)" /></div>
              <h4>Career / Professional</h4>
              <p>অফিস, ক্লায়েন্ট মিটিং বা ইন্টারভিউতে আপনার প্রফেশনাল ও এলিট প্রথম ইম্প্রেশন তৈরি হবে।</p>
            </div>
            <div style={valueColStyle}>
              <div style={valueIconBg}><Compass size={24} color="var(--color-primary)" /></div>
              <h4>Social / Personal</h4>
              <p>বন্ধু, সামাজিক ডিনার বা ডেটে আপনি হবেন আকর্ষণীয় এবং রুচিশীল ব্যক্তিত্ব।</p>
            </div>
            <div style={valueColStyle}>
              <div style={valueIconBg}><Shield size={24} color="var(--color-primary)" /></div>
              <h4>Confidence</h4>
              <p>নিজের লুক নিয়ে দ্বিধাবোধ থাকবে না, যেকোনো আড্ডায় আত্মবিশ্বাসের সাথে অংশ নেবেন।</p>
            </div>
          </div>
          <div style={valuePowerline}>
            কাপড় বদলালে look বদলায়। কিন্তু clarity এলে presence বদলায়।
          </div>
        </div>
      </section>

      {/* 9. SECTION 9: BONUS / OFFER STACK */}
      <section style={bonusSectionStyle} className="section-padding">
        <div className="container" style={{ maxWidth: '850px' }}>
          <div className="premium-card" style={{ borderColor: 'var(--color-primary)', background: 'rgba(212, 175, 55, 0.02)', padding: '3rem 2rem' }}>
            <h2 style={{ fontSize: '2.3rem', textAlign: 'center', color: 'var(--color-primary)', marginBottom: '2rem' }}>
              আজই নিলে আপনি যা পাবেন:
            </h2>
            <div style={bonusListStyle}>
              <div style={bonusItemStyle}>
                <Check size={20} color="var(--color-primary)" />
                <div>
                  <strong>The Silent Language of Style</strong> full digital book
                </div>
              </div>
              <div style={bonusItemStyle}>
                <Check size={20} color="var(--color-primary)" />
                <div>
                  <strong>Printable Fit Checklist</strong> (সহজ প্রিন্টযোগ্য চেকলিস্ট)
                </div>
              </div>
              <div style={bonusItemStyle}>
                <Check size={20} color="var(--color-primary)" />
                <div>
                  <strong>Capsule Wardrobe Planner</strong> (কম পোশাকে সর্বোচ্চ স্টাইল তৈরির প্ল্যানার)
                </div>
              </div>
              <div style={bonusItemStyle}>
                <Check size={20} color="var(--color-primary)" />
                <div>
                  <strong>Outfit Clarity Framework</strong> (নিজেকে প্রেজেন্ট করার ফ্রেমওয়ার্ক)
                </div>
              </div>
              <div style={bonusItemStyle}>
                <Check size={20} color="var(--color-primary)" />
                <div>
                  <strong>Smart Shopping Reference Guide</strong> (ভুল কেনাকাটা রোধ করার গাইড)
                </div>
              </div>
            </div>
            <p style={bonusImportantText}>
              এসব bonus-এর উদ্দেশ্য একটাই: আপনি যেন বই পড়ে motivated হয়ে থেমে না যান, বাস্তবে apply করতে পারেন।
            </p>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / TESTIMONIALS */}
      <section id="reviews" style={{ background: '#070E20', borderTop: '1px solid var(--color-border)' }} className="section-padding">
        <div className="container">
          <h2 style={{ fontSize: '2.2rem', textAlign: 'center', marginBottom: '3.5rem', color: 'var(--color-primary-light)' }}>
            আমাদের পাঠকদের প্রতিক্রিয়া
          </h2>
          <div style={reviewsGrid}>
            {reviews.map((rev, idx) => (
              <div key={idx} className="premium-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1rem' }}>
                  {[...Array(rev.rating)].map((_, i) => <Star key={i} size={16} fill="var(--color-primary)" color="var(--color-primary)" />)}
                </div>
                <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--color-text-white)', fontSize: '0.95rem' }}>
                  "{rev.text}"
                </p>
                <div>
                  <h4 style={{ fontSize: '1rem', color: 'var(--color-primary-light)' }}>{rev.name}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{rev.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. SECTION 10: WHY BUY NOW */}
      <section style={whyNowSection} className="section-padding">
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.3rem', color: 'var(--color-text-white)', marginBottom: '1.5rem' }}>
            কেন এখনই শুরু করা উচিত?
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>
            আপনি যদি আজও একই confusion নিয়ে থাকেন, তাহলে ৩ মাস পরেও একই wardrobe frustration, same shopping mistake, same weak impression নিয়ে থাকবেন।
          </p>
          <p style={{ color: 'var(--color-text-white)', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
            কিন্তু আপনি যদি আজ শুরু করেন, তাহলে খুব কম সময়ের মধ্যে আপনি smarter clothing decisions নিতে পারবেন, নিজের লুক নিয়ে intentional হবেন এবং মানুষের সামনে solid impression তৈরি করতে পারবেন।
          </p>
          <div style={urgencyBanner}>
            Style overnight বদলায় না। কিন্তু clarity একদিনেই শুরু হতে পারে।
          </div>
        </div>
      </section>

      {/* 11. SECTION 11: PRICE + CTA */}
      <section id="pricing" style={priceSectionStyle} className="section-padding">
        <div className="container" style={{ maxWidth: '650px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', color: 'var(--color-primary-light)', marginBottom: '1.5rem' }}>
            নিজের presence upgrade করার এই investment কি worth it? Absolutely.
          </h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem' }}>
            একটি ভুল কেনাকাটার দামই অনেক সময় এই বইয়ের দামের চেয়ে বেশি। কিন্তু এই বই আপনাকে বারবার ভুল কেনা, ভুল fit, wrong color, and weak presentation থেকে বাঁচাতে পারে।
          </p>

          <div className="premium-card" style={priceCardStyle}>
            <span style={launchBadgeStyle}>LAUNCH SPECIAL OFFER</span>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '0.8rem', margin: '1.5rem 0' }}>
              <span style={{ fontSize: '1.5rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>৳১,০০০</span>
              <h2 style={{ fontSize: '3.5rem', color: 'var(--color-primary)' }}>৳৪৯০</h2>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
              অথবা আন্তর্জাতিক কার্ডধারীদের জন্য মাত্র $৯.৯৯ (Regular $১৯.৯৯)
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button onClick={() => openCheckout('gateway')} className="btn-primary" style={{ padding: '1.2rem', fontSize: '1.1rem' }}>
                এখনই বইটি কিনুন
              </button>
              <button onClick={() => openCheckout('whatsapp')} className="btn-secondary" style={{ padding: '1rem', fontSize: '0.95rem' }}>
                আজ থেকেই Sharp দেখানো শুরু করুন (WhatsApp Order)
              </button>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '1.5rem' }}>
              Instant digital access. যেকোনো সময়, যেকোনো device থেকে পড়তে পারবেন।
            </p>
          </div>
        </div>
      </section>

      {/* 12. SECTION 12: FAQ */}
      <section style={{ borderTop: '1px solid var(--color-border)', background: '#050A18' }} className="section-padding">
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ fontSize: '2.3rem', textAlign: 'center', marginBottom: '3.5rem', color: 'var(--color-primary-light)' }}>
            সাধারণ কিছু প্রশ্ন (FAQ)
          </h2>
          <div style={faqContainer}>
            {[
              { q: 'এই বই কি beginners-এর জন্য?', a: 'হ্যাঁ। আপনি style সম্পর্কে কিছু না জানলেও এই বই থেকে অত্যন্ত সহজ ভাষায় এবং ছবির মাধ্যমে clear understanding পাবেন।' },
              { q: 'এটা কি শুধু formal dressing-এর জন্য?', a: 'না। এতে এমন স্টাইল প্রিন্সিপাল আছে যেগুলো আপনি আপনার ক্যাজুয়াল শার্ট, টিশার্ট, ফর্মাল সুট, পাঞ্জাবি সহ সব জায়গায় অ্যাপ্লাই করতে পারবেন।' },
              { q: 'আমি যদি already কিছু style জানি, তবুও কি useful হবে?', a: 'হ্যাঁ। কারণ এই বই শুধু জামাকাপড় পরা শেখায় না, এটি আপনার বডি টাইপ ম্যাচিং, স্কিন টোনের জন্য রাইট কালার, পোশ্চার এবং ওভারঅল ক্ল্যারিটি নিয়ে আলোচনা করে।' },
              { q: 'এটা কি practical?', a: 'হ্যাঁ। বইয়ের ভেতরের প্রতিটি চেকলিস্ট এবং গাইডলাইন বাস্তব শপিং গাইড, ড্রেসিং প্যাটার্ন ও রিয়েল লাইফ ফিটিংয়ের ওপর ভিত্তি করে বানানো।' },
              { q: 'এটা কি আমার confidence বাড়াতে সাহায্য করবে?', a: 'অবশ্যই। যখন আপনি আয়নার সামনে দাঁড়িয়ে নিশ্চিত হবেন যে যা পরেছেন তা আপনাকে এলিগেন্ট দেখাচ্ছে, আপনার আত্মবিশ্বাস প্রাকৃতিকভাবেই বৃদ্ধি পাবে।' }
            ].map((item, idx) => (
              <div key={idx} style={faqItemStyle} onClick={() => toggleFaq(idx)}>
                <div style={faqQuestionStyle}>
                  <span>{item.q}</span>
                  <ChevronDown size={18} style={{ transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s' }} />
                </div>
                {openFaq === idx && <div style={faqAnswerStyle}>{item.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section style={finalCtaSection} className="section-padding">
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--color-primary)', marginBottom: '1.5rem' }}>
            আপনার style আপনার হয়ে কথা বলুক।
          </h2>
          <p style={{ color: 'var(--color-text-white)', fontSize: '1.15rem', marginBottom: '2.5rem' }}>
            আপনি room-এ ঢোকার আগেই আপনার পোশাক, আপনার posture, আপনার presence একটা message পাঠায়। প্রশ্ন হলো, সেই message কি random? নাকি intentional?
          </p>
          <button onClick={() => openCheckout('gateway')} className="btn-primary" style={{ gap: '0.8rem', padding: '1.2rem 3rem', fontSize: '1.1rem' }}>
            💼 Get Instant Access — Download the Guide
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={footerStyle}>
        <div className="container" style={footerContainer}>
          <p>© {new Date().getFullYear()} Being The Man. All Rights Reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem' }}>
            <a href="#benefits" style={footerLink}>Benefits</a>
            <a href="#whats-inside" style={footerLink}>What's Inside</a>
            <a href="#pricing" style={footerLink}>Pricing</a>
          </div>
        </div>
      </footer>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}

// STYLES object
const navStyle = {
  background: 'rgba(5, 10, 24, 0.75)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  borderBottom: '1px solid rgba(30, 46, 93, 0.6)',
  boxShadow: '0 1px 0 rgba(212, 175, 55, 0.05)',
  position: 'sticky',
  top: 0,
  zIndex: 100,
  padding: '0.75rem 0'
};

const navContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '1rem'
};

const navBrandStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  flexShrink: 0
};

const navBrandNameStyle = {
  fontFamily: 'var(--font-english)',
  fontWeight: 700,
  fontSize: '1rem',
  color: 'var(--color-primary-light)',
  letterSpacing: '0.03em',
  whiteSpace: 'nowrap'
};

const navLinksStyle = {
  display: 'flex',
  gap: '0.1rem',
  alignItems: 'center',
  overflowX: 'auto',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none'
};

const navLinkBtn = {
  background: 'none',
  border: 'none',
  color: 'var(--color-text-muted)',
  fontFamily: 'var(--font-english)',
  fontWeight: 600,
  fontSize: '0.82rem',
  letterSpacing: '0.04em',
  cursor: 'pointer',
  padding: '0.45rem 0.7rem',
  borderRadius: '6px',
  transition: 'var(--transition-smooth)',
  whiteSpace: 'nowrap'
};

// Bottom Mobile Navbar
const bottomNavStyle = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 200,
  background: 'rgba(5, 10, 24, 0.9)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  borderTop: '1px solid rgba(30, 46, 93, 0.8)',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: '0.45rem 0',
  boxShadow: '0 -4px 20px rgba(0,0,0,0.4)'
};

const bottomNavItem = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.2rem',
  background: 'none',
  border: 'none',
  color: 'var(--color-text-muted)',
  fontFamily: 'var(--font-english)',
  fontSize: '0.68rem',
  fontWeight: 600,
  letterSpacing: '0.04em',
  cursor: 'pointer',
  padding: '0.35rem 0.8rem',
  transition: 'var(--transition-smooth)'
};

const bottomNavIcon = {
  fontSize: '1.15rem',
  lineHeight: 1
};


const heroSectionStyle = {
  background: 'radial-gradient(circle at 70% 30%, rgba(212, 175, 55, 0.05) 0%, transparent 60%)',
  overflow: 'hidden'
};

const heroGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1.2fr 0.8fr',
  gap: '4rem',
  alignItems: 'center',
  '@media (max-width: 992px)': {
    gridTemplateColumns: '1fr',
    gap: '2rem'
  }
};

const heroHeadlineStyle = {
  fontSize: '3rem',
  lineHeight: '1.25',
  marginBottom: '0.5rem'
};

const heroSubheadlineStyle = {
  fontSize: '1.2rem',
  color: 'var(--color-text-muted)',
  lineHeight: '1.7'
};

const heroCtaContainer = {
  display: 'flex',
  gap: '1rem',
  flexWrap: 'wrap',
  marginTop: '1rem'
};

const heroSupportTextStyle = {
  fontSize: '0.9rem',
  color: 'var(--color-text-muted)',
  borderLeft: '2px solid var(--color-primary)',
  paddingLeft: '1rem'
};

const badgeRowStyle = {
  display: 'flex',
  gap: '1rem',
  flexWrap: 'wrap',
  marginTop: '1.5rem'
};

const miniBadgeStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  fontSize: '0.85rem',
  color: 'var(--color-text-white)',
  background: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid var(--color-border)',
  padding: '0.4rem 0.8rem',
  borderRadius: '4px'
};

const bulletPointStyle = {
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  backgroundColor: 'var(--color-primary)'
};

const heroVisualContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative'
};

const book3DContainer = {
  perspective: '1200px',
  width: '280px',
  height: '380px'
};

const book3D = {
  width: '100%',
  height: '100%',
  position: 'relative',
  transformStyle: 'preserve-3d',
  transform: 'rotateY(-25deg) rotateX(10deg)',
  transition: 'transform 0.5s ease',
  cursor: 'pointer',
  ':hover': {
    transform: 'rotateY(-10deg) rotateX(5deg) scale(1.03)'
  }
};

const bookFront = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundColor: 'var(--color-bg-card)',
  border: '1px solid var(--color-primary)',
  borderRadius: '0 8px 8px 0',
  boxShadow: '10px 10px 30px rgba(0,0,0,0.5)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 2,
  transform: 'translateZ(10px)',
  padding: '2rem'
};

const bookSpine = {
  position: 'absolute',
  width: '20px',
  height: '100%',
  backgroundColor: 'var(--color-primary-dark)',
  transform: 'rotateY(-90deg) translateZ(10px)',
  left: 0,
  zIndex: 1
};

const bookBack = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundColor: '#040914',
  transform: 'rotateY(180deg) translateZ(10px)',
  borderRadius: '8px 0 0 8px',
  zIndex: 0
};

const problemSectionStyle = {
  backgroundColor: '#070E20',
  borderTop: '1px solid var(--color-border)',
  borderBottom: '1px solid var(--color-border)'
};

const problemGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '1.5rem',
  marginTop: '3rem'
};

const problemCardStyle = {
  textAlign: 'left',
  position: 'relative',
  paddingTop: '3rem'
};

const problemNumStyle = {
  position: 'absolute',
  top: '1rem',
  left: '2rem',
  fontSize: '2rem',
  fontWeight: '800',
  color: 'rgba(212, 175, 55, 0.15)',
  fontFamily: 'var(--font-english)'
};

const problemFailsList = {
  textAlign: 'left',
  maxWidth: '700px',
  margin: '3rem auto 2rem',
  padding: '1.5rem',
  borderLeft: '3px solid var(--color-primary)',
  background: 'rgba(255,255,255,0.01)'
};

const listStyle = {
  listStyleType: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem'
};

const psychologicalPunchStyle = {
  fontSize: '1.3rem',
  fontWeight: '700',
  color: 'var(--color-primary)',
  marginTop: '2.5rem',
  padding: '1rem'
};

const painSectionStyle = {
  background: 'linear-gradient(180deg, #050A18 0%, #070E20 100%)'
};

const painGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1.1fr 0.9fr',
  gap: '3rem',
  '@media (max-width: 992px)': {
    gridTemplateColumns: '1fr'
  }
};

const sliderContainerStyle = {
  display: 'flex',
  gap: '1.5rem',
  marginTop: '1rem'
};

const sliderHalfStyle = {
  flex: 1,
  textAlign: 'center'
};

const badBadge = {
  backgroundColor: '#3E1C1F',
  color: '#FF6B6B',
  padding: '0.3rem 0.6rem',
  borderRadius: '4px',
  fontSize: '0.75rem',
  fontWeight: '700'
};

const goodBadge = {
  backgroundColor: '#1C3E2D',
  color: '#51CF66',
  padding: '0.3rem 0.6rem',
  borderRadius: '4px',
  fontSize: '0.75rem',
  fontWeight: '700'
};

const painBulletStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  background: 'rgba(255, 255, 255, 0.01)',
  border: '1px solid var(--color-border)',
  padding: '1rem',
  borderRadius: '8px'
};

const emotionalLineStyle = {
  fontSize: '1.25rem',
  fontWeight: '700',
  borderLeft: '3px solid var(--color-primary)',
  paddingLeft: '1rem',
  color: 'var(--color-primary-light)',
  marginTop: '1rem'
};

const transformationSectionStyle = {
  background: 'radial-gradient(circle at 10% 80%, rgba(212, 175, 55, 0.03) 0%, transparent 60%)'
};

const transformationCardStyle = {
  border: '1.5px solid var(--color-primary)',
  boxShadow: '0 0 35px rgba(212, 175, 55, 0.05)'
};

const transformationGrid = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1.5rem',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr'
  }
};

const transBullet = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  fontSize: '0.95rem'
};

const benefitsSectionStyle = {
  background: '#070E20',
  borderTop: '1px solid var(--color-border)',
  borderBottom: '1px solid var(--color-border)'
};

const benefitsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '1.5rem'
};

const benefitCardStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  textAlign: 'left'
};

const whoForSectionStyle = {
  background: '#050A18'
};

const whoForGrid = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1.2rem',
  marginTop: '2rem',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr'
  }
};

const whoForCard = {
  padding: '1.2rem',
  border: '1px solid var(--color-border)',
  borderRadius: '8px',
  background: 'rgba(255,255,255,0.01)',
  fontSize: '0.95rem'
};

const exclusionTextStyle = {
  textAlign: 'center',
  marginTop: '2.5rem',
  fontStyle: 'italic',
  color: 'var(--color-primary)'
};

const insideGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '1.5rem'
};

const insideCard = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  textAlign: 'left'
};

const valueBreakdownSection = {
  background: '#070E20',
  borderTop: '1px solid var(--color-border)',
  borderBottom: '1px solid var(--color-border)'
};

const valueGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '2rem',
  textAlign: 'center'
};

const valueColStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem'
};

const valueIconBg = {
  width: '55px',
  height: '55px',
  borderRadius: '50%',
  backgroundColor: 'rgba(212, 175, 55, 0.08)',
  border: '1px solid rgba(212, 175, 55, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const valuePowerline = {
  textAlign: 'center',
  fontSize: '1.4rem',
  color: 'var(--color-primary)',
  fontWeight: '700',
  marginTop: '4rem'
};

const bonusSectionStyle = {
  background: '#050A18'
};

const bonusListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
  margin: '1.5rem 0'
};

const bonusItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  fontSize: '1.1rem'
};

const bonusImportantText = {
  textAlign: 'center',
  color: 'var(--color-primary-light)',
  fontStyle: 'italic',
  fontSize: '0.95rem',
  marginTop: '1.5rem'
};

const reviewsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '1.5rem'
};

const whyNowSection = {
  background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 60%)'
};

const urgencyBanner = {
  fontSize: '1.4rem',
  color: '#000',
  backgroundColor: 'var(--color-primary)',
  padding: '1rem 2rem',
  borderRadius: '8px',
  fontWeight: '700',
  display: 'inline-block',
  boxShadow: '0 5px 20px rgba(212,175,55,0.3)'
};

const priceSectionStyle = {
  backgroundColor: '#070E20',
  borderTop: '1px solid var(--color-border)',
  borderBottom: '1px solid var(--color-border)'
};

const priceCardStyle = {
  padding: '3rem 2rem',
  border: '2px solid var(--color-primary)',
  boxShadow: '0 0 35px rgba(212, 175, 55, 0.1)'
};

const launchBadgeStyle = {
  backgroundColor: 'var(--color-primary)',
  color: '#000',
  padding: '0.3rem 0.6rem',
  fontSize: '0.75rem',
  fontWeight: '800',
  borderRadius: '4px',
  display: 'inline-block'
};

const faqContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const faqItemStyle = {
  border: '1px solid var(--color-border)',
  borderRadius: '8px',
  padding: '1.2rem',
  cursor: 'pointer',
  background: 'rgba(255,255,255,0.01)',
  transition: 'var(--transition-smooth)'
};

const faqQuestionStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontWeight: '600',
  fontSize: '1.05rem',
  color: 'var(--color-text-white)'
};

const faqAnswerStyle = {
  marginTop: '1rem',
  color: 'var(--color-text-muted)',
  fontSize: '0.95rem',
  lineHeight: '1.6',
  borderTop: '1px solid var(--color-border)',
  paddingTop: '0.8rem'
};

const finalCtaSection = {
  background: 'linear-gradient(180deg, #050A18 0%, #030610 100%)'
};

const footerStyle = {
  backgroundColor: '#02040A',
  borderTop: '1px solid var(--color-border)',
  padding: '2rem 0',
  color: 'var(--color-text-muted)',
  fontSize: '0.9rem'
};

const footerContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '1rem'
};

const footerLink = {
  color: 'var(--color-text-muted)',
  textDecoration: 'none',
  transition: 'var(--transition-smooth)',
  ':hover': {
    color: 'var(--color-primary)'
  }
};
