// Build recommendations. Source: prydwen.gg (Wuthering Waves character guides).
// To update: ask Claude to re-scrape the character pages via WebFetch.
(function (global) {
  "use strict";

  var CHARACTERS = [
    {
      id: "jinhsi",
      name: "Jinhsi",
      element: "Spectro",
      weapon: "Broadblade",
      rarity: 5,
      substatPriority: ["energyRegen", "critRate", "critDmg", "atkPct", "resonanceSkillDmg", "atkFlat"],
      mainStats: { 4: ["critRate", "critDmg"], 3: ["elementalDmg", "atkPct"], 1: ["atkFlat"] },
      recommendedSets: [{ "Celestial Light": 5 }],
      summary: "Energy Regen until Outro threshold, then crit stats; Celestial Light 5pc (Spectro DMG) Sonata Effect.",
      source: "https://www.prydwen.gg/wuthering-waves/characters/jinhsi"
    },
    {
      id: "calcharo",
      name: "Calcharo",
      element: "Electro",
      weapon: "Broadblade",
      rarity: 5,
      substatPriority: ["energyRegen", "critRate", "critDmg", "atkPct", "atkFlat", "resonanceLiberationDmg"],
      mainStats: { 4: ["critRate", "critDmg"], 3: ["elementalDmg", "atkPct"], 1: ["atkFlat"] },
      recommendedSets: [{ "Void Thunder": 5 }],
      summary: "Energy Regen until threshold, then crit stats; Void Thunder 5pc (Electro DMG) Sonata Effect. Technically demanding, inconsistent DPS.",
      source: "https://www.prydwen.gg/wuthering-waves/characters/calcharo"
    },
    {
      id: "verina",
      name: "Verina",
      element: "Spectro",
      weapon: "Rectifier",
      rarity: 5,
      substatPriority: ["energyRegen", "critRate", "critDmg", "atkPct", "atkFlat"],
      mainStats: { 4: ["critRate", "atkPct"], 3: ["energyRegen", "elementalDmg"], 1: ["atkFlat"] },
      recommendedSets: [{ "Rejuvenating Glow": 5 }],
      summary: "Versatile healer/support with the shortest rotation: Energy Regen to ~220-230%, then crit stats; Rejuvenating Glow 5pc Sonata Effect.",
      source: "https://www.prydwen.gg/wuthering-waves/characters/verina"
    }
  ];

  if (typeof module !== "undefined" && module.exports) {
    module.exports = CHARACTERS;
  } else {
    global.WUWA_CHARACTERS = CHARACTERS;
  }
})(typeof window !== "undefined" ? window : globalThis);
