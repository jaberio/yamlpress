import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { siteConfig } from './config';
import { SiteConfig } from './types';

/**
 * Get the site configuration (Server Side Only)
 * Merges default static config with values from site-config.yaml
 */
export function getServerSiteConfig(): SiteConfig {
    try {
        const configPath = path.join(process.cwd(), 'config.yaml');
        if (fs.existsSync(configPath)) {
            const fileContents = fs.readFileSync(configPath, 'utf8');
            const yamlConfig = yaml.load(fileContents) as Partial<SiteConfig>;

            return {
                ...siteConfig,
                ...yamlConfig,

                site: {
                    ...siteConfig.site,
                    ...yamlConfig.site,
                    base_url: process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || yamlConfig.site?.base_url || siteConfig.site.base_url
                },
                theme: { ...siteConfig.theme, ...yamlConfig.theme },
                analytics: {
                    ...siteConfig.analytics,
                    ...yamlConfig.analytics,
                    google_analytics: process.env.NEXT_PUBLIC_GA_ID || yamlConfig.analytics?.google_analytics || siteConfig.analytics.google_analytics,
                    plausible: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || yamlConfig.analytics?.plausible || siteConfig.analytics.plausible,
                    facebook_pixel: process.env.NEXT_PUBLIC_FB_PIXEL_ID || yamlConfig.analytics?.facebook_pixel || siteConfig.analytics.facebook_pixel
                },
                social: { ...siteConfig.social, ...yamlConfig.social },
                features: {
                    ...siteConfig.features,
                    ...yamlConfig.features,
                    disqus_shortname: process.env.DISQUS_SHORTNAME || yamlConfig.features?.disqus_shortname || siteConfig.features.disqus_shortname
                },
                seo: { ...siteConfig.seo, ...yamlConfig.seo },
                author: { ...siteConfig.author, ...yamlConfig.author },
                syntax_highlighting: { ...siteConfig.syntax_highlighting, ...yamlConfig.syntax_highlighting },
                footer: {
                    ...siteConfig.footer, ...yamlConfig.footer,
                    seo: { ...siteConfig.footer.seo, ...yamlConfig.footer?.seo },
                    performance: { ...siteConfig.footer.performance, ...yamlConfig.footer?.performance },
                    legal: { ...siteConfig.footer.legal, ...yamlConfig.footer?.legal },
                    gdpr: { ...siteConfig.footer.gdpr, ...yamlConfig.footer?.gdpr },
                    style: { ...siteConfig.footer.style, ...yamlConfig.footer?.style },
                }
            };
        }
    } catch (error) {
        console.error('Error reading site-config.yaml:', error);
    }

    return siteConfig;
}
