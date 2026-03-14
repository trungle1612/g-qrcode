# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start development server
npm run build      # Type-check and build for production (tsc && vite build)
npm run lint       # Run ESLint (max-warnings 0 — all warnings are errors)
npm run preview    # Preview production build locally
npm run deploy     # Build and deploy to GitHub Pages
```

## Architecture

This is a single-page React 18 + TypeScript app built with Vite, deployed at `https://trungle1612.github.io/g-qrcode/`. The `base` in `vite.config.ts` is set to `/g-qrcode/` for GitHub Pages.

**UI language:** Vietnamese.

### Component structure

- **`App.tsx`** — the only page. Manages all state (`url`, `logoType`, `qrStyle`, `fgColor`) and renders the form. On submit, it conditionally renders either:
  - `GenerateQrCodeWithLogo` when a logo is selected
  - `GenerateQrCode` (no logo) otherwise

- **`src/components/qrCodes/generateWithLogo/`** — uses `react-qrcode-logo`. Renders a 300×300 QR code with a logo overlay, circular eye radius, and a download button that calls `Canvas.toDataURL()` to save as PNG. The filename is derived from the URL's domain.

- **`src/components/qrCodes/generate/`** — uses `react-qr-code` + `html-to-image` for download. Currently not wired up in `App.tsx` (the with-logo component handles the no-logo case too via empty logoUrl).

### Key libraries

| Library | Purpose |
|---|---|
| `react-qrcode-logo` | QR code with optional logo overlay |
| `react-qr-code` | Simple QR code (SVG-based) |
| `html-to-image` | DOM-to-PNG for download |
| `gh-pages` | GitHub Pages deployment |

### Static assets

Logo images (`bao-tang-di-tich-co-do.png`, `trung-tam-bao-tang.jpeg`) live in `public/` and are referenced by path in the logo selector in `App.tsx`.
