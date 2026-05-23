# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] — Unreleased

### Initial Release

- `<ThemeScript />` — pre-paint inline reader, mount in `<head>` so
  the page paints with the correct theme on first load.
- `<ThemeToggle />` — button that flips the theme and persists the
  choice to localStorage. Survives Astro view transitions.
- Customisable `storageKey`, `lightValue`, `darkValue`. Default
  pattern is default-is-dark + click-toggles-light (no `data-theme`
  attribute = dark, `data-theme="light"` = light); pass an explicit
  `darkValue` for the opposite pattern.
- Dispatches a `themechange` CustomEvent on flip so app code can
  react (e.g. invalidate a canvas or re-render a chart).
- 13 tests passing under Astro's experimental_AstroContainer.

Zero runtime dependencies.
