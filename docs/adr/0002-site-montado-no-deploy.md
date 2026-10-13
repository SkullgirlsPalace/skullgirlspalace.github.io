# Site montado no deploy e publicado pelo GitHub Actions

As páginas da [ADR 0001](0001-conteudo-estatico-no-shell-da-spa.md) dependem de todos os `data/*.json`, e quem mantém esses dados não é dev. Se as páginas geradas fossem commitadas, como era antes, cada edição de dado exigiria rodar um comando, senão o site ficaria desatualizado. Por isso tudo é gerado no deploy: `npm run build` monta `_site/` com as páginas, o `sitemap.xml` e só o que está em `PUBLISHED_PATHS`, e o GitHub Pages publica esse resultado. Nada gerado vai para o git.

## Opções consideradas

- **Manter as páginas commitadas e o CI conferir se estão atualizadas**: deixa com quem mantém os dados a tarefa de lembrar de rodar o gerador.
- **Gerar no CI e commitar de volta na `main`**: evita o passo manual, mas suja o histórico e exige que o workflow tenha permissão de escrita no repo.

## Consequências

- **O Pages precisa estar com a fonte "GitHub Actions"** (Settings → Pages → Build and deployment → Source). Com "Deploy from a branch", o GitHub publica os arquivos crus da `main`: as páginas de personagem e o sitemap viram 404, e o workflow roda à toa. Isso aconteceu em 03/10/2026, logo depois do merge do #63, até a fonte ser trocada.
- Um arquivo novo que o site use fora de `src/`, `img/`, `data/` e `font/` precisa entrar em `PUBLISHED_PATHS`, senão não vai ao ar. Em compensação, `raw_images/`, `tests/`, `tools/`, `dist/` e os `.md` deixaram de ser publicados, e o artefato caiu de ~300 MB para ~73 MB.
- Abrir o `index.html` da raiz localmente continua funcionando com as rotas por hash. Para testar as rotas `/characters/...`, é preciso rodar `npm run build` e servir `_site/`.
