import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import './globals.css'
import './styles/article.css'
import './styles/components.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getServerSiteConfig } from '@/lib/config-server'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const config = getServerSiteConfig()

  return {
    metadataBase: new URL(config.site.base_url || 'http://localhost:3000'),
    title: {
      default: config.site.name,
      template: `%s | ${config.site.name}`,
    },
    description: config.seo.default_description,
    keywords: config.seo.default_keywords,
    authors: [{ name: config.author.name }],
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: config.site.base_url,
      siteName: config.site.name,
      title: config.site.name,
      description: config.seo.default_description,
      images: [
        {
          url: config.seo.default_og_image,
          width: 1200,
          height: 630,
          alt: config.site.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.site.name,
      description: config.seo.default_description,
      images: [config.seo.default_og_image],
      creator: config.seo.twitter_handle,
    },
    icons: {
      icon: config.site.favicon,
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const config = getServerSiteConfig()

  return (
    <html lang={config.site.default_language} suppressHydrationWarning>
      <head>
        {/* Analytics Scripts */}
        {config.analytics.google_analytics && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${config.analytics.google_analytics}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${config.analytics.google_analytics}');
                `,
              }}
            />
          </>
        )}
        {config.analytics.plausible && (
          <script
            defer
            data-domain={config.analytics.plausible}
            src="https://plausible.io/js/script.js"
          />
        )}

      </head>
      <body className={`${inter.variable} ${roboto.variable} font-body antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Header siteName={config.site.name} />
          <main className="flex-grow">
            {children}
          </main>
          <Footer config={config} />
        </div>
      </body>
    </html>
  )
}
