---
title: "Advanced Features: Syntax Highlighting & Rich Content"
excerpt: "A demonstration of the new advanced content features including syntax highlighting, callouts, and enhanced typography."
author: "Demo User"
date: "2026-01-28"
tags: ["demo", "features", "markdown", "code"]
category: "Engineering"
coverImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
featured: true
---

# Demonstrating Advanced Content Features

This article demonstrates the new rich content capabilities of our platform.

## 1. Syntax Highlighting

We now support **PrismJS** and **Highlight.js** options, configurable via `site-config.yaml`.

### TypeScript Example

```typescript
interface User {
  id: number;
  name: string;
  role: 'admin' | 'user';
}

function getUser(id: number): User {
  return {
    id,
    name: 'John Doe',
    role: 'admin'
  };
}
```

### Python Example

```python
def calculate_factorial(n):
    if n == 0:
        return 1
    return n * calculate_factorial(n - 1)

print(calculate_factorial(5))
```

### CSS Example

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f0f0;
}
```

## 2. Rich Callouts

We can now use special directives to create semantic callouts.

:::info
**Did you know?** This is an informational callout.
:::

:::warning
**Warning:** This is a warning callout.
:::

:::success
**Great Job!** This is a success callout.
:::

:::error
**Error:** This is an error callout.
:::

## 3. Typography & Layout

Our typography has been enhanced for better readability.

> "Good design is as little design as possible."
> — Dieter Rams

We also support tables and lists with beautiful styling.

### Feature Comparison

| Feature | Basic | Pro | Enterprise |
| :--- | :---: | :---: | :---: |
| Syntax Highlighting | ✅ | ✅ | ✅ |
| Custom Themes | ❌ | ✅ | ✅ |
| Dedicated Support | ❌ | ❌ | ✅ |

### Benefits

1.  **Improved Readability**: Optimized line heights and spacing.
2.  **Rich Media**: Support for images, embeds, and code.
3.  **SEO Optimized**: Semantic HTML and metadata.

## 4. Automatic Table of Contents

Check the sidebar (on desktop) to see the automatically generated table of contents based on these headings!

## 5. Progress Bar

Scroll up and down to see the reading progress bar at the top of the page.
