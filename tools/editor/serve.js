import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawn } from 'node:child_process';
import { isLocalEditorURL } from './local-only.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.webp': 'image/webp', '.ico': 'image/x-icon', '.ttf': 'font/ttf', '.otf': 'font/otf' };

/** Read-only preview bound to loopback. No write endpoint, login or dependency. */
export function createEditorServer() {
    return http.createServer((request, response) => {
        if (!request.headers.host || !isLocalEditorURL(`http://${request.headers.host}`)) {
            response.writeHead(403); response.end(); return;
        }
        if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405); response.end(); return; }
        let pathname;
        try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); }
        catch { response.writeHead(400); response.end(); return; }
        const relative = pathname.replace(/^\/+/, '');
        if (!['src/', 'data/', 'img/', 'font/', 'tools/editor/'].some(prefix => relative.startsWith(prefix)) && !['', 'index.html'].includes(relative)) {
            response.writeHead(404); response.end(); return;
        }
        const target = path.resolve(root, relative || 'tools/editor/index.html');
        const fromRoot = path.relative(root, target);
        if (fromRoot.startsWith('..') || path.isAbsolute(fromRoot) || fromRoot.split(path.sep).some(part => part.startsWith('.'))) {
            response.writeHead(404); response.end(); return;
        }
        fs.stat(target, (error, stat) => {
            if (error) { response.writeHead(404); response.end(); return; }
            const file = stat.isDirectory() ? path.join(target, 'index.html') : target;
            fs.readFile(file, (error, bytes) => {
                if (error) { response.writeHead(404); response.end(); return; }
                response.writeHead(200, {
                    'Content-Type': mime[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store',
                    'X-Content-Type-Options': 'nosniff', 'Content-Security-Policy': "default-src 'self'; img-src 'self' blob:; style-src 'self'; script-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'"
                });
                response.end(request.method === 'HEAD' ? undefined : bytes);
            });
        });
    });
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
    const port = Number(process.env.PALACE_EDITOR_PORT || 4174);
    const server = createEditorServer();
    server.on('error', error => {
        console.error(error.code === 'EADDRINUSE' ? `A porta ${port} ja esta em uso. Abra http://127.0.0.1:${port}/tools/editor/ ou escolha PALACE_EDITOR_PORT.` : error.message);
        process.exitCode = 1;
    });
    server.listen(port, '127.0.0.1', () => {
        const url = `http://127.0.0.1:${port}/tools/editor/`;
        console.log(`Palace Estudio: ${url}\nMantenha esta janela aberta. Ctrl+C encerra o editor. Nenhum arquivo e alterado pelo servidor.`);
        if (process.argv.includes('--open') && process.platform === 'win32') {
            const browser = spawn('cmd.exe', ['/d', '/c', 'start', '', url], { windowsHide: true, stdio: 'ignore' });
            browser.on('error', () => console.log(`Abra este endereco no navegador: ${url}`));
            browser.unref();
        }
    });
}
