import { getArticlesByTag, getAllTags } from '@/lib/markdown'
import { notFound } from 'next/navigation'
import ArticleCard from '@/components/ArticleCard'
import { Metadata } from 'next'

export async function generateStaticParams() {
    const tags = getAllTags()
    return tags.map((tag) => ({ tag: tag.toLowerCase() }))
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
    const { tag: tagParam } = await params
    const tag = decodeURIComponent(tagParam)
    return {
        title: `Articles tagged with "${tag}"`,
        description: `Browse all articles tagged with ${tag}`,
    }
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
    const { tag: tagParam } = await params
    const tag = decodeURIComponent(tagParam)
    const articles = getArticlesByTag(tag)

    if (articles.length === 0) {
        notFound()
    }

    return (
        <div className="min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <header className="mb-12">
                    <div className="inline-block px-4 py-2 bg-accent/10 text-accent dark:bg-accent/20 dark:text-accent-light rounded-full mb-4">
                        Tag
                    </div>
                    <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4 text-gray-900 dark:text-white">
                        {tag}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        {articles.length} {articles.length === 1 ? 'article' : 'articles'} found
                    </p>
                </header>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article) => (
                        <ArticleCard key={article.slug} article={article} />
                    ))}
                </div>
            </div>
        </div>
    )
}
