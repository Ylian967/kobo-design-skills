// kobo-studio — héros photo, habillage pixel-lime-portfolio : photo plein cadre, titre géant en minuscules en bas, sur deux lignes qui montent.
(function () {
  'use strict';
  var F = Kobo.templates.families;
  F.motsMontants = F.motsMontants || function (h, parLigne) {
    var text = h.textContent.trim(); h.setAttribute('aria-label', text); h.textContent = '';
    text.split(/\s+/).forEach(function (w, i) { var s = document.createElement('span'); s.className = 'g-rise'; s.setAttribute('aria-hidden', 'true'); var b = document.createElement('b'); b.textContent = w; b.style.setProperty('--_i', i); s.appendChild(b); h.appendChild(s); h.appendChild(document.createTextNode(' ')); });
  };
  F.entree = F.entree || function (box, ctx) {
    if (ctx.still) return;
    box.setAttribute('data-k-in', 'pending');
    requestAnimationFrame(function () { box.setAttribute('data-k-motion', ''); requestAnimationFrame(function () { box.setAttribute('data-k-in', 'done'); }); });
  };
  var g = F.heroPhoto({ variant: 'name', extra: function (box) { var h = box.querySelector('h1'); if (!h) return; var words = h.textContent.trim().split(/\s+/), per = Math.ceil(words.length / 2), t = h.textContent.trim(); h.setAttribute('aria-label', t); h.textContent = ''; for (var i = 0, k = 0; i < words.length; i += per, k++) { var s = document.createElement('span'); s.className = 'g-rise'; s.setAttribute('aria-hidden', 'true'); var b = document.createElement('b'); b.textContent = words.slice(i, i + per).join(' '); b.style.setProperty('--_i', k); s.appendChild(b); h.appendChild(s); } }, mount: function (box, ctx) { F.entree(box, ctx); return null; } });
  Kobo.templates.register({ skill: 'pixel-lime-portfolio', family: 'hero-photo', slot: 'hero', render: g.render, mount: g.mount });
})();
