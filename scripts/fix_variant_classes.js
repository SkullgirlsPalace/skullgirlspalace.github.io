const fs = require('fs');
const text = fs.readFileSync('src/data/variantClasses.js', 'utf8');

const chars = [
    'Rosa Estelar', 'Modelo Submarina', 'Maravilha Eterna', 'Homem de Gelo',
    'Sentinela de Pedra', 'Mente Criminosa', 'Ciclone Carmesim', 'Rodas Rítmicas',
    'Megassônico', 'Heavy Metal', 'Banda dos Sonhos', 'Agente Corrosiva',
    'Hóstia Profana', 'Maldade Eterna', 'Cacho Mágico', 'Escoteira',
    'Megera Vaporwave', 'Bela do Inferno', 'Fantoche Sombrio', 'Imagem Dividida',
    'Maldade Insana', 'Sem Coração', 'Briga Fatal', 'Frio Mordente',
    'Festa Macabra', 'Neuromancer', 'Papa-Moscas', 'Ameaça Mascarada',
    'Zona de Buffer', 'Overclocked', 'Saqueadora do Palácio', 'Desejo de Morte',
    'Angelical', 'Turno Mortal', 'Mai-s O Quê?', 'Cirurgiã-General',
    'Preços para Matar', 'Très Chic'
];

let newText = text;

chars.forEach(c => {
    // Regex to match "Nome": ["Alguma Classe"] and replace with "Nome": ["Coringa"]
    const regex = new RegExp('"' + c.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&') + '":\\s*\\[.*?\\]');
    if (newText.match(regex)) {
        newText = newText.replace(regex, '"' + c + '": ["Coringa"]');
    } else {
        // Append missing at the end of VARIANT_CLASSES block
        console.log('Missing in list: ' + c);
        // Quick and dirty append before the closing "};"
        newText = newText.replace(/\n\};/g, ',\n    "' + c + '": ["Coringa"]\n};');
    }
});

fs.writeFileSync('src/data/variantClasses.js', newText);
console.log('File updated successfully.');
