/* Les Dalles — dates et horaires du club. Un créneau s'identifie par « AAAA-MM-JJTHH » (heure de début). */
(function () {
  'use strict';

  var HORAIRES = { // jour de la semaine (0 = dimanche) → [début, fin]
    0: [],
    1: [[12, 14], [18, 20], [20, 22]], 2: [[12, 14], [18, 20], [20, 22]], 3: [[12, 14], [18, 20], [20, 22]],
    4: [[12, 14], [18, 20], [20, 22]], 5: [[12, 14], [18, 20], [20, 22]],
    6: [[10, 12], [14, 17]]
  };

  function deux(n) { return (n < 10 ? '0' : '') + n; }
  function cle(date) { return date.getFullYear() + '-' + deux(date.getMonth() + 1) + '-' + deux(date.getDate()); }
  function jour(texte) { var p = texte.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function ajouter(date, jours) { var d = new Date(date.getFullYear(), date.getMonth(), date.getDate()); d.setDate(d.getDate() + jours); return d; }
  function aujourdhui() { return ajouter(new Date(), 0); }

  /* Lundi de la semaine du jour : la semaine du quota va du lundi au samedi. */
  function lundi(date) { return cle(ajouter(date, -((date.getDay() + 6) % 7))); }

  function creneaux(date) {
    return HORAIRES[date.getDay()].map(function (h) {
      var debut = new Date(date.getFullYear(), date.getMonth(), date.getDate(), h[0]);
      var fin = new Date(date.getFullYear(), date.getMonth(), date.getDate(), h[1]);
      return { id: cle(date) + 'T' + deux(h[0]), debut: debut, fin: fin };
    });
  }

  function creneau(id) {
    var d = jour(id.slice(0, 10));
    return creneaux(d).filter(function (c) { return c.id === id; })[0] || null;
  }

  function jourLong(date) { return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }); }
  function jourCourt(date) {
    var t = date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' }).replace('.', '');
    return t.charAt(0).toUpperCase() + t.slice(1);
  }
  function heures(c) { return c.debut.getHours() + ' h – ' + c.fin.getHours() + ' h'; }
  function nom(c) { return jourLong(c.debut) + ', ' + heures(c); }

  /* Nombre stable tiré d'un texte : sert à simuler les places déjà prises par les autres. */
  function graine(texte) {
    var h = 7;
    for (var i = 0; i < texte.length; i++) h = (h * 31 + texte.charCodeAt(i)) % 9973;
    return h;
  }

  window.Dalles.dates = {
    cle: cle, jour: jour, ajouter: ajouter, aujourdhui: aujourdhui, lundi: lundi,
    creneaux: creneaux, creneau: creneau, jourLong: jourLong, jourCourt: jourCourt, heures: heures, nom: nom, graine: graine
  };
})();
