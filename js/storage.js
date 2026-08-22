// Roster/build persistence. The storage implementation is passed in as an argument
// (in the browser it's window.localStorage) — this is what makes the module
// testable under Node.
(function (global) {
  "use strict";

  var ROSTER_KEY = "wuwaEchoAdvisor.roster";
  var BUILD_KEY_PREFIX = "wuwaEchoAdvisor.build.";

  function getRoster(storageImpl) {
    var raw = storageImpl.getItem(ROSTER_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  function setOwned(storageImpl, characterId, owned) {
    var roster = getRoster(storageImpl);
    var idx = roster.indexOf(characterId);
    if (owned && idx === -1) roster.push(characterId);
    if (!owned && idx !== -1) roster.splice(idx, 1);
    storageImpl.setItem(ROSTER_KEY, JSON.stringify(roster));
    return roster;
  }

  function isOwned(storageImpl, characterId) {
    return getRoster(storageImpl).indexOf(characterId) !== -1;
  }

  function saveBuild(storageImpl, characterId, build) {
    storageImpl.setItem(BUILD_KEY_PREFIX + characterId, JSON.stringify(build));
  }

  function loadBuild(storageImpl, characterId) {
    var raw = storageImpl.getItem(BUILD_KEY_PREFIX + characterId);
    return raw ? JSON.parse(raw) : null;
  }

  var API = {
    getRoster: getRoster,
    setOwned: setOwned,
    isOwned: isOwned,
    saveBuild: saveBuild,
    loadBuild: loadBuild
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = API;
  } else {
    global.STORAGE = API;
  }
})(typeof window !== "undefined" ? window : globalThis);
