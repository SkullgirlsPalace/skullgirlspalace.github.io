import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { collectSeoEntries, SITE_ORIGIN } from '../../../tools/generate-seo-entry-pages.js';

describe('SEO entry shell generator', () => {
    it('generates only all-variants and character-level section URLs', () => {
        const entries = collectSeoEntries();
        const urls = entries.map(entry => entry.url);
        expect(entries).toHaveLength(55);
        expect(urls).toContain('/characters/');
        expect(urls).toContain('/characters/annie/');
        expect(urls).toContain('/characters/annie/builds/');
        expect(urls).toContain('/characters/annie/tier-list/');
        expect(urls.every(url => !url.includes('#') && !url.includes('/variants/'))).toBe(true);
        expect(new Set(urls).size).toBe(urls.length);
    });

    it('reuses the existing app shell and supplies route-specific metadata and no-script H1', () => {
        const entries = collectSeoEntries();
        for (const entry of entries) {
            expect(entry.html).toContain('<base href="/">');
            expect(entry.html).toContain('<main id="app">');
            expect(entry.html).toContain('<script type="module" src="src/main.js"></script>');
            expect(entry.html).toContain(`<link rel="canonical" href="${SITE_ORIGIN}${entry.url}">`);
            expect(entry.html).toContain(`<title>${entry.title}</title>`);
            expect(entry.html).toContain(`<meta name="description" content="${entry.description}">`);
            expect(entry.html).toMatch(new RegExp(`<noscript>\\s*<h1>${entry.h1}</h1>`));
            expect(entry.html).not.toContain('variant-list');
        }
    });

    it('keeps each generated file and sitemap URL synchronized', () => {
        const entries = collectSeoEntries();
        const sitemap = fs.readFileSync(path.resolve('sitemap.xml'), 'utf8');
        const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url);
        const expectedUrls = [`${SITE_ORIGIN}/`, ...entries.map(entry => `${SITE_ORIGIN}${entry.url}`)];
        expect(sitemapUrls).toEqual(expectedUrls);

        for (const entry of entries) {
            const file = path.resolve(entry.relativePath);
            expect(fs.existsSync(file)).toBe(true);
            expect(fs.readFileSync(file, 'utf8')).toBe(entry.html);
        }
    });
});
