// Banc d'essai : la structure « application », écran « tableau de bord », en React (chiffres fictifs).
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { marque, sections, versLaListe } from './commun-application.jsx';
import { TableauDeBord, Panneau, Repartition, Enregistrements } from '@k/ux/structures/application/TableauDeBord.jsx';
import { Historique } from '@k/ux/structures/application/Fiche.jsx';
import { EtatVide } from '@k/components/etat-vide/EtatVide.jsx';

const fiche = 'fiche.html' + location.search;

function Essai() {
  const [q, setQ] = useState('');
  return (
    <TableauDeBord marque={marque} sections={sections('Tableau de bord')} recherche={{ libelle: 'Chercher une réservation', exemple: 'Un nom, une sortie…', valeur: q, surChangement: setQ, surValider: () => versLaListe(q) }}
      entete={{ surtitre: 'Hiver 2027', titre: 'Tableau de bord', resume: 'Chiffres arrêtés au 4 février 2027, 8 h.', action: { libelle: 'Nouvelle réservation', surClic: () => {} } }}
      libelleChiffres="Chiffres de la saison"
      chiffres={[{ libelle: 'Réservations', valeur: 8, note: 'dont 1 annulée et remboursée' }, { libelle: 'Encaissé', valeur: '1 720 €', note: '5 réservations payées' },
        { libelle: 'En attente de paiement', valeur: '740 €', note: '2 réservations, à relancer avant le 10 février' }, { libelle: 'Personnes inscrites', valeur: 20, note: 'sur 3 sorties, hors annulation' }]}>
      <Panneau titre="Réservations par sortie" note={<a className="k-link" href={marque.href}>Voir toutes les réservations</a>}>
        <Repartition lignes={[{ nom: 'Bivouac au-dessus des nuages', valeur: 3 }, { nom: 'Raquettes en forêt', valeur: 3 }, { nom: 'Nuit en igloo', valeur: 2 }, { nom: 'Cascade de glace', valeur: 0 }]} />
      </Panneau>
      <Panneau titre="Paiements en attente" note="Total : 740 €.">
        <Enregistrements lignes={[{ nom: 'Camille Roux', href: fiche, faits: 'Raquettes, 13 février · 260 €' }, { nom: 'Salomé Guérin', href: fiche, faits: 'Igloo, 6 mars · 480 €' }]} />
      </Panneau>
      <Panneau titre="Activité récente">
        <Historique evenements={[{ iso: '2027-02-03', date: '3 février 2027', texte: 'Inès Carpentier a réservé les raquettes du 13 mars, pour 5 personnes.' }, { iso: '2027-02-01', date: '1er février 2027', texte: 'Jeanne Lortat a annulé le bivouac du 6 février : 180 € remboursés.' }]} />
      </Panneau>
      <Panneau titre="Sorties à compléter">
        <EtatVide titre="Aucune sortie sous son minimum" variante="plain">Une sortie apparaît ici quand elle a moins de deux inscrits à dix jours du départ.</EtatVide>
      </Panneau>
    </TableauDeBord>
  );
}
createRoot(document.getElementById('racine')).render(<Essai />);
