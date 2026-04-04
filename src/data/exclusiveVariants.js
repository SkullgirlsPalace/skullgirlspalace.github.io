// =====================================================
// EXCLUSIVE VARIANTS DATA
// Variantes exclusivas e suas fontes de obtenção
// =====================================================

export const EXCLUSIVE_VARIANTS = {
    // === Presentes ===
    "Confusão Interior": {
        source: "Obtível em Presente Dourado (Social)",
        icon: "img/official/gold_gift.webp",
        category: "Presente"
    },
    "Big Baddy": {
        source: "Obtível em Presente Dourado da Guilda",
        icon: "img/official/guild_gift.webp",
        category: "Presente"
    },

    // === Relíquia Elemental ===
    "Estrela Virtual": {
        source: "Obtível em Relíquia Elemental (Água)",
        icon: "img/official/Gacha_ElementalWater.webp",
        category: "Relíquia Elemental"
    },
    "Piro-técnica": {
        source: "Obtível em Relíquia Elemental (Fogo)",
        icon: "img/official/Gacha_ElementalFire.webp",
        category: "Relíquia Elemental"
    },
    "Má Sorte": {
        source: "Obtível em Relíquia Elemental (Ar)",
        icon: "img/official/Gacha_ElementalAir.webp",
        category: "Relíquia Elemental"
    },
    "Festa Macabra": {
        source: "Obtível em Relíquia Elemental (Luz)",
        icon: "img/official/Gacha_ElementalLight.webp",
        category: "Relíquia Elemental"
    },
    "Megassônico": {
        source: "Obtível em Relíquia Elemental (Trevas)",
        icon: "img/official/Gacha_ElementalDark.webp",
        category: "Relíquia Elemental"
    },

    // === Relíquia Diária ===
    "Mai-s O Quê?": {
        source: "Obtível em Relíquia Diária (Raro)",
        icon: "img/official/Gacha_Daily.webp",
        category: "Relíquia Diária"
    },

    // === Relíquia de Personagem ===
    "Favorito dos Fãs": {
        source: "Obtível em Relíquia de Personagem Beowulf (Raro)",
        icon: "img/official/Gacha_Char_Beowulf.webp",
        category: "Relíquia de Personagem"
    },
    "Tritura-Números": {
        source: "Obtível em Relíquia de Personagem Robo-Fortune(Raro)",
        icon: "img/official/Gacha_Char_RoboFortune.webp",
        category: "Relíquia de Personagem"
    },
    "Ouro Maciço": {
        source: "Obtível em Relíquia de Personagem Peacock (Raro)",
        icon: "img/official/Gacha_Char_Peacock.webp",
        category: "Relíquia de Personagem"
    }
};

/**
 * Check if a variant is exclusive
 * @param {string} variantName - Variant display name
 * @returns {Object|null} Exclusive data or null
 */
export function getExclusiveData(variantName) {
    return EXCLUSIVE_VARIANTS[variantName] || null;
}
