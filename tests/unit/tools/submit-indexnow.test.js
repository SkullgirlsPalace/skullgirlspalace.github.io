import { describe, expect, it, vi } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { collectSitemapUrls, PUBLISHED_PATHS, SITE_ORIGIN } from '../../../tools/build-site.js';
import {
    buildIndexNowPayload,
    INDEXNOW_ENDPOINT,
    INDEXNOW_KEY,
    submitIndexNow
} from '../../../tools/submit-indexnow.js';

describe('IndexNow submitter', () => {
    it('publishes the key file at the site root with the exact key as content', () => {
        expect(INDEXNOW_KEY).toMatch(/^[a-zA-Z0-9-]{8,128}$/);
        expect(fs.readFileSync(path.resolve(`${INDEXNOW_KEY}.txt`), 'utf8')).toBe(INDEXNOW_KEY);
        expect(PUBLISHED_PATHS).toContain(`${INDEXNOW_KEY}.txt`);
    });

    it('accepts every sitemap URL of the site', () => {
        const urls = collectSitemapUrls();
        expect(urls[0]).toBe(`${SITE_ORIGIN}/`);
        expect(buildIndexNowPayload(urls).urlList).toEqual(urls);
    });

    it('rejects URLs from another host and empty submissions', () => {
        expect(() => buildIndexNowPayload(['https://example.com/'])).toThrow(/example\.com/);
        expect(() => buildIndexNowPayload([])).toThrow(/No URLs/);
    });

    it('posts the URLs with the key location to the IndexNow endpoint', async () => {
        const urls = [`${SITE_ORIGIN}/`, `${SITE_ORIGIN}/characters/`];
        const fetchImpl = vi.fn().mockResolvedValue({ ok: true, status: 202 });

        const summary = await submitIndexNow({ urls, fetchImpl });

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

        await expect(submitIndexNow({ urls: [`${SITE_ORIGIN}/`], fetchImpl }))
            .rejects.toThrow(/HTTP 403 Key not valid/);
    });
});
