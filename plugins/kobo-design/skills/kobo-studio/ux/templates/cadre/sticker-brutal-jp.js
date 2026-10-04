// kobo-studio — cadre de page, habillage sticker-brutal-jp : bord d'encre épais à coins ronds, autocollants à cheval dessus.
// Les quatre formes sont reprises de la démo du skill (tracés identiques). Décor : aria-hidden, sans action.
(function () {
  'use strict';
  var stk = function (cls, style, view, body) { return '<span class="g-stk ' + cls + '" style="' + style + '" aria-hidden="true"><svg viewBox="' + view + '">' + body + '</svg></span>'; };
  var deco =
    stk('', '--_w: var(--_s); --_c: var(--k-sig-blue); --_rot: -12deg; inset: calc(var(--_s) * -0.3) auto auto 27%', '0 0 110 110', '<rect class="sh" transform="translate(5 5)" x="5" y="5" width="96" height="96" rx="18"/><rect x="5" y="5" width="96" height="96" rx="18"/><path style="fill: var(--k-accent)" d="M53 22l8 21 21 8-21 8-8 21-8-21-21-8 21-8z"/>') +
    stk('g-stk--wide', '--_w: var(--_s); --_c: var(--k-sig-green); --_rot: 18deg; inset: 22% auto auto calc(var(--_s) * -0.5)', '0 0 120 70', '<path class="sh" transform="translate(5 5)" d="M5 62a55 55 0 0 1 110 0H84a24 24 0 0 0-48 0z"/><path d="M5 62a55 55 0 0 1 110 0H84a24 24 0 0 0-48 0z"/>') +
    stk('g-stk--wide', '--_w: var(--_s); --_c: var(--k-sig-blue); --_rot: 108deg; inset: 52% calc(var(--_s) * -0.45) auto auto', '0 0 120 70', '<path class="sh" transform="translate(5 5)" d="M5 62a55 55 0 0 1 110 0H84a24 24 0 0 0-48 0z"/><path d="M5 62a55 55 0 0 1 110 0H84a24 24 0 0 0-48 0z"/>') +
    stk('', '--_w: calc(var(--_s) * 1.2); --_c: var(--k-accent-2); --_rot: -8deg; inset: auto auto calc(var(--_s) * -0.4) calc(var(--_s) * -0.45)', '0 0 130 130', '<circle class="sh" transform="translate(5 5)" cx="62" cy="62" r="56"/><circle cx="62" cy="62" r="56"/><path class="no" d="M62 62c0-9 13-9 13 2s-15 18-26 8-9-32 8-37 37 10 35 31-22 34-40 31"/>') +
    stk('g-stk--wide', '--_w: var(--_s); --_c: var(--k-sig-red); --_rot: 10deg; inset: auto calc(var(--_s) * -0.4) 14% auto', '0 0 130 130', '<circle class="sh" transform="translate(5 5)" cx="62" cy="62" r="56"/><circle cx="62" cy="62" r="56"/><circle class="no" cx="62" cy="62" r="44"/>');
  var g = Kobo.templates.families.cadre({ deco: deco });
  Kobo.templates.register({ skill: 'sticker-brutal-jp', family: 'cadre', slot: 'frame', render: g.render, mount: g.mount });
})();
