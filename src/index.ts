/**
 * @module @arraypress/theme-switcher-astro
 *
 * Two components — `<ThemeScript />` for the pre-paint inline reader
 * (mount in `<head>`), and `<ThemeToggle />` for the visible button
 * (mount anywhere). Both share the same prop contract so they
 * coordinate on the same storage key + theme values.
 *
 * ```astro
 * ---
 * import { ThemeScript, ThemeToggle } from '@arraypress/theme-switcher-astro';
 * ---
 * <html>
 *   <head><ThemeScript /></head>
 *   <body>
 *     <header>…<ThemeToggle /></header>
 *     <slot />
 *   </body>
 * </html>
 * ```
 */

import ThemeToggle from './ThemeToggle.astro';
import ThemeScript from './ThemeScript.astro';

export { ThemeToggle, ThemeScript };
export type * from './types';
export default ThemeToggle;
