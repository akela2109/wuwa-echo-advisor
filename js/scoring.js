// Echo build scoring engine. Pure functions, no DOM — testable under Node.
(function (global) {
  "use strict";

  var WEIGHT_BY_RANK = [1.0, 0.8, 0.6, 0.4];
  var DEFAULT_WEIGHT = 0.1;
  var MAIN_STAT_PENALTY = 15;
  var SET_BONUS = 5;
  var SET_PENALTY = -10;
  var IDEAL_WEIGHTED_SUM = WEIGHT_BY_RANK.reduce(function (a, b) { return a + b; }, 0); // 2.8

  function weightForStat(stat, substatPriority) {
    var rank = substatPriority.indexOf(stat);
    if (rank === -1 || rank >= WEIGHT_BY_RANK.length) return DEFAULT_WEIGHT;
    return WEIGHT_BY_RANK[rank];
  }

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function round2(n) {
    return Math.round(n * 100) / 100;
  }

  function isMainStatOk(echo, character) {
    var options = character.mainStats[echo.cost];
    if (!options) return true; // no constraint at this cost (e.g. cost 1 is always fixed externally)
    return options.indexOf(echo.mainStat) !== -1;
  }

  // Returns { score, mainStatOk, substatBreakdown }
  function scoreEcho(echo, character) {
    var maxRoll = global.WUWA_CONSTANTS ? global.WUWA_CONSTANTS.MAX_SUBSTAT_ROLL : require("../data/wuwa-stat-constants.js").MAX_SUBSTAT_ROLL;
    var actualWeighted = 0;
    var substatBreakdown = echo.substats.map(function (sub) {
      var weight = weightForStat(sub.stat, character.substatPriority);
      var max = maxRoll[sub.stat];
      var ratio = max ? clamp(sub.value / max, 0, 1) : 0;
      var contribution = weight * ratio;
      actualWeighted += contribution;
      return { stat: sub.stat, value: sub.value, weight: weight, ratio: ratio };
    });

    var substatScore = (actualWeighted / IDEAL_WEIGHTED_SUM) * 100;
    var mainStatOk = isMainStatOk(echo, character);
    var score = clamp(substatScore - (mainStatOk ? 0 : MAIN_STAT_PENALTY), 0, 100);

    return { score: round2(score), mainStatOk: mainStatOk, substatBreakdown: substatBreakdown };
  }

  function checkSetMatch(echoes, recommendedSets) {
    var counts = {};
    echoes.forEach(function (e) {
      if (!e.set) return;
      counts[e.set] = (counts[e.set] || 0) + 1;
    });
    return recommendedSets.some(function (dist) {
      return Object.keys(dist).every(function (setName) {
        return (counts[setName] || 0) >= dist[setName];
      });
    });
  }

  function rankFor(overall) {
    if (overall >= 90) return "S";
    if (overall >= 75) return "A";
    if (overall >= 60) return "B";
    return "C";
  }

  // Returns { echoScores, overall, rank, setMatches }
  function scoreBuild(build, character) {
    var echoScores = build.echoes.map(function (echo) {
      return scoreEcho(echo, character);
    });
    var avg = echoScores.reduce(function (sum, r) { return sum + r.score; }, 0) / echoScores.length;
    var setMatches = checkSetMatch(build.echoes, character.recommendedSets);
    var overall = clamp(avg + (setMatches ? SET_BONUS : SET_PENALTY), 0, 100);
    overall = round2(overall);
    return { echoScores: echoScores, overall: overall, rank: rankFor(overall), setMatches: setMatches };
  }

  var API = { scoreEcho: scoreEcho, scoreBuild: scoreBuild };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = API;
  } else {
    global.SCORING = API;
  }
})(typeof window !== "undefined" ? window : globalThis);
