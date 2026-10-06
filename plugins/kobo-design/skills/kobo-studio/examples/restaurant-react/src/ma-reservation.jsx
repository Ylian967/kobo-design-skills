import { Numero } from './Appel.jsx';
import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { emplacements, useMouvement } from './styles-reservation.js';
import { Bouton } from './kobo/kobo-studio/components/bouton/Bouton.jsx';
import { EtatVide } from './kobo/kobo-studio/components/etat-vide/EtatVide.jsx';
import { Icone } from './kobo/kobo-studio/components/Icone.jsx';
import { ZoneNotifications, useNotifications } from './kobo/kobo-studio/components/notification/Notification.jsx';
import { Page, Emplacement, FilAriane, Faits, Finale } from './kobo/kobo-studio/ux/structures/Page.jsx';
import { Annulation } from './reservation/Annulation.jsx';
import { DEMONSTRATION, faitsDe } from './reservation/Confirmation.jsx';
import { resume } from './reservation/regles.js';
import { aVenir, retirer } from './reservation/carnet.js';
import { page, suite, PAGES, TELEPHONE, QUAND_APPELER, RESERVER } from './site.js';

const majuscule = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function MaReservation() {
  useMouvement();
  const gab = emplacements();
  const { notifier } = useNotifications();
  const [liste, setListe] = useState(() => aVenir(new Date()));
  const [aAnnuler, setAAnnuler] = useState(null);
  const titre = useRef(null);
  const [retour, setRetour] = useState(0);
  // Après une annulation, le bouton « Annuler » a disparu : le focus revient au titre de la page.
  useEffect(() => { if (retour) titre.current?.focus(); }, [retour]);

  const annuler = (r) => {
    retirer(r.reference);
    setAAnnuler(null); setListe(aVenir(new Date())); setRetour((n) => n + 1);
    notifier({ type: 'info', titre: 'Réservation annulée', texte: `La table du ${resume(r)} est rendue. Vous pouvez réserver à nouveau.` });
  };

  const hero = {
    title: <h1 className="k-h1" id="titre" tabIndex={-1} ref={titre}>Ma réservation</h1>,
    lead: <p className="k-lead">Les tables réservées depuis cet appareil.</p>,
  };
  return (
    <Page {...page('ma-reservation')} emplacements={gab}>
      <Emplacement nom="hero" comme="section" gabarits={gab} parts={hero} className="sv-inner-hero" aria-labelledby="titre">
        <div className="k-wrap k-stack">
          <FilAriane chemin={[{ libelle: 'Accueil', href: PAGES.accueil }, { libelle: 'Ma réservation' }]} />
          {hero.title}{hero.lead}
        </div>
      </Emplacement>

      <section className="k-section k-section--tight k-section--rule" aria-label="Mes tables réservées">
        <div className="k-wrap k-wrap--text k-stack k-stack--lg">
          {liste.length === 0 && (
            <EtatVide niveau="h2" titre="Aucune réservation enregistrée sur cet appareil" actions={<Bouton href={RESERVER.href}>{RESERVER.libelle}</Bouton>}>
              Une table réservée depuis un autre téléphone ou un autre ordinateur n’apparaît pas ici : pour l’annuler, appelez le <Numero />. {QUAND_APPELER}
            </EtatVide>
          )}
          {liste.map((r) => (
            <article key={r.reference} className="k-stack" aria-labelledby={`t-${r.reference}`}>
              <h2 className="k-h2" id={`t-${r.reference}`}>{majuscule(resume(r))}</h2>
              <Faits faits={[...faitsDe(r).slice(3), { terme: 'Téléphone', valeur: r.telephone }, ...(r.message ? [{ terme: 'Votre mot', valeur: r.message }] : [])]} />
              <div className="co-rangee">
                <Bouton variante="danger" onClick={() => setAAnnuler(r)} aria-label={`Annuler la table du ${resume(r)}`}><Icone nom="fermer" />Annuler</Bouton>
              </div>
            </article>
          ))}
          {liste.length > 0 && <p className="k-note">L’annulation est libre : on vous demande juste de prévenir. Pour changer le jour, l’heure ou le nombre de personnes : annulez, puis réservez à nouveau. {DEMONSTRATION}</p>}
        </div>
      </section>

      <Finale {...suite} />
      <Annulation reservation={aAnnuler} surGarder={() => setAAnnuler(null)} surAnnuler={annuler} />
    </Page>
  );
}

createRoot(document.getElementById('root')).render(<ZoneNotifications><MaReservation /></ZoneNotifications>);
