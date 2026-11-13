import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawn } from 'node:child_process';
import { isLocalEditorURL } from '../editor/local-only.js';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
    '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
    '.mp4': 'video/mp4', '.webm': 'video/webm', '.ttf': 'font/ttf', '.otf': 'font/otf', '.woff2': 'font/woff2'
};
const PUBLIC_PREFIXES = ['src/', 'data/', 'img/', 'media/', 'font/', 'tools/site-editor/', 'tools/editor/'];

function allowedFile(relative) {
    return relative === 'index.html' || PUBLIC_PREFIXES.some(prefix => relative.startsWith(prefix));
}

function withinRoot(root, target) {
    const relative = path.relative(root, target);
    return relative && !relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative)
        && !relative.split(path.sep).some(segment => segment.startsWith('.'));
}

function headersFor(file, preview) {
    const scriptPolicy = preview ? "'self' 'unsafe-inline'" : "'self'";
    return {
        'Content-Type': MIME_TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream',
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'same-origin',
        'Content-Security-Policy': `default-src 'self'; script-src ${scriptPolicy}; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' blob: https:; media-src 'self' blob: https:; connect-src 'self'; frame-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'self'`
    };
}

/** A read-only loopback server: editing and uploads remain in the browser. */
export function createSiteEditorServer({ rootDir = projectRoot } = {}) {
    const root = path.resolve(rootDir);
    return http.createServer(async (request, response) => {
        if (!/^(localhost|127\.0\.0\.1|\[::1\])(?::\d{1,5})?$/i.test(request.headers.host || '') || !isLocalEditorURL(`http://${request.headers.host}`)) {
            response.writeHead(403); response.end(); return;
        }
        if (!['GET', 'HEAD'].includes(request.method)) {
            response.writeHead(405, { Allow: 'GET, HEAD' }); response.end(); return;
        }
        let pathname;
        try {
            const rawPath = request.url.split('?')[0];
            if (!rawPath.startsWith('/') || rawPath.startsWith('//')) throw new Error('invalidPath');
            pathname = decodeURIComponent(rawPath);
        } catch {
            response.writeHead(400); response.end(); return;
        }
        const segments = pathname.split('/');
        if (/[\\\0:%]/.test(pathname) || segments.some(segment => segment.startsWith('.'))) {
            response.writeHead(404); response.end(); return;
        }
        let relative = pathname.slice(1);
        const characterRoute = /^characters\/(?:[a-z0-9-]+\/(?:builds\/|tier-list\/)?)?$/.test(relative);
        if (characterRoute) relative = 'index.html';
        if (!relative) relative = 'tools/site-editor/index.html';
        if (relative.endsWith('/')) relative += 'index.html';
        if (!allowedFile(relative)) { response.writeHead(404); response.end(); return; }
        const target = path.resolve(root, relative);
        if (!withinRoot(root, target)) { response.writeHead(404); response.end(); return; }
        try {
            // Re-check resolved paths so a junction or symlink cannot expose repository internals or files outside the checkout.
            const [realRoot, realTarget] = await Promise.all([fs.realpath(root), fs.realpath(target)]);
            const realRelative = path.relative(realRoot, realTarget).split(path.sep).join('/');
            if (!withinRoot(realRoot, realTarget) || !allowedFile(realRelative)) {
                response.writeHead(404); response.end(); return;
            }
            const stat = await fs.stat(realTarget);
            if (!stat.isFile()) { response.writeHead(404); response.end(); return; }
            const preview = relative === 'index.html';
            const headers = headersFor(realTarget, preview);
            // Video controls seek through ordinary HTTP byte ranges without introducing a write API.
            const range = request.headers.range;
            if (range && ['.mp4', '.webm'].includes(path.extname(realTarget).toLowerCase())) {
                const match = /^bytes=(\d+)-(\d*)$/.exec(range);
                const start = match ? Number(match[1]) : NaN;
                const end = match?.[2] ? Math.min(Number(match[2]), stat.size - 1) : stat.size - 1;
                if (!Number.isSafeInteger(start) || start < 0 || start > end || end >= stat.size) {
                    response.writeHead(416, { 'Content-Range': `bytes */${stat.size}` }); response.end(); return;
                }
                const handle = await fs.open(realTarget, 'r');
                try {
                    const bytes = Buffer.alloc(end - start + 1);
                    await handle.read(bytes, 0, bytes.length, start);
                    response.writeHead(206, { ...headers, 'Accept-Ranges': 'bytes', 'Content-Range': `bytes ${start}-${end}/${stat.size}`, 'Content-Length': bytes.length });
                    response.end(request.method === 'HEAD' ? undefined : bytes);
                } finally { await handle.close(); }
                return;
            }
            let bytes = await fs.readFile(realTarget);
            if (characterRoute) bytes = Buffer.from(bytes.toString('utf8').replace(/<head>/i, '<head>\n<base href="/">'));
            response.writeHead(200, { ...headers, 'Content-Length': bytes.length });
            response.end(request.method === 'HEAD' ? undefined : bytes);
        } catch {
            if (!response.headersSent) response.writeHead(404);
            response.end();
        }
    });
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
    const port = Number(process.env.PALACE_SITE_EDITOR_PORT || 4175);
    if (!Number.isInteger(port) || port < 1 || port > 65535) {
        console.error('PALACE_SITE_EDITOR_PORT precisa ser uma porta entre 1 e 65535.');
        process.exitCode = 1;
    } else {
        const server = createSiteEditorServer();
        server.on('error', error => {
            console.error(error.code === 'EADDRINUSE'
                ? `A porta ${port} ja esta em uso. Abra http://127.0.0.1:${port}/tools/site-editor/ ou escolha PALACE_SITE_EDITOR_PORT.`
                : error.message);
            process.exitCode = 1;
        });
        server.listen(port, '127.0.0.1', () => {
            const url = `http://127.0.0.1:${port}/tools/site-editor/`;
            console.log(`Palace - Editor do site: ${url}\nMantenha esta janela aberta. Ctrl+C encerra o servidor. Edicoes ficam no navegador; nenhum arquivo e alterado.`);
            if (process.argv.includes('--open') && process.platform === 'win32') {
                const browser = spawn('cmd.exe', ['/d', '/c', 'start', '', url], { windowsHide: true, stdio: 'ignore' });
                browser.on('error', () => console.log(`Abra este endereco no navegador: ${url}`));
                browser.unref();
            }
        });
    }
}
