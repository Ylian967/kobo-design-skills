// kobo-studio — cadre de page, habillage retro-mission-poster : un bord crème épais, sans rail ni barre.
(function () {
  'use strict';
  var g = Kobo.templates.families.cadre({});
  Kobo.templates.register({ skill: 'retro-mission-poster', family: 'cadre', slot: 'frame', render: g.render, mount: g.mount });
})();
