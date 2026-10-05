/*
 * kobo-studio — structure « application » : barre latérale, panneau de détail, filtres, raccourcis.
 * Sans dépendance (le tableau, la modale et les champs gardent leurs scripts). S'active seul sur .ap.
 *
 * Mesure, pas de point de rupture : compare la largeur de .ap à deux repères écrits en rôles (.ap-probe) et pose
 *   data-k-narrow (barre en tiroir) et data-k-detail="side" | "over" (panneau à côté de la liste, ou par-dessus).
 * Barre latérale : [data-ap-side] la replie (écran large) ou ouvre le tiroir (écran étroit) ; Échap ferme le tiroir.
 * Panneau de détail : s'ouvre sur l'événement « k-table:open » du tableau (Entrée ou clic sur une ligne) ; il est rempli
 *   d'après la ligne (son en-tête de ligne devient le titre, ses autres cellules une liste de faits) ; [data-ap-close] ou Échap
 *   le ferme et rend le focus à la ligne. Événements sur .ap : « k-app:open » (detail.row) et « k-app:close ».
 * Filtres : <select data-ap-filter="etat"> masque les lignes dont data-etat diffère ; le champ [data-ap-search] filtre sur le
 *   texte ; le résumé [data-ap-sum] est réécrit (role="status") ; [data-ap-reset] efface tout.
 * Raccourcis (hors d'un champ) : « / » recherche, « ? » aide (la modale #ap-aide), « [ » barre latérale, Échap ferme.
 * Kobo.app.init(conteneur), Kobo.app.open(ap, ligne), Kobo.app.close(ap), Kobo.app.measure(ap).
 */
