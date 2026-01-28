'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function NewsletterSignup() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')

        try {
            // Call your newsletter API endpoint
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })

            if (response.ok) {
                setStatus('success')
                setMessage('Thank you for subscribing!')
                setEmail('')
            } else {
                setStatus('error')
                setMessage('Something went wrong. Please try again.')
            }
        } catch (error) {
            setStatus('error')
            setMessage('Failed to subscribe. Please try again later.')
        }

        // Reset status after 5 seconds
        setTimeout(() => {
            setStatus('idle')
            setMessage('')
        }, 5000)
    }

    return (
        <div className="bg-gradient-to-r from-accent to-accent-dark dark:from-accent-dark dark:to-accent rounded-2xl p-6 text-white shadow-lg">
            <div className="max-w-xl mx-auto text-center">
                <h3 className="font-heading font-bold text-xl mb-1">
                    Subscribe to Our Newsletter
                </h3>
                <p className="mb-4 text-white/90 text-sm">
                    Get the latest articles delivered straight to your inbox.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        disabled={status === 'loading'}
                        className="flex-1 px-3 py-2 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50"
                    />
                    <motion.button
                        type="submit"
                        disabled={status === 'loading'}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 bg-white text-accent text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                    </motion.button>
                </form>

                {/* Status Message */}
                {message && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-4 text-sm ${status === 'success' ? 'text-green-100' : 'text-red-100'
                            }`}
                    >
                        {message}
                    </motion.p>
                )}
            </div>
        </div>
    )
}
