import { formatNumber } from '../utils/formatters.js';
import { calculateMonthlyEarnings, calculateUpgradeCosts } from '../utils/calculatorEngine.js';
import { getCurrentLanguage, t } from '../i18n/index.js';

let calculatorData = null;

const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));

const currencyLabel = key => ({
  canopyCoins: t('calc.coins'), teonita: t('calc.theonite'), po: t('calc.evolutionPo')
}[key] || key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, char => char.toUpperCase()));

const currencyIcons = {
  canopyCoins: 'img/official/CanopyCoin.webp',
  teonita: 'img/official/Theonite.webp',
  riftCoins: 'img/official/RiftCoin.webp'
};

function currencyMark(key) {
  const label = escapeHtml(currencyLabel(key));
  return currencyIcons[key]
    ? `<img class="studio-currency-icon" src="${currencyIcons[key]}" alt="${label}" loading="lazy">`
    : `<span class="studio-currency-mark" aria-label="${label}">✦</span>`;
}

function resourceValues(resources) {
  return Object.entries(resources).filter(([, amount]) => amount).map(([key, amount]) => `
    <span class="studio-resource-value">${currencyMark(key)}<span>${formatNumber(amount)} ${escapeHtml(currencyLabel(key))}</span></span>
  `).join('');
}

const option = (value, label, selected = false) => `<option value="${escapeHtml(value)}" ${selected ? 'selected' : ''}>${escapeHtml(label)}</option>`;

function selectField(id, label, options, selected, extraClass = '') {
  return `<label class="studio-field ${extraClass}" for="${id}"><span>${escapeHtml(label)}</span><select id="${id}" name="${id}">${options.map(item => option(item.value, item.label, item.value === selected)).join('')}</select></label>`;
}

function checkboxField(id, label, checked = false) {
  return `<label class="studio-check" for="${id}"><input id="${id}" name="${id}" type="checkbox" ${checked ? 'checked' : ''}><span>${escapeHtml(label)}</span></label>`;
}

function section(title, content, icon) {
  return `<section class="studio-section"><h3><span class="studio-section-icon" aria-hidden="true">${icon}</span>${escapeHtml(title)}</h3>${content}</section>`;
}

function sourceToggle(id, label, checked = true) {
  const hint = getCurrentLanguage() === 'en' ? 'Include this source in the estimate' : 'Incluir esta fonte na estimativa';
  return `<label class="studio-source-toggle" for="${id}"><span class="studio-source-copy"><strong>${escapeHtml(label)}</strong><small>${hint}</small></span><input id="${id}" name="${id}" type="checkbox" ${checked ? 'checked' : ''}><span class="studio-switch" aria-hidden="true"></span></label>`;
}

function rankLabel(key) {
  const labels = { top10: t('calc.top10'), top10percent: t('calc.top10'), top30percent: t('calc.top30'), top60percent: t('calc.top60'), top100: t('calc.top100') };
  return labels[key] || key;
}

function getIncomeChoices(form) {
  const values = new FormData(form);
  const fixed = {};
  form.querySelectorAll('[data-fixed-source]').forEach(input => { fixed[input.dataset.fixedSource] = input.checked; });
  return {
    fixed,
    guildMissions: values.has('guildMissions'),
    passEnabled: values.has('passEnabled'),
    pass: values.get('pass') || '',
    pfEnabled: values.has('pfEnabled'),
    pfRarity: values.get('pfRarity') || '',
    pfRank: values.get('pfRank') || '',
    monthlyPf: values.has('monthlyPf'),
    mediciEnabled: values.has('mediciEnabled'),
    medici: values.get('medici') || '',
    realmEnabled: values.has('realmEnabled'),
    realm: values.get('realm') || '',
    realmMax: values.get('realmMax') === 'max',
    guildEvents: values.has('guildEvents'),
    guildTierEnabled: values.has('guildTierEnabled'),
    guildTier: values.get('guildTier') || '',
    guildPoints: values.get('guildPoints') || 16000
  };
}

