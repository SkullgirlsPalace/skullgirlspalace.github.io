import { describe, expect, it } from 'vitest';
import { reviewedTeams, supportsDefensiveTeams, validateTeam } from '../../../src/utils/teamData.js';

const characters = {
    annie: { variants: { diamante: [{ name: 'Rosa' }, { name: 'Brilho' }] } },
    filia: { variants: { bronze: [{ name: 'Cabelos' }] } }
};
const team = () => ({ id: 'one', anchor: { character: 'annie', variant: 'Rosa' }, category: 'general', status: 'reviewed', reviewedOn: '2026-10-15', members: [{ character: 'annie', variant: 'Rosa' }, { character: 'annie', variant: 'Brilho' }, { character: 'filia', variant: 'Cabelos' }] });

describe('editorial teams', () => {
    it('accepts one to three cards including the page variant without strategy text', () => {
        for (const count of [1, 2, 3]) {
            const value = team(); value.members = value.members.slice(0, count);
            expect(validateTeam(value, characters)).toEqual([]);
        }
    });
    it('rejects wrong character references, duplicate variants and teams missing their anchor', () => {
        const value = team(); value.members[1] = { character: 'filia', variant: 'Rosa' };
        expect(validateTeam(value, characters)).toContain('unknownMember');
        value.members[1] = value.members[0];
        expect(validateTeam(value, characters)).toContain('duplicateMember');
        value.members = [{ character: 'filia', variant: 'Cabelos' }];
        expect(validateTeam(value, characters)).toContain('missingAnchor');
        value.members = [];
        expect(validateTeam(value, characters)).toContain('memberLimit');
    });
    it('requires an eligible class for defense and validates actual calendar dates', () => {
        const value = team(); value.category = 'defense'; value.reviewedOn = '2026-02-30';
        expect(validateTeam(value, characters, () => ['Ofensivo'])).toEqual(expect.arrayContaining(['defenseClass', 'reviewDate']));
        expect(supportsDefensiveTeams(['Ofensivo', 'Suporte de Utilidade'])).toBe(true);
        value.reviewedOn = '2026-10-15';
        expect(validateTeam(value, characters, () => ['Coringa'])).toEqual([]);
    });
    it('never exposes drafts or invalid reviewed records', () => {
        const valid = team(), draft = { ...team(), status: 'draft' }, broken = { ...team(), members: [] };
        expect(reviewedTeams({ version: 1, teams: [valid, draft, broken] }, valid.anchor, 'general', characters)).toEqual([valid]);
        expect(reviewedTeams({ version: 2, teams: [valid] }, valid.anchor, 'general', characters)).toEqual([]);
    });
});
