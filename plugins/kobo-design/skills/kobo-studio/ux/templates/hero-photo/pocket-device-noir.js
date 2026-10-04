// kobo-studio — héros photo, habillage pocket-device-noir : texte centré en bas, mots du titre qui montent à l'ouverture.
(function () {
  'use strict';
  var F = Kobo.templates.families;
  // Découpe un titre en mots qui montent (décor : le titre garde son texte par aria-label)
  F.motsMontants = function (h) {
    var text = h.textContent.trim(); h.setAttribute('aria-label', text); h.textContent = '';
    text.split(/\s+/).forEach(function (w, i) {
      var s = document.createElement('span'); s.className = 'g-rise'; s.setAttribute('aria-hidden', 'true');
      var b = document.createElement('b'); b.textContent = w; b.style.setProperty('--_i', i); s.appendChild(b);
      h.appendChild(s); h.appendChild(document.createTextNode(' '));
    });
  };
  F.entree = function (box, ctx) {            // pose l'état d'attente puis lance l'entrée ; sans mouvement : rien
    if (ctx.still) return;
    box.setAttribute('data-k-in', 'pending');
    requestAnimationFrame(function () { box.setAttribute('data-k-motion', ''); requestAnimationFrame(function () { box.setAttribute('data-k-in', 'done'); }); });
  };
  var g = F.heroPhoto({ variant: 'pocket', extra: function (box) { var h = box.querySelector('h1'); if (h) F.motsMontants(h); }, mount: function (box, ctx) { F.entree(box, ctx); return null; } });
  Kobo.templates.register({ skill: 'pocket-device-noir', family: 'hero-photo', slot: 'hero', render: g.render, mount: g.mount });
})();
