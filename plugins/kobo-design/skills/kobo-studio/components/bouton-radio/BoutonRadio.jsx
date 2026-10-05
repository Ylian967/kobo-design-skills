// kobo-studio — Bouton radio (React). Mêmes classes que bouton-radio.css. Le clavier (flèches dans le groupe) est celui du navigateur.
import React, { useId, useState } from 'react';
import { Icone } from '../Icone.jsx';

/**
 * legende : la question (obligatoire) ; options : [{ valeur, libelle, aide, desactivee }]
 * valeur, surChangement : mode piloté ; sinon parDefaut
 * aide ; erreur : message écrit (pose aria-invalid) ; enLigne : choix côte à côte ; name ; requis
 */
export function GroupeRadio({ legende, options, valeur, surChangement, parDefaut, name, aide, erreur, enLigne, requis }) {
  const id = useId();
  const [interne, setInterne] = useState(parDefaut);
  const courant = valeur ?? interne;
  return (
    <fieldset className={`k-radio-group${enLigne ? ' k-radio-group--inline' : ''}`} aria-describedby={[aide && `${id}-aide`, erreur && `${id}-erreur`].filter(Boolean).join(' ') || undefined}>
      <legend className="k-radio-group__legend">{legende}</legend>
      <div className="k-radio-group__list">
        {options.map((o) => (
          <label key={o.valeur} className={`k-radio${o.desactivee ? ' k-radio--off' : ''}`}>
            <input type="radio" className="k-radio__input" name={name || id} value={o.valeur} checked={courant === o.valeur} disabled={o.desactivee} required={requis}
              aria-invalid={erreur ? 'true' : undefined} onChange={() => { setInterne(o.valeur); surChangement?.(o.valeur); }} />
            <span className="k-radio__box" aria-hidden="true" />
            <span className="k-radio__text"><span className="k-radio__label">{o.libelle}</span>{o.aide && <span className="k-radio__help">{o.aide}</span>}</span>
          </label>
        ))}
      </div>
      {aide && <p className="k-radio-group__help" id={`${id}-aide`}>{aide}</p>}
      {erreur && <p className="k-radio-group__error" id={`${id}-erreur`}><Icone nom="erreur" />{erreur}</p>}
    </fieldset>
  );
}
