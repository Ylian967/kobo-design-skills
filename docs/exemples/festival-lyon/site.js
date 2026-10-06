/* Nuits Basses — billets, panier et compteur de la barre. Commun à toutes les pages.
   Le panier vit dans le navigateur (localStorage) : rien n'est envoyé nulle part. */
(function () {
  'use strict';

  var CLE = 'nb-panier';
  var MAX = 6; // billets par commande (règle du client)
  var FIN = { vendredi: '2027-06-12T20:00:00', samedi: '2027-06-13T20:00:00' };

  var BILLETS = [
    { id: 'ven', nom: 'Pass 1 soir, vendredi 12 juin', prix: 32, soirs: ['vendredi'] },
    { id: 'sam', nom: 'Pass 1 soir, samedi 13 juin', prix: 32, soirs: ['samedi'] },
    { id: 'deux', nom: 'Pass 2 soirs, vendredi et samedi', prix: 54, soirs: ['vendredi', 'samedi'] },
    { id: 'etu-ven', nom: 'Réduit étudiant, vendredi 12 juin', prix: 26, soirs: ['vendredi'] },
    { id: 'etu-sam', nom: 'Réduit étudiant, samedi 13 juin', prix: 26, soirs: ['samedi'] }
  ];

  var memoire = {};

  function lire() {
    try { return JSON.parse(localStorage.getItem(CLE)) || {}; } catch (e) { return memoire; }
  }

  function ecrire(panier) {
    memoire = panier;
    try { localStorage.setItem(CLE, JSON.stringify(panier)); } catch (e) { /* navigation privée */ }
    compteur();
  }

  function lignes() {
    var panier = lire();
    return BILLETS.filter(function (b) { return panier[b.id] > 0; }).map(function (b) {
      return { id: b.id, nom: b.nom, prix: b.prix, quantite: panier[b.id], sousTotal: b.prix * panier[b.id] };
    });
  }

  function nombre() {
    return lignes().reduce(function (n, l) { return n + l.quantite; }, 0);
  }

  function total() {
    return lignes().reduce(function (n, l) { return n + l.sousTotal; }, 0);
  }

  function pluriel(n) {
    return n + (n > 1 ? ' billets' : ' billet');
  }

  /* Un soir est fermé à la vente : complet (démonstration : ?complet=vendredi) ou portes ouvertes. */
  function ferme(soir) {
    var demo = new URLSearchParams(location.search).get('complet');
    if (demo === soir) return 'Complet';
    if (Date.now() >= new Date(FIN[soir]).getTime()) return 'Vente en ligne terminée';
    return '';
  }

  function etat(billet) {
    return billet.soirs.map(ferme).filter(Boolean)[0] || '';
  }

  function compteur() {
    var n = nombre();
    document.querySelectorAll('[data-nb-compteur]').forEach(function (el) {
      el.textContent = n ? (el.getAttribute('data-nb-compteur') === 'court' ? ' (' + n + ')' : '· ' + pluriel(n)) : '';   // dans la barre : court, pour tenir à côté de « Menu »
    });
    if (window.Kobo && Kobo.nav) document.querySelectorAll('.k-nav').forEach(Kobo.nav.fit);
  }

  window.NB = {
    MAX: MAX, BILLETS: BILLETS,
    lire: lire, ecrire: ecrire, lignes: lignes, nombre: nombre, total: total,
    pluriel: pluriel, etat: etat,
    vider: function () { ecrire({}); }
  };

  compteur();
})();
