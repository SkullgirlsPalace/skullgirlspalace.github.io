import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { seoSlug } from '../src/utils/seoRoutes.js';

export const SITE_ORIGIN = 'https://skullgirlspalace.github.io';
const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_OUT_DIR = path.join(ROOT_DIR, '_site');

/** Everything GitHub Pages serves. Anything else in the repo (raw_images, tests, tools…) stays out. */
export const PUBLISHED_PATHS = [
    'src',
    'img',
    'data',
    'font',
    'robots.txt',
    'googleb6c7671cc427c54f.html',
    'eb38984f13b79ee37bb2809c0cac9a35.txt'
];

const SITE_DESCRIPTION = 'Wiki de Skullgirls Mobile com informações de personagens, variantes, builds, tier lists, catalisadores e guias, em português e inglês.';
const RARITIES = [
    ['diamante', 'Diamante'],
    ['ouro', 'Ouro'],
    ['prata', 'Prata'],
    ['bronze', 'Bronze']
];
// Same columns and fallback rank as src/components/TierTable.js.
const TIER_MODES = [
    ['pf', 'DP Ataque'],
    ['parallel', 'Reinos Paralelos'],
    ['riftOff', 'Fenda Ataque'],
    ['riftDef', 'Fenda Defesa']
];
const DEFAULT_RANK = 'B';

function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, character => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);
}

/** Plain-text version of src/utils/formatters.js#formatText, split into paragraphs. */
function renderParagraphs(text) {
    const raw = Array.isArray(text) ? text.join('\n') : String(text ?? '');
    return raw
        .replace(/\[HAB \d+\]:\s*/g, '')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/<:[^:]+:\d+>/g, '')
        .replace(/\\n/g, '\n')
        .split(/\n+/)
        .map(line => line.trim())
        .filter(Boolean)
        .map(line => `<p>${escapeHtml(line)}</p>`)
        .join('');
}

function readCharacters(dataDir) {
    const tierData = JSON.parse(fs.readFileSync(path.join(dataDir, 'tier-data.json'), 'utf8'));
    return fs.readdirSync(dataDir)
        .filter(file => file.endsWith('.json'))
        .sort((a, b) => a.localeCompare(b))
        .map(file => {
            const characterData = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
            if (!characterData?.character || !characterData.variants) return null;
            const key = path.basename(file, '.json').toLowerCase();
            const groups = RARITIES
                .map(([rarity, label]) => ({ label, variants: characterData.variants[rarity] || [] }))
                .filter(group => group.variants.length > 0);
            return {
                key,
                slug: seoSlug(key),
                name: characterData.character,
                groups,
                variantCount: groups.reduce((total, group) => total + group.variants.length, 0),
                tiers: tierData[key] || {}
            };
        })
        .filter(Boolean);
}

function characterLinks(character) {
    const base = `/characters/${character.slug}/`;
    return `<nav><ul>`
        + `<li><a href="${base}">${escapeHtml(character.name)}: variantes e habilidades</a></li>`
        + `<li><a href="${base}builds/">Builds de ${escapeHtml(character.name)}</a></li>`
        + `<li><a href="${base}tier-list/">Tier List de ${escapeHtml(character.name)}</a></li>`
        + `<li><a href="/characters/">Todas as variantes</a></li>`
        + `<li><a href="/">Skullgirls Palace</a></li>`
        + `</ul></nav>`;
}

function rarityGroups(character, renderVariant) {
    return character.groups.map(group =>
        `<section><h2>${escapeHtml(group.label)}</h2>${group.variants.map(renderVariant).join('')}</section>`
    ).join('');
}

function renderHome(characters) {
    const items = characters.map(character => {
        const base = `/characters/${character.slug}/`;
        return `<li><a href="${base}">${escapeHtml(character.name)}</a> (${character.variantCount} variantes): `
            + `<a href="${base}builds/">builds</a>, <a href="${base}tier-list/">tier list</a></li>`;
    }).join('');
    return `<h1>Skullgirls Palace</h1><p>${escapeHtml(SITE_DESCRIPTION)}</p>`
        + `<h2>Personagens</h2><ul>${items}</ul>`
        + `<p><a href="/characters/">Todas as variantes de Skullgirls Mobile</a></p>`;
}

function renderAllVariants(characters) {
    const sections = characters.map(character => {
        const names = character.groups.flatMap(group =>
            group.variants.map(variant => `<li>${escapeHtml(variant.name)} (${escapeHtml(group.label)}, ${escapeHtml(variant.element)})</li>`)
        ).join('');
        return `<section><h2><a href="/characters/${character.slug}/">${escapeHtml(character.name)}</a></h2><ul>${names}</ul></section>`;
    }).join('');
    return `<h1>Todas as Variantes</h1><p>Todas as variantes de Skullgirls Mobile, por personagem.</p>${sections}`
        + `<p><a href="/">Skullgirls Palace</a></p>`;
}

