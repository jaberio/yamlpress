'use client'

import { useEffect, useRef } from 'react'
import { getSiteConfig } from '@/lib/config'

interface AdsBannerProps {
    slot?: string;
    format?: string;
    adClient?: string;
    adSlot?: string;
    customCode?: string;
}

export default function AdsBanner({
    slot = 'auto',
    format = 'auto',
    adClient,
    adSlot,
    customCode
}: AdsBannerProps) {
    // If props are provided (from server config), use them.
    // Fallback to static config ONLY if props are missing (e.g. usage on client pages where static is acceptable)
    const staticConfig = getSiteConfig();

    // Parse the static config string
    const staticAdConfig = staticConfig.ads.google_adsense ? staticConfig.ads.google_adsense.split('/') : [];
    const staticClientId = staticAdConfig[0];
    const staticDefaultSlot = staticAdConfig.length > 1 ? staticAdConfig[1] : undefined;

    // Determine final clientId
    const finalClientId = adClient || staticClientId;

    // Determine final slotId
    let finalSlotId;
    if (adSlot) {
        finalSlotId = adSlot;
    } else if (slot === 'auto' && staticDefaultSlot) {
        finalSlotId = staticDefaultSlot;
    } else {
        finalSlotId = slot;
    }

    // Determine final customCode
    const finalCustomCode = customCode || staticConfig.ads.custom_ads_code;



    const adInitialized = useRef(false)

    useEffect(() => {
        // Initialize Google AdSense
        if (finalClientId && !adInitialized.current) {
            try {
                console.log('Initializing Adsense for:', finalClientId);
                ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
                adInitialized.current = true
            } catch (error) {
                console.error('AdSense error:', error)
            }
        }
    }, [finalClientId])

    if (!finalClientId && !finalCustomCode) {
        return <div className="p-4 bg-red-100 text-red-800 border border-red-300">Ads Config Missing (Client)</div>;
    }

    return (
        <div className="my-8 flex justify-center overflow-hidden">
            {finalClientId && (
                <div style={{ width: '100%', minHeight: '250px', display: 'flex', justifyContent: 'center' }}>
                    <ins
                        className="adsbygoogle"
                        style={{ display: 'block', minWidth: '300px', minHeight: '250px', width: '100%' }}
                        data-ad-client={finalClientId}
                        data-ad-slot={finalSlotId}
                        data-ad-format={format}
                        data-full-width-responsive="true"
                    />
                </div>
            )}

            {finalCustomCode && (
                <div dangerouslySetInnerHTML={{ __html: finalCustomCode }} />
            )}
        </div>
    )
}
