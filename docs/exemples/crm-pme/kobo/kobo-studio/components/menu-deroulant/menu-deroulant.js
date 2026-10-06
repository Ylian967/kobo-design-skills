/*
 * kobo-studio — menu déroulant : ouverture, flèches, saisie d'une lettre, fermeture.
 * Sans dépendance. Modèle ARIA « menu button ». S'active seul sur .k-dropdown.
 *   Entrée, Espace, ↓ sur le bouton : ouvre et va au premier choix ; ↑ : au dernier.
 *   Dans le menu : ↓ ↑ (en boucle), Début, Fin, une lettre (premier choix qui commence par elle), Entrée ou Espace (active),
 *   Échap (ferme, focus au bouton), Tab (ferme et continue).
 * Un clic hors du menu le ferme. Le menu s'aligne à droite ou s'ouvre vers le haut si la place manque (mesure).
 * Événement « k-dropdown:select » sur .k-dropdown (detail.item, detail.value = data-k-value). Un choix menuitemradio se coche seul.
 * Kobo.dropdown.init(conteneur) ; Kobo.dropdown.open(racine) ; Kobo.dropdown.close(racine).
 */
(function () {
  'use strict';
  var Kobo = (window.Kobo = window.Kobo || {});
  function parts(root) {
    var menu = root.querySelector('.k-dropdown__menu');
    return { btn: root.querySelector('[aria-haspopup]'), menu: menu,
      items: menu ? Array.prototype.slice.call(menu.querySelectorAll('[role^="menuitem"]')).filter(function (i) { return i.getAttribute('aria-disabled') !== 'true' && !i.hidden && !i.closest('[hidden]:not(.k-dropdown__menu)'); }) : [] };   // un choix désactivé ou masqué est sauté
  }
  function close(root, focus) {
    var p = parts(root);
    if (!p.menu || p.menu.hidden) return;
    p.menu.hidden = true; p.btn.setAttribute('aria-expanded', 'false');
    if (focus) p.btn.focus();
  }
  function open(root, last) {
    var p = parts(root);
    if (!p.menu || p.btn.disabled || p.btn.getAttribute('aria-disabled') === 'true') return;
    document.querySelectorAll('.k-dropdown').forEach(function (o) { if (o !== root) close(o, false); });
    if (!root.hasAttribute('data-k-fixed')) { root.removeAttribute('data-k-align'); root.removeAttribute('data-k-place'); }
    p.menu.hidden = false; p.btn.setAttribute('aria-expanded', 'true');
    if (!root.hasAttribute('data-k-fixed')) {                               // on mesure une fois ouvert
      var r = p.menu.getBoundingClientRect(), doc = document.documentElement;
      if (r.right > doc.clientWidth) root.setAttribute('data-k-align', 'end');
      if (r.bottom > doc.clientHeight && r.height < p.btn.getBoundingClientRect().top) root.setAttribute('data-k-place', 'top');
    }
    var target = p.items[last ? p.items.length - 1 : 0];
    if (target) target.focus();
  }
  function choose(root, item) {
    if (item.getAttribute('aria-disabled') === 'true') return;
    if (item.getAttribute('role') === 'menuitemradio') {
      (item.closest('[role="group"]') || root).querySelectorAll('[role="menuitemradio"]').forEach(function (o) { o.setAttribute('aria-checked', String(o === item)); });
    } else if (item.getAttribute('role') === 'menuitemcheckbox') item.setAttribute('aria-checked', String(item.getAttribute('aria-checked') !== 'true'));
    close(root, true);
    root.dispatchEvent(new CustomEvent('k-dropdown:select', { bubbles: true, detail: { item: item, value: item.dataset.kValue || item.textContent.trim() } }));
  }
  function init(scope) {
    (scope || document).querySelectorAll('.k-dropdown').forEach(function (root) {
      if (root.dataset.kReady) return;
      var p = parts(root);
      if (!p.btn || !p.menu) return;
      root.dataset.kReady = '1';
      if (root.hasAttribute('data-k-align') || root.hasAttribute('data-k-place')) root.setAttribute('data-k-fixed', '');
      p.menu.hidden = true; p.btn.setAttribute('aria-expanded', 'false');
      p.menu.querySelectorAll('[role^="menuitem"]').forEach(function (i) { i.tabIndex = -1; });   // un seul arrêt de tabulation : le bouton
      p.btn.addEventListener('click', function () { if (p.menu.hidden) open(root); else close(root, true); });
      p.btn.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); open(root, e.key === 'ArrowUp'); }
      });
      p.menu.addEventListener('click', function (e) {
        var item = e.target.closest('[role^="menuitem"]');
        if (item && item.tagName !== 'A') choose(root, item); else if (item) close(root, false);
      });
      p.menu.addEventListener('keydown', function (e) {
        var items = parts(root).items, i = items.indexOf(document.activeElement), next = null;
        if (e.key === 'ArrowDown') next = items[(i + 1) % items.length];
        else if (e.key === 'ArrowUp') next = items[(i - 1 + items.length) % items.length];
        else if (e.key === 'Home') next = items[0];
        else if (e.key === 'End') next = items[items.length - 1];
        else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(root, true); return; }
        else if (e.key === 'Tab') { close(root, false); return; }
        else if (e.key === ' ' && document.activeElement && document.activeElement.tagName !== 'BUTTON') { e.preventDefault(); document.activeElement.click(); return; }
        else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          var c = e.key.toLowerCase(), rest = items.slice(i + 1).concat(items.slice(0, i + 1));
          next = rest.filter(function (it) { return it.textContent.trim().toLowerCase().indexOf(c) === 0; })[0] || null;
        }
        if (next) { e.preventDefault(); next.focus(); }
      });
    });
  }
  document.addEventListener('pointerdown', function (e) {
    document.querySelectorAll('.k-dropdown').forEach(function (root) { if (!root.contains(e.target)) close(root, false); });
  });
  document.addEventListener('focusin', function (e) {
    document.querySelectorAll('.k-dropdown').forEach(function (root) { if (!root.contains(e.target)) close(root, false); });
  });
  Kobo.dropdown = { init: init, open: function (root) { open(root, false); }, close: function (root) { close(root, true); } };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(); }); else init();
})();
