const fs = require('fs');
const path = require('path');

const CHAR_PREFIXES = {
    'an': 'annie',
    'bb': 'big-band',
    'bd': 'black-dahlia',
    'be': 'beowulf',
    'ce': 'cerebella',
    'do': 'double',
    'el': 'eliza',
    'fi': 'filia',
    'fu': 'fukua',
    'ma': 'marie',
    'mf': 'ms-fortune',
    'ms': 'ms-fortune',
    'pa': 'parasoul',
    'pe': 'peacock',
    'pw': 'painwheel',
    'rf': 'robo-fortune',
    'sq': 'squigly',
    'um': 'umbrella',
    'va': 'valentine'
};

// Simple Levenshtein distance for fuzzy matching
function levenshteinDistance(a, b) {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) == a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
                );
            }
        }
    }
    return matrix[b.length][a.length];
}

function processMoves() {
    const movesJsonPath = path.join(__dirname, '../data/krazete/stanleyDB-moves.json');
    const movesImagesPath = path.join(__dirname, '../src/data/movesimages.js');

    const stanleyMoves = JSON.parse(fs.readFileSync(movesJsonPath, 'utf8'));

    // Extract current MOVE_DATA from movesimages.js using regex
    let movesImagesContent = fs.readFileSync(movesImagesPath, 'utf8');
    const moveDataMatch = movesImagesContent.match(/const MOVE_DATA = ({[\s\S]+?});/);
    if (!moveDataMatch) {
        console.error('Could not find MOVE_DATA in movesimages.js');
        return;
    }

    // Convert JS object literal string to JSON
    let moveImagesStr = moveDataMatch[1];
    moveImagesStr = moveImagesStr
        .replace(/(['"])?([a-zA-Z0-9_\-\u00C0-\u017F .!?,]+)(['"])?:/g, '"$2":') // Quote keys
        .replace(/'/g, '"') // Replace single quotes with double
        .replace(/,\s*}/g, '}'); // Remove trailing commas

    let currentMoveImages;
    try {
        currentMoveImages = JSON.parse(moveImagesStr);
    } catch (e) {
        console.error('Failure parsing movesimages.js object literal', e);
        // Fallback: parse it using eval (this is a local build script, so it's acceptable)
        currentMoveImages = eval('(' + moveDataMatch[1] + ')');
    }

    // Group StanleyDB moves by character
    const dbMovesByChar = {};
    for (const [key, move] of Object.entries(stanleyMoves)) {
        const prefix = key.split('-')[0];
        const charKey = CHAR_PREFIXES[prefix];
        if (!charKey) continue;

        if (!dbMovesByChar[charKey]) dbMovesByChar[charKey] = [];

        let type = 'Desconhecido';
        if (move.type && move.type.startsWith('bb')) {
            type = 'Blockbuster';
        } else if (move.type === 'sm') {
            type = 'Golpe Especial';
        }

        let desc = [];
        if (move.ability) desc.push(`**${move.ability}**`);
        if (move.SA1) desc.push(move.SA1);
        if (move.SA2) desc.push(move.SA2);

        dbMovesByChar[charKey].push({
            name: move.name, // The official name in Portuguese
            type: type,
            description: desc.join('\\n\\n'),
            rawName: move.name.toLowerCase().trim()
        });
    }

    // Now map the existing images to the canonical names
    const NEW_MOVE_DATA = {};

    for (const [charKey, charMoves] of Object.entries(currentMoveImages)) {
        NEW_MOVE_DATA[charKey] = {};
        const availableDbMoves = dbMovesByChar[charKey] || [];

        for (const [oldName, imgPath] of Object.entries(charMoves)) {
            // Find best match in availableDbMoves
            const searchName = oldName.toLowerCase().trim()
                .replace(/\s*\(expuls[ãa]o\)/i, '')
                .replace(/\s*\(provocar\)/i, '')
                .trim();

            let bestMatch = null;
            let bestDistance = Infinity;

            for (const dbMove of availableDbMoves) {
                const dist = levenshteinDistance(searchName, dbMove.rawName);
                if (dist < bestDistance) {
                    bestDistance = dist;
                    bestMatch = dbMove;
                }
            }

            if (bestMatch && bestDistance < 10) {
                // Found a match!
                NEW_MOVE_DATA[charKey][bestMatch.name] = {
                    image: imgPath,
                    type: bestMatch.type,
                    description: bestMatch.description
                };
                console.log(`Matched [${charKey}] "${oldName}" -> "${bestMatch.name}"`);
            } else {
                console.log(`[WARNING] No match found for [${charKey}] "${oldName}"`);
                // Keep the old one just in case
                NEW_MOVE_DATA[charKey][oldName] = {
                    image: imgPath,
                    type: 'Desconhecido',
                    description: 'Sem descrição'
                };
            }
        }
    }

    // Format the new movesimages.js output
    let output = `// =====================================================
// MOVE IMAGES DATA
// Maps move names to their details and image paths per character
// Generated from StanleyDB
// =====================================================

const MOVE_DATA = ${JSON.stringify(NEW_MOVE_DATA, null, 4)};

/**
 * Get move data for a character's move
 * @param {string} charKey - Character key (e.g., 'annie', 'big-band')
 * @param {string} moveName - Move name 
 * @returns {Object|null} Move data object or null if not found
 */
export function getMoveData(charKey, moveName) {
    if (MOVE_DATA[charKey]) {
        // Fallback to searching without exact casing or ignoring "(Provocar)"
        const normalizedSearch = moveName.toLowerCase().trim()
            .replace(/\\s*\\(expuls[ãa]o\\)/i, '')
            .replace(/\\s*\\(provocar\\)/i, '');
            
        for (const [key, data] of Object.entries(MOVE_DATA[charKey])) {
            if (key.toLowerCase().trim() === normalizedSearch) {
                return data;
            }
        }
        
        // Return exactly matching key if exists
        if (MOVE_DATA[charKey][moveName]) {
            return MOVE_DATA[charKey][moveName];
        }
    }
    return null;
}

export { MOVE_DATA };
`;

    fs.writeFileSync(movesImagesPath, output, 'utf8');
    console.log('Successfully updated src/data/movesimages.js with Stanley DB data.');
}

processMoves();
