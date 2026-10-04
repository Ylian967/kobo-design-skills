/*
 * kobo-studio — scène plein écran, habillage glacial-mono-3d : la scène de glace, reprise de la démo du skill.
 * Formes procédurales (aucun modèle à télécharger) : éclats de glace, sol, fragments, socle, sculpture de particules.
 * Les couleurs viennent de la fiche du skill. Tout est créé une fois ; à chaque image on ne fait que déplacer.
 */
(function () {
  'use strict';
  var g = Kobo.templates.families.scene({
    lib: 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js',
    fallback: { src: 'https://images.unsplash.com/photo-1543470373-e055b73a8f29?auto=format&fit=crop&w=2000&q=80' },
    born: 2800,
    build: function (THREE, api) {
      var scene = api.scene, camera = api.camera, rnd = api.random;
      var C = { fog: api.color('--k-bg'), frost: api.color('--k-on-accent'), steel: api.color('--k-text-2'), text: api.color('--k-text-inverse') };
      scene.background = C.fog.clone(); scene.fog = new THREE.Fog(C.fog.clone(), 6, 22);
      scene.add(new THREE.HemisphereLight(C.frost, C.steel, 1.2));
      var sun = new THREE.DirectionalLight(C.text, 2.5); sun.position.set(-5, 6, 3); scene.add(sun);
      var ice = new THREE.MeshPhongMaterial({ color: C.frost, specular: C.text, shininess: 70, transparent: true, opacity: 0.86, flatShading: true });
      var metal = new THREE.MeshPhongMaterial({ color: C.frost, specular: C.text, shininess: 90 });
      var ground = new THREE.Mesh(new THREE.CircleGeometry(40, 64), new THREE.MeshLambertMaterial({ color: C.frost }));
      ground.rotation.x = -Math.PI / 2; ground.position.set(0, -1, -12); scene.add(ground);
      var crystal = function (h, r) { var geo = new THREE.OctahedronGeometry(1, 0); geo.scale(r, h, r); return geo; };
      // Amas d'éclats de glace
      var cluster = new THREE.Group(); scene.add(cluster);
      var core = new THREE.Mesh(crystal(1.9, 0.55), ice); core.position.set(0, 0.85, 0); core.rotation.set(0.05, 0.4, -0.08); cluster.add(core);
      for (var i = 0; i < 12; i++) {
        var a = (i / 12) * Math.PI * 2 + rnd() * 0.4, d = 0.7 + rnd() * 1.5, h = 0.5 + rnd() * 1.1, r = 0.16 + rnd() * 0.22;
        var m = new THREE.Mesh(i % 4 === 3 ? new THREE.IcosahedronGeometry(r * 1.6, 0) : crystal(h, r), ice);
        m.position.set(Math.cos(a) * d, -1 + h * 0.55, Math.sin(a) * d * 0.7); m.rotation.set(Math.sin(a) * 0.45, rnd() * Math.PI, -Math.cos(a) * 0.45);
        cluster.add(m);
      }
      // Assemblage : arêtes en fil de fer et réseau de traits, avant la matière
      var wireMat = new THREE.LineBasicMaterial({ color: C.steel, transparent: true, opacity: 0 }), wires = new THREE.Group();
      cluster.children.forEach(function (mesh) { var l = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry), wireMat); l.position.copy(mesh.position); l.rotation.copy(mesh.rotation); wires.add(l); });
      scene.add(wires);
      var NET = 90, netPos = new Float32Array(NET * 6);
      for (var n = 0; n < NET; n++) { var an = rnd() * 6.28, dn = 1.5 + rnd() * 6, x = Math.cos(an) * dn, z = Math.sin(an) * dn * 0.7, y = -0.9 + rnd() * 3; netPos.set([x, y, z, x + (rnd() - 0.5) * 2.2, y + (rnd() - 0.5) * 1.4, z + (rnd() - 0.5) * 2.2], n * 6); }
      var netGeo = new THREE.BufferGeometry(); netGeo.setAttribute('position', new THREE.BufferAttribute(netPos, 3)); netGeo.setDrawRange(0, 0);
      scene.add(new THREE.LineSegments(netGeo, wireMat));
      // Fragments en suspension le long du parcours
      var shards = [];
      for (var s = 0; s < 22; s++) {
        var sh = new THREE.Mesh(new THREE.IcosahedronGeometry(0.06 + rnd() * 0.14, 0), ice);
        sh.position.set((rnd() - 0.5) * 12, 0.2 + rnd() * 3.5, 4 - rnd() * 32); sh.userData = { y: sh.position.y, ph: rnd() * 6.28, sp: 0.3 + rnd() * 0.5 };
        shards.push(sh); scene.add(sh);
      }
      // Socle à anneaux et sculpture de particules
      var pedestal = new THREE.Group(); pedestal.position.set(0, -1, -24); scene.add(pedestal);
      for (var k = 0; k < 4; k++) { var rr = 3.1 - k * 0.6, ring = new THREE.Mesh(new THREE.CylinderGeometry(rr, rr, 0.14, 96), metal); ring.position.y = 0.07 + k * 0.09; pedestal.add(ring); }
      var N = 1800, target = new Float32Array(N * 3), scatter = new Float32Array(N * 3);
      for (var p = 0; p < N; p++) {
        var tx = rnd() * 2 - 1, ty = rnd() * 2 - 1, tz = rnd() * 2 - 1, len = Math.abs(tx) + Math.abs(ty) + Math.abs(tz) || 1;
        target.set([tx / len, (ty / len) * 1.6, tz / len], p * 3); scatter.set([(rnd() - 0.5) * 9, (rnd() - 0.2) * 6, (rnd() - 0.5) * 9], p * 3);
      }
      var pGeo = new THREE.BufferGeometry(); pGeo.setAttribute('position', new THREE.BufferAttribute(scatter.slice(), 3));
      var points = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: C.steel, size: 0.03, sizeAttenuation: true })); points.position.set(0, 1.9, -24); scene.add(points);
      var assemble = 0, shownAssemble = -1;
      function particles(v) {
        if (Math.abs(v - shownAssemble) < 0.002) return;                          // la sculpture n'est recalculée que si elle change
        shownAssemble = v; var arr = pGeo.attributes.position.array;
        for (var q = 0; q < arr.length; q++) arr[q] = scatter[q] + (target[q] - scatter[q]) * v;
        pGeo.attributes.position.needsUpdate = true;
      }
      // Caméra : de l'amas au socle, selon l'avancée dans la page
      var A = { cam: new THREE.Vector3(0, 1.3, 7.5), look: new THREE.Vector3(0, 0.6, 0) }, B = { cam: new THREE.Vector3(0, 2.6, -16.8), look: new THREE.Vector3(0, 1.2, -24) };
      var camPos = new THREE.Vector3(), lookAt = new THREE.Vector3(), lookNow = A.look.clone();
      var smooth = function (v) { return v * v * (3 - 2 * v); };
      function place(state) { var f = smooth(Math.min(1, Math.max(0, (state.scroll - 0.08) / 0.84))); camPos.lerpVectors(A.cam, B.cam, f); lookAt.lerpVectors(A.look, B.look, f); return f; }
      function born(b) {
        wireMat.opacity = b < 0.5 ? b * 1.6 : (1 - b) * 1.6; netGeo.setDrawRange(0, Math.floor(Math.min(1, b * 1.8) * NET) * 2);
        var solid = smooth(Math.max(0, (b - 0.35) / 0.65)); ice.opacity = 0.86 * solid; cluster.scale.setScalar(0.9 + 0.1 * solid); ground.scale.setScalar(0.05 + 0.95 * solid);
      }
      camera.position.copy(A.cam);
      return {
        frame: function (t, dt, state) {
          var f = place(state);
          if (state.born < 1 || wireMat.opacity > 0) born(state.born);
          camPos.x += -state.px * 0.6; camPos.y += state.py * 0.3;
          camera.position.lerp(camPos, 0.06); lookNow.lerp(lookAt, 0.06); camera.lookAt(lookNow);
          cluster.rotation.y = t * 0.05; wires.rotation.y = cluster.rotation.y;
          shards.forEach(function (m2) { m2.position.y = m2.userData.y + Math.sin(t * m2.userData.sp + m2.userData.ph) * 0.18; m2.rotation.x += dt * 0.2; m2.rotation.y += dt * 0.13; });
          assemble += ((f > 0.75 ? 1 : 0) - assemble) * 0.04; particles(assemble); points.rotation.y = t * 0.08;
        },
        still: function (state) { var f = place(state); born(1); camera.position.copy(camPos); camera.lookAt(lookAt); particles(f > 0.75 ? 1 : 0); }
      };
    }
  });
  Kobo.templates.register({ skill: 'glacial-mono-3d', family: 'scene', slot: 'backdrop', render: g.render, mount: g.mount });
})();
