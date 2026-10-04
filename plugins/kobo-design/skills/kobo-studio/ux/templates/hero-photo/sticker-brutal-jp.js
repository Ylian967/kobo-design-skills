// kobo-studio — héros photo, habillage sticker-brutal-jp : texte à gauche, photo-autocollant penchée à droite.
(function () {
  'use strict';
  var F = Kobo.templates.families;
  F.entree = F.entree || function (box, ctx) {
    if (ctx.still) return;
    box.setAttribute('data-k-in', 'pending');
    requestAnimationFrame(function () { box.setAttribute('data-k-motion', ''); requestAnimationFrame(function () { box.setAttribute('data-k-in', 'done'); }); });
  };
  var g = F.heroPhoto({ variant: 'split', extra: null, mount: function (box, ctx) { F.entree(box, ctx); return null; } });
  Kobo.templates.register({ skill: 'sticker-brutal-jp', family: 'hero-photo', slot: 'hero', render: g.render, mount: g.mount });
})();
