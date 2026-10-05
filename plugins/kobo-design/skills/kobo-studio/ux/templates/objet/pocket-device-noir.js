/*
 * kobo-studio — objet 3D, habillage pocket-device-noir : l'appareil de la démo du skill, porté tel quel.
 * Sources (lecture seule) : pocket-device-noir/examples/demo.html (makeDevice : boîtier haut aux arêtes arrondies, écran, molette,
 * deux touches, grille, bouton rouge ; drawLcd : l'écran redessiné toutes les 110 ms ; grilleTexture ; pose « hero » ; trois lumières).
 * Écarts : la boîte arrondie est écrite ici (la démo la prend dans les modules complémentaires de three.js, qui demandent une
 * table d'import) ; les deux lumières teintées de la démo sont blanches (aucun rôle ne porte ces teintes) ; l'appareil ne suit pas le pointeur, on le tourne en le tirant ou avec les boutons.
 * Il ne remplit pas d'emplacement lui-même : le héros photo du skill l'accueille (hero-photo/pocket-device-noir.js).
 */
(function () {
  'use strict';
  var F = Kobo.templates.families;
  F.objet.models['pocket-device-noir'] = {
    label: 'L’appareil : boîtier noir, petit écran, molette ronde et bouton rouge',
    lib: 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js',
    build: function (THREE, api) {
      var col = api.color, css = api.css, font = getComputedStyle(api.stage).getPropertyValue('--k-font-mono') || 'monospace';
      // Boîte arrondie : une boîte découpée, dont chaque sommet est ramené sur un coin de rayon r (même calcul que three.js)
      var rounded = function (w, h, d, seg, r) {
        var n = seg * 2 + 1, geo = new THREE.BoxGeometry(1, 1, 1, n, n, n), pos = geo.attributes.position, nor = geo.attributes.normal;
        var box = new THREE.Vector3(w, h, d).divideScalar(2).subScalar(r), half = 0.5 / n, p = new THREE.Vector3(), v = new THREE.Vector3();
        for (var i = 0; i < pos.count; i++) {
          p.fromBufferAttribute(pos, i); v.copy(p);
          v.x -= Math.sign(v.x) * half; v.y -= Math.sign(v.y) * half; v.z -= Math.sign(v.z) * half; v.normalize();
          pos.setXYZ(i, box.x * Math.sign(p.x) + v.x * r, box.y * Math.sign(p.y) + v.y * r, box.z * Math.sign(p.z) + v.z * r);
          nor.setXYZ(i, v.x, v.y, v.z);
        }
        return geo;
      };
      // L'écran : heure, nom, état, réseau, batterie, barres de voix (décor : l'objet est décrit par son nom accessible)
      var lcd = document.createElement('canvas'); lcd.width = 512; lcd.height = 256;
      var lx = lcd.getContext('2d'), lcdTex = new THREE.CanvasTexture(lcd), phase = 0; lcdTex.colorSpace = THREE.SRGBColorSpace;
      var drawLcd = function () {
        var ink = css('--k-sig-lcd'), i, h;
        lx.fillStyle = css('--k-sig-screen'); lx.fillRect(0, 0, 512, 256);
        lx.fillStyle = ink; lx.font = '400 84px ' + font; lx.textBaseline = 'top';
        lx.fillText(new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' }).format(new Date()), 40, 34);
        lx.font = '400 26px ' + font; lx.fillText('ORA', 42, 146); lx.fillText('À L’ÉCOUTE…', 42, 182);
        for (i = 0; i < 4; i++) lx.fillRect(330 + i * 12, 70 - i * 6, 6, 8 + i * 6);
        lx.strokeStyle = ink; lx.lineWidth = 3; lx.strokeRect(400, 48, 46, 26); lx.fillRect(406, 54, 26, 14);
        for (i = 0; i < 16; i++) { h = 8 + Math.abs(Math.sin(i * 0.9 + phase) * Math.cos(i * 0.31 + phase * 0.6)) * 70; lx.fillRect(300 + i * 11, 176 - h / 2, 5, h); }
        lcdTex.needsUpdate = true;
      };
      var grilleTexture = function () {
        var c = document.createElement('canvas'); c.width = 256; c.height = 96; var x = c.getContext('2d');
        x.fillStyle = css('--k-sig-device'); x.fillRect(0, 0, 256, 96); x.fillStyle = css('--k-bg');
        for (var r = 0; r < 4; r++) for (var k = 0; k < 11; k++) { x.beginPath(); x.arc(18 + k * 22, 14 + r * 22, 6, 0, 7); x.fill(); }
        var t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
      };
      var g = new THREE.Group(), W = 2, H = 3.6, D = 0.44, Fz = D / 2;
      var phong = function (color, specular, shininess) { return new THREE.MeshPhongMaterial({ color: col(color), specular: specular ? col(specular) : undefined, shininess: shininess }); };
      var add = function (geo, mat, x, y, z) { var m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); g.add(m); return m; };
      add(rounded(W, H, D, 6, 0.2), phong('--k-sig-device', '--k-sig-device-edge', 22), 0, 0, 0);
      add(rounded(1.66, 0.92, 0.05, 4, 0.12), phong('--k-sig-screen', '--k-sig-dial-ring', 90), 0, 1.12, Fz);
      add(new THREE.PlaneGeometry(1.5, 0.75), new THREE.MeshBasicMaterial({ map: lcdTex }), 0, 1.12, Fz + 0.03);
      add(new THREE.CylinderGeometry(0.66, 0.66, 0.1, 72), phong('--k-sig-dial-ring', '--k-sig-lcd', 120), 0, -0.08, Fz + 0.02).rotation.x = Math.PI / 2;
      add(new THREE.CylinderGeometry(0.6, 0.6, 0.14, 72), phong('--k-sig-dial', '--k-sig-device-edge', 60), 0, -0.08, Fz + 0.03).rotation.x = Math.PI / 2;
      add(new THREE.CircleGeometry(0.035, 20), new THREE.MeshBasicMaterial({ color: col('--k-sig-lcd') }), 0, -0.08, Fz + 0.105);
      var key = phong('--k-sig-device', '--k-sig-device-edge', 40);
      [-0.4, 0.4].forEach(function (x) { add(rounded(0.74, 0.36, 0.08, 3, 0.07), key, x, -1.04, Fz); });
      add(new THREE.PlaneGeometry(1.36, 0.5), new THREE.MeshBasicMaterial({ map: grilleTexture() }), 0, -1.5, Fz + 0.004);
      add(rounded(0.4, 0.2, 0.24, 3, 0.05), phong('--k-accent-2', null, 50), 0.5, H / 2 + 0.07, 0);
      g.rotation.set(-0.42, 0.3, 0.12);                               // pose « hero » de la démo
      api.scene.add(g); api.camera.position.set(0, 0, 7.4);
      api.scene.add(new THREE.AmbientLight(0xffffff, 0.9));
      var sun = new THREE.DirectionalLight(0xffffff, 2.4); sun.position.set(-3, 4, 5); api.scene.add(sun);
      var rim = new THREE.DirectionalLight(0xffffff, 1.1); rim.position.set(4, -1, -3); api.scene.add(rim);
      drawLcd();
      if (document.fonts) document.fonts.ready.then(function () { drawLcd(); fresh = true; });
      var lastLcd = 0, fresh = true;
      return { root: g, idle: 0, tick: function (t) {
        var changed = fresh; fresh = false;
        if (!api.still && t - lastLcd > 0.11) { lastLcd = t; phase += 0.35; drawLcd(); changed = true; }   // l'écran vit : barres de voix
        return changed;
      } };
    }
  };
})();
