/*
 * kobo-studio — structure « site vitrine » : une recherche qui cherche.
 * Filtre les éléments [data-sv-item] de la liste d'après leur titre, leur surtitre et leurs mots-clés ; dit le résultat à voix haute
 * (role="status") ; montre l'état vide quand rien ne correspond. Sans script, toutes les sorties restent affichées.
 */
(function () {
  'use strict';
  var input = document.getElementById('q'), list = document.getElementById('liste'), empty = document.getElementById('vide');
  var status = document.getElementById('q-etat'), form = document.getElementById('recherche'), clear = document.getElementById('effacer');
  if (!input || !list) return;

  function plain(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function filter() {
    var words = plain(input.value).split(/\s+/).filter(Boolean), shown = 0;
    list.querySelectorAll('[data-sv-item]').forEach(function (item) {
      var hay = plain(item.dataset.svItem + ' ' + item.textContent);
      var ok = words.every(function (w) { return hay.indexOf(w) >= 0; });
      item.hidden = !ok; if (ok) shown++;
    });
    list.hidden = shown === 0; empty.hidden = shown !== 0;
    status.textContent = shown === 0 ? 'Aucune sortie pour cette recherche.' : shown + (shown > 1 ? ' sorties affichées.' : ' sortie affichée.');
  }
  input.addEventListener('input', filter);
  form.addEventListener('submit', function (e) { e.preventDefault(); filter(); });
  clear.addEventListener('click', function () { input.value = ''; filter(); input.focus(); });
  list.addEventListener('k-slot-change', filter);
})();
