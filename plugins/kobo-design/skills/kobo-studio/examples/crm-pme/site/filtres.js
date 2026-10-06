/*
 * Rivage Suivi — filtres, état vide des archives, densité, session de la gérante.
 */
(function () {
  'use strict';
  var R = window.Rivage;
  if (!R) return;
  var ap = R.ap;
  var CLE_DENSITE = 'rivage-suivi-densite';
  var fAvancement = ap.querySelector('[data-ap-filter="avancement"]');

  // « Effacer les filtres » revient à la vue de départ : les affaires ouvertes. Passe après le kit (écouteur sur document).
  document.addEventListener('click', function (e) {
    if (!e.target.closest('[data-ap-reset]')) return;
    fAvancement.value = 'ouverte';
    Kobo.app.filter(ap);
  });

  /* ---------- État vide : dire pourquoi, y compris quand aucune affaire n'est archivée ---------- */
  var videTitre = ap.querySelector('[data-rs-vide-titre]'), videTexte = ap.querySelector('[data-rs-vide-texte]');
  var VIDE = { titre: videTitre.textContent, texte: videTexte.textContent };
  var SANS_ARCHIVE = {
    titre: 'Aucune affaire archivée',
    texte: 'Une affaire archivée depuis son détail (« Autres actions », puis « Archiver ») se retrouve ici, où elle peut être restaurée. Effacez les filtres pour revenir aux affaires ouvertes.'
  };
  R.apresFiltre(function () {
    var aucune = fAvancement.value === 'archivee' && !R.tbody.querySelector('tr[data-avancement="archivee"]');
    var mots = aucune ? SANS_ARCHIVE : VIDE;
    if (videTitre.textContent !== mots.titre) { videTitre.textContent = mots.titre; videTexte.textContent = mots.texte; }
  });
  fAvancement.addEventListener('change', function () { R.compter(); });

  /* ---------- Densité : confort par défaut, compact au choix, gardé d'une visite à l'autre ---------- */
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

  /* ---------- Session de la gérante : rôle simulé, non gardé (éteint à chaque ouverture) ---------- */
  var gerante = ap.querySelector('[data-rs-gerante]');
  R.estGerante = function () { return gerante.getAttribute('aria-checked') === 'true'; };
  gerante.addEventListener('k-switch:change', function () { ap.dispatchEvent(new CustomEvent('rs:role')); });
})();
