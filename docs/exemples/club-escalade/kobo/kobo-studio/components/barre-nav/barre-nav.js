/*
 * kobo-studio — barre de navigation : repli des liens quand ils ne tiennent plus.
 * Sans dépendance, sans point de rupture : on mesure. Quand la liste déborde, la barre reçoit
 * data-k-collapsed ; la CSS cache alors les liens et montre le bouton de menu (voir menu-mobile).
 * Si la marque ne tient pas non plus à côté de ce bouton, la barre reçoit data-k-brand="long" : la marque passe à la ligne.
 * S'active seul sur les .k-nav ; pour du contenu ajouté ensuite : Kobo.nav.init(conteneur).
 */
(function () {
  'use strict';
  var Kobo = (window.Kobo = window.Kobo || {});

  function fit(nav) {
    nav.removeAttribute('data-k-collapsed');          // on mesure la barre dépliée…
    nav.removeAttribute('data-k-brand');
    var brand = nav.querySelector('.k-nav__brand'), natural = brand ? brand.offsetWidth : 0;   // la marque sur une ligne
    var overflow = nav.scrollWidth > nav.clientWidth + 1;
    if (!overflow) return;
    nav.setAttribute('data-k-collapsed', '');         // …et on replie si elle déborde
    // Repliée, la marque ne tient toujours pas à côté du bouton de menu : elle passe à la ligne, en plus petit (jamais tronquée)
    if (brand && natural > brand.offsetWidth + 1) nav.setAttribute('data-k-brand', 'long');
  }

  function init(root) {
    (root || document).querySelectorAll('.k-nav').forEach(function (nav) {
      if (nav.dataset.kReady !== undefined) return;
      nav.setAttribute('data-k-ready', '');
      var pending = 0;
      var schedule = function () { cancelAnimationFrame(pending); pending = requestAnimationFrame(function () { fit(nav); }); };
      if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(nav.parentElement || nav);
      else window.addEventListener('resize', schedule);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule); // la police change la largeur des liens
      fit(nav);
    });
  }

  Kobo.nav = { init: init, fit: fit };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(); }); else init();
})();
