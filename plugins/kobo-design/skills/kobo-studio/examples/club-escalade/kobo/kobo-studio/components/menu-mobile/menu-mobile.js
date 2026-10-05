/*
 * kobo-studio — menu mobile : ouverture, fermeture, retour du focus.
 * Sans dépendance. Le <dialog> natif fournit le piège du focus et la touche Échap.
 *
 *   <button data-k-menu-open="menu" aria-expanded="false" aria-controls="menu">Menu</button>
 *   <dialog class="k-menu" id="menu" aria-labelledby="menu-titre"> … <button data-k-menu-close>Fermer</button> … </dialog>
 *
 * Un clic sur un lien du menu le ferme (navigation dans la page). Kobo.menu.open(id) / Kobo.menu.close(id).
 */
(function () {
  'use strict';
  var Kobo = (window.Kobo = window.Kobo || {});
  var openers = new WeakMap();

  function sync(menu, isOpen) {
    document.querySelectorAll('[data-k-menu-open="' + menu.id + '"]').forEach(function (b) { b.setAttribute('aria-expanded', String(isOpen)); });
  }

  function open(id, opener) {
    var menu = typeof id === 'string' ? document.getElementById(id) : id;
    if (!menu || menu.open) return;
    openers.set(menu, opener || document.activeElement);
    menu.showModal();
    sync(menu, true);
  }

  function close(id) {
    var menu = typeof id === 'string' ? document.getElementById(id) : id;
    if (menu && menu.open) menu.close();
  }

  document.addEventListener('click', function (e) {
    var opener = e.target.closest('[data-k-menu-open]');
    if (opener) return open(opener.getAttribute('data-k-menu-open'), opener);
    var menu = e.target.closest('dialog.k-menu');
    if (menu && e.target.closest('[data-k-menu-close], .k-menu__link')) close(menu);
  });

  // « close » couvre tous les cas : bouton, lien, touche Échap
  document.addEventListener('close', function (e) {
    var menu = e.target;
    if (!menu.matches || !menu.matches('dialog.k-menu')) return;
    sync(menu, false);
    var opener = openers.get(menu);
    if (opener && opener.isConnected && opener.offsetParent !== null) opener.focus(); // retour du focus au bouton d'ouverture
  }, true);

  Kobo.menu = { open: open, close: close };
})();
