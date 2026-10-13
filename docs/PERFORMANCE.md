# Peso e duplicatas na publicação

`npm run build` monta `_site/` e executa a auditoria automaticamente. `npm run audit:site` confere uma publicação já montada, sem alterar arquivos. O CI faz as mesmas verificações nos PRs para `main` e antes de publicar.

A auditoria falha quando há:

- peso acima dos limites em `tools/site-budget.json`, incluindo limites separados para JavaScript, CSS, imagens, fontes e dados;
- uma imagem acima de 500 KB ou um PNG/JPEG dentro de `img/`, onde as imagens raster devem ser WebP;
- uma duplicata byte a byte que não foi revisada;
- arquivos temporários, backups ou pastas locais dentro da publicação;
- uma fonte nova, além das cinco existentes.

Ela também consulta os caminhos versionados pelo Git e reprova a reintrodução de `raw_images/`, `dist/`, `_site/`, `coverage/`, `node_modules/` e temporários, mesmo quando alguém usa `git add -f` para contornar o `.gitignore`.

Os limites iniciais foram escolhidos a partir da medição local de 13/10/2026, com uma margem pequena para manutenção. O teto total é 80 MB (80.000.000 bytes). Não aumente limites nem acrescente exceções apenas para fazer o CI passar: primeiro investigue, reutilize um arquivo existente ou reduza o novo recurso. Uma exceção necessária deve ser explicada no PR.

As três exceções de duplicatas são retratos existentes com caminhos distintos usados pelo acervo. A lista autoriza somente aqueles grupos de caminhos; uma terceira cópia ainda reprova. Não deduza equivalência entre variantes pelo nome ou pela aparência da imagem.

`raw_images/` e `dist/` ficam ignorados e fora do versionamento. As cópias locais foram preservadas; o histórico Git anterior continua contendo os arquivos antigos. `_site/`, `coverage/` e arquivos temporários também não devem ser commitados. O gerador exclui temporários e backups mesmo se ainda existirem no computador.

O peso da publicação é o acervo disponível, não o que um visitante baixa de uma vez. Esta checagem evita crescimento e duplicação; não mede tempo de carregamento, requisições ou tamanho do DOM. Para melhorias de navegação, confira no navegador os recursos realmente baixados por cada página e siga as regras de imagens, imports e carregamento sob demanda de `AGENTS.md`.
