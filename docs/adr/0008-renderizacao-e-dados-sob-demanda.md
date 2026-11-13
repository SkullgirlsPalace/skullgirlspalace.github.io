# Renderização e dados sob demanda

O `main.js` esperava os 18 arquivos de personagem, a tier list, os dados extras e as traduções do Krazete antes de abrir qualquer rota. O router também importava de uma vez os módulos de todas as páginas; a home acabava transferindo e inicializando código de filtros, golpes, atributos e fichas que não usa.

## Decisão

A home monta sua interface e renderiza sem esperar dados de página. O router carrega o módulo e os dados da rota sob demanda: uma visão geral pede apenas o personagem correspondente; Builds prepara catálogo, tier, extras e traduções usados por filtros, recomendações e nomes; as demais páginas carregam somente seu módulo e inicializam os dados específicos em `init()`. Requisições simultâneas ao mesmo JSON compartilham o resultado em cache. O router ignora renderizações assíncronas obsoletas após outra rota ser escolhida. Componentes grandes e handlers de cards também podem ser importados no primeiro uso.

## Opções consideradas

- Manter o boot global: deixaria a home bloqueada por dados que algumas páginas usam, mesmo sem haver dependência funcional.
- Adotar bundler ou framework: dividiria o código em chunks automaticamente, mas mudaria a arquitetura nativa e o fluxo de publicação.
- Reescrever todo o catálogo como API granular: evitaria carregar os personagens não visíveis em algumas páginas, mas alteraria filtros, recomendações e busca globais. A primeira otimização mantém esse comportamento e elimina espera de dados na home.

## Consequências

- A home fica utilizável antes de requisitar os dados do jogo. Rotas de detalhes podem aguardar seus dados essenciais, mas não executam antes que o módulo e os dados da rota terminem de carregar.
- O router, o serviço de dados e as páginas passam a definir fronteiras explícitas de carregamento; alterações nesses caminhos precisam verificar tanto a rota direta quanto a navegação interna.
- Os arquivos servidos continuam sendo módulos ES nativos. Não há etapa de bundling nem dependência de runtime adicional.
- O tamanho total publicado ainda não mede a quantidade baixada por uma visita. A auditoria de peso do build e a inspeção de rede no navegador respondem perguntas diferentes.
