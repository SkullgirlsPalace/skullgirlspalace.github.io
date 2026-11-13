# Oficina do site · Visual v1

Segunda interface local do Palace, voltada à aparência, textos gerais e mídia. O [Estúdio de variantes](../editor/README.md) continua responsável por habilidades, builds, classes, times e ranks. Os rascunhos e backups dos dois editores são separados.

## Abrir

No Windows, dê dois cliques em **`Abrir-Editor-Site.cmd`**, na raiz do projeto. Também pode executar:

```powershell
npm.cmd run editor:site
```

Abra `http://127.0.0.1:4175/tools/site-editor/` e mantenha a janela do servidor aberta. Para escolher outra porta, defina `PALACE_SITE_EDITOR_PORT` antes de iniciar. O servidor só atende no computador local e aceita leitura; o editor não possui conta, endpoint de escrita nem publicação automática.

Use o mesmo navegador, endereço e porta para recuperar os rascunhos. O armazenamento é separado por origem. Os arquivos de mídia e as alterações ficam em IndexedDB, no banco próprio `PALACE_SITE_EDITOR_V1`; limpar os dados do navegador também os apaga. Esse banco não substitui os rascunhos do Estúdio de variantes. Baixe backups com frequência.

## Editar a página real

1. Escolha a página e o idioma da prévia. Você pode conferir a largura de computador ou de celular.
2. Use o modo de **selecionar** e clique na parte que deseja alterar. O painel apresenta o elemento e os controles disponíveis. Para ajustar uma área maior, selecione seu elemento pai.
3. Mude tamanho, cor do texto, fundo, fonte, espaçamentos e outras propriedades disponíveis. Os controles globais ajustam cores do site, escala da interface e fontes gerais. Fontes do sistema e fontes já existentes no Palace não exigem downloads novos.
4. Os campos de texto correspondem aos trechos diretamente pertencentes ao elemento. Textos dentro de um link, botão, destaque ou outro filho são editados selecionando esse filho; isso preserva seus eventos, links e ícones. Português e inglês são corrigidos separadamente, sem tradução automática.
5. Use o modo de **navegar** para abrir outra página, usar filtros, trocar abas ou abrir janelas. Volte a selecionar para continuar. Confira também os estados abertos e os diferentes tamanhos de tela que serão afetados.
6. A prévia permite comparar o rascunho com a aparência original. Desfazer e refazer ajudam a revisar ajustes recentes. A lista de alterações permite voltar a uma correção ou removê-la.

O botão **Selecionar** na lateral leva de volta à escolha de elementos. Depois de selecionar algo, um atalho com o texto do alvo permanece acima da prévia e abre seus controles. A aba **Alterações** mostra a quantidade de edições. Os controles mais usados de texto e tamanho ficam à vista; espaçamentos e ajustes menos frequentes ficam em **Espaçamento e ajustes avançados**. O botão de aplicar permanece acessível ao percorrer um formulário longo.

As correções locais ficam associadas à página e ao idioma escolhidos. Se a estrutura ou o conteúdo original do alvo mudou, o runtime ignora a correção e o editor informa o conflito em vez de aplicá-la a outro elemento. Selecione o alvo novamente para refazer a correção na nova base.

## Imagens, GIFs e vídeos

Selecione onde deseja inserir a mídia e use os controles de mídia. É possível inserir antes ou depois da seleção e substituir uma imagem selecionada. Preencha a descrição alternativa e confira as dimensões na prévia.

- Imagens estáticas enviadas são convertidas para **WebP**, reduzidas a no máximo **1280 × 1280** e limitadas a **500 KB**.
- Ao aplicar uma imagem estática menor, a oficina também reduz o arquivo a no máximo duas vezes o tamanho escolhido. Animações grandes demais para esse tamanho pedem ajuste para preservar seus quadros.
- **GIF** e **WebP animado** conservam a animação, com o mesmo limite de dimensão e 500 KB. Reduza arquivos maiores antes de enviá-los.
- Vídeos aceitos: **MP4 e WebM**, até **8 MB** cada. Eles têm controles e não reproduzem automaticamente.
- Os arquivos de mídia do rascunho podem somar até **12 MB**. Arquivos que deixaram de ser usados não entram no ZIP.
- Uma URL HTTPS continua dependendo do serviço externo e não vira um arquivo local no ZIP. URLs temporárias do Discord não são aceitas. Para preservar um recurso, envie o arquivo.

Não há download de fontes novas, incorporação de scripts ou editor de HTML arbitrário. Adições de comportamento e estrutura continuam sendo feitas no código.

## Backup, revisão e aplicação

**Backup JSON:** `palace-visual-v1-backup.json` contém a base, o rascunho e os arquivos de mídia. Ele permite continuar em outra sessão. A importação valida tudo antes de substituir o rascunho atual; uma base divergente interrompe a importação. Se os arquivos locais já correspondem à sua própria exportação, o backup continua compatível. O backup do Estúdio de variantes e o ZIP não são importáveis aqui.

Ao abrir com uma base nova incompatível, o editor arquiva o rascunho anterior no IndexedDB e inicia outro editável. O aviso permite baixar a cópia preservada. Mudanças feitas na base atual são salvas normalmente; a importação antiga continua exigindo revisão.

**Exportação ZIP:** `palace-visual-v1.zip` contém:

- `data/site-customizations.json`, com as alterações;
- novas imagens usadas em `img/site-editor/` e vídeos em `media/site-editor/`;
- `palace-visual.json`, com formato, versão, base, caminhos, tamanhos e hashes SHA-256;
- `LEIA-ME.txt`, com as instruções de revisão.

Extraia o ZIP em uma pasta de revisão e confira o manifesto. Aplique apenas os arquivos listados em `files`, nos caminhos correspondentes da mesma revisão do projeto. Não copie o manifesto nem o LEIA-ME para `data/`. A configuração depende do suporte do editor visual que acompanha esta revisão do Palace.

Depois de aplicar, confira as páginas, idiomas e tamanhos envolvidos no navegador e rode:

```powershell
npm.cmd run test:coverage -- --configLoader native
npm.cmd run build
```

O build verifica o orçamento total e os recursos publicados. Um vídeo ou GIF aceito pelo editor ainda pode exigir redução para caber no orçamento do site. O fluxo normal de revisão, commit e publicação continua necessário.

## Alcance das correções

As alterações são aplicadas à interface da SPA depois do carregamento e são reaplicadas quando a página é renderizada novamente. Os textos originais em traduções, templates e JSONs permanecem como fonte. O editor visual **não atualiza o HTML estático usado por buscadores, metadados ou sitemap**. Uma correção que precise alcançar essas fontes deve ser aplicada no código durante a revisão.

O editor, seu servidor, atalho e backups não entram em `_site/`. Consulte a [ADR 0007](../../docs/adr/0007-editor-visual-do-site.md) para o contrato e as alternativas consideradas.
