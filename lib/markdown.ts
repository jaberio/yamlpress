import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { Article, ArticlePreview, ArticleFrontMatter } from './types';
import { getSiteConfig } from './config';

/**
 * Get the path to the articles directory
 */
function getArticlesDirectory(): string {
    const config = getSiteConfig();
    return path.join(process.cwd(), config.posts.markdown_folder);
}

/**
 * Get all article slugs (filenames without .md extension)
 */
export function getAllArticleSlugs(): string[] {
    const articlesDirectory = getArticlesDirectory();

    if (!fs.existsSync(articlesDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(articlesDirectory);
    return fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(fileName => fileName.replace(/\.md$/, ''));
}

/**
 * Get article data by slug
 */
export function getArticleBySlug(slug: string): Article {
    const articlesDirectory = getArticlesDirectory();
    const fullPath = path.join(articlesDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse front matter and content
    const { data, content } = matter(fileContents);

    // Calculate reading time
    const stats = readingTime(content);

    return {
        slug,
        content,
        title: data.title || '',
        excerpt: data.excerpt || '',
        author: data.author || '',
        date: data.date || '',
        tags: data.tags || [],
        category: data.category,
        coverImage: data.coverImage,
        readingTime: data.readingTime || stats.text,
        featured: data.featured || false,
    };
}

/**
 * Get all articles with their metadata (without full content)
 */
export function getAllArticles(): ArticlePreview[] {
    const slugs = getAllArticleSlugs();
    const articles = slugs
        .map(slug => {
            const article = getArticleBySlug(slug);
            // Return preview without full content
            const { content, ...preview } = article;
            return preview;
        })
        .sort((a, b) => {
            // Sort by date, newest first
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

    return articles;
}

/**
 * Get articles by tag
 */
export function getArticlesByTag(tag: string): ArticlePreview[] {
    const allArticles = getAllArticles();
    return allArticles.filter(article =>
        article.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
}

/**
 * Get articles by category
 */
export function getArticlesByCategory(category: string): ArticlePreview[] {
    const allArticles = getAllArticles();
    return allArticles.filter(article =>
        article.category?.toLowerCase() === category.toLowerCase()
    );
}

/**
 * Get all unique tags from all articles
 */
export function getAllTags(): string[] {
    const articles = getAllArticles();
    const tagsSet = new Set<string>();

    articles.forEach(article => {
        article.tags.forEach(tag => tagsSet.add(tag));
    });

    return Array.from(tagsSet).sort();
}

/**
 * Get all unique categories from all articles
 */
export function getAllCategories(): string[] {
    const articles = getAllArticles();
    const categoriesSet = new Set<string>();

    articles.forEach(article => {
        if (article.category) {
            categoriesSet.add(article.category);
        }
    });

    return Array.from(categoriesSet).sort();
}

/**
 * Get featured articles
 */
export function getFeaturedArticles(): ArticlePreview[] {
    const allArticles = getAllArticles();
    return allArticles.filter(article => article.featured);
}

/**
 * Search articles by query (searches title, excerpt, and tags)
 */
export function searchArticles(query: string): ArticlePreview[] {
    const allArticles = getAllArticles();
    const lowerQuery = query.toLowerCase();

    return allArticles.filter(article => {
        const titleMatch = article.title.toLowerCase().includes(lowerQuery);
        const excerptMatch = article.excerpt.toLowerCase().includes(lowerQuery);
        const tagsMatch = article.tags.some(tag =>
            tag.toLowerCase().includes(lowerQuery)
        );

        return titleMatch || excerptMatch || tagsMatch;
    });
}
