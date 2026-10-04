// kobo-studio — héros photo, habillage cosmic-voyage : photo plein écran entre deux voiles de nuit, titre en haut à gauche, action centrée en bas.
(function () {
  'use strict';
  var F = Kobo.templates.families;
  F.entree = F.entree || function (box, ctx) {
    if (ctx.still) return;
    box.setAttribute('data-k-in', 'pending');
    requestAnimationFrame(function () { box.setAttribute('data-k-motion', ''); requestAnimationFrame(function () { box.setAttribute('data-k-in', 'done'); }); });
  };
  var g = F.heroPhoto({ variant: 'cosmic', extra: null, mount: function (box, ctx) { F.entree(box, ctx); return null; } });
  Kobo.templates.register({ skill: 'cosmic-voyage', family: 'hero-photo', slot: 'hero', render: g.render, mount: g.mount });
})();
