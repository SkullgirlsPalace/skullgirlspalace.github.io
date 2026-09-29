import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { seoSlug } from '../src/utils/seoRoutes.js';

export const SITE_ORIGIN = 'https://skullgirlspalace.github.io';
const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const GENERATED_MARKER = '<!-- Generated SEO entry shell. Source interface: /index.html. -->';

function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, character => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);
}

function readCharacters(dataDir) {
    return fs.readdirSync(dataDir)
        .filter(file => file.endsWith('.json'))
        .sort((a, b) => a.localeCompare(b))
        .map(file => {
            const characterData = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
            if (!characterData?.character || !characterData.variants) return null;
            return {
                key: path.basename(file, '.json').toLowerCase(),
                name: characterData.character
            };
        })
        .filter(Boolean);
}

function setOnce(html, pattern, replacement, label) {
    if (!pattern.test(html)) throw new Error(`Could not set ${label} in the SPA shell.`);
    return html.replace(pattern, replacement);
}

function renderEntryShell(template, { url, title, description, h1 }) {
    const canonical = `${SITE_ORIGIN}${url}`;
    const safeTitle = escapeHtml(title);
    const safeDescription = escapeHtml(description);
    const safeH1 = escapeHtml(h1);
    let html = template;

    html = setOnce(html, /<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`, 'title');
    html = setOnce(html, /<meta name="description"\s+content="[^"]*">/i, `<meta name="description" content="${safeDescription}">`, 'description');
    html = setOnce(html, /<link rel="canonical" href="[^"]*">/i, `<link rel="canonical" href="${canonical}">`, 'canonical');
    html = setOnce(html, /<meta property="og:title" content="[^"]*">/i, `<meta property="og:title" content="${safeTitle}">`, 'Open Graph title');
    html = setOnce(html, /<meta property="og:description" content="[^"]*">/i, `<meta property="og:description" content="${safeDescription}">`, 'Open Graph description');
    html = setOnce(html, /<meta property="og:url" content="[^"]*">/i, `<meta property="og:url" content="${canonical}">`, 'Open Graph URL');
    html = setOnce(html, /<meta name="twitter:title" content="[^"]*">/i, `<meta name="twitter:title" content="${safeTitle}">`, 'Twitter title');
    html = setOnce(html, /<meta name="twitter:description" content="[^"]*">/i, `<meta name="twitter:description" content="${safeDescription}">`, 'Twitter description');
    html = setOnce(html, /(<noscript>\s*<h1>)[\s\S]*?(<\/h1>)/i, `$1${safeH1}$2`, 'no-script H1');
    return `${GENERATED_MARKER}\n${html}`;
}

function buildEntries(rootDir) {
    const characters = readCharacters(path.join(rootDir, 'data'));
    const entries = [{
        url: '/characters/',
        title: 'Todas as Variantes | Skullgirls Palace',
        description: 'Pesquise e filtre as variantes de Skullgirls Mobile na interface atual do Skullgirls Palace.',
        h1: 'TODAS AS VARIANTES'
    }];

    for (const character of characters) {
        const slug = seoSlug(character.key);
        const baseUrl = `/characters/${slug}/`;
        entries.push({
            url: baseUrl,
            title: `${character.name} | Skullgirls Palace`,
            description: `Página de ${character.name} na wiki de Skullgirls Mobile: variantes, builds e tier list.`,
            h1: character.name
        }, {
            url: `${baseUrl}builds/`,
            title: `Builds de ${character.name} | Skullgirls Palace`,
            description: `Variantes e builds de ${character.name} na interface existente do Skullgirls Palace.`,
            h1: character.name
        }, {
            url: `${baseUrl}tier-list/`,
            title: `Tier List de ${character.name} | Skullgirls Palace`,
            description: `Tier List de ${character.name} na interface existente do Skullgirls Palace.`,
            h1: character.name
        });
    }

    return entries;
}

export function collectSeoEntries({ rootDir = ROOT_DIR } = {}) {
    const template = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
    return buildEntries(rootDir).map(entry => ({
        ...entry,
        html: renderEntryShell(template, entry),
        relativePath: path.posix.join(entry.url.slice(1), 'index.html')
    }));
}

function writeSitemap(entries, sitemapPath) {
    const urls = ['/', ...entries.map(entry => entry.url)];
    const entriesXml = urls.map(url => `  <url><loc>${SITE_ORIGIN}${url}</loc></url>`).join('\n');
    fs.writeFileSync(sitemapPath,
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entriesXml}\n</urlset>\n`,
        'utf8'
    );
}

function removeGeneratedEntries(directory) {
    if (!fs.existsSync(directory)) return;
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        const target = path.join(directory, entry.name);
        if (entry.isDirectory()) {
            removeGeneratedEntries(target);
            if (fs.existsSync(target) && fs.readdirSync(target).length === 0) fs.rmdirSync(target);
        } else if (entry.name === 'index.html' && fs.readFileSync(target, 'utf8').includes(GENERATED_MARKER)) {
            fs.unlinkSync(target);
        }
    }
}

export function generateSeoEntries({ rootDir = ROOT_DIR } = {}) {
    const entries = collectSeoEntries({ rootDir });
    removeGeneratedEntries(path.join(rootDir, 'characters'));
    for (const entry of entries) {
        const target = path.join(rootDir, entry.relativePath);
        fs.mkdirSync(path.dirname(target), { recursive: true });
        fs.writeFileSync(target, entry.html, 'utf8');
    }
    writeSitemap(entries, path.join(rootDir, 'sitemap.xml'));
    return { characters: readCharacters(path.join(rootDir, 'data')).length, entries: entries.length };
}

const isDirectExecution = process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isDirectExecution) {
    try {
        const summary = generateSeoEntries();
        console.log(`Generated ${summary.entries} SPA entry shells for ${summary.characters} characters and updated sitemap.xml.`);
    } catch (error) {
        console.error(error);
        process.exitCode = 1;
    }
}
