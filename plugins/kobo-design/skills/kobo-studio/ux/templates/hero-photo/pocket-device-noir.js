// kobo-studio — héros photo, habillage pocket-device-noir : l'appareil 3D au centre de la photo, texte centré dessous, mots du titre qui montent à l'ouverture.
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
  // L'appareil en 3D (famille « objet », objet/pocket-device-noir.js) se pose au-dessus du texte ; s'il ne peut pas se monter, le héros reste entier
  var model = function () { return F.objet && F.objet.models['pocket-device-noir']; };
  var g = F.heroPhoto({ variant: 'pocket',
    extra: function (box) {
      var h = box.querySelector('h1'); if (h) F.motsMontants(h);
      if (!model()) return;
      var top = document.createElement('div'); top.className = 'g-hero__object'; top.innerHTML = F.objet.html(model().label);
      box.insertBefore(top, box.querySelector('.g-hero__content'));
    },
    mount: function (box, ctx) {
      F.entree(box, ctx);
      var stage = box.querySelector('.g-obj__stage');
      return stage ? F.objet.mount(stage, box.querySelector('.g-obj__turn'), model(), ctx) : null;
    } });
  Kobo.templates.register({ skill: 'pocket-device-noir', family: 'hero-photo', slot: 'hero', render: g.render, mount: g.mount });
})();
