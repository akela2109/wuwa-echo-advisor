// Точка входа: подключает роутер к трём экранам.
(function (global) {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var app = document.getElementById("app");
    var storageImpl = global.localStorage;
    var characters = global.WUWA_CHARACTERS;

    function findCharacter(id) {
      return characters.filter(function (c) { return c.id === id; })[0] || null;
    }

    global.ROUTER.start({
      roster: function () {
        global.ROSTER_VIEW.render(app, characters, storageImpl);
      },
      character: function (route) {
        global.CHARACTER_VIEW.render(app, findCharacter(route.id));
      },
      build: function (route) {
        global.BUILD_VIEW.render(app, findCharacter(route.id), storageImpl);
      }
    }, global.location);
  });
})(typeof window !== "undefined" ? window : globalThis);
