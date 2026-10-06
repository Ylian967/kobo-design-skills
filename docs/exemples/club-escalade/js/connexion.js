/* Les Dalles — page Connexion (simulée) : se connecter, revenir d'où l'on vient, demander un lien d'accès. */
(function () {
  'use strict';

  var form = document.getElementById('cx-form');
  var acces = document.getElementById('acces');
  var deja = document.getElementById('cx-deja');

  /* On ne suit qu'un retour vers une page de l'espace membre. */
  function retour() {
    var r = new URLSearchParams(location.search).get('retour') || '';
    return /^(creneaux|mes-reservations)\.html(\?jour=[0-9-]{10})?$/.test(r) ? r : 'creneaux.html';
  }

  function etat() {
    var m = Dalles.membre();
    deja.hidden = !m;
    form.hidden = !!m;
    acces.hidden = !!m;
    if (m) document.getElementById('cx-deja-nom').textContent = 'Vous êtes connecté : ' + m.nom + '.';
    else if (location.search.indexOf('retour=') >= 0) document.getElementById('cx-accroche').textContent = 'Connectez-vous pour continuer : vous reviendrez là où vous étiez. Derrière : les créneaux des sept prochains jours et vos réservations.';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!Dalles.form.verifier(form)) return;
    Dalles.form.envoyer(form.querySelector('[type="submit"]'), 'Connexion en cours…', function () {
      if (Dalles.connecter(form.email.value, form.mdp.value)) { location.href = retour(); return; }
      Kobo.field.setError(form.mdp.closest('.k-field'), 'Adresse ou mot de passe inconnus. Vérifiez-les ; l\'adresse saisie est gardée. Sinon, demandez un lien plus bas.');
      form.mdp.focus();
    }, function () {
      Dalles.dire({ type: 'error', title: 'Connexion impossible : pas de réseau', text: 'Votre adresse est gardée. Réessayez quand le réseau revient.' });
    });
  });

  acces.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!Dalles.form.verifier(acces)) return;
    document.getElementById('acces-etat').textContent = 'Si cette adresse est connue du club, un lien vient de partir. Simulation : aucun e-mail n\'est envoyé pour l\'instant.';
  });

  etat();
})();
