# AI Browser Extension - Important Notes

## About TypeScript Errors in Lovable

You may see TypeScript errors in the Lovable editor related to `chrome` not being defined. This is expected and **does not affect the actual extension functionality**.

### Why do these errors appear?

- The Lovable preview environment has strict TypeScript checking
- The `chrome` global API is only available when the extension runs in Chrome
- TypeScript can't verify these runtime globals in the build environment

### Will the extension work?

**Yes!** The extension will work perfectly when:
1. You run `npm run build`
2. Load the `dist` folder as an unpacked extension in Chrome
3. The `chrome` API becomes available at runtime

## Building for Chrome

### Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Build the extension
npm run build

# 3. Copy required files to dist
cp manifest.json dist/
mkdir -p dist/icons && cp public/icons/*.png dist/icons/

# 4. Load in Chrome
# Go to chrome://extensions/
# Enable Developer mode
# Click "Load unpacked"
# Select the dist folder
```

### Using the Build Script

```bash
chmod +x scripts/build-extension.sh
./scripts/build-extension.sh
```

## Development Workflow

The extension cannot be previewed in Lovable like a web app. It must be:
1. Built with `npm run build`
2. Loaded as an unpacked extension in Chrome
3. Tested directly in the browser

### Making Changes

1. Edit source files in `src/`
2. Run `npm run build`
3. Go to `chrome://extensions/` and click the refresh button
4. Test your changes

## File Structure

```
src/
├── background/background.ts    # Service worker (runs in background)
├── content/contentScript.ts    # Injected into all web pages
├── popup/
│   ├── Popup.tsx              # Extension popup UI
│   ├── popup.css              # Popup styles
│   └── index.tsx              # Popup entry point
└── options/
    ├── Options.tsx            # Options/settings page UI
    ├── options.css            # Options styles
    └── index.tsx              # Options entry point
```

## Key Features

### Popup Interface (src/popup/)
- Click extension icon to open
- Highlight pages with colored borders
- Show custom alerts on pages
- Access options/settings

### Options Page (src/options/)
- Configure OpenAI and Gemini API keys
- Keys stored securely in Chrome storage
- Syncs across devices (if signed in to Chrome)

### Background Worker (src/background/)
- Handles messages between popup and content scripts
- Manages extension lifecycle
- Coordinates API calls

### Content Script (src/content/)
- Runs on all web pages
- Can interact with page DOM
- Receives commands from popup/background

## Chrome Extension APIs Used

- `chrome.runtime` - Messaging and extension lifecycle
- `chrome.storage.sync` - Persistent storage that syncs
- `chrome.tabs` - Tab management and messaging
- `chrome.scripting` - Dynamic script injection (available)

## TypeScript Configuration

The project includes `@types/chrome` for type definitions, but since the tsconfig files are read-only in Lovable, you may see type errors. These can be safely ignored for extension development.

## Testing the Extension

### Test Popup
1. Click extension icon in toolbar
2. Try "Highlight Page" button
3. Try "Show Alert" button  
4. Click "Configure API Keys" to open options

### Test Content Script
1. Visit any webpage
2. Open DevTools (F12)
3. Check console for injection log
4. Use popup buttons to test interactions

### Test Background Script
1. Go to `chrome://extensions/`
2. Find your extension
3. Click "Inspect views: background page"
4. Check console for background logs

## Common Issues

### "chrome is not defined" Errors
- **In Lovable**: Expected, can be ignored
- **In Chrome**: Should not happen if extension is loaded correctly

### Extension Not Working
- Ensure you copied `manifest.json` to `dist/`
- Ensure icons are copied to `dist/icons/`
- Check `dist/background.js` and `dist/content.js` exist
- Check browser console for errors

### Changes Not Appearing
- Remember to rebuild: `npm run build`
- Click refresh button on extension in `chrome://extensions/`

## Production Deployment

When ready to distribute:

1. Test thoroughly in a clean Chrome profile
2. Prepare icons in all required sizes (16, 48, 128px)
3. Update manifest.json with proper name, description, etc.
4. Zip the `dist/` folder
5. Submit to Chrome Web Store (optional)

## Security Best Practices

- Never hardcode API keys in source code
- Use the Options page for user configuration
- Store sensitive data in `chrome.storage.sync`
- Be cautious with permissions (only request what you need)
- Validate all user inputs

## Resources

- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Migration](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [Chrome Extension APIs](https://developer.chrome.com/docs/extensions/reference/)

## Questions?

If you encounter issues:
1. Check BUILD_INSTRUCTIONS.md for detailed build steps
2. Check browser console for errors
3. Verify all files are in dist/ after building
4. Make sure you're testing in Chrome/Chromium
