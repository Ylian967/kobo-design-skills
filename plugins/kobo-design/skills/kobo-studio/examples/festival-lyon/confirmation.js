/* Page Confirmation : affiche la commande qui vient d'être payée (simulation), ou un état vide. */
(function () {
  'use strict';

  var commande = null;
  try { commande = JSON.parse(sessionStorage.getItem('nb-commande')); } catch (e) { commande = null; }

  var ok = document.getElementById('nb-ok');
  var detail = document.getElementById('nb-detail');
  var vide = document.getElementById('nb-vide');
  if (!ok || !detail || !vide) return;

  if (!commande || !commande.lignes || !commande.lignes.length) {
    ok.hidden = true;
    detail.hidden = true;
    vide.hidden = false;
    return;
  }

  /* Une ligne de texte par achat : pas de liste de faits ici, la couche mouvement y ferait compter les prix. */
  function ajouter(liste, terme, valeur) {
    var li = document.createElement('li');
    li.textContent = terme + ' : ' + valeur;
    liste.appendChild(li);
  }

  document.getElementById('nb-numero').textContent = commande.numero;
  document.getElementById('nb-mail').textContent = commande.mail;

  var dl = document.getElementById('nb-recap');
  commande.lignes.forEach(function (l) { ajouter(dl, l.quantite + ' × ' + l.nom, l.sousTotal + ' €'); });
  ajouter(dl, 'Total payé', commande.total + ' €');
  ajouter(dl, 'Numéro de commande', commande.numero);

  document.getElementById('nb-ecrire').href = 'mailto:salut@nuits-basses.example?subject='
    + encodeURIComponent('Commande ' + commande.numero);
})();
