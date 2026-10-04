# Skullgirls Palace
Projeto para transformar nosso saudoso bot e minhas planilhas em um sitezinho cheiroso

## Build, deploy e URLs indexáveis

O Palace é uma SPA com hash routes (`#guide`, `#character/annie/builds`…). Para buscadores, o deploy gera uma página de verdade para a home, `/characters/` e cada personagem em `/characters/<slug>/`, `/builds/` e `/tier-list/`. Cada uma traz o shell de `index.html` com metadados próprios e o conteúdo em HTML (variantes, habilidades, builds, tier) com links reais, porque o Bing roda pouco JS. Quando o JS carrega, o router (`src/utils/seoRoutes.js`) abre a interface certa e substitui esse conteúdo. Variantes não recebem URLs próprias.

Quem faz isso é `npm run build` (`tools/build-site.js`): ele monta `_site/` com as páginas, o `sitemap.xml` e só o que o site usa (`PUBLISHED_PATHS`). A cada push na `main`, o GitHub Actions roda os testes, o build, publica `_site/` e avisa o Bing pelo IndexNow (`npm run indexnow`). Nada disso é commitado: basta editar `data/*.json` e subir.

Para ver localmente como vai ao ar: `npm run build` e sirva `_site/` (por exemplo `python3 -m http.server -d _site`).

## Arquitetura de Estilos (CSS)

Refatoramos o antigo arquivo monolítico (`main.css`) em uma estrutura modular para facilitar a manutenção e o desenvolvimento de novas funcionalidades. Agora, cada parte do site tem seu próprio arquivo de estilo.

A nova estrutura fica em `src/styles/` e é dividida em três camadas principais:

### 1. Base (`src/styles/base/`)
Estilos fundamentais que afetam todo o site.
-   `variables.css`: Definições globais de cores, fontes e espaçamentos.
-   `typography.css`: Estilos de texto e fontes.
-   `reset.css`: Reset CSS e normalização de comportamentos entre navegadores.
-   `layout.css`: Estrutura principal das páginas e containers.
-   `utilities.css`: Classes utilitárias gerais.
-   `responsive.css`: Ajustes específicos para dispositivos móveis.

### 2. Componentes (`src/styles/components/`)
Elementos de interface reutilizáveis em várias partes do site.
-   `buttons.css`: Botões e interações.
-   `cards.css`: Cards de personagens e variantes.
-   `navbar.css`: Barra de navegação.
-   `modals.css`: Janelas modais e gavetas laterais.
-   `tooltips.css`: Dicas de ferramenta e tooltips de efeitos/atributos.
-   `filters.css`: Barra de filtros e botões de filtro.
-   ...e outros componentes específicos (`hero.css`, `animations.css`, `badges.css`).

### 3. Páginas (`src/styles/pages/`)
Estilos que são específicos de uma única página.
-   `home.css`: Hub inicial e grade de personagens.
-   `character-detail.css`: Página de detalhes do personagem.
-   `statistics.css`: Página da Calculadora de ganhos e gastos do jogo.
-   `guide.css`: Tabelas e estrutura da página de guias.
-   `tierlist.css`: Página e editor da Tier List.
-   `catalysts.css`: Página de catalisadores.
