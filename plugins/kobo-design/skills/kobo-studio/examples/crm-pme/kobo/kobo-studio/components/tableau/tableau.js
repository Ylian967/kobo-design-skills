/*
 * kobo-studio — tableau : tri, lignes sélectionnées, état vide.
 * Sans dépendance. S'active seul sur .k-table. Sans script, le tableau se lit en entier, dans l'ordre livré.
 *   Tri : un bouton .k-table__sort dans un <th> ; un clic trie en ordre croissant, le suivant en ordre décroissant.
 *         La valeur triée est data-k-sort de la cellule, sinon son texte ; data-k-type="number" sur le <th> trie en nombres.
 *   Sélection : une case .k-check__input dans la première cellule de chaque ligne ; la ligne reçoit aria-selected.
 *         La case d'en-tête (data-k-select-all) coche tout, et se met en état partiel.
 *   Vide : quand aucune ligne n'est visible, .k-table__empty remplace le corps du tableau.
 *   Lignes parcourables (attribut data-k-rownav sur .k-table) : une seule ligne est dans l'ordre de tabulation ; ↑ ↓ changent
 *         de ligne, Début et Fin vont aux extrémités, Espace coche la ligne, Entrée (ou un clic sur la ligne) l'ouvre :
 *         événement « k-table:open » (detail.row). La ligne ouverte porte aria-current="true" (à poser par la page).
 * Tout changement est annoncé dans .k-table__status (role="status").
 * Événements sur .k-table : « k-table:sort » (detail.column, detail.direction), « k-table:select » (detail.rows).
 * Kobo.table.init(conteneur) ; Kobo.table.refresh(racine) après avoir ajouté, retiré ou masqué des lignes.
 */
