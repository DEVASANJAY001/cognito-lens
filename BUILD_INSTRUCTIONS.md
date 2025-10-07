# Build Instructions for AI Browser Extension

## Prerequisites

- Node.js 16+ installed
- Chrome or Chromium-based browser
- Basic terminal/command line knowledge

## Initial Setup

### 1. Install Dependencies

```bash
npm install
```

This installs all required packages including:
- React + TypeScript
- Vite for building
- Chrome Extension types (@types/chrome)

### 2. Create Extension Icons

The extension needs icons in three sizes: 16px, 48px, and 128px.

**Option A - Use generated base icon:**
The project includes `public/icons/icon-large.png` (512x512). Resize it using:

```bash
# Using ImageMagick (install first: brew install imagemagick)
cd public/icons
convert icon-large.png -resize 128x128 icon128.png
convert icon-large.png -resize 48x48 icon48.png  
convert icon-large.png -resize 16x16 icon16.png
```

**Option B - Use online tools:**
- Upload `icon-large.png` to [iLoveIMG](https://www.iloveimg.com/resize-image)
- Resize to 128px, 48px, and 16px
- Save as icon128.png, icon48.png, icon16.png in `public/icons/`

**Option C - Use your own icons:**
- Place your custom icons in `public/icons/`
- Name them: icon16.png, icon48.png, icon128.png

### 3. Optional - Configure Environment Variables

Create a `.env` file (optional, keys can also be set in extension options):

```env
OPENAI_KEY=sk-your-key-here
GEMINI_API_KEY=AIza-your-key-here
```

## Building the Extension

### Standard Build

```bash
npm run build
```

This creates a `dist/` folder with:
- Bundled JavaScript files
- HTML pages for popup and options
- Manifest and icons

### Post-Build Steps

After building, manually copy required files:

```bash
# Copy manifest
cp manifest.json dist/

# Copy icons
mkdir -p dist/icons
cp public/icons/*.png dist/icons/
```

Or use the provided build script:

```bash
chmod +x scripts/build-extension.sh
./scripts/build-extension.sh
```

## Loading in Chrome

1. **Open Extensions Page**
   - Navigate to `chrome://extensions/`
   - Or: Menu → More Tools → Extensions

2. **Enable Developer Mode**
   - Toggle "Developer mode" in top right corner

3. **Load Extension**
   - Click "Load unpacked"
   - Select the `dist` folder from your project
   - Extension icon should appear in toolbar!

## Development Workflow

### Making Changes

1. Edit source files in `src/`
2. Run `npm run build`
3. Copy manifest and icons to `dist/`
4. Go to `chrome://extensions/`
5. Click refresh icon on your extension card

### Hot Reload Note

Chrome extensions **do not hot-reload** automatically. You must:
- Rebuild (`npm run build`)
- Refresh extension in Chrome

### Debugging

**Popup:**
- Right-click extension icon → "Inspect popup"

**Options Page:**
- Open options → Press F12

**Background Script:**
- Go to `chrome://extensions/`
- Find your extension
- Click "Inspect views: background page"

**Content Script:**
- Open any webpage
- Press F12 → Console
- Look for content script logs

## TypeScript Configuration

The project uses `@types/chrome` for Chrome Extension API types. This is automatically included via:

```json
{
  "compilerOptions": {
    "types": ["chrome"]
  }
}
```

If you see TypeScript errors about `chrome` not being defined:
1. Ensure `@types/chrome` is installed: `npm install @types/chrome`
2. Restart your IDE/editor
3. Run `npm run build` to verify

## Common Build Issues

### Issue: "chrome is not defined"

**Solution:** Make sure `@types/chrome` is installed:
```bash
npm install --save-dev @types/chrome
```

### Issue: Icons not showing

**Solution:** Ensure icons are copied to `dist/icons/`:
```bash
mkdir -p dist/icons
cp public/icons/*.png dist/icons/
```

### Issue: Manifest not found

**Solution:** Copy manifest after build:
```bash
cp manifest.json dist/
```

### Issue: Extension won't load

**Solution:** Check that `dist/` contains:
- manifest.json
- background.js
- content.js
- popup.html
- options.html
- icons/ folder with all three sizes

## File Structure After Build

```
dist/
├── assets/           # Bundled JS and CSS
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── background.js     # Service worker
├── content.js        # Content script
├── manifest.json     # Extension manifest
├── popup.html        # Popup page
└── options.html      # Options page
```

## Testing the Extension

1. **Test Popup:**
   - Click extension icon
   - Try "Highlight Page" button
   - Try "Show Alert" button
   - Open options page

2. **Test Options:**
   - Enter test API keys
   - Save settings
   - Verify keys persist after closing

3. **Test Content Script:**
   - Visit any webpage
   - Open console (F12)
   - Look for injection message
   - Test page interactions

## Production Build

For production/distribution:

1. Build with production flag:
   ```bash
   npm run build
   ```

2. Ensure all icons are included

3. Test thoroughly in clean Chrome profile

4. Zip the `dist/` folder for distribution:
   ```bash
   cd dist
   zip -r ai-browser-extension.zip .
   ```

5. Submit to Chrome Web Store or distribute as unpacked extension

## Next Steps

- Customize UI and branding
- Add AI integration logic
- Implement additional features
- Test across different websites
- Prepare for Chrome Web Store submission

## Need Help?

Check:
- README.md for project overview
- Chrome Extension docs: https://developer.chrome.com/docs/extensions/
- Manifest V3 guide: https://developer.chrome.com/docs/extensions/mv3/intro/
