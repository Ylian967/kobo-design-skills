/*
 * kobo-studio — couche mouvement : le moteur commun. Chaque skill y inscrit ses mouvements signature (motion/<skill>.js).
 *
 * Règles tenues ici, pour tous les skills :
 *  - une seule boucle requestAnimationFrame pour toute la page ; elle s'arrête quand rien de visible ne bouge ;
 *  - un mouvement lié à un élément est en pause tant que cet élément est hors écran, et quand l'onglet est caché ;
 *  - intensité : « full » joue tout ; « reduced », « off » et prefers-reduced-motion donnent l'état final, sans mouvement
 *    (html[data-k-motion="still"]) ; les feuilles des skills ne s'appliquent que sous html[data-k-motion="on"] ;
 *  - sans ce script, ou s'il échoue, la page est dans son état final : rien n'est masqué par défaut ;
 *  - un élément qui reçoit le focus clavier est révélé aussitôt ; aucun focus n'attend une image d'animation.
 *
 * Kobo.motion.register(skill, fn) : fn(m) est appelée quand la page porte data-k-skill="skill" et que le mouvement est permis.
 * Ce que reçoit fn :
 *   m.reveal(sel, nom, { seen, hero, group })  pose data-k-reveal="nom" ; à l'entrée à l'écran, data-k-seen (une fois) puis seen(el).
 *                                              --_i = rang de l'élément parmi ses voisins révélés (cascade). Hors du héros,
 *                                              sauf hero: true : le héros a l'entrée de son gabarit.
 *   m.inview(sel)                              pose et retire data-k-inview selon la présence à l'écran (pause des animations CSS)
 *   m.tick(el, fn, { always })                 fn(now, m) à chaque image tant que el est à l'écran ; sans « always », seulement
 *                                              pendant le défilement et 400 ms après
 *   m.run(el, durée, pas, fin)                 pas(p de 0 à 1) pendant « durée » ms, dans la même boucle ; fin() à la fin ou à l'arrêt
 *   m.words(el), m.restore(el)                 découpe un texte en mots (le texte entier reste lu), et le remet
 *   m.wordsOr(sel, repli), m.each(sel, fn)     découpe les titres révélés ; un titre qui a des enfants prend le mouvement « repli »
 *   m.scramble(el, signes, { tirages })        décodage : signes aléatoires qui se fixent de gauche à droite
 *   m.type(el)                                 texte tapé, à hauteur réservée
 *   m.count(el)                                un nombre seul monte de 0 à sa valeur ; jamais dans [data-k-still], [aria-live], [role=status], <output>
 *   m.progress(el), m.velocity, m.ms(rôle)     progression de el dans l'écran (0 à 1), vitesse lissée du défilement, durée d'un rôle
 */
