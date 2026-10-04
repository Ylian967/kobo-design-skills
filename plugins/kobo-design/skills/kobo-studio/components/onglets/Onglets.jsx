// kobo-studio — Onglets (React). Mêmes classes et même comportement que onglets.css / onglets.js :
// activation automatique, flèches gauche / droite, Début, Fin, un seul onglet dans l'ordre de tabulation.
import React, { useId, useRef, useState } from 'react';

/**
 * onglets : [{ id, libelle, compte, desactive, contenu }]
 * libelle : nom accessible de la liste d'onglets (obligatoire)
 * actif, surChangement : mode piloté ; sinon parDefaut fixe l'onglet de départ
 */
export function Onglets({ onglets, libelle, actif, surChangement, parDefaut }) {
  const base = useId();
  const refs = useRef({});
  const dispo = onglets.filter((o) => !o.desactive);
  const [interne, setInterne] = useState(parDefaut ?? dispo[0]?.id);
  const courant = actif ?? interne;
  const choisir = (id, focus) => {
    setInterne(id);
    surChangement?.(id);
    if (focus) refs.current[id]?.focus();
  };
  const clavier = (e, id) => {
    const i = dispo.findIndex((o) => o.id === id);
    const cible = { ArrowRight: dispo[(i + 1) % dispo.length], ArrowLeft: dispo[(i - 1 + dispo.length) % dispo.length], Home: dispo[0], End: dispo[dispo.length - 1] }[e.key];
    if (cible) { e.preventDefault(); choisir(cible.id, true); }
  };

  return (
    <div className="k-tabs">
      <div className="k-tabs__list" role="tablist" aria-label={libelle}>
        {onglets.map((o) => (
          <button
            key={o.id} ref={(n) => { refs.current[o.id] = n; }} type="button" role="tab" className="k-tabs__tab"
            id={`${base}-onglet-${o.id}`} aria-controls={`${base}-panneau-${o.id}`} aria-selected={o.id === courant}
            tabIndex={o.id === courant ? 0 : -1} disabled={o.desactive}
            onClick={() => choisir(o.id, false)} onKeyDown={(e) => clavier(e, o.id)}
          >
            {o.libelle}{o.compte !== undefined && <span className="k-tabs__count">{o.compte}</span>}
          </button>
        ))}
      </div>
      {onglets.map((o) => (
        <div
          key={o.id} role="tabpanel" className="k-tabs__panel" tabIndex={0}
          id={`${base}-panneau-${o.id}`} aria-labelledby={`${base}-onglet-${o.id}`} hidden={o.id !== courant}
        >
          {o.contenu}
        </div>
      ))}
    </div>
  );
}
