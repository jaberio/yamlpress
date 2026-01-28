'use client';

import { useEffect, useState } from 'react';
import cn from 'classnames';

interface TableOfContentsProps {
    headings: { id: string; text: string; level: number }[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '0px 0px -80% 0px' }
        );

        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => {
            headings.forEach(({ id }) => {
                const element = document.getElementById(id);
                if (element) observer.unobserve(element);
            });
        };
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <nav className="hidden lg:block sticky top-24 ml-8 max-w-xs self-start overflow-y-auto max-h-[80vh]">
            <h4 className="font-heading font-bold text-sm text-gray-900 dark:text-gray-100 mb-4 uppercase tracking-wider">
                On this page
            </h4>
            <ul className="space-y-2 border-l border-gray-200 dark:border-gray-800">
                {headings.map(({ id, text, level }) => (
                    <li key={id} className={cn(
                        "transition-all duration-200",
                        {
                            "pl-4": level === 2,
                            "pl-8": level === 3,
                            "pl-12": level === 4,
                        }
                    )}>
                        <a
                            href={`#${id}`}
                            className={cn(
                                "block text-xs py-0.5 border-l-2 -ml-[1px] transition-colors duration-200 hover:text-accent",
                                activeId === id
                                    ? "border-accent text-accent font-medium bg-accent/5"
                                    : "border-transparent text-gray-500 dark:text-gray-400"
                            )}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(id)?.scrollIntoView({
                                    behavior: 'smooth'
                                });
                                setActiveId(id);
                            }}
                        >
                            {text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
