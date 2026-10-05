/*
 * kobo-studio — interrupteur : bascule de aria-checked.
 * Sans dépendance. S'active seul sur button.k-switch[role="switch"].
 * Événement « k-switch:change » (detail.checked), annulable : preventDefault() garde l'ancien état.
 * Enregistrement différé : poser data-k-async ; le script met aria-busy, émet l'événement avec detail.done(ok) ;
 * l'état ne change qu'à done(true). Kobo.switch.set(bouton, vrai | faux).
 */
(function () {
  'use strict';
  var Kobo = (window.Kobo = window.Kobo || {});
  function set(btn, on) { btn.setAttribute('aria-checked', String(!!on)); }
  function toggle(btn) {
    if (btn.disabled || btn.getAttribute('aria-disabled') === 'true' || btn.getAttribute('aria-busy') === 'true') return;
    var next = btn.getAttribute('aria-checked') !== 'true', async = btn.hasAttribute('data-k-async');
    var detail = { checked: next, done: function (ok) { btn.removeAttribute('aria-busy'); if (ok !== false) set(btn, next); } };
    if (async) btn.setAttribute('aria-busy', 'true');
    var go = btn.dispatchEvent(new CustomEvent('k-switch:change', { bubbles: true, cancelable: true, detail: detail }));
    if (!go) { btn.removeAttribute('aria-busy'); return; }
    if (!async) set(btn, next);
  }
  function init(scope) {
    (scope || document).querySelectorAll('button.k-switch[role="switch"]').forEach(function (btn) {
      if (btn.dataset.kReady) return;
      btn.dataset.kReady = '1';
      if (!btn.hasAttribute('aria-checked')) set(btn, false);
      btn.addEventListener('click', function () { toggle(btn); });
    });
  }
  Kobo.switch = { init: init, set: set, toggle: toggle };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(); }); else init();
})();
