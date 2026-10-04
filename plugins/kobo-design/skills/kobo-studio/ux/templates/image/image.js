/*
 * kobo-studio — famille « image » : enveloppe l'image d'un emplacement media dans une forme propre au skill.
 * Kobo.templates.families.image(options) rend { render, mount }.
 *   options.shapes : liste de valeurs clip-path, distribuées à tour de rôle ; options.defs : SVG de définitions à poser une fois
 *   options.parallax : true → l'image glisse dans sa forme pendant le défilement (full seulement)
 * Parallaxe : une variable (--_y, de −1 à 1) écrite par la boucle commune, seulement quand l'image est à l'écran ;
 * appliquée en transform. En « reduced » et sous prefers-reduced-motion : image fixe.
 */
(function () {
  'use strict';
  var Kobo = window.Kobo, F = (Kobo.templates.families = Kobo.templates.families || {});
  F.image = function (options) {
    options = options || {};
    return {
      render: function (parts, el, i) {
        var img = el.querySelector('img');
        if (!img) return null;
        if (options.defs && !document.getElementById(options.defsId)) {
          var holder = document.createElement('div'); holder.innerHTML = options.defs; holder.firstChild.id = options.defsId; document.body.appendChild(holder.firstChild);
        }
        var plate = document.createElement('span'); plate.className = 'g-plate';
        if (options.shapes) plate.style.setProperty('--_shape', options.shapes[i % options.shapes.length]);
        var copy = img.cloneNode(true);
        plate.appendChild(copy);
        var frag = document.createDocumentFragment(); frag.appendChild(plate);
        var cap = el.querySelector('figcaption'); if (cap) frag.appendChild(cap.cloneNode(true));
        return frag;
      },
      mount: function (el, ctx) {
        var plate = el.querySelector('.g-plate');
        if (!plate || !options.parallax || ctx.still) return null;
        plate.style.setProperty('--_zoom', options.zoom || 1.12);
        var last = 2;
        return Kobo.loop.add(plate, function () {
          var r = plate.getBoundingClientRect(), y = ((r.top + r.height / 2) / window.innerHeight - 0.5) * 2;
          y = Math.max(-1, Math.min(1, y));
          if (Math.abs(y - last) < 0.004) return;                              // rien n'a bougé : rien à écrire
          last = y; plate.style.setProperty('--_y', y.toFixed(3));
        });
      }
    };
  };
})();
