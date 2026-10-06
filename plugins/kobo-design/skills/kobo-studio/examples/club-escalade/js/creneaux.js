/* Les Dalles — page Créneaux : sept jours en onglets, les créneaux du jour en lignes, réserver en une touche. */
(function () {
  'use strict';

  var D = Dalles.dates;
  var R = Dalles.reservations;
  var jours = [0, 1, 2, 3, 4, 5, 6].map(function (i) { return D.ajouter(D.aujourdhui(), i); });
  var courant = 0;

  function icone(nom) { return '<svg class="k-icon" aria-hidden="true"><use href="#i-' + nom + '"/></svg>'; }
  function pluriel(n, mot) { return n + ' ' + mot + (n > 1 ? 's' : ''); }
  function ouverts(date) { var m = new Date(); return D.creneaux(date).filter(function (c) { return c.debut > m; }); }

  function prochainOuvert(i) {
    for (var j = i + 1; j < jours.length; j++) if (ouverts(jours[j]).length) return j;
    return -1;
  }

  function ligne(c, membre) {
    var reserve = R.estReserve(c.id);
    var libres = R.restantes(c.id);
    var etat, bouton, type = 'libre';
    if (reserve) {
      type = 'reserve';
      if (R.annulable(c)) {
        etat = icone('check') + 'Réservé';
        bouton = '<button type="button" class="k-btn k-btn--secondary" data-annuler="' + c.id + '" aria-label="Annuler, ' + D.heures(c) + '">Annuler</button>';
      } else {
        etat = icone('check') + 'Réservé. Annulation fermée (moins de 2 h avant) : appelez le ' + Dalles.TELEPHONE;
        bouton = '';
      }
    } else if (libres < 1) {
      type = 'complet';
      etat = icone('close') + 'Complet';
      bouton = '<button type="button" class="k-btn" disabled aria-label="Réserver, ' + D.heures(c) + ' : complet">Réserver</button>';
    } else {
      etat = pluriel(libres, 'place') + ' libre' + (libres > 1 ? 's' : '');
      if (!membre) {
        bouton = '<a class="k-btn" href="connexion.html?retour=' + encodeURIComponent('creneaux.html?jour=' + c.id.slice(0, 10)) + '" aria-label="Réserver, ' + D.heures(c) + ' : se connecter d\'abord">Réserver</a>';
      } else if (R.quotaAtteint(c.id)) {
        bouton = '<button type="button" class="k-btn" aria-disabled="true" data-quota aria-label="Réserver, ' + D.heures(c) + ' : trois réservations déjà cette semaine">Réserver</button>';
      } else {
        bouton = '<button type="button" class="k-btn" data-reserver="' + c.id + '" aria-label="Réserver, ' + D.heures(c) + '">Réserver</button>';
      }
    }
    return '<li class="dalles-creneau" data-etat="' + type + '"><div class="dalles-creneau__texte">' +
      '<p class="dalles-creneau__heure">' + D.heures(c) + '</p>' +
      '<p class="dalles-creneau__etat dalles-etat">' + etat + '</p></div>' + bouton + '</li>';
  }

  function vide(i) {
    var suivant = prochainOuvert(i);
    var titre = jours[i].getDay() === 0 ? 'Le club est fermé le dimanche' : (i === 0 ? 'Plus de créneau aujourd\'hui' : 'Aucun créneau ce jour-là');
    var texte = i === 0 && jours[i].getDay() !== 0 ? 'Les créneaux du jour ont déjà commencé.' : 'Aucune séance n\'est ouverte ce jour-là.';
    var action = suivant < 0 ? '' : '<div class="k-empty__actions"><button type="button" class="k-btn" data-aller="' + suivant + '">Voir ' + D.jourLong(jours[suivant]) + '</button></div>';
    return '<div class="k-empty k-empty--plain">' + '<svg class="k-icon k-empty__icon" aria-hidden="true"><use href="#i-cal"/></svg>' +
      '<h2 class="k-empty__title">' + titre + '</h2><p class="k-empty__text">' + texte + '</p>' + action + '</div>';
  }

  function panneau(i, membre) {
    var liste = ouverts(jours[i]);
    if (!liste.length) return vide(i);
    var semaine = membre ? ' · ' + pluriel(R.dansLaSemaine(liste[0].id), 'réservation') + ' sur ' + R.QUOTA + ' cette semaine-là' : '';
    return '<div class="k-stack"><h2 class="k-h3">' + D.jourLong(jours[i]) + semaine + '</h2>' +
      '<ul class="dalles-liste">' + liste.map(function (c) { return ligne(c, membre); }).join('') + '</ul></div>';
  }

  function entete(membre) {
    var compte = document.getElementById('cr-compte');
    var liens = document.getElementById('cr-liens');
    if (!membre) return;
    compte.textContent = 'Bonjour ' + Dalles.prenom(membre) + '. Choisissez le jour, puis touchez « Réserver ».';
    liens.innerHTML = '<a class="k-btn k-btn--secondary" href="mes-reservations.html">Mes réservations (' + R.aVenir().length + ')</a>';
  }

  function avisQuota(membre) {
    var avis = document.getElementById('cr-quota');
    var liste = ouverts(jours[courant]);
    var atteint = !!membre && liste.length > 0 && R.quotaAtteint(liste[0].id);
    avis.hidden = !atteint;
    if (atteint) avis.textContent = 'Vous avez déjà ' + R.QUOTA + ' réservations cette semaine-là (du lundi au samedi) : les autres créneaux sont fermés pour vous. Annulez-en une pour en prendre une autre.';
  }

  function dessiner() {
    var membre = Dalles.membre();
    jours.forEach(function (date, i) {
      document.getElementById('j' + i).textContent = i === 0 ? 'Aujourd\'hui' : D.jourCourt(date);
      document.getElementById('p' + i).innerHTML = panneau(i, membre);
    });
    entete(membre);
    avisQuota(membre);
  }

  function viser(selecteur) { var e = document.querySelector(selecteur); if (e) e.focus(); }

  function reserver(id) {
    var c = D.creneau(id);
    var resultat = R.reserver(id);
    dessiner();
    if (resultat === 'ok') {
      viser('[data-annuler="' + id + '"]');
      Dalles.dire({ type: 'success', title: 'Réservé : ' + D.nom(c), text: 'Vous pouvez annuler jusqu\'à ' + (c.debut.getHours() - 2) + ' h ce jour-là, ici ou dans « Mes réservations ».' });
    } else if (resultat === 'complet') {
      Dalles.dire({ type: 'error', title: 'Trop tard : la dernière place vient de partir', text: 'Le créneau ' + D.nom(c) + ' est maintenant complet. Vos autres réservations ne changent pas.' });
    } else if (resultat === 'quota') {
      viser('#p' + courant);
    }
  }

  function annuler(id) {
    var c = D.creneau(id);
    Dalles.demanderAnnulation(D.nom(c) + '. Votre place sera rendue aux autres membres.', function () {
      R.annuler(id);
      dessiner();
      viser('[data-reserver="' + id + '"]');
      Dalles.dire({ type: 'info', title: 'Réservation annulée', text: D.nom(c) + ' : la place est rendue. Vous pouvez la reprendre tant qu\'il en reste.' });
    });
  }

  var onglets = document.getElementById('cr-jours');
  onglets.addEventListener('k-tabs:change', function (e) {
    courant = +e.detail.tab.id.slice(1);
    avisQuota(Dalles.membre());
  });
  onglets.addEventListener('click', function (e) {
    var b = e.target.closest('[data-reserver], [data-annuler], [data-aller], [data-quota]');
    if (!b) return;
    if (b.hasAttribute('data-reserver')) reserver(b.getAttribute('data-reserver'));
    else if (b.hasAttribute('data-annuler')) annuler(b.getAttribute('data-annuler'));
    else if (b.hasAttribute('data-aller')) { var t = document.getElementById('j' + b.getAttribute('data-aller')); t.click(); t.focus(); }
    else document.getElementById('cr-quota').scrollIntoView({ block: 'center' });
  });

  dessiner();

  /* Retour de connexion, ou lien direct vers un jour : creneaux.html?jour=AAAA-MM-JJ */
  var voulu = new URLSearchParams(location.search).get('jour');
  window.addEventListener('load', function () {
    jours.forEach(function (date, i) { if (i > 0 && D.cle(date) === voulu) document.getElementById('j' + i).click(); });
  });
})();
