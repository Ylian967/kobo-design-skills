/*
 * kobo-studio — table des gabarits : quelles familles habillent quel skill, et chargement à la demande.
 * Une page livrée charge en dur les fichiers de son skill (voir README.md) et n'a pas besoin de ce fichier.
 * La démonstration s'en sert pour changer de skill sans recharger : Kobo.templates.use(skill, base).
 *   base : chemin vers ux/templates/ depuis la page.
 * Chaque entrée : famille → fichiers de l'habillage du skill ('css', 'js' ou les deux). Les fichiers de la famille
 * (<famille>.css, <famille>.js) sont toujours chargés avant.
 */
(function () {
  'use strict';
  var Kobo = (window.Kobo = window.Kobo || {});
  var MANIFEST = {
    'lore-frame-editorial':  { cadre: ['css', 'js'], image: ['css', 'js'], 'hero-photo': ['css', 'js'] },
    'acid-scan-security':    { 'hero-photo': ['css', 'js'] },
    'glacial-mono-3d':       { scene: ['css', 'js'] },
    'noir-inferno-chapters': { 'chapitre-ecran': ['css', 'js'] },
    'hyper-lime-street':     { 'hero-photo': ['css', 'js'], 'formes-inclinees': ['css', 'js'] },
    'nocturne-architecture': { 'titre-geant': ['css', 'js'], 'hero-photo': ['css', 'js'] },
    'alpine-glass-expedition': { 'hero-photo': ['css', 'js'] },
    'pocket-device-noir':    { objet: ['css', 'js'], 'hero-photo': ['css', 'js'] },
    'glass-frame-estate':    { 'hero-photo': ['css', 'js'] },
    'mint-street-basics':    { 'hero-photo': ['css', 'js'] },
    'zigzag-snack-pop':      { 'hero-photo': ['css', 'js'] },
    'serif-bistro-green':    { 'hero-photo': ['css', 'js'] },
    'pixel-lime-portfolio':  { 'hero-photo': ['css', 'js'] },
    'signal-orange-techwear': { 'hero-photo': ['css', 'js'] },
    'sticker-brutal-jp':     { cadre: ['css', 'js'], 'hero-photo': ['css', 'js'] },
    'retro-mission-poster':  { cadre: ['css', 'js'], 'hero-photo': ['css', 'js'] },
    'showroom-bento':        { 'hero-photo': ['css', 'js'] },
    'cosmic-voyage':         { scene: ['css', 'js'], 'hero-photo': ['css', 'js'] },
    'anime-x-slash':         { 'hero-photo': ['css', 'js'] },
    'heritage-lens':         { 'hero-photo': ['css', 'js'] },
    'hold-to-play-music':    { 'hero-photo': ['css', 'js'] },
    'chrome-atelier':        { 'hero-photo': ['css', 'js'] },
    'tiny-planet-toy':       { objet: ['css', 'js'] }
  };
  var loaded = {};
  function load(url) {
    if (loaded[url]) return loaded[url];
    return (loaded[url] = new Promise(function (resolve) {
      var el;
      if (/\.css$/.test(url)) { el = document.createElement('link'); el.rel = 'stylesheet'; el.href = url; }
      else { el = document.createElement('script'); el.src = url; el.async = false; }
      el.onload = resolve; el.onerror = resolve;                 // un fichier absent n'empêche pas le reste
      document.head.appendChild(el);
    }));
  }
  Kobo.templates.manifest = MANIFEST;
  Kobo.templates.use = function (skill, base) {
    var families = MANIFEST[skill] || {}, jobs = [];
    Object.keys(families).forEach(function (f) {
      jobs.push(load(base + f + '/' + f + '.css'), load(base + f + '/' + f + '.js'));
      families[f].forEach(function (ext) { jobs.push(load(base + f + '/' + skill + '.' + ext)); });
    });
    return Promise.all(jobs).then(function () { return Kobo.templates.apply(); });
  };
})();
