# Predefinições pessoais e gerações do editor

A montagem de times dependia de um seletor central pequeno e de rolagem da página inteira. Listas pessoais reutilizáveis também precisam sobreviver entre sessões sem virar recomendações públicas automaticamente. O novo formato de backup é identificado como **v2**.

## Decisão

- O seletor ocupa a área da tela, com posições do time, busca e paginação fora da rolagem dos resultados. Os controles ficam em uma coluna à direita, com painéis Filtros/Predefinições e rolagem própria. Limpar classes e efeitos permanece acessível em ambos. As posições continuam da direita para a esquerda, com o primeiro integrante na frente. A seleção fica aberta entre integrantes.
- Predefinições ficam somente no armazenamento local e no backup próprio. Há times ordenados com até três variantes e listas de suportes/defesas. Essas listas não atribuem classes e não entram nos arquivos públicos. Uma predefinição aplicada cria ou modifica um time em rascunho; a revisão editorial continua obrigatória.
- O uso principal é salvar uma variante ou dupla como **Time padrão**, reutilizável diretamente na aba Times de qualquer ficha. A variante da ficha entra na frente, seguida dos acompanhantes salvos, sem duplicações. Salvar acompanhantes de um time exclui a variante da ficha original. Esses atalhos reutilizam as listas v2 com um ou dois integrantes, sem novo campo ou geração de backup. Um time completo de três integrantes continua usando a regra anterior de preservação das posições e inclusão da variante da ficha.
- Cada geração usa um inteiro curto, `v1`, `v2` etc., centralizado em `tools/editor/version.js`. Não se usa uma versão nova para cada correção visual. Uma mudança incompatível de contrato exige outra geração. Backups de outra geração são recusados antes de aplicar alterações; não há migração automática.
- O armazenamento local inclui a geração na chave. Um rascunho v1 é detectado quando ainda não há v2, continua preservado e pode ser baixado antes de iniciar o novo rascunho. A chave antiga não é apagada. Um backup v1 deve ser aberto em uma cópia do editor v1 e da sua base correspondente.
- Nomes curtos identificam os arquivos: `palace-v2-backup.json` e `palace-v2.zip`. O ZIP contém `palace-editor.json`, com versão e caminhos exportados, e `LEIA-ME.txt`. Ele serve para aplicar os arquivos ao projeto; não é importável como backup.
- A geração do editor e a revisão dos dados são verificações distintas. A validação atômica da base e o reconhecimento da própria exportação, definidos na ADR 0004, continuam valendo dentro da mesma geração.

## Alternativas

- Publicar listas pessoais em `data/teams.json`: confundiria favoritos com recomendações revisadas.
- Guardar só no navegador: perderia as predefinições ao trocar de computador ou limpar o armazenamento.
- Migrar qualquer backup automaticamente: exigiria interpretar decisões e formatos antigos sem revisão, contrariando a incompatibilidade explícita solicitada.
- Usar versões com vários componentes ou datas nos nomes: dificultaria reconhecer a geração e alongaria os arquivos.

## Consequências

A aba Tier list fica separada de Builds e classes e usa as cores existentes da wiki. Nenhum dado ou carregamento do site público muda. O editor continua local, sem novas dependências, escrita direta no checkout ou publicação automática. A compatibilidade genérica com backups anteriores mencionada na ADR 0005 fica limitada à mesma geração; backups v1 não são aceitos no v2.
