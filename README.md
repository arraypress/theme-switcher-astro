# @arraypress/theme-switcher-astro

> Astro light/dark theme toggle. Pre-paint flicker fix, localStorage
> persistence, view-transition safe. Zero deps.

## Install

```bash
npm install @arraypress/theme-switcher-astro
```

## Use

Two components — `<ThemeScript />` in `<head>` so the page paints with
the correct theme on first load, and `<ThemeToggle />` somewhere
visible so the user can flip it.

```astro
---
import { ThemeScript, ThemeToggle } from '@arraypress/theme-switcher-astro';
---
<html>
  <head>
    <ThemeScript />
    <link rel="stylesheet" href="/styles/tokens.css" />
  </head>
  <body>
    <header>
      …
      <ThemeToggle />
    </header>
    <slot />
  </body>
</html>
```

Match the storage key and theme values across both if you customise:

```astro
<ThemeScript storageKey="wg-theme" />
<ThemeToggle storageKey="wg-theme" />
```

## CSS contract

By default the component writes `data-theme="light"` on `<html>` for
light mode and *removes the attribute* for dark mode — so the
canonical token cascade is:

```css
:root { /* default = dark tokens */ }
:root[data-theme="light"] { /* light tokens */ }
```

If you prefer the opposite (default = light), pass `darkValue="dark"`
to both components — the toggle now writes `data-theme="dark"` on the
dark side, and the cascade becomes:

```css
:root { /* default = light tokens */ }
:root[data-theme="dark"] { /* dark tokens */ }
```

The component never injects any styles itself.

## Icons

Inline SVGs are rendered for sun + moon. Hide one or the other based
on the active state:

```css
.theme-toggle .theme-toggle-moon { display: none; }
:root[data-theme="light"] .theme-toggle .theme-toggle-sun { display: none; }
:root[data-theme="light"] .theme-toggle .theme-toggle-moon { display: inline; }
```

The SVGs use `currentColor` so they tint with the button's `color`.

## Props

| Prop          | Default                            | Description                                                          |
|---------------|------------------------------------|----------------------------------------------------------------------|
| `storageKey`  | `'theme'`                          | localStorage key. App-specific keys avoid colliding with other libs. |
| `lightValue`  | `'light'`                          | Value written to `data-theme` on the light side.                     |
| `darkValue`   | `undefined`                        | Value on the dark side. `undefined` removes the attribute entirely.  |
| `id`          | `'theme-toggle'`                   | Toggle button id.                                                    |
| `class`       | —                                  | Extra classes for the button.                                        |
| `label`       | `'Toggle dark / light mode'`       | aria-label for the button.                                           |

## Events

The toggle dispatches a `themechange` CustomEvent on
`document.documentElement` after every flip:

```js
document.documentElement.addEventListener('themechange', (e) => {
  console.log('theme is now', e.detail.theme); // 'light' | 'dark' | …
});
```

## License

MIT
