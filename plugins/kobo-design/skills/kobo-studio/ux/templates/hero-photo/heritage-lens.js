/*
 * kobo-studio — héros photo, habillage heritage-lens : scène plein écran, titre centré dont les lettres apparaissent une à une,
 * et la lentille de la démo : un bouton rond, cerclé de dentelle qui tourne, qui montre la photo nette et l'ouvre en plein écran.
 * La dentelle est celle de la démo (n cercles qui se chevauchent autour d'un anneau). La vue plein écran est un <dialog> :
 * Échap ou « Fermer » la referme, le focus revient sur la lentille.
 */
(function () {
  'use strict';
  var F = Kobo.templates.families;
  F.entree = F.entree || function (box, ctx) {
    if (ctx.still) return;
    box.setAttribute('data-k-in', 'pending');
    requestAnimationFrame(function () { box.setAttribute('data-k-motion', ''); requestAnimationFrame(function () { box.setAttribute('data-k-in', 'done'); }); });
  };
  var lace = function (svg, n) {                 // ornement en dentelle de la démo
    var R = 40, r = R * Math.sin(Math.PI / n) * 1.9, out = '';
    for (var i = 0; i < n; i++) { var a = i / n * Math.PI * 2; out += '<circle cx="' + (R * Math.cos(a)).toFixed(2) + '" cy="' + (R * Math.sin(a)).toFixed(2) + '" r="' + r.toFixed(2) + '"/>'; }
    svg.setAttribute('viewBox', '-50 -50 100 100'); svg.innerHTML = out + '<circle r="' + (R - r * 0.55).toFixed(2) + '"/>';
  };
  var lens = function (box) {
    var img = box.querySelector('.g-hero__layer--base img'), cap = box.querySelector('.g-hero__caption'); if (!img) return;
    var b = document.createElement('button'); b.type = 'button'; b.className = 'g-lens';
    b.innerHTML = '<span class="g-lens__eye"><svg aria-hidden="true"></svg><span><img alt=""></span></span><small>Voir la photo entière</small>';
    b.querySelector('img').src = img.currentSrc || img.src; lace(b.querySelector('svg'), 22);
    var d = document.createElement('dialog'); d.className = 'g-present'; d.setAttribute('aria-label', 'La photo entière');
    d.innerHTML = '<figure><img alt=""><figcaption></figcaption></figure><button type="button" class="k-btn k-btn--secondary">Fermer</button>';
    d.querySelector('img').alt = img.alt; d.querySelector('figcaption').textContent = cap ? cap.textContent : img.alt;
    var content = box.querySelector('.g-hero__content'); content.insertBefore(b, content.firstChild); box.appendChild(d);
  };
  var g = F.heroPhoto({ variant: 'scene', extra: function (box) { lens(box); var h = box.querySelector('h1'); if (!h) return; var t = h.textContent.trim(); h.setAttribute('aria-label', t); h.textContent = ''; var n = 0; t.split(/\s+/).forEach(function (word) { var w = document.createElement('span'); w.className = 'g-nowrap'; w.setAttribute('aria-hidden', 'true'); Array.prototype.forEach.call(word, function (ch) { var s = document.createElement('span'); s.className = 'g-rise'; var b = document.createElement('b'); b.textContent = ch; b.style.setProperty('--_i', n++); s.appendChild(b); w.appendChild(s); }); h.appendChild(w); h.appendChild(document.createTextNode(' ')); }); }, mount: function (box, ctx) {
    F.entree(box, ctx);
    var b = box.querySelector('.g-lens'), d = box.querySelector('.g-present'); if (!b || !d || !d.showModal) return null;
    var open = function () { d.querySelector('img').src = box.querySelector('.g-hero__layer--base img').src; d.showModal(); };
    var close = function (e) { if (e.target.closest('button')) d.close(); };
    b.addEventListener('click', open); d.addEventListener('click', close);          // à la fermeture, le navigateur rend le focus à la lentille
    return function () { b.removeEventListener('click', open); d.removeEventListener('click', close); if (d.open) d.close(); };
  } });
  Kobo.templates.register({ skill: 'heritage-lens', family: 'hero-photo', slot: 'hero', render: g.render, mount: g.mount });
})();
