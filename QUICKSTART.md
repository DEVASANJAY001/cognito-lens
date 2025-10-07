# Quick Start Guide - AI Browser Extension

Get your extension running in 5 minutes! ⚡

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Build the Extension

```bash
npm run build
```

## Step 3: Copy Manifest and Icons

```bash
cp manifest.json dist/
mkdir -p dist/icons && cp public/icons/*.png dist/icons/
```

Or use the build script:

```bash
chmod +x scripts/build-extension.sh
./scripts/build-extension.sh
```

## Step 4: Load in Chrome

1. Open Chrome/Edge/Brave
2. Go to `chrome://extensions/`
3. Toggle **"Developer mode"** (top right)
4. Click **"Load unpacked"**
5. Select the **`dist`** folder
6. Done! 🎉

## Step 5: Test It!

1. **Click the extension icon** in your toolbar
2. Try the **"Highlight Page"** button - should add colored border
3. Try the **"Show Alert"** button - should show notification
4. Click **"Configure API Keys"** to set up AI features

## Optional: Add API Keys

1. Click extension icon
2. Click "Configure API Keys"
3. Enter your OpenAI or Gemini API keys
4. Click "Save Settings"

Get keys from:
- [OpenAI Platform](https://platform.openai.com/api-keys)
- [Google AI Studio](https://makersuite.google.com/app/apikey)

## Making Changes

After editing code:

```bash
# 1. Rebuild
npm run build

# 2. Go to chrome://extensions/
# 3. Click refresh icon on your extension
```

## Troubleshooting

### Extension won't load?
- Check that `dist/manifest.json` exists
- Check that `dist/icons/` folder has all 3 icons
- Look for errors in Chrome's extension page

### TypeScript errors in Lovable?
- **This is normal!** See [EXTENSION_NOTES.md](./EXTENSION_NOTES.md)
- The extension will work perfectly in Chrome

### Changes not appearing?
- Make sure you ran `npm run build`
- Click the refresh button in `chrome://extensions/`

## What's Next?

- 📖 Read [README.md](./README.md) for full documentation
- 🔧 See [BUILD_INSTRUCTIONS.md](./BUILD_INSTRUCTIONS.md) for detailed build info
- 📝 Check [EXTENSION_NOTES.md](./EXTENSION_NOTES.md) for Chrome-specific notes
- 🎨 Customize icons in `public/icons/`
- ⚙️ Modify popup UI in `src/popup/Popup.tsx`
- 🧠 Add AI features in `src/background/background.ts`

## File Structure

```
📦 Your Extension
├── 📄 manifest.json          ← Extension config
├── 🖼️ public/icons/          ← Extension icons
├── 📂 src/
│   ├── popup/               ← Extension popup
│   ├── options/             ← Settings page
│   ├── background/          ← Background worker
│   └── content/             ← Page interaction
└── 📦 dist/                 ← Built extension (load this!)
```

## Quick Tips

- 🎯 **Test in Chrome** - Extensions only work in browsers, not in Lovable preview
- 🔄 **Always rebuild** - Changes require `npm run build` + refresh
- 🐛 **Check console** - Right-click popup → "Inspect" to debug
- 📦 **Keep dist/ fresh** - Always copy manifest + icons after building

## Need Help?

- Check browser console for errors (F12)
- Look at `chrome://extensions/` for error messages  
- Read the error messages - they're usually helpful!
- Review the example code in `src/` folders

## Success! 🎉

Your extension is running! Now you can:
- Customize the UI and colors
- Add AI-powered features
- Interact with web pages
- Build something amazing!

Happy coding! 🚀
