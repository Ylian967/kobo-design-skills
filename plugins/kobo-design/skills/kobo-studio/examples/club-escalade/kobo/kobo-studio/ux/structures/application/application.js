/*
 * kobo-studio — structure « application » : barre latérale, panneau de détail, filtres, chemin d'étapes, raccourcis.
 * Sans dépendance (le tableau, la modale, les onglets et les champs gardent leurs scripts). S'active seul sur .ap.
 * Un même script pour les trois écrans (liste, fiche, tableau de bord) : chaque partie ne s'active que si son balisage est là.
 *
 * Mesure, pas de point de rupture : compare la largeur de .ap à deux repères écrits en rôles (.ap-probe) et pose
 *   data-k-narrow (barre en tiroir) et data-k-detail="side" | "over" (panneau à côté de la liste, ou par-dessus).
 * Barre latérale : [data-ap-side] la replie (écran large) ou ouvre le tiroir (écran étroit) ; Échap ferme le tiroir.
 * Panneau de détail : s'ouvre sur l'événement « k-table:open » du tableau (Entrée ou clic sur une ligne) ; il est rempli
 *   d'après la ligne (son en-tête de ligne devient le titre, ses autres cellules une liste de faits) ; [data-ap-close] ou Échap
 *   le ferme et rend le focus à la ligne. Événements sur .ap : « k-app:open » (detail.row) et « k-app:close ».
 * Filtres : <select data-ap-filter="etat"> masque les lignes dont data-etat diffère ; le champ [data-ap-search] filtre sur le
 *   texte ; le résumé [data-ap-sum] est réécrit (role="status") ; [data-ap-reset] efface tout.
 * Recherche hors de la liste (fiche, tableau de bord) : Entrée mène à l'écran de liste (attribut action du formulaire) avec ?q=… ;
 *   la liste lit ?q= à l'ouverture et filtre.
 * Chemin d'étapes (fiche) : <ol data-ap-steps> ; l'étape en cours porte aria-current="step", les étapes faites data-k-step="done".
 *   [data-ap-step-next] fait avancer d'une étape, réécrit son libellé et annonce l'étape ([data-ap-step-status]).
 *   Événement « k-app:step » sur .ap (detail.index, detail.name).
 * Raccourcis (hors d'un champ) : « / » recherche, « ? » aide (la modale #ap-aide), « [ » barre latérale, Échap ferme.
 * Kobo.app.init(conteneur), Kobo.app.open(ap, ligne), Kobo.app.close(ap), Kobo.app.measure(ap), Kobo.app.filter(ap), Kobo.app.step(ap, avancer).
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

  /* ---------- Chemin d'étapes (écran fiche) ---------- */
  function step(ap, advance) {
    var list = $(ap, '[data-ap-steps]'); if (!list) return;
    var items = Array.prototype.slice.call(list.children), btn = $(ap, '[data-ap-step-next]'), status = $(ap, '[data-ap-step-status]');
    var name = function (li) { var n = li && $(li, '.ap-steps__name'); return n ? n.textContent.trim() : ''; };
    var state = function (li, text) { var el = $(li, '.ap-steps__state'); if (el && text) el.textContent = text; };
    var i = items.findIndex(function (li) { return li.getAttribute('aria-current') === 'step'; });
    if (advance && i >= 0 && i < items.length - 1) {
      items[i].removeAttribute('aria-current'); items[i].dataset.kStep = 'done'; state(items[i], list.dataset.apDone);
      i++; items[i].setAttribute('aria-current', 'step'); state(items[i], list.dataset.apNow);
      if (status) status.textContent = (status.dataset.apStepStatus || '{nom}').replace('{nom}', name(items[i]));
      ap.dispatchEvent(new CustomEvent('k-app:step', { bubbles: true, detail: { index: i, name: name(items[i]) } }));
    }
    if (!btn) return;
    var last = i < 0 || i >= items.length - 1;                 // le bouton reste atteignable : aria-disabled, pas disabled (le focus ne se perd pas)
    btn.setAttribute('aria-disabled', String(last));
    btn.textContent = last ? (btn.dataset.apStepEnd || btn.textContent) : (btn.dataset.apStepNext || '{nom}').replace('{nom}', name(items[i + 1]));
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
        var next = e.target.closest('[data-ap-step-next]');
        if (next) { if (next.getAttribute('aria-disabled') !== 'true') step(ap, true); }
        else if (e.target.closest('[data-ap-side]')) toggleSide(ap);
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
        e.preventDefault();
        var first = $(ap, '.ap-list tbody > tr:not([hidden])'), q = $(ap, '[data-ap-search]'), to = e.target.getAttribute('action');
        if (first) first.focus();
        else if (!$(ap, '.ap-list') && to && q && q.value.trim()) location.href = to + '?q=' + encodeURIComponent(q.value.trim()) + location.hash;   // hors de la liste : on y va
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
      var asked = new URLSearchParams(location.search).get('q'), field = $(ap, '[data-ap-search]');
      if (asked && field && $(ap, '.ap-list')) field.value = asked;   // recherche lancée depuis un autre écran
      filter(ap); step(ap);
    });
  }
  Kobo.app = { init: init, open: open, close: close, measure: measure, filter: filter, step: step };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(); }); else init();
})();
