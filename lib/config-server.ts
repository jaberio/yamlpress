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
                ads: { ...siteConfig.ads, ...yamlConfig.ads },
                site: { ...siteConfig.site, ...yamlConfig.site },
                theme: { ...siteConfig.theme, ...yamlConfig.theme },
                analytics: { ...siteConfig.analytics, ...yamlConfig.analytics },
                social: { ...siteConfig.social, ...yamlConfig.social },
                features: { ...siteConfig.features, ...yamlConfig.features },
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
