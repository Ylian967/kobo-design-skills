/*
 * kobo-studio — structure « article » : le sommaire dit où l'on est, et le lien se copie.
 *   - marque dans le sommaire le titre en cours de lecture (aria-current="true") ; lecture seule, une fois par image affichée ;
 *   - « Copier le lien » : copie l'adresse et le confirme par une notification ; si le navigateur refuse, il le dit.
 * Sans script, le sommaire reste une liste de liens et le bouton ne fait rien : le masquer côté serveur si le script n'est pas servi.
 */
(function () {
  'use strict';
  var toc = document.getElementById('sommaire'), copy = document.getElementById('copier'), pending = 0;
  var links = toc ? Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]')) : [];

  function measure() {
    pending = 0;
    var line = window.innerHeight * 0.35, current = -1;
    links.forEach(function (a, i) {
      var h = document.getElementById(a.getAttribute('href').slice(1));
      if (h && h.getBoundingClientRect().top <= line) current = i;
    });
    links.forEach(function (a, i) { if (i === current) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
  }
  function schedule() { if (!pending) pending = requestAnimationFrame(measure); }
  if (links.length) { window.addEventListener('scroll', schedule, { passive: true }); window.addEventListener('resize', schedule); schedule(); }

  if (copy) copy.addEventListener('click', function () {
    var url = location.href.split('#')[0];
    var done = function () { Kobo.toast({ type: 'success', title: 'Lien copié', text: 'Collez-le où vous voulez le partager.', returnFocus: copy }); };
    var fail = function () { Kobo.toast({ type: 'error', title: 'Le lien n’a pas pu être copié', text: 'Copiez-le depuis la barre d’adresse : ' + url, returnFocus: copy }); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, fail); else fail();
  });
})();
