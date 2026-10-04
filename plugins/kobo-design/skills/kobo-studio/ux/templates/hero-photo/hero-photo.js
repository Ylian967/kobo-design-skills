/*
 * kobo-studio — famille « héros photo plein cadre » : met la photo du héros en plein cadre et pose le texte dessus.
 * Kobo.templates.families.heroPhoto(options) rend { render, mount }.
 *   options.variant : nom de variante (classe g-hero--<nom>) ; options.extra(box, parts, ctx) : retouche le héros construit ;
 *   options.layers(rig, ctx) : ajoute les couches propres au skill dans le montage (rendu) ;
 *   options.mount(box, ctx)  : mouvement propre au skill ; rend une fonction de nettoyage.
 * Point d'intérêt de la photo : attribut data-k-focus="x% y%" sur l'<img> (par défaut 50% 36%). Il cadre la photo et sert
 * de repère aux couches (bande, cadre, réticule). data-k-mark="x% y%" place ces repères ailleurs que le cadrage, quand le
 * sujet n'est pas au point de cadrage (les repères se posent alors à cet endroit du héros).
 * Le gabarit ne s'installe que si le héros a une image (sinon : contenu neutre).
 */
(function () {
  'use strict';
  var Kobo = window.Kobo, F = (Kobo.templates.families = Kobo.templates.families || {});
  F.heroPhoto = function (options) {
    options = options || {};
    return {
      render: function (parts, el, i, ctx) {
        var media = parts.media && parts.media[0], img = media && media.querySelector('img');
        if (!img || !parts.title) return null;
        var focus = (img.getAttribute('data-k-focus') || '50% 36%').split(/\s+/);
        var box = document.createElement('div'); box.className = 'g-hero' + (options.variant ? ' g-hero--' + options.variant : '');
        box.style.setProperty('--_fx', focus[0]); box.style.setProperty('--_fy', focus[1]);
        var mark = (img.getAttribute('data-k-mark') || focus.join(' ')).split(/\s+/);   // où poser les repères du skill dans le héros
        box.style.setProperty('--_mx', mark[0]); box.style.setProperty('--_my', mark[1]);
        box.innerHTML = '<div class="g-hero__rig"><div class="g-hero__layer g-hero__layer--base"></div></div><div class="g-hero__veil"></div><div class="g-hero__content"></div>';
        img.removeAttribute('style'); img.removeAttribute('loading');
        box.querySelector('.g-hero__layer--base').appendChild(img);
        if (options.layers) options.layers(box.querySelector('.g-hero__rig'), ctx);
        var content = box.querySelector('.g-hero__content');
        ['kicker', 'title', 'lead', 'facts', 'action'].forEach(function (k) { (parts[k] || []).forEach(function (n) { content.appendChild(n); }); });
        var cap = media.querySelector('figcaption');
        if (cap) { var c = document.createElement('p'); c.className = 'g-hero__caption'; c.textContent = cap.textContent; box.appendChild(c); }
        if (options.extra) options.extra(box, parts, ctx);
        return box;
      },
      mount: function (el, ctx) {
        var box = el.querySelector('.g-hero');
        return box && options.mount ? options.mount(box, ctx) : null;
      }
    };
  };

  /*
   * Cuisson : une version de la photo par table de couleurs, calculée une seule fois (luminance → couleur), dans des canvas.
   * ramps : { nom: [[r, v, b], …] } ; rend une promesse { nom: canvas }. Rejetée si le navigateur refuse la lecture (CORS) :
   * l'<img> filtrée en CSS reste alors affichée.
   */
  F.bake = function (src, ramps, maxWidth, alpha) {
    return new Promise(function (resolve, reject) {
      var im = new Image(); im.crossOrigin = 'anonymous';
      im.onerror = reject;
      im.onload = function () {
        try {
          var k = Math.min(1, (maxWidth || 1280) / im.naturalWidth), w = Math.round(im.naturalWidth * k), h = Math.round(im.naturalHeight * k);
          var c0 = document.createElement('canvas'); c0.width = w; c0.height = h;
          var x0 = c0.getContext('2d', { willReadFrequently: true }); x0.drawImage(im, 0, 0, w, h);
          var px = x0.getImageData(0, 0, w, h).data, L = new Uint8Array(w * h), out = {};
          for (var i = 0, j = 0; j < L.length; i += 4, j++) L[j] = px[i] * 0.3 + px[i + 1] * 0.59 + px[i + 2] * 0.11;
          Object.keys(ramps).forEach(function (name) {
            var stops = ramps[name], lut = new Uint8Array(768);
            for (var v = 0; v < 256; v++) { var f = v / 255 * (stops.length - 1), a = Math.floor(f), b = Math.min(a + 1, stops.length - 1), t = f - a; for (var ch = 0; ch < 3; ch++) lut[v * 3 + ch] = stops[a][ch] + (stops[b][ch] - stops[a][ch]) * t; }
            var c = document.createElement('canvas'); c.width = w; c.height = h; c.setAttribute('aria-hidden', 'true');
            var x = c.getContext('2d'), img = x.createImageData(w, h), d = img.data, fade = alpha && alpha[name];
            for (var n = 0, m = 0; n < L.length; n++, m += 4) { var o = L[n] * 3; d[m] = lut[o]; d[m + 1] = lut[o + 1]; d[m + 2] = lut[o + 2]; d[m + 3] = fade ? fade(L[n]) : 255; }
            x.putImageData(img, 0, 0); out[name] = c;
          });
          resolve(out);
        } catch (e) { reject(e); }
      };
      im.src = src;
    });
  };
})();
