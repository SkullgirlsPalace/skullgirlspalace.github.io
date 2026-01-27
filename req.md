# 📋 Requisitos do Sistema

---

## 2. Requisitos Funcionais (RF)

> Funcionalidades que o sistema deve oferecer ao usuário.

---

### 🧭 Módulo 1: Navegação e Estrutura Geral

| ID | Requisito |
|:---|:----------|
| **RF001** | **Página Inicial** |

A Home deve conter:
- ✨ Mensagem de boas-vindas com o nome da plataforma
- 🔗 Convite/Link para o servidor do Discord "Palácio Branco"
- 📦 Link para o repositório oficial (GitHub/GitLab) para contribuidores
- 👥 Seção "Sobre nós/Créditos" com apresentação breve dos criadores

---

| ID | Requisito |
|:---|:----------|
| **RF002** | **Menu de Navegação** |

Navbar fixa contendo os links:
- Builds
- Estatísticas
- Catalisadores
- Tier Lists

---

| ID | Requisito |
|:---|:----------|
| **RF003** | **Rodapé/Disclaimer** |

Todas as páginas devem conter um rodapé com:
- ⚠️ Aviso legal (disclaimer) de que é um projeto de fã
- 🐛 Canal de comunicação para report de bugs ou erros
- 🏰 Menção ao servidor "Palácio Branco"

---

### 🎭 Módulo 2: Catálogo de Personagens (Builds)

| ID | Requisito |
|:---|:----------|
| **RF004** | **Listagem de Personagens** |

O sistema deve exibir todos os personagens e variantes do jogo Skullgirls Mobile.

---

| ID | Requisito |
|:---|:----------|
| **RF005** | **Filtros de Personagens** |

O usuário deve poder filtrar e ordenar a grade de personagens por:
- 🔥 Elemento (Fogo, Água, Ar, Luz, Trevas, Neutro)
- 💎 Raridade (Bronze, Prata, Ouro, Diamante)
- 📊 Pontuação (Score)
- ⚔️ Ataque (Atk) e ❤️ Vida (HP)
- 🔤 Ordem Alfabética
- 📂 Categoria (Agrupamento por Raridade Descendente)

---

| ID | Requisito |
|:---|:----------|
| **RF006** | **Card do Personagem** |

Na visualização de lista, o card deve mostrar:
- 🖼️ Imagem do personagem
- ⚔️ Ataque Máximo
- ❤️ Vida Máxima
- 📊 Pontuação Máxima

---

| ID | Requisito |
|:---|:----------|
| **RF007** | **Navegação Hierárquica** |

Ao selecionar um personagem base (ex: Eliza), o sistema deve apresentar uma sub-seleção das variantes organizadas por raridade (barra vertical ou horizontal).

---

| ID | Requisito |
|:---|:----------|
| **RF008** | **Árvore de Habilidades** |

A página de detalhe do personagem deve exibir uma árvore de habilidades interativa, visualmente semelhante ao modelo do site *krazete*.

---

### 📈 Módulo 3: Calculadora e Estatísticas (Economia)

| ID | Requisito |
|:---|:----------|
| **RF009** | **Painel de Ganhos Mensais** |

Exibir tabela com estimativa de ganho mensal de:
- 💰 Dinheiro (Canopy Coins)
- 💎 Teonita

---

| ID | Requisito |
|:---|:----------|
| **RF010** | **Parâmetros de Simulação de Ganhos** |

O usuário deve poder selecionar os seguintes inputs para calcular seus ganhos:
- 🏆 Disputas Premiadas (Prize Fights) participadas
- ⚔️ Reinos (Rifts) participados
- 🎫 Tipo de Passe de Batalha (Grátis, Premium, Premium+)
- 🏅 Posição da Guilda (Top 100 ou Nenhuma)

---

| ID | Requisito |
|:---|:----------|
| **RF011** | **Calculadora de Custos de Evolução** |

Painel interativo para calcular custos de investimento (Coins/Pontos de Habilidade/Chaves), permitindo configurar:
- 📈 Custo de evoluir um **BLOCKBUSTER** do nível 1 ao 15 (filtro discreto)
- 🎒 Custo de uma Loadout completa
- 💎 Custo de evolução de raridade do personagem (ex: Ouro → Diamante)
- ⭐ Custo/Simulação de "Astro Convidado"
- 🔧 Filtro por tipo e nível da build desejada

---

| ID | Requisito |
|:---|:----------|
| **RF012** | **Disclaimer de Estatísticas** |

A aba de estatísticas deve conter um aviso explícito de que os valores apresentados são **aproximados** (cálculo baseado em estimativa).

---

### 🏆 Módulo 4: Conteúdo Estático e Tier List

| ID | Requisito |
|:---|:----------|
| **RF013** | **Tier List** |

Exibir uma Tier List gráfica idêntica à do site *Skullgirls Hub* (link oficial como referência visual).

---

## 3. Requisitos Não Funcionais (RNF)

> Restrições técnicas, de design e de qualidade.

---

| ID | Requisito | Descrição |
|:---|:----------|:----------|
| **RNF001** | **Ausência de Autenticação** | O sistema não deve possuir sistema de login, registro de usuários ou área administrativa protegida por senha. O site é *stateless* do ponto de vista do usuário. |
| **RNF002** | **Responsividade** | O layout deve se adaptar fluidamente para dispositivos Desktop (Web) e Mobile (Smartphones/Tablets). |
| **RNF003** | **Assets Gráficos** | O sistema deve utilizar imagens em formato PNG com fundo transparente para BLOCKBUSTERS, personagens e elementos para garantir qualidade visual na sobreposição de fundos. |
| **RNF004** | **Performance de Carregamento** | Dado o grande número de imagens (todos os bonecos), o carregamento da lista deve ser otimizado (ex: lazy loading). |
