/* Terre & Feu — page Réserver : formule, date, coordonnées, confirmation. */
(function () {
  'use strict';
  var $ = TF.id, el = TF.el, form = $('form'), envoyer = $('envoyer'), choisie = null, alerteEnvoi = null;

  function formule() { return document.querySelector('input[name="formule"]:checked').value; }

  function bouton(s, reste) {
    if (reste < 1) return el('button', { type: 'button', class: 'k-btn k-btn--secondary', 'aria-disabled': 'true' }, 'Complet');
    var prise = choisie === s.id, texte = prise ? 'Date choisie' : 'Choisir';
    return el('button', { type: 'button', class: 'k-btn k-btn--secondary', 'aria-pressed': String(prise), 'data-seance': s.id, 'aria-label': texte + ' : ' + TF.titre(s) + ', ' + s.heure }, texte);
  }

  function peindre() {
    var f = formule(), libre = f === 'libre';
    $('bloc-libre').hidden = !libre; $('bloc-dates').hidden = libre; form.hidden = libre;
    if (libre) return;
    var liste = TF.seances(f), ul = $('dates');
    ul.textContent = '';
    $('dates-vide').hidden = liste.length > 0;
    $('dates-note').hidden = f === 'decouverte';
    liste.forEach(function (s) {
      var reste = TF.restant(s.id);
      var accord = (f === 'duo' ? ' restant' : ' restante') + (reste > 1 ? 's' : '');
      var precision = s.heure + ' · ' + (reste < 1 ? 'complet' : TF.compte(reste, f) + accord);
      ul.append(TF.ligne(TF.titre(s), precision, [bouton(s, reste)], choisie === s.id ? 'choisie' : reste < 1 ? 'complet' : ''));
    });
    $('places-libelle').textContent = f === 'duo' ? 'Nombre de duos (un adulte et un enfant)' : 'Nombre de places';
    $('places-aide').textContent = f === 'duo' ? 'Trois duos au plus par séance.' : 'Six personnes au plus par séance.';
    etatDuChoix();
  }

  function etatDuChoix() {
    var s = choisie && TF.seance(choisie);
    if (!s) {
      $('choix').textContent = 'Aucune date choisie pour l\'instant.';
      envoyer.setAttribute('aria-disabled', 'true'); $('manque').hidden = false;
      return;
    }
    var f = TF.formules[s.formule];
    $('choix').textContent = 'Date choisie : ' + TF.titre(s) + ', ' + s.heure + '. ' + f.nom + ', ' + f.tarif + '.';
    $('places').max = TF.restant(s.id);
    envoyer.removeAttribute('aria-disabled'); $('manque').hidden = true;
  }

  $('dates').addEventListener('click', function (e) {
    var b = e.target.closest('button[data-seance]');
    if (!b) return;
    choisie = b.getAttribute('data-seance');
    $('alerte').textContent = '';
    peindre();
    $('t-form').focus();
    $('t-form').scrollIntoView({ block: 'start' });
  });

  document.querySelectorAll('input[name="formule"]').forEach(function (r) {
    r.addEventListener('change', function () { choisie = null; $('alerte').textContent = ''; peindre(); });
  });

  function confirmer(r) {
    TF.faits($('conf-faits'), TF.faitsReservation(r));
    $('conf-lien').href = 'ma-reservation.html#' + r.ref;
    $('parcours').hidden = true; $('confirmation').hidden = false;
    $('t-conf').focus();
    $('t-conf').scrollIntoView({ block: 'start' });
  }

  function soumettre() {
    if (envoyer.getAttribute('aria-busy') === 'true') return;
    if (envoyer.getAttribute('aria-disabled') === 'true') { $('t-dates').focus(); $('t-dates').scrollIntoView({ block: 'start' }); return; }
    var faux = TF.premierFaux(form);
    if (faux) { faux.focus(); return; }
    var demande = { seance: choisie, nom: $('nom').value.trim(), email: $('email').value.trim(), tel: $('tel').value.trim(), places: parseInt($('places').value, 10) };
    TF.occupe(envoyer, 'Réservation en cours…');
    TF.envoyer(function () { return TF.reserver(demande); }).then(function (res) {
      TF.occupe(envoyer);
      if (alerteEnvoi) { alerteEnvoi.close(); alerteEnvoi = null; }
      if (res.ok) { confirmer(res.r); return; }
      choisie = null; peindre();
      $('alerte').textContent = (res.restant < 1 ? 'Cette date vient d\'être complétée.' : 'Il ne reste que ' + TF.compte(res.restant, formule()) + ' à cette date.')
        + ' Vos coordonnées sont gardées : choisissez une autre date, ou réduisez le nombre.';
      $('t-dates').focus(); $('t-dates').scrollIntoView({ block: 'start' });
    }).catch(function () {
      TF.occupe(envoyer);
      alerteEnvoi = Kobo.toast({ type: 'error', title: 'La réservation n\'est pas partie', text: 'Vos réponses sont gardées. Vérifiez votre connexion, puis réessayez.', action: { label: 'Réessayer', onClick: soumettre }, duration: 0, returnFocus: envoyer });
    });
  }
  form.addEventListener('submit', function (e) { e.preventDefault(); soumettre(); });

  /* Un lien « reserver.html?formule=cycle » ouvre la page sur cette formule. */
  var voulue = new URLSearchParams(location.search).get('formule');
  var radio = voulue && document.querySelector('input[name="formule"][value="' + voulue.replace(/[^a-z]/g, '') + '"]');
  if (radio) radio.checked = true;
  peindre();
})();
