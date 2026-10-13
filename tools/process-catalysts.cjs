const fs = require('fs');
const path = require('path');

function processCatalysts() {
    const embedPath = path.join(__dirname, '../data/catalisadores.json');
    const stanleyPath = path.join(__dirname, '../data/krazete/stanleyDB-catalysts.json');

    const embedData = JSON.parse(fs.readFileSync(embedPath, 'utf8'));
    const stanleyData = JSON.parse(fs.readFileSync(stanleyPath, 'utf8'));

    const stanleyList = Object.values(stanleyData);

    const categories = [];

    if (embedData.categories) {
        for (const cat of embedData.categories) {
            const categoryObj = {
                category: cat.category,
                items: []
            };

            for (const item of cat.items) {
                const name = item.name;
                const constraint = item.constraint || '';

                // Attempt to find it in Stanley DB
                let bestMatch = stanleyList.find(s => s.name.toLowerCase() === name.toLowerCase());
                if (!bestMatch) {
                    bestMatch = stanleyList.find(s => s.name.toLowerCase().includes(name.toLowerCase()));
                }

                let desc = item.description || '';
                let icon = item.icon || '';
                let element = item.element || '';

                if (bestMatch) {
                    const descLines = [];
                    if (bestMatch.ability) descLines.push(`**${bestMatch.ability}**`);
                    if (bestMatch.SA1) descLines.push(bestMatch.SA1);
                    if (bestMatch.SA2) descLines.push(bestMatch.SA2);

                    const newDesc = descLines.join('\n\n');
                    if (!desc || desc.length < (newDesc.length / 2)) {
                        desc = newDesc;
                    }

                    if (!icon) icon = bestMatch.image;
                    if (!element) element = bestMatch.element || '';
                }

                categoryObj.items.push({
                    name: name,
                    constraint: constraint,
                    description: desc,
                    icon: icon,
                    element: element,
                    notes: item.notes || ""
                });
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
