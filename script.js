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

// Element mapping
const ELEMENT_MAP = {
    'Fogo': { class: 'fire', icon: '🔥', key: 'fogo' },
    'Água': { class: 'water', icon: '💧', key: 'agua' },
    'Ar': { class: 'wind', icon: '🌪️', key: 'ar' },
    'Luz': { class: 'light', icon: '☀️', key: 'luz' },
    'Trevas': { class: 'dark', icon: '🌙', key: 'trevas' },
    'Neutro': { class: 'neutral', icon: '⚪', key: 'neutro' }
};

// ========== GLOBAL STATE ==========
let allCharactersData = {};
let currentCharacter = null;
let currentRarityFilter = 'diamante';
let statisticsData = null;
let catalystsData = null;

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


    // Handle browser back/forward
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.section) {
            showSection(event.state.section, false);
            if (event.state.character) {
                openCharacterDetails(event.state.character, false);
            }
        } else {
            showSection('home', false);
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

    // Update nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    const activeLink = document.querySelector(`.nav-links a[onclick*="'${sectionId}'"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Close mobile menu
    document.getElementById('navLinks').classList.remove('active');

    // Update history
    if (updateHistory) {
        history.pushState({ section: sectionId }, '', `#${sectionId}`);
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

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

// ========== CHARACTER DETAILS ==========
function openCharacterDetails(charKey, updateHistory = true) {
    const charData = allCharactersData[charKey];
    if (!charData) return;

    currentCharacter = charKey;

    // Update title
    document.getElementById('detail-char-name').innerHTML = `
        <span style="margin-right: 10px;">⚔️</span> ${charData.character}
    `;

    // Reset to diamante filter
    filterRarity('diamante');

    // Show detail section
    showSection('character-detail', false);

    // Update history
    if (updateHistory) {
        history.pushState({ section: 'character-detail', character: charKey }, '', `#${charKey}`);
    }
}

function filterRarity(rarity) {
    currentRarityFilter = rarity;

    // Update active button
    document.querySelectorAll('.rarity-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.rarity-btn.${rarity}`).classList.add('active');

    // Render variants
    renderVariants();
}

function sortVariants() {
    renderVariants();
}

function renderVariants() {
    const container = document.getElementById('variants-container');
    const charData = allCharactersData[currentCharacter];

    if (!charData || !charData.variants) {
        container.innerHTML = '<p style="color: var(--text-muted);">Nenhuma variante encontrada.</p>';
        return;
    }

    let variants = charData.variants[currentRarityFilter] || [];

    // Apply element filter
    const elementFilter = document.getElementById('filter-element')?.value;
    if (elementFilter && elementFilter !== 'todos') {
        variants = variants.filter(v => {
            const elementInfo = ELEMENT_MAP[v.element];
            return elementInfo && elementInfo.key === elementFilter;
        });
    }

    // Apply sorting
    const sortBy = document.getElementById('sort-select')?.value || 'name';
    variants = [...variants].sort((a, b) => {
        switch (sortBy) {
            case 'score':
                return parseStatValue(b.stats?.power) - parseStatValue(a.stats?.power);
            case 'atk':
                return parseStatValue(b.stats?.attack) - parseStatValue(a.stats?.attack);
            case 'hp':
                return parseStatValue(b.stats?.health) - parseStatValue(a.stats?.health);
            case 'name':
            default:
                return a.name.localeCompare(b.name);
        }
    });

    if (variants.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted);">Nenhuma variante encontrada para este filtro.</p>';
        return;
    }

    container.innerHTML = variants.map((variant, index) => createVariantCard(variant, index)).join('');
}

function createVariantCard(variant, index) {
    const elementInfo = ELEMENT_MAP[variant.element] || { icon: '⚪', class: 'neutral' };

    // Get portrait URL (prefer local, fallback to Discord CDN)
    let portraitUrl = variant.images?.portrait_url || '';
    if (portraitUrl.includes('discord')) {
        // Use local if Discord URL (may expire)
        portraitUrl = `img/${currentCharacter}/${currentCharacter}_${index}.png`;
    }

    // Format ability description
    const abilityDesc = formatText(variant.signature_ability?.description || 'Sem descrição');

    // Format arsenal
    const arsenal = formatArsenal(variant.recommended_arsenal || '');

    return `
        <div class="variant-card ${currentRarityFilter} animate-in" style="animation-delay: ${index * 0.05}s">
            <img src="${portraitUrl}" alt="${variant.name}" class="variant-portrait" loading="lazy"
                 onerror="this.src='img/icones/Annie_Icon.png'">
            
            <div class="variant-info">
                <div class="variant-header">
                    <h3>
                        <span class="element-badge ${elementInfo.class}">${elementInfo.icon} ${variant.element}</span>
                        ${variant.name}
                    </h3>
                </div>
                
                <div class="variant-stats">
                    <div class="stat-item">
                        <span class="label">ATK</span>
                        <span class="value">${variant.stats?.attack || '-'}</span>
                    </div>
                    <div class="stat-item">
                        <span class="label">HP</span>
                        <span class="value">${variant.stats?.health || '-'}</span>
                    </div>
                    <div class="stat-item">
                        <span class="label">PWR</span>
                        <span class="value">${variant.stats?.power || '-'}</span>
                    </div>
                </div>
                
                <div class="ability-box">
                    <h4>🎯 ${variant.signature_ability?.name || 'Habilidade Especial'}</h4>
                    <p>${abilityDesc}</p>
                </div>
                
                ${variant.marquee_ability ? `
                    <div class="ability-box" style="border-left-color: var(--rarity-diamond);">
                        <h4>⭐ Marquee: ${variant.marquee_ability}</h4>
                    </div>
                ` : ''}
                
                ${variant.recommended_build ? `
                    <div class="ability-box" style="border-left-color: var(--element-wind);">
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
