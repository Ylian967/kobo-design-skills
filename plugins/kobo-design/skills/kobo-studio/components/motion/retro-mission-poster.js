// kobo-studio — couche mouvement de retro-mission-poster : titres qui montent derrière un cache, faits qui arrivent de la gauche.
(function () {
  'use strict';
  Kobo.motion.register('retro-mission-poster', function (m) {
    m.each('.k-nav__list > li', function (li, i) { li.style.setProperty('--_i', i); });
    m.reveal('.k-section .k-h2, [data-k-slot="finale"] .k-h2, .sv-inner-hero .k-h1', 'mask', { hero: true });
    m.wordsOr('.k-h2, .k-h1', 'rise');
    m.reveal('.k-section .k-kicker', 'fade');
    m.reveal('.k-facts > div', 'left');
    m.reveal('[data-k-slot="grid"] > *, figure[data-k-slot="media"], .k-split > img, .k-section .k-lead, .k-prose > *, .k-note, [data-k-slot="finale"] .k-lead, [data-k-slot="finale"] .k-btn', 'rise');
  });
})();
