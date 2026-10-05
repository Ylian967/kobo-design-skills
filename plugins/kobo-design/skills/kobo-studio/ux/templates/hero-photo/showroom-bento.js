/*
 * kobo-studio — héros photo, habillage showroom-bento : titre centré, produit détouré sur sa scène, rangée bento dessous.
 * Détourage (démo : cut) : fait une seule fois, dans un canvas — le fond est estimé d'après les quatre coins de la photo, tout
 * pixel qui s'en écarte est gardé. Il ne vaut que pour un objet photographié sur un fond uni : si les coins ne se ressemblent
 * pas, ou si le résultat garde trop ou trop peu de pixels, la photo reste entière dans sa tuile arrondie.
 *   Réglages facultatifs sur l'<img> : data-k-cutout="x y l h" (cadrage en fractions), data-k-matte="bas haut" (seuils).
 * Rangée bento (démo : .bento) : une tuile large qui porte l'action, puis une tuile par fait. La liste de faits reste une <dl>.
 */
(function () {
  'use strict';
  var F = Kobo.templates.families;
  F.entree = F.entree || function (box, ctx) {
    if (ctx.still) return;
    box.setAttribute('data-k-in', 'pending');
    requestAnimationFrame(function () { box.setAttribute('data-k-motion', ''); requestAnimationFrame(function () { box.setAttribute('data-k-in', 'done'); }); });
  };
  var smooth = function (a, b, x) { var t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  // Rend un canvas détouré, ou null si la photo ne s'y prête pas
  var cut = function (img, crop, matte) {
    var cx = crop[0], cy = crop[1], cw = crop[2], ch = crop[3], m0 = matte[0], m1 = matte[1];
    var sw = img.naturalWidth * cw, sh = img.naturalHeight * ch, k = Math.min(1, 900 / Math.max(sw, sh));
    var w = Math.round(sw * k), h = Math.round(sh * k), cv = document.createElement('canvas'); cv.width = w; cv.height = h;
    var ctx = cv.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, img.naturalWidth * cx, img.naturalHeight * cy, sw, sh, 0, 0, w, h);
    var data = ctx.getImageData(0, 0, w, h), p = data.data, n = Math.max(6, w >> 5), x, y, c, i;
    var corner = function (x0, y0) { var r = 0, g = 0, b = 0; for (var yy = y0; yy < y0 + n; yy++) for (var xx = x0; xx < x0 + n; xx++) { var j = (yy * w + xx) * 4; r += p[j]; g += p[j + 1]; b += p[j + 2]; } return [r / n / n, g / n / n, b / n / n]; };
    var c00 = corner(0, 0), c10 = corner(w - n, 0), c01 = corner(0, h - n), c11 = corner(w - n, h - n), spread = 0, kept = 0;
    [c10, c01, c11].forEach(function (o) { for (c = 0; c < 3; c++) spread = Math.max(spread, Math.abs(o[c] - c00[c])); });
    if (spread > 70) return null;                                   // pas un fond uni
    for (y = 0; y < h; y++) { var v = y / (h - 1);
      for (x = 0; x < w; x++) { var u = x / (w - 1), d = 0; i = (y * w + x) * 4;
        for (c = 0; c < 3; c++) { var bg = (c00[c] * (1 - u) + c10[c] * u) * (1 - v) + (c01[c] * (1 - u) + c11[c] * u) * v; d = Math.max(d, Math.abs(p[i + c] - bg)); }
        var edge = Math.min(smooth(0, 0.06, u), smooth(0, 0.06, 1 - u), smooth(0, 0.06, v), smooth(0, 0.04, 1 - v));
        var lum = 0.3 * p[i] + 0.59 * p[i + 1] + 0.11 * p[i + 2];
        var al = smooth(m0, m1, d) * Math.max(edge, smooth(m1, m1 + 40, d)) * (1 - smooth(78, 150, lum));
        if (al < 1) for (c = 0; c < 3; c++) p[i + c] *= al;
        p[i + 3] = 255 * al; if (al > 0.5) kept++;
      } }
    var share = kept / (w * h);
    if (share < 0.04 || share > 0.7) return null;                   // presque rien, ou presque tout : pas un objet sur un fond
    ctx.putImageData(data, 0, 0); cv.setAttribute('aria-hidden', 'true');
    return cv;
  };
  var bento = function (box) {
    var content = box.querySelector('.g-hero__content'), facts = content.querySelector('.k-facts'), action = content.querySelector(':scope > .k-btn'), cap = content.querySelector('.g-hero__caption');
    if (!facts && !action) return;
    var row = document.createElement('div'); row.className = 'g-bento';
    if (action || cap) { var wide = document.createElement('div'); wide.className = 'g-bento__tile g-bento__tile--wide'; if (cap) wide.appendChild(cap); if (action) wide.appendChild(action); row.appendChild(wide); }
    if (facts) row.appendChild(facts);
    box.appendChild(row);
  };
  var g = F.heroPhoto({ variant: 'stage', extra: function (box) { bento(box); },
    mount: function (box, ctx) {
      F.entree(box, ctx);
      var img = box.querySelector('.g-hero__layer--base img'), alive = true; if (!img) return null;
      var nums = function (name, fallback) { var v = (img.getAttribute(name) || '').trim().split(/\s+/).map(Number); return v.length === fallback.length && v.every(isFinite) ? v : fallback; };
      var im = new Image(); im.crossOrigin = 'anonymous';
      im.onload = function () {
        if (!alive) return;
        try { var cv = cut(im, nums('data-k-cutout', [0, 0, 1, 1]), nums('data-k-matte', [34, 84])); if (cv) { img.parentNode.appendChild(cv); box.setAttribute('data-k-cut', ''); } }
        catch (e) { /* lecture des pixels refusée : la photo reste entière */ }
      };
      im.src = img.currentSrc || img.src;
      return function () { alive = false; box.removeAttribute('data-k-cut'); var cv = box.querySelector('.g-hero__layer--base canvas'); if (cv) cv.remove(); };
    } });
  Kobo.templates.register({ skill: 'showroom-bento', family: 'hero-photo', slot: 'hero', render: g.render, mount: g.mount });
})();
