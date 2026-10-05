// kobo-studio — héros photo, habillage glass-frame-estate : photo encadrée, un mot en grand derrière le voile.
// Le mot : data-k-word sur le <h1> du héros (choisi exprès), sinon le premier mot de la marque lu dans la barre.
(function () {
  'use strict';
  var g = Kobo.templates.families.heroPhoto({
    variant: 'frame',
    extra: function (box) {
      var brand = document.querySelector('.k-nav__brand'), h1 = box.querySelector('h1');
      var word = (h1 && h1.getAttribute('data-k-word')) || (brand ? brand.textContent : '').trim().split(/\s+/)[0];
      if (!word) return;
      var w = document.createElement('span'); w.className = 'g-hero__bigword'; w.setAttribute('aria-hidden', 'true'); w.textContent = word;
      box.insertBefore(w, box.querySelector('.g-hero__content'));
    }
  });
  Kobo.templates.register({ skill: 'glass-frame-estate', family: 'hero-photo', slot: 'hero', render: g.render, mount: g.mount });
})();
