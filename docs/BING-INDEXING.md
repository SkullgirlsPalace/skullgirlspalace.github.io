# Bing: diagnóstico atualizado em 13/10/2026

O relatório anterior descrevia uma versão antiga do projeto. O PR #62 (IndexNow) e o PR #63 (conteúdo estático e publicação de `_site/`) já estão na `main`.

## Evidência pública conferida

Pedidos HTTP com User-Agent do Bingbot responderam 200 para a home, `/characters/`, `/characters/annie/`, `/characters/annie/builds/`, `robots.txt`, sitemap e a chave do IndexNow. As páginas de conteúdo já entregam HTML estático e canonicals próprios. O sitemap público tem 56 URLs. Isso verifica esses pedidos; não equivale a consultar o status interno do Bing ou a testar pedidos dos IPs reais do robô.

A [última execução pública de publicação conferida](https://github.com/SkullgirlsPalace/skullgirlspalace.github.io/actions/runs/37171344804) teve sucesso nos jobs de testes, publicação e IndexNow. A chave publicada corresponde ao valor usado pelo script. O status HTTP específico do envio não foi extraído dos logs autenticados.

## Correção preparada nesta branch

A URL principal de cada personagem abre uma visão geral de variantes, atributos e habilidades. `/builds/` continua abrindo as recomendações, e `/tier-list/` os ranks. Antes, o HTML inicial da URL principal era diferente, mas o JavaScript acabava abrindo builds. O renderizador da visão geral agora é compartilhado entre o HTML inicial e a SPA. Consulte a [ADR 0003](adr/0003-visao-geral-distinta-de-builds.md).

As URLs existentes e os 56 endereços do sitemap foram mantidos. A montagem gera as páginas a partir dos dados atuais; arquivos HTML gerados não devem ser commitados. A auditoria de peso também roda antes da publicação.

## O que conferir no Bing Webmaster Tools

- Confira o sitemap `https://skullgirlspalace.github.io/sitemap.xml`, seu processamento e as 56 URLs.
- Na inspeção da home e de `/characters/`, confira os motivos de não indexação e a última visita do Bing. Solicite indexação se ainda não fez isso.
- Na área IndexNow, confira as URLs recebidas e seus estados de rastreamento e indexação. O sucesso do envio no Actions não substitui essa conferência.

Essas informações dependem do painel da conta, que não está conectado nesta sessão. A [documentação do Bing](https://www.bing.com/webmasters/help/why-is-my-site-not-in-the-index-2141dfab) explica que descoberta, rastreamento e indexação envolvem decisões diferentes; respostas HTTP 200 não garantem inclusão no índice. O [IndexNow](https://www.bing.com/indexnow/IndexNowView/IndexNowGetStartedView) avisa sobre mudanças e não garante rastreamento nem indexação.

## Descoberta por links

O README agora tem o link público do site. A API pública do GitHub ainda mostrou o campo Website/About vazio; preencha-o com `https://skullgirlspalace.github.io/`. Links em comunidades relevantes podem ajudar na descoberta, conforme as [diretrizes oficiais do Bing](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a). Não foram enviadas mensagens ou feitas divulgações externas nesta tarefa.

Não há evidência nesta inspeção para atribuir o problema especificamente a `github.io`, nem para prometer um prazo de rastreamento. Uma troca de domínio não foi necessária para estas correções.
