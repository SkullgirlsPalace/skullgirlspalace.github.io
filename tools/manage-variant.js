#!/usr/bin/env node
// =============================================================================
// 🛠️ FERRAMENTA DE GERENCIAMENTO DE VARIANTES — Skullgirls Palace
// =============================================================================
// 
// COMO USAR:
// 1. Abra o terminal na pasta raíz do projeto.
// 2. Digite: node tools/manage-variant.js
// 3. Siga as instruções no terminal.
//
// FUNÇÕES:
// - Adicionar: Cria uma nova variante no JSON do personagem e atualiza imagens.
// - Editar: Atualiza campos de uma variante existente (aperte Enter para manter o antigo).
// - Raw Paste: Cole um texto bruto e identifique os campos rapidamente.
// - Tradução: Traduz termos de efeitos (HASTE, BLEED, etc) do inglês para PT-BR.
//
// =============================================================================

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const https = require('https');

// ─── Paths ───────────────────────────────────────────
const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'data');
const IMG_DIR = path.join(ROOT, 'img');
const VARIANT_IMAGES_PATH = path.join(ROOT, 'src', 'data', 'variantImages.js');

const TRADUCAO_MD_PATH = path.join(ROOT, 'traducao-ptBR.md');

// ─── Constantes ──────────────────────────────────────
const VALID_CHARACTERS = [
    'annie', 'beowulf', 'big-band', 'black-dahlia', 'cerebella', 'double', 'eliza', 'filia',
    'fukua', 'marie', 'ms-fortune', 'painwheel', 'parasoul', 'peacock', 'robo-fortune', 'squigly', 'umbrella', 'valentine'
];
const VALID_ELEMENTS = ['Fogo', 'Água', 'Ar', 'Luz', 'Trevas', 'Neutro'];
const VALID_TIERS = ['diamante', 'ouro', 'prata', 'bronze'];

const ELEMENT_COLORS = {
    'Fogo': '#ff3d00', 'Água': '#00b0ff', 'Ar': '#00e676',
    'Luz': '#ffea00', 'Trevas': '#aa00ff', 'Neutro': '#9e9e9e'
};

/** @type {Object.<string, string>} */
let TRANSLATION_DICT = {};

// ─── Carregar Dicionário Dinâmico ────────────────────
function loadTranslationDict() {
    if (Object.keys(TRANSLATION_DICT).length > 0) return;

    if (!fs.existsSync(TRADUCAO_MD_PATH)) {
        printError('Arquivo traducao-ptBR.md não encontrado. Usando dicionário vazio.');
        return;
    }

    const content = fs.readFileSync(TRADUCAO_MD_PATH, 'utf-8');
    const lines = content.split('\n');

    // Pattern: * **English** -> Portuguese
    // Also handles: * **Regen** (ou Regeneration) -> Regeneração
    const pattern = /\* \*\*(.*?)\*\*(?: \((?:.*?)\))? -> (.*)/;

    lines.forEach(line => {
        const match = line.match(pattern);
        if (match) {
            const eng = match[1].trim();
            const pt = match[2].trim();

            // Adicionar variações: Original, CAPS e lower
            addTranslationVariation(eng, pt);

            // Se tiver "ou Regeneration", pegar depois do "ou"
            const altMatch = line.match(/\(ou (.*?)\)/);
            if (altMatch) {
                addTranslationVariation(altMatch[1].trim(), pt);
            }
        }
    });

    // Casos especiais manuais comuns que mudam muito
    addTranslationVariation('HP', 'VD');
    addTranslationVariation('ATK', 'ATQ');
    addTranslationVariation('Special Move', 'Golpe Especial');
}

function addTranslationVariation(eng, pt) {
    TRANSLATION_DICT[eng] = pt;
    TRANSLATION_DICT[eng.toUpperCase()] = pt.toUpperCase();
    TRANSLATION_DICT[eng.toLowerCase()] = pt.toLowerCase();
}

// ─── Readline Interface ──────────────────────────────
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(question) {
    return new Promise(resolve => {
        rl.question(question, answer => resolve(answer.trim()));
    });
}

