// kobo-studio — couche mouvement de lore-frame-editorial : décodage des libellés, titres révélés au défilement, texte tapé,
// planches qui se plient avec la vitesse.
(function () {
  'use strict';
  var GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  Kobo.motion.register('lore-frame-editorial', function (m) {
    var tick = m.ms('--k-sig-dur-scramble-tick', 40);
    var decode = function (el) { m.scramble(el, GLYPHS, { tick: tick, rounds: 3 }); };
    // 3. Décodage : surtitres à l'entrée à l'écran ; liens de la barre et boutons au survol et au focus
    m.reveal('.k-section .k-kicker, .k-card__meta', 'decode', { seen: decode });
    m.each('.k-nav__link, .k-btn:not(.k-btn--icon, .k-skip), .k-menu__link', function (el) {
      if (el._kDecode) return;
      el._kDecode = true;
      el.addEventListener('pointerenter', function () { decode(el); });
      el.addEventListener('focus', function () { decode(el); });
    });
    if (!document.documentElement._kLoreNav) {             // à l'ouverture, la barre se décode lien après lien
      document.documentElement._kLoreNav = true;
      m.each('.k-nav__link', function (el, i) { setTimeout(function () { decode(el); }, 60 * i + 200); });
    }
    // 4. Titres : mot à mot, du gris à l'encre, pendant qu'ils traversent l'écran
    m.reveal('.k-section .k-h2, [data-k-slot="finale"] .k-h2', 'phrase');
    m.wordsOr('.k-h2', 'wipe');
    m.each('[data-k-reveal="phrase"]', function (h) {
      if (h._kPhrase) return;
      h._kPhrase = true;
      var boxes = h.querySelectorAll('.k-m-word'), lit = -1;
      m.tick(h, function () {
        var p = (window.innerHeight * 0.85 - h.getBoundingClientRect().top) / (window.innerHeight * 0.5);
        var n = Math.round(Math.min(1, Math.max(0, p)) * boxes.length);
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) n = boxes.length;   // bas de page : un titre qui ne peut pas monter plus haut s'allume en entier
        if (n === lit) return;
        lit = n;
        for (var i = 0; i < boxes.length; i++) boxes[i].toggleAttribute('data-k-lit', i < n);
      });
    });
    // 5. Texte tapé : la phrase d'appui d'une section
    m.reveal('.k-section .k-lead', 'type', { seen: function (el) { m.type(el, 18); } });
    // 6. Planches : pliées par la vitesse du défilement, une sur deux dans l'autre sens
    m.each('figure[data-k-slot="media"] img, .k-split > img', function (img, i) {
      if (img.hasAttribute('data-k-bend')) return;
      img.setAttribute('data-k-bend', ''); img.style.setProperty('--_side', i % 2 ? 1 : -1);
      var last = 0;
      m.tick(img, function (now, api) {
        var v = Math.max(-60, Math.min(60, api.velocity));
        if (Math.abs(v - last) < 0.3) return;                 // on n'écrit la variable que si elle change vraiment
        last = v; img.style.setProperty('--_bend', v.toFixed(1));
      });
    });
    m.reveal('[data-k-slot="grid"] > *, figure[data-k-slot="media"], .k-prose > *, .k-facts > div, .k-note, .k-tabs, [data-k-slot="finale"] .k-lead, [data-k-slot="finale"] form, [data-k-slot="finale"] .k-btn', 'wipe');
  });
})();
