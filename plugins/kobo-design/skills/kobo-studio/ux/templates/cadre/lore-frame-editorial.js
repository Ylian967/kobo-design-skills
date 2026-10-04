// kobo-studio — cadre de page, habillage lore-frame-editorial : le signe en étoile du rail (repris de la démo du skill) et le compteur de sections.
(function () {
  'use strict';
  var star = '<svg class="g-frame__sign" viewBox="0 0 40 74" aria-hidden="true"><path d="M19 0h2v26h-2zM19 48h2v26h-2zM0 36h13v2H0zM27 36h13v2H27zM15 28h2v18h-2zM23 28h2v18h-2zM17 26h6v2h-6zM17 46h6v2h-6z"/></svg>';
  var g = Kobo.templates.families.cadre({ sign: star, count: true });
  Kobo.templates.register({ skill: 'lore-frame-editorial', family: 'cadre', slot: 'frame', render: g.render, mount: g.mount });
})();