function getUpgradeChoices(form) {
  const values = new FormData(form);
  return {
    moveRarity: values.get('moveRarity'), moveFrom: values.get('moveFrom'), moveTo: values.get('moveTo'),
    moveCount: values.get('moveCount'), moveShiny: values.has('moveShiny'), includeFullMoveSet: values.has('includeFullMoveSet'),
    starFrom: values.get('starFrom'), starTo: values.get('starTo'), starShiny: values.has('starShiny')
  };
}

function displayBreakdown(target, breakdown) {
  target.innerHTML = breakdown.length ? breakdown.map(item => `
    <div class="studio-breakdown-row"><span>${escapeHtml(item.name)}</span><strong>${resourceValues(item.resources)}</strong></div>
  `).join('') : `<p class="studio-empty">${getCurrentLanguage() === 'en' ? 'Enable a source to see your estimate.' : 'Ative uma fonte para ver sua estimativa.'}</p>`;
}

function renderIncomeResults(root) {
  const form = root.querySelector('#income-form');
  if (!form || !calculatorData) return;
  const result = calculateMonthlyEarnings(calculatorData, getIncomeChoices(form));
  const totals = root.querySelector('#income-totals');
  totals.innerHTML = Object.entries(result.total).filter(([, value]) => value).map(([key, value]) => `
    <article class="studio-total-card"><span class="studio-total-name">${currencyMark(key)}${escapeHtml(currencyLabel(key))}</span><strong>${formatNumber(value)}</strong><small>${getCurrentLanguage() === 'en' ? 'per month' : 'por mês'}</small></article>
  `).join('') || `<p class="studio-empty">${getCurrentLanguage() === 'en' ? 'No income sources selected.' : 'Nenhuma fonte de ganho selecionada.'}</p>`;
  displayBreakdown(root.querySelector('#income-breakdown'), result.breakdown);
}

function renderUpgradeResults(root) {
  const form = root.querySelector('#upgrade-form');
  if (!form || !calculatorData) return;
  const result = calculateUpgradeCosts(calculatorData, getUpgradeChoices(form));
  root.querySelector('#upgrade-totals').innerHTML = Object.entries(result.total).filter(([, value]) => value).map(([key, value]) => `
    <article class="studio-total-card"><span class="studio-total-name">${currencyMark(key)}${escapeHtml(currencyLabel(key))}</span><strong>${formatNumber(value)}</strong><small>${getCurrentLanguage() === 'en' ? 'total cost' : 'custo total'}</small></article>
  `).join('') || `<p class="studio-empty">${getCurrentLanguage() === 'en' ? 'Choose an upgrade to estimate.' : 'Escolha um upgrade para estimar.'}</p>`;
  displayBreakdown(root.querySelector('#upgrade-breakdown'), result.breakdown);
}

