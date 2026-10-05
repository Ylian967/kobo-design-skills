/* Club Les Dalles — espace membre. Réservation et annulation simulées sur les lignes du tableau.
 * Rien n'est enregistré : tout repart de l'exemple au rechargement.
 * Chaque ligne porte ses données : data-debut, data-duree, data-activite, data-niveau, data-encadrant, data-total, data-reste, data-mien. */
(function () {
  'use strict';

  var MAINTENANT = new Date('2026-10-12T11:00:00');   // heure simulée, écrite à l'écran
  var QUOTA = 3;                                      // réservations par semaine
  var DELAI_ANNULATION = 2 * 60 * 60 * 1000;          // deux heures, en millisecondes
  var JOURS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  var ACTIVITES = { bloc: 'Bloc', voie: 'Voie', cours: 'Cours encadré' };
  var NIVEAUX = { tous: 'Ouvert à tous', debutant: 'Débutant', confirme: 'Confirmé' };

  var ap = document.querySelector('.ap');
  if (!ap) return;
  var panneau = ap.querySelector('.ap-detail');
  var bouton = panneau.querySelector('[data-res-action]');
  var fenetre = document.getElementById('annuler');
  var ouverte = null;

  function heure(d) { return d.getHours() + ' h' + (d.getMinutes() ? ' ' + d.getMinutes() : ''); }
  function jour(d) { return JOURS[d.getDay()] + ' ' + d.getDate() + ' octobre'; }
  function duree(min) { return min === 90 ? '1 h 30' : '2 h'; }

  function lire(ligne) {
    var debut = new Date(ligne.dataset.debut);
    return {
      debut: debut,
      fin: new Date(debut.getTime() + Number(ligne.dataset.duree) * 60000),
      limite: new Date(debut.getTime() - DELAI_ANNULATION),
      duree: Number(ligne.dataset.duree),
      activite: ACTIVITES[ligne.dataset.activite],
      niveau: NIVEAUX[ligne.dataset.niveau],
      encadrant: ligne.dataset.encadrant || '',
      total: Number(ligne.dataset.total),
      reste: Number(ligne.dataset.reste),
      mien: ligne.dataset.mien === 'oui'
    };
  }

  function mesReservations() { return ap.querySelectorAll('tbody tr[data-mien="oui"]').length; }

  function places(c) {
    if (c.mien) return 'Réservé';
    if (c.reste === 0) return 'Complet';
    return c.reste + ' sur ' + c.total;
  }

  /* La ligne : son état s'écrit en toutes lettres dans la colonne Places. */
  function ecrireLigne(ligne) {
    var c = lire(ligne), cellule = ligne.querySelector('[data-res-places]');
    cellule.textContent = '';
    if (c.mien) {
      var fort = document.createElement('strong'), qui = document.createElement('span');
      fort.textContent = places(c); qui.className = 'k-table__sub'; qui.textContent = 'par vous';
      cellule.appendChild(fort); cellule.appendChild(qui);
    }
    else cellule.textContent = places(c);
    cellule.setAttribute('data-k-sort', String(c.reste));
    if (c.reste === 0 && !c.mien) ligne.setAttribute('aria-disabled', 'true'); else ligne.removeAttribute('aria-disabled');
  }

  function ecrireQuota() {
    var n = mesReservations(), reste = QUOTA - n;
    ap.querySelector('[data-res-quota]').textContent =
      n + (n > 1 ? ' réservations' : ' réservation') + ' sur ' + QUOTA + ' cette semaine. ' +
      (reste > 0 ? 'Il vous en reste ' + reste + '.' : 'Vous avez atteint le maximum.');
  }

  /* Ce que le bouton peut faire pour ce créneau, et la phrase qui l'explique. */
  function etat(c) {
    if (c.mien) {
      if (MAINTENANT > c.limite) return { mode: 'bloque', mot: 'Réservé par vous', libelle: 'Annulation impossible',
        regle: 'Ce créneau commence dans moins de deux heures : il ne peut plus être annulé.' };
      return { mode: 'annuler', mot: 'Réservé par vous', libelle: 'Annuler ma réservation',
        regle: 'Annulation possible jusqu\'au ' + jour(c.limite) + ', ' + heure(c.limite) + '.' };
    }
    if (MAINTENANT >= c.debut) return { mode: 'bloque', mot: 'Commencé', libelle: 'Réservation fermée',
      regle: 'Ce créneau a déjà commencé.' };
    if (c.reste === 0) return { mode: 'bloque', mot: 'Complet', libelle: 'Créneau complet',
      regle: 'Toutes les places sont prises. Il n\'y a pas de liste d\'attente.' };
    if (mesReservations() >= QUOTA) return { mode: 'bloque', mot: 'Places disponibles', libelle: 'Réserver ce créneau',
      regle: 'Vous avez déjà ' + QUOTA + ' réservations cette semaine : annulez-en une pour réserver ce créneau.' };
    return { mode: 'reserver', mot: 'Places disponibles', libelle: 'Réserver ce créneau',
      regle: 'Une fois réservé, ce créneau s\'annule jusqu\'au ' + jour(c.limite) + ', ' + heure(c.limite) + '.' };
  }

  function fait(terme, valeur) {
    var bloc = document.createElement('div'), dt = document.createElement('dt'), dd = document.createElement('dd');
    dt.textContent = terme; dd.textContent = valeur; bloc.appendChild(dt); bloc.appendChild(dd);
    return bloc;
  }

  function ecrirePanneau() {
    if (!ouverte) return;
    var c = lire(ouverte), e = etat(c), faits = panneau.querySelector('[data-ap-facts]');
    panneau.querySelector('.ap-detail__title').textContent = c.activite + ', ' + jour(c.debut) + ' à ' + heure(c.debut);
    panneau.querySelector('[data-res-etat]').textContent = 'Créneau · ' + e.mot;
    faits.textContent = '';
    faits.appendChild(fait('Jour', jour(c.debut) + ' 2026'));
    faits.appendChild(fait('Horaire', 'de ' + heure(c.debut) + ' à ' + heure(c.fin) + ' (' + duree(c.duree) + ')'));
    faits.appendChild(fait('Activité', c.activite));
    faits.appendChild(fait('Niveau', c.niveau));
    if (c.encadrant) faits.appendChild(fait('Encadrant', c.encadrant));
    faits.appendChild(fait('Places', c.reste === 0 ? 'Complet (' + c.total + ' places prises sur ' + c.total + ')' : c.reste + (c.reste > 1 ? ' restantes sur ' : ' restante sur ') + c.total));
    panneau.querySelector('[data-res-regle]').textContent = e.regle;
    bouton.textContent = e.libelle;
    bouton.dataset.resAction = e.mode;
    bouton.classList.toggle('k-btn--secondary', e.mode === 'annuler');
    bouton.setAttribute('aria-disabled', String(e.mode === 'bloque'));
    if (e.mode === 'annuler') {
      bouton.setAttribute('data-k-modal-open', 'annuler');
      bouton.setAttribute('aria-haspopup', 'dialog');
      fenetre.querySelector('[data-res-annuler-texte]').textContent =
        c.activite + ', ' + jour(c.debut) + ' à ' + heure(c.debut) + '. Votre place sera rendue aux autres membres.';
    } else {
      bouton.removeAttribute('data-k-modal-open');
      bouton.removeAttribute('aria-haspopup');
    }
  }

  function changer(ligne, mien) {
    ligne.dataset.mien = mien ? 'oui' : 'non';
    ligne.dataset.reste = String(Number(ligne.dataset.reste) + (mien ? -1 : 1));
    ecrireLigne(ligne);
    ecrireQuota();
    ecrirePanneau();
    if (window.Kobo && Kobo.app) Kobo.app.filter(ap);
  }

  ap.addEventListener('k-app:open', function (e) { ouverte = e.detail.row; ecrirePanneau(); });
  ap.addEventListener('k-app:close', function () { ouverte = null; });

  bouton.addEventListener('click', function () {
    if (!ouverte) return;
    var c = lire(ouverte), e = etat(c);
    if (e.mode === 'bloque') {
      Kobo.toast({ type: 'warning', title: e.libelle === 'Réserver ce créneau' ? 'Réservation impossible' : e.libelle, text: e.regle });
      return;
    }
    if (e.mode === 'reserver') {
      changer(ouverte, true);
      Kobo.toast({ type: 'success', title: 'Créneau réservé',
        text: c.activite + ', ' + jour(c.debut) + ' à ' + heure(c.debut) + '. ' + ap.querySelector('[data-res-quota]').textContent });
    }
    /* mode « annuler » : la fenêtre de confirmation s'ouvre par data-k-modal-open */
  });

  fenetre.addEventListener('close', function () {
    if (fenetre.returnValue !== 'annule' || !ouverte) return;
    fenetre.returnValue = '';
    var c = lire(ouverte);
    if (!c.mien || MAINTENANT > c.limite) return;
    changer(ouverte, false);
    Kobo.toast({ type: 'info', title: 'Réservation annulée',
      text: c.activite + ', ' + jour(c.debut) + ' à ' + heure(c.debut) + '. Votre place est rendue.' });
  });

  Array.prototype.forEach.call(ap.querySelectorAll('tbody tr'), ecrireLigne);
  ecrireQuota();
})();
