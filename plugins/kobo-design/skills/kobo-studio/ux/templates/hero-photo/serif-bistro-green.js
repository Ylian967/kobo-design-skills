// kobo-studio — héros photo, habillage serif-bistro-green : le titre s'écarte autour de l'arche, qui remonte dedans.
// Le titre est coupé en deux lignes de deux moitiés (texte gardé par aria-label) ; entre les moitiés, la place de l'arche.
(function () {
  'use strict';
  var F = Kobo.templates.families;
  F.entree = F.entree || function (box, ctx) {
    if (ctx.still) return;
    box.setAttribute('data-k-in', 'pending');
    requestAnimationFrame(function () { box.setAttribute('data-k-motion', ''); requestAnimationFrame(function () { box.setAttribute('data-k-in', 'done'); }); });
  };
  var g = F.heroPhoto({
    variant: 'bistro',
    extra: function (box) {
      var h = box.querySelector('h1'); if (!h) return;
      var text = h.textContent.trim(), words = text.split(/\s+/), q = Math.ceil(words.length / 4);
      h.setAttribute('aria-label', text); h.textContent = '';
      for (var l = 0; l < 2; l++) {
        var line = document.createElement('span'); line.className = 'g-bistro__line'; line.setAttribute('aria-hidden', 'true');
        for (var half = 0; half < 2; half++) {
          var i = (l * 2 + half) * q, part = (l === 1 && half === 1 ? words.slice(i) : words.slice(i, i + q)).join(' ');
          if (!part) continue;
          var s = document.createElement('span'); s.textContent = part; line.appendChild(s);
        }
        h.appendChild(line);
      }
    },
    mount: function (box, ctx) {
      F.entree(box, ctx);
      // Garde-fou de lisibilité : le titre ne doit jamais se trouver devant la photo. Mesuré au chargement et à chaque changement de largeur.
      var rig = box.querySelector('.g-hero__rig'), pending = 0;
      // Positions lues dans la mise en page (offsetTop), pas à l'écran : l'entrée déplace l'arche par un transform, qui fausserait la mesure
      var topIn = function (el) { var y = 0; while (el && el !== box) { y += el.offsetTop; el = el.offsetParent; } return y; };
      var check = function () {
        pending = 0;
        var h = box.querySelector('h1'), hit = true, wrapped = false, halves = box.querySelectorAll('.g-bistro__line > span');
        // Le titre doit tenir de part et d'autre de l'arche : on réduit son corps par paliers jusqu'à ce qu'il tienne (--_k, de 1 à 0,55)
        for (var k = 1; (hit || wrapped) && k > 0.5; k -= 0.09) {
          box.style.setProperty('--_k', k.toFixed(2));
          box.setAttribute('data-k-flat', '');                                // position sans remontée : on mesure la distance jusqu'au haut du titre
          box.style.setProperty('--_up', Math.max(0, Math.round(topIn(rig) - topIn(h))) + 'px');
          box.removeAttribute('data-k-flat');
          var raw = rig.getBoundingClientRect(), dy = raw.top - (box.getBoundingClientRect().top + topIn(rig)), r = { left: raw.left, right: raw.right, top: raw.top - dy, bottom: raw.bottom - dy };
          hit = Array.prototype.some.call(box.querySelectorAll('.g-bistro__line > span, .k-lead, .k-facts, .k-btn'), function (s) { var b = s.getBoundingClientRect(); return Math.min(b.right, r.right) - Math.max(b.left, r.left) > -4 && Math.min(b.bottom, r.bottom) - Math.max(b.top, r.top) > 2; });
          var line = parseFloat(getComputedStyle(h).lineHeight) || parseFloat(getComputedStyle(h).fontSize) * 1.1;
          wrapped = r.top < h.getBoundingClientRect().bottom && Array.prototype.some.call(halves, function (s) { return s.offsetHeight > line * 1.5; });   // une moitié passe sur deux lignes à côté de l'arche : on réduit aussi
        }
        if (hit) box.style.setProperty('--_k', '1');                           // rien n'y fait (titre très long) : corps d'origine, arche sous le texte
        box.toggleAttribute('data-k-flat', hit);
      };
      var ro = new ResizeObserver(function () { if (!pending) pending = requestAnimationFrame(check); }); ro.observe(box);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(check);
      check();
      return function () { ro.disconnect(); cancelAnimationFrame(pending); };
    }
  });
  Kobo.templates.register({ skill: 'serif-bistro-green', family: 'hero-photo', slot: 'hero', render: g.render, mount: g.mount });
})();
