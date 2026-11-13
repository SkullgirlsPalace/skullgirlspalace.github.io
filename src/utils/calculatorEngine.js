import { formatNumber } from './formatters.js';

const currencyAliases = { gold: 'canopyCoins' };

export function normalizeResources(values = {}) {
  return Object.entries(values).reduce((total, [key, amount]) => {
    if (typeof amount !== 'number' || !Number.isFinite(amount)) return total;
    const currency = currencyAliases[key] || key;
    total[currency] = (total[currency] || 0) + amount;
    return total;
  }, {});
}

function addTo(total, values, multiplier = 1) {
  Object.entries(normalizeResources(values)).forEach(([currency, amount]) => {
    total[currency] = (total[currency] || 0) + amount * multiplier;
  });
}

export function calculateMonthlyEarnings(data, choices) {
  const total = {};
  const breakdown = [];
  const guestSources = data.teonitas?.fontesMensais || {};
  const addSource = (name, values, multiplier = 1) => {
    const amounts = normalizeResources(values);
    addTo(total, amounts, multiplier);
    const result = Object.fromEntries(Object.entries(amounts).map(([key, value]) => [key, value * multiplier]));
    if (Object.values(result).some(Boolean)) breakdown.push({ name, resources: result });
  };

  const fixed = data.ganhosFixos || {};
  Object.entries(fixed).forEach(([key, source]) => {
    if (key === 'meta' || key === 'passe' || !choices.fixed?.[key]) return;
    const times = source.regra?.ocorrenciasMensais || 1;
    const rewards = {
      canopyCoins: source.valor || 0,
      ...(key === 'diarias' && guestSources.diarias ? { teonita: guestSources.diarias.valor } : {}),
      ...(source.recursos || {})
    };
    if (source.teonita) rewards.teonita = source.teonita;
    addSource(source.nome || key, rewards, times);
  });

  const guildMissions = guestSources.guilda;
  if (choices.guildMissions && guildMissions) addSource(guildMissions.nome, { teonita: guildMissions.valor });

  const pass = choices.pass;
  if (choices.passEnabled && pass) {
    const passData = fixed.passe?.[pass] || {};
    const bonusData = guestSources[`passe${pass === 'gratis' ? 'Free' : pass === 'premium' ? 'Premium' : 'PremiumPlus'}`] || {};
    addSource(passData.nome || bonusData.nome || pass, {
      canopyCoins: passData.valor || 0,
      teonita: passData.teonita ?? bonusData.valor ?? 0,
      ...(passData.recursos || {})
    });
  }

  const pf = data.disputasPremiadas?.personagem;
  if (choices.pfEnabled && pf && choices.pfRarity && choices.pfRank) {
    const rewards = pf[choices.pfRarity]?.rankings || {};
    const base = rewards.padrao || {};
    const rank = rewards[choices.pfRank] || {};
    const combined = Object.keys({ ...base, ...rank }).reduce((sum, key) => {
      sum[key] = (base[key] || 0) + (rank[key] || 0);
      return sum;
    }, {});
    addSource(`${pf[choices.pfRarity]?.nome || choices.pfRarity} · ${choices.pfRank}`, combined, pf.regra?.ocorrenciasMensais || 1);
  }

  if (choices.monthlyPf) {
    const monthly = data.disputasPremiadas?.mensal;
    addSource(monthly?.nome || 'Monthly Prize Fight', monthly?.rankings?.padrao || {}, monthly?.regra?.ocorrenciasMensais || 1);
  }

  const mediciRank = choices.medici;
  if (choices.mediciEnabled && mediciRank) {
    const medicis = data.disputasPremiadas?.medicis;
    const base = medicis?.rankings?.padrao || {};
    const rank = medicis?.rankings?.[mediciRank] || {};
    const rewards = Object.keys({ ...base, ...rank }).reduce((sum, key) => {
      sum[key] = (base[key] || 0) + (rank[key] || 0);
      return sum;
    }, {});
    addSource(medicis?.nome || 'Medici Prize Fight', rewards, medicis?.regra?.ocorrenciasMensais || 1);
  }

  const realmKey = choices.realm;
  if (choices.realmEnabled && realmKey) {
    const realm = data.reinosParalelos;
    const range = choices.realmMax ? 'recompensas-maximas' : 'recompensas-minimas';
    addSource(realm.dificuldades?.[realmKey]?.nome || realmKey, realm.dificuldades?.[realmKey]?.[range] || {}, realm.regra?.ocorrenciasMensais || 1);
  }

  const guild = data.guildas || {};
  if (choices.guildEvents && guild.eventos?.recompensasEvento) {
    addSource(guild.eventos.nome || 'Guild Events', guild.eventos.recompensasEvento, guild.eventos.regra?.ocorrenciasMensais || 4);
  }
  if (choices.guildTierEnabled && choices.guildTier) {
    const battle = guild.batalha?.[choices.guildTier];
    const rewards = { ...(battle?.recompensas || {}) };
    if (choices.guildTier === 'diamante') {
      const points = Math.max(16000, Number(choices.guildPoints) || 16000);
      rewards.canopyCoins = (rewards.canopyCoins || 0) + Math.floor((points - 16000) / 1000) * (battle?.bonus?.fator || 25000);
    }
    addSource(`${guild.batalha?.nome || 'Guild Battle'} · ${battle?.nome || choices.guildTier}`, rewards, battle?.regra?.ocorrenciasMensais || 4);
  }

  return { total, breakdown };
}

