/**
 * Definições e classificações de função (classe) das variantes.
 * Útil para filtros, tier lists e organização de equipes.
 */

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

export const CLASS_DESCRIPTIONS = {
    "Ofensivo": "Personagem feito para causar o máximo de dano possível, ganhar efeitos e infligir efeitos.",
    "Defensivo": "Personagem que tem alta quantidade de Vida e Habilidades que aumentam a sobrevivência do mesmo, também pode ter habilidades punitivas como dano refletido e outros efeitos eficazes contra o opressor.",
    "Suporte de Utilidade": "Personagem que tem habilidades que podem conceder EF. POSITIVOS aos Aliados, EF. NEGATIVOS aos oponentes ou ambos (conceder efeitos e inflingir efeitos). Alguns suportes podem se beneficiar de suas próprias habilidades e entrar em campo para contribuir para o time de diferentes formas.",
    "Coringa": "Personagem que consegue desempenhar em todas as funções, pode inflingir dano, aplicar efeitos, defender ou até servir como suporte."
};

// Mapeamento de variantes específicas para suas classes primárias e secundárias
export const VARIANT_CLASSES = {
    "Rosa Estelar": ["Suporte de Utilidade"],
    "Modelo Submarina": ["Suporte de Utilidade"],
    "Poder Sombrio": ["Defensivo"],
    "Combatente da Liberdade": ["Defensivo"],
    "Pico Bola": ["Suporte de Utilidade"],
    "Homem de Gelo": ["Coringa"],
    "Promotor": ["Suporte de Utilidade"],
    "Favorito dos Fãs": ["Suporte de Utilidade"],
    "Heavy Metal": ["Coringa"],
    "Banda dos Sonhos": ["Coringa"],
    "Rodas Rítmicas": ["Coringa"],
    "G.I. Jazz": ["Defensivo"],
    "Big Baddy": ["Defensivo"],
    "Superjazz": ["Defensivo"],
    "Desarmonizador": ["Defensivo"],
    "Resonant Evil": ["Defensivo"],
    "Ciclone Carmesim": ["Coringa"],
    "Arlequim": ["Suporte de Utilidade"],
    "Cérebro Gelado": ["Defensivo"],
    "Forças Armadas": ["Defensivo"],
    "Massa Cinzenta": ["Suporte de Utilidade"],
    "Ressurgente": ["Defensivo"],
    "Sentinela de Pedra": ["Coringa"],
    "Hóstia Profana": ["Coringa"],
    "Fora-da-Lei Marcial": ["Suporte de Utilidade"],
    "Agente Corrosiva": ["Coringa"],
    "Xenamorfa": ["Defensivo"],
    "Fibra Forte": ["Defensivo"],
    "Maldade Eterna": ["Coringa"],
    "Sorvescola": ["Suporte de Utilidade"],
    "Confusão Interior": ["Suporte de Utilidade"],
    "Veludo Vermelho": ["Suporte de Utilidade"],
    "Magnata Nobre": ["Suporte de Utilidade"],
    "Cacho Mágico": ["Coringa"],
    "Escoteira": ["Coringa"],
    "Cachinhos Malvados": ["Defensivo"],
    "Investigadora": ["Suporte de Utilidade"],
    "Quartzo Estelar": ["Suporte de Utilidade"],
    "Imagem Dividida": ["Coringa"],
    "Bela do Inferno": ["Coringa"],
    "Cópia Aproximada": ["Suporte de Utilidade"],
    "Sem Coração": ["Coringa"],
    "Maldade Insana": ["Coringa"],
    "Megalomaníaca": ["Defensivo"],
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
    "Ameaça Mascarada": ["Coringa"],
    "Vagalume": ["Defensivo"],
    "Frio Mordente": ["Coringa"],
    "Pura Coragem": ["Defensivo"],
    "Resguardada": ["Ofensivo", "Suporte de Utilidade"],
    "Apanhadora de Sonhos": ["Suporte de Utilidade"],
    "Ícone Iônico": ["Ofensivo"],
    "Velhos Tempos": ["Defensivo"],
    "Intocável": ["Defensivo"],
    "Chumbinho": ["Suporte de Utilidade"],
    "Esboço": ["Suporte de Utilidade"],
    "Plumagem Prismática": ["Suporte de Utilidade"],
    "Reprise": ["Suporte de Utilidade"],
    "Replicada": ["Defensivo"],
    "Persona Grata": ["Suporte de Utilidade"],
    "Tela Azul": ["Defensivo"],
    "Reviravolta": ["Defensivo"],
    "Frio de Matar": ["Defensivo"],
    "Quebra-Morto": ["Defensivo"],
    "Branca de Medo": ["Defensivo"],
    "Campeã dos Campeões": ["Suporte de Utilidade"],
    "Angelical": ["Coringa"],
    "Wunderkind": ["Suporte de Utilidade"],
    "Desejo de Morte": ["Coringa"],
    "Isca Sortuda": ["Suporte de Utilidade"],
    "Saqueadora do Palácio": ["Coringa"],
    "Rosinha": ["Suporte de Utilidade", "Defensivo"],
    "Soldado Serafim": ["Suporte de Utilidade"],
    "Preços para Matar": ["Coringa"],
    "Cirurgiã-General": ["Coringa"],
    "Superluminal": ["Suporte de Utilidade"],
    "Última Esperança": ["Suporte de Utilidade", "Defensivo"],
    "Mai-s O Quê?": ["Coringa"],
    "Matadora Joy": ["Suporte de Utilidade", "Defensivo"],
    "Turno Mortal": ["Coringa"],
    "Quente com Gelo": ["Suporte de Utilidade"],
    "Jaleco": ["Suporte de Utilidade"],
    "Maravilha Eterna": ["Coringa"],
    "Mente Criminosa": ["Coringa"],
    "Megassônico": ["Coringa"],
    "Megera Vaporwave": ["Coringa"],
    "Fantoche Sombrio": ["Coringa"],
    "Zona de Buffer": ["Coringa"],
    "Overclocked": ["Coringa"],
    "Mai-s O Quê?": ["Coringa"]
};

/**
 * Retorna as classes de uma variante.
 * @param {string} variantName 
 * @returns {string[]} Array de roles/classes
 */
export function getVariantClasses(variantName) {
    return VARIANT_CLASSES[variantName] || ["Ofensivo"];
}
