// kobo-studio — BarreNav (React). Mêmes classes et même comportement que barre-nav.css / barre-nav.js :
// pas de point de rupture, la barre mesure si ses liens tiennent et, sinon, les replie derrière le bouton de menu.
import React, { useLayoutEffect, useRef, useState } from 'react';
import { Icone } from '../Icone.jsx';

/**
 * marque : { libelle, href }
 * liens : [{ libelle, href, courant }] — courant pose aria-current="page"
 * actions : contenu à droite (boutons) ; ce qui porte la classe k-nav__extra est caché quand la barre est repliée
 * menuOuvert, surOuvrirMenu, idMenu : pilotage du MenuMobile associé
 * collante : barre fixée en haut de page
 */
export function BarreNav({ marque, liens = [], actions, menuOuvert = false, surOuvrirMenu, idMenu, collante = false, libelle = 'Navigation principale', className = '' }) {
  const ref = useRef(null);
  const [repliee, setRepliee] = useState(false);

  useLayoutEffect(() => {
    const nav = ref.current;
    if (!nav) return undefined;
    let attente = 0;
    const mesurer = () => {
      nav.removeAttribute('data-k-collapsed');                 // on mesure la barre dépliée
      const deborde = nav.scrollWidth > nav.clientWidth + 1;
      if (deborde) nav.setAttribute('data-k-collapsed', '');
      setRepliee(deborde);
    };
    const planifier = () => { cancelAnimationFrame(attente); attente = requestAnimationFrame(mesurer); };
    const observateur = new ResizeObserver(planifier);
    observateur.observe(nav.parentElement || nav);
    document.fonts?.ready.then(planifier);
    mesurer();
    return () => { observateur.disconnect(); cancelAnimationFrame(attente); };
  }, [liens.length]);

  return (
    <header
      ref={ref} className={`k-nav ${collante ? 'k-nav--sticky' : ''} ${className}`.trim()}
      data-k-ready="" data-k-collapsed={repliee ? '' : undefined}
    >
      <a className="k-nav__brand" href={marque.href}>{marque.libelle}</a>
      <nav aria-label={libelle}>
        <ul className="k-nav__list">
          {liens.map((l) => (
            <li key={l.href}><a className="k-nav__link" href={l.href} aria-current={l.courant ? 'page' : undefined}>{l.libelle}</a></li>
          ))}
        </ul>
      </nav>
      <div className="k-nav__actions">
        {actions}
        <button
          type="button" className="k-btn k-btn--secondary k-nav__burger"
          aria-expanded={menuOuvert} aria-controls={idMenu} onClick={surOuvrirMenu}
        >
          <Icone nom="menu" />Menu
        </button>
      </div>
    </header>
  );
}
