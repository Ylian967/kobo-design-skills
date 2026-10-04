// kobo-studio — Chargement (React) : squelette et barre de progression. Mêmes classes que chargement.css.
import React from 'react';
import { Icone } from '../Icone.jsx';

/** forme : 'text' (défaut) | 'title' | 'short' | 'medium' | 'media' | 'circle' */
export function Squelette({ forme = 'text' }) {
  return <span className={`k-skeleton ${forme !== 'text' ? `k-skeleton--${forme}` : ''}`.trim()} aria-hidden="true" />;
}

/** Zone en attente : annonce le chargement aux lecteurs d'écran, puis affiche le contenu. */
export function ZoneEnChargement({ enCours, annonce = 'Chargement en cours…', squelette, children }) {
  return (
    <div aria-busy={enCours}>
      {enCours ? (<><span className="k-sr-only" role="status">{annonce}</span>{squelette}</>) : children}
    </div>
  );
}

/**
 * libelle : ce qui progresse (obligatoire)
 * valeur : entre 0 et 1 ; undefined = durée inconnue (barre qui va et vient)
 * echec : message d'échec ; affiche l'icône et le texte d'erreur
 */
export function BarreProgression({ libelle, valeur, echec }) {
  const inconnue = valeur === undefined;
  const pct = inconnue ? null : Math.round(Math.max(0, Math.min(1, valeur)) * 100);
  const etat = echec ? 'error' : pct === 100 ? 'done' : undefined;
  return (
    <div className={`k-progress ${inconnue ? 'k-progress--indeterminate' : ''}`.trim()} data-k-state={etat}>
      <div className="k-progress__head">
        <span>{libelle}</span>
        <span className="k-progress__value">{inconnue ? 'en cours…' : `${pct} %`}</span>
      </div>
      <div
        className="k-progress__track" role="progressbar" aria-label={libelle}
        aria-valuemin={0} aria-valuemax={100} aria-valuenow={inconnue ? undefined : pct} aria-valuetext={inconnue ? 'en cours' : `${pct} %`}
      >
        <div className="k-progress__bar" style={{ '--_value': inconnue ? undefined : pct / 100 }} />
      </div>
      <p className="k-progress__status k-progress__status--done" role="status"><Icone nom="coche" /><span>Terminé.</span></p>
      <p className="k-progress__status k-progress__status--error" role="alert"><Icone nom="erreur" /><span>{echec}</span></p>
    </div>
  );
}
