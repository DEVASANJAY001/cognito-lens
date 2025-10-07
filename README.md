# 🧠 AI Browser Extension

> **⚠️ Important:** This is a Chrome Extension project, not a standard web app. 
> 
> You may see TypeScript errors in Lovable related to `chrome` API - these are **expected** and won't affect the built extension. See [EXTENSION_NOTES.md](./EXTENSION_NOTES.md) for details.

A complete AI-powered browser extension built with React, TypeScript, and Vite, configured for Chrome Manifest V3.

## ⚠️ About TypeScript Errors in Lovable

If you see TypeScript errors about `chrome` not being defined, **this is normal**. These errors appear only in the Lovable editor's type-checking system and **do not affect the actual extension**.

The `chrome` global API is only available at runtime when the extension loads in Chrome. The built extension will work perfectly.

See [EXTENSION_NOTES.md](./EXTENSION_NOTES.md) for more details.

---

## 🚀 Features

- **Modern UI**: Clean, minimal design with plain CSS (no Tailwind)
- **Popup Interface**: Quick access to extension features with beautiful gradient design
- **Options Page**: Full settings page for API key configuration
- **Background Service Worker**: Handles messages and coordinates between components
- **Content Script**: Interacts with web pages (highlighting, alerts, text selection)
- **Chrome Storage**: Persists settings across browser sessions
- **Environment Variables**: Support for OPENAI_KEY and GEMINI_API_KEY

## 📁 Project Structure

```
ai-browser-extension/
├── public/
│   └── icons/          # Extension icons (16, 48, 128px)
├── src/
│   ├── background/
│   │   └── background.ts       # Service worker
│   ├── content/
│   │   └── contentScript.ts    # Content script
│   ├── popup/
│   │   ├── Popup.tsx          # Popup React component
│   │   ├── popup.css          # Popup styles
│   │   └── index.tsx          # Popup entry
│   └── options/
│       ├── Options.tsx        # Options React component
│       ├── options.css        # Options styles
│       └── index.tsx          # Options entry
├── manifest.json              # Extension manifest
├── popup.html                 # Popup HTML
├── options.html               # Options HTML
└── vite.config.ts            # Vite configuration
```

## 🛠️ Installation & Development

### Prerequisites

- Node.js 16+ and npm
- Chrome or Chromium-based browser

> **🚀 New here?** Check out [QUICKSTART.md](./QUICKSTART.md) for a 5-minute setup guide!

### Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Generate icons** (see [BUILD_INSTRUCTIONS.md](./BUILD_INSTRUCTIONS.md)):
   - Use `public/icons/icon-large.png` as base
   - Resize to 128px, 48px, 16px
   - Save in `public/icons/` folder

3. **Create `.env` file** (optional):
   ```env
   OPENAI_KEY=your-openai-key-here
   GEMINI_API_KEY=your-gemini-key-here
   ```

4. **Build the extension**:
   ```bash
   npm run build
   cp manifest.json dist/
   mkdir -p dist/icons && cp public/icons/*.png dist/icons/
   ```

   Or use the build script:
   ```bash
   chmod +x scripts/build-extension.sh
   ./scripts/build-extension.sh
   ```

## 🔧 Loading the Extension

1. Build the extension:
   ```bash
   npm run build
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" (toggle in top right)

4. Click "Load unpacked"

5. Select the `dist` folder from your project

6. The extension icon should appear in your toolbar!

## 📦 Build Output

After running `npm run build`, the `dist` folder will contain:

```
dist/
├── icons/              # Extension icons
├── assets/             # Bundled JS/CSS chunks
├── background.js       # Background service worker
├── content.js          # Content script
├── popup.html          # Popup page
├── options.html        # Options page
└── manifest.json       # Extension manifest (copied)
```

## 🎨 Features Walkthrough

### Popup Interface

- **Highlight Page**: Adds a colored border animation to the current page
- **Show Alert**: Displays a custom alert on the page
- **Green Highlight**: Alternative highlight with green color
- **Configure API Keys**: Opens the options page

### Options Page

- **API Configuration**: Store OpenAI and Gemini API keys securely
- **Privacy Controls**: Toggle to show/hide API keys
- **Local Storage**: Keys are stored using Chrome's sync storage
- **Clear All**: Reset all settings with one click

### Content Script Features

- Page highlighting with animated borders
- Custom alert notifications
- Text selection detection
- Message passing with background script

### Background Worker

- Handles extension lifecycle events
- Routes messages between popup and content scripts
- Manages storage operations
- Ready for AI API integration

## 🔐 Environment Variables

Create a `.env` file for development:

```env
OPENAI_KEY=sk-...
GEMINI_API_KEY=AIza...
```

These are automatically injected during build via Vite's `define` configuration.

**Note**: For production use, store API keys in the Options page instead of hardcoding them.

## 🚀 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Extension Capabilities

Current permissions in `manifest.json`:

- `storage` - Save settings and API keys
- `activeTab` - Access current tab for interactions
- `scripting` - Execute content scripts dynamically

## 🔄 Hot Reload

During development, the extension **does not auto-reload**. After making changes:

1. Run `npm run build`
2. Go to `chrome://extensions/`
3. Click the refresh icon on your extension

## 📝 Customization

### Styling

All styles use plain CSS with no preprocessors or Tailwind:

- `src/popup/popup.css` - Popup styles
- `src/options/options.css` - Options page styles

### Colors

Primary gradient: `#667eea` → `#764ba2` (purple to violet)

### Icons

Icons are generated and stored in `public/icons/`:

- `icon16.png` - Toolbar icon
- `icon48.png` - Extension management
- `icon128.png` - Chrome Web Store

## 🤝 Adding AI Features

With API keys configured, you can:

1. Send selected text to OpenAI/Gemini APIs
2. Analyze page content with AI
3. Generate summaries and insights
4. Add chat functionality

Example in `background.ts`:

```typescript
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "analyzeText") {
    // Get API keys from storage
    chrome.storage.sync.get(["openaiKey"], async (items) => {
      // Call OpenAI API here
      const result = await callOpenAI(items.openaiKey, message.text);
      sendResponse({ result });
    });
    return true;
  }
});
```

## 🐛 Debugging

- **Popup**: Right-click popup → "Inspect"
- **Options**: Open options page → F12
- **Background**: Go to `chrome://extensions/` → "Inspect views: background page"
- **Content Script**: Open any page → F12 → Check console

## 📚 Resources

- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Guide](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

## 🎓 Learn More

This extension demonstrates:

- ✅ React + TypeScript + Vite setup for extensions
- ✅ Manifest V3 architecture
- ✅ Message passing between components
- ✅ Chrome Storage API usage
- ✅ Content script injection
- ✅ Modern CSS styling
- ✅ Environment variable handling

## 📄 License

MIT License - feel free to use this as a template for your own extensions!

## 🙌 Contributing

This is a template project. Feel free to fork and customize for your needs!

---

Built with ❤️ using React, TypeScript, and Vite
