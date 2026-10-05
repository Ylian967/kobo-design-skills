// kobo-studio — Champ (React) : texte et zone de texte. Mêmes classes et mêmes états que champ.css.
import React, { useId, useRef, useState } from 'react';
import { Icone } from '../Icone.jsx';

// Message en français d'après la validité native (mêmes textes que champ.js)
function messageDe(c) {
  const v = c.validity;
  if (v.valid) return '';
  if (v.valueMissing) return 'Ce champ est obligatoire.';
  if (v.typeMismatch && c.type === 'email') return 'Adresse incomplète : il manque « @ » ou le domaine, par exemple prenom@exemple.fr.';
  if (v.typeMismatch && c.type === 'url') return 'Adresse web incomplète : elle doit commencer par https://.';
  if (v.tooShort) return `Trop court : ${c.minLength} caractères au minimum (${c.value.length} pour l’instant).`;
  if (v.tooLong) return `Trop long : ${c.maxLength} caractères au maximum.`;
  if (v.patternMismatch) return 'Le format ne correspond pas à ce qui est attendu.';
  return 'Cette valeur n’est pas acceptée.';
}

/**
 * libelle : texte du <label> (obligatoire)
 * multiligne : rend une <textarea>
 * aide : texte d'aide sous le champ
 * erreur : message d'erreur imposé (par exemple renvoyé par le serveur) ; sinon la validation native s'applique à la sortie du champ
 * enVerification : aria-busy sur la boîte (vérification asynchrone)
 * facultatif : ajoute « (facultatif) » au libellé
 */
export function Champ({
  libelle, multiligne = false, aide, erreur, enVerification = false, facultatif = false,
  valider = true, className = '', onBlur, onChange, maxLength, ...reste
}) {
  const id = useId();
  const ref = useRef(null);
  const [locale, setLocale] = useState('');
  const [longueur, setLongueur] = useState(String(reste.defaultValue ?? reste.value ?? '').length);
  const message = erreur || locale;
  const decrit = [message && `${id}-erreur`, aide && `${id}-aide`].filter(Boolean).join(' ') || undefined;
  const Balise = multiligne ? 'textarea' : 'input';

  return (
    <div className={`k-field ${className}`.trim()}>
      <label className="k-field__label" htmlFor={id}>
        {libelle}{facultatif && <span className="k-field__opt"> (facultatif)</span>}
      </label>
      <div
        className="k-field__box" aria-busy={enVerification || undefined}
        onPointerDown={(e) => { if (e.target === e.currentTarget && !reste.disabled) { e.preventDefault(); ref.current?.focus(); } }}
      >
        <Balise
          ref={ref} id={id} className="k-field__control" maxLength={maxLength}
          aria-invalid={message ? 'true' : undefined} aria-describedby={decrit}
          onBlur={(e) => { if (valider) setLocale(messageDe(e.target)); onBlur?.(e); }}
          onChange={(e) => { setLongueur(e.target.value.length); if (locale) setLocale(messageDe(e.target)); onChange?.(e); }}
          {...reste}
        />
        <span className="k-field__spinner" aria-hidden="true" />
      </div>
      <p className="k-field__error" id={`${id}-erreur`} role="alert" hidden={!message}>
        <Icone nom="erreur" /><span>{message}</span>
      </p>
      {(aide || maxLength) && (
        <div className="k-field__foot">
          {aide && <span className="k-field__help" id={`${id}-aide`}>{aide}</span>}
          {maxLength && <span className="k-field__count" aria-hidden="true">{longueur} / {maxLength}</span>}
        </div>
      )}
    </div>
  );
}
