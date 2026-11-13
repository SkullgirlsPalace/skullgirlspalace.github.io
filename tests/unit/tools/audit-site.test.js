import { afterEach, describe, expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { auditSite, validateTrackedPaths } from '../../../tools/audit-site.js';

const temporarySites = [];
const budget = {
    limits: { siteBytes: 1000, javascriptBytes: 100, cssBytes: 100, imageBytes: 100,
        fontBytes: 100, fontFiles: 1, dataBytes: 100, singleImageBytes: 100 },
    allowedDuplicates: []
};

function site(files) {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'publication-audit-'));
    temporarySites.push(directory);
    for (const [name, content] of Object.entries(files)) {
        const file = path.join(directory, name);
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, content);
    }
    return directory;
}

afterEach(() => {
    for (const directory of temporarySites.splice(0)) {
        // Only remove the exact temporary fixture that this test created.
        if (path.dirname(directory) !== path.resolve(os.tmpdir()) || !path.basename(directory).startsWith('publication-audit-')) throw new Error('Unsafe test cleanup path');
        fs.rmSync(directory, { recursive: true, force: true });
    }
});

describe('published site weight audit', () => {
    it('rejects the local editor and its launcher in the published artifact', () => {
        const report = auditSite({ siteDir: site({ 'tools/editor/index.html': 'local editor', 'Abrir-Editor.cmd': 'local launcher' }), budget });
        expect(report.errors).toContain('Local-only directory was published: tools');
        expect(report.errors).toContain('Unexpected published path: Abrir-Editor.cmd');
    });
    it('counts the published resources without modifying them', () => {
        const siteDir = site({ 'index.html': 'home', 'src/app.js': 'const x=1;', 'src/style.css': 'body{}', 'img/icon.webp': 'image', 'data/test.json': '{}' });
        const before = fs.readFileSync(path.join(siteDir, 'img/icon.webp'));
        const report = auditSite({ siteDir, budget });
        expect(report.errors).toEqual([]);
        expect(report.files).toBe(5);
        expect(report.totals).toMatchObject({ siteBytes: 27, javascriptBytes: 10, cssBytes: 6, imageBytes: 5, dataBytes: 2 });
        expect(fs.readFileSync(path.join(siteDir, 'img/icon.webp'))).toEqual(before);
    });

    it('rejects a weight increase and oversized individual images', () => {
        const report = auditSite({ siteDir: site({ 'img/large.webp': Buffer.alloc(101) }), budget });
        expect(report.errors.some(error => error.includes('imageBytes'))).toBe(true);
        expect(report.errors.some(error => error.includes('Image exceeds'))).toBe(true);
    });

    it('rejects new byte-for-byte copies, including a third copy of an allowed pair', () => {
        const siteDir = site({ 'img/a.webp': 'same', 'img/b.webp': 'same' });
        expect(auditSite({ siteDir, budget }).errors).toContain('Unreviewed duplicate files: img/a.webp, img/b.webp');
        const approved = { ...budget, allowedDuplicates: [['img/b.webp', 'img/a.webp']] };
        expect(auditSite({ siteDir, budget: approved }).errors).toEqual([]);
        fs.writeFileSync(path.join(siteDir, 'img/c.webp'), 'same');
        expect(auditSite({ siteDir, budget: approved }).errors.some(error => error.includes('Unreviewed duplicate'))).toBe(true);
    });

    it('does not treat different contents of equal size as duplicates', () => {
        const report = auditSite({ siteDir: site({ 'img/a.webp': 'abcd', 'img/b.webp': 'efgh' }), budget });
        expect(report.duplicates).toEqual([]);
        expect(report.errors).toEqual([]);
    });

    it('rejects local directories, backup files and unoptimized raster formats', () => {
        const report = auditSite({ siteDir: site({ 'raw_images/a.png': 'raw', 'img/a.webp.tmp': 'temporary', 'img/photo.jpg': 'jpeg', 'notes.txt': 'private note' }), budget });
        expect(report.errors.some(error => error.includes('Local-only directory'))).toBe(true);
        expect(report.errors.some(error => error.includes('Backup or temporary'))).toBe(true);
        expect(report.errors.some(error => error.includes('Raster image must use WebP'))).toBe(true);
        expect(report.errors.some(error => error.includes('Unexpected published path: notes.txt'))).toBe(true);
    });

    it('blocks adding fonts beyond the existing count', () => {
        const report = auditSite({ siteDir: site({ 'font/one.woff2': 'first', 'font/two.woff2': 'second' }), budget });
        expect(report.errors.some(error => error.includes('fontFiles'))).toBe(true);
    });

    it('requires the publication to have been mounted first', () => {
        expect(() => auditSite({ siteDir: path.join(site({}), 'missing'), budget })).toThrow('Run npm run build first');
    });

    it('rejects reintroducing local archives and temporaries into Git while permitting project documentation', () => {
        const paths = ['raw_images/a.png', 'dist/assets/old.js', '_site/index.html', 'coverage/report.json', 'img/a.webp.tmp', 'src/main.js', 'docs/PERFORMANCE.md'];
        expect(validateTrackedPaths(paths)).toHaveLength(5);
        expect(validateTrackedPaths(['src/main.js', 'docs/PERFORMANCE.md', 'img/a.webp'])).toEqual([]);
    });
});
