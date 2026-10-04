// kobo-studio — cadre de page, habillage sticker-brutal-jp : un bord d'encre épais à coins ronds, sans rail ni barre.
(function () {
  'use strict';
  var g = Kobo.templates.families.cadre({});
  Kobo.templates.register({ skill: 'sticker-brutal-jp', family: 'cadre', slot: 'frame', render: g.render, mount: g.mount });
})();
