import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('tutorialRendaPassiva.js page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('should be importable', async () => {
    const module = await import('../../../src/pages/tutorialRendaPassiva.js');
    expect(module).toBeDefined();
  });

  it('should export render and init functions', async () => {
    const module = await import('../../../src/pages/tutorialRendaPassiva.js');
    expect(typeof module.render).toBe('function');
    expect(typeof module.init).toBe('function');
  });

  describe('render() DOM structure', () => {
    let html;

    beforeEach(async () => {
      const { render } = await import('../../../src/pages/tutorialRendaPassiva.js');
      html = render();
      document.body.innerHTML = html;
    });

    it('should render the tutorial page wrapper', () => {
      const wrapper = document.querySelector('.tutorial-page');
      expect(wrapper).not.toBeNull();
    });

    it('should render the manifesto wrapper', () => {
      const manifesto = document.querySelector('.manifesto-wrapper');
      expect(manifesto).not.toBeNull();
    });

    it('should render the main h1 title', () => {
      const h1 = document.querySelector('.manifesto-wrapper h1');
      expect(h1).not.toBeNull();
      expect(h1.textContent.trim()).toBe('O Manifesto da Renda Passiva');
    });

    it('should render the subtitle', () => {
      const subtitle = document.querySelector('.manifesto-wrapper .subtitle');
      expect(subtitle).not.toBeNull();
      expect(subtitle.textContent).toContain('Fenda');
    });

    it('should render the EDIÇÃO ATUALIZADA stamp', () => {
      const stamp = document.querySelector('.manifesto-wrapper .stamp');
      expect(stamp).not.toBeNull();
      expect(stamp.textContent.trim()).toBe('EDIÇÃO ATUALIZADA');
    });

    it('should render all 7 section headings (I through VII)', () => {
      const headings = document.querySelectorAll('.manifesto-wrapper h2');
      expect(headings.length).toBe(7);
    });

    it('should render the Preâmbulo section (Section I)', () => {
      const headings = Array.from(document.querySelectorAll('.manifesto-wrapper h2'));
      const preambulo = headings.find(h => h.textContent.includes('Preâmbulo'));
      expect(preambulo).not.toBeNull();
    });

    it('should render the Pilares da Eficiência section (Section II)', () => {
      const headings = Array.from(document.querySelectorAll('.manifesto-wrapper h2'));
      const pilares = headings.find(h => h.textContent.includes('Pilares'));
      expect(pilares).not.toBeNull();
    });

    it('should render the 4 strategy pillars as list items', () => {
      const ul = document.querySelector('.manifesto-wrapper ul');
      expect(ul).not.toBeNull();
      const lis = ul.querySelectorAll('li');
      expect(lis.length).toBe(4);
    });

    it('should render the Decreto da Base Econômica section (Section III)', () => {
      const headings = Array.from(document.querySelectorAll('.manifesto-wrapper h2'));
      const decreto = headings.find(h => h.textContent.includes('Decreto'));
      expect(decreto).not.toBeNull();
    });

    it('should render the Alquimia dos Catalisadores section (Section IV)', () => {
      const headings = Array.from(document.querySelectorAll('.manifesto-wrapper h2'));
      const alquimia = headings.find(h => h.textContent.includes('Alquimia'));
      expect(alquimia).not.toBeNull();
    });

    it('should render the Concílio das Guildas section (Section V)', () => {
      const headings = Array.from(document.querySelectorAll('.manifesto-wrapper h2'));
      const concilio = headings.find(h => h.textContent.includes('Concílio') || h.textContent.includes('Guildas'));
      expect(concilio).not.toBeNull();
    });

    it('should render the Mapa da Cidadela section (Section VI)', () => {
      const headings = Array.from(document.querySelectorAll('.manifesto-wrapper h2'));
      const mapa = headings.find(h => h.textContent.includes('Mapa') || h.textContent.includes('Cidadela'));
      expect(mapa).not.toBeNull();
    });

    it('should render the Conclusão section (Section VII)', () => {
      const headings = Array.from(document.querySelectorAll('.manifesto-wrapper h2'));
      const conclusao = headings.find(h => h.textContent.includes('Conclusão'));
      expect(conclusao).not.toBeNull();
    });

    it('should render the base image frame', () => {
      const imageFrame = document.querySelector('.image-frame');
      expect(imageFrame).not.toBeNull();
      const img = imageFrame.querySelector('img');
      expect(img).not.toBeNull();
    });

    it('should render the highlight box (Ordenanças de Forja)', () => {
      const highlightBox = document.querySelector('.highlight-box');
      expect(highlightBox).not.toBeNull();
      expect(highlightBox.textContent).toContain('Forja');
    });

    it('should render the manifesto footer', () => {
      const footer = document.querySelector('.manifesto-wrapper footer');
      expect(footer).not.toBeNull();
    });
  });
});
