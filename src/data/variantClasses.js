/**
 * Defini\u00E7\u00F5es e classifica\u00E7\u00F5es de fun\u00E7\u00E3o (classe) das variantes.
 * \u00DAtil para filtros, tier lists e organiza\u00E7\u00E3o de equipes.
 */

import { getCurrentLanguage } from '../i18n/index.js';

// ── Class names (PT-BR and EN) ──────────────────────────
const CLASS_NAMES_PT = ['Ofensivo', 'Defensivo', 'Suporte de Utilidade', 'Coringa'];
const CLASS_NAMES_EN = ['Offensive', 'Defensive', 'Utility Support', 'Wildcard'];

const CLASS_NAME_PT_TO_EN = {
 'Ofensivo': 'Offensive',
 'Defensivo': 'Defensive',
 'Suporte de Utilidade': 'Utility Support',
 'Coringa': 'Wildcard'
};

const CLASS_NAME_EN_TO_PT = {
 'Offensive': 'Ofensivo',
 'Defensive': 'Defensivo',
 'Utility Support': 'Suporte de Utilidade',
 'Wildcard': 'Coringa'
};

// ── Class icons (keys stay PT-BR internally) ─────────────
export const CLASS_ICONS = {
 "Ofensivo": { icon: "img/modifiers/buffs/Enrage.webp", color: "#ff6d00" },
 "Defensivo": { icon: "img/modifiers/buffs/Armor.webp", color: "#1565c0" },
 "Suporte de Utilidade": { icon: "img/modifiers/buffs/FinalStand.webp", color: "#fdd835" },
 "Coringa": { icon: "img/modifiers/buffs/Deadeye.webp", color: "#9c27b0" }
};

export const CLASS_ORDER = {
 "Ofensivo": 1,
 "Coringa": 2,
 "Defensivo": 3,
 "Suporte de Utilidade": 4
};

// ── Class descriptions (PT-BR and EN) ───────────────────
const CLASS_DESCRIPTIONS_PT = {
 "Ofensivo": "O Personagem Principal do time feito para causar o m\u00E1ximo de dano poss\u00EDvel, geralmente ele ganha efeitos ou inflinge efeitos. \u00DAtil contra personagens Defensivos.",
 "Defensivo": "Personagem que tem alta quantidade de Vida e Habilidades que aumentam a sobreviv\u00EAncia do mesmo, tamb\u00E9m pode ter habilidades punitivas como dano refletido e outros efeitos eficazes contra o opressor.",
 "Suporte de Utilidade": "Personagem que tem habilidades que podem conceder EF. POSITIVOS aos Aliados, EF. NEGATIVOS aos oponentes ou ambos (conceder efeitos e inflingir efeitos). Alguns suportes podem se beneficiar de suas pr\u00F3prias habilidades e entrar em campo para contribuir para o time de diferentes formas.",
 "Coringa": "Personagem que consegue desempenhar em v\u00E1rias fun\u00E7\u00F5es, pode inflingir dano, aplicar efeitos, inflingir efeitos, defender ou at\u00E9 servir como suporte."
};

const CLASS_DESCRIPTIONS_EN = {
 "Ofensivo": "The team's main damage dealer, designed to deal as much damage as possible. Typically gains buffs or inflicts debuffs. Effective against Defensive fighters.",
 "Defensivo": "A fighter with high HP and abilities that increase survivability. May also have punishing abilities like reflect damage and other effects effective against aggressors.",
 "Suporte de Utilidade": "A fighter with abilities that grant BUFFS to allies, inflict DEBUFFS on opponents, or both. Some supports can benefit from their own abilities and contribute to the team in various ways.",
 "Coringa": "A fighter that can perform in multiple roles \u2014 dealing damage, applying buffs or debuffs, defending, or even supporting the team."
};

export const CLASS_DESCRIPTIONS = CLASS_DESCRIPTIONS_PT;

/**
 * Get localized class name
 * @param {string} ptClassName - PT-BR class name
 * @returns {string} Localized class name
 */
