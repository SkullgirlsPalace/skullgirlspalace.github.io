import { validateTeam, sameVariant } from '../../src/utils/teamData.js';
import { EN_ABILITIES_PATH, PT_MAPPING_PATH, buildAbilityLinks, abilityIdentity, publishedAbilityLinks } from './abilities.js';

export const EDITABLE_BUILD_FIELDS = ['recommended_build', 'recommended_arsenal', 'marquee_ability'];
export const TIER_MODES = ['pf', 'parallel', 'riftOff', 'riftDef'];
export const RANKS = ['SS', 'S', 'A', 'B', 'C', 'I', 'N/A'];
export const CLASS_PATH = 'src/data/variantClassData.js';
export const CLASS_NAMES = ['Ofensivo', 'Defensivo', 'Suporte de Utilidade', 'Coringa'];
export const clone = value => JSON.parse(JSON.stringify(value));
export const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b);
function abilityTextError(value, required) {
    // Preserve comparisons such as "HP < 50%" while rejecting HTML markup.
    if (typeof value !== 'string' || /<[a-z!/?]/i.test(value)) return 'abilityText';
    return required && !value.trim() ? 'abilityRequired' : null;
}

export function catalogFrom(files) {
    return Object.entries(files).filter(([path]) => path !== 'data/teams.json' && path !== 'data/tier-data.json')
        .flatMap(([path, data]) => Object.entries(data.variants || {}).flatMap(([rarity, variants]) => variants.map(variant => ({
            character: path.slice(5, -5), characterName: data.character, rarity, variant: variant.name, data: variant
        }))));
}

export function charactersFrom(files) {
    return Object.fromEntries(Object.entries(files).filter(([, data]) => data.variants).map(([path, data]) => [path.slice(5, -5), data]));
}

function protectedFields(variant) {
    const copy = clone(variant);
    for (const field of [...EDITABLE_BUILD_FIELDS, 'builds']) delete copy[field];
    if (copy.signature_ability && typeof copy.signature_ability === 'object') {
        delete copy.signature_ability.name;
        delete copy.signature_ability.description;
        if (!Object.keys(copy.signature_ability).length) delete copy.signature_ability;
    }
    return copy;
}

