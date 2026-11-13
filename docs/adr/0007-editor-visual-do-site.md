# Editor visual local para aparência e correções de texto

O Palace Estúdio edita os dados editoriais de variantes, builds, times e ranks. Ajustes de aparência, textos gerais e inserção de mídia ainda exigiam mudanças em CSS e templates. O usuário pediu uma segunda interface em que pudesse selecionar a parte da página que deseja corrigir e conferir o resultado antes de enviar as alterações para revisão.

## Decisão

A **Oficina do site** fica em `tools/site-editor/`, separada do Estúdio de variantes. Um servidor Node somente de leitura, ligado a `127.0.0.1`, apresenta a interface e o site real em um iframe da mesma origem. Os modos de selecionar e navegar permitem tanto escolher um elemento quanto abrir páginas, abas e janelas do site. O servidor não recebe uploads nem grava arquivos: mídia e rascunhos permanecem no navegador, em armazenamento próprio do editor visual.

As mudanças são declarativas, em `data/site-customizations.json`, versão 1. O documento permite variáveis visuais existentes, escala da interface, fontes já disponíveis e propriedades de estilo permitidas. Correções pontuais registram rota, idioma, seletor único e a identidade original do elemento. Textos são alterações de nós de texto diretos, preservando links, ícones e handlers dos templates. Mídia pode ser inserida antes/depois de um elemento ou substituir uma imagem selecionada. Não há campo de HTML, JavaScript ou CSS arbitrário.

O suporte público é um módulo independente, carregado depois do primeiro carregamento da página. Ele busca a configuração sem bloquear o `init()` nem acrescentar uma busca à sequência inicial de dados do `main.js`. O runtime acompanha novas renderizações da SPA, mudanças de idioma e de rota. Alvos ausentes, ambíguos ou com conteúdo original divergente são ignorados; não existe correspondência aproximada. Edições em português e inglês são independentes.

## Alternativas consideradas

- Reescrever automaticamente os arquivos CSS, traduções e templates a partir do DOM: o navegador não conserva a origem de cada trecho e muitos elementos são gerados por funções ou dados. Inferir a origem poderia modificar conteúdo semelhante em outro contexto.
- Salvar o HTML completo de cada página: perderia eventos, rotas, idiomas e a atualização dos dados da SPA, além de duplicar conteúdo.
- Adicionar um construtor de páginas público com banco e autenticação: mudaria a hospedagem estática e o fluxo de manutenção para permitir correções locais.
- Aceitar CSS e HTML sem restrições: facilitaria algumas intervenções, mas faria o editor exigir conhecimento técnico e permitiria mudanças impossíveis de validar com um esquema pequeno.

## Consequências

- O editor oferece ajustes globais e locais sem alterar os dados editoriais do Estúdio. Uma alteração de texto é uma correção visual da SPA; não reescreve `translations.js`, os JSONs originais, metadados nem o HTML estático gerado para buscadores. Quando a correção precisa alcançar essas fontes, ela continua sendo aplicada diretamente no projeto durante a revisão.
- A identidade original é uma proteção contra aplicar uma correção à variante, linha ou botão errado após uma mudança estrutural. Um alvo divergente deve ser selecionado novamente e revisado, sem reaproveitamento automático.
- Rascunhos usam IndexedDB separado do Estúdio, com backup `palace-visual-v1-backup.json`. A importação valida todo o documento e as mídias antes de substituir o rascunho. Bases divergentes são recusadas, exceto quando a configuração atual já corresponde à própria exportação do backup.
- `palace-visual-v1.zip` contém a configuração alterada, apenas novas mídias referenciadas, um manifesto de caminhos e hashes e instruções. Exportar não grava no checkout, faz commit ou publica. O manifesto e o LEIA-ME são materiais de revisão e não devem ser copiados para a publicação.
- Imagens estáticas enviadas são convertidas para WebP e reduzidas a no máximo 1280 × 1280. GIF e WebP animado mantêm a animação, dentro dos limites de dimensão e 500 KB. Vídeos MP4/WebM ficam em `media/site-editor/`, com limite de 8 MB por arquivo e 12 MB para o conjunto de arquivos do rascunho. A auditoria total do site continua obrigatória; esses limites não aumentam o orçamento publicado.
- Fontes são as existentes ou as do sistema. Não há dependência, biblioteca de interface ou fonte nova. `tools/site-editor/`, o atalho e seus backups continuam fora de `PUBLISHED_PATHS`; apenas o suporte pequeno, a configuração e a mídia aprovada podem chegar ao site.
- O servidor aplica CSP própria à interface e permite os handlers e estilos inline existentes somente na prévia da wiki. Valida Host, métodos de leitura, caminhos antes da normalização e o destino real de arquivos para bloquear diretórios privados, travessia e links para fora da cópia local.

A aplicação de mídia também limita imagens a duas vezes as dimensões escolhidas: imagens estáticas são reduzidas novamente quando necessário; animações que excederem esse tamanho pedem revisão, preservando seus quadros. A exportação verifica a mesma regra nos backups importados.

Este fluxo amplia o alcance das correções manuais. Mudanças de estrutura, comportamento e novas funcionalidades continuam sendo implementadas no código e verificadas pelo fluxo normal do projeto.
