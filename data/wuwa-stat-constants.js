// Wuthering Waves echo game constants (NOT from prydwen — this is game mechanics).
// Checked against wutheringwaves.fandom.com/wiki/Echo/Stats ("Mainstats" section):
// the 3-cost echo main stat pool includes Energy Regen (4.2%-14.2% range at
// rarity 3, 6.4%-32.0% at rarity 5) alongside ATK%/HP%/DEF%/elemental DMG.
// Healing Bonus is not in that pool — it only appears on 4-cost echoes; see
// the TODO below.
(function (global) {
  "use strict";

  var MAX_SUBSTAT_ROLL = {
    critRate: 6.3,
    critDmg: 12.6,
    atkPct: 6.4,
    atkFlat: 40,
    hpPct: 6.4,
    hpFlat: 580,
    defPct: 8.1,
    energyRegen: 6.8,
    basicAttackDmg: 6.4,
    heavyAttackDmg: 6.4,
    resonanceSkillDmg: 6.4,
    resonanceLiberationDmg: 6.4
  };

  var COST_TO_MAIN_STAT_OPTIONS = {
    4: ["atkPct", "hpPct", "defPct", "critRate", "critDmg", "energyRegen"],
    // TODO: per wutheringwaves.fandom.com/wiki/Echo/Stats, "healingBonus" does not
    // appear in the 3-cost echo pool (only 4-cost) — worth double-checking and
    // removing if no character ends up using it at cost 3. Not touching this as
    // part of this pass since the scope was energyRegen only.
    3: ["atkPct", "hpPct", "defPct", "elementalDmg", "healingBonus", "energyRegen"],
    1: ["atkFlat", "hpFlat"]
  };

  var API = {
    MAX_SUBSTAT_ROLL: MAX_SUBSTAT_ROLL,
    COST_TO_MAIN_STAT_OPTIONS: COST_TO_MAIN_STAT_OPTIONS
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = API;
  } else {
    global.WUWA_CONSTANTS = API;
  }
})(typeof window !== "undefined" ? window : globalThis);
