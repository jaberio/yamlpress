import { getServerSiteConfig } from '@/lib/config-server'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Cookie Policy',
        description: 'Information about how we use cookies on our website.',
    }
}

export default function CookiesPage() {
    const config = getServerSiteConfig()

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 animate-fade-in">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <header className="mb-12 text-center">
                    <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-gray-900 dark:text-white mb-4">
                        Cookie Policy
                    </h1>
                    <time dateTime={new Date().toISOString()} className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">
                        Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </time>
                </header>

                <article className="prose prose-lg prose-slate dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <p className="lead">
                        This is the Cookie Policy for {config.site.name}, accessible from <a href={config.site.base_url}>{config.site.base_url}</a>.
                    </p>

                    <h3>What Are Cookies</h3>
                    <p>
                        As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or 'break' certain elements of the sites functionality.
                    </p>

                    <h3>How We Use Cookies</h3>
                    <p>
                        We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.
                    </p>

                    <h3>Disabling Cookies</h3>
                    <p>
                        You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of this site. Therefore it is recommended that you do not disable cookies.
                    </p>

                    <h3>The Cookies We Set</h3>
                    <ul>
                        <li>
                            <strong>Site preferences cookies:</strong> In order to provide you with a great experience on this site we provide the functionality to set your preferences for how this site runs when you use it. In order to remember your preferences we need to set cookies so that this information can be called whenever you interact with a page is affected by your preferences.
                        </li>
                        <li>
                            <strong>Third Party Cookies:</strong> In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.
                            <ul>
                                {config.analytics.google_analytics && <li>This site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.</li>}

                            </ul>
                        </li>
                    </ul>
                </article>
            </div>
        </div>
    )
}
