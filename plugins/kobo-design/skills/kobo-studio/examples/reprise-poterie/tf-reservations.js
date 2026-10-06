/* Terre & Feu — réservations simulées, gardées dans ce navigateur (localStorage).
   Rien ne part vers l'atelier : à remplacer par l'appel au service réel. */
(function () {
  'use strict';
  var CLE = 'terre-et-feu-reservations-v1', memoire = null;

  /* Inscrits d'exemple, pour que les états « presque complet », « complet » et la liste de l'atelier se voient. */
  function exemples() {
    var sam = TF.seances('decouverte'), mer = TF.seances('duo'), cyc = TF.seances('cycle');
    function r(ref, s, nom, tel, places) {
      return { ref: ref, seance: s.id, formule: s.formule, nom: nom + ' (exemple)', email: 'exemple@terre-et-feu.example', tel: tel, places: places, etat: 'active', reporte: false };
    }
    return [
      r('TF-1001', sam[0], 'Camille Martin', '06 00 00 00 01', 2), r('TF-1002', sam[0], 'Sacha Leroy', '06 00 00 00 02', 2),
      r('TF-1003', sam[1], 'Noa Bernard', '06 00 00 00 03', 2), r('TF-1004', sam[1], 'Lou Petit', '06 00 00 00 04', 2),
      r('TF-1005', sam[1], 'Alix Moreau', '06 00 00 00 05', 2), r('TF-1006', mer[0], 'Dominique Roux', '06 00 00 00 06', 1),
      r('TF-1007', cyc[0], 'Claude Fournier', '06 00 00 00 07', 1), r('TF-1008', cyc[0], 'Maxime Girard', '06 00 00 00 08', 2)
    ];
  }

  function ecrire(d) { memoire = d; try { localStorage.setItem(CLE, JSON.stringify(d)); } catch (e) { /* stockage refusé : la mémoire suffit pour la page */ } }
  function lire() {
    var t = null;
    try { t = localStorage.getItem(CLE); } catch (e) { t = null; }
    if (t) { try { return JSON.parse(t); } catch (e) { t = null; } }
    if (memoire) return memoire;
    var d = exemples(); ecrire(d); return d;
  }
  function parRef(ref) {
    var cle = String(ref || '').trim().toUpperCase();
    return lire().filter(function (r) { return r.ref === cle; })[0] || null;
  }
  function restant(id) {
    var s = TF.seance(id); if (!s) return 0;
    var prises = lire().reduce(function (n, r) { return n + (r.seance === id && r.etat === 'active' ? r.places : 0); }, 0);
    return TF.formules[s.formule].places - prises;
  }
  function modifier(ref, fn) {
    var d = lire(), r = d.filter(function (x) { return x.ref === ref; })[0];
    if (!r) return null;
    if (fn(r) === false) return null;
    ecrire(d); return r;
  }

  TF.restant = restant;
  TF.parRef = parRef;
  TF.trouver = function (ref, email) {
    var r = parRef(ref);
    return r && r.email.toLowerCase() === String(email).trim().toLowerCase() ? r : null;
  };
  TF.inscrits = function (id) { return lire().filter(function (r) { return r.seance === id && r.etat !== 'annulee'; }); };
  TF.reserver = function (o) {
    var s = TF.seance(o.seance), reste = restant(o.seance);
    if (!s || reste < o.places) return { ok: false, restant: Math.max(reste, 0) };
    var d = lire(), ref;
    do { ref = 'TF-' + Math.floor(2000 + Math.random() * 8000); } while (parRef(ref));
    var r = { ref: ref, seance: s.id, formule: s.formule, nom: o.nom, email: o.email, tel: o.tel, places: o.places, etat: 'active', reporte: false };
    d.push(r); ecrire(d);
    return { ok: true, r: r };
  };
  TF.annuler = function (ref) { return modifier(ref, function (r) { r.etat = 'annulee'; }); };
  TF.retirer = function (ref) { return modifier(ref, function (r) { r.etat = 'retiree'; }); };
  TF.retablir = function (ref) {
    return modifier(ref, function (r) { if (restant(r.seance) < r.places) return false; r.etat = 'active'; });
  };
  /* Changer de date. À moins de 48 h de l'ancienne séance, le changement ne se fait qu'une fois. */
  TF.deplacer = function (ref, id) {
    return modifier(ref, function (r) {
      if (restant(id) < r.places) return false;
      if (TF.heuresAvant(TF.seance(r.seance)) < 48) r.reporte = true;
      r.seance = id;
    });
  };
  /* Envoi simulé : un court délai, et un échec quand le navigateur est hors ligne. */
  TF.envoyer = function (fn) {
    return new Promise(function (ok, rate) {
      setTimeout(function () { if (navigator.onLine === false) rate(new Error('hors ligne')); else ok(fn()); }, 400);
    });
  };
})();
