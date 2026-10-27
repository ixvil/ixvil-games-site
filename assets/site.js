// Ixvil Games landing: genre chips + search over the game grid, remembers the chosen language.
(function () {
  "use strict";
  document.querySelectorAll("[data-setlang]").forEach(function (a) {
    a.addEventListener("click", function () {
      try { localStorage.setItem("ixvil-lang", a.getAttribute("data-setlang")); } catch (e) {}
    });
  });

  var grid = document.getElementById("grid");
  var filters = document.getElementById("filters");
  if (!grid || !filters) return;
  filters.hidden = false;

  var cards = Array.prototype.slice.call(grid.querySelectorAll(".card"));
  var chips = Array.prototype.slice.call(filters.querySelectorAll(".chip"));
  var input = document.getElementById("q");
  var empty = document.getElementById("empty");
  var genre = "all";

  function norm(s) { return (s || "").toLowerCase().replace(/ё/g, "е").trim(); }

  function apply() {
    var q = norm(input.value);
    var shown = 0;
    cards.forEach(function (c) {
      var ok = (genre === "all" || c.getAttribute("data-genre") === genre) &&
               (!q || norm(c.getAttribute("data-q")).indexOf(q) !== -1);
      c.hidden = !ok;
      if (ok) shown++;
    });
    empty.hidden = shown > 0;
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      genre = chip.getAttribute("data-genre");
      chips.forEach(function (c) { c.setAttribute("aria-pressed", c === chip ? "true" : "false"); });
      apply();
    });
  });
  input.addEventListener("input", apply);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { input.value = ""; apply(); }
  });
})();
