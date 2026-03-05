// =====================================================
// ELEMENT EFFECTS DATA
// Per-variant element buff/debuff tables for 5 specific
// variants that grant effects based on element type.
// =====================================================

/**
 * Each entry maps a variant name to its element-based effects.
 * - buffs: object of element → array of buff names (PT-BR)
 * - debuffs: (optional) object of element → array of debuff names (PT-BR)
 *
 * The element icons are resolved from ELEMENT_MAP in constants.js
 */
export const ELEMENT_EFFECTS = {
    "Isca Sortuda": {
        buffs: {
            "Ar": ["Regeneração"],
            "Fogo": ["Inabalável"],
            "Água": ["Aceleração"],
            "Trevas": ["Fúria"],
            "Luz": ["Precisão"],
            "Neutro": ["Barreira"]
        }
    },

    "Íris-Color": {
        buffs: {
            "Ar": ["Regeneração Forte"],
            "Fogo": ["Fúria (x2)"],
            "Água": ["Armadura (x2)"],
            "Trevas": ["Aceleração"],
            "Luz": ["Imunidade"],
            "Neutro": []
        },
        debuffs: {
            "Ar": ["Desativar Blockbusters"],
            "Fogo": ["Sangramento"],
            "Água": ["Incapacitação"],
            "Trevas": ["Bloqueio de Cura"],
            "Luz": ["Feitiço"],
            "Neutro": []
        }
    },

    "Confusão Interior": {
        buffs: {
            "Ar": ["Regeneração"],
            "Fogo": ["Fúria"],
            "Água": ["Armadura"],
            "Trevas": ["Espinhos"],
            "Luz": ["Benção"],
            "Neutro": ["Barreira"]
        }
    },

    "Plumagem Prismática": {
        buffs: {
            "Ar": ["Esquiva", "Regeneração"],
            "Fogo": ["Precisão (x3)", "Fúria"],
            "Água": ["Bloqueio Automático", "Armadura"],
            "Trevas": ["Espinhos", "Aceleração"],
            "Luz": ["Inabalável", "Imunidade"],
            "Neutro": ["Miasma", "Barreira"]
        },
        debuffs: {
            "Ar": ["Sangramento"],
            "Fogo": ["Incapacitação"],
            "Água": ["Quebra de Armadura"],
            "Trevas": ["Definhar"],
            "Luz": ["Polaridade Inversa"],
            "Neutro": ["Feitiço"]
        }
    },

    "Visitante do Espaço": {
        buffs: {
            "Ar": ["Regeneração"],
            "Fogo": ["Fúria"],
            "Água": ["Armadura"],
            "Trevas": ["Espinhos"],
            "Luz": ["Benção"],
            "Neutro": ["Barreira"]
        }
    }
};

/**
 * Check if a variant has element effects data
 * @param {string} variantName - Name of the variant
 * @returns {boolean}
 */
export function hasElementEffects(variantName) {
    return variantName in ELEMENT_EFFECTS;
}

/**
 * Get the element effects for a variant
 * @param {string} variantName - Name of the variant
 * @returns {Object|null}
 */
export function getElementEffects(variantName) {
    return ELEMENT_EFFECTS[variantName] || null;
}
