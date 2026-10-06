/* Page Commande : récapitulatif, validation, paiement SIMULÉ, refus, passage à la confirmation.
   Aucune donnée de carte n'est gardée ni envoyée. À remplacer par l'appel au vrai service de paiement. */
(function () {
  'use strict';

  var form = document.getElementById('f-commande');
  if (!form || !window.NB) return;

  var payer = document.getElementById('payer');
  var age = document.getElementById('c-age');
  var erreurAge = document.getElementById('c-age-erreur');
  var carte = document.getElementById('c-carte');
  var occupe = false;

  function recap() {
    var lignes = NB.lignes();
    var vide = lignes.length === 0;
    document.getElementById('nb-vide').hidden = !vide;
    document.getElementById('nb-recap-bloc').hidden = vide;
    form.hidden = vide;
    var dl = document.getElementById('nb-recap');
    dl.textContent = '';
    lignes.forEach(function (l) { ajouter(dl, l.quantite + ' × ' + l.nom, l.sousTotal + ' €'); });
    ajouter(dl, 'Total à payer, sans frais', NB.total() + ' €');
    payer.textContent = 'Payer ' + NB.total() + ' €';
  }

  function ajouter(dl, terme, valeur) {
    var div = document.createElement('div');
    var dt = document.createElement('dt');
    var dd = document.createElement('dd');
    dt.textContent = terme;
    dd.textContent = valeur;
    div.appendChild(dt);
    div.appendChild(dd);
    dl.appendChild(div);
  }

  function validerAge() {
    var ok = age.checked;
    erreurAge.hidden = ok;
    if (ok) age.removeAttribute('aria-invalid'); else age.setAttribute('aria-invalid', 'true');
    return ok;
  }

  /* Tous les champs sont vérifiés ; le focus va au premier en erreur. */
  function valider() {
    var premier = null;
    form.querySelectorAll('.k-field[data-k-validate]').forEach(function (champ) {
      if (!Kobo.field.validate(champ) && !premier) premier = champ.querySelector('.k-field__control');
    });
    var ordre = [document.getElementById('c-mail'), age];
    if (!validerAge() && (!premier || ordre.indexOf(premier) < 0)) premier = age;
    if (premier) premier.focus();
    return !premier;
  }

  /* Simulation : un numéro qui finit par 0000, ou l'adresse commande.html?refus, donne un refus. */
  function refuse() {
    var chiffres = carte.value.replace(/\D/g, '');
    return /0000$/.test(chiffres) || new URLSearchParams(location.search).has('refus');
  }

  function numero() {
    var lettres = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    var code = '';
    for (var i = 0; i < 6; i++) code += lettres.charAt(Math.floor(Math.random() * lettres.length));
    return 'NB-' + code;
  }

  function fin(libelle) {
    occupe = false;
    payer.removeAttribute('aria-busy');
    payer.textContent = libelle;
  }

  function reussir() {
    var commande = { numero: numero(), mail: document.getElementById('c-mail').value.trim(), lignes: NB.lignes(), total: NB.total() };
    try { sessionStorage.setItem('nb-commande', JSON.stringify(commande)); } catch (e) { /* navigation privée */ }
    NB.vider();
    location.href = 'confirmation.html';
  }

  function echouer() {
    fin('Payer ' + NB.total() + ' €');
    Kobo.field.setError(carte.closest('.k-field'), 'Paiement refusé pour cette carte. Vérifiez le numéro ou essayez une autre carte.');
    Kobo.toast({ type: 'error', title: 'Paiement refusé',
      text: 'Rien n\'a été débité. Vos billets et votre adresse sont gardés : corrigez la carte et réessayez.', duration: 0, returnFocus: carte });
    carte.focus();
  }

  age.addEventListener('change', validerAge);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (occupe) return; // un second clic est ignoré
    if (NB.nombre() === 0) { recap(); return; }
    if (!valider()) return;
    occupe = true;
    payer.setAttribute('aria-busy', 'true');
    payer.textContent = 'Paiement en cours…';
    setTimeout(function () { if (refuse()) echouer(); else reussir(); }, 900);
  });

  window.addEventListener('pageshow', recap);
  recap();
})();
