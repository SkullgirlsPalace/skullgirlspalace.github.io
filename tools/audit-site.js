import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { PUBLISHED_PATHS } from './build-site.js';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const SITE_BUDGET = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'tools', 'site-budget.json'), 'utf8'));
const FORBIDDEN_DIRECTORIES = new Set(['raw_images', 'dist', 'node_modules', '.git', 'coverage', 'tests', 'tools', 'docs']);
const duplicateKey = paths => JSON.stringify([...paths].sort());

export function validateTrackedPaths(paths) {
    const localRoots = new Set(['raw_images', 'dist', '_site', 'coverage', 'node_modules']);
    return paths.filter(file => localRoots.has(file.split('/')[0]) || /(?:\.(?:bak|backup|orig|tmp)|~)$/i.test(file))
        .map(file => `Local-only file must not be versioned: ${file}`);
}

export function auditRepository({ rootDir = ROOT_DIR } = {}) {
    const paths = execFileSync('git', ['ls-files', '-z'], { cwd: rootDir, encoding: 'utf8' }).split('\0').filter(Boolean);
    return { files: paths.length, errors: validateTrackedPaths(paths) };
}

/** Read-only check of the actual publication folder, including generated pages. */
export function auditSite({ siteDir = path.join(ROOT_DIR, '_site'), budget = SITE_BUDGET } = {}) {
    if (!fs.existsSync(siteDir)) throw new Error('Publication folder is missing. Run npm run build first.');
    const errors = [], files = [];
    const allowedRoots = new Set(['index.html', 'characters', 'sitemap.xml', ...PUBLISHED_PATHS]);
    const totals = { siteBytes: 0, javascriptBytes: 0, cssBytes: 0, imageBytes: 0, fontBytes: 0, fontFiles: 0, dataBytes: 0 };

    function walk(directory, prefix = '') {
        for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
            const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
            const parts = relativePath.split('/');
            const fullPath = path.join(directory, entry.name);
            if (!prefix && !allowedRoots.has(entry.name)) errors.push(`Unexpected published path: ${relativePath}`);
            if (FORBIDDEN_DIRECTORIES.has(entry.name) && entry.isDirectory()) errors.push(`Local-only directory was published: ${relativePath}`);
            if (entry.isSymbolicLink()) {
                errors.push(`Symbolic links are not allowed in the publication: ${relativePath}`);
            } else if (entry.isDirectory()) {
                walk(fullPath, relativePath);
            } else if (entry.isFile()) {
                const bytes = fs.statSync(fullPath).size;
                const extension = path.extname(entry.name).toLowerCase();
                files.push({ path: relativePath, fullPath, bytes });
                totals.siteBytes += bytes;
                if (extension === '.js') totals.javascriptBytes += bytes;
                if (extension === '.css') totals.cssBytes += bytes;
                if (parts[0] === 'data') totals.dataBytes += bytes;
                if (parts[0] === 'font') { totals.fontBytes += bytes; totals.fontFiles++; }
                if (parts[0] === 'img') {
                    totals.imageBytes += bytes;
                    if (bytes > budget.limits.singleImageBytes) errors.push(`Image exceeds ${budget.limits.singleImageBytes} bytes: ${relativePath} (${bytes})`);
                    if (['.png', '.jpg', '.jpeg'].includes(extension)) errors.push(`Raster image must use WebP: ${relativePath}`);
                }
                if (/(?:\.(?:bak|backup|orig|tmp)|~)$/i.test(entry.name)) errors.push(`Backup or temporary file was published: ${relativePath}`);
            }
        }
    }
    walk(path.resolve(siteDir));

    for (const [metric, value] of Object.entries(totals)) {
        const limit = budget.limits[metric];
        if (!Number.isSafeInteger(limit) || limit < 0) throw new Error(`Invalid budget limit: ${metric}`);
        if (value > limit) errors.push(`${metric}: ${value} exceeds the budget of ${limit}`);
    }

    // Hash only files with matching sizes. These are byte-for-byte duplicates, not similar images.
    const bySize = new Map();
    for (const file of files) {
        if (!file.bytes) continue;
        if (!bySize.has(file.bytes)) bySize.set(file.bytes, []);
        bySize.get(file.bytes).push(file);
    }
    const allowedDuplicates = new Set(budget.allowedDuplicates.map(duplicateKey));
    const duplicates = [];
    for (const sameSize of bySize.values()) {
        if (sameSize.length < 2) continue;
        const byHash = new Map();
        for (const file of sameSize) {
            const hash = createHash('sha256').update(fs.readFileSync(file.fullPath)).digest('hex');
            if (!byHash.has(hash)) byHash.set(hash, []);
            byHash.get(hash).push(file);
        }
        for (const matching of byHash.values()) {
            if (matching.length < 2) continue;
            const paths = matching.map(file => file.path).sort();
            const allowed = allowedDuplicates.has(duplicateKey(paths));
            duplicates.push({ paths, bytesEach: matching[0].bytes, extraBytes: matching[0].bytes * (matching.length - 1), allowed });
            if (!allowed) errors.push(`Unreviewed duplicate files: ${paths.join(', ')}`);
        }
    }

    return { files: files.length, totals, duplicates, errors };
}

const isDirectExecution = process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
if (isDirectExecution) {
    try {
        const report = auditSite();
        const repository = auditRepository();
        report.errors.push(...repository.errors);
        for (const [metric, value] of Object.entries(report.totals)) {
            console.log(`${metric}: ${value} / ${SITE_BUDGET.limits[metric]}`);
        }
        console.log(`Files: ${report.files}. Existing allowed duplicate groups: ${report.duplicates.filter(group => group.allowed).length}.`);
        console.log(`Versioned files checked: ${repository.files}.`);
        if (report.errors.length) {
            report.errors.forEach(error => console.error(error));
            process.exitCode = 1;
        } else {
            console.log('Publication weight and duplicate checks passed.');
        }
    } catch (error) {
        console.error(error.message);
        process.exitCode = 1;
    }
}
