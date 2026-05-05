/**
 * Flatten variants from nested rarity structure
 * @param {Object} variantsObj - { diamante: [...], ouro: [...], ... }
 * @returns {Array} Flat array with rarityKey added to each variant
 */
export function flattenVariants(variantsObj) {
    if (!variantsObj) return [];

    const allVariants = [];
    Object.entries(variantsObj).forEach(([rarity, variants]) => {
        variants.forEach(v => {
            allVariants.push({ ...v, rarityKey: rarity });
        });
    });
    return allVariants;
}
