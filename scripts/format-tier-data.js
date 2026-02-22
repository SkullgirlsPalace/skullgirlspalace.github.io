const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../data');
const tierDataPath = path.join(dataDir, 'tier-data.json');

// Get all character json files
const charFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.json') && f !== 'tier-data.json' && f !== 'catalisadores.json');

// Load existing tier data
let existingTierData = {};
try {
    existingTierData = JSON.parse(fs.readFileSync(tierDataPath, 'utf8'));
} catch (e) {
    console.log('No existing tier-data.json found, starting fresh.');
}

const newTierData = {};

charFiles.forEach(file => {
    const charKey = file.replace('.json', '');
    const charData = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));

    newTierData[charKey] = {};

    // Iterate over variants
    if (charData.variants) {
        Object.values(charData.variants).forEach(variantsList => {
            variantsList.forEach(variant => {
                const varName = variant.name;
                const existing = (existingTierData[charKey] && existingTierData[charKey][varName]) || {};

                // Set exactly these 5 columns in this order
                newTierData[charKey][varName] = {
                    pf: existing.pf || 'N/A',
                    parallel: existing.parallel || 'N/A',
                    riftOff: existing.riftOff || 'N/A',
                    riftDef: existing.riftDef || 'N/A'
                };
            });
        });
    }
});

fs.writeFileSync(tierDataPath, JSON.stringify(newTierData, null, 4));
console.log('Successfully formatted tier-data.json');
