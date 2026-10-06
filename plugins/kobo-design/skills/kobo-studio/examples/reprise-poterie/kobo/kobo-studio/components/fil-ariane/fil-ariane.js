/*
 * kobo-studio — fil d'Ariane : repli des niveaux du milieu.
 * Sans dépendance. Sur <nav class="k-crumbs" data-k-collapse> : quand le chemin compte plus de quatre niveaux, ceux du
 * milieu sont rangés derrière un bouton « … » qui les rend au clic (et au clavier). Sans script, tout le chemin est affiché.
 * Kobo.crumbs.init(conteneur) pour du contenu ajouté ensuite.
 */
(function () {
  'use strict';
  var Kobo = (window.Kobo = window.Kobo || {});
  function init(scope) {
    (scope || document).querySelectorAll('.k-crumbs[data-k-collapse]').forEach(function (nav) {
      if (nav.dataset.kReady) return;
      nav.dataset.kReady = '1';
      var items = Array.prototype.slice.call(nav.querySelectorAll('ol > li'));
      if (items.length <= 4) return;
      var middle = items.slice(1, items.length - 2);
      middle.forEach(function (li) { li.hidden = true; });
      var li = document.createElement('li'), btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'k-crumbs__more'; btn.textContent = '…';
      btn.setAttribute('aria-label', 'Afficher les ' + middle.length + ' niveaux intermédiaires');
      btn.setAttribute('aria-expanded', 'false');
      li.appendChild(btn); items[0].after(li);
      btn.addEventListener('click', function () {
        middle.forEach(function (m) { m.hidden = false; });
        li.remove();
        var first = middle[0].querySelector('a');
        if (first) first.focus();                       // le focus ne se perd pas : il va au premier niveau rendu
      });
    });
  }
  Kobo.crumbs = { init: init };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(); }); else init();
})();
