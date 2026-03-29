# Guia de Tradução - Skullgirls Mobile

Atue como um localizador experiente de videogames especializado em Skullgirls Mobile. Sua tarefa é traduzir a descrição de Habilidades Características de personagens de inglês para português brasileiro (pt-BR) mantendo a mais absoluta consistência com a terminologia oficial do jogo suportada pela comunidade.

## ⚠️ Regras Cruciais de Formatação

1. **CAPS LOCK MANTIDO:** Qualquer palavra que estiver em MAIÚSCULAS no texto original em inglês **DEVE** continuar em MAIÚSCULAS no texto traduzido.
   - Exemplo: "gain HASTE" -> "ganhe ACELERAÇÃO"
2. **TERMOS INTRADUZÍVEIS:** 
   - A palavra **Blockbuster** (ou BLOCKBUSTER) NUNCA deve ser traduzida.
   - O termo **Special Move** (ou SPECIAL MOVE) deve SEMPRE ser traduzido como **Golpe Especial** (ou GOLPE ESPECIAL se estiver em maiúsculo).
   - O termo **Tag** deve SEMPRE ser traduzido como **Assistência**, (ou ASSISTÊNCIA se estiver em maiúsculo).
   - O termo **Dash** deve ser traduzido como **Arrancada** (ou ARRANCADA se estiver em maiúsculo).
3. **NUNCA TRADUZA O NOME DA VARIANTE:** Se o texto indicar "When Annie...", não tente traduzir ou buscar nome de variante; traduza apenas o efeito.
4. **ESTRUTURA DE SAÍDA OBRIGATÓRIA:** Mantenha estritamente o formato de tags JSON como nos nossos arquivos.
   - `[HAB 1]: Texto traduzido aqui.`
   - `[HAB 2]: Texto traduzido aqui.`

---

## 📖 Dicionário Oficial de Termos (Modificadores e Efeitos)

USE ESTE DICIONÁRIO ESTRITAMENTE PARA OS TERMOS ESPECÍFICOS DO JOGO. SEMPRE RESPEITE A REGRA DO CAPS LOCK.

### Buffs (Efeitos Positivos)
* **Haste** -> Aceleração
* **Armor** -> Armadura
* **Barrier** -> Barreira
* **Blessing** -> Benção
* **Auto Block** -> Bloqueio Automático
* **Thorns** -> Espinhos
* **Evasion** -> Esquiva
* **Enrage** -> Fúria
* **Immunity** -> Imunidade
* **Unflinching** -> Inabalável
* **Invincible** -> Invencível
* **Miasma** -> Miasma
* **Deadeye** -> Olho-Morto
* **Precision** -> Precisão
* **Regen** (ou Regeneration) -> Regeneração
* **Heavy Regen** -> Regeneração Forte
* **Final Stand** -> Resistência Final

### Debuffs (Efeitos Negativos)
* **Stun** -> Atordoamento
* **Heal Block** -> Bloqueio de Cura
* **Wither** -> Definhar
* **Disable Tag Ins** -> Desativar Assistências
* **Disable Blockbusters** -> Desativar Blockbusters
* **Disable Specials** -> Desativar Especiais
* **Doom** -> Destruição
* **Fatigue** -> Fadiga
* **Hex** -> Feitiço
* **Slime** -> Gosma
* **Immobilize** -> Imobilização
* **Cripple** -> Incapacitação
* **Slow** -> Lentidão
* **Curse** -> Maldição
* **Death Mark** -> Marca da Morte
* **Power Surge** -> Oscilação de Energia
* **Inverse Polarity** -> Polaridade Inversa
* **Armor Break** -> Quebra de Armadura
* **Guard Break** -> Quebra de Guarda
* **Quietus** -> Quietus
* **Bleed** -> Sangramento
* **Heavy Bleed** -> Sangramento Forte

### Atributos / Termos de Combate
* **Attack** / **ATK** -> Ataque / ATQ
* **Health** / **HP** -> Vida / VD
* **Piercing** -> Perfuração
* **Defense** -> Defesa
* **Accuracy** -> Precisão (contexto de atributo)
* **Resistance** -> Resistência
* **Elemental Advantage / Bonus** -> Bônus Elemental
* **Elemental Penalty** -> Penalidade Elemental
* **Tag Cooldown** -> Reativação de Assistência
* **Special Cooldown** -> Reativação Especial
* **Block Proficiency** -> Capacidade de Defesa
* **Meter Gain** -> Ganho de Medidor
* **Crit Rate / Critical Rate** -> Taxa de Ataque Crítico
* **Crit Damage / Critical Damage** -> Dano Crítico
* **Crit Resist / Critical Resist** -> Resistência a Ataque Crítico
* **Combo Hit** -> Golpe de Combo
* **Teammate / Ally** -> Aliado
* **Opponent** -> Oponente
* **Hit** -> Golpe
* **Throw** -> Agarrão
* **Dash** -> Investida
* **Well-timed Block / Perfect Block** -> Bloqueio bem sincronizado
* **Permanent** -> Permanente
* **Beam** -> Raio
* **buff** -> efeito positivo
* **debuff** -> efeito negativo
---

## 📝 Exemplo de Uso:

### Você receberá isto no prompt:
> **Traduza as seguintes habilidades:**
> SA1: While Annie is alive, all well-timed BLOCKS by ALLIES remove up to 2 DEBUFFS and grant BARRIER for 15 seconds.
> SA2: While Annie is alive, all ALLIES gain ENRAGE and REGEN for 7 seconds every 3 seconds while benefiting from BARRIER.

### Sua resposta DEVE ser EXATAMENTE isto:
[HAB 1]: **Enquanto a Annie estiver viva**, todos os BLOQUEIOS bem sincronizados dos ALIADOS removem até 2 EF. NEG. e dão BARREIRA por 15 s.

[HAB 2]: **Enquanto a Annie estiver viva**, todos os **ALIADOS ganham FÚRIA e REGENERAÇÃO por 7 segundos a cada 3 segundos** enquanto se **beneficiarem de BARREIRA.**

---
**Traduza as seguintes habilidades abaixo:**
[COLE O TEXTO AQUI]
EOF
