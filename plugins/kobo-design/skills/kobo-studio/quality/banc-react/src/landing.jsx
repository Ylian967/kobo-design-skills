import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.js';
import '@k/ux/structures/landing-produit/landing-produit.css';
import { ZoneNotifications } from '@k/components/notification/Notification.jsx';
import { LandingProduit } from '@k/ux/structures/landing-produit/LandingProduit.jsx';
import { page, PHOTOS } from './donnees.js';

const refuse = new URLSearchParams(location.search).has('echec');
createRoot(document.getElementById('racine')).render(
  <ZoneNotifications>
    <LandingProduit page={{ ...page('landing'), action: { libelle: 'Demander une place', href: '#demande' } }}
      hero={{ surtitre: 'Bivouac · deux jours', titre: 'Une nuit au-dessus des nuages', appui: 'Six personnes, un guide, une nuit sous tente à 2 300 m.', faits: [{ terme: 'Départ', valeur: 'Samedi 14 h' }, { terme: 'Prix', valeur: '180 €' }, { terme: 'Niveau', valeur: 'Débutant' }], action: { libelle: 'Demander une place', href: '#demande' }, image: PHOTOS.tentes }}
      deroule={{ surtitre: 'Le déroulé', titre: 'Deux jours, heure par heure', appui: 'Rien à prévoir que son sac.', image: PHOTOS.raquettes, etapes: [{ quand: '14 h', titre: 'Le parking du col', texte: 'On répartit le matériel.' }, { quand: '17 h', titre: 'Le camp', texte: 'On monte les tentes ensemble.' }, { quand: '7 h', titre: 'Le lever', texte: 'Café face à la mer de nuages.' }] }}
      pratique={{ surtitre: 'Pratique', titre: 'Avant de venir', onglets: [{ id: 'sac', libelle: 'Le sac', contenu: <p>Trente litres suffisent.</p> }, { id: 'froid', libelle: 'Le froid', contenu: <p>−12 °C la nuit.</p> }, { id: 'annulation', libelle: 'L’annulation', contenu: <p>Remboursée jusqu’à sept jours avant.</p> }] }}
      dates={{ surtitre: 'Les dates', titre: 'Choisir sa date', appui: 'Six places par sortie.', choix: [{ valeur: '17-01', libelle: 'Samedi 17 janvier', info: '4 places' }, { valeur: '24-01', libelle: 'Samedi 24 janvier', info: '2 places' }, { valeur: '31-01', libelle: 'Samedi 31 janvier', info: 'Complet', complet: true }] }}
      demande={{ titre: 'Demander une place', appui: 'Un guide vous répond sous deux jours.', libelleEnvoi: 'Envoyer la demande',
        champs: [{ libelle: 'Votre nom', name: 'nom', required: true, autoComplete: 'name' }, { libelle: 'Adresse e-mail', name: 'mail', type: 'email', required: true }, { libelle: 'Un mot pour le guide', name: 'mot', multiligne: true, facultatif: true }],
        envoyer: (d) => new Promise((ok, non) => setTimeout(() => { window.__demande = d; (refuse ? non : ok)(); }, 600)),
        succes: { titre: 'Demande envoyée', texte: 'Un guide vous répond sous deux jours.' }, echec: { titre: 'Demande non envoyée', texte: 'Le serveur ne répond pas. Réessayez dans une minute.' } }} />
  </ZoneNotifications>
);
