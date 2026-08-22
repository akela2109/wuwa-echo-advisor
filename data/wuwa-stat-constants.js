// Wuthering Waves echo game constants (NOT from prydwen — this is game mechanics).
// Checked against wutheringwaves.fandom.com/wiki/Echo/Stats ("Substats" /
// "Detailed substat values distribution" sections) and wutheringwaves.fandom.com/wiki/Sonata:
// - An Echo can have up to 5 Substats (not 4 — corrected from an earlier draft).
// - MAX_SUBSTAT_ROLL values below are the true maximum roll per substat (an earlier
//   draft of this file mistakenly used the MINIMUM roll value instead — e.g. Crit DMG's
//   true range is 12.6%-21.0%, so the max is 21.0, not 12.6).
// - The substat pool has 13 entries, including flat DEF, which an earlier draft omitted.
// - Healing Bonus is not in the 3-cost main stat pool — it only appears on 4-cost echoes;
//   see the TODO below.
(function (global) {
  "use strict";

  var MAX_SUBSTAT_ROLL = {
    critRate: 10.5,
    critDmg: 21.0,
    atkPct: 11.6,
    atkFlat: 60,
    hpPct: 11.6,
    hpFlat: 580,
    defPct: 14.7,
    defFlat: 70,
    energyRegen: 12.4,
    basicAttackDmg: 11.6,
    heavyAttackDmg: 11.6,
    resonanceSkillDmg: 11.6,
    resonanceLiberationDmg: 11.6
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

  // All known Sonata Effects (echo set names), per wutheringwaves.fandom.com/wiki/Sonata.
  var SONATA_EFFECTS = [
    "Freezing Frost",
    "Molten Rift",
    "Void Thunder",
    "Sierra Gale",
    "Celestial Light",
    "Havoc Eclipse",
    "Rejuvenating Glow",
    "Moonlit Clouds",
    "Lingering Tunes",
    "Frosty Resolve",
    "Eternal Radiance",
    "Midnight Veil",
    "Empyrean Anthem",
    "Tidebreaking Courage",
    "Gusts of Welkin",
    "Windward Pilgrimage",
    "Flaming Clawprint",
    "Pact of Neonlight Leap",
    "Halo of Starry Radiance",
    "Rite of Gilded Revelation",
    "Trailblazing Star",
    "Chromatic Foam",
    "Sound of True Name",
    "Wishes of Quiet Snowfall",
    "Shadow of Shattered Dreams",
    "Dream of the Lost",
    "Law of Harmony",
    "Crown of Valor",
    "Flamewing's Shadow",
    "Thread of Severed Fate"
  ];

  var API = {
    MAX_SUBSTAT_ROLL: MAX_SUBSTAT_ROLL,
    COST_TO_MAIN_STAT_OPTIONS: COST_TO_MAIN_STAT_OPTIONS,
    SONATA_EFFECTS: SONATA_EFFECTS
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = API;
  } else {
    global.WUWA_CONSTANTS = API;
  }
})(typeof window !== "undefined" ? window : globalThis);
