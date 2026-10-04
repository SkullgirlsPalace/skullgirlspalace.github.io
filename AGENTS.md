# AGENTS.md

Guia para quem mexe neste repositório, gente ou IA (ChatGPT/Codex, Claude Code, Copilot…). O `CLAUDE.md` só importa este arquivo, então o que vale para todo mundo fica aqui.

## O projeto

Skullgirls Palace (https://skullgirlspalace.github.io/) é uma wiki de Skullgirls Mobile em pt-BR e inglês. É uma SPA em JavaScript puro, com ES modules nativos, sem framework e **sem bundler**, publicada no GitHub Pages. O navegador baixa os arquivos de `src/` exatamente como estão no repo. Cada import, fonte, imagem ou JSON novo vira peso direto para quem visita. Leia a seção de performance antes de adicionar qualquer coisa.

## Comandos

- `npm ci`: instala as dependências (Vitest, happy-dom e `sharp` para as ferramentas de imagem).
- `npx vitest run`: roda todos os testes. `npm test` roda em modo watch.
- `npx vitest run tests/unit/utils/formatters.test.js`: roda um arquivo. Para filtrar pelo nome do teste, use `-t "nome"`.
- `npm run test:coverage`: roda como no CI, que falha com menos de 35% de cobertura de linhas, medida só em `src/`.
- `npm run build`: monta o site em `_site/`. Para ver como vai ao ar, rode `python3 -m http.server -d _site`.
- Não há lint nem type-check configurado. Verificar uma mudança é rodar os testes e abrir o site.

## Build e deploy

Um push na `main` dispara `.github/workflows/deploy.yml`, que roda em ordem:

1. testes com cobertura;
2. `npm run build`;
3. publicação de `_site/` no Pages;
4. `npm run indexnow`, que avisa o Bing das URLs.

Um PR só roda os testes.

`tools/build-site.js` gera, cada uma com o shell de `index.html`, metadados próprios e o conteúdo da página em HTML estático (o Bing roda pouco JS):

- a home;
- `/characters/`;
- `/characters/<slug>/`, `builds/` e `tier-list/` de cada personagem.

Gera também o `sitemap.xml`. Quando o JS carrega, o router substitui todo o `<main id="app">`.

Só vai ao ar o que está em `PUBLISHED_PATHS` dentro desse arquivo. Um arquivo novo que o site use fora de `src/`, `img/`, `data/` e `font/` precisa entrar nessa lista. `_site/` nunca é commitado.

## Arquitetura

- **Boot** (`src/main.js`): monta navbar, drawer, rodapé e scroll-nav. Depois espera, em série, os JSON de todos os personagens, `tier-data.json`, `extras.json` e as traduções do Krazete, e só então chama `initRouter()`. Nada da página aparece antes disso.
- **Handlers globais**: as páginas são template strings com `onclick="navigateTo(...)"` e afins, então as funções chamadas no HTML precisam estar em `window`. `main.js` expõe a maioria, e alguns módulos de página e componente expõem as suas ao serem carregados. Uma função nova usada num template também precisa ser exposta.
- **Router** (`src/router.js`):
  - Rotas por hash: `''` (home), `characters`, `character/<key>/<builds|tier>`, `catalysts`, `tierlist`, `stats`, `guide` e `tutorial-renda-passiva`.
  - Rotas por caminho (`/characters/...`): vêm de `src/utils/seoRoutes.js`. Se a URL tem hash, a hash ganha.
  - Cada página é um módulo em `src/pages/` com `render()`, que devolve uma string que vira o `innerHTML` de `<main id="app">`, e um `init()` opcional.
- **Dados**: `src/services/dataService.js` busca e guarda em cache os `data/*.json`. Há um JSON por personagem, com as variantes agrupadas por raridade (`diamante`, `ouro`, `prata`, `bronze`). A tier list fica em `data/tier-data.json`, com ranks por variante nos modos `pf`, `parallel`, `riftOff` e `riftDef`. Quando falta rank, a tela mostra B. Dados fixos grandes ficam em módulos JS em `src/data/`.
- **Estado** (`src/state/store.js`): um singleton com assinantes. As preferências ficam em `localStorage.SGM_USER_PREFS`.
- **i18n** (`src/i18n/`):
  - `t('chave')` lê `translations.js` (pt-BR e en; se faltar a chave, cai no pt-BR). Todo texto novo da interface entra nas duas línguas.
  - Trocar o idioma grava `localStorage.language` e dispara o evento `languageChanged`, que re-renderiza navbar, rodapé e a página atual.
  - Os nomes das variantes em inglês vêm de `dataTranslations.js`, que usa os dados do Krazete em `data/krazete/`.
- **CSS**: `src/styles/main.css` importa tudo de `base/`, `components/` e `pages/`. As camadas estão descritas no README.
- **Testes**: Vitest com happy-dom, em `tests/unit`, `tests/dom` e `tests/integration`. O `tests/setup.js` simula `localStorage` e `window.location`.

## Personagem novo

Além do `data/<personagem>.json` e das imagens em `img/`, um personagem novo precisa entrar em listas fixas:

- `CHARACTER_FILES`, `CHARACTER_ICONS`, `CHARACTER_COLORS` e `CHARACTER_NAMES_EN` em `src/config/constants.js`;
- `VALID_CHARACTERS` em `tools/manage-variant.js` e `tools/download-image.js`;
- `src/data/variantImages.js`, `movesimages.js` e `characterProfiles.js`.

As páginas e o sitemap saem sozinhos no build.

## Performance: o site já é pesado

Estimativa de outubro de 2026, contando os arquivos:

- **Home:** a primeira visita faz cerca de 100 requisições e baixa uns 2 MB.
- **Página de personagem:** pode passar de 5 MB.

O problema não é o GitHub Pages, é o que o site manda baixar. Toda mudança deve seguir estas regras:

1. **Imagens** são o maior peso.
   - Hoje são 41 MB de retratos de variantes, com largura mediana de 1260 px, exibidos com 160 px nos cards. Os ícones de 800 px aparecem com uns 60 px, e o favicon tem 2000 px.
   - Toda imagem nova deve ser `.webp`, com no máximo 2× o maior tamanho em que aparece na tela.
   - O `tools/optimize-images.js` só converte para webp: ele não redimensiona, a não ser `select_character`. Redimensione antes (o `sharp` já é dependência).
   - Toda `<img>` nova leva `loading="lazy"` (menos as do topo da tela), `width` e `height`.
   - Nunca use URL do Discord (`cdn.discordapp.com`) como imagem: o link expira.
2. **JS**: os 39 módulos de `src/` (cerca de 640 KB, sem minificar) carregam em toda página, inclusive `movesimages.js` (107 KB) e `characterProfiles.js` (91 KB), que a home nem usa.
   - Não importe estaticamente um módulo grande, ou que só uma página usa, a partir de algo que o `main.js` já carrega. Use `import()` dentro do `init()` da página.
   - Dado grande vai para um `data/*.json` buscado quando a página precisa, não para um módulo JS.
3. **Dados no boot**: hoje 22 JSON (cerca de 870 KB) são baixados antes de qualquer coisa aparecer. Não acrescente nada ao `init()` de `main.js`; busque na página que usa.
4. **Fontes**: só há TTF/OTF, nenhuma woff2.
   - A `Dodam` (1,1 MB) acaba baixando nos cards porque o CSS pede `'Roboto Condensed'`, mas a fonte está registrada como `'Roboto'`.
   - `DMFT-chsimp.ttf` (4,7 MB) e `TBCinemaRGothic-M.ttf` (4 MB) quase nunca são usadas.
   - Não adicione fonte. Se for inevitável, use woff2 com subset.
5. **CSS**: todo o CSS (29 arquivos, uns 190 KB) carrega em toda página. Reaproveite as classes existentes e não adicione framework de CSS.
6. **DOM**: a página "Todas as Variantes" renderiza os 297 cards de uma vez, o que dá uns 3 MB de DOM. Uma lista grande nova precisa de paginação ou de renderização aos poucos.
7. **Dependências**: sem bundler, cada biblioteca vai inteira para o navegador. Não adicione framework, lib de UI nem script de CDN.

## Armadilhas conhecidas

- Os scripts de `tools/` que usam `require` quebram com `require is not defined`, porque o `package.json` é `"type": "module"`. São eles: `manage-variant`, `download-image`, `optimize-images`, `process-moves`, `process-catalysts` e `fix-json-move-names`. Para rodar, converta o script para `import` ou renomeie para `.cjs`.
- `raw_images/` (220 MB) e `dist/` (um build antigo do Vite) estão commitados, mas o site não usa nenhum dos dois e eles não vão ao ar. Não referencie nada deles.
- `src/pages/character-profile.js` busca `data/krazete/stanleyDB-*.json`, que não existem, então a requisição dá 404 toda vez.
- Ao trocar de idioma, os listeners de scroll, hashchange e tooltip são adicionados de novo sem remover os antigos.
- `vitest.config.js` declara os limites de cobertura no formato antigo, que o Vitest 4 ignora. Quem barra cobertura baixa é o passo com `jq` no CI.