function buildIncomeForm(data) {
  const fixed = data.ganhosFixos || {};
  const monthlyResources = data.teonitas?.fontesMensais || {};
  const translatedSources = { diarias: t('calc.dailyEvents'), calendario: t('calc.calendar'), site: t('calc.site') };
  const staticSources = Object.entries(fixed).filter(([key]) => key !== 'meta' && key !== 'passe');
  const fixedChecks = staticSources.map(([key, source]) => sourceToggle(`fixed-${key}`, translatedSources[key] || source.nome || key).replace(`name="fixed-${key}"`, `name="fixed-${key}" data-fixed-source="${escapeHtml(key)}"`)).join('');
  const passValues = Object.keys(fixed.passe || {});
  if (!passValues.includes('premiumPlus') && monthlyResources.passePremiumPlus) passValues.push('premiumPlus');
  const passOptions = passValues.map(key => ({ value: key, label: fixed.passe?.[key]?.nome || monthlyResources[`passe${key === 'gratis' ? 'Free' : key === 'premium' ? 'Premium' : 'PremiumPlus'}`]?.nome || key }));
  const rarities = Object.entries(data.disputasPremiadas?.personagem || {}).filter(([key]) => key !== 'regra');
  const selectedRarity = rarities.some(([key]) => key === 'diamante') ? 'diamante' : rarities[0]?.[0];
  const rankKeys = Object.keys(data.disputasPremiadas?.personagem?.[selectedRarity]?.rankings || {}).filter(key => key !== 'padrao');
  const selectedRank = rankKeys.includes('top30percent') ? 'top30percent' : rankKeys[0];
  const realmOptions = Object.entries(data.reinosParalelos?.dificuldades || {}).map(([key, value]) => ({ value: key, label: value.nome || key }));
  const guildOptions = Object.entries(data.guildas?.batalha || {}).map(([key, value]) => ({ value: key, label: value.nome || key }));
  const rarityOptions = rarities.map(([key, value]) => ({ value: key, label: value.nome || key }));
  const mediciRanks = Object.keys(data.disputasPremiadas?.medicis?.rankings || {}).filter(key => key !== 'padrao');

  return `<form id="income-form" class="studio-form" autocomplete="off">
    ${section(t('calc.fixedSources'), `<div class="studio-check-grid">${fixedChecks}${sourceToggle('guildMissions', t('calc.guildMissions'))}</div>`, '◷')}
    ${section(t('calc.battlePass'), `<div class="studio-source-panel">${sourceToggle('passEnabled', t('calc.battlePass'))}${selectField('pass', t('calc.battlePass'), passOptions, 'gratis')}</div>`, '🎟')}
    ${section(t('calc.prizeFights'), `
      <div class="studio-source-panel">${sourceToggle('pfEnabled', t('calc.pfCharacter'))}<div class="studio-field-grid">${selectField('pfRarity', t('calc.pfCharacter'), rarityOptions, selectedRarity)}${selectField('pfRank', t('calc.pfRanking'), rankKeys.map(key => ({ value: key, label: rankLabel(key) })), selectedRank)}</div></div>
      ${sourceToggle('monthlyPf', t('calc.pfMonthly'))}
      <div class="studio-source-panel">${sourceToggle('mediciEnabled', t('calc.pfMedicis'))}${selectField('medici', t('calc.pfMedicis'), mediciRanks.map(key => ({ value: key, label: rankLabel(key) })), mediciRanks.includes('top10percent') ? 'top10percent' : mediciRanks[0])}</div>`, '🏆')}
    ${section(t('calc.parallelRealms'), `<div class="studio-source-panel">${sourceToggle('realmEnabled', t('calc.parallelRealms'))}<div class="studio-field-grid">${selectField('realm', t('calc.difficulty'), realmOptions, realmOptions.some(item => item.value === 'semDo') ? 'semDo' : realmOptions[0]?.value)}${selectField('realmMax', t('calc.completeness'), [{ value: 'min', label: t('calc.minimum') }, { value: 'max', label: t('calc.maximum') }], 'max')}</div></div>`, '🏰')}
    ${section(t('calc.guild'), `
      ${sourceToggle('guildEvents', t('calc.guildEvents'))}
      <div class="studio-source-panel">${sourceToggle('guildTierEnabled', t('calc.battleTier'))}<div class="studio-field-grid">${selectField('guildTier', t('calc.battleTier'), guildOptions, guildOptions.some(item => item.value === 'diamante') ? 'diamante' : guildOptions[0]?.value)}
      <label class="studio-field" for="guildPoints"><span>${t('calc.guildPoints')} <output id="guild-points-output">16.000</output></span><input id="guildPoints" name="guildPoints" type="range" min="16000" max="30000" step="1000" value="16000"></label></div></div>`, '♟')}
  </form>`;
}

