# Technology Research: Astro Framework

> **Researcher:** Tom
> **Last Updated:** 01/04/2026
> **Version:** 1.0

---

## 1. Overview

### 1.1. Definition

**Astro** is a modern web framework designed specifically for building **content-driven websites** such as blogs, marketing sites, e-commerce, and documentation.

### 1.2. Basic Information

| Attribute | Value |
|-----------|-------|
| **Type** | Web Framework (Static Site Generator + SSR) |
| **Language** | TypeScript/JavaScript |
| **License** | MIT |
| **GitHub** | [withastro/astro](https://github.com/withastro/astro) |
| **Website** | [astro.build](https://astro.build) |
| **Stable Version** | 5.x |

---

## 2. Demo Project

| Attribute | Value |
|-----------|-------|
| **Local Path** | `D:\Github\astro` |
| **Framework** | Astro 5.x |
| **CMS Integration** | Sanity |

### 2.1. How to Run Demo

```bash
# Clone repository
cd D:\Github\astro

# Install dependencies
npm install

# Run development server
npm run dev

# Build production
npm run build
```

---

## 3. Architecture

### 3.1. Islands Architecture

Astro pioneers the **"Islands"** architecture - a component-based model optimized for content-heavy sites.

```
+-----------------------------------------------------------+
|                    Static HTML Page                        |
|  +---------+                           +---------+        |
|  | Island  |    Static Content         | Island  |        |
|  | (React) |    (No JavaScript)        | (Vue)   |        |
|  | > JS    |                           | > JS    |        |
|  +---------+                           +---------+        |
|                                                            |
|  +---------------------------------------------------+    |
|  |              Static Content                        |    |
|  |              (No JavaScript)                       |    |
|  +---------------------------------------------------+    |
|                          +---------+                       |
|     Static Content       | Island  |                       |
|                          | (Svelte)|                       |
|                          | > JS    |                       |
|                          +---------+                       |
+-----------------------------------------------------------+
```

**How it works:**
- Most of the webpage renders as **static HTML** (no JavaScript)
- Only interactive components (Islands) load JavaScript
- Each Island operates independently, can use different frameworks

### 3.2. Server-First Approach

```
+--------------+      +--------------+      +--------------+
|   Request    | ---> |   Astro      | ---> |   Response   |
|   (Browser)  |      |   Server     |      |   (HTML)     |
+--------------+      +--------------+      +--------------+
                             |
                    +--------+--------+
                    |                 |
              +-----v-----+    +------v------+
              |   SSG     |    |    SSR      |
              |  (Build)  |    |  (Runtime)  |
              +-----------+    +-------------+
```

- **SSG (Static Site Generation):** Pre-render at build time
- **SSR (Server-Side Rendering):** Render on-demand at runtime
- **Hybrid:** Combine both per route

---

## 4. Main Components

### 4.1. Astro Components (.astro)

```astro
---
// Component Script (Server-side)
const title = "Hello World";
const items = await fetch('/api/items').then(r => r.json());
---

<!-- Component Template (HTML) -->
<html>
  <head>
    <title>{title}</title>
  </head>
  <body>
    <h1>{title}</h1>
    <ul>
      {items.map(item => <li>{item.name}</li>)}
    </ul>
  </body>
</html>

<style>
  /* Scoped CSS */
  h1 { color: blue; }
</style>
```

### 4.2. Content Collections

Type-safe content management system:

```
src/
+-- content/
|   +-- config.ts          # Schema definitions
|   +-- blog/
|   |   +-- post-1.md
|   |   +-- post-2.mdx
|   +-- authors/
|       +-- john.json
```

### 4.3. Markdown vs MDX Comparison

#### 4.3.1. Overview

| Feature | Markdown (.md) | MDX (.mdx) |
|---------|----------------|------------|
| **Syntax** | Standard Markdown | Markdown + JSX |
| **Components** | No | Yes |
| **Interactivity** | Static only | Interactive possible |
| **Learning Curve** | Easy | Medium |
| **Build Time** | Faster | Slightly slower |

#### 4.3.2. Markdown (.md) Advantages

| Advantage | Description |
|-----------|-------------|
| **Simplicity** | Pure text format, easy to write and read |
| **Universal** | Works everywhere, any editor |
| **Fast Build** | No JSX parsing overhead |
| **Version Control** | Clean diffs, easy to review changes |
| **Portability** | Can migrate to any platform easily |
| **No Dependencies** | Works without any framework integration |

#### 4.3.3. Markdown (.md) Limitations

| Limitation | Description |
|------------|-------------|
| **Static Only** | Cannot embed interactive components |
| **Limited Styling** | Basic formatting, no custom components |
| **No Logic** | Cannot use conditionals, loops, variables |
| **Fixed Layout** | Cannot create complex layouts |

#### 4.3.4. MDX (.mdx) Advantages

| Advantage | Description |
|-----------|-------------|
| **Components** | Embed React/Astro/Vue components directly |
| **Interactivity** | Add counters, forms, charts, animations |
| **Reusability** | Create custom components (Callout, CodeBlock, Alert) |
| **Type Safety** | Full TypeScript support for props |
| **Rich Content** | Tables, tabs, accordions, interactive demos |
| **Import/Export** | Use JavaScript modules, export data |

#### 4.3.5. MDX (.mdx) Limitations

| Limitation | Description | Workaround |
|------------|-------------|------------|
| **No Inline JSX Expressions** | Cannot use `{items.map(...)}` in content | Use dedicated component |
| **Islands Architecture** | React components need `client:*` directives | Add `client:load` or `client:visible` |
| **No Shared State** | Each component is isolated island | Use nanostores or URL params |
| **React Hooks Limited** | `useState`, `useEffect` need hydration | Use `client:load` directive |
| **No React Context** | Cannot share context across page | Use global state library |
| **Build Complexity** | More processing required | Accept slightly slower builds |
| **Debugging Harder** | JSX errors in Markdown can be confusing | Use TypeScript, check syntax |

#### 4.3.6. React in MDX - Detailed Limitations

```mdx
// WORKS - Static component
import Alert from '../components/Alert.astro';
<Alert type="warning">This is static, renders at build time</Alert>

// WORKS - Interactive with client directive
import Counter from '../components/Counter';
<Counter client:load />  // Hydrates on page load

// DOES NOT WORK - Inline JSX expressions
{items.map(item => <li>{item}</li>)}  // ERROR!

// DOES NOT WORK - Direct hooks without hydration
import { useState } from 'react';
const [count, setCount] = useState(0);  // ERROR!

// WORKS - Hooks inside hydrated component
// Counter.tsx
export default function Counter() {
  const [count, setCount] = useState(0);  // OK inside component
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
// In MDX: <Counter client:load />
```

#### 4.3.7. Client Directives for Interactive Components

| Directive | When Hydrates | Use Case |
|-----------|---------------|----------|
| `client:load` | Immediately on page load | Critical interactive elements |
| `client:idle` | After page is interactive | Non-critical components |
| `client:visible` | When enters viewport | Below-the-fold content |
| `client:media` | When media query matches | Responsive components |
| `client:only` | Client-only, no SSR | Browser-only APIs |

#### 4.3.8. When to Use Each

| Content Type | Recommendation | Reason |
|--------------|----------------|--------|
| Blog posts (text-heavy) | Markdown | Simple, fast, portable |
| Documentation | MDX | Custom components (Callout, Tabs) |
| Tutorials with demos | MDX | Interactive code examples |
| News articles | Markdown | No interactivity needed |
| Product pages | MDX | Interactive features, galleries |
| Landing pages | MDX | Animations, interactive CTAs |

### 4.4. Integrations

Astro supports integration with multiple UI frameworks:

| Framework | Package |
|-----------|---------|
| React | `@astrojs/react` |
| Vue | `@astrojs/vue` |
| Svelte | `@astrojs/svelte` |
| Solid | `@astrojs/solid-js` |
| Preact | `@astrojs/preact` |

### 4.4. Routing

File-based routing system:

```
src/pages/
+-- index.astro          -> /
+-- about.astro          -> /about
+-- blog/
|   +-- index.astro      -> /blog
|   +-- [slug].astro     -> /blog/:slug (dynamic)
+-- [...slug].astro      -> catch-all route
```

---

## 5. Five Design Principles

| # | Principle | Description |
|---|-----------|-------------|
| 1 | **Content-Driven** | Designed to showcase content, suitable for marketing sites, docs, blogs |
| 2 | **Server-First** | Prioritizes server rendering over client-side rendering |
| 3 | **Fast by Default** | 40% faster loading, 90% less JavaScript compared to React frameworks |
| 4 | **Easy to Use** | `.astro` syntax is valid HTML, easy to learn at any skill level |
| 5 | **Developer-Focused** | Powerful CLI, VS Code extension, full TypeScript support |

---

## 6. Strengths

### 6.1. Performance

| Metric | Astro | Traditional SPA |
|--------|-------|-----------------|
| JavaScript shipped | ~0 KB (default) | 100-500+ KB |
| Time to Interactive | Nearly instant | 2-5 seconds |
| Core Web Vitals | Excellent | Varies |

### 6.2. Developer Experience

- **Zero-config:** Works out-of-the-box
- **UI-agnostic:** Use any framework (or no framework)
- **TypeScript first-class:** Full type safety
- **Hot Module Replacement:** Fast refresh in development

### 6.3. Flexibility

- **Partial Hydration:** Only hydrate necessary components
- **Multiple frameworks:** Mix React, Vue, Svelte in the same project
- **Adapter system:** Deploy to any platform

### 6.4. SEO & Accessibility

- HTML-first approach = SEO-friendly by default
- Server-rendered content = crawlable
- Minimal JavaScript = faster indexing

---

## 7. Weaknesses

### 7.1. Not Suitable For

| Use Case | Reason |
|----------|--------|
| **Real-time apps** | WebSocket, live collaboration requires complex client-side state |
| **Complex SPAs** | Apps like Figma, Google Docs need heavy client-side logic |
| **Dashboard apps** | Frequent state updates, complex interactivity |

### 7.2. Technical Limitations

- **State management:** No built-in global state (need nanostores or framework-specific)
- **Learning curve:** Islands architecture is a new concept
- **Ecosystem:** Smaller than React/Next.js ecosystem

### 7.3. Consider Carefully When

- Project needs heavy real-time features
- Team is accustomed to SPA architecture
- Complex client-side routing needed

---

## 8. Suitable Use Cases

### 8.1. Recommended

| Use Case | Suitability | Notes |
|----------|-------------|-------|
| Marketing websites | Excellent | Performance & SEO optimized |
| Documentation sites | Excellent | Content collections + MDX |
| Blogs / News sites | Excellent | Static generation + incremental builds |
| E-commerce (catalog) | Good | Product pages static, cart interactive |
| Portfolio sites | Excellent | Minimal JS, fast loading |
| Landing pages | Excellent | Quick setup, high performance |

### 8.2. Not Recommended

| Use Case | Suitability | Alternative |
|----------|-------------|-------------|
| Real-time collaboration | No | Next.js, Remix |
| Complex dashboards | No | React + Vite, Vue |
| Mobile apps | No | React Native, Flutter |

---

## 9. Comparison with Alternatives

### 9.1. Astro vs Next.js

| Criteria | Astro | Next.js |
|----------|-------|---------|
| **Focus** | Content websites | Full-stack apps |
| **Default JS** | Zero | React bundle |
| **Learning curve** | Low | Medium |
| **Flexibility** | Multi-framework | React only |
| **API Routes** | Limited | Full support |
| **Best for** | Static/content sites | Dynamic apps |

### 9.2. Astro vs Gatsby

| Criteria | Astro | Gatsby |
|----------|-------|--------|
| **Build speed** | Fast | Slow (GraphQL layer) |
| **Bundle size** | Small | Large (React) |
| **Data layer** | Flexible | GraphQL required |
| **Plugin ecosystem** | Growing | Mature |

### 9.3. Astro vs Hugo/Jekyll

| Criteria | Astro | Hugo/Jekyll |
|----------|-------|-------------|
| **Interactivity** | Islands (partial JS) | Minimal/None |
| **Component system** | Modern (JSX-like) | Templates |
| **Framework support** | React, Vue, etc. | None |
| **Build speed** | Fast | Very fast (Hugo) |

---

## 10. Deployment

### 10.1. Quick Start

```bash
# Create new project
npm create astro@latest

# Install dependencies
npm install

# Development server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

### 10.2. Project Structure

```
my-astro-project/
+-- public/              # Static assets
+-- src/
|   +-- components/      # UI components
|   +-- content/         # Content collections
|   +-- layouts/         # Page layouts
|   +-- pages/           # File-based routing
|   +-- styles/          # Global styles
+-- astro.config.mjs     # Astro configuration
+-- package.json
+-- tsconfig.json
```

### 10.3. Deployment Options

| Platform | Adapter |
|----------|---------|
| Vercel | `@astrojs/vercel` |
| Netlify | `@astrojs/netlify` |
| Cloudflare | `@astrojs/cloudflare` |
| Node.js | `@astrojs/node` |
| Static | Built-in (default) |

---

## 11. Conclusion & Recommendations

### 11.1. When to Choose Astro

- Content-focused projects (blog, docs, marketing)
- Performance is top priority
- SEO is important
- Team wants UI framework flexibility
- Need static site with some interactive components

### 11.2. When Not to Choose

- Real-time, collaboration applications
- Complex dashboard with heavy state management
- Team only knows React and wants full SPA experience

### 11.3. Overall Rating

| Criteria | Score (1-5) |
|----------|-------------|
| Performance | 5/5 |
| Developer Experience | 5/5 |
| Learning Curve | 4/5 |
| Ecosystem | 4/5 |
| Flexibility | 5/5 |
| Documentation | 5/5 |

---

## 12. References

- [Astro Documentation](https://docs.astro.build/)
- [Why Astro](https://docs.astro.build/en/concepts/why-astro/)
- [Astro GitHub Repository](https://github.com/withastro/astro)
- [Astro Integrations](https://astro.build/integrations/)

---

*This document was created for internal research purposes. Please update information when new versions are released.*