export function validateChanges(base, files, classesFor) {
    const errors = [];
    const characters = charactersFrom(files);
    const abilityLinks = buildAbilityLinks(base);
    const linkedKeys = new Set(Object.values(abilityLinks));
    classesFor = name => files[CLASS_PATH]?.[name] || ['Ofensivo'];
    for (const [path, data] of Object.entries(files)) {
        if (!Object.hasOwn(base, path)) { errors.push(`${path}: unknownFile`); continue; }
        if (equal(base[path], data)) continue;
        if (path === 'data/teams.json') {
            if (data?.version !== 1 || !Array.isArray(data.teams)) { errors.push(`${path}: invalidTeamFile`); continue; }
            const ids = new Set();
            for (const team of data.teams) {
                if (!team || typeof team.id !== 'string' || !team.id || ids.has(team.id)) errors.push(`${path}: duplicateId`);
                ids.add(team?.id);
                if (team?.status !== 'draft') {
                    for (const error of validateTeam(team, characters, classesFor)) errors.push(`${team?.anchor?.variant || '?'}: ${error}`);
                }
            }
        } else if ([EN_ABILITIES_PATH, PT_MAPPING_PATH].includes(path)) {
            if (!data || typeof data !== 'object' || Array.isArray(data) || !equal(Object.keys(base[path]), Object.keys(data))) { errors.push(`${path}: protectedData`); continue; }
            const allowed = path === EN_ABILITIES_PATH ? ['ability', 'SA1', 'SA2'] : ['ability'];
            for (const [key, before] of Object.entries(base[path])) {
                const after = data[key];
                if (equal(before, after)) continue;
                if (!linkedKeys.has(key)) { errors.push(`${key}: unlinkedAbility`); continue; }
                if (!after || typeof after !== 'object' || Array.isArray(after)) { errors.push(`${key}: protectedData`); continue; }
                const protect = value => Object.fromEntries(Object.entries(value).filter(([field]) => !allowed.includes(field)));
                if (!equal(protect(before), protect(after))) errors.push(`${key}: protectedData`);
                for (const field of allowed) {
                    if (equal(before[field], after[field])) continue;
                    const error = abilityTextError(after[field], field !== 'SA2');
                    if (error) errors.push(`${key}/${field}: ${error}`);
                }
                if (path === PT_MAPPING_PATH) {
                    const linked = catalogFrom(files).find(item => abilityLinks[abilityIdentity(item)] === key);
                    if (after.ability !== linked?.data.signature_ability?.name) errors.push(`${key}: abilityLink`);
                }
            }
        } else if (path === CLASS_PATH) {
            const names = Object.values(characters).flatMap(data => Object.values(data.variants).flat().map(variant => variant.name));
            if (!data || typeof data !== 'object' || Array.isArray(data)) { errors.push(`${path}: invalidClasses`); continue; }
            for (const [name, classes] of Object.entries(data)) {
                if (equal(base[path][name], classes)) continue;
                if (!names.includes(name) || !Array.isArray(classes) || !classes.length || classes.length > 4 || new Set(classes).size !== classes.length || classes.some(item => !CLASS_NAMES.includes(item))) errors.push(`${name}: invalidClasses`);
            }
            for (const name of Object.keys(base[path])) if (!(name in data)) errors.push(`${name}: removedClass`);
        } else if (path === 'data/tier-data.json') {
            if (!data || typeof data !== 'object' || Array.isArray(data)) { errors.push(`${path}: invalidTierFile`); continue; }
            for (const [character, variants] of Object.entries(data)) {
                if (!variants || typeof variants !== 'object' || Array.isArray(variants)) { errors.push(`${character}: invalidTierFile`); continue; }
                const knownNames = Object.values(characters[character]?.variants || {}).flat().map(variant => variant.name);
                for (const [name, ranks] of Object.entries(variants)) {
                    if (equal(base[path][character]?.[name], ranks)) continue;
                    if (!knownNames.includes(name)) errors.push(`${character}/${name}: unknownVariant`);
                    if (!ranks || typeof ranks !== 'object' || Array.isArray(ranks)) { errors.push(`${name}: invalidRank`); continue; }
                    const before = base[path][character]?.[name] || {};
                    for (const [mode, rank] of Object.entries(ranks)) {
                        if (!equal(before[mode], rank) && (!TIER_MODES.includes(mode) || !RANKS.includes(rank))) errors.push(`${name}/${mode}: invalidRank`);
                    }
                    for (const key of Object.keys(before)) if (!(key in ranks)) errors.push(`${name}/${key}: removedRank`);
                }
            }
            for (const [character, variants] of Object.entries(base[path])) {
                for (const name of Object.keys(variants)) if (!Object.hasOwn(data[character] || {}, name)) errors.push(`${character}/${name}: removedRank`);
            }
        } else {
            if (!data?.variants || !equal({ ...base[path], variants: null }, { ...data, variants: null }) || !equal(Object.keys(base[path].variants), Object.keys(data.variants))) {
                errors.push(`${path}: protectedData`); continue;
            }
            for (const [rarity, variants] of Object.entries(base[path].variants)) {
                if (!Array.isArray(data.variants[rarity]) || variants.length !== data.variants[rarity].length) { errors.push(`${path}: protectedData`); continue; }
                variants.forEach((before, index) => {
                    const after = data.variants[rarity][index];
                    if (!after || !equal(protectedFields(before), protectedFields(after))) { errors.push(`${path}/${before.name}: protectedData`); return; }
                    if (!equal(before.signature_ability, after.signature_ability)) {
                        for (const field of ['name', 'description']) {
                            if (equal(before.signature_ability?.[field], after.signature_ability?.[field])) continue;
                            const error = abilityTextError(after.signature_ability?.[field], true);
                            if (error) errors.push(`${before.name}/${field}: ${error}`);
                        }
                        const key = abilityLinks[abilityIdentity({ character: path.slice(5, -5), variant: before.name })];
                        if (key && before.signature_ability?.name !== after.signature_ability?.name && files[PT_MAPPING_PATH]?.[key]?.ability !== after.signature_ability?.name) errors.push(`${before.name}: abilityLink`);
                    }
                    for (const field of EDITABLE_BUILD_FIELDS) {
                        if (!equal(before[field], after[field]) && (typeof after[field] !== 'string' || /[<>]/.test(after[field]))) errors.push(`${before.name}/${field}: plainText`);
                    }
                    if (!equal(before.builds, after.builds)) {
                        if (after.builds === undefined) return;
                        if (!Array.isArray(after.builds) || !after.builds.length) { errors.push(`${before.name}: invalidBuilds`); return; }
                        const titles = new Set();
                        for (const build of after.builds) {
                            if (!build || typeof build.title !== 'string' || !build.title.trim() || titles.has(build.title)) errors.push(`${before.name}: buildTitle`);
                            titles.add(build?.title);
                            const previous = before.builds?.find(item => item.title === build?.title);
                            for (const key of Object.keys(previous || {})) {
                                if (!['title', ...EDITABLE_BUILD_FIELDS].includes(key) && !equal(previous[key], build[key])) errors.push(`${before.name}/${key}: protectedData`);
                            }
                            for (const [key, value] of Object.entries(build || {})) {
                                if (equal(previous?.[key], value)) continue;
                                if (!['title', ...EDITABLE_BUILD_FIELDS].includes(key) || typeof value !== 'string' || /[<>]/.test(value)) errors.push(`${before.name}/${key}: plainText`);
                            }
                        }
                    }
                });
            }
        }
    }
    if (!equal(base[PT_MAPPING_PATH], files[PT_MAPPING_PATH])) {
        const published = publishedAbilityLinks(files);
        for (const item of catalogFrom(files)) {
            const identity = abilityIdentity(item), expected = abilityLinks[identity];
            if (expected && item.data.signature_ability?.name?.trim() && published[identity] !== expected) errors.push(`${item.variant}: abilityLink`);
        }
    }
    for (const path of Object.keys(base)) if (!Object.hasOwn(files, path)) errors.push(`${path}: missingFile`);
    return errors;
}

