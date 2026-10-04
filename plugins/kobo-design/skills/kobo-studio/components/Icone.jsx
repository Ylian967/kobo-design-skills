// kobo-studio — icônes au trait partagées par les composants React.
// Décoratives par défaut (aria-hidden) : le sens est toujours porté par un texte voisin.
import React from 'react';

export const TRACES = {
  info: 'M12 16v-5M12 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  succes: 'M8 12.5l2.5 2.5L16 9.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  attention: 'M12 9v4M12 17h.01M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z',
  erreur: 'M15 9l-6 6M9 9l6 6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  fermer: 'M6 6l12 12M18 6 6 18',
  menu: 'M4 7h16M4 12h16M4 17h16',
  coche: 'M5 12.5l4.5 4.5L19 7.5',
  vide: 'M3 13l3-8h12l3 8M3 13v6h18v-6M3 13h5l1.5 3h5L16 13h5',
  recherche: 'M20 20l-4.5-4.5M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z',
};

export function Icone({ nom, className = '' }) {
  return (
    <svg className={`k-icon ${className}`.trim()} viewBox="0 0 24 24" aria-hidden="true">
      <path d={TRACES[nom] || nom} />
    </svg>
  );
}
