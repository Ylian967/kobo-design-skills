/* Page Billets : quantités, total, limite de six, soir complet, « Retirer », « Commander ». */
(function () {
  'use strict';

  var form = document.getElementById('f-billets');
  if (!form || !window.NB) return;

  var etat = document.getElementById('nb-etat');
  var commander = document.getElementById('commander');
  var manque = document.getElementById('nb-manque');

  function liste(id) { return document.getElementById('q-' + id); }

  function panierDesListes() {
    var panier = {};
    NB.BILLETS.forEach(function (b) { panier[b.id] = Number(liste(b.id).value) || 0; });
    return panier;
  }

  /* Un soir fermé : la ligne le dit en toutes lettres et sa liste ne s'ouvre plus. */
  function fermerLignes() {
    NB.BILLETS.forEach(function (b) {
      var raison = NB.etat(b);
      if (!raison) return;
      var select = liste(b.id);
      select.value = '0';
      select.disabled = true;
      document.getElementById('a-' + b.id).textContent = raison + '. Ce billet ne peut plus être choisi.';
    });
  }

  /* Prévention : une liste ne propose jamais plus que ce qui reste sur les six. */
  function borner() {
    var pris = NB.nombre();
    NB.BILLETS.forEach(function (b) {
      var select = liste(b.id);
      var reste = NB.MAX - (pris - Number(select.value));
      Array.prototype.forEach.call(select.options, function (o) { o.disabled = Number(o.value) > reste; });
    });
  }

  function afficher() {
    var n = NB.nombre();
    document.getElementById('nb-nombre').textContent = String(n);
    document.getElementById('nb-total').textContent = NB.total() + ' €';
    NB.BILLETS.forEach(function (b) {
      form.querySelector('[data-nb-retirer="' + b.id + '"]').hidden = !(Number(liste(b.id).value) > 0);
    });
    borner();
    if (n === 0) {
      etat.textContent = 'Aucun billet choisi pour l\'instant.';
      commander.setAttribute('aria-disabled', 'true');
      manque.hidden = false;
    } else {
      etat.textContent = NB.pluriel(n) + ', ' + NB.total() + ' € à payer.'
        + (n >= NB.MAX ? ' Maximum atteint : six billets par commande.' : ' Vous pouvez commander.');
      commander.removeAttribute('aria-disabled');
      manque.hidden = true;
    }
  }

  function reprendre() {
    var panier = NB.lire();
    NB.BILLETS.forEach(function (b) {
      liste(b.id).value = String(NB.etat(b) ? 0 : Math.min(panier[b.id] || 0, NB.MAX));
    });
    fermerLignes();
    NB.ecrire(panierDesListes());
    afficher();
  }

  form.addEventListener('change', function (e) {
    if (!e.target.matches('select')) return;
    NB.ecrire(panierDesListes());
    afficher();
  });

  form.addEventListener('click', function (e) {
    var bouton = e.target.closest('[data-nb-retirer]');
    if (!bouton) return;
    var select = liste(bouton.getAttribute('data-nb-retirer'));
    select.value = '0';
    NB.ecrire(panierDesListes());
    afficher();
    select.focus();
  });

  function premierLibre() {
    return form.querySelector('select:not(:disabled)') || liste('ven');
  }

  manque.addEventListener('click', function (e) {
    e.preventDefault();
    premierLibre().focus();
  });

  form.addEventListener('submit', function (e) {
    var n = NB.nombre();
    if (n >= 1 && n <= NB.MAX) return; // la page Commande prend la suite
    e.preventDefault();
    etat.textContent = n === 0
      ? 'Choisissez au moins un billet avant de commander.'
      : 'Six billets au plus par commande : retirez-en ' + (n - NB.MAX) + '.';
    premierLibre().focus();
  });

  /* Retour par le bouton « précédent » du navigateur : on relit le panier. */
  window.addEventListener('pageshow', reprendre);
  reprendre();
})();
