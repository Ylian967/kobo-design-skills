/*
 * kobo-studio — structure « landing produit » : le choix d'une date ouvre l'envoi ; le formulaire valide, envoie, confirme.
 * Dépend de components/champ/champ.js et components/notification/notification.js. L'envoi est simulé :
 * remplacer send() par l'appel réel, qui doit rendre une promesse (résolue = succès, rejetée = échec).
 */
(function () {
  'use strict';
  var form = document.getElementById('form'), button = document.getElementById('envoyer');
  var hint = document.getElementById('envoi-aide'), status = document.getElementById('date-choisie');
  var date = '';

  // Démonstration : ajouter ?echec à l'adresse pour voir l'échec d'envoi (landing-produit.html?echec#<skill>)
  var fails = /[?&]echec\b/.test(location.search);
  function send() { return new Promise(function (resolve, reject) { setTimeout(fails ? reject : resolve, 1400); }); }

  document.addEventListener('change', function (e) {
    if (e.target.name !== 'date') return;
    date = e.target.value;
    status.textContent = 'Date choisie : ' + date + '.';
    button.removeAttribute('aria-disabled'); button.removeAttribute('aria-describedby'); hint.hidden = true;
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (button.getAttribute('aria-busy') === 'true') return;
    if (!date) { hint.focus(); return; }                       // le bouton reste atteignable au clavier : il dit pourquoi il n'envoie pas
    var fields = Array.prototype.slice.call(form.querySelectorAll('.k-field'));
    var bad = fields.filter(function (f) { return !Kobo.field.validate(f); });
    if (bad.length) { bad[0].querySelector('.k-field__control').focus(); return; }
    var label = button.querySelector('span:last-child'), old = label.textContent;
    button.setAttribute('aria-busy', 'true'); label.textContent = 'Envoi en cours…';
    send().then(function () {
      Kobo.toast({ type: 'success', title: 'Demande envoyée', text: 'Pour le ' + date + '. Le guide vous répond sous deux jours.', returnFocus: button });
      form.reset();
    }, function () {
      Kobo.toast({ type: 'error', title: 'La demande n’est pas partie', text: 'Le serveur n’a pas répondu. Vos réponses sont gardées : réessayez.', returnFocus: button });
    }).then(function () { button.removeAttribute('aria-busy'); label.textContent = old; });
  });
})();
