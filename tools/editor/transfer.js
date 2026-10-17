import { EDITOR_VERSION, EDITOR_LABEL } from './version.js';
import { serializeFile } from './model.js';

export function createExportArchive(files) {
    const archive = Object.fromEntries(Object.entries(files).map(([path, data]) => [path, serializeFile(path, data)]));
    archive['palace-editor.json'] = JSON.stringify({ format: 'palace-site-export', version: EDITOR_VERSION, files: Object.keys(files) }, null, 2) + '\n';
    archive['LEIA-ME.txt'] = `Palace Estúdio ${EDITOR_LABEL}\n\nEste ZIP contém arquivos para aplicar ao site, não um backup importável.\n1. Salve palace-${EDITOR_LABEL}-backup.json no editor para preservar rascunhos e predefinições.\n2. Extraia este ZIP em uma pasta de revisão e confira os arquivos.\n3. Na mesma base do projeto usada para editar, substitua apenas os caminhos de dados/código listados em palace-editor.json.\n4. Não copie este LEIA-ME nem palace-editor.json para os dados da wiki.\n5. Rode npm.cmd run test:coverage -- --configLoader native e npm.cmd run build.\n6. Envie as mudanças pelo fluxo normal da branch e publicação do repositório. O editor não publica.\n\nSomente times revisados são exportados. Predefinições pessoais ficam no backup.\nBackups de versões diferentes (v1, v2...) são incompatíveis; o número v identifica a geração do editor, não a base dos dados. Mesmo em ${EDITOR_LABEL}, uma base divergente impede a importação.\n\nPalace Studio ${EDITOR_LABEL}: site export, not an importable backup. Save a separate backup for drafts and presets. Review and apply only the listed data/code paths to the same source revision, run tests/build, and use the normal repository publication workflow. Different editor generations are incompatible. The editor never publishes automatically.\n`;
    return archive;
}
