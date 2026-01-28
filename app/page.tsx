import { getAllArticles, getAllTags } from '@/lib/markdown'
import { getSiteConfig } from '@/lib/config'
import Search from '@/components/Search'
import NewsletterSignup from '@/components/NewsletterSignup'
import ArticleCard from '@/components/ArticleCard'

export default function HomePage() {
  const articles = getAllArticles()
  const allTags = getAllTags()
  const config = getSiteConfig()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-light to-accent dark:from-gray-900 dark:via-gray-800 dark:to-accent-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-bold text-5xl md:text-6xl mb-4 animate-fade-in">
            {config.site.name}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-slide-up">
            {config.site.tagline}
          </p>
          <div className="flex justify-center gap-4 animate-slide-up">
            <a
              href="#articles"
              className="px-8 py-3 bg-white text-accent font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start Reading
            </a>
            <a
              href="#newsletter"
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Subscribe
            </a>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      {articles.some(a => a.featured) && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-heading font-bold text-3xl mb-8 text-gray-900 dark:text-white">
            Featured Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles
              .filter(article => article.featured)
              .slice(0, 3)
              .map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
          </div>
        </section>
      )}

      {/* All Articles Section with Search */}
      <section id="articles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-heading font-bold text-3xl mb-8 text-gray-900 dark:text-white">
          All Articles
        </h2>
        <Search articles={articles} allTags={allTags} />
      </section>

      {/* Newsletter Section */}
      {config.features.newsletter && (
        <section id="newsletter" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <NewsletterSignup />
        </section>
      )}
    </div>
  )
}
