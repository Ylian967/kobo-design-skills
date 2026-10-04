/*
 * kobo-studio — héros photo, habillage pixel-lime-portfolio : photo plein cadre, titre en minuscules en bas, mosaïque de pixels.
 * La mosaïque est reprise de la démo du skill : mêmes rangées (11), même densité (0,5), même graine (7), blocs plus denses
 * au centre de la bande. Elle s'allume par vagues puis cinq blocs changent toutes les 900 ms — cadence tenue par la boucle
 * commune, donc arrêtée hors écran. En « reduced » et sous prefers-reduced-motion : tous les blocs allumés, sans clignotement.
 */
(function () {
  'use strict';
  var F = Kobo.templates.families;
  function mosaic(canvas, rows, density, seed, fill, still) {
    var ctx = canvas.getContext('2d'), cells = [], size = 0, lit = 0, last = 0;
    var rnd = function () { return (seed = (seed * 16807) % 2147483647) / 2147483647; };
    var paint = function (cell, on) { var x = Math.round(cell.c * size), y = Math.round(cell.r * size), s = Math.ceil(size); if (on) { ctx.fillStyle = fill; ctx.fillRect(x, y, s, s); } else ctx.clearRect(x, y, s, s); cell.on = on; };
    function build() {
      var w = canvas.clientWidth, h = canvas.clientHeight, ratio = Math.min(2, window.devicePixelRatio || 1), start = seed;
      if (!w || !h) return;
      size = h / rows; var cols = Math.ceil(w / size);
      canvas.width = Math.round(w * ratio); canvas.height = Math.round(h * ratio); ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      cells = []; seed = 7;
      for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) { var mid = 1 - Math.abs((r + 0.5) / rows - 0.5) * 2; if (rnd() < density * (0.15 + mid * 1.1)) cells.push({ r: r, c: c, on: false }); }
      cells.sort(function () { return rnd() - 0.5; });
      seed = start;
      for (var i = 0; i < (still ? cells.length : lit); i++) if (cells[i]) paint(cells[i], true);
    }
    return {
      build: build,
      tick: function (now) {
        if (still || !cells.length) return;
        if (lit < cells.length) { if (now - last < 34) return; last = now; var per = Math.ceil(cells.length / 26); for (var k = 0; k < per && lit < cells.length; k++) paint(cells[lit++], true); return; }
        if (now - last < 900) return; last = now;
        for (var j = 0; j < 5; j++) { var c = cells[Math.floor(Math.random() * cells.length)]; paint(c, !c.on); }
      }
    };
  }
  F.entree = F.entree || function (box, ctx) {
    if (ctx.still) return;
    box.setAttribute('data-k-in', 'pending');
    requestAnimationFrame(function () { box.setAttribute('data-k-motion', ''); requestAnimationFrame(function () { box.setAttribute('data-k-in', 'done'); }); });
  };
  var g = F.heroPhoto({
    variant: 'name',
    layers: function (rig) { rig.insertAdjacentHTML('beforeend', '<canvas class="g-mosaic" aria-hidden="true"></canvas>'); },
    extra: function (box) { var h = box.querySelector('h1'); if (!h) return; var words = h.textContent.trim().split(/\s+/), per = Math.ceil(words.length / 2), t = h.textContent.trim(); h.setAttribute('aria-label', t); h.textContent = ''; for (var i = 0, k = 0; i < words.length; i += per, k++) { var s = document.createElement('span'); s.className = 'g-rise'; s.setAttribute('aria-hidden', 'true'); var b = document.createElement('b'); b.textContent = words.slice(i, i + per).join(' '); b.style.setProperty('--_i', k); s.appendChild(b); h.appendChild(s); } },
    mount: function (box, ctx) {
      F.entree(box, ctx);
      var canvas = box.querySelector('.g-mosaic'), c = ctx.color('--k-accent');
      var m = mosaic(canvas, 11, 0.5, 7, 'rgb(' + Math.round(c[0]) + ',' + Math.round(c[1]) + ',' + Math.round(c[2]) + ')', ctx.still);
      var ro = new ResizeObserver(m.build); ro.observe(canvas); m.build();
      var stop = ctx.still ? null : Kobo.loop.add(canvas, m.tick);
      return function () { ro.disconnect(); if (stop) stop(); };
    }
  });
  Kobo.templates.register({ skill: 'pixel-lime-portfolio', family: 'hero-photo', slot: 'hero', render: g.render, mount: g.mount });
})();
