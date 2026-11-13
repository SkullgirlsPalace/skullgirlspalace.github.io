import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import http from 'node:http';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { createSiteEditorServer } from '../../../tools/site-editor/serve.js';

let server, port, fixture;
function request(url = '/', headers = {}, method = 'GET') {
    return new Promise((resolve, reject) => {
        const req = http.request({ hostname: '127.0.0.1', port, path: url, headers, method }, response => {
            const chunks = [];
            response.on('data', chunk => chunks.push(chunk));
            response.on('end', () => resolve({ status: response.statusCode, headers: response.headers, body: Buffer.concat(chunks).toString('utf8') }));
        });
        req.on('error', reject); req.end();
    });
}

beforeAll(async () => {
    fixture = await fs.mkdtemp(path.join(os.tmpdir(), 'palace-site-editor-server-'));
    const root = path.join(fixture, 'checkout');
    for (const relative of ['tools/site-editor', 'data', 'media', 'src', '.git']) await fs.mkdir(path.join(root, relative), { recursive: true });
    await fs.mkdir(path.join(fixture, 'outside'));
    await Promise.all([
        fs.writeFile(path.join(root, 'tools/site-editor/index.html'), '<!doctype html><title>Editor do site</title>'),
        fs.writeFile(path.join(root, 'index.html'), '<!doctype html><html><head><title>Wiki</title></head><body></body></html>'),
        fs.writeFile(path.join(root, 'data/site-customizations.json'), '{"version":1}'),
        fs.writeFile(path.join(root, '.git/config'), 'protected'),
        fs.writeFile(path.join(fixture, 'outside/private.json'), 'outside'),
        fs.writeFile(path.join(root, 'media/movie.mp4'), '0123456789')
    ]);
    await fs.symlink(path.join(fixture, 'outside'), path.join(root, 'src/outside'), process.platform === 'win32' ? 'junction' : 'dir');
    await fs.symlink(path.join(root, '.git'), path.join(root, 'src/private'), process.platform === 'win32' ? 'junction' : 'dir');
    server = createSiteEditorServer({ rootDir: root });
    await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
    port = server.address().port;
});

afterAll(async () => {
    if (server) await new Promise(resolve => server.close(resolve));
    if (fixture && path.dirname(fixture) === path.resolve(os.tmpdir()) && path.basename(fixture).startsWith('palace-site-editor-server-')) await fs.rm(fixture, { recursive: true, force: true });
});

describe('visual site editor read-only server', () => {
    it('serves the editor on loopback, never caches drafts, and returns empty HEAD bodies', async () => {
        expect(server.address().address).toBe('127.0.0.1');
        const editor = await request('/');
        expect(editor.status).toBe(200);
        expect(editor.body).toContain('Editor do site');
        expect(editor.headers['cache-control']).toBe('no-store');
        expect(editor.headers['content-security-policy']).toContain("script-src 'self';");
        expect(editor.headers['content-security-policy']).toContain("frame-ancestors 'self'");
        const head = await request('/tools/site-editor/', {}, 'HEAD');
        expect(head.status).toBe(200);
        expect(head.body).toBe('');
        expect(Number(head.headers['content-length'])).toBeGreaterThan(0);
    });

    it('allows the actual app inline handlers inside its same-origin preview and resolves character paths', async () => {
        const preview = await request('/index.html?palace-preview=1');
        expect(preview.status).toBe(200);
        expect(preview.headers['content-security-policy']).toContain("script-src 'self' 'unsafe-inline'");
        const character = await request('/characters/annie/builds/');
        expect(character.status).toBe(200);
        expect(character.body).toContain('<base href="/">');
        expect(character.body).toContain('<title>Wiki</title>');
    });

    it('rejects public, network, spoofed and malformed Host values', async () => {
        for (const Host of ['skullgirlspalace.github.io', '192.168.1.10', 'localhost.evil.example', 'evil.example@localhost', 'localhost/path']) {
            expect((await request('/', { Host })).status, Host).toBe(403);
        }
        expect((await request('/', { Host: `localhost:${port}` })).status).toBe(200);
    });

    it('exposes no write endpoint or repository files, including encoded traversal and backslashes', async () => {
        expect((await request('/data/site-customizations.json', {}, 'POST')).status).toBe(405);
        for (const url of ['/.git/config', '/package.json', '/tools/site-editor/../../.git/config', '/data/%2e%2e/.git/config', '/data/%252e%252e/config', '/src/%5c..%5c.git%5cconfig', '/src/%00']) {
            expect((await request(url)).status, url).toBe(404);
        }
        expect((await request('/%zz')).status).toBe(400);
        expect((await request('/data/site-customizations.json')).status).toBe(200);
    });

    it('checks real paths before serving files through symlinks or Windows junctions', async () => {
        expect((await request('/src/outside/private.json')).status).toBe(404);
        expect((await request('/src/private/config')).status).toBe(404);
    });

    it('serves uploaded video and validates byte ranges for seeking', async () => {
        const whole = await request('/media/movie.mp4');
        expect(whole.status).toBe(200);
        expect(whole.headers['content-type']).toBe('video/mp4');
        const range = await request('/media/movie.mp4', { Range: 'bytes=2-5' });
        expect(range.status).toBe(206);
        expect(range.body).toBe('2345');
        expect(range.headers['content-range']).toBe('bytes 2-5/10');
        expect((await request('/media/movie.mp4', { Range: 'bytes=50-' })).status).toBe(416);
        expect((await request('/media/movie.mp4', { Range: 'bytes=0-1,3-4' })).status).toBe(416);
    });
});
