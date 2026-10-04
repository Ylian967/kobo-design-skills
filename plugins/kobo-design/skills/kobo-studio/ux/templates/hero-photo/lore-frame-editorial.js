/*
 * kobo-studio — héros photo, habillage lore-frame-editorial : le titre devient un manifeste en lignes géantes décalées.
 * Le <h1> garde son texte (aria-label) ; il est seulement découpé en trois lignes au plus, chacune précédée d'un repère
 * décoratif (« 01V » : rang et initiale, comme dans la démo du skill). Les faits du héros ne sont pas affichés dans ce gabarit :
 * ils restent dans le contenu neutre (intensité off) — à n'utiliser que si le héros n'en porte pas d'indispensables.
 */
(function () {
  'use strict';
  var g = Kobo.templates.families.heroPhoto({
    variant: 'manifest',
    extra: function (box) {
      var h1 = box.querySelector('h1'); if (!h1) return;
      var text = h1.textContent.trim(), words = text.split(/\s+/), n = Math.min(3, words.length), lines = [], per = Math.ceil(words.length / n);
      for (var i = 0; i < words.length; i += per) lines.push(words.slice(i, i + per).join(' '));
      h1.setAttribute('aria-label', text); h1.textContent = '';
      lines.forEach(function (line, i) {
        var span = document.createElement('span'); span.className = 'g-manifest__line'; span.setAttribute('aria-hidden', 'true');
        var mark = document.createElement('small'); mark.className = 'g-manifest__mark'; mark.textContent = '0' + (i + 1) + line.charAt(0).toUpperCase();
        span.appendChild(mark); span.appendChild(document.createTextNode(line + (i === lines.length - 1 ? '.' : '')));
        h1.appendChild(span);
      });
    }
  });
  Kobo.templates.register({ skill: 'lore-frame-editorial', family: 'hero-photo', slot: 'hero', render: g.render, mount: g.mount });
})();
