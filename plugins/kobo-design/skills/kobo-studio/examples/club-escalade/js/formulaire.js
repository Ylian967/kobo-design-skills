/* Les Dalles — gestes communs aux formulaires : vérifier à l'envoi, bouton occupé, afficher le mot de passe. */
(function () {
  'use strict';

  var ATTENTE = 500; // durée de l'envoi simulé, en millisecondes

  /* Vérifie tous les champs ; met le focus sur le premier en erreur. Rend true si tout est juste. */
  function verifier(form) {
    var premier = null;
    form.querySelectorAll('.k-field[data-k-validate]').forEach(function (champ) {
      Kobo.field.validate(champ);
      var controle = champ.querySelector('.k-field__control');
      if (!controle.validity.valid && !premier) premier = controle;
    });
    form.querySelectorAll('.k-radio-group').forEach(function (groupe) {
      var boutons = groupe.querySelectorAll('.k-radio__input:not(:disabled)');
      var choisi = groupe.querySelector('.k-radio__input:checked');
      var erreur = groupe.querySelector('.k-radio-group__error');
      boutons.forEach(function (b) { b.setAttribute('aria-invalid', choisi ? 'false' : 'true'); });
      erreur.hidden = !!choisi;
      if (choisi) groupe.removeAttribute('aria-describedby'); else groupe.setAttribute('aria-describedby', erreur.id);
      if (!choisi && !premier) premier = boutons[0];
    });
    if (premier) premier.focus();
    return !premier;
  }

  /* Une erreur de choix se corrige dès qu'on choisit. */
  document.addEventListener('change', function (e) {
    var groupe = e.target.closest('.k-radio-group');
    if (!groupe) return;
    groupe.querySelectorAll('.k-radio__input').forEach(function (b) { b.removeAttribute('aria-invalid'); });
    groupe.querySelector('.k-radio-group__error').hidden = true;
  });

  /* Envoi simulé : le bouton dit ce qui se passe, un second clic est ignoré, hors ligne c'est un échec. */
  function envoyer(bouton, libelle, siReussi, siEchec) {
    if (bouton.getAttribute('aria-busy') === 'true') return;
    var repos = bouton.textContent;
    bouton.setAttribute('aria-busy', 'true');
    bouton.textContent = libelle;
    setTimeout(function () {
      bouton.removeAttribute('aria-busy');
      bouton.textContent = repos;
      if (navigator.onLine === false) siEchec(); else siReussi();
    }, ATTENTE);
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-dalles-voir]');
    if (!b) return;
    var champ = document.getElementById(b.getAttribute('data-dalles-voir'));
    var cache = champ.type === 'password';
    champ.type = cache ? 'text' : 'password';
    b.textContent = cache ? 'Masquer le mot de passe' : 'Afficher le mot de passe';
  });

  Dalles.form = { verifier: verifier, envoyer: envoyer };
})();
