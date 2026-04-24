// =====================================================
// CALCULATOR COMPONENT
// Simulators for earnings and evolution costs
// Uses real data from JSON files
// =====================================================

import { formatNumber } from '../utils/formatters.js';
import { t, getCurrentLanguage } from '../i18n/index.js';

function guildaTierLabel(tier) {
    const map = {
        bronze: t('rarity.bronze'),
        prata: t('rarity.silver'),
        ouro: t('rarity.gold'),
        diamante: t('rarity.diamond')
    };
    return map[tier] || tier;
}

// Store loaded data
let statsData = null;

/**
 * Initialize calculator with loaded stats data
 * @param {Object} data - Statistics data from dataService
 */
export function initCalculator(data) {
  statsData = data;
}

/**
 * Create unified calculator with tabs (Ganhos | Custos)
 * Side-by-side layout: controls left, results right
 * @returns {string} HTML string
 */
export function createCalculator() {
  return `
  <div class="calculator-box">
    <!-- TAB BAR -->
    <div class="calc-tab-bar">
      <button class="calc-tab active" data-tab="ganhos" onclick="switchCalcTab('ganhos')"><img loading="lazy" src="img/official/CanopyCoin.webp" style="height: 1.8em; vertical-align: -0.4em; margin-right: 0.2rem;" alt="${t('calc.altCoins')}"> ${t('calc.earnings')}</button>
      <button class="calc-tab" data-tab="custos" onclick="switchCalcTab('custos')">📈 ${t('calc.costs')}</button>
    </div>

    <!-- ========== TAB: GANHOS ========== -->
    <div class="calc-tab-content active" id="tab-ganhos">
      <div class="calc-layout">
        <div class="calc-controls">
          <div class="calc-form">
            <!-- Fixed Earnings Section -->
            <div class="calc-section">
              <h4>📅 ${t('calc.fixedSources')}</h4>
              <div class="toggle-group" id="fixed-toggles">
                <button class="toggle-btn active" data-source="diarias" data-type="fixed">
                  ${t('calc.dailyEvents')}
                </button>
                <button class="toggle-btn active" data-source="calendario" data-type="fixed">
                  ${t('calc.calendar')}
                </button>
                <button class="toggle-btn active" data-source="site" data-type="fixed">
                  ${t('calc.site')}
                </button>
                <button class="toggle-btn active" data-source="guildaDiaria" data-type="fixed">
                  ${t('calc.guildMissions')}
                </button>
              </div>
            </div>

            <!-- Battle Pass Section -->
            <div class="calc-section">
              <h4>🎫 ${t('calc.battlePass')}</h4>
              <div class="toggle-group exclusive" id="passe-toggles">
                <button class="toggle-btn active" data-source="gratis" data-type="passe">${t('calc.free')}</button>
                <button class="toggle-btn" data-source="premium" data-type="passe">${t('calc.premium')}</button>
              </div>
            </div>

            <!-- Prize Fights Section -->
            <div class="calc-section">
              <h4>📊 ${t('calc.prizeFights')}</h4>

              <span class="toggle-label">${t('calc.pfCharacter')}</span>
              <div class="toggle-group exclusive" id="dp-faixa-toggles">
                <button class="toggle-btn" data-source="bronze" data-type="dpFaixa"><img loading="lazy" src="img/official/icone_bronze.webp" style="height: 1.2em; vertical-align: -0.2em; margin-right: 0.2rem;" alt="${t('rarity.bronze')}"> ${t('rarity.bronze')}</button>
                <button class="toggle-btn" data-source="prata" data-type="dpFaixa"><img loading="lazy" src="img/official/icone_prata.webp" style="height: 1.2em; vertical-align: -0.2em; margin-right: 0.2rem;" alt="${t('rarity.silver')}"> ${t('rarity.silver')}</button>
                <button class="toggle-btn" data-source="ouro" data-type="dpFaixa"><img loading="lazy" src="img/official/icone_ouro.webp" style="height: 1.2em; vertical-align: -0.2em; margin-right: 0.2rem;" alt="${t('rarity.gold')}"> ${t('rarity.gold')}</button>
                <button class="toggle-btn active" data-source="diamante" data-type="dpFaixa"><img loading="lazy" src="img/official/icone_diamante.webp" style="height: 1.2em; vertical-align: -0.2em; margin-right: 0.2rem;" alt="${t('rarity.diamond')}"> ${t('rarity.diamond')}</button>
                <button class="toggle-btn off" data-source="nenhum" data-type="dpFaixa">${t('calc.noParticipate')}</button>
              </div>

              <span class="toggle-label">${t('calc.pfRanking')}</span>
              <div class="toggle-group exclusive" id="dp-rank-toggles">
                <button class="toggle-btn" data-source="top10percent" data-type="dpRank">${t('calc.top10')}</button>
                <button class="toggle-btn active" data-source="top30percent" data-type="dpRank">${t('calc.top30')}</button>
                <button class="toggle-btn" data-source="top60percent" data-type="dpRank">${t('calc.top60')}</button>
              </div>

              <span class="toggle-label">${t('calc.pfMonthly')}</span>
              <div class="toggle-group" id="dp-mensal-toggles">
                <button class="toggle-btn active" data-source="mensal" data-type="dpMensal">
                  ${t('calc.pfParticipate')}
                </button>
              </div>

              <span class="toggle-label">${t('calc.pfMedicis')}</span>
              <div class="toggle-group exclusive" id="dp-medicis-toggles">
                <button class="toggle-btn" data-source="top100" data-type="dpMedicis">${t('calc.top100')}</button>
                <button class="toggle-btn active" data-source="top10percent" data-type="dpMedicis">${t('calc.top10')}</button>
                <button class="toggle-btn off" data-source="nenhum" data-type="dpMedicis">${t('calc.noParticipate')}</button>
              </div>
            </div>

            <!-- Parallel Realms Section -->
            <div class="calc-section">
              <h4>🏰 ${t('calc.parallelRealms')}</h4>
              <span class="toggle-label">${t('calc.difficulty')}</span>
              <div class="toggle-group exclusive" id="reinos-dif-toggles">
                <button class="toggle-btn" data-source="basico" data-type="reinosDif">${t('calc.basic')}</button>
                <button class="toggle-btn" data-source="avancado" data-type="reinosDif">${t('calc.advanced')}</button>
                <button class="toggle-btn" data-source="especialista" data-type="reinosDif">${t('calc.expert')}</button>
                <button class="toggle-btn" data-source="mestre" data-type="reinosDif">${t('calc.master')}</button>
                <button class="toggle-btn" data-source="pesadelo" data-type="reinosDif">${t('calc.nightmare')}</button>
                <button class="toggle-btn active" data-source="semDo" data-type="reinosDif">${t('calc.noMercy')}</button>
                <button class="toggle-btn off" data-source="nenhum" data-type="reinosDif">${t('calc.noParticipate')}</button>
              </div>
              <span class="toggle-label">${t('calc.completeness')}</span>
              <div class="toggle-group exclusive" id="reinos-comp-toggles">
                <button class="toggle-btn" data-source="min" data-type="reinosComp">${t('calc.minimum')}</button>
                <button class="toggle-btn active" data-source="max" data-type="reinosComp">${t('calc.maximum')}</button>
              </div>
            </div>

            <!-- Guilds Section -->
            <div class="calc-section">
              <h4>👥 ${t('calc.guild')}</h4>
              <div class="toggle-group" id="guilda-eventos-toggles">
                <button class="toggle-btn active" data-source="eventos" data-type="guildaEventos">
                  ${t('calc.guildEvents')}
                </button>
              </div>

              <span class="toggle-label">${t('calc.battleTier')}</span>
              <div class="toggle-group exclusive" id="guilda-tier-toggles">
                <button class="toggle-btn" data-source="bronze" data-type="guildaTier"><img loading="lazy" src="img/official/icone_bronze.webp" style="height: 1.2em; vertical-align: -0.2em; margin-right: 0.2rem;" alt="${t('rarity.bronze')}"> ${t('rarity.bronze')}</button>
                <button class="toggle-btn" data-source="prata" data-type="guildaTier"><img loading="lazy" src="img/official/icone_prata.webp" style="height: 1.2em; vertical-align: -0.2em; margin-right: 0.2rem;" alt="${t('rarity.silver')}"> ${t('rarity.silver')}</button>
                <button class="toggle-btn" data-source="ouro" data-type="guildaTier"><img loading="lazy" src="img/official/icone_ouro.webp" style="height: 1.2em; vertical-align: -0.2em; margin-right: 0.2rem;" alt="${t('rarity.gold')}"> ${t('rarity.gold')}</button>
                <button class="toggle-btn active" data-source="diamante" data-type="guildaTier"><img loading="lazy" src="img/official/icone_diamante.webp" style="height: 1.2em; vertical-align: -0.2em; margin-right: 0.2rem;" alt="${t('rarity.diamond')}"> ${t('rarity.diamond')}</button>
                <button class="toggle-btn off" data-source="nenhum" data-type="guildaTier">${t('calc.noParticipateGuild')}</button>
              </div>

              <div id="diamante-slider-container" class="slider-container">
                <span class="toggle-label">${t('calc.guildPoints')} <span id="diamante-pontos-display">16000</span></span>
                <input type="range" id="diamante-pontos-slider" min="16000" max="30000" step="1000" value="16000" oninput="updateDiamanteSlider(this.value)">
                <div class="slider-labels">
                  <span>16k</span>
                  <span>30k</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="calc-divider"></div>

        <div class="calc-results">
          <div id="earnings-result" class="result-box">
            <h4><img loading="lazy" src="img/official/Theonite.webp" style="height: 1.8em; vertical-align: -0.4em; margin-right: 0.2rem;" alt="${t('calc.altTheonite')}"> ${t('calc.estimatedResult')}</h4>
            <div class="result-grid">
              <div class="result-card coins">
                <span class="result-label">${t('calc.monthlyCoins')}</span>
                <span class="result-value" id="result-coins">-</span>
                <span class="result-sub">\u2248 <span id="result-coins-week">-</span>${t('calc.perWeek')}</span>
              </div>
              <div class="result-card teonita">
                <span class="result-label">${t('calc.monthlyTheonite')}</span>
                <span class="result-value" id="result-teonita">-</span>
                <span class="result-sub">\u2248 <span id="result-teonita-week">-</span>${t('calc.perWeek')}</span>
              </div>
            </div>
            <div id="earnings-breakdown" class="breakdown-box"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- ========== TAB: CUSTOS ========== -->
    <div class="calc-tab-content" id="tab-custos">
      <div class="calc-layout">
        <div class="calc-controls">
          <div class="calc-form">
            <!-- GOLPES SECTION -->
            <div class="calc-section">
              <h4>\u2694\uFE0F ${t('calc.moves')}</h4>

              <span class="toggle-label">${t('calc.moveRarity')}</span>
              <div class="toggle-group exclusive" id="golpe-raridade-toggles">
                <button class="toggle-btn" data-source="bronze" data-type="golpeRaridade"><img loading="lazy" src="img/official/icone_bronze.webp" style="height: 1.2em; vertical-align: -0.2em; margin-right: 0.2rem;" alt="${t('rarity.bronze')}"> ${t('rarity.bronze')}</button>
                <button class="toggle-btn" data-source="prata" data-type="golpeRaridade"><img loading="lazy" src="img/official/icone_prata.webp" style="height: 1.2em; vertical-align: -0.2em; margin-right: 0.2rem;" alt="${t('rarity.silver')}"> ${t('rarity.silver')}</button>
                <button class="toggle-btn" data-source="ouro" data-type="golpeRaridade"><img loading="lazy" src="img/official/icone_ouro.webp" style="height: 1.2em; vertical-align: -0.2em; margin-right: 0.2rem;" alt="${t('rarity.gold')}"> ${t('rarity.gold')}</button>
                <button class="toggle-btn active" data-source="diamante" data-type="golpeRaridade"><img loading="lazy" src="img/official/icone_diamante.webp" style="height: 1.2em; vertical-align: -0.2em; margin-right: 0.2rem;" alt="${t('rarity.diamond')}"> ${t('rarity.diamond')}</button>
                <button class="toggle-btn off" data-source="nenhum" data-type="golpeRaridade">${t('calc.noMoves')}</button>
              </div>

              <div class="toggle-group" id="golpe-shiny-toggle">
                <button class="toggle-btn" data-source="shiny" data-type="golpeShiny">\u2728 ${t('calc.shinyDiscount')}</button>
              </div>

              <span class="toggle-label">${t('calc.desiredLevel')}</span>
              <div class="toggle-group exclusive" id="golpe-nivel-toggles">
                <button class="toggle-btn" data-source="9" data-type="golpeNivel">${t('calc.lv')} 9</button>
                <button class="toggle-btn" data-source="12" data-type="golpeNivel">${t('calc.lv')} 12</button>
                <button class="toggle-btn active" data-source="15" data-type="golpeNivel">${t('calc.lv')} 15</button>
                <button class="toggle-btn" data-source="custom" data-type="golpeNivel">${t('calc.custom')}</button>
              </div>

              <div id="golpe-slider-container" class="slider-container" style="display: none;">
                <span class="toggle-label">${t('calc.level')} <span id="golpe-nivel-display">2</span></span>
                <input type="range" id="golpe-nivel-slider" min="2" max="15" step="1" value="2" oninput="updateGolpeSlider(this.value)">
                <div class="slider-labels">
                  <span>2</span>
                  <span>15</span>
                </div>
              </div>

              <span class="toggle-label">${t('calc.initialLevel')}</span>
              <div id="golpe-nivel-inicial-container" class="slider-container">
                <span class="toggle-label">${t('calc.level')} <span id="golpe-nivel-inicial-display">1</span></span>
                <input type="range" id="golpe-nivel-inicial-slider" min="1" max="14" step="1" value="1" oninput="updateGolpeInicialSlider(this.value)">
                <div class="slider-labels">
                  <span>1</span>
                  <span id="golpe-nivel-inicial-max-label">14</span>
                </div>
              </div>
            </div>

            <!-- ASTROS SECTION -->
            <div class="calc-section">
              <h4>\u2B50 ${t('calc.astros')}</h4>

              <span class="toggle-label">${t('calc.astroRarity')}</span>
              <div class="toggle-group exclusive" id="astro-raridade-toggles">
                <button class="toggle-btn" data-source="bronze" data-type="astroRaridade"><img loading="lazy" src="img/official/icone_bronze.webp" style="height: 1.2em; vertical-align: -0.2em; margin-right: 0.2rem;" alt="${t('rarity.bronze')}"> ${t('rarity.bronze')} (${t('calc.lv')} 5)</button>
                <button class="toggle-btn" data-source="prata" data-type="astroRaridade"><img loading="lazy" src="img/official/icone_prata.webp" style="height: 1.2em; vertical-align: -0.2em; margin-right: 0.2rem;" alt="${t('rarity.silver')}"> ${t('rarity.silver')} (${t('calc.lv')} 10)</button>
                <button class="toggle-btn" data-source="ouro" data-type="astroRaridade"><img loading="lazy" src="img/official/icone_ouro.webp" style="height: 1.2em; vertical-align: -0.2em; margin-right: 0.2rem;" alt="${t('rarity.gold')}"> ${t('rarity.gold')} (${t('calc.lv')} 15)</button>
                <button class="toggle-btn active" data-source="diamante" data-type="astroRaridade"><img loading="lazy" src="img/official/icone_diamante.webp" style="height: 1.2em; vertical-align: -0.2em; margin-right: 0.2rem;" alt="${t('rarity.diamond')}"> ${t('rarity.diamond')} (${t('calc.lv')} 20)</button>
                <button class="toggle-btn" data-source="custom" data-type="astroRaridade">${t('calc.custom')}</button>
                <button class="toggle-btn off" data-source="nenhum" data-type="astroRaridade">${t('calc.noAstro')}</button>
              </div>

              <div class="toggle-group" id="astro-shiny-toggle">
                <button class="toggle-btn" data-source="shiny" data-type="astroShiny">\u2728 ${t('calc.shinyDiscount')}</button>
              </div>

              <div id="astro-slider-container" class="slider-container" style="display: none;">
                <span class="toggle-label">${t('calc.level')} <span id="astro-nivel-display">2</span></span>
                <input type="range" id="astro-nivel-slider" min="2" max="20" step="1" value="2" oninput="updateAstroSlider(this.value)">
                <div class="slider-labels">
                  <span>2</span>
                  <span>20</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="calc-divider"></div>

        <div class="calc-results">
          <div id="build-cost-result" class="result-box">
            <h4><img loading="lazy" src="img/official/CanopyCoin.webp" style="height: 1.8em; vertical-align: -0.4em; margin-right: 0.2rem;" alt="${t('calc.altCoins')}"> ${t('calc.totalBuildCost')}</h4>
            <div id="build-cost-breakdown" class="breakdown-box styled"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

/**
 * Switch between calculator tabs
 */
export function switchCalcTab(tabName) {
  // Update tab buttons
  document.querySelectorAll('.calc-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tab === tabName);
  });
  // Update tab content
  document.querySelectorAll('.calc-tab-content').forEach(content => {
    content.classList.toggle('active', content.id === `tab-${tabName}`);
  });
  // Trigger calculation for the newly visible tab
  if (tabName === 'ganhos') {
    calculateEarnings();
  } else if (tabName === 'custos') {
    calculateBuildCost();
  }
}

/**
 * Update golpe slider display value
 */
export function updateGolpeSlider(value) {
  const display = document.getElementById('golpe-nivel-display');
  if (display) {
    display.textContent = value;
  }
  syncGolpeInicialMax(parseInt(value));
  calculateBuildCost();
}

/**
 * Update golpe initial level slider display value
 */
export function updateGolpeInicialSlider(value) {
  const display = document.getElementById('golpe-nivel-inicial-display');
  if (display) {
    display.textContent = value;
  }
  calculateBuildCost();
}

/**
 * Sync the max of the initial level slider with the desired level
 * @param {number} nivelDesejado - The desired (target) level
 */
export function syncGolpeInicialMax(nivelDesejado) {
  const slider = document.getElementById('golpe-nivel-inicial-slider');
  const display = document.getElementById('golpe-nivel-inicial-display');
  const maxLabel = document.getElementById('golpe-nivel-inicial-max-label');
  if (!slider) return;

  const newMax = Math.max(1, nivelDesejado - 1);
  slider.max = newMax;
  if (parseInt(slider.value) > newMax) {
    slider.value = newMax;
  }
  // Always sync display text with actual slider value
  if (display) display.textContent = slider.value;
  if (maxLabel) maxLabel.textContent = newMax;
}

/**
 * Update astro slider display value
 */
export function updateAstroSlider(value) {
  const display = document.getElementById('astro-nivel-display');
  if (display) {
    display.textContent = value;
  }
  calculateBuildCost();
}

/**
 * Initialize toggle button event listeners with real-time calculation
 */
export function initToggleButtons() {
  // Determine which calculator a toggle belongs to
  const getCalcType = (group) => {
    return group.closest('#tab-custos') ? 'custos' : 'ganhos';
  };

  document.querySelectorAll('.toggle-group').forEach(group => {
    const isExclusive = group.classList.contains('exclusive');

    group.querySelectorAll('.toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (isExclusive) {
          // Exclusive: only one can be active
          group.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        } else {
          // Non-exclusive: toggle individual
          btn.classList.toggle('active');
        }

        // Handle diamond slider visibility
        if (group.id === 'guilda-tier-toggles') {
          const sliderContainer = document.getElementById('diamante-slider-container');
          if (sliderContainer) {
            sliderContainer.style.display = btn.dataset.source === 'diamante' ? 'block' : 'none';
          }
        }

        // Handle golpe slider visibility and sync initial level
        if (group.id === 'golpe-nivel-toggles') {
          const sliderContainer = document.getElementById('golpe-slider-container');
          if (sliderContainer) {
            sliderContainer.style.display = btn.dataset.source === 'custom' ? 'block' : 'none';
          }
          // Sync initial level max with the newly selected desired level
          let nivelDesejado;
          if (btn.dataset.source === 'custom') {
            nivelDesejado = parseInt(document.getElementById('golpe-nivel-slider')?.value || '2');
          } else {
            nivelDesejado = parseInt(btn.dataset.source);
          }
          syncGolpeInicialMax(nivelDesejado);
        }

        // Handle astro slider visibility
        if (group.id === 'astro-raridade-toggles') {
          const sliderContainer = document.getElementById('astro-slider-container');
          if (sliderContainer) {
            sliderContainer.style.display = btn.dataset.source === 'custom' ? 'block' : 'none';
          }
        }

        // Real-time calculation
        const calcType = getCalcType(group);
        if (calcType === 'custos') {
          calculateBuildCost();
        } else {
          calculateEarnings();
        }
      });
    });
  });

  // Initial visibility checks
  const checkSliderVisibility = (groupId, sliderId, triggerSource) => {
    const group = document.getElementById(groupId);
    const slider = document.getElementById(sliderId);
    if (group && slider) {
      const active = group.querySelector('.toggle-btn.active');
      slider.style.display = active?.dataset.source === triggerSource ? 'block' : 'none';
    }
  };

  checkSliderVisibility('guilda-tier-toggles', 'diamante-slider-container', 'diamante');
  checkSliderVisibility('golpe-nivel-toggles', 'golpe-slider-container', 'custom');
  checkSliderVisibility('astro-raridade-toggles', 'astro-slider-container', 'custom');

  // Initial sync of golpe-nivel-inicial max with the active desired level
  const activeGolpeNivel = getActiveToggle('golpe-nivel-toggles');
  if (activeGolpeNivel && activeGolpeNivel !== 'custom') {
    syncGolpeInicialMax(parseInt(activeGolpeNivel));
  } else if (activeGolpeNivel === 'custom') {
    const sliderVal = parseInt(document.getElementById('golpe-nivel-slider')?.value || '2');
    syncGolpeInicialMax(sliderVal);
  }
}

/**
 * Update diamond slider display value
 */
export function updateDiamanteSlider(value) {
  const display = document.getElementById('diamante-pontos-display');
  if (display) {
    display.textContent = parseInt(value).toLocaleString(getCurrentLanguage() === 'en' ? 'en-US' : 'pt-BR');
  }
  calculateEarnings();
}

/**
 * Get active toggle value from a group
 */
function getActiveToggle(groupId) {
  const group = document.getElementById(groupId);
  if (!group) return null;
  const active = group.querySelector('.toggle-btn.active');
  return active ? active.dataset.source : null;
}

/**
 * Check if a toggle source is active (for non-exclusive groups)
 */
function isToggleActive(groupId, source) {
  const group = document.getElementById(groupId);
  if (!group) return false;
  const btn = group.querySelector(`.toggle-btn[data-source="${source}"]`);
  return btn ? btn.classList.contains('active') : false;
}

/**
 * Map rarity data-source key to translated rarity name
 */
function rarityLabel(key) {
  const map = {
    bronze: 'rarity.bronze',
    prata: 'rarity.silver',
    ouro: 'rarity.gold',
    diamante: 'rarity.diamond'
  };
  return map[key] ? t(map[key]) : key.charAt(0).toUpperCase() + key.slice(1);
}

/**
 * Calculate monthly earnings based on toggle inputs
 */
export function calculateEarnings() {
  if (!statsData) {
    console.error('Stats data not loaded');
    return;
  }

  const fixos = statsData.ganhosFixos || {};
  const reinos = statsData.reinosParalelos || {};
  const disputas = statsData.disputasPremiadas || {};
  const guildas = statsData.guildas || {};
  const teonitas = statsData.teonitas?.fontesMensais || {};

  let totalCoins = 0;
  let totalTeonita = 0;
  const breakdown = [];

  // === FIXED SOURCES ===
  // Diarias
  if (isToggleActive('fixed-toggles', 'diarias')) {
    const valor = (fixos.diarias?.valor || 0) * (fixos.diarias?.regra?.ocorrenciasMensais || 30);
    totalCoins += valor;
    totalTeonita += teonitas.diarias?.valor || 0;
    breakdown.push({ nome: t('calc.dailyEvents'), coins: valor, teonita: teonitas.diarias?.valor });
  }

  // Calendario
  if (isToggleActive('fixed-toggles', 'calendario')) {
    totalCoins += fixos.calendario?.valor || 0;
    totalTeonita += fixos.calendario?.teonita || 0;
    breakdown.push({ nome: t('calc.calendar'), coins: fixos.calendario?.valor, teonita: fixos.calendario?.teonita });
  }

  // Site
  if (isToggleActive('fixed-toggles', 'site')) {
    totalCoins += fixos.site?.valor || 0;
    totalTeonita += fixos.site?.teonita || 0;
    breakdown.push({ nome: t('calc.site'), coins: fixos.site?.valor, teonita: fixos.site?.teonita });
  }

  // Miss\u00F5es Di\u00E1ria de Guilda (teonita only)
  if (isToggleActive('fixed-toggles', 'guildaDiaria')) {
    const guildaTeonita = teonitas.guilda?.valor || 0;
    totalTeonita += guildaTeonita;
    breakdown.push({ nome: t('calc.guildMissions'), teonita: guildaTeonita });
  }

  // === PASSE ===
  const passeType = getActiveToggle('passe-toggles');
  if (passeType && fixos.passe?.[passeType]) {
    totalCoins += fixos.passe[passeType].valor || 0;
    totalTeonita += fixos.passe[passeType].teonita || 0;
    breakdown.push({
      nome: `${t('calc.battlePass')} (${passeType === 'gratis' ? t('calc.free') : t('calc.premium')})`,
      coins: fixos.passe[passeType].valor,
      teonita: fixos.passe[passeType].teonita
    });
  }

  // === DP PERSONAGEM ===
  const dpFaixa = getActiveToggle('dp-faixa-toggles');
  const dpRank = getActiveToggle('dp-rank-toggles');
  if (dpFaixa && dpFaixa !== 'nenhum' && dpRank) {
    // Padr\u00E3o = base reward for completing, Ranking = bonus for placement
    const dpPadrao = disputas.personagem?.[dpFaixa]?.rankings?.padrao?.canopyCoins || 0;
    const dpRankBonus = disputas.personagem?.[dpFaixa]?.rankings?.[dpRank]?.canopyCoins || 0;
    const dpFreq = disputas.personagem?.regra?.ocorrenciasMensais || 9;
    const dpTotal = (dpPadrao + dpRankBonus) * dpFreq;
    totalCoins += dpTotal;

    // Teonita from DP (padr\u00E3o + ranking teonita)
    const dpPadraoTeonita = disputas.personagem?.[dpFaixa]?.rankings?.padrao?.teonita || 0;
    const dpRankTeonita = disputas.personagem?.[dpFaixa]?.rankings?.[dpRank]?.teonita || 0;
    const dpTeonitaTotal = (dpPadraoTeonita + dpRankTeonita) * dpFreq;
    totalTeonita += dpTeonitaTotal;

    breakdown.push({
      nome: `${t('calc.pf')} ${rarityLabel(dpFaixa)}`,
      coins: dpTotal,
      teonita: dpTeonitaTotal
    });
  }

  // === DP MENSAL ===
  if (isToggleActive('dp-mensal-toggles', 'mensal')) {
    const mensalCoins = disputas.mensal?.rankings?.padrao?.canopyCoins || 0;
    const mensalTeonita = disputas.mensal?.rankings?.padrao?.teonita || 0;
    totalCoins += mensalCoins;
    totalTeonita += mensalTeonita;
    breakdown.push({ nome: t('calc.pfMonthly'), coins: mensalCoins, teonita: mensalTeonita });
  }

  // === DP MEDICIS ===
  const dpMedicisRank = getActiveToggle('dp-medicis-toggles');
  if (dpMedicisRank && dpMedicisRank !== 'nenhum') {
    // Padr\u00E3o = base reward, Ranking = bonus
    const medicisPadrao = disputas.medicis?.rankings?.padrao?.canopyCoins || 0;
    const medicisRankBonus = disputas.medicis?.rankings?.[dpMedicisRank]?.canopyCoins || 0;
    const medicisFreq = disputas.medicis?.regra?.ocorrenciasMensais || 4;
    const medicisTotal = (medicisPadrao + medicisRankBonus) * medicisFreq;
    totalCoins += medicisTotal;
    breakdown.push({ nome: t('calc.pfMedicis'), coins: medicisTotal });
  }

  // === REINOS PARALELOS ===
  const reinosDif = getActiveToggle('reinos-dif-toggles');
  const reinosComp = getActiveToggle('reinos-comp-toggles');
  if (reinosDif && reinosDif !== 'nenhum') {
    const recompKey = reinosComp === 'max' ? 'recompensas-maximas' : 'recompensas-minimas';
    const reinoReward = reinos.dificuldades?.[reinosDif]?.[recompKey]?.canopyCoins || 0;
    const reinoFreq = reinos.regra?.ocorrenciasMensais || 9;
    const reinoTotal = reinoReward * reinoFreq;
    totalCoins += reinoTotal;
        const reinoNome = reinosDif === 'basico' ? t('calc.basic')
            : reinosDif === 'avancado' ? t('calc.advanced')
            : reinosDif === 'especialista' ? t('calc.expert')
            : reinosDif === 'mestre' ? t('calc.master')
            : reinosDif === 'pesadelo' ? t('calc.nightmare')
            : reinosDif === 'semDo' ? t('calc.noMercy')
            : (reinos.dificuldades?.[reinosDif]?.nome || reinosDif);
    breakdown.push({ nome: `${t('calc.parallelRealms')} (${reinoNome})`, coins: reinoTotal });
  }

  // === GUILDA ===
  // Eventos de guilda
  if (isToggleActive('guilda-eventos-toggles', 'eventos')) {
    const guildaEventosReward = guildas.eventos?.recompensasEvento?.canopyCoins || 0;
    const guildaEventosTotal = guildaEventosReward * 4; // 4 eventos por m\u00EAs
    totalCoins += guildaEventosTotal;
    breakdown.push({ nome: t('calc.guildEvents'), coins: guildaEventosTotal });
  }

  // Batalha de guilda (tier)
  const guildaTier = getActiveToggle('guilda-tier-toggles');
  if (guildaTier && guildaTier !== 'nenhum') {
    const tierData = guildas.batalha?.[guildaTier];
    if (tierData) {
      let tierReward = tierData.recompensas?.canopyCoins || 0;

      // Diamante bonus: +25000 per 1000 points above 16000
      if (guildaTier === 'diamante') {
        const slider = document.getElementById('diamante-pontos-slider');
        const pontos = parseInt(slider?.value || '16000');
        const pontosBonus = Math.floor((pontos - 16000) / 1000);
        tierReward += pontosBonus * 25000;
      }

      const tierTotal = tierReward * 4; // 4 batalhas semanais por m\u00EAs
      totalCoins += tierTotal;
        breakdown.push({ nome: `${t('calc.guild')} (${guildaTierLabel(guildaTier)})`, coins: tierTotal });
    }
  }

  // Teonita de miss\u00F5es di\u00E1rias de guilda (handled separately in fixed sources if toggle active)

  // === UPDATE UI ===
  const resultBox = document.getElementById('earnings-result');
  if (resultBox) resultBox.classList.remove('hidden');

  document.getElementById('result-coins').textContent = formatNumber(totalCoins);
  document.getElementById('result-coins-week').textContent = formatNumber(Math.round(totalCoins / 4));
  document.getElementById('result-teonita').textContent = formatNumber(totalTeonita);
  document.getElementById('result-teonita-week').textContent = formatNumber(Math.round(totalTeonita / 4));

  // Render breakdown
  const breakdownBox = document.getElementById('earnings-breakdown');
  if (breakdownBox) {
    breakdownBox.innerHTML = `
    <h5>\uD83D\uDCCA ${t('calc.breakdown')}</h5>
    <ul>
      ${breakdown.map(item => `
        <li>
          <span>${item.nome}</span>
          <span>
            ${item.coins ? formatNumber(item.coins) + ' ' + t('calc.coins') : ''}
            ${item.coins && item.teonita ? ' + ' : ''}
            ${item.teonita ? formatNumber(item.teonita) + ' ' + t('calc.theonite') : ''}
          </span>
        </li>
      `).join('')}
    </ul>
    `;
  }
}
/**
 * Calculate unified build cost - Golpes + Astros together
 */
export function calculateBuildCost() {
  if (!statsData?.golpes || !statsData?.astros) {
    console.error('Stats data not loaded');
    return;
  }

  const golpesData = statsData.golpes;
  const astrosData = statsData.astros;

  // === GOLPES CALCULATION ===
  const golpeRaridade = getActiveToggle('golpe-raridade-toggles') || 'diamante';
  const golpeShiny = isToggleActive('golpe-shiny-toggle', 'shiny');
  const golpeNivelSelection = getActiveToggle('golpe-nivel-toggles') || '15';

  let golpesResult = null;

  if (golpeRaridade !== 'nenhum') {
    let golpeNivelAlvo;
    if (golpeNivelSelection === 'custom') {
      golpeNivelAlvo = parseInt(document.getElementById('golpe-nivel-slider')?.value || '2');
    } else {
      golpeNivelAlvo = parseInt(golpeNivelSelection);
    }

    // Get initial level from slider (default 1)
    const golpeNivelInicial = parseInt(document.getElementById('golpe-nivel-inicial-slider')?.value || '1');

    // Calculate accumulated cost for the interval (inicial+1 to alvo)
    let custoIntervalo = 0;
    for (let i = golpeNivelInicial + 1; i <= golpeNivelAlvo; i++) {
      custoIntervalo += golpesData.custoPorNivel[String(i)] || 0;
    }

    const custoUmGolpe = custoIntervalo;
    const custoBuild = custoUmGolpe * 5;

    // Reference cost from personagemCompleto
    const shinyKey = golpeShiny ? 'shiny' : 'normal';
    const custoPersonagem = golpesData.personagemCompleto?.[golpeRaridade]?.[shinyKey] || 0;

    golpesResult = {
      nivelAlvo: golpeNivelAlvo,
      nivelInicial: golpeNivelInicial,
      custoUmGolpe,
      custoBuild,
      custoPersonagem,
      raridade: golpeRaridade,
      isShiny: golpeShiny
    };
  }

  // === ASTROS CALCULATION ===
  const astroRaridade = getActiveToggle('astro-raridade-toggles') || 'diamante';
  const astroShiny = isToggleActive('astro-shiny-toggle', 'shiny');

  let astrosResult = null;

  if (astroRaridade !== 'nenhum') {
    let astroNivelAlvo;
    if (astroRaridade === 'custom') {
      astroNivelAlvo = parseInt(document.getElementById('astro-nivel-slider')?.value || '2');
    } else {
      astroNivelAlvo = astrosData.nivelMaxPorRaridade?.[astroRaridade]?.nivelMax || 20;
    }

    // Calculate accumulated cost
    let totalGold = 0;
    let totalPo = 0;
    for (let i = 2; i <= astroNivelAlvo; i++) {
      const nivel = astrosData.custoPorNivel[String(i)];
      if (nivel) {
        totalGold += nivel.gold || 0;
        totalPo += nivel.po || 0;
      }
    }

    // Apply shiny discount (50%)
    if (astroShiny) {
      totalGold = Math.floor(totalGold * 0.5);
      totalPo = Math.floor(totalPo * 0.5);
    }

    const custoDoNivel = astrosData.custoPorNivel[String(astroNivelAlvo)] || { gold: 0, po: 0 };

    astrosResult = {
      nivelAlvo: astroNivelAlvo,
      gold: totalGold,
      po: totalPo,
      custoDoNivel,
      raridade: astroRaridade === 'custom' ? t('calc.custom') : rarityLabel(astroRaridade),
      isShiny: astroShiny
    };
  }

  // === RENDER RESULTS ===
  const resultBox = document.getElementById('build-cost-result');
  if (resultBox) resultBox.classList.remove('hidden');

  const breakdownBox = document.getElementById('build-cost-breakdown');
  if (!breakdownBox) return;

  // Calculate totals
  const totalCoins = (golpesResult?.custoBuild || 0) + (golpesResult?.custoPersonagem || 0) + (astrosResult?.gold || 0);
  const totalPo = astrosResult?.po || 0;

  let html = '<div class="build-cost-details">';

  // Golpes section
  if (golpesResult) {
    html += `
    <div class="cost-section golpes">
      <h5>\u2694\uFE0F ${t('calc.moves')} ${golpesResult.isShiny ? '\u2728' : ''}</h5>
      <ul>
        <li>
          <span>${t('calc.moveCost')} (Lv${golpesResult.nivelInicial}\u2192${golpesResult.nivelAlvo})</span>
          <span class="value">${formatNumber(golpesResult.custoUmGolpe)}</span>
        </li>
        <li>
          <span>${t('calc.moveCostPlural')} (Lv${golpesResult.nivelInicial}\u2192${golpesResult.nivelAlvo})</span>
          <span class="value">${formatNumber(golpesResult.custoBuild)}</span>
        </li>
        ${golpesResult.custoPersonagem ? `
        <li>
          <span>${t('calc.characterRarity')} ${rarityLabel(golpesResult.raridade)}${golpesResult.isShiny ? t('calc.shiny') : ''}</span>
          <span class="value">${formatNumber(golpesResult.custoPersonagem)}</span>
        </li>
        ` : ''}
      </ul>
    </div>
    `;
  }

  // Astros section
  if (astrosResult) {
    html += `
    <div class="cost-section astros">
      <h5>\u2B50 ${t('calc.astroCost')} ${astrosResult.raridade} ${astrosResult.isShiny ? '\u2728' : ''}</h5>
      <ul>
        <li>
          <span>${t('calc.astroCost')} (Lv1\u2192${astrosResult.nivelAlvo})</span>
          <span class="value">${formatNumber(astrosResult.gold)}${astrosResult.po > 0 ? ` <span class="po">+${formatNumber(astrosResult.po)} ${t('calc.evolutionPo')}</span>` : ''}</span>
        </li>
      </ul>
    </div>
    `;
  }

  // Total section
  html += `
  <div class="cost-total">
    <div class="total-row">
      <span class="total-label"><img loading="lazy" src="img/official/CanopyCoin.webp" style="height: 1.8em; vertical-align: -0.4em; margin-right: 0.2rem;" alt="${t('calc.altCoins')}"> ${t('calc.totalCoins')}</span>
      <span class="total-value coins">${formatNumber(totalCoins)}</span>
    </div>
    ${totalPo > 0 ? `
    <div class="total-row">
      <span class="total-label">\uD83D\uDD2E ${t('calc.totalPo')}</span>
      <span class="total-value po">${formatNumber(totalPo)}</span>
    </div>
    ` : ''}
  </div>
  `;

  // Shiny notes only
  const shinyNotes = [];
  if (golpesResult?.isShiny && golpesResult?.custoPersonagem) shinyNotes.push(`${t('calc.characterRarity')} ${t('calc.shinyNotes')}`);
  if (astrosResult?.isShiny) shinyNotes.push(`${t('calc.astroCost')} ${t('calc.shinyNotes')}`);
  if (shinyNotes.length > 0) {
    html += `<p class="cost-notes">\u2728 ${shinyNotes.join(' \u2022 ')}</p>`;
  }

  html += '</div>';
  breakdownBox.innerHTML = html;
}

// Global handlers
export function handleCalculateEarnings() {
  calculateEarnings();
}

export function handleCalculateBuildCost() {
  calculateBuildCost();
}

// Legacy handlers (kept for compatibility)
export function handleCalculateGolpes() {
  calculateBuildCost();
}

export function handleCalculateAstros() {
  calculateBuildCost();
}
