// kobo-studio — couche mouvement de nocturne-architecture : blocs qui montent, phrase qui s'allume au défilement, chiffres qui comptent.
(function () {
  'use strict';
  Kobo.motion.register('nocturne-architecture', function (m) {
    m.each('.k-nav__list > li', function (li, i) { li.style.setProperty('--_i', i); });
    // Grande phrase : le titre de section, mot à mot, du gris au blanc pendant qu'il traverse l'écran
    m.reveal('.k-section .k-h2, [data-k-slot="finale"] .k-h2', 'phrase');
    m.wordsOr('.k-h2', 'rise');
    m.each('[data-k-reveal="phrase"]', function (h) {
      if (h._kPhrase) return;
      h._kPhrase = true;
      var boxes = h.querySelectorAll('.k-m-word'), lit = -1;
      m.tick(h, function () {
        var p = (window.innerHeight * 0.85 - h.getBoundingClientRect().top) / (window.innerHeight * 0.5);
        var n = Math.round(Math.min(1, Math.max(0, p)) * boxes.length);
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) n = boxes.length;   // bas de page : un titre qui ne peut pas monter plus haut s'allume en entier
        if (n === lit) return;                                // on ne touche aux mots que si leur nombre allumé change
        lit = n;
        for (var i = 0; i < boxes.length; i++) boxes[i].toggleAttribute('data-k-lit', i < n);
      });
    });
    m.reveal('.k-facts dd', 'count', { seen: function (el) { m.count(el, 1500); } });
    m.reveal('[data-k-slot="grid"] > *, figure[data-k-slot="media"], .k-split > img, .k-section .k-lead, .k-prose > *, .k-facts > div, .k-note, .k-tabs, [data-k-slot="finale"] .k-lead, [data-k-slot="finale"] form, [data-k-slot="finale"] .k-btn', 'rise');
  });
})();
