// =====================================================
// EFFECT DATA
// Definitions, tooltips and mechanics for Buffs, Debuffs
// and Technical Terminology in Skullgirls Mobile
// =====================================================

export const EFFECT_DATA = {
    // --- TERMINOLOGIA TÉCNICA ---
    vida: {
        keys: ['HP', 'VIDA', 'VD', 'Vida'],
        name: 'Vida (VD)',
        type: 'term',
        detailed: 'Representa a saúde do seu lutador. Se chegar a zero, o personagem é derrotado.'
    },
    signature_abilities: {
        keys: ['Habilidades Características', 'Habilidade Característica', 'Signature Abilities'],
        name: 'Habilidades Características',
        type: 'term',
        detailed: 'São as habilidades passivas que tornam cada personagem único no jogo.'
    },
    marquee_abilities: {
        keys: ['Habilidade Superior', 'Habilidades Superiores', 'Marquee Abilities'],
        name: 'Habilidade Superior',
        type: 'term',
        detailed: 'Uma habilidade poderosa que pode ser escolhida entre duas opções após o personagem atingir seu potencial máximo.'
    },
    special_moves: {
        keys: ['Golpes Especiais', 'Golpe Especial', 'Special Moves'],
        name: 'Golpes Especiais',
        type: 'term',
        detailed: 'Diferente dos Blockbusters, os Golpes Especiais recarregam com o tempo (Reativação Especial).'
    },
    tag_in: {
        keys: ['Assistência', 'Tag In', 'Ataque de Assistência'],
        name: 'Assistência (Tag In)',
        type: 'term',
        detailed: 'Permite que um aliado entre na luta realizando um ataque.'
    },
    buff: {
        keys: ['Efeito Positivo', 'EF. POS.', 'Buff'],
        name: 'Efeito Positivo (EF. POS.)',
        type: 'term',
        detailed: 'Ícones verdes que aparecem acima da barra de vida.'
    },
    debuff: {
        keys: ['Efeito Negativo', 'EF. NEG.', 'Debuff'],
        name: 'Efeito Negativo (EF. NEG.)',
        type: 'term',
        detailed: 'Ícones vermelhos que aparecem acima da barra de vida.'
    },
    permanent_modifier: {
        keys: ['Modificador Permanente', 'Efeito Permanente', 'Permanent Modifier'],
        name: 'Efeito Permanente',
        type: 'term',
        detailed: 'São representados por um brilho ou borda dourada no ícone do efeito.'
    },

    // --- EFEITOS POSITIVOS (BUFFS) ---
    armor: {
        keys: ['Armadura', 'Armor'],
        name: 'Armadura',
        type: 'buff',
        icon: 'img/modifiers/buffs/Armor.png',
        stacks: 5,
        scaling: '20% > 40% > 60% > 80% > 100%',
        detailed: 'Reduz o dano sofrido em 20%.',
        explicacao: 'Reduz dano em 20%. Removido por Quebra de Armadura.'
    },
    auto_block: {
        keys: ['Bloqueio Automático', 'Auto Block', 'Bloq. Automático'],
        name: 'Bloqueio Automático',
        type: 'buff',
        icon: 'img/modifiers/buffs/Auto_Block.png',
        stacks: 5,
        scaling: '10% > 20% > 30% > 40% > 50%',
        detailed: '10% de chance de BLOQUEAR automaticamente o próximo GOLPE.',
        explicacao: '10% chance de Bloquear Automaticamente. Removido por Quebra de Guarda. Olho-Morto Anula este Efeito.'
    },
    barrier: {
        keys: ['Barreira', 'Barrier'],
        name: 'Barreira',
        type: 'buff',
        icon: 'img/modifiers/buffs/Barrier.png',
        stacks: 5,
        scaling: '10% > 20% > 30% > 40% > 50%',
        detailed: 'Ganhe 10% de vida temporária.',
        explicacao: 'Vida Temporária baseada em 10% da Vida Máxima, basicamente uma Vida adicional.'
    },
    blessing: {
        keys: ['Benção', 'Blessing'],
        name: 'Benção',
        type: 'buff',
        icon: 'img/modifiers/buffs/Blessing.png',
        stacks: 5,
        scaling: '20% > 20% > 30% > 40% > 50%',
        detailed: 'RESSUSCITE com 20% de VIDA ao ser DERROTADO.',
        explicacao: 'Revive com 10% de Vida por acúmulo. Quietus anula este efeito.'
    },
    deadeye: {
        keys: ['Olho-Morto', 'Deadeye'],
        name: 'Olho-Morto',
        type: 'buff',
        icon: 'img/modifiers/buffs/Deadeye.png',
        stacks: 1,
        detailed: 'Os Ataques ignoram a DEFESA do oponente e não ativam os efeitos de BLOQUEIO AUTOMÁTICO, INABALÁVEL, ESQUIVA e ESPINHOS.',
        explicacao: 'Ignora Defesa, Bloqueio Automático, Inabalável, Esquiva e Espinhos.'
    },
    enrage: {
        keys: ['Fúria', 'Enrage'],
        name: 'Fúria',
        type: 'buff',
        icon: 'img/modifiers/buffs/Enrage.png',
        stacks: 5,
        scaling: '20% > 40% > 60% > 80% > 100%',
        detailed: 'Aumenta o dano em 20%.',
        explicacao: 'Aumenta o Dano em 20%. Remove Incapacitação.'
    },
    evasion: {
        keys: ['Evasão', 'Esquiva', 'Evasion'],
        name: 'Evasão',
        type: 'buff',
        icon: 'img/modifiers/buffs/Evasion.png',
        stacks: 5,
        detailed: 'O próximo GOLPE será esquivado.',
        explicacao: 'Esquiva de qualquer Ataque. Não Esquiva de Blockbuster Indefensável e Olho-Morto.'
    },
    final_stand: {
        keys: ['Resistência Final', 'Final Stand'],
        name: 'Resistência Final',
        type: 'buff',
        icon: 'img/modifiers/buffs/FinalStand.png',
        stacks: 1,
        detailed: 'Impede a morte.',
        explicacao: 'A Vida não cai abaixo de 1 Vida. Bloqueia Destruição, Quietus anula este Efeito.'
    },
    haste: {
        keys: ['Aceleração', 'Haste'],
        name: 'Aceleração',
        type: 'buff',
        icon: 'img/modifiers/buffs/Haste.png',
        stacks: 1,
        detailed: 'Aumenta a velocidade de ganho do MEDIDOR DE BLOCKBUSTER em 100%.',
        explicacao: '+100% ganho de medidor. Remove Lentidão.'
    },
    heavy_regen: {
        keys: ['Regeneração Forte', 'Heavy Regen'],
        name: 'Regeneração Forte',
        type: 'buff',
        icon: 'img/modifiers/buffs/HeavyRegen.png',
        stacks: 1,
        detailed: 'Regenera 2% da VIDA MÁXIMA a cada segundo.',
        explicacao: 'Cura 2% de Vida por segundo. Remove Sangramento.'
    },
    immunity: {
        keys: ['Imunidade', 'Immunity'],
        name: 'Imunidade',
        type: 'buff',
        icon: 'img/modifiers/buffs/Immune.png',
        stacks: 1,
        detailed: 'Dá imunidade a todos os EFEITOS NEGATIVOS.',
        explicacao: 'Impede o ganho de novos Efeitos Negativos, Efeitos Negativos já aplicados não serão removidos.'
    },
    invincible: {
        keys: ['Invencível', 'Invincible'],
        name: 'Invencível',
        type: 'buff',
        icon: 'img/modifiers/buffs/Invincible.png',
        stacks: 1,
        detailed: 'Reduz o dano sofrido em 100%.',
        explicacao: 'Impede dano de todos os golpes, sangramentos, drenagens e reflexão de dano. Não Anula Destruição.'
    },
    miasma: {
        keys: ['Miasma'],
        name: 'Miasma',
        type: 'buff',
        icon: 'img/modifiers/buffs/Miasma.png',
        stacks: 5,
        scaling: '1% > 2% > 3% > 4% > 5%',
        detailed: 'Drena 2% de VIDA e MEDIDOR por seg de oponentes próximos.',
        explicacao: 'Drena 1% de Vida e Medidor do oponente. Bloqueio de Cura e Polaridade Inversa não impedem a Drenagem de Vida e Blockbuster.'
    },
    precision: {
        keys: ['Precisão', 'Precision'],
        name: 'Precisão',
        type: 'buff',
        icon: 'img/modifiers/buffs/Precision.png',
        stacks: 5,
        detailed: 'Garante que o próximo GOLPE seja CRÍTICO. GOLPES DE PRECISÃO não ativam as HABILIDADES CARACTERÍSTICAS do oponente.',
        explicacao: 'Acerto Crítico garantido e não ativa Habilidades Características.'
    },
    regen: {
        keys: ['Regeneração', 'Regen'],
        name: 'Regeneração',
        type: 'buff',
        icon: 'img/modifiers/buffs/Regen.png',
        stacks: 5,
        scaling: '1% > 2% > 3% > 4% > 5%',
        detailed: 'Regenera 1% da VIDA MÁXIMA a cada segundo.',
        explicacao: 'Cura 1% de Vida por segundo. Remove Sangramento.'
    },
    thorns: {
        keys: ['Espinhos', 'Thorns'],
        name: 'Espinhos',
        type: 'buff',
        icon: 'img/modifiers/buffs/Thorns.png',
        stacks: 5,
        scaling: '20% > 40% > 60% > 80% > 100%',
        detailed: 'Reflita 20% do dano ao agressor.',
        explicacao: 'Reflete 20% do dano por acúmulo. Olho-Morto ignora este efeito.'
    },
    unflinching: {
        keys: ['Inabalável', 'Unflinching'],
        name: 'Inabalável',
        type: 'buff',
        icon: 'img/modifiers/buffs/Unflinching.png',
        stacks: 1,
        detailed: 'Não reaja a golpes.',
        explicacao: 'O personagem não será derrubado por ataques normais ou a maioria dos golpes especiais, golpes Blockbusters e Agarrões ainda podem derrubar. Olho-Morto Ignora este Efeito.'
    },

    // --- EFEITOS NEGATIVOS (DEBUFFS) ---
    armor_break: {
        keys: ['Quebra de Armadura', 'Armor Break', 'Quebra de Arm.'],
        name: 'Quebra de Armadura',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/ArmorBreak.png',
        stacks: 1,
        detailed: 'Aumenta o dano sofrido em 20%.',
        explicacao: '+20% dano recebido. Remove Armadura.'
    },
    bleed: {
        keys: ['Sangramento', 'Bleed'],
        name: 'Sangramento',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/Bleed.png',
        stacks: 5,
        scaling: '1% > 2% > 3% > 4% > 5%',
        detailed: 'Drena 1% da VIDA MÁXIMA da vítima a cada segundo.',
        explicacao: 'Remove 1% da Vida Máxima por Segundo até 1 de Vida. Remove Regeneração.'
    },
    cripple: {
        keys: ['Incapacitação', 'Cripple'],
        name: 'Incapacitação',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/Cripple.png',
        stacks: 1,
        detailed: 'Reduz o dano infligido em 20%.',
        explicacao: '-20% dano causado. Remove Fúria.'
    },
    curse: {
        keys: ['Maldição', 'Curse'],
        name: 'Maldição',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/Curse.png',
        stacks: 1,
        detailed: 'Impede de ganhar EFEITOS POSITIVOS.',
        explicacao: 'Impede o ganho de novos Efeitos Positivos.'
    },
    death_mark: {
        keys: ['Marca da Morte', 'Death Mark'],
        name: 'Marca da Morte',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/DeathMark.png',
        stacks: 1,
        detailed: 'Aumenta em 50% o dano sofrido por CRÍTICOS e reduz em 50% a CAPACIDADE DE BLOQUEIO.',
        explicacao: 'Aumenta em +50% o Dano Sofrido por Críticos e reduz em 50% a Capacidade de Bloqueio.'
    },
    doom: {
        keys: ['Destruição', 'Doom'],
        name: 'Destruição',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/Doom.png',
        stacks: 1,
        detailed: 'APÓS X segundos, o lutador afetado é morto.',
        explicacao: 'Morte instantânea ao expirar. Ignora Invencibilidade.'
    },
    fatigue: {
        keys: ['Fadiga', 'Fatigue'],
        name: 'Fadiga',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/Fatigue.png',
        stacks: 1,
        detailed: 'ASSISTÊNCIAS E GOLPES ESPECIAIS levem o dobro do tempo para reativar. Após X segundos, o Lutador atingido tem 50% de chance de ficar ATORDOADO por 2 seg.',
        explicacao: 'Recarga de Golpes Especiais e Assistência 50% mais lenta, ao expirar tem 50% de chance infligir Atordoamento.'
    },
    guard_break: {
        keys: ['Quebra de Guarda', 'Guard Break'],
        name: 'Quebra de Guarda',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/Guard_Break.png',
        stacks: 5,
        scaling: '10% > 20% > 30% > 40% > 50%',
        detailed: '10% de chance do bloqueio falhar durante um BLOQUEIO.',
        explicacao: '10% chance de falhar a Guarda. Remove Bloqueio Automático.'
    },
    heavy_bleed: {
        keys: ['Sangramento Forte', 'Heavy Bleed'],
        name: 'Sangramento Forte',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/HeavyBleed.png',
        stacks: 1,
        detailed: 'Drena 2% da VIDA MÁXIMA da vítima a cada segundo.',
        explicacao: 'Remove 2% da Vida Máxima por Segundo. Remove Regeneração.'
    },
    hex: {
        keys: ['Feitiço', 'Hex'],
        name: 'Feitiço',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/Hex.png',
        stacks: 1,
        detailed: 'HABILIDADES CARACTERÍSTICAS desativadas.',
        explicacao: 'Desativa Habilidades Características.'
    },
    immobilize: {
        keys: ['Imobilização', 'Immobilize'],
        name: 'Imobilização',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/Immobilize.png',
        stacks: 1,
        detailed: 'Impede o personagem de se mover.',
        explicacao: 'Impede o personagem de se mover.'
    },
    inverse_polarity: {
        keys: ['Polaridade Inversa', 'Inverse Polarity'],
        name: 'Polaridade Inversa',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/InversePolarity.png',
        stacks: 1,
        detailed: 'Inverte qualquer tipo de Regeneração e causa dano ao invés de curar.',
        explicacao: 'Inverte qualquer tipo de Regeneração e causa dano ao invés de curar.'
    },
    heal_block: {
        keys: ['Bloqueio de Cura', 'Heal Block'],
        name: 'Bloqueio de Cura',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/HealBlock.png',
        stacks: 1,
        detailed: 'Bloqueia todo tipo de cura.',
        explicacao: 'Impede o personagem de ser curado.'
    },
    lock_block: {
        keys: ['Desativar Blockbusters', 'Lock Block Buster', 'Desativar Blockbuster'],
        name: 'Desativar Blockbusters',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/LockBlock.png',
        stacks: 1,
        detailed: 'Desativa BLOCKBUSTER.',
        explicacao: 'Bloqueia o uso de Blockbusters e não permite carregar Blockbusters pendentes.'
    },
    lock_special: {
        keys: ['Desativar Especiais', 'Lock Special'],
        name: 'Desativar Especiais',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/LockSpecial.png',
        stacks: 1,
        detailed: 'Desativa GOLPES ESPECIAIS.',
        explicacao: 'Bloqueia o uso de Golpes Especiais e desativa a Recarga dos Golpes Especiais.'
    },
    lock_tag: {
        keys: ['Desativar Assistências', 'Lock Tag', 'Desativar Assistência'],
        name: 'Desativar Assistências',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/LockTag.png',
        stacks: 1,
        detailed: 'Desativa ASSISTÊNCIAS.',
        explicacao: 'Bloqueia Assistências e impede a recarga da Assistência.'
    },
    power_surge: {
        keys: ['Oscilação de Energia', 'Power Surge'],
        name: 'Oscilação de Energia',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/PowerSurge.png',
        stacks: 5,
        scaling: '5% > 10% > 15% > 20% > 25%',
        detailed: 'Sofra dano igual a 5% da VIDA MÁXIMA ao usar um BLOCKBUSTER.',
        explicacao: 'Sofre 5% de dano igual a sua Vida Máxima ao usar Blockbuster.'
    },
    quietus: {
        keys: ['Quietus'],
        name: 'Quietus',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/Quietus.png',
        stacks: 1,
        detailed: 'A RESITÊNCIA da vítima é ignorada e os efeitos de RESISTÊNCIA FINAL e BENÇÃO são contornados.',
        explicacao: 'Ignora Resistência, Resistência Final e Benção.'
    },
    slime: {
        keys: ['Gosma', 'Slime'],
        name: 'Gosma',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/Slime.png',
        stacks: 5,
        scaling: '2% > 4% > 6% > 8% > 10%',
        detailed: 'Sofra dano igual a 2% VIDA MÁXIMA sempre que um EF. POSITIVO for recebido.',
        explicacao: 'Sofre 2% de dano igual a sua Vida Máxima ao ganhar EF. POS.'
    },
    slow: {
        keys: ['Lentidão', 'Slow'],
        name: 'Lentidão',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/Slow.png',
        stacks: 5,
        scaling: '50% > 100% > 150% > 200% > 250%',
        detailed: 'Diminui a velocidade de ganho do MEDIDOR DE BLOCKBUSTER em 50%.',
        explicacao: 'Seus Blockbuster demoram -50% para carregar. Remove Aceleração.'
    },
    stun: {
        keys: ['Atordoamento', 'Stun'],
        name: 'Atordoamento',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/Stun.png',
        stacks: 1,
        detailed: 'Atordoa a vítima.',
        explicacao: 'Atordoamento impede todas as ações até o efeito expirar.'
    },
    wither: {
        keys: ['Definhar', 'Wither'],
        name: 'Definhar',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/Wither.png',
        stacks: 5,
        scaling: '5% > 10% > 15% > 20% > 25%',
        detailed: 'Perca 10% a cada segundo no MEDIDOR DE BLOCKBUSTER.',
        explicacao: 'Remove 5% de Medidor de Blockbuster por segundo.'
    }
};

/**
 * Build a lookup map from keyword → effect key for fast matching.
 * Only includes buffs and debuffs for automatic highlighting in abilities.
 * @returns {Array<{pattern: string, effectKey: string}>}
 */
export function getEffectPatterns() {
    const patterns = [];
    for (const [effectKey, effect] of Object.entries(EFFECT_DATA)) {
        // Only auto-highlight actual buffs and debuffs, not technical terms
        if (effect.type === 'buff' || effect.type === 'debuff') {
            for (const key of effect.keys) {
                patterns.push({ pattern: key, effectKey });
            }
        }
    }
    // Sort by pattern length descending so longer matches take priority
    patterns.sort((a, b) => b.pattern.length - a.pattern.length);
    return patterns;
}
