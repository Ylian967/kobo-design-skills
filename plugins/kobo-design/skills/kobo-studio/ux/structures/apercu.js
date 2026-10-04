/*
 * kobo-studio — aperçu d'une structure sous n'importe quel skill. NE PAS LIVRER : une vraie page charge une seule fiche, en dur.
 * Lit l'adresse : <structure>.html#<id-du-skill>[:full|reduced|off][:slots]
 *   - charge contract/maps/<id>.css et components/signatures/<id>.css dans les <link id="map"> et <link id="sig"> ;
 *   - pose data-k-intensity sur <html> ; « slots » dessine le contour des emplacements ;
 *   - reporte le choix sur les liens internes marqués data-k-keep, pour naviguer sans le perdre.
 * BASE : chemin vers kobo-studio/ depuis la page (attribut data-k-base de la balise <script>).
 */
(function () {
  'use strict';
  var root = document.documentElement, base = document.currentScript.dataset.kBase || '../../../';
  function apply() {
    var h = location.hash.slice(1).split(':'), id = h[0] || 'serif-bistro-green';
    var refit = function () { if (window.Kobo && Kobo.nav) (document.fonts ? document.fonts.ready : Promise.resolve()).then(function () { document.querySelectorAll('.k-nav').forEach(Kobo.nav.fit); }); };
    var map = document.getElementById('map'), sig = document.getElementById('sig');
    map.onload = refit; sig.onload = refit;
    map.href = base + 'contract/maps/' + id + '.css';
    sig.href = base + 'components/signatures/' + id + '.css';
    root.dataset.kIntensity = ['full', 'reduced', 'off'].indexOf(h[1]) >= 0 ? h[1] : 'full';
    root.toggleAttribute('data-k-show-slots', h.indexOf('slots') > 0);
    document.querySelectorAll('a[data-k-keep]').forEach(function (a) { a.hash = location.hash; });
  }
  window.addEventListener('hashchange', apply);
  apply();                                                    // tout de suite : la fiche avant le premier rendu
  document.addEventListener('DOMContentLoaded', apply);       // puis une fois les liens internes présents
})();