(function () {
  'use strict';
  var Kobo = (window.Kobo = window.Kobo || {});
  var collator = new Intl.Collator(document.documentElement.lang || 'fr', { numeric: true, sensitivity: 'base' });
  function rows(root) { return Array.prototype.slice.call(root.querySelectorAll('tbody > tr')); }
  function say(root, text) { var s = root.querySelector('.k-table__status'); if (s) s.textContent = text; }
  function value(row, index, numeric) {
    var cell = row.children[index], raw = cell ? (cell.dataset.kSort !== undefined ? cell.dataset.kSort : cell.textContent.trim()) : '';
    if (!numeric) return raw;
    var n = parseFloat(String(raw).replace(/\s/g, '').replace(',', '.').replace(/[^\d.-]/g, ''));
    return isNaN(n) ? -Infinity : n;
  }
  function sort(root, th, direction) {
    var index = Array.prototype.indexOf.call(th.parentElement.children, th), numeric = th.dataset.kType === 'number';
    var dir = direction || (th.getAttribute('aria-sort') === 'ascending' ? 'descending' : 'ascending'), sign = dir === 'ascending' ? 1 : -1;
    var body = root.querySelector('tbody');
    rows(root).map(function (r, i) { return { r: r, v: value(r, index, numeric), i: i }; })
      .sort(function (a, b) { return (numeric ? a.v - b.v : collator.compare(a.v, b.v)) * sign || a.i - b.i; })   // tri stable
      .forEach(function (x) { body.appendChild(x.r); });
    th.parentElement.querySelectorAll('th[aria-sort]').forEach(function (o) { o.setAttribute('aria-sort', o === th ? dir : 'none'); });
    var name = th.querySelector('.k-table__sort').textContent.trim();
    say(root, 'Trié par ' + name + ', ordre ' + (dir === 'ascending' ? 'croissant' : 'décroissant') + '.');
    rove(root);
    root.dispatchEvent(new CustomEvent('k-table:sort', { bubbles: true, detail: { column: index, direction: dir } }));
  }
  // Lignes parcourables : exactement une ligne visible porte tabindex="0" (celle qui avait le focus, sinon la première)
  function rove(root, target) {
    if (!root.hasAttribute('data-k-rownav')) return;
    var visible = rows(root).filter(function (r) { return !r.hidden; });
    var keep = target || visible.filter(function (r) { return r.tabIndex === 0; })[0] || visible[0];
    rows(root).forEach(function (r) { r.tabIndex = r === keep ? 0 : -1; });
    return visible;
  }
  function boxOf(row) { return row.querySelector('td:first-child .k-check__input, th:first-child .k-check__input'); }
  function refresh(root) {
    var all = rows(root), visible = all.filter(function (r) { return !r.hidden; });
    var empty = root.querySelector('.k-table__empty'), table = root.querySelector('table');
    if (empty) { empty.hidden = visible.length > 0; var body = root.querySelector('tbody'); if (body) body.hidden = !visible.length; }
    var master = root.querySelector('[data-k-select-all]');
    var boxes = visible.map(boxOf).filter(function (b) { return b && !b.disabled; }), on = boxes.filter(function (b) { return b.checked; });
    all.forEach(function (r) { var b = boxOf(r); if (b) r.setAttribute('aria-selected', String(b.checked)); });
    if (master) { master.checked = boxes.length > 0 && on.length === boxes.length; master.indeterminate = on.length > 0 && on.length < boxes.length; master.disabled = !boxes.length; }
    var count = root.querySelector('.k-table__count');
    if (count) count.textContent = on.length ? on.length + (on.length > 1 ? ' lignes sélectionnées' : ' ligne sélectionnée') : visible.length + (visible.length > 1 ? ' lignes' : ' ligne');
    if (table) table.setAttribute('aria-rowcount', String(all.length + 1));
    rove(root);
    return on.map(function (b) { return b.closest('tr'); });
  }
  function init(scope) {
    (scope || document).querySelectorAll('.k-table').forEach(function (root) {
      if (root.dataset.kReady) return;
      root.dataset.kReady = '1';
      root.querySelectorAll('th').forEach(function (th) { if (th.querySelector('.k-table__sort') && !th.hasAttribute('aria-sort')) th.setAttribute('aria-sort', 'none'); });
      root.addEventListener('click', function (e) {
        var b = e.target.closest('.k-table__sort');
        if (b && root.contains(b)) sort(root, b.closest('th'));
      });
      root.addEventListener('change', function (e) {
        var box = e.target;
        if (!box.classList || !box.classList.contains('k-check__input')) return;
        if (box.hasAttribute('data-k-select-all')) rows(root).forEach(function (r) { var b = boxOf(r); if (b && !b.disabled && !r.hidden) b.checked = box.checked; });
        var selected = refresh(root);
        say(root, selected.length ? selected.length + (selected.length > 1 ? ' lignes sélectionnées.' : ' ligne sélectionnée.') : 'Aucune ligne sélectionnée.');
        root.dispatchEvent(new CustomEvent('k-table:select', { bubbles: true, detail: { rows: selected } }));
      });
      if (root.hasAttribute('data-k-rownav')) {
        var open = function (row) { root.dispatchEvent(new CustomEvent('k-table:open', { bubbles: true, detail: { row: row } })); };
        root.addEventListener('keydown', function (e) {
          var row = e.target; if (!row.matches || !row.matches('tbody > tr')) return;
          var visible = rows(root).filter(function (r) { return !r.hidden; }), i = visible.indexOf(row);
          var to = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: visible.length - 1 }[e.key];
          if (to !== undefined) { e.preventDefault(); var next = visible[Math.max(0, Math.min(visible.length - 1, to))]; rove(root, next); next.focus(); }
          else if (e.key === ' ') { e.preventDefault(); var b = boxOf(row); if (b && !b.disabled) { b.checked = !b.checked; b.dispatchEvent(new Event('change', { bubbles: true })); } }
          else if (e.key === 'Enter') { e.preventDefault(); open(row); }
        });
        root.addEventListener('click', function (e) {
          var row = e.target.closest('tbody > tr');
          if (!row || !root.contains(row) || e.target.closest('a, button, input, label, select')) return;
          rove(root, row); open(row);
        });
      }
      refresh(root);
    });
  }
  Kobo.table = { init: init, refresh: refresh, sort: sort };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(); }); else init();
})();
