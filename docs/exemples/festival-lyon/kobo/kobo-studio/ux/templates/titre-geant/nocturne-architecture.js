// kobo-studio — titre géant, habillage nocturne-architecture : le surtitre de chaque section devient le mot géant coupé.
(function () {
  'use strict';
  var g = Kobo.templates.families.titreGeant({ words: 1 });
  Kobo.templates.register({ skill: 'nocturne-architecture', family: 'titre-geant', slot: 'title', render: g.render, mount: g.mount });
})();
