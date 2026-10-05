/*
 * kobo-studio — pagination pilotée par script (liste qui change sans recharger la page).
 * Sans dépendance. Une pagination faite de liens (<a href>) n'a besoin d'aucun script.
 *   <nav class="k-pagination" data-k-pages="12" data-k-page="1" aria-label="Pages des sorties"></nav>
 * Le script écrit Précédent, les numéros (premier, dernier, voisins de la page courante, « … » entre), Suivant et « Page 1 sur 12 ».
 * Il se replie en version courte quand les numéros ne tiennent pas dans la largeur (mesure, pas de point de rupture).
 * Événement « k-pagination:change » (detail.page). Kobo.pagination.set(nav, page) ; Kobo.pagination.init(conteneur).
 */
(function () {
  'use strict';
  var Kobo = (window.Kobo = window.Kobo || {});
  function pages(current, total) {
    var keep = [1, total, current - 1, current, current + 1].filter(function (p) { return p >= 1 && p <= total; });
    var list = keep.filter(function (p, i) { return keep.indexOf(p) === i; }).sort(function (a, b) { return a - b; }), out = [];
    list.forEach(function (p, i) { if (i && p - list[i - 1] > 1) out.push(p - list[i - 1] === 2 ? p - 1 : 0); out.push(p); });   // 0 = « … » ; un seul numéro manquant est écrit
    return out;
  }
  function step(label, page, off, rel) {
    return '<button type="button" class="k-btn k-btn--secondary k-pagination__step" data-k-go="' + page + '"' + (off ? ' aria-disabled="true"' : '') + ' data-k-rel="' + rel + '">' + label + '</button>';
  }
  function render(nav) {
    var total = Math.max(1, +nav.dataset.kPages || 1), page = Math.min(total, Math.max(1, +nav.dataset.kPage || 1));
    var prev = nav.dataset.kPrev || 'Précédent', next = nav.dataset.kNext || 'Suivant';
    nav.innerHTML = step(prev, page - 1, page === 1, 'prev') + '<ol class="k-pagination__list">' + pages(page, total).map(function (p) {
      return p ? '<li><button type="button" class="k-pagination__page" data-k-go="' + p + '"' + (p === page ? ' aria-current="page"' : '') + '><span class="k-sr-only">Page </span>' + p + '</button></li>'
               : '<li><span class="k-pagination__gap" aria-hidden="true">…</span></li>';
    }).join('') + '</ol>' + step(next, page + 1, page === total, 'next') + '<p class="k-pagination__status" role="status">Page ' + page + ' sur ' + total + '</p>';
    fit(nav);
  }
  function fit(nav) {
    nav.classList.remove('k-pagination--compact');
    if (nav.scrollWidth > nav.clientWidth + 1 || nav.offsetHeight > nav.querySelector('.k-pagination__step').offsetHeight * 2.2) nav.classList.add('k-pagination--compact');
  }
  function set(nav, page, focus) {
    var rel = focus && focus.dataset ? focus.dataset.kRel : null, wasPage = focus && focus.classList.contains('k-pagination__page');
    nav.dataset.kPage = page;
    render(nav);
    // Le focus ne se perd pas : il revient au même bouton, ou à la page courante si ce bouton vient d'être désactivé
    var target = rel ? nav.querySelector('[data-k-rel="' + rel + '"]:not([aria-disabled])') : null;
    if (focus) (target || nav.querySelector('[aria-current="page"]') || nav).focus();
    if (wasPage && nav.classList.contains('k-pagination--compact')) nav.querySelector('.k-pagination__step:not([aria-disabled])').focus();
    nav.dispatchEvent(new CustomEvent('k-pagination:change', { bubbles: true, detail: { page: +page } }));
  }
  function init(scope) {
    (scope || document).querySelectorAll('.k-pagination[data-k-pages]').forEach(function (nav) {
      if (nav.dataset.kReady) return;
      nav.dataset.kReady = '1';
      render(nav);
      nav.addEventListener('click', function (e) {
        var b = e.target.closest('[data-k-go]');
        if (!b || b.getAttribute('aria-disabled') === 'true' || b.getAttribute('aria-current') === 'page') return;
        set(nav, +b.dataset.kGo, b);
      });
      if ('ResizeObserver' in window) new ResizeObserver(function () { fit(nav); }).observe(nav.parentElement || nav);
      if (document.fonts) document.fonts.ready.then(function () { if (nav.isConnected) fit(nav); });   // les polices changent la largeur des numéros
    });
  }
  Kobo.pagination = { init: init, set: function (nav, page) { set(nav, page, null); }, pages: pages };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(); }); else init();
})();
