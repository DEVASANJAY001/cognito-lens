#!/bin/bash

# Build script for AI Browser Extension
echo "🔨 Building AI Browser Extension..."

# Run the build
npm run build

# Copy manifest to dist
echo "📋 Copying manifest.json to dist..."
cp manifest.json dist/

# Copy icons to dist
echo "🎨 Copying icons to dist..."
mkdir -p dist/icons
cp -r public/icons/* dist/icons/ 2>/dev/null || echo "⚠️  Note: Generate icons first (see public/icons/README.md)"

echo "✅ Build complete! Extension is ready in the dist/ folder"
echo ""
echo "📦 To load in Chrome:"
echo "   1. Open chrome://extensions/"
echo "   2. Enable 'Developer mode'"
echo "   3. Click 'Load unpacked'"
echo "   4. Select the 'dist' folder"
