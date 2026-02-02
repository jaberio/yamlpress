import { notFound } from 'next/navigation'
import { getArticlesByCategory } from '@/lib/content/markdown'
import { getServerSiteConfig } from '@/lib/config/server'
import ArticleCard from '@/components/article/ArticleCard'
import { Metadata } from 'next'

// Generate static params for all categories
export async function generateStaticParams() {
    const config = getServerSiteConfig();
    if (!config.categories.enabled) return [];

    return config.categories.items.map((category) => ({
        slug: category.slug.split('/').pop() || '',
    }));
}

// Generate metadata for the specific category
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const config = getServerSiteConfig();
    const category = config.categories.items.find(c => (c.slug.split('/').pop() || '') === slug);

    if (!category) {
        return {
            title: 'Category Not Found',
        }
    }

    return {
        title: `${category.title} - ${config.site.name}`,
        description: category.description || `Articles in ${category.title}`,
    }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const config = getServerSiteConfig();

    // Check if categories are enabled
    if (!config.categories.enabled) {
        return notFound();
    }

    // Find custom category definition
    const categoryDef = config.categories.items.find(c => (c.slug.split('/').pop() || '') === slug);

    // If not in config, maybe check if it exists in markdown files? 
    // The requirement is "Categories are defined only in site-config.yaml", so if not in config, it's 404.
    if (!categoryDef) {
        return notFound();
    }

    // Because markdown matching is case insensitive but URLs might be precise, we stick to the definition ID/slug or title?
    // Markdown logic `getArticlesByCategory` filters by checking against `category` field.
    // We should assume the ID in YAML matches the `category` string in FrontMatter? 
    // Or we match against the Title? Let's use the ID for matching against FrontMatter usually, 
    // but the implementation plan says "Update getArticleBySlug to parse categories...".

    // In `markdown.ts` we implemented: 
    // article.categories?.some(c => c.toLowerCase() === category.toLowerCase())

    // So we invoke it with the category ID.
    // So we invoke it with the category ID.
    let articles = getArticlesByCategory(categoryDef.id);

    // Fallback: search by Title if ID returns nothing (e.g. "how-to" vs "How To")
    if (articles.length === 0) {
        articles = getArticlesByCategory(categoryDef.title);
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 animate-fade-in">
            {/* Hero Section */}
            <div className="relative bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="max-w-3xl">
                        <div className="text-accent dark:text-accent-light font-medium tracking-wide uppercase text-sm mb-4">
                            Category
                        </div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                            {categoryDef.title}
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                            {categoryDef.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Articles Grid */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                {articles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article) => (
                            <ArticleCard key={article.slug} article={article} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            No articles found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Check back soon for new content in this category.
                        </p>
                    </div>
                )}
            </main>
        </div>
    )
}
