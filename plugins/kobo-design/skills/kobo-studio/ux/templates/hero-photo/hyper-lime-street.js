/*
 * kobo-studio — héros photo, habillage hyper-lime-street : visuel clé encadré, titre posé dessus, autocollants.
 * L'action du héros devient l'autocollant blanc (elle reste un lien-bouton) ; le nom de la marque devient l'autocollant noir
 * et le mot vertical, tous deux décoratifs (le nom reste lisible dans la barre de navigation).
 */
(function () {
  'use strict';
  var g = Kobo.templates.families.heroPhoto({
    variant: 'key',
    extra: function (box) {
      var rig = box.querySelector('.g-hero__rig'), h1 = box.querySelector('h1'), action = box.querySelector('.g-hero__content .k-btn');
      var brand = document.querySelector('.k-nav__brand'), name = brand ? brand.textContent.trim() : '';
      if (h1) rig.appendChild(h1);
      if (action) { action.classList.add('g-sticker--get'); box.insertBefore(action, rig.nextSibling); }   // après le titre, dans l'ordre de lecture
      if (name) {
        box.insertAdjacentHTML('afterbegin', '<span class="g-hero__filmclip" aria-hidden="true"><span class="g-hero__film"></span></span><span class="g-hero__mark" aria-hidden="true"></span><span class="g-sticker g-sticker--logo" aria-hidden="true"></span>');
        box.querySelector('.g-hero__mark').textContent = name;
        box.querySelector('.g-sticker--logo').textContent = name.split(/\s+/).map(function (w) { return w.charAt(0); }).join('·');
      }
    }
  });
  Kobo.templates.register({ skill: 'hyper-lime-street', family: 'hero-photo', slot: 'hero', render: g.render, mount: g.mount });
})();
