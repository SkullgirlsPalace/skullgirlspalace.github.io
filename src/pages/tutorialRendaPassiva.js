// =====================================================
// MANIFESTO DA RENDA PASSIVA
// Tutorial Component
// =====================================================

import { t } from '../i18n/index.js';

function renderListItems(key) {
  return t(key).split('|').map(item => `<li>${item}</li>`).join('\n');
}

export function render() {
  return `
  <div class="tutorial-page fade-in" style="padding: 2rem 1rem; background-color: var(--bg-dark); min-height: 100vh;">

  <style>
  /* Scoped styles for the manifesto to avoid conflicts */
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap');

  .manifesto-wrapper {
    font-family: 'Cinzel', serif;
    background-color: #fdf6e3; /* Cor de pergaminho claro da V1 */
    color: #3a2e1f; /* Cor de tinta escura (marrom) */
    border: 2px solid #c9b79c;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    max-width: 56rem;
    margin: 0 auto;
    padding: 2rem;
    border-radius: 0.5rem;
  }

  @media (min-width: 768px) {
    .manifesto-wrapper {
      padding: 3rem;
    }
  }

  .manifesto-wrapper h1,
  .manifesto-wrapper h2,
  .manifesto-wrapper h3 {
    font-weight: 700;
    text-shadow: 1px 1px 0px #c9b79c; /* Sombra leve para dar profundidade da V1 */
    margin-bottom: 1rem;
    color: inherit; /* override base app styles */
  }

  .manifesto-wrapper h1 {
    font-size: 2.25rem;
    line-height: 2.5rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-align: center;
  }

  @media (min-width: 768px) {
    .manifesto-wrapper h1 {
      font-size: 3rem;
      line-height: 1;
    }
  }

  .manifesto-wrapper h2 {
    font-size: 1.5rem;
    line-height: 2rem;
    text-transform: uppercase;
    border-bottom: 1px solid rgba(139, 69, 19, 0.2);
    padding-bottom: 0.5rem;
    margin-top: 2rem;
  }

  @media (min-width: 768px) {
    .manifesto-wrapper h2 {
      font-size: 1.875rem;
      line-height: 2.25rem;
    }
  }

  .manifesto-wrapper h3 {
    font-size: 1.25rem;
    line-height: 1.75rem;
    margin-top: 1.5rem;
  }

  @media (min-width: 768px) {
    .manifesto-wrapper h3 {
      font-size: 1.5rem;
      line-height: 2rem;
    }
  }

  .manifesto-wrapper hr {
    border-color: #c9b79c;
    border-top-width: 2px;
    border-style: solid;
    margin: 2rem 0;
  }

  .manifesto-wrapper p {
    font-size: 1.125rem;
    line-height: 1.75;
    margin-bottom: 1rem;
    text-align: justify;
  }

  .manifesto-wrapper ul {
    list-style-type: none;
    padding-left: 1rem;
    margin-bottom: 1.5rem;
  }

  .manifesto-wrapper ul.list-disc {
    list-style-type: disc;
    padding-left: 2.5rem;
  }

  .manifesto-wrapper li {
    font-size: 1.125rem;
    line-height: 1.75;
    margin-bottom: 1rem;
  }

  .manifesto-wrapper header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .manifesto-wrapper .subtitle {
    font-size: 1.125rem;
    font-style: italic;
    margin-top: 0.5rem;
  }

  /* V2 specific elements mixed with V1 styling */
  .manifesto-wrapper .highlight-box {
    background: rgba(201, 183, 156, 0.2);
    border-left: 4px solid #c9b79c;
    padding: 1rem;
    margin: 1.5rem 0;
  }

  .manifesto-wrapper .stamp {
    border: 3px double #8b0000;
    color: #8b0000;
    padding: 5px 15px;
    display: inline-block;
    transform: rotate(-3deg);
    font-weight: bold;
    opacity: 0.8;
    margin-top: 10px;
    font-size: 1.25rem;
  }

  .manifesto-wrapper .image-frame {
    border: 8px double #c9b79c;
    padding: 10px;
    background: #fdf6e3;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    margin: 20px 0;
  }

  .manifesto-wrapper .base-image {
    width: 100%;
    height: auto;
    border: 1px solid #3a2e1f;
    display: block;
  }

  .manifesto-wrapper .footer-text {
    text-align: center;
    font-size: 0.875rem;
    color: #78716c;
    margin-top: 2rem;
  }

  .manifesto-wrapper strong {
    font-weight: 700;
  }
  </style>

  <main class="manifesto-wrapper">

  <!-- Cabe\u00E7alho do Manifesto -->
  <header>
  <h1>${t('tutorial.title')}</h1>
  <p class="subtitle">${t('tutorial.subtitle')}</p>
  <div class="stamp">${t('tutorial.edition')}</div>
  </header>

  <section>

  <!-- Introdu\u00E7\u00E3o: Por que este manifesto existe -->
  <h2>${t('tutorial.preamble')}</h2>
  <p>${t('tutorial.preamble1')}</p>
  <p>${t('tutorial.preamble2')}</p>
  <p>${t('tutorial.preamble3')}</p>

  <hr>

  <!-- Os Princ\u00EDpios da Estrat\u00E9gia -->
  <h2>${t('tutorial.pillars')}</h2>
  <p>${t('tutorial.pillarsIntro')}</p>

  <ul>
  <li>
  <strong>${t('tutorial.pillar1Title')}</strong> ${t('tutorial.pillar1Desc')}
  </li>
  <li>
  <strong>${t('tutorial.pillar2Title')}</strong> ${t('tutorial.pillar2Desc')}
  </li>
  <li>
  <strong>${t('tutorial.pillar3Title')}</strong> ${t('tutorial.pillar3Desc')}
  </li>
  <li>
  <strong>${t('tutorial.pillar4Title')}</strong> ${t('tutorial.pillar4Desc')}
  </li>
  </ul>

  <hr>

  <!-- A Montagem da Base Custo-Benef\u00EDcio -->
  <h2>${t('tutorial.decree')}</h2>
  <p>${t('tutorial.decreeIntro')}</p>

  <h3>${t('tutorial.priority1Title')}</h3>
  <p>${t('tutorial.priority1Desc')}</p>
  <ul class="list-disc">
  ${renderListItems('tutorial.priority1Items')}
  </ul>

  <h3>${t('tutorial.priority2Title')}</h3>
  <p>${t('tutorial.priority2Desc')}</p>
  <ul class="list-disc">
  ${renderListItems('tutorial.priority2Items')}
  </ul>

  <h3>${t('tutorial.priority3Title')}</h3>
  <p>${t('tutorial.priority3Desc')}</p>
  <ul class="list-disc">
  ${renderListItems('tutorial.priority3Items')}
  </ul>

  <hr>

  <!-- A Alquimia dos Catalisadores -->
  <h2>${t('tutorial.alchemy')}</h2>
  <p>${t('tutorial.alchemy1')}</p>
  <p>${t('tutorial.alchemy2')}</p>

  <div class="highlight-box">
  <h3 style="margin-top: 0; text-decoration: underline;">${t('tutorial.forgeTitle')}</h3>
  <p><strong>${t('tutorial.forgeGeneric')}</strong> <strong>${t('tutorial.forgeGenericItems')}</strong> ${t('tutorial.forgeGenericNote')}</p>
  <p><strong>${t('tutorial.forgeWind')}</strong> ${t('tutorial.forgeWindItems')}</p>
  </div>

  <hr>

  <!-- O Conc\u00EDlio das Guildas -->
  <h2>${t('tutorial.guild')}</h2>
  <p>${t('tutorial.guild1')}</p>
  <p>${t('tutorial.guild2')}</p>

  <hr>

  <!-- Mapa da Cidadela -->
  <h2>${t('tutorial.citadel')}</h2>
  <p>${t('tutorial.citadelDesc')}</p>

  <div class="image-frame">
  <img loading="lazy" src="img/testes/base-renda-passiva.webp" alt="${t('tutorial.citadelImgAlt')}" class="base-image" onerror="this.src='https://via.placeholder.com/800x450?text=${encodeURIComponent(t('tutorial.imgNotFound'))}'">
  <p style="text-align: center; font-size: 0.875rem; font-style: italic; margin-top: 1rem;">${t('tutorial.citadelCaption')}</p>
  </div>

  <hr>

  <!-- Conclus\u00E3o -->
  <h2>${t('tutorial.conclusion')}</h2>
  <p>${t('tutorial.conclusion1')}</p>

  <p style="text-align: center; font-size: 0.875rem; font-style: italic; margin-top: 2rem;">${t('tutorial.conclusionSignature')}</p>

  </section>

  <footer class="footer-text">
  <p>${t('tutorial.versionDate')}</p>
  </footer>
  </main>
  </div>
  `;
}

export function init() {
  // Scroll to top when page loads to ensure they see the header
  window.scrollTo(0, 0);
}
