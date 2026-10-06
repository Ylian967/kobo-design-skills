import { BoutonAppel } from './Appel.jsx';
import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { emplacements, useMouvement } from './styles-reservation.js';
import { Bouton } from './kobo/kobo-studio/components/bouton/Bouton.jsx';
import { Selection } from './kobo/kobo-studio/components/selection/Selection.jsx';
import { ZoneNotifications, useNotifications } from './kobo/kobo-studio/components/notification/Notification.jsx';
import { Page, Emplacement, FilAriane, Collant } from './kobo/kobo-studio/ux/structures/Page.jsx';
import { ChoixTable } from './reservation/ChoixTable.jsx';
import { Demande } from './reservation/Demande.jsx';
import { Confirmation } from './reservation/Confirmation.jsx';
import { Annulation } from './reservation/Annulation.jsx';
import { MAX_PERSONNES, personnes, resume } from './reservation/regles.js';
import { ajouter, retirer } from './reservation/carnet.js';
import { page, PAGES, TELEPHONE, QUAND_APPELER } from './site.js';

const NOMBRES = Array.from({ length: MAX_PERSONNES }, (_, i) => ({ valeur: String(i + 1), libelle: personnes(i + 1) }));
const ATTENTE_SIMULEE = 600; // millisecondes : l'envoi est simulé (voir reservation/carnet.js)

function Reserver() {
  useMouvement();
  const gab = emplacements();
  const { notifier, fermer } = useNotifications();
  const erreurAffichee = useRef(0); // une notification d'erreur reste affichée : on la ferme quand l'envoi réussit ensuite
  const [maintenant, setMaintenant] = useState(() => new Date());
  const [nb, setNb] = useState(2);
  const [choix, setChoix] = useState(null);
  const [enCours, setEnCours] = useState(false);
  const [faite, setFaite] = useState(null);
  const [aAnnuler, setAAnnuler] = useState(null);
  const titre = useRef(null);
  const [retour, setRetour] = useState(0);
  useEffect(() => { if (retour) titre.current?.focus(); }, [retour]);

  const envoyer = (coordonnees) => {
    setEnCours(true);
    window.setTimeout(() => {
      const resultat = ajouter({ ...choix, personnes: nb, ...coordonnees });
      setEnCours(false);
      setMaintenant(new Date());
      if (resultat.erreur === 'complet') {
        setChoix(null);
        erreurAffichee.current = notifier({ type: 'error', titre: 'Ce service vient de se remplir', texte: 'Vos coordonnées sont gardées. Choisissez une autre heure ou un autre jour.' });
      } else if (resultat.erreur) {
        erreurAffichee.current = notifier({ type: 'error', titre: 'La réservation n’a pas pu être enregistrée', texte: `Vos réponses sont gardées. Réessayez, ou appelez le ${TELEPHONE.libelle} en dehors du service.` });
      } else {
        if (erreurAffichee.current) fermer(erreurAffichee.current);
        setFaite(resultat.reservation);
        notifier({ type: 'success', titre: 'Table réservée', texte: `${resume(resultat.reservation)}.` });
      }
    }, ATTENTE_SIMULEE);
  };
  const annuler = (r) => {
    retirer(r.reference);
    setAAnnuler(null); setFaite(null); setChoix(null); setRetour((n) => n + 1);
    notifier({ type: 'info', titre: 'Réservation annulée', texte: 'La table est rendue. Vous pouvez réserver à nouveau.' });
  };

  const hero = {
    title: <h1 className="k-h1" id="titre" tabIndex={-1} ref={titre}>Réserver une table</h1>,
    lead: <p className="k-lead">De 1 à 6 personnes, du mardi au samedi, jusqu’à 30 jours à l’avance. Sans compte.</p>,
  };
  return (
    <Page {...page('reserver')} emplacements={gab}>
      <Emplacement nom="hero" comme="section" gabarits={gab} parts={hero} className="sv-inner-hero" aria-labelledby="titre">
        <div className="k-wrap k-stack">
          <FilAriane chemin={[{ libelle: 'Accueil', href: PAGES.accueil }, { libelle: 'Réserver une table' }]} />
          {hero.title}{hero.lead}
        </div>
      </Emplacement>

      {faite ? <Confirmation reservation={faite} surAnnuler={() => setAAnnuler(faite)} /> : (
        <section className="k-section k-section--tight k-section--rule">
          <div className="k-wrap k-split">
            <div className="k-split__main k-stack k-stack--lg">
              <h2 className="k-h2" id="t-jour">La table</h2>
              <Selection libelle="Nombre de personnes" options={NOMBRES} valeur={String(nb)}
                surChangement={(v) => { setNb(Number(v)); setChoix(null); }} aide="Plus de 6 personnes : par téléphone." />
              <ChoixTable maintenant={maintenant} nb={nb} choix={choix} surChoix={setChoix} />
              <h2 className="k-h2" id="t-coordonnees">Vos coordonnées</h2>
              <Demande choix={choix} nb={nb} enCours={enCours} surEnvoi={envoyer} />
            </div>
            <Collant comme="aside" className="k-stack sv-aside" aria-labelledby="t-telephone">
              <h2 className="k-h3" id="t-telephone">Par téléphone</h2>
              <p>Pour une table de plus de 6 personnes, ou pour le jour même quand la réservation en ligne est fermée.</p>
              <p>{QUAND_APPELER}</p>
              <BoutonAppel bloc />
            </Collant>
          </div>
        </section>
      )}
      <Annulation reservation={aAnnuler} surGarder={() => setAAnnuler(null)} surAnnuler={annuler} />
    </Page>
  );
}

createRoot(document.getElementById('root')).render(<ZoneNotifications><Reserver /></ZoneNotifications>);
