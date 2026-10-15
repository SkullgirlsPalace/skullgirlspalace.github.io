import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import http from 'node:http';
import { createEditorServer } from '../../../tools/editor/serve.js';

let server, port;
function request(path = '/', headers = {}, method = 'GET') {
    return new Promise((resolve, reject) => {
        const req = http.request({ hostname: '127.0.0.1', port, path, headers, method }, response => {
            let body = '';
            response.setEncoding('utf8'); response.on('data', chunk => body += chunk);
            response.on('end', () => resolve({ status: response.statusCode, headers: response.headers, body }));
        });
        req.on('error', reject); req.end();
    });
}
beforeAll(async () => {
    server = createEditorServer();
    await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
    port = server.address().port;
});
afterAll(async () => { await new Promise(resolve => server.close(resolve)); });

describe('local read-only editor server', () => {
    it('listens on loopback and serves fresh local files', async () => {
        expect(server.address().address).toBe('127.0.0.1');
        const response = await request('/tools/editor/');
        expect(response.status).toBe(200);
        expect(response.headers['cache-control']).toBe('no-store');
        expect(response.body).toContain('./bootstrap.js');
    });
    it('rejects public Host headers and exposes no write endpoint or repository internals', async () => {
        expect((await request('/tools/editor/', { Host: 'skullgirlspalace.github.io' })).status).toBe(403);
        expect((await request('/tools/editor/', { Host: 'localhost.evil.example' })).status).toBe(403);
        expect((await request('/data/teams.json', {}, 'POST')).status).toBe(405);
        expect((await request('/.git/config')).status).toBe(404);
        expect((await request('/data/teams.json')).status).toBe(200);
    });
});
