/* Les Dalles — règles de réservation (simulées) : 20 places, 3 par semaine, annulation jusqu'à 2 h avant. */
(function () {
  'use strict';

  var D = Dalles.dates;
  var PLACES = 20;
  var QUOTA = 3;
  var DELAI_ANNULATION = 2 * 60 * 60 * 1000;

  function miennes(d) {
    var m = Dalles.membre();
    return m ? (d.reservations[m.email] || []) : [];
  }

  /* Places prises par les autres membres : une valeur simulée, stable d'une visite à l'autre. */
  function prisesParLesAutres(d, id) {
    if (id in d.occupation) return d.occupation[id];
    var n = D.graine(id) % 24;
    return n > PLACES ? PLACES : n;
  }

  function restantes(id) {
    var d = Dalles.lire();
    var moi = miennes(d).indexOf(id) >= 0 ? 1 : 0;
    return Math.max(0, PLACES - prisesParLesAutres(d, id) - moi);
  }

  function estReserve(id) { return miennes(Dalles.lire()).indexOf(id) >= 0; }

  function dansLaSemaine(id) {
    var semaine = D.lundi(D.jour(id.slice(0, 10)));
    return miennes(Dalles.lire()).filter(function (r) { return D.lundi(D.jour(r.slice(0, 10))) === semaine; }).length;
  }

  function quotaAtteint(id) { return dansLaSemaine(id) >= QUOTA; }

  function aVenir() {
    var maintenant = new Date();
    return miennes(Dalles.lire())
      .map(D.creneau)
      .filter(function (c) { return c && c.fin > maintenant; })
      .sort(function (a, b) { return a.debut - b.debut; });
  }

  function annulable(c) { return c.debut - new Date() > DELAI_ANNULATION; }

  /* Rend 'ok', 'complet' (pris entre-temps), 'quota', 'deja' ou 'deconnecte'. */
  function reserver(id) {
    var m = Dalles.membre();
    if (!m) return 'deconnecte';
    if (estReserve(id)) return 'deja';
    if (quotaAtteint(id)) return 'quota';
    if (restantes(id) < 1) return 'complet';
    Dalles.changer(function (d) { (d.reservations[m.email] = d.reservations[m.email] || []).push(id); });
    return 'ok';
  }

  function annuler(id) {
    var m = Dalles.membre();
    if (!m) return;
    Dalles.changer(function (d) {
      d.reservations[m.email] = (d.reservations[m.email] || []).filter(function (r) { return r !== id; });
    });
  }

  Dalles.reservations = {
    PLACES: PLACES, QUOTA: QUOTA,
    restantes: restantes, estReserve: estReserve, dansLaSemaine: dansLaSemaine, quotaAtteint: quotaAtteint,
    aVenir: aVenir, annulable: annulable, reserver: reserver, annuler: annuler
  };
})();
