// kobo-studio — héros photo, habillage glass-frame-estate : photo encadrée, premier mot de la marque en grand derrière le voile.
(function () {
  'use strict';
  var g = Kobo.templates.families.heroPhoto({
    variant: 'frame',
    extra: function (box) {
      var brand = document.querySelector('.k-nav__brand'), word = (brand ? brand.textContent : '').trim().split(/\s+/)[0];
      if (!word) return;
      var w = document.createElement('span'); w.className = 'g-hero__bigword'; w.setAttribute('aria-hidden', 'true'); w.textContent = word;
      box.insertBefore(w, box.querySelector('.g-hero__content'));
    }
  });
  Kobo.templates.register({ skill: 'glass-frame-estate', family: 'hero-photo', slot: 'hero', render: g.render, mount: g.mount });
})();
