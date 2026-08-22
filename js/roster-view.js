// Экран #roster: фильтры (стихия/оружие) + сетка персонажей + чекбокс "есть у меня".
(function (global) {
  "use strict";

  function uniqueValues(list, key) {
    var seen = {};
    var result = [];
    list.forEach(function (item) {
      if (!seen[item[key]]) { seen[item[key]] = true; result.push(item[key]); }
    });
    return result;
  }

  function render(container, characters, storageImpl) {
    container.innerHTML = "";
    var filters = { element: "", weapon: "" };

    var filterBar = document.createElement("div");
    filterBar.className = "filter-bar";

    var elementSelect = document.createElement("select");
    elementSelect.appendChild(new Option("Все стихии", ""));
    uniqueValues(characters, "element").forEach(function (el) { elementSelect.appendChild(new Option(el, el)); });
    elementSelect.addEventListener("change", function () {
      filters.element = elementSelect.value;
      renderGrid();
    });

    var weaponSelect = document.createElement("select");
    weaponSelect.appendChild(new Option("Всё оружие", ""));
    uniqueValues(characters, "weapon").forEach(function (w) { weaponSelect.appendChild(new Option(w, w)); });
    weaponSelect.addEventListener("change", function () {
      filters.weapon = weaponSelect.value;
      renderGrid();
    });

    filterBar.appendChild(elementSelect);
    filterBar.appendChild(weaponSelect);
    container.appendChild(filterBar);

    var grid = document.createElement("div");
    grid.className = "grid";
    container.appendChild(grid);

    function renderCard(c) {
      var card = document.createElement("div");
      card.className = "char-card";

      var name = document.createElement("p");
      name.className = "char-card__name";
      name.textContent = c.name;

      var meta = document.createElement("p");
      meta.className = "char-card__meta";
      meta.textContent = c.element + " · " + c.weapon;

      var label = document.createElement("label");
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = global.STORAGE.isOwned(storageImpl, c.id);
      checkbox.addEventListener("click", function (e) {
        e.stopPropagation();
        global.STORAGE.setOwned(storageImpl, c.id, checkbox.checked);
      });
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(" есть у меня"));

      card.appendChild(name);
      card.appendChild(meta);
      card.appendChild(label);
      card.addEventListener("click", function () {
        global.location.hash = "#character/" + c.id;
      });
      return card;
    }

    function renderGrid() {
      grid.innerHTML = "";
      characters
        .filter(function (c) { return !filters.element || c.element === filters.element; })
        .filter(function (c) { return !filters.weapon || c.weapon === filters.weapon; })
        .forEach(function (c) { grid.appendChild(renderCard(c)); });
    }

    renderGrid();
  }

  global.ROSTER_VIEW = { render: render };
})(typeof window !== "undefined" ? window : globalThis);