function renderCharacter(character) {
    const counts = character.groups.map(group => `${group.variants.length} ${group.label.toLowerCase()}`).join(', ');
    const variants = rarityGroups(character, variant => {
        const stats = variant.stats || {};
        const signature = variant.signature_ability || {};
        return `<article><h3>${escapeHtml(variant.name)}</h3>`
            + `<p>Elemento: ${escapeHtml(variant.element)}. Ataque ${escapeHtml(stats.attack)}, Vida ${escapeHtml(stats.health)}, Pontuação ${escapeHtml(stats.power)}.</p>`
            + `<h4>Habilidade característica: ${escapeHtml(signature.name)}</h4>${renderParagraphs(signature.description)}`
            + `</article>`;
    });
    return `<h1>${escapeHtml(character.name)}</h1>`
        + `<p>${escapeHtml(character.name)} tem ${character.variantCount} variantes em Skullgirls Mobile: ${escapeHtml(counts)}.</p>`
        + characterLinks(character) + variants;
}

function renderBuilds(character) {
    const variants = rarityGroups(character, variant => `<article><h3>${escapeHtml(variant.name)}</h3>`
        + `<p>Elemento: ${escapeHtml(variant.element)}.</p>`
        + (variant.recommended_build ? `<h4>Build recomendada</h4>${renderParagraphs(variant.recommended_build)}` : '')
        + (variant.recommended_arsenal ? `<h4>Arsenal recomendado</h4>${renderParagraphs(variant.recommended_arsenal)}` : '')
        + (variant.marquee_ability ? `<h4>Habilidade superior recomendada</h4>${renderParagraphs(variant.marquee_ability)}` : '')
        + `</article>`);
    return `<h1>Builds de ${escapeHtml(character.name)}</h1>`
        + `<p>Build, arsenal e habilidade superior recomendados para cada variante de ${escapeHtml(character.name)}.</p>`
        + characterLinks(character) + variants;
}

function renderTierList(character) {
    const header = `<tr><th>Variante</th>${TIER_MODES.map(([, label]) => `<th>${label}</th>`).join('')}</tr>`;
    const rows = character.groups.flatMap(group => group.variants).map(variant => {
        const ranks = character.tiers[variant.name] || {};
        return `<tr><td>${escapeHtml(variant.name)}</td>`
            + TIER_MODES.map(([mode]) => `<td>${escapeHtml(ranks[mode] || DEFAULT_RANK)}</td>`).join('')
            + `</tr>`;
    }).join('');
    return `<h1>Tier List de ${escapeHtml(character.name)}</h1>`
        + `<p>Rank de cada variante de ${escapeHtml(character.name)} por modo de jogo, de SS (melhor) a I (inferior).</p>`
        + characterLinks(character)
        + `<table><thead>${header}</thead><tbody>${rows}</tbody></table>`;
}

function buildEntries(rootDir) {
    const characters = readCharacters(path.join(rootDir, 'data'));
    const entries = [{
        url: '/',
        title: 'Skullgirls Palace',
        description: SITE_DESCRIPTION,
        content: renderHome(characters)
    }, {
        url: '/characters/',
        title: 'Todas as Variantes | Skullgirls Palace',
        description: 'Pesquise e filtre as variantes de Skullgirls Mobile na interface atual do Skullgirls Palace.',
        content: renderAllVariants(characters)
    }];

    for (const character of characters) {
        const baseUrl = `/characters/${character.slug}/`;
        entries.push({
            url: baseUrl,
            title: `${character.name} | Skullgirls Palace`,
            description: `Página de ${character.name} na wiki de Skullgirls Mobile: variantes, builds e tier list.`,
            content: renderCharacter(character)
        }, {
            url: `${baseUrl}builds/`,
            title: `Builds de ${character.name} | Skullgirls Palace`,
            description: `Variantes e builds de ${character.name} na interface existente do Skullgirls Palace.`,
            content: renderBuilds(character)
        }, {
            url: `${baseUrl}tier-list/`,
            title: `Tier List de ${character.name} | Skullgirls Palace`,
            description: `Tier List de ${character.name} na interface existente do Skullgirls Palace.`,
            content: renderTierList(character)
        });
    }

    return entries;
}

