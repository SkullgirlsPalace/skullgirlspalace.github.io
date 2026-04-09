# Guia de Testes - Skullgirls Palace

> Manual para manter e rodar a suíte de testes do projeto

---

## Visão Geral

Este projeto usa **Vitest** como framework de testes. Os testes garantem que o site funciona corretamente e evitam que mudanças quebrem funcionalidades existentes.

### Estrutura de Pastas

```
/tests/
├── setup.js              # Configuração global dos testes
├── unit/                 # Testes de funções isoladas
│   ├── config/           # Testes de configuração
│   ├── utils/            # Testes de utilitários
│   └── data/             # Testes de dados estáticos
├── integration/          # Testes de integração
│   ├── state/            # Testes do state management
│   └── services/         # Testes do data service
└── dom/                  # Testes de componentes e páginas
    ├── components/       # Testes de componentes UI
    └── pages/            # Testes de páginas
```

---

## Comandos Principais

### Rodar Todos os Testes

```bash
npm run test:run
```

**Windows (PowerShell/CMD):**
```powershell
npm run test:run
```

### Rodar Testes em Modo Watch (recarrega ao salvar)

```bash
npm test
```

> Pressione `q` para sair do modo watch

### Rodar Testes com Coverage

```bash
npm run test:coverage
```

Isso mostra quanto do código está coberto pelos testes. Atualmente estamos com **~22% de coverage** e o mínimo aceito é **20%**.

### Rodar Apenas Um Arquivo de Teste

```bash
npx vitest run tests/unit/utils/formatters.test.js
```

---

## O Que Cada Comando Faz

| Comando | O que faz | Quando usar |
|---------|-----------|-------------|
| `npm run test:run` | Roda todos os testes uma vez | Antes de commitar |
| `npm test` | Roda testes e fica observando mudanças | Durante desenvolvimento |
| `npm run test:coverage` | Mostra percentual de cobertura | Para verificar qualidade |

---

## Coverage Atual

| Camada | Coverage | Status |
|--------|----------|--------|
| `/src/config/` | 100% | ✅ Ideal |
| `/src/data/` | 100% | ✅ Ideal |
| `/src/state/` | 98% | ✅ Excelente |
| `/src/services/` | 88% | ✅ Bom |
| `/src/utils/` | 57% | ⚠️ Em progresso |
| `/src/components/` | ~40% | ⚠️ Em progresso |
| `/src/pages/` | 6% | ❌ Precisa de mais testes |

---

## Pipeline CI/CD

Quando você faz push para o GitHub, o pipeline automaticamente:

1. Instala as dependências
2. Roda todos os testes
3. Verifica se a coverage está acima de 20%
4. Só faz deploy se os testes passarem

**Se os testes falharem, o deploy NÃO acontece.**

---

## Solução de Problemas

### "npm: command not found"

Você precisa instalar o Node.js. Baixe em: https://nodejs.org/

### Testes falhando no Windows

Certifique-se de estar na pasta correta do projeto:
```powershell
cd C:\caminho\para\palacio-branco-entreprises
```

### "Cannot find module"

Instale as dependências primeiro:
```bash
npm install
```

### Coverage abaixo do threshold

Se a coverage estiver abaixo de 20%, o pipeline vai falhar. Para aumentar:

1. Identifique arquivos com baixa cobertura
2. Adicione mais testes para esses arquivos
3. Rode `npm run test:coverage` para verificar

---

## Boas Práticas

### ✅ Faça

- Rode os testes antes de commitar mudanças importantes
- Mantenha a coverage acima do mínimo (20%)
- Adicione novos testes quando criar novas funcionalidades
- Nomeie os testes de forma clara (ex: "should return correct value for X")

### ❌ Não Faça

- Não commit com testes falhando
- Não remova testes existentes sem motivo
- Não ignore erros de coverage

---

## Meta

- **Framework**: Vitest v4.1
- **Ambiente DOM**: Happy-DOM
- **Coverage mínima**: 20% (lines)
- **Total de testes**: 281

---

## Dúvidas?

Se algo não estiver funcionando, verifique:

1. Node.js instalado (versão 18+)
2. Dependências instaladas (`npm install`)
3. Está na pasta correta do projeto

Se persistir, abra uma issue no GitHub.
