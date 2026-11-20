# PS4 Offline Host — UI shell

A static, mobile-friendly firmware selector and offline-cache demonstration. This repository does **not** include console exploits, GoldenHEN payloads, or game-unlock/DRM-bypass functionality.

## Publish with GitHub Pages
1. Create a GitHub repository.
2. Upload all files in this folder to the repository root (not the folder itself).
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select **main** and **/(root)**, then Save.
6. Open the published HTTPS URL once while online. The service worker caches the UI shell for offline reopening in supported browsers.

## Local testing
Service workers require HTTPS or localhost. Opening `index.html` directly as a `file://` URL will not test offline caching. You can use GitHub Pages as the easiest HTTPS test.

## Important limitations
- Firmware entries are UI choices only; they do not assert exploit compatibility.
- Offline cache stores this website shell only.
- A real PS4 browser and console are required to validate console-specific behavior.






