/*
 * kobo-studio — famille « scène plein écran » : charge la bibliothèque 3D en différé, tient le rendu, se replie sur une photo.
 * Kobo.templates.families.scene(options) rend { render, mount }.
 *   options.fallback : { src, alt } — vraie photo affichée avant la scène, et à sa place si WebGL manque ou si le chargement échoue
 *   options.lib : adresse du module three.js ; options.build(THREE, api) → { frame(t, dt, etat), still(etat) }
 *     api = { scene, camera, renderer, color(nom) → THREE.Color, random() déterministe }
 *     etat = { scroll: 0 → 1 (avancée dans la page), px, py : pointeur lissé (−0,5 → 0,5), born : 0 → 1 (assemblage) }
 * Performance : chargement après l'événement load et un temps mort ; une seule boucle (Kobo.loop), plafonnée à 30 images/s ;
 * arrêt quand l'onglet est caché ; résolution abaissée d'elle-même si une image dépasse 45 ms ; géométries et matières créées
 * une fois. En « reduced » et sous prefers-reduced-motion : une image fixe, redessinée seulement au changement de taille.
 */
(function () {
  'use strict';
  var Kobo = window.Kobo, F = (Kobo.templates.families = Kobo.templates.families || {});
  F.scene = function (options) {
    return {
      render: function () {
        return '<div class="g-scene3d"><img src="' + options.fallback.src + '" alt="" decoding="async"></div>';   // alt vide : décor ; la photo de contenu reste celle du héros
      },
      mount: function (el, ctx) {
        var host = el.querySelector('.g-scene3d'), alive = true, stops = [];
        var start = function () {
          if (!alive) return;
          import(options.lib).then(function (THREE) {
            if (!alive) return;
            var renderer;
            try { renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' }); } catch (e) { return; }   // pas de WebGL : la photo reste
            var quality = Math.min(window.devicePixelRatio || 1, 1.25);
            renderer.setPixelRatio(quality); renderer.outputColorSpace = THREE.SRGBColorSpace;
            renderer.domElement.setAttribute('aria-hidden', 'true');
            host.appendChild(renderer.domElement);
            var seed = 7, api = {
              scene: new THREE.Scene(), camera: new THREE.PerspectiveCamera(35, 1, 0.1, 80), renderer: renderer,
              color: function (name) { var c = ctx.color(name); return new THREE.Color(c[0] / 255, c[1] / 255, c[2] / 255); },
              random: function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
            };
            var world = options.build(THREE, api), state = { scroll: 0, px: 0, py: 0, born: ctx.still ? 1 : 0 };
            var resize = function () {
              var w = host.clientWidth, h = host.clientHeight;
              renderer.setSize(w, h, false);
              api.camera.aspect = w / h; api.camera.fov = api.camera.aspect < 0.8 ? 50 : 35; api.camera.updateProjectionMatrix();
              if (ctx.still) { read(); world.still(state); renderer.render(api.scene, api.camera); }
            };
            var read = function () { var max = document.documentElement.scrollHeight - window.innerHeight; state.scroll = max > 0 ? Math.min(1, window.scrollY / max) : 0; };
            var ro = new ResizeObserver(resize); ro.observe(host); stops.push(function () { ro.disconnect(); });
            resize();
            if (ctx.still) {
              var pending = 0, redraw = function () { if (!pending) pending = requestAnimationFrame(function () { pending = 0; read(); world.still(state); renderer.render(api.scene, api.camera); }); };
              window.addEventListener('scroll', redraw, { passive: true }); stops.push(function () { window.removeEventListener('scroll', redraw); });
            } else {
              var px = 0, py = 0, move = function (e) { px = e.clientX / window.innerWidth - 0.5; py = e.clientY / window.innerHeight - 0.5; };
              window.addEventListener('pointermove', move, { passive: true }); stops.push(function () { window.removeEventListener('pointermove', move); });
              var lastDraw = 0, slow = 0, bornAt = 0, time = 0;
              stops.push(Kobo.loop.add(host, function (now) {
                if (now - lastDraw < 30) return;                                   // 30 images/s : la scène couvre tout l'écran
                var gap = now - lastDraw; slow = lastDraw && gap > 45 ? slow + 1 : Math.max(0, slow - 1); lastDraw = now;
                if (slow > 6 && quality > 0.4) { quality = Math.max(0.4, quality - 0.2); renderer.setPixelRatio(quality); resize(); slow = 0; }
                var dt = Math.min(gap, 50) / 1000; time += dt;
                if (!bornAt) bornAt = now;
                state.born = Math.min(1, (now - bornAt) / (options.born || 2800));
                read(); state.px += (px - state.px) * 0.06; state.py += (py - state.py) * 0.06;
                world.frame(time, dt, state);
                renderer.render(api.scene, api.camera);
              }));
            }
            host.setAttribute('data-k-ready', '');
            stops.push(function () { renderer.dispose(); if (renderer.domElement.parentNode) renderer.domElement.remove(); host.removeAttribute('data-k-ready'); });
          }, function () { /* module introuvable (hors ligne) : la photo reste */ });
        };
        // différé : après le chargement de la page, puis au premier temps mort
        var idle = window.requestIdleCallback || function (fn) { return setTimeout(fn, 200); };
        if (document.readyState === 'complete') idle(start); else window.addEventListener('load', function () { idle(start); }, { once: true });
        return function () { alive = false; stops.forEach(function (s) { s(); }); };
      }
    };
  };
})();
