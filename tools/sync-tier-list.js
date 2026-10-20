import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { parseArgs } from 'node:util';
import { SOURCE_URL, parseHTML, parseTSV, prepareSync } from './tier-list-sync/core.js';
import { EN_ABILITIES_PATH, PT_MAPPING_PATH } from './editor/abilities.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const readJSON = async file => JSON.parse(await fs.readFile(path.join(root, file), 'utf8'));

export async function sync(args = process.argv.slice(2)) {
    const { values } = parseArgs({ args, options: { html: { type: 'string' }, tsv: { type: 'string' }, apply: { type: 'boolean' }, report: { type: 'string' }, 'dry-run': { type: 'boolean' }, help: { type: 'boolean' } } });
    if (values.help) { console.log('npm.cmd run sync:tier-list -- [--html pagina.html | --tsv fonte.tsv] [--report relatorio.json] [--apply]\nSem --apply, somente confere. Sem arquivo, busca a página Fandom.'); return; }
    if (values.html && values.tsv) throw new Error('Escolha --html ou --tsv.');
    if (values.apply && values['dry-run']) throw new Error('--apply e --dry-run são incompatíveis.');
    let source;
    if (values.html || values.tsv) source = await fs.readFile(path.resolve(values.html || values.tsv), 'utf8');
    else {
        const response = await fetch(SOURCE_URL, { signal: AbortSignal.timeout(30000) });
        if (!response.ok) throw new Error(`Fandom retornou HTTP ${response.status}. Salve a página completa no Brave e use --html caminho.html.`);
        source = await response.text();
    }
    const rows = values.tsv ? parseTSV(source) : parseHTML(source);
    // Read the configured catalog without importing browser-only constants into Node.
    const constants = await fs.readFile(path.join(root, 'src/config/constants.js'), 'utf8');
    const block = constants.match(/export const CHARACTER_FILES = \[([\s\S]*?)\];/);
    if (!block) throw new Error('CHARACTER_FILES não encontrado.');
    const characterFiles = [...block[1].matchAll(/'([^']+\.json)'/g)].map(match => `data/${match[1]}`);
    const paths = [...characterFiles, EN_ABILITIES_PATH, PT_MAPPING_PATH];
    const files = Object.fromEntries(await Promise.all(paths.map(async file => [file, await readJSON(file)])));
    const tierPath = path.join(root, 'data/tier-data.json');
    const original = await fs.readFile(tierPath, 'utf8');
    const { data, report } = prepareSync(rows, files, JSON.parse(original));
    report.input = values.html || values.tsv || SOURCE_URL;
    report.sourceSHA256 = createHash('sha256').update(source.replace(/\r\n/g, '\n').trimEnd()).digest('hex');
    report.collectedAt = new Date().toISOString();
    console.log(JSON.stringify({ valid: report.valid, sourceVariants: report.sourceVariants, localVariants: report.localVariants, matched: report.matched, changedVariants: report.changedVariants, changedRanks: report.changedRanks, characters: report.characters, unmatchedVariants: report.unmatchedVariants, missingVariants: report.missingVariants, errors: report.errors }, null, 2));
    if (values.report) {
        const reportPath = path.resolve(values.report);
        const relative = path.relative(root, reportPath).split(path.sep).join('/');
        if (!['tmp/tier-list-sync/', 'tools/tier-list-sync/reports/'].some(directory => relative.startsWith(directory)) || !relative.endsWith('.json')) {
            throw new Error('Salve o relatório .json em tmp/tier-list-sync/ ou tools/tier-list-sync/reports/ para preservar os arquivos do projeto.');
        }
        await fs.mkdir(path.dirname(reportPath), { recursive: true });
        await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
    }
    if (!report.valid) throw new Error('Coleta incompleta ou correspondência ambígua. Nenhum rank foi gravado. Confira o relatório.');
    if (!values.apply) { console.log('Conferência concluída. Use --apply para gravar os ranks.'); return report; }
    if (!report.changedRanks) { console.log('Os ranks já estão sincronizados.'); return report; }
    // Recheck and keep an exact backup before replacing this one public file.
    if (await fs.readFile(tierPath, 'utf8') !== original) throw new Error('tier-data.json mudou durante a coleta. Rode novamente.');
    const backup = path.join(root, 'tmp/tier-list-sync', `tier-data-${Date.now()}.backup`);
    await fs.mkdir(path.dirname(backup), { recursive: true });
    await fs.writeFile(backup, original, { flag: 'wx' });
    const temporary = `${tierPath}.tmp`;
    await fs.writeFile(temporary, `${JSON.stringify(data, null, 4)}\n`, { flag: 'wx' });
    await fs.rename(temporary, tierPath);
    console.log(`Ranks aplicados em data/tier-data.json. Backup: ${path.relative(root, backup)}`);
    return report;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
    sync().catch(error => { console.error(error.message); process.exitCode = 1; });
}
