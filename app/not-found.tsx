import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="font-heading font-bold text-9xl mb-4 text-gray-900 dark:text-white">
                    404
                </h1>
                <h2 className="font-heading font-semibold text-3xl mb-4 text-gray-900 dark:text-white">
                    Page Not Found
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                    Sorry, we couldn&apos;t find the page you&apos;re looking for.
                </p>
                <Link
                    href="/"
                    className="inline-block px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition-colors"
                >
                    Go Home
                </Link>
            </div>
        </div>
    )
}
