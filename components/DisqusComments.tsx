'use client'

import { useEffect } from 'react'

interface DisqusCommentsProps {
    shortname: string
    url: string
    identifier: string
}

export default function DisqusComments({ shortname, url, identifier }: DisqusCommentsProps) {
    useEffect(() => {
        // DISQUS script loading logic
        const loadDisqus = () => {
            // @ts-ignore
            if (window.DISQUS) {
                // @ts-ignore
                window.DISQUS.reset({
                    reload: true,
                    config: function (this: any) {
                        this.page.url = url
                        this.page.identifier = identifier
                    }
                })
            } else {
                // Set the config variables
                // @ts-ignore
                window.disqus_config = function (this: any) {
                    this.page.url = url
                    this.page.identifier = identifier
                }

                // Load the script
                const d = document
                const s = d.createElement('script')
                s.src = `https://${shortname}.disqus.com/embed.js`
                s.setAttribute('data-timestamp', (+new Date()).toString())
                    ; (d.head || d.body).appendChild(s)
            }
        }

        loadDisqus()

        // Cleanup helps avoid multiple instances if the component unmounts quickly
        return () => {
            // Clean up if necessary, though Disqus is global
        }
    }, [shortname, url, identifier])

    return (
        <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
            <h3 className="font-heading font-bold text-2xl mb-8">Comments</h3>
            <div id="disqus_thread"></div>
        </div>
    )
}
