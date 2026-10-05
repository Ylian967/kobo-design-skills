// kobo-studio — Interrupteur (React). Mêmes classes et même comportement que interrupteur.css / interrupteur.js.
import React, { useState } from 'react';

/**
 * libelle : ce que le réglage commande (obligatoire)
 * actif, surChangement : mode piloté ; sinon parDefaut. surChangement peut rendre une promesse : l'interrupteur attend sa réponse
 * (aria-busy) et ne bascule que si elle aboutit.
 * mots : { oui, non, attente } — les mots d'état affichés ; desactive ; enLigne : libellé à gauche, glissière à droite
 */
export function Interrupteur({ libelle, actif, surChangement, parDefaut = false, mots = {}, desactive, enLigne, decritPar }) {
  const [interne, setInterne] = useState(parDefaut);
  const [attente, setAttente] = useState(false);
  const courant = actif ?? interne;
  const basculer = async () => {
    if (attente) return;
    const suivant = !courant, retour = surChangement?.(suivant);
    if (retour && typeof retour.then === 'function') {
      setAttente(true);
      try { await retour; setInterne(suivant); } catch { /* l'état reste ; l'appelant écrit l'erreur */ } finally { setAttente(false); }
    } else setInterne(suivant);
  };
  return (
    <button type="button" role="switch" className={`k-switch${enLigne ? ' k-switch--row' : ''}`} aria-checked={courant} aria-busy={attente || undefined}
      disabled={desactive} aria-describedby={decritPar} onClick={basculer}>
      <span className="k-switch__track" aria-hidden="true"><span className="k-switch__thumb" /></span>
      <span className="k-switch__label">{libelle}</span>
      <span className="k-switch__state" aria-hidden="true" data-on={mots.oui || 'Activé'} data-off={mots.non || 'Désactivé'} data-busy={mots.attente || 'Enregistrement…'} />
    </button>
  );
}
