/*
 * Rivage Suivi — créer une affaire : envoi simulé (aucun service n'est branché).
 */
(function () {
  'use strict';
  var R = window.Rivage;
  if (!R) return;
  var DELAI_ENVOI_SIMULE = 600;
  var fenetre = document.getElementById('rs-creer');
  var form = document.getElementById('rs-form');
  var envoi = document.querySelector('[data-rs-envoi]');
  var libelleEnvoi = envoi.textContent;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (envoi.getAttribute('aria-busy') === 'true') return;   // un second clic est ignoré
    var fautifs = Array.prototype.filter.call(form.querySelectorAll('.k-field[data-k-validate]'), function (champ) { return !Kobo.field.validate(champ); });
    if (fautifs.length) { fautifs[0].querySelector('.k-field__control').focus(); return; }
    var v = { archivee: false };
    ['affaire', 'societe', 'service', 'etape', 'montant', 'cloture', 'responsable'].forEach(function (n) { v[n] = form.elements[n].value.trim(); });
    envoi.setAttribute('aria-busy', 'true'); envoi.textContent = 'Envoi en cours…';
    setTimeout(function () {   // la réponse est simulée
      envoi.removeAttribute('aria-busy'); envoi.textContent = libelleEnvoi;
      var tr = R.creerLigne(v);
      R.tbody.appendChild(tr);
      form.reset();
      Kobo.modal.close('rs-creer');
      R.rafraichir();
      R.noter('Affaire créée',
        R.nommer(v) + ' : créée à l\'étape ' + R.ETAPES[v.etape] + '.' + (tr.hidden ? ' Elle ne correspond pas aux filtres en cours : effacez-les pour la voir.' : ' Elle est dans la liste, à sa place dans le tri.'),
        function () { if (R.ligneOuverte() === tr) Kobo.app.close(R.ap); tr.remove(); });
    }, DELAI_ENVOI_SIMULE);
  });

  fenetre.addEventListener('close', function () {
    form.querySelectorAll('.k-field[data-k-validate]').forEach(Kobo.field.clearError);
  });
})();
