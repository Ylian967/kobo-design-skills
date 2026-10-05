// Banc d'essai : la structure « application » en React (liste de réservations fictives, panneau de détail).
import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.js';
import '@k/ux/structures/application/application.css';
import { Application } from '@k/ux/structures/application/Application.jsx';
import { Tableau } from '@k/components/tableau/Tableau.jsx';
import { Selection } from '@k/components/selection/Selection.jsx';
import { Bouton } from '@k/components/bouton/Bouton.jsx';
import { Icone } from '@k/components/Icone.jsx';
import { Faits } from '@k/ux/structures/Page.jsx';

const TOUTES = [
  ['Agathe Morel', 'Bivouac', '6 février', 2, 360, 'Payée'], ['Camille Roux', 'Raquettes', '13 février', 4, 260, 'En attente de paiement'], ['Idriss Benali', 'Igloo', '20 février', 2, 480, 'Payée'],
  ['Jeanne Lortat', 'Bivouac', '6 février', 1, 180, 'Annulée, remboursée'], ['Noé Vasseur', 'Raquettes', '27 février', 3, 195, 'Payée'], ['Salomé Guérin', 'Igloo', '6 mars', 2, 480, 'En attente de paiement'],
].map(([nom, sortie, date, personnes, montant, etat], i) => ({ id: `r${i}`, nom, sortie, date, personnes, montant, etat }));
const colonnes = [{ id: 'nom', libelle: 'Client', triable: true }, { id: 'sortie', libelle: 'Sortie', triable: true }, { id: 'date', libelle: 'Date' },
  { id: 'personnes', libelle: 'Personnes', type: 'number', triable: true }, { id: 'montant', libelle: 'Montant', type: 'number', triable: true, rendu: (l) => `${l.montant} €` }, { id: 'etat', libelle: 'État' }];
const sections = [{ titre: 'Suivi', liens: [{ libelle: 'Réservations', href: '#', courant: true, compte: TOUTES.length, icone: <Icone nom="menu" /> }, { libelle: 'Clients', href: '#clients', icone: <Icone nom="recherche" /> }] }];

function Essai() {
  const [q, setQ] = useState(new URLSearchParams(location.search).get('q') || ''); /* recherche lancée depuis un autre écran */ const [sortie, setSortie] = useState(''); const [ouverte, setOuverte] = useState(null); const [selection, setSelection] = useState([]);
  const lignes = useMemo(() => TOUTES.filter((l) => (!sortie || l.sortie === sortie) && (!q || `${l.nom} ${l.sortie}`.toLowerCase().includes(q.toLowerCase()))), [q, sortie]);
  return (
    <Application marque={{ libelle: 'Cordée Brume · guides', href: '#' }} sections={sections}
      recherche={{ libelle: 'Chercher une réservation', exemple: 'Un nom, une sortie…', valeur: q, surChangement: setQ, surValider: () => document.querySelector('.ap-list tbody tr')?.focus() }}
      entete={{ surtitre: 'Hiver 2027', titre: 'Réservations', resume: `${lignes.length} réservations affichées sur ${TOUTES.length}`, action: { libelle: 'Nouvelle réservation', surClic: () => {} } }}
      outils={<><Selection libelle="Sortie" vide="Toutes les sorties" options={['Bivouac', 'Raquettes', 'Igloo', 'Cascade de glace'].map((s) => ({ valeur: s, libelle: s }))} valeur={sortie} surChangement={setSortie} name="sortie" /><Bouton variante="ghost" onClick={() => { setSortie(''); setQ(''); }}>Effacer les filtres</Bouton></>}
      detail={ouverte && { titre: ouverte.nom, sousTitre: 'Réservation', contenu: <Faits faits={colonnes.slice(1).map((c) => ({ terme: c.libelle, valeur: c.rendu ? c.rendu(ouverte) : ouverte[c.id] }))} />, actions: <Bouton variante="secondary" href={'fiche.html' + location.search}>Ouvrir la fiche</Bouton> }}
      surFermerDetail={() => setOuverte(null)}>
      <Tableau legende="Réservations de l'hiver (données fictives)" colonnes={colonnes} lignes={lignes} selectionnable selection={selection} surSelection={setSelection} surOuvrir={setOuverte} ouverte={ouverte?.id}
        vide={{ titre: 'Aucune réservation ne correspond', texte: 'Élargissez les filtres ou effacez la recherche.' }} />
      <p id="lu">sélection : {selection.join(',') || '—'} | ouverte : {ouverte?.nom || '—'}</p>
    </Application>
  );
}
createRoot(document.getElementById('racine')).render(<Essai />);