function buildUpgradeForm(data) {
  const rarities = Object.keys(data.golpes?.personagemCompleto || {});
  const moveRarity = rarities.includes('diamante') ? 'diamante' : rarities[0];
  const rarityLabels = { bronze: t('rarity.bronze'), prata: t('rarity.silver'), ouro: t('rarity.gold'), diamante: t('rarity.diamond') };
  const rarityOptions = rarities.map(key => ({ value: key, label: rarityLabels[key] || key }));
  const levelOptions = Array.from({ length: 15 }, (_, index) => ({ value: index + 1, label: `${t('calc.lv')} ${index + 1}` }));
  const guestMax = Math.max(1, ...Object.keys(data.astros?.custoPorNivel || {}).map(Number));
  const guestLevels = Array.from({ length: guestMax }, (_, index) => ({ value: index + 1, label: `${t('calc.lv')} ${index + 1}` }));

  return `<form id="upgrade-form" class="studio-form" autocomplete="off">
    ${section(t('calc.moves'), `
      <div class="studio-field-grid">${selectField('moveRarity', t('calc.moveRarity'), rarityOptions, moveRarity)}${selectField('moveCount', getCurrentLanguage() === 'en' ? 'Moves to upgrade' : 'Golpes para evoluir', [1, 2, 3, 4, 5].map(value => ({ value, label: `${value}×` })), 5)}</div>
      <div class="studio-field-grid">${selectField('moveFrom', t('calc.initialLevel'), levelOptions, 1)}${selectField('moveTo', t('calc.desiredLevel'), levelOptions, 15)}</div>
      ${checkboxField('moveShiny', t('calc.shinyDiscount'))}
      ${checkboxField('includeFullMoveSet', getCurrentLanguage() === 'en' ? 'Include the full rarity move-set cost' : 'Incluir o custo completo dos golpes da raridade', true)}`, '⚔')}
    ${section(t('calc.astros'), `
      <div class="studio-field-grid">${selectField('starFrom', t('calc.initialLevel'), guestLevels, 1)}${selectField('starTo', t('calc.desiredLevel'), guestLevels, Math.min(20, guestMax))}</div>
      ${checkboxField('starShiny', t('calc.shinyDiscount'))}`, '✦')}
  </form>`;
}

export function createCalculator() {
  return `<div class="calculator-studio" id="calculator-studio">
    <div class="studio-mode-switch" role="tablist" aria-label="${escapeHtml(t('calc.title'))}">
      <button class="studio-mode active" type="button" role="tab" aria-selected="true" data-mode="income">◈ ${t('calc.earnings')}</button>
      <button class="studio-mode" type="button" role="tab" aria-selected="false" data-mode="upgrade">⚒ ${t('calc.costs')}</button>
    </div>
    <div class="studio-view active" data-view="income"><div class="studio-workspace"><div class="studio-controls" id="income-controls"><p class="studio-loading">${getCurrentLanguage() === 'en' ? 'Loading game data…' : 'Carregando dados do jogo…'}</p></div><aside class="studio-results"><p class="studio-eyebrow">${getCurrentLanguage() === 'en' ? 'MONTHLY ESTIMATE' : 'ESTIMATIVA MENSAL'}</p><h2 aria-live="polite">${t('calc.estimatedResult')}</h2><div class="studio-totals" id="income-totals" aria-live="polite"></div><div class="studio-breakdown" id="income-breakdown"></div></aside></div></div>
    <div class="studio-view" data-view="upgrade"><div class="studio-workspace"><div class="studio-controls" id="upgrade-controls"><p class="studio-loading">${getCurrentLanguage() === 'en' ? 'Loading game data…' : 'Carregando dados do jogo…'}</p></div><aside class="studio-results"><p class="studio-eyebrow">${getCurrentLanguage() === 'en' ? 'UPGRADE PLANNER' : 'PLANEJADOR DE EVOLUÇÃO'}</p><h2 aria-live="polite">${t('calc.totalBuildCost')}</h2><div class="studio-totals" id="upgrade-totals" aria-live="polite"></div><div class="studio-breakdown" id="upgrade-breakdown"></div></aside></div></div>
    <p class="studio-disclaimer">ⓘ ${getCurrentLanguage() === 'en' ? 'Estimates use the data available in the game tables and may vary with future balance changes.' : 'Estimativas baseadas nos dados disponíveis e sujeitas a mudanças futuras no jogo.'}</p>
  </div>`;
}

