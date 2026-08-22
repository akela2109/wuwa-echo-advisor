// Рекомендации по билдам. Источник: prydwen.gg (Wuthering Waves character guides).
// Обновить: попросить Claude перескрейпить страницы персонажей через WebFetch.
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
      summary: "Энергорегенерация до отметки команды, затем крит-статы; сет Celestial Light 5pc (Spectro DMG).",
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
      summary: "Энергорегенерация до отметки, затем крит-статы; сет Void Thunder 5pc (Electro DMG). Технически сложный, инконсистентный ДПС.",
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
      summary: "Универсальный саппорт/хилер с самой короткой ротацией: энергорегенерация до ~220-230%, затем крит-статы; сет Rejuvenating Glow 5pc.",
      source: "https://www.prydwen.gg/wuthering-waves/characters/verina"
    }
  ];

  if (typeof module !== "undefined" && module.exports) {
    module.exports = CHARACTERS;
  } else {
    global.WUWA_CHARACTERS = CHARACTERS;
  }
})(typeof window !== "undefined" ? window : globalThis);
