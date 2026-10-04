/*
 * kobo-studio — barre de progression : mise à jour de la valeur.
 * Sans dépendance. Le squelette n'a pas besoin de script.
 *
 *   Kobo.progress.set(barre, 0.4)                 → 40 % : largeur, aria-valuenow et texte « 40 % »
 *   Kobo.progress.set(barre, 1)                   → terminé : data-k-state="done"
 *   Kobo.progress.fail(barre, 'Import interrompu : connexion perdue.')
 *   Kobo.progress.reset(barre)
 * « barre » est l'élément .k-progress (ou son identifiant).
 */
(function () {
  'use strict';
  var Kobo = (window.Kobo = window.Kobo || {});
  function get(id) { return typeof id === 'string' ? document.getElementById(id) : id; }

  function set(id, ratio) {
    var root = get(id); if (!root) return;
    var r = Math.max(0, Math.min(1, ratio)), pct = Math.round(r * 100);
    var track = root.querySelector('[role="progressbar"]'), bar = root.querySelector('.k-progress__bar'), value = root.querySelector('.k-progress__value');
    if (bar) bar.style.setProperty('--_value', String(r));
    if (track) { track.setAttribute('aria-valuenow', String(pct)); track.setAttribute('aria-valuetext', pct + ' %'); }
    if (value) value.textContent = pct + ' %';
    if (r >= 1) root.setAttribute('data-k-state', 'done'); else root.removeAttribute('data-k-state');
  }

  function fail(id, message) {
    var root = get(id); if (!root) return;
    root.setAttribute('data-k-state', 'error');
    var text = root.querySelector('.k-progress__status--error span');
    if (text && message) text.textContent = message;
  }

  Kobo.progress = { set: set, fail: fail, reset: function (id) { set(id, 0); } };
})();
