// kobo-studio — couche mouvement de hold-to-play-music : mots qui se rangent, blocs en coupe franche, pochettes qui montent.
(function () {
  'use strict';
  Kobo.motion.register('hold-to-play-music', function (m) {
    m.each('.k-nav__list > li', function (li, i) { li.style.setProperty('--_i', i); });
    m.reveal('.k-section .k-h2, [data-k-slot="finale"] .k-h2', 'paint');
    m.wordsOr('.k-h2', 'cut');
    // Chaque mot part d'une place et d'un angle tirés une fois (les traits dispersés du mot peint)
    m.each('[data-k-reveal="paint"] .k-m-word > span', function (w) {
      if (w.style.getPropertyValue('--_x')) return;
      w.style.setProperty('--_x', (Math.random() * 4 - 2).toFixed(2)); w.style.setProperty('--_y', (Math.random() * 2 - 1).toFixed(2));
      w.style.setProperty('--_r', (Math.random() * 28 - 14).toFixed(1));
    });
    m.reveal('figure[data-k-slot="media"], .k-split > img, .k-card', 'push');
    m.reveal('[data-k-slot="grid"] > *, .k-section .k-kicker, .k-section .k-lead, .k-prose > *, .k-facts > div, .k-note, .k-tabs, [data-k-slot="finale"] .k-lead, [data-k-slot="finale"] form', 'cut');
    m.inview('[data-k-slot="finale"] .k-btn');
  });
})();
