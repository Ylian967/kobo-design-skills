// Le formulaire : nom, téléphone, message facultatif. Validation à la sortie du champ et à l'envoi (ux/patterns/formulaire.md).
import React, { useEffect, useRef, useState } from 'react';
import { Champ } from '../kobo/kobo-studio/components/champ/Champ.jsx';
import { Bouton } from '../kobo/kobo-studio/components/bouton/Bouton.jsx';
import { resume } from './regles.js';

const CONTROLES = {
  nom: (v) => (v.trim() ? '' : 'Écrivez le nom auquel garder la table.'),
  telephone: (v) => {
    if (!v.trim()) return 'Écrivez un numéro de téléphone : Karim s’en sert seulement en cas d’imprévu.';
    return /^\+?\d{9,15}$/.test(v.replace(/[\s.\-()]/g, '')) ? '' : 'Numéro incomplet : il faut au moins 10 chiffres, par exemple 06 12 34 56 78.';
  },
};

/** choix : { jour, service, heure } ou null ; nb : personnes ; enCours ; surEnvoi({ nom, telephone, message }) */
export function Demande({ choix, nb, enCours, surEnvoi }) {
  const [valeurs, setValeurs] = useState({ nom: '', telephone: '', message: '' });
  const [erreurs, setErreurs] = useState({});
  const [aFocaliser, setAFocaliser] = useState(0);
  const formulaire = useRef(null);

  // À l'envoi, le focus va au premier champ en erreur (une fois le message rendu)
  useEffect(() => {
    if (aFocaliser) formulaire.current?.querySelector('[aria-invalid="true"]')?.focus();
  }, [aFocaliser]);

  const champ = (nom) => ({
    name: nom, value: valeurs[nom], erreur: erreurs[nom], valider: false,
    onChange: (e) => {
      const v = e.target.value;
      setValeurs((x) => ({ ...x, [nom]: v }));
      if (erreurs[nom]) setErreurs((x) => ({ ...x, [nom]: CONTROLES[nom](v) }));
    },
    onBlur: (e) => { if (CONTROLES[nom]) { const v = e.target.value; setErreurs((x) => ({ ...x, [nom]: CONTROLES[nom](v) })); } },
  });

  const envoyer = (e) => {
    e.preventDefault();
    if (enCours || !choix) return;
    const trouvees = { nom: CONTROLES.nom(valeurs.nom), telephone: CONTROLES.telephone(valeurs.telephone) };
    setErreurs(trouvees);
    if (trouvees.nom || trouvees.telephone) { setAFocaliser((n) => n + 1); return; }
    surEnvoi({ nom: valeurs.nom.trim(), telephone: valeurs.telephone.trim(), message: valeurs.message.trim() });
  };

  return (
    <form ref={formulaire} className="k-stack k-stack--lg" noValidate onSubmit={envoyer} aria-labelledby="t-coordonnees">
      <Champ libelle="Nom" autoComplete="name" required {...champ('nom')} />
      <Champ libelle="Téléphone" type="tel" inputMode="tel" autoComplete="tel" required aide="Seulement en cas d’imprévu de notre côté." {...champ('telephone')} />
      <Champ libelle="Un mot pour nous" facultatif multiligne rows={3} maxLength={280} aide="Allergie, poussette, anniversaire…" {...champ('message')} />
      <p role="status" id="table-choisie">
        {choix ? <>Table choisie : <strong>{resume({ ...choix, personnes: nb })}</strong>.</> : <>Aucune heure choisie pour l’instant. <a className="k-link" href="#t-jour">Choisissez d’abord un jour et une heure</a></>}
      </p>
      <div>
        <Bouton type="submit" enCours={enCours} libelleEnCours="Envoi en cours…" aria-disabled={!choix || undefined} aria-describedby="table-choisie">Réserver cette table</Bouton>
      </div>
    </form>
  );
}
