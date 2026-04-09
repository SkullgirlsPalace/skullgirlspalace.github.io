import { describe, it, expect } from 'vitest';
import { CHARACTER_PROFILES, getCharacterProfile, hasProfileData } from '../../../src/data/characterProfiles.js';

describe('characterProfiles.js', () => {
  describe('CHARACTER_PROFILES', () => {
    it('should have profiles for all characters', () => {
      const expectedChars = ['annie', 'beowulf', 'big-band', 'black-dahlia', 'cerebella',
        'double', 'eliza', 'filia', 'fukua', 'marie', 'ms-fortune', 'painwheel',
        'parasoul', 'peacock', 'robo-fortune', 'squigly', 'umbrella', 'valentine'];

      expectedChars.forEach(char => {
        expect(CHARACTER_PROFILES[char]).toBeDefined();
      });
    });

    it('should have required properties for each profile', () => {
      Object.entries(CHARACTER_PROFILES).forEach(([char, profile]) => {
        expect(profile.attack).toBeDefined();
        expect(profile.health).toBeDefined();
        expect(profile.playstyle).toBeDefined();
        expect(profile.biography).toBeDefined();
        expect(profile.characterAbility).toBeDefined();
      });
    });

    it('should have attack values between 1-5', () => {
      Object.values(CHARACTER_PROFILES).forEach(profile => {
        expect(profile.attack).toBeGreaterThanOrEqual(1);
        expect(profile.attack).toBeLessThanOrEqual(5);
      });
    });

    it('should have health values between 1-5', () => {
      Object.values(CHARACTER_PROFILES).forEach(profile => {
        expect(profile.health).toBeGreaterThanOrEqual(1);
        expect(profile.health).toBeLessThanOrEqual(5);
      });
    });

    it('should have characterAbility with title and description', () => {
      Object.values(CHARACTER_PROFILES).forEach(profile => {
        expect(profile.characterAbility.title).toBeDefined();
        expect(profile.characterAbility.description).toBeDefined();
      });
    });

    it('should have biography as HTML string', () => {
      Object.values(CHARACTER_PROFILES).forEach(profile => {
        expect(typeof profile.biography).toBe('string');
        expect(profile.biography.length).toBeGreaterThan(100);
      });
    });

    it('should have optional superiorAbility1', () => {
      // Check that some characters have superiorAbility1
      const withSuperior = Object.values(CHARACTER_PROFILES).filter(p => p.superiorAbility1);
      expect(withSuperior.length).toBeGreaterThan(0);
    });

    it('should have optional prestigeAbility', () => {
      const withPrestige = Object.values(CHARACTER_PROFILES).filter(p => p.prestigeAbility);
      expect(withPrestige.length).toBeGreaterThan(0);
    });
  });

  describe('getCharacterProfile', () => {
    it('should return profile for known characters', () => {
      const profile = getCharacterProfile('annie');
      expect(profile).toBeDefined();
      expect(profile.attack).toBeDefined();
    });

    it('should return null for unknown characters', () => {
      expect(getCharacterProfile('unknown')).toBeNull();
      expect(getCharacterProfile(null)).toBeNull();
      expect(getCharacterProfile(undefined)).toBeNull();
    });

    it('should return correct profile data', () => {
      const profile = getCharacterProfile('filia');
      expect(profile.attack).toBe(3);
      expect(profile.health).toBe(2);
    });
  });

  describe('hasProfileData', () => {
    it('should return true for characters with profiles', () => {
      expect(hasProfileData('annie')).toBe(true);
      expect(hasProfileData('filia')).toBe(true);
    });

    it('should return false for unknown characters', () => {
      expect(hasProfileData('unknown')).toBe(false);
      expect(hasProfileData(null)).toBe(false);
    });

    it('should check for essential data', () => {
      // All known characters should have profile data
      const knownChars = ['annie', 'beowulf', 'big-band'];
      knownChars.forEach(char => {
        expect(hasProfileData(char)).toBe(true);
      });
    });
  });
});
