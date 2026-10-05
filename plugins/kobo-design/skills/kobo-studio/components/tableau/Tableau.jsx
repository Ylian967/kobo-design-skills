// kobo-studio — Tableau de données (React). Mêmes classes et même comportement que tableau.css / tableau.js.
import React, { useId, useMemo, useState } from 'react';
import { CaseACocher } from '../case-a-cocher/CaseACocher.jsx';
import { EtatVide } from '../etat-vide/EtatVide.jsx';

const nombre = (v) => { const n = parseFloat(String(v).replace(/\s/g, '').replace(',', '.').replace(/[^\d.-]/g, '')); return Number.isNaN(n) ? -Infinity : n; };

/**
 * legende : ce que le tableau contient (obligatoire : c'est son nom accessible)
 * colonnes : [{ id, libelle, type: 'number', triable, rendu(ligne) → élément, valeurTri(ligne) }] — la première colonne est l'en-tête de ligne
 * lignes : [{ id, …valeurs par id de colonne, indisponible }]
 * selection, surSelection(ids) : mode piloté ; sinon interne. selectionnable : affiche les cases
 * tri : { colonne, sens: 'ascending' | 'descending' } de départ ; surTri(tri) : tri fait par le serveur (les lignes ne sont alors pas retriées ici)
 * vide : { titre, texte, actions } ; nomLigne(ligne) → nom lu pour sa case (« Sélectionner Camille Roux »)
 * surOuvrir(ligne) : rend les lignes parcourables (↑ ↓ Début Fin, Espace coche, Entrée ou clic ouvre) ; ouverte : id de la ligne ouverte
 * dense ; enCours : aria-busy
 */
