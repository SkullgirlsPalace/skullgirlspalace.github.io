# Referência do Krazete separada da edição de habilidades

O editor deve permitir conferir as progressões completas do Krazete em painéis sem edição, enquanto o formulário e a wiki representam a variante no nível máximo. Gravar a revisão inglesa diretamente em `ENGLISH-Variants.json`, como na ADR 0004, apagaria os níveis usados para conferir a habilidade na próxima abertura do editor.

## Decisão

Novas revisões dos dois idiomas ficam no JSON do personagem. Português mantém `signature_ability.name` e `description`; inglês usa o objeto opcional `signature_ability.english`, com `name` e `description`. `signature_ability.krazete_id` preserva a identidade já confirmada pelo editor, incluindo variantes cujo nome português difere da referência. Esse identificador não é adivinhado e sua alteração é validada contra o vínculo da base original.

Os campos editáveis e as revisões exportadas usam o último valor de cada progressão. O editor mostra os textos originais de `PT-BR-Variantes.json` e `ENGLISH-Variants.json` separadamente, com as progressões intactas. Esses painéis leem a base de referência, sem aplicar as correções editoriais. Novas edições não gravam nos arquivos do Krazete.

## Alternativas

- Continuar editando o Krazete: perderia a referência original e seus níveis.
- Copiar todo o Krazete para um segundo catálogo: duplicaria dados publicados e exigiria sincronização adicional.
- Criar outro JSON de revisões: adicionaria uma busca e um catálogo de identidades que já existem nos JSONs dos personagens.

## Consequências

- O carregador de idiomas consulta as revisões nos personagens já carregados, sem acrescentar requisições ao boot. Sem revisão editorial inglesa, mantém o fallback do Krazete.
- O identificador confirmado também preserva os nomes ingleses ao renomear uma habilidade em português, sem alterar o índice de referência PT-BR.
- Separadores internos `[SA1]` e `[SA2]` preservam os limites das partes e seus parágrafos no campo `description`; a interface remove esses marcadores. Dados antigos continuam sendo lidos.
- Abrir um registro não altera seus arquivos. A normalização é persistida quando a habilidade é editada. Backups anteriores que já corrigiam os arquivos de referência continuam importáveis e revisáveis, preservando trabalho existente.
- Esta decisão altera a precedência das habilidades inglesas e o destino das novas exportações de habilidades da ADR 0004; os demais limites do editor local permanecem.
