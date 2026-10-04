/*
 * kobo-studio — objet 3D, habillage tiny-planet-toy : la planète de la démo du skill, portée telle quelle.
 * Seul écart : la fusion des géométries est écrite ici (voir plus bas).
 * Même construction : tout est posé sur la sphère puis fusionné par couleur (une dizaine de maillages), ombrage « dessin animé »
 * à trois paliers, contour d'encre par coques retournées, hasard déterministe (graine 7). Les couleurs viennent de la fiche.
 */
(function () {
  'use strict';
  var F = Kobo.templates.families;
  var g = F.objet({
    label: 'Une toute petite planète : maisons, arbres, un phare rayé et un bateau au port',
    lib: 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js',
    build: function (THREE, api) {
      var scene = api.scene, col = api.color;
      // Fusion de géométries sans index (positions et normales bout à bout). La démo prend mergeGeometries dans les modules
      // complémentaires de three.js, qui demandent une table d'import ; ici la page n'en a pas.
      var merge = function (list) {
        var n = 0; list.forEach(function (g0) { n += g0.attributes.position.count; });
        var pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), o = 0;
        list.forEach(function (g0) { pos.set(g0.attributes.position.array, o); nor.set(g0.attributes.normal.array, o); o += g0.attributes.position.count * 3; });
        var out = new THREE.BufferGeometry(); out.setAttribute('position', new THREE.BufferAttribute(pos, 3)); out.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
        return out;
      };
      var NAMES = { '--sky-deep': '--k-sig-sky-deep', '--cream': '--k-surface-2', '--wall': '--k-sig-wall', '--wall-warm': '--k-sig-wall-warm', '--orange': '--k-sig-orange', '--red': '--k-sig-red',
        '--road': '--k-sig-road', '--green': '--k-sig-green', '--green-light': '--k-sig-green-light', '--yellow': '--k-accent', '--paper': '--k-text-inverse', '--blue': '--k-accent-2', '--ink': '--k-text' };
      api.camera.position.set(0, 0, 6.3);
      scene.add(new THREE.AmbientLight(0xffffff, 1.5));
      var sun = new THREE.DirectionalLight(0xffffff, 2.2); sun.position.set(-3, 4, 5); scene.add(sun);
      var ramp = new THREE.DataTexture(new Uint8Array([120, 120, 120, 255, 200, 200, 200, 255, 255, 255, 255, 255]), 3, 1);
      ramp.minFilter = ramp.magFilter = THREE.NearestFilter; ramp.needsUpdate = true;
      var toon = function (name) { return new THREE.MeshToonMaterial({ color: col(NAMES[name]), gradientMap: ramp }); };
      var R = 1, up = new THREE.Vector3(0, 1, 0), world = new THREE.Group(); scene.add(world);
      var bins = {}, outline = [], seed = 7;
      var rnd = function () { return (seed = (seed * 16807) % 2147483647) / 2147483647; };
      var dirOf = function (lat, lon) { return new THREE.Vector3(Math.cos(lat) * Math.sin(lon), Math.sin(lat), Math.cos(lat) * Math.cos(lon)); };
      var put = function (geo, mat, dir, h, s, twist, ink) {
        h = h || 0; s = s === undefined ? 1 : s; twist = twist || 0; ink = ink === undefined ? 1.14 : ink;
        var q = new THREE.Quaternion().setFromUnitVectors(up, dir).multiply(new THREE.Quaternion().setFromAxisAngle(up, twist));
        var m = new THREE.Matrix4().compose(dir.clone().multiplyScalar(R + h), q, new THREE.Vector3(s, s, s));
        var g2 = geo.index ? geo.toNonIndexed() : geo.clone();
        (bins[mat] = bins[mat] || []).push(g2.clone().applyMatrix4(m));
        if (ink) outline.push(g2.clone().scale(ink, 1 + (ink - 1) * 0.6, ink).applyMatrix4(m));
      };
      var spots = [dirOf(0.25, 0.3), dirOf(1.05, 2.4), dirOf(-0.35, -1.9)];   // port, phare, vieille ville
      var water = [{ d: dirOf(0.1, 0.75), a: 0.42 }, { d: dirOf(-0.9, 2.9), a: 0.3 }];
      var wet = function (d) { return water.some(function (w) { return d.angleTo(w.d) < w.a + 0.06; }); };
      water.forEach(function (w) { put(new THREE.SphereGeometry(R * 1.006, 28, 8, 0, Math.PI * 2, 0, w.a).translate(0, -R, 0), '--sky-deep', w.d, 0, 1, 0, 0); });
      var box = new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0), roof = new THREE.ConeGeometry(0.78, 0.6, 4).rotateY(Math.PI / 4).translate(0, 0.3, 0);
      var trunk = new THREE.CylinderGeometry(0.12, 0.16, 0.5, 5).translate(0, 0.25, 0), leaf = new THREE.IcosahedronGeometry(0.42, 0).translate(0, 0.75, 0);
      var walls = ['--cream', '--wall', '--wall-warm'], roofs = ['--orange', '--red', '--road'];
      var house = function (d, s, t) { var w = 0.8 + rnd() * 0.5, h = 0.6 + rnd() * 0.9;
        put(box.clone().scale(w, h, 1), walls[rnd() * 3 | 0], d, -0.01, s, t);
        put(roof.clone().scale(w, 1, 1).translate(0, h, 0), roofs[rnd() * 3 | 0], d, -0.01, s, t); };
      var tree = function (d, s) { put(trunk, '--wall-warm', d, -0.01, s, 0, 0); put(leaf.clone().scale(1, 0.9 + rnd() * 0.5, 1), rnd() > 0.5 ? '--green' : '--green-light', d, -0.01, s, rnd() * 3); };
      for (var i = 0; i < 150; i++) { var d = dirOf(Math.asin(rnd() * 2 - 1), rnd() * Math.PI * 2); if (wet(d)) continue;
        var town = spots[2].angleTo(d) < 0.75 || spots[0].angleTo(d) < 0.5;
        if (rnd() < (town ? 0.75 : 0.25)) house(d, 0.13 + rnd() * 0.07, rnd() * 3); else tree(d, 0.16 + rnd() * 0.1); }
      // Le phare : fût rayé, lanterne, toit
      for (var k = 0; k < 4; k++) put(new THREE.CylinderGeometry(0.34 - k * 0.03, 0.37 - k * 0.03, 0.5, 10).translate(0, 0.25 + k * 0.5, 0), k % 2 ? '--cream' : '--orange', spots[1], -0.01, 0.24, 0, 1.1);
      put(new THREE.CylinderGeometry(0.3, 0.3, 0.3, 10).translate(0, 2.15, 0), '--yellow', spots[1], -0.01, 0.24, 0, 1.1);
      put(new THREE.ConeGeometry(0.4, 0.4, 10).translate(0, 2.5, 0), '--red', spots[1], -0.01, 0.24, 0, 1.1);
      // Le bateau du port : coque et cabine
      put(new THREE.BoxGeometry(1.7, 0.45, 0.6).translate(0, 0.3, 0), '--paper', spots[0], 0, 0.2, 0.6);
      put(new THREE.BoxGeometry(1.7, 0.2, 0.62).translate(0, 0.1, 0), '--blue', spots[0], 0, 0.2, 0.6, 0);
      put(new THREE.BoxGeometry(0.6, 0.4, 0.4).translate(0.2, 0.72, 0), '--cream', spots[0], 0, 0.2, 0.6);
      var ink = new THREE.MeshBasicMaterial({ color: col('--k-text'), side: THREE.BackSide });
      world.add(new THREE.Mesh(new THREE.IcosahedronGeometry(R, 5), toon('--green-light')));
      world.add(new THREE.Mesh(new THREE.IcosahedronGeometry(R * 1.022, 5), ink));
      Object.keys(bins).forEach(function (name) { world.add(new THREE.Mesh(merge(bins[name]), toon(name))); });
      world.add(new THREE.Mesh(merge(outline), ink));
      world.quaternion.setFromUnitVectors(spots[0], new THREE.Vector3(0, 0.28, 1).normalize());
      return { root: world, idle: 0.16 };
    }
  });
  var mount = g.mount;
  g.mount = function (el, ctx) {
    var box = el.querySelector('.g-obj'), stop = mount(el, ctx);
    if (box && !ctx.still) { box.setAttribute('data-k-in', 'pending'); box.setAttribute('data-k-motion', '');
      var seen = new MutationObserver(function () { if (el.querySelector('.g-obj__stage[data-k-ready]')) { seen.disconnect(); requestAnimationFrame(function () { box.setAttribute('data-k-in', 'done'); }); } });
      seen.observe(el, { attributes: true, subtree: true, attributeFilter: ['data-k-ready'] }); }
    return stop;
  };
  Kobo.templates.register({ skill: 'tiny-planet-toy', family: 'objet', slot: 'hero', render: g.render, mount: g.mount });
})();
