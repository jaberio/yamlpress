import { SiteConfig } from './types';
import Prism from 'prismjs';
import hljs from 'highlight.js';

// Load Prism languages
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-yaml';

// Map specific Prism themes to their imports or CSS classes
// Note: In a real app with dynamic theming, we'd likely use CSS variables or a more sophisticated loading mechanism
// For this implementation, we will assume standard themes are available or loaded globally

export type HighlightResult = {
    html: string;
    language: string;
};

export const getHighlightedCode = (code: string, language: string, config: SiteConfig['syntax_highlighting']): HighlightResult => {
    const provider = config.provider;

    if (provider === 'highlightjs') {
        // Highlight.js
        const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
        return {
            html: hljs.highlight(code, { language: validLanguage }).value,
            language: validLanguage
        };
    } else {
        // PrismJS (Default)
        const grammar = Prism.languages[language] || Prism.languages.plaintext || Prism.languages.txt;
        return {
            html: Prism.highlight(code, grammar, language),
            language: language
        };
    }
};
