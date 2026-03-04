const fs = require('fs');
const path = require('path');

const CHAR_MAP = {
    'annie.json': 'annie',
    'big_band.json': 'big-band',
    'black_dahlia.json': 'black-dahlia',
    'beowulf.json': 'beowulf',
    'cerebella.json': 'cerebella',
    'double.json': 'double',
    'eliza.json': 'eliza',
    'filia.json': 'filia',
    'fukua.json': 'fukua',
    'marie.json': 'marie',
    'ms_fortune.json': 'ms-fortune',
    'parasoul.json': 'parasoul',
    'peacock.json': 'peacock',
    'painwheel.json': 'painwheel',
    'robo_fortune.json': 'robo-fortune',
    'squigly.json': 'squigly',
    'umbrella.json': 'umbrella',
    'valentine.json': 'valentine'
};

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
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) == a.charAt(j - 1)) matrix[i][j] = matrix[i - 1][j - 1];
            else matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
        }
    }
    return matrix[b.length][a.length];
}

function fixJsonMoveNames() {
    const movesJsonPath = path.join(__dirname, '../data/krazete/stanleyDB-moves.json');
    if (!fs.existsSync(movesJsonPath)) {
        console.error('Stanley DB moves file not found');
        return;
    }
    const dbMoves = JSON.parse(fs.readFileSync(movesJsonPath, 'utf8'));

    // Group DB moves by character
    const movesByChar = {};
    for (const [key, move] of Object.entries(dbMoves)) {
        const prefix = key.split('-')[0];
        const charKey = CHAR_PREFIXES[prefix];
        if (!charKey) continue;
        if (!movesByChar[charKey]) movesByChar[charKey] = [];
        movesByChar[charKey].push({
            officialName: move.name,
            lowerName: move.name.toLowerCase().trim()
        });
    }

    const dataDir = path.join(__dirname, '../data');
    const files = fs.readdirSync(dataDir).filter(f => CHAR_MAP[f] || CHAR_MAP[f.replace('-', '_')]);

    files.forEach(file => {
        const filePath = path.join(dataDir, file);
        let charData;
        try {
            charData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } catch (e) {
            console.error(`Error reading ${file}`);
            return;
        }

        const charKey = CHAR_MAP[file] || CHAR_MAP[file.replace('-', '_')];
        const availableMoves = movesByChar[charKey] || [];

        let changedCount = 0;
        let totalVariants = 0;

        if (!charData.variants) return;

        Object.keys(charData.variants).forEach(rarity => {
            charData.variants[rarity].forEach(variant => {
                totalVariants++;
                if (variant.recommended_arsenal) {
                    const moves = variant.recommended_arsenal.split(',').map(m => m.trim());
                    const fixedMoves = moves.map(moveName => {
                        if (!moveName) return "";

                        // Handle manual entries like "Explosão" which are common
                        let cleanMoveName = moveName.replace(/\s*\(expuls[ãa]o\)/i, '')
                            .replace(/\s*\(provocar\)/i, '')
                            .replace(/\s*\(cadeira\)/i, '')
                            .trim();

                        const searchName = cleanMoveName.toLowerCase();

                        let bestMatch = null;
                        let bestDist = Infinity;

                        availableMoves.forEach(dbMove => {
                            const dist = levenshteinDistance(searchName, dbMove.lowerName);
                            if (dist < bestDist) {
                                bestDist = dist;
                                bestMatch = dbMove;
                            }
                        });

                        // Threshold depends on length
                        const threshold = Math.max(2, Math.floor(searchName.length / 3));

                        if (bestMatch && bestDist <= threshold) {
                            // Restore suffixes if they existed
                            let suffix = "";
                            if (moveName.toLowerCase().includes('provocar')) suffix = " (Provocar)";
                            if (moveName.toLowerCase().includes('expulsão')) suffix = " (Expulsão)";
                            if (moveName.toLowerCase().includes('cadeira')) suffix = " (Cadeira)";

                            const newName = bestMatch.officialName + suffix;
                            if (moveName !== newName) {
                                changedCount++;
                                console.log(`[${charKey}] Fixed: "${moveName}" -> "${newName}"`);
                                return newName;
                            }
                        }
                        return moveName;
                    });
                    variant.recommended_arsenal = fixedMoves.join(', ');
                }
            });
        });

        if (changedCount > 0) {
            fs.writeFileSync(filePath, JSON.stringify(charData, null, 4), 'utf8');
            console.log(`Updated ${file}: ${changedCount} name(s) corrected in ${totalVariants} variants.`);
        }
    });
}

fixJsonMoveNames();
