// kobo-studio — couche mouvement de acid-scan-security : décodage des titres, images décryptées en mosaïque, compteurs,
// blocs qui s'allument par paliers.
(function () {
  'use strict';
  var GLYPHS = '01<>/\\#*+=[]_', STEPS = [40, 28, 18, 12, 8, 5, 3, 1];   // taille d'un « pixel » à chaque palier

  // 8. Décryptage : l'image apparaît en gros pixels qui s'affinent. Un canvas posé sur l'image, retiré à la fin.
  function decrypt(host, m) {
    var img = host.matches('img') ? host : host.querySelector('img');
    if (!img || !img.complete || !img.naturalWidth) return;
    var box = img.parentElement, w = img.clientWidth, h = img.clientHeight;
    if (!w || !h || getComputedStyle(box).position === 'static') return;
    var c = document.createElement('canvas'), small = document.createElement('canvas'), x = c.getContext('2d'), last = -1;
    c.width = w; c.height = h; c.className = 'k-m-over'; c.setAttribute('aria-hidden', 'true');
    c.style.inlineSize = w + 'px'; c.style.blockSize = h + 'px'; c.style.inset = img.offsetTop + 'px auto auto ' + img.offsetLeft + 'px';
    // même cadrage que l'image (object-fit: cover)
    var k = Math.max(w / img.naturalWidth, h / img.naturalHeight), dw = img.naturalWidth * k, dh = img.naturalHeight * k, ox = (w - dw) / 2, oy = (h - dh) / 2;
    box.appendChild(c);
    m.run(host, STEPS.length * 85, function (p) {
      var i = Math.min(STEPS.length - 1, Math.floor(p * STEPS.length));
      if (i === last) return;
      last = i;
      var b = STEPS[i];
      small.width = Math.max(1, Math.ceil(w / b)); small.height = Math.max(1, Math.ceil(h / b));
      small.getContext('2d').drawImage(img, ox / b, oy / b, dw / b, dh / b);
      x.imageSmoothingEnabled = false; x.clearRect(0, 0, w, h); x.drawImage(small, 0, 0, small.width * b, small.height * b);
    }, function () { c.remove(); });
  }

  Kobo.motion.register('acid-scan-security', function (m) {
    m.each('.k-nav__list > li', function (li, i) { li.style.setProperty('--_i', i); });
    var dur = m.ms('--k-sig-dur-decode', 900);
    // 5. Décodage des titres et surtitres : la durée totale est celle du skill, quel que soit le nombre de lettres
    m.reveal('.k-section .k-h2, [data-k-slot="finale"] .k-h2, .k-section .k-kicker, .k-card__meta', 'decode', {
      seen: function (el) { var n = Math.max(1, Array.from(el.textContent).length); m.scramble(el, GLYPHS, { tick: dur / (n * 2), rounds: 2 }); }
    });
    m.inview('.k-section .k-kicker');
    m.reveal('.k-facts dd', 'count', { seen: function (el) { m.count(el, 1200); } });
    m.reveal('figure[data-k-slot="media"], .k-card__media', 'decrypt', { seen: function (el) { decrypt(el, m); } });
    m.reveal('[data-k-slot="grid"] > *, .k-section .k-lead, .k-prose > *, .k-facts > div, .k-note, .k-tabs, [data-k-slot="finale"] .k-lead, [data-k-slot="finale"] form, [data-k-slot="finale"] .k-btn', 'step');
  });
})();
