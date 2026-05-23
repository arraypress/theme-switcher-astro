import { describe, it, expect, beforeAll } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import ThemeToggleRaw from '../src/ThemeToggle.astro';
import ThemeScriptRaw from '../src/ThemeScript.astro';
import type { ThemeSwitcherProps } from '../src/types';

const ThemeToggle = ThemeToggleRaw as Parameters<AstroContainer['renderToString']>[0];
const ThemeScript = ThemeScriptRaw as Parameters<AstroContainer['renderToString']>[0];

let container: AstroContainer;

beforeAll(async () => {
	container = await AstroContainer.create();
});

async function renderToggle(props: ThemeSwitcherProps = {}): Promise<string> {
	return container.renderToString(ThemeToggle, {
		props: props as unknown as Record<string, unknown>,
	});
}
async function renderScript(props: ThemeSwitcherProps = {}): Promise<string> {
	return container.renderToString(ThemeScript, {
		props: props as unknown as Record<string, unknown>,
	});
}

function getAttr(html: string, name: string): string | null {
	const valued = new RegExp(`\\s${name}="([^"]*)"`).exec(html);
	if (valued) return valued[1];
	return null;
}

describe('<ThemeToggle>', () => {
	it('renders a button with the default id', async () => {
		const html = await renderToggle();
		expect(getAttr(html, 'id')).toBe('theme-toggle');
		expect(html).toContain('<button');
	});

	it('honours a custom id', async () => {
		const html = await renderToggle({ id: 'my-toggle' });
		expect(getAttr(html, 'id')).toBe('my-toggle');
	});

	it('button carries an aria-label', async () => {
		const html = await renderToggle();
		expect(getAttr(html, 'aria-label')).toBe('Toggle dark / light mode');
	});

	it('renders both sun + moon SVGs', async () => {
		const html = await renderToggle();
		expect(html).toContain('theme-toggle-sun');
		expect(html).toContain('theme-toggle-moon');
	});

	it('inline script references the default storageKey', async () => {
		const html = await renderToggle();
		expect(html).toMatch(/TS_KEY\s*=\s*"theme"/);
	});

	it('inline script respects a custom storageKey', async () => {
		const html = await renderToggle({ storageKey: 'wg-theme' });
		expect(html).toMatch(/TS_KEY\s*=\s*"wg-theme"/);
	});

	it('passes lightValue + darkValue through', async () => {
		const html = await renderToggle({ lightValue: 'day', darkValue: 'night' });
		expect(html).toMatch(/TS_LIGHT\s*=\s*"day"/);
		expect(html).toMatch(/TS_DARK\s*=\s*"night"/);
	});

	it('dispatches themechange on click', async () => {
		const html = await renderToggle();
		expect(html).toContain("themechange");
	});

	it('merges user class onto the button', async () => {
		const html = await renderToggle({ class: 'theme-toggle--hero' });
		const classes = getAttr(html, 'class') ?? '';
		expect(classes).toContain('theme-toggle');
		expect(classes).toContain('theme-toggle--hero');
	});
});

describe('<ThemeScript>', () => {
	it('inlines the pre-paint reader script', async () => {
		const html = await renderScript();
		expect(html).toContain('<script');
		expect(html).toContain('localStorage.getItem');
		expect(html).toContain('document.documentElement.setAttribute');
	});

	it('passes storageKey through', async () => {
		const html = await renderScript({ storageKey: 'wg-theme' });
		expect(html).toMatch(/TS_KEY\s*=\s*"wg-theme"/);
	});

	it('darkValue defaults to null so default-is-dark works', async () => {
		const html = await renderScript();
		expect(html).toMatch(/TS_DARK\s*=\s*null/);
	});

	it('explicit darkValue is honoured', async () => {
		const html = await renderScript({ darkValue: 'dark' });
		expect(html).toMatch(/TS_DARK\s*=\s*"dark"/);
	});
});
