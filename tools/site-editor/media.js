export const MAX_IMAGE_BYTES = 500_000;
export const MAX_VIDEO_BYTES = 8_000_000;
export const MAX_ASSET_BYTES = 12_000_000;
export const MAX_IMAGE_SIDE = 1280;
const encoder = new TextEncoder();
const ascii = (bytes, from, to) => String.fromCharCode(...bytes.slice(from, to));

export function bytesToBase64(bytes) {
    let value = '';
    for (let offset = 0; offset < bytes.length; offset += 8192) value += String.fromCharCode(...bytes.subarray(offset, offset + 8192));
    return btoa(value);
}
export function base64ToBytes(value) {
    // A flat character-class repetition also works for multi-megabyte videos;
    // repeating a grouped quartet can exhaust the RegExp stack in V8.
    if (typeof value !== 'string' || !value.length || value.length % 4 || value.length > Math.ceil(MAX_ASSET_BYTES / 3) * 4 || !/^[A-Za-z0-9+/]+={0,2}$/.test(value)) throw new Error('Arquivo de mídia inválido no backup.');
    const decoded = atob(value), bytes = new Uint8Array(decoded.length);
    for (let index = 0; index < decoded.length; index++) bytes[index] = decoded.charCodeAt(index);
    return bytes;
}
export async function sha256(value) {
    const bytes = typeof value === 'string' ? encoder.encode(value) : value;
    return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', bytes)), byte => byte.toString(16).padStart(2, '0')).join('');
}
/** Inspect bytes rather than trusting the filename or browser-provided MIME. */
export function inspectMedia(bytes) {
    if (!(bytes instanceof Uint8Array) || bytes.length < 12) throw new Error('Arquivo de mídia incompleto.');
    const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    if (/^GIF8[79]a$/.test(ascii(bytes, 0, 6))) return { mime: 'image/gif', extension: 'gif', kind: 'image', width: view.getUint16(6, true), height: view.getUint16(8, true), animated: true };
    if (ascii(bytes, 0, 4) === 'RIFF' && ascii(bytes, 8, 12) === 'WEBP') {
        let width = 0, height = 0, animated = false;
        for (let offset = 12; offset + 8 <= bytes.length;) {
            const type = ascii(bytes, offset, offset + 4), length = view.getUint32(offset + 4, true), at = offset + 8;
            if (at + length > bytes.length) throw new Error('Arquivo WebP incompleto.');
            if (type === 'VP8X' && length >= 10) {
                animated = Boolean(bytes[at] & 2);
                width = 1 + bytes[at + 4] + (bytes[at + 5] << 8) + (bytes[at + 6] << 16);
                height = 1 + bytes[at + 7] + (bytes[at + 8] << 8) + (bytes[at + 9] << 16);
            } else if (!width && type === 'VP8 ' && length >= 10 && ascii(bytes, at + 3, at + 6) === '\x9d\x01\x2a') {
                width = view.getUint16(at + 6, true) & 0x3fff; height = view.getUint16(at + 8, true) & 0x3fff;
            } else if (!width && type === 'VP8L' && length >= 5 && bytes[at] === 0x2f) {
                const dimensions = view.getUint32(at + 1, true);
                width = (dimensions & 0x3fff) + 1; height = ((dimensions >>> 14) & 0x3fff) + 1;
            }
            offset = at + length + (length % 2);
        }
        if (!width || !height) throw new Error('Não foi possível ler o tamanho do WebP.');
        return { mime: 'image/webp', extension: 'webp', kind: 'image', width, height, animated };
    }
    if (ascii(bytes, 4, 8) === 'ftyp') return { mime: 'video/mp4', extension: 'mp4', kind: 'video' };
    if (bytes[0] === 0x1a && bytes[1] === 0x45 && bytes[2] === 0xdf && bytes[3] === 0xa3) return { mime: 'video/webm', extension: 'webm', kind: 'video' };
    if (bytes[0] === 0x89 && ascii(bytes, 1, 4) === 'PNG') return { mime: 'image/png', extension: 'png', kind: 'image' };
    if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return { mime: 'image/jpeg', extension: 'jpg', kind: 'image' };
    throw new Error('Use uma imagem WebP, PNG, JPG ou GIF, ou um vídeo MP4/WebM.');
}
export function validateAssets(assets = []) {
    if (!Array.isArray(assets) || assets.length > 100) throw new Error('Lista de mídias inválida.');
    const paths = new Set();
    let total = 0;
    for (const asset of assets) {
        if (!asset || Object.keys(asset).some(key => !['path', 'mime', 'data'].includes(key)) || !/^(?:img\/site-editor\/[a-f0-9]{64}\.(?:webp|gif)|media\/site-editor\/[a-f0-9]{64}\.(?:mp4|webm))$/.test(asset.path) || paths.has(asset.path)) throw new Error('Caminho de mídia inválido ou repetido.');
        const bytes = base64ToBytes(asset.data), info = inspectMedia(bytes);
        const limit = info.kind === 'image' ? MAX_IMAGE_BYTES : MAX_VIDEO_BYTES;
        if (asset.mime !== info.mime || !asset.path.endsWith(`.${info.extension}`) || !['image/webp', 'image/gif', 'video/mp4', 'video/webm'].includes(info.mime)) throw new Error('O formato da mídia não corresponde ao arquivo.');
        if (bytes.length > limit || (info.kind === 'image' && (!info.width || !info.height || info.width > MAX_IMAGE_SIDE || info.height > MAX_IMAGE_SIDE))) throw new Error('Mídia acima do limite: imagem até 1280 px e 500 KB; vídeo até 8 MB.');
        total += bytes.length; paths.add(asset.path);
    }
    if (total > MAX_ASSET_BYTES) throw new Error('O rascunho aceita até 12 MB de mídias.');
    return assets;
}
export function assetBlob(asset) {
    validateAssets([asset]);
    return new Blob([base64ToBytes(asset.data)], { type: asset.mime });
}

