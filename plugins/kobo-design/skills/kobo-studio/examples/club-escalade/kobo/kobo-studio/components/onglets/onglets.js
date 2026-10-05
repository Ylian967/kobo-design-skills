/*
 * kobo-studio — onglets : sélection, flèches du clavier.
 * Sans dépendance. Modèle ARIA « tabs » à activation automatique : une seule tabulation entre dans la liste,
 * les flèches gauche / droite changent d'onglet, Début et Fin vont au premier et au dernier, Tab passe au panneau.
 * S'active seul sur les .k-tabs ; pour du contenu ajouté ensuite : Kobo.tabs.init(conteneur).
 * Kobo.tabs.select(onglet) ; événement « k-tabs:change » sur .k-tabs (detail.tab, detail.panel).
 */
(function () {
  'use strict';
  var Kobo = (window.Kobo = window.Kobo || {});

  function tabsOf(root) { return Array.prototype.slice.call(root.querySelectorAll(':scope > .k-tabs__list > [role="tab"]')); }

  function select(tab, focus) {
    var root = tab.closest('.k-tabs');
    if (!root || tab.disabled) return;
    tabsOf(root).forEach(function (t) {
      var on = t === tab, panel = document.getElementById(t.getAttribute('aria-controls'));
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;                 // un seul onglet dans l'ordre de tabulation
      if (panel) panel.hidden = !on;
    });
    if (focus) tab.focus();
    root.dispatchEvent(new CustomEvent('k-tabs:change', { bubbles: true, detail: { tab: tab, panel: document.getElementById(tab.getAttribute('aria-controls')) } }));
  }

  function init(scope) {
    (scope || document).querySelectorAll('.k-tabs').forEach(function (root) {
      if (root.dataset.kReady) return;
      root.dataset.kReady = '1';
      var tabs = tabsOf(root);
      if (!tabs.length) return;
      var current = tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true' && !t.disabled; })[0] || tabs.filter(function (t) { return !t.disabled; })[0];
      select(current, false);
      root.addEventListener('click', function (e) {
        var tab = e.target.closest('[role="tab"]');
        if (tab && tab.closest('.k-tabs') === root) select(tab, false);
      });
      root.addEventListener('keydown', function (e) {
        var tab = e.target.closest('[role="tab"]');
        if (!tab || tab.closest('.k-tabs') !== root) return;
        var live = tabsOf(root).filter(function (t) { return !t.disabled; }), i = live.indexOf(tab), next = null;
        if (e.key === 'ArrowRight') next = live[(i + 1) % live.length];
        else if (e.key === 'ArrowLeft') next = live[(i - 1 + live.length) % live.length];
        else if (e.key === 'Home') next = live[0];
        else if (e.key === 'End') next = live[live.length - 1];
        if (next) { e.preventDefault(); select(next, true); }
      });
    });
  }

  Kobo.tabs = { init: init, select: function (tab) { select(tab, false); } };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(); }); else init();
})();
