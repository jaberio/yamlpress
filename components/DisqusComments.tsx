'use client'

import { useEffect } from 'react'

interface DisqusCommentsProps {
    shortname: string
    url: string
    identifier: string
    title?: string
}

declare global {
    interface Window {
        DISQUS: any
        disqus_config: any
    }
}

export default function DisqusComments({ shortname, url, identifier, title }: DisqusCommentsProps) {
    useEffect(() => {
        // Ensure we are in the browser
        if (typeof window === 'undefined') return

        const loadDisqus = () => {
            if (window.DISQUS) {
                // Disqus is already loaded, reset it for the new page
                window.DISQUS.reset({
                    reload: true,
                    config: function (this: any) {
                        this.page.identifier = identifier
                        this.page.url = url
                        if (title) this.page.title = title
                    }
                })
            } else {
                // First time loading: set up the config
                window.disqus_config = function (this: any) {
                    this.page.identifier = identifier
                    this.page.url = url
                    if (title) this.page.title = title
                }

                // Check if script already exists to avoid duplicates
                if (document.getElementById('disqus_embed_script')) return

                const d = document
                const s = d.createElement('script')
                s.src = `https://${shortname}.disqus.com/embed.js`
                s.setAttribute('data-timestamp', (+new Date()).toString())
                s.id = 'disqus_embed_script'
                    ; (d.head || d.body).appendChild(s)
            }
        }

        loadDisqus()
    }, [shortname, url, identifier, title])

    return (
        <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800 animate-fade-in">
            <h3 className="font-heading font-bold text-2xl mb-8">Comments</h3>
            <div id="disqus_thread" className="min-h-[200px]"></div>
        </div>
    )
}
