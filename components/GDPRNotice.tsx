'use client';

import { useState, useEffect } from 'react';

interface GDPRNoticeProps {
    text: string;
}

export default function GDPRNotice({ text }: GDPRNoticeProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already accepted
        const accepted = localStorage.getItem('gdpr_accepted');
        if (!accepted) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('gdpr_accepted', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-w-sm text-sm z-50 animate-slide-up">
            <p className="mb-3 text-gray-700 dark:text-gray-300">{text}</p>
            <div className="flex gap-2">
                <button
                    onClick={handleAccept}
                    className="px-3 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded text-xs font-bold hover:opacity-90 transition-opacity"
                >
                    Accept
                </button>
                <button
                    onClick={() => setIsVisible(false)}
                    className="px-3 py-1 text-gray-500 dark:text-gray-400 text-xs hover:underline"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
