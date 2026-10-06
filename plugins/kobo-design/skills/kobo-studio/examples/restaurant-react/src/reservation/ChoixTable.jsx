// Le jour (six prochains jours d'ouverture en rangée, puis « Plus tard ») et les heures d'arrivée de ce jour, midi et soir.
import { Numero } from '../Appel.jsx';
import React, { useState } from 'react';
import { Onglets } from '../kobo/kobo-studio/components/onglets/Onglets.jsx';
import { Selection } from '../kobo/kobo-studio/components/selection/Selection.jsx';
import { Bouton } from '../kobo/kobo-studio/components/bouton/Bouton.jsx';
import { EtatVide } from '../kobo/kobo-studio/components/etat-vide/EtatVide.jsx';
import { Icone } from '../kobo/kobo-studio/components/Icone.jsx';
import { SERVICES, JOURS_EN_RANGEE, cleDe, joursOuverts, jourOuvert, serviceOuvert, jourLong, jourCourt, heureLisible, personnes } from './regles.js';
import { couvertsLibres } from './carnet.js';
import { TELEPHONE } from '../site.js';

const majuscule = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// Les heures d'un service : toujours affichées ; désactivées, avec la raison écrite, quand on ne peut pas réserver.
function Service({ jour, service, maintenant, nb, choix, surChoix }) {
  const ouvert = serviceOuvert(jour, service, maintenant);
  const complet = couvertsLibres(jour, service.id) < nb;
  return (
    <div className="k-stack k-stack--sm">
      <h3 className="k-h3">{service.nom}</h3>
      {!ouvert && <p>Trop tard pour réserver ce service en ligne : appelez le <Numero /> avant le service.</p>}
      {ouvert && complet && <p><strong>Complet</strong> pour {personnes(nb)}. Essayez l’autre service, ou un autre jour.</p>}
      <ul className="co-rangee">
        {service.heures.map((h) => {
          const choisi = choix && choix.jour === jour && choix.heure === h;
          return (
            <li key={h}>
              <Bouton variante="secondary" enfonce={!!choisi} desactive={!ouvert || complet}
                aria-label={`${service.nom}, ${heureLisible(h)}${choisi ? ', choisi' : ''}`}
                onClick={() => surChoix({ jour, service: service.id, heure: h })}>
                {choisi && <Icone nom="coche" />}{heureLisible(h)}
              </Bouton>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Jour({ jour, suivant, surSuivant, ...reste }) {
  if (!jourOuvert(jour, reste.maintenant)) {
    return (
      <EtatVide variante="plain" titre="Plus de table en ligne pour aujourd’hui"
        actions={suivant && <Bouton variante="secondary" onClick={surSuivant}>Voir {jourLong(suivant)}</Bouton>}>
        La réservation en ligne ferme une heure avant le service. Vous pouvez encore appeler le {TELEPHONE.libelle} en dehors du service, ou choisir un autre jour.
      </EtatVide>
    );
  }
  return <div className="k-stack k-stack--lg">{SERVICES.map((s) => <Service key={s.id} jour={jour} service={s} {...reste} />)}</div>;
}

/** maintenant : Date ; nb : nombre de personnes ; choix : { jour, service, heure } ou null ; surChoix(choix) */
export function ChoixTable({ maintenant, nb, choix, surChoix }) {
  const jours = joursOuverts(maintenant);
  const proches = jours.slice(0, JOURS_EN_RANGEE);
  const lointains = jours.slice(JOURS_EN_RANGEE);
  const premier = jours.find((j) => jourOuvert(j, maintenant));
  const [actif, setActif] = useState(proches.includes(premier) ? premier : proches[0]);
  const [plusTard, setPlusTard] = useState('');
  const commun = { maintenant, nb, choix, surChoix };
  const aujourdhui = cleDe(maintenant);

  const onglets = proches.map((j) => ({
    id: j,
    libelle: j === aujourdhui ? 'Aujourd’hui' : majuscule(jourCourt(j)),
    contenu: <Jour jour={j} suivant={jours.find((x) => x > j && jourOuvert(x, maintenant))} surSuivant={() => setActif(jours.find((x) => x > j))} {...commun} />,
  }));
  if (lointains.length) {
    onglets.push({
      id: 'plus-tard',
      libelle: 'Plus tard',
      contenu: (
        <div className="k-stack k-stack--lg">
          <Selection libelle="Un autre jour" vide="Choisir un jour…" valeur={plusTard} surChangement={setPlusTard}
            aide={`Jusqu’au ${jourLong(lointains[lointains.length - 1])}. Fermé le dimanche et le lundi.`}
            options={lointains.map((j) => ({ valeur: j, libelle: majuscule(jourLong(j)) }))} />
          {plusTard && <Jour jour={plusTard} {...commun} />}
        </div>
      ),
    });
  }
  return <Onglets libelle="Le jour" onglets={onglets} actif={actif} surChangement={setActif} />;
}
