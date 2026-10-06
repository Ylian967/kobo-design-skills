/* Les Dalles — page Mes réservations : la liste à venir, annuler, se déconnecter. */
(function () {
  'use strict';

  var D = Dalles.dates;
  var R = Dalles.reservations;
  var membre = Dalles.membre();

  /* Déconnecté : jamais une page vide. La connexion dit ce qu'il y a derrière, puis ramène ici. */
  if (!membre) { location.replace('connexion.html?retour=mes-reservations.html'); return; }

  var liste = document.getElementById('mr-liste');
  var vide = document.getElementById('mr-vide');

  function ligne(c) {
    var ok = R.annulable(c);
    var etat = ok ? 'Annulable jusqu\'à ' + (c.debut.getHours() - 2) + ' h' : 'Annulation fermée (moins de 2 h avant) : appelez le ' + Dalles.TELEPHONE;
    var bouton = ok ? '<button type="button" class="k-btn k-btn--secondary" data-annuler="' + c.id + '" aria-label="Annuler, ' + D.nom(c) + '">Annuler</button>' : '';
    return '<li class="dalles-creneau" data-etat="reserve"><div class="dalles-creneau__texte">' +
      '<p class="dalles-creneau__heure">' + D.jourLong(c.debut) + '</p>' +
      '<p>' + D.heures(c) + '</p><p class="dalles-creneau__etat">' + etat + '</p></div>' + bouton + '</li>';
  }

  function dessiner() {
    var aVenir = R.aVenir();
    var cetteSemaine = R.dansLaSemaine(D.cle(D.aujourdhui()));
    liste.innerHTML = aVenir.map(ligne).join('');
    liste.hidden = !aVenir.length;
    vide.hidden = !!aVenir.length;
    document.getElementById('mr-compte').textContent = cetteSemaine + ' réservation' + (cetteSemaine > 1 ? 's' : '') + ' sur ' + R.QUOTA + ' cette semaine (du lundi au samedi).';
    document.getElementById('mr-identite').textContent = 'Connecté : ' + membre.nom + ' (' + membre.email + ').';
  }

  function retablir(id) {
    var c = D.creneau(id);
    var resultat = R.reserver(id);
    dessiner();
    if (resultat === 'ok') Dalles.dire({ type: 'success', title: 'Réservation rétablie', text: D.nom(c) + '.' });
    else Dalles.dire({ type: 'error', title: 'La place n\'est plus libre', text: D.nom(c) + ' : le créneau s\'est rempli entre-temps. Vos autres réservations ne changent pas.' });
  }

  liste.addEventListener('click', function (e) {
    var b = e.target.closest('[data-annuler]');
    if (!b) return;
    var id = b.getAttribute('data-annuler');
    var c = D.creneau(id);
    Dalles.demanderAnnulation(D.nom(c) + '. Votre place sera rendue aux autres membres.', function () {
      R.annuler(id);
      dessiner();
      document.getElementById('t-avenir').focus();
      Dalles.dire({ type: 'info', title: 'Réservation annulée', text: D.nom(c) + ' : la place est rendue.', action: { label: 'Réserver à nouveau', onClick: function () { retablir(id); } }, duration: 0 });
    });
  });

  dessiner();
})();
