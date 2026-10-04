import { afterEach, describe, expect, it, vi } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { SITE_ORIGIN } from '../../../tools/generate-seo-entry-pages.js';
import {
    buildIndexNowPayload,
    INDEXNOW_ENDPOINT,
    INDEXNOW_KEY,
    readSitemapUrls,
    submitIndexNow
} from '../../../tools/submit-indexnow.js';

const tempDirs = [];

function tempSiteWithSitemap(urls) {
    const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'indexnow-'));
    tempDirs.push(rootDir);
    const locs = urls.map(url => `  <url>\n    <loc>${url}</loc>\n  </url>`).join('\n');
    fs.writeFileSync(path.join(rootDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locs}\n</urlset>\n`);
    return rootDir;
}

describe('IndexNow submitter', () => {
    afterEach(() => {
        for (const dir of tempDirs.splice(0)) fs.rmSync(dir, { recursive: true, force: true });
    });

    it('publishes the key file at the site root with the exact key as content', () => {
        expect(INDEXNOW_KEY).toMatch(/^[a-zA-Z0-9-]{8,128}$/);
        expect(fs.readFileSync(path.resolve(`${INDEXNOW_KEY}.txt`), 'utf8')).toBe(INDEXNOW_KEY);
    });

    it('reads every sitemap URL, all on the site host', () => {
        const urls = readSitemapUrls(fs.readFileSync(path.resolve('sitemap.xml'), 'utf8'));
        expect(urls[0]).toBe(`${SITE_ORIGIN}/`);
        expect(urls).toContain(`${SITE_ORIGIN}/characters/annie/`);
        expect(() => buildIndexNowPayload(urls)).not.toThrow();
    });

    it('rejects URLs from another host and empty submissions', () => {
        expect(() => buildIndexNowPayload(['https://example.com/'])).toThrow(/example\.com/);
        expect(() => buildIndexNowPayload([])).toThrow(/No URLs/);
    });

    it('posts the sitemap URLs with the key location to the IndexNow endpoint', async () => {
        const urls = [`${SITE_ORIGIN}/`, `${SITE_ORIGIN}/characters/`];
        const fetchImpl = vi.fn().mockResolvedValue({ ok: true, status: 202 });

        const summary = await submitIndexNow({ rootDir: tempSiteWithSitemap(urls), fetchImpl });

        expect(summary).toEqual({ status: 202, submitted: 2 });
        expect(fetchImpl).toHaveBeenCalledOnce();
        const [endpoint, request] = fetchImpl.mock.calls[0];
        expect(endpoint).toBe(INDEXNOW_ENDPOINT);
        expect(request.method).toBe('POST');
        expect(JSON.parse(request.body)).toEqual({
            host: new URL(SITE_ORIGIN).host,
            key: INDEXNOW_KEY,
            keyLocation: `${SITE_ORIGIN}/${INDEXNOW_KEY}.txt`,
            urlList: urls
        });
    });

    it('fails loudly when IndexNow rejects the submission', async () => {
        const fetchImpl = vi.fn().mockResolvedValue({ ok: false, status: 403, text: async () => 'Key not valid' });

        await expect(submitIndexNow({ rootDir: tempSiteWithSitemap([`${SITE_ORIGIN}/`]), fetchImpl }))
            .rejects.toThrow(/HTTP 403 Key not valid/);
    });
});
