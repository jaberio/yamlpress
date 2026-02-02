'use client';

import React, { useEffect, useState } from 'react';
import { getHighlightedCode } from '@/lib/content/syntax';
import cn from 'classnames';

// Import CSS for providers - normally dynamically loaded, but for demo:
import 'prismjs/themes/prism.css';
import 'highlight.js/styles/github.css';

import { SiteConfig } from '@/lib/types';

// Default config fallback when config is not provided
const defaultConfig: SiteConfig['syntax_highlighting'] = {
    provider: 'prism',
    theme: { light: 'github', dark: 'github-dark' },
    style: { font: 'monospace', font_size: '14px', line_numbers: false, border_radius: '8px' },
    lines: { highlight: false, highlight_color: '#fef08a' },
    ui: { copy_button: true, show_language: true, collapsible: true, max_lines: 25 },
    performance: { lazy_load: true, preload_languages: ['javascript', 'typescript'] }
};

interface CodeBlockProps {
    code: string;
    language?: string;
    className?: string;
    showLineNumbers?: boolean;
    highlightLines?: number[];
    config?: SiteConfig['syntax_highlighting']; // Pass config explicitly (optional with fallback)
}

export default function CodeBlock({ code, language = 'text', className, showLineNumbers, highlightLines = [], config: propConfig }: CodeBlockProps) {
    const config = propConfig ?? defaultConfig;
    const [highlightedHtml, setHighlightedHtml] = useState<string>('');
    const [isCollapsed, setIsCollapsed] = useState(false); // Collapsed state for large blocks
    const [isExpanded, setIsExpanded] = useState(false);   // User interaction state
    const [copied, setCopied] = useState(false);

    // Normalize language
    const lang = language.replace('language-', '');

    // Determine if we should show line numbers based on config OR specific prop override
    const showLines = showLineNumbers ?? config.style.line_numbers;

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        try {
            const result = getHighlightedCode(code, lang, config);
            // Defer state updates to avoid synchronous setState in effect
            timeoutId = setTimeout(() => {
                setHighlightedHtml(result.html);

                // Check line count for auto-collapse
                const lineCount = code.split('\n').length;
                if (config.ui.collapsible && lineCount > config.ui.max_lines) {
                    setIsCollapsed(true);
                }
            }, 0);
        } catch (e) {
            console.error("Highlighting failed", e);
            // Fallback is just leaving highlightedHtml empty, which renders raw code
        }
        return () => clearTimeout(timeoutId);
    }, [code, lang, config]);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleExpand = () => setIsExpanded(!isExpanded);
    const shouldShowCollapse = isCollapsed || (config.ui.collapsible && code.split('\n').length > config.ui.max_lines);
    const isActuallyCollapsed = shouldShowCollapse && !isExpanded;

    return (
        <div
            className={cn(
                "relative group mb-8 rounded-lg overflow-hidden bg-gray-50 dark:bg-[#1e1e1e]",
                className
            )}
            style={{
                borderRadius: config.style.border_radius,
                fontFamily: config.style.font,
                fontSize: config.style.font_size
            }}
        >
            {config.ui.show_language && (
                <div className="absolute top-0 right-0 px-3 py-1 text-xs font-mono font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/50 rounded-bl-lg backdrop-blur-sm z-10 user-select-none border-b border-l border-gray-200 dark:border-gray-700">
                    {lang.toUpperCase()}
                </div>
            )}

            {/* Copy Button */}
            {config.ui.copy_button && (
                <button
                    onClick={handleCopy}
                    className="absolute top-2 right-12 p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                    aria-label="Copy code"
                >
                    {copied ? (
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                    )}
                </button>
            )}

            <div
                className={cn("relative overflow-hidden transition-[max-height] duration-300 ease-in-out", {
                    "max-h-[500px]": isActuallyCollapsed,
                    "max-h-full": !isActuallyCollapsed
                })}
            >
                <div className="absolute top-0 left-0 w-8 h-full pointer-events-none z-10 hidden" style={{ display: showLines ? 'block' : 'none' }}></div>
                <pre
                    className={cn(
                        "overflow-x-auto p-4 text-sm leading-relaxed scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent bg-gray-50 dark:bg-[#1e1e1e] text-gray-800 dark:text-gray-200",
                        `language-${lang}`,
                        {
                            'line-numbers': showLines,
                            'pl-4': showLines,
                        }
                    )}
                    suppressHydrationWarning
                >
                    <code
                        className={`language-${lang}`}
                        dangerouslySetInnerHTML={{ __html: highlightedHtml || code }} // Fallback to raw code
                        suppressHydrationWarning
                    />
                </pre>
            </div>

            {isActuallyCollapsed && (
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-[#1e1e1e] to-transparent pointer-events-none z-20" />
            )}

            {shouldShowCollapse && (
                <button
                    onClick={toggleExpand}
                    className="relative w-full py-2 bg-gray-50 dark:bg-gray-800/80 text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-t border-gray-200 dark:border-gray-700 font-medium tracking-wide z-30"
                >
                    {isExpanded ? 'SHOW LESS' : 'SHOW MORE'}
                </button>
            )}
        </div>
    );
}
