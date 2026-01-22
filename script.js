// c:\Users\lifiz\Documents\VS Code\Novo Começo\script.js

// Lista de arquivos JSON para carregar. 
// Para adicionar um novo personagem, basta colocar o arquivo na pasta 'data' e adicionar o nome aqui.
const CHARACTER_FILES = [
    'annie.json',
    'beowulf.json',
    'big-band.json',
    'cerebella.json',
    'black-dahlia.json',
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

// Armazenamento global dos dados
let allCharactersData = {};
let currentCharacter = null;
let currentRarityFilter = 'diamante'; // Padrão

// --- Inicialização ---
let homeSectionId = 'home'; // ID padrão da seção inicial

document.addEventListener('DOMContentLoaded', () => {
    // Tenta identificar a seção inicial (onde está o grid)
    const grid = document.getElementById('character-grid');
    if (grid) {
        const section = grid.closest('section');
        if (section) homeSectionId = section.id;
    }

    loadAllCharacterData();
    loadStatistics();
    loadCatalystsData();

    // Gerencia navegação (Voltar/Avançar do navegador)
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.character) {
            openCharacterDetails(event.state.character, false);
        } else {
            showSection(homeSectionId);
        }
    });
});

// --- Navegação ---
function showSection(sectionId) {
    // Esconde todas as seções
    document.querySelectorAll('main > section').forEach(sec => {
        sec.classList.remove('active-section');
        sec.classList.add('hidden-section');
    });
    
    // Mostra a desejada
    const target = document.getElementById(sectionId);
    target.classList.remove('hidden-section');
    target.classList.add('active-section');

    // Fecha menu mobile se aberto
    document.querySelector('.nav-links').classList.remove('active');
}

function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}

// --- Carregamento de Dados ---
async function loadAllCharacterData() {
    const grid = document.getElementById('character-grid');
    grid.innerHTML = '<p>Carregando personagens...</p>';

    try {
        const promises = CHARACTER_FILES.map(file => 
            fetch(`data/${file}`).then(response => {
                if (!response.ok) throw new Error(`Erro ao carregar ${file}`);
                return response.json();
            }).catch(err => {
                console.warn(`Arquivo não encontrado ou erro: ${file}`, err);
                return null;
            })
        );

        const results = await Promise.all(promises);
        
        // Limpa e processa
        grid.innerHTML = '';
        results.forEach(charData => {
            if (charData) {
                allCharactersData[charData.character] = charData;
                createCharacterCard(charData);
            }
        });

        // Verifica se há um personagem na URL (Deep Linking) ao carregar
        const hash = decodeURIComponent(window.location.hash.substring(1));
        if (hash && allCharactersData[hash]) {
            openCharacterDetails(hash, false);
        }

    } catch (error) {
        grid.innerHTML = '<p>Erro ao carregar dados. Certifique-se de rodar em um servidor local.</p>';
        console.error(error);
    }
}

function createCharacterCard(charData) {
    const grid = document.getElementById('character-grid');
    const card = document.createElement('div');
    card.className = 'char-select-card';
    
    // Define o caminho da imagem local padrão (Nome_0.png)
    // Normaliza o nome da pasta: minúsculo, substitui pontos e espaços por hífens
    const folderName = charData.character.toLowerCase().replace(/[\.\s]/g, '-');
    
    // Normaliza o nome do arquivo: substitui espaços por underscores e ajusta Ms. Fortune
    let fileName = charData.character.replace(/\s/g, '_');
    if (fileName === 'Ms.Fortune') fileName = 'Ms._Fortune';
    
    const localIconUrl = `img/${folderName}/${fileName}_0.png`;
    
    // Define um ícone de fallback (primeira variante encontrada) caso a imagem local não exista
    let fallbackIconUrl = 'images/default_icon.png';
    const rarities = ['diamante', 'ouro', 'prata', 'bronze'];
    for (let r of rarities) {
        if (charData.variants[r] && charData.variants[r][0] && charData.variants[r][0].images) {
            fallbackIconUrl = charData.variants[r][0].images.icon_url;
            break;
        }
    }

    card.innerHTML = `
        <img src="${localIconUrl}" 
             alt="${charData.character}" 
             class="char-icon" 
             loading="lazy"
             onerror="this.onerror=null; this.src='${fallbackIconUrl}';">
        <h3>${charData.character}</h3>
    `;
    
    card.onclick = () => openCharacterDetails(charData.character);
    grid.appendChild(card);
}

