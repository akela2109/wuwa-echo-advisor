// #build/:id screen: 5 echo slot cards, scoring, detailed breakdown.
(function (global) {
  "use strict";

  var SLOT_COSTS = [4, 3, 3, 1, 1];
  var ALL_SUBSTATS = ["critRate", "critDmg", "atkPct", "atkFlat", "hpPct", "hpFlat",
    "defPct", "energyRegen", "basicAttackDmg", "heavyAttackDmg", "resonanceSkillDmg", "resonanceLiberationDmg"];

  function emptyEcho(cost) {
    return {
      cost: cost,
      mainStat: "",
      set: "",
      substats: [{ stat: "", value: 0 }, { stat: "", value: 0 }, { stat: "", value: 0 }, { stat: "", value: 0 }]
    };
  }

  function buildOption(value, label) {
    var opt = document.createElement("option");
    opt.value = value;
    opt.textContent = label;
    return opt;
  }

  function statLabel(stat) {
    return (global.CHARACTER_VIEW && global.CHARACTER_VIEW.statLabel) ? global.CHARACTER_VIEW.statLabel(stat) : stat;
  }

  function renderEchoSlot(index, echo, onChange) {
    var slot = document.createElement("div");
    slot.className = "echo-slot";

    var header = document.createElement("div");
    header.className = "echo-slot__header";
    header.innerHTML = "<b>Echo " + (index + 1) + "</b><span>cost " + echo.cost + "</span>";
    slot.appendChild(header);

    var body = document.createElement("div");
    body.className = "echo-slot__body";
    body.style.display = "none";
    header.addEventListener("click", function () {
      body.style.display = body.style.display === "none" ? "grid" : "none";
    });

    var mainStatSelect = document.createElement("select");
    mainStatSelect.appendChild(buildOption("", "Main Stat…"));
    (global.WUWA_CONSTANTS.COST_TO_MAIN_STAT_OPTIONS[echo.cost] || []).forEach(function (s) {
      mainStatSelect.appendChild(buildOption(s, statLabel(s)));
    });
    mainStatSelect.value = echo.mainStat;
    mainStatSelect.addEventListener("change", function () {
      echo.mainStat = mainStatSelect.value;
      onChange();
    });
    body.appendChild(mainStatSelect);

    var setInput = document.createElement("input");
    setInput.type = "text";
    setInput.placeholder = "Sonata Effect name";
    setInput.value = echo.set;
    setInput.addEventListener("input", function () {
      echo.set = setInput.value;
      onChange();
    });
    body.appendChild(setInput);

    echo.substats.forEach(function (sub, subIndex) {
      var row = document.createElement("div");
      var statSelect = document.createElement("select");
      statSelect.appendChild(buildOption("", "Substat…"));
      ALL_SUBSTATS.forEach(function (s) { statSelect.appendChild(buildOption(s, statLabel(s))); });
      statSelect.value = sub.stat;
      statSelect.addEventListener("change", function () {
        sub.stat = statSelect.value;
        onChange();
      });

      var valueInput = document.createElement("input");
      valueInput.type = "number";
      valueInput.step = "0.1";
      valueInput.value = sub.value;
      valueInput.addEventListener("input", function () {
        sub.value = parseFloat(valueInput.value) || 0;
        onChange();
      });

      row.appendChild(statSelect);
      row.appendChild(valueInput);
      body.appendChild(row);
    });

    slot.appendChild(body);
    return slot;
  }

  function scoreClass(score) {
    if (score >= 75) return "result-row__score--ok";
    if (score >= 50) return "result-row__score--warn";
    return "result-row__score--bad";
  }

  function renderResults(container, character, build) {
    var scoreResult = global.SCORING.scoreBuild(build, character);

    var overall = document.createElement("div");
    overall.className = "overall-score";
    overall.innerHTML = "<div class=\"overall-score__number\">" + scoreResult.overall +
      "</div><div class=\"overall-score__rank\">Rank: " + scoreResult.rank +
      (scoreResult.setMatches ? " · Sonata Effect matches" : " · Sonata Effect doesn't match the recommendation") + "</div>";
    container.appendChild(overall);

    scoreResult.echoScores.forEach(function (echoResult, index) {
      var row = document.createElement("div");
      row.className = "result-row";
      var label = document.createElement("span");
      label.textContent = "Echo " + (index + 1);
      var scoreEl = document.createElement("span");
      scoreEl.className = scoreClass(echoResult.score);
      scoreEl.textContent = echoResult.score + "%";
      row.appendChild(label);
      row.appendChild(scoreEl);

      var detail = document.createElement("div");
      detail.className = "detail-panel";
      detail.style.display = "none";
      var lines = [];
      lines.push(echoResult.mainStatOk ? "✅ Main stat is a good pick" : "❌ Main stat isn't recommended for this character");
      echoResult.substatBreakdown.forEach(function (sub) {
        var mark = sub.ratio >= 0.9 ? "✅" : (sub.ratio >= 0.5 ? "⚠️" : "❌");
        lines.push(mark + " " + statLabel(sub.stat) + ": " + sub.value + " (" + Math.round(sub.ratio * 100) + "% of max roll)");
      });
      detail.innerHTML = lines.join("<br>");

      row.addEventListener("click", function () {
        detail.style.display = detail.style.display === "none" ? "block" : "none";
      });

      container.appendChild(row);
      container.appendChild(detail);
    });
  }

  function render(container, character, storageImpl) {
    container.innerHTML = "";
    if (!character) {
      container.textContent = "Character not found.";
      return;
    }

    var saved = global.STORAGE.loadBuild(storageImpl, character.id);
    var build = saved || { echoes: SLOT_COSTS.map(emptyEcho) };

    var title = document.createElement("h2");
    title.textContent = "My Build: " + character.name;
    container.appendChild(title);

    var form = document.createElement("div");
    build.echoes.forEach(function (echo, index) {
      form.appendChild(renderEchoSlot(index, echo, function () { /* values are read when "Evaluate" is clicked */ }));
    });
    container.appendChild(form);

    var resultsContainer = document.createElement("div");

    var evaluateBtn = document.createElement("button");
    evaluateBtn.textContent = "Evaluate";
    evaluateBtn.addEventListener("click", function () {
      resultsContainer.innerHTML = "";
      renderResults(resultsContainer, character, build);
    });
    container.appendChild(evaluateBtn);

    var saveBtn = document.createElement("button");
    saveBtn.textContent = "Save Build";
    saveBtn.addEventListener("click", function () {
      global.STORAGE.saveBuild(storageImpl, character.id, build);
    });
    container.appendChild(saveBtn);

    container.appendChild(resultsContainer);
  }

  global.BUILD_VIEW = { render: render };
})(typeof window !== "undefined" ? window : globalThis);
