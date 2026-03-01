const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

let changes = 0;

for (const file of files) {
    const filePath = path.join(dataDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Fix missing commas after !, ?, -, or ) when followed immediately by uppercase or another word.
    // E.g. "Vai, George!BANG" -> "Vai, George!, BANG"
    // E.g. "(Expulsão)Dia" -> "(Expulsão), Dia"
    // Be careful with !, ?, - inside actual move names.
    // Actually, it's safer to just replace specific known concatenated patterns.
    // Or better, regex: replace /([!?\-\)])([A-Z])/g with "$1, $2" ONLY INSIDE recommended_arsenal strings.

    // Let's parse JSON to be safe, then stringify back
    try {
        const json = JSON.parse(content);
        let modified = false;

        const fixArsenal = (arsenalStr) => {
            if (!arsenalStr) return arsenalStr;
            let newStr = arsenalStr;

            // Replaces "!" followed immediately by a capital letter, e.g. "Motores!BANG"
            newStr = newStr.replace(/!([A-Z])/g, '!, $1');

            // Replaces "?" followed by capital, e.g. "Agora?Dia"
            newStr = newStr.replace(/\?([A-Z])/g, '?, $1');

            // Replaces ")" followed by capital, e.g. "(Expulsão)Dia"
            newStr = newStr.replace(/\)([A-Z])/g, '), $1');

            // Replace "!" followed by a space and capital letter, e.g. "Vai, George! BANG" should be "Vai, George!, BANG"
            // Wait, "Vai, George! BANG" -> "Vai, George!, BANG"
            newStr = newStr.replace(/!\s+([A-Z])/g, '!, $1');

            // Replaces missing commas for "-"
            // BUT wait! "Corte-Circuito" starts the second word with C! Oh, "Curto-Circuito"
            // Let's skip "-" since it could be inside a word like "Homem-Aranha".

            // Fix double commas
            newStr = newStr.replace(/,\s*,/g, ',');

            return newStr;
        };

        if (json.variants) {
            for (const tier in json.variants) {
                for (const variant of json.variants[tier]) {
                    if (variant.recommended_arsenal) {
                        const oldArsenal = variant.recommended_arsenal;
                        variant.recommended_arsenal = fixArsenal(variant.recommended_arsenal);
                        if (oldArsenal !== variant.recommended_arsenal) {
                            modified = true;
                        }
                    }
                }
            }
        }

        if (modified) {
            fs.writeFileSync(filePath, JSON.stringify(json, null, 4));
            console.log('Fixed:', file);
            changes++;
        }
    } catch (e) {
        console.error('Error parsing', file, e.message);
    }
}

console.log('Total fixed:', changes);
