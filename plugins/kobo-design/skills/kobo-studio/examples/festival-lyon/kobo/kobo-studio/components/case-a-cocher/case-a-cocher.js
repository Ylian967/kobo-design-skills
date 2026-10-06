/*
 * kobo-studio — case à cocher : état partiel et case « tout cocher ».
 * Sans dépendance. Une case seule n'a besoin d'aucun script.
 *   <input data-k-indeterminate>            pose l'état partiel (il n'a pas d'attribut HTML)
 *   <input data-k-check-all="nom">          pilote toutes les cases name="nom" du même formulaire ou fieldset, et reflète
 *                                           leur état : cochée, décochée ou partielle
 * Kobo.check.init(conteneur) pour du contenu ajouté ensuite.
 */
(function () {
  'use strict';
  var Kobo = (window.Kobo = window.Kobo || {});
  function group(master) {
    var scope = master.closest('form, fieldset, table') || document;
    return Array.prototype.slice.call(scope.querySelectorAll('input[type="checkbox"][name="' + master.dataset.kCheckAll + '"]:not(:disabled)'));
  }
  function reflect(master) {
    var boxes = group(master), on = boxes.filter(function (b) { return b.checked; }).length;
    master.checked = boxes.length > 0 && on === boxes.length;
    master.indeterminate = on > 0 && on < boxes.length;
  }
  function init(scope) {
    var root = scope || document;
    root.querySelectorAll('input[type="checkbox"][data-k-indeterminate]').forEach(function (b) { b.indeterminate = true; });
    root.querySelectorAll('input[type="checkbox"][data-k-check-all]').forEach(function (master) {
      if (master.dataset.kReady) { reflect(master); return; }
      master.dataset.kReady = '1';
      master.addEventListener('change', function () {
        var want = master.checked;   // lu avant la boucle : chaque case modifiée fait recalculer la case maîtresse
        group(master).forEach(function (b) { if (b.checked !== want) { b.checked = want; b.dispatchEvent(new Event('change', { bubbles: true })); } });
      });
      (master.closest('form, fieldset, table') || document).addEventListener('change', function (e) {
        if (e.target !== master && e.target.name === master.dataset.kCheckAll) reflect(master);
      });
      reflect(master);
    });
  }
  Kobo.check = { init: init, reflect: reflect };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(); }); else init();
})();
