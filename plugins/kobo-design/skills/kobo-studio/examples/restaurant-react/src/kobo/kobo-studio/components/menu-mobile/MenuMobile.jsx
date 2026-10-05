// kobo-studio — MenuMobile (React). Mêmes classes et même comportement que menu-mobile.css / menu-mobile.js.
// Le <dialog> natif fournit le piège du focus et la touche Échap ; le focus revient au bouton d'ouverture.
import React, { useEffect, useRef } from 'react';
import { Icone } from '../Icone.jsx';

/**
 * ouvert, surFermer : état piloté par le parent
 * id : identifiant référencé par aria-controls du bouton d'ouverture
 * titre : nom accessible du menu (affiché en tête)
 * liens : [{ libelle, href, courant }]
 * pied : actions en bas du menu
 */
export function MenuMobile({ ouvert, surFermer, id, titre = 'Menu', liens = [], pied }) {
  const ref = useRef(null);
  const declencheur = useRef(null);

  useEffect(() => {
    const menu = ref.current;
    if (!menu) return;
    if (ouvert && !menu.open) {
      declencheur.current = document.activeElement;   // pour rendre le focus à la fermeture
      menu.showModal();
    } else if (!ouvert && menu.open) {
      menu.close();
    }
  }, [ouvert]);

  const fermeture = () => {
    surFermer?.();
    const d = declencheur.current;
    if (d && d.isConnected && d.offsetParent !== null) d.focus();
  };

  return (
    <dialog ref={ref} id={id} className="k-menu" aria-labelledby={`${id}-titre`} onClose={fermeture}>
      <div className="k-menu__head">
        <h2 className="k-menu__title" id={`${id}-titre`}>{titre}</h2>
        <button type="button" className="k-btn k-btn--secondary" onClick={() => ref.current?.close()}>
          <Icone nom="fermer" />Fermer
        </button>
      </div>
      <nav aria-label={titre}>
        <ul className="k-menu__list">
          {liens.map((l) => (
            <li key={l.href}>
              <a className="k-menu__link" href={l.href} aria-current={l.courant ? 'page' : undefined} onClick={() => ref.current?.close()}>
                {l.libelle}
                {l.courant && <span className="k-menu__here">page actuelle</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {pied && <div className="k-menu__foot">{pied}</div>}
    </dialog>
  );
}
