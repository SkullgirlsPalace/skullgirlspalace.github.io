// =====================================================
// CATALYSTS PAGE
// Catalyst guide and reference
// =====================================================

import { loadCatalysts } from '../services/dataService.js';
import { getState, updateCatalystNote } from '../state/store.js';
import { t } from '../i18n/index.js';

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

		<div class="catalyst-categories" id="catalyst-container">
			<!-- Populated by JS -->
			<div class="loading-state">${t('catalysts.loading')}</div>
		</div>
	</section>
	`;
}

/**
 * Initialize catalysts page
 */
export async function init() {
	const container = document.getElementById('catalyst-container');
	if (!container) return;

	const catalystData = await loadCatalysts();
	if (!catalystData || !catalystData.categories) {
		container.innerHTML = `<p class="error-state">${t('catalysts.errorLoad')}</p>`;
		return;
	}

	// Render general list
	container.innerHTML = catalystData.categories.map((catObj) => {
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
 * @returns {string} HTML string
 */
function renderCatalystCard(item) {
	const state = getState();
	// Retrieve saved note from state if exists
	const savedNote = state.userPreferences?.catalystNotes?.[item.name] || item.notes || '';

	// Formatting newlines in description
	const formattedDesc = (item.description || '').replace(/\\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

	return `
	<div class="catalyst-card">
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
