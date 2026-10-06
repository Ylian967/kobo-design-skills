/* Terre & Feu — espace de l'atelier : qui vient à chaque séance. Le code est simulé dans le navigateur. */
(function () {
  'use strict';
  var $ = TF.id, el = TF.el, CODE = 'four-1280', CLE = 'terre-et-feu-atelier', aRetirer = null;

  function ouvert() { try { return sessionStorage.getItem(CLE) === 'oui'; } catch (e) { return false; } }
  function noter(oui) { try { if (oui) sessionStorage.setItem(CLE, 'oui'); else sessionStorage.removeItem(CLE); } catch (e) { /* sans stockage, le code sera redemandé */ } }

  function personne(r) {
    var retiree = r.etat === 'retiree';
    var geste = retiree
      ? el('button', { type: 'button', class: 'k-btn k-btn--secondary', 'data-retablir': r.ref, 'aria-label': 'Rétablir ' + r.nom }, 'Rétablir')
      : el('button', { type: 'button', class: 'k-btn k-btn--secondary', 'data-retirer': r.ref, 'aria-label': 'Retirer ' + r.nom }, 'Retirer');
    var appel = el('a', { class: 'k-btn k-btn--secondary', href: 'tel:' + r.tel.replace(/[^0-9+]/g, ''), 'aria-label': 'Appeler ' + r.nom + ' au ' + r.tel }, r.tel);
    var precision = (retiree ? 'Retiré · ' : '') + TF.compte(r.places, r.formule) + ' · ' + r.ref;
    return TF.ligne(r.nom, precision, retiree ? [geste] : [appel, geste], retiree ? 'retire' : '');
  }

  function peindre() {
    var zone = $('seances');
    zone.textContent = '';
    TF.seances().forEach(function (s) {
      var f = TF.formules[s.formule], gens = TF.inscrits(s.id), prises = f.places - TF.restant(s.id);
      var bloc = el('section', { class: 'k-stack k-stack--sm' }, [
        el('h3', { class: 'k-h3' }, TF.titre(s) + ', ' + s.heure),
        el('p', {}, f.nom + ' · ' + TF.compte(prises, s.formule) + ' sur ' + f.places + (prises >= f.places ? ' · complet' : ''))
      ]);
      if (!gens.length) bloc.append(el('p', { class: 'k-note' }, 'Aucun inscrit pour l\'instant.'));
      else { var ul = el('ul', { class: 'tf-slots' }); gens.forEach(function (r) { ul.append(personne(r)); }); bloc.append(ul); }
      zone.append(bloc);
    });
  }

  function entrer() {
    $('porte').hidden = true; $('liste').hidden = false;
    peindre();
    $('t-liste').focus();
  }

  $('porte').addEventListener('submit', function (e) {
    e.preventDefault();
    var champ = $('code').closest('.k-field');
    if (!Kobo.field.validate(champ)) { $('code').focus(); return; }
    if ($('code').value.trim() !== CODE) {
      Kobo.field.setError(champ, 'Ce code n\'est pas le bon. Vérifiez les majuscules et le tiret, puis réessayez.');
      $('code').focus(); return;
    }
    $('code').value = '';
    noter(true); entrer();
  });

  $('quitter').addEventListener('click', function () {
    noter(false);
    $('liste').hidden = true; $('porte').hidden = false; $('seances').textContent = ''; $('message').textContent = '';
    $('code').focus();
  });

  $('seances').addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    if (b.hasAttribute('data-retirer')) {
      aRetirer = TF.parRef(b.getAttribute('data-retirer'));
      $('m-retirer-texte').textContent = aRetirer.nom + ' (' + TF.compte(aRetirer.places, aRetirer.formule) + ') sera retiré de la séance et la place rendue. Vous pourrez le rétablir tant que la place est libre.';
      Kobo.modal.open('m-retirer', b);
    } else if (b.hasAttribute('data-retablir')) {
      var ref = b.getAttribute('data-retablir'), r = TF.retablir(ref);
      if (!r) { Kobo.toast({ type: 'warning', title: 'La séance est complète', text: 'La place a été prise entre-temps : cette personne ne peut pas être rétablie.' }); return; }
      apres(ref, r.nom + ' est de nouveau inscrit.', 'data-retirer');
    }
  });

  /* Après un geste, la liste est redessinée : le focus va au bouton qui défait le geste, sur la même ligne. */
  function apres(ref, message, attribut) {
    peindre();
    $('message').textContent = message;
    var suite = $('seances').querySelector('[' + attribut + '="' + ref + '"]');
    if (suite) suite.focus();
  }

  $('m-retirer').addEventListener('close', function (e) {
    if (e.target.returnValue !== 'retire' || !aRetirer) return;
    e.target.returnValue = '';
    var r = TF.retirer(aRetirer.ref);
    apres(r.ref, r.nom + ' est retiré, la place est rendue.', 'data-retablir');
  });

  if (ouvert()) entrer();
})();
