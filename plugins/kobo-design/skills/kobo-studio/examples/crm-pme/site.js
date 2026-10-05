/*
 * Rivage Suivi — comportements du projet, par-dessus le kit (kobo/ n'est pas modifié).
 * Rien n'est enregistré : la création d'une affaire et le changement d'étape sont simulés dans la page.
 */
(function () {
  'use strict';

  var ETAPES = { qualification: 'Qualification', proposition: 'Proposition', negociation: 'Négociation', gagnee: 'Gagnée', perdue: 'Perdue' };
  var RANGS = Object.keys(ETAPES);
  var SERVICES = { audit: 'Audit', refonte: 'Refonte de site', formation: 'Formation', maintenance: 'Maintenance' };
  var DELAI_ENVOI_SIMULE = 600;
  var CLE_DENSITE = 'rivage-suivi-densite';

  var ap = document.querySelector('.ap');
  if (!ap || !window.Kobo) return;
  var tbody = ap.querySelector('.ap-list tbody');
  var fAvancement = ap.querySelector('[data-ap-filter="avancement"]');
  var fEtape = ap.querySelector('[data-ap-filter="etape"]');

  function estClose(etape) { return etape === 'gagnee' || etape === 'perdue'; }
  function avancementDe(etape) { return estClose(etape) ? 'close' : 'ouverte'; }

  /* ---------- Compteur de la barre latérale : les affaires ouvertes ---------- */
  function compterOuvertes() {
    var n = tbody.querySelectorAll('tr[data-avancement="ouverte"]').length;
    ap.querySelectorAll('[data-rs-ouvertes]').forEach(function (el) { el.textContent = n; });
  }

  /* ---------- Filtres : « Avancement » et « Étape » ne se contredisent pas ---------- */
  // Ces écouteurs sont posés sur les listes elles-mêmes : ils passent avant le filtrage du kit, délégué sur .ap.
  fEtape.addEventListener('change', function () {
    if (fEtape.value && fAvancement.value && fAvancement.value !== avancementDe(fEtape.value)) fAvancement.value = avancementDe(fEtape.value);
  });
  fAvancement.addEventListener('change', function () {
    if (fEtape.value && fAvancement.value && fAvancement.value !== avancementDe(fEtape.value)) fEtape.value = '';
  });
  // « Effacer les filtres » revient à la vue de départ : les affaires ouvertes. Passe après le kit (écouteur sur document).
  document.addEventListener('click', function (e) {
    if (!e.target.closest('[data-ap-reset]')) return;
    fAvancement.value = 'ouverte';
    Kobo.app.filter(ap);
  });

  /* ---------- Panneau de détail : le service en plus, et l'étape à changer ---------- */
  var choixEtape = ap.querySelector('[data-rs-etape]');
  var ligneOuverte = null;

  function ecrireFait(nom, valeur) {
    var faits = ap.querySelector('[data-ap-facts]'), trouve = null;
    faits.querySelectorAll('dt').forEach(function (dt) { if (dt.textContent === nom) trouve = dt.nextElementSibling; });
    if (trouve) { trouve.textContent = valeur; return; }
    var bloc = document.createElement('div'), dt = document.createElement('dt'), dd = document.createElement('dd');
    dt.textContent = nom; dd.textContent = valeur; bloc.appendChild(dt); bloc.appendChild(dd); faits.appendChild(bloc);
  }

  ap.addEventListener('k-app:open', function (e) {
    ligneOuverte = e.detail.row;
    choixEtape.value = ligneOuverte.dataset.etape;
    ecrireFait('Service', SERVICES[ligneOuverte.dataset.service] || 'Non renseigné');
  });
  ap.addEventListener('k-app:close', function () { ligneOuverte = null; });

  choixEtape.addEventListener('change', function () {
    var ligne = ligneOuverte, etape = choixEtape.value;
    if (!ligne || etape === ligne.dataset.etape) return;
    var nom = ligne.querySelector('th[scope="row"]').textContent.trim(), cellule = ligne.querySelector('[data-rs-cell="etape"]');
    ligne.dataset.etape = etape;
    ligne.dataset.avancement = avancementDe(etape);
    cellule.textContent = ETAPES[etape];
    cellule.dataset.kSort = RANGS.indexOf(etape) + 1;
    ecrireFait('Étape', ETAPES[etape]);
    compterOuvertes();
    Kobo.app.filter(ap);   // si la ligne sort des filtres, le kit ferme le panneau
    var sortie = ligne.hidden;
    Kobo.toast({
      type: 'success',
      title: 'Étape changée : ' + ETAPES[etape],
      text: '« ' + nom + ' »' + (sortie ? ' ne correspond plus aux filtres en cours : elle a quitté la liste affichée.' : ' est à jour dans la liste.') + ' Changement non enregistré (démonstration).'
    });
  });

  /* ---------- Créer une affaire : envoi simulé ---------- */
  var fenetre = document.getElementById('rs-creer');
  var form = document.getElementById('rs-form');
  var envoi = document.querySelector('[data-rs-envoi]');
  var libelleEnvoi = envoi.textContent;
  var dates = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
  var nombres = new Intl.NumberFormat('fr-FR');

  function cellule(texte, tri, nombre) {
    var td = document.createElement('td');
    td.textContent = texte;
    if (tri !== undefined) td.dataset.kSort = tri;
    if (nombre) td.dataset.kType = 'number';
    return td;
  }

  function ajouterLigne(v) {
    var tr = document.createElement('tr'), th = document.createElement('th');
    tr.dataset.etape = v.etape; tr.dataset.avancement = avancementDe(v.etape); tr.dataset.responsable = v.responsable; tr.dataset.service = v.service;
    th.scope = 'row'; th.textContent = v.affaire; tr.appendChild(th);
    tr.appendChild(cellule(v.societe));
    var etape = cellule(ETAPES[v.etape], RANGS.indexOf(v.etape) + 1); etape.dataset.rsCell = 'etape'; tr.appendChild(etape);
    tr.appendChild(v.montant === '' ? cellule('Non renseigné', 0, true) : cellule(nombres.format(Number(v.montant)) + ' €', v.montant, true));
    tr.appendChild(v.cloture ? cellule(dates.format(new Date(v.cloture + 'T12:00:00')), v.cloture) : cellule('Non renseignée', '9999-12-31'));
    tr.appendChild(cellule(form.elements.responsable.selectedOptions[0].textContent));
    tbody.appendChild(tr);
    return tr;
  }

  // La nouvelle ligne prend sa place dans le tri en cours.
  function retrier() {
    var table = ap.querySelector('.ap-list .k-table'), th = table.querySelector('th[aria-sort="ascending"], th[aria-sort="descending"]');
    if (th) Kobo.table.sort(table, th, th.getAttribute('aria-sort'));
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (envoi.getAttribute('aria-busy') === 'true') return;   // un second clic est ignoré
    var fautifs = Array.prototype.filter.call(form.querySelectorAll('.k-field[data-k-validate]'), function (champ) { return !Kobo.field.validate(champ); });
    if (fautifs.length) { fautifs[0].querySelector('.k-field__control').focus(); return; }
    var v = {};
    ['affaire', 'societe', 'service', 'etape', 'montant', 'cloture', 'responsable'].forEach(function (n) { v[n] = form.elements[n].value.trim(); });
    envoi.setAttribute('aria-busy', 'true'); envoi.textContent = 'Envoi en cours…';
    setTimeout(function () {   // aucun service n'est branché : la réponse est simulée
      envoi.removeAttribute('aria-busy'); envoi.textContent = libelleEnvoi;
      var ligne = ajouterLigne(v);
      form.reset();
      Kobo.modal.close('rs-creer');
      retrier();
      compterOuvertes();
      Kobo.app.filter(ap);
      Kobo.toast({
        type: 'success',
        title: 'Affaire créée : ' + v.affaire,
        text: (ligne.hidden ? 'Elle ne correspond pas aux filtres en cours : effacez-les ou changez-les pour la voir.' : 'Elle est dans la liste, à sa place dans le tri.') + ' Envoi simulé : elle disparaîtra au rechargement de la page.'
      });
    }, DELAI_ENVOI_SIMULE);
  });

  fenetre.addEventListener('close', function () {
    form.querySelectorAll('.k-field[data-k-validate]').forEach(Kobo.field.clearError);
  });

  /* ---------- Densité : confort par défaut, compact à l'essai ---------- */
  var densite = ap.querySelector('[data-rs-densite]');
  function poserDensite(compact) {
    if (compact) document.documentElement.dataset.density = 'compact'; else delete document.documentElement.dataset.density;
    Kobo.app.measure(ap);
  }
  function lire() { try { return localStorage.getItem(CLE_DENSITE); } catch (err) { return null; } }
  function garder(valeur) { try { localStorage.setItem(CLE_DENSITE, valeur); } catch (err) { /* stockage indisponible : le réglage vaut pour cette visite */ } }

  densite.addEventListener('k-switch:change', function (e) {
    poserDensite(e.detail.checked);
    garder(e.detail.checked ? 'compact' : 'confort');
  });
  if (lire() === 'compact') { Kobo.switch.set(densite, true); poserDensite(true); }

  compterOuvertes();
})();
