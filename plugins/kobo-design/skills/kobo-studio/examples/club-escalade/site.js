/* Les Dalles — socle du site : données simulées (gardées dans le navigateur), session, barre.
   Rien ne part vers un serveur : connexion, réservations, paiement et e-mails sont simulés. */
(function () {
  'use strict';

  var CLE = 'les-dalles';
  var DEMO = { email: 'camille@lesdalles.example', mdp: 'grimpe2026', nom: 'Camille Roche', tel: '', formule: 'adulte' };
  var memoire = null; // repli si le navigateur refuse localStorage

  function lire() {
    var d = memoire;
    try { d = JSON.parse(localStorage.getItem(CLE)) || memoire; } catch (e) { /* repli mémoire */ }
    d = d || {};
    d.comptes = d.comptes || [DEMO];
    d.reservations = d.reservations || {};
    d.occupation = d.occupation || {};
    return d;
  }

  function ecrire(d) {
    memoire = d;
    try { localStorage.setItem(CLE, JSON.stringify(d)); } catch (e) { /* repli mémoire */ }
  }

  function changer(fn) { var d = lire(); var r = fn(d); ecrire(d); return r; }

  function compte(d, email) {
    email = String(email || '').trim().toLowerCase();
    return d.comptes.filter(function (c) { return c.email === email; })[0] || null;
  }

  function membre() { var d = lire(); return d.session ? compte(d, d.session) : null; }
  function prenom(m) { return m.nom.split(' ')[0]; }

  function connecter(email, mdp) {
    return changer(function (d) {
      var c = compte(d, email);
      if (!c || c.mdp !== mdp) return false;
      d.session = c.email;
      return true;
    });
  }

  function deconnecter() { changer(function (d) { d.session = null; }); }

  function creerCompte(infos) {
    return changer(function (d) {
      if (compte(d, infos.email)) return false;
      var c = { email: infos.email.trim().toLowerCase(), mdp: infos.mdp, nom: infos.nom.trim(), tel: infos.tel, formule: infos.formule };
      d.comptes.push(c);
      d.session = c.email;
      return true;
    });
  }

  /* Barre et menu : « Se connecter » devient le prénom, l'action devient « Réserver ». */
  function habillerBarre() {
    var m = membre();
    document.querySelectorAll('[data-dalles="lien-compte"]').forEach(function (a) {
      a.firstChild.nodeValue = m ? prenom(m) + ' · mes réservations' : 'Se connecter';
      a.setAttribute('href', m ? 'mes-reservations.html' : 'connexion.html');
    });
    document.querySelectorAll('[data-dalles="action"]').forEach(function (a) {
      if (!m) return;
      a.textContent = 'Réserver un créneau';
      a.setAttribute('href', 'creneaux.html');
    });
    document.querySelectorAll('[data-dalles="deconnexion"]').forEach(function (b) { b.hidden = !m; });
    if (window.Kobo && Kobo.nav && Kobo.nav.fit) document.querySelectorAll('.k-nav').forEach(Kobo.nav.fit);
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-dalles="deconnexion"]');
    if (!b) return;
    deconnecter();
    location.href = 'index.html';
  });

  /* Un seul message à la fois : sur téléphone, une pile de messages recouvrirait les boutons. */
  var message = null;
  function dire(options) {
    if (message) message.close();
    message = Kobo.toast(options);
    return message;
  }

  window.Dalles = {
    dire: dire,
    lire: lire, changer: changer, compte: compte, membre: membre, prenom: prenom,
    connecter: connecter, deconnecter: deconnecter, creerCompte: creerCompte, habillerBarre: habillerBarre,
    TELEPHONE: '04 00 00 00 38'
  };

  habillerBarre();
})();
