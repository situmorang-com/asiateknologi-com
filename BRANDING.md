# Asiateknologi Branding Assets Guide

## Assets Setup

### Current Assets
- **Favicon**: `static/favicon.svg` - Cyan circuit pattern design
- **OG Image**: `static/og-image.svg` - Social media preview (1200x630px)

### To Add Your Real Logo

1. **Download logo from your website**:
   ```bash
   # Get the PNG logo from your existing website
   curl -o static/logo.png https://asiateknologi.com/wp-content/uploads/2021/10/cropped-AsiaTeknologi-logo-purple-sm.png
   ```

2. **Create logo variations**:
   - `static/logo.png` - Full logo for header
   - `static/logo-dark.png` - Dark variant (if needed)
   - `static/logo-favicon.png` - Favicon PNG version (16x16, 32x32, 64x64)

3. **Add favicon.ico** (for browser compatibility):
   - Convert your logo to favicon using: https://realfavicongenerator.net/
   - Download the complete favicon package and place in `/static/`

4. **Update meta tag in `src/routes/+layout.svelte`** if using PNG:
   ```svelte
   <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
   <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
   ```

## Social Media OG Images

### Current Setup
- Default OG image: `/static/og-image.svg`
- Serves for all pages (homepage, services, solutions, etc.)

### To Create Page-Specific OG Images

For better social media engagement, create OG images for:
1. **Homepage**: Already using `og-image.svg`
2. **Service pages**: `/static/og-service.svg`
3. **Case studies**: `/static/og-casestudy.svg`
4. **Blog posts**: `/static/og-blog.svg`

Update individual page files (e.g., `/services/[slug]/+page.svelte`) to use:
```svelte
<meta property="og:image" content="https://asiateknologi.com/og-service.svg" />
```

## Brand Colors

### Primary Palette
- **Dark Background**: `#0a0a0f` (Dark 950)
- **Cyan Accent**: `#00e5ff` (Accent Cyan)
- **Blue Accent**: `#3b82f6` (Accent Blue)
- **Purple Accent**: `#8b5cf6` (Accent Purple)
- **Green Accent**: `#10b981` (Accent Green)

### Text Colors
- **Primary Text**: `#e0e0eb` (Dark 100)
- **Secondary Text**: `#b8b8cc` (Dark 200)
- **Muted Text**: `#9090a8` (Dark 300)

## Implementation in SvelteKit

### Header Logo
Update `src/lib/components/layout/Header.svelte`:
```svelte
<img src="/logo.png" alt="Asiateknologi" class="h-8 w-auto" />
```

### Favicon Display
The favicon will automatically show in:
- Browser tabs
- Bookmarks
- Address bar
- Favicon is set in `src/routes/+layout.svelte`

## OG Image Testing

Test your OG images:
1. **Facebook**: https://developers.facebook.com/tools/debug/
2. **Twitter**: https://cards-dev.twitter.com/validator
3. **LinkedIn**: https://www.linkedin.com/post-inspector/

## SVG vs PNG for OG Images

- **SVG** (Current): Lightweight, scales perfectly, some platforms convert to PNG
- **PNG**: Better compatibility with all social platforms
  - Create PNG from SVG: Use Figma, Illustrator, or online converters
  - Recommended size: 1200x630px (Open Graph standard)

## Next Steps

1. ✅ Favicon SVG created
2. ✅ OG Image SVG created
3. ✅ Meta tags configured
4. ⏳ Add your actual logo files (PNG/SVG)
5. ⏳ Generate PNG versions of SVG images for better compatibility
6. ⏳ Test with social media validators
