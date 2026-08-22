// Экран #character/:id: рекомендации по персонажу + ссылка на источник.
(function (global) {
  "use strict";

  var STAT_LABELS = {
    critRate: "Крит. шанс", critDmg: "Крит. урон", atkPct: "ATK%", atkFlat: "ATK (флэт)",
    hpPct: "HP%", hpFlat: "HP (флэт)", defPct: "DEF%", energyRegen: "Восст. энергии",
    basicAttackDmg: "Урон баз. атаки", heavyAttackDmg: "Урон тяж. атаки",
    resonanceSkillDmg: "Урон навыка", resonanceLiberationDmg: "Урон резонанс-высвобождения",
    elementalDmg: "Стихийный урон", healingBonus: "Бонус лечения"
  };

  function statLabel(stat) { return STAT_LABELS[stat] || stat; }

  function render(container, character) {
    container.innerHTML = "";
    if (!character) {
      container.textContent = "Персонаж не найден.";
      return;
    }

    var header = document.createElement("h2");
    header.textContent = character.name + " — " + character.element + " · " + character.weapon;
    container.appendChild(header);

    var priority = document.createElement("p");
    priority.textContent = "Приоритет саб-статов: " + character.substatPriority.map(statLabel).join(" > ");
    container.appendChild(priority);

    var sets = document.createElement("p");
    sets.textContent = "Рекомендуемый сет: " + character.recommendedSets.map(function (dist) {
      return Object.keys(dist).map(function (name) { return name + " (" + dist[name] + "pc)"; }).join(" + ");
    }).join(" ИЛИ ");
    container.appendChild(sets);

    var summary = document.createElement("p");
    summary.textContent = character.summary;
    container.appendChild(summary);

    var link = document.createElement("a");
    link.href = character.source;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "Полный гайд на prydwen.gg";
    container.appendChild(link);

    var buildBtn = document.createElement("button");
    buildBtn.textContent = "Ввести мой билд →";
    buildBtn.addEventListener("click", function () {
      global.location.hash = "#build/" + character.id;
    });
    container.appendChild(document.createElement("br"));
    container.appendChild(buildBtn);
  }

  global.CHARACTER_VIEW = { render: render, statLabel: statLabel };
})(typeof window !== "undefined" ? window : globalThis);
