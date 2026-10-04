// kobo-studio — héros photo, habillage serif-bistro-green : grand titre, photo dans une arche qui remonte dans le titre.
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
  var g = F.heroPhoto({ variant: 'bistro', extra: null, mount: function (box, ctx) { F.entree(box, ctx); return null; } });
  Kobo.templates.register({ skill: 'serif-bistro-green', family: 'hero-photo', slot: 'hero', render: g.render, mount: g.mount });
})();
