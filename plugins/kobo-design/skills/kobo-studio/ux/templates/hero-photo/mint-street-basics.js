// kobo-studio — héros photo, habillage mint-street-basics : photo dans l'arche, disques, titre géant dont les mots montent.
// Dépend de F.motsMontants et F.entree (hero-photo/pocket-device-noir.js les définit ; ils sont repris ici s'ils manquent).
(function () {
  'use strict';
  var F = Kobo.templates.families;
  F.motsMontants = F.motsMontants || function (h) {
    var text = h.textContent.trim(); h.setAttribute('aria-label', text); h.textContent = '';
    text.split(/\s+/).forEach(function (w, i) { var s = document.createElement('span'); s.className = 'g-rise'; s.setAttribute('aria-hidden', 'true'); var b = document.createElement('b'); b.textContent = w; b.style.setProperty('--_i', i); s.appendChild(b); h.appendChild(s); h.appendChild(document.createTextNode(' ')); });
  };
  F.entree = F.entree || function (box, ctx) {
    if (ctx.still) return;
    box.setAttribute('data-k-in', 'pending');
    requestAnimationFrame(function () { box.setAttribute('data-k-motion', ''); requestAnimationFrame(function () { box.setAttribute('data-k-in', 'done'); }); });
  };
  var g = F.heroPhoto({ variant: 'arch', extra: function (box) { var h = box.querySelector('h1'); if (h) F.motsMontants(h); }, mount: function (box, ctx) { F.entree(box, ctx); return null; } });
  Kobo.templates.register({ skill: 'mint-street-basics', family: 'hero-photo', slot: 'hero', render: g.render, mount: g.mount });
})();
