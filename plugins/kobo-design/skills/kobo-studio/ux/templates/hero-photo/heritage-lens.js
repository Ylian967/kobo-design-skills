// kobo-studio — héros photo, habillage heritage-lens : scène plein écran, titre centré dont les lettres apparaissent une à une.
(function () {
  'use strict';
  var F = Kobo.templates.families;
  F.entree = F.entree || function (box, ctx) {
    if (ctx.still) return;
    box.setAttribute('data-k-in', 'pending');
    requestAnimationFrame(function () { box.setAttribute('data-k-motion', ''); requestAnimationFrame(function () { box.setAttribute('data-k-in', 'done'); }); });
  };
  var g = F.heroPhoto({ variant: 'scene', extra: function (box) { var h = box.querySelector('h1'); if (!h) return; var t = h.textContent.trim(); h.setAttribute('aria-label', t); h.textContent = ''; var n = 0; t.split(/\s+/).forEach(function (word) { var w = document.createElement('span'); w.className = 'g-nowrap'; w.setAttribute('aria-hidden', 'true'); Array.prototype.forEach.call(word, function (ch) { var s = document.createElement('span'); s.className = 'g-rise'; var b = document.createElement('b'); b.textContent = ch; b.style.setProperty('--_i', n++); s.appendChild(b); w.appendChild(s); }); h.appendChild(w); h.appendChild(document.createTextNode(' ')); }); }, mount: function (box, ctx) { F.entree(box, ctx); return null; } });
  Kobo.templates.register({ skill: 'heritage-lens', family: 'hero-photo', slot: 'hero', render: g.render, mount: g.mount });
})();
