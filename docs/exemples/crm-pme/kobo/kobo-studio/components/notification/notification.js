/*
 * kobo-studio — notification (toast).
 * Sans dépendance. Fonctionne en file://.
 *
 *   Kobo.toast({ type: 'success', title: 'Réservation enregistrée', text: 'Un courriel de confirmation part vers vous.' })
 *   → renvoie { element, close }
 *
 * type     : 'info' (défaut), 'success', 'warning', 'error'. Chaque type a son icône et son mot ; la couleur ne fait que les appuyer.
 * duration : millisecondes avant fermeture. Par défaut le rôle --k-dur-toast de la fiche ; 0 = reste jusqu'à fermeture. Une erreur reste toujours (0).
 *            La durée de sortie vient du rôle --k-dur-exit.
 *            Le compte à rebours s'arrête tant que la souris ou le focus est sur la notification.
 * action   : { label, onClick } — un bouton dans la notification.
 * Annonce  : les notifications sont insérées dans une zone aria-live (polie ; assertive pour les erreurs).
 * Clavier  : le bouton « Fermer » est atteignable à la tabulation ; Échap ferme la notification qui a le focus.
 */
(function () {
  'use strict';
  var Kobo = (window.Kobo = window.Kobo || {});
  var NS = 'http://www.w3.org/2000/svg';
  var TYPES = {
    info: { word: 'Information', path: 'M12 16v-5M12 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' },
    success: { word: 'Succès', path: 'M8 12.5l2.5 2.5L16 9.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' },
    warning: { word: 'Attention', path: 'M12 9v4M12 17h.01M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z' },
    error: { word: 'Erreur', path: 'M15 9l-6 6M9 9l6 6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' }
  };

  function icon(d, cls) {
    var svg = document.createElementNS(NS, 'svg'), p = document.createElementNS(NS, 'path');
    svg.setAttribute('viewBox', '0 0 24 24'); svg.setAttribute('aria-hidden', 'true'); svg.setAttribute('class', 'k-icon ' + (cls || ''));
    p.setAttribute('d', d); svg.appendChild(p);
    return svg;
  }
  // Lit une durée du contrat (« 6s », « 200ms ») sur l'élément, en millisecondes
  function role(node, name, fallback) {
    var v = getComputedStyle(node).getPropertyValue(name).trim(), n = parseFloat(v);
    return isNaN(n) ? fallback : (/ms$/.test(v) ? n : n * 1000);
  }
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; }

  function region() {
    var box = document.querySelector('.k-toasts');
    if (box) return box;
    box = el('div', 'k-toasts'); box.setAttribute('role', 'region'); box.setAttribute('aria-label', 'Notifications');
    ['polite', 'assertive'].forEach(function (mode) {
      var live = el('div', 'k-toasts__live'); live.setAttribute('aria-live', mode); live.setAttribute('aria-atomic', 'false'); live.dataset.kLive = mode; box.appendChild(live);
    });
    document.body.appendChild(box);
    return box;
  }

  function toast(opts) {
    opts = opts || {};
    var type = TYPES[opts.type] ? opts.type : 'info', t = TYPES[type];
    var node = el('div', 'k-toast k-toast--' + type), body = el('div');
    var title = el('p', 'k-toast__title');
    title.appendChild(el('span', 'k-sr-only', t.word + ' : '));          // le mot de l'état, lu avant le titre
    title.appendChild(document.createTextNode(opts.title || t.word));
    body.appendChild(title);
    if (opts.text) body.appendChild(el('p', 'k-toast__text', opts.text));
    if (opts.action && opts.action.label) {
      var act = el('button', 'k-btn k-btn--secondary k-toast__action', opts.action.label); act.type = 'button';
      act.addEventListener('click', function () { if (opts.action.onClick) opts.action.onClick(); close(); });
      body.appendChild(act);
    }
    var x = el('button', 'k-toast__close'); x.type = 'button'; x.setAttribute('aria-label', 'Fermer la notification : ' + (opts.title || t.word));
    x.appendChild(icon('M6 6l12 12M18 6 6 18'));
    node.appendChild(icon(t.path, 'k-toast__icon')); node.appendChild(body); node.appendChild(x);

    var duration = 0, timer = 0, closed = false;
    function close() {
      if (closed) return; closed = true; clearTimeout(timer);
      var hadFocus = node.contains(document.activeElement);
      node.classList.add('is-leaving');
      setTimeout(function () { node.remove(); if (hadFocus && opts.returnFocus && opts.returnFocus.isConnected) opts.returnFocus.focus(); }, role(node, '--k-dur-exit', 0));
    }
    function arm() { clearTimeout(timer); if (duration > 0) timer = setTimeout(close, duration); }
    x.addEventListener('click', close);
    node.addEventListener('keydown', function (e) { if (e.key === 'Escape') { e.stopPropagation(); close(); } });
    node.addEventListener('mouseenter', function () { clearTimeout(timer); });
    node.addEventListener('mouseleave', arm);
    node.addEventListener('focusin', function () { clearTimeout(timer); });
    node.addEventListener('focusout', arm);

    region().querySelector('[data-k-live="' + (type === 'error' ? 'assertive' : 'polite') + '"]').appendChild(node);
    duration = type === 'error' ? 0 : (opts.duration === undefined ? role(node, '--k-dur-toast', 0) : opts.duration);
    arm();
    return { element: node, close: close };
  }

  Kobo.toast = toast;
})();
