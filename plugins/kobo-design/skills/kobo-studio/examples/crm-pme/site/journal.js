/*
 * Rivage Suivi — le dernier changement et son annulation.
 * Chaque geste qui modifie une affaire passe par Rivage.noter : le changement reste écrit
 * au-dessus de la liste et dans le panneau de détail, avec « Annuler ce changement ».
 * Pas de notification flottante : elle recouvrait le panneau où l'on travaille.
 */
(function () {
  'use strict';
  var R = window.Rivage;
  if (!R) return;

  var blocs = R.ap.querySelectorAll('[data-rs-dernier]');
  var panneau = document.getElementById('ap-detail');
  var enCours = null;      // { phrase, annuler }

  function ecrire(texte, annulable) {
    blocs.forEach(function (bloc) {
      bloc.hidden = false;
      bloc.querySelector('[data-rs-dernier-texte]').textContent = texte;
      bloc.querySelector('[data-rs-annuler]').hidden = !annulable;
    });
  }

  function annuler() {
    if (!enCours) return;
    var fait = enCours;
    enCours = null;
    fait.annuler();
    R.rafraichir();
    ecrire('Annulé : ' + fait.phrase.replace(' Elle a quitté la liste affichée.', ''), false);
    // Le bouton vient de disparaître : le focus va au titre du détail s'il est ouvert, sinon à la liste.
    if (panneau.hidden) R.table.focus(); else panneau.querySelector('.ap-detail__title').focus();
  }

  /*
   * titre : court (« Étape changée ») ; phrase : l'affaire, sa société et ce qui a changé ;
   * defaire : fonction qui remet l'état d'avant, ou rien si le geste ne se défait pas.
   */
  R.noter = function (titre, phrase, defaire) {
    enCours = defaire ? { phrase: phrase, annuler: defaire } : null;
    ecrire(titre + '. ' + phrase + (defaire ? '' : ' Ce geste ne s\'annule pas.') + ' (Démonstration : rien n\'est enregistré.)', !!defaire);
  };

  R.ap.addEventListener('click', function (e) { if (e.target.closest('[data-rs-annuler]')) annuler(); });
})();
