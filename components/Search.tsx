'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArticlePreview } from '@/lib/types'
import ArticleCard from './ArticleCard'

interface SearchProps {
    articles: ArticlePreview[]
    allTags: string[]
}

export default function Search({ articles, allTags }: SearchProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedTag, setSelectedTag] = useState<string>('')
    const [filteredArticles, setFilteredArticles] = useState(articles)

    useEffect(() => {
        let results = articles

        // Filter by search query
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase()
            results = results.filter(
                (article) =>
                    article.title.toLowerCase().includes(lowerQuery) ||
                    article.excerpt.toLowerCase().includes(lowerQuery) ||
                    article.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
            )
        }

        // Filter by selected tag
        if (selectedTag) {
            results = results.filter((article) =>
                article.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase())
            )
        }

        setFilteredArticles(results)
    }, [searchQuery, selectedTag, articles])

    return (
        <div className="space-y-6">
            {/* Search and Filter Controls */}
            <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search articles..."
                        className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <svg
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                {/* Tag Filter */}
                <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
                >
                    <option value="">All Tags</option>
                    {allTags.map((tag) => (
                        <option key={tag} value={tag}>
                            {tag}
                        </option>
                    ))}
                </select>
            </div>

            {/* Results Count */}
            <div className="text-gray-600 dark:text-gray-400">
                {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'} found
            </div>

            {/* Results Grid */}
            <AnimatePresence mode="wait">
                {filteredArticles.length > 0 ? (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredArticles.map((article, index) => (
                            <motion.div
                                key={article.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ArticleCard article={article} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="no-results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-12"
                    >
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            No articles found matching your criteria.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
