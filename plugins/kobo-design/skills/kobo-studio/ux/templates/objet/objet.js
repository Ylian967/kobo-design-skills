/*
 * kobo-studio — famille « objet 3D dans le héros » : charge la 3D en différé, tient le rendu, se replie sur la photo.
 * Kobo.templates.families.objet(options) rend { render, mount }.
 *   options.label : nom de l'objet pour les lecteurs d'écran ; options.lib : module three.js ; options.addons : { nom: adresse }
 *   options.build(THREE, api) → { root : objet à faire tourner, idle : vitesse de rotation au repos (0 = aucune), tick(t, dt) }
 *     api = { scene, camera, renderer, color(nom) → THREE.Color, addons, still }
 * Geste : tirer l'objet le fait tourner. Alternative : deux boutons « Tourner » (clic, Entrée, Espace), et les flèches quand
 * l'un d'eux a le focus. Le défilement vertical de la page reste libre (touch-action: pan-y).
 * Performance : chargement après la page, au premier temps mort ; une seule boucle (Kobo.loop), 30 images/s, seulement quand
 * l'objet est à l'écran ; au repos sans rotation, plus aucun rendu. En « reduced » et sous prefers-reduced-motion : image fixe,
 * redessinée seulement quand on tourne l'objet.
 */
(function () {
  'use strict';
  var Kobo = window.Kobo, F = (Kobo.templates.families = Kobo.templates.families || {});
  F.objet = function (options) {
    return {
      render: function (parts) {
        if (!parts.title) return null;
        var box = document.createElement('div'); box.className = 'g-obj' + (options.variant ? ' g-obj--' + options.variant : '');
        box.innerHTML = '<div class="g-obj__text"></div><div class="g-obj__side"><div class="g-obj__stage" role="img"><canvas aria-hidden="true"></canvas></div>' +
          '<div class="g-obj__turn"><button type="button" class="k-btn k-btn--secondary" data-turn="-1">Tourner à gauche</button><button type="button" class="k-btn k-btn--secondary" data-turn="1">Tourner à droite</button></div></div>';
        box.querySelector('.g-obj__stage').setAttribute('aria-label', options.label || 'Objet en trois dimensions');
        var text = box.querySelector('.g-obj__text');
        ['kicker', 'title', 'lead', 'facts', 'action'].forEach(function (k) { (parts[k] || []).forEach(function (n) { text.appendChild(n); }); });
        if (parts.media) box.querySelector('.g-obj__side').appendChild(parts.media[0]);
        if (options.extra) options.extra(box, parts);
        return box;
      },
      mount: function (el, ctx) {
        var stage = el.querySelector('.g-obj__stage'), canvas = stage && stage.querySelector('canvas'), alive = true, stops = [];
        if (!stage) return null;
        var start = function () {
          if (!alive) return;
          var names = Object.keys(options.addons || {});
          Promise.all([import(options.lib)].concat(names.map(function (n) { return import(options.addons[n]); }))).then(function (mods) {
            if (!alive) return;
            var THREE = mods[0], addons = {}, renderer;
            names.forEach(function (n, i) { addons[n] = mods[i + 1]; });
            try { renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, powerPreference: 'low-power' }); } catch (e) { return; }   // pas de WebGL : la photo reste seule
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
            var api = { scene: new THREE.Scene(), camera: new THREE.PerspectiveCamera(30, 1, 0.1, 50), renderer: renderer, addons: addons, still: ctx.still,
              color: function (name) { var c = ctx.color(name); return new THREE.Color().setRGB(c[0] / 255, c[1] / 255, c[2] / 255, THREE.SRGBColorSpace); } };   // les couleurs de la fiche sont en sRGB
            var world = options.build(THREE, api), up = new THREE.Vector3(0, 1, 0), spin = new THREE.Quaternion();
            var dirty = true, dragging = false, lx = 0, ly = 0, lastDraw = 0, idle = !ctx.still && world.idle > 0, turn = 0;
            var size = function () { var s = stage.clientWidth; if (s) { renderer.setSize(s, s, false); dirty = true; draw(performance.now()); } };
            var draw = function (now) {
              if (now - lastDraw < 33) return;
              var dt = Math.min(0.1, (now - lastDraw) / 1000); lastDraw = now;
              if (turn) { var step = Math.sign(turn) * Math.min(Math.abs(turn), ctx.still ? Math.abs(turn) : dt * 2.4); world.root.rotateOnWorldAxis(up, step); turn -= step; dirty = true; }
              else if (idle && !dragging) { world.root.rotateOnWorldAxis(up, dt * world.idle); dirty = true; }
              if (world.tick) dirty = world.tick(now / 1000, dt) || dirty;
              if (!dirty) return;                                                  // rien n'a bougé : pas de rendu
              dirty = false; renderer.render(api.scene, api.camera);
            };
            var ro = new ResizeObserver(size); ro.observe(stage); stops.push(function () { ro.disconnect(); });
            stage.setAttribute('data-k-ready', ''); size();
            stops.push(Kobo.loop.add(stage, draw));
            var down = function (e) { dragging = true; lx = e.clientX; ly = e.clientY; canvas.setPointerCapture(e.pointerId); };
            var move = function (e) { if (!dragging) return; spin.setFromEuler(new THREE.Euler((e.clientY - ly) * 0.006, (e.clientX - lx) * 0.006, 0)); world.root.quaternion.premultiply(spin); lx = e.clientX; ly = e.clientY; dirty = true; };
            var upFn = function () { dragging = false; };
            canvas.addEventListener('pointerdown', down); canvas.addEventListener('pointermove', move); canvas.addEventListener('pointerup', upFn); canvas.addEventListener('pointercancel', upFn);
            var turner = el.querySelector('.g-obj__turn');
            var click = function (e) { var b = e.target.closest('[data-turn]'); if (b) { idle = false; turn += +b.dataset.turn * 0.6; } };
            var key = function (e) { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); idle = false; turn += (e.key === 'ArrowRight' ? 1 : -1) * 0.3; } };
            turner.addEventListener('click', click); turner.addEventListener('keydown', key);
            stops.push(function () { canvas.removeEventListener('pointerdown', down); canvas.removeEventListener('pointermove', move); canvas.removeEventListener('pointerup', upFn); canvas.removeEventListener('pointercancel', upFn); turner.removeEventListener('click', click); turner.removeEventListener('keydown', key); renderer.dispose(); stage.removeAttribute('data-k-ready'); });
          }, function () { /* module introuvable (hors ligne) : la photo reste seule */ });
        };
        var whenIdle = window.requestIdleCallback || function (fn) { return setTimeout(fn, 200); };
        if (document.readyState === 'complete') whenIdle(start); else window.addEventListener('load', function () { whenIdle(start); }, { once: true });
        return function () { alive = false; stops.forEach(function (s) { s(); }); };
      }
    };
  };
})();
