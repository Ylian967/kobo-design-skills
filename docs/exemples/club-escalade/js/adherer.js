/* Les Dalles — page Adhérer : la formule et quatre champs, relecture, paiement simulé, confirmation. */
(function () {
  'use strict';

  var FORMULES = { adulte: { nom: 'Adulte', prix: '180 €' }, reduit: { nom: 'Tarif réduit', prix: '120 €' } };
  var form = document.getElementById('adh-form');
  var relecture = document.getElementById('adh-relecture');
  var confirme = document.getElementById('adh-confirme');
  var titre = document.getElementById('t-etape');
  var payer = document.getElementById('adh-payer');

  function montrer(etape, texte) {
    form.hidden = etape !== form;
    relecture.hidden = etape !== relecture;
    confirme.hidden = etape !== confirme;
    titre.textContent = texte;
  }

  function ecrire(id, texte) { document.getElementById(id).textContent = texte; }

  function dejaMembre() {
    Kobo.field.setError(form.email.closest('.k-field'), 'Cette adresse a déjà un compte. Connectez-vous avec le lien « Déjà membre ? » en haut de la page, ou donnez une autre adresse.');
    form.email.focus();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!Dalles.form.verifier(form)) return;
    if (Dalles.compte(Dalles.lire(), form.email.value)) { dejaMembre(); return; }
    var f = FORMULES[form.formule.value];
    ecrire('rel-formule', f.nom);
    ecrire('rel-prix', f.prix + ' pour l\'année, licence comprise');
    ecrire('rel-nom', form.nom.value.trim());
    ecrire('rel-mail', form.email.value.trim());
    ecrire('rel-tel', form.tel.value.trim());
    payer.textContent = 'Payer ' + f.prix + ' et adhérer';
    montrer(relecture, 'Relisez avant de payer');
    titre.focus();
  });

  relecture.addEventListener('click', function (e) {
    var b = e.target.closest('[data-dalles-modifier]');
    if (!b) return;
    montrer(form, 'Votre adhésion');
    var cible = document.getElementById(b.getAttribute('data-dalles-modifier'));
    (cible.matches('input') ? cible : cible.querySelector('input:checked, input')).focus();
  });

  function adherer() {
    var f = FORMULES[form.formule.value];
    var cree = Dalles.creerCompte({ nom: form.nom.value, email: form.email.value, tel: form.tel.value, mdp: form.mdp.value, formule: form.formule.value });
    if (!cree) { montrer(form, 'Votre adhésion'); dejaMembre(); return; }
    var m = Dalles.membre();
    ecrire('conf-titre', 'Adhésion enregistrée. Bienvenue, ' + Dalles.prenom(m) + ' !');
    ecrire('conf-formule', f.nom + ', ' + f.prix + ' l\'année');
    ecrire('conf-mail', m.email);
    form.reset();
    Dalles.habillerBarre();
    montrer(confirme, 'Bienvenue aux Dalles');
    titre.focus();
  }

  payer.addEventListener('click', function () {
    Dalles.form.envoyer(payer, 'Paiement en cours…', adherer, function () {
      Dalles.dire({ type: 'error', title: 'Le paiement n\'a pas abouti', text: 'Pas de réseau. Rien n\'a été débité et vos réponses sont gardées.', action: { label: 'Réessayer', onClick: function () { payer.click(); } }, duration: 0 });
    });
  });
})();
