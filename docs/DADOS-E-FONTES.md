# Dados, fontes e atualizações

Este documento registra como manter os dados do Skullgirls Palace sem confundir a fonte original do jogo com as traduções e revisões editoriais do projeto.

## Fonte de referência

O Krazete é a referência principal para os dados originais do jogo. Os arquivos guardados em `data/krazete/` incluem conjuntos em inglês e em português. O site também consulta os arquivos `ENGLISH-Variants.json` e `PT-BR-Variantes.json` para relacionar nomes de variantes entre idiomas.

O conteúdo em português pode conter traduções comunitárias ou automáticas que não representam a forma desejada pelo Palácio Branco. Traduções e correções manuais feitas para o site são decisões editoriais válidas e devem ser preservadas durante atualizações. Uma diferença em relação ao inglês ou ao Krazete deve ser revisada, não substituída automaticamente.

## Onde o site lê os dados

| Conteúdo | Arquivos usados pelo site | Observação |
| --- | --- | --- |
| Variantes e builds | `data/*.json` | A lista de arquivos de personagem está definida em `src/config/constants.js`. |
| Nomes de variantes em inglês | `data/krazete/ENGLISH-Variants.json` e `data/krazete/PT-BR-Variantes.json` | O mapeamento é montado em `src/i18n/dataTranslations.js`. |
| Avaliações da tier list | `data/tier-data.json` | Conteúdo editorial do projeto, separado dos dados básicos das variantes. |
| Ganhos e custos da calculadora | `data/stats/*.json` | Os valores vêm de arquivos JSON, enquanto as opções e regras também estão definidas em `src/components/Calculator.js`. |
| Catalisadores e Fenda | `data/catalisadores*.json` e `data/fenda*.json` | Os dados servidos pelo site ficam fora da pasta `data/krazete/`. |

## Fluxo seguro para atualizar

1. Atualize ou confira os arquivos de origem do Krazete em `data/krazete/`.
2. Compare os dados originais com os arquivos que o site realmente consome, como `data/annie.json` ou `data/stats/*.json`.
3. Aplique alterações de conteúdo sem apagar correções manuais de português. Quando houver dúvida, mantenha a forma atual e registre o item para revisão.
4. Confira separadamente nomes, descrições, valores numéricos, imagens e traduções. Uma mudança na fonte não implica que todos esses campos devam ser substituídos.
5. Atualize os dados publicados pelo site e registre a data e a fonte da revisão quando o formato da seção permitir.

Os scripts `tools/process-moves.js` e `tools/process-catalysts.js` transformam dados chamados `stanleyDB` em arquivos consumidos pela aplicação. Eles são ferramentas específicas; não constituem, por si só, uma sincronização geral de todos os arquivos do Krazete. Confira os caminhos de entrada e saída do script antes de usá-lo.

## Limite atual da calculadora

Os valores da calculadora estão em JSON, mas categorias de ganhos, recursos e controles também são definidos no código. Portanto, corrigir um valor existente normalmente envolve atualizar dados; adicionar uma moeda ou um novo tipo de fonte pode exigir mudanças na interface e nos cálculos. Uma evolução futura deve permitir declarar recursos e fontes nos dados e fazer a interface renderizá-los a partir dessa configuração.

## Prioridades sugeridas

1. Manter explícita a distinção entre dados originais do jogo e tradução revisada pelo Palácio Branco.
2. Registrar fonte e data de atualização dos valores sujeitos a mudanças frequentes.
3. Tornar a calculadora orientada a dados para que recursos existentes possam mudar sem editar a lógica.
4. Melhorar a consulta da tier list e dos guias em telas pequenas, preservando os fluxos atuais enquanto são revistos.
