/**
 * Definições e classificações de função (classe) das variantes.
 * Útil para filtros, tier lists e organização de equipes.
 */

export const CLASS_DESCRIPTIONS = {
    "Atacante/Ataque": "Personagem feito para causar dano, ganhar efeitos e infligir efeitos.",
    "Defesa": "Personagem que tem alta quantidade de Vida e habilidades que aumentam a sobrevivência do mesmo, também pode ter habilidades punitivas como dano refletido e outros efeitos eficazes.",
    "Suporte": "Personagem que tem habilidades que ajudem os aliados, seja os curando, aumentando a sobrevivência deles, concedendo efeitos e mais.",
    "Suporte Ofensivo": "Personagem que tem habilidades que ajudam os aliados e inclusive ele mesmo, ele serve para infligir dano, aplicar efeitos e mais."
};

// Mapeamento de variantes específicas para suas classes primárias e secundárias
export const VARIANT_CLASSES = {
    "Rosa Estelar": ["Suporte Ofensivo"],
    "Modelo Submarino": ["Defesa", "Suporte Ofensivo"],
    "Poder Sombrio": ["Defesa"],
    "Combatente da Liberdade": ["Defesa"],
    "Pico Bola": ["Suporte"],
    "Homem de Gelo": ["Suporte Ofensivo"],
    "Promotor": ["Suporte Ofensivo"],
    "Favorito dos Fãs": ["Suporte Ofensivo"],
    "Heavy Metal": ["Defesa"],
    "Banda dos Sonhos": ["Defesa"],
    "Rodas Rítmicas": ["Suporte Ofensivo"],
    "G.I. Jazz": ["Defesa"],
    "Big Baddy": ["Defesa"],
    "Superjazz": ["Defesa"],
    "Desarmonizador": ["Defesa"],
    "Resonant Evil": ["Defesa"],
    "Ciclone Carmesin": ["Defesa"],
    "Arlequim": ["Suporte"],
    "Cérebro Gelado": ["Defesa"],
    "Forças Armadas": ["Defesa"],
    "Massa Cinzenta": ["Suporte"],
    "Ressurgente": ["Defesa"],
    "Sentinela de Pedra": ["Suporte", "Defesa"],
    "Hóstia Profana": ["Defesa", "Suporte"],
    "Fora-da-Lei Marcial": ["Suporte Ofensivo"],
    "Agente Corrosiva": ["Ataque", "Defesa"],
    "Xenamorfa": ["Defesa"],
    "Fibra Forte": ["Defesa"],
    "Maldade Eterna": ["Defesa", "Suporte"],
    "Sorvescola": ["Suporte"],
    "Confusão Interior": ["Suporte"],
    "Veludo Vermelho": ["Suporte Ofensivo"],
    "Magnata Nobre": ["Suporte Ofensivo"],
    "Cacho Mágico": ["Suporte Ofensivo"],
    "Escoteira": ["Defesa"],
    "Cachinhos Malvados": ["Defesa"],
    "Investigadora": ["Suporte"],
    "Quartzo Estelar": ["Suporte Ofensivo"],
    "Imagem Dividida": ["Defesa"],
    "Bela do Inferno": ["Suporte Ofensivo"],
    "Cópia Aproximada": ["Suporte"],
    "Sem Coração": ["Suporte Ofensivo"],
    "Maldade Insana": ["Suporte Ofensivo"],
    "Megalomaníaca": ["Defesa"],
    "Cavalo Sombrio": ["Suporte Ofensivo"],
    "Octoplasma": ["Suporte Ofensivo"],
    "Encantadora de Serpentes": ["Suporte Ofensivo"],
    "Dama de Honra": ["Suporte"],
    "Briga Fatal": ["Defesa"],
    "Agora e Sempre": ["Defesa"],
    "Brincadeirinha": ["Defesa"],
    "Papa-Moscas": ["Ataque", "Defesa"],
    "Neuromancer": ["Ataque", "Defesa"],
    "Festa Macabra": ["Defesa"],
    "Ameaça Mascarada": ["Defesa"],
    "Vagalume": ["Defesa"],
    "Frio Mordente": ["Ataque", "Defesa"],
    "Pura Coragem": ["Defesa"],
    "Resguardada": ["Ataque", "Suporte Ofensivo"],
    "Apanhadora de Sonhos": ["Suporte Ofensivo"],
    "Ícone Iônico": ["Suporte Ofensivo"],
    "Velhos Tempos": ["Defesa"],
    "Intocável": ["Defesa"],
    "Chumbinho": ["Suporte"],
    "Esboço": ["Suporte"],
    "Plumagem Prismática": ["Suporte"],
    "Reprise": ["Suporte"],
    "Replicada": ["Defesa"],
    "Persona Grata": ["Suporte Ofensivo"],
    "Tela Azul": ["Defesa"],
    "Reviravolta": ["Defesa"],
    "Frio de Matar": ["Defesa"],
    "Quebra-Morto": ["Defesa"],
    "Branca de Medo": ["Defesa"],
    "Campeã dos Campeões": ["Suporte"],
    "Angelical": ["Suporte Ofensivo"],
    "Wunderkind": ["Suporte Ofensivo"],
    "Desejo de Morte": ["Ataque", "Defesa"],
    "Isca Sortuda": ["Suporte"],
    "Saqueadora do Palácio": ["Suporte Ofensivo"],
    "Rosinha": ["Suporte", "Defesa"],
    "Soldado Serafim": ["Suporte Ofensivo"],
    "Preços para Matar": ["Defesa"],
    "Cirurgiã-General": ["Suporte Ofensivo"],
    "Superluminal": ["Suporte"],
    "Última Esperança": ["Suporte", "Defesa"],
    "Mai-s O Quê?": ["Suporte"],
    "Matadora Joy": ["Suporte", "Defesa"],
    "Turno Mortal": ["Suporte Ofensivo"],
    "Quente com Gelo": ["Suporte"],
    "Jaleco": ["Suporte"]
};

/**
 * Retorna as classes de uma variante. Se não estiver listada e não for explicitamente
 * classificada como suporte ou defesa, assume-se que é "Ataque" primariamente.
 * @param {string} variantName 
 * @returns {string[]} Array de roles/classes
 */
export function getVariantClasses(variantName) {
    return VARIANT_CLASSES[variantName] || ["Ataque"];
}
