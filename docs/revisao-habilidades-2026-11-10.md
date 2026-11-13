# Revisão das habilidades e variantes — 10/11/2026

Foram conferidas as **309 variantes publicadas de 18 personagens** pelos vínculos de personagem e ID do Krazete. Nenhum vínculo ficou sem resolução ou apontou para outra variante. A triagem textual comparou título, SA1 e SA2 em português no nível máximo, depois separou mudanças de mecânica, durações e condições de diferenças de redação. A semelhança de palavras serviu apenas para localizar candidatos; não foi usada para reescrever textos automaticamente.

## Correções aplicadas

- **Reworks e condições:** Criança Estelar, Vagalume, Corta-diversão, Très Chic, Hallow – Demônio, Forças Armadas e Intocável. As correções foram feitas somente nos casos com mudança de efeito ou gatilho confirmada.
- **Valores e limites:** Modelo Submarina, Número Um, Banda dos Sonhos, Cacho Mágico, Vira a Balança, Escalador de Paredes e Angelical.
- **Condição de saída e texto:** Briga Fatal recebeu a condição até Ms. Fortune sair ou ser derrotada; Cópia Aproximada recebeu o título que faltava; Chamego teve o caractere corrompido no título corrigido; Eco de Estrela e Octoplasma tiveram erros de português corrigidos.

As variantes Coração da Escuridão, Operações Sombrias, Fica Frio (Peacock), Tritura-Números e Visitante do Espaço, destacadas na revisão de outubro, já coincidiam com a referência local atual. Também foram preservados os valores legíveis de Chamego, Homem de Gelo e Estelar onde os dados da fonte contêm `0`, `NaN` ou `{0:0.0}`. A tradução editorial em português foi preservada nos demais casos de redação diferente, como Artista Ilusionista.

## Novas variantes

- Valentine, **Doente de Amor** (`lovesick`): Ouro, Trevas; ATQ 9,581; VD 66,048; pontuação 24,328.
- Umbrella, **Gremlindo** (`garishgremlin`): Diamante, Ar; ATQ 13,312; VD 56,045; pontuação 26,578.

Ambas têm SA1 e SA2 no nível máximo, vínculo explícito com o Krazete, imagem WebP local de 320 px e destaque “Novo”. Os destaques anteriores foram removidos apenas da lista de novidades; as variantes continuam no catálogo. As pontuações e atributos seguem os valores fornecidos pelo usuário. Não foram inventadas builds nem ranks de tier list para as novas variantes. O snapshot de tier list de outubro agora é corretamente considerado incompleto até que uma captura atual inclua as duas.

## Conferência de fonte e publicação

A referência local tem 313 IDs; o catálogo público atual do [Krazete](https://github.com/Krazete/sgm) tem 312 variantes. Todas as 312 foram comparadas com os textos locais de [inglês](https://raw.githubusercontent.com/Krazete/sgm/main/data/en.json), [português](https://raw.githubusercontent.com/Krazete/sgm/main/data/pt-br.json) e [identidades/progressões](https://raw.githubusercontent.com/Krazete/sgm/main/data/variants.json). Não houve diferença grande de texto. Cinco diferenças numéricas na checagem automática vieram de progressões de dois níveis ou placeholders inválidos e foram revisadas separadamente. As [notas oficiais da versão 8.12](https://hub.skullgirlsmobile.com/updates/game-update-812-patch-notes-cutest-obsession-grim-outlook) confirmam as duas novas variantes e suas mecânicas. O retrato da Gremlindo foi obtido dessas notas e convertido para WebP local.

`node tools/audit-signature-updates.js` reproduz a triagem completa de vínculos e semelhança. `npm.cmd run test:coverage -- --configLoader native --maxWorkers=1 --testTimeout=20000` passou: 685 testes em 63 arquivos, 49,39% de cobertura de linhas. `npm.cmd run build` gerou 56 páginas e passou na auditoria com 74.929.216 bytes. O build exclui agora `img/Wiki`, uma pasta sem referências no site que continha cerca de 530 MB de GIFs e imagens de origem; os arquivos originais permanecem no repositório. O HTML estático e os arquivos publicados das duas variantes foram verificados. Não houve publicação nem verificação visual em navegador.
