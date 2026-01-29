'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { SiteConfig } from '@/lib/types'

interface CategoryDropdownProps {
    categories: SiteConfig['categories']['items']
    label?: string
}

export default function CategoryDropdown({ categories, label = "Articles" }: CategoryDropdownProps) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    // Handle outside click to close
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setIsOpen(true)
    }

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false)
        }, 300) // Small delay for better UX
    }

    return (
        <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-accent dark:hover:text-accent-light transition-colors font-medium focus:outline-none"
                aria-expanded={isOpen}
            >
                <span>{label}</span>
                <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
                    >
                        <div className="py-2">
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={category.slug}
                                    className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                        {category.title}
                                    </div>
                                    {category.description && (
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                                            {category.description}
                                        </div>
                                    )}
                                </Link>
                            ))}
                            {/* View All Details Link */}
                            <div className="border-t border-gray-100 dark:border-gray-700 mt-1 pt-1 bg-gray-50/50 dark:bg-gray-800/50">
                                <Link
                                    href="/"
                                    className="block px-4 py-2 text-xs font-medium text-accent hover:text-accent-dark text-center"
                                    onClick={() => setIsOpen(false)}
                                >
                                    View All Articles
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
