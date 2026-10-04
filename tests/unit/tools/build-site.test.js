import { afterEach, describe, expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { buildSite, collectSeoEntries, collectSitemapUrls, PUBLISHED_PATHS, SITE_ORIGIN } from '../../../tools/build-site.js';

const tempDirs = [];

function tempDir() {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'build-site-'));
    tempDirs.push(dir);
    return dir;
}

function staticContent(html) {
    return html.match(/<article class="prerendered-content">([\s\S]*?)<\/article>\s*<\/main>/)?.[1] ?? '';
}

function entryFor(url) {
    return collectSeoEntries().find(entry => entry.url === url);
}

describe('static site build', () => {
    afterEach(() => {
        for (const dir of tempDirs.splice(0)) fs.rmSync(dir, { recursive: true, force: true });
    });

    it('generates the home, all-variants and character-level section URLs only', () => {
        const urls = collectSeoEntries().map(entry => entry.url);
        expect(urls).toHaveLength(56);
        expect(urls[0]).toBe('/');
        expect(urls).toContain('/characters/');
        expect(urls).toContain('/characters/annie/');
        expect(urls).toContain('/characters/annie/builds/');
        expect(urls).toContain('/characters/annie/tier-list/');
        expect(urls.every(url => !url.includes('#') && !url.includes('/variants/'))).toBe(true);
        expect(new Set(urls).size).toBe(urls.length);
        expect(collectSitemapUrls()).toEqual(urls.map(url => `${SITE_ORIGIN}${url}`));
    });

    it('reuses the SPA shell with route metadata and one visible H1 in the static content', () => {
        for (const entry of collectSeoEntries()) {
            expect(entry.html).toContain('<base href="/">');
            expect(entry.html).toContain('<script type="module" src="src/main.js"></script>');
            expect(entry.html).toContain(`<link rel="canonical" href="${SITE_ORIGIN}${entry.url}">`);
            expect(entry.html).toContain(`<title>${entry.title}</title>`);
            expect(entry.html).toContain(`<meta name="description" content="${entry.description}">`);
            expect(entry.html).toContain('class="loading-state"');
            expect(entry.html).not.toContain('initial-home-h1');
            expect(entry.html.match(/<h1[\s>]/g)).toHaveLength(1);
            expect(staticContent(entry.html)).toMatch(/^<h1>/);
        }
    });

    it('links the home page to every character section with real anchors', () => {
        const home = staticContent(entryFor('/').html);
        const characterUrls = collectSeoEntries().map(entry => entry.url).filter(url => url.startsWith('/characters/'));
        for (const url of characterUrls) expect(home).toContain(`href="${url}"`);
    });

    it('renders variants and abilities on the character page, builds on builds, ranks on the tier list', () => {
        const annie = JSON.parse(fs.readFileSync(path.resolve('data/annie.json'), 'utf8'));
        const tiers = JSON.parse(fs.readFileSync(path.resolve('data/tier-data.json'), 'utf8')).annie;
        const variant = annie.variants.diamante[0];

        const overview = staticContent(entryFor('/characters/annie/').html);
        expect(overview).toContain(`<h3>${variant.name}</h3>`);
        expect(overview).toContain(`Habilidade característica: ${variant.signature_ability.name}`);
        expect(overview).not.toContain('**');
        expect(overview).not.toContain('[HAB');

        const builds = staticContent(entryFor('/characters/annie/builds/').html);
        expect(builds).toContain('<h1>Builds de Annie</h1>');
        expect(builds).toContain(`<p>${variant.recommended_build}</p>`);

        const tierList = staticContent(entryFor('/characters/annie/tier-list/').html);
        const ranks = tiers[variant.name];
        expect(tierList).toContain(`<tr><td>${variant.name}</td><td>${ranks.pf}</td><td>${ranks.parallel}</td><td>${ranks.riftOff}</td><td>${ranks.riftDef}</td></tr>`);
    });

    it('escapes wiki data, keeps "$" literal and falls back to rank B like the tier table', () => {
        const rootDir = tempDir();
        fs.mkdirSync(path.join(rootDir, 'data'));
        fs.copyFileSync(path.resolve('index.html'), path.join(rootDir, 'index.html'));
        fs.writeFileSync(path.join(rootDir, 'data', 'tier-data.json'), '{}');
        fs.writeFileSync(path.join(rootDir, 'data', 'test.json'), JSON.stringify({
            character: 'Test',
            variants: { ouro: [{ name: '<Var> & $1', element: 'Fogo', recommended_build: "Costs $& and $'", signature_ability: {} }] }
        }));

        const entries = collectSeoEntries({ rootDir });
        const builds = staticContent(entries.find(entry => entry.url === '/characters/test/builds/').html);
        expect(builds).toContain('<h3>&lt;Var&gt; &amp; $1</h3>');
        expect(builds).toContain('<p>Costs $&amp; and $&#39;</p>');
        const tierList = staticContent(entries.find(entry => entry.url === '/characters/test/tier-list/').html);
        expect(tierList).toContain('<td>B</td><td>B</td><td>B</td><td>B</td>');
    });

    it('builds pages, sitemap and only the published paths into the output folder', () => {
        const outDir = tempDir();
        const summary = buildSite({ outDir, publishedPaths: ['robots.txt', 'data'] });

        expect(summary.pages).toBe(56);
        for (const entry of collectSeoEntries()) {
            expect(fs.readFileSync(path.join(outDir, entry.relativePath), 'utf8')).toBe(entry.html);
        }
        const sitemap = fs.readFileSync(path.join(outDir, 'sitemap.xml'), 'utf8');
        expect([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => url)).toEqual(collectSitemapUrls());
        expect(fs.existsSync(path.join(outDir, 'robots.txt'))).toBe(true);
        expect(fs.existsSync(path.join(outDir, 'data', 'annie.json'))).toBe(true);
        expect(fs.existsSync(path.join(outDir, 'tests'))).toBe(false);
    });

    it('publishes every path the live site needs and refuses to wipe the source tree', () => {
        for (const publishedPath of PUBLISHED_PATHS) expect(fs.existsSync(path.resolve(publishedPath))).toBe(true);
        expect(() => buildSite({ outDir: path.resolve('.') })).toThrow(/wipe the source tree/);
        expect(() => buildSite({ outDir: path.resolve('..') })).toThrow(/wipe the source tree/);
    });
});
