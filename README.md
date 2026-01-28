# Next-Medium

> [!WARNING]
> 🚧 **Under Development**: This project is currently in active development. Features and APIs are subject to change.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/jaberio/next-medium)

A fully static, production-ready Next.js 13+ blog inspired by Medium.com. Features include rich animations, dark mode, SEO optimization, analytics, ads integration, and complete YAML-based configuration.

## ✨ Features

- 🎨 **Beautiful Design**: Clean, Medium-inspired UI with smooth animations
- 🌓 **Dark Mode**: Automatic theme detection with manual toggle
- 📱 **Fully Responsive**: Perfect on desktop, tablet, and mobile
- ⚡ **Lightning Fast**: Static site generation for optimal performance
- 🔍 **SEO Optimized**: Meta tags, Open Graph, JSON-LD structured data
- 🎯 **Tag System**: Filter articles by tags and categories
- 🔎 **Search**: Real-time article search functionality
- 📊 **Analytics**: Google Analytics, Plausible, Facebook Pixel support
- 💰 **Ads Ready**: Google AdSense and custom ad integration
- 📧 **Newsletter**: Built-in subscription system
- 💬 **Comments**: Disqus integration support
- ⚙️ **YAML Config**: Everything customizable via single config file
- 🎭 **Animations**: Framer Motion for smooth transitions
- 📝 **Markdown**: Write articles in Markdown with front-matter
- 🎨 **Syntax Highlighting**: Beautiful code blocks
- 🚀 **PWA Ready**: Progressive Web App support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

1. **Clone or navigate to the project directory**

```bash
cd next-medium
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure your site**

Edit `config.yaml` to customize:
- Site name, tagline, and branding
- Theme colors and fonts
- Analytics IDs
- Social media links
- Feature toggles

4. **Run development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your blog.

5. **Build for production**

```bash
npm run build
```

The static site will be generated in the `out/` directory.

## 📝 Writing Articles

### Create a New Article

1. Create a new `.md` file in `content/articles/`
2. Add front-matter metadata:

```markdown
---
title: "Your Article Title"
excerpt: "A brief description of your article"
author: "Author Name"
date: "2026-01-27"
tags: ["tag1", "tag2", "tag3"]
category: "Category Name"
coverImage: "/images/cover.jpg"
featured: true
---

# Your Article Content

Write your article content here using Markdown...
```

### Front-Matter Fields

- `title` (required): Article title
- `excerpt` (required): Short description
- `author` (required): Author name
- `date` (required): Publication date (YYYY-MM-DD)
- `tags` (required): Array of tags
- `category` (optional): Article category
- `coverImage` (optional): Path to cover image
- `featured` (optional): Show in featured section

## ⚙️ Configuration

All site configuration is in `config.yaml`:

### Site Metadata
```yaml
site:
  name: "My Blog"
  tagline: "Your tagline here"
  base_url: "https://yourdomain.com"
```

### Theme Colors
```yaml
theme:
  colors:
    primary: "#1a202c"
    secondary: "#f6ad55"
    accent: "#4299e1"
```

### Analytics
```yaml
analytics:
  google_analytics: "G-XXXXXXX"
  plausible: "yourdomain.com"
  facebook_pixel: "XXXXXXX"
```

### Features
```yaml
features:
  newsletter: true
  comments: "disqus"
  search: true
  tags: true
```

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to customize colors, fonts, and design tokens.

### Components

All components are in `components/` directory:
- `Header.tsx` - Navigation and branding
- `Footer.tsx` - Footer with links
- `ArticleCard.tsx` - Article preview cards
- `ThemeToggle.tsx` - Dark/light mode toggle
- `Search.tsx` - Search and filter
- `NewsletterSignup.tsx` - Newsletter form

### Pages

Pages are in `app/` directory:
- `page.tsx` - Home page
- `article/[slug]/page.tsx` - Article detail
- `about/page.tsx` - About page
- `contact/page.tsx` - Contact page
- `tag/[tag]/page.tsx` - Tag filter page

## 📊 Analytics Setup

### Google Analytics

1. Get your GA4 Measurement ID
2. Add to `config.yaml`:
```yaml
analytics:
  google_analytics: "G-XXXXXXXXXX"
```

### Plausible

1. Set up your domain on Plausible
2. Add to config:
```yaml
analytics:
  plausible: "yourdomain.com"
```

## 💰 Ads Integration

### Google AdSense

1. Get your AdSense publisher ID
2. Add to config:
```yaml
ads:
  google_adsense: "ca-pub-XXXXXXXXXX"
```

### Custom Ads

Add custom ad code:
```yaml
ads:
  custom_ads_code: "<script>...</script>"
```

## 📧 Newsletter Integration

The newsletter component is ready to integrate with:
- Mailchimp
- ConvertKit
- SendGrid
- Custom API

Edit `app/api/newsletter/route.ts` to add your integration.

## 💬 Comments Setup

### Disqus

1. Create a Disqus account and site
2. Add to config:
```yaml
features:
  comments: "disqus"
  disqus_shortname: "your-shortname"
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Deploy the 'out' directory
```

### GitHub Pages

```bash
npm run build
# Deploy the 'out' directory to gh-pages branch
```

### Any Static Host

Build the site and upload the `out/` directory to any static hosting service.

## 📁 Project Structure

```
next-medium/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   ├── article/[slug]/    # Article pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── tag/[tag]/         # Tag pages
│   └── api/               # API routes
├── components/            # React components
├── content/articles/      # Markdown articles
├── lib/                   # Utilities and helpers
├── public/                # Static assets
├── config.yaml       # Site configuration
├── tailwind.config.ts     # Tailwind config
├── next.config.js         # Next.js config
└── package.json           # Dependencies
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Type check
npm run type-check

# Lint code
npm run lint
```

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📞 Support

For questions or issues, please open an issue on GitHub or contact us through the contact page.

---

Built with ❤️ using Next.js, React, Tailwind CSS, and Framer Motion.
