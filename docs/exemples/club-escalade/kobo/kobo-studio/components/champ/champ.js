/*
 * kobo-studio — champ : messages d'erreur, compteur, zone cliquable.
 * Sans dépendance. Fonctionne en file://. S'active seul sur les .k-field présents au chargement ;
 * pour du contenu ajouté ensuite : Kobo.field.init(conteneur).
 *
 *   <div class="k-field" data-k-validate> … </div>   validation à la sortie du champ, puis à la frappe
 *   Kobo.field.setError(champ, 'message')            pose une erreur (par exemple renvoyée par le serveur)
 *   Kobo.field.clearError(champ)
 *   Kobo.field.validate(champ)  → true / false
 */
(function () {
  'use strict';
  var Kobo = (window.Kobo = window.Kobo || {});

  function parts(field) {
    return {
      control: field.querySelector('.k-field__control'),
      error: field.querySelector('.k-field__error'),
      text: field.querySelector('.k-field__error span'),
      count: field.querySelector('.k-field__count')
    };
  }

  // Message en français d'après l'état de validité natif. data-k-msg="…" sur le champ le remplace.
  function message(control) {
    var v = control.validity;
    if (v.valid) return '';
    if (control.dataset.kMsg) return control.dataset.kMsg;
    if (v.valueMissing) return 'Ce champ est obligatoire.';
    if (v.typeMismatch && control.type === 'email') return 'Adresse incomplète : il manque « @ » ou le domaine, par exemple prenom@exemple.fr.';
    if (v.typeMismatch && control.type === 'url') return 'Adresse web incomplète : elle doit commencer par https://.';
    if (v.tooShort) return 'Trop court : ' + control.minLength + ' caractères au minimum (' + control.value.length + ' pour l’instant).';
    if (v.tooLong) return 'Trop long : ' + control.maxLength + ' caractères au maximum.';
    if (v.patternMismatch) return 'Le format ne correspond pas à ce qui est attendu.';
    return 'Cette valeur n’est pas acceptée.';
  }

  function setError(field, msg) {
    var p = parts(field);
    if (!p.control || !p.error) return;
    p.control.setAttribute('aria-invalid', 'true');
    (p.text || p.error).textContent = msg;
    p.error.hidden = false;
    if (!p.error.id) p.error.id = (p.control.id || 'k-field') + '-erreur';
    var ids = (p.control.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
    if (ids.indexOf(p.error.id) < 0) ids.unshift(p.error.id);
    p.control.setAttribute('aria-describedby', ids.join(' '));
  }

  function clearError(field) {
    var p = parts(field);
    if (!p.control || !p.error) return;
    p.control.removeAttribute('aria-invalid');
    p.error.hidden = true;
    var ids = (p.control.getAttribute('aria-describedby') || '').split(/\s+/).filter(function (id) { return id && id !== p.error.id; });
    if (ids.length) p.control.setAttribute('aria-describedby', ids.join(' ')); else p.control.removeAttribute('aria-describedby');
  }

  function validate(field) {
    var p = parts(field);
    if (!p.control) return true;
    var msg = message(p.control);
    if (msg) setError(field, msg); else clearError(field);
    return !msg;
  }

  function count(field) {
    var p = parts(field);
    if (p.count && p.control.maxLength > 0) p.count.textContent = p.control.value.length + ' / ' + p.control.maxLength;
  }

  function init(root) {
    (root || document).querySelectorAll('.k-field').forEach(function (field) {
      if (field.dataset.kReady) return;
      field.dataset.kReady = '1';
      var p = parts(field), box = field.querySelector('.k-field__box');
      if (!p.control) return;
      // La boîte déborde du champ pour atteindre --k-hit-min : un appui dans la marge donne le focus au champ.
      if (box) box.addEventListener('pointerdown', function (e) {
        if (e.target === box && !p.control.disabled) { e.preventDefault(); p.control.focus(); }
      });
      count(field);
      p.control.addEventListener('input', function () {
        count(field);
        if (p.control.getAttribute('aria-invalid') === 'true') validate(field); // on corrige en direct une erreur déjà signalée
      });
      if (field.hasAttribute('data-k-validate')) p.control.addEventListener('blur', function () { validate(field); });
    });
  }

  Kobo.field = { init: init, validate: validate, setError: setError, clearError: clearError };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(); }); else init();
})();
