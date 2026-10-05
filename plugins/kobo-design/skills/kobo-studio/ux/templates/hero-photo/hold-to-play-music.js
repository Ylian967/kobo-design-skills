/*
 * kobo-studio — héros photo, habillage hold-to-play-music : écran unique, mot peint, touche à maintenir.
 * Mot peint (démo : #paint) : une lettre = un bloc, penché et étiré en hauteur, qui part d'un trait dispersé puis se range ;
 * une fois rangé, le mot reçoit le filtre « rough » de la démo (bords de pinceau). Le hasard est déterministe (graine 7).
 * Écart : la démo ne défile pas ; ici la page défile, et un filtre SVG vivant serait recalculé à chaque image (24 images/s mesurées).
 * Le mot filtré est donc dessiné une seule fois dans deux canvas décoratifs (couleurs au repos, blanc pendant l'appui), posés
 * exactement sur les lettres, qui restent dans la page (titre nommé par aria-label). Sans filtre de canvas : lettres nettes.
 * Geste (démo : startHold / endHold) : maintenir la touche — souris, doigt, ou barre d'espace — trace son contour pendant
 * --k-sig-hold ; la photo reprend sa couleur ; « Relâchez » : au relâchement, l'action du héros est suivie. Relâcher avant : rien.
 * Sans le geste : Entrée sur la touche suit l'action tout de suite (comme la démo), et un lien « sans maintenir » fait de même.
 * La touche EST l'action du héros (même lien, même libellé) : rien n'est ajouté au parcours.
 */
