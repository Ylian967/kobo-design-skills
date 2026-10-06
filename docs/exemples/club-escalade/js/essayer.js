/* Les Dalles — page Essayer : choisir un samedi, trois champs, confirmation qui reste, annulation. */
(function () {
  'use strict';

  var D = Dalles.dates;
  var PLACES = 8;
  var form = document.getElementById('essai-form');
  var liste = document.getElementById('essai-liste');
  var confirme = document.getElementById('essai-confirme');
  var vide = document.getElementById('essai-vide');
  var titre = document.getElementById('t-inscription');

  function debut(date) { return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 10); }

  /* Les quatre prochains samedis dont la séance n'a pas commencé. */
  function samedis() {
    var s = [], d = D.aujourdhui();
    while (s.length < 4) { if (d.getDay() === 6 && debut(d) > new Date()) s.push(d); d = D.ajouter(d, 1); }
    return s;
  }

  /* Places déjà prises par d'autres : valeur simulée, stable d'une visite à l'autre. */
  function restantes(date) {
    var id = 'essai-' + D.cle(date);
    var d = Dalles.lire();
    var prises = id in d.occupation ? d.occupation[id] : D.graine(id) % 10;
    return Math.max(0, PLACES - prises);
  }

  function essai() {
    var e = Dalles.lire().essai;
    return e && debut(D.jour(e.date)) > new Date() ? e : null;
  }

  function choix(date) {
    var n = restantes(date), plein = n < 1;
    return '<label class="k-radio' + (plein ? ' k-radio--off' : '') + '"><input type="radio" class="k-radio__input" name="date" value="' + D.cle(date) + '"' + (plein ? ' disabled' : '') + '>' +
      '<span class="k-radio__box" aria-hidden="true"></span><span class="k-radio__text"><span class="k-radio__label">' + D.jourLong(date) + '</span>' +
      '<span class="k-radio__help">' + (plein ? 'Complet' : n + ' place' + (n > 1 ? 's' : '')) + '</span></span></label>';
  }

  function dessiner() {
    var e = essai();
    var dates = samedis();
    var ouvert = dates.some(function (d) { return restantes(d) > 0; });
    liste.innerHTML = dates.map(choix).join('');
    confirme.hidden = !e;
    form.hidden = !!e || !ouvert;
    vide.hidden = !!e || ouvert;
    titre.textContent = e ? 'Votre séance est réservée' : 'Réserver ma séance';
    if (e) document.getElementById('essai-resume').textContent = 'Séance découverte du ' + D.jourLong(D.jour(e.date)) + ', de 10 h à 12 h, au nom de ' + e.nom + '.';
  }

  function enregistrer() {
    var date = form.date.value;
    if (restantes(D.jour(date)) < 1) {
      dessiner();
      Dalles.dire({ type: 'error', title: 'Cette séance vient de se remplir', text: 'Choisissez un autre samedi : vos coordonnées sont gardées.' });
      return;
    }
    Dalles.changer(function (d) { d.essai = { date: date, nom: form.nom.value.trim(), email: form.email.value.trim(), tel: form.tel.value.trim() }; });
    form.reset();
    dessiner();
    titre.focus();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!Dalles.form.verifier(form)) return;
    Dalles.form.envoyer(document.getElementById('essai-envoyer'), 'Réservation en cours…', enregistrer, function () {
      Dalles.dire({ type: 'error', title: 'La réservation n\'est pas partie', text: 'Pas de réseau. Vos réponses sont gardées.', action: { label: 'Réessayer', onClick: function () { form.requestSubmit(); } }, duration: 0 });
    });
  });

  document.getElementById('essai-annuler').addEventListener('click', function () {
    var e = essai();
    Dalles.demanderAnnulation('Séance découverte du ' + D.jourLong(D.jour(e.date)) + ', de 10 h à 12 h. Votre place sera rendue.', function () {
      Dalles.changer(function (d) { d.essai = null; });
      dessiner();
      titre.focus();
      Dalles.dire({ type: 'info', title: 'Séance annulée', text: 'Vous pouvez choisir un autre samedi quand vous voulez.' });
    });
  });

  dessiner();
})();
