# Satyajit Sahu — SDET Portfolio

Welcome to the source for my personal portfolio website. This repo contains a modern, glassmorphic portfolio built with plain HTML, CSS and a little JavaScript. It's designed to showcase projects, skills and experience with a polished UI and subtle animations.

---

## Demo
Open `index.html` in your browser to view the site locally.

Tip: For best results (fonts, CORS, icons), serve the folder with a simple static server (examples below).

---

## Quick start

1. Clone the repo (or download the folder) to your machine.
2. From the project root, you can open the site directly in a browser by double-clicking `index.html`.

Alternatively, run a quick static server (recommended):

- Python 3 (PowerShell / cmd):

```powershell
# run from project root
python -m http.server 8000
# then open http://localhost:8000
```

- Node (if you use `http-server`):

```powershell
npx http-server -c-1 .
# or install: npm i -g http-server
```

---

## Project structure

- `index.html` — main site file
- `style.css` — (if present) external stylesheet (some styling is inline in `index.html`)
- `Assets/` — images/icons used in the site
- `portfolio/.gitignore` — repo ignore rules (the `Assets` folder is ignored by default in this repo)

---

## Development notes

- Favicons: A PNG `Assets/favicon-32x32.png` is included. If you replace or add favicons, clear your browser cache (or add `?v=1` query param) to see updates right away.

- Icon fonts: Font Awesome is loaded via CDN in `index.html`. If you want to run offline, download the CSS and fonts and update the `<link>` in the head.

- Custom pointer: There's a custom pointer implemented in `index.html` (disabled on touch devices). Remove or tune it in the CSS under the `.pointer` rules if you want a native cursor.

- Hero background: The hero uses `assets/hero-bg.jpg` by default. Add a file at `Assets/hero-bg.jpg` (or update the CSS URL) to change the background.

- Animations: Simple CSS keyframes and JS IntersectionObserver are used for reveal animations. Adjust durations and delays in the stylesheet and JS blocks.

---

## Git / Assets handling

This project purposely keeps the `Assets/` folder out of Git history (common for large images). If you already committed assets and want to stop tracking:

```powershell
# from repo root (PowerShell)
git rm -r --cached Assets
git commit -m "Stop tracking Assets folder (moved to .gitignore)"
git push
```

Make sure `.gitignore` contains `/Assets` (or adjust the path/casing as needed). On Windows Git may be case-insensitive, but matching casing is a good practice.

---

## Customization ideas

- Replace skill icons with official SVGs for better crispness at any size.
- Add a `site.webmanifest` (progressive web app + installable icon) and multiple sized icons for Android/iOS.
- Move styles into `style.css` fully to make `index.html` cleaner.
- Add unit/integration tests for any build scripts if you add a build step.

---

## Accessibility & performance

- Test keyboard navigation. The site is mostly static content; ensure interactive elements (links/buttons) are reachable with Tab.
- Optimize images in `Assets/` (use WebP or compressed PNG/JPEG) before deploying to reduce bandwidth.

---

## Contact

- Email: satyajit1025@gmail.com
- GitHub: https://github.com/satyajit1025
- LinkedIn: https://linkedin.com/in/satyajit-sahu1

---

If you'd like, I can:
- add a small `favicon.ico` to the project root,
- create a compact `style.css` file and move inline styles there,
- generate optimized image variants (webp/avif) and add responsive `srcset` markup.

Tell me which of those you'd like and I'll add them.
