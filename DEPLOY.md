# Deployment Guide - Astro Site

## GitHub Pages Deployment

**Live URL:** https://tomomh.github.io/astro

### Prerequisites

1. **Create GitHub Repository**
   ```bash
   git init
   git remote add origin https://github.com/tomomh/astro.git
   ```

2. **Add GitHub Secret**
   - Go to Repository Settings > Secrets and variables > Actions
   - Add secret: `SANITY_PROJECT_ID` = `hwdzm0je`

3. **Enable GitHub Pages**
   - Go to Repository Settings > Pages
   - Source: Select "GitHub Actions"

4. **Add CORS Origin in Sanity** (if not already added)
   - Go to https://www.sanity.io/manage/project/hwdzm0je/api
   - Click "Add CORS origin"
   - Add: `https://tomomh.github.io`

### Deploy

```bash
# Push to main branch
git add .
git commit -m "Deploy Astro site"
git push -u origin main
```

GitHub Actions will automatically build and deploy.

### Local Development

```bash
npm install
npm run dev
```

Open http://localhost:4321

### Manual Build

```bash
npm run build
npm run preview
# Output in ./dist folder
```

---

## Configuration

### Base Path

The site is configured for `/astro` base path in `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://tomomh.github.io',
  base: '/astro',
  // ...
});
```

### Environment Variables

For production builds, set in GitHub Secrets:
- `SANITY_PROJECT_ID` - Sanity project ID

---

## Troubleshooting

### Links not working
All internal links should use relative paths or the `base` path:
```astro
<a href="/astro/blog">Blog</a>
<!-- or use import.meta.env.BASE_URL -->
<a href={`${import.meta.env.BASE_URL}blog`}>Blog</a>
```

### Images not loading
Ensure images in `/public` folder use base path:
```html
<img src="/astro/images/logo.png" />
```
