// =====================================================
// SKULLGIRLS MOBILE WIKI - PALÁCIO BRANCO
// Main JavaScript Application
// =====================================================

// ========== CONFIGURATION ==========
const CHARACTER_FILES = [
    'annie.json',
    'beowulf.json',
    'big-band.json',
    'black-dahlia.json',
    'cerebella.json',
    'double.json',
    'eliza.json',
    'filia.json',
    'fukua.json',
    'marie.json',
    'ms-fortune.json',
    'painwheel.json',
    'parasoul.json',
    'peacock.json',
    'robo-fortune.json',
    'squigly.json',
    'umbrella.json',
    'valentine.json'
];

// Character icon mapping for local images
const CHARACTER_ICONS = {
    'annie': 'img/icones/Annie_Icon.png',
    'beowulf': 'img/icones/Beowulf_Icon.png',
    'big-band': 'img/icones/BigBand_Icon.png',
    'black-dahlia': 'img/icones/BlackDahlia_Icon.png',
    'cerebella': 'img/icones/Cerebella_Icon.png',
    'double': 'img/icones/Double_Icon.png',
    'eliza': 'img/icones/Eliza_Icon.png',
    'filia': 'img/icones/Filia_Icon.png',
    'fukua': 'img/icones/Fukua_Icon.png',
    'marie': 'img/icones/Marie_Icon.png',
    'ms-fortune': 'img/icones/MsFortune_Icon.png',
    'painwheel': 'img/icones/Painwheel_Icon.png',
    'parasoul': 'img/icones/Parasoul_Icon.png',
    'peacock': 'img/icones/Peacock_Icon.png',
    'robo-fortune': 'img/icones/RoboFortune_Icon.png',
    'squigly': 'img/icones/Squigly_Icon.png',
    'umbrella': 'img/icones/Umbrella_Icon.png',
    'valentine': 'img/icones/Valentine_Icon.png'
};

// Character accent colors mapping
const CHARACTER_COLORS = {
    'annie': '#00a8a8',
    'beowulf': '#858585',
    'big-band': '#808040',
    'black-dahlia': '#3e003e',
    'cerebella': '#ff5402',
    'double': '#5050a3',
    'eliza': '#ffd700',
    'filia': '#000000',
    'fukua': '#006000',
    'marie': '#888888',
    'ms-fortune': '#0099ff',
    'painwheel': '#797900',
    'parasoul': '#ff0000',
    'peacock': '#c60000',
    'robo-fortune': '#005151',
    'squigly': '#800080',
    'umbrella': '#ffff00',
    'valentine': '#FFFFFF'
};

// Element mapping
const ELEMENT_MAP = {
    'Fogo': { class: 'fire', icon: '🔥', key: 'fogo', iconPath: 'img/icones/ElementalIconFire.png' },
    'Água': { class: 'water', icon: '💧', key: 'agua', iconPath: 'img/icones/ElementalIconWater.png' },
    'Ar': { class: 'wind', icon: '🌪️', key: 'ar', iconPath: 'img/icones/ElementalIconWind.png' },
    'Luz': { class: 'light', icon: '☀️', key: 'luz', iconPath: 'img/icones/ElementalIconLight.png' },
    'Trevas': { class: 'dark', icon: '🌙', key: 'trevas', iconPath: 'img/icones/ElementalIconDark.png' },
    'Neutro': { class: 'neutral', icon: '⚪', key: 'neutro', iconPath: 'img/icones/ElementalIconNeutral.png' }
};

// ========== GLOBAL STATE ==========
let allCharactersData = {};
let currentCharacter = null;
let activeFilters = {
    rarity: 'diamante',
    element: null
};
let currentSort = {
    type: 'score',
    direction: 'desc'
};
let statisticsData = null;
let catalystsData = null;
let disclaimerTimer = null;

// Mock Tier Data (Should be moved to JSONs later)
const TIER_DATA = {
    'annie': {
        'Rosa Estelar': { pf: 'S', riftOff: 'S', riftDef: 'A', parallel: 'SS' },
        'Modelo Submarina': { pf: 'A', riftOff: 'A', riftDef: 'S', parallel: 'A' },
        'Brilho das Estrelas': { pf: 'S', riftOff: 'A', riftDef: 'B', parallel: 'S' },
        'Marcas de Fogo': { pf: 'SS', riftOff: 'S', riftDef: 'C', parallel: 'S' },
        'Vínculo de Alma': { pf: 'S', riftOff: 'A', riftDef: 'B', parallel: 'A' },
        'Maravilha Eterna': { pf: 'A', riftOff: 'B', riftDef: 'A', parallel: 'B' },
        'Ondina': { pf: 'A', riftOff: 'B', riftDef: 'B', parallel: 'A' },
        'Heroína do Tempo': { pf: 'B', riftOff: 'C', riftDef: 'C', parallel: 'B' },
        'Garota Material': { pf: 'B', riftOff: 'B', riftDef: 'B', parallel: 'B' },
        'Rebelde Cósmica': { pf: 'A', riftOff: 'A', riftDef: 'B', parallel: 'B' },
        'Princesa da Lua': { pf: 'B', riftOff: 'B', riftDef: 'A', parallel: 'B' },
        'Ameaça Tripla': { pf: 'B', riftOff: 'B', riftDef: 'B', parallel: 'B' },
        'Glamour Galático': { pf: 'C', riftOff: 'C', riftDef: 'B', parallel: 'C' },
        'Estrela Ninja': { pf: 'S', riftOff: 'A', riftDef: 'C', parallel: 'B' },
        'Srta. Mercúrio': { pf: 'B', riftOff: 'B', riftDef: 'B', parallel: 'B' },
        'Criança Estelar': { pf: 'B', riftOff: 'C', riftDef: 'C', parallel: 'C' },
        'Chama Solar': { pf: 'C', riftOff: 'C', riftDef: 'C', parallel: 'C' }
    },
    'beowulf': {
        'Rei das Feras': { pf: 'SS', riftOff: 'SS', riftDef: 'B', parallel: 'SS' },
        'Poder Sombrio': { pf: 'S', riftOff: 'S', riftDef: 'A', parallel: 'S' },
        'Picada de Cobra': { pf: 'S', riftOff: 'S', riftDef: 'B', parallel: 'S' },
        'Ogros Têm Camadas': { pf: 'A', riftOff: 'S', riftDef: 'A', parallel: 'A' },
        'Combatente da Liberdade': { pf: 'B', riftOff: 'B', riftDef: 'S', parallel: 'B' },
        'Dragão Brigão': { pf: 'A', riftOff: 'A', riftDef: 'B', parallel: 'A' },
        'Praga do Lobo': { pf: 'S', riftOff: 'A', riftDef: 'B', parallel: 'A' },
        'Pico Bola': { pf: 'A', riftOff: 'A', riftDef: 'B', parallel: 'A' },
        'Último Lutador': { pf: 'B', riftOff: 'B', riftDef: 'B', parallel: 'B' },
        'Homem de Gelo': { pf: 'B', riftOff: 'C', riftDef: 'C', parallel: 'B' },
        'Lutador X': { pf: 'B', riftOff: 'B', riftDef: 'B', parallel: 'B' },
        'Número Um': { pf: 'C', riftOff: 'C', riftDef: 'C', parallel: 'B' },
        'Promotor': { pf: 'B', riftOff: 'B', riftDef: 'B', parallel: 'B' },
        'Favorito dos Fãs': { pf: 'C', riftOff: 'C', riftDef: 'C', parallel: 'C' },
        'Alma de Pedra': { pf: 'C', riftOff: 'C', riftDef: 'C', parallel: 'C' },
        'Lobo Azarão': { pf: 'B', riftOff: 'C', riftDef: 'C', parallel: 'C' }
    },
    'big-band': {
        'Bandido de Bronze': { pf: 'S', riftOff: 'B', riftDef: 'A', parallel: 'B' },
        'Banda dos Sonhos': { pf: 'A', riftOff: 'C', riftDef: 'SS', parallel: 'B' },
        'Heavy Metal': { pf: 'B', riftOff: 'C', riftDef: 'S', parallel: 'B' },
        'G.I. JAZZ': { pf: 'C', riftOff: 'C', riftDef: 'A', parallel: 'C' },
        'Megassônico': { pf: 'A', riftOff: 'B', riftDef: 'S', parallel: 'A' },
        'Pânico na Cidade': { pf: 'B', riftOff: 'C', riftDef: 'B', parallel: 'B' },
        'Rodas Rítmicas': { pf: 'B', riftOff: 'C', riftDef: 'B', parallel: 'B' },
        'Detetive "Dick"': { pf: 'C', riftOff: 'C', riftDef: 'B', parallel: 'C' },
        'Big Baddy': { pf: 'C', riftOff: 'C', riftDef: 'C', parallel: 'C' },
        'Ganhando Vantagem': { pf: 'B', riftOff: 'B', riftDef: 'B', parallel: 'B' },
        'Virtuoso Vintage': { pf: 'C', riftOff: 'C', riftDef: 'C', parallel: 'C' },
        'Robocópia': { pf: 'C', riftOff: 'C', riftDef: 'B', parallel: 'C' },
        'Resonant Evil': { pf: 'B', riftOff: 'C', riftDef: 'S', parallel: 'C' },
        'Desarmonizador': { pf: 'B', riftOff: 'B', riftDef: 'B', parallel: 'B' },
        'Batidas Rítmicas': { pf: 'C', riftOff: 'C', riftDef: 'C', parallel: 'C' },
        'Superjazz': { pf: 'C', riftOff: 'C', riftDef: 'C', parallel: 'C' }
    }
};

