# palacio-branco-entreprises
Projeto para transformar nosso saudoso bot e minhas planilhas em um sitezinho cheiroso

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
-   `statistics.css`: Calculadoras e página de estatísticas.
-   `guide.css`: Tabelas e estrutura da página de guias.
-   `tierlist.css`: Página e editor da Tier List.
-   `catalysts.css`: Página de catalisadores.

### Como funciona?
O arquivo `src/styles/main.css` agora serve apenas como um ponto de entrada (entry point). Ele utiliza `@import` para carregar todos os módulos na ordem correta, garantindo que a especificidade do CSS (cascade) funcione como esperado.

Para modificar um estilo, vá direto ao arquivo correspondente (ex: quer mudar a cor de um botão? Edite `components/buttons.css`).

> **Nota:** O arquivo antigo foi preservado como `src/styles/main.css.legacy` para segurança, mas pode ser removido quando desejar.
