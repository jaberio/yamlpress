// Static configuration - imported directly instead of reading YAML at runtime
// This allows the site to work with Next.js static export

import { SiteConfig } from './types';

// This configuration matches the structure from config.yaml
// Edit this file to customize your site
export const siteConfig: SiteConfig = {
    site: {
        name: "My Medium-Like Blog",
        tagline: "Ideas, Stories, and Tutorials",
        logo: "/assets/logo.png",
        favicon: "/assets/favicon.ico",
        default_language: "en",
        base_url: "https://myblog.com",
    },
    theme: {
        colors: {
            primary: "#1a202c",
            secondary: "#f6ad55",
            accent: "#4299e1",
            background_light: "#ffffff",
            background_dark: "#0f172a",
            text_light: "#2d3748",
            text_dark: "#e2e8f0",
        },
        fonts: {
            heading: "Inter, sans-serif",
            body: "Roboto, sans-serif",
        },
        default_mode: "light",
    },
    analytics: {
        google_analytics: "",
        plausible: "",
        facebook_pixel: "",
    },

    social: {
        twitter: "https://twitter.com/example",
        linkedin: "https://linkedin.com/in/example",
        github: "https://github.com/example",
        email: "hello@example.com",
    },
    categories: {
        enabled: true,
        items: []
    },
    navigation: {
        header: {
            show_categories_dropdown: false,
            label: "Articles"
        }
    },
    pages: [
        { title: "Home", slug: "/", visible: true },
        { title: "About", slug: "/about", visible: true },
        { title: "Contact", slug: "/contact", visible: true },
    ],
    posts: {
        source: "markdown",
        markdown_folder: "content/articles",
        posts_per_page: 9,
    },
    features: {
        newsletter: true,
        enable_comments: false,
        comments: "",
        disqus_shortname: "",
        search: true,
        tags: true,
        reading_time: true,
    },
    seo: {
        default_description: "A Medium-like blog built with Next.js - sharing ideas, stories, and tutorials",
        default_keywords: ["blog", "articles", "tutorials", "medium-style"],
        default_og_image: "/assets/og-image.png",
        twitter_handle: "@example",
    },
    performance: {
        pwa: true,
        lazy_load_images: true,
        prefetch_links: true,
    },
    author: {
        name: "John Doe",
        bio: "Writer, developer, and creator. Passionate about technology and storytelling.",
        avatar: "/assets/author-avatar.png",
        location: "San Francisco, CA",
    },
    syntax_highlighting: {
        provider: "prism",
        theme: {
            light: "one-light",
            dark: "one-dark",
        },
        style: {
            font: "JetBrains Mono, monospace",
            font_size: "0.9rem",
            line_numbers: true,
            border_radius: "12px",
        },
        lines: {
            highlight: true,
            highlight_color: "rgba(255, 200, 0, 0.15)",
        },
        ui: {
            show_language: true,
            copy_button: true,
            collapsible: true,
            max_lines: 50,
        },
        performance: {
            lazy_load: true,
            preload_languages: ["js", "ts", "json", "bash"],
        },
    },
    footer: {
        variant: "editorial",
        seo: {
            semantic_html: true,
            crawlable_links: true,
            hide_from_homepage: false,
        },
        performance: {
            lazy_load_newsletter: true,
            no_client_js: true,
        },
        legal: {
            privacy_policy: "/privacy",
            terms: "/terms",
            cookies: "/cookies",
        },
        gdpr: {
            enabled: true,
            cookie_notice: true,
            notice_text: "This site uses privacy-friendly analytics.",
        },
        style: {
            compact: false,
            divider: true,
            animation: "fade-in",
        },
    },
};

/**
 * Get the site configuration
 */
export function getSiteConfig(): SiteConfig {
    return siteConfig;
}

/**
 * Get a specific configuration value by path
 * Example: getConfigValue('theme.colors.primary')
 */
export function getConfigValue(path: string): any {
    const config = getSiteConfig();
    const keys = path.split('.');
    let value: any = config;

    for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
            value = value[key];
        } else {
            return undefined;
        }
    }

    return value;
}

/**
 * Check if a feature is enabled
 */
export function isFeatureEnabled(feature: keyof SiteConfig['features']): boolean {
    const config = getSiteConfig();
    return config.features[feature] as boolean;
}
