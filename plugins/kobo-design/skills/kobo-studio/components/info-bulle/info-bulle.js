/*
 * kobo-studio — info-bulle : Échap, placement, lien avec le déclencheur.
 * Sans dépendance. Sans script la bulle s'affiche déjà (CSS : survol et focus), au-dessus du déclencheur.
 * Le script ajoute : Échap referme sans déplacer le focus ; la bulle passe dessous si la place manque au-dessus ;
 * elle se décale pour ne pas sortir de l'écran ; aria-describedby est posé si le balisage l'a oublié.
 * Kobo.tooltip.init(conteneur).
 */
(function () {
  'use strict';
  var Kobo = (window.Kobo = window.Kobo || {}), n = 0;
  function place(tip) {
    var bubble = tip.querySelector('.k-tooltip__bubble');
    if (!bubble) return;
    bubble.style.removeProperty('--_shift');
    if (!tip.hasAttribute('data-k-place-fixed')) tip.removeAttribute('data-k-place');
    var r = bubble.getBoundingClientRect(), vw = document.documentElement.clientWidth, margin = 8;
    // Une bulle affichée sur demande peut être placée alors qu'elle est hors de l'écran : elle ne bascule que si la page manque de place
    var top = tip.hasAttribute('data-k-open') ? r.top + window.scrollY : r.top;
    if (top < 0 && !tip.hasAttribute('data-k-place-fixed')) { tip.setAttribute('data-k-place', 'bottom'); r = bubble.getBoundingClientRect(); }
    var shift = r.left < margin ? margin - r.left : r.right > vw - margin ? vw - margin - r.right : 0;
    if (shift) bubble.style.setProperty('--_shift', (shift / r.width * 100).toFixed(1) + '%');
  }
  function init(scope) {
    (scope || document).querySelectorAll('.k-tooltip').forEach(function (tip) {
      if (tip.dataset.kReady) return;
      tip.dataset.kReady = '1';
      var bubble = tip.querySelector('.k-tooltip__bubble'), trigger = tip.querySelector('button, a, input, [tabindex]');
      if (!bubble || !trigger) return;
      if (tip.hasAttribute('data-k-place')) tip.setAttribute('data-k-place-fixed', '');
      if (!bubble.id) bubble.id = 'k-tip-' + (++n);
      bubble.setAttribute('role', 'tooltip');
      if (!trigger.hasAttribute('aria-describedby') && !trigger.hasAttribute('aria-labelledby')) trigger.setAttribute('aria-describedby', bubble.id);
      var show = function () { tip.removeAttribute('data-k-dismissed'); place(tip); };
      tip.addEventListener('mouseenter', show);
      tip.addEventListener('focusin', show);
      tip.addEventListener('mouseleave', function () { tip.removeAttribute('data-k-dismissed'); });
      tip.addEventListener('focusout', function () { tip.removeAttribute('data-k-dismissed'); });
      tip.addEventListener('keydown', function (e) { if (e.key === 'Escape') { tip.setAttribute('data-k-dismissed', ''); e.stopPropagation(); } });
      // Une bulle affichée sur demande (data-k-open) est placée tout de suite, puis replacée quand la fenêtre ou la bulle change de largeur
      if (tip.hasAttribute('data-k-open')) {
        var again = function () { if (tip.hasAttribute('data-k-open')) place(tip); };
        place(tip); window.addEventListener('resize', again);
        // Une police qui arrive change la largeur de la bulle, ou déplace son déclencheur : on replace à chaque fois
        if ('ResizeObserver' in window) { var ro = new ResizeObserver(again); ro.observe(bubble); ro.observe(tip); }
        if (document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', again);
        window.addEventListener('load', again);
      }
    });
  }
  Kobo.tooltip = { init: init, place: place };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(); }); else init();
})();
