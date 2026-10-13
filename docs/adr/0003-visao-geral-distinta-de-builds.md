# Visão geral distinta de builds

`/characters/<slug>/` tinha conteúdo estático de variantes e habilidades, mas o JavaScript abria a mesma aba de `/characters/<slug>/builds/`. Isso deixava a visão do visitante diferente do HTML inicial e mantinha dois endereços com canonicals próprios para a mesma tela interativa.

A URL principal agora abre uma visão geral de variantes, atributos e habilidades características. `/builds/` continua com recomendações de build, arsenal e habilidade superior; `/tier-list/` continua com ranks. As URLs existentes e os 56 endereços do sitemap são preservados, cada um com conteúdo próprio e canonical para si.

## Opções consideradas

- Consolidar a URL principal em `/builds/`, retirando 18 URLs do sitemap: eliminaria as páginas de visão geral que já tinham conteúdo estático próprio e links publicados.
- Manter o HTML inicial distinto e a mesma tela depois do JS: preservaria a divergência que causou esta decisão.

## Consequências

- A visão geral estática e a interativa usam o mesmo renderizador pequeno em `src/utils/characterOverview.js`, com os mesmos campos editoriais. O HTML inicial segue em pt-BR, enquanto a SPA também oferece inglês.
- A página interativa é importada sob demanda pelo router; não acrescenta imagens, fontes ou bibliotecas. Filtros e ordenação continuam nas telas de builds existentes.
- Esta correção melhora a correspondência entre URL e conteúdo. Ela não garante que o Bing rastreie ou indexe uma página.