export function Tableau({ legende, colonnes, lignes, selectionnable = false, selection, surSelection, tri: triInitial, surTri, vide, nomLigne, dense, enCours, barre, surOuvrir, ouverte }) {
  const id = useId();
  const [interne, setInterne] = useState([]);
  const [tri, setTri] = useState(triInitial || null);
  const [annonce, setAnnonce] = useState('');
  const [courante, setCourante] = useState(null);   // ligne dans l'ordre de tabulation, quand les lignes sont parcourables
  const choisies = selection ?? interne;
  const triees = useMemo(() => {
    if (!tri || surTri) return lignes;
    const col = colonnes.find((c) => c.id === tri.colonne), signe = tri.sens === 'ascending' ? 1 : -1;
    if (!col) return lignes;
    const lire = (l) => (col.valeurTri ? col.valeurTri(l) : l[col.id]);
    const comparer = new Intl.Collator('fr', { numeric: true, sensitivity: 'base' }).compare;
    return lignes.map((l, i) => ({ l, i })).sort((a, b) => (col.type === 'number' ? nombre(lire(a.l)) - nombre(lire(b.l)) : comparer(String(lire(a.l) ?? ''), String(lire(b.l) ?? ''))) * signe || a.i - b.i).map((x) => x.l);
  }, [lignes, tri, colonnes, surTri]);
  const libres = triees.filter((l) => !l.indisponible).map((l) => l.id);
  const cochees = libres.filter((x) => choisies.includes(x));
  const choisir = (ids) => {
    setInterne(ids); surSelection?.(ids);
    setAnnonce(ids.length ? `${ids.length} ${ids.length > 1 ? 'lignes sélectionnées' : 'ligne sélectionnée'}.` : 'Aucune ligne sélectionnée.');
  };
  const trier = (col) => {
    const suivant = { colonne: col.id, sens: tri?.colonne === col.id && tri.sens === 'ascending' ? 'descending' : 'ascending' };
    setTri(suivant); surTri?.(suivant);
    setAnnonce(`Trié par ${col.libelle}, ordre ${suivant.sens === 'ascending' ? 'croissant' : 'décroissant'}.`);
  };
  const basculer = (l) => { if (!l.indisponible) choisir(choisies.includes(l.id) ? choisies.filter((x) => x !== l.id) : [...choisies, l.id]); };
  const auClavier = (e, l, i) => {
    if (e.target !== e.currentTarget) return;
    const vers = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: triees.length - 1 }[e.key];
    if (vers !== undefined) {
      e.preventDefault();
      const suivante = triees[Math.max(0, Math.min(triees.length - 1, vers))];
      setCourante(suivante.id); e.currentTarget.parentElement.children[triees.indexOf(suivante)].focus();
    } else if (e.key === ' ' && selectionnable) { e.preventDefault(); basculer(l); } else if (e.key === 'Enter') { e.preventDefault(); surOuvrir(l); }
  };
  const tabulee = triees.some((l) => l.id === courante) ? courante : triees[0]?.id;
  const compte = cochees.length ? `${cochees.length} ${cochees.length > 1 ? 'lignes sélectionnées' : 'ligne sélectionnée'}` : `${triees.length} ${triees.length > 1 ? 'lignes' : 'ligne'}`;
  return (
    <div className={`k-table${dense ? ' k-table--dense' : ''}`} role="region" aria-labelledby={`${id}-legende`} tabIndex={0} aria-busy={enCours || undefined} data-k-rownav={surOuvrir ? '' : undefined}>
      {(selectionnable || barre) && <div className="k-table__bar"><span className="k-table__count">{compte}</span>{barre?.(cochees)}</div>}
      <table aria-rowcount={triees.length + 1}>
        <caption id={`${id}-legende`}>{legende}</caption>
        <thead>
          <tr>
            {selectionnable && (
              <th scope="col" className="k-table__check">
                <CaseACocher libelle={<span className="k-sr-only">Tout sélectionner</span>} cochee={libres.length > 0 && cochees.length === libres.length}
                  partielle={cochees.length > 0 && cochees.length < libres.length} desactivee={!libres.length} surChangement={(on) => choisir(on ? libres : [])} />
              </th>
            )}
            {colonnes.map((c) => (
              <th key={c.id} scope="col" data-k-type={c.type} aria-sort={c.triable ? (tri?.colonne === c.id ? tri.sens : 'none') : undefined}>
                {c.triable ? <button type="button" className="k-table__sort" onClick={() => trier(c)}>{c.libelle}<span className="k-table__arrow" aria-hidden="true" /></button> : c.libelle}
              </th>
            ))}
          </tr>
        </thead>
        <tbody hidden={!triees.length}>
          {triees.map((l, i) => (
            <tr key={l.id} aria-selected={selectionnable ? choisies.includes(l.id) : undefined} aria-disabled={l.indisponible || undefined} aria-current={ouverte === l.id ? 'true' : undefined}
              tabIndex={surOuvrir ? (l.id === tabulee ? 0 : -1) : undefined} onKeyDown={surOuvrir ? (e) => auClavier(e, l, i) : undefined} onFocus={surOuvrir ? () => setCourante(l.id) : undefined}
              onClick={surOuvrir ? (e) => { if (!e.target.closest('a, button, input, label, select')) { setCourante(l.id); surOuvrir(l); } } : undefined}>
              {selectionnable && (
                <td className="k-table__check">
                  <CaseACocher libelle={<span className="k-sr-only">{nomLigne ? nomLigne(l) : `Sélectionner ${l[colonnes[0].id]}`}</span>} cochee={choisies.includes(l.id)} desactivee={l.indisponible}
                    surChangement={(on) => choisir(on ? [...choisies, l.id] : choisies.filter((x) => x !== l.id))} />
                </td>
              )}
              {colonnes.map((c, i) => {
                const contenu = c.rendu ? c.rendu(l) : l[c.id];
                return i === 0 ? <th key={c.id} scope="row" data-k-type={c.type}>{contenu}</th> : <td key={c.id} data-k-type={c.type}>{contenu}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {!triees.length && vide && <div className="k-table__empty"><EtatVide titre={vide.titre} actions={vide.actions} variante="plain" icone={vide.icone || 'recherche'}>{vide.texte}</EtatVide></div>}
      <p className="k-table__status k-sr-only" role="status">{annonce}</p>
    </div>
  );
}
