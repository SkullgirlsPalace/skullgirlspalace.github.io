const fs = require('fs');
const path = require('path');
const https = require('https');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ask = (query) => new Promise(resolve => rl.question(query, resolve));

// Constantes
const IMG_DIR = path.join(__dirname, '..', 'img');
const VARIANT_IMAGES_JS = path.join(__dirname, '..', 'src', 'data', 'variantImages.js');
const CHAR_JSON_DIR = path.join(__dirname, '..', 'data');

const VALID_CHARACTERS = [
    'annie', 'beowulf', 'big-band', 'black-dahlia', 'cerebella',
    'double', 'eliza', 'filia', 'fukua', 'marie', 'ms-fortune',
    'painwheel', 'parasoul', 'peacock', 'robo-fortune',
    'squigly', 'umbrella', 'valentine'
];

// Utilitários de Impressão
const printSuccess = (msg) => console.log('\x1b[32m%s\x1b[0m', `✓ ${msg}`);
const printError = (msg) => console.log('\x1b[31m%s\x1b[0m', `✖ ${msg}`);
const printInfo = (msg) => console.log('\x1b[36m%s\x1b[0m', `ℹ ${msg}`);
const printHeader = (msg) => {
    console.log('\n\x1b[35m=========================================\x1b[0m');
    console.log('\x1b[35m%s\x1b[0m', `  ${msg}`);
    console.log('\x1b[35m=========================================\x1b[0m\n');
};

console.log(`
\x1b[35m=============================================================================\x1b[0m
\x1b[33m🛠️ DOWNLOADER E REGISTRADOR DE IMAGENS EM MASSA\x1b[0m
\x1b[35m=============================================================================\x1b[0m

\x1b[36mCOMO USAR:\x1b[0m
   Comando para o Terminal node tools/download-image.js

1. Este script permite baixar imagens de variantes e registrá-las automaticamente.
2. Você pode baixar várias imagens em sequência sem precisar reiniciar.
3. As imagens serão salvas automaticamente na pasta correta com o nome certo.
4. O script também atualizará o arquivo 'variantImages.js' para você.

\x1b[35m=============================================================================\x1b[0m
`);

function capitalize(str) {
    return str.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('_');
}

async function askValidated(question, validator, errorMsg) {
    while (true) {
        const answer = await ask(question);
        if (validator(answer)) return answer;
        printError(errorMsg);
    }
}

// ─── LÓGICA DE DOWNLOAD ──────────────────────────────
async function downloadImage(url, destPath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(destPath);
        https.get(url, response => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                // Handle Redirects (e.g., from wiki or drive links)
                https.get(response.headers.location, resp2 => {
                    resp2.pipe(file);
                    file.on('finish', () => { file.close(); resolve(); });
                }).on('error', err => { fs.unlink(destPath, () => { }); reject(err); });
            } else {
                response.pipe(file);
                file.on('finish', () => { file.close(); resolve(); });
            }
        }).on('error', err => {
            fs.unlink(destPath, () => { });
            reject(err);
        });
    });
}

function getNextImageIndex(charKey) {
    const charImgDir = path.join(IMG_DIR, charKey);
    if (!fs.existsSync(charImgDir)) {
        fs.mkdirSync(charImgDir, { recursive: true });
        return 1;
    }

    const files = fs.readdirSync(charImgDir);
    let maxIdx = 0;
    const regex = new RegExp(`${capitalize(charKey)}_(\\d+)\\.png$`, 'i');

    for (const file of files) {
        const match = file.match(regex);
        if (match) {
            const num = parseInt(match[1], 10);
            if (num > maxIdx) maxIdx = num;
        }
    }
    return maxIdx + 1;
}

