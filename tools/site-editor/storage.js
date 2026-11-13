const DATABASE = 'PALACE_SITE_EDITOR_V1';
const STORE = 'drafts';
function openDatabase() {
    return new Promise((resolve, reject) => {
        if (!globalThis.indexedDB) { reject(new Error('O navegador não permite salvar rascunhos aqui. Baixe um backup antes de fechar.')); return; }
        const request = indexedDB.open(DATABASE, 1);
        request.onupgradeneeded = () => { if (!request.result.objectStoreNames.contains(STORE)) request.result.createObjectStore(STORE); };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(new Error('Não foi possível abrir o rascunho local. Os arquivos do projeto continuam preservados.'));
        request.onblocked = () => reject(new Error('Feche outras abas deste editor e tente salvar novamente.'));
    });
}
async function transaction(mode, action) {
    const database = await openDatabase();
    try {
        return await new Promise((resolve, reject) => {
            const tx = database.transaction(STORE, mode), store = tx.objectStore(STORE);
            let result;
            const request = action(store);
            request.onsuccess = () => { result = request.result; };
            tx.oncomplete = () => resolve(result);
            tx.onerror = tx.onabort = () => reject(new Error('O rascunho não foi salvo. O armazenamento pode estar cheio; baixe um backup agora.'));
        });
    } finally { database.close(); }
}
export const readDraft = (slot = 'current') => transaction('readonly', store => store.get(slot));
export const writeDraft = (backup, slot = 'current') => transaction('readwrite', store => store.put(backup, slot));
export const clearDraft = () => transaction('readwrite', store => store.delete('current'));
