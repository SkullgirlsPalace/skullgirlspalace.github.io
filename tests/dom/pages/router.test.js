import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock window.location
let hashValue = '';
vi.stubGlobal('window', {
  location: {
    get hash() { return hashValue; },
    set hash(val) { hashValue = val; },
    href: 'http://localhost/',
    pathname: '/',
  },
  scrollTo: vi.fn(),
  addEventListener: vi.fn(),
});

vi.stubGlobal('document', {
  getElementById: vi.fn(() => ({ innerHTML: '', classList: { remove: vi.fn() } })),
});

describe('router.js', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    hashValue = '';
  });

  describe('parseHash', () => {
    it('should be importable', async () => {
      // Need to import after mocks are set up
      const module = await import('../../../src/router.js');
      expect(module).toBeDefined();
    });
  });

  describe('navigateTo', () => {
    it('should be callable', async () => {
      const { navigateTo } = await import('../../../src/router.js');
      expect(typeof navigateTo).toBe('function');
    });
  });

  describe('getCurrentRoute', () => {
    it('should be callable', async () => {
      const { getCurrentRoute } = await import('../../../src/router.js');
      expect(typeof getCurrentRoute).toBe('function');
    });
  });

  describe('initRouter', () => {
    it('should be callable', async () => {
      const { initRouter } = await import('../../../src/router.js');
      expect(typeof initRouter).toBe('function');
    });
  });

  describe('openCharacterDetails', () => {
    it('should be callable', async () => {
      const { openCharacterDetails } = await import('../../../src/router.js');
      expect(typeof openCharacterDetails).toBe('function');
    });
  });

  describe('openCharacterTier', () => {
    it('should be callable', async () => {
      const { openCharacterTier } = await import('../../../src/router.js');
      expect(typeof openCharacterTier).toBe('function');
    });
  });

  describe('switchDetailTab', () => {
    it('should be callable', async () => {
      const { switchDetailTab } = await import('../../../src/router.js');
      expect(typeof switchDetailTab).toBe('function');
    });
  });
});