export function calculateUpgradeCosts(data, choices) {
  const total = {};
  const breakdown = [];
  const addCost = (name, values, multiplier = 1) => {
    const amounts = normalizeResources(values);
    Object.entries(amounts).forEach(([key, value]) => {
      total[key] = (total[key] || 0) + value * multiplier;
    });
    const resources = Object.fromEntries(Object.entries(amounts).map(([key, value]) => [key, value * multiplier]));
    if (Object.values(resources).some(Boolean)) breakdown.push({ name, resources });
  };

  const moves = data.golpes || {};
  const fromMove = Math.max(1, Number(choices.moveFrom) || 1);
  const toMove = Math.max(fromMove, Number(choices.moveTo) || fromMove);
  let perMove = 0;
  for (let level = fromMove + 1; level <= toMove; level += 1) perMove += moves.custoPorNivel?.[String(level)] || 0;
  const moveCount = Math.max(1, Math.min(5, Number(choices.moveCount) || 1));
  const shinyMoveFactor = choices.moveShiny ? 0.5 : 1;
  addCost(`Golpes · ${fromMove} → ${toMove} · ${moveCount}x`, { canopyCoins: perMove * moveCount * shinyMoveFactor });
  if (choices.includeFullMoveSet) {
    const characterCost = moves.personagemCompleto?.[choices.moveRarity]?.[choices.moveShiny ? 'shiny' : 'normal'] || 0;
    addCost('Conjunto completo de golpes', typeof characterCost === 'number' ? { canopyCoins: characterCost } : characterCost);
  }

  const stars = data.astros || {};
  const toStar = Math.max(1, Number(choices.starTo) || 1);
  const fromStar = Math.max(1, Math.min(toStar, Number(choices.starFrom) || 1));
  const starResources = {};
  for (let level = fromStar + 1; level <= toStar; level += 1) {
    const levelResources = normalizeResources(stars.custoPorNivel?.[String(level)] || {});
    Object.entries(levelResources).forEach(([key, value]) => {
      starResources[key] = (starResources[key] || 0) + value;
    });
  }
  const shinyStarFactor = choices.starShiny ? 0.5 : 1;
  const adjustedStarResources = Object.fromEntries(Object.entries(starResources).map(([key, value]) => [key, value * shinyStarFactor]));
  addCost(`Astro · ${fromStar} → ${toStar}${choices.starShiny ? ' · Shiny' : ''}`, adjustedStarResources);

  return { total, breakdown };
}

export function formatResources(resources, labelFor) {
  return Object.entries(resources).filter(([, value]) => value).map(([key, value]) => `${formatNumber(value)} ${labelFor(key)}`).join(' · ');
}
