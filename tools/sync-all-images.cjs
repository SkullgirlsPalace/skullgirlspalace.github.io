const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imgDir = path.join(__dirname, '..', 'img');
const rawDir = path.join(__dirname, '..', 'raw_images');

if (!fs.existsSync(rawDir)) {
    fs.mkdirSync(rawDir, { recursive: true });
}

async function ensureDir(filePath) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

async function processImgDir(directory) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            await processImgDir(fullPath);
        } else {
            const ext = path.extname(file).toLowerCase();
            const relativePath = path.relative(imgDir, fullPath);
            const baseName = path.basename(file, ext);
            
            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
                // Rule: PNGs in img/ should go to raw_images/ as .png, and become .webp in img/
                const rawPath = path.join(rawDir, relativePath).replace(new RegExp(`\\${ext}$`, 'i'), '.png');
                const webPath = fullPath.replace(new RegExp(`\\${ext}$`, 'i'), '.webp');

                console.log(`[PNG -> WEBP/RAW] Processing: ${relativePath}`);
                
                await ensureDir(rawPath);
                
                // Save original to raw_images as PNG (if it was JPG, convert to PNG)
                await sharp(fullPath).toFile(rawPath);
                
                // Convert to WEBP in img/
                await sharp(fullPath).webp({ quality: 80 }).toFile(webPath);
                
                // Delete original from img/
                fs.unlinkSync(fullPath);
                console.log(`  Done: Created ${path.relative(process.cwd(), rawPath)} and ${path.relative(process.cwd(), webPath)}`);
            } else if (ext === '.webp') {
                // Rule: WEBPs in img/ should have a corresponding PNG in raw_images/
                const rawPath = path.join(rawDir, relativePath).replace(/\.webp$/i, '.png');
                
                if (!fs.existsSync(rawPath)) {
                    console.log(`[WEBP -> RAW PNG] Missing raw PNG for: ${relativePath}`);
                    await ensureDir(rawPath);
                    try {
                        await sharp(fullPath).png().toFile(rawPath);
                        console.log(`  Created: ${path.relative(process.cwd(), rawPath)}`);
                    } catch (err) {
                        console.error(`  Error converting ${relativePath}:`, err.message);
                    }
                } else {
                    // Check if they are accidentally identical (user might have just renamed)
                    const imgStat = fs.statSync(fullPath);
                    const rawStat = fs.statSync(rawPath);
                    if (imgStat.size === rawStat.size) {
                        console.log(`[FIX] WEBP and PNG are identical size for: ${relativePath}. Re-encoding...`);
                        try {
                            // Re-encode PNG from WEBP to be sure it's a real PNG
                            const tempPath = rawPath + '.tmp';
                            await sharp(fullPath).png().toFile(tempPath);
                            fs.renameSync(tempPath, rawPath);
                            
                            // Re-encode WEBP from PNG to be sure it's a real WEBP
                            const tempWebPath = fullPath + '.tmp';
                            await sharp(rawPath).webp({ quality: 80 }).toFile(tempWebPath);
                            fs.renameSync(tempWebPath, fullPath);
                            
                            console.log(`  Fixed: ${relativePath}`);
                        } catch (err) {
                            console.error(`  Error fixing ${relativePath}:`, err.message);
                        }
                    }
                }
            }
        }
    }
}

async function main() {
    console.log('Starting full image sync...');
    try {
        await processImgDir(imgDir);
        console.log('Sync complete!');
    } catch (err) {
        console.error('An error occurred:', err);
    }
}

main();
