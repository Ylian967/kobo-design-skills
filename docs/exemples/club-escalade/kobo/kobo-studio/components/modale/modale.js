/*
 * kobo-studio — modale : ouverture, fermeture, retour du focus.
 * Sans dépendance. Le <dialog> natif fournit la touche Échap ; Tab est bouclé ici (le navigateur le laisserait sortir vers sa propre interface).
 * Écoute déléguée au document : une modale ou un déclencheur ajoutés après le chargement marchent sans initialisation.
 *
 *   <button data-k-modal-open="annuler">Annuler la réservation</button>
 *   <dialog class="k-modal" id="annuler" aria-labelledby="annuler-titre" data-k-modal-dismiss="backdrop">
 *     … <button data-k-modal-close="confirme">Oui, annuler</button> <button data-k-modal-close autofocus>Garder</button>
 *   </dialog>
 *
 * data-k-modal-close="valeur" ferme la modale ; la valeur se lit dans dialog.returnValue (événement « close »).
 * data-k-modal-dismiss="backdrop" : un clic sur le voile ferme aussi. À ne pas mettre sur une confirmation (role="alertdialog").
 * Kobo.modal.open(id) / Kobo.modal.close(id, valeur).
 */
(function () {
  'use strict';
  var Kobo = (window.Kobo = window.Kobo || {});
  var openers = new WeakMap();

  function get(id) { return typeof id === 'string' ? document.getElementById(id) : id; }

  function open(id, opener) {
    var modal = get(id);
    if (!modal || modal.open) return;
    openers.set(modal, opener || document.activeElement);
    modal.returnValue = '';
    modal.showModal();
  }

  function close(id, value) {
    var modal = get(id);
    if (modal && modal.open) modal.close(value || '');
  }

  document.addEventListener('click', function (e) {
    var opener = e.target.closest('[data-k-modal-open]');
    if (opener) return open(opener.getAttribute('data-k-modal-open'), opener);
    var modal = e.target.closest('dialog.k-modal');
    if (!modal) return;
    var closer = e.target.closest('[data-k-modal-close]');
    if (closer) return close(modal, closer.getAttribute('data-k-modal-close'));
    // Clic sur le voile : la cible est le <dialog> lui-même et le pointeur est hors de sa boîte
    if (e.target === modal && modal.getAttribute('data-k-modal-dismiss') === 'backdrop') {
      var r = modal.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) close(modal);
    }
  });

  // Chrome laisse Tab passer par l'interface du navigateur entre le dernier et le premier élément : on boucle nous-mêmes.
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var modal = document.activeElement && document.activeElement.closest && document.activeElement.closest('dialog.k-modal[open]');
    if (!modal) return;
    var items = Array.prototype.filter.call(modal.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'), function (n) { return !n.disabled && n.getClientRects().length; });
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  document.addEventListener('close', function (e) {
    var modal = e.target;
    if (!modal.matches || !modal.matches('dialog.k-modal')) return;
    var opener = openers.get(modal);
    if (opener && opener.isConnected) opener.focus(); // retour du focus au déclencheur
  }, true);

  Kobo.modal = { open: open, close: close };
})();
