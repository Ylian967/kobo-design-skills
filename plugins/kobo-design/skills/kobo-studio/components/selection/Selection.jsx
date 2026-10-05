// kobo-studio — Sélection (React). Mêmes classes que champ.css + selection.css : un <select> natif habillé comme un champ.
import React, { useId, useState } from 'react';
import { Icone } from '../Icone.jsx';

/**
 * libelle : texte du <label> (obligatoire) ; options : [{ valeur, libelle, desactive }] ; vide : libellé de l'option vide (« Choisir… »)
 * valeur, surChangement : mode piloté ; sinon parDefaut (un tableau de valeurs si multiple)
 * aide : pourquoi on demande ; erreur : message écrit (pose aria-invalid) ; requis : message d'erreur si rien n'est choisi à la sortie du champ
 * facultatif, desactive, multiple, name
 */
export function Selection({ libelle, options, vide, valeur, surChangement, parDefaut = '', aide, erreur, requis, facultatif, desactive, multiple, name }) {
  const id = useId();
  const [interne, setInterne] = useState(multiple ? (Array.isArray(parDefaut) ? parDefaut : []) : parDefaut);
  const [manque, setManque] = useState(false);
  const courant = valeur ?? interne;
  const message = erreur || (manque ? requis : '');
  const changer = (e) => {
    const v = multiple ? Array.from(e.target.selectedOptions, (o) => o.value) : e.target.value;
    setInterne(v); setManque(false); surChangement?.(v);
  };
  const decrit = [aide && `${id}-aide`, message && `${id}-erreur`].filter(Boolean).join(' ') || undefined;
  return (
    <div className="k-field k-select">
      <label className="k-field__label" htmlFor={id}>{libelle}{facultatif && <span className="k-field__opt"> (facultatif)</span>}</label>
      <div className="k-field__box k-select__box">
        <select className="k-field__control k-select__control" id={id} name={name} value={courant} onChange={changer} multiple={multiple} disabled={desactive}
          aria-invalid={message ? 'true' : undefined} aria-describedby={decrit} onBlur={() => requis && setManque(multiple ? !courant.length : !courant)}>
          {vide && !multiple && <option value="">{vide}</option>}
          {options.map((o) => <option key={o.valeur} value={o.valeur} disabled={o.desactive}>{o.libelle}</option>)}
        </select>
      </div>
      {aide && <p className="k-field__help" id={`${id}-aide`}>{aide}</p>}
      {message && <p className="k-field__error" id={`${id}-erreur`}><Icone nom="erreur" />{message}</p>}
    </div>
  );
}