// Helper to get mastery icon path from charKey
function getMasteryIcon(charKey) {
    const pascalName = charKey.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
    // Special case for Robofortune (lowercase f in asset)
    const fileName = pascalName === 'RoboFortune' ? 'Robofortune' : pascalName;
    return `img/icones/${fileName}_MasteryIcon.png`;
}

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    // Load all data
    loadAllCharacterData();
    loadStatisticsData();
    loadCatalystsData();

    // Generate test tier list (after characters load)
    generateTestTierList();

    // Setup lazy loading observer
    setupLazyLoading();

    // Always show landing hub on load
    showSection('landing-hub', false);

    // Handle browser back/forward
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.section) {
            showSection(event.state.section, false);
            if (event.state.character) {
                openCharacterDetails(event.state.character, false);
            }
        } else {
            showSection('landing-hub', false);
        }
    });
});

// ========== NAVIGATION ==========
function showSection(sectionId, updateHistory = true) {
    // Hide all sections
    document.querySelectorAll('main > section').forEach(section => {
        section.classList.remove('active-section');
        section.classList.add('hidden-section');
    });

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden-section');
        targetSection.classList.add('active-section');
    }

    // Explicitly handle landing-hub visibility
    const landingHub = document.getElementById('landing-hub');
    if (sectionId === 'landing-hub') {
        landingHub.classList.remove('hidden-section');
        landingHub.classList.add('active-section');
    } else {
        landingHub.classList.remove('active-section');
        landingHub.classList.add('hidden-section');
    }

    // Navbar visibility logic
    const navbar = document.querySelector('.navbar');
    if (sectionId === 'landing-hub') {
        navbar.classList.add('hidden-nav');
    } else {
        navbar.classList.remove('hidden-nav');
    }

    // Persistence removed as per user request to always start at landing hub

    // Update nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        const onclick = link.getAttribute('onclick');
        if (onclick && onclick.includes(`'${sectionId}'`)) {
            link.classList.add('active');
        }
    });

    // Close mobile menu
    const navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.classList.remove('active');

    // Update history
    if (updateHistory) {
        history.pushState({ section: sectionId }, '', `#${sectionId}`);
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Tier List Grid Logic
    if (sectionId === 'tierlist') {
        renderTierListCharGrid();
    }

    // Trigger scroll check to hide/show scroll nav immediately
    window.dispatchEvent(new Event('scroll'));
}

function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

// ========== ABOUT DRAWER ==========
function toggleAboutDrawer() {
    const drawer = document.getElementById('about-drawer');
    const overlay = document.getElementById('drawer-overlay');
    if (drawer && overlay) {
        drawer.classList.toggle('active');
        overlay.classList.toggle('active');

        // Prevent body scroll when drawer is open
        document.body.style.overflow = drawer.classList.contains('active') ? 'hidden' : '';
    }
}

function toggleDisclaimer() {
    const content = document.getElementById('disclaimer-content');
    if (!content) return;

    content.classList.toggle('active');

    // If active, start 7s auto-hide timer
    if (content.classList.contains('active')) {
        startDisclaimerTimer();
    } else {
        clearTimeout(disclaimerTimer);
    }
}

function startDisclaimerTimer() {
    clearTimeout(disclaimerTimer);
    disclaimerTimer = setTimeout(() => {
        const content = document.getElementById('disclaimer-content');
        if (content) content.classList.remove('active');
    }, 7000);
}

// Global listeners for disclaimer hover to reset/trigger timer
document.addEventListener('DOMContentLoaded', () => {
    const disclaimerBox = document.querySelector('.disclaimer-tooltip');
    if (disclaimerBox) {
        disclaimerBox.addEventListener('mouseenter', () => {
            clearTimeout(disclaimerTimer);
        });
        disclaimerBox.addEventListener('mouseleave', () => {
            const content = document.getElementById('disclaimer-content');
            if (content && content.classList.contains('active')) {
                startDisclaimerTimer();
            }
        });
    }
});

// ========== CHARACTER DATA LOADING ==========
async function loadAllCharacterData() {
    const grid = document.getElementById('character-grid');

    try {
        const promises = CHARACTER_FILES.map(file =>
            fetch(`data/${file}`)
                .then(res => res.json())
                .then(data => {
                    const charKey = file.replace('.json', '').toLowerCase();
                    allCharactersData[charKey] = data;
                    return data;
                })
                .catch(err => {
                    console.warn(`Error loading ${file}:`, err);
                    return null;
                })
        );

        await Promise.all(promises);
        renderCharacterGrid();

    } catch (error) {
        console.error('Error loading character data:', error);
        grid.innerHTML = '<p style="color: var(--text-muted); text-align: center;">Erro ao carregar personagens.</p>';
    }
}

function renderCharacterGrid() {
    const grid = document.getElementById('character-grid');
    grid.innerHTML = '';

    // Sort characters alphabetically
    const sortedChars = Object.entries(allCharactersData)
        .filter(([key, data]) => data && data.character)
        .sort((a, b) => a[1].character.localeCompare(b[1].character));

    sortedChars.forEach(([charKey, charData], index) => {
        const card = createCharacterCard(charKey, charData, index);
        grid.appendChild(card);
    });
}

function createCharacterCard(charKey, charData, index) {
    const card = document.createElement('div');
    card.className = 'character-card animate-in';
    card.style.animationDelay = `${index * 0.03}s`;

    // Apply custom accent color
    const charColor = CHARACTER_COLORS[charKey] || 'var(--accent-gold)';
    card.style.setProperty('--char-accent', charColor);

    // Get local icon
    const iconPath = CHARACTER_ICONS[charKey] || `img/${charKey}/icon.png`;

    card.innerHTML = `
        <img src="${iconPath}" alt="${charData.character}" loading="lazy" 
             onerror="this.src='img/icones/Annie_Icon.png'">
        <div class="name">${charData.character.toUpperCase()}</div>
    `;

    card.onclick = () => openCharacterDetails(charKey);

    return card;
}

