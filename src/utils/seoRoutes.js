/** Clean entry paths for existing SPA character states. */
export function seoSlug(value) {
    return String(value || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

export function characterPath(charKey, section = 'character') {
    const base = `/characters/${encodeURIComponent(charKey)}/`;
    if (section === 'builds') return `${base}builds/`;
    if (section === 'tier' || section === 'tier-list') return `${base}tier-list/`;
    return base;
}

export function parseSeoPath(pathname) {
    let normalizedPath;
    try {
        normalizedPath = decodeURIComponent(pathname || '/');
    } catch {
        return null;
    }

    normalizedPath = normalizedPath.replace(/\/index\.html$/i, '/').replace(/\/{2,}/g, '/');
    if (normalizedPath === '/characters' || normalizedPath === '/characters/') {
        return { route: 'character', params: ['todos', 'builds'], section: 'all-variants' };
    }

    const match = normalizedPath.match(/^\/characters\/([a-z0-9-]+)(?:\/(builds|tier-list))?\/?$/i);
    if (!match) return null;

    const section = (match[2] || 'character').toLowerCase();
    return {
        route: 'character',
        params: [match[1].toLowerCase(), section === 'tier-list' ? 'tier' : 'builds'],
        section
    };
}
