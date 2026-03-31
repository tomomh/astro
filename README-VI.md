# Nghiên Cứu Công Nghệ: Astro Framework

> **Người nghiên cứu:** Tom
> **Ngày cập nhật:** 01/04/2026
> **Phiên bản:** 1.0

---

## 1. Tổng Quan

### 1.1. Định Nghĩa

**Astro** là một web framework hiện đại được thiết kế đặc biệt cho việc xây dựng **content-driven websites** (website tập trung vào nội dung) như blogs, marketing sites, e-commerce và documentation.

### 1.2. Thông Tin Cơ Bản

| Thuộc tính | Giá trị |
|------------|---------|
| **Loại** | Web Framework (Static Site Generator + SSR) |
| **Ngôn ngữ** | TypeScript/JavaScript |
| **License** | MIT |
| **GitHub** | [withastro/astro](https://github.com/withastro/astro) |
| **Website** | [astro.build](https://astro.build) |
| **Phiên bản stable** | 5.x |

---

## 2. Demo Project

| Thuộc tính | Giá trị |
|------------|---------|
| **Local Path** | `D:\Github\astro` |
| **Framework** | Astro 5.x |
| **CMS Integration** | Sanity |

### 2.1. Cách Chạy Demo

```bash
# Clone repository
cd D:\Github\astro

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build
```

---

## 3. Kiến Trúc

### 3.1. Islands Architecture

Astro tiên phong sử dụng kiến trúc **"Islands"** - một mô hình component-based được tối ưu cho content-heavy sites.

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

**Nguyên lý hoạt động:**
- Phần lớn trang web render dưới dạng **static HTML** (không có JavaScript)
- Chỉ những component cần tương tác (Islands) mới load JavaScript
- Mỗi Island hoạt động độc lập, có thể sử dụng framework khác nhau

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

- **SSG (Static Site Generation):** Pre-render tại build time
- **SSR (Server-Side Rendering):** Render on-demand tại runtime
- **Hybrid:** Kết hợp cả hai theo từng route

---

## 4. Các Thành Phần Chính

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

Hệ thống quản lý content với type-safety:

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

### 4.3. So Sánh Markdown và MDX

#### 4.3.1. Tổng Quan

| Tính năng | Markdown (.md) | MDX (.mdx) |
|-----------|----------------|------------|
| **Cú pháp** | Markdown chuẩn | Markdown + JSX |
| **Components** | Không | Có |
| **Tương tác** | Chỉ static | Có thể interactive |
| **Độ khó học** | Dễ | Trung bình |
| **Thời gian build** | Nhanh hơn | Chậm hơn một chút |

#### 4.3.2. Ưu Điểm Markdown (.md)

| Ưu điểm | Mô tả |
|---------|-------|
| **Đơn giản** | Format text thuần, dễ viết và đọc |
| **Phổ biến** | Hoạt động mọi nơi, mọi editor |
| **Build nhanh** | Không có overhead từ việc parse JSX |
| **Version Control** | Diff sạch sẽ, dễ review thay đổi |
| **Portable** | Có thể migrate sang bất kỳ platform nào |
| **Không phụ thuộc** | Hoạt động không cần framework integration |

#### 4.3.3. Hạn Chế Markdown (.md)

| Hạn chế | Mô tả |
|---------|-------|
| **Chỉ static** | Không thể embed interactive components |
| **Styling hạn chế** | Format cơ bản, không có custom components |
| **Không có logic** | Không thể dùng conditionals, loops, variables |
| **Layout cố định** | Không thể tạo complex layouts |

#### 4.3.4. Ưu Điểm MDX (.mdx)

| Ưu điểm | Mô tả |
|---------|-------|
| **Components** | Embed React/Astro/Vue components trực tiếp |
| **Tương tác** | Thêm counters, forms, charts, animations |
| **Tái sử dụng** | Tạo custom components (Callout, CodeBlock, Alert) |
| **Type Safety** | Hỗ trợ TypeScript đầy đủ cho props |
| **Rich Content** | Tables, tabs, accordions, interactive demos |
| **Import/Export** | Sử dụng JavaScript modules, export data |

#### 4.3.5. Hạn Chế MDX (.mdx)

| Hạn chế | Mô tả | Giải pháp |
|---------|-------|-----------|
| **Không có Inline JSX** | Không thể dùng `{items.map(...)}` trong content | Dùng component riêng |
| **Islands Architecture** | React components cần `client:*` directives | Thêm `client:load` hoặc `client:visible` |
| **Không chia sẻ State** | Mỗi component là island độc lập | Dùng nanostores hoặc URL params |
| **React Hooks hạn chế** | `useState`, `useEffect` cần hydration | Dùng `client:load` directive |
| **Không có React Context** | Không thể share context across page | Dùng global state library |
| **Build phức tạp hơn** | Cần xử lý nhiều hơn | Chấp nhận build chậm hơn một chút |
| **Debug khó hơn** | JSX errors trong Markdown có thể confusing | Dùng TypeScript, check syntax |

#### 4.3.6. React trong MDX - Hạn Chế Chi Tiết

```mdx
// HOẠT ĐỘNG - Static component
import Alert from '../components/Alert.astro';
<Alert type="warning">Đây là static, render lúc build</Alert>

// HOẠT ĐỘNG - Interactive với client directive
import Counter from '../components/Counter';
<Counter client:load />  // Hydrates khi page load

// KHÔNG HOẠT ĐỘNG - Inline JSX expressions
{items.map(item => <li>{item}</li>)}  // LỖI!

// KHÔNG HOẠT ĐỘNG - Hooks trực tiếp không có hydration
import { useState } from 'react';
const [count, setCount] = useState(0);  // LỖI!

// HOẠT ĐỘNG - Hooks bên trong hydrated component
// Counter.tsx
export default function Counter() {
  const [count, setCount] = useState(0);  // OK bên trong component
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
// Trong MDX: <Counter client:load />
```

#### 4.3.7. Client Directives cho Interactive Components

| Directive | Khi nào Hydrate | Use Case |
|-----------|-----------------|----------|
| `client:load` | Ngay khi page load | Interactive elements quan trọng |
| `client:idle` | Sau khi page interactive | Components không quan trọng |
| `client:visible` | Khi vào viewport | Content below-the-fold |
| `client:media` | Khi media query match | Responsive components |
| `client:only` | Chỉ client, không SSR | Browser-only APIs |

#### 4.3.8. Khi Nào Dùng

| Loại Content | Khuyến nghị | Lý do |
|--------------|-------------|-------|
| Blog posts (nhiều text) | Markdown | Đơn giản, nhanh, portable |
| Documentation | MDX | Custom components (Callout, Tabs) |
| Tutorials với demos | MDX | Interactive code examples |
| Tin tức | Markdown | Không cần tương tác |
| Product pages | MDX | Interactive features, galleries |
| Landing pages | MDX | Animations, interactive CTAs |

### 4.4. Integrations

Astro hỗ trợ tích hợp với nhiều UI frameworks:

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

## 5. Năm Nguyên Tắc Thiết Kế

| # | Nguyên tắc | Mô tả |
|---|------------|-------|
| 1 | **Content-Driven** | Được thiết kế để showcase nội dung, phù hợp marketing sites, docs, blogs |
| 2 | **Server-First** | Ưu tiên server rendering hơn client-side rendering |
| 3 | **Fast by Default** | Load nhanh hơn 40%, ít JavaScript hơn 90% so với React frameworks |
| 4 | **Easy to Use** | Cú pháp `.astro` là valid HTML, dễ học với mọi skill level |
| 5 | **Developer-Focused** | CLI mạnh mẽ, VS Code extension, TypeScript support đầy đủ |

---

## 6. Điểm Mạnh

### 6.1. Performance

| Metric | Astro | Traditional SPA |
|--------|-------|-----------------|
| JavaScript shipped | ~0 KB (default) | 100-500+ KB |
| Time to Interactive | Gần như instant | 2-5 seconds |
| Core Web Vitals | Excellent | Varies |

### 6.2. Developer Experience

- **Zero-config:** Hoạt động out-of-the-box
- **UI-agnostic:** Sử dụng bất kỳ framework nào (hoặc không framework)
- **TypeScript first-class:** Full type safety
- **Hot Module Replacement:** Fast refresh trong development

### 6.3. Flexibility

- **Partial Hydration:** Chỉ hydrate components cần thiết
- **Multiple frameworks:** Mix React, Vue, Svelte trong cùng project
- **Adapter system:** Deploy lên bất kỳ platform nào

### 6.4. SEO & Accessibility

- HTML-first approach = SEO-friendly by default
- Server-rendered content = crawlable
- Minimal JavaScript = faster indexing

---

## 7. Điểm Yếu

### 7.1. Không Phù Hợp Với

| Use Case | Lý Do |
|----------|-------|
| **Real-time apps** | WebSocket, live collaboration cần client-side state phức tạp |
| **Complex SPAs** | Apps như Figma, Google Docs cần heavy client-side logic |
| **Dashboard apps** | Frequent state updates, complex interactivity |

### 7.2. Hạn Chế Kỹ Thuật

- **State management:** Không có built-in global state (cần dùng nanostores hoặc framework-specific)
- **Learning curve:** Islands architecture là concept mới
- **Ecosystem:** Nhỏ hơn React/Next.js ecosystem

### 7.3. Khi Nào Cân Nhắc Kỹ

- Dự án cần heavy real-time features
- Team đã quen với SPA architecture
- Cần complex client-side routing

---

## 8. Use Cases Phù Hợp

### 8.1. Recommended

| Use Case | Phù hợp | Ghi chú |
|----------|---------|---------|
| Marketing websites | ⭐ Excellent | Performance & SEO tối ưu |
| Documentation sites | ⭐ Excellent | Content collections + MDX |
| Blogs / News sites | ⭐ Excellent | Static generation + incremental builds |
| E-commerce (catalog) | ✅ Good | Product pages static, cart interactive |
| Portfolio sites | ⭐ Excellent | Minimal JS, fast loading |
| Landing pages | ⭐ Excellent | Quick setup, high performance |

### 8.2. Not Recommended

| Use Case | Phù hợp | Thay thế |
|----------|---------|----------|
| Real-time collaboration | ❌ | Next.js, Remix |
| Complex dashboards | ❌ | React + Vite, Vue |
| Mobile apps | ❌ | React Native, Flutter |

---

## 9. So Sánh Với Alternatives

### 9.1. Astro vs Next.js

| Tiêu chí | Astro | Next.js |
|----------|-------|---------|
| **Focus** | Content websites | Full-stack apps |
| **Default JS** | Zero | React bundle |
| **Learning curve** | Thấp | Trung bình |
| **Flexibility** | Multi-framework | React only |
| **API Routes** | Limited | Full support |
| **Best for** | Static/content sites | Dynamic apps |

### 9.2. Astro vs Gatsby

| Tiêu chí | Astro | Gatsby |
|----------|-------|--------|
| **Build speed** | Nhanh | Chậm (GraphQL layer) |
| **Bundle size** | Nhỏ | Lớn (React) |
| **Data layer** | Flexible | GraphQL required |
| **Plugin ecosystem** | Growing | Mature |

### 9.3. Astro vs Hugo/Jekyll

| Tiêu chí | Astro | Hugo/Jekyll |
|----------|-------|-------------|
| **Interactivity** | Islands (partial JS) | Minimal/None |
| **Component system** | Modern (JSX-like) | Templates |
| **Framework support** | React, Vue, etc. | None |
| **Build speed** | Fast | Very fast (Hugo) |

---

## 10. Triển Khai

### 10.1. Quick Start

```bash
# Tạo project mới
npm create astro@latest

# Cài đặt dependencies
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

## 11. Kết Luận & Khuyến Nghị

### 11.1. Khi Nên Chọn Astro

- Dự án content-focused (blog, docs, marketing)
- Performance là ưu tiên hàng đầu
- SEO quan trọng
- Team muốn flexibility về UI framework
- Cần static site với một số interactive components

### 11.2. Khi Không Nên Chọn

- Ứng dụng real-time, collaboration
- Complex dashboard với heavy state management
- Team chỉ quen React và muốn full SPA experience

### 11.3. Đánh Giá Tổng Quan

| Tiêu chí | Điểm (1-5) |
|----------|------------|
| Performance | 5/5 |
| Developer Experience | 5/5 |
| Learning Curve | 4/5 |
| Ecosystem | 4/5 |
| Flexibility | 5/5 |
| Documentation | 5/5 |

---

## 12. Tài Liệu Tham Khảo

- [Astro Documentation](https://docs.astro.build/)
- [Why Astro](https://docs.astro.build/en/concepts/why-astro/)
- [Astro GitHub Repository](https://github.com/withastro/astro)
- [Astro Integrations](https://astro.build/integrations/)

---

*Document này được tạo cho mục đích nghiên cứu nội bộ. Vui lòng cập nhật thông tin khi có phiên bản mới.*
