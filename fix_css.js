const fs = require('fs');
const path = 'c:\\Users\\lifiz\\Documents\\VS Code\\palacio-branco-enterprises\\src\\styles\\pages\\statistics.css';
let content = fs.readFileSync(path, 'utf8');

// Fix header
const headerBroken = /^\s*\/\* STATISTICS PAGE - CALCULATOR STYLES.*?\*\/\s*\r?\n\s*\r?\n\s*padding-bottom: 40px;\s*\r?\n\s*}/m;
const headerCorrect = `/* =====================================================
   STATISTICS PAGE - CALCULATOR STYLES
   ===================================================== */

.statistics-section {
    padding-bottom: 40px;
}`;

if (headerBroken.test(content)) {
    content = content.replace(headerBroken, headerCorrect);
    console.log('Fixed header');
} else {
    // Try simpler match if the above failed
    content = content.replace(/padding-bottom: 40px;\s*\n\s*}/, `.statistics-section {\n    padding-bottom: 40px;\n}`);
}

// Restore .attr-tooltip-tip
if (!content.includes('.attr-tooltip-tip')) {
    const hintPos = content.indexOf('.attr-tooltip-hint');
    if (hintPos !== -1) {
        const tipStyle = `\n    .attr-tooltip-tip {
        margin: 0 0 8px;
        font-size: 0.8rem;
        color: #a8d8a8;
    }\n\n`;
        content = content.slice(0, hintPos) + tipStyle + content.slice(hintPos);
        console.log('Restored .attr-tooltip-tip');
    }
}

fs.writeFileSync(path, content);
console.log('Done');
