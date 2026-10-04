// kobo-studio — héros photo, habillage zigzag-snack-pop : fond orange, titre géant dont les mots sautent en place, photo-autocollant penchée.
(function () {
  'use strict';
  var F = Kobo.templates.families;
  F.motsMontants = F.motsMontants || function (h, parLigne) {
    var text = h.textContent.trim(); h.setAttribute('aria-label', text); h.textContent = '';
    text.split(/\s+/).forEach(function (w, i) { var s = document.createElement('span'); s.className = 'g-rise'; s.setAttribute('aria-hidden', 'true'); var b = document.createElement('b'); b.textContent = w; b.style.setProperty('--_i', i); s.appendChild(b); h.appendChild(s); h.appendChild(document.createTextNode(' ')); });
  };
  F.entree = F.entree || function (box, ctx) {
    if (ctx.still) return;
    box.setAttribute('data-k-in', 'pending');
    requestAnimationFrame(function () { box.setAttribute('data-k-motion', ''); requestAnimationFrame(function () { box.setAttribute('data-k-in', 'done'); }); });
  };
  var g = F.heroPhoto({ variant: 'pack', extra: function (box) { var h = box.querySelector('h1'); if (h) F.motsMontants(h); }, mount: function (box, ctx) { F.entree(box, ctx); return null; } });
  Kobo.templates.register({ skill: 'zigzag-snack-pop', family: 'hero-photo', slot: 'hero', render: g.render, mount: g.mount });
})();
