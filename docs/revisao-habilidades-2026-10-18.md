# Auditoria de associação das habilidades — 18/10/2026

Foram verificadas as **307 variantes publicadas dos 18 personagens**, usando a lista `CHARACTER_FILES`, os JSON dos personagens e os dois índices locais do Krazete. O objetivo é encontrar habilidades ou partes delas copiadas para a variante errada, incluindo títulos e a associação em inglês.

## Erros confirmados e corrigidos

| Variante | Erro anterior | Correção |
| --- | --- | --- |
| Reviravolta | As duas partes eram as da Fantoche Sombrio, com Fukua e congelamento do tempo. | Restauradas as duas partes de `plottwisted`, com reflexão de dano, ressurreição e efeitos negativos. |
| Frio de Matar | As duas partes eram as de Frio Mordente, com cadáver, Barreira, Espinhos e impedimento de reviver. | Restauradas as duas partes de `deadofwinter`, com suporte de Armadura, Definhar e medidor de Blockbuster. |
| Sombruma | Título SANGUE NO OLHO, da Víbora Escarlate. A descrição já era da variante correta. | Título BATALHA MORTAL, de `nightshade`. |
| Gata Negra | Título NADA PESSOAL, da Terripeluda. A descrição já era da variante correta. | Título VISÃO RARA, de `purrfectdark`. |

As correções ficaram restritas a quatro campos em três JSON: `data/squigly.json`, `data/eliza.json` e `data/ms-fortune.json`. Foram mantidos os valores no nível máximo. Os arquivos de referência do Krazete, builds, classes, ranks e imagens não foram alterados.

Na habilidade de Frio de Matar, foi usado **DERRUBADO**: o original inglês diz **KNOCKED DOWN**, embora a referência portuguesa use NOCAUTEADO. A condição é uma queda durante a luta.

Os quatro registros já apontavam para as habilidades corretas em inglês. A auditoria não encontrou redirecionamentos de identidade no carregador inglês das 307 variantes; por isso não foi necessário editar os textos ingleses.

## Cobertura

| Personagem | Variantes |
| --- | ---: |
| Annie | 18 |
| Beowulf | 18 |
| Big Band | 17 |
| Dália Negra | 16 |
| Cerebella | 17 |
| Double | 17 |
| Eliza | 17 |
| Filia | 17 |
| Fukua | 18 |
| Marie | 16 |
| Ms. Fortune | 17 |
| Painwheel | 16 |
| Parasoul | 18 |
| Peacock | 17 |
| Robo-Fortune | 17 |
| Squigly | 18 |
| Umbrella | 16 |
| Valentine | 17 |
| **Total** | **307** |

Conferências realizadas:

- Identidade por personagem e correspondência única de nome ou título da habilidade, com os mesmos vínculos usados pelo editor; comparação com os vínculos da wiki e verificação de que cada ID pertence a uma única variante publicada.
- Busca de descrições inteiras e partes repetidas entre variantes, desconsiderando marcadores HAB/SA, ênfase, pontuação, caixa e progressões de nível. Comparação aproximada de sequências de palavras para encontrar diferenças pequenas, como “revivido” e “revividos”.
- Triagem de proximidade com outras habilidades da referência e revisão dos candidatos; sem tratar semelhança textual como prova de cópia.
- Conferência dos títulos repetidos. **FICA FRIO**, em Homem de Gelo e Ghoul Glacial, e **PONTO DE FUSÃO**, em Sorvescola e Gêmeo Infernal, também se repetem na referência portuguesa e foram preservados.
- Exercício do carregador real de idioma com todo o catálogo, comparando nome inglês, título e ambas as partes com o ID esperado.
- Renderização dos cards dos quatro registros corrigidos em happy-dom, nos dois idiomas, verificando nome, título e descrição.

Depois das correções, a busca de partes longas repetidas não encontrou outros casos no catálogo. Isso não equivale a certificar manualmente cada condição, número ou rework de todas as habilidades.

## Divergências separadas de cópia indevida

A comparação com a referência também destacou textos diferentes para Coração da Escuridão, Vagalume, Corta-diversão, Operações Sombrias, Fica Frio (Peacock), Tritura-Números, Visitante do Espaço e Très Chic. Os textos publicados correspondem a kits distintos dos atuais da referência; não foi confirmada cópia de outra variante nesses casos. Atualizar seus reworks exige uma revisão própria dos dois idiomas, além da auditoria de associação feita aqui.

Também foram observados o título vazio em Cópia Aproximada e o caractere `?` em `MEM?RIA REPRIMIDA`, de Chamego. Não são duplicações e ficaram fora destas quatro correções. Diferenças editoriais de grafia e tradução foram preservadas.

## Fontes e reprodução

Além dos arquivos locais, foram consultados os dados públicos atuais do [Krazete](https://krazete.github.io/sgm/): [identidades e progressões](https://raw.githubusercontent.com/Krazete/sgm/main/data/variants.json), [textos em inglês](https://raw.githubusercontent.com/Krazete/sgm/main/data/en.json) e [textos em português](https://raw.githubusercontent.com/Krazete/sgm/main/data/pt-br.json). As identidades e mecânicas dos quatro casos corrigidos foram confirmadas nessa consulta, sem substituir a referência local.

Regressão reproduzível:

```powershell
npm.cmd run test:run -- tests/integration/services/signatureAbilities.test.js
```

Antes da correção, a nova suíte acusou exatamente as quatro partes copiadas e os dois pares de títulos indevidos; os testes de identidade e inglês passaram. Depois, os seis testes passaram, incluindo os cards em DOM.

Validação geral: **642 testes passaram em 58 arquivos**, cobertura de linhas **46,58%**, acima do mínimo de 35%. A montagem gerou 56 páginas; auditoria de peso e duplicatas aprovada, com 74.561.755 bytes publicados dentro do teto de 80.000.000. `git diff --check` sem erros de whitespace.

A conferência visual em navegador ficou indisponível: o inventário de automação retornou nenhum navegador conectado. A validação de DOM não substitui essa conferência. Não houve commit, push ou publicação.
