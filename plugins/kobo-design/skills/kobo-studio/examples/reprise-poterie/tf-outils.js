/* Terre & Feu — petites aides d'affichage partagées par les pages de réservation. */
(function () {
  'use strict';
  function el(balise, attributs, contenu) {
    var n = document.createElement(balise);
    Object.keys(attributs || {}).forEach(function (k) { n.setAttribute(k, attributs[k]); });
    [].concat(contenu || []).forEach(function (c) { n.append(c); });
    return n;
  }
  TF.el = el;
  TF.id = function (id) { return document.getElementById(id); };

  /* Une ligne de liste : un titre, une précision, et à droite ses gestes. L'état est écrit, jamais dit par la couleur seule. */
  TF.ligne = function (titre, precision, gestes, etat) {
    var li = el('li', { class: 'tf-slot' }, [
      el('div', { class: 'tf-slot__txt' }, [el('strong', {}, titre), el('span', {}, precision)]),
      el('div', { class: 'tf-actions' }, gestes)
    ]);
    if (etat) li.setAttribute('data-etat', etat);
    return li;
  };

  /* Remplit une liste de faits <dl class="k-facts"> avec des paires [libellé, valeur]. */
  TF.faits = function (dl, paires) {
    dl.textContent = '';
    paires.forEach(function (p) { dl.append(el('div', {}, [el('dt', {}, p[0]), el('dd', {}, p[1])])); });
  };

  /* Les faits d'une réservation, dans l'ordre où on les relit. */
  TF.faitsReservation = function (r) {
    var s = TF.seance(r.seance), f = TF.formules[r.formule];
    var quand = s.dates
      ? [['Les six séances', s.dates.map(TF.jour).join(', ')], ['Heure', s.heure]]
      : [['Date', TF.titre(s)], ['Heure', s.heure + (r.formule === 'decouverte' ? ' (séance de 2 h 30)' : '')]];
    return [['Numéro', r.ref], ['Formule', f.nom]].concat(quand, [
      ['Réservé', TF.compte(r.places, r.formule) + ', au nom de ' + r.nom],
      ['À régler', TF.aRegler(r)],
      ['Adresse', '14 rue de la Verrerie, 44100 Nantes']
    ]);
  };

  /* Valide tous les champs d'un formulaire ; rend le premier contrôle en erreur, ou null. */
  TF.premierFaux = function (form) {
    var faux = null;
    form.querySelectorAll('.k-field').forEach(function (champ) {
      if (!Kobo.field.validate(champ) && !faux) faux = champ.querySelector('.k-field__control');
    });
    return faux;
  };

  /* Bouton d'envoi occupé : le libellé dit ce qui se passe, un second appui est ignoré. */
  TF.occupe = function (bouton, texte) {
    if (texte) { bouton.dataset.repos = bouton.textContent; bouton.textContent = texte; bouton.setAttribute('aria-busy', 'true'); }
    else { bouton.textContent = bouton.dataset.repos; bouton.removeAttribute('aria-busy'); }
  };
})();
