/* Terre & Feu — formules et séances d'exemple, calculées à partir d'aujourd'hui.
   À remplacer par les vraies dates quand un service de réservation sera branché. */
(function () {
  'use strict';
  var FORMULES = {
    decouverte: { nom: 'Découverte du tour', prix: 55, tarif: '55 € par personne', places: 6, unite: 'place', detail: 'Une séance de 2 h 30' },
    cycle: { nom: 'Cycle tournage débutant', prix: 290, tarif: '290 € par personne', places: 6, unite: 'place', detail: '6 séances de 2 h 30' },
    duo: { nom: 'Modelage parent-enfant', prix: 40, tarif: '40 € le duo', places: 3, unite: 'duo', detail: 'Une séance de 1 h 30, dès 6 ans' }
  };

  function iso(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function deIso(s) { var p = s.split('-'); return new Date(+p[0], p[1] - 1, +p[2]); }

  /* Les prochains jours de la semaine voulus (0 = dimanche), à partir de demain : on réserve jusqu'à la veille. */
  function prochains(jour, combien, saut) {
    var d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + 1);
    while (d.getDay() !== jour) d.setDate(d.getDate() + 1);
    d.setDate(d.getDate() + 7 * (saut || 0));
    var out = [];
    for (var i = 0; i < combien; i++) { out.push(iso(d)); d.setDate(d.getDate() + 7); }
    return out;
  }

  function construire() {
    var liste = [];
    prochains(6, 6).forEach(function (j) { liste.push({ id: 'decouverte-' + j, formule: 'decouverte', date: j, debut: 10, heure: '10 h – 13 h' }); });
    prochains(3, 3).forEach(function (j) {
      liste.push({ id: 'duo-' + j + '-14', formule: 'duo', date: j, debut: 14, heure: '14 h – 15 h 30' });
      liste.push({ id: 'duo-' + j + '-16', formule: 'duo', date: j, debut: 16, heure: '16 h – 17 h 30' });
    });
    [[2, 'mardi'], [4, 'jeudi']].forEach(function (c) {
      var dates = prochains(c[0], 6, 1);
      liste.push({ id: 'cycle-' + dates[0], formule: 'cycle', date: dates[0], debut: 18.5, heure: '18 h 30 – 21 h', dates: dates, soir: c[1] });
    });
    return liste.sort(function (a, b) { return (a.date + a.debut).localeCompare(b.date + b.debut) || a.debut - b.debut; });
  }
  var TOUTES = construire();

  function jour(s) {
    var t = deIso(s).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
    return t.replace(/ 1 /, ' 1er ');
  }
  function majuscule(t) { return t.charAt(0).toUpperCase() + t.slice(1); }

  window.TF = {
    formules: FORMULES,
    seances: function (formule) { return TOUTES.filter(function (s) { return !formule || s.formule === formule; }); },
    seance: function (id) { return TOUTES.filter(function (s) { return s.id === id; })[0] || null; },
    jour: jour,
    /* « Samedi 10 octobre » ; pour un cycle : « Cycle du mardi, du 20 octobre au 24 novembre ». */
    titre: function (s) {
      if (!s.dates) return majuscule(jour(s.date));
      return 'Cycle du ' + s.soir + ', du ' + jour(s.dates[0]).replace(/^\S+ /, '') + ' au ' + jour(s.dates[5]).replace(/^\S+ /, '');
    },
    heuresAvant: function (s) {
      var d = deIso(s.date); d.setHours(Math.floor(s.debut), (s.debut % 1) * 60);
      return (d.getTime() - Date.now()) / 3600000;
    },
    /* « 2 places », « 1 duo ». */
    compte: function (n, formule) { var u = FORMULES[formule].unite; return n + ' ' + u + (n > 1 ? 's' : ''); },
    aRegler: function (r) {
      var f = FORMULES[r.formule], total = f.prix * r.places;
      return total + ' €' + (r.places > 1 ? ' (' + r.places + ' × ' + f.prix + ' €)' : '') + ', sur place, par chèque ou carte';
    }
  };
})();
