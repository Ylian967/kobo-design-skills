// kobo-studio — héros photo, habillage chrome-atelier : héros nuit, photo à droite sous son voile, cercles et axes de cadrage.
(function () {
  'use strict';
  var F = Kobo.templates.families;
  F.entree = F.entree || function (box, ctx) {
    if (ctx.still) return;
    box.setAttribute('data-k-in', 'pending');
    requestAnimationFrame(function () { box.setAttribute('data-k-motion', ''); requestAnimationFrame(function () { box.setAttribute('data-k-in', 'done'); }); });
  };
  var g = F.heroPhoto({ variant: 'guides', extra: null, mount: function (box, ctx) { F.entree(box, ctx); return null; } });
  Kobo.templates.register({ skill: 'chrome-atelier', family: 'hero-photo', slot: 'hero', render: g.render, mount: g.mount });
})();
