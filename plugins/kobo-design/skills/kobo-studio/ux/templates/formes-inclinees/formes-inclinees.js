/*
 * kobo-studio — famille « formes inclinées » : recompose un chapitre en bloc numéroté, panneau à image découpée et bande.
 * Kobo.templates.families.formesInclinees(options) rend { render, mount }.
 * Le titre garde son niveau et son id ; l'image reste dans son emplacement media ; le texte reste du texte.
 * Mouvement : une entrée par chapitre, déclenchée une fois par un IntersectionObserver (pas d'écouteur de défilement).
 */
(function () {
  'use strict';
  var Kobo = window.Kobo, F = (Kobo.templates.families = Kobo.templates.families || {});
  F.formesInclinees = function () {
    return {
      render: function (parts, el, i) {
        if (!parts.title || !parts.media) return null;
        var box = document.createElement('div'); box.className = 'g-slant' + (i % 2 ? ' g-slant--flip' : '');
        var two = (i < 9 ? '0' : '') + (i + 1);
        box.innerHTML = '<div class="g-slant__stage"><span class="g-slant__shape g-slant__slab" aria-hidden="true"></span>' +
          '<div class="g-slant__block"></div>' +
          '<div class="g-slant__panel"><span class="g-slant__shape g-slant__under" aria-hidden="true"></span><span class="g-slant__shape g-slant__sheet" aria-hidden="true"></span><div class="g-slant__cut"></div></div></div>' +
          '<div class="g-slant__copy"></div>';
        var block = box.querySelector('.g-slant__block');
        block.appendChild(parts.title[0]);
        if (parts.kicker) block.appendChild(parts.kicker[0]);
        var num = document.createElement('span'); num.className = 'g-slant__num'; num.setAttribute('aria-hidden', 'true'); num.textContent = two; block.appendChild(num);
        Array.prototype.forEach.call(parts.media[0].querySelectorAll('img'), function (im) { im.decoding = 'async'; });
        box.querySelector('.g-slant__cut').appendChild(parts.media[0]);
        var copy = box.querySelector('.g-slant__copy');
        (parts.text || []).forEach(function (p) { copy.appendChild(p); });
        return box;
      },
      mount: function (el, ctx) {
        var box = el.querySelector('.g-slant');
        if (!box || ctx.still) return null;
        box.setAttribute('data-k-in', 'pending');
        requestAnimationFrame(function () { box.setAttribute('data-k-motion', ''); });
        var settle = 0;
        var io = new IntersectionObserver(function (entries) { entries.forEach(function (e) { if (e.isIntersecting) { box.setAttribute('data-k-in', 'done'); io.disconnect(); settle = setTimeout(function () { box.removeAttribute('data-k-motion'); }, 1600); } }); }, { rootMargin: '0px 0px -15% 0px' });
        io.observe(el);
        return function () { io.disconnect(); clearTimeout(settle); };
      }
    };
  };
})();
