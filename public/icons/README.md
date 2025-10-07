# Extension Icons

This folder contains the icons for the AI Browser Extension.

## Required Sizes

- **icon16.png** - 16x16 pixels (toolbar icon)
- **icon48.png** - 48x48 pixels (extension management page)
- **icon128.png** - 128x128 pixels (Chrome Web Store)

## Generating Icons

Since the image generation tool requires minimum 512px, you can:

1. Generate a 512x512 icon
2. Use an image editor or online tool to resize it to the required sizes
3. Or use the provided icon-large.png and resize it

### Using ImageMagick (command line):

```bash
# Install ImageMagick first
convert icon-large.png -resize 128x128 icon128.png
convert icon-large.png -resize 48x48 icon48.png
convert icon-large.png -resize 16x16 icon16.png
```

### Using Online Tools:

- [iLoveIMG](https://www.iloveimg.com/resize-image)
- [ResizeImage.net](https://resizeimage.net/)
- [Squoosh.app](https://squoosh.app/)

## Temporary Placeholder

For development, you can use any square PNG images in these sizes. The extension will work with placeholder icons until you replace them with custom designs.
