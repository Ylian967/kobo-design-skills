/*
 * kobo-studio — moteur des gabarits de signature.
 * Un gabarit remplit un emplacement d'une structure (voir ../README.md) sans toucher à la structure.
 * Script classique (fonctionne en file://). Dépend de ../structures/page.js (Kobo.slots).
 *
 * Déclarer un gabarit (fait par chaque fichier <famille>/<skill>.js, ou par <famille>.js pour un habillage tout en CSS) :
 *   Kobo.templates.register({
 *     skill: 'lore-frame-editorial', family: 'cadre', slot: 'frame',
 *     render: function (parts, el, rang, ctx) { return nœud | HTML | null; },   // contenu de l'emplacement
 *     mount:  function (el, ctx) { …; return function () { nettoyage }; }       // facultatif : mouvement, écouteurs
 *   });
 *   ctx = { intensity: 'full' | 'reduced', still: true si aucun mouvement ne doit jouer, color(nom) → [r, v, b] }
 *
 * Appliquer : Kobo.templates.apply() lit sur <html> data-k-skill, data-k-intensity et data-k-templates.
 *   - intensité « off » ou data-k-templates="neutral" : les emplacements rendent leur contenu neutre ;
 *   - « reduced » ou prefers-reduced-motion : mêmes formes, ctx.still = true (état final, aucun mouvement) ;
 *   - « full » : le gabarit complet.
 * Pendant qu'un gabarit est posé, <html> porte data-k-gabarits="<familles>" : la feuille de la famille s'y accroche
 * pour ce qui dépasse l'emplacement (marges de page sous un cadre, par exemple).
 *
 * Image absente : une <img> qui ne charge pas reçoit data-k-broken ; elle est masquée, le fond et le texte du gabarit restent.
 * Photos : celles d'un emplacement rempli sont demandées et décodées un écran avant d'arriver à l'écran (préchargement).
 *
 * Boucle d'animation : une seule pour toute la page. Kobo.loop.add(el, fn) appelle fn(temps, écart) à chaque image,
 * seulement si el est à l'écran et l'onglet visible ; rend une fonction pour se retirer.
 */
(function () {
  'use strict';
  var Kobo = (window.Kobo = window.Kobo || {});
  var root = document.documentElement;

  /* ---------- Boucle unique ---------- */
  var jobs = [], running = 0, last = 0;
  var seen = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { jobs.forEach(function (j) { if (j.el === e.target) j.visible = e.isIntersecting; }); });
    wake();
  }) : null;
  function frame(now) {
    running = 0;
    var dt = Math.min(64, now - (last || now)); last = now;
    var active = false;
    jobs.forEach(function (j) { if (j.visible) { active = true; j.fn(now, dt); } });
    if (active && !document.hidden) running = requestAnimationFrame(frame); else last = 0;   // rien à l'écran : la boucle s'arrête
  }
  function wake() { if (!running && !document.hidden && jobs.some(function (j) { return j.visible; })) running = requestAnimationFrame(frame); }
  document.addEventListener('visibilitychange', wake);
  Kobo.loop = {
    add: function (el, fn) {
      var job = { el: el, fn: fn, visible: !seen };
      jobs.push(job); if (seen) seen.observe(el); wake();
      return function () { jobs = jobs.filter(function (j) { return j !== job; }); if (seen) seen.unobserve(el); };
    },
    count: function () { return jobs.length; }
  };

  /* ---------- Couleur d'un rôle, lue une fois (pour canvas et WebGL) ---------- */
  var probe = null;
  function color(name) {
    if (!probe) { probe = document.createElement('span'); probe.hidden = true; document.body.appendChild(probe); }
    probe.style.color = ''; probe.style.color = 'var(' + name + ')';
    var m = getComputedStyle(probe).color.match(/[\d.]+/g) || [0, 0, 0];
    if (/^color\(/.test(getComputedStyle(probe).color)) return [m[0] * 255, m[1] * 255, m[2] * 255];
    return [+m[0], +m[1], +m[2]];
  }

  /* ---------- Préchargement : les photos d'un emplacement sont demandées et décodées un écran avant leur arrivée ---------- */
  var ahead = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      ahead.unobserve(e.target);
      e.target.querySelectorAll('img').forEach(function (img) {
        img.loading = 'eager';
        if (img.decode) img.decode().catch(function () { /* image absente : le texte alternatif reste */ });
      });
    });
  }, { rootMargin: '100% 0px 100% 0px' }) : null;

  /* ---------- Registre ---------- */
  var defs = [], mounted = [], reduce = window.matchMedia ? matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  function clear() {
    mounted.forEach(function (m) { if (m.cleanup) m.cleanup(); });
    mounted = [];
    if (Kobo.slots) Kobo.slots.list().forEach(function (s) { if (s.filled) Kobo.slots.reset(s.name); });
    root.removeAttribute('data-k-gabarits');
  }
  function apply() {
    clear();
    var skill = root.dataset.kSkill, intensity = root.dataset.kIntensity || 'full';
    if (!skill || !Kobo.slots || intensity === 'off' || root.dataset.kTemplates === 'neutral') return [];
    var ctx = { intensity: intensity, still: intensity !== 'full' || reduce.matches, color: color };
    var families = [];
    defs.filter(function (d) { return d.skill === skill; }).forEach(function (d) {
      var hit = false;
      Kobo.slots.fill(d.slot, function (parts, el, i) {
        if (d.when && !d.when(el, parts)) return null;
        var out = d.render ? d.render(parts, el, i, ctx) : null;
        if (out !== null && out !== undefined) hit = true;
        return out;
      });
      if (!hit) return;
      families.push(d.family);
      document.querySelectorAll('[data-k-slot="' + d.slot + '"][data-k-filled]').forEach(function (el) {
        el.setAttribute('data-k-gabarit', d.family);
        if (ahead) ahead.observe(el);
        // Image absente (hors ligne, adresse morte) : pas d'icône cassée ; le fond du gabarit et le texte restent
        el.querySelectorAll('img').forEach(function (img) {
          var broken = function () { img.setAttribute('data-k-broken', ''); };
          if (img.complete && img.naturalWidth === 0 && img.currentSrc) broken(); else img.addEventListener('error', broken, { once: true });
        });
        var cleanup = d.mount ? d.mount(el, ctx) : null;
        mounted.push({ cleanup: function () { el.removeAttribute('data-k-gabarit'); if (cleanup) cleanup(); } });
      });
    });
    if (families.length) root.setAttribute('data-k-gabarits', families.filter(function (f, i, a) { return a.indexOf(f) === i; }).join(' '));
    document.dispatchEvent(new CustomEvent('k-templates-change', { detail: { families: families } }));
    return families;
  }
  if (reduce.addEventListener) reduce.addEventListener('change', apply);

  Kobo.templates = {
    register: function (def) { defs.push(def); },
    apply: apply, clear: clear, color: color,
    list: function () { return defs.map(function (d) { return d.skill + ' · ' + d.family + ' → ' + d.slot; }); }
  };
})();
