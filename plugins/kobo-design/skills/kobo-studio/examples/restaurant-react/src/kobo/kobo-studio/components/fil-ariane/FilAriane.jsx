// kobo-studio — Fil d'Ariane (React). Mêmes classes que fil-ariane.css ; même repli que fil-ariane.js.
import React, { useEffect, useRef, useState } from 'react';

/**
 * chemin : [{ libelle, href }] — le dernier élément est la page courante, sans lien
 * libelle : nom accessible de la navigation (« Fil d'Ariane » par défaut)
 * replier : range les niveaux du milieu derrière « … » quand le chemin en compte plus de quatre
 */
export function FilAriane({ chemin, libelle = "Fil d'Ariane", replier = false }) {
  const [ouvert, setOuvert] = useState(false);
  const premier = useRef(null);
  const plie = replier && !ouvert && chemin.length > 4;
  const dernier = chemin.length - 1;
  const niveau = (c, i, ref) => (
    <li key={`${i}-${c.libelle}`}>{i < dernier ? <a href={c.href} ref={ref}>{c.libelle}</a> : <span aria-current="page">{c.libelle}</span>}</li>
  );
  // Une fois les niveaux rendus, le focus va au premier d'entre eux : le bouton « … » vient de disparaître
  useEffect(() => { if (ouvert) premier.current?.focus(); }, [ouvert]);
  const ouvrir = () => setOuvert(true);
  return (
    <nav className="k-crumbs" aria-label={libelle}>
      <ol>
        {plie ? (
          <>
            {niveau(chemin[0], 0)}
            <li><button type="button" className="k-crumbs__more" aria-expanded="false" aria-label={`Afficher les ${chemin.length - 3} niveaux intermédiaires`} onClick={ouvrir}>…</button></li>
            {chemin.slice(-2).map((c, k) => niveau(c, dernier - 1 + k))}
          </>
        ) : chemin.map((c, i) => niveau(c, i, i === 1 ? premier : undefined))}
      </ol>
    </nav>
  );
}
