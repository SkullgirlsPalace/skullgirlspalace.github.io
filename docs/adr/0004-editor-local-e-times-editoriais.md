# Editor local e times editoriais

A manutenção de builds, classes e ranks exigia editar arquivos de código e JSON. O Palace Estúdio é um documento HTML independente em `tools/editor/`, servido localmente por um servidor Node somente de leitura. Rascunhos ficam no navegador, com backup importável e exportação revisável dos arquivos alterados. Não há conta de administrador, escrita remota, publicação automática ou nova dependência.

## Opções consideradas

- Um painel público com autenticação e banco de dados: exigiria infraestrutura e migração da fonte de dados de um site estático.
- Gravar diretamente no checkout por um servidor local: facilitaria a aplicação, mas uma edição de formulário passaria a alterar a base real antes da revisão.
- Exportar somente um formato próprio: preservaria rascunhos, mas ainda exigiria escrever um importador para atualizar a wiki.

## Consequências

O armazenamento das novas revisões de habilidades inglesas descrito abaixo foi substituído pela [ADR 0005](0005-referencia-krazete-separada-da-edicao.md), que preserva a fonte para consulta com progressões completas.

- A exportação produz os arquivos consumidos pela wiki. O backup próprio inclui a base original de cada arquivo modificado. A reaplicação reconhece os arquivos já idênticos à própria exportação, preservando times em rascunho. Outras bases divergentes bloqueiam a importação inteira, sem tentar misturar decisões editoriais automaticamente.
- As classes editoriais passam do corpo de `variantClasses.js` para `variantClassData.js`, módulo de dados puro reexportado pela API anterior. Isso permite exportar correções sem reescrever as funções de localização ou introduzir uma busca de dados no boot.
- Times ficam em `data/teams.json`, separados de `extras.json` e dos JSON de personagens. A identidade é sempre personagem + nome exato de variante. Um time contém a variante da ficha e até três integrantes, em ordem. Classes elegíveis controlam a categoria defensiva. O editor admite vários times por categoria.
- Só times marcados como revisados, com referências válidas, são renderizados; o arquivo é buscado quando o visitante abre a aba Times, à direita de Build. Um catálogo vazio mostra um estado vazio, sem recomendações inferidas.
- Habilidades podem ser corrigidas separadamente em pt-BR (JSON do personagem) e inglês (`ENGLISH-Variants.json`, campos `ability`, `SA1` e `SA2`). A identidade entre idiomas é resolvida na base original por personagem e correspondência única de nome ou habilidade. Alterar o nome em português também corrige o campo de habilidade correspondente no índice PT-BR para preservar o fallback do carregador existente, sem substituir traduções de referência. As correções continuam editoriais; uma validação de formato não confirma a precisão em relação ao jogo. Novos textos públicos são localizados em pt-BR e inglês.
- O editor não é copiado para `_site/`. Sua interface tem identidade própria e usa somente imagens existentes, sem fontes, bibliotecas ou serviços externos novos.
- Além da exclusão da publicação, a interface só inicia em endereços de loopback. O servidor valida o cabeçalho Host e continua ligado exclusivamente a `127.0.0.1`; não há endpoint de edição hospedado.
