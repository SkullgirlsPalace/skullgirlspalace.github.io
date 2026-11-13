// Plain text helpers shared by the local editor, SPA and static publication.
const asText = value => Array.isArray(value) ? value.join('\n') : String(value ?? '');
const label = /(\*\*)?\[\s*(?:HAB|SA)\s*\d+\s*\][ \t]*:?(?:\1)?[ \t]*:?[ \t]*/gi;
const lineLabel = /^[ \t]*(\*\*)?(?:HAB|SA)\s*\d+\s*[:–—-](?:\1)?[ \t]*/gim;

export function stripAbilityLabels(value) {
    return asText(value).replace(/\\n/g, '\n').replace(label, '').replace(lineLabel, '');
}

/** Read legacy markers without requiring them in the fields or exported text. */
export function splitSignatureAbility(value) {
    const raw = asText(value).replace(/\\n/g, '\n');
    const marked = raw.replace(label, '\x00').replace(lineLabel, '\x00');
    const parts = (marked.includes('\x00') ? marked.split('\x00') : raw.split(/\n[ \t]*\n/))
        .map(part => part.trim());
    if (marked.includes('\x00') && !parts[0]) parts.shift();
    return { SA1: parts[0] || '', SA2: parts.slice(1).join('\n\n') };
}

export function joinSignatureAbility({ SA1, SA2 }) {
    // Internal boundaries preserve paragraphs and unfinished fields in backups.
    // These markers never appear in the editor fields, previews or public pages.
    return `[SA1]: ${stripAbilityLabels(SA1).trim()}\n\n[SA2]: ${stripAbilityLabels(SA2).trim()}`;
}

// Confirmed PT-BR terminology from effectData.js. Unknown terms and editorial
// names are deliberately left alone; this is not a general machine translator.
const portugueseTerms = {
    'ARMOR BREAK': 'QUEBRA DE ARMADURA', 'AUTO BLOCK': 'BLOQUEIO AUTOMÁTICO',
    'FINAL STAND': 'RESISTÊNCIA FINAL', 'HEAVY REGEN': 'REGENERAÇÃO FORTE',
    'DEATH MARK': 'MARCA DA MORTE', 'GUARD BREAK': 'QUEBRA DE GUARDA',
    'HEAVY BLEED': 'SANGRAMENTO FORTE', 'INVERSE POLARITY': 'POLARIDADE INVERSA',
    'HEAL BLOCK': 'BLOQUEIO DE CURA', 'POWER SURGE': 'OSCILAÇÃO DE ENERGIA',
    'LOCK BLOCKBUSTER': 'DESATIVAR BLOCKBUSTERS', 'LOCK SPECIAL': 'DESATIVAR ESPECIAIS',
    'DASH ATTACKS': 'ATAQUES EM DISPARADA', 'DASH ATTACK': 'ATAQUE EM DISPARADA',
    'DASHES': 'DISPARADAS', 'DASH': 'DISPARADA',
    'BUFFS': 'EFEITOS POSITIVOS', 'BUFF': 'EFEITO POSITIVO',
    'DEBUFFS': 'EFEITOS NEGATIVOS', 'DEBUFF': 'EFEITO NEGATIVO',
    'ARMOR': 'ARMADURA', 'BARRIER': 'BARREIRA', 'BLESSING': 'BÊNÇÃO',
    'DEADEYE': 'OLHO-MORTO', 'ENRAGE': 'FÚRIA', 'EVASION': 'ESQUIVA',
    'HASTE': 'ACELERAÇÃO', 'IMMUNITY': 'IMUNIDADE', 'INVINCIBLE': 'INVENCÍVEL',
    'PRECISION': 'PRECISÃO', 'REGEN': 'REGENERAÇÃO', 'THORNS': 'ESPINHOS',
    'UNFLINCHING': 'INABALÁVEL', 'BLEED': 'SANGRAMENTO', 'CRIPPLE': 'INCAPACITAÇÃO',
    'CURSE': 'MALDIÇÃO', 'DOOM': 'DESTRUIÇÃO', 'FATIGUE': 'FADIGA',
    'HEX': 'FEITIÇO', 'IMMOBILIZE': 'IMOBILIZAÇÃO', 'SLIME': 'GOSMA',
    'SLOW': 'LENTIDÃO', 'STUN': 'ATORDOAMENTO', 'WITHER': 'DEFINHAR'
};
const termPattern = new RegExp(`(?<![\\p{L}\\p{N}_])(?:${Object.keys(portugueseTerms).sort((a, b) => b.length - a.length).map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})(?![\\p{L}\\p{N}_])`, 'giu');
// This is a Portuguese abbreviation, not an English term or a different effect.
// Accept the familiar spelling with/without a dot and spacing after the dot.
const heavyRegenAbbreviation = /(?<![\p{L}\p{N}_])REGEN(?:\.[ \t]*|[ \t]+)FORTE(?![\p{L}\p{N}_])/giu;
function matchingCase(source, target) {
    if (source === source.toUpperCase()) return target;
    const lower = target.toLocaleLowerCase('pt-BR');
    return source === source.toLowerCase() ? lower : lower[0].toUpperCase() + lower.slice(1);
}

export function localizePortugueseAbility(value) {
    return asText(value)
        .replace(heavyRegenAbbreviation, match => matchingCase(match, 'REGENERAÇÃO FORTE'))
        .replace(termPattern, match => matchingCase(match, portugueseTerms[match.toUpperCase()]))
        // Only these established contexts have an unambiguous assistance meaning.
        .replace(/ao fazer TAG[ -]IN\b/gi, 'Ao ENTRAR NA ASSISTÊNCIA')
        .replace(/\bTAG[ -]INS\b/gi, 'ASSISTÊNCIAS');
}

/** Reduce rank progressions to the last rank, including decreasing values. */
export function normalizeAbilityProgressions(value) {
    const text = asText(value);
    const rank = String.raw`\d+(?:[.,]\d+)?(?:\s*(?:%|seconds?|second\(s\)|segundos?(?:\(s\))?|s|stacks?(?:\(s\))?|acúmulos?(?:\(s\))?|acumulos?(?:\(s\))?|camadas?))?`;
    const progression = new RegExp(`${rank}(?:\\s*\\/\\s*${rank}){2,}`, 'gi');
    return text.replace(progression, sequence => sequence.split('/').at(-1).trim());
}
