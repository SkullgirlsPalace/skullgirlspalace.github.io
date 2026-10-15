# Palace Estúdio

Editor local e separado da wiki. Não exige conta, banco de dados nem instalação de dependências novas. O servidor é somente de leitura, acessível em `127.0.0.1`. O editor não faz commit, push ou publicação. A interface só inicia em `127.0.0.1`, `localhost` ou `[::1]`; um endereço público não abre o editor.

## Abrir

No Windows, dê dois cliques em **`Abrir-Editor.cmd`**, na raiz do projeto. Mantenha a janela aberta enquanto usa o editor. Também pode executar `npm.cmd run editor` e abrir o endereço exibido. Se já usa o Live Server na raiz, abra `/tools/editor/` com `127.0.0.1` ou `localhost`, não pelo endereço da rede local.

Use sempre o mesmo endereço para recuperar o rascunho automaticamente: o armazenamento do navegador é separado por endereço e porta. Fechar a janela encerra o servidor; os rascunhos permanecem no navegador. Limpar os dados do navegador também apaga os rascunhos, então baixe backups com frequência.

O tema padrão é **Escuro**. No topo, o seletor de tema também oferece **Claro** e **Sistema**. A opção Sistema acompanha o tema do computador, inclusive enquanto o editor está aberto. A preferência é salva só para o Estúdio, sem alterar a wiki nem os rascunhos.

## Trabalhar

1. Busque qualquer variante e consulte a habilidade em pt-BR e a referência disponível em inglês, as recomendações existentes e os ranks cadastrados. Os dados locais são a fonte; o editor não consulta o jogo nem inventa informações. Na aba **Habilidades**, edite separadamente o nome e a descrição em português e o nome, SA1 e SA2 em inglês. Preserve valores por nível, condições e durações; o português mantém os marcadores `[HAB 1]` e `[HAB 2]` e aceita `**destaque**`. Há uma prévia em cada idioma.
2. Em **Builds e tier list**, edite a recomendação principal, builds alternativas, arsenal, habilidade superior, classes e ranks. Textos editoriais são mantidos em pt-BR, como nos arquivos atuais; a opção de idioma traduz a interface, sem traduzir automaticamente as recomendações.
3. Em **Times**, escolha **Times Ofensivos**, **Batalhas da Fenda** ou **Times Defensivos**. A terceira categoria aparece para Defensivo, Coringa ou Suporte de Utilidade, inclusive classes corrigidas no editor. Cada time tem de uma a três variantes e inclui a variante da ficha. Não é permitido repetir a mesma variante no mesmo time; variantes diferentes do mesmo personagem são aceitas. As cartas mostram nome e classes, sem exigir explicações.
4. Use **Ver ficha** para consultar os integrantes durante a montagem, e as setas para ordenar as cartas. É possível cadastrar vários times por categoria. Só marque como **Revisado** depois da sua conferência editorial. A ferramenta valida referências e formato; não avalia se o time é competitivo ou se a recomendação está atualizada no jogo.
5. Alterar integrantes, classes ou habilidades devolve os times afetados a rascunho. Times de defesa que perderem a classe necessária continuam no backup, sem serem publicados; podem ser acessados e corrigidos após restaurar uma classe compatível. **Desfazer** alterna a última edição do formulário ou ação.

Ao escolher integrantes, os filtros de classe podem ser combinados com a busca. Selecione uma ou mais classes para ver variantes com qualquer uma delas, ou **Todas as classes** para limpar. As classes corrigidas no rascunho já são consideradas na seleção.

O botão **Consultar golpes do personagem**, na ficha e junto do arsenal, abre somente os golpes daquele personagem, com imagem e nome abaixo. O acesso **Galeria de golpes**, no topo, também permite escolher qualquer personagem diretamente: você não precisa abrir a ficha dele nem abandonar a variante que está editando. A galeria exibe um personagem por vez, com busca, filtro Golpe Especial/Blockbuster e **Copiar nome** para conferir o arsenal no JSON. Ela usa os nomes exatos de `src/data/movesimages.js` e as imagens WebP locais, com paginação; não depende dos arquivos StanleyDB ausentes. A galeria é somente de consulta e não altera o conteúdo exportado.

## Backup e exportação

- **Salvar backup** baixa um JSON com as mudanças, incluindo os times em rascunho e a base original dos arquivos modificados.
- **Importar backup** verifica todos os arquivos antes de substituir o rascunho. Se uma base mudou e não corresponde à própria exportação do editor, a importação é interrompida para evitar sobrescrever dados novos. O backup anterior permanece preservado.
- **Revisar e exportar** mostra os campos alterados e baixa um ZIP com os caminhos corretos. Apenas times revisados são incluídos. O ZIP não contém o editor nem os rascunhos. Exportar não apaga nem redefine seu trabalho.
- Para aplicar, extraia em uma pasta de revisão, confira os arquivos e substitua apenas os caminhos presentes no ZIP na **mesma versão do projeto** usada na edição. Rode `npm.cmd run test:coverage -- --configLoader native` e `npm.cmd run build` antes do commit. O fluxo normal de publicação permanece necessário.

Arquivos possíveis: `data/<personagem>.json`, `data/krazete/ENGLISH-Variants.json`, `data/krazete/PT-BR-Variantes.json`, `data/tier-data.json`, `data/teams.json` e `src/data/variantClassData.js`. O português publicado vem do JSON do personagem; o inglês vem de `ENGLISH-Variants.json`. Ao renomear uma habilidade em português, o editor atualiza somente o nome correspondente de habilidade em `PT-BR-Variantes.json` para manter o vínculo entre idiomas, preservando os textos de referência. A associação usa personagem + nome exato ou uma única correspondência de habilidade e fica fixa durante a edição. Um vínculo ausente ou ambíguo não é adivinhado.

O editor preserva campos desconhecidos e não permite alterar atributos, imagens ou identidades por um backup importado. Campos obrigatórios de habilidade podem ficar incompletos no rascunho, mas impedem a exportação até serem preenchidos. Um rank ausente não vira B no arquivo só por abrir a tela.

O diretório `tools/editor/` e o atalho não entram em `PUBLISHED_PATHS`, portanto não são publicados pelo build da wiki. A aba pública **Times** lê `data/teams.json` apenas quando aberta. A lista começa vazia: nenhuma recomendação editorial foi fabricada.

## Usar após mudanças no projeto

O editor lê os arquivos locais de novo a cada abertura ou recarregamento, sem cache. Por isso, novas variantes e dados corrigidos que já estejam no projeto aparecem ao reabri-lo. Você pode repetir o mesmo fluxo de edição, backup, revisão e exportação sempre que precisar atualizar informações.

Antes de aplicar arquivos exportados ou atualizar a cópia do projeto, salve um backup do seu rascunho. Quando os arquivos locais já correspondem à sua própria exportação, o editor reconhece as correções aplicadas e mantém os times ainda em rascunho, permitindo continuar o trabalho. Se houver outras mudanças conflitantes, preserva o backup antigo e pede revisão em vez de sobrescrever as informações novas. As correções só chegam ao site pelo fluxo normal de publicação; nenhuma edição é enviada automaticamente para a internet.
