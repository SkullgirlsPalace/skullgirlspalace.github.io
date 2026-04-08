import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('ExportCharacterData.js', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '';
  });

  describe('renderExportModal', () => {
    it('should be importable', async () => {
      const module = await import('../../../src/components/ExportCharacterData.js');
      expect(module.renderExportModal).toBeDefined();
      expect(typeof module.renderExportModal).toBe('function');
    });

    it('should return HTML string', async () => {
      const { renderExportModal } = await import('../../../src/components/ExportCharacterData.js');
      const html = renderExportModal();
      expect(typeof html).toBe('string');
      expect(html.length).toBeGreaterThan(100);
    });

    it('should contain modal class', async () => {
      const { renderExportModal } = await import('../../../src/components/ExportCharacterData.js');
      const html = renderExportModal();
      expect(html).toContain('export-modal');
    });

    it('should contain character checkboxes', async () => {
      const { renderExportModal } = await import('../../../src/components/ExportCharacterData.js');
      const html = renderExportModal();
      expect(html).toContain('checkbox');
    });

    it('should contain selection controls', async () => {
      const { renderExportModal } = await import('../../../src/components/ExportCharacterData.js');
      const html = renderExportModal();
      expect(html).toContain('Selecionar');
    });
  });

  describe('toggleExportModal', () => {
    it('should be callable', async () => {
      const { toggleExportModal } = await import('../../../src/components/ExportCharacterData.js');
      expect(typeof toggleExportModal).toBe('function');
    });
  });
});
