// Banc d'essai : la structure « application », écran « fiche », en React (réservation fictive).
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { marque, sections, versLaListe } from './commun-application.jsx';
import { Fiche, Historique, Colonnes } from '@k/ux/structures/application/Fiche.jsx';
import { Bouton } from '@k/components/bouton/Bouton.jsx';
import { EtatVide } from '@k/components/etat-vide/EtatVide.jsx';
import { Faits } from '@k/ux/structures/Page.jsx';

const NOMS = ['Demande reçue', 'Acompte versé', 'Solde payé', 'Convocation envoyée', 'Sortie faite'];
const FAITES = ['faite le 4 janvier', 'faite le 6 janvier'];
const HISTORIQUE = [
  { iso: '2027-01-12', date: '12 janvier 2027', texte: 'Solde de 252 € reçu par virement.', auteur: 'Saisi par Maël Ferrand' },
  { iso: '2027-01-06', date: '6 janvier 2027', texte: 'Acompte de 108 € reçu.', auteur: 'Saisi par Maël Ferrand' },
  { iso: '2027-01-04', date: '4 janvier 2027', texte: 'Demande reçue par le formulaire du site, pour 2 personnes.', auteur: 'Agathe Morel' },
];

function Essai() {
  const [q, setQ] = useState(''); const [courante, setCourante] = useState(2); const [annonce, setAnnonce] = useState('');
  const etapes = NOMS.map((nom, i) => ({ nom, etat: i < courante ? (FAITES[i] || 'faite') : i === courante ? 'en cours' : 'à venir' }));
  const avancer = () => { setCourante(courante + 1); setAnnonce(`Étape « ${NOMS[courante + 1]} » en cours.`); };
  return (
    <Fiche marque={marque} sections={sections('Réservations')} recherche={{ libelle: 'Chercher une réservation', exemple: 'Un nom, une sortie…', valeur: q, surChangement: setQ, surValider: () => versLaListe(q) }}
      retour={{ libelle: 'Réservations', href: marque.href }}
      entete={{ surtitre: 'Réservation R-2027-014', mot: 'fiche', titre: 'Agathe Morel', resume: 'Payée le 12 janvier 2027. Convocation à envoyer avant le 30 janvier.', action: { libelle: 'Envoyer la convocation', surClic: () => {} } }}
      secondaires={<Bouton variante="secondary">Modifier</Bouton>}
      faits={[{ terme: 'Sortie', valeur: 'Bivouac au-dessus des nuages' }, { terme: 'Date', valeur: '6 février 2027' }, { terme: 'Personnes', valeur: 2 }, { terme: 'Montant', valeur: '360 €' }, { terme: 'Guide', valeur: 'Maël Ferrand' }]}
      etapes={{ etapes, courante, surAvancer: avancer, annonce }}
      onglets={[
        { id: 'details', libelle: 'Détails', contenu: <Colonnes groupes={[
          { titre: 'Client', contenu: <Faits faits={[{ terme: 'E-mail', valeur: 'agathe.morel@exemple.fr' }, { terme: 'Téléphone', valeur: '06 00 00 00 14' }, { terme: 'Ville', valeur: 'Annecy' }]} /> },
          { titre: 'Paiement', contenu: <Faits faits={[{ terme: 'Acompte', valeur: '108 €, le 6 janvier' }, { terme: 'Solde', valeur: '252 €, le 12 janvier' }, { terme: 'Reste dû', valeur: '0 €' }]} /> }]} /> },
        { id: 'historique', libelle: 'Historique', compte: HISTORIQUE.length, contenu: <Historique evenements={HISTORIQUE} /> },
        { id: 'documents', libelle: 'Documents', contenu: <EtatVide titre="Aucun document pour cette réservation" variante="plain" niveau="h2">La facture et la convocation apparaîtront ici dès qu'elles auront été envoyées.</EtatVide> },
      ]} />
  );
}
createRoot(document.getElementById('racine')).render(<Essai />);
