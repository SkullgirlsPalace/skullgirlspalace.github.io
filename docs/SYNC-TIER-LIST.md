# Atualizar os ranks pela Fandom

O comando lê a **Wiki Tier List** de <https://skullgirlsmobile.fandom.com/wiki/Tier_List>, incluindo as 18 abas de personagens na mesma página. Não usa as listas antigas nem o quadro de mudanças recentes: os ranks vêm das tabelas completas.

```powershell
npm.cmd run sync:tier-list
```

Sem `--apply`, o comando somente confere e apresenta as diferenças. Se a Fandom bloquear a coleta direta, salve a página carregada no Brave como HTML e informe o arquivo:

```powershell
npm.cmd run sync:tier-list -- --html "C:\caminho\Tier List.html" --report tmp/tier-list-sync/review.json
npm.cmd run sync:tier-list -- --html "C:\caminho\Tier List.html" --report tmp/tier-list-sync/review.json --apply
```

Também aceita `--tsv`, com seções `# Nome do personagem`, cabeçalho e as cinco colunas separadas por tabulação, como na captura versionada em `tools/tier-list-sync/snapshots/`.

## Correspondência e conversões

- As colunas são conferidas: `PF Offense → pf`, `Rift Offense → riftOff`, `Rift Defense → riftDef`, `Parallel Realms → parallel`.
- A identidade é personagem + nome inglês exato, obtido pelos vínculos confirmados do catálogo com o Krazete. Normalizam-se caixa, espaços, apóstrofos e traços tipográficos. Não há aproximação de nomes, tradução automática ou alteração de variantes.
- `I` e `U` representam o mesmo rank; `N/A` e `TBD` também. A leitura normaliza para `U`/`TBD`, mas grava `I`/`N/A`, os códigos já usados pelo site, pelos filtros e pelo editor. Os demais ranks são preservados.
- Qualquer rank desconhecido, linha incompleta, variante duplicada, ambígua ou sem correspondência bloqueia a aplicação inteira. Todas as variantes locais precisam estar presentes. O relatório lista `unmatchedVariants` e `missingVariants` para revisão.
- Apenas `data/tier-data.json` é atualizado. Antes de gravar, o comando verifica se o arquivo mudou durante a execução e salva uma cópia exata em `tmp/tier-list-sync/*.backup`. Essa pasta é ignorada pelo Git e fica fora da publicação. Para desfazer, restaure o conteúdo desse backup.
- O script é manual e não publica nem modifica times, habilidades, classes, imagens, traduções ou armazenamento dos navegadores. Depois da aplicação, rode testes e build, confira o site local e siga o fluxo normal de revisão/publicação da branch.

## Captura de 20/10/2026

A fonte foi lida na aba da Fandom aberta no Brave. Foram extraídas as células de todos os painéis de personagem, inclusive os inativos. A captura TSV contém 307 variantes, 18 personagens e 1.228 ranks; nenhum rank estava pendente (`TBD`) nessa captura. A conferência de transferência deu 7.749 caracteres, 343 linhas e checksum FNV-1a de 32 bits `4222930917` (sem quebra final, usando unidades UTF-16).

A captura conserva os ranks originais da página. O relatório em `tools/tier-list-sync/reports/2026-10-20.json` registra o SHA-256 da fonte e as alterações por variante/modo. A data do arquivo é a data da coleta, sem presumir quando os colaboradores da Fandom revisaram os ranks.

Para conferir novamente esta captura, sem buscar a versão atual da Fandom:

```powershell
npm.cmd run sync:tier-list -- --tsv tools/tier-list-sync/snapshots/2026-10-20.tsv
```

O HTML externo é interpretado sem executar scripts ou carregar recursos. `happy-dom` é usado somente na ferramenta Node, a partir da dependência de desenvolvimento existente; nenhum recurso é adicionado ao navegador dos visitantes.

Na aplicação desta captura, 679 ranks mudaram em 269 variantes. Passaram os 648 testes com cobertura (46,65% das linhas), o build e a auditoria de peso/duplicatas. As 18 tabelas foram abertas no Brave contra o build local: todos os 1.228 ranks das 307 variantes conferiram com a captura, considerando os nomes PT-BR usados pelo fallback existente em algumas linhas inglesas. A página de Annie também foi conferida em pt-BR. Uma segunda execução do sincronizador apontou zero diferenças. Esses resultados são locais; não representam publicação no GitHub Pages.

## Editor aberto durante a atualização

Os rascunhos do editor guardam a base original. Se um backup antigo contiver alterações em `tier-data.json`, ele pode apontar divergência de base depois desta sincronização. Preserve o backup dos times e confira a revisão indicada pelo editor antes de aplicar uma exportação: um ZIP antigo pode conter o arquivo de ranks anterior. O script não abre, reinicia ou limpa o editor.
