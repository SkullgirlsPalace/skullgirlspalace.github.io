// =====================================================
// EXPORT CHARACTER DATA COMPONENT
// Modal for selecting and exporting character data
// as JSON or TXT
// =====================================================

import { CHARACTER_FILES, CHARACTER_ICONS } from '../config/constants.js';
import { loadCharacter } from '../services/dataService.js';
import { t, getCurrentLanguage } from '../i18n/index.js';

// ========== MODAL HTML ==========

/**
 * Render the export modal HTML (inserted into guide page)
 */
export function renderExportModal() {
  const characterCheckboxes = CHARACTER_FILES.map(file => {
    const key = file.replace('.json', '');
    const name = formatCharacterName(key);
    const icon = CHARACTER_ICONS[key] || '';

    return `
      <label class="export-char-item" data-char-key="${key}">
        <input type="checkbox" class="export-char-checkbox" value="${key}">
        <div class="export-char-icon-wrapper">
          <img loading="lazy" src="${icon}" alt="${name}" class="export-char-icon" onerror="this.style.display='none'">
        </div>
        <span class="export-char-name">${name}</span>
      </label>
    `;
  }).join('');

  return `
    <div id="export-modal-overlay" class="export-modal-overlay" onclick="handleExportOverlayClick(event)">
      <div class="export-modal" onclick="event.stopPropagation()">
        <div class="export-modal-header">
          <h2>\u{1F4E5} ${t('export.characters')}</h2>
          <button class="export-modal-close" onclick="toggleExportModal()" aria-label="${t('export.close')}">\u2715</button>
        </div>

        <div class="export-modal-body">
          <!-- Selection Controls -->
          <div class="export-controls">
            <button class="export-select-all-btn" onclick="handleExportSelectAll()">
              \u2611 ${t('export.selectAll')}
            </button>
            <button class="export-deselect-all-btn" onclick="handleExportDeselectAll()">
              \u2610 ${t('export.deselectAll')}
            </button>
            <span class="export-count" id="export-selected-count">0 ${t('export.selectedPlural')}</span>
          </div>

          <!-- Character Grid -->
          <div class="export-char-grid">
            ${characterCheckboxes}
          </div>

          <!-- Format Selection -->
          <div class="export-format-section">
            <h3>${t('export.format')}</h3>
            <div class="export-format-options">
              <label class="export-format-option active" data-format="json">
                <input type="radio" name="export-format" value="json" checked>
                <span class="format-icon">{ }</span>
                <span class="format-label">JSON</span>
                <span class="format-desc">${t('export.jsonDesc')}</span>
              </label>
              <label class="export-format-option" data-format="txt">
                <input type="radio" name="export-format" value="txt">
                <span class="format-icon">\u{1F4C4}</span>
                <span class="format-label">TXT</span>
                <span class="format-desc">${t('export.txtDesc')}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="export-modal-footer">
          <button class="export-download-btn" id="export-download-btn" onclick="handleExportDownload()" disabled>
            <span class="export-btn-icon">\u2B07\uFE0F</span>
            <span class="export-btn-text">${t('export.download')}</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

// ========== INITIALIZATION ==========

/**
 * Initialize export modal event listeners
 */
export function initExportModal() {
  // Checkbox change listeners
  document.querySelectorAll('.export-char-checkbox').forEach(cb => {
    cb.addEventListener('change', updateSelectedCount);
  });

  // Format radio listeners
  document.querySelectorAll('input[name="export-format"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      document.querySelectorAll('.export-format-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.format === e.target.value);
      });
    });
  });

  // Register global handlers
  window.toggleExportModal = toggleExportModal;
  window.handleExportSelectAll = handleExportSelectAll;
  window.handleExportDeselectAll = handleExportDeselectAll;
  window.handleExportDownload = handleExportDownload;
  window.handleExportOverlayClick = handleExportOverlayClick;
}

// ========== MODAL TOGGLE ==========

/**
 * Open/close the export modal
 */
export function toggleExportModal() {
  const overlay = document.getElementById('export-modal-overlay');
  if (!overlay) return;

  const isOpen = overlay.classList.contains('active');

  if (isOpen) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  } else {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Close modal when clicking on overlay background
 */
function handleExportOverlayClick(event) {
  if (event.target.id === 'export-modal-overlay') {
    toggleExportModal();
  }
}

// ========== SELECTION HELPERS ==========

function handleExportSelectAll() {
  document.querySelectorAll('.export-char-checkbox').forEach(cb => {
    cb.checked = true;
  });
  updateSelectedCount();
}

function handleExportDeselectAll() {
  document.querySelectorAll('.export-char-checkbox').forEach(cb => {
    cb.checked = false;
  });
  updateSelectedCount();
}

function updateSelectedCount() {
  const checked = document.querySelectorAll('.export-char-checkbox:checked');
  const countEl = document.getElementById('export-selected-count');
  const downloadBtn = document.getElementById('export-download-btn');

  if (countEl) {
    countEl.textContent = `${checked.length} ${checked.length !== 1 ? t('export.selectedPlural') : t('export.selected')}`;
  }
  if (downloadBtn) {
    downloadBtn.disabled = checked.length === 0;
  }
}

// ========== EXPORT LOGIC ==========

/**
 * Handle export download — loads selected characters and generates file
 */
async function handleExportDownload() {
  const checked = document.querySelectorAll('.export-char-checkbox:checked');
  if (checked.length === 0) return;

  const format = document.querySelector('input[name="export-format"]:checked')?.value || 'json';
  const selectedKeys = Array.from(checked).map(cb => cb.value);

  // Show loading state
  const downloadBtn = document.getElementById('export-download-btn');
  const btnText = downloadBtn?.querySelector('.export-btn-text');
  if (btnText) btnText.textContent = t('export.loading');
  if (downloadBtn) downloadBtn.disabled = true;

  try {
    // Load all selected character data
    const characterData = {};
    const loadPromises = selectedKeys.map(async (key) => {
      const data = await loadCharacter(key);
      if (data) {
        characterData[key] = data;
      }
    });

    await Promise.all(loadPromises);

    // Generate and download file
    if (format === 'json') {
      downloadJSON(characterData, selectedKeys);
    } else {
      downloadTXT(characterData, selectedKeys);
    }
  } catch (err) {
    console.error(t('export.exportErrorLog'), err);
    alert(t('export.exportError'));
  } finally {
    // Restore button state
    if (btnText) btnText.textContent = t('export.download');
    if (downloadBtn) downloadBtn.disabled = false;
  }
}

/**
 * Download data as JSON
 */
function downloadJSON(characterData, keys) {
  let content;
  let filename;

  if (keys.length === 1) {
    const key = keys[0];
    content = JSON.stringify(characterData[key], null, 2);
    filename = `${key}.json`;
  } else {
    content = JSON.stringify(characterData, null, 2);
    filename = getCurrentLanguage() === 'en' ? 'all-characters.json' : 'todos-personagens.json';
  }

  triggerDownload(content, filename, 'application/json');
}

/**
 * Download data as TXT (readable text)
 */
function downloadTXT(characterData, keys) {
  let lines = [];

  lines.push('\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550');
  lines.push(` ${t('export.charactersData')}`);
  lines.push('\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550');
  lines.push('');

  for (const key of keys) {
    const data = characterData[key];
    if (!data) continue;

    lines.push(`\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557`);
    lines.push(`\u2551 ${(data.character || formatCharacterName(key)).toUpperCase()}`);
    lines.push(`\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D`);
    lines.push('');

    const rarities = data.variants || {};

    for (const [rarity, variants] of Object.entries(rarities)) {
      lines.push(` \u25B8 ${rarity.toUpperCase()}`);
      lines.push(` ${'\u2500'.repeat(40)}`);

      for (const variant of variants) {
        lines.push(` \u2605 ${variant.name}`);
        lines.push(` ${t('export.title')}: ${variant.title_formatted || '-'}`);
        lines.push(` ${t('export.element')}: ${variant.element || '-'}`);

        if (variant.stats) {
          lines.push(` ${t('export.attack')}: ${variant.stats.attack || '-'}`);
          lines.push(` ${t('export.health')}: ${variant.stats.health || '-'}`);
          lines.push(` ${t('export.score')}: ${variant.stats.power || '-'}`);
        }

        if (variant.signature_ability) {
          lines.push(` ${t('export.signatureAbility')}: ${variant.signature_ability.name || '-'}`);
          const desc = (variant.signature_ability.description || '')
            .replace(/\*\*/g, '')
            .replace(/\\n/g, '\n           ');
          lines.push(`           ${desc}`);
        }

        lines.push(` ${t('export.marquee')}: ${variant.marquee_ability || '-'}`);
        lines.push(` ${t('export.recommendedBuild')}: ${variant.recommended_build || '-'}`);
        lines.push(` ${t('export.recommendedArsenal')}: ${variant.recommended_arsenal || '-'}`);
        lines.push('');
      }
      lines.push('');
    }

    lines.push('');
  }

  const filename = keys.length === 1 ? `${keys[0]}.txt` : (getCurrentLanguage() === 'en' ? 'all-characters.txt' : 'todos-personagens.txt');
  triggerDownload(lines.join('\n'), filename, 'text/plain');
}

/**
 * Trigger a file download via temporary link
 */
function triggerDownload(content, filename, mimeType) {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

// ========== UTILITIES ==========

/**
 * Format character key to display name
 * e.g. "big-band" => "Big Band"
 */
function formatCharacterName(key) {
  return key.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}
