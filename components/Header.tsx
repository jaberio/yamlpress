'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import { SiteConfig } from '@/lib/types'
import CategoryDropdown from './CategoryDropdown'


interface HeaderProps {
    siteName: string
    config: SiteConfig
}

export default function Header({ siteName, config }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const navigation = [
        { title: 'Home', slug: '/' },
        { title: 'About', slug: '/about' },
        { title: 'Contact', slug: '/contact' },
    ]

    return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="font-heading font-bold text-2xl text-primary dark:text-white"
                        >
                            {siteName}
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {/* Multi-Dropdowns */}
                        {config.navigation?.header.dropdowns?.map((dropdown, index) => {
                            const dropdownCategories = config.categories?.items.filter(cat =>
                                dropdown.category_ids.includes(cat.id)
                            );

                            if (!dropdownCategories || dropdownCategories.length === 0) return null;

                            return (
                                <CategoryDropdown
                                    key={index}
                                    categories={dropdownCategories}
                                    label={dropdown.label}
                                />
                            );
                        })}

                        {/* Legacy Fallback: Single Categories Dropdown */}
                        {!config.navigation?.header.dropdowns && config.navigation?.header.show_categories_dropdown && config.categories?.enabled && config.categories.items.length > 0 && (
                            <CategoryDropdown
                                categories={config.categories.items}
                                label={config.navigation.header.label}
                            />
                        )}

                        {navigation.map((item) => (
                            <Link
                                key={item.slug}
                                href={item.slug}
                                className="text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent-light transition-colors font-medium"
                            >
                                {item.title}
                            </Link>
                        ))}
                        <ThemeToggle />
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <ThemeToggle />
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {mobileMenuOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="py-4 space-y-2">
                                {/* Mobile Categories */}
                                {/* Mobile Multi-Dropdowns */}
                                {config.navigation?.header.dropdowns?.map((dropdown, index) => {
                                    const dropdownCategories = config.categories?.items.filter(cat =>
                                        dropdown.category_ids.includes(cat.id)
                                    );

                                    if (!dropdownCategories || dropdownCategories.length === 0) return null;

                                    return (
                                        <div key={index} className="mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
                                            <div className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                                {dropdown.label}
                                            </div>
                                            {dropdownCategories.map((cat) => (
                                                <Link
                                                    key={cat.id}
                                                    href={cat.slug}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors pl-6"
                                                >
                                                    {cat.title}
                                                </Link>
                                            ))}
                                        </div>
                                    );
                                })}

                                {/* Legacy Fallback Mobile */}
                                {!config.navigation?.header.dropdowns && config.categories?.enabled && config.categories.items.length > 0 && (
                                    <div className="mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
                                        <div className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                            {config.navigation?.header.label || "Articles"}
                                        </div>
                                        {config.categories.items.map((cat) => (
                                            <Link
                                                key={cat.id}
                                                href={cat.slug}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors pl-6"
                                            >
                                                {cat.title}
                                            </Link>
                                        ))}
                                    </div>
                                )}

                                {navigation.map((item) => (
                                    <Link
                                        key={item.slug}
                                        href={item.slug}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    )
}
