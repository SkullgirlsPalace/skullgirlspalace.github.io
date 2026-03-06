// =====================================================
// DATA SWITCHER — i18n Data Merge Layer
// Merges English data from stanleyDB onto pt-BR variants
// =====================================================

import { getLang } from '../i18n/i18n.js';
import { elementToEN, elementToPT } from '../config/constants.js';

// Cache the English DB after first load
let englishDBCache = null;

// ── Rarity translation maps ────────────────────────────
const RARITY_PT_TO_EN = {
    'diamante': 'diamond', 'ouro': 'gold', 'prata': 'silver', 'bronze': 'bronze'
};

// ── Complete PT→EN variant name mapping ─────────────────
// Generated from cross-referencing SA descriptions between pt-BR and EN databases.
// This map covers ALL variants, including duplicate-element edge cases.
const VARIANT_NAME_PT_TO_EN = {
    // Annie
    'Rosa Estelar': 'Starlight Rose',
    'Modelo Submarina': 'Model Leader',
    'Brilho das Estrelas': 'Star Shine',
    'Marcas de Fogo': 'Fire Branded',
    'Vínculo de Alma': 'Soulbound',
    'Maravilha Eterna': 'Ageless Wonder',
    'Ondina': 'Wave Warrior',
    'Heroína do Tempo': 'Timeless Hero',
    'Garota Material': 'Materia Girl',
    'Rebelde Cósmica': 'Cosmic Rebel',
    'Princesa da Lua': 'Moonstruck',
    'Ameaça Tripla': 'Triple Threat',
    'Glamour Galático': 'Galactic Glamour',
    'Estrela Ninja': 'Ninja Star',
    'Srta. Mercúrio': 'Miss Mercury',
    'Criança Estelar': 'Star Child',
    'Chama Solar': 'Solar Flair',
    // Beowulf
    'Rei das Feras': 'Beast King',
    'Poder Sombrio': 'Dark Might',
    'Picada de Cobra': 'Snake Bite',
    'Ogros Têm Camadas': 'Ogre Achiever',
    'Combatente da Liberdade': 'Freedom Fighter',
    'Dragão Brigão': 'Dragon Brawler',
    'Praga do Lobo': 'Wulfsbane',
    'Pico Bola': 'Pickle Baller',
    'Último Lutador': 'Weekend Warrior',
    'Homem de Gelo': 'Chill Guy',
    'Lutador X': 'Wrestler X',
    'Número Um': 'Number One',
    'Promotor': 'Hype Man',
    'Favorito dos Fãs': 'Fan Favorite',
    'Alma de Pedra': 'Cold Stones',
    'Lobo Azarão': 'Underdog',
    // Big Band
    'Bandido de Bronze': 'Brass Bandit',
    'Banda dos Sonhos': 'Dream Band',
    'Megassônico': 'Megasonic',
    'Pânico na Cidade': 'Epic Sax',
    'Rodas Rítmicas': 'Rhythm Rider',
    'Detetive "Dick"': 'Private Dick',
    'Ganhando Vantagem': 'One Up',
    'Virtuoso Vintage': 'Vintage Virtuoso',
    'Robocópia': 'Robocopy',
    'Desarmonizador': 'Treble Maker',
    'Batidas Rítmicas': 'Beat Box',
    'Superjazz': 'Bassline',
    'G.I. Jazz': 'G.I. Jazz',
    // Black Dahlia
    'Hóstia Profana': 'Unholy Host',
    'Pele Elegante': 'Fur Monger',
    'Calibre Mágico': 'Hex Caliber',
    'Carregada': "Locked 'N' Loaded",
    'Agente Corrosiva': 'Corrosive Agent',
    'Fora-da-Lei Marcial': 'Martial Outlaw',
    'Imperturbável': 'Unfazed',
    'Psicomandante': 'Psycommander',
    'Estelar': 'Stellar Huntress',
    'Violência Vermelha': 'Red Rider',
    'Máquina Mortífera': 'Lethal Weapon',
    'Esmaga-Alma': 'Soul Crusher',
    'Perigo Biológico': 'Biohazard',
    'Gatilho Nervoso': 'Trigger Happy',
    'Pistola Dourada': 'Golden Gunner',
    // Cerebella
    'Estrelada': 'Star-Spangled',
    'Mão Pesada': 'Heavy Handed',
    'Ciclone Carmesim': 'Crimson Cyclone',
    'Assustadora': 'Scare Giver',
    'Arlequim': 'Harlequin',
    'Blitz e Glamour': 'Blitz & Glamour',
    'Cérebro Gelado': 'Brain Freeze',
    'Forças Armadas': 'Armed Forces',
    'Mente Criminosa': 'Criminal Mind',
    'Massa Cinzenta': 'Gray Matter',
    'Guerreira Toad': 'Toad Warrior',
    'Ressurgente': 'Big Top',
    'Sentinela de Pedra': 'Stone Sentinel',
    'Substituta': 'Understudy',
    'Cabeça Dura': 'Headstrong',
    // Double
    'Criatura de Hábito': 'Creature of Habit',
    'Coração da Escuridão': 'Heart of Darkness',
    'Quebra-Queixo': 'Jawbreaker',
    'Altar Ego': 'Alter Ego',
    'Grande Mãe': 'Grand Mother',
    'Teoria do Caos': 'Chaos Theory',
    'Maldade Eterna': 'Evergreen Evil',
    'Fibra Forte': 'Immoral Fiber',
    'Íris-Color': 'Rainbow Blight',
    'Xenamorfa': 'Xenomorph',
    'Bruxa do Mar': 'Sea Witch',
    'Tirana do Templo': 'Temple Tyrant',
    'Chicleteira': 'Doublicious',
    'Misticatástrofe': 'Myst-Match',
    'Pecado da Serpente': 'Serpent Sin',
    'Freirarteira': 'Nunsense',
    'Sorvescola': 'Sundae School',
    // Eliza
    'Múmia Querida': 'Mummy Dearest',
    'Don Passione': 'Passion Icon',
    'A Vampira': 'Stand Out',
    'Senhor das Trevas': 'Dark Lord',
    'Veludo Vermelho': 'Red Velvet',
    'Magnata Nobre': 'Noble Mogul',
    'Intervenção da Diva': 'Diva Intervention',
    'Confusão Interior': 'Inner Pieces',
    'Lazulita': 'Lapis Luxury',
    'Banho de Sangue': 'Bloodbath',
    'Sombria': 'Tomb & Gloom',
    'Amor Sangrento': 'Bloody Valentine',
    'Víbora Escarlate': 'Scarlet Viper',
    'Sombruma': 'Nightshade',
    'Rainha do Nilo': 'In Denile',
    'Decifrada': 'Decrypted',
    // Filia
    'Cisalhamento': 'Shear Force',
    'Matadora de Aula': 'Class Cutter',
    'Borrão Azul': 'Blue Streak',
    'Escoteira': 'Curl Scout',
    'Cachinhos Malvados': 'Dread Locks',
    'Trança Parasita': 'Parasite Weave',
    'Estrela Virtual': 'Idol Threat',
    'Cabelos ao Vento': 'Windswept',
    'Cacho Mágico': 'Magicurl',
    'Quartzo Estelar': 'Rock Star',
    'Frio Cortante': 'Bad Ms Frosty',
    'Cabelo Rebelde': 'Hair Apparent',
    'Investigadora': 'Clue Chaser',
    'Descabelada': 'Bad Hair Day',
    'Pontas Duplas': 'Frayed Ends',
    // Fukua
    'Imagem Dividida': 'Splitting Image',
    'Complexo de Pico': 'Apex Complex',
    'Fantoche Sombrio': 'Shadow Puppet',
    'Demônio dos Sonhos': 'Dream Demon',
    'Eco de Estrela': 'Idol Echo',
    'Bordas Forradas': 'Feathered Edges',
    'Terror Noturno': 'Night Terror',
    'Megera Vaporwave': 'Vaporwave Vixen',
    'Bela do Inferno': "Hell's Belle",
    'Fios Fantasmas': 'Phantom Threads',
    'Virada do Camaleão': 'Chameleon Twist',
    'Chuva Sombria': 'Rain Shadow',
    'Irmãs de Alma': 'Souls Sister',
    'Falsa Temida': 'Feared Faux',
    'Cópia Aproximada': 'Rough Copy',
    'Gêmeo Infernal': 'Infernal Twin',
    // Marie
    'Megalomaníaca': 'Megalomaniac',
    'Sem Coração': 'Heartless',
    'Maldade Insana': 'Mad Malice',
    'Octoplasma': 'Octoplasm',
    'Coveira': 'Gravedigger',
    'Aspiradora de Fantasmas': 'Phantom Wrangler',
    'A Todo Custo': 'Gust Buster',
    'Ceifadora Sorridente': 'Grin Reaper',
    'Cavalo Sombrio': 'Dark Horse',
    'Dama de Honra': 'Maid of Honor',
    'Encantadora de Serpentes': 'Snake Charmer',
    'Abóbora Fantasma': 'Jack-O-Specter',
    'Domadora de Fantasmas': 'Bone Belle',
    'Osso Puro': 'Bare Bones',
    'Maga Marrenta': 'Moody Magus',
    'Maga da Undying': 'Undying Warrior',
    // Ms. Fortune
    'Stalker de Vento': 'Wind Stalker',
    'Soldado de Infantaria': 'Foot Soldier',
    'Fúria Felpuda': 'Furry Fury',
    'Biscoito da Sorte': 'Fortune Cookie',
    'Briga Fatal': 'Fatal Fray',
    'Agora e Sempre': 'Meow & Furever',
    'Miau e Ordem': 'Claw & Order',
    'Ladra de Tempo': 'Time Thief',
    'Agente Trapaçeira': 'Rogue Agent',
    'Corta e Afoga': "Hack n' Splash",
    'Terripeluda': 'Furmidable',
    'Gata Negra': 'Purrfect Dark',
    'Sra. Jurada': 'Ms. Trial',
    'Sorte Felina': 'Feline Lucky',
    'Remendada': 'Patched Up',
    'Brincadeirinha': 'Just Kitten',
    'Gata do Inferno': 'Hellcat',
    // Painwheel
    'Escaladora de Paredes': 'Web Crawler',
    'Ameaça Mascarada': 'Masked Menace',
    'Papa-moscas': 'Fly Trap',
    'Papa-Moscas': 'Fly Trap',
    'Vagalume': 'Firefly',
    'Frio Mordente': 'Biting Cold',
    'Gênese': 'Raw Nerv',
    'Festa Macabra': 'Grim Fan',
    'Tirania': 'Tyrannical',
    'Corta-diversão': 'Buzzkill',
    'Jovem Fúria': 'Rage Appropriate',
    'Motor de Sangue': 'Blood Drive',
    'Sexta Esquisita': 'Freaky Friday',
    'Serrada ao Meio': 'Sawed Apart',
    'Enferrujada': 'Rusty',
    'Pura Coragem': 'Twisted Mettle',
    // Parasoul
    'Ruiva Fatal': 'Risky Ginger',
    'Atração Fatal': 'Bombshell',
    'Salgada': 'Summer Salt',
    'Bela do Bar': 'Locked In',
    'The Legend of Parasoul': 'High Ruler',
    'Indômita': 'Indomitable',
    'Orgulho Real': 'Princess Pride',
    'Má Sorte': 'Star-Crossed',
    'Loura Real': 'Regally Blonde',
    'Varia': 'Primed',
    'Matrona de Ferro': 'Iron Matron',
    'Operações Sombrias': 'Shadow Ops',
    'Voo da Garça': 'No Egrets',
    'Hera Uma Vez': 'Ivy League',
    'Fã do Perigo': 'Danger-Prone',
    'Resguardada': 'Sheltered',
    'Reinado Duro': 'Heavy Reign',
    // Peacock
    'Fica Frio': 'Freeze Frame',
    'Apanhadora De Sonhos': 'Dream Catcher',
    'Quebra de Contrato': 'Deal Breaker',
    'Intocável': 'Untouchable',
    'Velhos Tempos': "That's All Folks!",
    'Prodígio Primitivo': 'Primal Prodigy',
    'Ultraviolenta': 'Ultraviolent',
    'A Malvada': 'Mean One',
    'Ícone Iônico': 'Ionic Icon',
    'Supercuringa': 'Wildcard',
    'Plumagem Prismática': 'Prism Plumage',
    'Cara Pintada': 'Inkling',
    'Chumbinho': 'Pea Shooter',
    'Reprise': 'Rerun',
    'Esboço': 'Sketchy',
    // Robo-Fortune
    'Replicada': 'Reimaged',
    'Pulso de Prótons': 'Proton Pulse',
    'Zona de Buffer': 'Buffer Zone',
    'Tela Azul': 'Blue Screen',
    'Terror Byte': 'Terror Byte',
    'Persona Grata': 'Persona Assistant',
    'Dupla Exposição': 'Double Exposure',
    'Caça-cabeças': 'Head Hunter',
    'Tritura-Números': 'Number Cruncher',
    'Bombardeiro Azul': 'Blue Bomber',
    'Nyanotec': 'Nyanotech',
    'Protetor Vetor': 'Vector Protector',
    'Ronrominador': 'Purrminator',
    'Protótipo': 'Prototype',
    'M-1AU': 'M-3OW',
    // Squigly
    'Reviravolta': 'Plot Twisted',
    'Lovecraftiana': 'Love Crafted',
    'Perigo Mortal': 'Grave Danger',
    'Ghoul Glacial': 'Glacial Ghoul',
    'Frio de Matar': 'Dead of Winter',
    'Bioexorcista': 'Bio-Exorcist',
    'Thriller': 'Thrill Shrieker',
    'Sopro da Morte': 'Poltergust',
    'Artista Demônio': 'Demon Artist',
    'Roendo as Unhas': 'Nail Biter',
    'Verde Gangrena': 'Gang Green',
    'Semimorta': 'Nearly Departed',
    'Morta de Calor': 'Dead Heat',
    'Quebra-Morto': 'Necrobreaker',
    'Medo do Palco': 'Stage Fright',
    'Branca de Medo': 'Scared Stiff',
    // Umbrella
    'Desejo de Morte': 'Death Wish',
    'Campeã dos Campeões': 'Raining Champ',
    'Artista Ilusionista': 'Eager Deceiver',
    'Angelical': 'Angel Maker',
    'Maruja dos Sete Mares': 'Tidal Traveler',
    'Visitante do Espaço': 'Space Case',
    'Saqueadora do Palácio': 'Palace Plunderer',
    'Wunderkind': 'Wunderkind',
    'Psicriança': 'Psykid',
    'Isca Sortuda': 'Lucky Lure',
    'Rosinha': 'Rose-Tinted',
    'Pirata de Poça': 'Puddle Pirate',
    'Mordida Doce': 'Candy Crusher',
    'Criança Selvagem': 'Wild Child',
    'Pitada de Raiva': 'Salty',
    'Vento Ventania': 'Fresh Heir',
    // Valentine
    'Preços para matar': "Assassin's Greed",
    'Soldado Serafim': 'Seraph Soldier',
    'Negócio Sangrento': 'Wetwork',
    'Très Chic': 'Très Chic',
    'Perto da Morte': 'Near Death',
    'Última Esperança': 'Last Hope',
    'Piro-técnica': 'Pyro-Technique',
    'Morro Quieto': 'Silent Kill',
    'Presa Final': 'Final Fang',
    'Cirurgiã-General': 'Surgeon General',
    'Superluminal': 'Superluminal',
    'Turno Mortal': 'Graveyard Shift',
    'Matadora Joy': 'Kill Joy',
    'Mai-s O Quê?': 'Oh Mai',
    'Hallow – Demônio': 'Hallow Fiend',
    'Jaleco': 'Scrub',
    'Quente com Gelo': 'Icy Hot',
};

