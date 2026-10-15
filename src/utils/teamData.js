// Plain data rules shared by the wiki and the separate local editor.
export const TEAM_CATEGORIES = ['general', 'rift', 'defense'];
export const DEFENSIVE_CLASSES = ['Defensivo', 'Coringa', 'Suporte de Utilidade'];

export function supportsDefensiveTeams(classes) {
    return classes.some(name => DEFENSIVE_CLASSES.includes(name));
}

export function sameVariant(a, b) {
    return a?.character === b?.character && a?.variant === b?.variant;
}

export function findVariant(characters, reference) {
    const groups = characters[reference?.character]?.variants;
    return groups && Object.values(groups).flat().find(variant => variant.name === reference.variant);
}

export function escapeTeamText(value) {
    return String(value ?? '').replace(/[&<>"']/g, character => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);
}

export function teamText(value, language = 'pt-BR') {
    return typeof value === 'object' && value ? value[language] || value['pt-BR'] || '' : '';
}

/** Validate references and editorial completeness, never infer gameplay quality. */
export function validateTeam(team, characters, classesFor = () => []) {
    const errors = [];
    if (!team || typeof team !== 'object') return ['invalidTeam'];
    if (!findVariant(characters, team.anchor)) errors.push('unknownAnchor');
    if (!TEAM_CATEGORIES.includes(team.category)) errors.push('invalidCategory');
    if (team.category === 'defense' && !supportsDefensiveTeams(classesFor(team.anchor?.variant))) errors.push('defenseClass');
    if (!Array.isArray(team.members) || team.members.length < 1 || team.members.length > 3) errors.push('memberLimit');
    const members = Array.isArray(team.members) ? team.members : [];
    if (members.some(member => !findVariant(characters, member))) errors.push('unknownMember');
    if (new Set(members.map(member => JSON.stringify([member?.character, member?.variant]))).size !== members.length) errors.push('duplicateMember');
    if (!members.some(member => sameVariant(member, team.anchor))) errors.push('missingAnchor');
    if (!['draft', 'reviewed'].includes(team.status)) errors.push('invalidStatus');
    const date = team.reviewedOn;
    if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date) errors.push('reviewDate');
    return [...new Set(errors)];
}

export function reviewedTeams(data, anchor, category, characters, classesFor) {
    if (data?.version !== 1 || !Array.isArray(data.teams)) return [];
    return data.teams.filter(team => team.status === 'reviewed' && sameVariant(team.anchor, anchor)
        && team.category === category && validateTeam(team, characters, classesFor).length === 0);
}
