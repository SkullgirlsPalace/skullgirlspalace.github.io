// =====================================================
// ATTRIBUTE DATA
// Definitions, tooltips and detailed explanations for
// all basic attributes in the game
// =====================================================

/**
 * Attribute definitions keyed by a unique identifier.
 * Each attribute contains:
 *   keys     - patterns used to match text in recommended builds
 *   name     - full display name
 *   max      - maximum value description
 *   summary  - one-line game summary (shown on hover)
 *   quickTip - one-line quick tip (shown on hover)
 *   detailed - full explanation paragraph (shown in detail modal)
 */
export const ATTRIBUTE_DATA = {
    atq: {
        keys: ['ATQ%', 'ATQ'],
        name: 'ATQ / Ataque',
        max: 'Indefinido',
        summary: 'Ataque é um atributo fundamental para qualquer personagem que precise infligir dano.',
        quickTip: 'Aumenta o Dano de todos os seus golpes, habilidades e astros convidados.',
        detailed: 'O Ataque aumenta o Dano Base do personagem. Ele é essencial, pois fortalece tudo o que o lutador faz: escala com a Taxa de Ataque Crítico e Dano Crítico, e aumenta a eficácia das Fúrias. Além disso, ter mais Ataque aumenta o dano causado pelos seus Golpes Especiais, Blockbusters, Habilidades Características, Astro Convidado e Ataques de Assistência. Contra oponentes com Armadura ou Defesa alta, o Ataque contribui significativamente, embora existam raras exceções onde outros atributos possam ser priorizados.'
    },
    vd: {
        keys: ['VD%', 'VD', 'Vida%', 'Vida'],
        name: 'VD / Vida',
        max: 'Indefinido',
        summary: 'Vida é um atributo atrelado à sobrevivência, necessário para resistir a grandes quantidades de dano.',
        quickTip: 'Define o quanto seu personagem aguenta receber de dano antes de ser derrotado.',
        detailed: 'É o principal atributo para variantes defensivas, suportes ou aquelas que interagem com Vida em suas habilidades. A Vida escala com a Vida Base da Variante, Habilidades Características, Modificadores e Efeitos. Personagens com muita Vida absorvem mais dano ao possuir Barreira (que escala com a Vida Máxima) e recebem mais cura de Regenerações (Vida Base + Vida%). Também aumenta a quantidade de Vida recuperada ao ser revivido.'
    },
    perfuracao: {
        keys: ['Perfuração'],
        name: 'Perfuração',
        max: '50%',
        summary: 'Ignora uma porcentagem da DEFESA e da ARMADURA do oponente.',
        quickTip: 'Ajuda a causar dano contra oponentes com muita Defesa e Armadura.',
        detailed: 'É um atributo que aumenta o dano causado contra Defesa e o Efeito Positivo de Armadura. Muito útil para atacar personagens defensivos que, além de possuírem muita Vida, acumulam Defesa. A Perfuração ajuda de forma efetiva a aumentar o dano que você infligirá nessas condições. Sem este atributo, você pode chegar a causar quase nada ou até zero de dano contra certos oponentes.'
    },
    defesa: {
        keys: ['Defesa'],
        name: 'Defesa',
        max: '50%',
        summary: 'Diminui os danos recebidos de golpes em um percentual.',
        quickTip: 'Reduz o dano direto que você sofre ao ser atingido.',
        detailed: 'É um atributo que reduz o dano sofrido por ataques de diferentes tipos. Quando combinado com Armaduras, esse dano recebido pode ser ainda mais reduzido. Vale lembrar que a Perfuração do inimigo consegue diminuir a eficácia da sua Defesa, e o efeito de Olho-Morto ignora totalmente a Defesa.'
    },
    precisao: {
        keys: ['Precisão'],
        name: 'Precisão',
        max: '50%',
        summary: 'Aumenta a probabilidade das Habilidades serem ativadas e rebate a Resistência do oponente.',
        quickTip: 'Aumenta a chance de ativar Efeitos Negativos e ativar Habilidades contra a Resisttência.',
        detailed: 'Este atributo é muito importante para causadores de Efeitos Negativos e personagens com baixas chances de ativar suas Habilidades Características. A Precisão serve para diminuir a Resistência do oponente (que poderia impedir um efeito de ser aplicado). Para personagens e astros convidados que dependem de converter efeitos, infligir efeitos negativos ou ativar habilidades, a Precisão facilita muito a ativação dessas características.'
    },
    resistencia: {
        keys: ['Resistência'],
        name: 'Resistência',
        max: '50%',
        summary: 'Diminui a probabilidade de sofrer Efeitos Negativos das Habilidades do oponente e rebate a Precisão do oponente.',
        quickTip: 'Protege seu personagem contra efeitos negativos, como maldições e atordoamentos.',
        detailed: 'O atributo reduz a chance de sofrer Efeitos Negativos vindos de diversas fontes, como Habilidades Características, Modificadores, Astros Convidados e na Assistência. É um atributo muito forte para evitar sofrer efeitos prejudiciais e é extremamente útil para defesas, competindo diretamente contra a Precisão do atacante.'
    },
    bonus_elem: {
        keys: ['Bônus Elem.', 'Bônus Elemental'],
        name: 'Bônus Elemental',
        max: '50% (Além do bônus natural)',
        summary: 'Aumenta os danos causados quando em vantagem de Elementos.',
        quickTip: 'Faz sua variante infligir mais dano quando seu elemento está em vantagem.',
        detailed: 'Potencializa o dano do lutador quando ele está em Vantagem Elemental. A regra básica é: Fogo vence Ar, Ar vence Água e Água vence Fogo. Luz e Trevas não possuem desvantagem, ambos ficam em vantagem quando se enfrentam. O elemento Neutro não possui vantagem ou desvantagem.'
    },
    penal_elem: {
        keys: ['Penal. Elem.', 'Penalidade Elemental'],
        name: 'Penalidade Elemental',
        max: 'Até 0% (Reduz a penalidade)',
        summary: 'Reduz a perda de dano quando você está em desvantagem de Elementos.',
        quickTip: 'Impede que seu ataque fique fraco quando você luta contra o elemento errado.',
        detailed: 'Normalmente, você causa menos dano em desvantagem (exemplo: Ar contra Fogo, Fogo contra Água). Este atributo reduz essa penalidade para que você não perca tanto dano ao atacar, permitindo lutar de igual para igual mesmo em situações desfavoráveis.'
    },
    reat_assist: {
        keys: ['Reat. Assistência', 'Reativação de Assistência'],
        name: 'Reativação de Assistência',
        max: '50%',
        summary: 'Diminui o tempo de reativação para Ataques com Assistência.',
        quickTip: 'Permite trocar de personagem e usar a ajuda dos aliados mais rápido.',
        detailed: 'Este atributo diminui a velocidade que a Assistência e a troca de personagens demoram para carregar. Quanto maior for a quantidade, mais rápido a assistência do personagem irá carregar, este efeito é apenas para a variante com este atributo, outros aliados que não tiverem reat. assistência não carregaram tão rápido quanto quem possui este atributo mais elevado.'
    },
    reat_especial: {
        keys: ['Reat. Especial', 'Reativação Especial'],
        name: 'Reativação Especial',
        max: '50%',
        summary: 'Diminui o tempo de reativação para Golpes Especiais.',
        quickTip: 'Faz seus movimentos especiais carregarem mais depressa.',
        detailed: 'Os Golpes Especiais do personagem irão carregar mais rápido para serem usados novamente. O nível do golpe já diminui este tempo de carga naturalmente, e este atributo acelera o processo ainda mais.'
    },
    cap_defesa: {
        keys: ['Cap. Defesa', 'Capacidade de Defesa'],
        name: 'Capacidade de Defesa',
        max: '100%',
        summary: 'Diminui os danos recebidos ao defender em um percentual.',
        quickTip: 'Reduz o dano que você leva enquanto está bloqueando.',
        detailed: 'Este atributo diminui o dano sofrido ao bloquear golpes. Quanto maior a quantidade, menos dano a variante sofrerá enquanto estiver defendendo. Vale notar que este efeito de proteção pode ser diminuído por Perfuração e Olho-Morto.'
    },
    ganho_medidor: {
        keys: ['Ganho Medidor'],
        name: 'Ganho Medidor',
        max: '100%',
        summary: 'Aumenta a taxa de ganho do medidor para Ataques Blockbuster.',
        quickTip: 'Enche a barra do seu Blockbuster mais rápido.',
        detailed: 'O Blockbuster pode demorar para carregar dependendo do nível dele, o que pode ser frustrante, já que muitas variantes dependem desses ataques. Este atributo aumenta a velocidade desse carregamento: ao infligir dano ou sofrer dano, os Blockbusters ficarão prontos para uso mais rápido.'
    },
    taxa_crit: {
        keys: ['Taxa de ATQ Crít.', 'Taxa de Ataque Crítico', 'Taxa de Atq Crítico', 'Taxa de Atq de Crítico'],
        name: 'Taxa de Ataque Crítico',
        max: '100%',
        summary: 'Aumenta a chance de acertar um Golpe Crítico.',
        quickTip: 'Aumenta a frequência dos seus golpes mais fortes (números amarelos).',
        detailed: 'Define a chance de aumentar o Dano Base do seu personagem no próximo golpe. Este atributo escala com Dano Crítico, Ataque e o efeito de Marca da Morte para causar ainda mais dano.'
    },
    dano_crit: {
        keys: ['Dano Crítico'],
        name: 'Dano Crítico',
        max: '200%',
        summary: 'Aumenta o bônus de danos ao acertar um Golpe Crítico.',
        quickTip: 'Aumenta o dano do golpe crítico.',
        detailed: 'Este atributo é um complemento da Taxa de Ataque Crítico. Enquanto a Taxa aumenta a probabilidade de ocorrer, o Dano Crítico aumenta muito o dano infligido quando o golpe acontece. Ele escala com a Taxa de Ataque Crítico, Ataque e Marca da Morte.'
    },
    resist_crit: {
        keys: ['Resist. ATQ. Crít.', 'Resistência a Ataque Crítico'],
        name: 'Resistência a Ataque Crítico',
        max: '100%',
        summary: 'Diminui a chance de receber um Golpe Crítico.',
        quickTip: 'Diminui que o oponente acerte golpes críticos em você.',
        detailed: 'O atributo diminui a chance de sofrer um golpe crítico vindo do adversário. Se o oponente conseguir acertar o crítico mesmo assim, o dano será o mesmo, mas a frequência com que isso ocorre será drasticamente reduzida.'
    }
};

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