// Atualizar o variantImages.js ou apenas retornar o path
function addVariantImage(charKey, variantName, imagePath) {
    try {
        let content = fs.readFileSync(VARIANT_IMAGES_JS, 'utf8');

        // Regex para achar o objeto do personagem: 'charKey': { ... }
        const regex = new RegExp(`('${charKey}'|"${charKey}"):\\s*{([^}]*)}`, 'g');
        const match = regex.exec(content);

        if (match) {
            const charObjContent = match[2];
            // Verifica se a variante já existe no objeto
            const variantRegex = new RegExp(`('${variantName}'|"${variantName}"):\\s*['"][^'"]*['"]`);
            if (variantRegex.test(charObjContent)) {
                // Atualiza a imagem existente
                const updatedObjContent = charObjContent.replace(
                    new RegExp(`(('|")${variantName}('|")\\s*:\\s*)['"][^'"]*['"]`),
                    `$1'${imagePath}'`
                );
                content = content.replace(match[0], `'${charKey}': {${updatedObjContent}}`);
            } else {
                // Adiciona nova imagem no fim do objeto do personagem
                // Checa se já tem algo e se termina ou não com vírgula
                let updatedObjContent = charObjContent;
                if (updatedObjContent.trim().length > 0 && !updatedObjContent.trim().endsWith(',')) {
                    updatedObjContent += ',';
                }
                updatedObjContent += `\n        '${variantName}': '${imagePath}'\n    `;
                content = content.replace(match[0], `'${charKey}': {${updatedObjContent}}`);
            }
            fs.writeFileSync(VARIANT_IMAGES_JS, content);
            printSuccess(`Imagem ${variantName} (atualizada) registrada no variantImages.js`);
        } else {
            printError(`Personagem ${charKey} não encontrado no variantImages.js. Você pode adicionar manualmente.`);
        }

    } catch (err) {
        printError(`Erro ao atualizar variantImages.js: ${err.message}`);
    }
}

async function main() {
    printHeader('INÍCIO DOS DOWNLOADS');

    console.log(`Personagens válidos:\n${VALID_CHARACTERS.join(', ')}\n`);

    while (true) {
        const charKey = await askValidated(
            'Escolha o Personagem (ID oficial, ex: annie, ms-fortune): ',
            v => VALID_CHARACTERS.includes(v.toLowerCase()),
            'Personagem inválido. Tente novamente.'
        );
        const charKeyNorm = charKey.toLowerCase();

        const variantName = await ask('Nome exato da Variante (para registrar no código): ');
        if (!variantName.trim()) {
            printError("Nome não pode ser vazio.");
            // Ask again or continue depends on design, let's just let them restart
            continue;
        }

        const url = await ask('URL da imagem (.png, .jpg ou link direto para a foto): ');
        if (!url.startsWith('http')) {
            printError("A URL precisa começar com http ou https.");
            continue;
        }

        // Processamento
        const nextIdx = getNextImageIndex(charKeyNorm);
        const fileName = `${capitalize(charKeyNorm)}_${nextIdx}.png`;
        const destPath = path.join(IMG_DIR, charKeyNorm, fileName);
        const finalImagePath = `img/${charKeyNorm}/${fileName}`;

        printInfo(`\nIniciando download...`);
        printInfo(`Destino: ${destPath}`);

        try {
            await downloadImage(url, destPath);
            printSuccess('Download concluído com sucesso!');

            // Atualizar registry
            const answer = await ask('Registrar essa imagem no variantImages.js? (s/n): ');
            if (answer.toLowerCase() === 's') {
                addVariantImage(charKeyNorm, variantName, finalImagePath);
            }

            printSuccess(`Tudo certo! ID da imagem gerada: ${finalImagePath}`);

        } catch (err) {
            printError(`Ocorreu um erro no download: ${err.message}`);
        }

        console.log('\n----------------------------------------');
        const again = await ask('Deseja baixar outra imagem? (s/n): ');
        if (again.toLowerCase() !== 's') {
            console.log('\nAté mais! 👋');
            break;
        }
        console.log('----------------------------------------\n');
    }

    rl.close();
}

main().catch(err => {
    printError(`Erro inesperado: ${err.message}`);
    rl.close();
    process.exit(1);
});
