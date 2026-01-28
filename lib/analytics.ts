/**
 * Analytics integration utilities
 * Supports Google Analytics, Plausible, and Facebook Pixel
 */

import { getSiteConfig } from './config';

/**
 * Initialize analytics scripts based on configuration
 */
export function initializeAnalytics() {
    const config = getSiteConfig();

    // Google Analytics
    if (config.analytics.google_analytics) {
        initGoogleAnalytics(config.analytics.google_analytics);
    }

    // Plausible Analytics
    if (config.analytics.plausible) {
        initPlausible(config.analytics.plausible);
    }

    // Facebook Pixel
    if (config.analytics.facebook_pixel) {
        initFacebookPixel(config.analytics.facebook_pixel);
    }
}

/**
 * Initialize Google Analytics
 */
function initGoogleAnalytics(measurementId: string) {
    if (typeof window === 'undefined') return;

    // Add gtag script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script1);

    // Initialize gtag
    const script2 = document.createElement('script');
    script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}');
  `;
    document.head.appendChild(script2);
}

/**
 * Initialize Plausible Analytics
 */
function initPlausible(domain: string) {
    if (typeof window === 'undefined') return;

    const script = document.createElement('script');
    script.defer = true;
    script.setAttribute('data-domain', domain);
    script.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(script);
}

/**
 * Initialize Facebook Pixel
 */
function initFacebookPixel(pixelId: string) {
    if (typeof window === 'undefined') return;

    const script = document.createElement('script');
    script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${pixelId}');
    fbq('track', 'PageView');
  `;
    document.head.appendChild(script);

    // Add noscript pixel
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `
    <img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1"/>
  `;
    document.body.appendChild(noscript);
}

/**
 * Track a custom event (works with Google Analytics)
 */
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, eventParams);
    }
}

/**
 * Track a page view
 */
export function trackPageView(url: string) {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', getSiteConfig().analytics.google_analytics, {
            page_path: url,
        });
    }
}
