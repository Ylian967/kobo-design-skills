/*
 * kobo-studio — structure « récit en sections collantes » : dit où l'on en est.
 *   - marque le chapitre en cours dans le rail (aria-current="step") et fait avancer la barre (--_progress, 0 → 1) ;
 *   - pose data-k-layout="side" ou "stacked" sur chaque chapitre, selon que son image et son texte tiennent côte à côte ou non (mesure, pas de point de rupture).
 * Aucune interception du défilement : la molette, le clavier et le rail restent maîtres. Lecture seule de la mise en page,
 * une fois par image affichée (requestAnimationFrame).
 */
(function () {
  'use strict';
  var story = document.querySelector('.rc-story');
  if (!story) return;
  var bar = story.querySelector('.rc-rail__bar'), links = Array.prototype.slice.call(story.querySelectorAll('.rc-rail a'));
  var pending = 0;

  function chapters() { return Array.prototype.slice.call(story.querySelectorAll('.rc-chapter')); }
  function measure() {
    pending = 0;
    var list = chapters(), mid = window.innerHeight / 2, current = 0;
    list.forEach(function (c, i) {
      var media = c.querySelector('.rc-chapter__media'), text = c.querySelector('.rc-chapter__text');
      if (media && text) c.setAttribute('data-k-layout', text.getBoundingClientRect().left > media.getBoundingClientRect().left + 1 ? 'side' : 'stacked');
      if (c.getBoundingClientRect().top <= mid) current = i;
    });
    var box = story.getBoundingClientRect(), span = box.height - window.innerHeight;
    var p = span > 0 ? Math.min(1, Math.max(0, -box.top / span)) : 0;
    if (bar) bar.style.setProperty('--_progress', p.toFixed(3));
    links.forEach(function (a, i) {
      if (i === current) { if (a.getAttribute('aria-current') !== 'step') { a.setAttribute('aria-current', 'step'); reveal(a); } }
      else a.removeAttribute('aria-current');
    });
  }
  // Ramène le lien du chapitre en cours dans le rail, en ne faisant défiler que le rail (jamais la page, et sans toucher au
  // point de départ de la tabulation, que scrollIntoView déplace)
  function reveal(a) {
    var list = a.closest('ol'), box = list.getBoundingClientRect(), r = a.getBoundingClientRect();
    if (r.left < box.left) list.scrollLeft -= box.left - r.left;
    else if (r.right > box.right) list.scrollLeft += r.right - box.right;
  }
  function schedule() { if (!pending) pending = requestAnimationFrame(measure); }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  story.addEventListener('k-slot-change', schedule);
  window.addEventListener('load', schedule);
  schedule();
})();
