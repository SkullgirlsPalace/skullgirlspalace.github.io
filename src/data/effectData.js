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
        detailed: 'Reduz dano em 20%. Removido por Quebra de Armadura.'
    },
    auto_block: {
        keys: ['Bloqueio Automático', 'Auto Block', 'Bloq. Automático'],
        name: 'Bloqueio Automático',
        type: 'buff',
        icon: 'img/modifiers/buffs/Auto_Block.png',
        stacks: 5,
        detailed: '10% chance de Bloquear Automaticamente. Removido por Quebra de Guarda.'
    },
    barrier: {
        keys: ['Barreira', 'Barrier'],
        name: 'Barreira',
        type: 'buff',
        icon: 'img/modifiers/buffs/Barrier.png',
        stacks: 5,
        scaling: '10% > 20% > 30% > 40% > 50%',
        detailed: 'Vida Temporária baseada em 10% da Vida Máxima, basicamente uma Vida adicional.'
    },
    blessing: {
        keys: ['Benção', 'Blessing'],
        name: 'Benção',
        type: 'buff',
        icon: 'img/modifiers/buffs/Blessing.png',
        stacks: 5,
        detailed: 'Revive com 10% de Vida por acúmulo. Quietus anula este efeito.'
    },
    deadeye: {
        keys: ['Olho-Morto', 'Deadeye'],
        name: 'Olho-Morto',
        type: 'buff',
        icon: 'img/modifiers/buffs/Deadeye.png',
        stacks: 1,
        detailed: 'Ignora Defesa, Bloqueio Automático, Inabalável, Esquiva e Espinhos.'
    },
    enrage: {
        keys: ['Fúria', 'Enrage'],
        name: 'Fúria',
        type: 'buff',
        icon: 'img/modifiers/buffs/Enrage.png',
        stacks: 5,
        scaling: '20% > 40% > 60% > 80% > 100%',
        detailed: 'Aumenta dano em 20%. Remove Incapacitação.'
    },
    evasion: {
        keys: ['Evasão', 'Esquiva', 'Evasion'],
        name: 'Evasão',
        type: 'buff',
        icon: 'img/modifiers/buffs/Evasion.png',
        stacks: 5,
        detailed: 'Esquiva de qualquer Ataque. Não Esquiva de Blockbuster Indensável e Olho-Morto.'
    },
    final_stand: {
        keys: ['Resistência Final', 'Final Stand'],
        name: 'Resistência Final',
        type: 'buff',
        icon: 'img/modifiers/buffs/FinalStand.png',
        stacks: 1,
        detailed: 'Vida não cai abaixo de 1 Vida. Bloqueia Destruição, Quietus anula este Efeito.'
    },
    haste: {
        keys: ['Aceleração', 'Haste'],
        name: 'Aceleração',
        type: 'buff',
        icon: 'img/modifiers/buffs/Haste.png',
        stacks: 1,
        detailed: '+100% ganho de medidor. Remove Lentidão.'
    },
    heavy_regen: {
        keys: ['Regeneração Forte', 'Heavy Regen'],
        name: 'Regeneração Forte',
        type: 'buff',
        icon: 'img/modifiers/buffs/HeavyRegen.png',
        stacks: 1,
        detailed: 'Cura 2% de Vida por segundo. Remove Sangramento.'
    },
    immunity: {
        keys: ['Imunidade', 'Immunity'],
        name: 'Imunidade',
        type: 'buff',
        icon: 'img/modifiers/buffs/Immune.png',
        stacks: 1,
        detailed: 'Impede o ganho de novos Efeitos Negativos, Efeitos Negativos já aplicados não serão removidos.'
    },
    invincible: {
        keys: ['Invencível', 'Invincible'],
        name: 'Invencível',
        type: 'buff',
        icon: 'img/modifiers/buffs/Invincible.png',
        stacks: 1,
        detailed: 'Impede dano de todos os golpes, sangramentos, drenagens e reflexão de dano. Não Anula Destruição.'
    },
    miasma: {
        keys: ['Miasma'],
        name: 'Miasma',
        type: 'buff',
        icon: 'img/modifiers/buffs/Miasma.png',
        stacks: 5,
        scaling: '1% > 2% > 3% > 4% > 5%',
        detailed: 'Drena 1% de Vida e Medidor do oponente. Bloqueio de Cura impede a Cura mais continua Drenando Vida, Polaridade Inversa Inverte sua Cura mais Continua Drenando também.'
    },
    precision: {
        keys: ['Precisão', 'Precision'],
        name: 'Precisão',
        type: 'buff',
        icon: 'img/modifiers/buffs/Precision.png',
        stacks: 5,
        detailed: 'Acerto Crítico garantido e não ativa Habilidades Características.'
    },
    regen: {
        keys: ['Regeneração', 'Regen'],
        name: 'Regeneração',
        type: 'buff',
        icon: 'img/modifiers/buffs/Regen.png',
        stacks: 5,
        detailed: 'Cura 1% de Vida por segundo. Remove Sangramento.'
    },
    thorns: {
        keys: ['Espinhos', 'Thorns'],
        name: 'Espinhos',
        type: 'buff',
        icon: 'img/modifiers/buffs/Thorns.png',
        stacks: 5,
        scaling: '20% > 40% > 60% > 80% > 100%',
        detailed: 'Reflete 20% do dano por acúmulo. Olho-Morto ignora este efeito.'
    },
    unflinching: {
        keys: ['Inabalável', 'Unflinching'],
        name: 'Inabalável',
        type: 'buff',
        icon: 'img/modifiers/buffs/Unflinching.png',
        stacks: 1,
        detailed: 'O personagem não será derrubado por ataques normais ou a maioria dos golpes especiais, golpes Blockbusters e Agarrões ainda podem derrubar, Olho-Morto Ignora este Efeito.'
    },

    // --- EFEITOS NEGATIVOS (DEBUFFS) ---
    armor_break: {
        keys: ['Quebra de Armadura', 'Armor Break'],
        name: 'Quebra de Armadura',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/ArmorBreak.png',
        stacks: 1,
        detailed: '+20% dano recebido. Remove Armadura.'
    },
    bleed: {
        keys: ['Sangramento', 'Bleed'],
        name: 'Sangramento',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/Bleed.png',
        stacks: 5,
        scaling: '1% > 2% > 3% > 4% > 5%',
        detailed: 'Remove 1% da Vida Máxima por Segundo até 1 de Vida. Remove Regeneração.'
    },
    cripple: {
        keys: ['Incapacitação', 'Cripple'],
        name: 'Incapacitação',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/Cripple.png',
        stacks: 1,
        detailed: '-20% dano causado. Remove Fúria.'
    },
    curse: {
        keys: ['Maldição', 'Curse'],
        name: 'Maldição',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/Curse.png',
        stacks: 1,
        detailed: 'Impede o ganho de novos Efeitos Positivos.'
    },
    death_mark: {
        keys: ['Marca da Morte', 'Death Mark'],
        name: 'Marca da Morte',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/DeathMark.png',
        stacks: 1,
        detailed: 'Aumenta em +50% o Dano Sofrido por Críticos e reduz em 50% a Capacidade de Bloqueio.'
    },
    doom: {
        keys: ['Destruição', 'Doom'],
        name: 'Destruição',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/Doom.png',
        stacks: 1,
        detailed: 'Morte instantânea ao expirar. Ignora Invencibilidade.'
    },
    fatigue: {
        keys: ['Fadiga', 'Fatigue'],
        name: 'Fadiga',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/Fatigue.png',
        stacks: 1,
        detailed: 'Recarga de Golpes Especiais e Assistência 50% mais lenta, ao expirar tem 50% de chance infligir Atordoamento.'
    },
    guard_break: {
        keys: ['Quebra de Guarda', 'Guard Break'],
        name: 'Quebra de Guarda',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/Guard_Break.png',
        stacks: 5,
        detailed: '10% chance de falhar a Guarda. Remove Bloqueio Automático.'
    },
    heavy_bleed: {
        keys: ['Sangramento Forte', 'Heavy Bleed'],
        name: 'Sangramento Forte',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/HeavyBleed.png',
        stacks: 1,
        detailed: 'Remove 2% da Vida Máxima por Segundo. Remove Regeneração.'
    },
    hex: {
        keys: ['Feitiço', 'Hex'],
        name: 'Feitiço',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/Hex.png',
        stacks: 1,
        detailed: 'Desativa Habilidades Características.'
    },
    immobilize: {
        keys: ['Imobilização', 'Immobilize'],
        name: 'Imobilização',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/Immobilize.png',
        stacks: 1,
        detailed: 'Impede o personagem de se mover (dash).'
    },
    inverse_polarity: {
        keys: ['Polaridade Inversa', 'Inverse Polarity'],
        name: 'Polaridade Inversa',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/InversePolarity.png',
        stacks: 1,
        detailed: 'Cura causa dano.'
    },
    lock_block: {
        keys: ['Desativar Blockbusters', 'Lock Block Buster'],
        name: 'Desativar Blockbusters',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/LockBlock.png',
        stacks: 1,
        detailed: 'Bloqueia o uso de Blockbusters e não permite carregar Blockbusters pendentes.'
    },
    lock_special: {
        keys: ['Desativar Especiais', 'Lock Special'],
        name: 'Desativar Especiais',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/LockSpecial.png',
        stacks: 1,
        detailed: 'Bloqueia o uso de Golpes Especiais, desativa a Recarga dos Golpes Especiais também.'
    },
    lock_tag: {
        keys: ['Desativar Assistência', 'Lock Tag'],
        name: 'Desativar Assistência',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/LockTag.png',
        stacks: 1,
        detailed: 'Bloqueia Assistências e impede a recarga da Assistência.'
    },
    power_surge: {
        keys: ['Oscilação de Energia', 'Power Surge'],
        name: 'Oscilação de Energia',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/PowerSurge.png',
        stacks: 5,
        scaling: '5% > 10% > 15% > 20% > 25%',
        detailed: 'Sofre 5% de dano igual a sua Vida Máxima ao usar Blockbuster.'
    },
    quietus: {
        keys: ['Quietus'],
        name: 'Quietus',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/Quietus.png',
        stacks: 1,
        detailed: 'Ignora Resistência, Resistência Final e Benção.'
    },
    slime: {
        keys: ['Gosma', 'Slime'],
        name: 'Gosma',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/Slime.png',
        stacks: 5,
        scaling: '2% > 4% > 6% > 8% > 10%',
        detailed: 'Sofre 2% de dano igual a sua Vida Máxima ao ganhar EF. POS.'
    },
    slow: {
        keys: ['Lentidão', 'Slow'],
        name: 'Lentidão',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/Slow.png',
        stacks: 5,
        scaling: '-50% > -100% (Acúmulos extras são reserva contra Aceleração)',
        detailed: 'Seus Blockbuster demoram -50% para carregar. Remove Aceleração.'
    },
    stun: {
        keys: ['Atordoamento', 'Stun'],
        name: 'Atordoamento',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/Stun.png',
        stacks: 1,
        detailed: 'Atordoamento impede todas as ações até o efeito expirar.'
    },
    wither: {
        keys: ['Definhar', 'Wither'],
        name: 'Definhar',
        type: 'debuff',
        icon: 'img/modifiers/debuffs/Wither.png',
        stacks: 5,
        scaling: '5% > 10% > 15% > 20% > 25%',
        detailed: 'Remove 5% de Medidor de Blockbuster por segundo.'
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
