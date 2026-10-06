// Fenêtre de confirmation d'une annulation : elle redit le jour et l'heure ; le focus part sur « Garder ma table ».
import React, { useRef } from 'react';
import { Modale } from '../kobo/kobo-studio/components/modale/Modale.jsx';
import { Bouton } from '../kobo/kobo-studio/components/bouton/Bouton.jsx';
import { Icone } from '../kobo/kobo-studio/components/Icone.jsx';
import { resume } from './regles.js';

/** reservation : celle qu'on s'apprête à annuler, ou null (fenêtre fermée) ; surGarder() ; surAnnuler(reservation) */
export function Annulation({ reservation, surGarder, surAnnuler }) {
  const derniere = useRef(null);
  if (reservation) derniere.current = reservation; // le texte reste lisible pendant que la fenêtre se referme
  const r = derniere.current;
  return (
    <Modale ouverte={!!reservation} surFermer={() => { if (reservation) surGarder(); }} titre="Annuler cette réservation ?" alerte
      pied={<>
        <Bouton variante="secondary" data-k-autofocus onClick={surGarder}>Garder ma table</Bouton>
        <Bouton variante="danger" onClick={() => surAnnuler(r)}><Icone nom="fermer" />Oui, annuler</Bouton>
      </>}>
      {r && <p>Votre table du {resume(r)}, au nom de {r.nom}, sera rendue. Vous pourrez réserver à nouveau si vous changez d’avis.</p>}
    </Modale>
  );
}
