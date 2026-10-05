// kobo-studio — EtatVide (React). Mêmes classes que etat-vide.css.
import React from 'react';
import { Icone } from '../Icone.jsx';

/**
 * titre : ce qui se passe, en une phrase (« Aucune réservation ce mois-ci »)
 * children : pourquoi, et quoi faire
 * actions : boutons (au plus deux)
 * icone : nom d'icône ('vide', 'recherche', 'erreur')
 * variante : 'plain' | 'center' | 'error' (échec de chargement : role="alert")
 * niveau : balise du titre ('h3' par défaut)
 */
export function EtatVide({ titre, actions, icone = 'vide', variante, niveau: Titre = 'h3', children }) {
  const erreur = variante === 'error';
  return (
    <div className={`k-empty ${variante ? `k-empty--${variante}` : ''}`.trim()} role={erreur ? 'alert' : undefined}>
      <Icone nom={erreur ? 'erreur' : icone} className="k-empty__icon" />
      <Titre className="k-empty__title">{titre}</Titre>
      {children && <p className="k-empty__text">{children}</p>}
      {actions && <div className="k-empty__actions">{actions}</div>}
    </div>
  );
}
