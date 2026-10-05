// kobo-studio — Info-bulle (React). Mêmes classes et même comportement que info-bulle.css / info-bulle.js.
import React, { cloneElement, useId, useRef, useState } from 'react';

/**
 * texte : le contenu de la bulle — une précision courte, jamais une information indispensable ni un lien
 * children : UN élément focalisable (bouton, lien) ; il reçoit aria-describedby
 * place : 'top' (par défaut, bascule dessous si la place manque) ou 'bottom'
 */
export function InfoBulle({ texte, children, place }) {
  const id = useId();
  const ref = useRef(null);
  const [ferme, setFerme] = useState(false);
  const [bas, setBas] = useState(place === 'bottom');
  const [decalage, setDecalage] = useState(null);
  const montrer = () => {
    setFerme(false);
    const bulle = ref.current?.querySelector('.k-tooltip__bubble');
    if (!bulle) return;
    requestAnimationFrame(() => {
      const r = bulle.getBoundingClientRect(), largeur = document.documentElement.clientWidth, marge = 8;
      if (r.top < 0 && place !== 'top') setBas(true);
      const ecart = r.left < marge ? marge - r.left : r.right > largeur - marge ? largeur - marge - r.right : 0;
      setDecalage(ecart ? `${(ecart / r.width * 100).toFixed(1)}%` : null);
    });
  };
  return (
    <span className="k-tooltip" ref={ref} data-k-place={bas ? 'bottom' : undefined} data-k-dismissed={ferme ? '' : undefined}
      onMouseEnter={montrer} onFocus={montrer} onMouseLeave={() => setFerme(false)} onBlur={() => setFerme(false)}
      onKeyDown={(e) => { if (e.key === 'Escape') { setFerme(true); e.stopPropagation(); } }}>
      {cloneElement(children, { 'aria-describedby': id })}
      <span className="k-tooltip__bubble" role="tooltip" id={id} style={decalage ? { '--_shift': decalage } : undefined}>{texte}</span>
    </span>
  );
}