function printHeader(text) {
    const line = '═'.repeat(50);
    console.log(`\n${line}`);
    console.log(`  ${text}`);
    console.log(line);
}

function printSuccess(text) {
    console.log(`\n  ✅ ${text}`);
}

function printError(text) {
    console.log(`\n  ❌ ${text}`);
}

function printInfo(text) {
    console.log(`  ℹ️  ${text}`);
}

// ─── Tradução ────────────────────────────────────────
function translateText(text) {
    let result = text;
    // Sort keys by length (longest first) to avoid partial replacements
    const sortedKeys = Object.keys(TRANSLATION_DICT).sort((a, b) => b.length - a.length);
    for (const key of sortedKeys) {
        // Use word boundary matching to avoid partial matches
        const regex = new RegExp(`\\b${escapeRegex(key)}\\b`, 'g');
        result = result.replace(regex, TRANSLATION_DICT[key]);
    }
    return result;
}

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ─── Leitura/Escrita de JSON ─────────────────────────
function readCharacterJSON(charKey) {
    const filePath = path.join(DATA_DIR, `${charKey}.json`);
    if (!fs.existsSync(filePath)) {
        return null;
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
}

function writeCharacterJSON(charKey, data) {
    const filePath = path.join(DATA_DIR, `${charKey}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4), 'utf-8');
}

// ─── Leitura/Escrita de variantImages.js ─────────────
function readVariantImagesFile() {
    return fs.readFileSync(VARIANT_IMAGES_PATH, 'utf-8');
}

function addVariantImage(charKey, variantName, imagePath) {
    let content = readVariantImagesFile();

    // Find the character's block in VARIANT_IMAGES
    const charPattern = new RegExp(`(["']${escapeRegex(charKey)}["']\\s*:\\s*\\{)([^}]*)`, 's');
    const match = content.match(charPattern);

    if (match) {
        // Check if variant already exists
        const variantPattern = new RegExp(`["']${escapeRegex(variantName)}["']\\s*:`);
        if (variantPattern.test(match[2])) {
            // Update existing entry
            const updatePattern = new RegExp(
                `(["']${escapeRegex(variantName)}["']\\s*:\\s*)["'][^"']*["']`
            );
            content = content.replace(updatePattern, `$1"${imagePath}"`);
        } else {
            // Add new entry at the end of the character block
            const existingEntries = match[2].trimEnd();
            const lastComma = existingEntries.endsWith(',') ? '' : ',';
            const newEntry = `${existingEntries}${lastComma}\n        "${variantName}": "${imagePath}"`;
            content = content.replace(match[2], newEntry + '\n    ');
        }
    } else {
        // Character doesn't exist in variantImages.js — add new block before closing };
        const closingPattern = /};\s*\n\s*\/\*\*/;
        const newBlock = `    "${charKey}": {\n        "${variantName}": "${imagePath}"\n    },\n`;
        if (closingPattern.test(content)) {
            content = content.replace(closingPattern, `${newBlock}};\n\n/**`);
        } else {
            // Fallback: insert before the last }; 
            const lastClose = content.lastIndexOf('};');
            if (lastClose !== -1) {
                content = content.slice(0, lastClose) + `    "${charKey}": {\n        "${variantName}": "${imagePath}"\n    }\n` + content.slice(lastClose);
            }
        }
    }

    fs.writeFileSync(VARIANT_IMAGES_PATH, content, 'utf-8');
}

// ─── Download de Imagem ──────────────────────────────
async function downloadImage(url, destPath) {
    return new Promise((resolve, reject) => {
        // Simple regex to handle common cases but error on local paths
        if (!url.startsWith('http')) {
            reject(new Error('Apenas URLs HTTP/HTTPS são suportadas para download.'));
            return;
        }

        const file = fs.createWriteStream(destPath);
        https.get(url, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                // Handle redirection (common in CDN URLs)
                https.get(response.headers.location, (res) => {
                    res.pipe(file);
                    file.on('finish', () => file.close(resolve));
                }).on('error', reject);
                return;
            }
            if (response.statusCode !== 200) {
                reject(new Error(`Falha no download: Código ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(destPath, () => reject(err));
        });
    });
}

function getNextImageIndex(charKey) {
    const charImgDir = path.join(IMG_DIR, charKey);
    if (!fs.existsSync(charImgDir)) {
        fs.mkdirSync(charImgDir, { recursive: true });
        return 0;
    }

    const files = fs.readdirSync(charImgDir);
    // Standard pattern: Big_Band_index.png
    const baseName = capitalize(charKey);
    const pattern = new RegExp(`^${escapeRegex(baseName)}_(\\d+)\\.png$`, 'i');
    let maxIndex = -1;

    files.forEach(file => {
        const match = file.match(pattern);
        if (match) {
            const index = parseInt(match[1]);
            if (index > maxIndex) maxIndex = index;
        }
    });

    return maxIndex + 1;
}

// ─── Helpers ─────────────────────────────────────────
// Padroniza nomes: 'big-band' -> 'Big_Band', 'annie' -> 'Annie'
// Garante que o download siga o padrão Big_Band_N.png mesmo se houver big_band_N.png
function capitalize(str) {
    if (str.includes('-')) {
        return str.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('_');
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatTierLabel(tier) {
    const labels = { 'diamante': 'Diamante', 'ouro': 'Ouro', 'prata': 'Prata', 'bronze': 'Bronze' };
    return labels[tier] || capitalize(tier).replace(/_/g, '-');
}

function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function findVariant(charData, variantName) {
    for (const tier of VALID_TIERS) {
        const variants = charData.variants[tier] || [];
        const idx = variants.findIndex(v => v.name.toLowerCase() === variantName.toLowerCase());
        if (idx !== -1) {
            return { tier, index: idx, variant: variants[idx] };
        }
    }
    return null;
}

// ─── Fluxo Principal ─────────────────────────────────
async function main() {
    loadTranslationDict();
    printHeader('GERENCIADOR DE VARIANTES — Skullgirls Palace');
    console.log('  Ferramenta para adicionar/editar variantes\n');

    // Escolher ação
    console.log('  Ações disponíveis:');
    console.log('    1 — Adicionar nova variante');
    console.log('    2 — Editar variante existente');
    console.log('    3 — Colar dados crus (raw paste)');
    console.log('    0 — Sair\n');

    const action = await ask('  Escolha a ação: ');

    switch (action) {
        case '1':
            await addVariant();
            break;
        case '2':
            await editVariant();
            break;
        case '3':
            await rawPaste();
            break;
        case '0':
            console.log('\n  Até mais! 👋\n');
            rl.close();
            return;
        default:
            printError('Ação inválida.');
            rl.close();
            return;
    }

    // Perguntar se quer continuar
    const again = await ask('\n  Deseja realizar outra ação? (s/n): ');
    if (again.toLowerCase() === 's') {
        await main();
    } else {
        console.log('\n  Até mais! 👋\n');
        rl.close();
    }
}

// ─── Adicionar Variante ──────────────────────────────
async function addVariant() {
    printHeader('ADICIONAR NOVA VARIANTE');

    // Personagem
    console.log(`\n  Personagens: ${VALID_CHARACTERS.join(', ')}`);
    const charKey = await askValidated(
        '  Personagem: ',
        v => VALID_CHARACTERS.includes(v.toLowerCase()),
        '  Personagem inválido.'
    );
    const charKeyNorm = charKey.toLowerCase();

    const charData = readCharacterJSON(charKeyNorm);
    if (!charData) {
        printError(`Arquivo não encontrado!`);
        return;
    }

    // Nome
    const name = await ask('  Nome da variante: ');
    if (!name) return;

    // Verificar se já existe
    const existing = findVariant(charData, name);
    if (existing) {
        printError(`Variante "${name}" já existe.`);
        return;
    }

    // Elemento, Tier, Stats
    console.log(`  Elementos: ${VALID_ELEMENTS.join(', ')}`);
    const element = await askValidated('  Elemento: ', v => VALID_ELEMENTS.some(e => e.toLowerCase() === v.toLowerCase()), 'Inválido.');
    const elementNorm = VALID_ELEMENTS.find(e => e.toLowerCase() === element.toLowerCase());

    const tier = await askValidated('  Tier: ', v => VALID_TIERS.includes(v.toLowerCase()), 'Inválido.');
    const tierNorm = tier.toLowerCase();

    const attack = await ask('  Ataque: ');
    const health = await ask('  Vida: ');
    const power = await ask('  Poder: ');

    // SA
    const saName = await ask('  Nome da SA: ');
    console.log('  Descrição da SA (HAB1 e HAB2):');
    const saDesc = await askMultiline();

    const shouldTranslate = await ask('  Traduzir? (s/n): ');
    let saDescFinal = saDesc;
    let saNameFinal = saName;
    if (shouldTranslate.toLowerCase() === 's') {
        saDescFinal = translateText(saDesc);
        saNameFinal = translateText(saName);
    }

    // Imagem Única
    console.log('\n  Imagem da Variante (Card/Build):');
    const imageInput = await ask('  URL ou path local: ');
    let finalImagePath = '';
    if (imageInput.startsWith('http')) {
        const nextIdx = getNextImageIndex(charKeyNorm);
        const fileName = `${capitalize(charKeyNorm)}_${nextIdx}.png`;
        const destPath = path.join(IMG_DIR, charKeyNorm, fileName);
        printInfo(`Baixando...`);
        try {
            await downloadImage(imageInput, destPath);
            finalImagePath = `img/${charKeyNorm}/${fileName}`;
            printSuccess('Imagem salva!');
        } catch (err) { printError(`Erro: ${err.message}`); finalImagePath = imageInput; }
    } else { finalImagePath = imageInput; }

    const variantObj = {
        name: name,
        title_formatted: `${name} - ${elementNorm} - ${formatTierLabel(tierNorm)}`,
        element: elementNorm,
        color_hex: ELEMENT_COLORS[elementNorm] || '#ffffff',
        images: { icon_url: '', portrait_url: finalImagePath },
        stats: { attack, health, power },
        signature_ability: { name: saNameFinal.toUpperCase(), description: saDescFinal }
    };

    if (!charData.variants[tierNorm]) charData.variants[tierNorm] = [];
    charData.variants[tierNorm].push(variantObj);
    writeCharacterJSON(charKeyNorm, charData);

    if (finalImagePath) {
        addVariantImage(charKeyNorm, name, finalImagePath);
    }
    printSuccess(`Variante "${name}" adicionada!`);
}

// ─── Editar Variante ─────────────────────────────────
async function editVariant() {
    printHeader('EDITAR VARIANTE EXISTENTE');

    // Personagem
    console.log(`\n  Personagens: ${VALID_CHARACTERS.join(', ')}`);
    const charKey = await askValidated(
        '  Personagem: ',
        v => VALID_CHARACTERS.includes(v.toLowerCase()),
        '  Personagem inválido.'
    );
    const charKeyNorm = charKey.toLowerCase();

    const charData = readCharacterJSON(charKeyNorm);
    if (!charData) {
        printError(`Arquivo data/${charKeyNorm}.json não encontrado!`);
        return;
    }

    // Listar variantes
    console.log('\n  Variantes disponíveis:');
    for (const tier of VALID_TIERS) {
        const variants = charData.variants[tier] || [];
        if (variants.length > 0) {
            console.log(`\n  [${formatTierLabel(tier).toUpperCase()}]`);
            variants.forEach((v, i) => {
                console.log(`    ${i + 1}. ${v.name} (${v.element})`);
            });
        }
    }

    const variantName = await ask('\n  Nome da variante para editar: ');
    const found = findVariant(charData, variantName);
    if (!found) {
        printError(`Variante "${variantName}" não encontrada.`);
        return;
    }

    const variant = found.variant;
    printInfo(`Editando "${variant.name}" — ${found.tier.toUpperCase()}`);
    console.log('  (Pressione Enter para manter o valor atual)\n');

    // Editar campos
    const newName = await ask(`  Nome [${variant.name}]: `);
    if (newName) variant.name = newName;

    const newElement = await ask(`  Elemento [${variant.element}]: `);
    if (newElement && VALID_ELEMENTS.some(e => e.toLowerCase() === newElement.toLowerCase())) {
        variant.element = VALID_ELEMENTS.find(e => e.toLowerCase() === newElement.toLowerCase());
    }

    const newColor = await ask(`  Cor hex [${variant.color_hex}]: `);
    if (newColor) variant.color_hex = newColor;

    const newAttack = await ask(`  Ataque [${variant.stats.attack}]: `);
    if (newAttack) variant.stats.attack = newAttack;

    const newHealth = await ask(`  Vida [${variant.stats.health}]: `);
    if (newHealth) variant.stats.health = newHealth;

    const newPower = await ask(`  Poder [${variant.stats.power}]: `);
    if (newPower) variant.stats.power = newPower;

    const newSaName = await ask(`  SA Nome [${variant.signature_ability.name}]: `);
    if (newSaName) variant.signature_ability.name = newSaName.toUpperCase();

    const editSaDesc = await ask('  Editar descrição da SA? (s/n): ');
    if (editSaDesc.toLowerCase() === 's') {
        console.log('  Nova descrição:');
        const newDesc = await askMultiline();
        const shouldTranslate = await ask('  Traduzir termos em inglês? (s/n): ');
        variant.signature_ability.description = shouldTranslate.toLowerCase() === 's'
            ? translateText(newDesc) : newDesc;
    }


    const newMarquee = await ask(`  Marquee Ability [${variant.marquee_ability || 'N/A'}]: `);
    if (newMarquee) variant.marquee_ability = newMarquee;

    const newBuild = await ask(`  Build [${variant.recommended_build || 'N/A'}]: `);
    if (newBuild) variant.recommended_build = newBuild;

    const newArsenal = await ask(`  Arsenal [${variant.recommended_arsenal || 'N/A'}]: `);
    if (newArsenal) variant.recommended_arsenal = newArsenal;

    // Atualizar title_formatted
    const currentTier = found.tier;
    variant.title_formatted = `${variant.name} - ${variant.element} - ${formatTierLabel(currentTier)}`;

    // Mover de tier se necessário
    const newTier = await ask(`  Mudar tier? Atual: ${currentTier} (Enter para manter): `);
    if (newTier && VALID_TIERS.includes(newTier.toLowerCase()) && newTier.toLowerCase() !== currentTier) {
        const newTierNorm = newTier.toLowerCase();
        // Remover do tier atual
        charData.variants[currentTier].splice(found.index, 1);
        // Adicionar no novo tier
        if (!charData.variants[newTierNorm]) charData.variants[newTierNorm] = [];
        charData.variants[newTierNorm].push(variant);
        variant.title_formatted = `${variant.name} - ${variant.element} - ${formatTierLabel(newTierNorm)}`;
        printInfo(`Variante movida de ${currentTier} para ${newTierNorm}`);
    }

    // Confirmar
    printHeader('PRÉVIA DA VARIANTE EDITADA');
    console.log(JSON.stringify(variant, null, 4));
    const confirm = await ask('\n  Confirmar edição? (s/n): ');
    if (confirm.toLowerCase() !== 's') {
        printInfo('Operação cancelada.');
        return;
    }

    writeCharacterJSON(charKeyNorm, charData);
    printSuccess(`Variante "${variant.name}" atualizada em data/${charKeyNorm}.json`);

    // Imagem
    const updateImg = await ask('  Atualizar imagem do Personagem (Card/Foto)? (s/n): ');
    if (updateImg.toLowerCase() === 's') {
        const imgInput = await ask('  URL para baixar ou path local: ');
        let finalPath = '';
        if (imgInput.startsWith('http')) {
            const nextIdx = getNextImageIndex(charKeyNorm);
            const fileName = `${capitalize(charKeyNorm)}_${nextIdx}.png`;
            const destPath = path.join(IMG_DIR, charKeyNorm, fileName);
            printInfo(`Baixando...`);
            try {
                await downloadImage(imgInput, destPath);
                finalPath = `img/${charKeyNorm}/${fileName}`;
                printSuccess('Imagem baixada!');
            } catch (err) { printError(`Erro: ${err.message}`); finalPath = imgInput; }
        } else { finalPath = imgInput; }

        if (finalPath) {
            variant.images.portrait_url = finalPath;
            addVariantImage(charKeyNorm, variant.name, finalPath);
            printSuccess('Imagem atualizada no JSON e no variantImages.js');
        }
    }
}

// ─── Modo Raw Paste ──────────────────────────────────
async function rawPaste() {
    printHeader('MODO RAW PASTE — COLAR DADOS CRUS');
    console.log('  Cole todos os dados da variante (texto bruto).');
    console.log('  Termine com uma linha vazia.\n');

    const rawText = await askMultiline();

    if (!rawText.trim()) {
        printError('Nenhum dado recebido.');
        return;
    }

    console.log('\n  Dados recebidos. Analisando...\n');

    const parsed = parseRawData(rawText);

    // Personagem
    console.log(`  Personagens: ${VALID_CHARACTERS.join(', ')}`);
    const charKey = await askValidated(
        '  Personagem: ',
        v => VALID_CHARACTERS.includes(v.toLowerCase()),
        '  Personagem inválido.'
    );
    const charKeyNorm = charKey.toLowerCase();

    const charData = readCharacterJSON(charKeyNorm);
    if (!charData) {
        printError(`Arquivo não encontrado!`);
        return;
    }

    const name = await ask(`  Nome da variante [${parsed.name || 'Vazio'}]: `);
    const finalName = name || parsed.name;

    console.log(`  Elementos: ${VALID_ELEMENTS.join(', ')}`);
    const element = await ask(`  Elemento [${parsed.element || 'Vazio'}]: `);
    const rawElement = element || parsed.element;
    const elementNorm = VALID_ELEMENTS.find(e => e.toLowerCase() === rawElement.toLowerCase()) || 'Luz';

    console.log(`  Tiers: ${VALID_TIERS.join(', ')}`);
    const tier = await ask(`  Tier/Raridade [${parsed.tier || 'Vazio'}]: `);
    const tierNorm = (tier || parsed.tier || 'ouro').toLowerCase();

    const attack = await ask(`  Ataque [${parsed.attack || 'Vazio'}]: `);
    const finalAttack = attack || parsed.attack;

    const health = await ask(`  Vida [${parsed.health || 'Vazio'}]: `);
    const finalHealth = health || parsed.health;

    const power = await ask(`  Poder [${parsed.power || 'Vazio'}]: `);
    const finalPower = power || parsed.power;

    const saName = await ask(`  Nome da SA [${parsed.saName || 'Vazio'}]: `);
    const finalSaName = saName || parsed.saName;

    let saDescFinal = '';
    const useParsedSA = parsed.saDesc ? await ask('  Usar descrição da SA detectada? (s/n): ') : 'n';
    if (useParsedSA.toLowerCase() === 's') {
        saDescFinal = parsed.saDesc;
    } else {
        console.log('  Cole a descrição da SA:');
        saDescFinal = await askMultiline();
    }

    const shouldTranslate = await ask('  Traduzir termos em inglês? (s/n): ');
    let saNameFinal = finalSaName;
    if (shouldTranslate.toLowerCase() === 's') {
        saDescFinal = translateText(saDescFinal);
        saNameFinal = translateText(finalSaName);
        printInfo('Tradução aplicada.');
    }

    const colorInput = await ask(`  Cor hex (Enter para cor padrão do elemento): `);
    const colorHex = colorInput || ELEMENT_COLORS[elementNorm] || '#ffffff';

    // Imagem (Download)
    console.log('\n  Imagem da Variante (Card/Build):');
    const imageInput = await ask('  URL ou path local: ');
    let finalImagePath = '';
    if (imageInput.startsWith('http')) {
        const nextIdx = getNextImageIndex(charKeyNorm);
        const fileName = `${capitalize(charKeyNorm)}_${nextIdx}.png`;
        const destPath = path.join(IMG_DIR, charKeyNorm, fileName);
        printInfo(`Baixando...`);
        try {
            await downloadImage(imageInput, destPath);
            finalImagePath = `img/${charKeyNorm}/${fileName}`;
            printSuccess('Imagem salva!');
        } catch (err) { printError(`Erro: ${err.message}`); finalImagePath = imageInput; }
    } else { finalImagePath = imageInput; }

    const variantObj = {
        name: finalName,
        title_formatted: `${finalName} - ${elementNorm} - ${formatTierLabel(tierNorm)}`,
        element: elementNorm,
        color_hex: colorHex,
        images: { icon_url: '', portrait_url: finalImagePath },
        stats: { attack: finalAttack, health: finalHealth, power: finalPower },
        signature_ability: { name: saNameFinal.toUpperCase(), description: saDescFinal }
    };

    // Confirmar e salvar
    printHeader('PRÉVIA');
    console.log(JSON.stringify(variantObj, null, 4));
    const confirm = await ask('\n  Confirmar? (s/n): ');
    if (confirm.toLowerCase() === 's') {
        if (!charData.variants[tierNorm]) charData.variants[tierNorm] = [];
        charData.variants[tierNorm].push(variantObj);
        writeCharacterJSON(charKeyNorm, charData);
        if (finalImagePath) addVariantImage(charKeyNorm, finalName, finalImagePath);
        printSuccess('Variante adicionada!');
    }
}

// ─── Parser para Raw Paste ──────────────────────────
function parseRawData(text) {
    const data = {
        name: '',
        element: '',
        tier: '',
        attack: '',
        health: '',
        power: '',
        saName: '',
        saDesc: ''
    };

    // Tentar extrair Nome (geralmente primeira linha ou linha sozinha)
    const lines = text.split('\n').map(l => l.trim()).filter(l => l);
    if (lines.length > 0) data.name = lines[0].replace(/^(Nome|Name):\s*/i, '');

    // Elemento (Procura por termos na lista)
    for (const el of VALID_ELEMENTS) {
        if (new RegExp(`\\b${el}\\b`, 'i').test(text)) {
            data.element = el;
            break;
        }
    }

    // Tier (Procura por termos na lista)
    for (const t of VALID_TIERS) {
        if (new RegExp(`\\b${t}\\b`, 'i').test(text)) {
            data.tier = t;
            break;
        }
    }

    // Stats (Ataque, Vida, Poder) - Procura por números com vírgula ou K
    const attackMatch = text.match(/(Ataque|Attack|ATQ):\s*([\d,.]+K?)/i);
    if (attackMatch) data.attack = attackMatch[2];

    const healthMatch = text.match(/(Vida|Health|HP):\s*([\d,.]+K?)/i);
    if (healthMatch) data.health = healthMatch[2];

    const powerMatch = text.match(/(Poder|Power|FS):\s*([\d,.]+K?)/i);
    if (powerMatch) data.power = powerMatch[2];

    // Signature Ability Name
    const saNameMatch = text.match(/(SA|Habilidade|Ability):\s*([^\n]+)/i);
    if (saNameMatch) data.saName = saNameMatch[2];

    // Signature Ability Description (Busca por parágrafos grandes ou blocos de texto)
    // Tenta encontrar "HAB 1" ou similares
    const habMatch = text.match(/(HAB\s*1:[\s\S]+)/i);
    if (habMatch) data.saDesc = habMatch[1];

    return data;
}

// ─── Helpers de Input ────────────────────────────────
async function askValidated(question, validator, errorMsg) {
    while (true) {
        const answer = await ask(question);
        if (validator(answer)) return answer;
        printError(errorMsg);
    }
}

async function askMultiline() {
    console.log('  (Aperte Enter duas vezes seguidas para encerrar)');
    const lines = [];
    let emptyCount = 0;
    while (true) {
        const line = await ask('');
        if (line === '') {
            emptyCount++;
            if (emptyCount >= 2) break;
            lines.push(''); // Keep the single empty line
        } else {
            emptyCount = 0;
            lines.push(line);
        }
    }
    // Filter out trailing empty lines used for termination
    while (lines.length > 0 && lines[lines.length - 1] === '') {
        lines.pop();
    }
    return lines.join('\\n');
}

// ─── Iniciar ─────────────────────────────────────────
main().catch(err => {
    printError(`Erro: ${err.message}`);
    rl.close();
    process.exit(1);
});