// ── stanleyDB character key extraction ──────────────────
// stanleyDB uses Discord emoji prefixes like "<:sp_an:767922687204524032> Annie"
function extractCharacterName(raw) {
    if (!raw) return '';
    return raw.replace(/<:[^>]+>\s*/g, '').trim();
}

// Map from our charKey slugs to stanleyDB character names
const CHARKEY_TO_STANLEY = {
    'annie': 'Annie',
    'beowulf': 'Beowulf',
    'big-band': 'Big Band',
    'black-dahlia': 'Black Dahlia',
    'cerebella': 'Cerebella',
    'double': 'Double',
    'eliza': 'Eliza',
    'filia': 'Filia',
    'fukua': 'Fukua',
    'marie': 'Marie',
    'ms-fortune': 'Ms. Fortune',
    'painwheel': 'Painwheel',
    'parasoul': 'Parasoul',
    'peacock': 'Peacock',
    'robo-fortune': 'Robo-Fortune',
    'squigly': 'Squigly',
    'umbrella': 'Umbrella',
    'valentine': 'Valentine'
};

/**
 * Load the English DB (stanleyDB_ENGLISH.json)
 * @returns {Promise<Object>} The English database keyed by slug
 */
async function loadEnglishDB() {
    if (englishDBCache) return englishDBCache;

    try {
        const res = await fetch('data/krazete/stanleyDB_ENGLISH.json');
        englishDBCache = await res.json();
        console.log(`[i18n] English DB loaded: ${Object.keys(englishDBCache).length} variants`);
        return englishDBCache;
    } catch (err) {
        console.warn('[i18n] Could not load English DB:', err);
        return {};
    }
}

