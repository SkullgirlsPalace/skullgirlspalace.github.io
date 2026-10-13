# Sincronização das branches

`seo/google-indexing` prepara alterações públicas de indexação para um PR na `main`. `nova-fase-v0` é a beta fechada. As duas recebem atualizações de `origin/main`; nunca use a beta como origem de um merge para a branch SEO ou para `main`.

Antes de trabalhar ou commitar em qualquer uma das duas:

1. Confira a branch e o estado local com `git status`.
2. Atualize as referências com `git fetch origin --prune`.
3. Verifique `git merge-base --is-ancestor origin/main HEAD`. Se falhar, preserve alterações locais e integre `origin/main` na branch atual, resolvendo conflitos sem descartar seu conteúdo.
4. Rode os testes e a montagem do site antes de concluir a integração.

O hook `.githooks/pre-commit` atualiza `origin/main` e interrompe commits nessas duas branches se a conferência remota falhar ou se faltar algum commit da principal. Ele não faz merges automaticamente nem mistura as branches.

Ative o hook em cada checkout com `npm run setup:hooks`. A configuração é local ao repositório, por isso não acompanha um clone novo. Não use `--no-verify` para contornar a verificação. As regras também se aplicam aos agentes mesmo quando o hook ainda não foi instalado.

Depois que um PR entrar em `main`, sincronize cada branch com a nova `origin/main` antes do próximo trabalho. Nenhuma checagem local impede a principal de avançar depois de um commit; atualize novamente antes de enviar um PR.
