import { getSiteConfig } from '@/lib/config'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About',
    description: 'Learn more about our blog and our mission',
}

export default function AboutPage() {
    const config = getSiteConfig()

    return (
        <div className="min-h-screen py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <header className="text-center mb-12">
                    <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4 text-gray-900 dark:text-white">
                        About {config.site.name}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        {config.site.tagline}
                    </p>
                </header>

                {/* Author Section */}
                <section className="mb-12">
                    <div className="flex flex-col md:flex-row items-center gap-8 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                        {config.author.avatar && (
                            <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
                                <Image
                                    src={config.author.avatar}
                                    alt={config.author.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="font-heading font-bold text-2xl mb-2 text-gray-900 dark:text-white">
                                {config.author.name}
                            </h2>
                            {config.author.location && (
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    📍 {config.author.location}
                                </p>
                            )}
                            <p className="text-gray-700 dark:text-gray-300">
                                {config.author.bio}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="prose prose-lg dark:prose-invert max-w-none mb-12">
                    <h2 className="font-heading font-bold text-3xl mb-4">Our Mission</h2>
                    <p>
                        We believe in the power of sharing knowledge and stories. Our blog is dedicated to
                        providing high-quality content that educates, inspires, and entertains our readers.
                    </p>
                    <p>
                        Whether you're looking for technical tutorials, design inspiration, or thought-provoking
                        articles, you'll find it here. We're committed to creating a platform where ideas can
                        flourish and communities can grow.
                    </p>
                </section>

                {/* What We Write About */}
                <section className="mb-12">
                    <h2 className="font-heading font-bold text-3xl mb-6 text-gray-900 dark:text-white">
                        What We Write About
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                            <div className="text-4xl mb-4">💻</div>
                            <h3 className="font-heading font-semibold text-xl mb-2 text-gray-900 dark:text-white">
                                Technology
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Deep dives into web development, programming languages, and emerging technologies.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                            <div className="text-4xl mb-4">🎨</div>
                            <h3 className="font-heading font-semibold text-xl mb-2 text-gray-900 dark:text-white">
                                Design
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                UI/UX principles, design trends, and creative inspiration for digital products.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                            <div className="text-4xl mb-4">💡</div>
                            <h3 className="font-heading font-semibold text-xl mb-2 text-gray-900 dark:text-white">
                                Ideas
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Thought leadership, productivity tips, and insights on creativity and innovation.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="prose prose-lg dark:prose-invert max-w-none">
                    <h2 className="font-heading font-bold text-3xl mb-4">Our Values</h2>
                    <ul>
                        <li><strong>Quality over Quantity:</strong> We focus on creating in-depth, well-researched content.</li>
                        <li><strong>Accessibility:</strong> Knowledge should be accessible to everyone, regardless of background.</li>
                        <li><strong>Community:</strong> We value our readers and encourage meaningful discussions.</li>
                        <li><strong>Continuous Learning:</strong> We're always learning and growing alongside our audience.</li>
                    </ul>
                </section>
            </div>
        </div>
    )
}
