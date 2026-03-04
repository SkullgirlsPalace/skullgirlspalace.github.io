const fs = require('fs');
const path = require('path');

function processCatalysts() {
    const embedPath = path.join(__dirname, '../data/catalisadores.json');
    const stanleyPath = path.join(__dirname, '../data/krazete/stanleyDB-catalysts.json');

    const embedData = JSON.parse(fs.readFileSync(embedPath, 'utf8'));
    const stanleyData = JSON.parse(fs.readFileSync(stanleyPath, 'utf8'));

    const stanleyList = Object.values(stanleyData);

    const categories = [];

    if (embedData.embeds && embedData.embeds[0].fields) {
        for (const field of embedData.embeds[0].fields) {
            const catName = field.name.replace(' ⬇️', '');

            const categoryObj = {
                category: catName,
                items: []
            };

            const rawItems = typeof field.value === 'string' ? [field.value] : field.value;

            for (const line of rawItems) {
                // Example line: "* +AutoImune (Ambos), +Blockbusted (Ambos)"
                let cleanedLine = line.replace(/^\*\s*/, '');

                // Split by comma
                const parts = cleanedLine.split(',').map(p => p.trim());

                for (let part of parts) {
                    if (!part) continue;

                    // Remove the +, =, - symbols
                    part = part.replace(/^[\+\=\-]\s*/, '').replace(/[\+\=\-]/g, '');

                    // Parse "Name (Constraint)"
                    const match = part.match(/^([^\(]+)(?:\((.+)\))?$/);
                    let name = part;
                    let constraint = '';
                    if (match) {
                        name = match[1].trim();
                        constraint = match[2] ? match[2].trim() : '';
                    }

                    // Attempt to find it in Stanley DB
                    let bestMatch = stanleyList.find(s => s.name.toLowerCase() === name.toLowerCase());
                    if (!bestMatch) {
                        // fuzzy matching
                        bestMatch = stanleyList.find(s => s.name.toLowerCase().includes(name.toLowerCase()));
                    }

                    let desc = '';
                    let icon = '';
                    let element = '';
                    if (bestMatch) {
                        const descLines = [];
                        if (bestMatch.SA1) descLines.push(bestMatch.SA1);
                        if (bestMatch.SA2) descLines.push(bestMatch.SA2);
                        desc = descLines.join('\n\n');
                        icon = bestMatch.image;
                        element = bestMatch.element || '';
                    } else {
                        console.warn('Could not find Stanley match for:', name);
                    }

                    categoryObj.items.push({
                        name: name,
                        constraint: constraint,
                        description: desc,
                        icon: icon,
                        element: element,
                        notes: "" // Empty space for user notes
                    });
                }
            }
            categories.push(categoryObj);
        }
    }

    // Save output
    const outData = { categories };
    fs.writeFileSync(embedPath, JSON.stringify(outData, null, 4));
    console.log('Successfully generated new catalisadores.json');
}

processCatalysts();
