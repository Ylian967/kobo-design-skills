/*
 * kobo-studio — famille « chapitre plein écran » : recompose un chapitre en scène et pose le cercle à tirer.
 * Kobo.templates.families.chapitreEcran(options) rend { render, mount }.
 *   options.next : libellé du bouton (« Chapitre suivant ») ; options.last : libellé du dernier (« Suite »)
 * Le cercle est un <button> : un clic, Entrée ou Espace passent au chapitre suivant, comme le geste (tirer au-delà de 80 %
 * de la course). Après l'action, le focus va au titre du chapitre atteint. Sous prefers-reduced-motion et en « reduced »,
 * le passage est immédiat (pas de défilement animé) et l'image ne suit pas le pointeur.
 * Pointeur : un seul écouteur pour toutes les scènes ; chaque scène n'écrit ses deux variables que lorsqu'elle est à l'écran.
 */
(function () {
  'use strict';
  var Kobo = window.Kobo, F = (Kobo.templates.families = Kobo.templates.families || {});
  var pointer = { x: 0, y: 0, on: false };
  function listen() {
    if (pointer.on) return; pointer.on = true;
    window.addEventListener('pointermove', function (e) { pointer.x = e.clientX / window.innerWidth - 0.5; pointer.y = e.clientY / window.innerHeight - 0.5; }, { passive: true });
  }
  F.chapitreEcran = function (options) {
    options = options || {};
    return {
      render: function (parts, el, i) {
        if (!parts.title || !parts.media) return null;
        var box = document.createElement('div'); box.className = 'g-scene';
        box.innerHTML = '<div class="g-scene__image"></div><div class="g-scene__veil"></div><div class="g-scene__copy"></div>' +
          '<div class="g-pull"><button type="button" class="g-pull__handle"></button></div>';
        Array.prototype.forEach.call(parts.media[0].querySelectorAll('img'), function (im) { im.decoding = 'async'; });   // le décodage d'une image plein écran ne doit pas bloquer le défilement
        box.querySelector('.g-scene__image').appendChild(parts.media[0]);
        var copy = box.querySelector('.g-scene__copy');
        if (parts.kicker) copy.appendChild(parts.kicker[0]);
        parts.title[0].setAttribute('tabindex', '-1');
        copy.appendChild(parts.title[0]);
        (parts.text || []).forEach(function (p) { copy.appendChild(p); });
        return box;
      },
      mount: function (el, ctx) {
        var box = el.querySelector('.g-scene'), pull = el.querySelector('.g-pull'), handle = el.querySelector('.g-pull__handle');
        if (!box) return null;
        // cible : le chapitre suivant, sinon la section qui suit le récit
        var next = el.nextElementSibling && el.nextElementSibling.matches('[data-k-slot="chapter"]') ? el.nextElementSibling : (el.parentElement.nextElementSibling || null);
        var nextTitle = next ? next.querySelector('h2') : null;
        handle.setAttribute('aria-label', (next && next.matches('[data-k-slot="chapter"]') ? (options.next || 'Chapitre suivant') : (options.last || 'Suite')) + (nextTitle ? ' : ' + nextTitle.textContent.trim() : ''));
        if (!next) { pull.hidden = true; }
        function go() {
          if (!next) return;
          next.scrollIntoView({ behavior: ctx.still ? 'auto' : 'smooth', block: 'start' });
          var t = next.querySelector('h2'); if (t) { t.setAttribute('tabindex', '-1'); t.focus({ preventScroll: true }); }
        }
        var y = 0, start = 0, dragging = false, moved = false;
        var course = function () { return pull.clientHeight - handle.offsetHeight * 1.25; };
        function set(v) { y = Math.max(0, Math.min(course(), v)); handle.style.setProperty('--_y', y + 'px'); pull.toggleAttribute('data-k-near', y > course() * 0.8); }
        function down(e) { dragging = true; moved = false; start = e.clientY - y; handle.setPointerCapture(e.pointerId); handle.setAttribute('data-k-drag', ''); }
        function move(e) { if (!dragging) return; if (Math.abs(e.clientY - start - y) > 2) moved = true; set(e.clientY - start); }
        function up() { if (!dragging) return; dragging = false; handle.removeAttribute('data-k-drag'); var done = y > course() * 0.8; set(0); pull.removeAttribute('data-k-near'); if (done) go(); }
        function click() { if (moved) { moved = false; return; } go(); }          // un clic sans glisser, Entrée ou Espace : même effet que le geste
        handle.addEventListener('pointerdown', down); handle.addEventListener('pointermove', move);
        handle.addEventListener('pointerup', up); handle.addEventListener('pointercancel', up); handle.addEventListener('click', click);
        var stops = [];
        if (!ctx.still) {
          listen();
          var image = el.querySelector('.g-scene__image'), sx = 0, sy = 0, shown = '';
          stops.push(Kobo.loop.add(box, function () {
            sx += (-pointer.x - sx) * 0.06; sy += (-pointer.y - sy) * 0.06;
            var nextValue = sx.toFixed(3) + '|' + sy.toFixed(3);
            if (nextValue === shown) return;
            shown = nextValue; image.style.setProperty('--_px', sx.toFixed(3)); image.style.setProperty('--_py', sy.toFixed(3));
          }));
          box.setAttribute('data-k-in', 'pending');
          requestAnimationFrame(function () { box.setAttribute('data-k-motion', ''); });
          var io = new IntersectionObserver(function (entries) { entries.forEach(function (e) { if (e.isIntersecting) { box.setAttribute('data-k-in', 'done'); io.disconnect(); } }); }, { threshold: 0.35 });
          io.observe(box); stops.push(function () { io.disconnect(); });
        }
        return function () { stops.forEach(function (s) { s(); }); };
      }
    };
  };
})();
