/*
 * Rivage Suivi — corriger une affaire dans le panneau de détail (la liste reste visible).
 */
(function () {
  'use strict';
  var R = window.Rivage;
  if (!R) return;
  var ap = R.ap, panneau = document.getElementById('ap-detail');
  var lecture = panneau.querySelector('[data-rs-lecture]'), form = panneau.querySelector('[data-rs-edition]');
  var modifier = panneau.querySelector('[data-rs-modifier]');
  var CHAMPS = ['affaire', 'societe', 'service', 'montant', 'cloture', 'responsable'];
  var NOMS = { affaire: 'nom', societe: 'société', service: 'service', montant: 'montant', cloture: 'clôture prévue', responsable: 'responsable' };

  function montrer(edition) {
    form.hidden = !edition;
    lecture.hidden = edition;
    if (!edition) form.querySelectorAll('.k-field[data-k-validate]').forEach(Kobo.field.clearError);
  }

  function dire(champ, v) {
    if (champ === 'montant') return R.euros(v.montant);
    if (champ === 'cloture') return R.jour(v.cloture);
    if (champ === 'service') return R.SERVICES[v.service];
    if (champ === 'responsable') return R.RESPONSABLES[v.responsable];
    return '« ' + v[champ] + ' »';
  }

  modifier.addEventListener('click', function () {
    var tr = R.ligneOuverte();
    if (!tr || modifier.getAttribute('aria-disabled') === 'true') return;
    var v = R.lire(tr);
    CHAMPS.forEach(function (n) { form.elements[n].value = v[n]; });
    montrer(true);
    form.elements.affaire.focus();
  });

  panneau.querySelector('[data-rs-quitter]').addEventListener('click', function () { montrer(false); modifier.focus(); });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var tr = R.ligneOuverte();
    if (!tr) return;
    var fautifs = Array.prototype.filter.call(form.querySelectorAll('.k-field[data-k-validate]'), function (champ) { return !Kobo.field.validate(champ); });
    if (fautifs.length) { fautifs[0].querySelector('.k-field__control').focus(); return; }
    var avant = R.lire(tr), apres = Object.assign({}, avant);
    CHAMPS.forEach(function (n) { apres[n] = form.elements[n].value.trim(); });
    var changes = CHAMPS.filter(function (n) { return String(avant[n]) !== String(apres[n]); });
    montrer(false);
    if (!changes.length) { modifier.focus(); return; }
    R.ecrire(tr, apres);
    var sortie = R.suite(tr);
    if (!sortie) modifier.focus(); else R.table.focus();
    R.noter('Affaire corrigée',
      R.nommer(avant) + ' : ' + changes.map(function (n) { return NOMS[n] + ' ' + dire(n, avant) + ' → ' + dire(n, apres); }).join(' ; ') + '.' + sortie,
      function () {
        var maintenant = R.lire(tr);
        changes.forEach(function (n) { maintenant[n] = avant[n]; });
        R.ecrire(tr, maintenant);
        if (R.ligneOuverte() === tr) R.peindre();
      });
  });

  // Ouvrir une autre affaire ou fermer le panneau quitte la modification sans rien changer.
  ap.addEventListener('k-app:open', function () { montrer(false); });
  ap.addEventListener('k-app:close', function () { montrer(false); });
})();
