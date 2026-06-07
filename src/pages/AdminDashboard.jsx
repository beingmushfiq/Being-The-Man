import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { 
  TrendingUp, Users, ShoppingCart, Settings, LogOut, Search, 
  CheckCircle, XCircle, Clock, DollarSign, BookOpen, Save, RefreshCw
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [product, setProduct] = useState({
    id: '12345678-1234-1234-1234-123456789012',
    title: 'The Silent Language of Style',
    regular_price_bdt: 1000,
    launch_price_bdt: 490,
    regular_price_usd: 19.99,
    launch_price_usd: 9.99,
    is_launch_offer: true
  });
  const [checkoutConfig, setCheckoutConfig] = useState({
    active_option: 'gateway',
    whatsapp_number: '+8801700000000',
    gumroad_url: 'https://beingman.gumroad.com/l/stylelanguage'
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [cmsMessage, setCmsMessage] = useState('');
  const navigate = useNavigate();

  // Authentication check
  useEffect(() => {
    const checkAuth = async () => {
      const isPlaceholder = !import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('placeholder-project');
      if (isPlaceholder) {
        const token = sessionStorage.getItem('btm_admin_token');
        if (!token) navigate('/admin/login');
      } else {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) navigate('/admin/login');
      }
    };
    checkAuth();
  }, [navigate]);

  // Load orders & config
  const loadData = async () => {
    try {
      // 1. Fetch Product Pricing
      const { data: pData, error: pError } = await supabase.from('products').select('*').limit(1).single();
      if (pData && !pError) setProduct(pData);

      // 2. Fetch App Settings
      const { data: sData, error: sError } = await supabase.from('app_settings').select('*').eq('key', 'checkout_config').single();
      if (sData && !sError) setCheckoutConfig(sData.value);

      // 3. Fetch Orders
      const { data: oData, error: oError } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (oData && !oError) {
        setOrders(oData);
        generateCustomerList(oData);
      } else {
        throw new Error('Supabase offline or table missing');
      }
    } catch (e) {
      console.log('Loading mockup data from LocalStorage...');
      // Retrieve from LocalStorage for seamless local testing
      const localOrders = JSON.parse(localStorage.getItem('btm_orders') || '[]');
      // Seed with some mock data if empty for visual demo
      if (localOrders.length === 0) {
        const demoOrders = [
          { id: '1', customer_name: 'আরিফ রহমান', customer_email: 'arif@example.com', customer_phone: '01711223344', total_amount: 490, currency: 'BDT', payment_status: 'completed', payment_method: 'bKash', created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
          { id: '2', customer_name: 'Tahmid Chowdhury', customer_email: 'tahmid@outlook.com', customer_phone: '01899887766', total_amount: 9.99, currency: 'USD', payment_status: 'completed', payment_method: 'Stripe', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
          { id: '3', customer_name: 'সাকিব আল হাসান', customer_email: 'sakib@gmail.com', customer_phone: '01912345678', total_amount: 490, currency: 'BDT', payment_status: 'pending', payment_method: 'WhatsApp', created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() }
        ];
        localStorage.setItem('btm_orders', JSON.stringify(demoOrders));
        setOrders(demoOrders);
        generateCustomerList(demoOrders);
      } else {
        setOrders(localOrders);
        generateCustomerList(localOrders);
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const generateCustomerList = (orderList) => {
    const customerMap = {};
    orderList.forEach(order => {
      const email = order.customer_email;
      if (!customerMap[email]) {
        customerMap[email] = {
          name: order.customer_name,
          email: email,
          phone: order.customer_phone,
          orders_count: 0,
          total_spent_bdt: 0,
          total_spent_usd: 0,
          orders: []
        };
      }
      customerMap[email].orders_count += 1;
      if (order.currency === 'BDT') {
        customerMap[email].total_spent_bdt += Number(order.total_amount);
      } else {
        customerMap[email].total_spent_usd += Number(order.total_amount);
      }
      customerMap[email].orders.push(order);
    });
    setCustomers(Object.values(customerMap));
  };

  const handleCMSUpdate = async (e) => {
    e.preventDefault();
    setCmsMessage('');

    try {
      // Try updating Supabase
      const { error: pError } = await supabase.from('products').upsert(product);
      const { error: sError } = await supabase.from('app_settings').upsert({ key: 'checkout_config', value: checkoutConfig });

      if (pError || sError) throw new Error('Database write error');
      setCmsMessage('CMS Settings successfully saved to Supabase!');
    } catch (err) {
      console.log('Saving settings to LocalStorage...');
      localStorage.setItem('btm_product', JSON.stringify(product));
      localStorage.setItem('btm_config', JSON.stringify(checkoutConfig));
      setCmsMessage('CMS Settings saved locally!');
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const { error } = await supabase.from('orders').update({ payment_status: newStatus }).eq('id', orderId);
      if (error) throw error;
      loadData();
    } catch (err) {
      const localOrders = JSON.parse(localStorage.getItem('btm_orders') || '[]');
      const updated = localOrders.map(o => o.id === orderId ? { ...o, payment_status: newStatus } : o);
      localStorage.setItem('btm_orders', JSON.stringify(updated));
      setOrders(updated);
      generateCustomerList(updated);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('btm_admin_token');
    navigate('/admin/login');
  };

  // Reporting calculations
  const totalBdtRevenue = orders.filter(o => o.payment_status === 'completed' && o.currency === 'BDT').reduce((acc, curr) => acc + Number(curr.total_amount), 0);
  const totalUsdRevenue = orders.filter(o => o.payment_status === 'completed' && o.currency === 'USD').reduce((acc, curr) => acc + Number(curr.total_amount), 0);
  const totalOrdersCount = orders.length;
  const completedOrdersCount = orders.filter(o => o.payment_status === 'completed').length;

  // Search filter
  const filteredOrders = orders.filter(o => 
    o.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customer_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.customer_phone.includes(searchQuery)
  );

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery)
  );

  return (
    <div style={dashboardLayout}>
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <div style={sidebarHeaderStyle}>
          <img src="/logo-transparent.png" alt="Being The Man" style={{ height: '35px', objectFit: 'contain' }} onError={(e) => {e.target.src = '/logo.jpg'}} />
          <span style={{ fontSize: '0.75rem', color: 'var(--color-primary-light)', letterSpacing: '0.05em' }}>E-COMMERCE ADMIN</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <button onClick={() => setActiveTab('overview')} style={activeTab === 'overview' ? activeSidebarItem : sidebarItem}>
            <TrendingUp size={18} /> Overview (Sales)
          </button>
          <button onClick={() => setActiveTab('orders')} style={activeTab === 'orders' ? activeSidebarItem : sidebarItem}>
            <ShoppingCart size={18} /> Orders & History
          </button>
          <button onClick={() => setActiveTab('customers')} style={activeTab === 'customers' ? activeSidebarItem : sidebarItem}>
            <Users size={18} /> Customer database
          </button>
          <button onClick={() => setActiveTab('cms')} style={activeTab === 'cms' ? activeSidebarItem : sidebarItem}>
            <Settings size={18} /> CMS settings
          </button>
        </nav>

        <button onClick={handleLogout} style={logoutBtnStyle}>
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Panel Content */}
      <main style={mainContentPanel}>
        {/* Header */}
        <header style={headerBarStyle}>
          <div>
            <h2 style={{ fontSize: '1.5rem', textTransform: 'capitalize' }}>{activeTab} Dashboard</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Realtime e-commerce tracking panel</p>
          </div>
          <button onClick={loadData} style={refreshBtnStyle}><RefreshCw size={18} /></button>
        </header>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div style={tabContainerStyle}>
            {/* KPI Cards */}
            <div style={kpiGridStyle}>
              <div className="premium-card" style={kpiCardStyle}>
                <div style={kpiHeader}>
                  <span>Total Revenue (BDT)</span>
                  <DollarSign size={20} color="var(--color-primary)" />
                </div>
                <h3>৳{totalBdtRevenue.toLocaleString()}</h3>
                <p>From completed domestic sales</p>
              </div>

              <div className="premium-card" style={kpiCardStyle}>
                <div style={kpiHeader}>
                  <span>Total Revenue (USD)</span>
                  <DollarSign size={20} color="var(--color-primary)" />
                </div>
                <h3>${totalUsdRevenue.toLocaleString()}</h3>
                <p>From international Stripe sales</p>
              </div>

              <div className="premium-card" style={kpiCardStyle}>
                <div style={kpiHeader}>
                  <span>Total Orders</span>
                  <ShoppingCart size={20} color="var(--color-primary)" />
                </div>
                <h3>{totalOrdersCount}</h3>
                <p>{completedOrdersCount} Paid, {totalOrdersCount - completedOrdersCount} Pending</p>
              </div>

              <div className="premium-card" style={kpiCardStyle}>
                <div style={kpiHeader}>
                  <span>LTV / Customer</span>
                  <Users size={20} color="var(--color-primary)" />
                </div>
                <h3>
                  ৳{customers.length > 0 ? Math.round(totalBdtRevenue / customers.length) : 0}
                </h3>
                <p>Avg lifetime value per customer</p>
              </div>
            </div>

            {/* Sales Chart Section */}
            <div className="premium-card" style={{ padding: '2rem' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--color-primary-light)' }}>
                Visual Sales History metrics
              </h4>
              <div style={chartMockupStyle}>
                {/* SVG Mini bar chart */}
                <svg viewBox="0 0 800 200" style={{ width: '100%', height: '200px' }}>
                  <line x1="50" y1="170" x2="750" y2="170" stroke="var(--color-border)" strokeWidth="2" />
                  {/* Grid lines */}
                  <line x1="50" y1="40" x2="750" y2="40" stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="5,5" />
                  <line x1="50" y1="100" x2="750" y2="100" stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="5,5" />
                  
                  {/* Bars representing simulated sales volumes over 5 periods */}
                  <rect x="100" y="100" width="60" height="70" fill="var(--color-border)" rx="4" />
                  <text x="130" y="190" fill="var(--color-text-muted)" fontSize="12" textAnchor="middle">Wk 1</text>
                  
                  <rect x="230" y="80" width="60" height="90" fill="var(--color-border)" rx="4" />
                  <text x="260" y="190" fill="var(--color-text-muted)" fontSize="12" textAnchor="middle">Wk 2</text>

                  <rect x="360" y="120" width="60" height="50" fill="var(--color-border)" rx="4" />
                  <text x="390" y="190" fill="var(--color-text-muted)" fontSize="12" textAnchor="middle">Wk 3</text>

                  <rect x="490" y="60" width="60" height="110" fill="var(--color-border)" rx="4" />
                  <text x="520" y="190" fill="var(--color-text-muted)" fontSize="12" textAnchor="middle">Wk 4</text>

                  {/* Highlights current week with Gold Gradient */}
                  <defs>
                    <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary-light)" />
                      <stop offset="100%" stopColor="var(--color-primary)" />
                    </linearGradient>
                  </defs>
                  <rect x="620" y="30" width="60" height="140" fill="url(#goldGrad)" rx="4" />
                  <text x="650" y="190" fill="var(--color-primary)" fontSize="12" fontWeight="700" textAnchor="middle">Current</text>
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Orders & Sales History */}
        {activeTab === 'orders' && (
          <div style={tabContainerStyle}>
            <div style={searchBarContainer}>
              <Search size={18} style={{ color: 'var(--color-text-muted)' }} />
              <input type="text" placeholder="গ্রাহকের নাম, ইমেইল বা ফোন দিয়ে সার্চ করুন..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={searchInputStyle} />
            </div>

            <div className="premium-card" style={{ padding: '0', overflowX: 'auto', border: '1px solid var(--color-border)' }}>
              <table style={tableStyle}>
                <thead>
                  <tr style={tableHeaderRow}>
                    <th style={tableHeaderCell}>গ্রাহকের নাম (Customer)</th>
                    <th style={tableHeaderCell}>যোগাযোগ (Contact)</th>
                    <th style={tableHeaderCell}>পরিমাণ (Amount)</th>
                    <th style={tableHeaderCell}>মেথড (Method)</th>
                    <th style={tableHeaderCell}>তারিখ (Date)</th>
                    <th style={tableHeaderCell}>অবস্থা (Status)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>কোনো অর্ডার পাওয়া যায়নি।</td>
                    </tr>
                  ) : (
                    filteredOrders.map(order => (
                      <tr key={order.id} style={tableRow}>
                        <td style={tableCell}><strong>{order.customer_name}</strong></td>
                        <td style={tableCell}>
                          <div style={{ fontSize: '0.85rem' }}>{order.customer_email}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{order.customer_phone}</div>
                        </td>
                        <td style={tableCell}>
                          <span style={{ fontWeight: '700', color: 'var(--color-primary-light)' }}>
                            {order.currency === 'BDT' ? '৳' : '$'}{order.total_amount}
                          </span>
                        </td>
                        <td style={tableCell}>{order.payment_method}</td>
                        <td style={tableCell}>{new Date(order.created_at).toLocaleDateString()}</td>
                        <td style={tableCell}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {order.payment_status === 'completed' ? (
                              <span style={successBadge}><CheckCircle size={12} /> Completed</span>
                            ) : order.payment_status === 'failed' ? (
                              <span style={failedBadge}><XCircle size={12} /> Failed</span>
                            ) : (
                              <span style={pendingBadge}><Clock size={12} /> Pending</span>
                            )}

                            <select 
                              value={order.payment_status} 
                              onChange={(e) => handleStatusChange(order.id, e.target.value)}
                              style={selectStatusStyle}
                            >
                              <option value="pending">Pending</option>
                              <option value="completed">Completed</option>
                              <option value="failed">Failed</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Customer Report */}
        {activeTab === 'customers' && (
          <div style={tabContainerStyle}>
            <div style={searchBarContainer}>
              <Search size={18} style={{ color: 'var(--color-text-muted)' }} />
              <input type="text" placeholder="কাস্টমার সার্চ করুন..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={searchInputStyle} />
            </div>

            <div className="premium-card" style={{ padding: '0', overflowX: 'auto', border: '1px solid var(--color-border)' }}>
              <table style={tableStyle}>
                <thead>
                  <tr style={tableHeaderRow}>
                    <th style={tableHeaderCell}>কাস্টমারের নাম (Customer)</th>
                    <th style={tableHeaderCell}>ইমেইল (Email)</th>
                    <th style={tableHeaderCell}>ফোন নম্বর (Phone)</th>
                    <th style={tableHeaderCell}>মোট ক্রয়সংখ্যা (Orders)</th>
                    <th style={tableHeaderCell}>সর্বমোট খরচ BDT (LTV)</th>
                    <th style={tableHeaderCell}>সর্বমোট খরচ USD (LTV)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>কোনো কাস্টমার পাওয়া যায়নি।</td>
                    </tr>
                  ) : (
                    filteredCustomers.map((cust, index) => (
                      <tr key={index} style={tableRow}>
                        <td style={tableCell}><strong>{cust.name}</strong></td>
                        <td style={tableCell}>{cust.email}</td>
                        <td style={tableCell}>{cust.phone}</td>
                        <td style={tableCell}><span style={numOrdersBadge}>{cust.orders_count} Orders</span></td>
                        <td style={tableCell}>৳{cust.total_spent_bdt}</td>
                        <td style={tableCell}>${cust.total_spent_usd}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: CMS Settings */}
        {activeTab === 'cms' && (
          <div style={tabContainerStyle}>
            {cmsMessage && (
              <div style={successMessageBanner}>
                <CheckCircle size={16} /> <span>{cmsMessage}</span>
              </div>
            )}

            <form onSubmit={handleCMSUpdate} style={cmsFormLayout}>
              {/* Product Pricing Configuration */}
              <div className="premium-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--color-primary-light)', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
                  Product Pricing & Offers Settings
                </h4>
                
                <div style={inputRowGroup}>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Ebook Title</label>
                    <input type="text" value={product.title} onChange={(e) => setProduct({...product, title: e.target.value})} style={inputStyle} />
                  </div>
                </div>

                <div style={inputRowGroup}>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Regular Price (BDT) ৳</label>
                    <input type="number" value={product.regular_price_bdt} onChange={(e) => setProduct({...product, regular_price_bdt: Number(e.target.value)})} style={inputStyle} />
                  </div>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Launch Offer Price (BDT) ৳</label>
                    <input type="number" value={product.launch_price_bdt} onChange={(e) => setProduct({...product, launch_price_bdt: Number(e.target.value)})} style={inputStyle} />
                  </div>
                </div>

                <div style={inputRowGroup}>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Regular Price (USD) $</label>
                    <input type="number" step="0.01" value={product.regular_price_usd} onChange={(e) => setProduct({...product, regular_price_usd: Number(e.target.value)})} style={inputStyle} />
                  </div>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Launch Offer Price (USD) $</label>
                    <input type="number" step="0.01" value={product.launch_price_usd} onChange={(e) => setProduct({...product, launch_price_usd: Number(e.target.value)})} style={inputStyle} />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginTop: '0.5rem' }}>
                  <input 
                    type="checkbox" 
                    id="is_launch_offer"
                    checked={product.is_launch_offer} 
                    onChange={(e) => setProduct({...product, is_launch_offer: e.target.checked})}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <label htmlFor="is_launch_offer" style={{ cursor: 'pointer', fontWeight: '600' }}>Active Launch Offer pricing dynamically on landing page</label>
                </div>
              </div>

              {/* Checkout Integration & Channels Configuration */}
              <div className="premium-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--color-primary-light)', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
                  Checkout Channels Settings
                </h4>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>WhatsApp Order Phone Number</label>
                  <input type="text" value={checkoutConfig.whatsapp_number} onChange={(e) => setCheckoutConfig({...checkoutConfig, whatsapp_number: e.target.value})} style={inputStyle} />
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Format: Include country code, e.g. +8801700000000</p>
                </div>

                <div style={inputGroupStyle}>
                  <label style={labelStyle}>Gumroad Product URL</label>
                  <input type="url" value={checkoutConfig.gumroad_url} onChange={(e) => setCheckoutConfig({...checkoutConfig, gumroad_url: e.target.value})} style={inputStyle} />
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', gap: '0.5rem' }}>
                <Save size={18} /> Save All Settings
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

// Admin Layout inline styles
const dashboardLayout = {
  display: 'flex',
  minHeight: '100vh',
  backgroundColor: 'var(--color-bg-deep)',
  color: '#fff',
  fontFamily: 'var(--font-english)'
};

const sidebarStyle = {
  width: '260px',
  backgroundColor: 'var(--color-bg-card)',
  borderRight: '1px solid var(--color-border)',
  display: 'flex',
  flexDirection: 'column',
  padding: '1.5rem',
  gap: '2rem'
};

const sidebarHeaderStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.3rem',
  paddingBottom: '1rem',
  borderBottom: '1px solid var(--color-border)'
};

const sidebarItem = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  width: '100%',
  padding: '0.8rem 1rem',
  background: 'none',
  border: 'none',
  borderRadius: '6px',
  color: 'var(--color-text-muted)',
  cursor: 'pointer',
  textAlign: 'left',
  fontSize: '0.9rem',
  fontWeight: '600',
  transition: 'var(--transition-smooth)'
};

const activeSidebarItem = {
  ...sidebarItem,
  color: '#000',
  backgroundColor: 'var(--color-primary)'
};

const logoutBtnStyle = {
  ...sidebarItem,
  color: '#EF4444',
  marginTop: 'auto',
  border: '1px solid rgba(239, 68, 68, 0.2)'
};

const mainContentPanel = {
  flex: 1,
  padding: '2.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  overflowY: 'auto'
};

const headerBarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid var(--color-border)',
  paddingBottom: '1rem'
};

const refreshBtnStyle = {
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid var(--color-border)',
  color: 'var(--color-text-muted)',
  padding: '0.5rem',
  borderRadius: '6px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'var(--transition-smooth)'
};

const tabContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const kpiGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '1.5rem'
};

const kpiCardStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  padding: '1.5rem'
};

const kpiHeader = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '0.85rem',
  color: 'var(--color-text-muted)',
  fontWeight: '600'
};

const chartMockupStyle = {
  background: 'rgba(0,0,0,0.2)',
  borderRadius: '8px',
  padding: '1rem',
  border: '1px solid var(--color-border)'
};

const searchBarContainer = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  backgroundColor: 'rgba(255,255,255,0.02)',
  border: '1px solid var(--color-border)',
  borderRadius: '8px',
  padding: '0.8rem 1rem'
};

const searchInputStyle = {
  background: 'none',
  border: 'none',
  outline: 'none',
  color: '#fff',
  width: '100%',
  fontFamily: 'var(--font-bengali)',
  fontSize: '0.95rem'
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  textAlign: 'left'
};

const tableHeaderRow = {
  borderBottom: '2px solid var(--color-border)',
  background: 'rgba(255,255,255,0.01)'
};

const tableHeaderCell = {
  padding: '1rem',
  fontSize: '0.85rem',
  color: 'var(--color-text-muted)',
  fontWeight: '600',
  textTransform: 'uppercase'
};

const tableRow = {
  borderBottom: '1px solid var(--color-border)',
  transition: 'var(--transition-smooth)'
};

const tableCell = {
  padding: '1rem',
  fontSize: '0.9rem'
};

const successBadge = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.3rem',
  backgroundColor: 'rgba(46, 196, 182, 0.1)',
  color: '#2EC4B6',
  padding: '0.2rem 0.5rem',
  borderRadius: '4px',
  fontSize: '0.75rem',
  fontWeight: '600'
};

const failedBadge = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.3rem',
  backgroundColor: 'rgba(239, 68, 68, 0.1)',
  color: '#EF4444',
  padding: '0.2rem 0.5rem',
  borderRadius: '4px',
  fontSize: '0.75rem',
  fontWeight: '600'
};

const pendingBadge = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.3rem',
  backgroundColor: 'rgba(212, 175, 55, 0.1)',
  color: 'var(--color-primary-light)',
  padding: '0.2rem 0.5rem',
  borderRadius: '4px',
  fontSize: '0.75rem',
  fontWeight: '600'
};

const selectStatusStyle = {
  backgroundColor: 'var(--color-bg-deep)',
  border: '1px solid var(--color-border)',
  color: '#fff',
  borderRadius: '4px',
  fontSize: '0.75rem',
  padding: '0.1rem 0.3rem',
  cursor: 'pointer'
};

const numOrdersBadge = {
  backgroundColor: 'rgba(255,255,255,0.05)',
  border: '1px solid var(--color-border)',
  padding: '0.2rem 0.5rem',
  borderRadius: '4px',
  fontSize: '0.75rem'
};

const successMessageBanner = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  backgroundColor: 'rgba(46, 196, 182, 0.1)',
  border: '1px solid rgba(46, 196, 182, 0.3)',
  color: '#2EC4B6',
  padding: '0.8rem',
  borderRadius: '6px',
  fontSize: '0.9rem'
};

const cmsFormLayout = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const inputRowGroup = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1rem'
};

const inputGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
  flex: 1
};

const labelStyle = {
  fontSize: '0.85rem',
  color: 'var(--color-text-muted)',
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
  transition: 'var(--transition-smooth)',
  width: '100%'
};
