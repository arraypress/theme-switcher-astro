/**
 * @module @arraypress/theme-switcher-astro/types
 */

/**
 * Props for `<ThemeToggle />` and `<ThemeScript />`.
 *
 * The two components share a single contract so the pre-paint
 * inline script and the button reference the same localStorage key
 * and the same `data-theme` attribute family.
 */
export interface ThemeSwitcherProps {
	/**
	 * localStorage key used to persist the user's choice across
	 * reloads. Default: `'theme'`. Pick something app-specific if you
	 * want isolation from other libraries (e.g. `'my-app-theme'`).
	 */
	storageKey?: string;
	/**
	 * Value written to `<html data-theme="…">` when the user picks
	 * the "light" mode. Default: `'light'`. Set to your own scheme
	 * name if your tokens are keyed by another label.
	 */
	lightValue?: string;
	/**
	 * Value to write when the user picks "dark" mode. Default:
	 * `undefined` — the attribute is removed entirely so a `:root`
	 * (no `data-theme`) selector wins, which is the canonical
	 * default-is-dark pattern.
	 *
	 * Set to e.g. `'dark'` if your tokens key off `data-theme="dark"`
	 * explicitly (default-is-light theme).
	 */
	darkValue?: string;
	/**
	 * Element DOM id. Default: `'theme-toggle'`. Override if you need
	 * multiple toggles on the same page or the default conflicts
	 * with existing CSS.
	 */
	id?: string;
	/** Extra classes appended to the button. */
	class?: string;
	/** Aria-label for the button. Default: `'Toggle dark / light mode'`. */
	label?: string;
}
