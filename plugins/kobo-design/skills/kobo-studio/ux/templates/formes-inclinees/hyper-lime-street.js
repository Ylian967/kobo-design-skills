// kobo-studio — formes inclinées, habillage hyper-lime-street : chaque chapitre du récit devient une section à formes penchées.
(function () {
  'use strict';
  var g = Kobo.templates.families.formesInclinees();
  Kobo.templates.register({ skill: 'hyper-lime-street', family: 'formes-inclinees', slot: 'chapter', render: g.render, mount: g.mount });
})();
