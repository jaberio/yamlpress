// TypeScript interfaces for site configuration and content

export interface SiteConfig {
    site: {
        name: string;
        tagline: string;
        logo: string;
        favicon: string;
        default_language: string;
        base_url: string;
    };
    theme: {
        colors: {
            primary: string;
            secondary: string;
            accent: string;
            background_light: string;
            background_dark: string;
            text_light: string;
            text_dark: string;
        };
        fonts: {
            heading: string;
            body: string;
        };
        default_mode: 'light' | 'dark';
    };
    analytics: {
        google_analytics?: string;
        plausible?: string;
        facebook_pixel?: string;
    };

    social: {
        twitter?: string;
        linkedin?: string;
        github?: string;
        email?: string;
    };
    categories: {
        enabled: boolean;
        items: Array<{
            id: string;
            title: string;
            slug: string;
            description?: string;
        }>;
    };
    navigation: {
        header: {
            show_categories_dropdown: boolean; // Deprecated but kept for backward compatibility if needed
            label: string;
            dropdowns?: Array<{
                label: string;
                category_ids: string[];
            }>;
        };
    };
    pages: Array<{
        title: string;
        slug: string;
        visible: boolean;
    }>;
    posts: {
        source: 'markdown' | 'cms';
        cms?: {
            // Placeholder for future CMS configuration (e.g., Netlify CMS, Forestry, etc.)
            type?: string;
            repository_url?: string;
        };
        markdown_folder: string;
        posts_per_page: number;
    };
    features: {
        newsletter: boolean;
        enable_comments?: boolean; // Toggle entire comments section
        comments: 'disqus' | 'facebook' | 'custom' | '';
        disqus_shortname?: string;
        search: boolean;
        tags: boolean;
        reading_time: boolean;
    };
    seo: {
        default_description: string;
        default_keywords: string[];
        default_og_image: string;
        twitter_handle?: string;
    };
    performance: {
        pwa: boolean;
        lazy_load_images: boolean;
        prefetch_links: boolean;
    };
    author: {
        name: string;
        bio: string;
        avatar: string;
        location?: string;
    };
    syntax_highlighting: {
        provider: 'prism' | 'highlightjs';
        theme: {
            light: string;
            dark: string;
        };
        style: {
            font: string;
            font_size: string;
            line_numbers: boolean;
            border_radius: string;
        };
        lines: {
            highlight: boolean;
            highlight_color: string;
        };
        ui: {
            show_language: boolean;
            copy_button: boolean;
            collapsible: boolean;
            max_lines: number;
        };
        performance: {
            lazy_load: boolean;
            preload_languages: string[];
        };
    };
    footer: {
        variant: 'minimal' | 'editorial' | 'full';
        seo: {
            semantic_html: boolean;
            crawlable_links: boolean;
            hide_from_homepage: boolean;
        };
        performance: {
            lazy_load_newsletter: boolean;
            no_client_js: boolean;
        };
        legal: {
            privacy_policy?: string;
            terms?: string;
            cookies?: string;
        };
        gdpr: {
            enabled: boolean;
            cookie_notice: boolean;
            notice_text: string;
        };
        style: {
            compact: boolean;
            divider: boolean;
            animation: string;
        };
    };
}

export interface ArticleFrontMatter {
    title: string;
    excerpt: string;
    author: string;
    date: string;
    tags: string[];
    categories?: string[];
    category?: string; // Forward compatibility / Legacy support
    coverImage?: string;
    readingTime?: string;
    featured?: boolean;
}

export interface Article extends ArticleFrontMatter {
    slug: string;
    content: string;
}

export interface ArticlePreview extends ArticleFrontMatter {
    slug: string;
}
