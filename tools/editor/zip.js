// ZIP "store" format: local browser export, no dependencies or network services.
const encoder = new TextEncoder();
function crc32(bytes) {
    let crc = 0xffffffff;
    for (const byte of bytes) {
        crc ^= byte;
        for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
    return (crc ^ 0xffffffff) >>> 0;
}
function record(size) {
    const bytes = new Uint8Array(size), view = new DataView(bytes.buffer);
    return { bytes, u16: (offset, value) => view.setUint16(offset, value, true), u32: (offset, value) => view.setUint32(offset, value, true) };
}
export function createZip(files) {
    const local = [], central = [];
    let offset = 0, centralSize = 0;
    const entries = Object.entries(files);
    for (const [path, text] of entries) {
        if (!/^[a-zA-Z0-9_./-]+$/.test(path) || path.startsWith('/') || path.split('/').includes('..')) throw new Error('Invalid archive path');
        const name = encoder.encode(path), data = encoder.encode(text), crc = crc32(data);
        const header = record(30 + name.length);
        header.u32(0, 0x04034b50); header.u16(4, 20); header.u16(6, 0x800); header.u16(12, 33);
        header.u32(14, crc); header.u32(18, data.length); header.u32(22, data.length); header.u16(26, name.length);
        header.bytes.set(name, 30); local.push(header.bytes, data);
        const directory = record(46 + name.length);
        directory.u32(0, 0x02014b50); directory.u16(4, 20); directory.u16(6, 20); directory.u16(8, 0x800); directory.u16(14, 33);
        directory.u32(16, crc); directory.u32(20, data.length); directory.u32(24, data.length); directory.u16(28, name.length); directory.u32(42, offset);
        directory.bytes.set(name, 46); central.push(directory.bytes);
        centralSize += directory.bytes.length; offset += header.bytes.length + data.length;
    }
    const end = record(22);
    end.u32(0, 0x06054b50); end.u16(8, entries.length); end.u16(10, entries.length); end.u32(12, centralSize); end.u32(16, offset);
    return new Blob([...local, ...central, end.bytes], { type: 'application/zip' });
}
