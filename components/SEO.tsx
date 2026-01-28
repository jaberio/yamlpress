import Head from 'next/head'
import { getSiteConfig } from '@/lib/config'

interface SEOProps {
    title?: string
    description?: string
    keywords?: string[]
    ogImage?: string
    article?: {
        publishedTime: string
        author: string
        tags: string[]
    }
    canonicalUrl?: string
}

export default function SEO({
    title,
    description,
    keywords,
    ogImage,
    article,
    canonicalUrl,
}: SEOProps) {
    const config = getSiteConfig()

    const siteTitle = title ? `${title} | ${config.site.name}` : config.site.name
    const siteDescription = description || config.seo.default_description
    const siteKeywords = keywords || config.seo.default_keywords
    const siteImage = ogImage || config.seo.default_og_image
    const siteUrl = canonicalUrl || config.site.base_url

    return (
        <Head>
            {/* Basic Meta Tags */}
            <title>{siteTitle}</title>
            <meta name="description" content={siteDescription} />
            <meta name="keywords" content={siteKeywords.join(', ')} />
            <link rel="canonical" href={siteUrl} />

            {/* Open Graph */}
            <meta property="og:type" content={article ? 'article' : 'website'} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={siteDescription} />
            <meta property="og:image" content={siteImage} />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:site_name" content={config.site.name} />

            {/* Article specific Open Graph tags */}
            {article && (
                <>
                    <meta property="article:published_time" content={article.publishedTime} />
                    <meta property="article:author" content={article.author} />
                    {article.tags.map((tag) => (
                        <meta key={tag} property="article:tag" content={tag} />
                    ))}
                </>
            )}

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={siteDescription} />
            <meta name="twitter:image" content={siteImage} />
            {config.seo.twitter_handle && (
                <meta name="twitter:site" content={config.seo.twitter_handle} />
            )}

            {/* Favicon */}
            <link rel="icon" href={config.site.favicon} />
        </Head>
    )
}
