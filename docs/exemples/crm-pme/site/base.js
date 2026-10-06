/*
 * Rivage Suivi — socle du projet : repères, lecture et écriture d'une ligne, compte et total.
 * Rien n'est enregistré : tout vit dans la page (kobo/ n'est pas modifié).
 */
(function () {
  'use strict';

  var ap = document.querySelector('.ap');
  if (!ap || !window.Kobo) return;

  var ETAPES = { qualification: 'Qualification', proposition: 'Proposition', negociation: 'Négociation', gagnee: 'Gagnée', perdue: 'Perdue' };
  var RANGS = Object.keys(ETAPES);
  var SERVICES = { audit: 'Audit', refonte: 'Refonte de site', formation: 'Formation', maintenance: 'Maintenance' };
  var RESPONSABLES = {};
  var SANS_DATE = '9999-12-31';
  var dates = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
  var nombres = new Intl.NumberFormat('fr-FR');
  var tbody = ap.querySelector('.ap-list tbody');
  var table = ap.querySelector('.ap-list .k-table');

  ap.querySelectorAll('[data-ap-filter="responsable"] option').forEach(function (o) { if (o.value) RESPONSABLES[o.value] = o.textContent; });

  function avancementDe(etape) { return etape === 'gagnee' || etape === 'perdue' ? 'close' : 'ouverte'; }
  function euros(montant) { return montant === '' ? 'Non renseigné' : nombres.format(Number(montant)) + ' €'; }
  function jour(cloture) { return cloture ? dates.format(new Date(cloture + 'T12:00:00')) : 'Non renseignée'; }

  /* ---------- Une ligne du tableau, lue comme une affaire ---------- */
  function lire(tr) {
    var c = tr.children;
    return {
      affaire: c[0].textContent.trim(), societe: c[1].textContent.trim(), service: tr.dataset.service, etape: tr.dataset.etape,
      montant: c[3].textContent.trim() === 'Non renseigné' ? '' : c[3].dataset.kSort,
      cloture: c[4].dataset.kSort === SANS_DATE ? '' : c[4].dataset.kSort,
      responsable: tr.dataset.responsable, archivee: tr.dataset.avancement === 'archivee'
    };
  }

  function ecrire(tr, v) {
    var c = tr.children;
    tr.dataset.etape = v.etape; tr.dataset.service = v.service; tr.dataset.responsable = v.responsable;
    tr.dataset.avancement = v.archivee ? 'archivee' : avancementDe(v.etape);
    c[0].textContent = v.affaire;
    c[1].textContent = v.societe;
    c[2].textContent = ETAPES[v.etape] + (v.archivee ? ' · archivée' : ''); c[2].dataset.kSort = RANGS.indexOf(v.etape) + 1;
    c[3].textContent = euros(v.montant); c[3].dataset.kSort = v.montant === '' ? 0 : v.montant;
    c[4].textContent = jour(v.cloture); c[4].dataset.kSort = v.cloture || SANS_DATE;
    c[5].textContent = RESPONSABLES[v.responsable] || v.responsable;
  }

  function creerLigne(v) {
    var tr = document.createElement('tr'), th = document.createElement('th');
    th.scope = 'row'; tr.appendChild(th);
    for (var i = 0; i < 5; i++) tr.appendChild(document.createElement('td'));
    tr.children[2].dataset.rsCell = 'etape';
    tr.children[3].dataset.kType = 'number';
    ecrire(tr, v);
    return tr;
  }

  function nommer(v) { return '« ' + v.affaire + ' », ' + v.societe; }

  /* ---------- La liste après un changement : tri en cours, filtres, compte ---------- */
  function rafraichir() {
    var th = table.querySelector('th[aria-sort="ascending"], th[aria-sort="descending"]');
    if (th) Kobo.table.sort(table, th, th.getAttribute('aria-sort'));
    Kobo.app.filter(ap);
  }

  /* ---------- Montant total des affaires affichées (la gérante regarde l'ensemble) ---------- */
  var total = ap.querySelector('[data-rs-total]');
  var apres = [];
  function compter() {
    var somme = 0, sans = 0;
    tbody.querySelectorAll('tr:not([hidden])').forEach(function (tr) {
      var m = lire(tr).montant;
      if (m === '') sans += 1; else somme += Number(m);
    });
    var texte = 'Montant total affiché : ' + nombres.format(somme) + ' € HT' + (sans ? ' (' + sans + ' sans montant)' : '') + '.';
    if (total.textContent !== texte) total.textContent = texte;
    apres.forEach(function (f) { f(); });
  }
  // Le kit masque les lignes hors filtre : on recompte dès qu'une ligne change d'état, entre ou sort.
  new MutationObserver(compter).observe(tbody, { subtree: true, childList: true, attributes: true, attributeFilter: ['hidden'] });

  window.Rivage = {
    ap: ap, tbody: tbody, table: table, ETAPES: ETAPES, RANGS: RANGS, SERVICES: SERVICES, RESPONSABLES: RESPONSABLES,
    lire: lire, ecrire: ecrire, creerLigne: creerLigne, nommer: nommer, euros: euros, jour: jour,
    rafraichir: rafraichir, compter: compter, apresFiltre: function (f) { apres.push(f); }
  };
  compter();
})();
