# Conteúdo estático dentro do shell da SPA

O site é uma SPA que só mostra conteúdo depois que o JS roda, e o Bing roda pouco JS. Para ele, as páginas eram só um título e "Carregando...". Por isso cada URL indexável (a home, `/characters/` e as três seções de cada personagem) sai com o conteúdo da página em HTML simples e links reais, logo abaixo do estado de carregamento dentro de `<main id="app">`. Quando o JS sobe, o router troca tudo pelo app, como sempre. Esse HTML vem de um renderizador próprio e enxuto em `tools/build-site.js`, separado dos componentes do app.

## Opções consideradas

- **Migrar para um framework com SSR/SSG**: resolveria de vez, mas significaria reescrever o site inteiro.
- **Reaproveitar os `render()` do app no Node**: eles dependem de DOM, de i18n e dos módulos grandes de `src/data/`, e geram o HTML visual (cards, ícones), não texto para buscador.
- **Só metadados por URL**, como era antes: título e descrição não bastam para que um buscador sem JS indexe a página.

## Consequências

- O HTML estático e o app podem divergir. O renderizador espelha só os dados (nomes, habilidades, builds, ranks), e usa rank B quando falta, como a tier list. Quem mudar o que uma página mostra precisa conferir se o estático continua correspondendo. Senão o buscador e o visitante veem conteúdos diferentes.
- O estático fica em pt-BR, o idioma padrão, mesmo para quem usa o site em inglês.
- Sem JS, um `<noscript>` esconde o spinner e o texto aparece. Com JS, o estático fica abaixo do spinner, que ocupa a tela inteira, até o app substituí-lo.