(function () {
  'use strict';
  var Kobo = (window.Kobo = window.Kobo || {});
  var root = document.documentElement, layers = {}, tickers = [], undo = [], waiting = [], frame = 0, lastY = 0, lastMove = 0, built = '';
  var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  var allowed = function () { return (root.dataset.kIntensity || 'full') === 'full' && !mq.matches; };
  var clamp = function (v) { return Math.min(1, Math.max(0, v)); };

  /* ---------- La boucle unique ---------- */
  function loop() {
    var now = performance.now();                          // la même horloge que wake() et les effets
    frame = 0;
    if (!allowed() || document.hidden) return;
    var y = window.scrollY, alive = false;
    m.velocity += ((y - lastY) - m.velocity) * 0.12; lastY = y;
    if (Math.abs(m.velocity) > 0.05) lastMove = now;
    sweep();
    for (var i = tickers.length - 1; i >= 0; i--) {
      var t = tickers[i];
      if (t.dead) { tickers.splice(i, 1); continue; }
      if (!(t.visible || t.keep) || !(t.always || now - lastMove < 400)) continue;
      t.fn(now, m); alive = true;
    }
    if (alive || now - lastMove < 400) frame = requestAnimationFrame(loop);
  }
  // Un bloc dépassé d'un coup (défilement rapide, ancre, touche Fin) n'a jamais croisé l'écran : l'observateur ne le voit pas.
  // À chaque image de défilement, tout bloc en attente arrivé à l'écran ou déjà au-dessus est révélé. Rien ne reste masqué derrière soi.
  function sweep() {
    if (!waiting.length) return;
    var limit = window.innerHeight * 0.92;
    for (var i = waiting.length - 1; i >= 0; i--) {
      var el = waiting[i];
      if (el.hasAttribute('data-k-seen') || !el.isConnected) { waiting.splice(i, 1); continue; }
      if (el.getBoundingClientRect().top < limit) { mark(el); waiting.splice(i, 1); }
    }
  }
  function wake() { lastMove = performance.now(); if (!frame && allowed() && !document.hidden) frame = requestAnimationFrame(loop); }

  var watcher = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var el = e.target;
      if (el._kTick) el._kTick.forEach(function (t) { t.visible = e.isIntersecting; });
      if (el._kInview) el.toggleAttribute('data-k-inview', e.isIntersecting);
      if (e.isIntersecting && el.hasAttribute('data-k-reveal')) mark(el);
    });
    wake();
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 }) : null;

  function mark(el) {
    if (el.hasAttribute('data-k-seen')) return;
    el.setAttribute('data-k-seen', '');
    if (el._kSeen && allowed()) el._kSeen(el, m);
  }

  var m = {
    velocity: 0,
    ms: function (role, fallback) {
      var v = getComputedStyle(root).getPropertyValue(role).trim(), n = parseFloat(v);
      return isNaN(n) ? (fallback || 0) : (/ms$/.test(v) ? n : n * 1000);
    },
    progress: function (el) { var r = el.getBoundingClientRect(); return clamp((window.innerHeight - r.top) / (window.innerHeight + r.height)); },
    reveal: function (sel, name, opts) {
      opts = opts || {};
      document.querySelectorAll(sel).forEach(function (el) {
        if (el.hasAttribute('data-k-reveal') || (!opts.hero && el.closest('[data-k-slot="hero"]'))) return;
        if (el.parentElement && el.parentElement.closest('[data-k-reveal]')) return;   // déjà porté par un bloc révélé : pas de double mouvement
        var i = 0, prev = el.previousElementSibling;
        while (prev) { if (prev.getAttribute('data-k-reveal') === name) i++; prev = prev.previousElementSibling; }
        el.setAttribute('data-k-reveal', name); el.style.setProperty('--_i', i);
        el._kSeen = opts.seen || null;
        waiting.push(el);
        if (watcher) watcher.observe(el); else mark(el);
      });
    },
    each: function (sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); },
    /* Titre découpé en mots s'il n'a pas d'enfant ; sinon il prend le mouvement de repli. */
    wordsOr: function (sel, fallback) {
      m.each(sel, function (el) { if (el.hasAttribute('data-k-reveal') && !m.words(el).length) el.setAttribute('data-k-reveal', fallback); });
    },
    inview: function (sel) { document.querySelectorAll(sel).forEach(function (el) { el._kInview = true; if (watcher) watcher.observe(el); }); },
    tick: function (el, fn, opts) {
      var t = { fn: fn, always: !!(opts && opts.always), visible: !watcher, dead: false };
      (el._kTick = el._kTick || []).push(t); tickers.push(t);
      if (watcher) watcher.observe(el);
      wake();
      return t;
    },
    run: function (el, duration, step, done) {
      var t0 = 0, t = m.tick(el, function (now) {
        t0 = t0 || now;
        var p = duration > 0 ? clamp((now - t0) / duration) : 1;
        step(p);
        if (p >= 1) finish();
      }, { always: true });
      function finish() { if (t.dead) return; t.dead = true; if (done) done(); }
      t.keep = true;                                      // un effet court va au bout même si l'élément sort de l'écran : jamais de texte à moitié écrit
      undo.push(function () { step(1); finish(); });      // arrêt du mouvement : état final
      return t;
    },
    /* Découpe en mots : le texte entier reste dans la page pour les lecteurs d'écran, les mots affichés sont décoratifs. */
    words: function (el) {
      if (el._kText !== undefined) return el.querySelectorAll('.k-m-word > span');
      if (el.childElementCount) return [];
      var text = el.textContent.replace(/\s+/g, ' ').trim();
      el._kText = el.textContent; el.textContent = '';
      var full = document.createElement('span'); full.className = 'k-sr-only'; full.textContent = text; el.appendChild(full);
      text.split(' ').forEach(function (w, i) {
        var box = document.createElement('span'), inner = document.createElement('span');
        box.className = 'k-m-word'; box.setAttribute('aria-hidden', 'true'); box.style.setProperty('--_i', i);
        inner.textContent = w; box.appendChild(inner); el.appendChild(box); el.appendChild(document.createTextNode(' '));
      });
      undo.push(function () { m.restore(el); });
      return el.querySelectorAll('.k-m-word > span');
    },
    restore: function (el) { if (el._kText !== undefined) { el.textContent = el._kText; delete el._kText; } },
    /* Les effets de texte ne s'appliquent qu'à un élément sans enfant : un lien dans un titre n'est jamais détruit. */
    scramble: function (el, glyphs, opts) {
      if (el.childElementCount || el._kBusy) return;
      var text = el.textContent, chars = Array.from(text), rounds = (opts && opts.rounds) || 3;
      var step = (opts && opts.tick) || 40, total = chars.length * rounds * step, had = el.hasAttribute('aria-label');
      el._kBusy = true; if (!had) el.setAttribute('aria-label', text.trim());
      el.style.minBlockSize = el.offsetHeight + 'px';
      var last = -1;
      m.run(el, total, function (p) {
        var fixed = Math.floor(p * chars.length), slot = Math.floor(p * total / step);
        if (slot === last && p < 1) return;
        last = slot;
        el.textContent = p >= 1 ? text : chars.map(function (c, i) { return i < fixed || /\s/.test(c) ? c : glyphs[(Math.random() * glyphs.length) | 0]; }).join('');
      }, function () { el.textContent = text; el.style.minBlockSize = ''; if (!had) el.removeAttribute('aria-label'); el._kBusy = false; });
    },
    type: function (el, speed) {
      if (el.childElementCount || el._kBusy) return;
      var text = el.textContent, chars = Array.from(text), last = -1;
      el._kBusy = true; el.setAttribute('aria-label', text.trim()); el.style.minBlockSize = el.offsetHeight + 'px';
      m.run(el, chars.length * (speed || 18), function (p) {
        var n = Math.floor(p * chars.length);
        if (n === last) return;
        last = n; el.textContent = p >= 1 ? text : chars.slice(0, n).join('');
      }, function () { el.textContent = text; el.style.minBlockSize = ''; el.removeAttribute('aria-label'); el._kBusy = false; });
    },
    count: function (el, duration) {
      var text = el.textContent, hit = /^(\D{0,3}?)(\d{1,6})(\D{0,4})$/.exec(text.trim());
      if (el.childElementCount || !hit || el._kBusy) return;
      // Jamais sur une valeur vivante (total, compteur) : elle appartient au script de la page.
      if (el.closest('[data-k-still], [aria-live], [role="status"], output')) return;
      var end = Number(hit[2]), last = -1, written = null, taken = false;
      el._kBusy = true; el.setAttribute('aria-label', text.trim());
      m.run(el, duration || 1200, function (p) {
        if (taken) return;
        if (written !== null && el.textContent !== written) { taken = true; return; }   // un script a changé la valeur pendant le comptage : on la lui laisse
        var v = Math.round(end * (1 - Math.pow(1 - p, 3)));
        if (v === last) return;
        last = v; written = p >= 1 ? text : hit[1] + v + hit[3]; el.textContent = written;
      }, function () { if (!taken) el.textContent = text; el.removeAttribute('aria-label'); el._kBusy = false; });
    }
  };

  /* ---------- Marche, arrêt ---------- */
  function build() {
    var skill = root.dataset.kSkill || '';
    if (!allowed()) { stop(); return; }
    root.setAttribute('data-k-motion', 'on');
    if (!layers[skill]) return;
    if (built !== skill) {                                // premier passage : la page vient de s'ouvrir, l'entrée peut jouer
      built = skill;
      root.setAttribute('data-k-enter', 'pending');
      var enter = function () { if (root.getAttribute('data-k-enter') === 'pending') root.setAttribute('data-k-enter', 'done'); };
      requestAnimationFrame(function () { requestAnimationFrame(enter); });
      setTimeout(enter, 600);                             // fenêtre sans image (masquée) : l'entrée ne reste jamais en attente
    }
    layers[skill](m);                                     // peut être rappelé (contenu ajouté) : un élément déjà pris est ignoré
    wake();
  }
  function stop() {
    root.setAttribute('data-k-motion', 'still');
    root.removeAttribute('data-k-enter');
    undo.splice(0).forEach(function (f) { f(); });
    tickers.forEach(function (t) { t.dead = true; });
    waiting.length = 0;
    document.querySelectorAll('[data-k-reveal]').forEach(function (el) { el.setAttribute('data-k-seen', ''); });
  }

  // Un élément qui reçoit le focus est révélé tout de suite, avec ce qui le contient
  document.addEventListener('focusin', function (e) {
    for (var el = e.target; el && el.nodeType === 1; el = el.parentElement) if (el.hasAttribute('data-k-reveal')) mark(el);
  });
  document.addEventListener('visibilitychange', wake);
  window.addEventListener('scroll', wake, { passive: true });
  if (mq.addEventListener) mq.addEventListener('change', build);
  new MutationObserver(build).observe(root, { attributes: true, attributeFilter: ['data-k-intensity', 'data-k-skill'] });

  Kobo.motion = {
    register: function (skill, fn) { layers[skill] = fn; if (document.readyState !== 'loading') build(); },
    start: build,                                         // à rappeler après un rendu (React) ou un contenu ajouté
    stop: stop, api: m
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
