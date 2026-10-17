import { findVariant, sameVariant } from '../../src/utils/teamData.js';

export const PRESET_KINDS = ['team', 'support', 'defense'];

export const isQuickPreset = preset => Array.isArray(preset?.members) && preset.members.length >= 1 && preset.members.length <= 2;

/** A reusable companion or pair works with any page variant; the anchor stays first. */
export function membersWithCompanions(preset, anchor) {
    if (!isQuickPreset(preset)) throw new Error('quickMemberLimit');
    const members = [anchor, ...preset.members.filter(member => !sameVariant(member, anchor))];
    return members.map(member => ({ character: member.character, variant: member.variant }));
}

export function validatePresets(presets, characters) {
    if (!Array.isArray(presets) || presets.length > 100) throw new Error('invalidPresets');
    const ids = new Set();
    for (const preset of presets) {
        if (!preset || typeof preset.id !== 'string' || !preset.id || ids.has(preset.id)
            || typeof preset.name !== 'string' || !preset.name.trim() || preset.name.length > 80
            || !PRESET_KINDS.includes(preset.kind) || !Array.isArray(preset.members)
            || preset.members.length > (preset.kind === 'team' ? 3 : 300)) throw new Error('invalidPresets');
        ids.add(preset.id);
        const members = new Set();
        for (const member of preset.members) {
            const key = JSON.stringify([member?.character, member?.variant]);
            if (!findVariant(characters, member) || members.has(key)) throw new Error('invalidPresets');
            members.add(key);
        }
    }
    return presets;
}

export function membersFromPreset(preset, anchor) {
    if (preset.kind !== 'team' || !preset.members.length) throw new Error('presetTeamRequired');
    const members = preset.members.map(member => ({ character: member.character, variant: member.variant }));
    if (!members.some(member => sameVariant(member, anchor))) {
        if (members.length === 3) throw new Error('presetAnchor');
        members.unshift({ ...anchor });
    }
    return members;
}
