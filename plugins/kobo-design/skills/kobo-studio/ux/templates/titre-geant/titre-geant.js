/*
 * kobo-studio — famille « titre géant » : construit le mot géant d'un emplacement title et le met à la largeur de son bloc.
 * Kobo.templates.families.titreGeant(options) rend { render, mount } pour Kobo.templates.register.
 *   options.word(parts) : le mot à agrandir.
 * Le mot géant est CHOISI : data-k-word="…" sur le titre ou sur son surtitre (le nom du projet, un mot-clé), sinon le surtitre,
 * débarrassé de ses articles et mots vides. Jamais un mot pris dans le titre. Moins de 3 lettres, ou pas de surtitre : pas de
 * mot géant, l'emplacement reste neutre.
 * Tailles : chaque mot va d'un bord à l'autre de son bloc, mais aucun ne dépasse une fois et demie le plus petit de la page.
 * Calcul fait une fois, puis à chaque changement de largeur (ResizeObserver) : jamais à chaque image.
 */
(function () {
  'use strict';
  var Kobo = window.Kobo, F = (Kobo.templates.families = Kobo.templates.families || {});
  // Construit un mot géant (décor, aria-hidden) : une lettre par <span>, pour l'entrée lettre à lettre
  F.motGeant = function (word) {
    var giant = document.createElement('span'); giant.className = 'g-word__giant'; giant.setAttribute('aria-hidden', 'true');
    Array.prototype.forEach.call(word, function (ch, i) { var s = document.createElement('span'); s.textContent = ch === ' ' ? '\u00a0' : ch; s.style.setProperty('--_i', i); giant.appendChild(s); });
    return giant;
  };
  // Articles et mots vides : ils ne font jamais un mot géant
  var VIDES = ['le', 'la', 'les', 'l', 'un', 'une', 'des', 'du', 'de', 'd', 'au', 'aux', 'et', 'ou', 'à', 'a', 'en', 'sur', 'pour', 'nos', 'notre', 'vos', 'votre', 'mes', 'mon', 'ma', 'ses', 'son', 'sa', 'ce', 'cet', 'cette', 'ces', 'the', 'of', 'and'];
  // Le mot choisi dans un texte : ses « n » premiers mots, articles et mots vides de tête retirés ; '' s'il fait moins de 3 lettres
  F.motChoisi = function (text, n) {
    var words = (text || '').trim().split(/[\s'’]+/).filter(Boolean);
    while (words.length && VIDES.indexOf(words[0].toLowerCase()) >= 0) words.shift();
    var word = words.slice(0, n || 1).join(' ');
    return word.replace(/[^A-Za-zÀ-ÿ0-9]/g, '').length < 3 ? '' : word;
  };
  // Met le mot à la largeur de son bloc ; rend une fonction qui arrête l'observation.
  // group : les mots d'un même groupe gardent des tailles cohérentes (aucun ne dépasse 1,5 fois le plus petit).
  var groups = {};
  function level(name) {
    var list = groups[name] || [], min = Math.min.apply(null, list.map(function (m) { return m.natural; }));
    list.forEach(function (m) { m.giant.style.setProperty('--_fit', Math.min(m.natural, min * 1.5).toFixed(3)); });
  }
  F.ajusterMot = function (giant, box, group) {
    var me = { giant: giant, natural: 4 };
    if (group) (groups[group] = groups[group] || []).push(me);
    var fit = function () {
      giant.style.setProperty('--_fit', 4);
      var first = giant.firstChild.getBoundingClientRect(), lastLetter = giant.lastChild.getBoundingClientRect();
      var w = lastLetter.right - first.left, room = box.clientWidth - parseFloat(getComputedStyle(giant).paddingInlineStart || 0) * 2;
      if (w > 0 && room > 0) me.natural = 4 * room / w;
      if (group) level(group); else giant.style.setProperty('--_fit', me.natural.toFixed(3));
    };
    var ro = new ResizeObserver(fit); ro.observe(box);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    fit();
    return function () { ro.disconnect(); if (group) { groups[group] = groups[group].filter(function (m) { return m !== me; }); if (groups[group].length) level(group); } };
  };
  F.titreGeant = function (options) {
    options = options || {};
    return {
      render: function (parts) {
        var title = parts.title && parts.title[0];
        if (!title) return null;
        var kicker = parts.kicker && parts.kicker[0];
        var chosen = title.getAttribute('data-k-word') || (kicker && kicker.getAttribute('data-k-word'));
        var word = chosen ? chosen.trim() : F.motChoisi(options.word ? options.word(parts) : (kicker ? kicker.textContent : ''), options.words || 2);
        if (!word) return null;   // pas de mot choisi, ou un mot vide : le titre reste neutre plutôt que d'agrandir n'importe quoi
        var box = document.createElement('div'); box.className = 'g-word';
        var giant = F.motGeant(word);
        box.appendChild(giant);
        if (parts.kicker) { parts.kicker[0].classList.add('k-sr-only'); box.appendChild(parts.kicker[0]); }   // le surtitre reste lu, il n'est plus affiché deux fois
        box.appendChild(title);
        if (parts.lead) box.appendChild(parts.lead[0]);
        return box;
      },
      mount: function (el, ctx) {
        var box = el.querySelector('.g-word'), giant = el.querySelector('.g-word__giant');
        if (!giant) return null;
        var stopFit = F.ajusterMot(giant, box, 'title');
        var io = null;
        if (!ctx.still) {
          box.setAttribute('data-k-in', 'pending');
          requestAnimationFrame(function () { box.setAttribute('data-k-motion', ''); });
          io = new IntersectionObserver(function (entries) { entries.forEach(function (e) { if (e.isIntersecting) { box.setAttribute('data-k-in', 'done'); io.disconnect(); } }); }, { rootMargin: '0px 0px -10% 0px' });
          io.observe(box);
        }
        return function () { stopFit(); if (io) io.disconnect(); };
      }
    };
  };
})();