// --- Detalhes do Personagem ---
function openCharacterDetails(charName, updateHistory = true) {
    currentCharacter = allCharactersData[charName];
    if (!currentCharacter) return;

    document.getElementById('detail-char-name').innerText = currentCharacter.character;
    
    // Reseta filtro para Diamante ou a maior raridade disponível
    currentRarityFilter = 'diamante';
    if (!currentCharacter.variants.diamante) currentRarityFilter = 'ouro';
    
    renderVariants();
    showSection('character-detail');

    if (updateHistory) {
        history.pushState({ character: charName }, '', `#${charName}`);
    }
}

function filterRarity(rarity) {
    currentRarityFilter = rarity;
    renderVariants();
}

function sortVariants() {
    renderVariants();
}

function renderVariants() {
    const container = document.getElementById('variants-container');
    container.innerHTML = '';

    if (!currentCharacter || !currentCharacter.variants[currentRarityFilter]) {
        container.innerHTML = '<p>Nenhuma variante encontrada para esta raridade.</p>';
        return;
    }

    let variants = [...currentCharacter.variants[currentRarityFilter]];
    const sortType = document.getElementById('sort-select').value;

    // Ordenação
    variants.sort((a, b) => {
        if (sortType === 'name') return a.name.localeCompare(b.name);
        
        // Remove vírgulas para converter string numérica (ex: "10,000" -> 10000)
        const valA = parseInt(a.stats[getStatKey(sortType)].replace(/,/g, '')) || 0;
        const valB = parseInt(b.stats[getStatKey(sortType)].replace(/,/g, '')) || 0;
        return valB - valA; // Decrescente
    });

    variants.forEach(variant => {
        const card = document.createElement('div');
        card.className = 'variant-card';
        card.style.borderLeftColor = variant.color_hex || '#fff';

        // Formata texto com markdown simples do discord para HTML
        let rawDesc = variant.signature_ability.description;
        // Remove [HAB X]: e asteriscos
        rawDesc = rawDesc.replace(/\[HAB \d+\]:\s*/g, '').replace(/\*\*/g, '');
        
        // Divide em partes baseado em quebra de linha dupla e gera o HTML dos retângulos
        const abilityParts = rawDesc.split(/\n\n+/).filter(p => p.trim().length > 0);
        const abilityHtml = abilityParts.map(part => `<div class="ability-part">${formatText(part)}</div>`).join('');

        const arsenal = formatText(variant.recommended_arsenal);

        // Define o ícone do elemento
        let elementIcon = 'img/icones/ElementalIconNeutral.png';
        const elLower = variant.element.toLowerCase();
        if (elLower === 'fogo') elementIcon = 'img/icones/ElementalIconFire.png';
        else if (elLower === 'água' || elLower === 'agua') elementIcon = 'img/icones/ElementalIconWater.png';
        else if (elLower === 'ar') elementIcon = 'img/icones/ElementalIconWind.png';
        else if (elLower === 'luz') elementIcon = 'img/icones/ElementalIconLight.png';
        // Trevas e Neutro usam o ícone Neutro

        card.innerHTML = `
            <div class="variant-header">
                <img src="${variant.images.portrait_url}" alt="${variant.name}" class="variant-portrait" loading="lazy">
                <div class="variant-info">
                    <h3>${variant.name} <span style="color:${variant.color_hex}">●</span></h3>
                    <p>${variant.element} | ${currentRarityFilter.toUpperCase()}</p>
                    <div class="variant-stats">
                        <span><img src="img/icones/AttackIcon.png" alt="ATQ" style="width:16px; vertical-align:middle; margin-right:4px;">${variant.stats.attack}</span>
                        <span><img src="img/icones/HealthIcon.png" alt="HP" style="width:16px; vertical-align:middle; margin-right:4px;">${variant.stats.health}</span>
                        <span><img src="${elementIcon}" alt="${variant.element}" style="width:16px; vertical-align:middle; margin-right:4px;">${variant.stats.power}</span>
                    </div>
                </div>
            </div>
            <div class="ability-box">
                <div class="ability-title">${variant.signature_ability.name}</div>
                ${abilityHtml}
            </div>
            <div class="build-box">
                <p><strong>Superior Recomendada:</strong> ${Array.isArray(variant.marquee_ability) ? variant.marquee_ability.join(' / ') : variant.marquee_ability}</p>
                <p><strong>Build Recomendada:</strong> ${variant.recommended_build}</p>
                <p><strong>Arsenal Recomendado:</strong> ${arsenal}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

function getStatKey(sortType) {
    if (sortType === 'score') return 'power';
    if (sortType === 'atk') return 'attack';
    if (sortType === 'hp') return 'health';
    return 'power';
}

// Função auxiliar para converter formatação básica (negrito **texto**) e emojis do discord
function formatText(text) {
    if (!text) return '';
    let formatted = text;

    // Mapeamento de imagens de golpes (Annie)
    const moveImages = {
        'Marcas de Fogo': 'img/annie/Annie_14.png',
        'Estilingue Gravitacional': 'img/annie/Annie_28.png',
        'Pilar da Destruição': 'img/annie/Annie_22.png',
        'Corte Crescente': 'img/annie/Annie_26.png'
    };
    for (const [name, path] of Object.entries(moveImages)) {
        formatted = formatted.split(name).join(`<img src="${path}" alt="${name}" style="height: 1.2em; vertical-align: middle; margin-right: 4px;"> ${name}`);
    }

    // Negrito
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Quebra de linha
    formatted = formatted.replace(/\n/g, '<br>');
    // Emojis customizados do discord <...>
    formatted = formatted.replace(/<:(.*?):\d+>/g, '[$1]'); 
    // HTML entities decode (caso venha &gt;)
    const txt = document.createElement("textarea");
    txt.innerHTML = formatted;
    return txt.value;
}

// --- Estatísticas ---
async function loadStatistics() {
    try {
        const response = await fetch('data/estatisticas.json');
        if (!response.ok) throw new Error('Erro ao carregar estatísticas');
        const data = await response.json();
        renderStatistics(data);
    } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
    }
}

function renderStatistics(data) {
    // Tenta encontrar o container de estatísticas
    let container = document.querySelector('.stats-container');
    if (!container) container = document.getElementById('stats');
    if (!container) container = document.getElementById('statistics');
    
    // Fallback: tenta achar onde estava a calculadora antiga
    if (!container) {
        const oldCalc = document.getElementById('earnings-result');
        if (oldCalc) container = oldCalc.closest('section');
    }

    if (!container) return;

    // Limpa conteúdo antigo
    container.innerHTML = '<h2 style="text-align:center; margin-bottom:20px;">Estatísticas e Cenários</h2>';
    
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.gap = '20px';

    // Cenários
    if (data.scenarios) {
        data.scenarios.forEach(scenario => {
            const card = document.createElement('div');
            card.className = 'calculator-box'; // Reutiliza estilo
            card.style.overflowX = 'auto';
            
            let rows = scenario.items.map(item => `
                <tr>
                    <td style="padding:8px; border-bottom:1px solid #444;">${item.item}</td>
                    <td style="padding:8px; border-bottom:1px solid #444;">${item.base_value}</td>
                    <td style="padding:8px; border-bottom:1px solid #444;">${item.monthly_value}</td>
                    <td style="padding:8px; border-bottom:1px solid #444;">${item.weekly_value}</td>
                </tr>
            `).join('');

            if (scenario.totals && Object.keys(scenario.totals).length) {
                rows += `
                    <tr style="font-weight:bold; background:rgba(255,255,255,0.1);">
                        <td style="padding:8px;">TOTAIS</td>
                        <td style="padding:8px;">${scenario.totals.total_base || '-'}</td>
                        <td style="padding:8px;">${scenario.totals.total_monthly || '-'}</td>
                        <td style="padding:8px;">${scenario.totals.total_weekly || '-'}</td>
                    </tr>
                `;
            }

            card.innerHTML = `
                <h3 style="color:var(--accent-color); margin-top:0;">${scenario.name}</h3>
                <table style="width:100%; border-collapse:collapse; min-width:400px;">
                    <thead>
                        <tr style="text-align:left; color:#aaa;">
                            <th style="padding:8px;">Item</th>
                            <th style="padding:8px;">Base</th>
                            <th style="padding:8px;">Mensal</th>
                            <th style="padding:8px;">Semanal</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            `;
            wrapper.appendChild(card);
        });
    }

    // Performance Stats
    if (data.performance_stats) {
        const card = document.createElement('div');
        card.className = 'calculator-box';
        card.style.overflowX = 'auto';
        
        const numCols = data.performance_stats[0].values.length;
        const headers = Array.from({length: numCols}, (_, i) => `<th style="padding:8px;">Val ${i+1}</th>`).join('');
        
        const rows = data.performance_stats.map(stat => `
            <tr>
                <td style="padding:8px; border-bottom:1px solid #444;">${stat.metric}</td>
                ${stat.values.map(v => `<td style="padding:8px; border-bottom:1px solid #444;">${v !== null ? v : '-'}</td>`).join('')}
            </tr>
        `).join('');

        card.innerHTML = `
            <h3 style="color:var(--accent-color); margin-top:0;">Performance</h3>
            <table style="width:100%; border-collapse:collapse; min-width:400px;">
                <thead>
                    <tr style="text-align:left; color:#aaa;">
                        <th style="padding:8px;">Métrica</th>
                        ${headers}
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        `;
        wrapper.appendChild(card);
    }

    container.appendChild(wrapper);
}

// --- Catalisadores ---
async function loadCatalystsData() {
    try {
        const response = await fetch('data/catalisadores.json');
        if (!response.ok) throw new Error('Erro ao carregar catalisadores');
        const data = await response.json();
        renderCatalysts(data);
    } catch (error) {
        console.error('Erro ao carregar catalisadores:', error);
        const container = document.getElementById('catalysts');
        if (container) container.innerHTML = '<p>Erro ao carregar dados dos catalisadores.</p>';
    }
}

function renderCatalysts(data) {
    const container = document.getElementById('catalysts');
    if (!container) return;

    container.innerHTML = '';

    if (!data.embeds || data.embeds.length === 0) return;
    const embed = data.embeds[0];

    const title = document.createElement('h2');
    title.textContent = embed.title;
    container.appendChild(title);

    if (embed.description && Array.isArray(embed.description)) {
        const descDiv = document.createElement('div');
        descDiv.className = 'catalyst-description';
        
        let htmlDesc = embed.description.join('\n');
        htmlDesc = htmlDesc
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/\(\+\)/g, '<span style="color:#4caf50; font-weight:bold;">(+)</span>')
            .replace(/\(\=\)/g, '<span style="color:#ffeb3b; font-weight:bold;">(=)</span>')
            .replace(/\(\-\)/g, '<span style="color:#f44336; font-weight:bold;">(-)</span>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/-\# (.*$)/gm, '<small>$1</small>')
            .replace(/\n/g, '<br>');

        descDiv.innerHTML = htmlDesc;
        container.appendChild(descDiv);
    }

    if (embed.fields) {
        const grid = document.createElement('div');
        grid.className = 'catalyst-grid';

        embed.fields.forEach(field => {
            const card = document.createElement('div');
            card.className = 'catalyst-category-card';
            
            const catTitle = document.createElement('h3');
            catTitle.textContent = field.name.replace(' ⬇️', '');
            card.appendChild(catTitle);

            const list = document.createElement('ul');
            if (Array.isArray(field.value)) {
                field.value.forEach(line => {
                    let cleanLine = line.replace(/^\* /, '');
                    const items = cleanLine.split(',').map(s => s.trim());
                    
                    items.forEach(item => {
                        if(item) {
                            const li = document.createElement('li');
                            let formattedItem = item;
                            if (item.startsWith('+')) formattedItem = `<span style="color:#4caf50; font-weight:bold;">+</span> ${item.substring(1)}`;
                            else if (item.startsWith('=')) formattedItem = `<span style="color:#ffeb3b; font-weight:bold;">=</span> ${item.substring(1)}`;
                            else if (item.startsWith('-')) formattedItem = `<span style="color:#f44336; font-weight:bold;">-</span> ${item.substring(1)}`;
                            
                            li.innerHTML = formattedItem;
                            list.appendChild(li);
                        }
                    });
                });
            }
            card.appendChild(list);
            grid.appendChild(card);
        });
        container.appendChild(grid);
    }
}
