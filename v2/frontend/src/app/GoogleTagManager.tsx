'use client';

import { useEffect } from 'react';

const GTM_ID = 'GTM-XXXXXXX'; // Replace with user's GTM ID in production

export default function GoogleTagManager() {
  useEffect(() => {
    // Client-side initialization of GTM
    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    
    const d = document;
    const s = 'script';
    const l = 'dataLayer';
    
    const f = d.getElementsByTagName(s)[0];
    const j = d.createElement(s) as HTMLScriptElement;
    const dl = l !== 'dataLayer' ? '&l=' + l : '';
    
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID + dl;
    f.parentNode?.insertBefore(j, f);
  }, []);

  return null;
}
