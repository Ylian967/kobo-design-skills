/*
 * kobo-studio — héros photo, habillage nocturne-architecture : le premier mot de la marque, géant, en bas du héros.
 * Le mot géant est un décor (aria-hidden) : le <h1> de la page reste le titre, à sa place dans le texte du héros.
 */
(function () {
  'use strict';
  var F = Kobo.templates.families;
  var g = F.heroPhoto({
    variant: 'word',
    extra: function (box) {
      var brand = document.querySelector('.k-nav__brand'), word = (brand ? brand.textContent : '').trim().split(/\s+/)[0];
      if (!word) return;
      var holder = document.createElement('div'); holder.className = 'g-hero__word';
      holder.appendChild(F.motGeant(word.toLowerCase())); box.appendChild(holder);
    },
    mount: function (box, ctx) {
      var giant = box.querySelector('.g-word__giant'), stop = giant ? F.ajusterMot(giant, box.querySelector('.g-hero__word')) : null;
      if (!ctx.still) {
        box.setAttribute('data-k-in', 'pending');
        requestAnimationFrame(function () { box.setAttribute('data-k-motion', ''); requestAnimationFrame(function () { box.setAttribute('data-k-in', 'done'); }); });
      }
      return function () { if (stop) stop(); };
    }
  });
  Kobo.templates.register({ skill: 'nocturne-architecture', family: 'hero-photo', slot: 'hero', render: g.render, mount: g.mount });
})();