export function initCalculator(data) {
  calculatorData = data;
  const root = document.getElementById('calculator-studio');
  if (!root) return;
  root.querySelector('#income-controls').innerHTML = buildIncomeForm(data);
  root.querySelector('#upgrade-controls').innerHTML = buildUpgradeForm(data);

  root.addEventListener('input', event => {
    if (event.target.name === 'guildPoints') {
      const value = Number(event.target.value);
      root.querySelector('#guild-points-output').textContent = new Intl.NumberFormat(getCurrentLanguage() === 'en' ? 'en-US' : 'pt-BR').format(value);
    }
    updateResults(root, event.target.closest('[data-view]')?.dataset.view);
  });
  root.addEventListener('change', event => {
    const form = event.target.closest('form');
    if (event.target.name === 'pfRarity' && form) {
      const rankSelect = form.elements.pfRank;
      const ranks = Object.keys(data.disputasPremiadas?.personagem?.[event.target.value]?.rankings || {}).filter(key => key !== 'padrao');
      const previous = rankSelect.value;
      rankSelect.innerHTML = ranks.map(key => option(key, rankLabel(key), key === previous)).join('');
      if (!ranks.includes(previous)) rankSelect.value = ranks.includes('top30percent') ? 'top30percent' : ranks[0] || '';
    }
    if (form && ['moveFrom', 'moveTo', 'starFrom', 'starTo'].includes(event.target.name)) {
      const fromName = event.target.name.endsWith('From') ? event.target.name : event.target.name.replace('To', 'From');
      const toName = event.target.name.endsWith('To') ? event.target.name : event.target.name.replace('From', 'To');
      const from = form.elements[fromName];
      const to = form.elements[toName];
      if (Number(from.value) > Number(to.value)) {
        if (event.target === from) to.value = from.value;
        else from.value = to.value;
      }
    }
    updateResults(root, event.target.closest('[data-view]')?.dataset.view);
  });
  root.querySelectorAll('.studio-mode').forEach(button => button.addEventListener('click', () => {
    root.querySelectorAll('.studio-mode').forEach(tab => {
      const active = tab === button;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    root.querySelectorAll('.studio-view').forEach(view => view.classList.toggle('active', view.dataset.view === button.dataset.mode));
  }));
  renderIncomeResults(root);
  renderUpgradeResults(root);
}

function updateResults(root, view) {
  if (view === 'upgrade') renderUpgradeResults(root);
  else if (view === 'income') renderIncomeResults(root);
  else { renderIncomeResults(root); renderUpgradeResults(root); }
}

export const initToggleButtons = () => {};
export const handleCalculateEarnings = () => {
  const root = document.getElementById('calculator-studio');
  if (root) renderIncomeResults(root);
};
export const handleCalculateBuildCost = () => {
  const root = document.getElementById('calculator-studio');
  if (root) renderUpgradeResults(root);
};
export const switchCalcTab = mode => {
  const button = document.querySelector(`.studio-mode[data-mode="${mode === 'ganhos' ? 'income' : 'upgrade'}"]`);
  button?.click();
};
export const updateDiamanteSlider = handleCalculateEarnings;
export const updateGolpeSlider = handleCalculateBuildCost;
export const updateGolpeInicialSlider = handleCalculateBuildCost;
export const updateAstroSlider = handleCalculateBuildCost;
