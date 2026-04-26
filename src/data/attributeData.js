// =====================================================
// ATTRIBUTE DATA
// Definitions, tooltips and detailed explanations for
// all basic attributes in the game
// =====================================================

import { getCurrentLanguage } from '../i18n/translations.js';

/**
 * Attribute definitions keyed by a unique identifier.
 * Each attribute contains:
 * keys - patterns used to match text in recommended builds
 * name - full display name
 * name_en - English display name
 * max - maximum value description
 * summary - one-line game summary (shown on hover)
 * summary_en - English one-line game summary
 * quickTip - one-line quick tip (shown on hover)
 * detailed - full explanation paragraph (shown in detail modal)
 * detailed_en - English full explanation paragraph
 */
export const ATTRIBUTE_DATA = {
  atq: {
    keys: ['ATQ%', 'ATQ'],
    name: '<img loading="lazy" src="img/official/AttackIcon.webp" alt="ATQ" style="width: 24px; vertical-align: middle; margin-right: 6px;"> Ataque',
    name_en: '<img loading="lazy" src="img/official/AttackIcon.webp" alt="ATK" style="width: 24px; vertical-align: middle; margin-right: 6px;"> Attack',
    max: 'Indefinido',
    max_en: 'Undefined',
    summary: 'Ataque é um atributo fundamental para qualquer personagem que precise infligir dano.',
    summary_en: 'Attack is a fundamental attribute for any character that needs to deal damage.',
    detailed: 'O Ataque aumenta o Dano Base do personagem. Ele é essencial, pois fortalece tudo o que o lutador faz: escala com a Taxa de ATQ Crítico e Dano Crítico, e aumenta a eficácia das Fúrias. Além disso, ter mais Ataque aumenta o dano causado pelos seus Golpes Especiais, Blockbusters, Habilidades Características, Astro Convidado e Ataques de Assistência. Contra oponentes com Armadura ou Defesa alta, o Ataque contribui significativamente, embora existam raras exceções onde outros atributos possam ser priorizados.',
    detailed_en: 'Attack increases the character\'s Base Damage. It is essential because it strengthens everything the fighter does: it scales with Crit Rate and Crit Damage, and increases the effectiveness of Blockbusters. Additionally, having more Attack increases the damage dealt by Special Moves, Blockbusters, Signature Abilities, Guest Star, and Assist Attacks. Against opponents with Armor or high Defense, Attack contributes significantly, although there are rare exceptions where other attributes may be prioritized.'
  },
  vd: {
    keys: ['VD%', 'VD', 'Vida%', 'Vida'],
    name: '<img loading="lazy" src="img/official/HealthIcon.webp" alt="Vida" style="width: 24px; vertical-align: middle; margin-right: 6px;"> Vida',
    name_en: '<img loading="lazy" src="img/official/HealthIcon.webp" alt="HP" style="width: 24px; vertical-align: middle; margin-right: 6px;"> Health',
    max: 'Indefinido',
    max_en: 'Undefined',
    summary: 'Vida é um atributo atrelado à sobrevivência, necessário para resistir a grandes quantidades de dano.',
    summary_en: 'Health is an attribute tied to survivability, necessary to withstand large amounts of damage.',
    detailed: 'É o principal atributo para variantes defensivas, suportes ou aquelas que interagem com Vida em suas habilidades. A Vida escala com a Vida Base da Variante, Habilidades Características, Modificadores e Efeitos. Personagens com muita Vida absorvem mais dano ao possuir Barreira (que escala com a Vida Máxima) e recebem mais cura de Regenerações (Vida Base + Vida%). Também aumenta a quantidade de Vida recuperada ao ser revivido.',
    detailed_en: 'It is the primary attribute for defensive variants, supports, or those that interact with Health in their abilities. Health scales with the Variant\'s Base Health, Signature Abilities, Modifiers, and Effects. Characters with high Health absorb more damage when they have Barrier (which scales with Max Health) and receive more healing from Regeneration (Base Health + Health%). It also increases the amount of Health recovered when revived.'
  },
  perfuracao: {
    keys: ['Perfuração'],
    name: 'Perfuração',
    name_en: 'Piercing',
    max: '50%',
    summary: 'Ignora uma porcentagem da DEFESA e da ARMADURA do oponente.',
    summary_en: 'Ignores a percentage of the opponent\'s DEFENSE and ARMOR.',
    detailed: 'É um atributo que aumenta o dano causado contra Defesa e o Efeito Positivo de Armadura. Muito útil para atacar personagens defensivos que, além de possuírem muita Vida, acumulam Defesa. A Perfuração ajuda de forma efetiva a aumentar o dano que você infligirá nessas condições. Sem este atributo, você pode chegar a causar quase nada ou até zero de dano contra certos oponentes.',
    detailed_en: 'It is an attribute that increases damage dealt against Defense and the Armor Buff. Very useful for attacking defensive characters who, besides having high Health, stack Defense. Piercing effectively increases the damage you will inflict in these conditions. Without this attribute, you may deal almost no or even zero damage against certain opponents.'
  },
  defesa: {
    keys: ['Defesa'],
    name: 'Defesa',
    name_en: 'Defense',
    max: '50%',
    summary: 'Diminui os danos recebidos de golpes em um percentual.',
    summary_en: 'Reduces damage taken from hits by a percentage.',
    detailed: 'É um atributo que reduz o dano sofrido por ataques de diferentes tipos. Quando combinado com Armaduras, esse dano recebido pode ser ainda mais reduzido. Vale lembrar que a Perfuração do inimigo consegue diminuir a eficácia da sua Defesa, e o efeito de Olho-Morto ignora totalmente a Defesa.',
    detailed_en: 'It is an attribute that reduces damage taken from different types of attacks. When combined with Armor, the damage taken can be reduced even further. Keep in mind that the enemy\'s Piercing can reduce the effectiveness of your Defense, and the Dead-Eye effect completely ignores Defense.'
  },
  precisao: {
    keys: ['Precisão'],
    name: 'Precisão',
    name_en: 'Accuracy',
    max: '50%',
    summary: 'Aumenta a probabilidade das Habilidades serem ativadas e rebate a Resistência do oponente.',
    summary_en: 'Increases the probability of Abilities activating and counters the opponent\'s Resistance.',
    detailed: 'Este atributo é muito importante para causadores de Efeitos Negativos e personagens com baixas chances de ativar suas Habilidades Características. A Precisão serve para diminuir a Resistência do oponente (que poderia impedir um efeito de ser aplicado). Para personagens e astros convidados que dependem de converter efeitos, infligir efeitos negativos ou ativar habilidades, a Precisão facilita muito a ativação dessas características.',
    detailed_en: 'This attribute is very important for debuffers and characters with low chances of activating their Signature Abilities. Accuracy serves to reduce the opponent\'s Resistance (which could prevent an effect from being applied). For characters and guest stars that rely on converting effects, inflicting debuffs, or activating abilities, Accuracy greatly facilitates triggering these features.'
  },
  resistencia: {
    keys: ['Resistência'],
    name: 'Resistência',
    name_en: 'Resistance',
    max: '50%',
    summary: 'Diminui a probabilidade de sofrer Efeitos Negativos das Habilidades do oponente e rebate a Precisão do oponente.',
    summary_en: 'Reduces the probability of suffering Negative Effects from the opponent\'s Abilities and counters the opponent\'s Accuracy.',
    detailed: 'O atributo reduz a chance de sofrer Efeitos Negativos vindos de diversas fontes, como Habilidades Características, Modificadores, Astros Convidados e na Assistência. É um atributo muito forte para evitar sofrer efeitos prejudiciais e é extremamente útil para defesas, competindo diretamente contra a Precisão do atacante.',
    detailed_en: 'This attribute reduces the chance of suffering Negative Effects from various sources, such as Signature Abilities, Modifiers, Guest Stars, and Assists. It is a very strong attribute for avoiding harmful effects and is extremely useful for defenses, competing directly against the attacker\'s Accuracy.'
  },
  bonus_elem: {
    keys: ['Bônus Elem.', 'Bônus Elemental'],
    name: 'Bônus Elemental',
    name_en: 'Elemental Bonus',
    max: '50%',
    summary: 'Aumenta os danos causados quando em vantagem de Elementos.',
    summary_en: 'Increases damage dealt when having an Elemental advantage.',
    detailed: 'Potencializa o dano do lutador quando ele está em Vantagem Elemental. A regra básica é: Fogo vence Ar, Ar vence Água e Água vence Fogo. Luz e Trevas não possuem desvantagem, ambos ficam em vantagem quando se enfrentam. O elemento Neutro não possui vantagem ou desvantagem.',
    detailed_en: 'Boosts the fighter\'s damage when they have an Elemental Advantage. The basic rule is: Fire beats Wind, Wind beats Water, and Water beats Fire. Light and Dark have no disadvantage — both gain advantage when facing each other. The Neutral element has no advantage or disadvantage.'
  },
  penal_elem: {
    keys: ['Penal. Elem.', 'Penalidade Elemental'],
    name: 'Penalidade Elemental',
    name_en: 'Elemental Penalty',
    max: '0%',
    summary: 'Reduz a perda de dano quando você está em desvantagem de Elementos.',
    summary_en: 'Reduces the damage loss when you are at an Elemental disadvantage.',
    detailed: 'Normalmente, você causa menos dano em desvantagem (exemplo: Ar contra Fogo, Fogo contra Água). Este atributo reduz essa penalidade para que você não perca tanto dano ao atacar, permitindo lutar de igual para igual mesmo em situações desfavoráveis.',
    detailed_en: 'Normally, you deal less damage at a disadvantage (for example: Wind against Fire, Fire against Water). This attribute reduces that penalty so you don\'t lose as much damage when attacking, allowing you to fight on equal footing even in unfavorable situations.'
  },
  reat_assist: {
    keys: ['Reat. Assistência', 'Reativação de Assistência'],
    name: 'Reativação de Assistência',
    name_en: 'Tag Cooldown',
    max: '50%',
    summary: 'Diminui o tempo de reativação para Ataques com Assistência.',
    summary_en: 'Reduces the cooldown for Assist Attacks.',
    detailed: 'Este atributo diminui a velocidade que a Assistência e a troca de personagens demoram para carregar. Quanto maior for a quantidade, mais rápido a assistência do personagem irá carregar, este efeito é apenas para a variante com este atributo, outros aliados que não tiverem reat. assistência não carregaram tão rápido quanto quem possui este atributo mais elevado.',
    detailed_en: 'This attribute reduces the time that Assists and character swaps take to charge. The higher the amount, the faster the character\'s assist will recharge. This effect only applies to the variant with this attribute — other allies without Tag Cooldown will not charge as quickly as the one with a higher value.'
  },
  reat_especial: {
    keys: ['Reat. Especial', 'Reativação Especial'],
    name: 'Reativação Especial',
    name_en: 'Special Cooldown',
    max: '50%',
    summary: 'Diminui o tempo de reativação para Golpes Especiais.',
    summary_en: 'Reduces the cooldown for Special Moves.',
    detailed: 'Os Golpes Especiais do personagem irão carregar mais rápido para serem usados novamente. O nível do golpe já diminui este tempo de carga naturalmente, e este atributo acelera o processo ainda mais.',
    detailed_en: 'The character\'s Special Moves will charge faster to be used again. The move\'s level already reduces this cooldown naturally, and this attribute accelerates the process even further.'
  },
  cap_defesa: {
    keys: ['Cap. Defesa', 'Capacidade de Defesa'],
    name: 'Capacidade de Defesa',
    name_en: 'Block Capacity',
    max: '100%',
    summary: 'Diminui os danos recebidos ao defender em um percentual.',
    summary_en: 'Reduces damage taken when blocking by a percentage.',
    detailed: 'Este atributo diminui o dano sofrido ao bloquear golpes. Quanto maior a quantidade, menos dano a variante sofrerá enquanto estiver defendendo. Vale notar que este efeito de proteção pode ser diminuído por Perfuração e Olho-Morto.',
    detailed_en: 'This attribute reduces the damage suffered when blocking hits. The higher the amount, the less damage the variant will take while blocking. Note that this protective effect can be reduced by Piercing and Dead-Eye.'
  },
  ganho_medidor: {
    keys: ['Ganho Medidor'],
    name: 'Ganho Medidor',
    name_en: 'Meter Gain',
    max: '100%',
    summary: 'Aumenta a taxa de ganho do medidor para Ataques Blockbuster.',
    summary_en: 'Increases the meter gain rate for Blockbuster Attacks.',
    detailed: 'O Blockbuster pode demorar para carregar dependendo do nível dele, o que pode ser frustrante, já que muitas variantes dependem desses ataques. Este atributo aumenta a velocidade desse carregamento: ao infligir dano ou sofrer dano, os Blockbusters ficarão prontos para uso mais rápido.',
    detailed_en: 'Blockbusters can take a while to charge depending on their level, which can be frustrating since many variants rely on these attacks. This attribute increases the charging speed: when dealing or taking damage, Blockbusters will be ready for use faster.'
  },
  taxa_critica: {
    keys: ['Taxa de ATQ Crít.', 'Taxa de Ataque Crítico', 'Taxa de Atq Crítico', 'Taxa de Atq de Crítico'],
    name: 'Taxa de ATQ Crítico',
    name_en: 'Crit Rate',
    max: '100%',
    summary: 'Aumenta a probabilidade de acertar um Golpe Crítico.',
    summary_en: 'Increases the probability of landing a Critical Hit.',
    detailed: 'Define a chance de aumentar o Dano Base do seu personagem no próximo golpe. Este atributo escala com Dano Crítico, Ataque e o efeito de Marca da Morte para causar ainda mais dano.',
    detailed_en: 'Determines the chance to increase your character\'s Base Damage on the next hit. This attribute scales with Crit Damage, Attack, and the Death Mark effect to deal even more damage.'
  },
  dano_crit: {
    keys: ['Dano Crítico'],
    name: 'Dano Crítico',
    name_en: 'Crit Damage',
    max: '200%',
    summary: 'Aumenta o bônus de danos ao acertar um Golpe Crítico.',
    summary_en: 'Increases the damage bonus when landing a Critical Hit.',
    detailed: 'Este atributo é um complemento da Taxa de ATQ Crítico. Enquanto a Taxa aumenta a probabilidade de ocorrer, o Dano Crítico aumenta muito o dano infligido quando o golpe acontece. Ele escala com a Taxa de ATQ Crítico, Ataque e Marca da Morte.',
    detailed_en: 'This attribute complements Crit Rate. While Crit Rate increases the probability of a critical occurring, Crit Damage greatly increases the damage inflicted when the hit lands. It scales with Crit Rate, Attack, and Death Mark.'
  },
  resist_crit: {
    keys: ['Resist. ATQ. Crít.', 'Resistência a Ataque Crítico'],
    name: 'Resistência a Ataque Crítico',
    name_en: 'Crit Resistance',
    max: '100%',
    summary: 'Diminui a chance de receber um Golpe Crítico.',
    summary_en: 'Reduces the chance of receiving a Critical Hit.',
    detailed: 'O atributo diminui a chance de sofrer um golpe crítico vindo do adversário. Se o oponente conseguir acertar o crítico mesmo assim, o dano será o mesmo, mas a frequência com que isso ocorre será drasticamente reduzida.',
    detailed_en: 'This attribute reduces the chance of suffering a critical hit from the opponent. If the opponent still manages to land a critical, the damage will be the same, but the frequency at which it occurs will be drastically reduced.'
  },
  critless: {
    keys: ['Critless', 'critless'],
    name: 'Critless',
    name_en: 'Critless',
    summary: 'Estratégia de não investir em Taxa e Dano Crítico.',
    summary_en: 'A strategy of not investing in Crit Rate and Crit Damage.',
    detailed: 'O conceito de Critless consiste em NÃO melhorar os nós de Taxa Crítica e Dano Crítico na Árvore de Habilidades do personagem. Isso é fundamental para lidar com variantes que punem acertos críticos, como Painwheels com Sangue Frio. Agarrões nunca causam críticos, facilitando essa estratégia.',
    detailed_en: 'The Critless concept consists of NOT upgrading Crit Rate and Crit Damage nodes in the character\'s Skill Tree. This is essential for dealing with variants that punish critical hits, such as Painwheels with Cold Blood. Throws never deal criticals, making this strategy easier.'
  },
  tier_dp_ataque: {
    keys: [],
    name: 'DP Ataque',
    name_en: 'PF Attack Tier',
    summary: 'Classifica o Desempenho para a Disputa Premiada (Ataque).',
    summary_en: 'Ranks performance for Prize Fights (Attack).',
    detailed: 'Classifica o Desempenho da Variante baseando-se em suas Habilidades Características, utilidade em questão de inflingir dano, controle da partida e capacidade de lidar com confrontos mais difíceis.',
    detailed_en: 'Ranks the Variant\'s performance based on its Signature Abilities, damage-dealing utility, match control, and ability to handle tougher encounters.'
  },
  tier_reinos_paralelos: {
    keys: [],
    name: 'Reinos Paralelos',
    name_en: 'Parallel Realms Tier',
    summary: 'Classificação para o modo Reinos Paralelos.',
    summary_en: 'Rating for the Parallel Realms mode.',
    detailed: 'Classifica o Desempenho para o Modo Reinos Paralelos (Sem Dó/Pesadelo), baseando em suas Habilidades Características, já que o modo possui diversos modificadores difíceis de lidar.',
    detailed_en: 'Ranks performance for Parallel Realms mode (No Mercy/Nightmare), based on the Variant\'s Signature Abilities, since the mode features many difficult modifiers to deal with.'
  },
  tier_fenda_ataque: {
    keys: [],
    name: 'Fenda Ataque',
    name_en: 'Rift Attack Tier',
    summary: 'Classificação para o modo Batalhas da Fenda (Ataque).',
    summary_en: 'Rating for Rift Battles mode (Attack).',
    detailed: 'Classifica o Desempenho para os Ataques na Fenda, o modo fica bem mais difícil em níveis mais avançados, então será classificado o desempenho individual da variante para lidar com os requisitos da Fenda, como finalizar rápido, finalizar com blockbuster, combos e etc.',
    detailed_en: 'Ranks performance for Rift Attacks. The mode becomes much harder at advanced levels, so it rates the variant\'s individual performance in handling Rift requirements, such as finishing quickly, finishing with a Blockbuster, combos, and so on.'
  },
  tier_fenda_defesa: {
    keys: [],
    name: 'Fenda Defesa',
    name_en: 'Rift Defense Tier',
    summary: 'Classificação para o modo Batalhas da Fenda (Defesa).',
    summary_en: 'Rating for Rift Battles mode (Defense).',
    detailed: 'Classifica o Desempenho Individual e em Equpe para as Defesas em nós da Fenda, baseando-se o quão difícil é lidar com a Defesa por ter uma forte Habilidade Característica, Habilidade Superior ou Muita Vida. Os Catalisadores e Modificadores podem beneficiar muito bem as Defesas em diferentes contextos, mas por si só se a Variante for Forte o suficiente ela terá um grande impacto defensivo na sua Base ou na Base do Oponente.',
    detailed_en: 'Ranks individual and team performance for Defenses on Rift nodes, based on how difficult the Defense is to deal with due to a strong Signature Ability, Superior Move, or high Health. Catalysts and Modifiers can greatly benefit Defenses in different contexts, but on its own, if the Variant is strong enough, it will have a major defensive impact on your Base or the Opponent\'s Base.'
  }
};

