/*
 * kobo-studio — accordéon : ouverture, fermeture, flèches du clavier.
 * Sans dépendance. Sans script, tous les panneaux restent lisibles si on ne pose pas l'attribut hidden : le balisage livré
 * peut donc laisser les panneaux ouverts, le script les referme (sauf ceux dont le bouton porte aria-expanded="true").
 * data-k-single sur .k-accordion : un seul panneau ouvert à la fois.
 * Événement « k-accordion:toggle » sur .k-accordion (detail.trigger, detail.panel, detail.open).
 * Kobo.accordion.init(conteneur) ; Kobo.accordion.toggle(bouton, vrai | faux).
 */
(function () {
  'use strict';
  var Kobo = (window.Kobo = window.Kobo || {});
  function triggers(root) { return Array.prototype.slice.call(root.querySelectorAll('.k-accordion__trigger')).filter(function (t) { return t.closest('.k-accordion') === root; }); }
  function panelOf(t) { return document.getElementById(t.getAttribute('aria-controls')); }
  function toggle(t, open) {
    var root = t.closest('.k-accordion'), panel = panelOf(t);
    if (!root || !panel || t.disabled || t.getAttribute('aria-disabled') === 'true') return;
    var next = open === undefined ? t.getAttribute('aria-expanded') !== 'true' : !!open;
    if (next && root.hasAttribute('data-k-single')) triggers(root).forEach(function (o) { if (o !== t && o.getAttribute('aria-expanded') === 'true') toggle(o, false); });
    t.setAttribute('aria-expanded', String(next));
    panel.hidden = !next;
    root.dispatchEvent(new CustomEvent('k-accordion:toggle', { bubbles: true, detail: { trigger: t, panel: panel, open: next } }));
  }
  function init(scope) {
    (scope || document).querySelectorAll('.k-accordion').forEach(function (root) {
      if (root.dataset.kReady) return;
      root.dataset.kReady = '1';
      triggers(root).forEach(function (t) {
        var panel = panelOf(t), open = t.getAttribute('aria-expanded') === 'true';
        t.setAttribute('aria-expanded', String(open));
        if (panel) panel.hidden = !open;
      });
      root.addEventListener('click', function (e) {
        var t = e.target.closest('.k-accordion__trigger');
        if (t && t.closest('.k-accordion') === root) toggle(t);
      });
      root.addEventListener('keydown', function (e) {
        var t = e.target.closest('.k-accordion__trigger');
        if (!t || t.closest('.k-accordion') !== root) return;
        var all = triggers(root).filter(function (x) { return !x.disabled; }), i = all.indexOf(t), next = null;
        if (e.key === 'ArrowDown') next = all[(i + 1) % all.length];
        else if (e.key === 'ArrowUp') next = all[(i - 1 + all.length) % all.length];
        else if (e.key === 'Home') next = all[0];
        else if (e.key === 'End') next = all[all.length - 1];
        if (next) { e.preventDefault(); next.focus(); }
      });
    });
  }
  Kobo.accordion = { init: init, toggle: toggle };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(); }); else init();
})();
