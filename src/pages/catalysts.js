// =====================================================
// CATALYSTS PAGE
// Catalyst guide and reference
// =====================================================

import { loadCatalysts } from '../services/dataService.js';
import { getState, updateCatalystNote } from '../state/store.js';
import { t, getCurrentLanguage } from '../i18n/index.js';
import { getLocalizedElementName } from '../config/constants.js';

/**
 * Render catalysts page
 * @returns {string} HTML string
 */
export function render() {
	return `
	<section class="section catalysts-section" id="catalysts">
		<div class="section-header">
			<button class="btn-back" onclick="navigateTo('')">
				\u2190
			</button>
			<h2>${t('catalysts.title')}</h2>
		</div>

		<div class="catalysts-intro">
			<p>${t('catalysts.intro')}</p>
		</div>

		<!-- Catalysts of the Week Section -->
		<div class="cotw-section">
			<h2 class="catalyst-title-main">${t('catalysts.weekModifiers')}</h2>
			<div class="cotw-filters">
				<button class="cotw-filter-btn" data-element="fire">
					<img loading="lazy" src="img/official/ElementalFireBackless.webp" alt="${getLocalizedElementName('Fogo')}">
					<span>${getLocalizedElementName('Fogo')}</span>
				</button>
				<button class="cotw-filter-btn" data-element="water">
					<img loading="lazy" src="img/official/ElementalWaterBackless.webp" alt="${getLocalizedElementName('\u00C1gua')}">
					<span>${getLocalizedElementName('\u00C1gua')}</span>
				</button>
				<button class="cotw-filter-btn" data-element="wind">
					<img loading="lazy" src="img/official/ElementalWindBackless.webp" alt="${getLocalizedElementName('Ar')}">
					<span>${getLocalizedElementName('Ar')}</span>
				</button>
				<button class="cotw-filter-btn" data-element="light">
					<img loading="lazy" src="img/official/ElementalLightBackless.webp" alt="${getLocalizedElementName('Luz')}">
					<span>${getLocalizedElementName('Luz')}</span>
				</button>
				<button class="cotw-filter-btn" data-element="dark">
					<img loading="lazy" src="img/official/ElementalDarkBackless.webp" alt="${getLocalizedElementName('Trevas')}">
					<span>${getLocalizedElementName('Trevas')}</span>
				</button>
			</div>
			<div class="catalyst-grid" id="cotw-container">
				<p class="info-state" style="text-align: center; margin: 20px 0;">${t('catalysts.selectElement')}</p>
			</div>
		</div>

		<div class="catalyst-categories" id="catalyst-container">
			<!-- Populated by JS -->
			<div class="loading-state">${t('catalysts.loading')}</div>
		</div>
	</section>
	`;
}

// Store catalyst data globally for filtering
let allCatalystsData = null;

/**
 * Initialize catalysts page
 */
export async function init() {
	const container = document.getElementById('catalyst-container');
	if (!container) return;

	allCatalystsData = await loadCatalysts();
	if (!allCatalystsData || !allCatalystsData.categories) {
		container.innerHTML = `<p class="error-state">${t('catalysts.errorLoad')}</p>`;
		return;
	}

	// Render general list
	container.innerHTML = allCatalystsData.categories.map((catObj) => {
		const categoryClass = getCategoryClass(catObj.category);
		return `
		<div class="catalyst-category ${categoryClass}">
			<h3>${catObj.category} \u2B07\uFE0F</h3>
			<div class="catalyst-grid">
				${catObj.items.map(item => renderCatalystCard(item)).join('')}
			</div>
		</div>
		`;
	}).join('');

	// Attach event listeners for notes
	attachNoteListeners();

	// Attach event listeners for COTW
	document.querySelectorAll('.cotw-filter-btn').forEach(btn => {
		btn.addEventListener('click', (e) => {
			document.querySelectorAll('.cotw-filter-btn').forEach(b => b.classList.remove('active'));
			const button = e.currentTarget;
			button.classList.add('active');
			renderCotw(button.dataset.element);
		});
	});
}

/**
 * Filter and render Catalysts of the Week based on element
 */
function renderCotw(element) {
	const cotwContainer = document.getElementById('cotw-container');
	if (!cotwContainer || !allCatalystsData) return;

	const filteredItems = [];
	for (const cat of allCatalystsData.categories) {
		const matching = cat.items.filter(i => i.element === element);
		filteredItems.push(...matching);
	}

	if (filteredItems.length === 0) {
		cotwContainer.innerHTML = `<p class="info-state">${t('catalysts.noElementFound')}</p>`;
		return;
	}

	cotwContainer.innerHTML = filteredItems.map(item => renderCatalystCard(item, true)).join('');
	attachNoteListeners();
}

/**
 * Get CSS class based on category name
 * @param {string} name - Category name
 * @returns {string} CSS class
 */
function getCategoryClass(name) {
	const n = name.toLowerCase();
	if (n.includes('forte') || n.includes('strong')) return 'cat-strong';
	if (n.includes('bom') || n.includes('good')) return 'cat-good';
	if (n.includes('mediano') || n.includes('average')) return 'cat-medium';
	if (n.includes('ruim') || n.includes('weak')) return 'cat-weak';
	return '';
}

/**
 * Render a single catalyst card
 * @param {Object} item - Catalyst item data
 * @param {boolean} isCotw - If true, restricts sizing/styling slightly if needed
 * @returns {string} HTML string
 */
function renderCatalystCard(item, isCotw = false) {
	const state = getState();
	// Retrieve saved note from state if exists
	const savedNote = state.userPreferences?.catalystNotes?.[item.name] || item.notes || '';

	// Formatting newlines in description
	const formattedDesc = (item.description || '').replace(/\\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

	return `
	<div class="catalyst-card ${isCotw ? 'cotw-card' : ''}">
		<div class="catalyst-card-header">
			<h4>${item.name}</h4>
			${item.constraint ? `<span class="catalyst-constraint">${item.constraint}</span>` : ''}
		</div>
		<div class="catalyst-description">
			<p>${formattedDesc}</p>
		</div>
		<div class="catalyst-note-container">
			<input type="text"
				class="catalyst-note-input"
				placeholder="${t('catalysts.addNotes')}"
				value="${savedNote}"
				data-cat-name="${item.name}">
		</div>
	</div>
	`;
}

/**
 * Attach listeners to note inputs to save their state
 */
function attachNoteListeners() {
	const inputs = document.querySelectorAll('.catalyst-note-input');
	inputs.forEach(input => {
		// use input event for realtime update or blur for save on exit
		input.addEventListener('change', (e) => {
			const val = e.target.value;
			const name = e.target.dataset.catName;
			updateCatalystNote(name, val);
		});
	});
}