(function () {
  'use strict';
  var Kobo = (window.Kobo = window.Kobo || {});
  var $ = function (root, sel) { return root.querySelector(sel); };

  function measure(ap) {
    var narrow = $(ap, '.ap-probe--narrow'), detail = $(ap, '.ap-probe--detail'), work = $(ap, '.ap-work');
    if (narrow) ap.toggleAttribute('data-k-narrow', ap.clientWidth < narrow.offsetWidth);
    if (!ap.hasAttribute('data-k-narrow')) drawer(ap, false);
    if (detail && work) {
      // la place de la zone de travail si le panneau n'y était pas : celle de son parent
      ap.setAttribute('data-k-detail', work.parentElement.clientWidth < detail.offsetWidth ? 'over' : 'side');
    }
    var side = $(ap, '.ap-side'), btn = $(ap, '[data-ap-side]');
    if (side) side.inert = ap.hasAttribute('data-k-narrow') && !ap.hasAttribute('data-k-drawer');
    if (btn) btn.setAttribute('aria-expanded', String(ap.hasAttribute('data-k-narrow') ? ap.hasAttribute('data-k-drawer') : ap.dataset.kSide !== 'min'));
  }
  function drawer(ap, open, focus) {
    if (open === ap.hasAttribute('data-k-drawer')) return;
    ap.toggleAttribute('data-k-drawer', open);
    var side = $(ap, '.ap-side'), btn = $(ap, '[data-ap-side]');
    if (side) side.inert = ap.hasAttribute('data-k-narrow') && !open;
    if (btn) btn.setAttribute('aria-expanded', String(open));
    if (focus) { var to = open ? $(ap, '.ap-side__link[aria-current], .ap-side__link') : btn; if (to) to.focus(); }
  }
  function toggleSide(ap) {
    if (ap.hasAttribute('data-k-narrow')) { drawer(ap, !ap.hasAttribute('data-k-drawer'), true); return; }
    var min = ap.dataset.kSide !== 'min', btn = $(ap, '[data-ap-side]');
    if (min) ap.dataset.kSide = 'min'; else delete ap.dataset.kSide;
    if (btn) btn.setAttribute('aria-expanded', String(!min));
  }

  /* ---------- Panneau de détail ---------- */
  function open(ap, row) {
    var panel = $(ap, '.ap-detail'); if (!panel || !row) return;
    var table = row.closest('table'), heads = table ? table.querySelectorAll('thead th') : [];
    var title = $(panel, '.ap-detail__title'), facts = $(panel, '[data-ap-facts]'), name = row.querySelector('th[scope="row"]');
    if (title && name) title.textContent = name.textContent.trim();
    if (facts) {
      facts.textContent = '';
      Array.prototype.forEach.call(row.children, function (cell, i) {
        if (cell === name || cell.classList.contains('k-table__check') || !heads[i]) return;
        var line = document.createElement('div'), dt = document.createElement('dt'), dd = document.createElement('dd');
        dt.textContent = heads[i].textContent.trim(); dd.textContent = cell.textContent.trim(); line.appendChild(dt); line.appendChild(dd); facts.appendChild(line);
      });
    }
    Array.prototype.forEach.call(row.parentElement.children, function (r) { if (r === row) r.setAttribute('aria-current', 'true'); else r.removeAttribute('aria-current'); });
    ap._row = row; panel.hidden = false; measure(ap);
    if (title) title.focus();
    ap.dispatchEvent(new CustomEvent('k-app:open', { bubbles: true, detail: { row: row } }));
  }
  function close(ap, back) {
    var panel = $(ap, '.ap-detail'); if (!panel || panel.hidden) return false;
    panel.hidden = true;
    if (ap._row) { ap._row.removeAttribute('aria-current'); if (back !== false && ap._row.isConnected && !ap._row.hidden) ap._row.focus(); }
    ap.dispatchEvent(new CustomEvent('k-app:close', { bubbles: true }));
    return true;
  }

  /* ---------- Filtres et recherche ---------- */
  function filter(ap) {
    var table = $(ap, '.ap-list .k-table'); if (!table) return;
    var q = ($(ap, '[data-ap-search]') || {}).value || '', needle = q.trim().toLowerCase();
    var filters = Array.prototype.map.call(ap.querySelectorAll('[data-ap-filter]'), function (s) { return [s.dataset.apFilter, s.value]; });
    var rows = table.querySelectorAll('tbody > tr'), shown = 0;
    Array.prototype.forEach.call(rows, function (r) {
      var ok = filters.every(function (f) { return !f[1] || r.dataset[f[0]] === f[1]; }) && (!needle || r.textContent.toLowerCase().indexOf(needle) >= 0);
      r.hidden = !ok; if (ok) shown++;
    });
    if (ap._row && ap._row.hidden) close(ap, false);
    if (Kobo.table) Kobo.table.refresh(table);
    var sum = $(ap, '[data-ap-sum]');
    if (sum) sum.textContent = (sum.dataset.apSum || '{n} sur {total}').replace('{n}', shown).replace('{total}', rows.length);
  }

  function init(scope) {
    (scope || document).querySelectorAll('.ap').forEach(function (ap) {
      if (ap.dataset.kAppReady) return;
      ap.dataset.kAppReady = '1';
      ['narrow', 'detail'].forEach(function (n) { if (!$(ap, '.ap-probe--' + n)) { var p = document.createElement('span'); p.className = 'ap-probe ap-probe--' + n; p.setAttribute('aria-hidden', 'true'); ap.appendChild(p); } });
      var go = function () { measure(ap); };
      if ('ResizeObserver' in window) new ResizeObserver(go).observe(ap);
      window.addEventListener('resize', go);   // en plus de l'observateur : il ne tourne pas dans une fenêtre masquée
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(go);
      go();
      ap.addEventListener('click', function (e) {
        if (e.target.closest('[data-ap-side]')) toggleSide(ap);
        else if (e.target.closest('[data-ap-close]')) close(ap);
        else if (e.target.closest('[data-ap-reset]')) {
          ap.querySelectorAll('[data-ap-filter]').forEach(function (s) { s.value = ''; }); var q = $(ap, '[data-ap-search]'); if (q) q.value = ''; filter(ap);
        } else if (ap.hasAttribute('data-k-drawer') && (e.target.closest('.ap-side__link') || !e.target.closest('.ap-side'))) drawer(ap, false);
      });
      ap.addEventListener('k-table:open', function (e) { open(ap, e.detail.row); });
      ap.addEventListener('change', function (e) { if (e.target.matches('[data-ap-filter]')) filter(ap); });
      ap.addEventListener('input', function (e) { if (e.target.matches('[data-ap-search]')) filter(ap); });
      ap.addEventListener('submit', function (e) {
        if (!e.target.matches('.ap-search')) return;
        e.preventDefault(); var first = $(ap, '.ap-list tbody > tr:not([hidden])'); if (first) first.focus();
      });
      document.addEventListener('keydown', function (e) {
        if (!ap.isConnected) return;
        if (e.key === 'Escape') {
          if (document.querySelector('dialog[open]')) return;                     // la modale ouverte gère sa propre fermeture
          if (ap.hasAttribute('data-k-drawer')) { drawer(ap, false, true); return; }
          close(ap); return;
        }
        var t = e.target;
        if (e.ctrlKey || e.metaKey || e.altKey || (t.matches && t.matches('input, select, textarea, [contenteditable]')) || document.querySelector('dialog[open]')) return;
        if (e.key === '/') { var q = $(ap, '[data-ap-search]'); if (q) { e.preventDefault(); q.focus(); } }
        else if (e.key === '?') { var help = $(ap, '[data-k-modal-open]#ap-aide-btn, [data-ap-help]'); if (help) { e.preventDefault(); help.click(); } }
        else if (e.key === '[') toggleSide(ap);
      });
      filter(ap);
    });
  }
  Kobo.app = { init: init, open: open, close: close, measure: measure, filter: filter };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(); }); else init();
})();
