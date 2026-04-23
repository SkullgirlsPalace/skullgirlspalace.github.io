// =====================================================
// EXCLUSIVE VARIANTS DATA
// Variantes exclusivas e suas fontes de obtenção
// =====================================================

import { getCurrentLanguage } from '../i18n/translations.js';

export const EXCLUSIVE_VARIANTS = {
	// === Gifts ===
	"Confusão Interior": {
		source: "Obtível em Presente Dourado (Social)",
		source_en: "Available from Gold Gift (Social)",
		icon: "img/official/gold_gift.webp",
		category: "Presente",
		category_en: "Gift"
	},
	"Big Baddy": {
		source: "Obtível em Presente Dourado da Guilda",
		source_en: "Available from Guild Gold Gift",
		icon: "img/official/guild_gift.webp",
		category: "Presente",
		category_en: "Gift"
	},

	// === Elemental Relic ===
	"Estrela Virtual": {
		source: "Obtível em Relíquia Elemental (Água)",
		source_en: "Available from Elemental Relic (Water)",
		icon: "img/official/Gacha_ElementalWater.webp",
		category: "Relíquia Elemental",
		category_en: "Elemental Relic"
	},
	"Piro-técnica": {
		source: "Obtível em Relíquia Elemental (Fogo)",
		source_en: "Available from Elemental Relic (Fire)",
		icon: "img/official/Gacha_ElementalFire.webp",
		category: "Relíquia Elemental",
		category_en: "Elemental Relic"
	},
	"Má Sorte": {
		source: "Obtível em Relíquia Elemental (Ar)",
		source_en: "Available from Elemental Relic (Wind)",
		icon: "img/official/Gacha_ElementalAir.webp",
		category: "Relíquia Elemental",
		category_en: "Elemental Relic"
	},
	"Festa Macabra": {
		source: "Obtível em Relíquia Elemental (Luz)",
		source_en: "Available from Elemental Relic (Light)",
		icon: "img/official/Gacha_ElementalLight.webp",
		category: "Relíquia Elemental",
		category_en: "Elemental Relic"
	},
	"Megassônico": {
		source: "Obtível em Relíquia Elemental (Trevas)",
		source_en: "Available from Elemental Relic (Dark)",
		icon: "img/official/Gacha_ElementalDark.webp",
		category: "Relíquia Elemental",
		category_en: "Elemental Relic"
	},

	// === Daily Relic ===
	"Mai-s O Quê?": {
		source: "Obtível em Relíquia Diária (Raro)",
		source_en: "Available from Daily Relic (Rare)",
		icon: "img/official/Gacha_Daily.webp",
		category: "Relíquia Diária",
		category_en: "Daily Relic"
	},

	// === Character Relic ===
	"Favorito dos Fãs": {
		source: "Obtível em Relíquia de Personagem Beowulf (Raro)",
		source_en: "Available from Beowulf Character Relic (Rare)",
		icon: "img/official/Gacha_Char_Beowulf.webp",
		category: "Relíquia de Personagem",
		category_en: "Character Relic"
	},
	"Tritura-Números": {
		source: "Obtível em Relíquia de Personagem Robo-Fortune(Raro)",
		source_en: "Available from Robo-Fortune Character Relic (Rare)",
		icon: "img/official/Gacha_Char_RoboFortune.webp",
		category: "Relíquia de Personagem",
		category_en: "Character Relic"
	},
	"Ouro Maciço": {
		source: "Obtível em Relíquia de Personagem Peacock (Raro)",
		source_en: "Available from Peacock Character Relic (Rare)",
		icon: "img/official/Gacha_Char_Peacock.webp",
		category: "Relíquia de Personagem",
		category_en: "Character Relic"
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
