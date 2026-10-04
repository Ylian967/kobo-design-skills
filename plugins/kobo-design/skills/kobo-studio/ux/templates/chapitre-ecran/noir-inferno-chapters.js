// kobo-studio — chapitre plein écran, habillage noir-inferno-chapters : chaque chapitre du récit devient une scène à cercle à tirer.
(function () {
  'use strict';
  var g = Kobo.templates.families.chapitreEcran({ next: 'Chapitre suivant', last: 'Suite du récit' });
  Kobo.templates.register({ skill: 'noir-inferno-chapters', family: 'chapitre-ecran', slot: 'chapter', render: g.render, mount: g.mount });
})();