// ========== TIER LIST LOGIC ==========
function renderTierListCharGrid() {
    const grid = document.getElementById('tierlist-char-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const sortedChars = Object.entries(allCharactersData)
        .filter(([key, data]) => data && data.character)
        .sort((a, b) => a[1].character.localeCompare(b[1].character));

    sortedChars.forEach(([charKey, charData], index) => {
        const card = createCharacterCard(charKey, charData, index);
        // Override onclick for Tier List detail
        card.onclick = () => openTierListDetail(charKey);
        grid.appendChild(card);
    });
}

function openTierListDetail(charKey) {
    // Instead of a separate section, we now open the character details on the 'tier' tab
    openCharacterDetails(charKey, 'tier');
}

let isEditorMode = false;

// Load persisted data if available
if (localStorage.getItem('TIER_DATA_PERSISTED')) {
    try {
        const persisted = JSON.parse(localStorage.getItem('TIER_DATA_PERSISTED'));
        Object.assign(TIER_DATA, persisted);
    } catch (e) { console.error('Error loading persisted tier data', e); }
}

let isCompactMode = localStorage.getItem('TIER_COMPACT_MODE') === 'true';

function toggleCompactMode() {
    isCompactMode = document.getElementById('compact-mode-toggle').checked;
    localStorage.setItem('TIER_COMPACT_MODE', isCompactMode);

    const table = document.querySelector('.tier-table');
    if (table) {
        table.classList.toggle('compact-mode', isCompactMode);
    }

    // Re-render to ensure any JS-driven sizing is fresh
    if (currentCharacter) renderTierTable(currentCharacter);
}

function toggleEditorMode() {
    isEditorMode = document.getElementById('editor-mode-toggle').checked;
    const table = document.querySelector('.tier-table');
    if (table) {
        table.classList.toggle('editing', isEditorMode);
    }
}

function saveTierDataDirectly() {
    localStorage.setItem('TIER_DATA_PERSISTED', JSON.stringify(TIER_DATA));

    // Group variants for export
    console.log('--- DADOS PARA O CÓDIGO FINAL ---');
    console.log(JSON.stringify(TIER_DATA, null, 4));

    alert('Alterações salvas no seu navegador! \n\nPara que fiquem fixas para todos no futuro, eu (Antigravity) precisarei atualizar o arquivo final com esses dados que acabamos de salvar.');
}

function cycleRank(charKey, variantName, mode) {
    if (!isEditorMode) return;

    const ranks = ['SS', 'S', 'A', 'B', 'C', 'U', 'TBD'];
    const currentRanks = TIER_DATA[charKey] && TIER_DATA[charKey][variantName]
        ? TIER_DATA[charKey][variantName]
        : { pf: 'B', riftOff: 'B', riftDef: 'B', parallel: 'B' };

    const newVal = ranks[(ranks.indexOf(currentRanks[mode]) + 1) % ranks.length];

    if (!TIER_DATA[charKey]) TIER_DATA[charKey] = {};
    if (!TIER_DATA[charKey][variantName]) TIER_DATA[charKey][variantName] = { ...currentRanks };
    TIER_DATA[charKey][variantName][mode] = newVal;

    renderTierTable(charKey);
}

function renderTierTable(charKey) {
    const tbody = document.getElementById('detail-tier-table-body');
    const charData = allCharactersData[charKey];
    const tierMapping = TIER_DATA[charKey] || {};

    if (!tbody) return;
    tbody.innerHTML = '';

    // Flatten all variants
    let allVariants = [];
    if (charData.variants) {
        Object.entries(charData.variants).forEach(([rarity, variants]) => {
            variants.forEach(v => allVariants.push({ ...v, rarityKey: rarity }));
        });
    }

    // Apply active filters
    let filtered = allVariants;
    if (activeFilters.rarity.length > 0) {
        filtered = filtered.filter(v => activeFilters.rarity.includes(v.rarityKey));
    }
    if (activeFilters.element.length > 0) {
        filtered = filtered.filter(v => {
            const elementInfo = ELEMENT_MAP[v.element];
            return elementInfo && activeFilters.element.includes(elementInfo.key);
        });
    }

    // Apply Sorting
    filtered.sort((a, b) => {
        let valA, valB;
        if (currentSort.type === 'class') {
            const rarityOrder = { 'diamante': 4, 'ouro': 3, 'prata': 2, 'bronze': 1 };
            valA = rarityOrder[a.rarityKey] || 0;
            valB = rarityOrder[b.rarityKey] || 0;
        } else if (currentSort.type === 'element') {
            const elementOrder = { 'Fogo': 1, 'Água': 2, 'Ar': 3, 'Luz': 4, 'Trevas': 5, 'Neutro': 6 };
            valA = elementOrder[a.element] || 99;
            valB = elementOrder[b.element] || 99;
        } else {
            // Default: 'name' or anything else allowed in Tier mode
            valA = a.name;
            valB = b.name;
        }

        if (valA < valB) return currentSort.direction === 'asc' ? -1 : 1;
        if (valA > valB) return currentSort.direction === 'asc' ? 1 : -1;
        return 0;
    });

    filtered.forEach(variant => {
        const ranks = tierMapping[variant.name] || { pf: 'B', riftOff: 'B', riftDef: 'B', parallel: 'B' };
        const row = document.createElement('tr');

        const imgPath = (VARIANT_IMAGES[charKey] && VARIANT_IMAGES[charKey][variant.name])
            ? VARIANT_IMAGES[charKey][variant.name]
            : `img/${charKey}/portrait.png`;

        row.innerHTML = `
            <td>
                <div class="tier-char-cell">
                    <img src="${imgPath}" alt="${variant.name}" onerror="this.src='img/icones/Annie_Icon.png'">
                    <span>${variant.name}</span>
                </div>
            </td>
            <td class="text-center"><div class="rank-cell-container text-center" onclick="cycleRank('${charKey}', '${variant.name}', 'pf')">${createRankBadge(ranks.pf)}</div></td>
            <td class="text-center"><div class="rank-cell-container text-center" onclick="cycleRank('${charKey}', '${variant.name}', 'riftOff')">${createRankBadge(ranks.riftOff)}</div></td>
            <td class="text-center"><div class="rank-cell-container text-center" onclick="cycleRank('${charKey}', '${variant.name}', 'riftDef')">${createRankBadge(ranks.riftDef)}</div></td>
            <td class="text-center"><div class="rank-cell-container text-center" onclick="cycleRank('${charKey}', '${variant.name}', 'parallel')">${createRankBadge(ranks.parallel)}</div></td>
        `;
        tbody.appendChild(row);
    });

    if (filtered.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="5" class="text-center" style="padding: 40px; color: var(--text-muted);">Nenhuma variante encontrada com estes filtros.</td>`;
        tbody.appendChild(row);
    }

    // Sync visuals
    const table = document.querySelector('.tier-table');
    if (table) {
        table.classList.toggle('editing', isEditorMode);
        table.classList.toggle('compact-mode', isCompactMode);
    }

    // Sync toggle state in UI
    const compactToggle = document.getElementById('compact-mode-toggle');
    if (compactToggle) compactToggle.checked = isCompactMode;
}

function createRankBadge(rank) {
    const rankClass = `rank-${rank.toLowerCase()}`;
    return `<div class="rank-badge ${rankClass}">${rank}</div>`;
}

// ========== CHARACTER DETAILS ==========
function openCharacterDetails(charKey, initialTab = 'builds', updateHistory = true) {
    const charData = allCharactersData[charKey];
    if (!charData) return;

    currentCharacter = charKey;

    // Set initial tab
    switchCharDetailMode(initialTab, false);

    // Mastery icon mapping
    const masteryIconPath = getMasteryIcon(charKey);

    // Update title with Mastery Icon or fallback emoji
    document.getElementById('detail-char-name').innerHTML = `
        <img src="${masteryIconPath}" class="mastery-icon" onerror="this.outerHTML='<span>⚔️</span>'"> ${charData.character}
    `;

    // Reset filters
    activeFilters = {
        rarity: [],
        element: []
    };
    currentSort = {
        type: 'score',
        direction: 'desc'
    };

    updateFilterUI();

    // Show detail section
    showSection('character-detail', false);

    // Update history
    if (updateHistory) {
        history.pushState({ section: 'character-detail', character: charKey }, '', `#${charKey}`);
    }

    renderVariants();
    renderCharacterNav(); // NEW: Render character icons in filter bar
}

function renderCharacterNav() {
    const dropdownContent = document.getElementById('char-dropdown-content');
    const currentLabel = document.getElementById('current-char-label');
    if (!dropdownContent) return;

    // Update the button label with the current character
    const char = allCharactersData[currentCharacter];
    if (char && currentLabel) {
        const masteryIcon = getMasteryIcon(currentCharacter);

        currentLabel.innerHTML = `
            <img src="${masteryIcon}" alt="" style="width:24px; height:24px; object-fit:contain;">
            ${char.character}
        `;
    }

    // Populate the dropdown list
    const sortedCharKeys = Object.keys(allCharactersData).sort((a, b) => {
        return allCharactersData[a].character.localeCompare(allCharactersData[b].character);
    });

    // Get current tab once for the whole list
    const currentTab = document.querySelector('.tab-btn.active')?.dataset.tab || 'builds';

    dropdownContent.innerHTML = sortedCharKeys.map(charKey => {
        const char = allCharactersData[charKey];
        const mIcon = getMasteryIcon(charKey);
        const activeClass = charKey === currentCharacter ? 'active' : '';

        return `
            <button class="char-dropdown-item ${activeClass}" 
                    onclick="openCharacterDetails('${charKey}', '${currentTab}'); toggleCharDropdown();">
                <img src="${mIcon}" alt="" onerror="this.src='img/icones/Annie_Icon.png'">
                <span>${char.character}</span>
            </button>
        `;
    }).join('');
}

function toggleCharDropdown() {
    const dropdown = document.getElementById('char-dropdown');
    const content = document.getElementById('char-dropdown-content');
    if (dropdown && content) {
        dropdown.classList.toggle('active');
        content.classList.toggle('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('char-dropdown');
    const content = document.getElementById('char-dropdown-content');
    if (dropdown && !dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
        content.classList.remove('active');
    }
});

function updateFilterUI() {
    // Update Rarity Buttons (multi-select)
    document.querySelectorAll('.rarity-btn').forEach(btn => {
        if (activeFilters.rarity.includes(btn.dataset.rarity)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update Element Buttons (multi-select)
    document.querySelectorAll('.element-btn').forEach(btn => {
        if (activeFilters.element.includes(btn.dataset.element)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update Sort Buttons
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.classList.remove('active');
        const baseText = btn.innerText.replace(/ [↑↓]/, ''); // Ensure we don't duplicate arrows if multiple calls happened (though we usually reset innerText in a more robust app, here we just assume simple text)
        // Actually, let's just reset text mapped by data-sort to be safe, or just append. 
        // Simplest: 
        const sortLabels = {
            'score': 'PONTUAÇÃO',
            'atk': 'ATAQUE',
            'hp': 'VIDA',
            'name': 'ORDEM ALFABÉTICA',
            'element': 'ELEMENTO',
            'class': 'CATEGORIA'
        };
        btn.innerText = sortLabels[btn.dataset.sort] || btn.dataset.sort;

        if (btn.dataset.sort === currentSort.type) {
            btn.classList.add('active');
            const arrow = currentSort.direction === 'asc' ? ' ↑' : ' ↓';
            btn.innerText += arrow;
        }
    });
}

function toggleFilter(type, value) {
    if (type === 'rarity') {
        const index = activeFilters.rarity.indexOf(value);
        if (index > -1) {
            activeFilters.rarity.splice(index, 1); // Remove
        } else {
            activeFilters.rarity.push(value); // Add
        }
    } else if (type === 'element') {
        const index = activeFilters.element.indexOf(value);
        if (index > -1) {
            activeFilters.element.splice(index, 1); // Remove
        } else {
            activeFilters.element.push(value); // Add
        }
    }
    updateFilterUI();
    renderVariants();

    // Also update tier table if we are on character detail and in tier tab
    const detailContainer = document.getElementById('character-detail');
    if (currentCharacter && detailContainer && detailContainer.classList.contains('tier-list-mode')) {
        renderTierTable(currentCharacter);
    }
    // Clear Button Visibility
    const hasActiveFilters = activeFilters.rarity.length > 0 || activeFilters.element.length > 0 || currentSort.type !== 'score' || currentSort.direction !== 'desc';
    const clearBtn = document.querySelector('.clear-filters-btn');
    if (clearBtn) {
        if (hasActiveFilters) {
            clearBtn.classList.add('visible');
        } else {
            clearBtn.classList.remove('visible');
        }
    }
}

function clearFilters() {
    activeFilters = {
        rarity: [],
        element: []
    };
    currentSort = {
        type: 'score',
        direction: 'desc'
    };
    updateFilterUI();
    renderVariants();

    if (currentCharacter) {
        renderTierTable(currentCharacter);
    }
}

function toggleFilterVisibility() {
    const filterContent = document.getElementById('filter-content');
    const filterBtn = document.querySelector('.filter-toggle-btn');
    const filterBar = document.querySelector('.filter-bar');

    if (filterContent) {
        // Toggle active class for animation
        filterContent.classList.toggle('active');

        // Also toggle hidden class if we were using it, though CSS now handles opacity/height
        filterContent.classList.remove('hidden'); // Ensure it's not display:none

        if (filterBtn) {
            filterBtn.classList.toggle('active');
        }

        if (filterBar) {
            filterBar.classList.toggle('active');
        }
    }
}

function toggleSort(sortType) {
    if (currentSort.type === sortType) {
        // Toggle direction
        currentSort.direction = currentSort.direction === 'desc' ? 'asc' : 'desc';
    } else {
        // New sort type
        currentSort.type = sortType;
        currentSort.direction = ['name', 'element', 'class'].includes(sortType) ? 'asc' : 'desc';
    }
    updateFilterUI();
    renderVariants();

    // Trigger tier table update if active
    if (currentCharacter) {
        renderTierTable(currentCharacter);
    }
}

function renderVariants() {
    const container = document.getElementById('variants-container');
    const charData = allCharactersData[currentCharacter];

    if (!charData || !charData.variants) {
        container.innerHTML = '<p style="color: var(--text-muted);">Nenhuma variante encontrada.</p>';
        return;
    }

    // Flatten all variants from all rarities
    let allVariants = [];
    Object.entries(charData.variants).forEach(([rarity, variants]) => {
        // Add rarity info to variant object for filtering
        variants.forEach(v => {
            allVariants.push({ ...v, rarityKey: rarity });
        });
    });

    // Apply Filters
    let filtered = allVariants;

    // Rarity Filter (multi-select)
    if (activeFilters.rarity.length > 0) {
        filtered = filtered.filter(v => activeFilters.rarity.includes(v.rarityKey));
    }

    // Element Filter (multi-select)
    if (activeFilters.element.length > 0) {
        filtered = filtered.filter(v => {
            const elementInfo = ELEMENT_MAP[v.element];
            return elementInfo && activeFilters.element.includes(elementInfo.key);
        });
    }

    // Apply Sorting
    filtered.sort((a, b) => {
        let valA, valB;

        switch (currentSort.type) {
            case 'score':
                valA = parseStatValue(a.stats?.power);
                valB = parseStatValue(b.stats?.power);
                break;
            case 'atk':
                valA = parseStatValue(a.stats?.attack);
                valB = parseStatValue(b.stats?.attack);
                break;
            case 'hp':
                valA = parseStatValue(a.stats?.health);
                valB = parseStatValue(b.stats?.health);
                break;
            case 'name':
                valA = a.name;
                valB = b.name;
                break;
            case 'element':
                // Element order: Fogo, Água, Ar, Luz, Trevas, Neutro
                const elementOrder = { 'Fogo': 1, 'Água': 2, 'Ar': 3, 'Luz': 4, 'Trevas': 5, 'Neutro': 6 };
                valA = elementOrder[a.element] || 99;
                valB = elementOrder[b.element] || 99;
                break;
            case 'class':
                // Assuming class is the character name since we are in character details? 
                // Wait, variants don't usually have "class". 
                // Maybe they mean "Variant Name" vs "Character Name"? 
                // But we are inside a character detail, so character name is same.
                // It might mean Rarity? Let's map 'class' to 'rarityKey' for now.
                // Rarity order: Diamond > Gold > Silver > Bronze
                const rarityOrder = { 'diamante': 4, 'ouro': 3, 'prata': 2, 'bronze': 1 };
                valA = rarityOrder[a.rarityKey] || 0;
                valB = rarityOrder[b.rarityKey] || 0;
                break;
            default:
                valA = a.name;
                valB = b.name;
        }

        if (valA < valB) return currentSort.direction === 'asc' ? -1 : 1;
        if (valA > valB) return currentSort.direction === 'asc' ? 1 : -1;
        return 0;
    });

    if (filtered.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted); padding: 20px;">Nenhuma variante encontrada com estes filtros.</p>';
        return;
    }

    container.innerHTML = filtered.map((variant, index) => createVariantCard(variant, index)).join('');
}

function switchCharDetailMode(mode, updateHistory = false) {
    // Toggle content
    const buildsView = document.getElementById('char-detail-builds');
    const tierView = document.getElementById('char-detail-tier');

    const detailContainer = document.getElementById('character-detail');
    const navHeader = document.getElementById('char-nav-header');

    if (mode === 'builds') {
        buildsView.classList.remove('hidden-section');
        tierView.classList.add('hidden-section');
        if (detailContainer) detailContainer.classList.remove('tier-list-mode');
        if (navHeader) navHeader.innerText = 'MUDE O PERSONAGEM';
    } else {
        buildsView.classList.add('hidden-section');
        tierView.classList.remove('hidden-section');
        if (detailContainer) detailContainer.classList.add('tier-list-mode');
        if (navHeader) navHeader.innerText = 'MUDE A TIER LIST';

        // Set default sorting for Tier List: Categoria (Class) descending
        currentSort.type = 'class';
        currentSort.direction = 'desc';
        updateFilterUI();

        renderTierTable(currentCharacter);
    }

    // Toggle buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.dataset.tab === mode) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update navigator icons state since the click handler needs the fresh tab mode
    renderCharacterNav();

    // Update history for deep linking if requested
    if (updateHistory && currentCharacter) {
        history.replaceState({ section: 'character-detail', character: currentCharacter, tab: mode }, '', `#${currentCharacter}/${mode}`);
    }
}

const VARIANT_IMAGES = {
    'annie': {
        'Rosa Estelar': 'img/annie/Annie_16.png',
        'Modelo Submarina': 'img/annie/Annie_13.png',
        'Brilho das Estrelas': 'img/annie/Annie_15.png',
        'Marcas de Fogo': 'img/annie/Annie_14.png',
        'Vínculo de Alma': 'img/annie/Annie_17.png',
        'Maravilha Eterna': 'img/annie/Annie_7.png',
        'Ondina': 'img/annie/Annie_12.png',
        'Heroína do Tempo': 'img/annie/Annie_10.png',
        'Garota Material': 'img/annie/Annie_8.png',
        'Rebelde Cósmica': 'img/annie/Annie_11.png',
        'Princesa da Lua': 'img/annie/Annie_9.png',
        'Ameaça Tripla': 'img/annie/Annie_4.png',
        'Glamour Galático': 'img/annie/Annie_3.png',
        'Estrela Ninja': 'img/annie/Annie_5.png',
        'Srta. Mercúrio': 'img/annie/Annie_6.png',
        'Criança Estelar': 'img/annie/Annie_1.png',
        'Chama Solar': 'img/annie/Annie_2.png'
    },
    'beowulf': {
        'Rei das Feras': 'img/beowulf/Beowulf_15.png',
        'Poder Sombrio': 'img/beowulf/Beowulf_13.png',
        'Picada de Cobra': 'img/beowulf/Beowulf_14.png',
        'Ogros Têm Camadas': 'img/beowulf/Beowulf_16.png',
        'Combatente da Liberdade': 'img/beowulf/Beowulf_10.png',
        'Dragão Brigão': 'img/beowulf/Beowulf_9.png',
        'Praga do Lobo': 'img/beowulf/Beowulf_7.png',
        'Pico Bola': 'img/beowulf/Beowulf_11.png',
        'Último Lutador': 'img/beowulf/Beowulf_8.png',
        'Homem de Gelo': 'img/beowulf/Beowulf_12.png',
        'Lutador X': 'img/beowulf/Beowulf_5.png',
        'Número Um': 'img/beowulf/Beowulf_4.png',
        'Promotor': 'img/beowulf/Beowulf_3.png',
        'Favorito dos Fãs': 'img/beowulf/Beowulf_6.png',
        'Alma de Pedra': 'img/beowulf/Beowulf_2.png',
        'Lobo Azarão': 'img/beowulf/Beowulf_1.png'
    },
    'big-band': {
        'Bandido de Bronze': 'img/big-band/Big_Band_15.png',
        'Banda dos Sonhos': 'img/big-band/Big_Band_14.png',
        'Heavy Metal': 'img/big-band/Big_Band_13.png',
        'G.I. JAZZ': 'img/big-band/Big_Band_9.png',
        'Megassônico': 'img/big-band/Big_Band_10.png',
        'Pânico na Cidade': 'img/big-band/Big_Band_7.png',
        'Rodas Rítmicas': 'img/big-band/Big_Band_11.png',
        'Detetive "Dick"': 'img/big-band/Big_Band_8.png',
        'Big Baddy': 'img/big-band/Big_Band_30.png',
        'Ganhando Vantagem': 'img/big-band/Big_Band_12.png',
        'Virtuoso Vintage': 'img/big-band/Big_Band_6.png',
        'Robocópia': 'img/big-band/Big_Band_3.png',
        'Resonant Evil': 'img/big-band/Big_Band_4.png',
        'Desarmonizador': 'img/big-band/Big_Band_5.png',
        'Batidas Rítmicas': 'img/big-band/Big_Band_2.png',
        'Superjazz': 'img/big-band/Big_Band_1.png'
    },
    'black-dahlia': {
        'Hóstia Profana': 'img/black-dahlia/Black_Dahlia_14.png',
        'Pele Elegante': 'img/black-dahlia/Black_Dahlia_13.png',
        'Calibre Mágico': 'img/black-dahlia/Black_Dahlia_15.png',
        'Carregada': 'img/black-dahlia/Black_Dahlia_16.png',
        'Agente Corrosiva': 'img/black-dahlia/Black_Dahlia_9.png',
        'Fora-da-Lei Marcial': 'img/black-dahlia/Black_Dahlia_8.png',
        'Imperturbável': 'img/black-dahlia/Black_Dahlia_10.png',
        'Psicomandante': 'img/black-dahlia/Black_Dahlia_7.png',
        'Estelar': 'img/black-dahlia/Black_Dahlia_12.png',
        'Violência Vermelha': 'img/black-dahlia/Black_Dahlia_11.png',
        'Máquina Mortífera': 'img/black-dahlia/Black_Dahlia_3.png',
        'Esmaga-Alma': 'img/black-dahlia/Black_Dahlia_5.png',
        'Dame Slayer': 'img/black-dahlia/Black_Dahlia_4.png',
        'Perigo Biológico': 'img/black-dahlia/Black_Dahlia_6.png',
        'Gatilho Nervoso': 'img/black-dahlia/Black_Dahlia_1.png',
        'Pistola Dourada': 'img/black-dahlia/Black_Dahlia_2.png'
    },
    'cerebella': {
        'Estrelada': 'img/cerebella/Cerebella_14.png',
        'Mão Pesada': 'img/cerebella/Cerebella_13.png',
        'Mekastar': 'img/cerebella/Cerebella_15.png',
        'Ciclone Carmesim': 'img/cerebella/Cerebella_16.png',
        'Assustadora': 'img/cerebella/Cerebella_12.png',
        'Arlequim': 'img/cerebella/Cerebella_7.png',
        'Blitz e Glamour': 'img/cerebella/Cerebella_11.png',
        'Cérebro Gelado': 'img/cerebella/Cerebella_9.png',
        'Forças Armadas': 'img/cerebella/Cerebella_8.png',
        'Mente Criminosa': 'img/cerebella/Cerebella_10.png',
        'Massa Cinzenta': 'img/cerebella/Cerebella_3.png',
        'Guerreira Toad': 'img/cerebella/Cerebella_5.png',
        'Ressurgente': 'img/cerebella/Cerebella_4.png',
        'Sentinela de Pedra': 'img/cerebella/Cerebella_6.png',
        'Substituta': 'img/cerebella/Cerebella_1.png',
        'Cabeça Dura': 'img/cerebella/Cerebella_2.png'
    },
    'double': {
        'Criatura de Hábito': 'img/double/Double_15.png',
        'Coração da Escuridão': 'img/double/Double_14.png',
        'Quebra-Queixo': 'img/double/Double_13.png',
        'Altar Ego': 'img/double/Double_16.png',
        'Teoria do Caos': 'img/double/Double_12.png',
        'Maldade Eterna': 'img/double/Double_10.png',
        'Fibra Forte': 'img/double/Double_7.png',
        'Íris-Color': 'img/double/Double_9.png',
        'Xenamorfa': 'img/double/Double_8.png',
        'Bruxa do Mar': 'img/double/Double_12.png',
        'Tirana do Templo': 'img/double/Double_3.png',
        'Chicleteira': 'img/double/Double_4.png',
        'Misticatástrofe': 'img/double/Double_5.png',
        'Pecado da Serpente': 'img/double/Double_6.png',
        'Freirarteira': 'img/double/Double_1.png',
        'Sorvescola': 'img/double/Double_2.png'
    },
    'eliza': {
        'Múmia Querida': 'img/eliza/Eliza_14.png',
        'Don Passione': 'img/eliza/Eliza_15.png',
        'A Vampira': 'img/eliza/Eliza_13.png',
        'Senhor das Trevas': 'img/eliza/Eliza_16.png',
        'Veludo Vermelho': 'img/eliza/Eliza_9.png',
        'Magnata Nobre': 'img/eliza/Eliza_12.png',
        'Intervenção da Diva': 'img/eliza/Eliza_7.png',
        'Confusão Interior': 'img/eliza/Eliza_11.png',
        'Lazulita': 'img/eliza/Eliza_10.png',
        'Banho de Sangue': 'img/eliza/Eliza_8.png',
        'Sombria': 'img/eliza/Eliza_5.png',
        'Amor Sangrento': 'img/eliza/Eliza_3.png',
        'Víbora Escarlate': 'img/eliza/Eliza_4.png',
        'Sombruma': 'img/eliza/Eliza_6.png',
        'Rainha do Nilo': 'img/eliza/Eliza_1.png',
        'Decifrada': 'img/eliza/Eliza_2.png'
    },
    'filia': {
        'Cachinhos Malvados': 'img/filia/Filia_8.png',
        'Trança Parasita': 'img/filia/Filia_7.png',
        'Estrela Virtual': 'img/filia/Filia_10.png',
        'Cabelos ao Vento': 'img/filia/Filia_9.png',
        'Cacho Mágico': 'img/filia/Filia_12.png',
        'Quartzo Estelar': 'img/filia/Filia_5.png',
        'Frio Cortante': 'img/filia/Filia_3.png',
        'Cabelo Rebelde': 'img/filia/Filia_4.png',
        'Investigadora': 'img/filia/Filia_6.png',
        'Pontas Duplas': 'img/filia/Filia_2.png',
        'Cisalhamento': 'img/filia/Filia_16.png',
        'Matadora de Aula': 'img/filia/Filia_13.png',
        'Borrão Azul': 'img/filia/Filia_15.png',
        'Djinn Frizz': 'img/filia/Filia_14.png',
        'Escoteira': 'img/filia/Filia_11.png',
        'Descabelada': 'img/filia/Filia_1.png'
    },
    'fukua': {
        'Imagem Dividida': 'img/fukua/Fukua_12.png',
        'Complexo de Pico': 'img/fukua/Fukua_15.png',
        'Fantoche Sombrio': 'img/fukua/Fukua_13.png',
        'Demônio dos Sonhos': 'img/fukua/Fukua_14.png',
        'Eco de Estrela': 'img/fukua/Fukua_16.png',
        'Bordas Forradas': 'img/fukua/Fukua_7.png',
        'Terror Noturno': 'img/fukua/Fukua_9.png',
        'Megera Vaporwave': 'img/fukua/Fukua_8.png',
        'Bela do Inferno': 'img/fukua/Fukua_11.png',
        'Fios Fantasmas': 'img/fukua/Fukua_10.png',
        'Virada do Camaleão': 'img/fukua/Fukua_4.png',
        'Chuva Sombria': 'img/fukua/Fukua_3.png',
        'Irmãs de Alma': 'img/fukua/Fukua_5.png',
        'Falsa Temida': 'img/fukua/Fukua_6.png',
        'Cópia Aproximada': 'img/fukua/Fukua_1.png',
        'Gêmeo Infernal': 'img/fukua/Fukua_2.png'
    },
    'marie': {
        'Megalomaníaca': 'img/marie/Marie_14.png',
        'Sem Coração': 'img/marie/Marie_13.png',
        'Maldade Insana': 'img/marie/Marie_15.png',
        'Octoplasma': 'img/marie/Marie_8.png',
        'Coveira': 'img/marie/Marie_7.png',
        'Aspiradora de Fantasmas': 'img/marie/Marie_10.png',
        'A Todo Custo': 'img/marie/Marie_12.png',
        'Ceifadora Sorridente': 'img/marie/Marie_11.png',
        'Cavalo Sombrio': 'img/marie/Marie_9.png',
        'Dama de Honra': 'img/marie/Marie_4.png',
        'Encantadora de Serpentes': 'img/marie/Marie_3.png',
        'Domadora de Fantasmas': 'img/marie/Marie_5.png',
        'Osso Puro': 'img/marie/Marie_1.png',
        'Maga Marrenta': 'img/marie/Marie_2.png',
        'Abóbora Fantasma': 'img/marie/Marie_6.png'
    },
    'ms-fortune': {
        'Stalker de Vento': 'img/ms-fortune/Ms_Fortune_14.png',
        'Soldado de Infantaria': 'img/ms-fortune/Ms_Fortune_15.png',
        'Fúria Felpuda': 'img/ms-fortune/Ms_Fortune_13.png',
        'Biscoito da Sorte': 'img/ms-fortune/Ms_Fortune_16.png',
        'Agora e Sempre': 'img/ms-fortune/Ms_Fortune_8.png',
        'Miau e Ordem': 'img/ms-fortune/Ms_Fortune_7.png',
        'Ladra de Tempo': 'img/ms-fortune/Ms_Fortune_11.png',
        'Agente Trapaçeira': 'img/ms-fortune/Ms_Fortune_10.png',
        'Corta e Afoga': 'img/ms-fortune/Ms_Fortune_9.png',
        'Terripeluda': 'img/ms-fortune/Ms_Fortune_12.png',
        'Gata Negra': 'img/ms-fortune/Ms_Fortune_4.png',
        'Sra. Jurada': 'img/ms-fortune/Ms_Fortune_5.png',
        'Sorte Felina': 'img/ms-fortune/Ms_Fortune_3.png',
        'Remendada': 'img/ms-fortune/Ms_Fortune_6.png',
        'Brincadeirinha': 'img/ms-fortune/Ms_Fortune_1.png',
        'Gata do Inferno': 'img/ms-fortune/Ms_Fortune_2.png'
    },
    'painwheel': {
        'Escaladora de Paredes': 'img/painwheel/Painwheel_15.png',
        'Ameaça Mascarada': 'img/painwheel/Painwheel_16.png',
        'Neuromancer': 'img/painwheel/Painwheel_14.png',
        'Papa-moscas': 'img/painwheel/Painwheel_13.png',
        'VAGALUME': 'img/painwheel/Painwheel_9.png',
        'Frio Mordente': 'img/painwheel/Painwheel_11.png',
        'Gênese': 'img/painwheel/Painwheel_7.png',
        'Festa Macabra': 'img/painwheel/Painwheel_10.png',
        'Tirania': 'img/painwheel/Painwheel_12.png',
        'Corta-diversão': 'img/painwheel/Painwheel_8.png',
        'Jovem Fúria': 'img/painwheel/Painwheel_4.png',
        'Motor de Sangue': 'img/painwheel/Painwheel_3.png',
        'Sexta Esquisita': 'img/painwheel/Painwheel_5.png',
        'Serrada ao Meio': 'img/painwheel/Painwheel_6.png',
        'Enferrujada': 'img/painwheel/Painwheel_1.png',
        'Pura Coragem': 'img/painwheel/Painwheel_2.png'
    },
    'parasoul': {
        'Ruiva Fatal': 'img/parasoul/Parasoul_15.png',
        'Atração Fatal': 'img/parasoul/Parasoul_16.png',
        'Salgada': 'img/parasoul/Parasoul_14.png',
        'Bela do Bar': 'img/parasoul/Parasoul_17.png',
        'The Legend of Parasol': 'img/parasoul/Parasoul_11.png',
        'Indômita': 'img/parasoul/Parasoul_12.png',
        'Orgulho Real': 'img/parasoul/Parasoul_8.png',
        'Má Sorte': 'img/parasoul/Parasoul_10.png',
        'Loura Real': 'img/parasoul/Parasoul_9.png',
        'Varia': 'img/parasoul/Parasoul_7.png',
        'Matrona de Ferro': 'img/parasoul/Parasoul_13.png',
        'Operações Sombrias': 'img/parasoul/Parasoul_5.png',
        'Voo da Garça': 'img/parasoul/Parasoul_3.png',
        'Hera Uma Vez': 'img/parasoul/Parasoul_4.png',
        'Fã do Perigo': 'img/parasoul/Parasoul_6.png',
        'Resguardada': 'img/parasoul/Parasoul_1.png',
        'Reinado Duro': 'img/parasoul/Parasoul_2.png'
    },
    'peacock': {
        'Fica Frio': 'img/peacock/Peacock_13.png',
        'Apanhadora De Sonhos': 'img/peacock/Peacock_14.png',
        'Quebra de Contrato': 'img/peacock/Peacock_15.png',
        'Intocável': 'img/peacock/Peacock_7.png',
        'Velhos Tempos': 'img/peacock/Peacock_8.png',
        'Prodígio Primitivo': 'img/peacock/Peacock_11.png',
        'Ultraviolenta': 'img/peacock/Peacock_9.png',
        'A Malvada': 'img/peacock/Peacock_10.png',
        'Ícone Iônico': 'img/peacock/Peacock_12.png',
        'Supercuringa': 'img/peacock/Peacock_5.png',
        'Plumagem Prismática': 'img/peacock/Peacock_6.png',
        'Cara Pintada': 'img/peacock/Peacock_4.png',
        'Chumbinho': 'img/peacock/Peacock_3.png',
        'Reprise': 'img/peacock/Peacock_1.png',
        'Esboço': 'img/peacock/Peacock_2.png'
    },
    'robo-fortune': {
        'Overclocked': 'img/robo-fortune/Robo-Fortune_13.png',
        'X-Bot': 'img/robo-fortune/Robo-Fortune_14.png',
        'Replicada': 'img/robo-fortune/Robo-Fortune_15.png',
        'Pulso de Prótons': 'img/robo-fortune/Robo-Fortune_16.png',
        'Zona de Buffer': 'img/robo-fortune/Robo-Fortune_12.png',
        'Tela Azul': 'img/robo-fortune/Robo-Fortune_8.png',
        'Terror Byte': 'img/robo-fortune/Robo-Fortune_7.png',
        'Persona Grata': 'img/robo-fortune/Robo-Fortune_10.png',
        'Caça-cabeças': 'img/robo-fortune/Robo-Fortune_9.png',
        'Tritura-Números': 'img/robo-fortune/Robo-Fortune_11.png',
        'Bombardeiro Azul': 'img/robo-fortune/Robo-Fortune_5.png',
        'Nyanotec': 'img/robo-fortune/Robo-Fortune_3.png',
        'Protetor Vetor': 'img/robo-fortune/Robo-Fortune_6.png',
        'Ronrominador': 'img/robo-fortune/Robo-Fortune_4.png',
        'Protótipo': 'img/robo-fortune/Robo-Fortune_1.png',
        'M-1AU': 'img/robo-fortune/Robo-Fortune_2.png',
    },
    'squigly': {
        'Reviravolta': 'img/squigly/Squigly_14.png',
        'Lovecraftiana': 'img/squigly/Squigly_13.png',
        'Perigo Mortal': 'img/squigly/Squigly_15.png',
        'Ghoul Glacial': 'img/squigly/Squigly_16.png',
        'Frio de Matar': 'img/squigly/Squigly_8.png',
        'Bioexorcista': 'img/squigly/Squigly_9.png',
        'Thriller': 'img/squigly/Squigly_10.png',
        'Sopro da Morte': 'img/squigly/Squigly_7.png',
        'Artista Demônio': 'img/squigly/Squigly_11.png',
        'Roendo as Unhas': 'img/squigly/Squigly_12.png',
        'Verde Gangrena': 'img/squigly/Squigly_6.png',
        'Semimorta': 'img/squigly/Squigly_3.png',
        'Morta de Calor': 'img/squigly/Squigly_4.png',
        'Quebra-Morto': 'img/squigly/Squigly_5.png',
        'Medo do Palco': 'img/squigly/Squigly_1.png',
        'Branca de Medo': 'img/squigly/Squigly_2.png'
    },
    'umbrella': {
        'Desejo de Morte': 'img/umbrella/Umbrella_15.png',
        'Campeã dos Campeões': 'img/umbrella/Umbrella_14.png',
        'Artista Ilusionista': 'img/umbrella/Umbrella_13.png',
        'Angelical': 'img/umbrella/Umbrella_16.png',
        'Maruja dos Sete Mares': 'img/umbrella/Umbrella_9.png',
        'Visitante do Espaço': 'img/umbrella/Umbrella_8.png',
        'Saqueadora do Palácio': 'img/umbrella/Umbrella_12.png',
        'Wunderkind': 'img/umbrella/Umbrella_10.png',
        'Psicriança': 'img/umbrella/Umbrella_11.png',
        'Rosinha': 'img/umbrella/Umbrella_4.png',
        'Pirata de Poça': 'img/umbrella/Umbrella_5.png',
        'Mordida Doce': 'img/umbrella/Umbrella_6.png',
        'Criança Selvagem': 'img/umbrella/Umbrella_7.png',
        'Pitada de Raiva': 'img/umbrella/Umbrella_2.png',
        'Vento Ventania': 'img/umbrella/Umbrella_3.png',

    },
    'valentine': {
        'Preços para matar': 'img/valentine/Valentine_13.png',
        'Soldado Serafim': 'img/valentine/Valentine_16.png',
        'Negócio Sangrento': 'img/valentine/Valentine_15.png',
        'Très Chic': 'img/valentine/Valentine_14.png',
        'Perto da Morte': 'img/valentine/Valentine_17.png',
        'Última Esperança': 'img/valentine/Valentine_8.png',
        'Piro-técnica': 'img/valentine/Valentine_10.png',
        'Morro Quieto': 'img/valentine/Valentine_7.png',
        'Presa Final': 'img/valentine/Valentine_11.png',
        'Cirurgiã-General': 'img/valentine/Valentine_9.png',
        'Superluminal': 'img/valentine/Valentine_12.png',
        'Turno Mortal': 'img/valentine/Valentine_3.png',
        'Matadora Joy': 'img/valentine/Valentine_5.png',
        'Mai-s O Quê?': 'img/valentine/Valentine_4.png',
        'Hallow – Demônio': 'img/valentine/Valentine_6.png',
        'Jaleco': 'img/valentine/Valentine_1.png',
        'Quente com Gelo': 'img/valentine/Valentine_2.png',
    }
};

function createVariantCard(variant, index) {
    const elementInfo = ELEMENT_MAP[variant.element] || { icon: '⚪', class: 'neutral', iconPath: 'img/icones/ElementalIconNeutral.png' };

    // Get portrait URL
    let portraitUrl = '';

    // Check custom mapping first
    if (VARIANT_IMAGES[currentCharacter] && VARIANT_IMAGES[currentCharacter][variant.name]) {
        portraitUrl = VARIANT_IMAGES[currentCharacter][variant.name];
    } else {
        // Fallback logic
        portraitUrl = variant.images?.portrait_url || '';
        if (portraitUrl.includes('discord')) {
            portraitUrl = `img/${currentCharacter}/${currentCharacter}_${index}.png`;
        }
    }

    // Format ability description
    const abilityDesc = formatText(variant.signature_ability?.description || 'Sem descrição');

    // Format arsenal
    const arsenal = formatArsenal(variant.recommended_arsenal || '');

    // Get rarity display name
    // Use variant.rarityKey from the flattened object
    const rarityKey = variant.rarityKey || 'diamante';
    const rarityLabels = {
        'diamante': 'DIAMANTE',
        'ouro': 'OURO',
        'prata': 'PRATA',
        'bronze': 'BRONZE'
    };
    const rarityLabel = rarityLabels[rarityKey] || rarityKey.toUpperCase();

    return `
        <div class="variant-card ${rarityKey} animate-in" style="animation-delay: ${index * 0.05}s">
            <img src="${portraitUrl}" alt="${variant.name}" class="variant-portrait" loading="lazy"
                 onerror="this.src='img/icones/Annie_Icon.png'">
            
            <div class="variant-info">
                <div class="variant-header">
                    <h3>${variant.name}</h3>
                    <div class="variant-meta">
                        <span class="element-badge ${elementInfo.class}">
                            <img src="${elementInfo.iconPath}" alt="${variant.element}">
                            ${variant.element.toUpperCase()}
                        </span>
                        <span class="rarity-badge ${rarityKey}">${rarityLabel}</span>
                    </div>
                </div>
                
                <div class="variant-stats">
                    <div class="stat-item">
                        <img src="img/icones/AttackIcon.png" alt="ATQ" class="stat-icon">
                        <span class="label">ATQ</span>
                        <span class="value">${variant.stats?.attack || '-'}</span>
                    </div>
                    <div class="stat-item">
                        <img src="img/icones/HealthIcon.png" alt="VD" class="stat-icon">
                        <span class="label">VD</span>
                        <span class="value">${variant.stats?.health || '-'}</span>
                    </div>
                    <div class="stat-item">
                        <img src="${elementInfo.iconPath}" alt="${variant.element}" class="stat-icon">
                        <span class="label">Poder</span>
                        <span class="value">${variant.stats?.power || '-'}</span>
                    </div>
                </div>
                
                <div class="ability-box">
                    <h4>🎯 ${variant.signature_ability?.name || 'Habilidade Especial'}</h4>
                    <p>${abilityDesc}</p>
                </div>
                
                ${variant.marquee_ability ? `
                    <div class="ability-box marquee">
                        <h4>⭐ Superior Recomendada: ${variant.marquee_ability}</h4>
                    </div>
                ` : ''}
                
                ${variant.recommended_build ? `
                    <div class="ability-box build">
                        <h4>📊 Build Recomendada</h4>
                        <p>${variant.recommended_build}</p>
                    </div>
                ` : ''}
                
                ${arsenal ? `
                    <div class="arsenal-box">
                        <h4>🎒 Arsenal Recomendado</h4>
                        <div class="arsenal-list">${arsenal}</div>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

function parseStatValue(stat) {
    if (!stat) return 0;
    return parseInt(String(stat).replace(/[,\.]/g, '')) || 0;
}

function formatText(text) {
    if (!text) return '';

    // Remove [HAB 1]: and [HAB 2]: prefixes
    text = text.replace(/\[HAB \d+\]:\s*/g, '');

    // Convert **bold** to <strong>
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Convert Discord emoji format to simple text
    text = text.replace(/<:[^:]+:\d+>/g, '');

    // Convert \n to <br>
    text = text.replace(/\\n/g, '<br>').replace(/\n/g, '<br>');

    return text;
}

function formatArsenal(arsenal) {
    if (!arsenal) return '';

    // Remove Discord emoji codes
    arsenal = arsenal.replace(/<:[^:]+:\d+>/g, '');

    // Split by comma or similar
    const items = arsenal.split(/,\s*/).filter(item => item.trim());

    return items.map(item => `<span>${item.trim()}</span>`).join('');
}

// ========== FILTERS ==========
function applyFilters() {
    // If we're on character detail, re-render variants
    if (currentCharacter) {
        renderVariants();
    }
}

// ========== STATISTICS ==========
async function loadStatisticsData() {
    try {
        const response = await fetch('data/estatisticas.json');
        statisticsData = await response.json();
        renderScenariosTable();
    } catch (error) {
        console.error('Error loading statistics:', error);
    }
}

function renderScenariosTable() {
    if (!statisticsData || !statisticsData.scenarios) return;

    const container = document.getElementById('scenarios-table');

    // Create table from scenarios
    let html = `
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <thead>
                <tr style="border-bottom: 1px solid var(--bg-card-hover);">
                    <th style="text-align: left; padding: 12px; color: var(--text-muted);">Cenário</th>
                    <th style="text-align: right; padding: 12px; color: var(--text-muted);">Teonita/Mês</th>
                    <th style="text-align: right; padding: 12px; color: var(--text-muted);">Teonita/Semana</th>
                </tr>
            </thead>
            <tbody>
    `;

    statisticsData.scenarios.forEach(scenario => {
        if (scenario.totals && scenario.totals.total_monthly) {
            html += `
                <tr style="border-bottom: var(--border-subtle);">
                    <td style="padding: 12px; color: var(--text-primary); text-transform: capitalize;">${scenario.name}</td>
                    <td style="text-align: right; padding: 12px; color: var(--accent-gold); font-weight: 600;">
                        ${formatNumber(scenario.totals.total_monthly / 1000)}k
                    </td>
                    <td style="text-align: right; padding: 12px; color: var(--accent-gold-light);">
                        ${formatNumber(scenario.totals.total_weekly / 1000)}k
                    </td>
                </tr>
            `;
        }
    });

    html += '</tbody></table>';
    container.innerHTML = html;
}

function calculateEarnings() {
    if (!statisticsData) {
        alert('Dados de estatísticas não carregados.');
        return;
    }

    // Get selections
    const dpType = document.getElementById('calc-dp').value;
    const riftTier = document.getElementById('calc-rift-tier').value;
    const passType = document.getElementById('calc-pass').value;
    const guildType = document.getElementById('calc-guild').value;
    const hasPF = document.getElementById('calc-pf').checked;
    const hasRift = document.getElementById('calc-rift').checked;

    // Base values from scenarios
    let monthlyTeonita = 0;
    let weeklyTeonita = 0;

    // Find matching scenario
    const scenarioName = `cenário ${dpType.includes('dima') ? 'dima' : 'ouro'} + ${riftTier === 'pesadelo' ? 'pesadelo' : riftTier === 'sem-do' ? 'sem dó' : 'mestre'}`;
    const scenario = statisticsData.scenarios.find(s => s.name.includes(dpType.includes('dima') ? 'dima' : 'ouro'));

    if (scenario && scenario.items) {
        scenario.items.forEach(item => {
            if (hasPF && item.item.includes('dp')) {
                monthlyTeonita += item.monthly_value;
                weeklyTeonita += item.weekly_value || 0;
            }
            if (hasRift && item.item === 'reinos') {
                monthlyTeonita += item.monthly_value;
                weeklyTeonita += item.weekly_value || 0;
            }
            if (item.item === 'diaria') {
                monthlyTeonita += item.monthly_value;
                weeklyTeonita += item.weekly_value || 0;
            }
            if (item.item === 'passe' && passType !== 'free') {
                monthlyTeonita += item.monthly_value * (passType === 'premium_plus' ? 1.5 : 1);
            }
            if (guildType === 'top100' && item.item.includes('guilda')) {
                monthlyTeonita += item.monthly_value;
                weeklyTeonita += item.weekly_value || 0;
            }
        });
    }

    // Fallback if no scenario found
    if (monthlyTeonita === 0) {
        monthlyTeonita = 25000;
        weeklyTeonita = 6000;
    }

    // Update results
    document.getElementById('result-teonita').textContent = formatNumber(monthlyTeonita);
    document.getElementById('result-teonita-week').textContent = formatNumber(weeklyTeonita);
    document.getElementById('result-coins').textContent = formatNumber(monthlyTeonita * 100) + ' (estimado)';
}

function calculateCosts() {
    const bbLevel = document.getElementById('bb-level').value;
    const rarityEvo = document.getElementById('rarity-evo').value;
    const loadoutType = document.getElementById('loadout-type').value;

    // Cost estimates (based on common game knowledge)
    const costs = {
        bb: {
            '1-15': { coins: '~2.5M', keys: '~150' },
            '1-10': { coins: '~800K', keys: '~60' },
            '10-15': { coins: '~1.7M', keys: '~90' }
        },
        evolution: {
            'gold-dia': { coins: '1.5M', essences: '7 Essências' },
            'silver-gold': { coins: '500K', essences: '5 Essências' },
            'bronze-silver': { coins: '100K', essences: '3 Essências' }
        },
        loadout: {
            '5-moves': { coins: '~12.5M', keys: '~750' },
            '5-moves-10': { coins: '~4M', keys: '~300' }
        }
    };

    document.getElementById('cost-bb').textContent = `${costs.bb[bbLevel].coins} + ${costs.bb[bbLevel].keys} chaves`;
    document.getElementById('cost-evo').textContent = `${costs.evolution[rarityEvo].coins} + ${costs.evolution[rarityEvo].essences}`;
    document.getElementById('cost-loadout').textContent = `${costs.loadout[loadoutType].coins} + ${costs.loadout[loadoutType].keys} chaves`;
}

function formatNumber(num) {
    if (typeof num !== 'number') return num;
    return num.toLocaleString('pt-BR');
}

// ========== CATALYSTS ==========
async function loadCatalystsData() {
    try {
        const response = await fetch('data/catalisadores.json');
        catalystsData = await response.json();
        renderCatalysts();
    } catch (error) {
        console.error('Error loading catalysts:', error);
    }
}

function renderCatalysts() {
    const container = document.getElementById('catalysts-container');

    if (!catalystsData || !catalystsData.embeds || !catalystsData.embeds[0]) {
        container.innerHTML = '<p style="color: var(--text-muted);">Erro ao carregar catalisadores.</p>';
        return;
    }

    const embed = catalystsData.embeds[0];
    const fields = embed.fields || [];

    // Map category names to CSS classes
    const categoryClasses = {
        'Forte': 'strong',
        'Bom': 'good',
        'Mediano': 'medium',
        'Ruim': 'weak'
    };

    let html = '';

    fields.forEach(field => {
        // Determine category class
        let categoryClass = 'medium';
        for (const [name, className] of Object.entries(categoryClasses)) {
            if (field.name.includes(name)) {
                categoryClass = className;
                break;
            }
        }

        // Parse value (array or string)
        const items = Array.isArray(field.value) ? field.value : [field.value];

        html += `
            <div class="catalyst-category-card ${categoryClass}">
                <h3>${field.name.replace('⬇️', '')}</h3>
                <ul>
                    ${items.map(item => `<li>${formatCatalystItem(item)}</li>`).join('')}
                </ul>
            </div>
        `;
    });

    container.innerHTML = html;
}

function formatCatalystItem(item) {
    // Remove * prefix
    let text = item.replace(/^\*\s*/, '');

    // Replace symbols only at the start of words or standalone
    // Use word boundary to avoid replacing inside CSS properties
    text = text.replace(/\+(?=\w)/g, '<span style="color: #44cc66; font-weight: bold;">+</span>')
        .replace(/(?<=\s)=(?=\w)/g, '<span style="color: #d4a84b; font-weight: bold;">=</span>')
        .replace(/(?<=\s)-(?=\w)/g, '<span style="color: #ff4444; font-weight: bold;">-</span>');

    return text;
}


// ========== LAZY LOADING ==========
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        // Observe all lazy images
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            observer.observe(img);
        });
    }
}

// ========== TIER LIST ==========
// Generate test tier list with random diamond variants
function generateTestTierList() {
    // Wait for character data to be loaded
    if (Object.keys(allCharactersData).length === 0) {
        setTimeout(generateTestTierList, 500);
        return;
    }

    // Collect all diamond variants from all characters
    const allDiamonds = [];

    Object.entries(allCharactersData).forEach(([charKey, charData]) => {
        if (charData && charData.variants && charData.variants.diamante) {
            charData.variants.diamante.forEach((variant, idx) => {
                // Get portrait image
                let img = variant.images?.portrait_url || '';
                if (img.includes('discord') || !img) {
                    img = `img/${charKey}/${charKey.charAt(0).toUpperCase() + charKey.slice(1)}_${idx}.png`;
                }

                allDiamonds.push({
                    name: `${variant.name} (${charData.character})`,
                    character: charData.character,
                    charKey: charKey,
                    image: img,
                    element: variant.element
                });
            });
        }
    });

    // Shuffle the array
    const shuffled = allDiamonds.sort(() => Math.random() - 0.5);

    // Take unique characters (no repeats)
    const used = new Set();
    const uniqueVariants = [];

    for (const v of shuffled) {
        if (!used.has(v.charKey) && uniqueVariants.length < 25) {
            used.add(v.charKey);
            uniqueVariants.push(v);
        }
    }

    // Distribute to tiers
    const tierData = {
        s: uniqueVariants.slice(0, 5),
        a: uniqueVariants.slice(5, 10),
        b: uniqueVariants.slice(10, 15),
        c: uniqueVariants.slice(15, 20),
        d: uniqueVariants.slice(20, 25)
    };

    renderTierList(tierData);
}

function renderTierList(tierData) {
    if (!tierData) return;

    const tiers = ['s', 'a', 'b', 'c', 'd'];

    tiers.forEach(tier => {
        const container = document.getElementById(`tier-${tier}`);
        const characters = tierData[tier] || [];

        if (characters.length === 0) {
            container.innerHTML = '<span class="tier-placeholder">-</span>';
            return;
        }

        container.innerHTML = characters.map(char => `
            <div class="tier-character" title="${char.name}">
                <img src="${char.image}" alt="${char.name}" 
                     onerror="this.src='img/icones/Annie_Icon.png'">
            </div>
        `).join('');
    });
}


// ========== UTILITY FUNCTIONS ==========
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle initial hash on page load
window.addEventListener('load', () => {
    const hash = window.location.hash.slice(1);
    if (hash && hash !== 'home') {
        // Check if it's a character
        if (allCharactersData[hash]) {
            openCharacterDetails(hash, false);
        } else {
            showSection(hash, false);
        }
    }
});

// ========== SCROLL FUNCTIONS ==========
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function scrollToBottom() {
    window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
    });
}

// Show/Hide Scroll Top Button
window.addEventListener('scroll', () => {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const scrollNav = document.querySelector('.scroll-nav');

    if (!scrollTopBtn || !scrollNav) return;

    // Check current active section
    const activeSection = document.querySelector('section.active-section');
    const allowedSections = ['characters', 'character-detail', 'tierlist', 'catalysts'];

    const isAllowed = activeSection && allowedSections.some(id => activeSection.id === id);

    if (isAllowed && window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
        scrollNav.style.display = 'flex';
    } else {
        scrollTopBtn.classList.remove('visible');
        if (window.scrollY <= 300) {
            // keep nav layout but hide button
        } else if (!isAllowed) {
            scrollNav.style.display = 'none';
        }
    }
});

// Update scrollToBottom to hide it if user only wants "Back to Top" 
// (User said "botão de voltar e subir", singular focus on the arrow image)
function updateScrollNavVisibility() {
    const scrollBottomBtn = document.getElementById('scrollToBottomBtn');
    if (scrollBottomBtn) scrollBottomBtn.style.display = 'none'; // Standardizing on the single blue button
}
document.addEventListener('DOMContentLoaded', updateScrollNavVisibility);


