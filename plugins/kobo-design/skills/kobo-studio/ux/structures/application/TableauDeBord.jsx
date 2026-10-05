// kobo-studio — structure « application », écran « tableau de bord » (React).
// Mêmes classes que application.css. La coquille (en-tête, barre latérale, raccourcis) vient d'Application.jsx.
import React from 'react';
import { Coquille, TeteEcran } from './Application.jsx';

const RACCOURCIS = [['Chercher', ['/']], ['Fermer le tiroir, cette fenêtre', ['Échap']], ['Replier ou ouvrir la barre latérale', ['[']], ['Cette aide', ['?']]];

/** Chiffres : [{ libelle, valeur, note }] — un nombre, ce qu'il compte, et sa précision en toutes lettres. */
export const Chiffres = ({ chiffres, libelle }) => (
  <ul className="ap-stats" aria-label={libelle}>{chiffres.map((c) => (
    <li key={c.libelle}><p className="ap-stat__label">{c.libelle}</p><p className="ap-stat__value">{c.valeur}</p>{c.note && <p className="ap-stat__note">{c.note}</p>}</li>
  ))}</ul>
);

/** Panneau : une question, sa réponse. titre, note (ligne de bas de panneau : total, lien vers la liste), children. */
export function Panneau({ titre, note, children }) {
  const id = `ap-p-${React.useId().replace(/:/g, '')}`;
  return <section className="ap-panel" aria-labelledby={id}><h2 className="ap-h2" id={id}>{titre}</h2>{children}{note && <p className="ap-panel__note">{note}</p>}</section>;
}

/** Repartition : [{ nom, valeur, texte }] — chaque ligne écrit son nom et son nombre ; la barre ne fait que les montrer. */
export function Repartition({ lignes }) {
  const max = Math.max(1, ...lignes.map((l) => l.valeur));
  return (
    <ul className="ap-bars">{lignes.map((l) => (
      <li key={l.nom}><span>{l.nom}</span><span className="ap-bars__value">{l.texte ?? l.valeur}</span><span className="ap-bars__bar" style={{ '--_v': l.valeur / max }} aria-hidden="true" /></li>
    ))}</ul>
  );
}

/** Enregistrements : [{ nom, href, faits }] — une courte liste à ouvrir ; le nom est le lien. */
export const Enregistrements = ({ lignes }) => (
  <ul className="ap-rows">{lignes.map((l) => <li key={l.nom}><a className="k-link" href={l.href}>{l.nom}</a><span className="ap-rows__facts">{l.faits}</span></li>)}</ul>
);

/**
 * TableauDeBord : l'écran de synthèse.
 * marque, sections, recherche, emplacements : voir Coquille (Application.jsx)
 * entete : voir TeteEcran ; le résumé dit de quand datent les chiffres
 * chiffres : [{ libelle, valeur, note }], libelleChiffres
 * children : les panneaux (<Panneau>), posés dans .ap-panels
 */
export function TableauDeBord({ marque, sections, recherche, entete, chiffres, libelleChiffres = 'Chiffres', raccourcis = RACCOURCIS, emplacements, children }) {
  return (
    <Coquille marque={marque} sections={sections} recherche={recherche} raccourcis={raccourcis} emplacements={emplacements}>
      <TeteEcran entete={{ annonce: false, ...entete }} emplacements={emplacements} />
      {chiffres && <Chiffres chiffres={chiffres} libelle={libelleChiffres} />}
      <div className="ap-panels">{children}</div>
    </Coquille>
  );
}
