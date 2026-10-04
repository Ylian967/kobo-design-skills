// kobo-studio — héros photo, habillage alpine-glass-expedition : photo plein cadre, voile diagonal, titre géant en bas.
(function () {
  'use strict';
  var g = Kobo.templates.families.heroPhoto({ variant: 'alpine' });
  Kobo.templates.register({ skill: 'alpine-glass-expedition', family: 'hero-photo', slot: 'hero', render: g.render, mount: g.mount });
})();
