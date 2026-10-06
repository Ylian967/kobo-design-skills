/* Atelier Sorbier architectes : demande de rendez-vous (rendez-vous.html).
   L'envoi est SIMULÉ : rien ne part. Il réussit si l'appareil est en ligne, il échoue s'il est hors ligne.
   Pour brancher un vrai envoi : remplacer le corps de `transmettre` par l'appel au service. */
(function () {
  'use strict';
  var form = document.getElementById('demande');
  if (!form) return;

  var confirmation = document.getElementById('confirmation');
  var bouton = document.getElementById('envoyer');
  var libelle = document.getElementById('envoyer-libelle');
  var temoin = bouton.querySelector('.k-btn__spinner');
  var echec = document.getElementById('echec');
  var groupes = Array.prototype.slice.call(form.querySelectorAll('[data-rdv-groupe]'));
  var DELAI_SIMULE = 900;
  var alerte = null; /* la notification d'échec en cours : elle reste jusqu'au prochain envoi */

  /* Arrivée depuis un projet (rendez-vous.html?type=extension) : le type est déjà coché. */
  var voulu = new URLSearchParams(location.search).get('type');
  var coche = voulu && form.querySelector('input[name="type"][value="' + voulu.replace(/[^a-z-]/g, '') + '"]');
  if (coche) coche.checked = true;

  /* Un groupe de boutons radio obligatoire : l'erreur s'écrit sous le groupe (le kit n'a pas de script pour cela). */
  function validerGroupe(groupe) {
    var boutons = groupe.querySelectorAll('input[type="radio"]');
    var erreur = groupe.querySelector('.k-radio-group__error');
    var aide = groupe.querySelector('.k-radio-group__help');
    var ok = !!groupe.querySelector('input[type="radio"]:checked');
    erreur.hidden = ok;
    boutons.forEach(function (b) { if (ok) b.removeAttribute('aria-invalid'); else b.setAttribute('aria-invalid', 'true'); });
    groupe.setAttribute('aria-describedby', ok ? aide.id : aide.id + ' ' + erreur.id);
    return ok;
  }
  groupes.forEach(function (groupe) {
    groupe.addEventListener('change', function () { validerGroupe(groupe); });
  });

  /* Tous les champs sont vérifiés, dans l'ordre de la page ; le premier en erreur reçoit le focus. */
  function validerTout() {
    var premier = null;
    form.querySelectorAll('[data-rdv-groupe], .k-field').forEach(function (bloc) {
      var ok = bloc.matches('[data-rdv-groupe]') ? validerGroupe(bloc) : Kobo.field.validate(bloc);
      if (!ok && !premier) premier = bloc.querySelector('input, textarea');
    });
    if (premier) premier.focus();
    return !premier;
  }

  function occupe(oui) {
    if (oui) bouton.setAttribute('aria-busy', 'true'); else bouton.removeAttribute('aria-busy');
    temoin.hidden = !oui;
    libelle.textContent = oui ? 'Envoi en cours…' : 'Envoyer la demande';
  }

  /* Envoi simulé. */
  function transmettre(donnees, reussi, rate) {
    window.setTimeout(function () { if (navigator.onLine) reussi(); else rate(); }, DELAI_SIMULE);
  }

  function texteChoisi(nom) {
    var choix = form.querySelector('input[name="' + nom + '"]:checked');
    return choix ? choix.closest('.k-radio').querySelector('.k-radio__label').textContent : '';
  }

  function recapituler() {
    var lignes = [
      ['Type de projet', texteChoisi('type')],
      ['Commune du projet', form.elements.commune.value],
      ['Budget envisagé', texteChoisi('budget')],
      ['Votre projet', form.elements.projet.value],
      ['Nom', form.elements.nom.value],
      ['E-mail', form.elements.email.value],
      ['Téléphone', form.elements.tel.value || 'Non indiqué']
    ];
    var liste = document.getElementById('recapitulatif');
    liste.textContent = '';
    lignes.forEach(function (ligne) {
      var bloc = document.createElement('div');
      var dt = document.createElement('dt');
      var dd = document.createElement('dd');
      dt.textContent = ligne[0];
      dd.textContent = ligne[1];
      bloc.appendChild(dt);
      bloc.appendChild(dd);
      liste.appendChild(bloc);
    });
    document.getElementById('c-email').textContent = form.elements.email.value;
  }

  function reussite() {
    occupe(false);
    echec.hidden = true;
    recapituler();
    form.hidden = true; /* les réponses restent dans le formulaire : « Modifier ma demande » les retrouve */
    confirmation.hidden = false;
    document.getElementById('t-confirmation').focus();
    Kobo.toast({ type: 'success', title: 'Demande envoyée', text: 'Nous répondons sous trois jours ouvrés, par e-mail.' });
  }

  function ratage() {
    occupe(false);
    echec.hidden = false;
    alerte = Kobo.toast({
      type: 'error', title: 'L\'envoi n\'a pas abouti', text: 'Vos réponses sont gardées. Vérifiez votre connexion, puis réessayez.',
      action: { label: 'Réessayer', onClick: envoyer }, duration: 0, returnFocus: bouton
    });
  }

  function envoyer() {
    if (bouton.getAttribute('aria-busy') === 'true') return; /* un second clic est ignoré */
    if (!validerTout()) return;
    if (alerte) { alerte.close(); alerte = null; }
    occupe(true);
    transmettre(new FormData(form), reussite, ratage);
  }

  form.addEventListener('submit', function (e) { e.preventDefault(); envoyer(); });

  document.getElementById('modifier').addEventListener('click', function () {
    confirmation.hidden = true;
    form.hidden = false;
    (form.querySelector('input[name="type"]:checked') || form.querySelector('input[name="type"]')).focus();
  });
})();
