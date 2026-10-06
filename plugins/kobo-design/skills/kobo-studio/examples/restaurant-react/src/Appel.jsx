import React from 'react';
import { Bouton } from './kobo/kobo-studio/components/bouton/Bouton.jsx';
import { TELEPHONE, AU_DOIGT } from './site.js';

// Appeler n'a de sens que sur un téléphone : au doigt, un lien tel: ; sur ordinateur, le numéro écrit, sans lien mort.
export function BoutonAppel({ bloc = false }) {
  if (!AU_DOIGT) return <strong>Par téléphone : {TELEPHONE.libelle}</strong>;
  return <Bouton href={TELEPHONE.href} variante="secondary" bloc={bloc}>Appeler le {TELEPHONE.libelle}</Bouton>;
}

export function Numero() {
  return AU_DOIGT ? <a className="k-link" href={TELEPHONE.href}>{TELEPHONE.libelle}</a> : <strong>{TELEPHONE.libelle}</strong>;
}
