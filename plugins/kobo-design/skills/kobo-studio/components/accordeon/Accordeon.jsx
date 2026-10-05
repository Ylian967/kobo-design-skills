// kobo-studio — Accordéon (React). Mêmes classes et même comportement que accordeon.css / accordeon.js.
import React, { useId, useRef, useState } from 'react';

/**
 * elements : [{ id, titre, contenu, desactive }]
 * unSeul : un seul panneau ouvert à la fois ; ouverts : ids ouverts au départ
 * niveau : balise du titre ('h3' par défaut, à accorder au plan de la page) ; titres : intitulés dans la police de titre du skill
 * surBascule(id, ouvert)
 */
export function Accordeon({ elements, unSeul = false, ouverts = [], niveau: Titre = 'h3', titres = false, surBascule }) {
  const base = useId();
  const refs = useRef({});
  const [etat, setEtat] = useState(ouverts);
  const dispo = elements.filter((e) => !e.desactive);
  const basculer = (id) => {
    const ouvert = !etat.includes(id);
    setEtat(ouvert ? (unSeul ? [id] : [...etat, id]) : etat.filter((x) => x !== id));
    surBascule?.(id, ouvert);
  };
  const clavier = (e, id) => {
    const i = dispo.findIndex((x) => x.id === id);
    const cible = { ArrowDown: dispo[(i + 1) % dispo.length], ArrowUp: dispo[(i - 1 + dispo.length) % dispo.length], Home: dispo[0], End: dispo[dispo.length - 1] }[e.key];
    if (cible) { e.preventDefault(); refs.current[cible.id]?.focus(); }
  };
  return (
    <div className={`k-accordion${titres ? ' k-accordion--titles' : ''}`}>
      {elements.map((el) => {
        const ouvert = etat.includes(el.id);
        return (
          <div className="k-accordion__item" key={el.id}>
            <Titre className="k-accordion__head">
              <button type="button" className="k-accordion__trigger" id={`${base}-t-${el.id}`} aria-controls={`${base}-p-${el.id}`} aria-expanded={ouvert}
                disabled={el.desactive} ref={(n) => { refs.current[el.id] = n; }} onClick={() => basculer(el.id)} onKeyDown={(e) => clavier(e, el.id)}>
                {el.titre}<span className="k-accordion__mark" aria-hidden="true" />
              </button>
            </Titre>
            <div className="k-accordion__panel" id={`${base}-p-${el.id}`} role="region" aria-labelledby={`${base}-t-${el.id}`} hidden={!ouvert}>{el.contenu}</div>
          </div>
        );
      })}
    </div>
  );
}
