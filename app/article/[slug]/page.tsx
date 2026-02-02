import { notFound } from 'next/navigation'
import { getArticleBySlug, getAllArticleSlugs, getAllArticles } from '@/lib/content/markdown'
import { getServerSiteConfig } from '@/lib/config/server'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { Metadata } from 'next'

import NewsletterSignup from '@/components/marketing/NewsletterSignup'
import ArticleCard from '@/components/article/ArticleCard'
import { MDXRemote } from 'next-mdx-remote/rsc'
import components from '@/components/article/ArticleComponents'
import TableOfContents from '@/components/article/TableOfContents'
import ProgressBar from '@/components/ui/ProgressBar'
import DisqusComments from '@/components/comments/DisqusComments'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'
import remarkDirective from 'remark-directive'
import { remarkCalloutDirective } from '@/lib/content/remark'

// Generate static params for all articles
export async function generateStaticParams() {
    const slugs = getAllArticleSlugs()
    return slugs.map((slug) => ({ slug }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const article = getArticleBySlug(slug)
    const config = getServerSiteConfig()

    if (!article) {
        return {
            title: 'Article Not Found',
        }
    }

    return {
        title: article.title,
        description: article.excerpt,
        keywords: article.tags,
        authors: [{ name: article.author }],
        openGraph: {
            type: 'article',
            title: article.title,
            description: article.excerpt,
            images: article.coverImage ? [article.coverImage] : [config.seo.default_og_image],
            publishedTime: article.date,
            authors: [article.author],
            tags: article.tags,
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: article.excerpt,
            images: article.coverImage ? [article.coverImage] : [config.seo.default_og_image],
        },
    }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    let article
    try {
        article = getArticleBySlug(slug)
    } catch (_error) {
        notFound()
    }

    const config = getServerSiteConfig()
    const allArticles = getAllArticles()
    const relatedArticles = allArticles
        .filter(a =>
            a.slug !== article.slug &&
            a.tags.some(tag => article.tags.includes(tag))
        )
        .slice(0, 3)

    // Extract headings for Table of Contents
    const headings = article.content.match(/^#{2,4}\s+(.+)$/gm)?.map(heading => {
        const level = heading.match(/^#+/)?.[0].length || 2;
        const text = heading.replace(/^#+\s+/, '');
        const id = text.toLowerCase().replace(/[^\w]+/g, '-');
        return { id, text, level };
    }) || [];




    return (
        <article className="min-h-screen">
            <ProgressBar />

            {/* Article Header */}
            <header className="bg-gradient-to-br from-primary to-accent dark:from-gray-900 dark:to-accent-dark text-white pt-16 pb-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {article.tags.map((tag) => (
                            <Link
                                key={tag}
                                href={`/tag/${tag.toLowerCase()}`}
                                className="text-xs px-3 py-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-colors font-medium tracking-wide uppercase"
                            >
                                {tag}
                            </Link>
                        ))}
                    </div>

                    {/* Title */}
                    <h1 className="font-heading font-extrabold text-4xl md:text-6xl mb-6 leading-tight tracking-tight">
                        {article.title}
                    </h1>

                    {/* Excerpt */}
                    <p className="text-xl md:text-2xl text-white/90 mb-8 font-light leading-relaxed max-w-3xl">
                        {article.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-6 text-white/80 text-sm font-medium">
                        <div className="flex items-center gap-3">
                            {config.author.avatar && (
                                <Image
                                    src={config.author.avatar}
                                    alt={article.author}
                                    width={40}
                                    height={40}
                                    className="rounded-full border-2 border-white/30"
                                />
                            )}
                            <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            <time dateTime={article.date}>
                                {format(new Date(article.date), 'MMMM d, yyyy')}
                            </time>
                        </div>
                        {article.readingTime && (
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span>{article.readingTime}</span>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Cover Image */}
            {article.coverImage && (
                <div className="relative w-full h-[450px] -mt-20 z-20 mb-12">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                        <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                            <a
                                href={article.coverImage}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full h-full cursor-zoom-in relative"
                            >
                                <Image
                                    src={article.coverImage}
                                    alt={article.title}
                                    fill
                                    className="object-cover transition-transform duration-700 hover:scale-105"
                                    priority
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content Layout */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-24">
                {/* Floating Share Buttons (Left Sidebar) */}
                <aside className="hidden lg:block lg:col-span-1 relative">
                    <div className="sticky top-32 flex flex-col gap-4 items-center">
                        <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(config.site.base_url + '/article/' + article.slug)}`}
                            target="_blank" rel="noopener noreferrer"
                            className="p-3 bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-[#1DA1F2] rounded-full transition-colors hover:scale-110" title="Share on Twitter">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                        </a>
                        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(config.site.base_url + '/article/' + article.slug)}`}
                            target="_blank" rel="noopener noreferrer"
                            className="p-3 bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-[#0A66C2] rounded-full transition-colors hover:scale-110" title="Share on LinkedIn">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                        </a>
                    </div>
                </aside>

                {/* Article Content */}
                <div className="col-span-1 lg:col-span-8">
                    <div className="prose prose-lg dark:prose-invert max-w-none 
                        prose-headings:font-heading prose-headings:font-bold 
                        prose-h1:text-4xl prose-h1:mb-8 prose-h1:text-gray-900 prose-h1:dark:text-gray-50
                        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-gray-800 prose-h2:dark:text-gray-100
                        prose-p:leading-8 prose-p:text-gray-700 prose-p:dark:text-gray-300
                        prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                        prose-img:rounded-xl prose-img:shadow-lg
                        prose-blockquote:border-accent prose-blockquote:bg-gray-50 prose-blockquote:dark:bg-gray-800/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:rounded-r-lg
                    ">
                        <MDXRemote
                            source={article.content}
                            components={{
                                ...components,
                                code: (props: React.ComponentPropsWithoutRef<'code'>) => <components.code {...props} config={config.syntax_highlighting} />
                            }}
                            options={{
                                parseFrontmatter: true,
                                mdxOptions: {
                                    remarkPlugins: [
                                        remarkGfm,
                                        remarkDirective,
                                        remarkCalloutDirective
                                    ],
                                    rehypePlugins: [
                                        rehypeSlug,
                                        rehypeAutolinkHeadings
                                    ]
                                }
                            }}
                        />
                    </div>



                    {/* Mobile Share (Bottom) */}
                    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 lg:hidden">
                        <h3 className="font-heading font-semibold text-lg mb-4">Share this article</h3>
                        <div className="flex gap-4">
                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(config.site.base_url + '/article/' + article.slug)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                            >
                                Twitter
                            </a>
                            <a
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(config.site.base_url + '/article/' + article.slug)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-5 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium"
                            >
                                LinkedIn
                            </a>
                        </div>
                    </div>

                    {/* Comments Section */}
                    {config.features.enable_comments && config.features.comments === 'disqus' && config.features.disqus_shortname && (
                        <DisqusComments
                            shortname={config.features.disqus_shortname}
                            url={`${config.site.base_url}/article/${article.slug}`}
                            identifier={article.slug}
                            title={article.title}
                        />
                    )}
                </div>

                {/* Table of Contents (Right Sidebar) */}
                <aside className="hidden lg:block lg:col-span-3 relative">
                    {headings.length > 0 && <TableOfContents headings={headings} />}
                </aside>
            </div>

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
                <section className="bg-gray-50 dark:bg-gray-900 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="font-heading font-bold text-3xl mb-8 text-gray-900 dark:text-white">
                            Related Articles
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedArticles.map((relatedArticle) => (
                                <ArticleCard key={relatedArticle.slug} article={relatedArticle} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Newsletter CTA */}
            {config.features.newsletter && (
                <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <NewsletterSignup />
                </section>
            )}
        </article>
    )
}
