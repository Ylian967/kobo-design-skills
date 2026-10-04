// kobo-studio — Notification (React). Mêmes classes et même comportement que notification.css / notification.js.
// <ZoneNotifications> se place une fois, à la racine ; useNotifications() donne notifier() et fermer().
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Icone } from '../Icone.jsx';

const TYPES = {
  info: { mot: 'Information', icone: 'info' },
  success: { mot: 'Succès', icone: 'succes' },
  warning: { mot: 'Attention', icone: 'attention' },
  error: { mot: 'Erreur', icone: 'erreur' },
};
// Lit une durée du contrat (« 6s », « 200ms ») sur un élément, en millisecondes
const role = (noeud, nom) => {
  const v = getComputedStyle(noeud).getPropertyValue(nom).trim(); const n = parseFloat(v);
  return Number.isNaN(n) ? 0 : (v.endsWith('ms') ? n : n * 1000);
};
const Contexte = createContext(null);
export const useNotifications = () => useContext(Contexte);

// Une notification : icône + mot de l'état + titre. Le compte à rebours s'arrête au survol et au focus.
function Notification({ n, surFermer }) {
  const t = TYPES[n.type] || TYPES.info;
  const ref = useRef(null);
  const minuteur = useRef(0);
  const armer = useCallback(() => {
    clearTimeout(minuteur.current);
    // une erreur reste jusqu'à fermeture ; sinon la durée vient du rôle --k-dur-toast de la fiche
    const duree = n.type === 'error' ? 0 : (n.duree ?? (ref.current ? role(ref.current, '--k-dur-toast') : 0));
    if (duree > 0) minuteur.current = setTimeout(() => surFermer(n.id), duree);
  }, [n.type, n.duree, n.id, surFermer]);
  const suspendre = () => clearTimeout(minuteur.current);
  useEffect(() => { armer(); return suspendre; }, [armer]);

  return (
    <div
      ref={ref} className={`k-toast k-toast--${TYPES[n.type] ? n.type : 'info'}`}
      onMouseEnter={suspendre} onMouseLeave={armer} onFocus={suspendre} onBlur={armer}
      onKeyDown={(e) => { if (e.key === 'Escape') { e.stopPropagation(); surFermer(n.id); } }}
    >
      <Icone nom={t.icone} className="k-toast__icon" />
      <div>
        <p className="k-toast__title"><span className="k-sr-only">{t.mot} : </span>{n.titre || t.mot}</p>
        {n.texte && <p className="k-toast__text">{n.texte}</p>}
        {n.action && (
          <button type="button" className="k-btn k-btn--secondary k-toast__action" onClick={() => { n.action.surClic?.(); surFermer(n.id); }}>
            {n.action.libelle}
          </button>
        )}
      </div>
      <button type="button" className="k-toast__close" aria-label={`Fermer la notification : ${n.titre || t.mot}`} onClick={() => surFermer(n.id)}>
        <Icone nom="fermer" />
      </button>
    </div>
  );
}

export function ZoneNotifications({ children }) {
  const [liste, setListe] = useState([]);
  const compteur = useRef(0);
  const fermer = useCallback((id) => setListe((l) => l.filter((n) => n.id !== id)), []);
  const notifier = useCallback((n) => { const id = ++compteur.current; setListe((l) => [...l, { ...n, id }]); return id; }, []);
  const zone = (mode, filtre) => (
    <div className="k-toasts__live" aria-live={mode} aria-atomic="false">
      {liste.filter(filtre).map((n) => <Notification key={n.id} n={n} surFermer={fermer} />)}
    </div>
  );
  return (
    <Contexte.Provider value={{ notifier, fermer }}>
      {children}
      <div className="k-toasts" role="region" aria-label="Notifications">
        {zone('polite', (n) => n.type !== 'error')}
        {zone('assertive', (n) => n.type === 'error')}
      </div>
    </Contexte.Provider>
  );
}