export function getLocalizedClassName(ptClassName) {
 if (getCurrentLanguage() === 'en') {
  return CLASS_NAME_PT_TO_EN[ptClassName] || ptClassName;
 }
 return ptClassName;
}

/**
 * Get localized class description
 * @param {string} ptClassName - PT-BR class name
 * @returns {string} Localized class description
 */
export function getLocalizedClassDescription(ptClassName) {
 if (getCurrentLanguage() === 'en') {
  return CLASS_DESCRIPTIONS_EN[ptClassName] || CLASS_DESCRIPTIONS_PT[ptClassName] || '';
 }
 return CLASS_DESCRIPTIONS_PT[ptClassName] || '';
}

/**
 * Get all class names for the current language
 * @returns {string[]} Array of localized class names
 */
export function getLocalizedClassNames() {
 return getCurrentLanguage() === 'en' ? CLASS_NAMES_EN : CLASS_NAMES_PT;
}

/**
 * Translate a localized (possibly EN) class name back to PT-BR for internal lookup
 * @param {string} name - Class name in any language
 * @returns {string} PT-BR class name
 */
export function classNameToPT(name) {
 return CLASS_NAME_EN_TO_PT[name] || name;
}

// Mapeamento de variantes espec\u00EDficas para suas classes prim\u00E1rias e secund\u00E1rias
export const VARIANT_CLASSES = {
 "Rosa Estelar": ["Suporte de Utilidade"],
 "Modelo Submarina": ["Suporte de Utilidade"],
 "Poder Sombrio": ["Defensivo"],
 "Combatente da Liberdade": ["Defensivo"],
 "Pico Bola": ["Suporte de Utilidade"],
 "Homem de Gelo": ["Coringa"],
 "Promotor": ["Suporte de Utilidade"],
 "Favorito dos F\u00E3s": ["Suporte de Utilidade"],
 "Heavy Metal": ["Defensivo"],
 "Banda dos Sonhos": ["Defensivo"],
 "Rodas R\u00EDtmicas": ["Coringa"],
 "G.I. Jazz": ["Defensivo"],
 "Big Baddy": ["Defensivo"],
 "Superjazz": ["Defensivo"],
 "Desarmonizador": ["Defensivo"],
 "Resonant Evil": ["Defensivo"],
 "Ciclone Carmesim": ["Coringa"],
 "Arlequim": ["Suporte de Utilidade"],
 "C\u00E9rebro Gelado": ["Defensivo"],
 "For\u00E7as Armadas": ["Defensivo"],
 "Massa Cinzenta": ["Suporte de Utilidade"],
 "Ressurgente": ["Defensivo"],
 "Sentinela de Pedra": ["Coringa"],
 "H\u00F3stia Profana": ["Coringa"],
 "Fora-da-Lei Marcial": ["Suporte de Utilidade"],
 "Agente Corrosiva": ["Coringa"],
 "Xenamorfa": ["Defensivo"],
 "Fibra Forte": ["Defensivo"],
 "Maldade Eterna": ["Coringa"],
 "Sorvescola": ["Suporte de Utilidade"],
 "Confus\u00E3o Interior": ["Suporte de Utilidade"],
 "Veludo Vermelho": ["Suporte de Utilidade"],
 "Magnata Nobre": ["Suporte de Utilidade"],
 "Cacho M\u00E1gico": ["Coringa"],
 "Escoteira": ["Coringa"],
 "Cachinhos Malvados": ["Defensivo"],
 "Investigadora": ["Suporte de Utilidade"],
 "Quartzo Estelar": ["Suporte de Utilidade"],
 "Imagem Dividida": ["Coringa"],
 "Bela do Inferno": ["Coringa"],
 "C\u00F3pia Aproximada": ["Suporte de Utilidade"],
 "Sem Cora\u00E7\u00E3o": ["Suporte de Utilidade"],
 "Maldade Insana": ["Ofensivo"],
 "Megaloman\u00EDaca": ["Defensivo"],
 "Cavalo Sombrio": ["Suporte de Utilidade"],
 "Octoplasma": ["Suporte de Utilidade"],
 "Encantadora de Serpentes": ["Suporte de Utilidade"],
 "Dama de Honra": ["Suporte de Utilidade"],
 "Briga Fatal": ["Coringa"],
 "Agora e Sempre": ["Defensivo"],
 "Brincadeirinha": ["Defensivo"],
 "Papa-Moscas": ["Coringa"],
 "Neuromancer": ["Coringa"],
 "Festa Macabra": ["Coringa"],
 "Amea\u00E7a Mascarada": ["Coringa"],
 "Vagalume": ["Defensivo"],
 "Frio Mordente": ["Coringa"],
 "Pura Coragem": ["Defensivo"],
 "Resguardada": ["Ofensivo", "Suporte de Utilidade"],
 "Apanhadora de Sonhos": ["Suporte de Utilidade"],
 "\u00CDcone I\u00F4nico": ["Ofensivo"],
 "Velhos Tempos": ["Defensivo"],
 "Intoc\u00E1vel": ["Defensivo"],
 "Chumbinho": ["Suporte de Utilidade"],
 "Esbo\u00E7o": ["Suporte de Utilidade"],
 "Plumagem Prism\u00E1tica": ["Suporte de Utilidade"],
 "Reprise": ["Suporte de Utilidade"],
 "Replicada": ["Defensivo"],
 "Persona Grata": ["Suporte de Utilidade"],
 "Tela Azul": ["Defensivo"],
 "Reviravolta": ["Defensivo"],
 "Frio de Matar": ["Defensivo"],
 "Quebra-Morto": ["Defensivo"],
 "Branca de Medo": ["Defensivo"],
 "Campe\u00E3 dos Campe\u00F5es": ["Suporte de Utilidade"],
 "Angelical": ["Coringa"],
 "Wunderkind": ["Suporte de Utilidade"],
 "Desejo de Morte": ["Coringa"],
 "Isca Sortuda": ["Suporte de Utilidade"],
 "Saqueadora do Pal\u00E1cio": ["Coringa"],
 "Rosinha": ["Suporte de Utilidade", "Defensivo"],
 "Soldado Serafim": ["Suporte de Utilidade"],
 "Pre\u00E7os para Matar": ["Coringa"],
 "Cirurg\u00E3-General": ["Coringa"],
 "Superluminal": ["Suporte de Utilidade"],
 "\u00DAltima Esperan\u00E7a": ["Suporte de Utilidade", "Defensivo"],
 "Mai-s O Qu\u00EA?": ["Coringa"],
 "Matadora Joy": ["Suporte de Utilidade", "Defensivo"],
 "Turno Mortal": ["Coringa"],
 "Quente com Gelo": ["Suporte de Utilidade"],
 "Jaleco": ["Suporte de Utilidade"],
 "Maravilha Eterna": ["Coringa"],
 "Mente Criminosa": ["Coringa"],
 "Megass\u00F4nico": ["Coringa"],
 "Megera Vaporwave": ["Coringa"],
 "Fantoche Sombrio": ["Coringa"],
 "Zona de Buffer": ["Coringa"],
 "Overclocked": ["Coringa"],
 "Ouro Maci\u00E7o": ["Suporte de Utilidade"]
};

/**
 * Retorna as classes de uma variante (sempre em PT-BR para lookup interno).
 * @param {string} variantName
 * @returns {string[]} Array de roles/classes (PT-BR)
 */
export function getVariantClasses(variantName) {
 return VARIANT_CLASSES[variantName] || ["Ofensivo"];
}

/**
 * Retorna as classes de uma variante localizadas para exibi\u00E7\u00E3o.
 * @param {string} variantName
 * @returns {Array<{key: string, localized: string}>} Array de roles/classes com key original e nome localizado
 */
export function getLocalizedVariantClasses(variantName) {
 const classes = getVariantClasses(variantName);
 return classes.map(cls => ({ key: cls, localized: getLocalizedClassName(cls) }));
}