function setOnce(html, pattern, replacement, label) {
    if (!pattern.test(html)) throw new Error(`Could not set ${label} in the SPA shell.`);
    // A function replacement keeps "$" in wiki data from being read as a replacement pattern.
    return html.replace(pattern, typeof replacement === 'function' ? replacement : () => replacement);
}

/**
 * The SPA shell plus the page content as static HTML, so crawlers that skip JS still get text and links.
 * It sits below the full-height loading state, and the router replaces all of <main id="app"> on boot.
 */
function renderPage(template, { url, title, description, content }) {
    const canonical = `${SITE_ORIGIN}${url}`;
    const safeTitle = escapeHtml(title);
    const safeDescription = escapeHtml(description);
    let html = template;

    html = setOnce(html, /<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`, 'title');
    html = setOnce(html, /<meta name="description"\s+content="[^"]*">/i, `<meta name="description" content="${safeDescription}">`, 'description');
    html = setOnce(html, /<link rel="canonical" href="[^"]*">/i, `<link rel="canonical" href="${canonical}">`, 'canonical');
    html = setOnce(html, /<meta property="og:title" content="[^"]*">/i, `<meta property="og:title" content="${safeTitle}">`, 'Open Graph title');
    html = setOnce(html, /<meta property="og:description" content="[^"]*">/i, `<meta property="og:description" content="${safeDescription}">`, 'Open Graph description');
    html = setOnce(html, /<meta property="og:url" content="[^"]*">/i, `<meta property="og:url" content="${canonical}">`, 'Open Graph URL');
    html = setOnce(html, /<meta name="twitter:title" content="[^"]*">/i, `<meta name="twitter:title" content="${safeTitle}">`, 'Twitter title');
    html = setOnce(html, /<meta name="twitter:description" content="[^"]*">/i, `<meta name="twitter:description" content="${safeDescription}">`, 'Twitter description');
    // Without JS the spinner never goes away, so let the static content take its place.
    html = setOnce(html, /<\/head>/i, '<noscript><style>.loading-state{display:none!important}</style></noscript>\n</head>', 'no-script style');
    html = html.replace(/<h1 id="initial-home-h1">[\s\S]*?<\/h1>\s*/i, '');
    html = setOnce(html, /(\s*)<\/main>/i,
        (_, indent) => `${indent}<article class="prerendered-content">${content}</article>${indent}</main>`, 'static content');
    return html;
}

export function collectSeoEntries({ rootDir = ROOT_DIR } = {}) {
    const template = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
    return buildEntries(rootDir).map(entry => ({
        ...entry,
        html: renderPage(template, entry),
        relativePath: path.posix.join(entry.url.slice(1), 'index.html')
    }));
}

export function collectSitemapUrls({ rootDir = ROOT_DIR } = {}) {
    return buildEntries(rootDir).map(entry => `${SITE_ORIGIN}${entry.url}`);
}

function renderSitemap(urls) {
    const entriesXml = urls.map(url => `  <url>\n    <loc>${url}</loc>\n  </url>`).join('\n');
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entriesXml}\n</urlset>\n`;
}

export function buildSite({ rootDir = ROOT_DIR, outDir = DEFAULT_OUT_DIR, publishedPaths = PUBLISHED_PATHS } = {}) {
    const relativeRoot = path.relative(path.resolve(outDir), path.resolve(rootDir));
    if (!relativeRoot.startsWith('..') && !path.isAbsolute(relativeRoot)) {
        throw new Error(`Refusing to build into ${outDir}: it would wipe the source tree.`);
    }
    const entries = collectSeoEntries({ rootDir });
    fs.rmSync(outDir, { recursive: true, force: true });
    fs.mkdirSync(outDir, { recursive: true });
    for (const publishedPath of publishedPaths) {
        fs.cpSync(path.join(rootDir, publishedPath), path.join(outDir, publishedPath), { recursive: true });
    }
    for (const entry of entries) {
        const target = path.join(outDir, entry.relativePath);
        fs.mkdirSync(path.dirname(target), { recursive: true });
        fs.writeFileSync(target, entry.html, 'utf8');
    }
    fs.writeFileSync(path.join(outDir, 'sitemap.xml'), renderSitemap(entries.map(entry => `${SITE_ORIGIN}${entry.url}`)), 'utf8');
    return { pages: entries.length, outDir };
}

const isDirectExecution = process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isDirectExecution) {
    try {
        const summary = buildSite();
        console.log(`Built ${summary.pages} pages with static content into ${path.relative(process.cwd(), summary.outDir) || '.'}/.`);
    } catch (error) {
        console.error(error);
        process.exitCode = 1;
    }
}
