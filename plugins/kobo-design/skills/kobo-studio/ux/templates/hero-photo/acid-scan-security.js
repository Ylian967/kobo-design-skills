/*
 * kobo-studio — héros photo, habillage acid-scan-security : cuisson des quatre couches et mouvement de la frange.
 * Les quatre versions de la photo (deux tons, frange, bande chaude, jaune) sont calculées une fois, dans des canvas, à partir
 * des couleurs de la fiche. À chaque image, la boucle commune n'écrit que trois variables (appliquées en transform), et
 * seulement quand le héros est à l'écran. Si le navigateur refuse la lecture de l'image, la photo reste affichée avec le
 * filtre du skill, sans les couches.
 */
(function () {
  'use strict';
  var F = Kobo.templates.families;
  var mix = function (a, b, k) { return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k]; };
  var g = F.heroPhoto({
    layers: function (rig) {
      rig.insertAdjacentHTML('beforeend',
        '<div class="g-hero__layer g-scan__ghost" aria-hidden="true"></div><div class="g-hero__layer g-scan__band" aria-hidden="true"></div>' +
        '<div class="g-hero__layer g-scan__box" aria-hidden="true"></div><span class="g-scan__v" aria-hidden="true"></span><span class="g-scan__h" aria-hidden="true"></span>' +
        '<span class="g-scan__target" aria-hidden="true"></span>');
    },
    mount: function (box, ctx) {
      var img = box.querySelector('.g-hero__layer--base img'), rig = box.querySelector('.g-hero__rig'), stop = null, alive = true;
      var K = { bg: ctx.color('--k-bg'), deep: ctx.color('--k-surface-2'), mid: ctx.color('--k-sig-mid'), hot: ctx.color('--k-accent-2'), text: ctx.color('--k-text'), signal: ctx.color('--k-accent'), ghost: ctx.color('--k-sig-ghost'), black: [0, 0, 0] };
      K.dark = mix(K.bg, K.black, 0.5);
      var ramps = {
        duo: [K.dark, K.dark, mix(K.dark, K.deep, 0.6), K.deep, K.mid, K.hot, mix(K.hot, K.text, 0.3)],
        hot: [K.deep, K.mid, K.hot, mix(K.hot, K.signal, 0.5), mix(K.hot, K.signal, 0.85)],
        yellow: [mix(K.dark, K.signal, 0.1), mix(K.dark, K.signal, 0.35), mix(K.deep, K.signal, 0.75), K.signal, mix(K.signal, K.text, 0.6)],
        ghost: [K.ghost, K.ghost]
      };
      if (!ctx.still) { box.setAttribute('data-k-in', 'pending'); }
      F.bake(img.currentSrc || img.src, ramps, 1280, { ghost: function (l) { return Math.max(0, 1 - l / 90) * 190; } }).then(function (c) {
        if (!alive) return;
        box.querySelector('.g-hero__layer--base').appendChild(c.duo);
        box.querySelector('.g-scan__ghost').appendChild(c.ghost);
        box.querySelector('.g-scan__band').appendChild(c.hot);
        box.querySelector('.g-scan__box').appendChild(c.yellow);
        box.setAttribute('data-k-baked', '');
      }, function () { /* lecture refusée : la photo filtrée reste seule */ }).then(function () {
        if (!alive || ctx.still) return;
        box.setAttribute('data-k-motion', '');
        requestAnimationFrame(function () { requestAnimationFrame(function () { box.setAttribute('data-k-in', 'done'); }); });
      });
      if (!ctx.still) {
        var px = 0, py = 0, sx = 0, sy = 0, speed = 0, lastX = 0, glitchAt = 0, glitchEnd = 0, shown = '';
        var move = function (e) { px = e.clientX / window.innerWidth - 0.5; py = e.clientY / window.innerHeight - 0.5; speed = Math.min(1, speed + Math.abs(e.clientX - lastX) / 400); lastX = e.clientX; };
        window.addEventListener('pointermove', move, { passive: true });
        var loop = Kobo.loop.add(box, function (now) {
          sx += (-px - sx) * 0.06; sy += (-py - sy) * 0.06; speed *= 0.92;
          if (!glitchAt) glitchAt = now + 3000 + Math.random() * 3000;
          if (now > glitchAt) { glitchEnd = now + 140; glitchAt = 0; }
          var gx = speed + (now < glitchEnd ? 0.6 + Math.random() * 0.6 : 0);
          var next = sx.toFixed(3) + '|' + sy.toFixed(3) + '|' + gx.toFixed(2);
          if (next === shown) return;                                             // rien n'a changé : rien à écrire
          shown = next;
          rig.style.setProperty('--_px', sx.toFixed(3)); rig.style.setProperty('--_py', sy.toFixed(3)); rig.style.setProperty('--_gx', gx.toFixed(2));
        });
        stop = function () { window.removeEventListener('pointermove', move); loop(); };
      }
      return function () { alive = false; if (stop) stop(); };
    }
  });
  Kobo.templates.register({ skill: 'acid-scan-security', family: 'hero-photo', slot: 'hero', render: g.render, mount: g.mount });
})();
