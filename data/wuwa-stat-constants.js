// Игровые константы эхо WuWa (НЕ с prydwen — это механика игры).
// Сверено с wutheringwaves.fandom.com/wiki/Echo/Stats (раздел "Mainstats"):
// 3-cost эхо main stat пул включает Energy Regen (диапазон 4.2%-14.2%
// на редкости 3, 6.4%-32.0% на редкости 5) наравне с ATK%/HP%/DEF%/
// elemental DMG. Healing Bonus в этом пуле отсутствует — она встречается
// только у 4-cost эхо; см. TODO ниже.
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
    // TODO: по данным wutheringwaves.fandom.com/wiki/Echo/Stats "healingBonus"
    // в пуле 3-cost эхо не встречается (только у 4-cost) — стоит перепроверить
    // и убрать, если ни один персонаж не использует её на cost 3. Не трогаю
    // в рамках этой правки, т.к. задача — только energyRegen.
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
