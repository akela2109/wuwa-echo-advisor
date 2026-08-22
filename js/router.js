// Hash routing: parsing + hashchange subscription. parseHash is a pure function.
(function (global) {
  "use strict";

  function parseHash(hash) {
    var h = (hash || "").replace(/^#/, "");
    if (h === "" || h === "roster") return { screen: "roster" };
    var charMatch = h.match(/^character\/(.+)$/);
    if (charMatch) return { screen: "character", id: charMatch[1] };
    var buildMatch = h.match(/^build\/(.+)$/);
    if (buildMatch) return { screen: "build", id: buildMatch[1] };
    return { screen: "roster" };
  }

  // handlers: { roster: fn(route), character: fn(route), build: fn(route) }
  function start(handlers, locationImpl) {
    function render() {
      var route = parseHash(locationImpl.hash);
      handlers[route.screen](route);
    }
    global.addEventListener("hashchange", render);
    render();
  }

  var API = { parseHash: parseHash, start: start };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = API;
  } else {
    global.ROUTER = API;
  }
})(typeof window !== "undefined" ? window : globalThis);
