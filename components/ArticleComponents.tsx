import Image from 'next/image';
import Link from 'next/link';
import CodeBlock from './CodeBlock';
import Callout from './Callout';
import React from 'react';

// Custom Image Component
const ArticleImage = (props: any) => {
    // If width/height not provided, specific logic needed or just use fill + wrapper
    // For now, assuming basic img props or Next.js Image compatible
    if (props.src && props.src.startsWith('/')) {
        return (
            <div className="my-8 relative h-[400px] w-full rounded-lg overflow-hidden">
                <Image
                    src={props.src}
                    alt={props.alt || ''}
                    fill
                    className="object-cover"
                />
                {props.title && (
                    <div className="absolute bottom-0 w-full bg-black/60 text-white p-2 text-sm text-center">
                        {props.title}
                    </div>
                )}
            </div>
        );
    }
    // External images or without dimensions
    return (
        <figure className="my-8">
            <img
                {...props}
                className="rounded-lg max-h-[600px] w-auto mx-auto shadow-lg"
            />
            {props.alt && (
                <figcaption className="text-center text-sm text-gray-500 mt-2 italic">
                    {props.alt}
                </figcaption>
            )}
        </figure>
    );
};

// Custom Quote Component
const Quote = (props: any) => {
    return (
        <blockquote className="border-l-4 border-accent pl-4 py-2 my-6 italic text-xl text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800/50 rounded-r-lg">
            {props.children}
        </blockquote>
    );
};

// Custom Link Component
const ArticleLink = (props: any) => {
    const href = props.href;
    const isInternal = href && (href.startsWith('/') || href.startsWith('#'));

    if (isInternal) {
        return (
            <Link href={href} className="text-accent hover:underline font-medium decoration-2 underline-offset-2">
                {props.children}
            </Link>
        );
    }

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline font-medium decoration-2 underline-offset-2 inline-flex items-center gap-0.5"
        >
            {props.children}
            {/* External link icon could go here */}
        </a>
    );
};

// Map HTML elements to Components
const components = {
    // Standard HTML
    img: ArticleImage,
    blockquote: Quote,
    a: ArticleLink,
    pre: (props: any) => <div {...props} />, // Handled by CodeBlock usually, but code is nested
    code: (props: any) => {
        // If it's inline code (no className usually, or not block)
        const { className, children } = props;
        const match = /language-(\w+)/.exec(className || '');
        const isInline = !match && !String(children).includes('\n');

        if (isInline) {
            return (
                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-red-500 dark:text-red-400 font-mono text-sm font-semibold border border-gray-200 dark:border-gray-700">
                    {children}
                </code>
            );
        }

        return (
            <CodeBlock
                code={String(children).replace(/\n$/, '')}
                language={match ? match[1] : 'text'}
                className={className}
            />
        );
    },
    // Custom Components available in MDX
    Callout,
    Image: ArticleImage, // alias
};

export default components;
