---
title: "Getting Started with Astro"
description: "Learn how to build fast websites with Astro framework"
pubDate: 2024-01-15
author: "Tom"
tags: ["astro", "tutorial", "web development"]
image:
  url: "/images/astro-banner.jpg"
  alt: "Astro Framework Banner"
---

# Getting Started with Astro

Astro is a modern web framework that allows you to build fast, content-focused websites.

## Why Astro?

- **Zero JavaScript by default** - Ship less JavaScript to the browser
- **Islands Architecture** - Interactive components when you need them
- **Framework agnostic** - Use React, Vue, Svelte, or vanilla JS

## Installation

```bash
npm create astro@latest
```

## Project Structure

```
my-astro-project/
├── public/
├── src/
│   ├── components/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
└── package.json
```

## Creating Your First Page

Create a file at `src/pages/index.astro`:

```astro
---
// Component Script (JavaScript)
const pageTitle = "Home Page";
---

<html lang="en">
  <head>
    <title>{pageTitle}</title>
  </head>
  <body>
    <h1>{pageTitle}</h1>
    <p>Welcome to Astro!</p>
  </body>
</html>
```

## Next Steps

- Learn about [Astro Components](https://docs.astro.build/en/core-concepts/astro-components/)
- Explore [Content Collections](https://docs.astro.build/en/guides/content-collections/)
- Add [Integrations](https://docs.astro.build/en/guides/integrations-guide/)
