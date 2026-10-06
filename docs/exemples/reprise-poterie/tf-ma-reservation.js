/* Terre & Feu — page Ma réservation : retrouver, relire, changer de date, annuler. */
(function () {
  'use strict';
  var $ = TF.id, el = TF.el, courant = null, nouvelle = null;
  var ETATS = { active: 'Confirmée', annulee: 'Annulée : la place a été rendue', retiree: 'Annulée par l\'atelier' };

  function quand(s) { return TF.titre(s).toLowerCase().replace(/^cycle/, 'le cycle') + ', ' + s.heure; }
  function dire(texte) { $('message').textContent = texte || ''; }

  function montrer(r, message) {
    courant = r;
    var s = TF.seance(r.seance), h = TF.heuresAvant(s), active = r.etat === 'active', tard = h < 48;
    $('chercher').hidden = true; $('introuvable').hidden = true; $('fiche').hidden = false; $('bloc-changer').hidden = true;
    $('t-fiche').textContent = 'Votre réservation ' + r.ref;
    $('etat').textContent = ETATS[r.etat];
    TF.faits($('faits'), TF.faitsReservation(r).slice(1));
    $('regle').textContent = !active ? 'Cette réservation n\'est plus active. Vous pouvez en faire une autre quand vous voulez.'
      : !tard ? 'Vous pouvez changer de date ou annuler en ligne jusqu\'à 48 h avant la séance.'
      : !r.reporte ? 'La séance commence dans moins de 48 h : elle ne s\'annule plus en ligne et reste due. Vous pouvez encore changer de date, une seule fois.'
      : 'La séance commence dans moins de 48 h et votre changement de date a déjà été utilisé : elle reste due. Pour toute question, appelez Maëlle.';
    $('changer').hidden = !active || (tard && r.reporte);
    $('annuler').hidden = !active || tard;
    $('appeler').hidden = !active || !tard;
    $('rereserver').hidden = active;
    $('m-annuler-texte').textContent = 'Votre réservation du ' + TF.titre(s).toLowerCase() + ' (' + TF.compte(r.places, r.formule) + ') sera annulée et la place rendue. Rien n\'est dû.';
    dire(message);
    history.replaceState(null, '', '#' + r.ref);
    $('t-fiche').focus();
    $('t-fiche').scrollIntoView({ block: 'start' });
  }

  function chercherAutre() {
    courant = null; $('fiche').hidden = true; $('chercher').hidden = false;
    history.replaceState(null, '', location.pathname);
    $('email').focus();
  }

  $('chercher').addEventListener('submit', function (e) {
    e.preventDefault();
    var b = $('retrouver');
    if (b.getAttribute('aria-busy') === 'true') return;
    var faux = TF.premierFaux(e.target);
    if (faux) { faux.focus(); return; }
    var ref = $('ref').value.trim().toUpperCase().replace(/^TF(\d)/, 'TF-$1'), email = $('email').value;
    TF.occupe(b, 'Recherche en cours…');
    TF.envoyer(function () { return TF.trouver(ref, email); }).then(function (r) {
      TF.occupe(b);
      if (r && TF.seance(r.seance)) { montrer(r); return; }
      $('introuvable').hidden = false; $('t-introuvable').focus();
    }).catch(function () { TF.occupe(b); echec(); });
  });

  function echec() {
    Kobo.toast({ type: 'error', title: 'La demande n\'est pas partie', text: 'Rien n\'a été changé. Vérifiez votre connexion, puis réessayez.', duration: 0 });
  }

  /* Changer de date : les autres dates de la même formule qui ont assez de places. */
  $('changer').addEventListener('click', function () {
    var ul = $('autres'), liste = TF.seances(courant.formule).filter(function (s) { return s.id !== courant.seance && TF.restant(s.id) >= courant.places; });
    ul.textContent = '';
    liste.forEach(function (s) {
      var b = el('button', { type: 'button', class: 'k-btn k-btn--secondary', 'data-seance': s.id, 'aria-label': 'Choisir : ' + TF.titre(s) + ', ' + s.heure }, 'Choisir');
      ul.append(TF.ligne(TF.titre(s), s.heure + ' · ' + TF.compte(TF.restant(s.id), s.formule) + ' libre' + (TF.restant(s.id) > 1 ? 's' : ''), [b]));
    });
    $('autres-vide').hidden = liste.length > 0;
    $('bloc-changer').hidden = false;
    $('t-changer').focus(); $('t-changer').scrollIntoView({ block: 'start' });
  });
  $('garder').addEventListener('click', function () { $('bloc-changer').hidden = true; $('changer').focus(); });

  function deplacer() {
    var id = nouvelle; nouvelle = null;
    TF.envoyer(function () { return TF.deplacer(courant.ref, id); }).then(function (r) {
      if (r) { montrer(r, 'Date changée. Votre réservation est maintenant : ' + quand(TF.seance(id)) + '.'); return; }
      dire('Cette date vient d\'être complétée : votre réservation n\'a pas changé. Choisissez-en une autre.');
      $('changer').click();
    }).catch(echec);
  }
  $('autres').addEventListener('click', function (e) {
    var b = e.target.closest('button[data-seance]');
    if (!b) return;
    nouvelle = b.getAttribute('data-seance');
    if (TF.heuresAvant(TF.seance(courant.seance)) >= 48) { deplacer(); return; }
    $('m-report-texte').textContent = 'Votre séance commence dans moins de 48 h. Nouvelle date : ' + quand(TF.seance(nouvelle)) + '. Ce changement ne pourra pas être refait ni annulé en ligne.';
    Kobo.modal.open('m-report', b);
  });
  $('m-report').addEventListener('close', function (e) { if (e.target.returnValue === 'oui') deplacer(); e.target.returnValue = ''; });

  $('m-annuler').addEventListener('close', function (e) {
    if (e.target.returnValue !== 'annule') return;
    e.target.returnValue = '';
    TF.envoyer(function () { return TF.annuler(courant.ref); }).then(function (r) { montrer(r, 'Réservation annulée.'); }).catch(echec);
  });
  $('autre').addEventListener('click', chercherAutre);

  /* Arrivée par le lien de la confirmation : le numéro est dans l'adresse, on ne le redemande pas. */
  function depuisAdresse() {
    var r = location.hash.length > 1 && TF.parRef(decodeURIComponent(location.hash.slice(1)));
    if (r && TF.seance(r.seance)) montrer(r);
  }
  window.addEventListener('hashchange', depuisAdresse);
  depuisAdresse();
})();
