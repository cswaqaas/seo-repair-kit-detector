# SEO Repair Kit Detector - Chrome Extension

A Chrome extension that detects if the SEO Repair Kit plugin is installed on the current website.

## Features

- ✅ Real-time detection of SEO Repair Kit plugin
- 🎨 Beautiful, modern UI with status indicators
- 🔍 Multiple detection methods for accurate results
- 🔄 Refresh button to re-check the current page
- 📊 Detailed information about detection methods
- 🎯 Badge indicator on extension icon when plugin is detected

## Installation & Testing

**No .zip file needed for testing!** Chrome can load extensions directly from a folder.

### Quick Setup:

1. **Create Icons** (Optional - extension works without them):
   - Open `create-icons.html` in your browser
   - Click "Generate Icons" button
   - Right-click each canvas and save as PNG:
     - Save 16x16 as `icons/icon16.png`
     - Save 48x48 as `icons/icon48.png`
     - Save 128x128 as `icons/icon128.png`

2. **Load Extension in Chrome:**
   - Open Chrome and go to `chrome://extensions/`
   - Enable **"Developer mode"** (toggle in top-right)
   - Click **"Load unpacked"** button
   - Select this folder: `seo-repair-kit-chrome-extenstion`

3. **Test It:**
   - Visit any website
   - Click the extension icon in Chrome toolbar
   - See if SEO Repair Kit plugin is detected!

📖 **For detailed testing instructions, see [TESTING-GUIDE.md](TESTING-GUIDE.md)**

## How It Works

The extension uses multiple detection methods to check if the SEO Repair Kit plugin is installed:

1. **JavaScript Objects** - Checks for `window.SEORepairKit`, `window.seoRepairKit`, etc.
2. **Global Variables** - Looks for SEO Repair Kit specific global variables
3. **Script Tags** - Scans for script tags containing "seo" and "repair" or "kit"
4. **DOM Elements** - Searches for elements with SEO Repair Kit related classes/IDs
5. **Meta Tags** - Checks for SEO-related meta tags or data attributes
6. **Window Functions** - Looks for functions in the window object
7. **Storage Keys** - Checks localStorage and sessionStorage for SEO Repair Kit keys

## Usage

1. Navigate to any website
2. Click the extension icon in your Chrome toolbar
3. The popup will show whether the SEO Repair Kit plugin is detected
4. Click "Refresh Detection" to re-scan the page

## Files Structure

- `manifest.json` - Extension configuration
- `popup.html` - Extension popup UI
- `popup.js` - Popup logic and detection
- `content.js` - Content script that runs on every page
- `background.js` - Background script for badge updates
- `create-icons.html` - Tool to generate extension icons
- `icons/` - Extension icons folder (create icons using create-icons.html)

## Notes

- The extension works by scanning the page for various indicators of the SEO Repair Kit plugin
- Detection accuracy depends on how the SEO Repair Kit plugin exposes itself on the page
- If the plugin uses different naming conventions, you may need to update the detection logic

## Customization

To customize the detection logic, edit the `detectSEORepairKit()` function in both `popup.js` and `content.js`. Add or modify the detection methods based on how the SEO Repair Kit plugin actually works.

## License

MIT License - Feel free to use and modify as needed.