(function () {
  'use strict';
  var F = Kobo.templates.families;
  F.entree = F.entree || function (box, ctx) {
    if (ctx.still) return;
    box.setAttribute('data-k-in', 'pending');
    requestAnimationFrame(function () { box.setAttribute('data-k-motion', ''); requestAnimationFrame(function () { box.setAttribute('data-k-in', 'done'); }); });
  };
  var ROUGH = '<svg class="g-paint__defs" aria-hidden="true" focusable="false"><filter id="g-rough" x="-5%" y="-10%" width="110%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.035 0.12" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G"/></filter></svg>';
  var paint = function (h) {
    var text = h.textContent.trim(), seed = 7, i = 0, tones = ['o', '', 'o', '', '', 'o', ''];
    var rnd = function (a, b) { seed = (seed * 16807) % 2147483647; return (a + seed / 2147483647 * (b - a)).toFixed(2); };
    h.setAttribute('aria-label', text); h.textContent = ''; h.classList.add('g-paint');
    text.split(/\s+/).forEach(function (word) {
      var w = document.createElement('span'); w.className = 'g-paint__word'; w.setAttribute('aria-hidden', 'true');
      Array.prototype.forEach.call(word, function (c) {
        var s = document.createElement('span'); s.textContent = c; if (tones[i % tones.length]) s.className = 'g-paint--' + tones[i % tones.length];
        s.style.cssText = '--_i:' + i + ';--_x:' + rnd(-0.6, 0.6) + 'em;--_y:' + rnd(-0.8, 0.8) + 'em;--_r:' + rnd(-80, 80) + 'deg;--_sx:' + rnd(0.15, 0.5) + ';--_sy:' + rnd(0.5, 1.1) + ';--_tilt:' + rnd(-3.5, 3.5) + 'deg;--_tall:' + rnd(1.75, 2.05);
        w.appendChild(s); i++;
      });
      h.appendChild(w); h.appendChild(document.createTextNode(' '));
    });
  };
  // Dessine le mot, lettre par lettre, avec le filtre : même place, même inclinaison, même étirement que les lettres de la page
  var bake = function (h) {
    h.querySelectorAll('canvas').forEach(function (c) { c.remove(); }); h.removeAttribute('data-k-baked');
    if (!('filter' in CanvasRenderingContext2D.prototype) || !h.offsetWidth) return;
    var pad = 24, dpr = Math.min(window.devicePixelRatio || 1, 2), w = h.offsetWidth + pad * 2, hh = h.offsetHeight + pad * 2;
    var letters = Array.prototype.map.call(h.querySelectorAll('.g-paint__word > span'), function (s) {
      var cs = getComputedStyle(s);
      return { ch: s.textContent.toUpperCase(), x: s.offsetLeft + s.offsetWidth / 2, y: s.offsetTop + s.offsetHeight / 2, font: cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily, color: cs.color,
        tilt: parseFloat(s.style.getPropertyValue('--_tilt')) * Math.PI / 180, tall: parseFloat(s.style.getPropertyValue('--_tall')) };
    });
    ['idle', 'hold'].forEach(function (name) {
      var c = document.createElement('canvas'); c.width = Math.round(w * dpr); c.height = Math.round(hh * dpr); c.className = 'g-paint__ink g-paint__ink--' + name; c.setAttribute('aria-hidden', 'true');
      c.style.cssText = 'left:' + -pad + 'px;top:' + -pad + 'px;width:' + w + 'px;height:' + hh + 'px';
      var x = c.getContext('2d'); x.scale(dpr, dpr); x.translate(pad, pad); x.filter = 'url(#g-rough)'; x.textAlign = 'center';
      letters.forEach(function (l) {
        x.save(); x.font = l.font; x.fillStyle = name === 'hold' ? getComputedStyle(h).color : l.color;
        var m = x.measureText(l.ch), dy = ((m.fontBoundingBoxAscent || 0) - (m.fontBoundingBoxDescent || 0)) / 2;
        x.translate(l.x, l.y); x.rotate(l.tilt); x.scale(1, l.tall); x.fillText(l.ch, 0, dy); x.restore();
      });
      h.appendChild(c);
    });
    h.setAttribute('data-k-baked', '');
  };
  var key = function (box) {
    var a = box.querySelector('.g-hero__content > .k-btn'); if (!a || !a.getAttribute('href')) return;
    var say = document.createElement('p'); say.className = 'g-say'; say.setAttribute('aria-live', 'polite');
    say.innerHTML = '<span class="g-say__idle">Maintenez</span><span class="g-say__ready">Relâchez</span><span class="g-say__slot"></span><span class="g-say__idle">à la souris, au doigt ou avec la barre d’espace.</span><span class="g-say__ready">C’est prêt.</span>';
    a.parentNode.insertBefore(say, a); say.querySelector('.g-say__slot').appendChild(a);
    a.classList.add('g-key'); a.insertAdjacentHTML('afterbegin', '<svg aria-hidden="true" focusable="false"><rect class="g-key__fill" pathLength="1"/></svg>');
    var direct = document.createElement('a'); direct.className = 'k-btn k-btn--secondary g-say__direct'; direct.href = a.getAttribute('href'); direct.textContent = 'Y aller sans maintenir';
    say.parentNode.insertBefore(direct, say.nextSibling);
  };
  var g = F.heroPhoto({ variant: 'single',
    extra: function (box) { var h = box.querySelector('h1'); if (h) paint(h); key(box); box.insertAdjacentHTML('beforeend', ROUGH); },
    mount: function (box, ctx) {
      F.entree(box, ctx);
      var h = box.querySelector('.g-paint'), a = box.querySelector('.g-key'), timers = [], stops = [];
      var bakeSoon = function () { clearTimeout(timers[1]); timers[1] = setTimeout(function () { bake(h); }, 120); }, roh = null;
      if (h) timers[0] = setTimeout(function () {
        (document.fonts ? document.fonts.ready : Promise.resolve()).then(function () { bake(h); roh = new ResizeObserver(bakeSoon); roh.observe(h); });
      }, ctx.still ? 0 : 1500);
      stops.push(function () { if (roh) roh.disconnect(); if (h) { h.querySelectorAll('canvas').forEach(function (c) { c.remove(); }); h.removeAttribute('data-k-baked'); } });
      if (!a) return function () { timers.forEach(clearTimeout); stops.forEach(function (s) { s(); }); };
      // Le contour de la touche suit sa taille réelle
      var fit = function () {
        var w = a.offsetWidth, hh = a.offsetHeight, line = parseFloat(getComputedStyle(a).getPropertyValue('--k-border-w')) || 1, svg = a.querySelector('svg');
        svg.setAttribute('viewBox', '0 0 ' + w + ' ' + hh);
        svg.querySelectorAll('rect').forEach(function (r) { r.setAttribute('x', line / 2); r.setAttribute('y', line / 2); r.setAttribute('width', Math.max(0, w - line)); r.setAttribute('height', Math.max(0, hh - line)); r.setAttribute('rx', Math.max(0, (hh - line) / 2)); });
      };
      var ro = new ResizeObserver(fit); ro.observe(a); fit();
      var HOLD = (function () { var v = getComputedStyle(box).getPropertyValue('--k-sig-hold').trim(); return /ms$/.test(v) ? parseFloat(v) : parseFloat(v) * 1000 || 0; })();
      var holding = false, ready = false, timer = 0, go = false;
      var start = function () { if (holding) return; holding = true; box.setAttribute('data-k-hold', 'holding'); timer = setTimeout(function () { ready = true; box.setAttribute('data-k-hold', 'ready'); }, HOLD); };
      var end = function () {
        if (!holding) return;
        holding = false; clearTimeout(timer); box.removeAttribute('data-k-hold');
        if (ready) { ready = false; go = true; a.click(); go = false; }
      };
      var down = function (e) { if (e.button) return; e.preventDefault(); a.setPointerCapture(e.pointerId); start(); };
      var click = function (e) { if (e.detail > 0 && !go) e.preventDefault(); };            // un clic de souris seul ne suffit pas ; Entrée (detail 0) passe
      var menu = function (e) { e.preventDefault(); };
      var typing = function (t) { return t.closest && t.closest('input, textarea, select, button, [contenteditable], dialog, a:not(.g-key)'); };
      var visible = function () { var r = box.getBoundingClientRect(); return r.bottom > 0 && r.top < window.innerHeight; };
      var kd = function (e) { if (e.code === 'Space' && !typing(e.target) && visible()) { e.preventDefault(); if (!e.repeat) start(); } };
      var ku = function (e) { if (e.code === 'Space') end(); };
      a.addEventListener('pointerdown', down); a.addEventListener('pointerup', end); a.addEventListener('pointercancel', end); a.addEventListener('click', click); a.addEventListener('contextmenu', menu);
      window.addEventListener('keydown', kd); window.addEventListener('keyup', ku); window.addEventListener('blur', end);
      return function () {
        timers.forEach(clearTimeout); clearTimeout(timer); ro.disconnect(); box.removeAttribute('data-k-hold'); stops.forEach(function (s) { s(); });
        a.removeEventListener('pointerdown', down); a.removeEventListener('pointerup', end); a.removeEventListener('pointercancel', end); a.removeEventListener('click', click); a.removeEventListener('contextmenu', menu);
        window.removeEventListener('keydown', kd); window.removeEventListener('keyup', ku); window.removeEventListener('blur', end);
      };
    } });
  Kobo.templates.register({ skill: 'hold-to-play-music', family: 'hero-photo', slot: 'hero', render: g.render, mount: g.mount });
})();
