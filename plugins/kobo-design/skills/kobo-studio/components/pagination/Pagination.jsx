// kobo-studio — Pagination (React). Mêmes classes que pagination.css ; même calcul des numéros que pagination.js.
import React, { useEffect, useRef, useState } from 'react';
import { Bouton } from '../bouton/Bouton.jsx';

/** Numéros à afficher : premier, dernier, voisins de la page courante ; 0 tient la place d'un « … ». */
export function numeros(page, total) {
  const garde = [...new Set([1, total, page - 1, page, page + 1].filter((p) => p >= 1 && p <= total))].sort((a, b) => a - b);
  return garde.flatMap((p, i) => (i && p - garde[i - 1] > 1 ? [p - garde[i - 1] === 2 ? p - 1 : 0, p] : [p]));
}

/**
 * page, total, surChangement(page) : pagination pilotée (boutons). Avec href(page) → adresse, les numéros sont des liens.
 * libelle : nom accessible de la navigation (obligatoire : « Pages des sorties ») ; mots : { precedent, suivant }
 * compacte : seulement Précédent, « Page 3 sur 12 », Suivant ; sinon elle se replie seule quand les numéros ne tiennent pas
 */
export function Pagination({ page, total, surChangement, href, libelle, mots = {}, compacte }) {
  const ref = useRef(null);
  const [etroite, setEtroite] = useState(false);
  useEffect(() => {
    const nav = ref.current;
    if (!nav || compacte || !('ResizeObserver' in window)) return undefined;
    const mesurer = () => {
      nav.classList.remove('k-pagination--compact');
      const pas = nav.querySelector('.k-pagination__step');
      const serre = nav.scrollWidth > nav.clientWidth + 1 || !!(pas && nav.offsetHeight > pas.offsetHeight * 2.2);
      nav.classList.toggle('k-pagination--compact', serre);   // la classe retirée pour mesurer est remise : React ne la reposerait pas si l'état ne change pas
      setEtroite(serre);
    };
    document.fonts?.ready.then(() => { if (nav.isConnected) mesurer(); });   // les polices changent la largeur des numéros
    const obs = new ResizeObserver(mesurer);
    obs.observe(nav.parentElement || nav);
    return () => obs.disconnect();
  }, [compacte, total, page]);
  const aller = (p) => (e) => { if (!href) { e.preventDefault(); } if (p >= 1 && p <= total && p !== page) surChangement?.(p); };
  const pas = (texte, p, off) => (
    <Bouton variante="secondary" className="k-pagination__step" href={href && !off ? href(p) : undefined} aria-disabled={off || undefined} onClick={off ? (e) => e.preventDefault() : aller(p)}>{texte}</Bouton>
  );
  return (
    <nav className={`k-pagination${compacte || etroite ? ' k-pagination--compact' : ''}`} aria-label={libelle} ref={ref}>
      {pas(mots.precedent || 'Précédent', page - 1, page <= 1)}
      <ol className="k-pagination__list">
        {numeros(page, total).map((p, i) => (
          <li key={p || `trou-${i}`}>
            {!p ? <span className="k-pagination__gap" aria-hidden="true">…</span>
              : href ? <a className="k-pagination__page" href={href(p)} aria-current={p === page ? 'page' : undefined} onClick={surChangement ? aller(p) : undefined}><span className="k-sr-only">Page </span>{p}</a>
                : <button type="button" className="k-pagination__page" aria-current={p === page ? 'page' : undefined} onClick={aller(p)}><span className="k-sr-only">Page </span>{p}</button>}
          </li>
        ))}
      </ol>
      {pas(mots.suivant || 'Suivant', page + 1, page >= total)}
      <p className="k-pagination__status" role="status">Page {page} sur {total}</p>
    </nav>
  );
}