export function exportFiles(base, files) {
    const output = clone(files);
    output['data/teams.json'].teams = output['data/teams.json'].teams.filter(team => team.status === 'reviewed');
    return Object.fromEntries(Object.entries(output).filter(([path, data]) => !equal(base[path], data)));
}

export function serializeFile(path, data) {
    const json = JSON.stringify(data, null, 4);
    return path === CLASS_PATH ? `// Editorial class data. Editable through Palace Estudio.\nexport const VARIANT_CLASSES = ${json};\n` : `${json}\n`;
}

export function makeBackup(base, files) {
    return { format: 'palace-editor', version: 1, changes: Object.entries(files).filter(([path, data]) => !equal(base[path], data))
        .map(([path, after]) => ({ path, before: clone(base[path]), after: clone(after) })) };
}

/** All-or-nothing import; an old base never silently replaces newer wiki data. */
export function restoreBackup(base, backup, classesFor) {
    if (backup?.format !== 'palace-editor' || backup.version !== 1 || !Array.isArray(backup.changes)) throw new Error('invalidBackup');
    const restored = clone(base);
    const paths = new Set();
    for (const change of backup.changes) {
        if (!Object.hasOwn(base, change.path) || paths.has(change.path)) throw new Error('invalidBackup');
        const publishedTeams = change.path === 'data/teams.json' && change.after?.version === 1 && Array.isArray(change.after.teams)
            ? { ...change.after, teams: change.after.teams.filter(team => team.status === 'reviewed') } : null;
        // Reopening after applying this editor's own export is safe: those edits
        // already match the files, while unpublished team drafts can be retained.
        if (!equal(base[change.path], change.before) && !equal(base[change.path], change.after)
            && !(publishedTeams && equal(base[change.path], publishedTeams))) throw new Error('staleBackup');
        paths.add(change.path);
        restored[change.path] = clone(change.after);
    }
    // Drafts may be incomplete; every other edited field remains protected.
    // An unfinished ability field is a valid draft, but cannot be exported yet.
    const errors = validateChanges(base, restored, classesFor).filter(error => !error.endsWith(': abilityRequired'));
    if (errors.length) throw new Error(`invalidBackup: ${errors.join('; ')}`);
    return restored;
}

export function teamsFor(files, anchor, category) {
    return files['data/teams.json'].teams.filter(team => sameVariant(team.anchor, anchor) && team.category === category);
}
