// kobo-studio — couche mouvement de serif-bistro-green : mots des titres derrière un cache, blocs qui montent, photos en arche.
(function () {
  'use strict';
  Kobo.motion.register('serif-bistro-green', function (m) {
    m.each('.k-nav__list > li', function (li, i) { li.style.setProperty('--_i', i); });
    m.reveal('.k-section .k-h2, [data-k-slot="finale"] .k-h2, .sv-inner-hero .k-h1', 'mask', { hero: true });
    m.wordsOr('.k-h2, .k-h1', 'rise');
    m.reveal('figure[data-k-slot="media"], .k-split > img', 'arch');
    m.reveal('[data-k-slot="grid"] > *, .k-section .k-kicker, .k-section .k-lead, .k-prose > *, .k-facts > div, .k-note, [data-k-slot="finale"] .k-lead, [data-k-slot="finale"] .k-btn, .k-section .k-wrap > .k-btn', 'rise');
  });
})();
