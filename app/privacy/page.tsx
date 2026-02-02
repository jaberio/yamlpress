import { getServerSiteConfig } from '@/lib/config/server'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Privacy Policy',
        description: 'Privacy Policy and data collection practices.',
    }
}

export default function PrivacyPage() {
    const config = getServerSiteConfig()

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 animate-fade-in">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <header className="mb-12 text-center">
                    <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-gray-900 dark:text-white mb-4">
                        Privacy Policy
                    </h1>
                    <time dateTime={new Date().toISOString()} className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">
                        Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </time>
                </header>

                <article className="prose prose-lg prose-slate dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <p className="lead">
                        Your privacy is important to us. It is {config.site.name}&apos;s policy to respect your privacy regarding any information we may collect from you across our website, <a href={config.site.base_url}>{config.site.base_url}</a>, and other sites we own and operate.
                    </p>

                    <h3>1. Information We Collect</h3>
                    <p>
                        We act as a data controller for your information. To correct, update, or remove such information, please contact us at <a href={`mailto:${config.social.email}`}>{config.social.email}</a>.
                    </p>
                    <p>
                        We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
                    </p>

                    <h3>2. How We Use Information</h3>
                    <p>
                        We retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.
                    </p>

                    <h3>3. Third Parties</h3>
                    <p>
                        Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
                    </p>
                    <p>
                        You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.
                    </p>
                    <p>
                        Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.
                    </p>
                </article>
            </div>
        </div>
    )
}
