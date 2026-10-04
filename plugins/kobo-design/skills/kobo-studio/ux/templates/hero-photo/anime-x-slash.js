// kobo-studio — héros photo, habillage anime-x-slash : la photo du héros découpée en cinq éclats biaisés.
// Chaque éclat montre sa part de la même image (copie décorative, alt vide) ; l'<img> d'origine reste, masquée, pour son texte alternatif.
(function () {
  'use strict';
  var F = Kobo.templates.families;
  F.entree = F.entree || function (box, ctx) {
    if (ctx.still) return;
    box.setAttribute('data-k-in', 'pending');
    requestAnimationFrame(function () { box.setAttribute('data-k-motion', ''); requestAnimationFrame(function () { box.setAttribute('data-k-in', 'done'); }); });
  };
  var COUNT = 5;
  var g = F.heroPhoto({
    variant: 'shards',
    layers: function (rig) {
      var img = rig.querySelector('img');
      for (var i = 0; i < COUNT; i++) {
        var shard = document.createElement('div'); shard.className = 'g-shard'; shard.setAttribute('aria-hidden', 'true');
        shard.style.setProperty('--_n', i); shard.style.setProperty('--_count', COUNT);
        var copy = img.cloneNode(false); copy.alt = ''; copy.removeAttribute('data-k-focus'); shard.appendChild(copy);
        rig.appendChild(shard);
      }
    },
    mount: function (box, ctx) { F.entree(box, ctx); return null; }
  });
  Kobo.templates.register({ skill: 'anime-x-slash', family: 'hero-photo', slot: 'hero', render: g.render, mount: g.mount });
})();
