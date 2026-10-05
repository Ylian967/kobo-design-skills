// kobo-studio — structure « application », écran « fiche » (React) : un enregistrement en pleine page.
// Mêmes classes que application.css. La coquille (en-tête, barre latérale, raccourcis) vient d'Application.jsx.
import React from 'react';
import { Bouton } from '../../../components/bouton/Bouton.jsx';
import { Icone } from '../../../components/Icone.jsx';
import { Onglets } from '../../../components/onglets/Onglets.jsx';
import { Coquille, TeteEcran } from './Application.jsx';

const RETOUR = 'M19 12H5M11 6l-6 6 6 6';
const RACCOURCIS = [
  ['Chercher', ['/']], ["Changer d'onglet", ['←', '→']], ['Premier, dernier onglet', ['Début', 'Fin']],
  ['Fermer le tiroir, cette fenêtre', ['Échap']], ['Replier ou ouvrir la barre latérale', ['[']], ['Cette aide', ['?']],
];

/** Faits clés : [{ terme, valeur }] — ce qu'on vient vérifier, lisible sans ouvrir un onglet. */
export const FaitsCles = ({ faits, libelle }) => (
  <dl className="ap-keyfacts" aria-label={libelle}>{faits.map((f) => <div key={f.terme}><dt>{f.terme}</dt><dd>{f.valeur}</dd></div>)}</dl>
);

/**
 * Etapes : le chemin d'étapes d'un enregistrement, et le bouton qui fait avancer.
 * titre : titre de la section (« Avancement »)
 * etapes : [{ nom, etat }] — etat est écrit sous le nom (« faite le 4 janvier », « en cours », « à venir »)
 * courante : rang de l'étape en cours (les précédentes sont faites)
 * surAvancer() : passe à l'étape suivante ; libelleSuivant(nom) et libelleFin écrivent le bouton
 * annonce : phrase annoncée après un changement (role="status")
 */
export function Etapes({ titre = 'Avancement', etapes, courante, surAvancer, libelleSuivant = (nom) => `Passer à « ${nom} »`, libelleFin = 'Dernière étape atteinte', annonce }) {
  const fin = courante >= etapes.length - 1;
  return (
    <section className="ap-steps" aria-labelledby="ap-etapes">
      <h2 className="ap-h2" id="ap-etapes">{titre}</h2>
      <ol className="ap-steps__list">{etapes.map((e, i) => (
        <li key={e.nom} data-k-step={i < courante ? 'done' : undefined} aria-current={i === courante ? 'step' : undefined}>
          <span className="ap-steps__mark" aria-hidden="true"><Icone nom="coche" /></span><span className="ap-steps__name">{e.nom}</span><span className="ap-steps__state">{e.etat}</span>
        </li>
      ))}</ol>
      {surAvancer && (
        <div className="ap-steps__go">
          {/* aria-disabled, pas disabled : le bouton garde le focus quand la dernière étape est atteinte */}
          <Bouton variante="secondary" aria-disabled={fin} onClick={() => { if (!fin) surAvancer(); }}>{fin ? libelleFin : libelleSuivant(etapes[courante + 1].nom)}</Bouton>
          <p className="ap-steps__status" role="status">{annonce}</p>
        </div>
      )}
    </section>
  );
}

/** Historique : [{ date, iso, texte, auteur }] — le plus récent d'abord ; la date est écrite en toutes lettres. */
export const Historique = ({ evenements }) => (
  <ol className="ap-timeline">{evenements.map((e) => (
    <li key={e.iso + e.texte}><time dateTime={e.iso}>{e.date}</time><p>{e.texte}</p>{e.auteur && <span className="ap-timeline__who">{e.auteur}</span>}</li>
  ))}</ol>
);

/** Deux groupes de faits côte à côte quand il y a la place. groupes : [{ titre, contenu }] */
export const Colonnes = ({ groupes }) => (
  <div className="ap-cols">{groupes.map((g) => <section key={g.titre} className="k-stack k-stack--sm"><h2 className="ap-h2">{g.titre}</h2>{g.contenu}</section>)}</div>
);

/**
 * Fiche : l'écran d'un enregistrement.
 * marque, sections, recherche, emplacements : voir Coquille (Application.jsx)
 * retour : { libelle, href } — la liste d'où l'on vient
 * entete : voir TeteEcran ; le résumé dit l'état en toutes lettres (il n'est pas annoncé, sauf annonce: true)
 * secondaires : boutons en plus de l'action principale
 * faits : [{ terme, valeur }] — les faits clés ; libelleFaits les nomme pour un lecteur d'écran
 * etapes : props d'<Etapes>, ou rien
 * onglets : [{ id, libelle, compte, contenu }], libelleOnglets — le reste de la fiche ; chaque contenu est posé dans .ap-tabs-body
 * children : rendu sous les onglets (ou à leur place s'il n'y en a pas)
 */
export function Fiche({ marque, sections, recherche, retour, entete, secondaires, faits, libelleFaits = 'Faits clés', etapes, onglets, libelleOnglets = 'Parties de la fiche', raccourcis = RACCOURCIS, emplacements, children }) {
  return (
    <Coquille marque={marque} sections={sections} recherche={recherche} raccourcis={raccourcis} emplacements={emplacements}>
      {retour && <p className="ap-back"><a className="k-link" href={retour.href}><Icone nom={RETOUR} />{retour.libelle}</a></p>}
      <TeteEcran entete={{ annonce: false, ...entete }} secondaires={secondaires} emplacements={emplacements} />
      {faits && <FaitsCles faits={faits} libelle={libelleFaits} />}
      {etapes && <Etapes {...etapes} />}
      {onglets && <Onglets libelle={libelleOnglets} onglets={onglets.map((o) => ({ ...o, contenu: <div className="ap-tabs-body">{o.contenu}</div> }))} />}
      {children}
    </Coquille>
  );
}
