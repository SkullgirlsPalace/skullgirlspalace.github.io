// =====================================================
// MOVE IMAGES DATA
// Maps move names to their image paths per character
// =====================================================

const MOVE_IMAGES = {
    "annie": {
        // Annie moves - using images 18-29 (not used by variants)
        "Estilingue Gravitacional": "img/annie/Annie_28.png",
        "Pilar da Criação": "img/annie/Annie_27.png",
        "Pilar da Destruição": "img/annie/Annie_22.png",
        "Raio Sagan": "img/annie/Annie_26.png",
        "Foto Bop": "img/annie/Annie_29.png",
        "Chuva de Meteoros": "img/annie/Annie_25.png",
        "Explosão": "img/annie/Annie_19.png",
        "Corte Crescente": "img/annie/Annie_21.png",
        "Corte Saturno (Expulsão)": "img/annie/Annie_20.png",
        "Nebulosa Refletora (Provocar)": "img/annie/Annie_18.png",
        "Punho do Norte": "img/annie/Annie_23.png",
        "Reentrada": "img/annie/Annie_24.png",
    },
    "beowulf": {
        // Beowulf moves - placeholder, needs mapping
    },
    "big-band": {
        // Big Band moves - placeholder, needs mapping
    },
    "black-dahlia": {
        // Black Dahlia moves - placeholder, needs mapping
    },
    "cerebella": {
        // Cerebella moves - placeholder, needs mapping
    },
    "double": {
        // Double moves - placeholder, needs mapping
    },
    "eliza": {
        // Eliza moves - placeholder, needs mapping
    },
    "filia": {
        // Filia moves - placeholder, needs mapping
    },
    "fukua": {
        // Fukua moves - placeholder, needs mapping
    },
    "marie": {
        // Marie moves - placeholder, needs mapping
    },
    "ms-fortune": {
        // Ms. Fortune moves - placeholder, needs mapping
    },
    "painwheel": {
        // Painwheel moves - placeholder, needs mapping
    },
    "parasoul": {
        // Parasoul moves - placeholder, needs mapping
    },
    "peacock": {
        // Peacock moves - placeholder, needs mapping
    },
    "robo-fortune": {
        // Robo-Fortune moves - placeholder, needs mapping
    },
    "squigly": {
        // Squigly moves - placeholder, needs mapping
    },
    "umbrella": {
        // Umbrella moves - placeholder, needs mapping
    },
    "valentine": {
        // Valentine moves - placeholder, needs mapping
    }
};

/**
 * Get move image path for a character's move
 * @param {string} charKey - Character key (e.g., 'annie', 'big-band')
 * @param {string} moveName - Move name (e.g., 'Pilar da Destruição')
 * @returns {string|null} Path to move image or null if not found
 */
export function getMoveImage(charKey, moveName) {
    if (MOVE_IMAGES[charKey] && MOVE_IMAGES[charKey][moveName]) {
        return MOVE_IMAGES[charKey][moveName];
    }
    return null;
}

export { MOVE_IMAGES };
