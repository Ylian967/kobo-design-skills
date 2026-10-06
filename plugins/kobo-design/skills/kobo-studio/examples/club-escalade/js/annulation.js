/* Les Dalles — fenêtre de confirmation d'une annulation (composant modale du kit, <dialog id="annuler">). */
(function () {
  'use strict';

  var fenetre = document.getElementById('annuler');
  var texte = document.getElementById('annuler-texte');
  var suite = null;

  fenetre.addEventListener('close', function () {
    var oui = fenetre.returnValue === 'annule';
    var f = suite;
    suite = null;
    if (oui && f) f();
  });

  /* Ouvre la fenêtre avec la phrase qui redit ce qu'on annule ; appelle siOui si la personne confirme. */
  Dalles.demanderAnnulation = function (phrase, siOui) {
    texte.textContent = phrase;
    suite = siOui;
    fenetre.returnValue = '';
    fenetre.showModal();
  };
})();
