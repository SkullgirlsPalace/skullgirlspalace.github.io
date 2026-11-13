// ZIP store: text and binary files, without dependencies or a server upload.
const encoder = new TextEncoder();
function crc32(bytes) {
    let value = 0xffffffff;
    for (const byte of bytes) {
        value ^= byte;
        for (let bit = 0; bit < 8; bit++) value = (value >>> 1) ^ (0xedb88320 & -(value & 1));
    }
    return (value ^ 0xffffffff) >>> 0;
}
function record(length) {
    const bytes = new Uint8Array(length), view = new DataView(bytes.buffer);
    return { bytes, u16: (at, value) => view.setUint16(at, value, true), u32: (at, value) => view.setUint32(at, value, true) };
}
export function createZip(files) {
    const local = [], central = [];
    let offset = 0, centralSize = 0;
    const entries = Object.entries(files);
    for (const [path, content] of entries) {
        if (!/^[a-zA-Z0-9_./-]+$/.test(path) || path.startsWith('/') || path.split('/').some(part => !part || part === '..' || part === '.')) throw new Error('Caminho inválido no ZIP.');
        if (typeof content !== 'string' && !(content instanceof Uint8Array)) throw new Error('Conteúdo inválido no ZIP.');
        const name = encoder.encode(path), data = typeof content === 'string' ? encoder.encode(content) : content, crc = crc32(data);
        const header = record(30 + name.length);
        header.u32(0, 0x04034b50); header.u16(4, 20); header.u16(6, 0x800); header.u16(12, 33);
        header.u32(14, crc); header.u32(18, data.length); header.u32(22, data.length); header.u16(26, name.length);
        header.bytes.set(name, 30); local.push(header.bytes, data);
        const directory = record(46 + name.length);
        directory.u32(0, 0x02014b50); directory.u16(4, 20); directory.u16(6, 20); directory.u16(8, 0x800); directory.u16(14, 33);
        directory.u32(16, crc); directory.u32(20, data.length); directory.u32(24, data.length); directory.u16(28, name.length); directory.u32(42, offset);
        directory.bytes.set(name, 46); central.push(directory.bytes);
        offset += header.bytes.length + data.length; centralSize += directory.bytes.length;
    }
    const end = record(22);
    end.u32(0, 0x06054b50); end.u16(8, entries.length); end.u16(10, entries.length); end.u32(12, centralSize); end.u32(16, offset);
    return new Blob([...local, ...central, end.bytes], { type: 'application/zip' });
}
