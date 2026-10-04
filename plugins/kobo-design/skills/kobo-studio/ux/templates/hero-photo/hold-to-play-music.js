// kobo-studio — héros photo, habillage hold-to-play-music : écran unique, mot géant et touche au centre.
(function () {
  'use strict';
  var F = Kobo.templates.families;
  F.entree = F.entree || function (box, ctx) {
    if (ctx.still) return;
    box.setAttribute('data-k-in', 'pending');
    requestAnimationFrame(function () { box.setAttribute('data-k-motion', ''); requestAnimationFrame(function () { box.setAttribute('data-k-in', 'done'); }); });
  };
  var g = F.heroPhoto({ variant: 'single', extra: null, mount: function (box, ctx) { F.entree(box, ctx); return null; } });
  Kobo.templates.register({ skill: 'hold-to-play-music', family: 'hero-photo', slot: 'hero', render: g.render, mount: g.mount });
})();
