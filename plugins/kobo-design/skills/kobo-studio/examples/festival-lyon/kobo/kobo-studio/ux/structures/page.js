/*
 * kobo-studio — socle des structures de page : emplacements et barre qui se cache.
 * Script classique (fonctionne en file://), sans dépendance. S'accroche à window.Kobo.
 *
 * Emplacements
 *   Kobo.slots.list(racine)               → [{ name, el, filled }]
 *   Kobo.slots.parts(el)                  → { titre: [nœuds], action: [nœuds]… } : COPIES des éléments [data-k-part] de l'emplacement
 *   Kobo.slots.fill(nom, rendu, racine)   → remplace le contenu de chaque emplacement de ce nom.
 *        rendu : un nœud, du HTML, ou une fonction (parts, el, index) => nœud | HTML | null (null : on laisse le contenu neutre)
 *   Kobo.slots.reset(nom, racine)         → remet le contenu neutre (les nœuds d'origine, avec leurs écouteurs)
 *   Après chaque changement, l'emplacement émet « k-slot-change » (les composants qu'il contient sont réactivés).
 *
 * Bloc collant : .k-sticky ne colle que s'il tient à côté d'un autre bloc de son .k-split (mesuré, sans point de rupture).
 * Barre qui se cache : <div class="k-page__top" data-k-nav="auto-hide"> — cachée quand on descend, rendue quand on remonte,
 * quand le focus y entre, ou en haut de page. Rien à faire sous prefers-reduced-motion : elle se cache sans glisser.
 * Sa hauteur est publiée dans --_top-h (sur .k-page) : un élément collé sous elle s'écarte quand elle revient.
 */
(function () {
  'use strict';
  var Kobo = (window.Kobo = window.Kobo || {});
  var neutral = new WeakMap();

  function find(name, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(name ? '[data-k-slot="' + name + '"]' : '[data-k-slot]'));
  }
  function parts(el) {
    var out = {};
    el.querySelectorAll('[data-k-part]').forEach(function (p) {
      if (p.parentElement.closest('[data-k-slot]') !== el) return; // les parts d'un emplacement imbriqué lui appartiennent
      (out[p.dataset.kPart] = out[p.dataset.kPart] || []).push(p.cloneNode(true));
    });
    return out;
  }
  function wake(el) {
    ['field', 'nav', 'tabs'].forEach(function (k) { if (Kobo[k] && Kobo[k].init) Kobo[k].init(el); });
    el.dispatchEvent(new CustomEvent('k-slot-change', { bubbles: true }));
  }
  function fill(name, render, root) {
    find(name, root).forEach(function (el, i) {
      var source = neutral.has(el) ? neutral.get(el) : Array.prototype.slice.call(el.childNodes);
      var holder = document.createElement('div');
      source.forEach(function (n) { holder.appendChild(n.cloneNode(true)); });
      holder.setAttribute('data-k-slot', name);                       // parts() lit toujours le contenu neutre
      var out = typeof render === 'function' ? render(parts(holder), el, i) : render;
      if (out === null || out === undefined) return;
      if (!neutral.has(el)) neutral.set(el, source);
      if (typeof out === 'string') { var t = document.createElement('template'); t.innerHTML = out; out = t.content; }
      else if (i > 0 && out.cloneNode && typeof render !== 'function') out = out.cloneNode(true);
      el.replaceChildren(out);
      el.setAttribute('data-k-filled', '');
      wake(el);
    });
  }
  function reset(name, root) {
    find(name, root).forEach(function (el) {
      if (!neutral.has(el)) return;
      el.replaceChildren.apply(el, neutral.get(el));
      neutral.delete(el);
      el.removeAttribute('data-k-filled');
      wake(el);
    });
  }
  Kobo.slots = {
    list: function (root) { return find(null, root).map(function (el) { return { name: el.dataset.kSlot, el: el, filled: el.hasAttribute('data-k-filled') }; }); },
    parts: parts, fill: fill, reset: reset
  };

  function autoHide(top) {
    var last = window.scrollY, pending = 0, page = top.closest('.k-page') || document.documentElement;
    // Hauteur de la barre, pour ce qui colle sous elle (rail d'un récit) : lue au chargement et quand la barre change de taille
    var height = function () { page.style.setProperty('--_top-h', top.offsetHeight + 'px'); };
    if ('ResizeObserver' in window) new ResizeObserver(height).observe(top); else window.addEventListener('resize', height);
    height();
    window.addEventListener('scroll', function () {
      if (pending) return;
      pending = requestAnimationFrame(function () {
        pending = 0;
        var y = window.scrollY, down = y > last && y > top.offsetHeight;
        if (Math.abs(y - last) > 4) { top.toggleAttribute('data-k-hidden', down); last = y; }
      });
    }, { passive: true });
  }
  // Bloc collant : seulement quand il a un voisin sur la même ligne de son .k-split, pas quand les colonnes sont empilées
  function sides() {
    document.querySelectorAll('.k-sticky').forEach(function (el) {
      var split = el.closest('.k-split'), r = el.getBoundingClientRect();
      // « à côté » : un autre bloc du même .k-split occupe la même bande horizontale (leurs hauteurs se recouvrent)
      var beside = !!split && Array.prototype.some.call(split.children, function (c) {
        if (c === el || c.contains(el)) return false;
        var b = c.getBoundingClientRect();
        return b.top < r.bottom - 1 && b.bottom > r.top + 1;
      });
      el.toggleAttribute('data-k-side', beside);
    });
  }
  function init() {
    document.querySelectorAll('.k-page__top[data-k-nav="auto-hide"]').forEach(autoHide);
    var pending = 0, schedule = function () { cancelAnimationFrame(pending); pending = requestAnimationFrame(sides); };
    if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(document.body); else window.addEventListener('resize', schedule);
    sides();
  }
  Kobo.page = { init: init, sides: sides };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
