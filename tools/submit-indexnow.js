import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { collectSitemapUrls, SITE_ORIGIN } from './build-site.js';

/** Public by design: IndexNow validates it against /<key>.txt on the site. */
export const INDEXNOW_KEY = 'eb38984f13b79ee37bb2809c0cac9a35';
export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const MAX_URLS_PER_REQUEST = 10000;

export function buildIndexNowPayload(urls) {
    const { host } = new URL(SITE_ORIGIN);
    const foreignUrl = urls.find(url => new URL(url).host !== host);
    if (foreignUrl) throw new Error(`IndexNow only accepts URLs from ${host}: ${foreignUrl}`);
    if (urls.length === 0) throw new Error('No URLs to submit to IndexNow.');
    if (urls.length > MAX_URLS_PER_REQUEST) throw new Error(`IndexNow accepts at most ${MAX_URLS_PER_REQUEST} URLs per request.`);

    return {
        host,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_ORIGIN}/${INDEXNOW_KEY}.txt`,
        urlList: urls
    };
}

export async function submitIndexNow({ urls = collectSitemapUrls(), fetchImpl = fetch } = {}) {
    const response = await fetchImpl(INDEXNOW_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(buildIndexNowPayload(urls))
    });
    // 200 = accepted, 202 = accepted while the key file is still being validated.
    if (!response.ok) {
        throw new Error(`IndexNow rejected the submission: HTTP ${response.status} ${await response.text()}`);
    }
    return { status: response.status, submitted: urls.length };
}

const isDirectExecution = process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isDirectExecution) {
    try {
        const summary = await submitIndexNow();
        console.log(`IndexNow accepted ${summary.submitted} sitemap URLs (HTTP ${summary.status}).`);
    } catch (error) {
        console.error(error);
        process.exitCode = 1;
    }
}
