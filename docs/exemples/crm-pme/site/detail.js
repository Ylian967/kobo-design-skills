/*
 * Rivage Suivi — panneau de détail : la société sous le nom, l'étape en un geste,
 * archiver, restaurer, supprimer (gérante). Chaque geste passe par Rivage.noter.
 */
(function () {
  'use strict';
  var R = window.Rivage;
  if (!R) return;
  var ap = R.ap, panneau = document.getElementById('ap-detail');
  var titre = panneau.querySelector('.ap-detail__title'), societe = panneau.querySelector('[data-rs-societe]');
  var faits = panneau.querySelector('[data-ap-facts]');
  var etapes = panneau.querySelectorAll('[data-rs-etape]'), aideEtape = panneau.querySelector('[data-rs-etape-aide]');
  var modifier = panneau.querySelector('[data-rs-modifier]');
  var supprimer = panneau.querySelector('[data-rs-action="supprimer"]'), raison = panneau.querySelector('[data-rs-supprimer-raison]');
  var bascule = panneau.querySelector('[data-rs-bascule]');
  var declencheurMenu = panneau.querySelector('.k-dropdown > .k-btn');
  var fenetre = document.getElementById('rs-supprimer');
  var AIDE = aideEtape.textContent;
  var AIDE_ARCHIVE = 'Affaire archivée : restaurez-la (« Autres actions ») pour changer son étape ou la modifier.';
  var COCHE = '<svg class="k-icon" aria-hidden="true"><use href="#i-check"/></svg>';
  var ligne = null;

  function bloquer(bouton, oui) { if (oui) bouton.setAttribute('aria-disabled', 'true'); else bouton.removeAttribute('aria-disabled'); }

  function peindre() {
    if (!ligne) return;
    var v = R.lire(ligne);
    titre.textContent = v.affaire;
    societe.textContent = v.societe;
    faits.textContent = '';
    [['Société', v.societe], ['Étape', R.ETAPES[v.etape] + (v.archivee ? ' · archivée' : '')], ['Montant HT', R.euros(v.montant)],
     ['Clôture prévue', R.jour(v.cloture)], ['Responsable', R.RESPONSABLES[v.responsable] || v.responsable], ['Service', R.SERVICES[v.service] || 'Non renseigné']
    ].forEach(function (fait) {
      var bloc = document.createElement('div'), dt = document.createElement('dt'), dd = document.createElement('dd');
      dt.textContent = fait[0]; dd.textContent = fait[1]; bloc.appendChild(dt); bloc.appendChild(dd); faits.appendChild(bloc);
    });
    etapes.forEach(function (b) {
      var courante = b.dataset.rsEtape === v.etape;
      b.setAttribute('aria-pressed', courante ? 'true' : 'false');
      b.innerHTML = (courante ? COCHE : '') + R.ETAPES[b.dataset.rsEtape];
      bloquer(b, v.archivee);
    });
    aideEtape.textContent = v.archivee ? AIDE_ARCHIVE : AIDE;
    bloquer(modifier, v.archivee);
    // Un seul choix, qui change de nom : un choix masqué ferait perdre le focus à l'ouverture du menu.
    bascule.textContent = v.archivee ? 'Restaurer' : 'Archiver';
    bascule.dataset.rsAction = v.archivee ? 'restaurer' : 'archiver';
    bloquer(supprimer, !R.estGerante());
    raison.textContent = 'Autres actions : ' + (v.archivee ? 'restaurer' : 'archiver') + (R.estGerante() ? ', ou supprimer définitivement (session de la gérante).' : '. La suppression définitive est réservée à la gérante.');
  }

  // Après un geste : la liste se remet à jour ; si l'affaire a quitté la liste affichée, le panneau se ferme.
  function suite(tr) {
    R.rafraichir();
    if (tr.hidden || !tr.isConnected) { if (!panneau.hidden) Kobo.app.close(ap); R.table.focus(); return ' Elle a quitté la liste affichée.'; }   // le focus ne tombe pas dans le vide : « Annuler » est à un Maj+Tab
    peindre();
    return '';
  }

  function changerEtape(etape) {
    var tr = ligne, avant = R.lire(tr);
    if (!tr || avant.archivee || etape === avant.etape) return;
    var apres = Object.assign({}, avant, { etape: etape });
    R.ecrire(tr, apres);
    var sortie = suite(tr);
    R.noter('Étape changée : ' + R.ETAPES[etape], R.nommer(avant) + ' : passée de ' + R.ETAPES[avant.etape] + ' à ' + R.ETAPES[etape] + '.' + sortie,
      function () { R.ecrire(tr, Object.assign(R.lire(tr), { etape: avant.etape })); if (ligne === tr) peindre(); });
  }

  function archiver(oui) {
    var tr = ligne, avant = R.lire(tr);
    R.ecrire(tr, Object.assign({}, avant, { archivee: oui }));
    var sortie = suite(tr);
    R.noter(oui ? 'Affaire archivée' : 'Affaire restaurée',
      R.nommer(avant) + (oui ? ' : archivée. Elle se retrouve par le filtre Avancement, « Affaires archivées ».' : ' : restaurée, à l\'étape ' + R.ETAPES[avant.etape] + '.') + sortie,
      function () { R.ecrire(tr, Object.assign(R.lire(tr), { archivee: !oui })); if (ligne === tr) peindre(); });
  }

  var aSupprimer = null;
  function demanderSuppression() {
    var v = R.lire(ligne);
    aSupprimer = ligne;
    fenetre.querySelector('[data-rs-supprimer-quoi]').textContent = R.nommer(v) + ' — ' + R.ETAPES[v.etape] + ', ' + R.euros(v.montant) + ', suivie par ' + (R.RESPONSABLES[v.responsable] || v.responsable) + '.';
    fenetre.returnValue = '';
    Kobo.modal.open('rs-supprimer', declencheurMenu);
  }
  fenetre.addEventListener('close', function () {
    var tr = aSupprimer; aSupprimer = null;
    if (fenetre.returnValue !== 'supprime' || !tr) return;
    var v = R.lire(tr);
    if (!panneau.hidden) Kobo.app.close(ap);
    tr.remove();
    R.rafraichir();
    R.noter('Affaire supprimée', R.nommer(v) + ' : supprimée définitivement.', null);
    R.table.focus();
  });

  panneau.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b || !ligne || b.getAttribute('aria-disabled') === 'true') return;
    if (b.dataset.rsEtape) changerEtape(b.dataset.rsEtape);
    else if (b.dataset.rsAction === 'archiver') archiver(true);
    else if (b.dataset.rsAction === 'restaurer') archiver(false);
    else if (b.dataset.rsAction === 'supprimer') demanderSuppression();
  });

  ap.addEventListener('k-app:open', function (e) {
    ligne = e.detail.row;
    peindre();
    // Le focus va à l'étape en cours : Tab mène à l'étape suivante, Entrée ne change rien par mégarde.
    var courante = panneau.querySelector('[data-rs-etape][aria-pressed="true"]');
    if (!courante || R.lire(ligne).archivee) return;
    courante.focus();
    setTimeout(function () { if (ligne && document.activeElement === titre) courante.focus(); }, 0);   // si le kit a repris le focus pour le titre
  });
  ap.addEventListener('k-app:close', function () { ligne = null; });
  ap.addEventListener('rs:role', peindre);

  R.ligneOuverte = function () { return ligne; };
  R.peindre = peindre;
  R.suite = suite;
})();
