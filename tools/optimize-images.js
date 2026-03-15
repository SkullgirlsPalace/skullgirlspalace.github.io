const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imgDir = path.join(__dirname, '..', 'img');

async function processDirectory(directory) {
    console.log(`Scanning directory: ${directory}`);
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            await processDirectory(fullPath);
        } else {
            const ext = path.extname(file).toLowerCase();
            // Process common image formats
            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
                const webPath = fullPath.replace(new RegExp(`\\${ext}$`, 'i'), '.webp');
                
                console.log(`Processing: ${fullPath} -> ${webPath}`);
                try {
                    await sharp(fullPath)
                        .webp({ quality: 85 })
                        .toFile(webPath);
                    
                    console.log(`Successfully converted. Deleting original: ${fullPath}`);
                    fs.unlinkSync(fullPath);
                } catch (err) {
                    // If the file is busy (common on Windows), we'll log it and continue
                    if (err.code === 'EBUSY') {
                        console.error(`File busy, could not delete: ${fullPath}`);
                    } else {
                        console.error(`Error processing ${fullPath}:`, err);
                    }
                }
            }
        }
    }
}

async function main() {
    console.log('Starting image optimization...');
    try {
        if (!fs.existsSync(imgDir)) {
            console.error(`Error: Directory not found: ${imgDir}`);
            return;
        }
        await processDirectory(imgDir);
        console.log('Image optimization complete!');
    } catch (err) {
        console.error('An error occurred:', err);
    }
}

main();
