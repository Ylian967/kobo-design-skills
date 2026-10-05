/*
 * kobo-studio — famille « titre géant » : construit le mot géant d'un emplacement title et le met à la largeur de son bloc.
 * Kobo.templates.families.titreGeant(options) rend { render, mount } pour Kobo.templates.register.
 *   options.word(parts) : le mot à agrandir (par défaut : le surtitre, sinon le premier mot du titre)
 * Calcul fait une fois, puis à chaque changement de largeur (ResizeObserver) : jamais à chaque image.
 */
(function () {
  'use strict';
  var Kobo = window.Kobo, F = (Kobo.templates.families = Kobo.templates.families || {});
  // Construit un mot géant (décor, aria-hidden) : une lettre par <span>, pour l'entrée lettre à lettre
  F.motGeant = function (word) {
    var giant = document.createElement('span'); giant.className = 'g-word__giant'; giant.setAttribute('aria-hidden', 'true');
    Array.prototype.forEach.call(word, function (ch, i) { var s = document.createElement('span'); s.textContent = ch === ' ' ? '\u00a0' : ch; s.style.setProperty('--_i', i); giant.appendChild(s); });
    return giant;
  };
  // Met le mot à la largeur de son bloc ; rend une fonction qui arrête l'observation
  F.ajusterMot = function (giant, box) {
    var fit = function () {
      giant.style.setProperty('--_fit', 4);
      var first = giant.firstChild.getBoundingClientRect(), lastLetter = giant.lastChild.getBoundingClientRect();
      var w = lastLetter.right - first.left, room = box.clientWidth - parseFloat(getComputedStyle(giant).paddingInlineStart || 0) * 2;
      if (w > 0 && room > 0) giant.style.setProperty('--_fit', (4 * room / w).toFixed(3));
    };
    var ro = new ResizeObserver(fit); ro.observe(box);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    fit();
    return function () { ro.disconnect(); };
  };
  F.titreGeant = function (options) {
    options = options || {};
    return {
      render: function (parts) {
        var title = parts.title && parts.title[0];
        if (!title) return null;
        var source = options.word ? options.word(parts) : ((parts.kicker && parts.kicker[0]) || title).textContent;
        var word = source.trim().split(/\s+/).slice(0, options.words || 2).join(' ');
        var box = document.createElement('div'); box.className = 'g-word';
        var giant = F.motGeant(word);
        box.appendChild(giant);
        if (parts.kicker) { parts.kicker[0].classList.add('k-sr-only'); box.appendChild(parts.kicker[0]); }   // le surtitre reste lu, il n'est plus affiché deux fois
        box.appendChild(title);
        if (parts.lead) box.appendChild(parts.lead[0]);
        return box;
      },
      mount: function (el, ctx) {
        var box = el.querySelector('.g-word'), giant = el.querySelector('.g-word__giant');
        if (!giant) return null;
        var stopFit = F.ajusterMot(giant, box);
        var io = null;
        if (!ctx.still) {
          box.setAttribute('data-k-in', 'pending');
          requestAnimationFrame(function () { box.setAttribute('data-k-motion', ''); });
          io = new IntersectionObserver(function (entries) { entries.forEach(function (e) { if (e.isIntersecting) { box.setAttribute('data-k-in', 'done'); io.disconnect(); } }); }, { rootMargin: '0px 0px -10% 0px' });
          io.observe(box);
        }
        return function () { stopFit(); if (io) io.disconnect(); };
      }
    };
  };
})();
