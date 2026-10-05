// kobo-studio — Case à cocher (React). Mêmes classes que case-a-cocher.css ; l'état partiel est posé sur le nœud, comme le fait case-a-cocher.js.
import React, { useEffect, useId, useRef } from 'react';
import { Icone } from '../Icone.jsx';

/**
 * libelle : texte visible (obligatoire) ; aide : précision sous le libellé
 * cochee, surChangement : mode piloté ; sinon parDefaut
 * partielle : état « ni tout ni rien » (case d'en-tête) ; desactivee ; invalide ; name, value
 */
export function CaseACocher({ libelle, aide, cochee, surChangement, parDefaut, partielle = false, desactivee, invalide, name, value, decritPar }) {
  const ref = useRef(null);
  useEffect(() => { if (ref.current) ref.current.indeterminate = partielle; }, [partielle]);
  return (
    <label className="k-check">
      <input ref={ref} type="checkbox" className="k-check__input" name={name} value={value} checked={cochee} defaultChecked={cochee === undefined ? parDefaut : undefined}
        onChange={(e) => surChangement?.(e.target.checked)} disabled={desactivee} aria-invalid={invalide ? 'true' : undefined} aria-describedby={decritPar} />
      <span className="k-check__box" aria-hidden="true" />
      <span className="k-check__text">{libelle}{aide && <span className="k-check__help">{aide}</span>}</span>
    </label>
  );
}

/**
 * Groupe : une question, plusieurs réponses possibles.
 * legende (obligatoire) ; options : [{ valeur, libelle, aide, desactivee }] ; valeurs : tableau des valeurs cochées ; surChangement(valeurs)
 * aide ; erreur : message écrit ; enLigne : cases côte à côte
 */
export function GroupeCases({ legende, options, valeurs = [], surChangement, name, aide, erreur, enLigne }) {
  const id = useId();
  const basculer = (v, on) => surChangement?.(on ? [...valeurs, v] : valeurs.filter((x) => x !== v));
  return (
    <fieldset className={`k-check-group${enLigne ? ' k-check-group--inline' : ''}`} aria-describedby={[aide && `${id}-aide`, erreur && `${id}-erreur`].filter(Boolean).join(' ') || undefined}>
      <legend className="k-check-group__legend">{legende}</legend>
      <div className="k-check-group__list">
        {options.map((o) => (
          <CaseACocher key={o.valeur} libelle={o.libelle} aide={o.aide} name={name} value={o.valeur} cochee={valeurs.includes(o.valeur)} desactivee={o.desactivee}
            invalide={Boolean(erreur)} surChangement={(on) => basculer(o.valeur, on)} />
        ))}
      </div>
      {aide && <p className="k-check-group__help" id={`${id}-aide`}>{aide}</p>}
      {erreur && <p className="k-check-group__error" id={`${id}-erreur`}><Icone nom="erreur" />{erreur}</p>}
    </fieldset>
  );
}
