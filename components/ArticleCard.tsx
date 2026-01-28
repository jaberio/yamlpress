'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArticlePreview } from '@/lib/types'
import { format } from 'date-fns'

interface ArticleCardProps {
    article: ArticlePreview
}

export default function ArticleCard({ article }: ArticleCardProps) {
    return (
        <motion.article
            whileHover={{
                scale: 1.02,
                y: -8,
                transition: { duration: 0.3 }
            }}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
        >
            <Link href={`/article/${article.slug}`} className="block">
                {/* Cover Image */}
                {article.coverImage && (
                    <div className="relative h-48 w-full bg-gray-200 dark:bg-gray-700">
                        <Image
                            src={article.coverImage}
                            alt={article.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                )}

                <div className="p-6">
                    {/* Tags */}
                    {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {article.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs px-3 py-1 bg-accent/10 text-accent dark:bg-accent/20 dark:text-accent-light rounded-full font-medium"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Title */}
                    <h2 className="font-heading font-bold text-xl mb-2 text-gray-900 dark:text-white line-clamp-2 hover:text-accent dark:hover:text-accent-light transition-colors">
                        {article.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                        {article.excerpt}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
                        <div className="flex items-center space-x-4">
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                                {article.author}
                            </span>
                            <span>•</span>
                            <time dateTime={article.date}>
                                {format(new Date(article.date), 'MMM d, yyyy')}
                            </time>
                        </div>
                        {article.readingTime && (
                            <span className="text-gray-500 dark:text-gray-500">
                                {article.readingTime}
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </motion.article>
    )
}
