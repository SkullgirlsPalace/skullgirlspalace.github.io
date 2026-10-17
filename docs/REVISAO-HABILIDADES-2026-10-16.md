# Habilidades no editor e na wiki — 16/10/2026

Foram analisadas as descrições de habilidade característica das **307 variantes** nos JSONs de personagens listados em `CHARACTER_FILES`, os mesmos usados pelo editor e pelo site em pt-BR. Antes da aplicação, **49 variantes** continham progressões numéricas separadas por barras. Não foram usados arquivos de `data/krazete/` nesta análise. Os exemplos abaixo interpretam os dados locais; não são uma conferência de balanceamento com o jogo.

## Aplicação aprovada

Após aprovação editorial, **107 progressões de 49 variantes em 14 JSONs de personagens** foram substituídas pelo valor final. Foram preservados os demais campos, condições, números fixos, unidades e destaques. As descrições publicadas em português agora já armazenam os valores finais. As proteções de exibição e do editor continuam tratando novas descrições com progressões; a validação dos dados também detecta sua reintrodução nos JSONs editoriais.

Os arquivos de referência do Krazete permanecem sem alterações, com todos os níveis acessíveis nos painéis de consulta do editor. A tabela de amostras abaixo conserva os trechos anteriores para registrar o que foi aprovado e aplicado.

## Regra de exibição

Cada sequência representa níveis sucessivos. A exibição usa **o último valor**, tanto quando aumenta quanto quando diminui. Não se escolhe o maior número e não se inverte a sequência. Cada progressão da mesma habilidade é resolvida separadamente; números fixos, limites, condições e unidades continuam no texto.

Os campos editáveis, a consulta editorial, as prévias e as páginas públicas mostram o nível final. Ao editar uma habilidade, o rascunho e a exportação dessa revisão também usam os valores finais. Apenas abrir ou exibir uma variante não reescreve seu JSON. As duas partes usam campos separados, como no inglês; os marcadores de origem não aparecem na interface.

Os textos completos do Krazete, com todas as barras, ficam em painéis **somente para consulta** no editor, tanto em português quanto em inglês. Esses painéis leem a base de referência e permanecem iguais durante a edição. As revisões inglesas passam para `signature_ability.english` no JSON do personagem; os arquivos do Krazete permanecem como referência e fallback. Esta separação não usa o Krazete para produzir a amostra da análise abaixo.

## Amostra dos JSONs publicados

| Personagem / variante | Trecho antes da aplicação | Trecho aplicado e exibido no nível final |
| --- | --- | --- |
| Annie — Modelo Submarina | Ganha BLOQUEIO AUTOMÁTICO PERMANENTE por cada **25/20/15%** de vida perdida. | Ganha BLOQUEIO AUTOMÁTICO PERMANENTE por cada **15%** de vida perdida. |
| Big Band — Virtuoso Vintage | Ganhe 1 camada de PRECISÃO a cada **15/10/5** golpes de combo. | Ganhe 1 camada de PRECISÃO a cada **5** golpes de combo. |
| Double — Criatura de Hábito | Ganha 1 acúmulo de MIASMA a cada **5/4/3** segundos. | Ganha 1 acúmulo de MIASMA a cada **3** segundos. |
| Annie — Desafiante da Morte | Aplica ATORDOAMENTO ao oponente por **1.5/2/2.5** segundos e depois recupera **5/10/15%** da VIDA MÁXIMA por EFEITO POSITIVO consumido. | Aplica ATORDOAMENTO ao oponente por **2.5** segundos e depois recupera **15%** da VIDA MÁXIMA por EFEITO POSITIVO consumido. |
| Annie — Princesa da Lua | A cada REVIVER consecutivo, os colegas REVIVEM com **80/60/40%** menos VIDA. | A cada REVIVER consecutivo, os colegas REVIVEM com **40%** menos VIDA. |
| Fukua — Verdadeiro Eu | BLOCKBUSTERS gastam **10/7/5** acúmulos de CHUTE SOMBRIO para invocar a MÃO DE GRENDEL e ACERTAR o oponente. | BLOCKBUSTERS gastam **5** acúmulos de CHUTE SOMBRIO para invocar a MÃO DE GRENDEL e ACERTAR o oponente. |
| Fukua — Terror Noturno | Inflige IMOBILIZAR e FADIGA por **10 s** a cada **4/3/2 s** enquanto estiver próximo ao oponente. | Inflige IMOBILIZAR e FADIGA por **10 s** a cada **2 s** enquanto estiver próximo ao oponente. |
| Umbrella — Pirata de Poça | GOLPES DE POÇA removem **1/2/3** EFEITO(S) POSITIVO(S) do oponente e aplicam IMOBILIZAR por **10 segundos**. | GOLPES DE POÇA removem **3** EFEITO(S) POSITIVO(S) do oponente e aplicam IMOBILIZAR por **10 segundos**. |