async function decodedImage(file) {
    const url = URL.createObjectURL(file);
    try {
        const image = new Image(); image.src = url;
        await image.decode();
        if (!image.naturalWidth || !image.naturalHeight || image.naturalWidth > 16000 || image.naturalHeight > 16000) throw new Error('Imagem grande demais para converter no navegador.');
        return image;
    } finally { URL.revokeObjectURL(url); }
}
async function encodeWebP(image, width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(width)); canvas.height = Math.max(1, Math.round(height));
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Não foi possível converter a imagem neste navegador.');
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    let blob;
    for (const quality of [0.85, 0.7, 0.55, 0.4]) {
        blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/webp', quality));
        if (!blob || blob.type !== 'image/webp') throw new Error('Este navegador não consegue exportar WebP.');
        if (blob.size <= MAX_IMAGE_BYTES) break;
    }
    if (blob.size > MAX_IMAGE_BYTES) throw new Error('A imagem ainda passa de 500 KB. Reduza o arquivo e tente novamente.');
    return new Uint8Array(await blob.arrayBuffer());
}
/** Match the published pixel budget to the chosen display, preserving animation. */
export async function fitImageToDisplay(asset, width, height) {
    validateAssets([asset]);
    if (!Number.isSafeInteger(width) || !Number.isSafeInteger(height) || width < 1 || height < 1 || width > 2400 || height > 2400) throw new Error('Escolha dimensões entre 1 e 2400 px para a mídia.');
    const bytes = base64ToBytes(asset.data), info = inspectMedia(bytes);
    if (info.kind !== 'image') return asset;
    const ratio = Math.min(1, 2 * width / info.width, 2 * height / info.height);
    if (ratio >= 1) return asset;
    if (info.animated) throw new Error(`A animação tem ${info.width} × ${info.height} px. Para preservar os quadros, reduza o arquivo ou exiba com pelo menos ${Math.ceil(info.width / 2)} × ${Math.ceil(info.height / 2)} px.`);
    const image = await decodedImage(assetBlob(asset));
    const resized = await encodeWebP(image, info.width * ratio, info.height * ratio), digest = await sha256(resized);
    return { path: `img/site-editor/${digest}.webp`, mime: 'image/webp', data: bytesToBase64(resized) };
}
async function videoDimensions(file) {
    const url = URL.createObjectURL(file), video = document.createElement('video');
    try {
        return await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => { video.removeAttribute('src'); video.load(); reject(new Error('Não foi possível ler o vídeo. Confira se ele abre neste navegador.')); }, 10000);
            video.onloadedmetadata = () => { clearTimeout(timeout); resolve({ width: video.videoWidth, height: video.videoHeight }); };
            video.onerror = () => { clearTimeout(timeout); reject(new Error('O navegador não reconheceu o vídeo. Use MP4 ou WebM compatível.')); };
            video.preload = 'metadata'; video.src = url;
        });
    } finally { video.removeAttribute('src'); video.load(); URL.revokeObjectURL(url); }
}
export async function importMedia(file) {
    if (!file || !file.size || file.size > 30_000_000) throw new Error('Escolha um arquivo de até 30 MB para converter.');
    let bytes = new Uint8Array(await file.arrayBuffer()), info = inspectMedia(bytes);
    if (info.kind === 'video') {
        if (bytes.length > MAX_VIDEO_BYTES) throw new Error('O vídeo deve ter até 8 MB. Comprima ou use um link HTTPS.');
        const dimensions = await videoDimensions(file);
        if (!dimensions.width || !dimensions.height) throw new Error('O vídeo não tem dimensões válidas.');
        info = { ...info, ...dimensions };
    } else if (info.mime === 'image/gif' || (info.mime === 'image/webp' && info.animated)) {
        if (bytes.length > MAX_IMAGE_BYTES || info.width > MAX_IMAGE_SIDE || info.height > MAX_IMAGE_SIDE) throw new Error('Para preservar a animação, use GIF/WebP animado até 1280 px e 500 KB.');
    } else {
        const image = await decodedImage(file), ratio = Math.min(1, MAX_IMAGE_SIDE / image.naturalWidth, MAX_IMAGE_SIDE / image.naturalHeight);
        bytes = await encodeWebP(image, image.naturalWidth * ratio, image.naturalHeight * ratio); info = inspectMedia(bytes);
    }
    const digest = await sha256(bytes), prefix = info.kind === 'video' ? 'media' : 'img';
    const asset = { path: `${prefix}/site-editor/${digest}.${info.extension}`, mime: info.mime, data: bytesToBase64(bytes) };
    validateAssets([asset]);
    const scale = Math.min(1, 640 / info.width, 640 / info.height);
    return { asset, kind: info.kind, width: Math.max(1, Math.round(info.width * scale)), height: Math.max(1, Math.round(info.height * scale)) };
}
