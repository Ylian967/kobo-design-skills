// kobo-studio — Modale (React). Mêmes classes et même comportement que modale.css / modale.js.
// Le <dialog> natif fournit le piège du focus et la touche Échap ; le focus revient au déclencheur.
import React, { useEffect, useId, useRef } from 'react';
import { Icone } from '../Icone.jsx';

/**
 * ouverte, surFermer(valeur) : état piloté par le parent ; valeur = returnValue du dialog
 * titre : nom accessible (obligatoire)
 * pied : boutons d'action ; poser data-k-autofocus sur l'action la moins risquée : elle reçoit le focus à l'ouverture
 *        (autoFocus ne suffit pas : React ne le rejoue pas quand la fenêtre se rouvre)
 * alerte : role="alertdialog" (confirmation) — le clic sur le voile ne ferme alors jamais
 * fermableParLeVoile : un clic hors de la modale la ferme
 * large : variante k-modal--wide
 */
export function Modale({ ouverte, surFermer, titre, pied, alerte = false, fermableParLeVoile = false, large = false, children }) {
  const id = useId();
  const ref = useRef(null);
  const declencheur = useRef(null);

  useEffect(() => {
    const modale = ref.current;
    if (!modale) return;
    if (ouverte && !modale.open) {
      declencheur.current = document.activeElement;
      modale.returnValue = '';
      modale.showModal();
      // React ne rend pas l'attribut autofocus : l'action à viser au départ porte data-k-autofocus
      modale.querySelector('[data-k-autofocus]')?.focus();
    } else if (!ouverte && modale.open) {
      modale.close();
    }
  }, [ouverte]);

  const fermeture = () => {
    surFermer?.(ref.current?.returnValue || '');
    const d = declencheur.current;
    if (d && d.isConnected) d.focus();
  };
  const clicVoile = (e) => {
    if (!fermableParLeVoile || alerte || e.target !== ref.current) return;
    const r = ref.current.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) ref.current.close();
  };

  return (
    <dialog
      ref={ref} className={`k-modal ${large ? 'k-modal--wide' : ''}`.trim()} role={alerte ? 'alertdialog' : undefined}
      aria-labelledby={`${id}-titre`} aria-describedby={`${id}-corps`} onClose={fermeture} onClick={clicVoile}
    >
      <div className="k-modal__head">
        <h2 className="k-modal__title" id={`${id}-titre`}>{titre}</h2>
        {!alerte && (
          <button type="button" className="k-btn k-btn--secondary k-btn--icon" aria-label="Fermer la fenêtre" onClick={() => ref.current?.close()}>
            <Icone nom="fermer" />
          </button>
        )}
      </div>
      <div className="k-modal__body" id={`${id}-corps`}>{children}</div>
      {pied && <div className="k-modal__foot">{pied}</div>}
    </dialog>
  );
}