Arquivos: `data/annie.json`, `data/big-band.json`, `data/double.json`, `data/fukua.json` e `data/umbrella.json`. A grafia decimal dos JSONs é preservada na exibição.

Por exemplo, Vínculo de Alma contém quatro progressões independentes. No nível final, o texto concede **50%** de PODER ESTELAR e **3** acúmulos de BARREIRA, mantém a esquiva por **3 segundos** e o sacrifício de **35%** da VIDA MÁXIMA, concede OLHO-MORTO por **15 segundos** e faz todos os inimigos perderem **3%** de VIDA por segundo. As condições de ativação permanecem as mesmas.

## Terminologia corrigida

| Variante | Correção no JSON português |
| --- | --- |
| Vínculo de Alma — Annie | `DEADEYE` → `OLHO-MORTO`; `HEX` → `FEITIÇO` |
| Superjazz — Big Band | `Ao fazer TAG-IN` → `Ao ENTRAR NA ASSISTÊNCIA` |
| Voo da Garça — Parasoul | `TAG-INs` → `ASSISTÊNCIAS`, no contexto de desativação |
| Lazulita — Eliza; Turno Mortal — Valentine | Expansão de `REGEN. FORTE` para `REGENERAÇÃO FORTE` |

`REGEN. FORTE` é uma **abreviação portuguesa válida de Regeneração Forte**, não um termo inglês nem outro efeito. A equivalência também reconhece `REGEN FORTE`, `REGEN.FORTE` e variações de caixa e espaçamento. O dicionário de efeitos aceita essas formas como o mesmo efeito, inclusive para ícones e filtros. A regra foi registrada em `CONTEXT.md` para futuras variantes e revisões. Outras abreviações conhecidas, como `BLOQ. DE CURA`, `QUEBRA DE ARM.`, `EF. POS.` e `EF. NEG.`, continuam válidas e não são marcadas como erro de idioma.

O dicionário compartilhado usa termos confirmados do glossário do projeto, incluindo `HEX`, `DEADEYE`, `DASH`, efeitos positivos e negativos. Ele atua na exibição atual e futura, e no rascunho quando uma descrição portuguesa é editada. Não traduz nomes de variantes nem altera habilidades em inglês. `QUIETUS`, `MIASMA`, `BLOCKBUSTER` e nomes próprios continuam como estão; o próprio glossário português já adota esses termos. Termos desconhecidos e formulações ambíguas de assistência ficam para revisão manual. Não há atualização automática a partir de fontes externas.

## Ordem do time

O primeiro integrante do JSON é a **1ª variante, na frente**; o segundo fica **no meio** e o terceiro **por último**. Nas fileiras de cartas do editor e da wiki, a leitura é **da direita para a esquerda**, com cada posição identificada. No editor em celular, a lista vertical segue da 1ª para a 3ª. Mover uma carta muda sua posição na ordem de entrada, sem inverter a lista salva só por exibi-la.
