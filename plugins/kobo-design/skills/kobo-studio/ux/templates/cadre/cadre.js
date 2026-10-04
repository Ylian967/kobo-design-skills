/*
 * kobo-studio — famille « cadre de page » : construit le cadre et fait avancer la progression.
 * Kobo.templates.families.cadre(options) rend { render, mount }.
 *   options.sign : SVG décoratif du rail (chaîne), propre au skill ; options.count : afficher « 01 / 05 » (sections de la page)
 * Mouvement : la barre de progression suit le défilement — une lecture de scrollY par image affichée, une seule variable
 * écrite (--_p, appliquée en transform). En « reduced » la barre avance aussi : c'est une information, pas un décor.
 */
(function () {
  'use strict';
  var Kobo = window.Kobo, F = (Kobo.templates.families = Kobo.templates.families || {});
  F.cadre = function (options) {
    options = options || {};
    return {
      render: function () {
        return '<div class="g-frame"><div class="g-frame__mask"></div><div class="g-frame__bar"><div class="g-frame__progress"></div></div>' +
          '<div class="g-frame__rail"><span></span>' + (options.sign || '<span></span>') + (options.count ? '<span class="g-frame__count"></span>' : '<span></span>') + '</div>' +
          '<div class="g-frame__line"></div></div>';
      },
      mount: function (el) {
        var bar = el.querySelector('.g-frame__progress'), count = el.querySelector('.g-frame__count'), pending = 0;
        var sections = Array.prototype.slice.call(document.querySelectorAll('main > section, main > article > header, main .rc-chapter, main > article + section'));
        var two = function (n) { return (n < 10 ? '0' : '') + n; };
        function measure() {
          pending = 0;
          var max = document.documentElement.scrollHeight - window.innerHeight;
          bar.style.setProperty('--_p', (max > 0 ? Math.min(1, window.scrollY / max) : 0).toFixed(4));
          if (count && sections.length) {
            var mid = window.innerHeight / 2, current = 0;
            sections.forEach(function (s, i) { if (s.getBoundingClientRect().top <= mid) current = i; });
            var text = two(current + 1) + ' / ' + two(sections.length);
            if (count.textContent !== text) count.textContent = text;
          }
        }
        function schedule() { if (!pending) pending = requestAnimationFrame(measure); }
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
        measure();
        return function () { window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); cancelAnimationFrame(pending); };
      }
    };
  };
})();
