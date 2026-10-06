// État de succès de la réservation, dans la page : ce qui est réservé, ce qui se passe ensuite, comment annuler.
import React, { useEffect, useRef } from 'react';
import { Bouton } from '../kobo/kobo-studio/components/bouton/Bouton.jsx';
import { Icone } from '../kobo/kobo-studio/components/Icone.jsx';
import { Faits } from '../kobo/kobo-studio/ux/structures/Page.jsx';
import { jourLong, heureLisible, personnes } from './regles.js';
import { PAGES } from '../site.js';

export const DEMONSTRATION = 'Démonstration : cette réservation n’est pas encore transmise au restaurant.';

export const faitsDe = (r) => [
  { terme: 'Jour', valeur: jourLong(r.jour) },
  { terme: 'Heure d’arrivée', valeur: heureLisible(r.heure) },
  { terme: 'Table pour', valeur: personnes(r.personnes) },
  { terme: 'Au nom de', valeur: r.nom },
  { terme: 'Référence', valeur: r.reference },
];

/** reservation : celle qui vient d'être enregistrée ; surAnnuler() ouvre la fenêtre de confirmation */
export function Confirmation({ reservation, surAnnuler }) {
  const titre = useRef(null);
  useEffect(() => { titre.current?.focus(); }, []);
  return (
    <section className="k-section k-section--tight" aria-labelledby="t-fait">
      <div className="k-wrap k-wrap--text k-stack k-stack--lg">
        <h2 className="k-h2" id="t-fait" tabIndex={-1} ref={titre}>C’est réservé</h2>
        <Faits faits={faitsDe(reservation)} />
        <p>Rien d’autre à faire : la table est gardée à votre nom. Un empêchement ? Annulez ici, ou plus tard sur la page « Ma réservation », depuis cet appareil.</p>
        <p className="k-note">{DEMONSTRATION}</p>
        <div className="co-rangee">
          <Bouton href={PAGES.maReservation}>Voir ma réservation</Bouton>
          <Bouton variante="danger" onClick={surAnnuler}><Icone nom="fermer" />Annuler cette réservation</Bouton>
        </div>
      </div>
    </section>
  );
}
