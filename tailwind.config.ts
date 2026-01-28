import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#1a202c',
                    light: '#2d3748',
                    dark: '#0f172a',
                },
                secondary: {
                    DEFAULT: '#f6ad55',
                    light: '#fbd38d',
                    dark: '#ed8936',
                },
                accent: {
                    DEFAULT: '#4299e1',
                    light: '#63b3ed',
                    dark: '#2c5282',
                },
                border: 'hsl(var(--border) / <alpha-value>)',
                background: 'hsl(var(--background) / <alpha-value>)',
                foreground: 'hsl(var(--foreground) / <alpha-value>)',
            },
            fontFamily: {
                heading: ['Inter', 'sans-serif'],
                body: ['Roboto', 'sans-serif'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};

export default config;
