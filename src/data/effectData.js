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
        name_en: 'Health (HP)',
        type: 'term',
        detailed: 'Representa a saúde do seu lutador. Se chegar a zero, o personagem é derrotado.',
        detailed_en: 'Represents your fighter\'s health. If it reaches zero, the character is defeated.'
    },
    signature_abilities: {
        keys: ['Habilidades Características', 'Habilidade Característica', 'Signature Abilities'],
        name: 'Habilidades Características',
        name_en: 'Signature Abilities',
        type: 'term',
        detailed: 'São as habilidades passivas que tornam cada personagem único no jogo.',
        detailed_en: 'Passive abilities that make each character unique in the game.'
    },
    marquee_abilities: {
        keys: ['Habilidade Superior', 'Habilidades Superiores', 'Marquee Abilities'],
        name: 'Habilidade Superior',
        name_en: 'Marquee Ability',
        type: 'term',
        detailed: 'Uma habilidade poderosa que pode ser escolhida entre duas opções após o personagem atingir seu potencial máximo.',
        detailed_en: 'A powerful ability that can be chosen between two options after the character reaches max potential.'
    },
    special_moves: {
        keys: ['Golpes Especiais', 'Golpe Especial', 'Special Moves'],
        name: 'Golpes Especiais',
        name_en: 'Special Moves',
        type: 'term',
        detailed: 'Diferente dos Blockbusters, os Golpes Especiais recarregam com o tempo (Reativação Especial).',
        detailed_en: 'Unlike Blockbusters, Special Moves recharge over time (Special Cooldown).'
    },
    tag_in: {
        keys: ['Assistência', 'Tag In', 'Ataque de Assistência'],
        name: 'Assistência (Tag In)',
        name_en: 'Tag In',
        type: 'term',
        detailed: 'Permite que um aliado entre na luta realizando um ataque.',
        detailed_en: 'Allows a teammate to enter the fight by performing an attack.'
    },
    buff: {
        keys: ['Efeito Positivo', 'EF. POS.', 'Buff'],
        name: 'Efeito Positivo (EF. POS.)',
        name_en: 'Buff',
        type: 'term',
        detailed: 'Ícones verdes que aparecem acima da barra de vida.',
        detailed_en: 'Green icons that appear above the health bar.'
    },
    debuff: {
        keys: ['Efeito Negativo', 'EF. NEG.', 'Debuff'],
        name: 'Efeito Negativo (EF. NEG.)',
        name_en: 'Debuff',
        type: 'term',
        detailed: 'Ícones vermelhos que aparecem acima da barra de vida.',
        detailed_en: 'Red icons that appear above the health bar.'
    },
    permanent_modifier: {
        keys: ['Modificador Permanente', 'Efeito Permanente', 'Permanent Modifier'],
        name: 'Efeito Permanente',
        name_en: 'Permanent Modifier',
        type: 'term',
        detailed: 'São representados por um brilho ou borda dourada no ícone do efeito.',
        detailed_en: 'Represented by a glow or golden border on the effect icon.'
    },

    // --- EFEITOS POSITIVOS (BUFFS) ---
    armor: {
        keys: ['Armadura', 'Armor'],
        name: 'Armadura',
        name_en: 'Armor',
        type: 'buff',
        color: '#4488ff',
        icon: 'img/modifiers/buffs/Armor.png',
        stacks: 5,
        scaling: '20% > 40% > 60% > 80% > 100%',
        detailed: 'Reduz o dano sofrido em 20%.',
        detailed_en: 'Reduces damage taken by 20%.',
        explicacao: 'Reduz dano em 20%. Removido por Quebra de Armadura.',
        explicacao_en: 'Reduces damage by 20%. Removed by Armor Break.'
    },
    auto_block: {
        keys: ['Bloqueio Automático', 'Auto Block', 'Bloq. Automático'],
        name: 'Bloqueio Automático',
        name_en: 'Auto Block',
        type: 'buff',
        color: '#4488ff',
        icon: 'img/modifiers/buffs/Auto_Block.png',
        stacks: 5,
        scaling: '10% > 20% > 30% > 40% > 50%',
        detailed: '10% de chance de BLOQUEAR automaticamente o próximo GOLPE.',
        detailed_en: '10% chance to automatically BLOCK the next HIT.',
        explicacao: '10% chance de Bloquear Automaticamente. Removido por Quebra de Guarda. Olho-Morto Anula este Efeito.',
        explicacao_en: '10% chance to Auto Block. Removed by Guard Break. Deadeye negates this effect.'
    },
    barrier: {
        keys: ['Barreira', 'Barrier'],
        name: 'Barreira',
        name_en: 'Barrier',
        type: 'buff',
        color: '#888899',
        icon: 'img/modifiers/buffs/Barrier.png',
        stacks: 5,
        scaling: '10% > 20% > 30% > 40% > 50%',
        detailed: 'Ganhe 10% de vida temporária.',
        detailed_en: 'Gain 10% temporary health.',
        explicacao: 'Vida Temporária baseada em 10% da Vida Máxima, basicamente uma Vida adicional.',
        explicacao_en: 'Temporary Health based on 10% of Max Health, essentially additional Health.'
    },
    blessing: {
        keys: ['Benção', 'Blessing'],
        name: 'Benção',
        name_en: 'Blessing',
        type: 'buff',
        color: '#ffdd44',
        icon: 'img/modifiers/buffs/Blessing.png',
        stacks: 5,
        scaling: '20% > 20% > 30% > 40% > 50%',
        detailed: 'RESSUSCITE com 20% de VIDA ao ser DERROTADO.',
        detailed_en: 'RESURRECT with 20% HEALTH when DEFEATED.',
        explicacao: 'Revive com 10% de Vida por acúmulo. Quietus anula este efeito.',
        explicacao_en: 'Revive with 10% Health per stack. Quietus negates this effect.'
    },
    deadeye: {
        keys: ['Olho-Morto', 'Deadeye'],
        name: 'Olho-Morto',
        name_en: 'Deadeye',
        type: 'buff',
        color: '#aa44dd',
        icon: 'img/modifiers/buffs/Deadeye.png',
        stacks: 1,
        detailed: 'Os Ataques ignoram a DEFESA do oponente e não ativam os efeitos de BLOQUEIO AUTOMÁTICO, INABALÁVEL, ESQUIVA e ESPINHOS.',
        detailed_en: 'Attacks ignore opponent\'s DEFENSE and don\'t trigger AUTO BLOCK, UNFLINCHING, EVASION, or THORNS.',
        explicacao: 'Ignora Defesa, Bloqueio Automático, Inabalável, Esquiva e Espinhos.',
        explicacao_en: 'Ignores Defense, Auto Block, Unflinching, Evasion, and Thorns.'
    },
    enrage: {
        keys: ['Fúria', 'Enrage'],
        name: 'Fúria',
        name_en: 'Enrage',
        type: 'buff',
        color: '#ff4444',
        icon: 'img/modifiers/buffs/Enrage.png',
        stacks: 5,
        scaling: '20% > 40% > 60% > 80% > 100%',
        detailed: 'Aumenta o dano em 20%.',
        detailed_en: 'Increases damage dealt by 20%.',
        explicacao: 'Aumenta o Dano em 20%. Remove Incapacitação.',
        explicacao_en: 'Increases Damage by 20%. Removes Cripple.'
    },
    evasion: {
        keys: ['Esquiva', 'Evasão', 'Evasion'],
        name: 'Esquiva',
        name_en: 'Evasion',
        type: 'buff',
        icon: 'img/modifiers/buffs/Evasion.png',
        stacks: 5,
        detailed: 'O próximo GOLPE será esquivado.',
        detailed_en: 'The next HIT will be evaded.',
        explicacao: 'Esquiva de qualquer Ataque. Não Esquiva de Blockbuster Indefensável e Olho-Morto.',
        explicacao_en: 'Evades any Attack. Does not evade Unblockable Blockbusters and Deadeye.'
    },
    final_stand: {
        keys: ['Resistência Final', 'Final Stand'],
        name: 'Resistência Final',
        name_en: 'Final Stand',
        type: 'buff',
        color: '#ffdd44',
        icon: 'img/modifiers/buffs/FinalStand.png',
        stacks: 1,
        detailed: 'Impede a morte.',
        detailed_en: 'Prevents death.',
        explicacao: 'A Vida não cai abaixo de 1 Vida. Bloqueia Destruição. Quietus anula este Efeito.',
        explicacao_en: 'Health cannot drop below 1. Blocks Doom. Quietus negates this effect.'
    },
    haste: {
        keys: ['Aceleração', 'Haste'],
        name: 'Aceleração',
        name_en: 'Haste',
        type: 'buff',
        color: '#aa44dd',
        icon: 'img/modifiers/buffs/Haste.png',
        stacks: 1,
        detailed: 'Aumenta a velocidade de ganho do MEDIDOR DE BLOCKBUSTER em 100%.',
        detailed_en: 'Increases BLOCKBUSTER METER gain rate by 100%.',
        explicacao: '+100% ganho de medidor. Remove Lentidão.',
        explicacao_en: '+100% meter gain. Removes Slow.'
    },
    heavy_regen: {
        keys: ['Regeneração Forte', 'Heavy Regen'],
        name: 'Regeneração Forte',
        name_en: 'Heavy Regen',
        type: 'buff',
        color: '#44cc66',
        icon: 'img/modifiers/buffs/HeavyRegen.png',
        stacks: 1,
        detailed: 'Regenera 2% da VIDA MÁXIMA a cada segundo.',
        detailed_en: 'Regenerates 2% MAX HEALTH every second.',
        explicacao: 'Cura 2% de Vida por segundo. Remove Sangramento.',
        explicacao_en: 'Heals 2% Health per second. Removes Bleed.'
    },
    immunity: {
        keys: ['Imunidade', 'Immunity'],
        name: 'Imunidade',
        name_en: 'Immunity',
        type: 'buff',
        color: '#ffdd44',
        icon: 'img/modifiers/buffs/Immune.png',
        stacks: 1,
        detailed: 'Dá imunidade a todos os EFEITOS NEGATIVOS.',
        detailed_en: 'Grants immunity to all DEBUFFS.',
        explicacao: 'Impede o ganho de novos Efeitos Negativos, Efeitos Negativos já aplicados não serão removidos.',
        explicacao_en: 'Prevents gaining new Debuffs. Already applied Debuffs will not be removed.'
    },
    invincible: {
        keys: ['Invencível', 'Invincible'],
        name: 'Invencível',
        name_en: 'Invincible',
        type: 'buff',
        color: '#ffdd44',
        icon: 'img/modifiers/buffs/Invincible.png',
        stacks: 1,
        detailed: 'Reduz o dano sofrido em 100%.',
        detailed_en: 'Reduces all damage taken by 100%.',
        explicacao: 'Impede dano de todos os golpes, sangramentos, drenagens e reflexão de dano. Não Anula Destruição.',
        explicacao_en: 'Prevents damage from all hits, bleeds, drains, and damage reflection. Does not negate Doom.'
    },
    miasma: {
        keys: ['Miasma'],
        name: 'Miasma',
        name_en: 'Miasma',
        type: 'buff',
        color: '#44cc66',
        icon: 'img/modifiers/buffs/Miasma.png',
        stacks: 5,
        scaling: '1% > 2% > 3% > 4% > 5%',
        detailed: 'Drena 2% de VIDA e MEDIDOR por seg de oponentes próximos.',
        detailed_en: 'Drains 2% HEALTH and METER per second from nearby opponents.',
        explicacao: 'Drena 1% de Vida e Medidor do oponente. Bloqueio de Cura e Polaridade Inversa não impedem a Drenagem de Vida e Blockbuster.',
        explicacao_en: 'Drains 1% Health and Meter from opponent. Heal Block and Inverse Polarity do not prevent draining.'
    },
    precision: {
        keys: ['Precisão', 'Precision'],
        name: 'Precisão',
        name_en: 'Precision',
        type: 'buff',
        color: '#ffdd44',
        icon: 'img/modifiers/buffs/Precision.png',
        stacks: 5,
        detailed: 'Garante que o próximo GOLPE seja CRÍTICO. GOLPES DE PRECISÃO não ativam as HABILIDADES CARACTERÍSTICAS do oponente.',
        detailed_en: 'Guarantees next HIT is a CRITICAL. PRECISION HITS don\'t activate opponent\'s SIGNATURE ABILITIES.',
        explicacao: 'Acerto Crítico garantido e não ativa Habilidades Características.',
        explicacao_en: 'Guaranteed Critical Hit and does not trigger Signature Abilities.'
    },
    regen: {
        keys: ['Regeneração', 'Regen'],
        name: 'Regeneração',
        name_en: 'Regen',
        type: 'buff',
        color: '#44cc66',
        icon: 'img/modifiers/buffs/Regen.png',
        stacks: 5,
        scaling: '1% > 2% > 3% > 4% > 5%',
        detailed: 'Regenera 1% da VIDA MÁXIMA a cada segundo.',
        detailed_en: 'Regenerates 1% MAX HEALTH every second.',
        explicacao: 'Cura 1% de Vida por segundo. Remove Sangramento.',
        explicacao_en: 'Heals 1% Health per second. Removes Bleed.'
    },
    thorns: {
        keys: ['Espinhos', 'Thorns'],
        name: 'Espinhos',
        name_en: 'Thorns',
        type: 'buff',
        color: '#aa44dd',
        icon: 'img/modifiers/buffs/Thorns.png',
        stacks: 5,
        scaling: '20% > 40% > 60% > 80% > 100%',
        detailed: 'Reflita 20% do dano ao agressor.',
        detailed_en: 'Reflect 20% of damage back to the attacker.',
        explicacao: 'Reflete 20% do dano por acúmulo. Olho-Morto ignora este efeito.',
        explicacao_en: 'Reflects 20% damage per stack. Deadeye ignores this effect.'
    },
    unflinching: {
        keys: ['Inabalável', 'Unflinching'],
        name: 'Inabalável',
        name_en: 'Unflinching',
        type: 'buff',
        color: '#ffdd44',
        icon: 'img/modifiers/buffs/Unflinching.png',
        stacks: 1,
        detailed: 'Não reaja a golpes.',
        detailed_en: 'Do not flinch from hits.',
        explicacao: 'O personagem não será derrubado por ataques normais ou a maioria dos golpes especiais, golpes Blockbusters e Agarrões ainda podem derrubar. Olho-Morto Ignora este Efeito.',
        explicacao_en: 'Character won\'t be knocked down by normal attacks or most special moves. Blockbusters and Throws can still knock down. Deadeye ignores this effect.'
    },

    // --- EFEITOS NEGATIVOS (DEBUFFS) ---
    armor_break: {
        keys: ['Quebra de Armadura', 'Armor Break', 'Quebra de Arm.'],
        name: 'Quebra de Armadura',
        name_en: 'Armor Break',
        type: 'debuff',
        color: '#ff4444',
        icon: 'img/modifiers/debuffs/ArmorBreak.png',
        stacks: 1,
        detailed: 'Aumenta o dano sofrido em 20%.',
        detailed_en: 'Increases damage taken by 20%.',
        explicacao: '+20% dano recebido. Remove Armadura.',
        explicacao_en: '+20% damage taken. Removes Armor.'
    },
    bleed: {
        keys: ['Sangramento', 'Bleed'],
        name: 'Sangramento',
        name_en: 'Bleed',
        type: 'debuff',
        color: '#ff4444',
        icon: 'img/modifiers/debuffs/Bleed.png',
        stacks: 5,
        scaling: '1% > 2% > 3% > 4% > 5%',
        detailed: 'Drena 1% da VIDA MÁXIMA da vítima a cada segundo.',
        detailed_en: 'Drains 1% of victim\'s MAX HEALTH every second.',
        explicacao: 'Remove 1% da Vida Máxima por Segundo até 1 de Vida. Remove Regeneração.',
        explicacao_en: 'Removes 1% Max Health per second down to 1 Health. Removes Regen.'
    },
    cripple: {
        keys: ['Incapacitação', 'Cripple'],
        name: 'Incapacitação',
        name_en: 'Cripple',
        type: 'debuff',
        color: '#ff4444',
        icon: 'img/modifiers/debuffs/Cripple.png',
        stacks: 1,
        detailed: 'Reduz o dano infligido em 20%.',
        detailed_en: 'Reduces damage dealt by 20%.',
        explicacao: '-20% dano causado. Remove Fúria.',
        explicacao_en: '-20% damage dealt. Removes Enrage.'
    },
    curse: {
        keys: ['Maldição', 'Curse'],
        name: 'Maldição',
        name_en: 'Curse',
        type: 'debuff',
        color: '#ff4444',
        icon: 'img/modifiers/debuffs/Curse.png',
        stacks: 1,
        detailed: 'Impede de ganhar EFEITOS POSITIVOS.',
        detailed_en: 'Prevents gaining BUFFS.',
        explicacao: 'Impede o ganho de novos Efeitos Positivos.',
        explicacao_en: 'Prevents gaining new Buffs.'
    },
    death_mark: {
        keys: ['Marca da Morte', 'Death Mark'],
        name: 'Marca da Morte',
        name_en: 'Death Mark',
        type: 'debuff',
        color: '#ff4444',
        icon: 'img/modifiers/debuffs/DeathMark.png',
        stacks: 1,
        detailed: 'Aumenta em 50% o dano sofrido por CRÍTICOS e reduz em 50% a CAPACIDADE DE BLOQUEIO.',
        detailed_en: 'Increases CRITICAL damage taken by 50% and reduces BLOCK PROFICIENCY by 50%.',
        explicacao: 'Aumenta em +50% o Dano Sofrido por Críticos e reduz em 50% a Capacidade de Bloqueio.',
        explicacao_en: '+50% Critical damage taken and -50% Block Proficiency.'
    },
    doom: {
        keys: ['Destruição', 'Doom'],
        name: 'Destruição',
        name_en: 'Doom',
        type: 'debuff',
        color: '#ff4444',
        icon: 'img/modifiers/debuffs/Doom.png',
        stacks: 1,
        detailed: 'APÓS X segundos, o lutador afetado é morto.',
        detailed_en: 'After X seconds, the affected fighter is killed.',
        explicacao: 'Morte instantânea ao expirar. Ignora Invencibilidade.',
        explicacao_en: 'Instant death upon expiry. Ignores Invincibility.'
    },
    fatigue: {
        keys: ['Fadiga', 'Fatigue'],
        name: 'Fadiga',
        name_en: 'Fatigue',
        type: 'debuff',
        color: '#ff4444',
        icon: 'img/modifiers/debuffs/Fatigue.png',
        stacks: 1,
        detailed: 'ASSISTÊNCIAS E GOLPES ESPECIAIS levem o dobro do tempo para reativar. Após X segundos, o Lutador atingido tem 50% de chance de ficar ATORDOADO por 2 seg.',
        detailed_en: 'TAG INS and SPECIAL MOVES take twice as long to recharge. After X seconds, the affected Fighter has a 50% chance to become STUNNED for 2 sec.',
        explicacao: 'Recarga de Golpes Especiais e Assistência 50% mais lenta, ao expirar tem 50% de chance infligir Atordoamento.',
        explicacao_en: 'Special Move and Tag In recharge 50% slower. Upon expiry, 50% chance to inflict Stun.'
    },
    guard_break: {
        keys: ['Quebra de Guarda', 'Guard Break'],
        name: 'Quebra de Guarda',
        name_en: 'Guard Break',
        type: 'debuff',
        color: '#ff4444',
        icon: 'img/modifiers/debuffs/Guard_Break.png',
        stacks: 5,
        scaling: '10% > 20% > 30% > 40% > 50%',
        detailed: '10% de chance do bloqueio falhar durante um BLOQUEIO.',
        detailed_en: '10% chance for block to fail during a BLOCK.',
        explicacao: '10% chance de falhar a Guarda. Remove Bloqueio Automático.',
        explicacao_en: '10% chance to fail Guard. Removes Auto Block.'
    },
    heavy_bleed: {
        keys: ['Sangramento Forte', 'Heavy Bleed'],
        name: 'Sangramento Forte',
        name_en: 'Heavy Bleed',
        type: 'debuff',
        color: '#ff4444',
        icon: 'img/modifiers/debuffs/HeavyBleed.png',
        stacks: 1,
        detailed: 'Drena 2% da VIDA MÁXIMA da vítima a cada segundo.',
        detailed_en: 'Drains 2% of victim\'s MAX HEALTH every second.',
        explicacao: 'Remove 2% da Vida Máxima por Segundo. Remove Regeneração.',
        explicacao_en: 'Removes 2% Max Health per second. Removes Regen.'
    },
    hex: {
        keys: ['Feitiço', 'Hex'],
        name: 'Feitiço',
        name_en: 'Hex',
        type: 'debuff',
        color: '#ff4444',
        icon: 'img/modifiers/debuffs/Hex.png',
        stacks: 1,
        detailed: 'HABILIDADES CARACTERÍSTICAS desativadas.',
        detailed_en: 'SIGNATURE ABILITIES disabled.',
        explicacao: 'Desativa Habilidades Características.',
        explicacao_en: 'Disables Signature Abilities.'
    },
    immobilize: {
        keys: ['Imobilização', 'Immobilize'],
        name: 'Imobilização',
        name_en: 'Immobilize',
        type: 'debuff',
        color: '#ff4444',
        icon: 'img/modifiers/debuffs/Immobilize.png',
        stacks: 1,
        detailed: 'Impede o personagem de se mover.',
        detailed_en: 'Prevents the character from moving.',
        explicacao: 'Impede o personagem de se mover.',
        explicacao_en: 'Prevents the character from moving.'
    },
    inverse_polarity: {
        keys: ['Polaridade Inversa', 'Inverse Polarity'],
        name: 'Polaridade Inversa',
        name_en: 'Inverse Polarity',
        type: 'debuff',
        color: '#ff4444',
        icon: 'img/modifiers/debuffs/InversePolarity.png',
        stacks: 1,
        detailed: 'Inverte qualquer tipo de Regeneração e causa dano ao invés de curar.',
        detailed_en: 'Inverts any type of Regeneration, dealing damage instead of healing.',
        explicacao: 'Inverte qualquer tipo de Regeneração e causa dano ao invés de curar.',
        explicacao_en: 'Inverts any type of Regeneration, dealing damage instead of healing.'
    },
    heal_block: {
        keys: ['Bloqueio de Cura', 'Heal Block'],
        name: 'Bloqueio de Cura',
        name_en: 'Heal Block',
        type: 'debuff',
        color: '#ff4444',
        icon: 'img/modifiers/debuffs/HealBlock.png',
        stacks: 1,
        detailed: 'Bloqueia todo tipo de cura.',
        detailed_en: 'Blocks all healing.',
        explicacao: 'Impede o personagem de ser curado.',
        explicacao_en: 'Prevents the character from being healed.'
    },
    lock_block: {
        keys: ['Desativar Blockbusters', 'Lock Block Buster', 'Desativar Blockbuster'],
        name: 'Desativar Blockbusters',
        name_en: 'Blockbuster Lock',
        type: 'debuff',
        color: '#ff4444',
        icon: 'img/modifiers/debuffs/LockBlock.png',
        stacks: 1,
        detailed: 'Desativa BLOCKBUSTER.',
        detailed_en: 'Disables BLOCKBUSTERS.',
        explicacao: 'Bloqueia o uso de Blockbusters e não permite carregar Blockbusters pendentes.',
        explicacao_en: 'Blocks Blockbuster usage and prevents charging pending Blockbusters.'
    },
    lock_special: {
        keys: ['Desativar Especiais', 'Lock Special', 'Desabilitam GOLPES ESPECIAIS'],
        name: 'Desativar Especiais',
        name_en: 'Special Lock',
        type: 'debuff',
        color: '#ff4444',
        icon: 'img/modifiers/debuffs/LockSpecial.png',
        stacks: 1,
        detailed: 'Desativa GOLPES ESPECIAIS.',
        detailed_en: 'Disables SPECIAL MOVES.',
        explicacao: 'Bloqueia o uso de Golpes Especiais e desativa a Recarga dos Golpes Especiais.',
        explicacao_en: 'Blocks Special Move usage and disables Special Move recharge.'
    },
    lock_tag: {
        keys: ['Desativar Assistências', 'Lock Tag', 'Desativar Assistência'],
        name: 'Desativar Assistências',
        name_en: 'Tag Lock',
        type: 'debuff',
        color: '#ff4444',
        icon: 'img/modifiers/debuffs/LockTag.png',
        stacks: 1,
        detailed: 'Desativa ASSISTÊNCIAS.',
        detailed_en: 'Disables TAG INS.',
        explicacao: 'Bloqueia Assistências e impede a recarga da Assistência.',
        explicacao_en: 'Blocks Tag Ins and prevents Tag In recharge.'
    },
    power_surge: {
        keys: ['Oscilação de Energia', 'Power Surge'],
        name: 'Oscilação de Energia',
        name_en: 'Power Surge',
        type: 'debuff',
        color: '#ff4444',
        icon: 'img/modifiers/debuffs/PowerSurge.png',
        stacks: 5,
        scaling: '5% > 10% > 15% > 20% > 25%',
        detailed: 'Sofra dano igual a 5% da VIDA MÁXIMA ao usar um BLOCKBUSTER.',
        detailed_en: 'Take damage equal to 5% MAX HEALTH when using a BLOCKBUSTER.',
        explicacao: 'Sofre 5% de dano igual a sua Vida Máxima ao usar Blockbuster.',
        explicacao_en: 'Takes 5% of Max Health as damage when using a Blockbuster.'
    },
    quietus: {
        keys: ['Quietus'],
        name: 'Quietus',
        name_en: 'Quietus',
        type: 'debuff',
        color: '#ff4444',
        icon: 'img/modifiers/debuffs/Quietus.png',
        stacks: 1,
        detailed: 'A RESITÊNCIA da vítima é ignorada e os efeitos de RESISTÊNCIA FINAL e BENÇÃO são contornados.',
        detailed_en: 'Victim\'s RESISTANCE is ignored and FINAL STAND and BLESSING effects are bypassed.',
        explicacao: 'Ignora Resistência, Resistência Final e Benção.',
        explicacao_en: 'Ignores Resistance, Final Stand, and Blessing.'
    },
    slime: {
        keys: ['Gosma', 'Slime'],
        name: 'Gosma',
        name_en: 'Slime',
        type: 'debuff',
        color: '#ff4444',
        icon: 'img/modifiers/debuffs/Slime.png',
        stacks: 5,
        scaling: '2% > 4% > 6% > 8% > 10%',
        detailed: 'Sofra dano igual a 2% VIDA MÁXIMA sempre que um EF. POSITIVO for recebido.',
        detailed_en: 'Take damage equal to 2% MAX HEALTH whenever a BUFF is received.',
        explicacao: 'Sofre 2% de dano igual a sua Vida Máxima ao ganhar EF. POS.',
        explicacao_en: 'Takes 2% Max Health as damage when gaining a Buff.'
    },
    slow: {
        keys: ['Lentidão', 'Slow'],
        name: 'Lentidão',
        name_en: 'Slow',
        type: 'debuff',
        color: '#ff4444',
        icon: 'img/modifiers/debuffs/Slow.png',
        stacks: 5,
        scaling: '50% > 100% > 150% > 200% > 250%',
        detailed: 'Diminui a velocidade de ganho do MEDIDOR DE BLOCKBUSTER em 50%.',
        detailed_en: 'Decreases BLOCKBUSTER METER gain rate by 50%.',
        explicacao: 'Seus Blockbuster demoram -50% para carregar. Remove Aceleração.',
        explicacao_en: 'Blockbusters take 50% longer to charge. Removes Haste.'
    },
    stun: {
        keys: ['Atordoamento', 'Stun'],
        name: 'Atordoamento',
        name_en: 'Stun',
        type: 'debuff',
        color: '#ff4444',
        icon: 'img/modifiers/debuffs/Stun.png',
        stacks: 1,
        detailed: 'Atordoa a vítima.',
        detailed_en: 'Stuns the victim.',
        explicacao: 'Atordoamento impede todas as ações até o efeito expirar.',
        explicacao_en: 'Stun prevents all actions until the effect expires.'
    },
    wither: {
        keys: ['Definhar', 'Wither'],
        name: 'Definhar',
        name_en: 'Wither',
        type: 'debuff',
        color: '#ff4444',
        icon: 'img/modifiers/debuffs/Wither.png',
        stacks: 5,
        scaling: '5% > 10% > 15% > 20% > 25%',
        detailed: 'Perca 10% a cada segundo no MEDIDOR DE BLOCKBUSTER.',
        detailed_en: 'Lose 10% BLOCKBUSTER METER every second.',
        explicacao: 'Remove 5% de Medidor de Blockbuster por segundo.',
        explicacao_en: 'Removes 5% Blockbuster Meter per second.'
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