/**
 * Build a lookup index: EN variant name → stanleyDB entry
 * @param {string} charKey - Our character key slug
 * @param {Object} enDB - The loaded stanleyDB_ENGLISH data
 * @returns {Object} Map of EN variant name → stanleyDB entry
 */
function buildVariantIndex(charKey, enDB) {
    const stanleyCharName = CHARKEY_TO_STANLEY[charKey];
    if (!stanleyCharName) return {};

    const byName = {};

    for (const [slug, entry] of Object.entries(enDB)) {
        const entryChar = extractCharacterName(entry.character);
        if (entryChar !== stanleyCharName) continue;

        byName[entry.name] = { slug, ...entry };
    }

    return byName;
}

/**
 * Apply English translations to a single character's data
 * Uses the comprehensive PT→EN name mapping for deterministic matching
 * @param {string} charKey - Character key
 * @param {Object} charData - Character data (from the pt-BR JSON)
 * @param {Object} enDB - The loaded stanleyDB_ENGLISH data
 * @returns {Object} The charData with English overlays
 */
function applyEnglishToCharacter(charKey, charData, enDB) {
    if (!charData?.variants) return charData;

    const enByName = buildVariantIndex(charKey, enDB);
    const stanleyCharName = CHARKEY_TO_STANLEY[charKey];

    // Translate character display name
    if (charKey === 'black-dahlia') {
        charData.character = 'Black Dahlia';
    }

    // For each rarity tier in our data
    for (const [rarityPT, variants] of Object.entries(charData.variants)) {
        for (let i = 0; i < variants.length; i++) {
            const variant = variants[i];
            const ptName = variant.name;
            const ptElement = variant.element; // e.g. 'Fogo'

            // Look up the EN name from our comprehensive map
            const enName = VARIANT_NAME_PT_TO_EN[ptName];

            if (!enName) {
                // No mapping found — keep PT name, but still translate element
                variant.name_original = variant.name;
                variant.element = elementToEN(ptElement);
                continue;
            }

            // Find the matching stanleyDB entry by EN name
            const match = enByName[enName];

            // Save original PT name for image/tier lookups
            variant.name_original = ptName;
            variant.name = enName;
            variant.element = elementToEN(ptElement);

            // Overlay SA description from stanleyDB
            if (match && (match.SA1 || match.SA2)) {
                const saName = match.ability || variant.signature_ability?.name || '';
                let saDesc = '';
                if (match.SA1) saDesc += `[SA 1]: ${match.SA1}`;
                if (match.SA2) saDesc += `\n\n[SA 2]: ${match.SA2}`;
                if (match.SA3) saDesc += `\n\n[SA 3]: ${match.SA3}`;
                if (match.SA4) saDesc += `\n\n[SA 4]: ${match.SA4}`;
                if (match.SA5) saDesc += `\n\n[SA 5]: ${match.SA5}`;

                variant.signature_ability = {
                    name: saName,
                    description: saDesc
                };
            }
        }
    }

    return charData;
}

/**
 * Apply English translations to all character data
 * Called after loadAllCharacters when lang=en
 * @param {Object} characters - Object keyed by charKey with character data
 * @returns {Promise<Object>} Characters with English overlays
 */
export async function applyEnglishData(characters) {
    if (getLang() !== 'en') return characters;

    const enDB = await loadEnglishDB();
    if (!enDB || Object.keys(enDB).length === 0) return characters;

    // Deep clone to avoid mutating the original cache
    const translated = JSON.parse(JSON.stringify(characters));

    for (const charKey of Object.keys(translated)) {
        applyEnglishToCharacter(charKey, translated[charKey], enDB);
    }

    return translated;
}

/**
 * Apply English translation to a single character
 * @param {string} charKey - Character key
 * @param {Object} charData - Character data
 * @returns {Promise<Object>} Character with English overlays
 */
export async function applyEnglishToSingleCharacter(charKey, charData) {
    if (getLang() !== 'en') return charData;

    const enDB = await loadEnglishDB();
    if (!enDB || Object.keys(enDB).length === 0) return charData;

    const translated = JSON.parse(JSON.stringify(charData));
    return applyEnglishToCharacter(charKey, translated, enDB);
}