/**
 * Returns a localized view of an attribute.
 * Falls back to PT-BR when English fields are missing.
 * @param {string} key - Attribute key in ATTRIBUTE_DATA
 * @param {string} [lang] - Language code ('pt-BR' or 'en')
 * @returns {object|null} Localized attribute object or null if not found
 */
export function getLocalizedAttribute(key, lang) {
  if (!lang) lang = getCurrentLanguage();
  const attr = ATTRIBUTE_DATA[key];
  if (!attr) return null;
  if (lang === 'pt-BR' || !attr.name_en) return attr;
  return {
    ...attr,
    name: attr.name_en,
    max: attr.max_en || attr.max,
    summary: attr.summary_en || attr.summary,
    detailed: attr.detailed_en || attr.detailed
  };
}

/**
 * Build a lookup map from keyword → attribute key for fast matching.
 * Sorted by key length descending to match longer patterns first.
 * @returns {Array<{pattern: string, attrKey: string}>}
 */
export function getAttributePatterns() {
  const patterns = [];
  for (const [attrKey, attr] of Object.entries(ATTRIBUTE_DATA)) {
    for (const key of attr.keys) {
      patterns.push({ pattern: key, attrKey });
    }
  }
  // Sort by pattern length descending so longer matches take priority
  patterns.sort((a, b) => b.pattern.length - a.pattern.length);
  return patterns;
}
