// #character/:id screen: character recommendations + link to the source guide.
(function (global) {
  "use strict";

  var STAT_LABELS = {
    critRate: "Crit Rate", critDmg: "Crit DMG", atkPct: "ATK%", atkFlat: "ATK (Flat)",
    hpPct: "HP%", hpFlat: "HP (Flat)", defPct: "DEF%", defFlat: "DEF (Flat)", energyRegen: "Energy Regen",
    basicAttackDmg: "Basic Attack DMG Bonus", heavyAttackDmg: "Heavy Attack DMG Bonus",
    resonanceSkillDmg: "Resonance Skill DMG Bonus", resonanceLiberationDmg: "Resonance Liberation DMG Bonus",
    elementalDmg: "Elemental DMG Bonus", healingBonus: "Healing Bonus"
  };

  function statLabel(stat) { return STAT_LABELS[stat] || stat; }

  function render(container, character) {
    container.innerHTML = "";
    if (!character) {
      container.textContent = "Character not found.";
      return;
    }

    var header = document.createElement("h2");
    header.textContent = character.name + " — " + character.element + " · " + character.weapon;
    container.appendChild(header);

    var priority = document.createElement("p");
    priority.textContent = "Substat priority: " + character.substatPriority.map(statLabel).join(" > ");
    container.appendChild(priority);

    var sets = document.createElement("p");
    sets.textContent = "Recommended Sonata Effect: " + character.recommendedSets.map(function (dist) {
      return Object.keys(dist).map(function (name) { return name + " (" + dist[name] + "pc)"; }).join(" + ");
    }).join(" OR ");
    container.appendChild(sets);

    var summary = document.createElement("p");
    summary.textContent = character.summary;
    container.appendChild(summary);

    var link = document.createElement("a");
    link.href = character.source;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "Full guide on prydwen.gg";
    container.appendChild(link);

    var buildBtn = document.createElement("button");
    buildBtn.textContent = "Enter My Build →";
    buildBtn.addEventListener("click", function () {
      global.location.hash = "#build/" + character.id;
    });
    container.appendChild(document.createElement("br"));
    container.appendChild(buildBtn);
  }

  global.CHARACTER_VIEW = { render: render, statLabel: statLabel };
})(typeof window !== "undefined" ? window : globalThis);
